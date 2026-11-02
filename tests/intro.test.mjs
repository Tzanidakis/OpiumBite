import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
const source=readFileSync(new URL('../opening-intro.js',import.meta.url),'utf8').split('// Scroll-controlled homepage film.')[0];
const key='opiumBiteIntroVisitV3';
function visit({local=new Map(),session=new Map(),blockLocal=false,mobile=false,rejectPlayback=false,lifecycle=false,innerReturning=false,readyState='complete',navigationType='navigate',referrer=''}={}){
    const callbacks=[],events=new Map(),timers=[];let now=0,plays=0,pauses=0;
    const classes=()=>{const set=new Set();return {add:(...a)=>a.forEach(x=>set.add(x)),remove:(...a)=>a.forEach(x=>set.delete(x)),contains:x=>set.has(x)};};
    const element=()=>{const listeners=new Map();return {style:{removeProperty(name){delete this[name];}},classList:classes(),dataset:{},addEventListener:(name,fn)=>listeners.set(name,fn),fire(name){listeners.get(name)?.();},click(){listeners.get('click')?.();}};};
    const screen=element(),button=element(),main=element(),video=element(),introPlay=element();introPlay.hidden=true;video.loop=true;video.play=()=>{plays++;return rejectPlayback?Promise.reject(Error('autoplay')):Promise.resolve();};video.pause=()=>pauses++;
    if(lifecycle)screen.classList.add('lifecycle-refresh-screen');
    const elements={'loading-screen':screen,'bite-button':button,'main-content':main,'opening-video':video,'intro-play':introPlay};
    if(innerReturning)delete elements['loading-screen'];
    const document={referrer,body:element(),hidden:false,readyState,getElementById:id=>elements[id],addEventListener(name,fn){if(name==='DOMContentLoaded')callbacks.push(fn);else events.set(name,fn);},removeEventListener(name){events.delete(name);}};
    const window={location:{origin:'https://opiumbite.com'},matchMedia:()=>({matches:mobile}),addEventListener:(name,fn)=>events.set(name,fn),dispatchEvent(){}};
    const storage=(map,blocked)=>({getItem(k){if(blocked)throw Error('blocked');return map.get(k)||null;},setItem(k,v){if(blocked)throw Error('blocked');map.set(k,v);}});
    const sandbox={document,window,navigator:{platform:mobile?'iPhone':'MacIntel',maxTouchPoints:mobile?5:0,userAgent:mobile?'iPhone':'Macintosh'},localStorage:storage(local,blockLocal),sessionStorage:storage(session,false),setTimeout(fn,delay){const timer={fn,at:now+delay};timers.push(timer);return timer;},clearTimeout(timer){const i=timers.indexOf(timer);if(i>=0)timers.splice(i,1);},performance:{now:()=>now,getEntriesByType:()=>[{type:navigationType}]},URL,CustomEvent:class{}};
    vm.runInNewContext(source,sandbox);callbacks[0]();
    function settle(){while(timers.length){timers.sort((a,b)=>a.at-b.at);const task=timers.shift();now=task.at;task.fn();}}
    return {local,session,screen,button,main,video,introPlay,document,events,settle,plays:()=>plays,pauses:()=>pauses};
}

test('fresh opening shows the image intro without any video playback',()=>{
 const e=visit();assert.equal(e.screen.style.display,'flex');assert.equal(e.plays(),0);assert.equal(e.main.style.visibility,'hidden');assert.equal(e.button.textContent,'make them bite your dust');
});
test('reopening the link repeats the image introduction',()=>{
 const first=visit();for(const mobile of [false,true])for(const referrer of ['', 'https://google.com/']){
 const e=visit({session:first.session,mobile,referrer});assert.equal(e.screen.style.display,'flex');assert.equal(e.main.style.visibility,'hidden');assert.equal(e.plays(),0);
 }
});
test('internal navigation and desktop reload skip the intro',()=>{
 const first=visit();for(const options of [{referrer:'https://opiumbite.com/classic'},{navigationType:'reload'},{navigationType:'back_forward'}]){
 const e=visit({session:first.session,...options});assert.equal(e.screen.style.display,'none');assert.equal(e.main.style.visibility,'visible');
 }
});
test('mobile refresh keeps the loading text and bar',()=>{
 const e=visit({mobile:true,navigationType:'reload',session:new Map([[key,'true']])});assert.equal(e.screen.classList.contains('device-loading'),true);e.settle();assert.equal(e.screen.style.display,'none');assert.equal(e.main.style.visibility,'visible');
});
test('clicking make them bite your dust reveals the page and unlocks scrolling',()=>{
 const e=visit();e.button.click();e.settle();assert.equal(e.screen.style.display,'none');assert.equal(e.main.style.visibility,'visible');assert.equal(e.document.body.style.overflow,undefined);
});
test('image intro automatically releases the page even if the image cannot load',()=>{
 const e=visit();e.settle();assert.equal(e.screen.style.display,'none');assert.equal(e.main.style.visibility,'visible');
});
test('escape dismisses the intro',()=>{
 const e=visit();e.events.get('keydown')({key:'Escape'});e.settle();assert.equal(e.main.style.visibility,'visible');
});
test('lifecycle refresh owns its loader independently of the image intro',()=>{
 const e=visit({lifecycle:true,mobile:true});assert.equal(e.screen.style.display,undefined);assert.equal(e.main.style.visibility,undefined);
});
test('internal inner page visits do not create another intro',()=>{
 const e=visit({innerReturning:true,session:new Map([[key,'true']]),referrer:'https://opiumbite.com/classic'});assert.equal(e.main.style.visibility,undefined);
});
test('mobile refresh finishes even if load stalls',()=>{
 const e=visit({session:new Map([[key,'true']]),navigationType:'reload',mobile:true,readyState:'interactive'});e.settle();assert.equal(e.screen.style.display,'none');
});
