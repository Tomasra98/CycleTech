document.addEventListener('DOMContentLoaded', function() {
    // Mostrar nombre de archivos seleccionados
    document.querySelectorAll('input[type="file"]').forEach(input => {
      input.addEventListener('change', function() {
        const fileName = this.files[0] ? this.files[0].name : 'Seleccionar archivo...';
        document.getElementById(`${this.id}-name`).textContent = fileName;
      });
    });
  
    // Validación de campos de archivo
    const form = document.querySelector('.registro-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validar tipos de archivo
        const fileInputs = [
          'doc-identidad', 
          'tarjeta-civica', 
          'factura-servicios'
        ];
        
        fileInputs.forEach(id => {
          const input = document.getElementById(id);
          if (input.files.length === 0) {
            isValid = false;
            highlightError(input);
          } else {
            clearError(input);
          }
        });
  
        if (!isValid) {
          e.preventDefault();
          alert('Por favor adjunte todos los documentos requeridos');
        }
      });
    }
  
    function highlightError(input) {
      const label = input.nextElementSibling;
      label.style.borderColor = '#dc3545';
      label.style.color = '#dc3545';
    }
  
    function clearError(input) {
      const label = input.nextElementSibling;
      label.style.borderColor = '#ddd';
      label.style.color = 'var(--texto-claro)';
    }
  
    // Validación de solo números para documento, teléfono y cívica
    ['documento', 'telefono', 'civica'].forEach(id => {
      const field = document.getElementById(id);
      if (field) {
        field.addEventListener('input', function() {
          this.value = this.value.replace(/[^0-9]/g, '');
        });
      }
    });
  });