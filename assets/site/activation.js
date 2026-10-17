
(() => {
  const screens={auth:document.getElementById('authScreen'),sim:document.getElementById('simScreen'),purchase:document.getElementById('purchaseScreen')};
  function show(name,focus=true){
    Object.entries(screens).forEach(([key,screen])=>screen.hidden=key!==name);
    document.getElementById('stepLabel').textContent=name==='auth'?'시작하기 · 1 / 2':name==='sim'?'유심 확인 · 2 / 2':'인증 유심 안내';
    document.getElementById('progressTwo').classList.toggle('on',name!=='auth');
    if(focus)screens[name].querySelector('h2').focus({preventScroll:true});
  }
  document.getElementById('authYes').addEventListener('click',()=>show('sim'));
  document.getElementById('simNo').addEventListener('click',()=>show('purchase'));
  document.querySelectorAll('[data-screen]').forEach(button=>button.addEventListener('click',()=>show(button.dataset.screen)));
})();
