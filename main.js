function openModal() {
    const modal = document.getElementById('pbi-modal');
    const iframe = document.getElementById('pbi-iframe');
    const loading = document.getElementById('pbi-loading');
    // lazy-load: solo asigna src la primera vez
    if (!iframe.src || iframe.src === window.location.href) {
      iframe.src = iframe.dataset.src;
      iframe.onload = () => { loading.style.display = 'none'; };
    } else {
      loading.style.display = 'none';
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    document.getElementById('pbi-modal').classList.remove('active');
    document.body.style.overflow = '';
  }
  document.getElementById('pbi-modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Activar animaciones sólo cuando JS está disponible
  document.body.classList.add('js-loaded');

  // Hamburger
  const toggle = document.getElementById('nav-toggle');
  const navEl  = document.getElementById('main-nav');
  toggle.addEventListener('click', () => navEl.classList.toggle('nav-open'));
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navEl.classList.remove('nav-open')));

  // Reveal on scroll
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  // Forzar visibilidad de elementos ya en pantalla al cargar
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add('visible');
    });
  }, 100);

  // Skill bars
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.querySelectorAll('.skill-fill').forEach(f => f.style.width = f.dataset.w + '%'); });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skills-list').forEach(el => barObs.observe(el));

  // Nav active
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if(window.scrollY >= s.offsetTop - 100) cur = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }, { passive: true });