(function(){document.querySelectorAll('.rate').forEach(function(box){
var key='rating:'+location.pathname.replace(/\/$/,''),btns=box.querySelectorAll('button'),msg=box.querySelector('.rate-msg');
function show(n){btns.forEach(function(b,i){b.classList.toggle('on',i<n);b.setAttribute('aria-pressed',i<n-1?'false':String(i===n-1))});
msg.textContent=n?'You rated this '+n+' out of 5. Thanks!':'Tap a star to rate it.';}
var saved=0;try{saved=parseInt(localStorage.getItem(key))||0}catch(e){}
show(saved);
btns.forEach(function(b,i){b.addEventListener('click',function(){try{localStorage.setItem(key,i+1)}catch(e){}show(i+1)});
b.addEventListener('mouseenter',function(){btns.forEach(function(x,j){x.classList.toggle('hov',j<=i)})});
b.addEventListener('mouseleave',function(){btns.forEach(function(x){x.classList.remove('hov')})})});
})})();
