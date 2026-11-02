/* Optional tracking must check OpiumConsent.allowed() before loading. */
(function () {
    'use strict';
    const key = 'opiumBiteCookieConsent';
    let choice = null;
    try {
        const saved = JSON.parse(localStorage.getItem(key));
        if (saved && saved.version === 1 && ['accepted', 'rejected'].includes(saved.choice)) choice = saved.choice;
    } catch (_) { /* Keep controls usable when storage is unavailable. */ }
    window.OpiumConsent = { allowed: () => choice === 'accepted' };
    document.addEventListener('DOMContentLoaded', function () {
        const panel = document.createElement('section');
        panel.className = 'cookie-consent';
        panel.setAttribute('aria-label', 'Cookie preferences');
        panel.innerHTML = `<div><h2 data-i18n-el="Οι προτιμήσεις σου">Your preferences</h2><p data-i18n-el="Χρησιμοποιούμε τοπική αποθήκευση για τη γλώσσα, την εισαγωγή και την επιλογή σου. Δεν χρησιμοποιούμε αυτή τη στιγμή προαιρετικά cookies ανάλυσης ή διαφήμισης.">We use local storage for language, the intro and your choice. We currently use no optional analytics or advertising cookies.</p></div><div class="cookie-actions"><button type="button" data-choice="rejected" data-i18n-el="Απόρριψη προαιρετικών">Reject optional</button><button type="button" data-choice="accepted" data-i18n-el="Αποδοχή προαιρετικών">Accept optional</button></div>`;
        panel.hidden = choice !== null;
        document.body.appendChild(panel);
        const settings = document.createElement('button');
        settings.type = 'button';
        settings.className = 'cookie-settings';
        settings.textContent = 'Cookie preferences';
        settings.setAttribute('data-i18n-el', 'Προτιμήσεις cookies');
        (document.querySelector('.footer-bottom') || document.body).appendChild(settings);
        let returnFocus;
        settings.addEventListener('click', function () {
            returnFocus = settings;
            panel.hidden = false;
            panel.querySelector('button').focus();
        });
        panel.addEventListener('click', function (event) {
            const button = event.target.closest('[data-choice]');
            if (!button) return;
            choice = button.dataset.choice;
            try { localStorage.setItem(key, JSON.stringify({ version: 1, choice, updatedAt: Date.now() })); } catch (_) {}
            panel.hidden = true;
            returnFocus?.focus();
            window.dispatchEvent(new CustomEvent('opium:consent', { detail: { optional: choice === 'accepted' } }));
        });
    });
})();
