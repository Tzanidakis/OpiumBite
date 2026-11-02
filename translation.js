(function () {
    'use strict';
    const languageKey = 'opiumBiteLanguage';
    const catalog = window.OPIUM_TRANSLATIONS_EL || {};
    const folded = new Map(Object.entries(catalog).map(([en, el]) => [en.toLocaleLowerCase('en'), el]));
    const textRecords = new WeakMap();
    const attributeRecords = new WeakMap();
    const layoutRecords = new WeakMap();
    const skipSelector = 'script, style, noscript, textarea, input, .material-symbols-outlined, [data-no-translate], #language-toggle';
    const attributes = ['placeholder', 'aria-label', 'title', 'alt'];
    const normalize = value => value.replace(/\s+/g, ' ').trim();
    let currentLanguage = 'en';
    try { if (localStorage.getItem(languageKey) === 'el') currentLanguage = 'el'; } catch (error) { /* Language remains usable without storage. */ }

    function translate(value, language = currentLanguage) {
        if (language !== 'el') return value;
        const key = normalize(value);
        let translated = catalog[key] ?? folded.get(key.toLocaleLowerCase('en'));
        if (!translated && /^Size \d+$/.test(key)) translated = 'Μέγεθος ' + key.slice(5);
        if (!translated && key.startsWith('View ')) translated = 'Προβολή: ' + translate(key.slice(5), language);
        if (!translated && key.endsWith(' - Opium Bite')) translated = translate(key.slice(0, -13), language) + ' - Opium Bite';
        if (!translated) return value;
        return (value.match(/^\s*/)?.[0] || '') + translated + (value.match(/\s*$/)?.[0] || '');
    }

    function originalText(element) {
        if (!element) return '';
        const layout = layoutRecords.get(element);
        if (layout) return normalize(layout.english.replace(/<[^>]*>/g, ' '));
        return Array.from(element.childNodes).map(node => node.nodeType === 3
            ? (textRecords.get(node)?.english ?? node.nodeValue)
            : originalText(node)).join('');
    }

    function localizeText(node) {
        if (!node.parentElement || node.parentElement.closest(skipSelector + ', [data-i18n-el]')) return;
        let record = textRecords.get(node);
        if (!record || node.nodeValue !== record.rendered) record = { english: node.nodeValue };
        record.rendered = translate(record.english);
        if (node.nodeValue !== record.rendered) node.nodeValue = record.rendered;
        textRecords.set(node, record);
    }

    let observer;
    const observation = { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attributes };
    function refresh() {
        if (!document.body) return;
        observer?.disconnect();
        // Only trusted, locally authored editorial templates replace markup.
        document.querySelectorAll('[data-i18n-el]').forEach(element => {
            let record = layoutRecords.get(element);
            if (!record) record = { english: element.innerHTML };
            const markup = currentLanguage === 'el' ? element.getAttribute('data-i18n-el') : record.english;
            if (element.innerHTML !== markup) element.innerHTML = markup;
            layoutRecords.set(element, record);
        });
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) localizeText(walker.currentNode);
        document.querySelectorAll('[placeholder], [aria-label], [title], img[alt]').forEach(element => {
            if (element.closest('[data-no-translate], #language-toggle')) return;
            let records = attributeRecords.get(element);
            if (!records) records = new Map();
            attributes.forEach(attribute => {
                if (!element.hasAttribute(attribute)) return;
                const current = element.getAttribute(attribute);
                let record = records.get(attribute);
                if (!record || current !== record.rendered) record = { english: current };
                record.rendered = translate(record.english);
                if (current !== record.rendered) element.setAttribute(attribute, record.rendered);
                records.set(attribute, record);
            });
            attributeRecords.set(element, records);
        });
        const title = document.querySelector('title');
        if (title) {
            let record = textRecords.get(title);
            if (!record || document.title !== record.rendered) record = { english: document.title };
            record.rendered = translate(record.english);
            if (document.title !== record.rendered) document.title = record.rendered;
            textRecords.set(title, record);
        }
        document.documentElement.lang = currentLanguage;
        observer?.observe(document.body, observation);
    }

    function setLanguage(language) {
        currentLanguage = language === 'el' ? 'el' : 'en';
        try { localStorage.setItem(languageKey, currentLanguage); } catch (error) { /* Session-only translation still works. */ }
        refresh();
        const toggle = document.getElementById('language-toggle');
        if (toggle) {
            const toGreek = currentLanguage === 'en';
            toggle.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg><span>' + (toGreek ? 'GR' : 'EN') + '</span>';
            toggle.setAttribute('aria-label', toGreek ? 'Μετάφραση στα Ελληνικά' : 'Translate to English');
            toggle.title = toGreek ? 'Ελληνικά' : 'English';
        }
        window.dispatchEvent(new CustomEvent('opiumbite:language-change', { detail: { language: currentLanguage } }));
    }

    window.OpiumI18n = { t: translate, originalText, refresh, setLanguage, get language() { return currentLanguage; } };
    document.addEventListener('DOMContentLoaded', () => {
        const icons = document.querySelector('#main-header .icons');
        if (icons && !document.getElementById('language-toggle')) {
            icons.removeAttribute('aria-hidden');
            const toggle = document.createElement('button');
            toggle.id = 'language-toggle';
            toggle.className = 'language-toggle';
            toggle.type = 'button';
            toggle.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'el' : 'en'));
            icons.prepend(toggle);
        }
        observer = new MutationObserver(refresh);
        setLanguage(currentLanguage);
    });
})();
