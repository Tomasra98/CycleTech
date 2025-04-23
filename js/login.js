document.addEventListener('DOMContentLoaded', function() {
    // Mostrar/ocultar contraseña
    document.querySelectorAll('.toggle-password').forEach(button => {
      button.addEventListener('click', function() {
        const input = this.parentNode.querySelector('input');
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
          input.type = 'password';
          icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
      });
    });
  
    // Validación de documento (solo números)
    const documentoInput = document.getElementById('documento');
    if (documentoInput) {
      documentoInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
      });
    }
  
    // Carga del chatbot (si existe el contenedor)
    const chatbotContainer = document.getElementById('chatbot-container');
    if (chatbotContainer) {
      fetch("../chatbot/chatbot.html")
        .then(response => response.text())
        .then(data => {
          chatbotContainer.innerHTML = data;
          // Carga el JS del chatbot
          const script = document.createElement('script');
          script.src = "../chatbot/chatbot.js";
          document.body.appendChild(script);
        });
    }
  });