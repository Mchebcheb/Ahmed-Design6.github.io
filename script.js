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

  // Botón central para pausar o reanudar las 4 esquinas a la vez
  toggleBtn.addEventListener('click', () => {
    isGlobalPaused = !isGlobalPaused;
    toggleBtn.textContent = isGlobalPaused ? 'Reanudar Movimiento' : 'Pausar Movimiento';
  });
});