(function () {
    'use strict';
    const sourceCatalog = window.OpiumProducts;
    const requestedId = new URLSearchParams(window.location.search).get('id');
    const selectedProduct = sourceCatalog?.get(requestedId);
    const catalog = sourceCatalog && { ...sourceCatalog, classic: selectedProduct || sourceCatalog.classic, quote: state => sourceCatalog.quote(state, selectedProduct || sourceCatalog.classic), gallery: state => sourceCatalog.gallery(state, selectedProduct || sourceCatalog.classic) };
    if (!catalog) return;
    const product = catalog.classic;
    const params = new URLSearchParams(window.location.search);
    const detail = document.body.dataset.productPage === 'true' && params.get('id') === product.id;
    if (!detail) return;
    const root = document.querySelector('.product-right');
    const picture = document.getElementById('product-img');
    const price = root.querySelector('.price');
    const contact = root.querySelector('.contact-us-btn');
    const imageContainer = picture.parentElement;
    imageContainer.classList.add('variant-image-container');
    const empty = document.createElement('p');
    empty.className = 'variant-image-empty';
    empty.hidden = true;
    imageContainer.append(empty);
    const caption = document.createElement('p');
    caption.className = 'variant-caption';
    imageContainer.append(caption);
    const thumbnails = document.createElement('div');
    thumbnails.className = 'variant-thumbnails';
    thumbnails.setAttribute('role', 'group');
    imageContainer.insertBefore(thumbnails, caption);
    let photos = [];
    let photoIndex = 0;
    let galleryKey = '';


    if (detail) {
        document.getElementById('product-name').textContent = product.name;
        document.title = product.name + ' - Opium Bite';
        // Keep variant choices on one product canonical, independent of selected metal.
        const canonical = 'https://opiumbite.com/product?id=' + encodeURIComponent(product.id);
        const description = 'Explore ' + product.name + ' by Opium Bite. Choose silver or gold, browse material photos and contact our atelier for your final quote.';
        document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
        document.querySelector('meta[name="description"]')?.setAttribute('content', description);
        for (const [property, content] of Object.entries({ 'og:title': document.title, 'og:description': description, 'og:url': canonical, 'og:image': sourceCatalog.image(catalog.selection('', '', ''), product) })) {
            if (content) document.querySelector('meta[property="' + property + '"]')?.setAttribute('content', content);
        }
        document.getElementById('product-desc').textContent = 'Choose your material, gold color and karat. Contact us for availability and your final quote.';
    }
    const panel = document.createElement('div');
    panel.className = 'classic-customizer';
    const prefix = 'detail';
    panel.innerHTML = `
        <div class="variant-field"><label for="${prefix}-material">Material</label>
          <select id="${prefix}-material" name="material">
            <option value="">Choose material</option><option value="silver">Silver</option><option value="gold">Gold</option>
          </select></div>
        <div class="gold-options" hidden>
          <div class="variant-field"><label for="${prefix}-gold-color">Gold color</label>
            <select id="${prefix}-gold-color" name="gold-color"><option value="yellow">Yellow gold</option><option value="rose">Rose gold</option><option value="white">White gold</option></select></div>
          <div class="variant-field"><label for="${prefix}-karat">Karat</label>
            <select id="${prefix}-karat" name="karat"><option value="9">9K</option><option value="14">14K</option><option value="18">18K</option></select></div>
        </div>
        <p class="variant-price-note">Starting price. Contact us for your final quote.</p>`;
    const diamondOptions = { zirconia:'Zirconia', moissanite:'Moissanite', 'lab-grown':'Grow lab', natural:'Natural' };
    let diamond = null;
    if (product.diamondOptions || product.priceExcludesDiamonds) {
        const field=document.createElement('div');field.className='variant-field';
        field.innerHTML='<label for="detail-diamond">Diamond option</label><select id="detail-diamond" name="diamond"><option value="">Choose a stone</option>'+Object.entries(diamondOptions).map(([value,label])=>'<option value="'+value+'">'+label+'</option>').join('')+'</select>';
        panel.insertBefore(field,panel.querySelector('.variant-price-note'));
        diamond=field.querySelector('select');
        diamond.value=Object.hasOwn(diamondOptions,params.get('diamond'))?params.get('diamond'):'';
    }
    let length = null;
    if (product.lengthOption) {
        const field = document.createElement('div'); field.className='variant-field';
        field.innerHTML='<label for="detail-length">Length (cm)</label><input id="detail-length" name="length" type="number" min="0.1" step="0.1" inputmode="decimal" placeholder="Enter preferred length">';
        panel.insertBefore(field,panel.querySelector('.variant-price-note'));
        length=field.querySelector('input');
        const requestedLength=Number(params.get('length'));
        if(Number.isFinite(requestedLength)&&requestedLength>0) length.value=String(requestedLength);
    }
    function lengthValue() { const value=Number(length?.value); return Number.isFinite(value)&&value>0?String(value):''; }
    if (product.priceExcludesDiamonds) {
        const note=document.createElement('p');note.className='variant-price-note';
        note.textContent='Starting price without diamonds. Stone options are quoted separately.';
        panel.append(note);
    }
    document.getElementById('options-container').append(panel);
    const material = panel.querySelector('[name="material"]');
    const color = panel.querySelector('[name="gold-color"]');
    const karat = panel.querySelector('[name="karat"]');
    const goldOptions = panel.querySelector('.gold-options');
    let state = catalog.selection(params.get('material'), params.get('color'), params.get('karat'));
    material.value = state.material;
    color.value = state.color || 'yellow';
    karat.value = state.karat || '9';
    price.setAttribute('aria-live', 'polite');
    caption.setAttribute('aria-live', 'polite');
    let revision = 0;
    const tr = value => window.OpiumI18n?.t(value) || value;
    const materialLabel = () => state.material === 'gold' ? 'Gold' : 'Silver';
    const colorLabel = () => state.color === 'white' ? 'White gold' : state.color === 'rose' ? 'Rose gold' : 'Yellow gold';
    function showPhoto(index) {
        photoIndex = index;
        const current = ++revision;
        const requestedPhoto = photos[index];
        const alreadyVisible = requestedPhoto && picture.getAttribute('src') === requestedPhoto && picture.complete && picture.naturalWidth > 0;
        picture.hidden = !alreadyVisible;
        empty.hidden = alreadyVisible;
        Array.from(thumbnails.children).forEach((button, i) => button.setAttribute('aria-pressed', String(i === photoIndex)));
        if (!photos.length) {
            empty.textContent = tr('Photo for this material is not available yet.');
            caption.textContent = '';
            return;
        }
        empty.textContent = tr('Loading image...');
        const src = photos[photoIndex];
        const label = state.material === 'silver' ? 'Silver' : colorLabel();
        const alt = tr(product.name) + ' - ' + tr(label) + ' - ' + tr('Photo') + ' ' + (photoIndex + 1);
        caption.textContent = (!state.material || (state.material === 'gold' && state.color === 'yellow'))
            ? tr('Yellow gold reference image. Exact color may vary by karat.') : state.color === 'white' ? tr('Silver photos shown as a reference for white gold.') : '';
        if (alreadyVisible) {
            picture.alt = alt;
            return;
        }
        // Separate loaders prevent a late response from the previous material revealing the wrong photo.
        const loader = new Image();
        loader.onload = () => {
            if (current !== revision) return;
            picture.src = src;
            picture.alt = alt;
            picture.hidden = false;
            empty.hidden = true;
        };
        loader.onerror = () => {
            if (current !== revision) return;
            empty.textContent = tr('Image unavailable. Please contact us.');
        };
        loader.src = src;
    }
    function renderGallery() {
        const nextPhotos = [...new Set([sourceCatalog.image(state, product), ...catalog.gallery(state)].filter(Boolean).map(sourceCatalog.asset))];
        const key = state.material + ':' + state.color + ':' + nextPhotos.join('|');
        if (key === galleryKey) {
            thumbnails.setAttribute('aria-label', tr('Product photos'));
            Array.from(thumbnails.children).forEach((button, index) => button.setAttribute('aria-label', tr('Photo') + ' ' + (index + 1)));
            showPhoto(photoIndex);
            return;
        }
        photoIndex = 0;
        galleryKey = key;
        photos = nextPhotos;
        thumbnails.replaceChildren();
        thumbnails.hidden = photos.length < 2;
        thumbnails.setAttribute('aria-label', tr('Product photos'));
        photos.forEach((src, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('aria-label', tr('Photo') + ' ' + (index + 1));
            button.setAttribute('aria-pressed', String(index === photoIndex));
            const thumbnail = document.createElement('img');
            thumbnail.src = src;
            thumbnail.alt = '';
            thumbnail.loading = 'lazy';
            thumbnail.width = thumbnail.height = 64;
            button.append(thumbnail);
            button.addEventListener('click', () => showPhoto(index));
            thumbnails.append(button);
        });
        showPhoto(photoIndex);
    }
    function details() {
        const result = [];
        if (state.material) result.push('Material: ' + materialLabel());
        if (state.material === 'gold') result.push('Gold color: ' + colorLabel(), 'Karat: ' + state.karat + 'K');
        if (diamond?.value) result.push('Diamond option: ' + diamondOptions[diamond.value]);
        if (lengthValue()) result.push('Length: ' + lengthValue() + ' cm');
        if (product.teeth) result.push('Number of teeth: ' + product.teeth);
        return result.join(', ');
    }
    function productURL() {
        const query = new URLSearchParams({ id: product.id });
        if (state.material) query.set('material', state.material);
        if (state.material === 'gold') { query.set('color', state.color); query.set('karat', state.karat); }
        if (diamond?.value) query.set('diamond',diamond.value);
        if (lengthValue()) query.set('length',lengthValue());
        return 'product.html?' + query.toString();
    }
    function render() {
        const language = document.documentElement.lang === 'el' ? 'el-GR' : 'en-IE';
        const amount = new Intl.NumberFormat(language, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(catalog.quote(state) / 100);
        price.textContent = catalog.quote(state) == null ? tr('Ask for price') : tr('Starting from') + ' ' + amount;
        goldOptions.hidden = state.material !== 'gold';
        color.disabled = karat.disabled = state.material !== 'gold';
        const enquiry = new URLSearchParams({ product: product.name, price: catalog.quote(state) == null ? 'Ask for price' : 'Starting from €' + catalog.quote(state) / 100, details: details(), productId: product.id });
        if (state.material) enquiry.set('material', state.material);
        if (state.material === 'gold') { enquiry.set('color', state.color); enquiry.set('karat', state.karat); }
        if (diamond?.value) enquiry.set('diamond',diamond.value);
        if (lengthValue()) enquiry.set('length',lengthValue());
        contact.href = 'contact.html?' + enquiry.toString() + '#contact-form';
        if (detail) {
            const url = new URL(window.location.href);
            url.search = new URLSearchParams(productURL().split('?')[1]).toString();
            window.history.replaceState(null, '', url);
        }
        renderGallery();
        window.OpiumI18n?.refresh();
    }
    panel.addEventListener('change', () => {
        state = catalog.selection(material.value, color.value, karat.value);
        render();
    });
    window.addEventListener('opiumbite:language-change', render);
    render();
})();
