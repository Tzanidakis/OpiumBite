/* An explicit refresh starts at the top; app-return restores keep their place. */
(function () {
    'use strict';
    const navigation = performance.getEntriesByType?.('navigation')[0];
    const isReload = navigation ? navigation.type === 'reload' : performance.navigation?.type === 1;
    if (!isReload) return;

    const restoreKey = 'opiumBiteLifecycleRestoreV1';
    let lifecycleReturn = false;
    try {
        const pending = JSON.parse(sessionStorage.getItem(restoreKey) || 'null');
        lifecycleReturn = Boolean(pending && pending.url === window.location.href &&
            pending.reason === 'mobile-lifecycle-return' &&
            Date.now() - pending.savedAt >= 0 && Date.now() - pending.savedAt < 15000);
        if (!lifecycleReturn) sessionStorage.removeItem(restoreKey);
    } catch (error) {
        // Refresh positioning still works when storage is unavailable.
    }
    if (lifecycleReturn) return;

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    // A fragment would otherwise re-anchor after the document has loaded.
    if (window.location.hash) {
        history.replaceState(history.state, '', window.location.pathname + window.location.search);
    }
    const reset = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    reset();
    document.addEventListener('DOMContentLoaded', reset, { once: true });
    window.addEventListener('load', reset, { once: true });
    window.addEventListener('pageshow', event => {
        if (!event.persisted) reset();
    }, { once: true });
})();
