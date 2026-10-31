/* Sam's Table recipe scaler: ½× 1× 2× */
(function(){
var UF={'½':.5,'⅓':1/3,'⅔':2/3,'¼':.25,'¾':.75,'⅛':.125,'⅜':.375,'⅝':.625,'⅞':.875};
var NUM='(?:\\d+\\s*[½⅓⅔¼¾⅛⅜⅝⅞]|\\d+\\s+\\d+/\\d+|\\d+/\\d+|\\d+(?:\\.\\d+)?|[½⅓⅔¼¾⅛⅜⅝⅞])';
var RANGE='('+NUM+')(?:\\s*(?:–|-|—|to|or)\\s*('+NUM+'))?';
function pn(s){s=s.trim();var m;
  if(m=s.match(/^(\d+)\s*([½⅓⅔¼¾⅛⅜⅝⅞])$/))return +m[1]+UF[m[2]];
  if(m=s.match(/^(\d+)\s+(\d+)\/(\d+)$/))return +m[1]+m[2]/m[3];
  if(m=s.match(/^(\d+)\/(\d+)$/))return m[1]/m[2];
  if(UF[s]!=null)return UF[s];return parseFloat(s);}
var FR=[[0,''],[.125,'⅛'],[.25,'¼'],[1/3,'⅓'],[.375,'⅜'],[.5,'½'],[.625,'⅝'],[2/3,'⅔'],[.75,'¾'],[.875,'⅞'],[1,'']];
function nf(x,simple){ // nice fraction
  var w=Math.floor(x+1e-9),r=x-w,best=FR[0],bd=9;
  FR.forEach(function(f){if(simple&&/[⅜⅝⅞]/.test(f[1]))return;var d=Math.abs(r-f[0]);if(d<bd-1e-9){bd=d;best=f}});
  if(best[0]===1){w++;best=FR[0]}
  if(w===0&&!best[1])return x>0?(simple?'⅛':'⅛'):'0';
  return (w?w:'')+best[1];}
function fits(x){var r=x-Math.floor(x);return FR.some(function(f){return Math.abs(r-f[0])<.02})}
function plural(u,n){return n>1+1e-9?u:u}
// unit table
var VOL={tsp:1,teaspoon:1,tbsp:3,tablespoon:3,cup:48};
var UNIT='(teaspoons?|tsp|tablespoons?|tbsp|cups?|fl\\.? oz|oz|ounces?|lbs?|pounds?|g|kg|ml|liters?|l|inch(?:es)?|drops?|cloves?|stalks?|cans?|tins?|jars?|boxes|box|packets?|packages?|blocks?|sticks?|bunch(?:es)?|handfuls?|heads?|slices?|pieces?)\\b';
function vol(tsp,abbr,orig){ // tsp -> kitchen-friendly words
  var T=abbr?['tsp','tsp']:['teaspoon','teaspoons'],B=abbr?['tbsp','tbsp']:['tablespoon','tablespoons'],C=['cup','cups'];
  function w(n,a){return nf(n,1)+' '+(n>1+1e-9?a[1]:a[0])}
  function near(x,st){return Math.abs(x/st-Math.round(x/st))<.02}
  function niceCup(c){var r=c-Math.floor(c);return [0,.25,1/3,.5,2/3,.75].some(function(v){return Math.abs(r-v)<.01})}
  function tspW(t){ if(near(t,.125)&&!near(t,.25)&&t<1){var q=Math.floor(t*4)/4;return (q?nf(q)+' + ':'')+'⅛ '+T[0]} return w(Math.round(t*8)/8,T)}
  function tbspW(t){if(orig=='tsp'&&t<=8+1e-9&&!near(t,1.5))return tspW(t);var b=t/3,wb=near(t,1.5)?Math.round(b*2)/2:Math.floor(b+1e-9),r=t-wb*3; if(r<.05)return w(wb,B); return (wb?w(wb,B)+' + ':'')+tspW(r)}
  var c=tsp/48;
  if(tsp>=12-1e-9&&niceCup(c))return w(c,C);
  if(tsp<3-1e-9)return tspW(tsp);
  if(tsp<=18+1e-9||orig!='cup'&&tsp<24)return tbspW(tsp);
  var cw=[0,.25,1/3,.5,2/3,.75].map(function(v){return Math.floor(c)+v}).filter(function(v){return v<=c+1e-9}).pop();
  return w(cw,C)+' + '+tbspW(tsp-cw*48);}
function metric(x){if(x<10)return Math.max(1,Math.round(x*2)/2);if(x<100)return Math.round(x/5)*5;if(x<500)return Math.round(x/10)*10;return Math.round(x/25)*25;}
function fmtQ(a,b,unit,f,ctx){ // returns string or null
  var u=(unit||'').toLowerCase().replace(/\.$/,''),A=a*f,Bv=b!=null?b*f:null;
  var key=u.replace(/s$/,'').replace(/^tsp$/,'tsp').replace(/^tbsp$/,'tbsp');
  if(/^(teaspoon|tsp|tablespoon|tbsp|cup)$/.test(key)){
    var abbr=/^(tsp|tbsp)$/.test(key),o=key=='cup'?'cup':(/^(tsp|teaspoon)$/.test(key)?'tsp':'tbsp');
    if(Bv==null)return vol(A*VOL[key],abbr,o);
    // range: keep same unit when it reads well
    var s1=vol(A*VOL[key],abbr,o),s2=vol(Bv*VOL[key],abbr,o),u1=s1.replace(/^[\d½⅓⅔¼¾⅛⅜⅝⅞]+ /,''),u2=s2.replace(/^[\d½⅓⅔¼¾⅛⅜⅝⅞]+ /,'');
    if(u1.replace(/s$/,'')==u2.replace(/s$/,'')&&!/\+/.test(s1+s2))return s1.split(' ')[0]+'–'+s2;
    var t1=A*VOL[key]/3,t2=Bv*VOL[key]/3;
    if(/\+/.test(s1+s2)&&t2<=16.01&&t1>=1)return nf(Math.round(t1*2)/2)+'–'+nf(Math.round(t2*2)/2)+(abbr?' tbsp':' tablespoons');
    return s1+' to '+s2;}
  if(/^(g|ml|kg|l|liter)$/.test(key)){var r=function(x){return key=='g'||key=='ml'?metric(x):Math.round(x*100)/100};
    var o2=unit; if(key=='g'&&A>=1000){return (Math.round(A/100)/10)+' kg'}
    if(key=='ml'&&A>=1000){return (Math.round(A/100)/10)+' liters'}
    if(/^l|liter/i.test(unit)){var ml=A*1000;return (ml<1000?metric(ml)+' ml':(Math.round(A*10)/10)+(A>1?' liters':' liter'))}
    return r(A)+(Bv!=null?'–'+r(Bv):'')+(unit==='g'||unit==='ml'?' ':' ')+unit;}
  if(key=='oz'||key=='ounce'||key=='fl oz'||key=='fl. oz'){
    if(key!='fl oz'&&key!='fl. oz'&&Bv==null&&A>=16-1e-9&&fits(A/16)&&Math.abs(A/16*4-Math.round(A/16*4))<.02)return nf(A/16)+' lb';
    return nf(A)+(Bv!=null?'–'+nf(Bv):'')+' '+unit;}
  if(key=='lb'||key=='pound'){var lab=key=='pound'?(A>1?'pounds':'pound'):(A>1&&/lbs/.test(u)?'lbs':'lb');
    if(Bv==null&&A<1-1e-9&&!fits(A*4))return nf(A*16)+' oz';
    return nf(A)+(Bv!=null?'–'+nf(Bv):'')+' '+lab;}
  return null;}
// countables
var HALVABLE=/\b(onions?|lemons?|limes?|oranges?|carrots?|cucumbers?|jalapeños?|shallots?|peppers?|tomato(?:es)?|avocados?|lemon|breasts?|zucchinis?|apples?|potato(?:es)?|stalks?|sticks?|heads?|bunch(?:es)?|cans?|tins?|jars?|blocks?|packets?|packages?|box(?:es)?|inch(?:es)?|handfuls?|chilies|chilis?)\b/i;
var EGG=/\beggs?\b(?!\s*(white|yolk))/i, EGGPART=/\begg (whites?|yolks?)\b/i;
var CONT=/^\s*(?:\(([^)]*)\)\s*)?(cans?|tins?|jars?|box(?:es)?|blocks?|packages?|packets?)\b\s*(?:\(([^)]*)\))?/i;
var ADJ={};'large medium small big extra-large yellow red green white sweet english persian whole fresh dried frozen warm hot cold small'.split(' ').forEach(function(a){ADJ[a]=1});
var IRR={chilies:'chili',chilis:'chili',tomatoes:'tomato',potatoes:'potato',jalapeños:'jalapeño',boxes:'box',bunches:'bunch',inches:'inch',leaves:'leaf'};
function sing(w){var l=w.toLowerCase();if(IRR[l])return IRR[l];if(/(ch|sh|x)es$/.test(l))return w.slice(0,-2);if(/ies$/.test(l))return w.slice(0,-3)+'y';if(/[^s]s$/.test(l))return w.slice(0,-1);return w}
function plur(w){var l=w.toLowerCase();if(/s$/.test(l))return w;for(var k in IRR)if(IRR[k]==l)return k;if(/(ch|sh|x)$/.test(l))return w+'es';if(/[^aeiou]y$/.test(l))return w.slice(0,-1)+'ies';return w+'s'}
var MEAS=/^(cloves?|stalks?|cans?|tins?|jars?|box(?:es)?|packets?|packages?|blocks?|sticks?|bunch(?:es)?|handfuls?|heads?|pieces?|inch(?:es)?|slices?|drops?)$/i;
function fixNoun(rest,many){
  var lp=rest.match(/^\s*\([^)]*\)/);if(lp)return lp[0]+fixNoun(rest.slice(lp[0].length),many); // adjust the counted noun's number
  var m=rest.match(/^(\s*)([^,(;]*)/);var seg=m[2],words=seg.split(/(\s+)/);
  var idx=-1;
  for(var i=0;i<words.length;i+=2){if(MEAS.test(words[i])){idx=i;break}}
  if(idx<0){var cut=seg.search(/\s(for|to|of)\s/i);var segw=(cut>=0?seg.slice(0,cut):seg).trim().split(/\s+/);
    var last=segw[segw.length-1]||'';idx=-1;var pos=0;for(var j=0;j<words.length;j+=2){if(words[j]===last){idx=j;}}}
  if(idx<0)return rest;var w=words[idx];if(!/^[a-zà-ÿ-]+$/i.test(w))return rest;
  words[idx]=many?plur(w):sing(w);return m[1]+words.join('')+rest.slice(m[0].length);}
function scaleCount(a,b,f,rest){
  var A=a*f,Bv=b!=null?b*f:null,note='';
  var noun=rest;
  if(EGG.test(noun.slice(0,30))&&!EGGPART.test(noun)){
    if(Math.abs(A-Math.round(A))>.01){var w=Math.ceil(A);note=' (beat '+(w)+' and use '+(Math.floor(A)?'all but half of one':'half')+', about 2 tablespoons per half egg)';
      if(Math.floor(A)===0){return {q:'1',rest:fixNoun(rest,false),note:' (beat it and use half, about 2 tablespoons)'}}
      return {q:nf(A),rest:fixNoun(rest,true),note:' (beat the last egg and use half of it)'}}
  }
  var halv=HALVABLE.test(rest.slice(0,40));
  function rd(x){if(halv)return Math.max(.25,Math.round(x*4)/4); if(x<1)return 1; return Math.round(x)}
  A=rd(A); if(Bv!=null)Bv=rd(Bv);
  if(!halv&&a*f<1-1e-9&&Bv==null) note=EGGPART.test(rest)?' (use about half)':' (or about half of one)';
  var q=nf(A)+(Bv!=null&&Bv!==A?'–'+nf(Bv):'');
  var top=Bv!=null?Bv:A;
  return {q:q,rest:fixNoun(rest,top>1+1e-9),note:note};}
var SKIP_AFTER=/^\s*(?:-?\s*inch|°|%|-(?:pound|lb|oz|ounce))/i;
// scale every "number unit" in free text (not the leading one)
function scaleUnits(s,f){
  var re=new RegExp('(^|[^\\d/.])'+RANGE+'\\s*'+UNIT.replace('inch(?:es)?|','').replace('|cloves?','').replace('|drops?',''),'gi');
  return s.replace(re,function(all,pre,a,b,u){var out=fmtQ(pn(a),b?pn(b):null,u,f);return out?pre+out:all});}
function scaleLine(text,f){
  if(f===1)return {t:text,ok:true};
  var low=text.toLowerCase();
  if(!/\d|[½⅓⅔¼¾⅛]/.test(text))return {t:text,ok:true,fixed:true};
  if(/^\s*(pinch|a pinch|dash)/i.test(text))return {t:text,ok:true,fixed:true};
  var m=text.match(new RegExp('^(\\s*(?:juice of|zest of|about|a heaping|heaping)?\\s*)'+RANGE+'(\\s*)','i'));
  if(!m)return {t:text,ok:false};
  var pre=m[1],a=pn(m[2]),b=m[3]?pn(m[3]):null,after=text.slice(m[0].length);
  var sp=m[4]||' ';
  if(/^\s*-?\s*inch(es)?\s+piece/i.test(after)){var A1=a*f;return {t:pre+nf(A1)+(b!=null?'–'+nf(b*f):'')+' '+after.replace(/^\s*-?\s*/,''),ok:true}}
  if(SKIP_AFTER.test(after)||/^\s*\(\d[^)]*-inch\)/i.test(after))return {t:text,ok:false};
  var um=after.match(new RegExp('^'+UNIT,'i')),out,rest,note='';
  if(um&&fmtQ(a,b,um[1],f)){
    var u=um[1];
    if(/^(teaspoon|tsp|tablespoon|tbsp|cup)s?$/i.test(u)&&/(^|\W)(each)\b/i.test(after)){}
    out=fmtQ(a,b,u,f);rest=after.slice(um[0].length);
    rest=scaleUnits(rest,f);
    if(/^(teaspoon|tsp|tablespoon|tbsp|cup)s?$/i.test(u)){var k2=u.toLowerCase().replace(/s$/,'');rest=rest.replace(/\b(\d+) for\b/g,function(x,n){return vol(n*f*VOL[k2],/^t(s|b)/.test(k2)&&k2.length<5,k2=='cup'?'cup':(/^(tsp|teaspoon)$/.test(k2)?'tsp':'tbsp'))+' for'})}
    // drop a parenthetical that now repeats the main amount
    rest=rest.replace(/^\s*\(([^)]*)\)/,function(all,inner){return inner.trim()==out?'':all});
    return {t:pre+out+rest,ok:true};}
  after=sp+after;
  var cm=after.match(CONT);
  if(cm){ // containers: package size stays, count scales
    var c=scaleCount(a,b,f,after),A=a*f;
    var hint='';if(Math.abs(A-Math.round(A))>.01){var pk=(cm[1]||cm[3]||'');var sp=scaleUnits(pk.replace(/[–-]\s*[\d.]+(?=\s*oz)/,''),A/ (Math.round(A)||1) * (1));
      if(pk){var sizes=scaleUnits(pk.replace(/(\d)\s*[–-]\s*[\d.]+/g,'$1'),A);hint=' (use about '+sizes.replace(/\s*\/\s*/,' / ')+')';}}
    var r2=c.rest.replace(/\((\d+) (\d)\/(\d)/,function(x,w,n,d){return '('+w+nf(n/d)}); if(cm[1]){r2=r2.replace(/^\s*\(([^)]*)\)\s*(\S+)/,function(x,pk,cw){return ' '+cw+' ('+pk+')'})}
    if(hint)r2=r2.replace(/(,|$)/,hint+'$1');
    return {t:pre+c.q+(A>1+1e-9?r2:r2),ok:true};}
  if(after.match(/^\s*\(/)&&!cm){ /* e.g. 1 (9-inch) crust */ }
  var c2=scaleCount(a,b,f,after);
  var lp2=c2.rest.match(/^\s*\([^)]*\)/)||[''];
  var r3=lp2[0]+scaleUnits(c2.rest.slice(lp2[0].length),f);
  var lead=c2.q;
  return {t:pre+lead+r3+c2.note,ok:true};}
function scaleYield(t,f){ if(f===1)return t;
  return t.replace(new RegExp(RANGE+'(?!\\s*-?\\s*inch)(?![\\d/])','g'),function(all,a,b){var A=pn(a)*f,Bv=b?pn(b)*f:null;
    function r(x){return x>=3?Math.round(x):nf(x)}return r(A)+(Bv!=null?'–'+r(Bv):'')});}
if(typeof module!=='undefined'){module.exports={scaleLine:scaleLine,scaleYield:scaleYield};return}
function init(){
  var h=[].slice.call(document.querySelectorAll('.recipe h3')).filter(function(x){return /ingredients/i.test(x.textContent)})[0];
  if(!h)return;var box=h.parentNode,lis=[].slice.call(box.querySelectorAll('li'));if(!lis.length)return;
  var yEl=null;[].slice.call(document.querySelectorAll('.recipe .meta div')).forEach(function(d){var b=d.querySelector('b');if(b&&/serves|makes|yield/i.test(b.textContent)&&/\d/.test(d.textContent))yEl=d.querySelector('span')});
  var yOrig=yEl&&yEl.textContent;
  var orig=lis.map(function(li){return [].slice.call(li.childNodes).filter(function(n){return n.nodeType===3}).map(function(n){return [n,n.nodeValue]})});
  var bar=document.createElement('div');bar.className='scaler noprint';bar.setAttribute('role','group');bar.setAttribute('aria-label','Recipe size');
  bar.innerHTML='<span class="scaler-l" aria-hidden="true">Make</span>'+[['0.5','½×','Half recipe'],['1','1×','Original recipe'],['2','2×','Double recipe']].map(function(o){return '<button type="button" data-f="'+o[0]+'" aria-label="'+o[2]+'" aria-pressed="'+(o[0]=='1')+'">'+o[1]+'</button>'}).join('');
  var note=document.createElement('p');note.className='scaler-note';note.setAttribute('aria-live','polite');
  h.insertAdjacentElement('afterend',bar);bar.insertAdjacentElement('afterend',note);
  function apply(f){
    var bad=0;
    lis.forEach(function(li,i){li.classList.remove('ns');
      orig[i].forEach(function(p,j){var r=j===0?scaleLine(p[1],f):{t:p[1],ok:true};
        p[0].nodeValue=r.t;if(!r.ok&&f!==1){li.classList.add('ns');bad++}})});
    if(yEl)yEl.textContent=scaleYield(yOrig,f);
    [].forEach.call(bar.querySelectorAll('button'),function(b){b.setAttribute('aria-pressed',String(+b.dataset.f===f))});
    note.textContent=f===1?'':(f<1?'Halved. ':'Doubled. ')+'Cooking times and pan size may need adjusting.'+(bad?' Amounts marked * stay as written, so adjust those yourself.':'');}
  bar.addEventListener('click',function(e){var b=e.target.closest('button');if(b)apply(+b.dataset.f)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
