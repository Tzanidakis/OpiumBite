document.addEventListener('DOMContentLoaded', () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        document.querySelectorAll('[data-reveal]').forEach(element => {
            element.classList.add('inside-enter');
            observer.observe(element);
        });
    }
    if (!reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.querySelectorAll('[data-spotlight]').forEach(card => {
            let frame = 0, x = 50, y = 50;
            card.addEventListener('pointermove', event => {
                const rect = card.getBoundingClientRect();
                x = (event.clientX - rect.left) / rect.width * 100;
                y = (event.clientY - rect.top) / rect.height * 100;
                if (!frame) frame = requestAnimationFrame(() => {
                    card.style.setProperty('--spot-x', x + '%');
                    card.style.setProperty('--spot-y', y + '%');
                    frame = 0;
                });
            }, { passive: true });
        });
    }
    const subject = document.getElementById('subject');
    const topics = document.querySelectorAll('[data-topic]');
    if (subject) {
        const sync = () => topics.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.topic === subject.value)));
        topics.forEach(button => button.addEventListener('click', () => {
            subject.value = button.dataset.topic;
            subject.dispatchEvent(new Event('change', { bubbles: true }));
        }));
        subject.addEventListener('change', sync);
        sync();
    }
    const message = document.getElementById('message');
    const count = document.getElementById('message-count');
    if (message && count) {
        const sync = () => { count.textContent = `${message.value.length} / ${message.maxLength}`; };
        message.addEventListener('input', sync);
        sync();
    }
});
