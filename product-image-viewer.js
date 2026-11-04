(() => {
    'use strict';
    const source = document.getElementById('product-img');
    if (!source) return;
    const tr = (en, el) => document.documentElement.lang === 'el' ? el : en;
    source.tabIndex = 0;
    source.setAttribute('role', 'button');
    source.setAttribute('aria-haspopup', 'dialog');
    const dialog = document.createElement('dialog');
    dialog.className = 'product-image-viewer';
    dialog.setAttribute('aria-labelledby', 'image-viewer-title');
    dialog.innerHTML = `<div class="image-viewer-toolbar"><h2 id="image-viewer-title"></h2><div class="image-viewer-controls"><button type="button" data-zoom="out">−</button><button type="button" data-zoom="reset">100%</button><button type="button" data-zoom="in">+</button><button type="button" data-close>×</button></div></div><p id="image-viewer-help"></p><div class="image-viewer-stage"><img alt="" draggable="false"><button type="button" class="product-gallery-arrow is-previous" data-photo-step="-1" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg></button><button type="button" class="product-gallery-arrow is-next" data-photo-step="1" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m10 6 6 6-6 6"/></svg></button><p class="image-viewer-error" hidden></p></div>`;
    document.body.append(dialog);
    const stage = dialog.querySelector('.image-viewer-stage');
    const image = stage.querySelector('img');
    const error = stage.querySelector('.image-viewer-error');
    const reset = dialog.querySelector('[data-zoom="reset"]');
    let scale = 1, x = 0, y = 0, previousOverflow = '', returnFocus;
    const pointers = new Map();
    const galleryButtons = Array.from(dialog.querySelectorAll('[data-photo-step]'));
    const photoCount = () => Number(source.dataset.photoCount) || 1;
    const stepPhoto = step => source.dispatchEvent(new CustomEvent('opiumbite:photo-step', {detail:{step}}));
    galleryButtons.forEach(button => button.addEventListener('click', () => stepPhoto(Number(button.dataset.photoStep))));
    source.addEventListener('opiumbite:photo-change', event => {
        galleryButtons.forEach(button => { button.hidden = event.detail.total < 2; });
        if (!dialog.open) return;
        image.src = event.detail.src; image.alt = event.detail.alt;
        error.hidden = true; scale = 1; x = y = 0; pointers.clear(); paint();
    });
    function paint() {
        const bounds = stage.getBoundingClientRect();
        const fit = Math.min(bounds.width / (image.naturalWidth || 1), bounds.height / (image.naturalHeight || 1));
        const maxX = Math.max(0, ((image.naturalWidth || 1) * fit * scale - bounds.width) / 2);
        const maxY = Math.max(0, ((image.naturalHeight || 1) * fit * scale - bounds.height) / 2);
        x = Math.max(-maxX, Math.min(maxX, x)); y = Math.max(-maxY, Math.min(maxY, y));
        image.style.transform = `translate(${x}px,${y}px) scale(${scale})`;
        reset.textContent = Math.round(scale * 100) + '%';
        stage.classList.toggle('is-zoomed', scale > 1);
        dialog.querySelector('[data-zoom="out"]').disabled = scale <= 1;
        dialog.querySelector('[data-zoom="in"]').disabled = scale >= 5;
    }
    function zoom(value, clientX, clientY) {
        const next = Math.max(1, Math.min(5, value));
        const rect = stage.getBoundingClientRect();
        const px = (clientX ?? rect.left + rect.width / 2) - rect.left - rect.width / 2;
        const py = (clientY ?? rect.top + rect.height / 2) - rect.top - rect.height / 2;
        x = px - (px - x) * next / scale; y = py - (py - y) * next / scale;
        scale = next; paint();
    }
    function labels() {
        source.setAttribute('aria-label', tr('Open product photo and zoom', 'Άνοιγμα και μεγέθυνση φωτογραφίας προϊόντος'));
        dialog.querySelector('h2').textContent = tr('Product photo', 'Φωτογραφία προϊόντος');
        dialog.querySelector('#image-viewer-help').textContent = tr('Pinch or scroll to zoom. Drag to explore. Double-tap to zoom or reset.', 'Άνοιξε δύο δάχτυλα ή κύλησε για μεγέθυνση. Σύρε για μετακίνηση. Διπλό πάτημα για μεγέθυνση ή επαναφορά.');
        for (const [selector, en, el] of [['in','Zoom in','Μεγέθυνση'],['out','Zoom out','Σμίκρυνση'],['reset','Reset zoom','Επαναφορά μεγέθυνσης']]) dialog.querySelector(`[data-zoom="${selector}"]`).setAttribute('aria-label', tr(en,el));
        dialog.querySelector('[data-close]').setAttribute('aria-label', tr('Close photo', 'Κλείσιμο φωτογραφίας'));
        dialog.querySelector('[data-photo-step="-1"]').setAttribute('aria-label', tr('Previous photo', 'Προηγούμενη φωτογραφία'));
        dialog.querySelector('[data-photo-step="1"]').setAttribute('aria-label', tr('Next photo', 'Επόμενη φωτογραφία'));
    }
    function open() {
        if (dialog.open || source.hidden || !source.complete || !source.naturalWidth) return;
        returnFocus = document.activeElement;
        image.src = source.currentSrc || source.src; image.alt = source.alt;
        error.hidden = true; scale = 1; x = y = 0; pointers.clear(); labels();
        galleryButtons.forEach(button => { button.hidden = photoCount() < 2; });
        previousOverflow = document.body.style.overflow;
        dialog.showModal(); document.body.style.overflow = 'hidden'; paint();
        dialog.querySelector('[data-close]').focus();
    }
    source.addEventListener('click', open);
    source.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
    });
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
        document.body.style.overflow = previousOverflow; pointers.clear();
        returnFocus?.focus({preventScroll:true});
    });
    dialog.addEventListener('click', event => {
        const button = event.target.closest('[data-zoom]');
        if (button) zoom(button.dataset.zoom === 'reset' ? 1 : scale + (button.dataset.zoom === 'in' ? .5 : -.5));
    });
    dialog.addEventListener('keydown', event => {
        if (scale === 1 && photoCount() > 1 && ['ArrowLeft','ArrowRight'].includes(event.key)) {
            event.preventDefault(); stepPhoto(event.key === 'ArrowRight' ? 1 : -1); return;
        }
        if (['+','=','-','0','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) {
            event.preventDefault();
            if (event.key === '0') zoom(1);
            else if (event.key === '-' || event.key === '+' || event.key === '=') zoom(scale + (event.key === '-' ? -.5 : .5));
            else { x += event.key === 'ArrowLeft' ? 50 : event.key === 'ArrowRight' ? -50 : 0; y += event.key === 'ArrowUp' ? 50 : event.key === 'ArrowDown' ? -50 : 0; paint(); }
        }
    });
    stage.addEventListener('wheel', event => { event.preventDefault(); zoom(scale * Math.exp(-event.deltaY * .002), event.clientX, event.clientY); }, {passive:false});
    let lastTap = 0, tapStart;
    stage.addEventListener('pointerdown', event => {
        if (event.target.closest('button')) return;
        pointers.set(event.pointerId, {x:event.clientX,y:event.clientY});
        stage.setPointerCapture(event.pointerId);
        if(pointers.size > 1) lastTap=0;
        tapStart = pointers.size === 1 ? {x:event.clientX,y:event.clientY,time:Date.now()} : null;
    });
    stage.addEventListener('pointermove', event => {
        const old = pointers.get(event.pointerId); if (!old) return;
        const before = [...pointers.values()];
        pointers.set(event.pointerId, {x:event.clientX,y:event.clientY});
        if (pointers.size === 2) {
            const after = [...pointers.values()];
            const distance = a => Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);
            const oldDistance = distance(before);
            if (oldDistance > 0) zoom(scale * distance(after) / oldDistance, (after[0].x+after[1].x)/2, (after[0].y+after[1].y)/2);
        } else if (pointers.size === 1 && scale > 1) { x += event.clientX-old.x; y += event.clientY-old.y; paint(); }
        if (tapStart && Math.hypot(event.clientX-tapStart.x,event.clientY-tapStart.y)>8) tapStart=null;
    });
    stage.addEventListener('pointerup', event => {
        if (tapStart && Date.now()-tapStart.time<300) {
            if (Date.now()-lastTap<320) { zoom(scale > 1 ? 1 : 2.5,event.clientX,event.clientY);lastTap=0; }
            else lastTap=Date.now();
        }
        pointers.delete(event.pointerId);tapStart=null;
    });
    for (const name of ['pointercancel','lostpointercapture']) stage.addEventListener(name,event=>{pointers.delete(event.pointerId);tapStart=null;});
    image.addEventListener('load',paint);
    image.addEventListener('error',()=>{error.hidden=false;error.textContent=tr('Image unavailable. Close and try again.','Η εικόνα δεν είναι διαθέσιμη. Κλείσε και δοκίμασε ξανά.');});
    window.addEventListener('resize',()=>{if(dialog.open)paint();});
    window.addEventListener('opiumbite:language-change',labels);
    labels();
})();
