document.getElementById('admin-login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
  
    // Credenciales de ejemplo (en producción usa autenticación segura)
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true');
      window.location.href = 'admin_incentivos.html';
    } else {
      alert('Credenciales incorrectas. Por favor intenta nuevamente.');
    }
  });
  
  // Funcionalidad para mostrar/ocultar contraseña
  document.querySelector('.toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('admin-password');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
  });