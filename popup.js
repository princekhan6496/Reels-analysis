const totalReelsEl = document.getElementById("totalReels");
// Renamed from dailyAvgEl to match the HTML ID for clarity
const weeklyAvgEl = document.getElementById("weeklyAvg"); 
const peakCountEl = document.getElementById("peakCount");
// Renamed the container for the list breakdown
const breakdownContainerEl = document.getElementById("breakdownContainer");

// Define the desired display order (Mon-Sun)
const dayOrder = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// Helper function to capitalize the first letter and get full day name
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
function getFullDayName(dayKey) {
    const map = {
        'mon': 'Monday', 'tue': 'Tuesday', 'wed': 'Wednesday', 'thu': 'Thursday',
        'fri': 'Friday', 'sat': 'Saturday', 'sun': 'Sunday'
    };
    return map[dayKey.toLowerCase()] || capitalize(dayKey);
}

// Fetch and display the data
chrome.storage.local.get(["weeklyCount", "dayOfWeekCounts"], (data) => {
    
    const weeklyTotal = data.weeklyCount || 0;
    const dayCounts = data.dayOfWeekCounts || {};

    // --- Calculation and Initialization ---
    let totalScrolls = 0;
    let peakCount = 0;
    
    // 1. Process all counts to find Total and Peak
    const countsArray = dayOrder.map(dayKey => {
        const count = dayCounts[dayKey] || 0;
        totalScrolls += count;
        
        if (count > peakCount) {
            peakCount = count;
        }
        return { day: dayKey, count: count };
    });
    
    // Calculate Weekly Average (Total Scrolls / 7 days)
    const weeklyAvg = Math.round(totalScrolls / 7);

    // --- Populate Summary Cards ---
    totalReelsEl.textContent = weeklyTotal;
    weeklyAvgEl.textContent = weeklyAvg; 
    peakCountEl.textContent = peakCount; 
    
    // --- Generate Weekly Scroll Breakdown List ---
    breakdownContainerEl.innerHTML = ''; 

    if (totalScrolls === 0) {
        breakdownContainerEl.innerHTML = '<div class="no-data-message">No reels tracked this week yet. Go scroll!</div>';
        return;
    }
    
    countsArray.forEach(dayData => {
        const { day, count } = dayData;
        const fullDayName = getFullDayName(day);

        const item = document.createElement('div');
        item.className = 'breakdown-item';
        
        // Day Label
        const label = document.createElement('div');
        label.className = 'day-label';
        label.textContent = fullDayName;

        // Count Value
        const value = document.createElement('div');
        value.className = 'count-value';
        value.textContent = count;
        
        // Highlight Peak Day count
        if (count === peakCount && peakCount > 0) { 
            value.style.color = '#8b5cf6'; // Keep the color for emphasis
        }

        item.appendChild(label);
        item.appendChild(value);
        breakdownContainerEl.appendChild(item);
    });
});