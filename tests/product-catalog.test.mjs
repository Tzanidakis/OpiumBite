import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const context = {window:{},URL};
vm.runInNewContext(readFileSync(new URL('../product-catalog.js', import.meta.url),'utf8'),context);
const catalog = context.window.OpiumProducts;
test('six-tooth Classic Grillz uses the provided starting prices for both gold colors',()=>{
    assert.equal(catalog.quote({material:'silver'}),36000);
    for(const color of ['yellow','rose']) {
        for(const [karat,price] of [['9',60000],['14',88000],['18',120000]])
            assert.equal(catalog.quote({material:'gold',color,karat}),price);
    }
});
test('invalid options cannot inject a price or retain gold details for silver',()=>{
    assert.equal(catalog.quote({material:'gold',karat:'__proto__',price:1}),60000);
    assert.equal(catalog.selection('silver','rose','18').karat,'');
    assert.equal(catalog.selection('silver','rose','18').color,'');
    assert.equal(catalog.selection('unknown','rose','18').material,'');
    assert.equal(catalog.selection('gold','unknown','99').color,'yellow');
});
test('each material uses its corresponding R2 front photo',()=>{
    assert.equal(catalog.image({material:'silver'}),'https://media.opiumbite.com/grillz/opium/TRAIBALL/silver/mouthpiece_silver_front.webp');
    assert.equal(catalog.image({material:'gold',color:'rose',karat:'14'}),'https://media.opiumbite.com/grillz/opium/TRAIBALL/rosegold/mouthpiece_rosegold_front.webp');
    assert.equal(catalog.image({material:'gold',color:'yellow',karat:'9'}),'https://media.opiumbite.com/grillz/opium/TRAIBALL/gold/mouthpiece_gold_front.webp');
});
test('each material gallery returns all its photos in order without mixing or exposing mutable arrays',()=>{
    const original = catalog.classic.images.silver;
    const front = 'https://media.opiumbite.com/grillz/opium/TRAIBALL/silver/mouthpiece_silver_front.webp';
    const side = 'https://media.opiumbite.com/grillz/opium/TRAIBALL/silver/silver_side.webp';
    const back = 'https://media.opiumbite.com/grillz/opium/TRAIBALL/silver/silver_back.webp';
    try {
        catalog.classic.images.silver = [front, side, back];
        const gallery = catalog.gallery({material:'silver'});
        assert.equal(gallery.join(','), [front,side,back].join(','));
        gallery.pop();
        assert.equal(catalog.gallery({material:'silver'}).length,3);
        assert.equal(catalog.gallery({material:'gold',color:'yellow'})[0], 'https://media.opiumbite.com/grillz/opium/TRAIBALL/gold/mouthpiece_gold_front.webp');
        assert.equal(catalog.gallery({material:'gold',color:'rose'}).length,catalog.classic.images.rose.length);
    } finally { catalog.classic.images.silver = original; }
});

test('Tribal has all distinct photos per material with no cross-material images',()=>{
    for(const [state,metal] of [[{material:'silver'},'silver'],[{material:'gold',color:'yellow'},'gold'],[{material:'gold',color:'rose'},'rosegold']]) {
        const photos=catalog.gallery(state);
        assert.ok(photos.length>0);
        assert.equal(new Set(photos).size,photos.length);
        for(const url of photos) {
            assert.equal(new URL(url).origin,'https://media.opiumbite.com');
            assert.match(new URL(url).pathname,new RegExp('/(?:mouthpiece_)?'+metal+'_[^/]+\\.webp$'));
        }
    }
});

 test('white gold uses the silver gallery while retaining gold karat prices',()=>{
    for(const [karat,price] of [['9',60000],['14',88000],['18',120000]]) {
        const state=catalog.selection('gold','white',karat);
        assert.equal(state.color,'white');
        assert.equal(catalog.quote(state),price);
        assert.equal(catalog.gallery(state).join(','),catalog.gallery({material:'silver'}).join(','));
    }
});

test('R2 import accounts for every image once and encodes case-sensitive object paths',()=>{
 const keys=JSON.parse(readFileSync(new URL('../r2-inventory.json',import.meta.url),'utf8')).filter(k=>k.endsWith('.webp')&&k!=='earrings/PUSSY/silver/earring_pair_rose_gold_first.webp');
 const imported=catalog.products.flatMap(p=>Object.values(p.images).flat()).map(url=>decodeURIComponent(new URL(url).pathname.slice(1)));
 assert.equal(catalog.products.length,23);
 assert.equal(new Set(catalog.products.map(p=>p.id)).size,23);
 assert.deepEqual([...imported].sort(),[...keys].sort());
 for(const p of catalog.products){
  assert.equal(catalog.quote({material:'silver'},p),p.startingPriceMinor);
  assert.equal(catalog.gallery({material:'gold',color:'white'},p).join(','),catalog.gallery({material:'silver'},p).join(','));
  for(const color of ['yellow','rose'])assert.equal(catalog.gallery({material:'gold',color},p).join(','),p.images[color].join(','));
 }
});

test('OFI gold uses its verified cover object without changing silver or white gold',()=>{const p=catalog.get('earrings-ofi');assert.equal(catalog.image({material:'gold',color:'yellow'},p),'https://media.opiumbite.com/earrings/OFI/gold/earring_pair_gold_first.webp');assert.match(catalog.image({material:'silver'},p),/silver_first\.webp$/);assert.equal(catalog.image({material:'gold',color:'white'},p),catalog.image({material:'silver'},p));});

test('every material and gold karat matches the supplied price document',()=>{
 const fixture=JSON.parse(readFileSync(new URL('./price-fixture.json',import.meta.url),'utf8'));
 assert.equal(Object.keys(fixture).length,22);
 for(const [id,expected] of Object.entries(fixture)){
  const product=catalog.get(id);assert.ok(product,id);
  assert.equal(catalog.quote({material:'silver'},product),expected.silver,id);
  for(const color of ['yellow','rose','white'])for(const karat of ['9','14','18'])assert.equal(catalog.quote({material:'gold',color,karat},product),expected.gold[karat],id+' '+color+' '+karat);
 }
 const pendant=catalog.products.find(p=>p.category==='necklaces');
 assert.equal(catalog.quote({material:'silver'},pendant),null);
 for(const karat of ['9','14','18'])assert.equal(catalog.quote({material:'gold',karat},pendant),null);
 assert.equal(catalog.products.find(p=>p.id==='grillz-iced-out-iced-out-window').priceExcludesDiamonds,true);
});

test('current R2 nested folders remain mapped to their parent product',()=>{
 const mak=catalog.products.find(p=>p.sourceFolder==='grillz/opium/MAK TRAIBALL');
 assert.ok(mak.images.silver.some(url=>decodeURIComponent(url).includes('/TRAIBAL 2/silver/')));
 assert.ok(catalog.classic.images.silver.every(url=>url.includes('/TRAIBALL/silver/')));
});

test('moved Iced Window retains stones while pendant supports stones and length',()=>{
 const iced=catalog.get('grillz-iced-out-iced-out-window');
 assert.equal(iced.category,'opium');assert.equal(iced.diamondOptions,true);
 assert.equal(iced.sourceFolder,'grillz/opium/ICED  WINDOW');
 assert.equal(catalog.products.filter(p=>p.category==='iced-out').length,0);
 const pendant=catalog.get('pendants-pendal-ob');
 assert.equal(pendant.diamondOptions,true);assert.equal(pendant.lengthOption,true);
 assert.equal(catalog.quote({material:'gold',karat:'18'},pendant),null);
});

test('replacement image revisions refresh cached bytes without changing object paths',()=>{
 const url=catalog.image({material:'silver'});
 context.window.OpiumImageRevisions={[url]:'fresh-file-id'};
 const result=new URL(catalog.asset(url));
 assert.equal(result.pathname,new URL(url).pathname);
 assert.equal(result.searchParams.get('v'),'fresh-file-id');
 assert.equal(catalog.asset(null),null);
 delete context.window.OpiumImageRevisions;
});

test('XO starting prices exclude diamonds and offer stone selection',()=>{
 const xo=catalog.get('grillz-opium-xo');
 assert.equal(xo.priceExcludesDiamonds,true);
 assert.equal(xo.diamondOptions,true);
 assert.equal(catalog.quote({material:'silver'},xo),54000);
});

test('Classic and Opium sort by ascending silver price without mutating records',()=>{
 const original=Array.from(catalog.products,p=>p.id);
 for(const category of ['classic','opium']){
  const values=Array.from(catalog.listing(category),p=>p.startingPriceMinor);
  assert.ok(values.length>3);
  assert.deepEqual(values,[...values].sort((a,b)=>a-b));
 }
 assert.deepEqual(Array.from(catalog.products,p=>p.id),original);
});
test('specified gold listing covers retain the silver gallery and quote used by product links',()=>{
 const requested=['grillz-classic-window-x-star','grillz-classic-down-bar','grillz-classic-1-cap','grillz-opium-cross-grill','grillz-opium-filter-cap','grillz-opium-uzi','grillz-opium-xo','earrings-pussy'];
 for(const product of catalog.products){
  const silver=catalog.selection('silver','','');
  assert.equal(catalog.preview(product),catalog.image(requested.includes(product.id)?catalog.selection('gold','yellow','9'):silver,product),product.id);
  assert.equal(catalog.quote(silver,product),product.startingPriceMinor,product.id);
  assert.equal(catalog.gallery(silver,product)[0],product.images.silver[0],product.id);
 }
});
test('product back links return to the matching collection with a safe unknown-category fallback',()=>{
 const routes={classic:'classic.html',opium:'capital-custom.html',earrings:'earrings.html',necklaces:'necklaces.html'};
 for(const product of catalog.products)assert.equal(catalog.collectionURL(product.category),routes[product.category]);
 for(const category of ['','unknown','__proto__','toString'])assert.equal(catalog.collectionURL(category),'grillz.html');
});

test('FILTER CAP uses only the current Cloudflare images with fresh cache versions',()=>{
 const env={window:{},URL};
 vm.runInNewContext(readFileSync(new URL('../product-image-revisions.js',import.meta.url),'utf8'),env);
 vm.runInNewContext(readFileSync(new URL('../product-catalog.js',import.meta.url),'utf8'),env);
 const api=env.window.OpiumProducts,product=api.get('grillz-opium-filter-cap');
 const root='https://media.opiumbite.com/grillz/opium/FILTER%20CAP/';
 for(const [material,color] of [['gold','yellow'],['rosegold','rose'],['silver','silver']]){
  const expected=[material+'_right.webp','mouthpiece_'+material+'_right.webp','white-dental-cast-matched-angle-v2.webp'].map(name=>root+material+'/'+name);
  assert.deepEqual(Array.from(product.images[color]),expected);
  for(const url of expected){const refreshed=new URL(api.asset(url));assert.equal(refreshed.origin+refreshed.pathname,url);assert.match(refreshed.searchParams.get('v'),/^filter-cap-20261104-[a-f0-9]{20}$/);}
 }
 assert.equal(api.preview(product),root+'gold/gold_right.webp');
 assert.equal(api.image({material:'silver'},product),root+'silver/silver_right.webp');
 assert.equal(api.quote({material:'silver'},product),27000);
});
