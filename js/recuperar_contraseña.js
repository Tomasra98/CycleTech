document.addEventListener('DOMContentLoaded', function() {
  
    const documentoInput = document.getElementById('documento');
    const formRecuperar = document.getElementById('recuperar-form');
  
    // Validar que solo números se puedan escribir
    if (documentoInput) {
      documentoInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
      });
    }
  
    // Capturar el envío del formulario
    if (formRecuperar) {
      formRecuperar.addEventListener('submit', function(e) {
        e.preventDefault();
  
        const documento = documentoInput.value.trim();
  
        if (documento.length === 0) {
          alert('Por favor, ingresa tu número de documento.');
          return;
        }
  
        // Aquí pondrías la lógica de búsqueda del documento
        console.log('Número de documento enviado para recuperación:', documento);
  
        // Simulamos un aviso de éxito
        alert('Si el número es válido, recibirás instrucciones para recuperar tu contraseña.');
        
        // Opcional: limpiar campo
        documentoInput.value = '';
      });
    }
  
  });
  
