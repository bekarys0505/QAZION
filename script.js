// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(href.length > 1 && document.querySelector(href)){
      e.preventDefault();
      document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
      // close mobile menu if open
      closeMobileMenu();
    }
  });
});

// MOBILE MENU TOGGLE
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

function openMobileMenu(){
  mobileMenu.classList.add('open');
  burger.setAttribute('aria-expanded','true');
  mobileMenu.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu(){
  mobileMenu.classList.remove('open');
  burger.setAttribute('aria-expanded','false');
  mobileMenu.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

burger && burger.addEventListener('click', ()=>{
  if(mobileMenu.classList.contains('open')) closeMobileMenu();
  else openMobileMenu();
});

// close mobile menu when clicking outside
document.addEventListener('click', (e)=>{
  if(!mobileMenu.contains(e.target) && !burger.contains(e.target) && mobileMenu.classList.contains('open')){
    closeMobileMenu();
  }
});

// change navbar on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-a');
    const open = answer.classList.contains('open');

    // close all
    document.querySelectorAll('.faq-a').forEach(a=>{
      a.style.maxHeight = null;
      a.classList.remove('open');
      const ch = a.parentElement.querySelector('.chev');
      if(ch) ch.textContent = '+';
    });

    if(!open){
      answer.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      btn.querySelector('.chev').textContent = '−';
    } else {
      answer.classList.remove('open');
      answer.style.maxHeight = null;
      btn.querySelector('.chev').textContent = '+';
    }
  });
});

// Contact form fake submit
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const msg = document.getElementById('formMsg');
    msg.textContent = 'Хабарлама жіберілді. Рақмет!';
    form.reset();
    setTimeout(()=> msg.textContent = '', 4000);
  });
}

// Reveal on scroll (simple)
const revealItems = document.querySelectorAll('.feature-card, .course-card, .stat, .test-card, .hero-left');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('reveal');
  });
},{threshold: 0.12});

revealItems.forEach(i => obs.observe(i));
// Animate balls and robot arms
const balls = document.querySelectorAll('.ball');
const leftArm = document.querySelector('.robot .arm.left');
const rightArm = document.querySelector('.robot .arm.right');

let angle = 0;
function animate(){
  angle += 1;

  // Balls trajectory
  const radius = 130;
  balls.forEach((ball, i)=>{
    const a = angle + i*120;
    const x = radius * Math.cos(a * Math.PI / 180);
    const y = Math.abs(radius * Math.sin(a * Math.PI / 180)) - 60;
    const scale = 1 - y/400;
    ball.style.transform = `translate(${x}px, ${-y}px) scale(${scale})`;
    ball.style.zIndex = Math.floor(1000 - y);
  });

  // Arms move with balls
  const handAngle = Math.sin(angle * Math.PI / 180) * 45;
  leftArm.style.transform = `rotate(${handAngle}deg)`;
  rightArm.style.transform = `rotate(${-handAngle}deg)`;

  requestAnimationFrame(animate);
}
animate();

// Particle background
const canvas = document.getElementById('robot-bg');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const particles = [];
for(let i=0;i<50;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    radius: Math.random()*2+1,
    speedX: (Math.random()-0.5)*0.5,
    speedY: (Math.random()-0.5)*0.5,
    alpha: Math.random()*0.5+0.3
  });
}

function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fillStyle = `rgba(95,108,255,${p.alpha})`;
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    if(p.x<0) p.x=canvas.width;
    if(p.x>canvas.width) p.x=0;
    if(p.y<0) p.y=canvas.height;
    if(p.y>canvas.height) p.y=0;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Resize canvas on window resize
window.addEventListener('resize', ()=>{
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});
