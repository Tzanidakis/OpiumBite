document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger-menu');
    const navigation = document.getElementById('primary-navigation');

    if (!header || !hamburger || !navigation) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentNavLinks = {
        'about.html': 'about-link',
        'contact.html': 'contact-link'
    };
    const currentNavLink = document.getElementById(currentNavLinks[currentPage]);
    if (currentNavLink) {
        currentNavLink.classList.add('active');
        currentNavLink.setAttribute('aria-current', 'page');
    }

    function setMenuOpen(isOpen) {
        navigation.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        hamburger.textContent = isOpen ? 'close' : 'menu';
    }

    hamburger.addEventListener('click', function () {
        setMenuOpen(!navigation.classList.contains('active'));
    });

    navigation.addEventListener('click', function (event) {
        if (event.target.closest('a')) setMenuOpen(false);
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('#main-header')) setMenuOpen(false);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && navigation.classList.contains('active')) {
            setMenuOpen(false);
            hamburger.focus();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 1024) setMenuOpen(false);
    });

    window.addEventListener('scroll', function () {
        header.classList.toggle('shrink', window.scrollY > 100);
    }, { passive: true });
});
