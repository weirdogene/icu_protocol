/* ============================================================
   settings-init.js — Apply saved settings before first paint.
   Injects critical dark-mode styles inline so they apply
   immediately regardless of external CSS caching.
   ============================================================ */
(function () {
    try {
        var raw = localStorage.getItem('smc-icu-settings');
        if (!raw) return;
        var s = JSON.parse(raw);

        // Language
        var lang = s.lang || 'ko';
        document.documentElement.setAttribute('data-lang', lang);

        // Font size
        if (s.font && s.font !== 'md') {
            document.documentElement.setAttribute('data-font', s.font);
        }

        // Theme
        var theme = s.theme || 'light';
        if (theme === 'system') theme = 'light'; // legacy fallback
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');

            // Inject critical dark styles inline — ensures dark mode
            // even if external CSS is cached or variables don't cascade.
            var st = document.createElement('style');
            st.id = 'smc-dark-inject';
            st.textContent = [
                /* ---- Root surfaces & text ---- */
                'html[data-theme="dark"]{',
                '  --bg-app:#0d1117;--bg-card:#161b22;--bg-accent:#1c2333;--bg-subtle:#1c2333;',
                '  --border-subtle:#2a3140;--border-strong:#3d4656;',
                '  --text-primary:#e6edf3;--text-secondary:#a8b5c4;--text-tertiary:#7d8a9a;',
                '  --smc-white:#e6edf3;--smc-black-90:#e6edf3;--smc-black-80:#c9d1d9;--smc-black-70:#a8b5c4;--smc-black-60:#7d8a9a;',
                '  --smc-blue:#3b82f6;--samsung-blue:#1e40af;',
                '  --cat-neurology:#60a5fa;--cat-cardiology:#f87171;--cat-pulmonology:#38bdf8;',
                '  --cat-gi:#fb923c;--cat-nephrology:#34d399;--cat-infection:#fb7185;--cat-procedure:#94a3b8;',
                '  --icon-ink:#93c5fd;--smc-red:#f87171;--smc-orange:#fb923c;--smc-green:#4ade80;--smc-purple:#a78bfa;',
                '  --shadow-xs:0 1px 2px rgba(0,0,0,.2);--shadow-sm:0 2px 8px rgba(0,0,0,.25);',
                '  --shadow-md:0 8px 24px rgba(0,0,0,.3);--shadow-lg:0 16px 40px rgba(0,0,0,.4);',
                '  --shadow-header:0 10px 32px rgba(0,0,0,.45);',
                '  color-scheme:dark;',
                '}',

                /* ---- Body ---- */
                'html[data-theme="dark"] body{background:#0d1117;color:#e6edf3}',
                'html[data-theme="dark"] body::before{background:radial-gradient(ellipse 90% 40% at 50% 0%,rgba(59,130,246,.08) 0%,rgba(59,130,246,.03) 45%,transparent 75%)}',

                /* ---- Header ---- */
                'html[data-theme="dark"] .header{background:linear-gradient(135deg,#1e40af 0%,#0f172a 100%)}',
                'html[data-theme="dark"] .header::before,html[data-theme="dark"] .header::after{background:radial-gradient(circle,rgba(96,165,250,.12) 0%,transparent 70%)}',
                'html[data-theme="dark"] .header__brand,html[data-theme="dark"] .header__h1{color:#e6edf3}',
                'html[data-theme="dark"] .header__eyebrow{color:rgba(230,237,243,.7)}',

                /* ---- Search ---- */
                'html[data-theme="dark"] .search__input{background:rgba(22,27,34,.95);border-color:rgba(59,130,246,.25);color:#e6edf3;box-shadow:0 4px 16px rgba(0,0,0,.3)}',

                /* ---- Bottom nav ---- */
                'html[data-theme="dark"] .bottom-nav{background:rgba(13,17,23,.96);border-top:1px solid rgba(59,130,246,.12);box-shadow:0 -8px 28px rgba(0,0,0,.3)}',

                /* ---- Toast ---- */
                'html[data-theme="dark"] .toast{background:#e6edf3;color:#0d1117}',

                /* ---- Bookmark ---- */
                'html[data-theme="dark"] .icon-btn--bookmark.is-saved{background:rgba(59,130,246,.2);border-color:rgba(59,130,246,.35)}',

                /* ---- Section / card ---- */
                'html[data-theme="dark"] .section__title{color:#e6edf3}',
                'html[data-theme="dark"] .card{background:#161b22;border-color:#2d3748}',

                /* ---- Protocol content (p-group, p-sub, p-item, etc.) ---- */
                'html[data-theme="dark"] .p-group{background:#161b22;border-color:#2d3748;box-shadow:0 2px 8px rgba(0,0,0,.3)}',
                'html[data-theme="dark"] .p-title{color:#e6edf3}',
                'html[data-theme="dark"] .p-sect__title{color:#e6edf3}',
                'html[data-theme="dark"] .p-sect__num{background:color-mix(in srgb,var(--cat-color) 15%,#161b22)}',
                'html[data-theme="dark"] .p-sect__hd{border-bottom-color:color-mix(in srgb,var(--cat-color) 35%,#2a3140)}',
                'html[data-theme="dark"] .p-sub{color:var(--cat-color);border-bottom-color:color-mix(in srgb,var(--cat-color) 25%,#2a3140)}',
                'html[data-theme="dark"] .p-item{color:#e6edf3}',
                'html[data-theme="dark"] .p-l2{color:#e6edf3}',
                'html[data-theme="dark"] .p-l2 .p-num{color:#e6edf3}',
                'html[data-theme="dark"] .p-l3{color:#d0d7e0}',
                'html[data-theme="dark"] .p-l3 .p-num{color:#a8b5c4}',
                'html[data-theme="dark"] .p-l4{color:#c0c8d4}',
                'html[data-theme="dark"] .p-l4 .p-num{color:#7d8a9a}',
                'html[data-theme="dark"] .p-l5{color:#a8b5c4}',
                'html[data-theme="dark"] .p-note{color:#a8b5c4}',
                'html[data-theme="dark"] .p-meta{color:#7d8a9a}',
                'html[data-theme="dark"] .p-end{color:#7d8a9a}',

                /* ---- Progress bar ---- */
                'html[data-theme="dark"] .sec-progress{background:#1c2333}',

                /* ---- Section dropdown ---- */
                'html[data-theme="dark"] .sec-dd__panel{background:#161b22;border-color:#2a3140;box-shadow:0 10px 28px rgba(0,0,0,.5)}',
                'html[data-theme="dark"] .sec-dd__scrim{background:rgba(0,0,0,.55)}',
                'html[data-theme="dark"] .sec-dd__title{color:#e6edf3}',
                'html[data-theme="dark"] .sec-dd__num{color:#7d8a9a}',

                /* ---- TOC ---- */
                'html[data-theme="dark"] .toc-item__title{color:#e6edf3}',
                'html[data-theme="dark"] .toc-item__num{color:#7d8a9a}',
                'html[data-theme="dark"] .toc-item:hover{background:#1c2333}',
                'html[data-theme="dark"] .toc-group__rule{background:#2a3140}',

                /* ---- Protocol card (category pages) ---- */
                'html[data-theme="dark"] .protocol-card{background:#161b22;border-color:#2d3748}',
                'html[data-theme="dark"] .protocol-card__title{color:#e6edf3}',
                'html[data-theme="dark"] .protocol-card__desc{color:#a8b5c4}',
                'html[data-theme="dark"] .protocol-card__num{background:color-mix(in srgb,var(--cat-color) 15%,#161b22)}',
                'html[data-theme="dark"] .protocol-card__foot{color:#7d8a9a}',
                'html[data-theme="dark"] .protocol-card__arrow{background:#1c2333}',

                /* ---- Index cat-cards ---- */
                'html[data-theme="dark"] .cat-card__name{color:#e6edf3}',
                'html[data-theme="dark"] .cat-card__count{color:#7d8a9a}',
                'html[data-theme="dark"] .cat-icon{background:#1c2333}',

                /* ---- Calculator ---- */
                'html[data-theme="dark"] .calc-intro__title{color:#e6edf3}',
                'html[data-theme="dark"] .calc-intro__desc{color:#a8b5c4}',
                'html[data-theme="dark"] .calc-field__label{color:#a8b5c4}',
                'html[data-theme="dark"] .calc-field__input{color:#e6edf3}',
                'html[data-theme="dark"] .calc-seg__btn{color:#e6edf3;background:#161b22;border-color:#2d3748}',
                'html[data-theme="dark"] .calc-seg__label{color:#a8b5c4}',
                'html[data-theme="dark"] .calc-toggle__btn{color:#a8b5c4}',
                'html[data-theme="dark"] .calc-toggle__btn[aria-pressed="true"]{background:#1c2333;color:#3b82f6}',
                'html[data-theme="dark"] .calc-seg__btn[aria-pressed="true"]{background:color-mix(in srgb,#3b82f6 12%,#161b22);border-color:#3b82f6}',
                'html[data-theme="dark"] .calc-result{background:linear-gradient(135deg,#1e40af 0%,#3b82f6 100%)}',
                'html[data-theme="dark"] .calc-interp__row{color:#e6edf3}',
                'html[data-theme="dark"] .calc-refs{color:#7d8a9a}',

                /* ---- Saved page ---- */
                'html[data-theme="dark"] .saved-item__title{color:#e6edf3}',
                'html[data-theme="dark"] .saved-item__num{color:var(--item-color,#3b82f6)}',

                /* ---- Settings page ---- */
                'html[data-theme="dark"] .seg__opt.is-active{background:#1c2333;box-shadow:0 1px 3px rgba(0,0,0,.3)}',

                /* ---- Search results ---- */
                'html[data-theme="dark"] .search-results{background:#161b22;border-color:#2a3140}',
                'html[data-theme="dark"] .sr-item__title{color:#e6edf3}',
                'html[data-theme="dark"] .sr-item__meta{color:#7d8a9a}',

                /* ---- Info page ---- */
                'html[data-theme="dark"] .info-disclaimer{background:color-mix(in srgb,#f87171 8%,#161b22);border-color:color-mix(in srgb,#f87171 25%,#2a3140)}',

            ].join('\n');
            document.head.appendChild(st);
        }
    } catch (e) { /* ignore parse errors */ }
})();
