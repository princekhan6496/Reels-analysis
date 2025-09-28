const weeklyEl = document.getElementById("weeklyCount");

chrome.storage.local.get(["weeklyCount"], (data) => {
  weeklyEl.textContent = data.weeklyCount || 0;
});
