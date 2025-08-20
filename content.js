// Content script for Chrome extension
class ColorLinkAssistant {
  constructor() {
    this.links = [];
    this.isActive = false;
    this.enhancementMode = 'border';
    this.colorBlindType = 'protanopia';
    this.observer = null;
    
    this.init();
  }
  
  async init() {
    // Load settings from storage
    const settings = await chrome.storage.sync.get({
      isActive: false,
      enhancementMode: 'border',
      colorBlindType: 'protanopia'
    });
    
    this.isActive = settings.isActive;
    this.enhancementMode = settings.enhancementMode;
    this.colorBlindType = settings.colorBlindType;
    
    if (this.isActive) {
      this.startAnalysis();
    }
    
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sendResponse);
    });
  }
  
  handleMessage(message, sendResponse) {
    switch (message.action) {
      case 'toggle':
        this.isActive = message.isActive;
        if (this.isActive) {
          this.startAnalysis();
        } else {
          this.stopAnalysis();
        }
        break;
        
      case 'updateMode':
        this.enhancementMode = message.enhancementMode;
        if (this.isActive) {
          this.enhanceLinks();
        }
        break;
        
      case 'updateVisionType':
        this.colorBlindType = message.colorBlindType;
        break;
        
      case 'getLinkCount':
        sendResponse({ count: this.links.length });
        break;
    }
  }
  
  startAnalysis() {
    this.analyzeLinks();
    this.startObserver();
  }
  
  stopAnalysis() {
    this.clearEnhancements();
    this.stopObserver();
    this.links = [];
    this.notifyPopup(0);
  }
  
  startObserver() {
    this.observer = new MutationObserver(() => {
      this.analyzeLinks();
    });
    
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  stopObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
  
  analyzeLinks() {
    const allLinks = document.querySelectorAll('a[href]');
    const redLinks = [];
    
    allLinks.forEach(link => {
      if (this.isRedLink(link)) {
        redLinks.push(link);
      }
    });
    
    this.links = redLinks;
    this.enhanceLinks();
    this.notifyPopup(this.links.length);
  }
  
  isRedLink(element) {
    const styles = window.getComputedStyle(element);
    const color = styles.color;
    
    if (!color) return false;
    
    const rgb = this.parseColorToRGB(color);
    if (!rgb) return false;
    
    return this.isRedColor(rgb);
  }
  
  parseColorToRGB(colorStr) {
    if (colorStr.startsWith('rgb')) {
      const match = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        return {
          r: parseInt(match[1]),
          g: parseInt(match[2]),
          b: parseInt(match[3])
        };
      }
    } else if (colorStr.startsWith('#')) {
      const hex = colorStr.slice(1);
      if (hex.length === 6) {
        return {
          r: parseInt(hex.slice(0, 2), 16),
          g: parseInt(hex.slice(2, 4), 16),
          b: parseInt(hex.slice(4, 6), 16)
        };
      }
    }
    return null;
  }
  
  isRedColor(rgb) {
    const { r, g, b } = rgb;
    
    // Check if red component is dominant
    const redDominant = r > g && r > b;
    
    // Check if red component is significantly higher
    const redSignificant = r > 120 && (r - Math.max(g, b)) > 30;
    
    // Check for various shades of red
    const isReddish = (
      (r > 150 && g < 100 && b < 100) || // Bright red
      (r > 100 && g < 80 && b < 80) ||   // Dark red
      (r > 180 && g < 120 && b < 120)    // Pink-red
    );
    
    return redDominant && (redSignificant || isReddish);
  }
  
  enhanceLinks() {
    // Clear existing enhancements
    this.clearEnhancements();
    
    // Apply new enhancements
    this.links.forEach(link => {
      this.applyEnhancement(link);
    });
  }
  
  applyEnhancement(link) {
    // Remove any existing enhancement classes
    link.classList.remove('cla-border', 'cla-glow', 'cla-icon');
    
    // Remove existing icon
    const existingIcon = link.querySelector('.cla-icon-indicator');
    if (existingIcon) {
      existingIcon.remove();
    }
    
    switch (this.enhancementMode) {
      case 'border':
        link.classList.add('cla-border');
        break;
        
      case 'glow':
        link.classList.add('cla-glow');
        break;
        
      case 'icon':
        link.classList.add('cla-icon');
        const icon = document.createElement('span');
        icon.className = 'cla-icon-indicator';
        icon.textContent = '🔗';
        link.appendChild(icon);
        break;
    }
  }
  
  clearEnhancements() {
    // Remove all enhancement classes
    document.querySelectorAll('.cla-border, .cla-glow, .cla-icon').forEach(link => {
      link.classList.remove('cla-border', 'cla-glow', 'cla-icon');
    });
    
    // Remove all icons
    document.querySelectorAll('.cla-icon-indicator').forEach(icon => {
      icon.remove();
    });
  }
  
  notifyPopup(count) {
    chrome.runtime.sendMessage({
      action: 'linkCountUpdate',
      count: count
    }).catch(() => {
      // Popup might be closed, ignore error
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ColorLinkAssistant();
  });
} else {
  new ColorLinkAssistant();
}