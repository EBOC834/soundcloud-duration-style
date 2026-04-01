(function() {
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
  
  if (typeof browser !== 'undefined' && browser.storage) {
    browser.storage.local.get({ theme: 'auto' }).then(s => {
      if (s.theme === 'auto') {
        setTheme(prefersDark ? 'dark' : 'light');
      } else {
        setTheme(s.theme);
      }
    }).catch(() => {});
  }
})();
