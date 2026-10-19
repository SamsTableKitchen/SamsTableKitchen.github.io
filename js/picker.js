/* "What should I make?" recipe picker. Data: /data/picker.js (built from every recipe and meal-prep page). */
(function(){
if(typeof PICKS==='undefined')return;
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var LS=window.localStorage;function get(k,d){try{var v=JSON.parse(LS.getItem(k));return v==null?d:v}catch(e){return d}}function set(k,v){try{LS.setItem(k,JSON.stringify(v))}catch(e){}}
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var MEALS=[['any','Any'],['Breakfast','Breakfast'],['Main','Lunch & dinner'],['Side','Side'],['Snack','Snack'],['Dessert','Dessert'],['Sauce','Sauce'],['Appetizer','Appetizer']];
var TIMES=[['any','Any time'],['30','Under 30 min'],['60','Under 1 hr']];
var DIETS=[['any','Anything'],['vegetarian','Vegetarian'],['vegan','Vegan']];
var HAVE=['Chicken','Beef','Pork','Turkey','Seafood','Tofu','Eggs','Beans & lentils','Pasta','Rice','Potatoes'];
var key=function(p){return p.u.replace(/^\/posts\//,'').replace(/\.html$/,'')};
var byKey={};PICKS.forEach(function(p){byKey[key(p)]=p});
var st=get('st-pk-f',{});st={meal:st.meal||'any',time:st.time||'any',diet:st.diet||'any',mp:!!st.mp,have:st.have||[]};
var q=new URLSearchParams(location.search),pre=false;
['meal','time','diet'].forEach(function(k){if(q.get(k)){st[k]=q.get(k);pre=true}});if(q.get('mp')){st.mp=q.get('mp')==='1';pre=true}
if(pre)st.have=[];
var recent=get('st-pk-recent',[]).filter(function(k){return byKey[k]}),current=null;

function chips(el,list,name,multi){el.innerHTML=list.map(function(x){var v=typeof x==='string'?x:x[0],l=typeof x==='string'?x:x[1];
  var on=multi?st.have.indexOf(v)>-1:st[name]===v;return '<button type="button" class="chip'+(on?' on':'')+'" aria-pressed="'+on+'" data-v="'+v+'">'+l+'</button>'}).join('');
  el.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var v=b.getAttribute('data-v');
    if(multi){var i=st.have.indexOf(v);i>-1?st.have.splice(i,1):st.have.push(v)}else st[name]=v;
    $$('button',el).forEach(function(x){var on=multi?st.have.indexOf(x.getAttribute('data-v'))>-1:x.getAttribute('data-v')===st[name];x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)});
    update()})}

function base(){return PICKS.filter(function(p){
  if(st.meal!=='any'&&p.m.indexOf(st.meal)<0)return false;
  if(st.time!=='any'&&!(p.min&&p.min<=+st.time))return false;
  if(st.diet==='vegetarian'&&!p.d)return false;if(st.diet==='vegan'&&p.d!=='vegan')return false;
  if(st.mp&&!p.mp)return false;return true})}
function pool(){var b=base();if(!st.have.length)return b;
  var all=b.filter(function(p){return st.have.every(function(h){return p.h.indexOf(h)>-1})});
  return all.length?all:b.filter(function(p){return st.have.some(function(h){return p.h.indexOf(h)>-1})})}

function fmt(m){if(!m)return '';if(m>=1440){var d=Math.round(m/1440);return d+' day'+(d>1?'s':'')}var h=Math.floor(m/60),r=m%60;return (h?h+' hr':'')+(h&&r?' ':'')+(r?r+' min':'')}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function mealLabel(p){return p.m.map(function(m){return m==='Main'?'Lunch & dinner':m}).join(' · ')}

function update(){set('st-pk-f',st);var p=pool(),n=p.length;
  $('#pk-count').innerHTML=n?'<b>'+n+'</b> recipe'+(n>1?'s':'')+' match'+(n>1?'':'es'):'No recipes match yet';
  $('#pk-go').disabled=!n;
  $('#pk-all-n').textContent=n;$('#pk-all').hidden=!n;
  $('#pk-list').innerHTML=p.slice().sort(function(a,b){return a.t.localeCompare(b.t)}).map(function(r){return '<li><a href="'+r.u+'">'+esc(r.t)+'</a> <small>'+(r.min?(r.est?'≈ ':'')+fmt(r.min):'')+'</small></li>'}).join('');
  if(!n)empty();else if($('.pk-empty'))$('#pk-res').innerHTML='';}

function empty(){$('#pk-res').innerHTML='<div class="pk-empty" role="status"><h2>Nothing matches all of that</h2><p>No recipe fits every filter right now. Try loosening one, like the time or the ingredients.</p><button type="button" class="btn" id="pk-reset">Reset filters</button></div>';
  $('#pk-reset').onclick=function(){st={meal:'any',time:'any',diet:'any',mp:false,have:[]};render();update()}}

function choose(){var p=pool();if(!p.length)return null;
  var avoid=recent.slice(0,Math.min(6,p.length-1));if(current)avoid.push(key(current));
  var fresh=p.filter(function(r){return avoid.indexOf(key(r))<0});if(!fresh.length)fresh=p.filter(function(r){return r!==current});if(!fresh.length)fresh=p;
  return fresh[Math.floor(Math.random()*fresh.length)]}

function card(p,anim){var c=(p.m[0]||'main').toLowerCase(),t=fmt(p.min);
  var art=p.img?'<img src="/'+esc(p.img)+'" alt="'+esc(p.t)+'" loading="lazy">':'<div class="pk-type" aria-hidden="true"><span class="pt-k">Today\'s pick</span><span class="pt-t">'+esc(mealLabel(p).replace(' · ',' & '))+'</span><span class="pt-r"></span><span class="pt-s">Sam\'s Table</span></div>';
  var meta=[];if(t)meta.push('<li>'+(p.est?'<abbr title="Estimated time">≈ '+t+' · estimate</abbr>':t+' total')+'</li>');
  if(p.d)meta.push('<li class="v">'+(p.d==='vegan'?'Vegan':'Vegetarian')+'</li>');if(p.mp)meta.push('<li class="mp">Meal prep friendly</li>');
  $('#pk-res').innerHTML='<article class="pk-card'+(anim?' in':'')+'" aria-live="polite"><a class="pk-art c-'+c+(p.img?' ph':'')+'" href="'+p.u+'" tabindex="-1">'+art+'</a><div class="pk-body"><span class="kicker">'+esc(p.c.indexOf('Meal Prep')===0?p.c:p.c+' · '+mealLabel(p))+'</span><h2><a href="'+p.u+'">'+esc(p.t)+'</a></h2><ul class="pk-meta">'+meta.join('')+'</ul>'+
   (p.x?'<p class="pk-x">'+esc(p.x)+'</p>':'')+(p.by?'<p class="pk-by">'+esc(p.by)+'</p>':'')+
   '<div class="pk-acts"><a class="btn" href="'+p.u+'">Let\'s make it</a><button type="button" class="btn ghost" id="pk-again">Try another</button><button type="button" class="pk-share" id="pk-share" aria-label="Share this recipe"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg></button></div></div></article>';
  $('#pk-again').onclick=pick;$('#pk-share').onclick=function(){share(p)}}

function remember(p){var k=key(p);recent=[k].concat(recent.filter(function(x){return x!==k})).slice(0,10);set('st-pk-recent',recent);recentRow()}
function recentRow(){var box=$('#pk-recent');if(!recent.length){box.hidden=true;return}box.hidden=false;
  $('#pk-rrow').innerHTML=recent.map(function(k){var p=byKey[k];return '<a href="'+p.u+'"><small>'+esc(p.c)+'</small>'+esc(p.t)+'</a>'}).join('')}

var busy=false;
function pick(){if(busy)return;var p=choose();if(!p){empty();return}current=p;remember(p);
  if(window.goatcounter&&goatcounter.count)try{goatcounter.count({path:'picker-pick',title:'Recipe picker pick',event:true})}catch(e){}
  var res=$('#pk-res');
  if(reduce){card(p,true);focusRes();return}
  busy=true;var names=pool().map(function(r){return r.t});if(names.length<2)names=PICKS.map(function(r){return r.t});
  res.innerHTML='<div class="pk-spin" aria-hidden="true"><div><small>Picking…</small><span id="pk-spin-t"></span></div></div>';
  var el=$('#pk-spin-t'),i=0,delay=55,elapsed=0;
  (function tick(){el.textContent=names[Math.floor(Math.random()*names.length)];elapsed+=delay;i++;
    if(elapsed<1100){delay*=1.12;setTimeout(tick,delay)}else{busy=false;card(p,true);focusRes()}})();
  if(window.innerWidth<720)res.scrollIntoView({behavior:'smooth',block:'start'})}
function focusRes(){var h=$('#pk-res h2 a');if(h)h.focus({preventScroll:true})}

function share(p){var url=location.origin+'/what-to-make.html?r='+encodeURIComponent(key(p)),text='I\'m making '+p.t+' from Sam\'s Table';
  if(navigator.share){navigator.share({title:p.t+' | Sam\'s Table',text:text,url:url}).catch(function(){});return}
  var done=function(){toast('Link copied')};
  if(navigator.clipboard)navigator.clipboard.writeText(url).then(done,function(){prompt('Copy this link:',url)});else prompt('Copy this link:',url)}
function toast(m){var t=$('#pk-toast');t.textContent=m;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},1800)}

function render(){chips($('#f-meal'),MEALS,'meal');chips($('#f-time'),TIMES,'time');chips($('#f-diet'),DIETS,'diet');chips($('#f-have'),HAVE,'have',true);
  var mp=$('#f-mp');mp.checked=st.mp;if(st.have.length)$('.pk-have').open=true}
function rebind(id){var o=$(id),n=o.cloneNode(false);o.parentNode.replaceChild(n,o)}
var _render=render;render=function(){['#f-meal','#f-time','#f-diet','#f-have'].forEach(rebind);_render()};
$('#f-mp').addEventListener('change',function(){st.mp=this.checked;update()});
$('#pk-go').addEventListener('click',pick);
$('#pk-clear').addEventListener('click',function(){recent=[];set('st-pk-recent',recent);recentRow()});
render();update();recentRow();
var r=q.get('r');if(r&&byKey[r]){current=byKey[r];card(current,false)}
})();
