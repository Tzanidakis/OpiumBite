/* Apply the saved theme before styles paint; existing appearance is Light. */
(function () {
    'use strict';
    const root = document.documentElement;
    const key = 'opiumBiteTheme';
    let theme = 'light';
    try { if (localStorage.getItem(key) === 'dark') theme = 'dark'; } catch (_) {}
    root.dataset.theme = theme;
    document.addEventListener('DOMContentLoaded', function () {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Dark mode');
        button.innerHTML = '<svg class="theme-sun" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="theme-moon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M20.5 14.1A8.6 8.6 0 0 1 9.9 3.5 8.6 8.6 0 1 0 20.5 14.1Z"/></svg>';
        const sync = () => {
            const dark=root.dataset.theme==='dark';
            button.setAttribute('aria-pressed',String(dark));
            button.setAttribute('title',dark?'Switch to light mode':'Switch to dark mode');
        };
        sync();
        button.addEventListener('click', function () {
            const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
            root.dataset.theme = next;
            try { localStorage.setItem(key, next); } catch (_) {}
            sync();
        });
        (document.querySelector('#main-header nav') || document.body).appendChild(button);
        window.addEventListener('storage', function (event) {
            if (event.key === key) { root.dataset.theme = event.newValue === 'dark' ? 'dark' : 'light'; sync(); }
        });
    });
})();
