(function () {
  'use strict';

  var data = window.PORTFOLIO || { profile: {}, projects: [] };
  var profile = data.profile || {};
  var projects = (data.projects || []).filter(function (x) { return x && x.id; });
  var filter = null;
  var shown = {};
  var over = null, panel = null, openId = null;
  var step = 0;
  var baseTitle = document.title;

  function $(id) { return document.getElementById(id); }

  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
    for (var i = 2; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  function add(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { add(el, x); }); return; }
    el.append(c.nodeType ? c : document.createTextNode(String(c)));
  }

  /* Marks an element to fade up in turn on an animated render. */
  function rv(el) {
    el.classList.add('reveal');
    el.style.setProperty('--i', String(step++));
    return el;
  }

  function find(id) { return projects.filter(function (x) { return x.id === id; })[0] || null; }

  /* ---------- Theme ---------- */

  var themeBtn = $('theme');
  function systemDark() { return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; }
  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    return t ? t === 'dark' : systemDark();
  }
  function setTheme(t) {
    if (t) document.documentElement.setAttribute('data-theme', t);
    themeBtn.textContent = isDark() ? 'Light mode' : 'Dark mode';
  }
  try { setTheme(localStorage.getItem('theme')); } catch (e) { setTheme(null); }
  themeBtn.addEventListener('click', function () {
    var t = isDark() ? 'light' : 'dark';
    setTheme(t);
    try { localStorage.setItem('theme', t); } catch (e) {}
  });

  /* ---------- Cover ---------- */

  function cover() {
    $('headline').textContent = profile.headline || '';
    $('name').textContent = profile.name || '';
    $('about').textContent = profile.about || '';
    var links = [];
    if (profile.email) links.push({ label: profile.email, href: 'mailto:' + profile.email });
    (profile.links || []).forEach(function (l) { if (l && l.href) links.push(l); });
    $('contact').replaceChildren.apply($('contact'), links.map(function (l) {
      var ext = !/^mailto:/.test(l.href);
      return h('a', { href: l.href, target: ext ? '_blank' : null, rel: ext ? 'noopener' : null }, l.label || l.href);
    }));
    $('cover').classList.add('anim');
    Array.prototype.forEach.call($('cover').children, rv);
  }

  /* ---------- Grid ---------- */

  function skills() {
    var seen = {}, out = [];
    projects.forEach(function (x) { (x.tags || []).forEach(function (t) { if (!seen[t]) { seen[t] = 1; out.push(t); } }); });
    return out;
  }

  function filters() {
    var all = skills();
    var box = $('filters');
    if (all.length < 2) { box.hidden = true; return; }
    box.replaceChildren.apply(box, [null].concat(all).map(function (t) {
      return h('button', { class: 'filter', type: 'button', 'aria-pressed': filter === t ? 'true' : 'false',
        onclick: function () { filter = t; filters(); grid(false); } }, t || 'All');
    }));
  }

  function card(x) {
    var c = (x.images || [])[0];
    return h('a', { class: 'card', id: 'card-' + x.id, href: '#' + x.id, onclick: function (e) { e.preventDefault(); show(x.id); } },
      h('div', { class: 'pic' + (c ? '' : ' none') },
        c ? h('img', { src: c.src, alt: '', loading: 'lazy' }) : h('span', { 'aria-hidden': 'true' }, initials(x.title))),
      h('div', { class: 'body' },
        x.when ? h('div', { class: 'label' }, x.when) : null,
        h('h3', { class: 'name' }, x.title || 'Untitled project'),
        x.summary ? h('p', { class: 'teaser' }, x.summary.split('\n')[0]) : null));
  }

  function initials(t) {
    return (t || '?').split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
  }

  function grid(animated) {
    var list = filter ? projects.filter(function (x) { return (x.tags || []).indexOf(filter) >= 0; }) : projects;
    var g = $('grid');
    step = animated ? step : 0;
    g.className = 'grid' + (animated ? ' anim' : '');
    if (!list.length) { g.replaceChildren(h('div', { class: 'empty' }, 'No projects yet.')); }
    else g.replaceChildren.apply(g, list.map(function (x) { return animated ? rv(card(x)) : card(x); }));
    $('footer').textContent = projects.length + (projects.length === 1 ? ' project' : ' projects') +
      (profile.name ? '  ·  © ' + new Date().getFullYear() + ' ' + profile.name : '');
  }

  /* ---------- Project panel ---------- */

  function setHash(id) {
    var want = id ? '#' + id : '';
    if (location.hash === want) return;
    try { history.replaceState(null, '', want || location.pathname + location.search); } catch (e) { location.hash = id || ''; }
  }

  function show(id) {
    var x = find(id);
    if (!x) { closeOver(); return; }
    openId = id; setHash(id);
    document.title = x.title + ' | ' + (profile.name || 'Portfolio');
    if (over) { fill(x); over.scrollTop = 0; return; }
    panel = h('div', { class: 'panel' });
    over = h('dialog', { class: 'over', 'aria-label': x.title }, panel);
    over.addEventListener('click', function (e) { if (e.target === over) closeOver(); });
    over.addEventListener('cancel', function (e) { e.preventDefault(); closeOver(); });
    document.body.append(over);
    fill(x);
    over.showModal();
    over.scrollTop = 0;
    grow(id);
  }

  /* Animates the panel out of the card it was opened from. */
  function grow(id) {
    var from = $('card-' + id);
    var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!from || !panel.animate || calm) return;
    var a = from.getBoundingClientRect(), b = panel.getBoundingClientRect();
    if (!b.width || !b.height) return;
    var h0 = Math.min(b.height, window.innerHeight);
    panel.animate([
      { transformOrigin: '0 0', transform: 'translate(' + (a.left - b.left) + 'px,' + (a.top - b.top) + 'px) scale(' + (a.width / b.width) + ',' + (a.height / h0) + ')', opacity: 0.4 },
      { transformOrigin: '0 0', transform: 'none', opacity: 1 }
    ], { duration: 480, easing: 'cubic-bezier(.2, .8, .2, 1)' });
  }

  function closeOver() {
    var id = openId;
    openId = null; setHash('');
    document.title = baseTitle;
    if (!over) return;
    var d = over; over = null; panel = null;
    var fin = function () { if (d.open) d.close(); d.remove(); var c = $('card-' + id); if (c) c.focus({ preventScroll: true }); };
    if (!d.animate) { fin(); return; }
    var an = d.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: 'ease' });
    an.onfinish = fin; an.oncancel = fin;
  }

  function fill(x) {
    var imgs = x.images || [], tags = x.tags || [];
    var i = projects.indexOf(x);
    var prev = projects[i - 1], next = projects[i + 1];
    step = 0;
    panel.className = 'panel anim';
    panel.replaceChildren(
      h('div', { class: 'panel-head' },
        h('div', { class: 'right' }, x.when ? h('span', { class: 'label' }, x.when) : null),
        h('button', { class: 'btn small', type: 'button', onclick: closeOver }, 'Close')),
      h('div', { class: 'panel-body' },
        imgs.length ? rv(media(x)) : null,
        rv(h('h2', null, x.title || 'Untitled project')),
        tags.length ? rv(h('div', { class: 'block' },
          h('div', { class: 'label' }, 'Skills used'),
          h('div', { class: 'tags' }, tags.map(function (t) { return h('span', { class: 'tag' }, t); })))) : null,
        x.summary ? rv(h('div', { class: 'block' },
          h('div', { class: 'label' }, 'About this project'),
          h('p', { class: 'prose long' }, x.summary))) : null,
        prev || next ? rv(h('nav', { class: 'pager', 'aria-label': 'More projects' },
          prev ? h('button', { class: 'btn small', type: 'button', onclick: function () { show(prev.id); } }, '← ' + prev.title) : h('span'),
          next ? h('button', { class: 'btn small', type: 'button', onclick: function () { show(next.id); } }, next.title + ' →') : null)) : null));
  }

  function media(x) {
    var imgs = x.images;
    var cur = Math.min(shown[x.id] || 0, imgs.length - 1);
    var big = h('img', { src: imgs[cur].src, alt: imgs[cur].cap || x.title });
    var cap = h('div', { class: 'caption' }, imgs[cur].cap || '');
    var stage = h('button', { class: 'stage', type: 'button', 'aria-label': 'Open image full size', onclick: function () { lightbox(x, cur); } }, big);
    var thumbs = imgs.length > 1 ? h('div', { class: 'thumbs' }, imgs.map(function (im, n) {
      return h('button', { class: 'thumb', type: 'button', 'aria-label': 'Show image ' + (n + 1), 'aria-current': n === cur ? 'true' : 'false',
        onclick: function () {
          cur = n; shown[x.id] = n;
          big.src = im.src; big.alt = im.cap || x.title; cap.textContent = im.cap || '';
          big.classList.remove('swap'); void big.offsetWidth; big.classList.add('swap');
          Array.prototype.forEach.call(thumbs.children, function (b, k) { b.setAttribute('aria-current', k === n ? 'true' : 'false'); });
        } }, h('img', { src: im.src, alt: '', loading: 'lazy' }));
    })) : null;
    return h('div', { class: 'media' }, stage, cap, thumbs);
  }

  function lightbox(x, start) {
    var imgs = x.images, n = start, many = imgs.length > 1;
    var img = h('img', { alt: '' });
    var cap = h('span', { class: 'cap' });
    function go(k) {
      n = (k + imgs.length) % imgs.length;
      img.src = imgs[n].src; img.alt = imgs[n].cap || x.title;
      cap.textContent = (many ? (n + 1) + ' / ' + imgs.length + '   ' : '') + (imgs[n].cap || x.title);
    }
    var dlg = h('dialog', { class: 'lightbox', 'aria-label': 'Image viewer' },
      h('div', { class: 'inner' }, img,
        h('div', { class: 'bar' },
          many ? h('button', { class: 'btn small', type: 'button', onclick: function () { go(n - 1); } }, 'Previous') : null,
          cap,
          many ? h('button', { class: 'btn small', type: 'button', onclick: function () { go(n + 1); } }, 'Next') : null,
          h('button', { class: 'btn small', type: 'button', onclick: function () { dlg.close(); } }, 'Close'))));
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target === img || e.target.className === 'inner') dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (!many) return;
      if (e.key === 'ArrowLeft') go(n - 1);
      if (e.key === 'ArrowRight') go(n + 1);
    });
    dlg.addEventListener('close', function () { dlg.remove(); });
    document.body.append(dlg);
    go(start);
    dlg.showModal();
  }

  /* ---------- Start ---------- */

  cover();
  filters();
  grid(true);
  var target = location.hash.slice(1);
  if (target && find(target)) show(target);
  window.addEventListener('hashchange', function () {
    var id = location.hash.slice(1) || null;
    if (id === openId) return;
    if (id) show(id); else closeOver();
  });
})();
