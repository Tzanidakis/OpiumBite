import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
const source = readFileSync(new URL('../page-entry.js', import.meta.url), 'utf8');
function run({type='reload',hash='#collections',pending=null,blockedStorage=false}={}) {
    const events = {}, storage = new Map(pending ? [['opiumBiteLifecycleRestoreV1', JSON.stringify(pending)]] : []);
    const location = {href:'https://example.test/index.html'+hash,pathname:'/index.html',search:'',hash};
    const history = {scrollRestoration:'auto',state:{foo:'bar'},replaceState(state,unused,url){this.state=state;location.href='https://example.test'+url;location.hash='';}};
    const window = {location, y:1700, scrollTo(options){assert.equal(options.behavior,'instant');this.y=options.top;},addEventListener(name,fn){events[name]=fn;}};
    vm.runInNewContext(source,{window,history,performance:{getEntriesByType:()=>[{type}]},Date,document:{addEventListener(name,fn){events[name]=fn;}},sessionStorage:{getItem(k){if(blockedStorage)throw Error('blocked');return storage.get(k)||null;},removeItem:k=>storage.delete(k)}});
    return {window,history,events,storage};
}
test('refresh clears deep anchors and disables browser scroll restoration',()=>{
    const env=run();assert.equal(env.window.y,0);assert.equal(env.window.location.hash,'');assert.equal(env.history.scrollRestoration,'manual');assert.equal(env.history.state.foo,'bar');
    for(const event of ['DOMContentLoaded','load']){env.window.y=900;env.events[event]();assert.equal(env.window.y,0);}
    env.window.y=900;env.events.pageshow({persisted:false});assert.equal(env.window.y,0);
});
test('direct collection links and back navigation retain their normal behavior',()=>{
    for(const type of ['navigate','back_forward']){const env=run({type});assert.equal(env.window.y,1700);assert.equal(env.window.location.hash,'#collections');assert.equal(env.history.scrollRestoration,'auto');}
});
test('explicit refresh discards stale mobile restore positions',()=>{
    const env=run({pending:{url:'https://example.test/index.html#collections',y:1700,savedAt:Date.now()-20000,reason:'mobile-lifecycle-return'}});assert.equal(env.window.y,0);assert.equal(env.storage.size,0);
});
test('automatic mobile app-return reload keeps its valid restore position',()=>{
    const env=run({pending:{url:'https://example.test/index.html#collections',y:1700,savedAt:Date.now(),reason:'mobile-lifecycle-return'}});assert.equal(env.window.y,1700);assert.equal(env.storage.size,1);assert.equal(env.history.scrollRestoration,'auto');
});
test('storage restrictions do not prevent refresh from starting at the top',()=>{assert.equal(run({blockedStorage:true}).window.y,0);});
test('a cached page return does not get forced to the top',()=>{const env=run();env.window.y=800;env.events.pageshow({persisted:true});assert.equal(env.window.y,800);});
