# SoundCloud Duration Style

<p align="center">
  <img src="icons/icon-128.svg" alt="Logo" width="128" height="128">
</p>

<p align="center">
  <a href="https://www.mozilla.org/firefox/"><img src="https://img.shields.io/badge/Firefox-142+-orange?logo=firefoxbrowser&logoColor=white" alt="Firefox 142+"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Manifest_reference"><img src="https://img.shields.io/badge/Manifest-V3-blue?logo=firefox&logoColor=white" alt="Manifest V3"></a>
  <a href="https://www.javascript.com"><img src="https://img.shields.io/badge/JavaScript-ES2022-f7df1e?logo=javascript&logoColor=black" alt="JavaScript"></a>
  <a href="https://qwenlm.github.io"><img src="https://img.shields.io/badge/Built%20with-Qwen%20AI-6366f1?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzYzNjZmMSI+PHBhdGggZD0iTTEyIDJDMTMuMSAyIDE0IDIuOSAxNCA0UzEyLjkgNiAxMiA2IDEwIDUuMSAxMCA0IDExIDIgMTIgMnptMCAxOGMtMi4yIDAtNC0xLjgtNC00czEuOC00IDQtNCA0IDEuOCA0IDQtMS44IDQtNCA0em0wLTJjMS4xIDAgMi0uOSAyLTJzLS45LTItMi0yLTIgLjktMiAyLjkuOSAyIDIgMnoiLz48L3N2Zz4=" alt="Qwen AI"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green?logo=opensourceinitiative&logoColor=white" alt="MIT License"></a>
  <a href="https://github.com/pepeyc7526/soundcloud-duration-style"><img src="https://img.shields.io/badge/Open%20Source-Yes-brightgreen?logo=github&logoColor=white" alt="Open Source"></a>
  <a href="https://github.com/pepeyc7526/soundcloud-duration-style/stargazers"><img src="https://img.shields.io/github/stars/pepeyc7526/soundcloud-duration-style?style=flat&logo=github" alt="GitHub Stars"></a>
</p>

<p align="center">
  <strong>Customize SoundCloud duration timer size, position and appearance. Adjustable brightness/contrast, Firefox system theme sync, local settings storage. Free open-source Firefox extension.</strong>
</p>

---

## ✨ Features

- 🔧 Adjustable timer display size (60–150px width, 30–80px height)
- 📍 Precise position controls (horizontal/vertical offset)
- 💡 Brightness (100–400%) and contrast (100–600%) filters
- 🌓 Light, Dark, and Auto theme support matching Firefox preferences
- 💾 Settings persist across browser sessions via `browser.storage.local`
- 🔒 Zero external requests — all processing happens locally
- 🎨 SoundCloud-inspired orange accent theme (#ff5500)
- ⚡ Optimized performance with `requestAnimationFrame` and efficient DOM handling

## 🚀 Installation

1. Download the latest `.xpi` from [Releases](https://github.com/pepeyc7526/soundcloud-duration-style/releases)
2. Open Firefox → `about:addons` → ⚙️ → "Install Add-on From File…"
3. Select the downloaded file and confirm
4. Click the extension icon in your toolbar to open settings
5. Adjust preferences and reload SoundCloud
6. On mozilla https://addons.mozilla.org/en-US/firefox/addon/soundcloud-duration-style/

## 🔧 Usage

1. Click the **SoundCloud Duration Style** icon in Firefox toolbar
2. Configure lens size, position, brightness, and contrast
3. Choose theme: Light / Dark / Auto (syncs with Firefox)
4. Click **Save Settings**
5. Reload any SoundCloud page to apply changes

## 🔒 Privacy Policy

This extension respects your privacy:

- ❌ **No data collection**: Does not collect, store, or transmit any personal information
- ❌ **No analytics**: No tracking scripts, telemetry, or third-party services
- ❌ **No network requests**: All code runs locally; no external API calls
- ✅ **Local storage only**: Settings saved via `browser.storage.local` (Firefox internal storage)
- ✅ **Open source**: Full source code available for independent audit
- ✅ **Minimal permissions**: Only `storage` and SoundCloud host permissions required

## 🛠️ Tech Stack

- **Manifest V3** (Firefox WebExtensions)
- **Vanilla JavaScript** (ES2022, no frameworks)
- **CSS Variables** for theming with `prefers-color-scheme` support
- **MutationObserver** for dynamic content handling
- **requestAnimationFrame** for smooth canvas rendering


## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

```text
MIT License

Copyright (c) 2026 pepeyc7526

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

