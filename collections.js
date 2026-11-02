// Motion is optional: content and navigation remain usable without JavaScript.
(function () {
    'use strict';
    const categoryNav = document.querySelector('.collection-nav');
    const currentCategory = categoryNav?.querySelector('[aria-current="page"]');
    if (categoryNav && currentCategory && window.matchMedia('(max-width:768px)').matches) {
        // Center only the horizontal strip without moving the document or intro.
        categoryNav.scrollLeft = currentCategory.offsetLeft - (categoryNav.clientWidth - currentCategory.offsetWidth) / 2;
    }
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const nodes = document.querySelectorAll('.collections-editorial .product-item, .collections-editorial .grillz-item, .collection-section-heading, .collection-commission');
    let observer;
    function revealAll() {
        document.body.classList.remove('collections-motion');
        nodes.forEach(node => node.classList.add('is-visible'));
        observer?.disconnect();
    }
    if (!motion.matches && 'IntersectionObserver' in window) {
        try {
            observer = new IntersectionObserver(entries => {
                for (const entry of entries) if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            }, {threshold:.05});
            nodes.forEach((node,index) => {
                node.classList.add('collection-reveal');
                node.style.setProperty('--reveal-delay', (index % 3) * 60 + 'ms');
                observer.observe(node);
            });
            document.body.classList.add('collections-motion');
        } catch (error) { revealAll(); }
    }
    motion.addEventListener?.('change', event => { if (event.matches) revealAll(); });
    // Reveal content for anchor and keyboard navigation, even before scrolling.
    document.addEventListener('focusin', event => {
        const card = event.target.closest('.collection-reveal');
        if (card) card.classList.add('is-visible');
    });
})();
