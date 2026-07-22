// Lightweight scroll-reveal for [data-animate] / [data-stagger] elements.
// Progressive enhancement: content stays visible unless this script runs successfully
// AND actually manages to observe every target — see the "reveal-ready" toggle below.
document.addEventListener('DOMContentLoaded', function () {
  if (!('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll('[data-animate], [data-stagger]');
  if (!targets.length) return;

  document.documentElement.classList.add('reveal-ready');

  // Safety net: if anything ever keeps an element hidden (e.g. it sits in a layout
  // this script didn't anticipate), force it visible after a few seconds regardless.
  var fallback = setTimeout(function () {
    targets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }, 4000);

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
});
