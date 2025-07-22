chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "selectionItem",            
    title: "ftos",
    contexts: ["selection","page"]        
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "selectionItem") {
    console.log("clicked", info.selectionText);
   
  }
});