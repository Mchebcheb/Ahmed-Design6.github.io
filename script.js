document.addEventListener('DOMContentLoaded', () => {
  const corners = document.querySelectorAll('.corner');
  const toggleBtn = document.getElementById('toggle-play');
  let isGlobalPaused = false;

  corners.forEach((corner) => {
    const track = corner.querySelector('.slides-track');
    const slides = corner.querySelectorAll('.slide');
    const dotsContainer = corner.querySelector('.dots');
    const direction = corner.dataset.direction || 'horizontal';
    const intervalTime = parseInt(corner.dataset.interval, 10) || 3500;

    let currentIndex = 0;
    let isHovered = false;

    // Crear los 3 puntitos indicadores dinámicamente
    slides.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = idx;
        updateSlide();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    // Función para mover la pista de imágenes
    function updateSlide() {
      const offset = -currentIndex * 100;
      if (direction === 'vertical') {
        track.style.transform = `translateY(${offset}%)`;
      } else {
        track.style.transform = `translateX(${offset}%)`;
      }

      dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
      });
    }

    // Avanzar a la siguiente imagen
    function nextSlide() {
      if (isGlobalPaused || isHovered) return;
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlide();
    }

    // Pausar una esquina concreta si pasas el ratón por encima
    corner.addEventListener('mouseenter', () => {
      isHovered = true;
    });

    corner.addEventListener('mouseleave', () => {
      isHovered = false;
    });

    // Iniciar el reloj automático independiente de esta esquina
    setInterval(nextSlide, intervalTime);
  });

  // Botón central para pausar o reanudar las 4 esquinas a la vez (Protegido por si no existe)
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isGlobalPaused = !isGlobalPaused;
      toggleBtn.textContent = isGlobalPaused ? 'Reanudar Movimiento' : 'Pausar Movimiento';
    });
  }
});

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
// Envío directo del formulario de contacto a WhatsApp
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('client-name').value.trim();
    const service = document.getElementById('client-service').value;
    const message = document.getElementById('client-message').value.trim();

    // IMPORTANTE: Pon aquí tu número real de WhatsApp (ej: 212612345678, sin '+' ni '0' después del 212)
    const phone = '212614738881';

    const text = `Bonjour Ahmed, je m'appelle ${name}.\nService : ${service}\nMessage : ${message}`;
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;

    // Más fiable que window.open en móviles y navegadores estrictos
    window.location.href = url;
  });
}
