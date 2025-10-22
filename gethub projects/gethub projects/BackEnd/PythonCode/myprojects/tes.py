import time
import threading
import queue
import keyboard
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
import json, os

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
# Start threads
# ===========================
threads = [
    threading.Thread(target=click_cookie, daemon=True),
    threading.Thread(target=buy_things, daemon=True),
    threading.Thread(target=cast_spell, daemon=True),
    threading.Thread(target=manage_stocks, daemon=True),
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
