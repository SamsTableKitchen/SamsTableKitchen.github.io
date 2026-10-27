(function(){
function q(s){return document.querySelector(s)}
function meta(p){var m=q('meta[property="'+p+'"]');return m?m.content:''}
function url(){var c=q('link[rel="canonical"]');return c?c.href:location.href.split(/[?#]/)[0]}
function toast(t){var d=document.createElement('div');d.className='share-toast';d.setAttribute('role','status');d.textContent=t;document.body.appendChild(d);setTimeout(function(){d.remove()},2200)}
function gc(){try{window.goatcounter&&window.goatcounter.count&&window.goatcounter.count({path:'share',title:'Share: '+location.pathname,event:true})}catch(e){}}
function copy(u){if(navigator.clipboard&&window.isSecureContext){return navigator.clipboard.writeText(u)}var t=document.createElement('textarea');t.value=u;document.body.appendChild(t);t.select();try{document.execCommand('copy')}catch(e){}t.remove();return Promise.resolve()}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.share-btn');if(!b)return;e.preventDefault();
var u=url(),h=q('h1'),title=(h?h.textContent.trim():document.title),text=title+' | Sam\'s Table';gc();
if(navigator.share){navigator.share({title:title,text:text,url:u}).catch(function(){});return}
copy(u).then(function(){toast('Link copied!')},function(){toast(u)});
var p=b.parentNode.querySelector('.share-more');if(!p){var e1=encodeURIComponent,img=meta('og:image');p=document.createElement('span');p.className='share-more';
p.innerHTML='<a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u='+e1(u)+'">Facebook</a><a target="_blank" rel="noopener" href="https://www.pinterest.com/pin/create/button/?url='+e1(u)+'&media='+e1(img)+'&description='+e1(text)+'">Pinterest</a><a href="sms:?&body='+e1(text+' '+u)+'">Text</a><a href="mailto:?subject='+e1(text)+'&body='+e1(u)+'">Email</a>';
b.insertAdjacentElement('afterend',p)}});
})();
