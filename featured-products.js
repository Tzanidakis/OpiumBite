// Homepage carousel of real catalog products; listing covers never change silver quotes.
(function () {
    'use strict';
    const catalog=window.OpiumProducts;
    const track=document.getElementById('signature-track');
    if(!catalog||!track)return;
    const ids=['grillz-opium-cross-grill','grillz-classic-window-x-star','grillz-opium-uzi','grillz-opium-xo','grillz-classic-down-bar','grillz-classic-1-cap','classic-six','grillz-opium-filter-cap'];
    const entries=[];
    for(const id of ids){
        const product=catalog.get(id);
        if(!product)continue;
        const link=document.createElement('a');
        link.className='signature-card';
        link.href='product.html?'+new URLSearchParams({id,material:'silver'});
        const art=document.createElement('div');
        const image=document.createElement('img');
        image.src=catalog.asset(catalog.preview(product));image.alt=product.name;image.loading='lazy';image.decoding='async';image.width=image.height=600;
        art.append(image);
        const title=document.createElement('h3');title.textContent=product.name;
        const price=document.createElement('p');
        link.append(art,title,price);track.append(link);entries.push({product,price});
    }
    function render(){
        const tr=value=>window.OpiumI18n?.t(value)||value;
        const formatter=new Intl.NumberFormat(document.documentElement.lang==='el'?'el-GR':'en-IE',{style:'currency',currency:'EUR',maximumFractionDigits:0});
        for(const {product,price} of entries)price.textContent=product.startingPriceMinor==null?tr('Ask for price'):tr('Starting from')+' '+formatter.format(product.startingPriceMinor/100);
    }
    window.addEventListener('opiumbite:language-change',render);render();
})();
