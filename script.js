(function(){
  var M=window.ME||{},$=function(s){return [].slice.call(document.querySelectorAll(s))};
  document.documentElement.classList.add('js');
  /* links from config.js */
  $('[data-social]').forEach(function(a){var s=M.social&&M.social[a.getAttribute('data-social')];if(!s)return;a.href=s.url;var h=a.querySelector('[data-handle]');if(h)h.textContent=s.handle});
  $('[data-email]').forEach(function(a){if(!M.email)return;a.href='mailto:'+M.email+'?subject=Hello%20Avinash';var t=a.querySelector('[data-text]');if(t)t.textContent=M.email});
  if(M.showFamily===false){$('[data-family]').forEach(function(e){e.remove()})}
  /* Startup India BHASKAR line */
  var B=M.bhaskar;if(B&&B.id){$('[data-bhaskar]').forEach(function(el){var t='Registered on Startup India BHASKAR (ID: '+B.id+')';
    if(B.url){el.innerHTML='';var a=document.createElement('a');a.href=B.url;a.target='_blank';a.rel='noopener';a.textContent=t;el.appendChild(a)}else el.textContent=t});
    $('script[type="application/ld+json"]').forEach(function(sc){try{var d=JSON.parse(sc.textContent),ch=false;(d['@graph']||[d]).forEach(function(n){if(n['@type']==='Person'){n.identifier=undefined}if(n['@type']==='Organization'&&n['@id']&&n['@id'].indexOf('#org')>0){n.identifier={"@type":"PropertyValue","name":"Startup India BHASKAR ID","value":B.id};if(B.url)n.sameAs=[B.url];ch=true}});if(ch)sc.textContent=JSON.stringify(d)}catch(e){}})}
  /* menu */
  var b=document.getElementById('burger'),n=document.getElementById('nav');
  b.onclick=function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)};
  $('#nav a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('open');b.setAttribute('aria-expanded','false')})});
  /* reveal on scroll */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  $('.rv').forEach(function(e){io.observe(e)});setTimeout(function(){$('.rv').forEach(function(e){e.classList.add('in')})},4000);
  /* active menu link + progress bar */
  var secs=$('main section[id]'),links=$('#nav a'),bar=document.getElementById('bar');
  function on(){var h=document.documentElement,p=h.scrollTop/(h.scrollHeight-h.clientHeight);bar.style.transform='scaleX('+Math.min(1,Math.max(0,p))+')';
    var cur='';secs.forEach(function(s){if(s.getBoundingClientRect().top<innerHeight*.4)cur=s.id});
    links.forEach(function(a){a.classList.toggle('act',a.getAttribute('href')==='#'+cur)})}
  addEventListener('scroll',on,{passive:true});on();
  /* copy email */
  var cp=document.getElementById('copy');if(cp)cp.onclick=function(){try{navigator.clipboard.writeText(M.email||'')}catch(e){}cp.textContent='Copied';setTimeout(function(){cp.textContent='Copy'},1800)};
  /* photo tilt (mouse devices only) */
  var ph=document.getElementById('photo');if(ph&&matchMedia('(hover:hover)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
    var hero=document.querySelector('.hero');hero.addEventListener('mousemove',function(e){var r=ph.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/r.width,y=(e.clientY-r.top-r.height/2)/r.height;ph.style.transform='rotateY('+(x*10)+'deg) rotateX('+(-y*8)+'deg)'});
    hero.addEventListener('mouseleave',function(){ph.style.transform=''})}
  /* floating gold dust in the hero */
  var c=document.getElementById('dust');if(c&&!matchMedia('(prefers-reduced-motion:reduce)').matches){var x=c.getContext('2d'),W,H,P=[];
    function rs(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;P=[];for(var i=0;i<(W<700?24:50);i++)P.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.6+.4,v:Math.random()*.3+.08,a:Math.random()*6})}
    rs();addEventListener('resize',rs);(function L(){requestAnimationFrame(L);x.clearRect(0,0,W,H);P.forEach(function(p){p.y-=p.v;p.a+=.02;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}x.globalAlpha=.3+.3*Math.sin(p.a);x.fillStyle='#f0cf7a';x.beginPath();x.arc(p.x,p.y,p.r,0,6.3);x.fill()})})()}
  var g=document.getElementById('glow');if(g)addEventListener('mousemove',function(e){g.style.opacity=1;g.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)'},{passive:true});
  var y=document.getElementById('y');if(y)y.textContent=new Date().getFullYear();
})();
