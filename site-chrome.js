document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger-menu');
    const navigation = document.getElementById('primary-navigation');

    if (!header || !hamburger || !navigation) return;

    const pageName = window.location.pathname.split('/').filter(Boolean).pop() || 'index';
    const currentPage = pageName.endsWith('.html') ? pageName : pageName + '.html';
    const currentNavLinks = {
        'index.html': 'home-link',
        'about.html': 'about-link',
        'contact.html': 'contact-link',
        'grillz.html': 'collections-link',
        'classic.html': 'collections-link',
        'iced-out.html': 'collections-link',
        'capital-custom.html': 'collections-link',
        'earrings.html': 'collections-link',
        'necklaces.html': 'collections-link',
        'product.html': 'collections-link'
    };
    const currentNavLink = document.getElementById(currentNavLinks[currentPage]);
    if (currentNavLink) {
        currentNavLink.classList.add('active');
        currentNavLink.setAttribute('aria-current', 'page');
    }

    const compactNavigation = window.matchMedia('(max-width: 1100px), (hover: none) and (pointer: coarse)');
    function isMobileNavigation() { return compactNavigation.matches; }

    function syncNavigationAvailability(isOpen) {
        const unavailable = isMobileNavigation() && !isOpen;

        if ('inert' in navigation) {
            navigation.inert = unavailable;
        } else {
            navigation.querySelectorAll('a, button, input, select, textarea').forEach(function (control) {
                if (unavailable) {
                    if (control.dataset.menuTabindex === undefined) control.dataset.menuTabindex = control.getAttribute('tabindex') || '';
                    control.setAttribute('tabindex', '-1');
                } else if (control.dataset.menuTabindex !== undefined) {
                    if (control.dataset.menuTabindex) control.setAttribute('tabindex', control.dataset.menuTabindex);
                    else control.removeAttribute('tabindex');
                    delete control.dataset.menuTabindex;
                }
            });
        }
    }

    // Move the existing controls so their settings and listeners stay intact.
    const preferences = document.createElement('div');
    preferences.className = 'mobile-menu-preferences';
    preferences.setAttribute('role', 'group');
    preferences.setAttribute('aria-label', 'Language');
    navigation.appendChild(preferences);
    const preferenceHomes = new Map();

    function syncPreferenceLocation() {
        const mobile = isMobileNavigation();
        if (!mobile) syncNavigationAvailability(false);
        [
            '.language-toggle'
        ].forEach(function (selector) {
            const control = header.querySelector(selector);
            if (!control) return;
            if (!preferenceHomes.has(control)) {
                const home = document.createComment('preference control');
                control.parentNode.insertBefore(home, control);
                const row = document.createElement('div');
                row.className = 'menu-preference-row';
                preferences.appendChild(row);
                preferenceHomes.set(control, { home, row });
            }
            const { home, row } = preferenceHomes.get(control);
            if (mobile && control.parentNode !== row) row.appendChild(control);
            else if (!mobile && control.parentNode !== home.parentNode) {
                home.parentNode.insertBefore(control, home.nextSibling);
            }
        });
        syncNavigationAvailability(navigation.classList.contains('active'));
    }
    // The language control initializes after this file's DOMContentLoaded handler.
    window.addEventListener('opiumbite:language-change', syncPreferenceLocation);
    window.addEventListener('load', syncPreferenceLocation, { once: true });
    window.requestAnimationFrame(syncPreferenceLocation);

    // Phones and tablets use tap-to-open collection groups.
    const dropdowns = Array.from(navigation.querySelectorAll('.dropdown, .submenu')).map((group, index) => {
        const trigger = group.querySelector(':scope > a');
        const panel = group.querySelector(':scope > .dropdown-content, :scope > .submenu-content');
        if (!trigger || !panel) return null;
        panel.id = 'navigation-panel-' + index;
        const viewAll = document.createElement('a');
        viewAll.className = 'mobile-collection-overview';
        viewAll.href = trigger.getAttribute('href');
        const root = group.classList.contains('dropdown');
        viewAll.textContent = root ? 'View all collections' : 'View collection';
        viewAll.setAttribute('data-i18n-el', root ? 'Όλες οι συλλογές' : 'Προβολή συλλογής');
        panel.prepend(viewAll);
        const item = { group, trigger, panel, expanded: false };
        trigger.addEventListener('click', event => {
            if (!isMobileNavigation()) return;
            event.preventDefault();
            item.expanded = !item.expanded;
            if (!item.expanded) dropdowns.forEach(child => {
                if (child !== item && panel.contains(child.group)) child.expanded = false;
            });
            syncDropdowns();
        });
        trigger.addEventListener('keydown', event => {
            if (isMobileNavigation() && event.key === ' ') {
                event.preventDefault();
                trigger.click();
            }
        });
        return item;
    }).filter(Boolean);

    function syncDropdowns() {
        const mobile = isMobileNavigation();
        dropdowns.forEach(({ trigger, panel, expanded }) => {
            panel.hidden = mobile && !expanded;
            if ('inert' in panel) panel.inert = mobile && !expanded;
            if (mobile) {
                trigger.setAttribute('role', 'button');
                trigger.setAttribute('aria-expanded', String(expanded));
                trigger.setAttribute('aria-controls', panel.id);
            } else {
                trigger.removeAttribute('role');
                trigger.removeAttribute('aria-expanded');
                trigger.removeAttribute('aria-controls');
            }
        });
    }
    function collapseMobileDropdowns() {
        dropdowns.forEach(item => { item.expanded = false; });
        syncDropdowns();
    }
    syncDropdowns();

    function setMenuOpen(isOpen, returnFocus) {
        navigation.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        hamburger.textContent = isOpen ? 'close' : 'menu';
        if (!isOpen) collapseMobileDropdowns();
        syncNavigationAvailability(isOpen);

        if (isOpen) {
            const firstLink = navigation.querySelector('a');
            if (firstLink) firstLink.focus();
        } else if (returnFocus) {
            hamburger.focus();
        }
    }

    hamburger.addEventListener('click', function () {
        setMenuOpen(!navigation.classList.contains('active'), false);
    });

    navigation.addEventListener('click', function (event) {
        if (event.defaultPrevented) return;
        if (isMobileNavigation() && event.target.closest('a')) setMenuOpen(false, false);
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('#main-header')) setMenuOpen(false, false);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && navigation.classList.contains('active')) {
            setMenuOpen(false, true);
        }

        if (event.key === 'Tab' && navigation.classList.contains('active')) {
            const focusable = Array.from(navigation.querySelectorAll('a, button, input, select, textarea'))
                .filter(function (control) { return !control.disabled && control.offsetParent !== null; });
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    function syncNavigationMode() {
        syncPreferenceLocation();
        syncDropdowns();
        if (!isMobileNavigation()) setMenuOpen(false, false);
        else syncNavigationAvailability(navigation.classList.contains('active'));
    }
    window.addEventListener('resize', syncNavigationMode);
    compactNavigation.addEventListener('change', syncNavigationMode);

    let headerFrame = 0;
    function updateHeader() {
        headerFrame = 0;
        const isShrunk = window.scrollY > 100;
        header.classList.toggle('shrink', isShrunk);
        document.body.classList.toggle('header-shrunk', isShrunk);
    }
    window.addEventListener('scroll', function () {
        if (!headerFrame) headerFrame = window.requestAnimationFrame(updateHeader);
    }, { passive: true });

    updateHeader();
    syncNavigationAvailability(false);

    document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
        link.rel = 'noopener noreferrer';
    });


});
