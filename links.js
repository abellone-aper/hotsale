/* ============================================================
   LINKS — Configuración de URLs
   Modificá solo este archivo para actualizar los destinos de
   cada elemento interactivo de la página.
   ============================================================ */

const LINKS = {

  /* Header */
  'ingresar':          '#',   // Botón "Ingresar" del header

  /* Hero */
  'comprar-ahora':     '#',   // CTA principal del hero

  /* Banners promo (par de banners grandes) */
  'banner-1':          'https://market.personal.com.ar/830-Especial-envio-gratis',
  'banner-2':          '#',

  /* Categorías */
  'cat-smartphones':   '#',
  'cat-deportiva':     '#',
  'cat-lavarropas':    '#',
  'cat-televisores':   '#',

  /* Card editorial de deporte */
  'ver-oferta':        'https://market.personal.com.ar/172-deportes',

  /* Tiendas Oficiales */
  'mostrar-todo':      '#',   // Link "Mostrar todo"
  'tienda-1':          '#',
  'tienda-2':          '#',
  'tienda-3':          '#',
  'tienda-4':          '#',
  'tienda-5':          '#',
  'tienda-6':          '#',

  /* Banners de descuento */
  'promo-1':           '#',
  'promo-2':           '#',
  'promo-3':           '#',

  /* Redes sociales */
  'facebook':          '#',
  'instagram':         '#',
  'twitter':           '#',
  'whatsapp':          '#',
  'youtube':           '#',
  'linkedin':          '#',

  /* Footer — Ayuda */
  'privacidad':        'https://market.personal.com.ar/content/9-politica-de-privacidad',
  'faq':               '#',
  'terminos':          '#',
  'datos-personales':  '#',
  'consumidor':        '#',

  /* Footer — Accesos directos */
  'pedidos':           '#',

  /* Botón de arrepentimiento (requerido por ley) */
  'arrepentimiento':   '#',

};

/* Aplica las URLs a todos los elementos con data-link="clave" */
document.querySelectorAll('[data-link]').forEach(el => {
  const key = el.dataset.link;
  if (LINKS[key]) {
    el.href = LINKS[key];
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  }
});
