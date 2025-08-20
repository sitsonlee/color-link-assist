# Color Link Assist - Chrome Extension

A Chrome extension that helps color blind users detect red clickable links through visual enhancements.

## Installation

1. **Download the extension files** to a local folder
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer mode** (toggle in top right)
4. **Click "Load unpacked"** and select the folder containing the extension files
5. **Pin the extension** to your toolbar for easy access

## Files Structure

```
color-link-assist-extension/
├── manifest.json          # Extension configuration
├── popup.html             # Extension popup interface
├── popup.css              # Popup styling
├── popup.js               # Popup functionality
├── content.js             # Content script (runs on web pages)
├── content.css            # Styles for link enhancements
├── background.js          # Background service worker
└── icons/                 # Extension icons (16, 32, 48, 128px)
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

## Features

- **Automatic Detection**: Scans web pages for red links
- **Visual Enhancements**: 
  - Border mode: Adds blue border around red links
  - Glow mode: Adds blue glow effect
  - Icon mode: Adds link icon indicator
- **Accessibility Options**: Support for different color vision types
- **Real-time Analysis**: Automatically detects new links as pages update

## Usage

1. **Click the extension icon** in your Chrome toolbar
2. **Toggle "Enable Assistant"** to activate link detection
3. **Choose enhancement mode** (Border, Glow, or Icon)
4. **Select your color vision type** for optimal detection
5. **Browse any website** - red links will be automatically enhanced

## Permissions

- `activeTab`: Access current tab to analyze links
- `storage`: Save your preferences
- `<all_urls>`: Run on all websites to detect red links

## Development

To modify the extension:

1. **Edit the source files** in your local folder
2. **Go to chrome://extensions/**
3. **Click the refresh icon** on your extension to reload changes
4. **Test your changes** on various websites

## Publishing

To publish to the Chrome Web Store:

1. **Create icons** in the `icons/` folder (16x16, 32x32, 48x48, 128x128 pixels)
2. **Test thoroughly** on various websites
3. **Package the extension** (zip all files)
4. **Submit to Chrome Web Store** with appropriate descriptions and screenshots

## Technical Notes

- Uses Manifest V3 (latest Chrome extension standard)
- Content script runs on all URLs to detect red links
- Settings are synced across Chrome instances
- Minimal performance impact with efficient DOM scanning