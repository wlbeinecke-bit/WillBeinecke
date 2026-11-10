(function () {
  var root = document.documentElement;
  root.classList.add('js');
  try {
    var s = localStorage.getItem('theme');
    if (s === 'light' || s === 'dark') root.setAttribute('data-theme', s);
  } catch (e) {}
  window.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    function isDark() {
      var t = root.getAttribute('data-theme');
      return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    }
    function sync() {
      btn.setAttribute('aria-pressed', String(isDark()));
      btn.textContent = isDark() ? 'Light' : 'Dark';
    }
    btn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
    sync();
  });
})();
