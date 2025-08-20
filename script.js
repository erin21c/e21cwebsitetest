// Footer year
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
});

// Collapsing header on scroll
(function(){
  const header = document.querySelector(".header");
  const SCROLL_Y = 50;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > SCROLL_Y);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive:true });
})();

// Collapsible sidebar
(function(){
  const sidebar = document.getElementById('siteSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const toggleBtn = document.getElementById('sidebarToggle');
  const closeBtn  = document.getElementById('sidebarClose');
  if(!sidebar || !overlay || !toggleBtn) return;

  const focusable = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  function openSidebar(){
    lastFocused = document.activeElement;
    sidebar.classList.add('is-open');
    overlay.hidden = false;
    sidebar.setAttribute('aria-hidden','false');
    toggleBtn.setAttribute('aria-expanded','true');
    const first = sidebar.querySelector(focusable);
    if(first) first.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar(){
    sidebar.classList.remove('is-open');
    overlay.hidden = true;
    sidebar.setAttribute('aria-hidden','true');
    toggleBtn.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
    if(lastFocused) lastFocused.focus();
  }

  toggleBtn.addEventListener('click', ()=> sidebar.classList.contains('is-open') ? closeSidebar() : openSidebar());
  closeBtn?.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && sidebar.classList.contains('is-open')) closeSidebar(); });

  // focus trap (optional)
  sidebar.addEventListener('keydown', (e)=>{
    if(e.key!=='Tab') return;
    const els = Array.from(sidebar.querySelectorAll(focusable)).filter(el=>!el.disabled && el.offsetParent!==null);
    if(!els.length) return;
    const first = els[0], last = els[els.length-1];
    if(e.shiftKey && document.activeElement===first){ last.focus(); e.preventDefault(); }
    else if(!e.shiftKey && document.activeElement===last){ first.focus(); e.preventDefault(); }
  });
})();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click", (e)=>{
    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:"smooth"}); }
  });
});

// Netlify form quick confirmation
document.addEventListener("submit", (e)=>{
  const form = e.target;
  if (form.getAttribute("name")==="contact") {
    alert("Teşekkürler! Mesajınız gönderildi.");
  }
});

