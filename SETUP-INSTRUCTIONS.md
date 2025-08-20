# Chrome Extension Setup Instructions

## Required Icons

You'll need to create the following icon files in an `icons/` folder:

- `icons/icon16.png` (16x16 pixels)
- `icons/icon32.png` (32x32 pixels)  
- `icons/icon48.png` (48x48 pixels)
- `icons/icon128.png` (128x128 pixels)

**Icon Design Suggestions:**
- Use a link/chain icon with accessibility colors (blue/green)
- Keep it simple and recognizable at small sizes
- Use your existing 🔗 emoji as inspiration

## Installation Steps

1. **Create the icons folder** and add the required PNG files
2. **Open Chrome** and go to `chrome://extensions/`
3. **Enable Developer mode** (toggle switch in top right)
4. **Click "Load unpacked"** and select your extension folder
5. **Test the extension** by clicking its icon in the toolbar

## File Structure
```
your-extension-folder/
├── manifest.json
├── popup.html
├── popup.css
├── popup.js
├── content.js
├── content.css
├── background.js
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README-extension.md
```

## Testing

1. Navigate to any website with red links
2. Click the extension icon
3. Toggle "Enable Assistant" 
4. Try different enhancement modes
5. Verify red links are being detected and enhanced

The extension will work on all websites and remember your preferences!