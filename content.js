let lastURL = location.href;

// --- UI Setup (The small counter shown on the Instagram page) ---
let counterEl = document.createElement("div");
counterEl.style.position = "fixed";
counterEl.style.top = "10px";
counterEl.style.right = "10px";
counterEl.style.padding = "8px 12px";
counterEl.style.background = "rgba(0,0,0,0.7)";
counterEl.style.color = "white";
counterEl.style.fontSize = "16px";
counterEl.style.borderRadius = "8px";
counterEl.style.zIndex = 9999;
counterEl.textContent = "Today's reels: 0";
document.body.appendChild(counterEl);

function updateUI(count) {
  counterEl.textContent = `Today's reels: ${count}`;
}

// --- Utility Functions ---

function getTodayString() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function getDayOfWeekString() {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const now = new Date();
  return days[now.getDay()]; 
}

// --- Counter Logic ---

function incrementCounter() {
  chrome.storage.local.get(["reelCount", "weeklyCount", "lastReset", "weekNumber", "dayOfWeekCounts"], (data) => {
    const today = getTodayString();
    const now = new Date();
    // Calculate current week number
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const msInWeek = 7 * 24 * 60 * 60 * 1000;
    const weekNumber = Math.floor(((now - startOfYear) / msInWeek) + 1);
    const todayDay = getDayOfWeekString();

    let daily = data.reelCount || 0;
    let weekly = data.weeklyCount || 0;
    
    // Initialize or retrieve day-wise counts
    let dayCounts = data.dayOfWeekCounts || {
      "sun": 0, "mon": 0, "tue": 0, "wed": 0, "thu": 0, "fri": 0, "sat": 0
    };
    let updates = {};

    // 1. Daily Total Reset Logic
    if (data.lastReset !== today) {
      daily = 0;
      updates.lastReset = today;
    }

    // 2. Weekly Total & Day-of-Week Reset Logic
    if (data.weekNumber !== weekNumber) {
      weekly = 0;
      // Reset ALL day-of-week counts when a new week starts
      dayCounts = {
        "sun": 0, "mon": 0, "tue": 0, "wed": 0, "thu": 0, "fri": 0, "sat": 0
      };
      updates.weekNumber = weekNumber;
    }

    // --- Increment All Counts ---
    daily++;
    weekly++;
    dayCounts[todayDay]++; 

    // --- Prepare Updates for Storage ---
    updates.reelCount = daily;
    updates.weeklyCount = weekly;
    updates.dayOfWeekCounts = dayCounts;
    updates.weekNumber = weekNumber;
    updates.lastReset = today;

    chrome.storage.local.set(updates, () => {
      console.log("[ReelCounter] Daily:", daily, "Weekly:", weekly, "Day Counts:", dayCounts);
      updateUI(daily);
    });
  });
}

// Check URL changes for reels
function checkURLChange() {
  if (location.href !== lastURL) {
    lastURL = location.href;
    if (lastURL.includes("/reels/")) incrementCounter();
  }
}

// Initialize daily counter UI from storage
chrome.storage.local.get(["reelCount"], (data) => {
  updateUI(data.reelCount || 0);
});

// Monitor URL changes every second
setInterval(checkURLChange, 1000);