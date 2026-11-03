import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import {resolve,join} from 'node:path';
const root=resolve(import.meta.dirname,'..');
execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root});
const output=join(root,'public');
function files(dir){return readdirSync(dir).flatMap(name=>statSync(join(dir,name)).isDirectory()?files(join(dir,name)):join(dir,name));}
test('deployment contains only public web assets and respects Pages asset limits',()=>{
 const all=files(output);assert.ok(all.length>40);
 for(const file of all){assert.match(file,/\.(html|css|js|png|webp|jpg|mp4|m4v|mov|txt|xml)$|\/_headers$/);assert.ok(statSync(file).size<=25*1024*1024);}
 for(const excluded of ['tmp','tests','output','.git','Prices.docx','r2-inventory.json','media/ggz.png','media/hero-gold-atelier.png'])assert.ok(!all.includes(join(output,excluded)),excluded);
});
test('every main page has a unique title, description, canonical and social preview',()=>{
 const titles=new Set();
 for(const name of readdirSync(output).filter(x=>x.endsWith('.html')&&x!=='404.html')){
  const html=readFileSync(join(output,name),'utf8');const title=html.match(/<title>(.*?)<\/title>/)[1];assert.ok(!titles.has(title));titles.add(title);
  assert.match(html,/<meta name="description" content="[^"]+">/);assert.match(html,/<link rel="canonical" href="https:\/\/opiumbite.com\//);assert.match(html,/<meta property="og:image"/);
 }
});
test('sitemap uses production canonical routes and excludes temporary, error and variant URLs',()=>{
 const xml=readFileSync(join(output,'sitemap.xml'),'utf8');const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);assert.equal(new Set(urls).size,urls.length);assert.ok(urls.length>20);
 for(const url of urls){assert.ok(url.startsWith('https://opiumbite.com/'));assert.doesNotMatch(url,/localhost|\.html|404|material=|karat=|color=|tmp\//);}
 assert.match(readFileSync(join(output,'robots.txt'),'utf8'),/Sitemap: https:\/\/opiumbite.com\/sitemap.xml/);
 assert.match(readFileSync(join(output,'404.html'),'utf8'),/name="robots" content="noindex"/);
 assert.match(readFileSync(join(output,'_headers'),'utf8'),/X-Content-Type-Options: nosniff/);
});

test('scroll clips use the R2 media host and are not duplicated in Pages output',()=>{
 const html=readFileSync(join(output,'index.html'),'utf8');
 const publicFiles=files(output);
 assert.ok(!html.includes("v3-mobile.mp4"));
 assert.ok(html.includes("media/v2-mobile.mp4?v=user-trim-1"));
 assert.ok(publicFiles.includes(join(output,"media","v2-mobile.mp4")));
 for(const i of [1,4]){
  assert.ok(html.includes('https://media.opiumbite.com/website-video/phone-v1/v'+i+'-mobile.mp4'));
  assert.ok(!publicFiles.includes(join(output,'media','v'+i+'.mp4')));
 }
});

test('retired collection pages are absent from output, navigation and sitemap',()=>{
 for(const name of ['rings','bracelets']){
  assert.ok(!files(output).includes(join(output,name+'.html')));
  const sitemap=readFileSync(join(output,'sitemap.xml'),'utf8');
  assert.ok(!sitemap.includes('/'+name));
  for(const page of readdirSync(output).filter(x=>x.endsWith('.html')))assert.ok(!readFileSync(join(output,page),'utf8').includes('href="'+name+'.html"'),page);
 }
});
