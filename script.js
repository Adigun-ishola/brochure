const views = document.querySelectorAll('.view');

function showView(target) {
  const id = 'view-' + target;
  views.forEach(v => v.classList.remove('active'));
  const next = document.getElementById(id);
  if (next) next.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  triggerReveal(next);
}

document.querySelectorAll('[data-target]').forEach(el => {
  el.addEventListener('click', () => showView(el.dataset.target));
});

// Scroll/entrance reveal animation for elements marked .reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function triggerReveal(container) {
  if (!container) return;
  const items = container.querySelectorAll('.reveal');

  // Day One is a single connected programme stack, so it enters as one scene.
  if (container.id === 'view-day-one') {
    items.forEach(el => {
      el.classList.remove('in-view');
      void el.offsetWidth;
      el.classList.add('in-view');
    });
    return;
  }

  items.forEach((el, i) => {
    el.classList.remove('in-view');
    // reflow so the transition restarts on repeat visits
    void el.offsetWidth;
    revealObserver.observe(el);
  });
}

// Observe reveal elements already in the active view on first load
triggerReveal(document.querySelector('.view.active'));
