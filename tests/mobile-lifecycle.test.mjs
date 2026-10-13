import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(resolve(import.meta.dirname, '..', 'mobile-lifecycle.js'), 'utf8');

function classList() {
    const values = new Set();
    return {
        add: (...names) => names.forEach(name => values.add(name)),
        remove: (...names) => names.forEach(name => values.delete(name)),
        contains: name => values.has(name)
    };
}

function createEnvironment({ mobile = true, dirtyField = false, activeOperation = false, initialStorage = {} } = {}) {
    let now = 1_000;
    let reloads = 0;
    const documentListeners = new Map();
    const windowListeners = new Map();
    const storage = new Map(Object.entries(initialStorage));
    const body = { classList: classList(), firstChild: null };
    const screen = { classList: classList(), dataset: {}, style: {} };
    const documentElement = { classList: classList() };
    const field = {
        disabled: false,
        type: 'text',
        tagName: 'INPUT',
        value: dirtyField ? 'draft' : '',
        defaultValue: ''
    };

    const document = {
        activeElement: body,
        body,
        documentElement,
        fonts: null,
        hidden: false,
        images: [],
        readyState: 'complete',
        visibilityState: 'visible',
        wasDiscarded: false,
        addEventListener(type, handler) { documentListeners.set(type, handler); },
        createElement() { return { classList: classList(), dataset: {}, style: {} }; },
        elementFromPoint: null,
        getElementById(id) { return id === 'loading-screen' ? screen : null; },
        querySelector(selector) {
            if (activeOperation && selector.includes('[aria-busy="true"]')) return { nodeType: 1 };
            return null;
        },
        querySelectorAll(selector) {
            if (selector === 'input, textarea, select') return dirtyField ? [field] : [];
            return [];
        }
    };

    const location = {
        hash: '',
        href: 'https://example.test/about.html',
        pathname: '/about.html',
        search: '',
        reload() { reloads += 1; },
        replace() { reloads += 1; }
    };

    const window = {
        CSS: { escape: value => value },
        innerHeight: 800,
        innerWidth: 390,
        location,
        pageXOffset: 0,
        pageYOffset: 700,
        scrollX: 0,
        scrollY: 700,
        addEventListener(type, handler) { windowListeners.set(type, handler); },
        dispatchEvent() {},
        matchMedia(query) {
            return { matches: mobile && (query.includes('pointer: coarse') || query.includes('max-width')) };
        },
        requestAnimationFrame(callback) { callback(); return 1; },
        scrollBy(x, y) { this.scrollX += x; this.scrollY += y; },
        scrollTo(x, y) { this.scrollX = x; this.scrollY = y; },
        setTimeout(callback) { callback(); return 1; },
        clearTimeout() {}
    };

    class MockDate extends Date {
        static now() { return now; }
    }

    const sessionStorage = {
        getItem(key) { return storage.has(key) ? storage.get(key) : null; },
        removeItem(key) { storage.delete(key); },
        setItem(key, value) { storage.set(key, value); }
    };

    const sandbox = {
        Array,
        Boolean,
        CustomEvent: class CustomEvent { constructor(type) { this.type = type; } },
        Date: MockDate,
        HTMLMediaElement: { HAVE_CURRENT_DATA: 2, HAVE_METADATA: 1 },
        JSON,
        Math,
        Promise,
        URL,
        document,
        history: { scrollRestoration: 'auto' },
        navigator: {
            maxTouchPoints: mobile ? 5 : 0,
            platform: mobile ? 'iPhone' : 'MacIntel',
            userAgent: mobile ? 'Mozilla/5.0 (iPhone)' : 'Mozilla/5.0 (Macintosh)'
        },
        performance: { now: () => now },
        sessionStorage,
        window
    };

    vm.runInNewContext(source, sandbox, { filename: 'mobile-lifecycle.js' });

    return {
        document,
        documentListeners,
        reloads: () => reloads,
        screen,
        setNow(value) { now = value; },
        storage,
        window,
        windowListeners
    };
}

test('mobile return stores state, shows the existing loader, and reloads once', () => {
    const env = createEnvironment();
    env.document.visibilityState = 'hidden';
    env.document.hidden = true;
    env.documentListeners.get('visibilitychange')();

    env.setNow(2_000);
    env.document.visibilityState = 'visible';
    env.document.hidden = false;
    env.documentListeners.get('visibilitychange')();
    env.windowListeners.get('focus')();

    assert.equal(env.reloads(), 1);
    assert.equal(env.screen.style.display, 'flex');
    assert.equal(env.screen.dataset.restorePending, 'true');

    const restore = JSON.parse(env.storage.get('opiumBiteLifecycleRestoreV1'));
    assert.equal(restore.url, 'https://example.test/about.html');
    assert.equal(restore.y, 700);
    assert.equal(restore.reason, 'mobile-lifecycle-return');
});

test('unsaved form data suppresses the reload', () => {
    const env = createEnvironment({ dirtyField: true });
    env.document.visibilityState = 'hidden';
    env.documentListeners.get('visibilitychange')();
    env.setNow(2_000);
    env.document.visibilityState = 'visible';
    env.documentListeners.get('visibilitychange')();

    assert.equal(env.reloads(), 0);
    assert.equal(env.storage.has('opiumBiteLifecycleRestoreV1'), false);
});

test('an active operation suppresses the reload', () => {
    const env = createEnvironment({ activeOperation: true });
    env.document.visibilityState = 'hidden';
    env.documentListeners.get('visibilitychange')();
    env.setNow(2_000);
    env.document.visibilityState = 'visible';
    env.documentListeners.get('visibilitychange')();

    assert.equal(env.reloads(), 0);
});

test('a BFCache return participates in the same guarded reload flow', () => {
    const env = createEnvironment();
    env.windowListeners.get('pagehide')({ persisted: true });
    env.setNow(2_000);
    env.windowListeners.get('pageshow')({ persisted: true });

    assert.equal(env.reloads(), 1);
    assert.equal(env.screen.dataset.restorePending, 'true');
});

test('desktop sessions do not install mobile lifecycle listeners', () => {
    const env = createEnvironment({ mobile: false });
    assert.equal(env.documentListeners.has('visibilitychange'), false);
    assert.equal(env.windowListeners.has('focus'), false);
});

test('a refreshed document consumes restore state and restores scroll after layout readiness', async () => {
    const state = {
        url: 'https://example.test/about.html',
        route: '/about.html',
        x: 0,
        y: 700,
        anchor: null,
        containers: [],
        focusedElement: null,
        openDetails: [],
        savedAt: 1_000
    };
    const env = createEnvironment({
        initialStorage: { opiumBiteLifecycleRestoreV1: JSON.stringify(state) }
    });

    env.documentListeners.get('DOMContentLoaded')();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    assert.equal(env.window.scrollY, 700);
    assert.equal(env.storage.has('opiumBiteLifecycleRestoreV1'), false);
    assert.equal(env.screen.style.display, 'none');
    assert.equal(env.document.body.classList.contains('mobile-lifecycle-locked'), false);
});
