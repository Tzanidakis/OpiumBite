import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
const source=readFileSync(new URL('../contact-attachments.js',import.meta.url),'utf8');
const window={};
vm.runInNewContext(source,{window,document:{addEventListener(){}}});
const {validateFiles}=window.OpiumAttachments;
const file=(name,size=1)=>({name,size});

test('attachment limits reject excess count, individual size and total size',()=>{
    const small=file('a.png');
    assert.equal(validateFiles(Array(6).fill(small)),'Choose up to 5 files.');
    assert.equal(validateFiles([file('a.png',11*1024*1024)]),'Each file must be 10 MB or smaller.');
    assert.equal(validateFiles([file('a.png',8*1024*1024),file('b.png',8*1024*1024)]),'Attachments must be 10 MB or smaller in total.');
    assert.equal(validateFiles([file('a.png',0)]),'Empty files cannot be attached. Choose another file.');
});
test('supported references including Unicode filenames are accepted while executables are rejected',()=>{
    assert.equal(validateFiles([file('σχέδιο.png'),file('reference.PDF'),file('scan.stl'),file('model.obj'),file('references.zip')]),'');
    assert.equal(validateFiles([file('clip.mov',10*1024*1024)]),'');
    assert.equal(validateFiles([]),'');
    assert.notEqual(validateFiles([file('run.exe')]),'');
    assert.notEqual(validateFiles([file('image.png.exe')]),'');
});
