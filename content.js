let lastURL = location.href;

// Create daily counter display
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

// Update UI function
function updateUI(count) {
  counterEl.textContent = `Today's reels: ${count}`;
}

// Get today string
function getTodayString() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
}

// Increment daily and weekly counts
function incrementCounter() {
  chrome.storage.local.get(["reelCount", "weeklyCount", "lastReset", "weekNumber"], (data) => {
    const today = getTodayString();
    const now = new Date();
    const weekNumber = Math.floor(((now - new Date(now.getFullYear(),0,1))/ (7*24*60*60*1000)) + 1);

    let daily = data.reelCount || 0;
    let weekly = data.weeklyCount || 0;
    let updates = {};

    // Reset daily if needed
    if (data.lastReset !== today) {
      daily = 0;
      updates.lastReset = today;
    }

    // Reset weekly if needed
    if (data.weekNumber !== weekNumber) {
      weekly = 0;
      updates.weekNumber = weekNumber;
    }

    daily++;
    weekly++;

    updates.reelCount = daily;
    updates.weeklyCount = weekly;
    updates.weekNumber = weekNumber;
    updates.lastReset = today;

    chrome.storage.local.set(updates, () => {
      console.log("[ReelCounter] Daily:", daily, "Weekly:", weekly);
      updateUI(daily); // Only show daily on page
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

// Initialize daily counter from storage
chrome.storage.local.get(["reelCount", "weeklyCount"], (data) => {
  updateUI(data.reelCount || 0);
});

// Monitor URL changes
setInterval(checkURLChange, 1000);
