// Restores the mobile menu dialog now that the original React app's JS has been removed.
document.addEventListener('DOMContentLoaded', function () {
  var dialog = document.querySelector('dialog');
  var openBtn = document.querySelector('[data-testid="mobile-menu-button"]');
  if (!dialog || !openBtn) return;

  var closeBtn = dialog.querySelector('.ml-auto.block.p-3');

  function openMenu() {
    dialog.showModal();
    requestAnimationFrame(function () {
      dialog.classList.remove('translate-x-full', 'opacity-0');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    dialog.classList.add('translate-x-full', 'opacity-0');
    document.body.style.overflow = '';
    setTimeout(function () {
      dialog.close();
    }, 300);
  }

  openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) closeMenu();
  });
  dialog.addEventListener('cancel', function (e) {
    e.preventDefault();
    closeMenu();
  });
  dialog.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
});
