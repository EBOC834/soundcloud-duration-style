(function() {
  const els = {
    enabledToggle: document.getElementById('enabledToggle'),
    magWidth: document.getElementById('magWidth'),
    magWidthVal: document.getElementById('magWidthVal'),
    magHeight: document.getElementById('magHeight'),
    magHeightVal: document.getElementById('magHeightVal'),
    positionRight: document.getElementById('positionRight'),
    positionRightVal: document.getElementById('positionRightVal'),
    positionTop: document.getElementById('positionTop'),
    positionTopVal: document.getElementById('positionTopVal'),
    brightness: document.getElementById('brightness'),
    brightnessVal: document.getElementById('brightnessVal'),
    contrast: document.getElementById('contrast'),
    contrastVal: document.getElementById('contrastVal'),
    save: document.getElementById('save'),
    reset: document.getElementById('reset'),
    status: document.getElementById('status'),
    themeBtns: document.querySelectorAll('.theme-btn')
  };

  const DEFAULTS = {
    theme: 'auto',
    magWidth: 100,
    magHeight: 40,
    positionRight: 0,
    positionTop: 15,
    brightness: 200,
    contrast: 350,
    enabled: true
  };

  let enabled = true;

  function applyTheme(theme) {
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  function setActiveTheme(theme) {
    els.themeBtns.forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
  }

  function initTheme() {
    browser.storage.local.get({ theme: 'auto' }).then(s => {
      setActiveTheme(s.theme);
      applyTheme(s.theme);
    });
  }

  els.themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.theme;
      setActiveTheme(t);
      applyTheme(t);
      browser.storage.local.set({ theme: t });
    });
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    browser.storage.local.get({ theme: 'auto' }).then(s => {
      if (s.theme === 'auto') applyTheme('auto');
    });
  });

  els.enabledToggle.addEventListener('click', () => {
    enabled = !enabled;
    els.enabledToggle.classList.toggle('active');
  });

  els.magWidth.addEventListener('input', e => els.magWidthVal.textContent = e.target.value);
  els.magHeight.addEventListener('input', e => els.magHeightVal.textContent = e.target.value);
  els.positionRight.addEventListener('input', e => els.positionRightVal.textContent = e.target.value);
  els.positionTop.addEventListener('input', e => els.positionTopVal.textContent = e.target.value);
  els.brightness.addEventListener('input', e => els.brightnessVal.textContent = e.target.value);
  els.contrast.addEventListener('input', e => els.contrastVal.textContent = e.target.value);

  function showStatus(message) {
    els.status.textContent = message;
    els.status.style.display = 'block';
    setTimeout(() => { els.status.style.display = 'none'; }, 2000);
  }

  els.save.addEventListener('click', async () => {
    const activeTheme = document.querySelector('.theme-btn.active').dataset.theme;
    await browser.storage.local.set({
      enabled: enabled,
      theme: activeTheme,
      magWidth: parseInt(els.magWidth.value),
      magHeight: parseInt(els.magHeight.value),
      positionRight: parseInt(els.positionRight.value),
      positionTop: parseInt(els.positionTop.value),
      brightness: parseInt(els.brightness.value),
      contrast: parseInt(els.contrast.value)
    });
    
    els.save.textContent = 'Saved!';
    els.save.classList.add('saved');
    showStatus('Settings applied! Reload SoundCloud to see changes.');
    
    setTimeout(() => {
      els.save.textContent = 'Save Settings';
      els.save.classList.remove('saved');
    }, 2000);
  });

  els.reset.addEventListener('click', async () => {
    await browser.storage.local.clear();
    
    enabled = true;
    els.enabledToggle.classList.add('active');
    setActiveTheme('auto');
    applyTheme('auto');
    
    els.magWidth.value = DEFAULTS.magWidth;
    els.magWidthVal.textContent = DEFAULTS.magWidth;
    els.magHeight.value = DEFAULTS.magHeight;
    els.magHeightVal.textContent = DEFAULTS.magHeight;
    els.positionRight.value = DEFAULTS.positionRight;
    els.positionRightVal.textContent = DEFAULTS.positionRight;
    els.positionTop.value = DEFAULTS.positionTop;
    els.positionTopVal.textContent = DEFAULTS.positionTop;
    els.brightness.value = DEFAULTS.brightness;
    els.brightnessVal.textContent = DEFAULTS.brightness;
    els.contrast.value = DEFAULTS.contrast;
    els.contrastVal.textContent = DEFAULTS.contrast;
    
    showStatus('Settings reset to defaults!');
  });

  browser.storage.local.get(DEFAULTS).then(s => {
    enabled = s.enabled;
    if (!enabled) els.enabledToggle.classList.remove('active');
    
    setActiveTheme(s.theme);
    applyTheme(s.theme);
    
    els.magWidth.value = s.magWidth;
    els.magWidthVal.textContent = s.magWidth;
    els.magHeight.value = s.magHeight;
    els.magHeightVal.textContent = s.magHeight;
    els.positionRight.value = s.positionRight;
    els.positionRightVal.textContent = s.positionRight;
    els.positionTop.value = s.positionTop;
    els.positionTopVal.textContent = s.positionTop;
    els.brightness.value = s.brightness;
    els.brightnessVal.textContent = s.brightness;
    els.contrast.value = s.contrast;
    els.contrastVal.textContent = s.contrast;
  });

  initTheme();
})();
