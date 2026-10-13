(function () {
    'use strict';

    const DEVICE_QUERY = '(max-width: 1024px)';
    const STATE_KEY = 'opiumBiteLifecycleStateV1';
    const RESTORE_KEY = 'opiumBiteLifecycleRestoreV1';
    const RESTORE_TTL = 60 * 1000;
    const MIN_INACTIVE_TIME = 750;
    const MIN_LOADER_TIME = 900;
    const userAgent = navigator.userAgent || '';
    const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const isPhoneOrTablet = /Android|iPhone|iPad|iPod/i.test(userAgent) ||
        isIPadOS ||
        (window.matchMedia(DEVICE_QUERY).matches && hasCoarsePointer);
    let storedRestore = readStorage(RESTORE_KEY);
    const discardedState = readStorage(STATE_KEY);
    const currentUrl = window.location.href;
    const restoredAfterDiscard = Boolean(
        document.wasDiscarded &&
        discardedState &&
        discardedState.url === currentUrl
    );

    if (!storedRestore && restoredAfterDiscard) storedRestore = discardedState;

    const hasPendingRestore = Boolean(
        isPhoneOrTablet &&
        storedRestore &&
        storedRestore.url === currentUrl &&
        (restoredAfterDiscard || Date.now() - storedRestore.savedAt < RESTORE_TTL)
    );

    if (hasPendingRestore) {
        document.documentElement.classList.add('mobile-lifecycle-pending');
        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    } else if (storedRestore) {
        removeStorage(RESTORE_KEY);
        storedRestore = null;
    }

    if (!isPhoneOrTablet) return;

    let hiddenAt = 0;
    let wasInactive = false;
    let refreshStarted = false;
    let returnTimer = 0;
    let dirtySinceLoad = false;

    function readStorage(key) {
        try {
            const value = sessionStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            return null;
        }
    }

    function writeStorage(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            return false;
        }
    }

    function removeStorage(key) {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            // Storage can be unavailable in strict privacy modes.
        }
    }

    function escapeSelector(value) {
        if (window.CSS && typeof window.CSS.escape === 'function') return window.CSS.escape(value);
        return value.replace(/([ #;?%&,.+*~\':"!^$[\]()=>|/@])/g, '\\$1');
    }

    function stableSelector(element) {
        if (element.dataset && element.dataset.scrollRestore) {
            return '[data-scroll-restore="' + escapeSelector(element.dataset.scrollRestore) + '"]';
        }
        if (element.id) return '#' + escapeSelector(element.id);
        return null;
    }

    function captureScrollContainers() {
        const positions = [];
        const elements = document.querySelectorAll('[data-scroll-restore], [id]');

        elements.forEach(function (element) {
            if (positions.length >= 30) return;
            if (!element.scrollTop && !element.scrollLeft) return;
            if (element.scrollHeight <= element.clientHeight && element.scrollWidth <= element.clientWidth) return;
            const selector = stableSelector(element);
            if (!selector) return;
            positions.push({ selector: selector, top: element.scrollTop, left: element.scrollLeft });
        });

        return positions;
    }

    function captureAnchor() {
        if (!document.elementFromPoint) return null;
        let element = document.elementFromPoint(Math.round(window.innerWidth / 2), Math.round(window.innerHeight / 2));

        while (element && element !== document.body) {
            const selector = stableSelector(element);
            if (selector) {
                return { selector: selector, offset: element.getBoundingClientRect().top };
            }
            element = element.parentElement;
        }

        return null;
    }

    function captureState() {
        return {
            url: currentUrl,
            route: window.location.pathname + window.location.search + window.location.hash,
            x: window.scrollX || window.pageXOffset || 0,
            y: window.scrollY || window.pageYOffset || 0,
            anchor: captureAnchor(),
            containers: captureScrollContainers(),
            savedAt: Date.now()
        };
    }

    function saveInactiveState() {
        if (refreshStarted) return;
        if (!hiddenAt) hiddenAt = Date.now();
        wasInactive = true;
        writeStorage(STATE_KEY, captureState());
    }

    function formHasUnsavedWork() {
        if (dirtySinceLoad) return true;

        return Array.prototype.some.call(document.querySelectorAll('input, textarea, select'), function (field) {
            if (field.disabled || field.type === 'hidden' || field.type === 'submit' || field.type === 'button') return false;
            if (field.type === 'checkbox' || field.type === 'radio') return field.checked !== field.defaultChecked;
            if (field.tagName === 'SELECT') {
                return Array.prototype.some.call(field.options, function (option) {
                    return option.selected !== option.defaultSelected;
                });
            }
            return field.value !== field.defaultValue;
        });
    }

    function hasActiveOperation() {
        return Boolean(document.querySelector('[aria-busy="true"], [data-operation-active="true"], .operation-active'));
    }

    function ensureLoader() {
        let screen = document.getElementById('loading-screen');

        if (!screen) {
            screen = document.createElement('div');
            screen.id = 'loading-screen';
            screen.innerHTML = '<div class="device-loader" role="status" aria-label="Loading">' +
                '<span class="device-loader__label">LOADING</span>' +
                '<span class="device-loader__track" aria-hidden="true"><span class="device-loader__bar"></span></span>' +
                '</div>';
            document.body.insertBefore(screen, document.body.firstChild);
        }

        screen.classList.remove('slide-up');
        screen.classList.add('device-loading', 'lifecycle-refresh-screen');
        screen.style.display = 'flex';
        screen.dataset.restorePending = hasPendingRestore ? 'true' : 'false';
        document.body.classList.add('mobile-lifecycle-locked');
        return screen;
    }

    function restorePosition(state) {
        if (!state || state.url !== currentUrl) return;

        window.scrollTo(state.x || 0, state.y || 0);

        if (state.anchor && state.anchor.selector) {
            const anchor = document.querySelector(state.anchor.selector);
            if (anchor) {
                const difference = anchor.getBoundingClientRect().top - state.anchor.offset;
                if (Math.abs(difference) > 1) window.scrollBy(0, difference);
            }
        }

        (state.containers || []).forEach(function (position) {
            const element = document.querySelector(position.selector);
            if (element) {
                element.scrollTop = position.top || 0;
                element.scrollLeft = position.left || 0;
            }
        });
    }

    function waitForLayout() {
        const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready.catch(function () {}) : Promise.resolve();
        const imagesReady = Promise.allSettled(Array.prototype.map.call(document.images, function (image) {
            if (image.complete) return Promise.resolve();
            if (typeof image.decode === 'function') return image.decode().catch(function () {});
            return new Promise(function (resolve) {
                image.addEventListener('load', resolve, { once: true });
                image.addEventListener('error', resolve, { once: true });
            });
        }));
        const ready = Promise.all([fontsReady, imagesReady]);
        const timeout = new Promise(function (resolve) { window.setTimeout(resolve, 2200); });
        return Promise.race([ready, timeout]);
    }

    function finishInjectedLoader(screen, startedAt) {
        const remaining = Math.max(0, MIN_LOADER_TIME - (performance.now() - startedAt));
        window.setTimeout(function () {
            screen.classList.add('slide-up');
            window.setTimeout(function () {
                screen.style.display = 'none';
                document.body.classList.remove('mobile-lifecycle-locked');
                window.dispatchEvent(new CustomEvent('opiumbite:loader-finished'));
            }, 550);
        }, remaining);
    }

    function initializeRestore() {
        if (!hasPendingRestore) return;
        removeStorage(RESTORE_KEY);
        const screen = ensureLoader();
        const startedAt = performance.now();
        document.documentElement.classList.remove('mobile-lifecycle-pending');

        const begin = function () {
            waitForLayout().then(function () {
                const restoreDelays = [0, 120, 350, 650];

                function settlePosition(index) {
                    restorePosition(storedRestore);

                    if (index < restoreDelays.length - 1) {
                        window.setTimeout(function () {
                            settlePosition(index + 1);
                        }, restoreDelays[index + 1] - restoreDelays[index]);
                        return;
                    }

                    window.requestAnimationFrame(function () {
                        window.requestAnimationFrame(function () {
                            restorePosition(storedRestore);
                            screen.dataset.restorePending = 'false';
                            if ('scrollRestoration' in history) history.scrollRestoration = 'auto';
                            window.dispatchEvent(new CustomEvent('opiumbite:restore-complete'));

                            if (!document.getElementById('opening-video')) {
                                finishInjectedLoader(screen, startedAt);
                            }
                        });
                    });
                }

                settlePosition(0);
            });
        };

        if (document.readyState === 'complete') begin();
        else window.addEventListener('load', begin, { once: true });
    }

    function refreshAfterReturn() {
        returnTimer = 0;
        if (refreshStarted || !wasInactive || document.visibilityState === 'hidden') return;

        const inactiveFor = Date.now() - hiddenAt;
        wasInactive = false;
        hiddenAt = 0;

        if (inactiveFor < MIN_INACTIVE_TIME) return;
        if (formHasUnsavedWork() || hasActiveOperation()) return;

        const state = readStorage(STATE_KEY) || captureState();
        if (!state || state.url !== currentUrl) return;

        refreshStarted = true;
        const screen = ensureLoader();
        const startedAt = performance.now();
        screen.dataset.restorePending = 'false';

        // Visibility changes also happen for app switching, tab changes, and
        // permission prompts. Rehydrate the suspended page in place instead of
        // treating every return as a device unlock and forcing a destructive reload.
        waitForLayout().then(function () {
            restorePosition(state);
            window.dispatchEvent(new CustomEvent('opiumbite:lifecycle-resume'));
            finishInjectedLoader(screen, startedAt);
            refreshStarted = false;
        });
    }

    function scheduleReturnCheck() {
        if (!wasInactive || refreshStarted) return;
        window.clearTimeout(returnTimer);
        returnTimer = window.setTimeout(refreshAfterReturn, 120);
    }

    document.addEventListener('input', function (event) {
        if (event.target.matches('input, textarea, select, [contenteditable="true"]')) dirtySinceLoad = true;
    }, true);
    document.addEventListener('change', function (event) {
        if (event.target.matches('input, textarea, select')) dirtySinceLoad = true;
    }, true);
    document.addEventListener('submit', function () { dirtySinceLoad = false; }, true);
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') saveInactiveState();
        else scheduleReturnCheck();
    });
    document.addEventListener('freeze', saveInactiveState);
    document.addEventListener('resume', scheduleReturnCheck);
    window.addEventListener('pagehide', function () {
        if (!refreshStarted) writeStorage(STATE_KEY, captureState());
    });
    window.addEventListener('pageshow', scheduleReturnCheck);
    window.addEventListener('focus', scheduleReturnCheck);
    window.addEventListener('beforeunload', function () {
        if (!refreshStarted) writeStorage(STATE_KEY, captureState());
    });
    document.addEventListener('DOMContentLoaded', initializeRestore, { once: true });
})();
