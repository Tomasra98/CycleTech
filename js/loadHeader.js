// Cargar el header en todos los archivos que lo necesiten
document.addEventListener('DOMContentLoaded', function() {
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    fetch('../vistas/partials/header.html')
      .then(response => response.text())
      .then(data => {
        headerContainer.innerHTML = data;
      });
  }
});