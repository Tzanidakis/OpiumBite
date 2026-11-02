(function () {
    'use strict';
    const catalog = window.OpiumProducts;
    const section = document.querySelector('[data-catalog-category]');
    if (!catalog || !section) return;
    const container = section.querySelector('.product-container');
    const tr = text => window.OpiumI18n?.t(text) || text;
    const cards = [];
    for (const product of catalog.products.filter(p => p.category === section.dataset.catalogCategory)) {
        const card = document.createElement('article');
        card.className = 'product-item product-summary';
        card.dataset.catalogProduct = product.id;
        const link = document.createElement('a');
        link.className = 'catalog-product-link';
        const imageBox = document.createElement('div');
        imageBox.className = 'product-image';
        const image = document.createElement('img');
        image.loading = 'lazy'; image.decoding = 'async'; image.width = image.height = 600;
        const imageLink=document.createElement('a');imageLink.className='catalog-image-link';imageLink.append(image);imageBox.append(imageLink);
        const info = document.createElement('div');info.className = 'product-info';
        const title = document.createElement('h3');title.textContent = product.name;
        const price = document.createElement('div');price.className = 'price';
        info.append(title,price);link.append(info);card.append(imageBox,link);
        const state = catalog.selection('silver','','');
        function render() {
            const source=catalog.asset(catalog.image(state,product));
            image.hidden=!source;
            if(source) image.src=source; else image.removeAttribute('src');
            let placeholder=imageBox.querySelector('.catalog-image-empty');
            if(!source&&!placeholder){placeholder=document.createElement('span');placeholder.className='catalog-image-empty';imageLink.append(placeholder);}
            if(placeholder){placeholder.hidden=!!source;placeholder.textContent=tr('Images coming soon');}
            image.alt=product.name+' — '+tr(state.material==='silver'?'Silver':state.color==='rose'?'Rose gold':state.color==='white'?'White gold':'Yellow gold');
            link.href='product.html?'+new URLSearchParams({id:product.id,material:state.material,color:state.color,karat:state.karat});
            link.setAttribute('aria-label',tr('View')+' '+product.name);
            imageLink.href=link.href;imageLink.setAttribute('aria-label',tr('View')+' '+product.name);
            price.textContent=product.startingPriceMinor==null?tr('Ask for price'):tr('Starting from')+' '+new Intl.NumberFormat(document.documentElement.lang==='el'?'el-GR':'en-IE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(product.startingPriceMinor/100);
        }
        if(product.priceExcludesDiamonds){const note=document.createElement('p');note.className='variant-price-note';note.textContent='Without diamonds';note.dataset.i18nEl='Χωρίς διαμάντια';card.append(note);}
        render();cards.push(render);container.append(card);
    }
    window.addEventListener('opiumbite:language-change',()=>cards.forEach(render=>render()));
    window.OpiumI18n?.refresh();
})();
