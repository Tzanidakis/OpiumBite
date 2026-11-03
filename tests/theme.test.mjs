import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
const root=new URL('../',import.meta.url);
test('every page starts in permanent dark appearance without a theme switch script',()=>{
 for(const file of readdirSync(root).filter(name=>name.endsWith('.html'))){
  const html=readFileSync(new URL(file,root),'utf8');
  assert.match(html,/<html[^>]*data-theme="dark"/,file);
  assert.doesNotMatch(html,/theme\.js|class="theme-toggle"/,file);
 }
 const css=readFileSync(new URL('theme.css',root),'utf8');
 assert.match(css,/color-scheme:dark/);
});
