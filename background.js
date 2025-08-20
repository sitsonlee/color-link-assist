// Background script for Chrome extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Color Link Assist extension installed');
  
  // Set default settings
  chrome.storage.sync.set({
    isActive: false,
    enhancementMode: 'border',
    colorBlindType: 'protanopia'
  });
});

// Handle messages between popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Forward messages if needed
  if (message.action === 'linkCountUpdate') {
    // This will be handled by popup.js if it's listening
    return;
  }
});

// Update badge based on extension state
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.isActive) {
    updateBadge(changes.isActive.newValue);
  }
});

function updateBadge(isActive) {
  chrome.action.setBadgeText({
    text: isActive ? 'ON' : ''
  });
  
  chrome.action.setBadgeBackgroundColor({
    color: '#3b82f6'
  });
}

// Initialize badge on startup
chrome.storage.sync.get('isActive', (data) => {
  updateBadge(data.isActive || false);
});