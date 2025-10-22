import time
import threading
import queue
import keyboard
import json
import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

# ===========================
# CONFIG
# ===========================
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PROFILE_PATH = r"C:\Users\kdeakins\AppData\Local\Google\Chrome\User Data\Profile 1"
URL = "https://orteil.dashnet.org/cookieclicker/"
LOG_FILE = "bank_trades.log"

# --- Garden-specific config (tuned to your request) ---
GARDEN_COLS = 3            # 3 columns
GARDEN_ROWS = 2            # 2 rows -> 6 plots total (3x2)
GARDEN_PLOTS = GARDEN_COLS * GARDEN_ROWS

# Layout stay duration: 15 minutes
LAYOUT_ROTATE_SECONDS = 15 * 60  # 900 seconds

# File to persist discovered seeds and unlock log
GARDEN_SAVE_FILE = "garden_seeds.json"
GARDEN_UNLOCK_LOG = "garden_unlocks.log"

# Soils to cycle (best-effort); will try to match in-game names
GARDEN_SOILS = ["fertile", "woodchips", "garden"]

# Delay and intervals
GARDEN_CHECK_INTERVAL = 6      # seconds between garden loop checks (harvest/plant)
GARDEN_PLANT_DELAY = 0.1       # internal small pause between plant ops (not strict)
GARDEN_SOIL_ROTATE_SEC = 10 * 60  # rotate soil every 10 minutes

# ===========================
# PREP: curated parent-pair layouts for 3x2
# each layout is a list of up to 6 seed names (strings) to plant left-to-right, top-to-bottom
# NOTE: If a layout contains seed names you already unlocked, the manager will skip that layout.
GARDEN_LAYOUTS = [
    # 1) Baker's Wheat everywhere (baseline)
    ["Baker's Wheat"] * GARDEN_PLOTS,

    # 2) Alternating Baker's Wheat / Thumbcorn
    ["Baker's Wheat", "Thumbcorn", "Baker's Wheat",
     "Thumbcorn", "Baker's Wheat", "Thumbcorn"],

    # 3) Thumbcorn everywhere
    ["Thumbcorn"] * GARDEN_PLOTS,

    # 4) Gildmillet heavy with Baker's Wheat (for Golden Clover attempts)
    ["Gildmillet", "Gildmillet", "Baker's Wheat",
     "Gildmillet", "Baker's Wheat", "Gildmillet"],

    # 5) Duketater everywhere (Shriekbulb routes)
    ["Duketater"] * GARDEN_PLOTS,

    # 6) Queenbeet attempts (dense Queenbeet)
    ["Queenbeet"] * GARDEN_PLOTS,

    # 7) Baker's Wheat + Cronerice mix
    ["Baker's Wheat", "Cronerice", "Baker's Wheat",
     "Cronerice", "Baker's Wheat", "Cronerice"],

    # 8) Fallback: Baker's Wheat
    ["Baker's Wheat"] * GARDEN_PLOTS,
]

# ===========================
# SETUP CHROME / SELENIUM
# ===========================
options = Options()
options.binary_location = CHROME_PATH
options.add_argument(f"--user-data-dir={PROFILE_PATH}")
options.add_argument("--start-maximized")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_experimental_option("detach", True)

driver = webdriver.Chrome(service=Service(), options=options)
driver.get(URL)
driver.maximize_window()

print("Waiting for Cookie Clicker to load...")
time.sleep(12)
print("Bot started. Press '>' to stop.")

stop_event = threading.Event()

# ===========================
# Selenium worker queue
# ===========================
selenium_queue = queue.Queue()

def selenium_worker():
    """Single-threaded Selenium worker to run queued browser tasks safely."""
    last_exec = time.time()
    while not stop_event.is_set():
        try:
            task, result_q = selenium_queue.get(timeout=0.5)
        except queue.Empty:
            if time.time() - last_exec > 10:
                print("[Worker] heartbeat OK")
                last_exec = time.time()
            continue

        # bail out if driver gone
        if not hasattr(driver, "session_id") or driver.session_id is None:
            print("[Worker] driver session missing")
            break

        try:
            res = task()
            last_exec = time.time()
            if result_q is not None:
                result_q.put((True, res))
        except Exception as e:
            if result_q is not None:
                result_q.put((False, e))
        finally:
            selenium_queue.task_done()

selenium_thread = threading.Thread(target=selenium_worker, daemon=True)
selenium_thread.start()

# ===========================
# Helper to run JS safely via Selenium worker
# ===========================
def run_in_browser(fn, timeout=12, default=None):
    """Queue callable 'fn' to Selenium worker and wait for its result."""
    if stop_event.is_set():
        return default
    if not hasattr(driver, "session_id") or driver.session_id is None:
        stop_event.set()
        return default
    result_q = queue.Queue()
    selenium_queue.put((fn, result_q))
    try:
        ok, val = result_q.get(timeout=timeout)
        if ok:
            return val
        else:
            print("[Browser Callable Error]", val)
            return default
    except queue.Empty:
        print("[Browser Timeout]")
        return default

def safe_js(script, default=None, timeout=12):
    def _task():
        return driver.execute_script(script)
    return run_in_browser(_task, timeout=timeout, default=default)

def safe_click_elements(by, selector, first_only=False, timeout=6):
    def _task():
        elems = driver.find_elements(by, selector)
        if not elems:
            return 0
        count = 0
        for e in elems:
            try:
                e.click()
                count += 1
                if first_only:
                    break
            except:
                pass
        return count
    return run_in_browser(_task, timeout=timeout, default=0)

# ===========================
# Thread 1: click cookie + pop shimmers
# ===========================
def click_cookie():
    print("[Click] started")
    time.sleep(1)
    while not stop_event.is_set():
        try:
            if selenium_queue.qsize() < 20:  # avoid overfilling the queue
                def _task_click():
                    return driver.execute_script("Game.ClickCookie(); Game.shimmers.forEach(s => s.pop());")
                selenium_queue.put((_task_click, None))  # fire-and-forget
        except Exception as e:
            print(f"[Click Error] {e}")
        time.sleep(0.02)  # ~50 clicks per second

# ===========================
# Thread 2: buy upgrades & buildings
# ===========================
def buy_things():
    print("[Buy] started")
    time.sleep(2)
    while not stop_event.is_set():
        try:
            safe_click_elements(By.CSS_SELECTOR, ".note .close")
            safe_click_elements(By.CSS_SELECTOR, "#upgrades .upgrade.enabled")

            def buy_top_product():
                prods = driver.find_elements(By.CSS_SELECTOR, "#products .product.unlocked.enabled")
                for p in reversed(prods):
                    try:
                        p.click()
                        return True
                    except:
                        continue
                return False
            run_in_browser(buy_top_product, timeout=6, default=False)
        except Exception as e:
            print(f"[Buy Thread Error] {e}")
        time.sleep(0.25)

# ===========================
# Thread 3: Cast Force the Hand of Fate
# ===========================
def cast_spell():
    print("[Spell] started")
    time.sleep(3)
    last_cast = 0
    cooldown = 8
    while not stop_event.is_set():
        try:
            ready = safe_js("""
                try {
                    var o = Game.Objects['Wizard tower'];
                    return !!(o && o.minigameLoaded && o.minigame);
                } catch(e) { return false; }
            """, False)
            if not ready:
                time.sleep(3)
                continue

            def _cast_try():
                return driver.execute_script("""
                    try {
                        var M = Game.Objects['Wizard tower'].minigame;
                        var spell = M.spells['hand of fate'];
                        var mana = M.magic || 0;
                        var manaMax = M.magicM || 0;
                        var buffs = Object.keys(Game.buffs || {}).filter(k => !!k).map(s => s.toString().toLowerCase());
                        var goldBuff = buffs.some(b => b.includes('frenzy') || b.includes('click') || b.includes('gold') || b.includes('wrath') || b.includes('lucky'));
                        if (mana >= manaMax && goldBuff && M.getSpellCost(spell) <= M.magic) {
                            try { M.castSpell(spell); return 'cast'; } catch(e){ return 'err'; }
                        }
                        return 'no';
                    } catch(e) { return 'err'; }
                """)
            did_cast = run_in_browser(_cast_try, timeout=8, default="no")
            if did_cast == 'cast' and (time.time() - last_cast > cooldown):
                print("✅ Cast 'Force the Hand of Fate'")
                last_cast = time.time()
            elif did_cast == 'err':
                print("[Spell] in-page error")
        except Exception as e:
            print(f"[Spell Thread Error] {e}")
        time.sleep(1)

# ===========================
# Thread 4: Bank / Stock trader (bulk trading + logging)
# ===========================
MEAN_FILE = "bank_means.json"

def load_means():
    if os.path.exists(MEAN_FILE):
        try:
            with open(MEAN_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print("[Means] Failed to load:", e)
    return {}

def save_means(means_dict):
    try:
        with open(MEAN_FILE, "w", encoding="utf-8") as f:
            json.dump(means_dict, f, indent=2)
        print("[Means] Saved estimated means.")
    except Exception as e:
        print("[Means] Failed to save:", e)

def manage_stocks():
    print("[Stock] started (persistent mean storage + condensed logging)")
    stored_means = load_means()
    time.sleep(4)

    while not stop_event.is_set():
        try:
            ready = safe_js("""
                try {
                    var B = Game.Objects['Bank'];
                    return !!(B && B.minigameLoaded && B.minigame);
                } catch(e){ return false; }
            """, False)
            if not ready:
                time.sleep(8)
                continue

            def _trade_and_report(means_json):
                return driver.execute_script(r"""
                    try {
                        var storedMeans = JSON.parse(arguments[0] || "{}");
                        var B = Game.Objects['Bank'];
                        if(!B || !B.minigameLoaded) return '';
                        var M = B.minigame;
                        if(!M || !M.goodsById) return '';
                        var actions = [];
                        var tradeActions = [];
                        var newMeans = {};

                        for (var i = 0; i < M.goodsById.length; i++) {
                            var g = M.goodsById[i];
                            if (!g) continue;
                            var cur = (typeof g.val === 'number') ? g.val : 0;
                            var prev = (typeof g.prev === 'number') ? g.prev : cur;

                            // Estimate mean from recent vals, or use stored mean
                            var mean = 0;
                            if (Array.isArray(g.vals) && g.vals.length > 0) {
                                var sum = 0, count = 0;
                                for (var j = 0; j < g.vals.length; j++) {
                                    var v = g.vals[j];
                                    if (typeof v !== 'number' || isNaN(v)) continue;
                                    sum += v; count++;
                                }
                                if (count > 0) mean = sum / count;
                            }
                            if (!mean || mean === 0) {
                                if (storedMeans[g.name]) mean = storedMeans[g.name];
                                else mean = (cur + prev) / 2;
                            }

                            newMeans[g.name] = mean;

                            var diff = Math.abs(cur - prev);
                            var traded = false;

                            // BUY
                            if (g.stock < M.getGoodMaxStock(g) && cur < mean - diff * 2) {
                                var before = g.stock;
                                try { M.buyGood(g.id || i, Infinity); } catch(e){}
                                if (g.stock > before) {
                                    tradeActions.push('📈 BUY ' + g.name + ' @ ' + cur.toFixed(2) +
                                                      ' (below est. mean ' + mean.toFixed(2) + ')');
                                    traded = true;
                                }
                            }
                            // SELL
                            else if (g.stock > 0 && cur > mean + diff * 2) {
                                var before2 = g.stock;
                                try { M.sellGood(g.id || i, Infinity); } catch(e){}
                                if (g.stock < before2) {
                                    tradeActions.push('📉 SELL ' + g.name + ' @ ' + cur.toFixed(2) +
                                                      ' (above est. mean ' + mean.toFixed(2) + ')');
                                    traded = true;
                                }
                            }

                            // Skip logging per-stock if not traded
                            if (traded) {
                                actions.push('→ ' + g.name + ' | price=' + cur.toFixed(2) +
                                             ' | estMean=' + mean.toFixed(2));
                            }
                        }

                        if (typeof M.collectProfit === 'function') { try { M.collectProfit(); } catch(e){} }

                        // Return both logs + means as JSON
                        return JSON.stringify({
                            trades: tradeActions.join('|'),
                            all: actions.join('|'),
                            means: newMeans
                        });
                    } catch(e) {
                        return JSON.stringify({error: String(e)});
                    }
                """, means_json)

            js_result = run_in_browser(lambda: _trade_and_report(json.dumps(stored_means)), timeout=14, default="")
            if not js_result:
                continue

            try:
                data = json.loads(js_result)
            except Exception:
                print("[Bank] Failed to parse JS result:", js_result)
                continue

            if "error" in data:
                print("[Bank][JS ERROR]", data["error"])
                continue

            trades = data.get("trades", "")
            new_means = data.get("means", {})

            # update in-memory means
            stored_means.update(new_means)

            # condensed logging
            if trades.strip():
                print("=== Stock Trades This Round ===")
                for line in trades.split("|"):
                    if not line.strip():
                        continue
                    print(line)
                    with open(LOG_FILE, "a", encoding="utf-8") as f:
                        f.write(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {line}\n")
                print("==============================")

        except Exception as e:
            print(f"[Stock Thread Error] {e}")
        time.sleep(8)

    save_means(stored_means)

# ===========================
# Garden helpers: load/save/log
# ===========================
def load_seen_seeds():
    if os.path.exists(GARDEN_SAVE_FILE):
        try:
            with open(GARDEN_SAVE_FILE, "r", encoding="utf-8") as f:
                return set(json.load(f))
        except Exception as e:
            print("[Garden] failed to load seen seeds:", e)
    return set()

def save_seen_seeds(seen):
    try:
        with open(GARDEN_SAVE_FILE, "w", encoding="utf-8") as f:
            json.dump(sorted(list(seen)), f, indent=2)
        print("[Garden] saved seen seeds")
    except Exception as e:
        print("[Garden] failed to save seen seeds:", e)

def log_new_seed(name, parents=None):
    """Append a new unlocked seed with timestamp to the unlock log. Include parents if provided."""
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    if parents:
        parents_str = ", ".join(parents)
        line = f"[{timestamp}] Unlocked: {name}    (parents: {parents_str})\n"
    else:
        line = f"[{timestamp}] Unlocked: {name}\n"
    try:
        with open(GARDEN_UNLOCK_LOG, "a", encoding="utf-8") as f:
            f.write(line)
    except Exception as e:
        print("[Garden] Failed to log new seed:", e)

def get_unlocked_seeds():
    """Return a list of unlocked seed names from the Garden minigame (defensive)."""
    js = """
    try {
        var F = Game.Objects['Farm'];
        if (!F || !F.minigameLoaded || !F.minigame) return [];
        var M = F.minigame;
        var out = [];
        // prefer M.plants (common structure)
        if (M.plants) {
            for (var k in M.plants) {
                if (!M.plants.hasOwnProperty(k)) continue;
                var p = M.plants[k];
                if (p && p.unlocked && p.name) out.push(p.name.toString());
            }
        }
        // fallback: seedTypes or seeds arrays
        if (M.seedTypes && Array.isArray(M.seedTypes)) {
            for (var i=0;i<M.seedTypes.length;i++){
                try { var s = M.seedTypes[i]; if (s && s.unlocked && s.name) out.push(s.name.toString()); } catch(e){}
            }
        }
        if (M.seeds && Array.isArray(M.seeds)) {
            for (var i=0;i<M.seeds.length;i++){
                try { var s = M.seeds[i]; if (s && s.unlocked && s.name) out.push(s.name.toString()); } catch(e){}
            }
        }
        // unique
        var u = {};
        for (var i=0;i<out.length;i++) u[out[i]] = true;
        return Object.keys(u);
    } catch(e) { return []; }
    """
    res = run_in_browser(lambda: driver.execute_script(js), timeout=8, default="[]")
    try:
        return json.loads(res)
    except Exception:
        return []

# ===========================
# Garden manager (legit automation)
# ===========================
def garden_manager():
    print("[Garden] started (full-auto legit automation, tuned for 3x2, 15min rotations)")
    time.sleep(4)

    # seen seeds (persisted)
    seen_seeds = load_seen_seeds()
    print(f"[Garden] loaded seen seeds: {len(seen_seeds)} known")

    # initial in-page detection (retry loop to allow minigame to populate)
    inpage = []
    for _ in range(10):  # up to ~20s
        inpage = get_unlocked_seeds()
        if inpage:
            break
        time.sleep(2)
    if inpage:
        print(f"[Garden] initial in-page seed count: {len(inpage)} ({', '.join(inpage)})")
        for s in inpage:
            if s not in seen_seeds:
                seen_seeds.add(s)
                log_new_seed(s, parents=None)
        save_seen_seeds(seen_seeds)
    else:
        print("[Garden] initial in-page seed count: 0 (none detected)")

    layout_index = 0
    last_layout_switch = time.time()
    last_soil_rotate = 0
    soil_index = 0
    last_layout_used = GARDEN_LAYOUTS[0] if GARDEN_LAYOUTS else []

    # Defensive JS helpers (harvest / plant / soil change)
    harvest_js = r"""
    try {
        var B = Game.Objects['Farm'];
        if (!B || !B.minigameLoaded || !B.minigame) return JSON.stringify({error:'farm not ready'});
        var M = B.minigame;
        var harvested = 0;
        var plots = M.plots && Array.isArray(M.plots) ? M.plots : (M.plot && Array.isArray(M.plot) ? M.plot : []);
        for (var i=0;i<plots.length;i++){
            try {
                var p = plots[i];
                if (!p) continue;
                var ready = false;
                if (typeof p.age === 'number' && typeof p.maxAge === 'number') ready = p.age >= p.maxAge;
                if (!ready && typeof p.life === 'number' && p.life <= 0) ready = true;
                if (!ready && typeof p.hp === 'number' && p.hp <= 0) ready = true;
                if (!ready && p.stage && p.stage >= 2) ready = true;
                if (ready) {
                    try {
                        if (typeof M.harvestPlot === 'function') { M.harvestPlot(i); harvested++; }
                        else if (typeof M.clickPlot === 'function') { M.clickPlot(i); harvested++; }
                        else if (typeof M.harvest === 'function') { M.harvest(i); harvested++; }
                        else if (p.harvest && typeof p.harvest === 'function') { p.harvest(); harvested++; }
                    } catch(e){}
                }
            } catch(e){}
        }
        try { if (typeof M.collectSeeds === 'function') M.collectSeeds(); } catch(e){}
        try { if (typeof M.collect === 'function') M.collect(); } catch(e){}
        return JSON.stringify({harvested: harvested});
    } catch(err) {
        return JSON.stringify({error: String(err)});
    }
    """

    plant_js_template = r"""
    try {
        var layout = JSON.parse(arguments[0] || "[]");
        var B = Game.Objects['Farm'];
        if (!B || !B.minigameLoaded || !B.minigame) return JSON.stringify({error:'farm not ready'});
        var M = B.minigame;
        var planted = 0, skipped = 0;
        var nameToId = {};
        if (M.seedTypes && Array.isArray(M.seedTypes)) {
            for (var i=0;i<M.seedTypes.length;i++){
                try {
                    var s = M.seedTypes[i];
                    if (!s) continue;
                    if (s.name) nameToId[s.name.toString().toLowerCase()] = i;
                } catch(e){}
            }
        }
        if (M.seeds && Array.isArray(M.seeds)) {
            for (var i=0;i<M.seeds.length;i++){
                try {
                    var s = M.seeds[i];
                    if (!s) continue;
                    if (s.name) nameToId[s.name.toString().toLowerCase()] = i;
                } catch(e){}
            }
        }
        var plotsArr = M.plots && Array.isArray(M.plots) ? M.plots : (M.plot && Array.isArray(M.plot) ? M.plot : []);
        var freePlots = [];
        for (var i=0;i<plotsArr.length;i++){
            try {
                var p = plotsArr[i];
                var empty = false;
                if (!p) empty = true;
                else if (typeof p.id !== 'undefined' && (p.id === 0 || p.id === null)) empty = true;
                else if (typeof p.plant === 'undefined' && typeof p.root === 'undefined' && (p.age === 0 || typeof p.age === 'undefined')) empty = true;
                if (empty) freePlots.push(i);
            } catch(e){}
        }
        var used = 0;
        for (var li=0; li<layout.length && used < freePlots.length; li++){
            var desired = (layout[li] || '').toString().toLowerCase();
            if (!desired) continue;
            var seedId = nameToId[desired];
            if (typeof seedId === 'undefined') {
                for (var k in nameToId) {
                    if (k.indexOf(desired) !== -1) { seedId = nameToId[k]; break; }
                }
            }
            if (typeof seedId === 'undefined') { skipped++; continue; }
            var plotIndex = freePlots[used];
            try {
                if (typeof M.plantSeed === 'function') {
                    try { M.plantSeed(seedId, plotIndex); planted++; used++; continue; } catch(e){}
                    try { M.plantSeed(plotIndex, seedId); planted++; used++; continue; } catch(e){}
                }
                if (typeof M.plant === 'function') {
                    try { M.plant(seedId, plotIndex); planted++; used++; continue; } catch(e){}
                    try { M.plant(plotIndex, seedId); planted++; used++; continue; } catch(e){}
                }
                if (M.seedTypes && M.seedTypes[seedId]) {
                    try {
                        plotsArr[plotIndex].plant = Object.create(M.seedTypes[seedId]);
                        planted++; used++; continue;
                    } catch(e){}
                }
                skipped++;
            } catch(e){}
        }
        return JSON.stringify({planted: planted, skipped: skipped, freePlots: freePlots.length});
    } catch(err) {
        return JSON.stringify({error: String(err)});
    }
    """

    set_soil_js_template = r"""
    try {
        var soilName = (arguments[0] || '').toString().toLowerCase();
        var B = Game.Objects['Farm'];
        if (!B || !B.minigameLoaded || !B.minigame) return JSON.stringify({error:'farm not ready'});
        var M = B.minigame;
        var available = [];
        try {
            if (M.soils && typeof M.soils === 'object') {
                for (var k in M.soils) { if (M.soils.hasOwnProperty(k)) available.push(k); }
            }
        } catch(e){}
        var matched = null;
        try {
            if (M.soils && typeof M.soils === 'object') {
                for (var k in M.soils) {
                    if (!M.soils.hasOwnProperty(k)) continue;
                    if (k.toString().toLowerCase() === soilName) { matched = k; break; }
                    if (k.toString().toLowerCase().indexOf(soilName) !== -1) matched = k;
                }
            }
        } catch(e){}
        try {
            if (matched !== null) {
                try { if (typeof M.changeSoil === 'function') { M.changeSoil(matched); return JSON.stringify({ok:'changeSoil'}); } } catch(e){}
                try { if (typeof M.setSoil === 'function') { M.setSoil(matched); return JSON.stringify({ok:'setSoil'}); } } catch(e){}
                try { M.soil = matched; return JSON.stringify({ok:'assigned_soil'}); } catch(e){}
            }
            if (M.availableSoils && Array.isArray(M.availableSoils)) {
                for (var i=0;i<M.availableSoils.length;i++){
                    try {
                        var s = M.availableSoils[i];
                        if (!s) continue;
                        var nm = (s.name||'').toString().toLowerCase();
                        if (!nm) nm = (s[0]||'').toString().toLowerCase();
                        if (nm.indexOf(soilName) !== -1) {
                            try { if (typeof M.changeSoil === 'function') { M.changeSoil(i); return JSON.stringify({ok:'changeSoil_idx'}); } } catch(e){}
                            try { M.soil = i; return JSON.stringify({ok:'soil_idx_assigned'}); } catch(e){}
                        }
                    } catch(e){}
                }
            }
        } catch(e){}
        return JSON.stringify({ok:'no-match', available: available});
    } catch(err) {
        return JSON.stringify({error: String(err)});
    }
    """

    # Main loop
    while not stop_event.is_set():
        try:
            # ensure farm minigame is present
            ready = safe_js("""
                try {
                    var B = Game.Objects['Farm'];
                    return !!(B && B.minigameLoaded && B.minigame);
                } catch(e) { return false; }
            """, False)
            if not ready:
                time.sleep(8)
                continue

            now = time.time()

            # 1) Harvest mature plants
            harvest_res = run_in_browser(lambda: driver.execute_script(harvest_js), timeout=10, default=None)
            try:
                if isinstance(harvest_res, str):
                    parsed = json.loads(harvest_res)
                    if parsed.get('harvested', 0) > 0:
                        print(f"[Garden] harvested {parsed.get('harvested', 0)} plants")
                else:
                    print("[Garden] harvest result (non-string):", harvest_res)
            except Exception:
                print("[Garden] harvest parse failed:", harvest_res)

            # 2) Rotate soil occasionally
            if now - last_soil_rotate > GARDEN_SOIL_ROTATE_SEC:
                target_soil = GARDEN_SOILS[soil_index % len(GARDEN_SOILS)]
                soil_index += 1
                last_soil_rotate = now
                soil_res = run_in_browser(lambda t=target_soil: driver.execute_script(set_soil_js_template, t), timeout=8, default=None)
                print(f"[Garden] soil rotate -> '{target_soil}':", soil_res)

            # 3) Update seen seeds periodically (so we can skip layouts that are no longer needed)
            new_seen = set(get_unlocked_seeds())
            unlocked = new_seen - seen_seeds
            if unlocked:
                for s in sorted(unlocked):
                    # log unlock with parents = last_layout_used (unique names)
                    parents = sorted(list(set([n for n in (last_layout_used or []) if isinstance(n, str) and n.strip()])))
                    print(f"[Garden] 🆕 Unlocked: {s} @ {time.strftime('%Y-%m-%d %H:%M:%S')}")
                    log_new_seed(s, parents=parents if parents else None)
                seen_seeds |= new_seen
                save_seen_seeds(seen_seeds)

            # 4) Build filtered valid_layouts: keep layouts that contain at least one seed name NOT yet seen
            valid_layouts = []
            for layout in GARDEN_LAYOUTS:
                names = set([n for n in layout if isinstance(n, str) and n.strip()])
                if any((nm not in seen_seeds) for nm in names):
                    valid_layouts.append(layout)
            if not valid_layouts:
                valid_layouts = GARDEN_LAYOUTS

            # 5) Switch layout only if enough time elapsed since last switch
            if now - last_layout_switch > LAYOUT_ROTATE_SECONDS:
                layout_index = (layout_index + 1) % len(valid_layouts)
                last_layout_switch = now
                print(f"[Garden] switching to layout {layout_index+1}/{len(valid_layouts)}")
                # record last layout used (for attributing future unlocks)
                last_layout_used = valid_layouts[layout_index % len(valid_layouts)]

            # set the current layout (used immediately for planting)
            current_layout = valid_layouts[layout_index % len(valid_layouts)]
            last_layout_used = current_layout  # ensure set even ifnot switched this tick

            # 6) Plant using current layout (fills free plots left->right)
            layout_json = json.dumps(current_layout)
            plant_res = run_in_browser(lambda lj=layout_json: driver.execute_script(plant_js_template, lj), timeout=12, default=None)
            try:
                if isinstance(plant_res, str):
                    parsed_p = json.loads(plant_res)
                    if 'error' in parsed_p:
                        if parsed_p['error']:
                            print("[Garden] plant error:", parsed_p['error'])
                    else:
                        planted = parsed_p.get('planted', 0)
                        skipped = parsed_p.get('skipped', 0)
                        free = parsed_p.get('freePlots', None)
                        if planted > 0:
                            print(f"[Garden] planted {planted} seeds (skipped {skipped}) - free plots left: {free}")
                            # small delay to avoid spamming plant calls
                            time.sleep(GARDEN_PLANT_DELAY)
                else:
                    print("[Garden] plant result (non-string):", plant_res)
            except Exception:
                print("[Garden] plant parse failed:", plant_res)

        except Exception as e:
            print(f"[Garden Thread Error] {e}")

        # wait but respect stop_event
        sleep_until = time.time() + GARDEN_CHECK_INTERVAL
        while time.time() < sleep_until and not stop_event.is_set():
            time.sleep(0.25)

    # on exit, save seen seeds
    save_seen_seeds(seen_seeds)
    print("[Garden] stopped and saved seen seeds.")

# ===========================
# Start threads
# ===========================
threads = [
    threading.Thread(target=click_cookie, daemon=True),
    threading.Thread(target=buy_things, daemon=True),
    threading.Thread(target=cast_spell, daemon=True),
    threading.Thread(target=manage_stocks, daemon=True),
    threading.Thread(target=garden_manager, daemon=True),
]
for t in threads:
    t.start()

# ===========================
# Wait for stop key
# ===========================
try:
    while True:
        if keyboard.is_pressed(">"):
            print("Stopping bot...")
            stop_event.set()
            break
        time.sleep(0.1)
except KeyboardInterrupt:
    stop_event.set()
    print("KeyboardInterrupt - stopping...")

time.sleep(1)
try:
    driver.title  # sanity check
    driver.quit()
except Exception:
    print("[Info] Driver already closed or invalid session.")
print("Bot stopped.")
