// --- CONTROL DEL MENÚ DE NAVEGACIÓN Y CLASE ACTIVE ---
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links .link');

// 1. Abrir y cerrar menú hamburguesa en móvil
if (mobileMenu) {
  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// 2. Al hacer clic en un enlace del menú
links.forEach(link => {
  link.addEventListener('click', function () {
    // Quitamos 'active' de todos y se lo ponemos al pinchado
    links.forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');

    // Cierra el menú hamburguesa en el móvil
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
});

// 3. Cambiar 'active' automáticamente según la sección que se ve en pantalla (Scroll)
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY;

  // Detecta la sección actual según la posición de la pantalla
  document.querySelectorAll('main, section[id]').forEach(section => {
    let sectionTop = section.offsetTop - 150;
    let sectionHeight = section.offsetHeight;
    let sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}` || (sectionId === null && link.getAttribute('href') === 'index.html')) {
          link.classList.add('active');
        }
      });
    }
  });
});
