document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout-btn'); // CAMBIO AQUÍ: Usar el ID de tu HTML

    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault(); // Detiene el comportamiento por defecto del enlace (evita el #)

            // 1. Elimina los datos de sesión de localStorage
            localStorage.removeItem('currentUser');
            // Si usas una bandera 'isLoggedIn' separada, también elimínala:
            // localStorage.removeItem('isLoggedIn'); 

            // 2. Redirige al usuario a la página de login o principal
            // Asumo que quieres ir a 'login.html' después de cerrar sesión
            // Desde 'vistas/index.html', para ir a 'vistas/login.html' la ruta relativa es 'login.html'
            window.location.href = 'login.html'; 

            alert('Sesión cerrada exitosamente.'); // Opcional: mostrar un mensaje
        });
    }

    // Opcional: Lógica para mostrar/ocultar el menú desplegable del perfil
    const profileTrigger = document.querySelector('.profile-trigger');
    const profileDropdownContent = document.querySelector('.profile-dropdown-content');

    if (profileTrigger && profileDropdownContent) {
        profileTrigger.addEventListener('click', function() {
            profileDropdownContent.classList.toggle('show');
        });

        // Cerrar el dropdown si el usuario hace clic fuera de él
        window.addEventListener('click', function(event) {
            if (!event.target.matches('.profile-trigger') && !event.target.closest('.profile-dropdown')) {
                if (profileDropdownContent.classList.contains('show')) {
                    profileDropdownContent.classList.remove('show');
                }
            }
        });
    }
});