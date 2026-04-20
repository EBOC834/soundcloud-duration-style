(function() {
  'use strict';

  const DEFAULTS = {
    magWidth: 100,
    magHeight: 40,
    positionRight: 0,
    positionTop: 15,
    captureWidth: 100,
    captureHeight: 48,
    captureY: 48,
    brightness: 200,
    contrast: 350,
    enabled: true
  };

  let settings = { ...DEFAULTS };
  const processedLayers = new Set();
  let observer = null;

  async function loadSettings() {
    try {
      const result = await browser.storage.local.get(DEFAULTS);
      settings = { ...DEFAULTS, ...result };
    } catch (e) {
      console.error('Failed to load settings:', e);
    }
  }

  browser.storage.onChanged.addListener((changes) => {
    for (const [key, value] of Object.entries(changes)) {
      if (key in settings) settings[key] = value.newValue;
    }
    recreateAllMagnifiers();
  });

  function createMagnifier(waveformLayer) {
    if (!settings.enabled) return;
    if (processedLayers.has(waveformLayer)) return;
    processedLayers.add(waveformLayer);

    const canvases = waveformLayer.querySelectorAll('canvas');
    if (canvases.length < 3) return;

    const sourceCanvas = canvases[2];

    const magCanvas = document.createElement('canvas');
    const intW = Math.round(settings.magWidth * 2.5);
    const intH = Math.round(settings.magHeight * 2.5);
    
    magCanvas.width = intW;
    magCanvas.height = intH;
    magCanvas.dataset.magnifier = 'true';

    const filter = `brightness(${settings.brightness}%) contrast(${settings.contrast}%)`;
    
    magCanvas.style.cssText = `
      position: absolute !important;
      width: ${settings.magWidth}px !important;
      height: ${settings.magHeight}px !important;
      right: ${settings.positionRight}px !important;
      top: ${settings.positionTop}px !important;
      pointer-events: none !important;
      filter: ${filter} !important;
      image-rendering: crisp-edges !important;
      z-index: 9999 !important;
    `;

    waveformLayer.appendChild(magCanvas);
    const ctx = magCanvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    function drawLoop() {
      if (!sourceCanvas.isConnected) return;
      ctx.clearRect(0, 0, intW, intH);

      const srcX = Math.max(0, sourceCanvas.width - settings.captureWidth);
      
      ctx.drawImage(
        sourceCanvas,
        srcX, settings.captureY, settings.captureWidth, settings.captureHeight,
        0, 0, intW, intH
      );

      requestAnimationFrame(drawLoop);
    }

    drawLoop();
  }

  function recreateAllMagnifiers() {
    document.querySelectorAll('[data-magnifier]').forEach(el => el.remove());
    processedLayers.clear();
    
    if (settings.enabled) {
      scanAndAttach();
    }
  }

  function scanAndAttach() {
    const layers = document.querySelectorAll('.waveform__layer');
    layers.forEach(layer => {
      if (layer.closest('li')) {
        createMagnifier(layer);
      }
    });
  }

  function cleanup() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    document.querySelectorAll('[data-magnifier]').forEach(el => el.remove());
  }

  async function init() {
    await loadSettings();
    
    setTimeout(() => {
      if (settings.enabled) {
        scanAndAttach();
      }
    }, 1000);

    observer = new MutationObserver(() => {
      setTimeout(() => {
        if (settings.enabled) {
          scanAndAttach();
        }
      }, 100);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    window.addEventListener('unload', cleanup);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
