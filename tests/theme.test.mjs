import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('../theme.js',import.meta.url),'utf8');
function boot(saved,blocked=false){
 const events={},root={dataset:{}},attrs={},clicks={};let persisted;
 const button={setAttribute:(k,v)=>attrs[k]=v,addEventListener:(k,v)=>clicks[k]=v};
 const context={document:{documentElement:root,addEventListener:(k,v)=>events[k]=v,createElement:()=>button,querySelector:()=>({appendChild(){}})},window:{addEventListener:(k,v)=>events[k]=v},localStorage:{getItem(){if(blocked)throw Error();return saved},setItem(k,v){if(blocked)throw Error();persisted=v}}};
 vm.runInNewContext(source,context);events.DOMContentLoaded();return {root,attrs,clicks,events,saved:()=>persisted};
}
test('existing appearance defaults to light; dark choice saves and can be reverted',()=>{const t=boot(null);assert.equal(t.root.dataset.theme,'light');t.clicks.click();assert.equal(t.saved(),'dark');assert.equal(t.attrs['aria-pressed'],'true');t.clicks.click();assert.equal(t.saved(),'light');});
test('saved dark theme applies before DOM ready and synchronizes between tabs',()=>{const t=boot('dark');assert.equal(t.root.dataset.theme,'dark');t.events.storage({key:'opiumBiteTheme',newValue:'light'});assert.equal(t.root.dataset.theme,'light');assert.equal(t.attrs['aria-pressed'],'false');});
test('theme remains usable with blocked storage and ignores invalid saved values',()=>{const t=boot('invalid',true);assert.equal(t.root.dataset.theme,'light');t.clicks.click();assert.equal(t.root.dataset.theme,'dark');});
