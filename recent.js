/* ============================================================
   recent.js — Track recently viewed pages.
   Include at the bottom of any page that should be tracked.
   Stores the last 5 unique page visits in localStorage.
   ============================================================ */
(function () {
    var KEY = 'smc-recent-pages';
    var MAX = 5;

    // Page metadata — pull from <title> and header
    var titleEl = document.querySelector('.header__h1');
    var eyebrowEl = document.querySelector('.header__eyebrow');
    if (!titleEl) return; // not a trackable page

    var page = location.pathname.split('/').pop() || 'index.html';

    // Only track saveable content pages (protocol sections & calculators)
    var isSaveable = /^(airway-s\d+|airway-toc|vap-s\d+|vap-toc|sup-s\d+|sup-toc|ecmo-s\d+|ecmo-toc|nutr-s\d+|nutr-toc|calc-)/.test(page);
    if (!isSaveable) return;

    var entry = {
        href: page,
        title: titleEl.textContent.trim(),
        eyebrow: eyebrowEl ? eyebrowEl.textContent.trim() : '',
        time: Date.now()
    };

    try {
        var list = JSON.parse(localStorage.getItem(KEY) || '[]');
        // Remove duplicate
        list = list.filter(function (e) { return e.href !== page; });
        // Prepend
        list.unshift(entry);
        // Cap
        if (list.length > MAX) list = list.slice(0, MAX);
        localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) { /* ignore */ }
})();
