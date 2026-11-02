import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
const source=readFileSync(new URL('../contact-send.js',import.meta.url),'utf8');
function fixture(error=''){
 const callbacks={},events={},elements=[];let submitted=0;
 const button={},picker={},status={};
 const form={attrs:{},appendChild(input){elements.push(input);},querySelectorAll(){return elements;},querySelector(){return button;},reportValidity(){return true;},getAttribute(k){return this.attrs[k];},setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];},addEventListener(k,fn){callbacks[k]=fn;}};
 const files=[{name:'silver.webp',size:22},{name:'sketch.pdf',size:33}];
 const window={OpiumAttachments:{files,validateFiles:()=>error},addEventListener(k,fn){events[k]=fn;}};
 const document={createElement(){return {dataset:{}};},getElementById(id){return {'contact-form':form,'contact-form-status':status,attachments:picker}[id];},addEventListener(k,fn){callbacks[k]=fn;}};
 class DataTransfer{constructor(){this.files=[];this.items={add:f=>this.files.push(f)};}}
 vm.runInNewContext(source,{window,document,DataTransfer,HTMLFormElement:{prototype:{submit(){submitted++;}}}});
 callbacks.DOMContentLoaded();
 return {window,form,button,picker,status,files,elements,events,submit:()=>callbacks.submit({preventDefault(){}}),submitted:()=>submitted};
}
test('direct send keeps real attachments and posts once without opening a mail app',()=>{
 const e=fixture();e.submit();e.submit();assert.equal(e.submitted(),1);
 assert.deepEqual(e.elements.map(x=>x.name),['attachment1','attachment2']);
 assert.equal(e.elements[0].files[0],e.files[0]);assert.equal(e.elements[1].files[0],e.files[1]);
 assert.equal(e.button.disabled,true);assert.doesNotMatch(e.status.textContent,/sent successfully/i);
});
test('invalid attachments preserve the form and prevent sending',()=>{
 const e=fixture('too large');e.submit();assert.equal(e.submitted(),0);assert.equal(e.button.disabled,false);assert.equal(e.picker.disabled,false);assert.match(e.status.textContent,/still here/);
});
test('returning from the submission service restores a usable send button',()=>{
 const e=fixture();e.submit();e.events.pageshow();assert.equal(e.button.disabled,false);assert.equal(e.picker.disabled,false);assert.equal(e.form.getAttribute('aria-busy'),undefined);
});
