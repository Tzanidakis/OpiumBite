/* Receives a short-lived Pages upload JWT through stdin; never stores it. */
const fs=require('node:fs/promises'),path=require('node:path'),{hash}=require('blake3-wasm');
const types={html:'text/html',css:'text/css',js:'application/javascript',xml:'application/xml',txt:'text/plain',png:'image/png',webp:'image/webp',mp4:'video/mp4',m4v:'video/mp4',mov:'video/quicktime'};
if(process.stdin.isTTY)process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');
process.stdin.once('data',async input=>{
 try{
  const token=input.trim();if(!/^[A-Za-z0-9_.-]+$/.test(token))throw Error('Invalid upload token');
  const root=path.resolve('public'),assets=[],manifest={};
  async function walk(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){const full=path.join(dir,e.name);if(e.isDirectory())await walk(full);else if(!['_headers','_redirects'].includes(e.name)){const ext=path.extname(full).slice(1),value=(await fs.readFile(full)).toString('base64'),key=hash(value+ext).toString('hex').slice(0,32);manifest['/'+path.relative(root,full).split(path.sep).join('/')]=key;assets.push({key,value,base64:true,metadata:{contentType:types[ext]||'application/octet-stream'}});}}}
  await walk(root);
  async function api(endpoint,body){const response=await fetch('https://api.cloudflare.com/client/v4/pages/assets/'+endpoint,{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(120000)});const data=await response.json();if(!response.ok||!data.success)throw Error(endpoint+' failed: '+response.status);return data.result;}
  const missing=new Set(await api('check-missing',{hashes:assets.map(a=>a.key)}));
  let batch=[],size=0,uploaded=0;
  async function send(){if(!batch.length)return;await api('upload',batch);uploaded+=batch.length;console.log('Uploaded '+uploaded+' assets');batch=[];size=0;}
  for(const asset of assets.filter(a=>missing.has(a.key))){if(size+asset.value.length>20*1024*1024)await send();batch.push(asset);size+=asset.value.length;}await send();
  await api('upsert-hashes',{hashes:assets.map(a=>a.key)});
  await fs.writeFile('/tmp/opium-pages-manifest.json',JSON.stringify(manifest));console.log('Asset manifest ready: '+Object.keys(manifest).length+' files');process.exit(0);
 }catch(error){console.error(error.message);process.exit(1);}
});
