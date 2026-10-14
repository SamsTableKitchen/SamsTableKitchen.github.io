(function(){var g=document.getElementById('latest'),b=document.getElementById('latestMore'),end=document.getElementById('latestEnd');
if(!g||!b||typeof POSTS==='undefined')return;var shown=g.children.length,STEP=6;
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function card(p){return '<a class="card'+(p.img?'':' text-card')+'" href="'+esc(p.url)+'">'+(p.img?'<img src="'+esc(p.img)+'" alt="'+esc(p.alt)+'" loading="lazy">':'')+'<div class="body"><span class="kicker">'+esc(p.kicker)+'</span><h3>'+esc(p.title)+'</h3><p>'+esc(p.desc)+'</p></div></a>'}
function done(){if(shown>=POSTS.length){b.parentNode.hidden=true;end.hidden=false}}
b.addEventListener('click',function(){g.insertAdjacentHTML('beforeend',POSTS.slice(shown,shown+STEP).map(card).join(''));shown=Math.min(POSTS.length,shown+STEP);done()});done()})();
