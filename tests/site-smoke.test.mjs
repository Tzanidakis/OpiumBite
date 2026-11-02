import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const pages = readdirSync(root).filter(file => file.endsWith('.html')).sort();

function attributes(markup) {
    return Object.fromEntries(
        [...markup.matchAll(/([\w-]+)\s*=\s*["']([^"']*)["']/g)].map(match => [match[1].toLowerCase(), match[2]])
    );
}

test('every page has a responsive viewport, main landmark, and primary heading', () => {
    for (const page of pages) {
        const html = readFileSync(join(root, page), 'utf8');
        assert.match(html, /<meta\s+name=["']viewport["']/i, `${page}: viewport meta is missing`);
        assert.match(html, /<main(?:\s|>)/i, `${page}: main landmark is missing`);
        assert.match(html, /<h1(?:\s|>)/i, `${page}: h1 is missing`);
    }
});

test('ids are unique within each page', () => {
    for (const page of pages) {
        const html = readFileSync(join(root, page), 'utf8');
        const ids = [...html.matchAll(/\sid=["']([^"']+)["']/gi)].map(match => match[1]);
        const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
        assert.deepEqual([...new Set(duplicates)], [], `${page}: duplicate ids`);
    }
});

test('local links, scripts, styles, and media resolve to files', () => {
    for (const page of pages) {
        const html = readFileSync(join(root, page), 'utf8');
        for (const match of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)) {
            const reference = match[1];
            if (!reference || /^(?:https?:|mailto:|tel:|data:|#)/i.test(reference)) continue;
            const pathname = decodeURIComponent(reference.split(/[?#]/)[0]);
            assert.ok(existsSync(join(dirname(join(root, page)), pathname)), `${page}: missing ${pathname}`);
        }
    }
});

test('interactive markup has no placeholder links or unnamed buttons', () => {
    for (const page of pages) {
        const html = readFileSync(join(root, page), 'utf8');
        assert.doesNotMatch(html, /href=["']#["']/i, `${page}: placeholder link found`);

        for (const match of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
            const attrs = attributes(match[1]);
            const text = match[2].replace(/<[^>]*>/g, '').trim();
            assert.ok(attrs['aria-label'] || text, `${page}: unnamed button found`);
        }
    }
});

test('new-window links prevent opener access', () => {
    for (const page of pages) {
        const html = readFileSync(join(root, page), 'utf8');
        for (const match of html.matchAll(/<a\b([^>]*)>/gi)) {
            const attrs = attributes(match[1]);
            if (attrs.target !== '_blank') continue;
            assert.match(attrs.rel || '', /\bnoopener\b/, `${page}: target=_blank link lacks noopener`);
        }
    }
});

test('same-site fragment links point to existing anchors',()=>{
    for(const page of pages){
        const html=readFileSync(join(root,page),'utf8');
        for(const match of html.matchAll(/href=["']([^"']+#[^"']+)["']/g)){
            const reference=match[1];if(/^(https?:|mailto:|tel:)/.test(reference))continue;
            const [path,fragment]=reference.split('#');const target=join(root,path.split('?')[0]||page);
            const ids=[...readFileSync(target,'utf8').matchAll(/\sid=["']([^"']+)["']/g)].map(m=>m[1]);
            assert.ok(ids.includes(fragment),`${page}: missing anchor ${reference}`);
        }
    }
});

test('all standalone and inline browser scripts parse successfully',async()=>{
    const {Script}=await import('node:vm');
    for(const file of readdirSync(root).filter(f=>f.endsWith('.js')))assert.doesNotThrow(()=>new Script(readFileSync(join(root,file),'utf8'),{filename:file}));
    for(const page of pages){for(const match of readFileSync(join(root,page),'utf8').matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)){assert.doesNotThrow(()=>new Script(match[1],{filename:page}));}}
});

test('About includes an accessible native FAQ in both languages',()=>{
    const html=readFileSync(join(root,'about.html'),'utf8');
    assert.match(html,/aria-labelledby="about-faq-title"/);
    assert.match(html,/id="about-faq-title"/);
    assert.equal([...html.matchAll(/<details>/g)].length,5);
    assert.equal([...html.matchAll(/<summary>/g)].length,5);
});
