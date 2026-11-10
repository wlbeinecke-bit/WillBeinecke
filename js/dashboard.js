(function () {
  var root = document.getElementById('dash');
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function pct(done, total) { return total ? Math.round((done / total) * 100) : 0; }
  function bar(value, label) {
    var p = el('progress', 'bar');
    p.max = 100; p.value = value;
    p.setAttribute('aria-label', label);
    return p;
  }
  function render(data) {
    root.textContent = '';
    var tasks = data.tasks, done = tasks.filter(function (t) { return t.status === 'done'; }).length;
    var doing = tasks.filter(function (t) { return t.status === 'doing'; }).length;

    var overall = el('section', 'card overall');
    overall.appendChild(el('h2', null, 'Overall progress'));
    overall.appendChild(el('p', 'big', pct(done, tasks.length) + '%'));
    overall.appendChild(bar(pct(done, tasks.length), 'Overall progress'));
    overall.appendChild(el('p', 'muted', done + ' done · ' + doing + ' in progress · ' + (tasks.length - done - doing) + ' to do'));
    root.appendChild(overall);

    var grid = el('div', 'phases');
    data.phases.forEach(function (ph) {
      var pt = tasks.filter(function (t) { return t.phase === ph; });
      var pd = pt.filter(function (t) { return t.status === 'done'; }).length;
      var c = el('section', 'card');
      c.appendChild(el('h3', null, ph));
      c.appendChild(el('p', 'muted', pd + ' / ' + pt.length + ' tasks'));
      c.appendChild(bar(pct(pd, pt.length), ph + ' phase progress'));
      grid.appendChild(c);
    });
    root.appendChild(grid);

    var wrap = el('section', 'card');
    wrap.appendChild(el('h2', null, 'Tasks'));
    var table = el('table');
    var head = table.createTHead().insertRow();
    ['ID', 'Phase', 'Task', 'Status'].forEach(function (h) {
      var th = el('th', null, h); th.scope = 'col'; head.appendChild(th);
    });
    var body = table.createTBody();
    var labels = { todo: 'To do', doing: 'In progress', done: 'Done' };
    tasks.forEach(function (t) {
      var r = body.insertRow();
      var th = el('th', null, t.id); th.scope = 'row'; r.appendChild(th);
      r.insertCell().textContent = t.phase;
      r.insertCell().textContent = t.title;
      r.insertCell().appendChild(el('span', 'pill ' + t.status, labels[t.status] || t.status));
    });
    wrap.appendChild(table);
    root.appendChild(wrap);

    var u = new Date(data.updated);
    document.getElementById('updated').textContent = isNaN(u) ? '' : 'Updated ' + u.toLocaleString();
  }
  function load() {
    fetch('data/progress.json', { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(render)
      .catch(function () {
        root.textContent = 'Could not load progress data. Serve this folder over HTTP (python3 -m http.server) instead of opening the file directly.';
      });
  }
  load();
  setInterval(load, 5000);
})();
