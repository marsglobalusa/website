// ===== Mars Global — site behavior =====

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initReveal();
  initYear();
  initForm();
  initFiberCanvas();
});

/* Header scroll state */
function initHeader(){
  const header = document.querySelector('.site-header');
  if(!header) return;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 30);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });
}

/* Mobile nav drawer */
function initMobileNav(){
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.mobile-nav');
  const close = document.querySelector('.mobile-close');
  if(!toggle || !drawer) return;
  const open = () => drawer.classList.add('is-open');
  const shut = () => drawer.classList.remove('is-open');
  toggle.addEventListener('click', open);
  close && close.addEventListener('click', shut);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));
}

/* Scroll reveal */
function initReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  if(!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.15, rootMargin:'0px 0px -40px 0px' });
  items.forEach(el => io.observe(el));
}

/* Footer year */
function initYear(){
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
}

/* Contact form -> FormSubmit.co (no backend / no account needed by us; owner confirms the destination inbox once) */
function initForm(){
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'form-status';

    try{
      const res = await fetch(form.action, {
        method:'POST',
        body:new FormData(form),
        headers:{ 'Accept':'application/json' }
      });
      if(res.ok){
        status.textContent = 'Thank you — your request was sent. We will contact you shortly.';
        status.className = 'form-status ok';
        form.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch(err){
      status.textContent = 'Something went wrong. Please call us directly at 917-999-6466.';
      status.className = 'form-status err';
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  });
}

/* ===== Animated glowing fiber-optic background ===== */
function initFiberCanvas(){
  const canvas = document.getElementById('fiber-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, dpr;
  let strands = [];

  const palette = ['#cda36a', '#ff8248', '#e8caa0', '#c1542c'];

  function rand(min, max){ return Math.random() * (max - min) + min; }

  function buildStrands(){
    const area = width * height;
    const count = Math.max(7, Math.min(16, Math.round(area / 90000)));
    strands = [];
    for(let i = 0; i < count; i++){
      const y0 = rand(0, height);
      const y1 = rand(0, height);
      const midY = rand(0, height);
      strands.push({
        p0:{ x:-60, y:y0 },
        p1:{ x:width * rand(0.2,0.4), y:midY + rand(-120,120) },
        p2:{ x:width * rand(0.6,0.8), y:midY + rand(-120,120) },
        p3:{ x:width + 60, y:y1 },
        color: palette[i % palette.length],
        width: rand(0.6, 1.4),
        speed: rand(0.06, 0.16),
        offset: Math.random(),
        pulseLen: rand(0.06, 0.14)
      });
    }
  }

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildStrands();
  }

  function bezierPoint(s, t){
    const it = 1 - t;
    const x = it*it*it*s.p0.x + 3*it*it*t*s.p1.x + 3*it*t*t*s.p2.x + t*t*t*s.p3.x;
    const y = it*it*it*s.p0.y + 3*it*it*t*s.p1.y + 3*it*t*t*s.p2.y + t*t*t*s.p3.y;
    return { x, y };
  }

  function drawStrand(s, time){
    ctx.beginPath();
    ctx.moveTo(s.p0.x, s.p0.y);
    ctx.bezierCurveTo(s.p1.x, s.p1.y, s.p2.x, s.p2.y, s.p3.x, s.p3.y);
    ctx.strokeStyle = 'rgba(205,163,106,0.16)';
    ctx.lineWidth = s.width;
    ctx.stroke();

    if(reduceMotion) return;

    const t = (time * s.speed + s.offset) % 1;
    const segs = 22;
    for(let i = 0; i < segs; i++){
      const tt = t - (i * s.pulseLen) / segs;
      if(tt < 0 || tt > 1) continue;
      const pt = bezierPoint(s, tt);
      const fade = 1 - i / segs;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, s.width * 1.6 * fade + 0.4, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = fade * 0.9;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 12 * fade;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }

  let raf;
  function frame(ts){
    ctx.clearRect(0, 0, width, height);
    const time = ts / 6000;
    strands.forEach(s => drawStrand(s, time));
    raf = requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    resize();
    raf = requestAnimationFrame(frame);
  });

  raf = requestAnimationFrame(frame);
}
