import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../animations.js',import.meta.url),'utf8').split('// Typewriter effect function')[0];
function filmEnvironment({rejectPlayback=false}={}){
    let writes=0,seeks=0,next=0,loads=0,plays=0;
    const events=new Map(),frames=new Map(),timers=new Map();
    let rect={top:2000,bottom:5000,height:3000};
    const style={setProperty(){writes++;}};
    const videos=Array.from({length:3},()=>({style:{setProperty(name,value){writes++;this[name]=value;}},classList:{toggle(){}},play(){plays++;return rejectPlayback?Promise.reject(Error('blocked')):Promise.resolve();},pause(){},load(){loads++;},readyState:0,duration:10,seeking:false,addEventListener(){},removeEventListener(){},get currentTime(){return 0;},set currentTime(value){seeks++;}}));
    const control={hidden:true,addEventListener(name,fn){events.set('play-control',fn);}};
    const film={getBoundingClientRect:()=>rect,querySelectorAll:()=>videos,querySelector:()=>({style})};
    const document={hidden:false,getElementById:()=>control,querySelector:()=>film,addEventListener(name,fn){if(name==='DOMContentLoaded')fn();else events.set(name,fn);}};
    const window={innerHeight:800,matchMedia:()=>({matches:false}),requestAnimationFrame(fn){frames.set(++next,fn);return next;},cancelAnimationFrame(id){frames.delete(id);},clearTimeout(id){timers.delete(id);},setTimeout(fn){timers.set(++next,fn);return next;},addEventListener:(name,fn)=>events.set(name,fn)};
    vm.runInNewContext(source,{document,window,HTMLMediaElement:{HAVE_METADATA:1},Number,Math});
    function scroll(){events.get('scroll')();const tasks=[...frames.values()];frames.clear();tasks.forEach(fn=>fn(100));}
    function tick(){const tasks=[...timers.values()];timers.clear();tasks.forEach(fn=>fn());}
    return {scroll,document,videos,events,control,tick,plays:()=>plays,loads:()=>loads,setRect:value=>rect=value,writes:()=>writes,seeks:()=>seeks,frames,timers};
}
test('homepage film does no animation writes or media seeking outside the viewport',()=>{
    const e=filmEnvironment();assert.equal(e.writes(),0);assert.equal(e.seeks(),0);assert.equal(e.frames.size,0);
    e.scroll();assert.equal(e.writes(),0);assert.equal(e.frames.size,0);
    e.setRect({top:-200,bottom:2800,height:3000});e.scroll();assert.ok(e.writes()>0);
    const writes=e.writes();e.setRect({top:-4000,bottom:-1000,height:3000});e.scroll();assert.equal(e.writes(),writes);assert.equal(e.frames.size,0);
});
test('hidden tabs do not schedule film rendering on scroll',()=>{
    const e=filmEnvironment();e.document.hidden=true;e.setRect({top:0,bottom:3000,height:3000});e.scroll();assert.equal(e.writes(),0);assert.equal(e.frames.size,0);
});

test('stalled visible media gets bounded recovery attempts and stops monitoring off screen',()=>{
    const e=filmEnvironment();e.setRect({top:-200,bottom:2800,height:3000});e.scroll();
    for(let i=0;i<12;i++)e.tick();
    const loads=e.loads();assert.ok(loads>0);
    for(let i=0;i<12;i++)e.tick();assert.equal(e.loads(),loads);
    e.setRect({top:2000,bottom:5000,height:3000});e.scroll();assert.equal(e.timers.size,0);
});
test('restoring a visible tab retries media recovery after suspension',()=>{
    const e=filmEnvironment();e.setRect({top:-200,bottom:2800,height:3000});e.scroll();
    e.document.hidden=true;e.events.get('visibilitychange')();assert.equal(e.timers.size,0);
    e.document.hidden=false;e.events.get('visibilitychange')();e.tick();assert.ok(e.loads()>0);
});

test('visible scroll clips prime playback once instead of decoding hidden clips',async()=>{
 const e=filmEnvironment();assert.equal(e.plays(),0);assert.equal(e.seeks(),0);e.setRect({top:-200,bottom:2800,height:3000});e.scroll();await Promise.resolve();assert.equal(e.plays(),1);e.scroll();await Promise.resolve();assert.equal(e.plays(),1);
});
test('blocked scroll playback exposes a tap control and allows a user retry',async()=>{
 const e=filmEnvironment({rejectPlayback:true});e.setRect({top:-200,bottom:2800,height:3000});e.scroll();await new Promise(setImmediate);assert.equal(e.control.hidden,false);const plays=e.plays();e.events.get('play-control')();await Promise.resolve();assert.ok(e.plays()>plays);
});

test('three film chapters transition directly from design to casting',()=>{
 const e=filmEnvironment();
 for(const [progress,index] of [[.1,0],[.45,1],[.8,2]]){
  e.setRect({top:-progress*2200,bottom:3000-progress*2200,height:3000});e.scroll();
  assert.equal(e.videos[index].style['--video-opacity'],1);
  e.videos.forEach(video=>assert.ok(Number.isFinite(video.style['--video-opacity'])));
 }
});
