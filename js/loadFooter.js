/**
 * Carga dinámicamente el footer en todas las páginas que lo requieran
 * Maneja errores y muestra mensajes apropiados si falla la carga
 */

document.addEventListener('DOMContentLoaded', function() {
  const footerContainer = document.getElementById('footer-container');
  
  // Solo proceder si existe el contenedor del footer
  if (!footerContainer) return;
  
  // Versión de caché para evitar múltiples solicitudes
  const CACHE_KEY = 'cachedFooter';
  const CACHE_DURATION = 3600000; // 1 hora en ms
  
  // Intentar cargar desde caché primero
  const cachedFooter = localStorage.getItem(CACHE_KEY);
  const cacheTime = localStorage.getItem(`${CACHE_KEY}_time`);
  
  if (cachedFooter && cacheTime && (Date.now() - cacheTime < CACHE_DURATION)) {
    footerContainer.innerHTML = cachedFooter;
    return;
  }
  
  // Si no hay caché válida, hacer fetch
  fetch('../vistas/partials/footer.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      // Insertar el footer
      footerContainer.innerHTML = data;
      
      // Guardar en caché
      localStorage.setItem(CACHE_KEY, data);
      localStorage.setItem(`${CACHE_KEY}_time`, Date.now());
      
      // Disparar evento personalizado
      const event = new CustomEvent('footerLoaded', {
        detail: { timestamp: new Date() }
      });
      document.dispatchEvent(event);
    })
    .catch(error => {
      console.error('Error al cargar el footer:', error);
      
      // Mostrar footer básico de respaldo
      footerContainer.innerHTML = `
        <footer class="footer-error">
          <div class="footer-error-content">
            <p>CycleTech © ${new Date().getFullYear()} | 
              <a href="contacto.html">Contacto</a> | 
              <a href="faq.html">Ayuda</a>
            </p>
            <p class="error-message">No se pudo cargar el pie de página completo.</p>
          </div>
        </footer>
      `;
      
      // Disparar evento de error
      const event = new CustomEvent('footerError', {
        detail: { error: error, timestamp: new Date() }
      });
      document.dispatchEvent(event);
    });
});

/**
 * Función para forzar la recarga del footer ignorando la caché
 * Útil para actualizaciones en tiempo real durante desarrollo
 */
function reloadFooter() {
  localStorage.removeItem('cachedFooter');
  localStorage.removeItem('cachedFooter_time');
  
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = '<div class="footer-loading">Cargando...</div>';
    fetch('../vistas/partials/footer.html')
      .then(response => response.text())
      .then(data => {
        footerContainer.innerHTML = data;
      });
  }
}

// Exportar para uso en módulos (si se usa ES modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { loadFooter: reloadFooter };
}