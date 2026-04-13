/* ────────────────────────────────────────────────────────────
   Tira animada de beneficios
   ──────────────────────────────────────────────────────────── */
const iconClass = {
  hotsale: 'ph-seal-percent',
  ofertas: 'ph-star',
  envios:  'ph-truck',
};

/* Cambiar íconos y textos del adbar */
const baseItems = [
  { icon: 'hotsale', text: 'Hot Sale 2026' },
  { icon: 'ofertas', text: 'Mejores ofertas' },
  { icon: 'envios',  text: 'Envíos gratis' },
];

function createAdbarItem({ icon, text }) {
  const el = document.createElement('span');
  el.className = 'adbar-item';
  el.innerHTML = `<i class="ph ${iconClass[icon]}" aria-hidden="true"></i><span>${text}</span>`;
  return el;
}

const adbarTrack = document.getElementById('adbarTrack');

/* Paso 1: construir la primera copia para poder medirla */
baseItems.forEach(item => adbarTrack.appendChild(createAdbarItem(item)));

/* Paso 2: esperar a que las fuentes de íconos estén cargadas para
   obtener un scrollWidth correcto, luego duplicar y lanzar la animación */
document.fonts.ready.then(() => {
  const singleWidth = adbarTrack.scrollWidth;

  /* Cuántas copias extra hacen falta para cubrir ≥ 2× el viewport */
  const extra = Math.ceil((window.innerWidth * 2) / singleWidth) + 1;
  for (let i = 0; i < extra; i++) {
    baseItems.forEach(item => adbarTrack.appendChild(createAdbarItem(item)));
  }

  /* El salto de animación = exactamente el ancho de una copia → loop perfecto */
  adbarTrack.style.setProperty('--marquee-dist', `-${singleWidth}px`);
  adbarTrack.style.animation = 'marquee 24s linear infinite';
});


/* ────────────────────────────────────────────────────────────
   CAROUSEL — Flechas en desktop/tablet, swipe en mobile
   ────────────────────────────────────────────────────────────
   doScroll(id, amount): desplaza el track con botones.
   La flecha "Anterior" se oculta hasta que el usuario scrollea
   hacia la derecha (scrollLeft > 0).
   ──────────────────────────────────────────────────────────── */
function doScroll(id, amount) {
  document.getElementById(id).scrollBy({ left: amount, behavior: 'smooth' });
}

document.querySelectorAll('.carousel-wrap').forEach(wrap => {
  const track   = wrap.querySelector('.carousel-track');
  const prevBtn = wrap.querySelector('.carousel-btn--prev');
  if (!track) return;

  if (prevBtn) {
    prevBtn.classList.add('carousel-btn--hidden');
  }
  track.addEventListener('scroll', () => {
    const scrolled = track.scrollLeft > 0;
    const atEnd    = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    if (prevBtn) prevBtn.classList.toggle('carousel-btn--hidden', !scrolled);
    wrap.classList.toggle('is-scrolled', scrolled);
    wrap.classList.toggle('is-scrolled-end', atEnd);
  }, { passive: true });

  /* Drag-to-scroll en desktop */
  let isDown = false, hasDragged = false, startX = 0, scrollStart = 0;

  /* Evita el drag nativo del browser sobre links e imágenes */
  track.addEventListener('dragstart', e => e.preventDefault());

  track.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    isDown      = true;
    hasDragged  = false;
    startX      = e.pageX;
    scrollStart = track.scrollLeft;
  });

  document.addEventListener('mousemove', e => {
    if (!isDown) return;
    const delta = e.pageX - startX;
    if (!hasDragged && Math.abs(delta) < 5) return; // umbral: ignora micro-movimientos
    hasDragged = true;
    track.style.cursor    = 'grabbing';
    track.style.userSelect = 'none';
    track.scrollLeft = scrollStart - delta;
  });

  document.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    track.style.cursor    = '';
    track.style.userSelect = '';
  });

  /* Cancela el click si el usuario arrastró (evita navegar accidentalmente) */
  track.addEventListener('click', e => {
    if (hasDragged) e.preventDefault();
  });
});


/* ────────────────────────────────────────────────────────────
   COUNTDOWN — Cuenta regresiva
   ────────────────────────────────────────────────────────────
   TEMPLATE: Cambiar TARGET_DATE con la fecha y hora de inicio
   del evento en formato ISO 8601: 'AAAA-MM-DDTHH:MM:SS'.
   Cuando el contador llega a 0 se detiene (no muestra negativos).
   ──────────────────────────────────────────────────────────── */
const TARGET_DATE = new Date('2026-05-12T00:00:00'); // ← TEMPLATE: cambiar fecha

/* Cacheamos las referencias al DOM una sola vez para no buscarlas en cada tick */
const cdDays  = document.getElementById('cdDays');
const cdHours = document.getElementById('cdHours');
const cdMins  = document.getElementById('cdMins');
const cdSecs  = document.getElementById('cdSecs');

function updateCountdown() {
  const diff = TARGET_DATE - Date.now();
  if (diff <= 0) return; // El evento ya comenzó: detener el contador

  cdDays.textContent  = String(Math.floor(diff / 86400000)).padStart(2, '0');
  cdHours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
  cdMins.textContent  = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
  cdSecs.textContent  = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
}

/* Ejecutar inmediatamente y luego cada 1 segundo */
updateCountdown();
setInterval(updateCountdown, 1000);
