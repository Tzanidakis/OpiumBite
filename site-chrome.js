document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger-menu');
    const navigation = document.getElementById('primary-navigation');

    if (!header || !hamburger || !navigation) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentNavLinks = {
        'about.html': 'about-link',
        'contact.html': 'contact-link',
        'grillz.html': 'collections-link',
        'classic.html': 'collections-link',
        'iced-out.html': 'collections-link',
        'capital-custom.html': 'collections-link',
        'bracelets.html': 'collections-link',
        'earrings.html': 'collections-link',
        'necklaces.html': 'collections-link',
        'rings.html': 'collections-link',
        'product.html': 'collections-link'
    };
    const currentNavLink = document.getElementById(currentNavLinks[currentPage]);
    if (currentNavLink) {
        currentNavLink.classList.add('active');
        currentNavLink.setAttribute('aria-current', 'page');
    }

    function isMobileNavigation() {
        return window.matchMedia('(max-width: 768px)').matches;
    }

    function syncNavigationAvailability(isOpen) {
        const unavailable = isMobileNavigation() && !isOpen;

        if ('inert' in navigation) {
            navigation.inert = unavailable;
        } else {
            navigation.querySelectorAll('a, button, input, select, textarea').forEach(function (control) {
                if (unavailable) {
                    control.dataset.menuTabindex = control.getAttribute('tabindex') || '';
                    control.setAttribute('tabindex', '-1');
                } else if (control.dataset.menuTabindex !== undefined) {
                    if (control.dataset.menuTabindex) control.setAttribute('tabindex', control.dataset.menuTabindex);
                    else control.removeAttribute('tabindex');
                    delete control.dataset.menuTabindex;
                }
            });
        }
    }

    function setMenuOpen(isOpen, returnFocus) {
        navigation.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        hamburger.textContent = isOpen ? 'close' : 'menu';
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
        if (event.target.closest('a')) setMenuOpen(false, false);
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

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) setMenuOpen(false, false);
        else syncNavigationAvailability(navigation.classList.contains('active'));
    });

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

    document.querySelectorAll('.product-item').forEach(function (item) {
        const name = item.querySelector('h3');
        item.setAttribute('role', 'link');
        item.setAttribute('tabindex', '0');
        if (name) item.setAttribute('aria-label', 'View ' + name.textContent.trim());
        item.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                item.click();
            }
        });
    });

    document.querySelectorAll('.newsletter-form').forEach(function (container, index) {
        const input = container.querySelector('input[type="email"]');
        const button = container.querySelector('button');
        if (!input || !button) return;

        const status = document.createElement('p');
        const statusId = 'newsletter-status-' + index;
        status.id = statusId;
        status.className = 'form-status';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        container.insertAdjacentElement('afterend', status);

        input.required = true;
        input.autocomplete = 'email';
        input.setAttribute('aria-describedby', statusId);
        button.setAttribute('type', 'button');

        function subscribe() {
            if (!input.checkValidity()) {
                status.textContent = 'Enter a valid email address.';
                input.reportValidity();
                return;
            }

            status.textContent = 'Opening your email app to confirm the subscription request.';
            const subject = encodeURIComponent('Newsletter subscription request');
            const body = encodeURIComponent('Please add ' + input.value.trim() + ' to the Opium Bite newsletter.');
            window.location.href = 'mailto:opiumbite@gmail.com?subject=' + subject + '&body=' + body;
        }

        button.addEventListener('click', subscribe);
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                subscribe();
            }
        });
    });
});
