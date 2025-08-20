// Popup script for Chrome extension
let currentTab = null;

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  // Get current tab
  [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Load saved settings
  const settings = await chrome.storage.sync.get({
    isActive: false,
    enhancementMode: 'border',
    colorBlindType: 'protanopia'
  });
  
  // Initialize UI with saved settings
  document.getElementById('enableToggle').checked = settings.isActive;
  document.getElementById('visionSelect').value = settings.colorBlindType;
  setActiveMode(settings.enhancementMode);
  toggleControls(settings.isActive);
  
  // Request link count from content script
  if (settings.isActive) {
    requestLinkCount();
  }
  
  // Set up event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Toggle switch
  document.getElementById('enableToggle').addEventListener('change', async (e) => {
    const isActive = e.target.checked;
    await chrome.storage.sync.set({ isActive });
    toggleControls(isActive);
    
    // Send message to content script
    chrome.tabs.sendMessage(currentTab.id, {
      action: 'toggle',
      isActive: isActive
    });
    
    if (isActive) {
      requestLinkCount();
    }
  });
  
  // Enhancement mode buttons
  document.getElementById('borderMode').addEventListener('click', () => changeMode('border'));
  document.getElementById('glowMode').addEventListener('click', () => changeMode('glow'));
  document.getElementById('iconMode').addEventListener('click', () => changeMode('icon'));
  
  // Vision type select
  document.getElementById('visionSelect').addEventListener('change', async (e) => {
    const colorBlindType = e.target.value;
    await chrome.storage.sync.set({ colorBlindType });
    
    chrome.tabs.sendMessage(currentTab.id, {
      action: 'updateVisionType',
      colorBlindType: colorBlindType
    });
  });
}

async function changeMode(mode) {
  await chrome.storage.sync.set({ enhancementMode: mode });
  setActiveMode(mode);
  
  chrome.tabs.sendMessage(currentTab.id, {
    action: 'updateMode',
    enhancementMode: mode
  });
}

function setActiveMode(mode) {
  document.querySelectorAll('.mode-button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(mode + 'Mode').classList.add('active');
}

function toggleControls(show) {
  const controlsSection = document.getElementById('controlsSection');
  if (show) {
    controlsSection.classList.remove('hidden');
  } else {
    controlsSection.classList.add('hidden');
    document.getElementById('linkCount').textContent = 'Assistant disabled';
  }
}

function requestLinkCount() {
  chrome.tabs.sendMessage(currentTab.id, {
    action: 'getLinkCount'
  }, (response) => {
    if (response && typeof response.count === 'number') {
      const linkCountEl = document.getElementById('linkCount');
      linkCountEl.textContent = `Found ${response.count} red link${response.count !== 1 ? 's' : ''}`;
    }
  });
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'linkCountUpdate') {
    const linkCountEl = document.getElementById('linkCount');
    linkCountEl.textContent = `Found ${message.count} red link${message.count !== 1 ? 's' : ''}`;
  }
});