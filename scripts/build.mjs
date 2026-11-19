import {readFile,writeFile,mkdir,rm,stat,copyFile} from 'node:fs/promises';
import {resolve,dirname,relative} from 'node:path';
import vm from 'node:vm';
const root=resolve(import.meta.dirname,'..'),out=resolve(root,'public');
const pages=['index','about','contact','grillz','classic','iced-out','capital-custom','earrings','necklaces','product','privacy-policy','terms-and-conditions','404'];
const sandbox={window:{},URL};
for (const name of ['product-image-revisions.js', 'product-catalog.js']) {
 vm.runInNewContext(await readFile(resolve(root,name),'utf8'),sandbox);
}
const catalog=sandbox.window.OpiumProducts;
const origin='https://opiumbite.com';
// Add Iced Out back when the collection launches and its noindex tag is removed.
const urls=pages.filter(p=>!['404','product','iced-out'].includes(p)).map(p=>origin+(p==='index'?'/':'/'+p));
for(const product of catalog.products)urls.push(origin+catalog.productPath(product));
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
const queued=new Set(pages.map(p=>p+'.html').concat(['_headers']));
const files=[];
for(const file of queued){
 const source=resolve(root,file);if(!source.startsWith(root+'/'))throw Error('Invalid public path: '+file);
 const info=await stat(source);if(!info.isFile())throw Error('Not a file: '+file);
 if(info.size>25*1024*1024)throw Error('Exceeds Pages 25 MiB asset limit: '+file);
 await mkdir(dirname(resolve(out,file)),{recursive:true});await copyFile(source,resolve(out,file));files.push({file,bytes:info.size});
 if(/\.(html|css|js)$/.test(file)){
  const text=await readFile(source,'utf8');
  const refs=[...text.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/g)].map(m=>m[1]);
  refs.push(...[...text.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)].map(m=>m[1]));
  refs.push(...[...text.matchAll(/\bmedia\/[A-Za-z0-9_./-]+\.(?:png|webp|jpg|jpeg|svg|mp4|m4v|mov|woff2?)/g)].map(m=>m[0]));
  for(const ref of refs){if(/^(?:https?:|\/\/|data:|#|mailto:|tel:)/.test(ref))continue;const clean=ref.split(/[?#]/)[0];if(!clean||clean.includes('${'))continue;const local=relative(root,resolve(clean.startsWith('/')?root:dirname(source),clean.replace(/^\//,'')));if(/\.(?:html|css|js|png|webp|jpg|jpeg|svg|ico|mp4|m4v|mov|woff2?)$/.test(local))queued.add(local);}
 }
}

const htmlEscape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const jsonLd = data => `<script type="application/ld+json">${JSON.stringify(data).replaceAll('<','\\u003c')}</script>`;
const productTemplate = await readFile(resolve(out,'product.html'),'utf8');
for (const product of catalog.products) {
 if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.id) || !product.description || !product.descriptionEl) {
  throw Error('Invalid product page data: ' + product.id);
 }
 const canonical = origin + catalog.productPath(product);
 const title = catalog.productTitle(product);
 const cover = catalog.asset(catalog.image(catalog.selection('silver'),product));
 const price = product.startingPriceMinor == null ? 'Ask for price' : 'Starting from €' + product.startingPriceMinor / 100;
 const schema = {
  '@context':'https://schema.org', '@type':'Product', name:product.name, url:canonical,
  description:product.description, image:cover, brand:{'@type':'Brand',name:'Opium Bite'}
 };
 const html = productTemplate
  .replace('<head>', '<head>\n    <base href="/">')
  .replace(/<title>[^<]*<\/title>/, () => `<title>${htmlEscape(title)}</title>`)
  .replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*/g, (_, prefix) => prefix + htmlEscape(product.description))
  .replace(/(<meta property="og:title" content=")[^"]*/, (_, prefix) => prefix + htmlEscape(title))
  .replace(/(<link rel="canonical" href="|<meta property="og:url" content=")[^"]*/g, (_, prefix) => prefix + htmlEscape(canonical))
  .replace(/(<meta property="og:image" content=")[^"]*/, (_, prefix) => prefix + htmlEscape(cover))
  .replace('</head>', () => `    ${jsonLd(schema)}\n</head>`)
  .replace('data-product-page="true"', () => `data-product-page="true" data-product-id="${product.id}"`)
  .replace('class="product-back" href="grillz.html"', () => `class="product-back" href="${catalog.collectionURL(product.category)}"`)
  .replace(/<img id="product-img"[^>]*>/, () => `<img id="product-img" src="${htmlEscape(cover)}" alt="${htmlEscape(product.name + ' in silver')}">`)
  .replace('id="product-name">Product Name', () => `id="product-name">${htmlEscape(product.name)}`)
  .replace('id="product-price">$0.00', () => `id="product-price">${htmlEscape(price)}`)
  .replace(/<div class="product-description" id="product-desc">[\s\S]*?<\/div>/, () => `<div class="product-description" id="product-desc" data-i18n-el="${htmlEscape(product.descriptionEl)}">${htmlEscape(product.description)}</div>`);
 const file = 'products/' + product.id + '/index.html';
 await mkdir(dirname(resolve(out,file)),{recursive:true});
 await writeFile(resolve(out,file),html);
 files.push({file,bytes:Buffer.byteLength(html)});
}

for (const name of ['index','classic','capital-custom','earrings','necklaces']) {
 const file = resolve(out,name+'.html');
 let html = (await readFile(file,'utf8')).replace('<html ', '<html data-static-catalog="true" ');
 if (name === 'index') {
  const organization = {'@context':'https://schema.org','@type':'Organization',name:'Opium Bite',url:origin+'/',logo:origin+'/media/logo.png',email:'opiumbite@gmail.com',sameAs:['https://www.instagram.com/opium.bite/']};
  const website = {
   '@context': 'https://schema.org',
   '@type': 'WebSite',
   name: organization.name,
   url: organization.url,
  };
  html = html.replace('</head>', () => `    ${jsonLd(organization)}\n    ${jsonLd(website)}\n</head>`);
 }
 await writeFile(file,html);
}
await writeFile(resolve(out,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n');
const xmlEscape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
await writeFile(resolve(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(url=>'  <url><loc>'+xmlEscape(url)+'</loc></url>').join('\n')+'\n</urlset>\n');
console.log(`Built ${files.length+2} public files (${(files.reduce((s,x)=>s+x.bytes,0)/1024/1024).toFixed(1)} MiB). Sitemap: ${urls.length} URLs.`);
