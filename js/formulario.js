document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const fileInput = document.getElementById('adjunto');
    const fileInfo = document.querySelector('.file-info');
    
    // Mostrar nombre de archivo seleccionado
    fileInput.addEventListener('change', function() {
      if (this.files.length > 0) {
        const file = this.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (file.size > maxSize) {
          fileInfo.textContent = 'El archivo excede el tamaño máximo de 5MB';
          fileInfo.style.color = '#e74c3c';
          fileInput.value = '';
        } else {
          fileInfo.textContent = `Archivo seleccionado: ${file.name}`;
          fileInfo.style.color = '#666';
        }
      } else {
        fileInfo.textContent = 'Ningún archivo seleccionado';
      }
    });
    
    // Validación de formulario
    form.addEventListener('submit', function(e) {
      let isValid = true;
      
      // Validar campos requeridos
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#e74c3c';
        }
      });
      
      // Validar mensaje mínimo
      const mensaje = document.getElementById('mensaje');
      if (mensaje.value.trim().length < 30) {
        isValid = false;
        mensaje.style.borderColor = '#e74c3c';
      }
      
      if (!isValid) {
        e.preventDefault();
        alert('Por favor completa todos los campos requeridos correctamente');
      }
    });
    
    // Resetear estilos de error al editar
    form.addEventListener('input', function(e) {
      if (e.target.hasAttribute('required')) {
        e.target.style.borderColor = '#ddd';
      }
    });
  });