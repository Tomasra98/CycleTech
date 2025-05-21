document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const profileForm = document.getElementById('profileForm');
  const cancelBtn = document.getElementById('cancelBtn');
  const changePasswordBtn = document.getElementById('changePasswordBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const changeAvatarBtn = document.getElementById('changeAvatarBtn');
  const avatarUpload = document.getElementById('avatarUpload');
  const mainAvatar = document.getElementById('mainAvatar');
  const smallAvatars = document.querySelectorAll('.profile-avatar, .preview-avatar');

  // Función para actualizar avatar en toda la aplicación
  function updateAvatar(newSrc) {
    // Actualizar imagen grande
    mainAvatar.src = newSrc;
    
    // Actualizar imágenes pequeñas (header, dropdown)
    smallAvatars.forEach(avatar => {
      avatar.src = newSrc;
    });
    
    // Aquí podrías añadir código para guardar en backend
    console.log('Avatar actualizado:', newSrc);
  }

  // Manejar cambio de avatar
  if (changeAvatarBtn && avatarUpload) {
    changeAvatarBtn.addEventListener('click', () => {
      avatarUpload.click();
    });

    avatarUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateAvatar(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Manejar envío del formulario
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Perfil actualizado correctamente');
      // Aquí iría la lógica para guardar los cambios
    });
  }

  // Botón cancelar
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      if (confirm('¿Desea descartar los cambios?')) {
        profileForm.reset();
      }
    });
  }

  // Cambiar contraseña
  if (changePasswordBtn) {
    changePasswordBtn.addEventListener('click', function() {
      window.location.href = 'recuperar_contraseña.html';
    });
  }

  // Cerrar sesión
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      if (confirm('¿Está seguro que desea cerrar sesión?')) {
        // Aquí iría la lógica para cerrar sesión
        window.location.href = 'index.html';
      }
    });
  }
});