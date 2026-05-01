  /* ── THEME ── */
  let dark = true;
  function toggleTheme(){
    dark = !dark;
    document.body.classList.toggle('light', !dark);
    document.getElementById('themeIcon').textContent = dark ? '☀️' : '🌙';
    document.getElementById('themeLabel').textContent = dark ? 'Light mode' : 'Dark mode';
  }

  /* ── TYPEWRITER ── */
  const twLines = [
    {id:'tw1', delay:300, dur:420},
    {id:'tw2', delay:820, dur:500},
    {id:'tw3', delay:1420, dur:560},
    {id:'tw4', delay:2080, dur:480},
  ];

  twLines.forEach(({id, delay, dur}, i) => {
    const el = document.getElementById(id);
    setTimeout(() => {
      el.style.transition = `max-width ${dur}ms cubic-bezier(0.4,0,0.2,1), opacity 0.05s`;
      el.classList.add('show');
      // After last line reveal hero sub + cta
      if(i === twLines.length - 1){
        setTimeout(() => {
          document.getElementById('heroSub').classList.add('show');
          setTimeout(() => document.getElementById('heroCta').classList.add('show'), 200);
          // hide cursor after a moment
          setTimeout(() => {
            const cur = document.getElementById('cursor');
            if(cur) cur.style.display = 'none';
          }, 2500);
        }, dur + 100);
      }
    }, delay);
  });

  /* ── SCROLL ANIMATIONS ── */
  const scrollObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('visible');
        scrollObs.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.fade-up').forEach(el => scrollObs.observe(el));

  /* ── SKILL + PROGRESS BARS ── */
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.style.width = e.target.dataset.w;
        barObs.unobserve(e.target);
      }
    });
  }, {threshold: 0.3});

  document.querySelectorAll('[data-w]').forEach(el => barObs.observe(el));

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth'});
    });
  });