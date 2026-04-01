(function() {
  'use strict';

  let settings = {
    scale: 100,
    colorFilter: 'white'
  };

  let observer = null;

  async function loadSettings() {
    try {
      const result = await browser.storage.local.get(settings);
      settings = { ...settings, ...result };
    } catch (e) { console.error(e); }
  }

  browser.storage.onChanged.addListener((changes) => {
    for (const [key, value] of Object.entries(changes)) {
      if (key in settings) settings[key] = value.newValue;
    }
    applyStyleToLastCanvas();
  });

  function getColorFilter(color) {
    const filters = {
      'white': 'grayscale(1) brightness(6)',
      'orange': 'grayscale(1) brightness(4) sepia(1) saturate(100) hue-rotate(314deg)',
      'red': 'grayscale(1) brightness(1) sepia(1) saturate(100) hue-rotate(360deg)',
      'green': 'grayscale(1) brightness(9) sepia(1) saturate(100) hue-rotate(420deg)',
      'cyan': 'grayscale(1) brightness(5) sepia(1) saturate(100) hue-rotate(480deg)',
      'blue': 'grayscale(1) brightness(1) sepia(1) saturate(105) hue-rotate(590deg)',
      'purple': 'grayscale(1) brightness(1) sepia(1) saturate(100) hue-rotate(290deg)',
      'pink': 'grayscale(1) brightness(7) sepia(1) saturate(100) hue-rotate(-429deg)'
    };
    return filters[color] || '';
  }

  function applyStyleToLastCanvas() {
    const scale = settings.scale;
    const colorFilter = getColorFilter(settings.colorFilter);
    const leftOffset = -(scale - 100);
    const topOffset = Math.round(-(scale - 100) * 0.45 + 27);

    document.querySelectorAll('.waveform').forEach(waveform => {
      const canvases = waveform.querySelectorAll('.g-box-full.sceneLayer');
      
      if (canvases.length > 0) {
        const lastCanvas = canvases[canvases.length - 1];
        
        if (!lastCanvas.dataset.scaled) {
          lastCanvas.style.height = scale + '%';
          lastCanvas.style.width = scale + '%';
          lastCanvas.style.left = leftOffset + '%';
          lastCanvas.style.top = topOffset + '%';
          lastCanvas.style.position = 'absolute';
          if (colorFilter) {
            lastCanvas.style.filter = colorFilter;
          }
          lastCanvas.dataset.scaled = 'true';
        }
      }
    });
  }

  function cleanup() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  function init() {
    loadSettings();
    applyStyleToLastCanvas();

    observer = new MutationObserver(() => {
      setTimeout(applyStyleToLastCanvas, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    window.addEventListener('unload', cleanup);
  } else {
    init();
    window.addEventListener('unload', cleanup);
  }
})();
