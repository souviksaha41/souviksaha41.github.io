/* Theme toggle. The <head> of each page sets data-theme before paint so
   there is no flash; this only wires the button. Storage is wrapped in
   try/catch because some browsers block site data. */
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function current() {
    return root.getAttribute('data-theme') || (prefersDark() ? 'dark' : 'light');
  }
  function paint() {
    var dark = current() === 'dark';
    btn.setAttribute('data-mode', dark ? 'dark' : 'light');
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  paint();
  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    paint();
  });
})();
