# SoundCloud Duration Style

Firefox extension that customizes the appearance of duration timers on SoundCloud waveforms.

## Features

- Scale duration timer canvas (100% - 250%)
- Apply vibrant color filters: White, Orange, Red, Green, Blue, Purple, Pink, Cyan
- Light / Dark / Auto theme support
- Settings persist across sessions
- Zero external requests — all processing happens locally

## Installation

### From Mozilla Add-ons (Recommended)
 [Install from Mozilla Add-ons](https://addons.mozilla.org/en-US/firefox/addon/soundcloud-duration-style/)

1. Click the link above
2. Click "Add to Firefox"
3. Confirm the installation
4. Click the extension icon in your toolbar to start customizing!

### Manual Installation (Development)
1. Clone or download this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" → "Load Temporary Add-on"
4. Select `manifest.json` from the extension folder

## Usage

1. Click the extension icon (SDS) in the Firefox toolbar
2. Adjust **Scale** (100-250%) and **Color Filter**
3. Click **Save Settings**
4. Reload SoundCloud for changes to take effect

## Technical Details

| Property | Value |
|----------|-------|
| Browser | Firefox 142+ |
| Manifest Version | 3 |
| Permissions | `storage`, `*://soundcloud.com/*` |
| Content Script | Applies CSS filters to `.g-box-full.sceneLayer` canvas elements |
| Storage | `browser.storage.local` for persistent settings |

## Privacy Policy

This extension does not collect, store, or transmit any personal data.

- All settings are stored locally in your browser via `browser.storage.local`
- No external requests are made to any servers
- No analytics, tracking, or telemetry
- The extension only modifies the appearance of SoundCloud pages you visit

## Releases

Download previous versions and release notes:
📦 [GitHub Releases](https://github.com/pepeyc7526/soundcloud-duration-style/releases)

## License

MIT License — See [LICENSE](LICENSE) file for details.

## Credits

Developed with assistance from Qwen3.5-Plus AI.
