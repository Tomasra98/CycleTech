// loadFooter.js
document.addEventListener('DOMContentLoaded', function() {
    const footerContainer = document.getElementById('footer-container');
    
    if (footerContainer) {
      fetch('../vistas/partials/footer.html')
        .then(response => {
          if (!response.ok) {
            throw new Error('No se pudo cargar el footer');
          }
          return response.text();
        })
        .then(data => {
          footerContainer.innerHTML = data;
        })
        .catch(error => {
          console.error('Error al cargar el footer:', error);
          footerContainer.innerHTML = '<p>Error al cargar el pie de página</p>';
        });
    }
  });