(function () {
  document.getElementById('year').textContent = new Date().getFullYear();

  var menuBtn = document.getElementById('menu-btn');
  var links = document.getElementById('nav-links');
  function closeMenu(returnFocus) {
    links.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    if (returnFocus) menuBtn.focus();
  }
  menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && links.classList.contains('open')) closeMenu(true);
  });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(false); });

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (n) { n.classList.add('is-visible'); });
  } else {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visible'); ro.unobserve(e.target); } });
    }, { threshold: .1 });
    reveals.forEach(function (n) { ro.observe(n); });
  }

  if ('IntersectionObserver' in window) {
    var anchors = [].slice.call(links.querySelectorAll('a[href^="#"]'));
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        anchors.forEach(function (a) {
          if (a.getAttribute('href') === '#' + e.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { so.observe(s); });
  }
})();
