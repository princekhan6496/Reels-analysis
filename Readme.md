# Reel Analytics Tracker Extension

Welcome to the Reel Analytics Tracker! This extension is designed to help you monitor your engagement with Instagram Reels by tracking the number of times you scroll past a reel in a given week.

## 🎯 How It Works

This extension operates entirely locally within your browser and does not collect or transmit any personal data.

1. **Tracking:** When you are viewing the Instagram Reels feed (on the `/reels/` URL path), the extension monitors your activity. Every time you scroll past a video to load the next reel, the counter increments.

2. **Daily Counter:** A small, unobtrusive counter appears in the top-right corner of your Instagram page, showing your reel count for the current day.

3. **Weekly Reset:** The weekly totals and the daily breakdown are automatically reset at the start of a new calendar week.

## 💡 How to Use the Popup

To view your analytics, simply click the extension icon in your browser's toolbar (usually a small purple eye icon).

The popup displays your activity across three main sections:

### 1. Summary Cards

This section provides a quick overview of your scrolling habits this week:

| Metric | Description | 
| ----- | ----- | 
| **TOTAL** | The cumulative number of reels scrolled this week (Sunday to Saturday). | 
| **WEEKLY AVG** | The average number of reels scrolled per day, calculated over the full 7-day week (Total / 7). | 
| **PEAK DAY** | The highest number of reels scrolled on a single day this week. | 

### 2. Weekly Scroll Breakdown

This section replaces the traditional bar chart and provides a clear, professional list of your scroll counts for each day of the week, helping you identify your busiest scrolling days.

* Each day (Monday through Sunday) is listed with the exact number of reels scrolled on that day.

* If a day has the same count as the **Peak Day**, it will be highlighted.

## 🔄 Tracking Reset

Tracking data is persistent for the current week. The daily and weekly counts will automatically reset when a new calendar week begins, starting your tracking fresh.

## 🛠️ How to Load the Extension in Chrome

Since this is a custom extension, you need to manually load it into your Chrome browser.

1. **Get the Files:** Obtain the extension files by cloning the Git repository:
git clone https://github.com/princekhan6496/Reels-analysis.git
This will create a folder named `Reels-analysis` containing all the necessary files (`manifest.json`, `popup.html`, `popup.js`, `content.js`).

2. **Open Extension Management:** Open Google Chrome and navigate to the extensions page by typing `chrome://extensions` in the address bar.

3. **Enable Developer Mode:** In the top right corner, flip the toggle switch to enable **Developer mode**.

4. **Load the Extension:** Three new buttons will appear at the top. Click the **Load unpacked** button.

5. **Select Folder:** In the file dialog that opens, navigate into the cloned repository folder (`Reels-analysis`) and select it.

The extension will now be loaded! You should see the "Reel Analytics Tracker" listed on the extensions page. It may appear as a puzzle piece icon next to your address bar; click it, and then click the **Pin** icon next to "Reel Analytics" so icon is always visible.