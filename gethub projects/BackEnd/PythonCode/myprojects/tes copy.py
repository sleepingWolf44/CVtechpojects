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
from webdriver_manager.chrome import ChromeDriverManager

# ===========================
# SAFE CHROME SETUP
# ===========================
os.environ['WDM_LOCAL'] = '1'
os.environ['WDM_CACHE'] = r'C:\wdm_cache'

options = Options()
TEMP_PROFILE = r"C:\Users\kdeakins\AppData\Local\Google\Chrome\User Data\SeleniumProfile"
os.makedirs(TEMP_PROFILE, exist_ok=True)
options.add_argument(f"--user-data-dir={TEMP_PROFILE}")
options.binary_location = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-gpu")
options.add_argument("--remote-debugging-port=9222")
options.add_argument("--disable-infobars")
options.add_argument("--disable-extensions")
options.add_argument("--disable-background-timer-throttling")
options.add_argument("--start-maximized")
options.add_experimental_option("detach", True)

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.get("https://orteil.dashnet.org/cookieclicker/")
print("Waiting for Cookie Clicker to load...")
time.sleep(12)
print("✅ Bot launched successfully!")
print("Press '`' to stop, F2 to pause/resume all, '-' to pause/resume buying, F12 to pause/resume clicking.")

# ===========================
# CONFIG
# ===========================
LOG_FILE = "bank_trades.log"
HISTORY_FILE = "stock_price_history.json"

stop_event = threading.Event()
pause_event = threading.Event()
pause_buy_event = threading.Event()
pause_click_event = threading.Event()

selenium_queue = queue.Queue()

# ===========================
# Selenium worker
# ===========================
def selenium_worker():
    last_exec = time.time()
    while not stop_event.is_set():
        try:
            task, result_q = selenium_queue.get(timeout=0.5)
        except queue.Empty:
            if time.time() - last_exec > 10:
                print("[Worker] heartbeat OK")
                last_exec = time.time()
            continue

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

threading.Thread(target=selenium_worker, daemon=True).start()

# ===========================
# Helpers
# ===========================
def run_in_browser(fn, timeout=12, default=None):
    if stop_event.is_set():
        return default
    if not hasattr(driver, "session_id") or driver.session_id is None:
        stop_event.set()
        return default
    result_q = queue.Queue()
    selenium_queue.put((fn, result_q))
    try:
        ok, val = result_q.get(timeout=timeout)
        return val if ok else default
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

def wait_if_paused():
    while pause_event.is_set() and not stop_event.is_set():
        time.sleep(0.2)

# ===========================
# THREAD 1: Clicking
# ===========================
def click_cookie():
    print("[Click] started")
    last_wrinkler_pop = time.time()
    while not stop_event.is_set():
        while (pause_event.is_set() or pause_click_event.is_set()) and not stop_event.is_set():
            time.sleep(0.2)
        try:
            if selenium_queue.qsize() < 20:
                selenium_queue.put((lambda: driver.execute_script("Game.ClickCookie(); Game.shimmers.forEach(s => s.pop());"), None))
        except Exception:
            pass

        if time.time() - last_wrinkler_pop > 30:
            selenium_queue.put((lambda: driver.execute_script("""
                Game.wrinklers.forEach(w => { if (w.sucked > 0) w.hp = 0; });
            """), None))
            last_wrinkler_pop = time.time()
        time.sleep(0.02)

# ===========================
# THREAD 2: Buying Upgrades / Buildings
# ===========================
def buy_things():
    print("[Buy] started")
    time.sleep(3)
    while not stop_event.is_set():
        while (pause_event.is_set() or pause_buy_event.is_set()) and not stop_event.is_set():
            time.sleep(0.2)
        try:
            safe_click_elements(By.CSS_SELECTOR, ".note .close")
            safe_click_elements(By.CSS_SELECTOR, "#upgrades .upgrade.enabled")

            def _buy_buildings():
                try:
                    driver.execute_script("""
                        try {
                            var oldBulk = Game.buyBulk;
                            if (Game.buyBulk !== 100) Game.storeBulkButton(2);
                            for (var i = Game.ObjectsById.length - 1; i >= 0; i--) {
                                var obj = Game.ObjectsById[i];
                                if (obj.locked) continue;
                                try { if (Game.cookies >= obj.bulkPrice) obj.buy(); } catch(e){}
                            }
                            if (Game.buyBulk !== oldBulk) {
                                if (oldBulk === 10) Game.storeBulkButton(1);
                                else if (oldBulk === 1) Game.storeBulkButton(0);
                                else Game.storeBulkButton(0);
                            }
                        } catch(e){}
                    """)
                except Exception as e:
                    print("[Building Buy Error]", e)
            run_in_browser(_buy_buildings)
        except Exception as e:
            print(f"[Buy Thread Error] {e}")
        time.sleep(0.3)

# ===========================
# THREAD 3: Spellcasting
# ===========================
def cast_spell():
    print("[Spell] started")
    time.sleep(5)
    last_cast = 0
    while not stop_event.is_set():
        wait_if_paused()
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
                return driver.execute_script(r"""
                    try {
                        var B = Game.Objects['Wizard tower'];
                        if (!B || !B.minigameLoaded || !B.minigame) return JSON.stringify({result:'no', reason:'no_minigame'});
                        var M = B.minigame;
                        
                        var spell = M.spells['hand of fate'] || M.spells['force the hand of fate'];
                        if (!spell) {
                            for (var k in M.spells) {
                                var s = M.spells[k];
                                if (s && s.name) {
                                    var n = s.name.toLowerCase();
                                    if (n.indexOf('hand') !== -1 && n.indexOf('fate') !== -1) {
                                        spell = s;
                                        break;
                                    }
                                }
                            }
                        }
                        
                        if (!spell) return JSON.stringify({result:'no', reason:'spell_not_found'});
                        
                        var mana = M.magic || 0;
                        var manaMax = M.magicM || 100;
                        var cost = M.getSpellCost(spell) || spell.costMin || 10;
                        
                        var hasGoldBuff = false;
                        for (var i in Game.buffs) {
                            var buffName = Game.buffs[i].type.name.toLowerCase();
                            if (buffName.indexOf('frenzy') !== -1 || 
                                buffName.indexOf('lucky') !== -1 || 
                                buffName.indexOf('clot') !== -1) {
                                hasGoldBuff = true;
                                break;
                            }
                        }
                        
                        if (mana >= manaMax && hasGoldBuff && mana >= cost) {
                            M.castSpell(spell);
                            return JSON.stringify({
                                result:'cast', 
                                mana:mana, 
                                manaMax:manaMax, 
                                cost:cost,
                                spellName:spell.name
                            });
                        }
                        
                        return JSON.stringify({
                            result:'no', 
                            reason:'conditions_not_met',
                            mana:mana,
                            manaMax:manaMax,
                            cost:cost,
                            hasGoldBuff:hasGoldBuff,
                            manaFull:(mana >= manaMax)
                        });
                    } catch(e) { 
                        return JSON.stringify({result:'err', reason: 'exception', error: String(e)}); 
                    }
                """)
            
            js_resp = run_in_browser(_cast_try, timeout=8, default=None)
            if not js_resp:
                time.sleep(1)
                continue
                
            try:
                resp = json.loads(js_resp)
            except:
                resp = {"result":"err","raw":js_resp}
                
            if resp.get("result") == "cast":
                print(f"✅ Cast '{resp.get('spellName')}' | Mana: {resp.get('mana')}/{resp.get('manaMax')} | Cost: {resp.get('cost')}")
                last_cast = time.time()
            elif resp.get("result") == "no" and resp.get("reason") not in ['no_minigame', 'conditions_not_met']:
                if time.time() - last_cast > 30:
                    print(f"[Spell] Waiting - {resp.get('reason')}")
                    last_cast = time.time()
                    
        except Exception as e:
            print(f"[Spell Thread Error] {e}")
        time.sleep(2)

# ===========================
# THREAD 4: Bank / Stock Trading
# ===========================
def load_price_history():
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                print(f"[Stock] Loaded {len(data)} stocks with historical data")
                for stock_name, prices in list(data.items())[:3]:
                    print(f"  - {stock_name}: {len(prices)} historical prices")
                return data
        except Exception as e:
            print(f"[Stock] Error loading history: {e}")
    print("[Stock] Starting fresh price history")
    return {}

def save_price_history(history):
    try:
        with open(HISTORY_FILE, "w", encoding="utf-8") as f:
            json.dump(history, f, indent=2)
    except Exception as e:
        print(f"[Stock] Error saving history: {e}")

def manage_stocks():
    print("[Stock] started with persistent price history")
    price_history = load_price_history()
    time.sleep(5)
    
    while not stop_event.is_set():
        wait_if_paused()
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

            js_code = r"""
try {
    var historicalData = JSON.parse(arguments[0] || "{}");
    var B = Game.Objects['Bank'];
    if (!B || !B.minigameLoaded) return '';
    if (Game.onMenu) Game.ClosePrompt();
    if (B && !B.minigameOn) {
        try { B.minigameOn = 1; B.switchMinigame(1); } catch(e){}
    }
    var M = B.minigame;
    if (!M || !M.goodsById) return '';
    
    var trades = [];
    var updatedHistory = {};

    for (var i = 0; i < M.goodsById.length; i++) {
        var g = M.goodsById[i];
        if (!g) continue;
        
        var cur = g.val || 0;
        var stockName = g.name || ('Stock' + i);
        
        var allPrices = historicalData[stockName] || [];
        
        if (Array.isArray(g.vals) && g.vals.length > 0) {
            for (var j = 0; j < g.vals.length; j++) {
                var v = g.vals[j];
                if (typeof v === 'number' && !isNaN(v) && v > 0) {
                    if (allPrices.indexOf(v) === -1) {
                        allPrices.push(v);
                    }
                }
            }
        }
        
        if (cur > 0 && allPrices.indexOf(cur) === -1) {
            allPrices.push(cur);
        }
        
        if (allPrices.length > 500) {
            allPrices = allPrices.slice(-500);
        }
        
        updatedHistory[stockName] = allPrices;
        
        var mean = 0;
        var validCount = 0;
        var sum = 0;
        
        for (var k = 0; k < allPrices.length; k++) {
            var price = allPrices[k];
            if (typeof price === 'number' && !isNaN(price) && price > 0) {
                sum += price;
                validCount++;
            }
        }
        
        if (validCount > 0) {
            mean = sum / validCount;
        } else {
            mean = cur;
        }
        
        var maxStock = (typeof M.getGoodMaxStock === 'function') ? M.getGoodMaxStock(g) : (g.maxStock || 0);
        var pricePerUnit = cur * 100;
        
        if (g.stock > 0 && mean > 0 && cur > mean * 1.12) {
            var sellAmt = Math.ceil(g.stock * 0.5);
            try { 
                M.sellGood(g.id, sellAmt); 
                trades.push('📉 SELL '+sellAmt+'x '+stockName+' @ $'+cur.toFixed(2)+' (mean: $'+mean.toFixed(2)+' from '+validCount+' prices, +'+((cur/mean-1)*100).toFixed(1)+'%)');
            } catch(e){}
        }
        
        if (g.stock < maxStock && mean > 0 && cur < mean * 0.88) {
            var cash = Game.cookies || 0;
            var maxAfford = Math.floor(cash / pricePerUnit);
            var buyAmt = Math.min(maxAfford, maxStock - g.stock, 100);
            
            if (buyAmt > 0) {
                var bought = false;
                var attemptAmt = buyAmt;
                
                while (attemptAmt > 0 && !bought) {
                    try {
                        var costOfAttempt = attemptAmt * pricePerUnit;
                        if (costOfAttempt <= cash) {
                            M.buyGood(g.id, attemptAmt);
                            trades.push('📈 BUY '+attemptAmt+'x '+stockName+' @ $'+cur.toFixed(2)+' (mean: $'+mean.toFixed(2)+' from '+validCount+' prices, -'+((1-cur/mean)*100).toFixed(1)+'%)');
                            bought = true;
                        } else {
                            attemptAmt = Math.floor(attemptAmt * 0.9);
                        }
                    } catch(e) {
                        attemptAmt = Math.floor(attemptAmt * 0.9);
                    }
                }
            }
        }
    }

    try { M.collectProfit(); } catch(e){}
    return JSON.stringify({trades: trades, history: updatedHistory});
} catch(e){ return JSON.stringify({error: String(e)}); }
"""

            def _trade_with_history():
                return driver.execute_script(js_code, json.dumps(price_history))

            js_result = run_in_browser(_trade_with_history, timeout=14, default="")
            if not js_result:
                time.sleep(2)
                continue

            data = json.loads(js_result)
            if "error" in data:
                print("[Stock Error]", data["error"])
                time.sleep(2)
                continue

            trades = data.get("trades", [])
            new_history = data.get("history", {})
            
            if new_history:
                price_history = new_history
                save_price_history(price_history)

            if trades:
                print("=== Stock Trades ===")
                for t in trades:
                    print(t)
                    try:
                        with open(LOG_FILE, "a", encoding="utf-8") as f:
                            f.write(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {t}\n")
                    except:
                        pass
                print("====================")
                
        except Exception as e:
            print("[Stock Thread Error]", e)
        time.sleep(10)
    
    save_price_history(price_history)
    print(f"[Stock] Saved price history for {len(price_history)} stocks")

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
# Keyboard control
# ===========================
try:
    while True:
        if keyboard.is_pressed("`"):
            print("Stopping bot...")
            stop_event.set()
            break
        elif keyboard.is_pressed("f2"):
            if pause_event.is_set():
                pause_event.clear()
                print("[PAUSE] → Resumed all threads.")
            else:
                pause_event.set()
                print("[PAUSE] → All threads paused.")
            time.sleep(0.5)
        elif keyboard.is_pressed("-"):
            if pause_buy_event.is_set():
                pause_buy_event.clear()
                print("[BUY] resumed")
            else:
                pause_buy_event.set()
                print("[BUY] paused")
            time.sleep(0.5)
        elif keyboard.is_pressed("f12"):
            if pause_click_event.is_set():
                pause_click_event.clear()
                print("[CLICK] resumed")
            else:
                pause_click_event.set()
                print("[CLICK] paused")
            time.sleep(0.5)
        time.sleep(0.1)
except KeyboardInterrupt:
    stop_event.set()

time.sleep(1)
try:
    driver.quit()
except:
    pass
print("Bot stopped.")