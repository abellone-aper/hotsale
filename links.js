/* ============================================================
   LINKS — Configuración de URLs
   ============================================================ */

const LINKS = {

  /* Header */
  'logo':     'https://market.personal.com.ar/',   
  'ingresar': '#',  

  /* Hero */
  'comprar-ahora': '#',   

  /* Banners */
  'banner-1': 'https://market.personal.com.ar/830-Especial-envio-gratis',
  'banner-2': '#',

  /* Categorías */
  'cat-smartphones': '#',
  'cat-deportiva': '#',
  'cat-lavarropas': '#',
  'cat-televisores': '#',

  /* Productos — Carrusel */
  'ver-todos-productos': '#',   
  'producto-1': 'https://market.personal.com.ar/televisores-y-accesorios/10429-smart-tv-philco-50-pulgadas-google-tv-4-k-led-hdmi-usb-7796962000730.html',  
  'producto-2': '#',   
  'producto-3': '#',   
  'producto-4': '#',   
  'producto-5': '#',  
  'producto-6': '#',  
  'producto-7': '#',   
  'producto-8': '#',   

  /* Card Sports */
  'ver-oferta': 'https://market.personal.com.ar/172-deportes',

  /* Tiendas Oficiales */
  'mostrar-todo': '#',   
  'tienda-1': '#',
  'tienda-2': '#',
  'tienda-3': '#',
  'tienda-4': '#',
  'tienda-5': '#',
  'tienda-6': '#',

  /* Banners de descuento */
  'promo-1': '#',
  'promo-2': '#',
  'promo-3': '#',

  /* Redes sociales */
  'facebook': '#',
  'instagram': '#',
  'twitter': '#',
  'whatsapp': '#',
  'youtube': '#',
  'linkedin': '#',

  /* Footer — Ayuda */
  'privacidad': 'https://market.personal.com.ar/content/9-politica-de-privacidad',
  'faq': '#',
  'terminos': '#',
  'datos-personales': '#',
  'consumidor': '#',

  /* Footer — Accesos directos */
  'pedidos': '#',

  /* Botón de arrepentimiento */
  'arrepentimiento': '#',

};

/* Aplica las URLs a todos los elementos con data-link="nombre" */
document.querySelectorAll('[data-link]').forEach(el => {
  const key = el.dataset.link;
  if (LINKS[key]) {
    el.href = LINKS[key];
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  }
});
