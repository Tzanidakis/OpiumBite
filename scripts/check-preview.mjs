import {readFile,readdir,writeFile} from 'node:fs/promises';
import {resolve,relative} from 'node:path';
const origin=process.argv[2]||'https://staging.opium-bite-preview.pages.dev';
if(!/^https:\/\/[a-z0-9.-]+\.pages\.dev$/.test(origin))throw Error('Use an HTTPS Pages preview URL');
const root=resolve(import.meta.dirname,'..'),out=resolve(root,'public');
const paths=['/','/about','/contact','/grillz','/classic','/iced-out','/capital-custom','/earrings','/necklaces','/product?id=classic-six&material=gold&color=white&karat=18','/this-page-does-not-exist'];
const tasks=paths.map(path=>({url:origin+path,expected:path.endsWith('does-not-exist')?404:200}));
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const full=resolve(dir,entry.name);if(entry.isDirectory())await walk(full);else if(!full.endsWith('.html')&&!entry.name.startsWith('_'))tasks.push({url:origin+'/'+relative(out,full),expected:200});}}
await walk(out);
for(const name of ['v1-mobile.mp4','v2-mobile.mp4','v3-mobile.mp4','v4-mobile.mp4','openingvideo-phone.mp4','openingvideo-compatible.mp4'])tasks.push({url:'https://media.opiumbite.com/website-video/phone-v1/'+name,range:true,expected:206});
let cursor=0;const results=[];
await Promise.all(Array.from({length:6},async()=>{while(cursor<tasks.length){const t=tasks[cursor++];try{const r=await fetch(t.url,{method:t.range?'GET':'HEAD',headers:t.range?{Range:'bytes=0-1023'}:{},signal:AbortSignal.timeout(20000)});results.push({url:t.url,status:r.status,expected:t.expected,noindex:r.headers.get('x-robots-tag'),range:r.headers.get('content-range'),ok:r.status===t.expected});await r.body?.cancel();}catch(e){results.push({url:t.url,error:e.message,ok:false});}}}));
const r=await fetch(origin+'/product.html?id=classic-six&material=silver',{redirect:'manual'});results.push({url:'product redirect',status:r.status,location:r.headers.get('location'),ok:r.status===308&&r.headers.get('location')?.includes('material=silver')});
await writeFile(resolve(root,'output/pages-preview-http-audit.json'),JSON.stringify({origin,checkedAt:new Date().toISOString(),results},null,2));
const failures=results.filter(r=>!r.ok);console.log(JSON.stringify({checks:results.length,failures},null,2));if(failures.length)process.exitCode=1;
