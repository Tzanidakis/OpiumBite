import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const read=name=>readFileSync(resolve(root,name),'utf8');
test('collection cards stay clean while product detail provides arrows and thumbnails',()=>{
 assert.doesNotMatch(read('catalog-collections.js'),/gallery-arrows|Previous photo|Next photo/);
 assert.match(read('product-customizer.js'),/detail-gallery-arrows/);
 assert.match(read('product-customizer.js'),/variant-thumbnails/);
});
test('phone collection grid uses a single full-width column',()=>{
 const css=read('collections.css').split('@media(max-width:768px)')[1];
 assert.match(css,/\.product-container\s*\{\s*grid-template-columns:minmax\(0,1fr\)/);
});
test('UI source uses no platform emoji presentation characters',()=>{
 for(const file of readdirSync(root).filter(n=>/\.(html|js|css)$/.test(n)))assert.doesNotMatch(read(file),/\p{Emoji_Presentation}/u,file);
 assert.match(read('translation.js'),/<svg width=/);
});
test('scroll film keeps its video fallback while the intro uses a transparent image',()=>{
 const html=read('index.html');assert.equal([...html.matchAll(/webkit-playsinline/g)].length,3);
 assert.match(html,/id="film-play"/);assert.match(html,/id="opening-logo"/);
 assert.doesNotMatch(html,/id="intro-play"|id="opening-video"/);
 assert.doesNotMatch(read('opening-intro.js'),/\.play\(/);
});
