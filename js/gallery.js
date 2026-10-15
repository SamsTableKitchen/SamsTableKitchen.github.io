(function(){
var items=[].slice.call(document.querySelectorAll('.g-item')),lb=document.getElementById('lb');if(!lb||!items.length)return;
var im=lb.querySelector('img'),cap=lb.querySelector('figcaption'),cur=0,last=null,x0=null;
function show(i){cur=(i+items.length)%items.length;var s=items[cur].querySelector('img');im.src=s.src;im.alt=s.alt;cap.innerHTML=items[cur].querySelector('figcaption').innerHTML;}
function open(i){last=document.activeElement;show(i);lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('.lb-x').focus();}
function close(){lb.hidden=true;document.body.style.overflow='';if(last)last.focus();}
items.forEach(function(f,i){f.querySelector('.g-open').addEventListener('click',function(){open(i);});});
lb.querySelector('.lb-x').onclick=close;lb.querySelector('.lb-prev').onclick=function(){show(cur-1);};lb.querySelector('.lb-next').onclick=function(){show(cur+1);};
lb.addEventListener('click',function(e){if(e.target===lb)close();});
document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(cur-1);else if(e.key==='ArrowRight')show(cur+1);});
lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
lb.addEventListener('touchend',function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)show(cur+(d<0?1:-1));x0=null;});
})();
