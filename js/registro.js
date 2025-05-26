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
      let isSubmitting = false;
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (isSubmitting) return; // Evita doble submit
        isSubmitting = true;
        const submitBtn = form.querySelector('button[type="submit"], .btn-registro');
        if (submitBtn) submitBtn.disabled = true;
        let isValid = true;
        
        // Validar tipos de archivo
        const fileInputs = [
          'idDocument', 
          'civicCard', 
          'publicServicesInvoice'
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
          alert('Por favor adjunte todos los documentos requeridos');
          if (submitBtn) submitBtn.disabled = false;
          isSubmitting = false;
          return;
        }

        // Crear FormData con todos los campos
        const formData = new FormData(form);
        try {
          const response = await fetch('http://localhost:3000/api/usuarios/registro', {
            method: 'POST',
            body: formData
          });
          const data = await response.json();
          if (response.ok) {
            // Guardar datos básicos del usuario en localStorage para usarlos en otros archivos JS
            localStorage.setItem('usuario', JSON.stringify({
              name: formData.get('name'),
              email: formData.get('email')
              // Podemos agregar más campos si lo deseas
            }));
            alert('¡Registro exitoso!');
            window.location.href = '../vistas/perfil.html'; // Redirige al perfil o donde prefiramos
          }
        } catch (err) {
          alert('Error de conexión con el servidor.');
          if (submitBtn) submitBtn.disabled = false;
          isSubmitting = false;
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
    ['documentNumber', 'phone', 'civicCardNumber'].forEach(id => {
      const field = document.getElementById(id);
      if (field) {
        field.addEventListener('input', function() {
          this.value = this.value.replace(/[^0-9]/g, '');
        });
      }
    });
  });