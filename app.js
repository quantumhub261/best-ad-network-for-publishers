(function () {
  'use strict';


  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll progress bar + gentle parallax on the hero art.
  var bar = document.querySelector('.progress i');
  var heroRoot = document.documentElement;
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var y = window.scrollY || window.pageYOffset || 0;
      if (bar) bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(y / h, 1) : 0) + ')';
      if (!reduce) heroRoot.style.setProperty('--sy', Math.min(y, 800));
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal blocks as they enter the viewport.
  var targets = document.querySelectorAll('.article > h2, .article .net, .article .tbl-wrap, .article .tbl-tools, .article .group-label, .article .faq h3, .article .band, .article > ol, .article > p, .article .fmt > div');
  if (!reduce && 'IntersectionObserver' in window) {
    var seen = 0;
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (el, i) {
      el.classList.add('rv');
      el.style.setProperty('--d', ((i % 3) * 0.06) + 's');
      rio.observe(el);
    });
  } else {
    targets.forEach(function (el) { el.classList.add('rv', 'in'); });
  }

  // Table of contents: highlight the section being read.
  var links = Array.prototype.slice.call(document.querySelectorAll('.rail a'));
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });
    var current = null;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          if (current) current.classList.remove('on');
          current = map[e.target.id];
          if (current) current.classList.add('on');
        }
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  // Comparison table filter.
  document.querySelectorAll('[data-filter-for]').forEach(function (bar) {
    var table = document.getElementById(bar.getAttribute('data-filter-for'));
    if (!table) return;
    var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));
    var status = bar.querySelector('.note');
    bar.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var kind = chip.getAttribute('data-kind');
        bar.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
        var shown = 0;
        rows.forEach(function (r) {
          var ok = kind === 'all' || (' ' + r.getAttribute('data-kind') + ' ').indexOf(' ' + kind + ' ') > -1;
          r.hidden = !ok;
          if (ok) shown++;
        });
        if (status) status.textContent = 'Showing ' + shown + ' of ' + rows.length + ' networks';
      });
    });
  });

  // Auction illustration: replay with new random bids.
  var auction = document.querySelector('.auction');
  if (auction) {
    var btn = auction.querySelector('.replay');
    var fills = Array.prototype.slice.call(auction.querySelectorAll('.fill'));
    var verdict = auction.querySelector('.verdict');
    var replay = function () {
      var widths = fills.map(function () { return 28 + Math.round(Math.random() * 52); });
      var max = Math.max.apply(null, widths);
      var winners = widths.filter(function (w) { return w === max; });
      if (winners.length > 1) widths[widths.indexOf(max)] = Math.min(max + 6, 96);
      max = Math.max.apply(null, widths);
      var winIdx = widths.indexOf(max);
      auction.classList.remove('play');
      fills.forEach(function (f, i) {
        f.style.setProperty('--w', widths[i] + '%');
        f.classList.toggle('win', i === winIdx);
      });
      void auction.offsetWidth;
      auction.classList.add('play');
      if (verdict) verdict.setAttribute('aria-hidden', 'true');
    };
    btn.addEventListener('click', replay);
    if (!reduce) {
      var hover = false;
      auction.addEventListener('mouseenter', function () { hover = true; });
      auction.addEventListener('mouseleave', function () { hover = false; });
      setInterval(function () { if (!hover && !document.hidden) replay(); }, 7500);
    }
  }
})();
