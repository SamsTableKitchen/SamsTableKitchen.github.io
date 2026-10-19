/* Site search: opens from the search icon in the header. Data: /search-index.json (built by tools/build_site.py) */
(function(){
  var idx=null,box,input,list,status,last=null;
  function load(){if(idx)return Promise.resolve(idx);return fetch('/search-index.json').then(function(r){return r.json()}).then(function(d){idx=d.map(function(x){x._t=(x.t+' '+x.s+' '+x.c+' '+x.k).toLowerCase();return x});return idx})}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function find(q){var w=q.toLowerCase().split(/\s+/).filter(Boolean);if(!w.length)return[];
    return idx.filter(function(x){return w.every(function(t){return x._t.indexOf(t)>-1})})
      .map(function(x){var s=0,tl=x.t.toLowerCase();w.forEach(function(t){if(tl.indexOf(t)>-1)s+=10;if(x.s.toLowerCase().indexOf(t)>-1)s+=3});if(x.c!=='Food Guide')s+=1;return[s,x]})
      .sort(function(a,b){return b[0]-a[0]}).slice(0,12).map(function(a){return a[1]})}
  function render(){var q=input.value.trim();if(!q){list.innerHTML='';status.textContent='';return}
    var h=find(q);status.textContent=h.length?h.length+(h.length===12?'+':'')+' results':'No matches. Try a dish, city or cuisine.';
    list.innerHTML=h.map(function(x){return '<li><a href="'+esc(x.u)+'"><span class="ss-cat">'+esc(x.c)+'</span><strong>'+esc(x.t)+'</strong><span class="ss-sum">'+esc(x.s)+'</span></a></li>'}).join('')}
  function build(){box=document.createElement('div');box.className='ss';box.hidden=true;box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-label','Search the site');
    box.innerHTML='<div class="ss-panel"><form class="ss-bar" role="search" action="/search.html"><label for="ss-q" class="sr">Search recipes, reviews and places</label><input id="ss-q" name="q" type="search" autocomplete="off" placeholder="Search recipes, reviews, places..."><button type="button" class="ss-close" aria-label="Close search">&times;</button></form><p class="ss-status" aria-live="polite"></p><ul class="ss-list"></ul></div>';
    document.body.appendChild(box);input=box.querySelector('input');list=box.querySelector('.ss-list');status=box.querySelector('.ss-status');
    input.addEventListener('input',function(){load().then(render)});
    box.querySelector('.ss-close').onclick=close;
    box.addEventListener('click',function(e){if(e.target===box)close()});
    box.addEventListener('keydown',function(e){if(e.key==='Escape'){close();return}
      var links=[].slice.call(list.querySelectorAll('a')),i=links.indexOf(document.activeElement);
      if(e.key==='ArrowDown'){e.preventDefault();(links[i+1]||links[0]||input).focus()}
      if(e.key==='ArrowUp'){e.preventDefault();(i>0?links[i-1]:input).focus()}})}
  function open(e){if(e)e.preventDefault();if(!box)build();last=document.activeElement;box.hidden=false;document.documentElement.classList.add('ss-open');input.focus();load().then(render).catch(function(){status.textContent='Search could not load. Please try again.'})}
  function close(){box.hidden=true;document.documentElement.classList.remove('ss-open');if(last)last.focus()}
  document.querySelectorAll('a.nav-search').forEach(function(a){a.setAttribute('role','button');a.setAttribute('aria-haspopup','dialog');a.addEventListener('click',open)});
  document.addEventListener('keydown',function(e){if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement.tagName)&&(!box||box.hidden)){open(e)}});
  window.siteSearch={load:function(){return load()},find:function(q){return find(q)}};
})();

/* img-retry: if a photo fails to load (flaky mobile connection), try it once more */
(function(){
  function retry(i){if(!i||i.tagName!=='IMG'||i.dataset.retried)return;i.dataset.retried='1';var s=i.getAttribute('src');if(!s)return;setTimeout(function(){i.src=s+(s.indexOf('?')<0?'?':'&')+'r=1';},800);}
  window.addEventListener('error',function(e){retry(e.target)},true);
  function sweep(){[].forEach.call(document.images,function(i){if(i.complete&&i.naturalWidth===0&&i.getAttribute('src'))retry(i)});}
  if(document.readyState==='complete')sweep();else window.addEventListener('load',sweep);
})();
