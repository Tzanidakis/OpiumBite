import {readFile,writeFile,mkdir,rm,stat,copyFile} from 'node:fs/promises';
import {resolve,dirname,relative} from 'node:path';
import vm from 'node:vm';
const root=resolve(import.meta.dirname,'..'),out=resolve(root,'public');
const pages=['index','about','contact','grillz','classic','iced-out','capital-custom','earrings','necklaces','rings','bracelets','product','404'];
const sandbox={window:{}};vm.runInNewContext(await readFile(resolve(root,'product-catalog.js'),'utf8'),sandbox);
const origin='https://opiumbite.com';
const urls=pages.filter(p=>!['404','product'].includes(p)).map(p=>origin+(p==='index'?'/':'/'+p));
for(const p of sandbox.window.OpiumProducts.products)urls.push(origin+'/product?id='+encodeURIComponent(p.id));
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
await writeFile(resolve(out,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n');
const xmlEscape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
await writeFile(resolve(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(url=>'  <url><loc>'+xmlEscape(url)+'</loc></url>').join('\n')+'\n</urlset>\n');
console.log(`Built ${files.length+2} public files (${(files.reduce((s,x)=>s+x.bytes,0)/1024/1024).toFixed(1)} MiB). Sitemap: ${urls.length} URLs.`);
