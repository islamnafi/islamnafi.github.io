(function(){
  const storageKey = 'theme';
  const html = document.documentElement;

  function setTheme(theme){
    if(theme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');
    updateIcon();
  }

  function currentTheme(){
    return html.classList.contains('dark') ? 'dark' : 'light';
  }

  function updateIcon(){
    const btn = document.getElementById('theme-toggle');
    if(!btn) return;
    const icon = btn.querySelector('.material-icons');
    if(!icon) return;
    if(html.classList.contains('dark')) icon.textContent = 'dark_mode';
    else icon.textContent = 'light_mode';
  }

  // Initialize from localStorage or system
  (function init(){
    try {
      const saved = localStorage.getItem(storageKey);
      if(saved === 'dark' || saved === 'light') setTheme(saved);
      else setTheme('light');
    } catch { setTheme('light'); }
  })();

  // Wire toggle button
  window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if(btn){
      btn.addEventListener('click', () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        setTheme(next);
        try { localStorage.setItem(storageKey, next); } catch {}
      });
      updateIcon();
    }
  });

  // React to system theme changes if no saved preference
  if(window.matchMedia){
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', (e) => {
      try {
        const saved = localStorage.getItem(storageKey);
        if(saved === 'dark' || saved === 'light') setTheme(saved);
      } catch {}
    });
  }
})();