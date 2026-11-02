document.addEventListener('DOMContentLoaded', () => {
    const skip = document.getElementById('intro-skip');
    const loading = document.getElementById('loading-screen');
    if (skip && loading) {
        skip.addEventListener('click', () => {
            loading.style.display = 'none';
            document.getElementById('main-content').style.visibility = 'visible';
            document.body.style.removeProperty('overflow');
            document.getElementById('opening-video')?.pause();
            skip.hidden = true;
            window.dispatchEvent(new CustomEvent('opiumbite:loader-finished'));
            document.querySelector('.atelier-hero .atelier-button')?.focus({ preventScroll: true });
        });
        const syncSkip = () => { skip.hidden = loading.style.display === 'none' || loading.classList.contains('slide-up') || loading.classList.contains('device-loading') || loading.classList.contains('lifecycle-refresh-screen'); };
        new MutationObserver(syncSkip).observe(loading, { attributes: true, attributeFilter: ['style', 'class'] });
        syncSkip();
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        document.querySelectorAll('.atelier-section-heading, .atelier-home .grillz-item, .atelier-commission, .atelier-home .location-card').forEach(item => {
            item.classList.add('atelier-reveal');
            observer.observe(item);
        });
    }
    const progress = document.createElement('div');
    progress.className = 'atelier-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.append(progress);
    let pending = false;
    const update = () => {
        const travel = document.documentElement.scrollHeight - innerHeight;
        progress.style.transform = `scaleX(${travel > 0 ? Math.min(1, Math.max(0, scrollY / travel)) : 0})`;
        pending = false;
    };
    window.addEventListener('scroll', () => {
        if (!pending) { pending = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
});

// Campaign interactions use only the site's own images and native browser APIs.
document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finishes = {
        gold: { image: 'media/ggz.webp?v=transparent-1', alt: 'Gold custom grillz', caption: '01 / GOLD — WARM. BOLD. TIMELESS.', link: 'classic.html', label: 'Explore classic grillz ' },
        silver: { image: 'media/uggz.webp?v=transparent-1', alt: 'Sculptural silver custom grillz', caption: '02 / SILVER — COOL. SCULPTURAL. DISTINCT.', link: 'capital-custom.html', label: 'Explore Opium grillz ' },
        iced: { image: 'media/dbbs.webp?v=transparent-1', alt: 'Iced out custom grillz', caption: '03 / ICED — LIGHT FROM EVERY ANGLE.', link: 'iced-out.html', label: 'Explore iced out grillz ' }
    };
    const display = document.querySelector('.finish-display');
    const finishImage = document.getElementById('finish-image');
    let animationFrame = 0;
    if (display && finishImage) {
        document.querySelectorAll('[data-finish].finish-option').forEach(button => {
            button.addEventListener('click', () => {
                const key = button.dataset.finish;
                const choice = finishes[key];
                if (!choice || button.getAttribute('aria-pressed') === 'true') return;
                document.querySelectorAll('.finish-option').forEach(option => {
                    const selected = option === button;
                    option.classList.toggle('is-selected', selected);
                    option.setAttribute('aria-pressed', String(selected));
                });
                finishImage.src = choice.image;
                finishImage.alt = choice.alt;
                display.dataset.finish = key;
                document.getElementById('finish-name').textContent = choice.caption;
                const link = document.getElementById('finish-link');
                link.href = choice.link;
                link.textContent = choice.label;
                const arrow = document.createElement('span');
                arrow.innerHTML = '<svg class="ui-symbol" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>';
                arrow.setAttribute('aria-hidden', 'true');
                link.append(arrow);
                display.classList.remove('is-switching');
                cancelAnimationFrame(animationFrame);
                animationFrame = requestAnimationFrame(() => display.classList.add('is-switching'));
            });
        });
    }
    const track = document.getElementById('signature-track');
    if (track) {
        const previous = document.getElementById('signature-prev');
        const next = document.getElementById('signature-next');
        const sync = () => {
            const max = track.scrollWidth - track.clientWidth;
            previous.disabled = track.scrollLeft <= 2;
            next.disabled = track.scrollLeft >= max - 2;
            document.querySelector('.signature-track-line').style.setProperty('--track-progress', `${max > 0 ? (track.scrollLeft / max) * 200 : 0}%`);
        };
        const move = direction => {
            const card = track.querySelector('.signature-card');
            const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
            track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
        };
        previous.addEventListener('click', () => move(-1));
        next.addEventListener('click', () => move(1));
        track.addEventListener('scroll', sync, { passive: true });
        track.addEventListener('keydown', event => {
            if (event.target !== track) return;
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault();
                move(event.key === 'ArrowRight' ? 1 : -1);
            }
        });
        window.addEventListener('resize', sync, { passive: true });
        sync();
    }
    // Pointer light is opt-in for precise pointers; touch devices keep native scrolling.
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion.matches) {
        document.querySelectorAll('.atelier-hero, .atelier-home .grillz-item').forEach(surface => {
            let frame = 0;
            let x = 50, y = 50;
            surface.addEventListener('pointermove', event => {
                const rect = surface.getBoundingClientRect();
                x = ((event.clientX - rect.left) / rect.width) * 100;
                y = ((event.clientY - rect.top) / rect.height) * 100;
                if (!frame) frame = requestAnimationFrame(() => {
                    surface.style.setProperty('--spot-x', x + '%');
                    surface.style.setProperty('--spot-y', y + '%');
                    surface.style.setProperty('--light-x', x + '%');
                    surface.style.setProperty('--light-y', y + '%');
                    frame = 0;
                });
            }, { passive: true });
        });
    }
    const hero = document.querySelector('.atelier-hero');
    if (hero && 'IntersectionObserver' in window) {
        const dock = document.createElement('nav');
        dock.className = 'atelier-dock';
        dock.setAttribute('aria-label', 'Custom jewelry enquiry');
        const caption = document.createElement('span');
        caption.textContent = 'SOMETHING ONLY YOU CAN WEAR.';
        const action = document.createElement('a');
        action.href = 'contact.html';
        const actionLabel = document.createElement('span');
        actionLabel.textContent = 'Create your piece';
        actionLabel.setAttribute('data-i18n-el', 'Δημιούργησε το κομμάτι σου');
        action.appendChild(actionLabel);
        const actionArrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        actionArrow.setAttribute('viewBox', '0 0 24 24');
        actionArrow.setAttribute('width', '18');
        actionArrow.setAttribute('height', '18');
        actionArrow.setAttribute('fill', 'none');
        actionArrow.setAttribute('stroke', 'currentColor');
        actionArrow.setAttribute('stroke-width', '1.5');
        actionArrow.setAttribute('aria-hidden', 'true');
        const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrowPath.setAttribute('d', 'M5 19 19 5M5 5h14v14');
        actionArrow.appendChild(arrowPath);
        action.appendChild(actionArrow);
        dock.append(caption, action);
        document.body.append(dock);
        let beyondHero = false, footerVisible = false;
        const syncDock = () => dock.classList.toggle('is-visible', beyondHero && !footerVisible && !document.body.classList.contains('menu-open'));
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.target === hero) beyondHero = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
                else footerVisible = entry.isIntersecting;
            });
            syncDock();
        });
        observer.observe(hero);
        const footer = document.querySelector('footer');
        if (footer) observer.observe(footer);
        new MutationObserver(syncDock).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }
});
