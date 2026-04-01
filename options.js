(function() {
  const els = {
    scale: document.getElementById('scale'),
    scaleVal: document.getElementById('scaleVal'),
    colorBtns: document.querySelectorAll('.color-btn'),
    save: document.getElementById('save'),
    reset: document.getElementById('reset'),
    status: document.getElementById('status'),
    themeBtns: document.querySelectorAll('.theme-btn')
  };

  els.scale.addEventListener('input', e => els.scaleVal.textContent = e.target.value);

  function applyTheme(theme) {
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  function setActiveTheme(theme) {
    els.themeBtns.forEach(b => {
      b.classList.remove('active');
      if (b.dataset.theme === theme) b.classList.add('active');
    });
  }

  els.themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveTheme(btn.dataset.theme);
      applyTheme(btn.dataset.theme);
    });
  });

  els.colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      els.colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  function showStatus(message) {
    els.status.textContent = message;
    els.status.style.display = 'block';
    setTimeout(() => { els.status.style.display = 'none'; }, 2000);
  }

  els.save.addEventListener('click', async () => {
    const activeTheme = document.querySelector('.theme-btn.active').dataset.theme;
    const activeColor = document.querySelector('.color-btn.active').dataset.color;
    
    await browser.storage.local.set({
      scale: parseInt(els.scale.value),
      colorFilter: activeColor,
      theme: activeTheme
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
    els.scale.value = 100;
    els.scaleVal.textContent = '100';
    els.colorBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('[data-color="white"]').classList.add('active');
    setActiveTheme('auto');
    applyTheme('auto');
    showStatus('Settings reset to defaults!');
  });

  browser.storage.local.get({
    scale: 100,
    colorFilter: 'white',
    theme: 'auto'
  }).then(s => {
    els.scale.value = s.scale;
    els.scaleVal.textContent = s.scale;
    
    els.colorBtns.forEach(b => {
      b.classList.remove('active');
      if (b.dataset.color === s.colorFilter) b.classList.add('active');
    });
    
    if (!document.querySelector('.color-btn.active')) {
      document.querySelector('[data-color="white"]').classList.add('active');
    }
    
    setActiveTheme(s.theme);
    applyTheme(s.theme);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    browser.storage.local.get({ theme: 'auto' }).then(s => {
      if (s.theme === 'auto') applyTheme('auto');
    });
  });
})();
