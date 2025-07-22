// Create the context-menu entry once, on install or update
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "selectionItem",
    title: "Copy & show",
    contexts: ["selection"]   // only appears when text is highlighted
  });
});

// Handle the click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "selectionItem") return;

  const text = info.selectionText || "";
  // Just store the text for the popup
  await chrome.storage.session.set({ copied_text: text });

  // Optionally, show a notification to tell the user to click the extension icon
  chrome.notifications?.create({
    type: "basic",
    iconUrl: "planner.png",
    title: "Copied!",
    message: "Now click the extension icon to view your copied text."
  });
});