import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
const source=readFileSync(new URL('../contact-send.js',import.meta.url),'utf8');
function fixture(error='',{values={},referenceFiles=[{name:'silver.webp',size:22},{name:'sketch.pdf',size:33}],nativeValid=true}={}){
 const callbacks={},events={},elements=[];let submitted=0;
 const button={},picker={},status={};
 const defaults={firstName:'Alex',lastName:'Example',email:'alex@example.test',phone:'+306900000000',subject:'custom-order',message:'Please help me with a custom piece.'};
 const fields=Object.fromEntries(Object.entries({...defaults,...values}).map(([name,value])=>[name,{value,validationMessage:'',setCustomValidity(message){this.validationMessage=message;}}]));
 const form={attrs:{},appendChild(input){elements.push(input);},querySelectorAll(selector){return selector.startsWith('input[required]')?Object.values(fields):elements;},querySelector(){return button;},reportValidity(){return nativeValid&&Object.values(fields).every(field=>!field.validationMessage);},getAttribute(k){return this.attrs[k];},setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];},addEventListener(k,fn){callbacks[k]=fn;}};
 const files=referenceFiles;
 const window={OpiumAttachments:{files,validateFiles:()=>error||(!files.length?'Attach at least one reference file.':'')},addEventListener(k,fn){events[k]=fn;}};
 const document={createElement(){return {dataset:{}};},getElementById(id){return {'contact-form':form,'contact-form-status':status,attachments:picker}[id];},addEventListener(k,fn){callbacks[k]=fn;}};
 class DataTransfer{constructor(){this.files=[];this.items={add:f=>this.files.push(f)};}}
 vm.runInNewContext(source,{window,document,DataTransfer,HTMLFormElement:{prototype:{submit(){submitted++;}}}});
 callbacks.DOMContentLoaded();
 return {window,form,button,picker,status,files,fields,elements,events,submit:()=>callbacks.submit({preventDefault(){}}),submitted:()=>submitted};
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

test('empty or whitespace-only required entries cannot submit',()=>{
 for(const name of ['firstName','lastName','email','phone','subject','message'])for(const value of ['', '   \n\t']){
  const e=fixture('',{values:{[name]:value}});e.submit();
  assert.equal(e.submitted(),0,name);assert.equal(e.elements.length,0,name);
  assert.equal(e.fields[name].validationMessage,'Please complete this field.');
 }
});
test('native validation failures such as an invalid email prevent submission',()=>{
 const e=fixture('',{values:{email:'not-an-email'},nativeValid:false});e.submit();
 assert.equal(e.submitted(),0);assert.equal(e.elements.length,0);
});
test('a missing attachment blocks sending even if native validation is bypassed',()=>{
 const e=fixture('',{referenceFiles:[]});e.submit();assert.equal(e.submitted(),0);
 assert.throws(()=>e.window.OpiumContact.prepareAttachments(e.form,[]),/Attach at least one reference file/);
});
test('all seven visitor fields declare native required validation with no optional labels',()=>{
 const html=readFileSync(new URL('../contact.html',import.meta.url),'utf8');
 for(const id of ['firstName','lastName','email','phone','subject','message','attachments']){
  const tag=html.match(new RegExp('<(?:input|textarea|select)\\b[^>]*\\bid="'+id+'"[^>]*>'))?.[0];
  assert.ok(tag,id);assert.match(tag,/\brequired(?:\s|>|=)/,id);
 }
 assert.doesNotMatch(html, /optional-label|\(optional\)/);
});
