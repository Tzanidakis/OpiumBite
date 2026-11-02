import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {webcrypto} from 'node:crypto';
import vm from 'node:vm';
import test from 'node:test';
const source=readFileSync(new URL('../contact-attachments.js',import.meta.url),'utf8');
const window={};vm.runInNewContext(source,{window,document:{addEventListener(){}},TextEncoder,Uint8Array,crypto:webcrypto,btoa:value=>Buffer.from(value,'binary').toString('base64')});
const {validateFiles,createDraft}=window.OpiumAttachments;
const file=(name,content,type='application/octet-stream')=>{const bytes=Buffer.from(content);return {name,type,size:bytes.length,arrayBuffer:async()=>bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength)};};
function parseDraft(draft){
    const parser=`import sys,json,email.policy\nfrom email.parser import BytesParser\nm=BytesParser(policy=email.policy.default).parsebytes(sys.stdin.buffer.read())\nprint(json.dumps({'subject':str(m['subject']),'to':str(m['To']),'unsent':str(m['X-Unsent']),'body':m.get_body(preferencelist=('plain',)).get_content(),'attachments':[{'name':a.get_filename(),'content':list(a.get_payload(decode=True))} for a in m.iter_attachments()]}))`;
    const parsed=spawnSync('python3',['-c',parser],{input:draft,encoding:'utf8'});assert.equal(parsed.status,0,parsed.stderr);return JSON.parse(parsed.stdout);
}
test('email draft contains the exact Unicode message and real binary attachments',async()=>{
    const image=file('σχέδιο.png',[0,255,128,13,10,42],'image/png');const pdf=file('reference.pdf','test PDF bytes','application/pdf');
    const draft=await createDraft({subject:'Ειδική παραγγελία',body:'Όνομα: Μαρία\nΗ ιδέα μου.',files:[image,pdf]});const parsed=parseDraft(draft);
    assert.equal(parsed.subject,'Ειδική παραγγελία');assert.equal(parsed.to,'opiumbite@gmail.com');assert.equal(parsed.unsent,'1');assert.equal(parsed.body.replace(/\r\n/g,'\n'),'Όνομα: Μαρία\nΗ ιδέα μου.');assert.equal(parsed.attachments[0].name,'σχέδιο.png');assert.deepEqual(parsed.attachments[0].content,[0,255,128,13,10,42]);assert.equal(parsed.attachments[1].name,'reference.pdf');
});
test('attachment limits reject excess count, individual size and total size',()=>{
    const small=file('a.png','a','image/png');assert.equal(validateFiles(Array(6).fill(small)),'Choose up to 5 files.');assert.equal(validateFiles([{...small,size:11*1024*1024}]),'Each file must be 10 MB or smaller.');assert.equal(validateFiles([{...small,size:8*1024*1024},{...small,name:'b.png',size:8*1024*1024}]),'Attachments must be 10 MB or smaller in total.');assert.equal(validateFiles([{...small,size:0}]),'Empty files cannot be attached. Choose another file.');
});
test('unsupported executable files are rejected',async()=>{assert.notEqual(validateFiles([file('run.exe','binary')]),'');await assert.rejects(createDraft({subject:'Test',body:'Test',files:[file('run.exe','binary')]}));});
test('long Unicode filenames and subjects remain valid and do not inject email headers',async()=>{
    const subject='Προσωπικό κόσμημα '.repeat(15)+'\r\nBcc: injected@example.test';const name='σχέδιο'.repeat(22)+'.png';
    const draft=await createDraft({subject,body:'Test',files:[file(name,'abc','image/png\r\nBcc: nope')]}),parsed=parseDraft(draft);
    assert.equal(parsed.attachments[0].name,name);assert.equal(parsed.subject,subject.replace(/[\r\n\0]/g,' '));assert.doesNotMatch(draft,/\r\nBcc:/i);assert.ok(draft.split('\r\n').every(line=>line.length<998));
});
test('draft creation reports unreadable or changed files instead of losing the message',async()=>{
    await assert.rejects(createDraft({subject:'Test',body:'Keep me',files:[{name:'bad.pdf',size:2,type:'application/pdf',arrayBuffer:async()=>new ArrayBuffer(1)}]}),/file changed/);
    await assert.rejects(createDraft({subject:'Test',body:'Keep me',files:[{name:'bad.pdf',size:2,type:'application/pdf',arrayBuffer:async()=>{throw Error('unreadable');}}]}),/unreadable/);
});
