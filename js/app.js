/* Sam's Table app: registers the service worker and shows a gentle "add to home screen" prompt. */
(function(){
var LS=window.localStorage,SS=window.sessionStorage;
function get(s,k){try{return s.getItem(k)}catch(e){return null}}
function set(s,k,v){try{s.setItem(k,v)}catch(e){}}
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')){
  window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});});
}
var standalone=window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
var ua=navigator.userAgent,isIOS=/iPhone|iPad|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
var iosSafari=isIOS&&/Safari/.test(ua)&&!/CriOS|FxiOS|EdgiOS|OPiOS|GSA|Instagram|FBAN|FBAV/.test(ua);
/* Count visits (a new browser session = a new visit) and page views. */
if(!get(SS,'st-session')){set(SS,'st-session','1');set(LS,'st-visits',String((+get(LS,'st-visits')||0)+1));}
var visits=+get(LS,'st-visits')||1,pv=(+get(SS,'st-pv')||0)+1;set(SS,'st-pv',String(pv));
var isRecipe=/^\/posts\/(recipes|meal-prep)\//.test(location.pathname)||/what-to-make/.test(location.pathname);
var deferred=null,shown=false;
var SHARE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7.5 7.5 4.5-4.5 4.5 4.5"/><path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';
var ADD='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M12 8v8M8 12h8"/></svg>';
function dismissed(){var d=+get(LS,'st-install-dismissed')||0;return get(LS,'st-installed')==='1'||(d&&Date.now()-d<1000*60*60*24*45);}
function eligible(){return !standalone&&!dismissed()&&(visits>=2||isRecipe)&&(pv>=2||visits>=2)&&!/offline/.test(location.pathname)&&!/[?&]noprompt/.test(location.search);}
function close(remember){var el=document.getElementById('inst');if(!el)return;el.classList.remove('show');if(remember)set(LS,'st-install-dismissed',String(Date.now()));setTimeout(function(){el.remove()},500);}
function show(mode){
  if(shown||document.getElementById('inst'))return;shown=true;
  var el=document.createElement('div');el.id='inst';el.className='inst';el.setAttribute('role','dialog');el.setAttribute('aria-labelledby','inst-h');
  el.innerHTML='<img src="/icons/icon-192.png" alt="" width="56" height="56"><h2 id="inst-h">Add Sam\'s Table to your home screen</h2><p>Open my recipes in one tap, full screen, and keep the ones you\'ve viewed handy even when you\'re offline.</p>'+
   (mode==='ios'?'<p class="ios-step">Tap <b>Share '+SHARE+'</b> in Safari, then <b>Add to Home Screen '+ADD+'</b>.</p><div class="acts"><button type="button" class="btn" data-a="ok">Got it</button></div>'
   :'<div class="acts"><button type="button" class="later" data-a="later">Not now</button><button type="button" class="btn" data-a="install">Install app</button></div>')+
   '<button type="button" class="x" data-a="later" aria-label="Close">&times;</button>';
  document.body.appendChild(el);
  el.addEventListener('click',function(e){var a=e.target.closest('[data-a]');if(!a)return;a=a.getAttribute('data-a');
    if(a==='install'&&deferred){deferred.prompt();deferred.userChoice.then(function(c){if(c.outcome==='accepted')set(LS,'st-installed','1');else set(LS,'st-install-dismissed',String(Date.now()));deferred=null;close(false);});}
    else close(true);});
  document.addEventListener('keydown',function k(e){if(e.key==='Escape'){close(true);document.removeEventListener('keydown',k);}});
  requestAnimationFrame(function(){requestAnimationFrame(function(){el.classList.add('show')})});
  if(window.goatcounter&&goatcounter.count)try{goatcounter.count({path:'install-prompt-'+mode,title:'Install prompt shown',event:true})}catch(e){}
}
function later(mode){if(eligible())setTimeout(function(){show(mode)},/[?&]prompt-now/.test(location.search)?300:3500);}
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e;later('android');var b=document.getElementById('ga-install');if(b)b.hidden=false;});
window.addEventListener('appinstalled',function(){set(LS,'st-installed','1');close(false);var d=document.getElementById('ga-done');if(d)d.hidden=false;});
if(iosSafari)later('ios');
/* About page "Get the app" button */
document.addEventListener('click',function(e){var b=e.target.closest('#ga-install');if(!b||!deferred)return;deferred.prompt();deferred.userChoice.then(function(c){if(c.outcome==='accepted'){set(LS,'st-installed','1');b.hidden=true;}deferred=null;});});
if(standalone)document.documentElement.classList.add('is-app');
window.STApp={show:show};
})();
