/* Analytics starts only after an explicit visitor choice. */
(() => {
  'use strict';
  const id = 'G-BJPBF9EELL';
  let allowed = false, initialized = false;
  const path = () => location.pathname;
  const safeUrl = () => location.origin + path();
  function plan(value) {
    if (!/^p\d{1,3}$/.test(value || '')) return null;
    return typeof plans !== 'undefined' ? plans.find(p => p.id === value) : null;
  }
  function selected() {
    return plan(document.getElementById('planChoice')?.value);
  }
  function placement(node) {
    if (node.closest('header')) return 'header';
    if (node.closest('.mobile-actions,.mobile-cta,.mobile-sticky,.sticky')) return 'mobile_sticky';
    if (node.id === 'applicationAction') return 'selected_plan';
    if (node.closest('#branches')) return 'region';
    if (node.closest('#readinessAnswer')) return 'readiness';
    if (node.closest('footer')) return 'footer';
    return 'body';
  }
  function send(name, params = {}) {
    if (!allowed || !initialized) return;
    const p = selected();
    window.gtag('event', name, {
      page_location: safeUrl(), page_referrer: '', page_path: path(),
      ...(p ? {plan_id:p.id,network:p.network,billing_type:p.kind} : {}),
      ...params
    });
  }
  window.bangsuAnalyticsConsent = function (grant) {
    allowed = grant === true;
    window['ga-disable-' + id] = !allowed;
    if (initialized) {
      window.gtag('consent','update',{analytics_storage:allowed?'granted':'denied'});
      if (!allowed) {
        document.cookie.split(';').forEach(part => {
          const key=part.split('=')[0].trim();
          if (key === '_ga' || key.startsWith('_ga_')) {
            ['',location.hostname,'.'+location.hostname].forEach(domain => {
              document.cookie=key+'=; Max-Age=0; path=/'+(domain?'; domain='+domain:'');
            });
          }
        });
      }
      return;
    }
    if (!allowed) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent','default',{
      analytics_storage:'granted',ad_storage:'denied',
      ad_user_data:'denied',ad_personalization:'denied'
    });
    window.gtag('js',new Date());
    let ref = '';
    try { ref = new URL(document.referrer).origin + '/'; } catch (_) {}
    window.gtag('config',id,{
      send_page_view:false,page_location:safeUrl(),page_referrer:ref,
      cookie_expires:5184000,cookie_update:false,
      allow_google_signals:false,allow_ad_personalization_signals:false
    });
    initialized = true;
    window.gtag('event','page_view',{
      page_location:safeUrl(),page_referrer:ref,page_path:path()
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(script);
  };
  const choiceKey='bangsu_analytics_choice_v1';
  const style=document.createElement('style');
  style.textContent='#bangsu-analytics-choice{box-sizing:border-box;background:#f1f5f9;color:#172033;padding:12px 16px;font:14px/1.6 system-ui,sans-serif;border-bottom:1px solid #cbd5e1}#bangsu-analytics-choice p{margin:0 0 8px}#bangsu-analytics-choice button{font:inherit;cursor:pointer;padding:8px 14px;margin:3px;border:1px solid #64748b;border-radius:6px;background:white;color:#172033}#bangsu-analytics-choice a,#bangsu-analytics-settings a{color:#174ea6;text-decoration:underline}#bangsu-analytics-settings{text-align:center;font:13px/1.6 system-ui,sans-serif;padding:12px 16px 100px}#bangsu-analytics-settings button{font:inherit;cursor:pointer;background:white;color:#174ea6;border:1px solid #94a3b8;border-radius:6px;padding:6px 10px}';
  document.head.appendChild(style);
  const panel=document.createElement('section');
  // Show consent options only when the visitor opens analytics settings.
  panel.hidden=true;
  panel.id='bangsu-analytics-choice'; panel.setAttribute('aria-label','방문 분석 선택');
  panel.innerHTML='<p>홈페이지 개선을 위해 Google Analytics로 방문·요금제 선택·개통 및 상담 링크 클릭을 집계합니다. 분석용 쿠키를 사용하며, 거부해도 사이트를 이용할 수 있습니다. <a href="/analytics-privacy.html">방문 분석 안내</a></p><button type="button" data-analytics-choice="allow">분석 허용</button><button type="button" data-analytics-choice="deny">분석 거부</button>';
  const header=document.querySelector('header');
  if(header) header.after(panel); else document.body.prepend(panel);
  const settings=document.createElement('div'); settings.id='bangsu-analytics-settings';
  settings.innerHTML='<a href="/analytics-privacy.html">방문 분석 안내</a> · <button type="button">분석 설정 변경</button>';
  document.body.appendChild(settings);
  settings.querySelector('button').addEventListener('click',()=>{panel.hidden=false;panel.scrollIntoView({block:'center'});panel.querySelector('button').focus();});
  panel.addEventListener('click',event=>{
    const button=event.target.closest('[data-analytics-choice]'); if(!button)return;
    const grant=button.dataset.analyticsChoice==='allow';
    try{localStorage.setItem(choiceKey,JSON.stringify({grant,at:Date.now()}));}catch(_){}
    window.bangsuAnalyticsConsent(grant);panel.hidden=true;
  });
  try{
    const choice=JSON.parse(localStorage.getItem(choiceKey));
    if(choice && typeof choice.grant==='boolean' && Date.now()-choice.at<5184000000){
      panel.hidden=true;window.bangsuAnalyticsConsent(choice.grant);
    }
  }catch(_){}
  document.addEventListener('change', event => {
    if (event.target.id !== 'planChoice') return;
    const p = plan(event.target.value);
    if (p) send('plan_select',{plan_id:p.id,network:p.network,
      billing_type:p.kind,selection_source:'dropdown'});
  });
  document.addEventListener('click', event => {
    const pick = event.target.closest('[data-pick]');
    if (pick) {
      const p = plan(pick.dataset.pick);
      if (p) send('plan_select',{plan_id:p.id,network:p.network,
        billing_type:p.kind,selection_source:'button'});
      return;
    }
    const a = event.target.closest('a[href]');
    if (!a) return;
    let url;
    try { url = new URL(a.href, location.href); } catch (_) { return; }
    if ((url.hostname === 'www.n-telecom.co.kr' || url.hostname === 'n-telecom.co.kr') &&
        url.pathname === '/pangpangmall/view/open/selfopen_explain.aspx') {
      send('activation_link_click',{placement:placement(a),destination_type:'official_activation'});
    } else if (url.hostname === 'pf.kakao.com' && url.pathname === '/_Qxbjgb/chat') {
      send('kakao_chat_click',{placement:placement(a)});
    }
  });
})();
