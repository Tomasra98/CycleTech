document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pqrsd-form');
    const fileInput = document.getElementById('adjuntos');
    const fileInfo = document.querySelector('.file-info');
    
    // Mostrar nombre de archivos seleccionados
    fileInput.addEventListener('change', function() {
      if (this.files.length > 0) {
        const names = Array.from(this.files).map(file => file.name);
        fileInfo.textContent = `${this.files.length} archivo(s) seleccionado(s): ${names.join(', ')}`;
        
        // Validar tamaño total
        const totalSize = Array.from(this.files).reduce((total, file) => total + file.size, 0);
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (totalSize > maxSize) {
          fileInfo.textContent = 'El tamaño total excede los 10MB permitidos';
          fileInfo.style.color = '#e74c3c';
          fileInput.value = '';
        } else {
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
          const errorMsg = field.closest('.form-group').querySelector('.error-message');
          if (errorMsg) {
            errorMsg.style.display = 'block';
          }
          field.style.borderColor = '#e74c3c';
        }
      });
      
      // Validar descripción mínima
      const descripcion = document.getElementById('descripcion');
      if (descripcion.value.trim().length < 50) {
        isValid = false;
        const errorMsg = descripcion.closest('.form-group').querySelector('.error-message');
        if (errorMsg) {
          errorMsg.textContent = 'La descripción debe tener al menos 50 caracteres';
          errorMsg.style.display = 'block';
        }
        descripcion.style.borderColor = '#e74c3c';
      }
      
      if (!isValid) {
        e.preventDefault();
        // Scroll al primer error
        const firstError = form.querySelector('.error-message[style="display: block;"]');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
    
    // Resetear estilos de error al editar
    form.addEventListener('input', function(e) {
      if (e.target.hasAttribute('required')) {
        const errorMsg = e.target.closest('.form-group').querySelector('.error-message');
        if (errorMsg) {
          errorMsg.style.display = 'none';
        }
        e.target.style.borderColor = '#ddd';
      }
    });
  });