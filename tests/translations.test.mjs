import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
const source=readFileSync(new URL('../translation.js',import.meta.url),'utf8');
const catalogSource=readFileSync(new URL('../translation-data.js',import.meta.url),'utf8');
function environment({blockedStorage=false,saved='en'}={}){
    const all=[],ready=[],storage=new Map([['opiumBiteLanguage',saved]]);
    const text=value=>({nodeType:3,nodeValue:value,parentElement:null});
    function element(tag,attrs={},children=[]){
        const el={tagName:tag.toUpperCase(),nodeType:1,attrs:new Map(Object.entries(attrs)),childNodes:children,innerHTML:'',parentElement:null,
            hasAttribute:k=>el.attrs.has(k),getAttribute:k=>el.attrs.get(k)??null,setAttribute:(k,v)=>el.attrs.set(k,String(v)),
            closest(selector){let node=el;while(node){if(selector.split(',').some(part=>{part=part.trim();return part===node.tagName.toLowerCase() || (part.startsWith('#')&&node.attrs.get('id')===part.slice(1)) || (part.startsWith('.')&&(node.attrs.get('class')||'').split(' ').includes(part.slice(1))) || (part.startsWith('[')&&node.attrs.has(part.slice(1,-1)));}))return node;node=node.parentElement;}return null;},
            addEventListener(){},prepend(node){node.parentElement=el;el.childNodes.unshift(node);}};
        children.forEach(child=>child.parentElement=el);all.push(el);return el;
    }
    const buttonText=text('HOME'),arrow=text('↗'),iconText=text('menu'),labelText=text('First Name'),dynamicText=text('Explore classic grillz ');
    const button=element('a',{},[buttonText,element('span',{'aria-hidden':'true'},[arrow])]);
    const icon=element('span',{class:'material-symbols-outlined'},[iconText]);
    const label=element('label',{},[labelText]);
    const input=element('input',{placeholder:'Your email address','aria-label':'Email address'});input.value='my original user input';
    const dynamic=element('a',{},[dynamicText]);
    const heading=element('h1',{'data-i18n-el':'Άφησε<br>το <em>σημάδι σου.</em>'});heading.innerHTML='Leave<br>your <em>mark.</em>';
    const hamburger=element('button',{'aria-label':'Open navigation menu'});
    const body=element('body',{},[button,icon,label,input,dynamic,heading,hamburger]);
    const title=element('title');
    const document={body,documentElement:{lang:'en'},title:'About Us | Opium Bite',
        addEventListener:(name,fn)=>ready.push(fn),
        querySelector:s=>s==='title'?title:null,
        querySelectorAll:s=>s==='[data-i18n-el]'?all.filter(el=>el.hasAttribute('data-i18n-el')):all.filter(el=>['placeholder','aria-label','title','alt'].some(a=>el.hasAttribute(a))),
        getElementById:()=>null,
        createTreeWalker(root){const nodes=[];const collect=el=>el.childNodes.forEach(c=>c.nodeType===3?nodes.push(c):collect(c));collect(root);let i=0;return {currentNode:null,nextNode(){this.currentNode=nodes[i++];return Boolean(this.currentNode);}};}};
    let observer;
    class Observer{constructor(callback){this.callback=callback;observer=this;}disconnect(){}observe(){}}
    const window={dispatchEvent(){}};
    const sandbox={window,document,NodeFilter:{SHOW_TEXT:4},MutationObserver:Observer,CustomEvent:class{},localStorage:{getItem(k){if(blockedStorage)throw Error();return storage.get(k);},setItem(k,v){if(blockedStorage)throw Error();storage.set(k,v);}}};
    vm.runInNewContext(catalogSource,sandbox);vm.runInNewContext(source,sandbox);ready.forEach(fn=>fn());
    return {api:window.OpiumI18n,buttonText,labelText,arrow,iconText,input,heading,hamburger,dynamicText,dynamic,document,storage,mutate:()=>observer.callback([])};
}
test('Greek covers navigation, form labels and attributes while preserving icons and user input',()=>{
    const e=environment();e.api.setLanguage('el');assert.equal(e.buttonText.nodeValue,'ΑΡΧΙΚΗ');assert.equal(e.labelText.nodeValue,'Όνομα');assert.equal(e.input.getAttribute('placeholder'),'Το email σας');assert.equal(e.input.value,'my original user input');assert.equal(e.iconText.nodeValue,'menu');assert.equal(e.arrow.nodeValue,'↗');assert.equal(e.document.title,'Σχετικά με εμάς | Opium Bite');
});
test('repeated language toggles preserve emphasis, original English, and canonical product text',()=>{
    const e=environment();for(let i=0;i<4;i++){e.api.setLanguage('el');assert.equal(e.heading.innerHTML,'Άφησε<br>το <em>σημάδι σου.</em>');assert.equal(e.api.originalText(e.dynamic),'Explore classic grillz ');e.api.setLanguage('en');assert.equal(e.heading.innerHTML,'Leave<br>your <em>mark.</em>');assert.equal(e.dynamicText.nodeValue,'Explore classic grillz ');assert.equal(e.document.title,'About Us | Opium Bite');}
});
test('dynamic style previews remain Greek and restore the latest English state',()=>{
    const e=environment({saved:'el'});e.dynamicText.nodeValue='Explore iced out grillz ';e.mutate();assert.equal(e.dynamicText.nodeValue,'Ανακάλυψε τα Iced Out grillz ');e.api.setLanguage('en');assert.equal(e.dynamicText.nodeValue,'Explore iced out grillz ');
});
test('dynamic navigation labels stay translated when a menu opens',()=>{
    const e=environment({saved:'el'});e.hamburger.setAttribute('aria-label','Close navigation menu');e.mutate();assert.equal(e.hamburger.getAttribute('aria-label'),'Κλείσιμο μενού πλοήγησης');e.api.setLanguage('en');assert.equal(e.hamburger.getAttribute('aria-label'),'Close navigation menu');
});
test('storage restrictions do not break language switching',()=>{const e=environment({blockedStorage:true});e.api.setLanguage('el');assert.equal(e.document.documentElement.lang,'el');e.api.setLanguage('en');assert.equal(e.buttonText.nodeValue,'HOME');});
test('saved language applies on load and dynamic product sizes are localized',()=>{const e=environment({saved:'el'});assert.equal(e.labelText.nodeValue,'Όνομα');assert.equal(e.api.t('Size 12'),'Μέγεθος 12');assert.equal(e.api.t('View 24K Gold Classic'),'Προβολή: Κλασικός χρυσός 24Κ');assert.equal(e.api.t('Opium Bite'),'Opium Bite');});
test('refreshing translations does not overwrite newly entered user text',()=>{const e=environment({saved:'el'});e.input.value='Δική μου ιδέα';e.mutate();e.api.setLanguage('en');assert.equal(e.input.value,'Δική μου ιδέα');});
test('catalog card links keep product IDs and material choices when labels become Greek',()=>{
    let language='en';
    const events={};
    class Element {
        constructor(tag){this.tag=tag;this.children=[];this.dataset={};this.attrs={};}
        append(...children){this.children.push(...children);}
        setAttribute(key,value){this.attrs[key]=value;}
        querySelector(){return null;}
    }
    const window={addEventListener:(name,fn)=>events[name]=fn,OpiumI18n:{t:text=>language==='el'?'Ελληνικά '+text:text,refresh(){}}};
    const context={window,URL,URLSearchParams,Intl};
    vm.runInNewContext(readFileSync(new URL('../product-catalog.js',import.meta.url),'utf8'),context);
    for(const [file,category] of Object.entries({'classic.html':'classic','capital-custom.html':'opium','earrings.html':'earrings','necklaces.html':'necklaces'})){
        const html=readFileSync(new URL('../'+file,import.meta.url),'utf8');
        assert.match(html,new RegExp('data-catalog-category="'+category+'"'));
        const container=new Element('div'),section={dataset:{catalogCategory:category},querySelector:()=>container};
        context.document={documentElement:{lang:'en'},querySelector:()=>section,createElement:tag=>new Element(tag)};
        language='en';
        vm.runInNewContext(readFileSync(new URL('../catalog-collections.js',import.meta.url),'utf8'),context);
        const products=window.OpiumProducts.products.filter(p=>p.category===category);
        assert.equal(container.children.length,products.length);
        const links=container.children.map(card=>card.children[1]);
        const original=links.map(link=>link.href);
        language='el';context.document.documentElement.lang='el';events['opiumbite:language-change']();
        links.forEach((link,index)=>{
            assert.equal(link.href,original[index]);
            const url=new URL(link.href,'https://example.test');
            assert.equal(url.searchParams.get('id'),products[index].id);
            assert.equal(url.searchParams.get('material'),'silver');
            assert.match(link.attrs['aria-label'],/^Ελληνικά View /);
        });
    }
});

test('product enquiry prefill localizes site-generated text without changing size values',()=>{
    const env=environment({saved:'el'});
    const html=readFileSync(new URL('../contact.html',import.meta.url),'utf8');
    const script=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
    const fields={subject:{value:''},message:{value:''}};
    vm.runInNewContext(script,{URLSearchParams,window:{location:{search:'?product=24K+Gold+Classic&price=%24299&details=Number+Size%3A+Size+8'},OpiumI18n:env.api},document:{addEventListener:(name,fn)=>fn(),getElementById:id=>fields[id],querySelector:()=>({addEventListener(){}})}});
    assert.equal(fields.subject.value,'custom-order');
    assert.match(fields.message.value,/Ενδιαφέρομαι για: Κλασικός χρυσός 24Κ/);
    assert.match(fields.message.value,/Μέγεθος δαχτυλιδιού: Μέγεθος 8/);
    assert.match(fields.message.value,/\$299/);
});
