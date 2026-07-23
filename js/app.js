/* ============================================================
   GUIA DIGITAL DE TRAMITES DIAN - JavaScript
   Funciones: QR, Tabs, Busqueda, Compartir, Toast
   Libreria: qrcode@1.5.3 (cargada via CDN)
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   1. GENERACION DE CODIGOS QR
   ---------------------------------------------------------- */

/**
 * Genera un QR en el contenedor indicado apuntando a la URL dada.
 * @param {string} containerId  - id del elemento donde inyectar el QR
 * @param {string} url          - URL que codifica el QR
 * @param {number} [size=220]   - tamaño en pixeles
 */
function generateQR(containerId, url, size) {
  size = size || 220;
  var el = document.getElementById(containerId);
  if (!el) return;
  if (typeof QRCode === 'undefined') {
    el.innerHTML = '<p style="color:#607D8B;font-size:.8rem;">QR no disponible offline</p>';
    return;
  }
  QRCode.toDataURL(url, {
    width: size,
    margin: 2,
    color: { dark: '#003B8E', light: '#FFFFFF' }
  }, function(err, dataUrl) {
    if (err) { console.error('QR error:', err); return; }
    var img = document.createElement('img');
    img.src = dataUrl;
    img.alt = 'Codigo QR - ' + url;
    img.style.cssText = 'border-radius:8px;display:block;';
    el.innerHTML = '';
    el.appendChild(img);
  });
}

/** Obtiene la URL base del sitio sin el nombre de archivo actual */
function getBaseUrl() {
  var href = window.location.href;
  // Remover parametros y fragment
  href = href.split('?')[0].split('#')[0];
  // Remover el ultimo segmento (archivo html)
  return href.replace(/\/[^\/]*$/, '/');
}

/** Genera el QR unico del inicio (apunta a index.html) */
function initIndexQRs() {
  var url = window.location.href.split('?')[0].split('#')[0];
  // Asegurarse de que apunta a index.html o la raiz
  generateQR('main-qr', url, 200);
}

/** Genera el QR de la pagina actual (tramites individuales) */
function initPageQR() {
  var url = window.location.href;
  generateQR('page-qr', url, 220);
  var urlDisplay = document.getElementById('qr-url-display');
  if (urlDisplay) urlDisplay.textContent = url;
}

/** Genera el QR unico para la pagina de impresion (apunta al index) */
function initPrintQRs() {
  var base = getBaseUrl().replace(/qr-impresion\.html\/$/, '');
  var indexUrl = base + 'index.html';
  generateQR('main-print-qr', indexUrl, 260);
  var urlEl = document.getElementById('main-print-qr-url');
  if (urlEl) urlEl.textContent = indexUrl;
}

/* ----------------------------------------------------------
   2b. ACORDEON DE TIPOS DE PERSONA (RUT)
   ---------------------------------------------------------- */

/** Alterna la apertura de un item del acordeon (this = button.acc-head) */
function toggleAcc(btn) {
  var body  = btn.nextElementSibling;
  var open  = btn.classList.contains('open');
  if (open) {
    btn.classList.remove('open');
    body.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  } else {
    btn.classList.add('open');
    body.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

/** Abre todos los items del acordeon */
function accExpandAll() {
  document.querySelectorAll('.acc-item .acc-head').forEach(function(h) {
    h.classList.add('open');
    h.nextElementSibling.classList.add('open');
    h.setAttribute('aria-expanded', 'true');
  });
}

/** Cierra todos los items del acordeon */
function accCollapseAll() {
  document.querySelectorAll('.acc-item .acc-head').forEach(function(h) {
    h.classList.remove('open');
    h.nextElementSibling.classList.remove('open');
    h.setAttribute('aria-expanded', 'false');
  });
}

/** Inicializa los listeners del acordeon */
function initAccordion() {
  document.querySelectorAll('.acc-item .acc-head').forEach(function(btn) {
    btn.addEventListener('click', function() { toggleAcc(btn); });
  });
}

/* ----------------------------------------------------------
   2. TABS
   ---------------------------------------------------------- */
function initTabs() {
  var tabBtns   = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');

  if (!tabBtns.length) return;

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = btn.dataset.tab;

      // Desactivar todo
      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      tabPanels.forEach(function(p) { p.classList.remove('active'); });

      // Activar el seleccionado
      btn.classList.add('active');
      var panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');

      // Generar QR cuando se abre ese tab
      if (target === 'qr') initPageQR();

      // Scroll suave al boton en la barra de tabs
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });
}

/* ----------------------------------------------------------
   3. BUSQUEDA EN EL INDICE
   ---------------------------------------------------------- */
function initSearch() {
  var input = document.getElementById('search-tramites');
  if (!input) return;

  input.addEventListener('input', function() {
    var q = input.value.toLowerCase().trim();
    var cards = document.querySelectorAll('.t-card');
    cards.forEach(function(card) {
      var text = card.textContent.toLowerCase();
      card.style.display = (!q || text.includes(q)) ? '' : 'none';
    });
  });
}

/* ----------------------------------------------------------
   4. COMPARTIR / COPIAR
   ---------------------------------------------------------- */
function shareURL() {
  var url   = window.location.href;
  var title = document.title;

  if (navigator.share) {
    navigator.share({ title: title, text: 'Guia de tramites DIAN', url: url })
      .catch(function() { copyURL(); });
  } else {
    copyURL();
  }
}

function copyURL() {
  var url = window.location.href;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url)
      .then(function() { showToast('Enlace copiado al portapapeles'); })
      .catch(function() { fallbackCopy(url); });
  } else {
    fallbackCopy(url);
  }
}

function fallbackCopy(text) {
  var el = document.createElement('textarea');
  el.value = text;
  el.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
  document.body.appendChild(el);
  el.focus(); el.select();
  try { document.execCommand('copy'); showToast('Enlace copiado'); }
  catch(e) { showToast('No se pudo copiar el enlace'); }
  document.body.removeChild(el);
}

/* ----------------------------------------------------------
   5. TOAST NOTIFICATION
   ---------------------------------------------------------- */
function showToast(msg) {
  var old = document.querySelector('.toast');
  if (old) old.remove();

  var t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);

  setTimeout(function() {
    t.style.animation = 'toastOut .3s ease forwards';
    setTimeout(function() { if (t.parentNode) t.remove(); }, 320);
  }, 2600);
}

/* ----------------------------------------------------------
   6. INICIALIZACION SEGUN PAGINA
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
  var page = document.body.dataset.page;

  initTabs();
  initSearch();
  initAccordion();

  if (page === 'index') {
    // Pequeño delay para no bloquear el primer render
    setTimeout(initIndexQRs, 600);
  }

  if (page === 'tramite') {
    // El QR se genera al abrir el tab correspondiente (ver initTabs).
    // Si el tab QR esta activo por defecto, generarlo ahora.
    var activeQrTab = document.querySelector('.tab-btn[data-tab="qr"].active');
    if (activeQrTab) initPageQR();
  }

  if (page === 'print') {
    setTimeout(initPrintQRs, 400);
  }
});
