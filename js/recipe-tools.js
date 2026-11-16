/* Jump to ingredients, print helper, and cook mode (screen wake lock). */
(function(){
  var reduce = function(){
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  document.querySelectorAll('.jump-to a[href="#ingredients"]').forEach(function(link){
    link.addEventListener('click', function(e){
      var target = document.getElementById('ingredients');
      if(!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior: reduce() ? 'auto' : 'smooth', block: 'start'});
      if(history.replaceState) history.replaceState(null, '', '#ingredients');
    });
  });

  var btn = document.querySelector('.cook-toggle');
  if(!btn || !('wakeLock' in navigator)) return;
  btn.hidden = false;

  var lock = null;
  var on = false;
  var chip = null;

  function setPressed(v){
    btn.setAttribute('aria-pressed', v ? 'true' : 'false');
    btn.textContent = v ? 'Cook mode on' : 'Cook mode';
    document.body.classList.toggle('cook-mode', v);
    if(v){
      if(!chip){
        chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'cook-chip noprint';
        chip.addEventListener('click', toggle);
        document.body.appendChild(chip);
      }
      chip.textContent = 'Cook mode on';
      chip.hidden = false;
    } else if(chip){
      chip.hidden = true;
    }
  }

  async function acquire(){
    try{
      if(lock){
        try{ await lock.release(); }catch(err){}
        lock = null;
      }
      lock = await navigator.wakeLock.request('screen');
      lock.addEventListener('release', function(){
        lock = null;
        if(on && document.visibilityState === 'visible') acquire();
      });
    }catch(err){
      /* Keep cook mode on even if the lock is denied (battery saver, etc.). */
    }
  }

  async function release(){
    if(lock){
      try{ await lock.release(); }catch(err){}
      lock = null;
    }
  }

  function toggle(){
    on = !on;
    setPressed(on);
    if(on) acquire();
    else release();
  }

  btn.addEventListener('click', toggle);
  document.addEventListener('visibilitychange', function(){
    if(document.visibilityState === 'visible' && on) acquire();
  });
})();
