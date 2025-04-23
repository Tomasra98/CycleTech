document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const profileDropdown = document.querySelector('.profile-dropdown');
    const logoutBtn = document.getElementById('logout-btn');
    const heroTitle = document.querySelector('.hero-title-claro .texto-destacado');
    
    // Datos del usuario (modificados para mostrar María González)
    const userData = {
        name: "María González",
        email: "maria.gonzalez@example.com",
        avatar: "../imagen/avatar.png",  // Asegúrate que esta ruta es correcta
        points: 120,
        membership: "Enero 2023",
        trips: 156,  // Cambiado de reservations a trips para coincidir con perfil
        co2Saved: 78.5  // Actualizado para coincidir con perfil
    };
    
    // Cargar datos del usuario
    function loadUserData() {
        // Actualizar nombre en el header y hero section
        document.querySelectorAll('.profile-name, .user-details h4').forEach(el => {
            el.textContent = userData.name;
        });
        
        if (heroTitle) {
            const firstName = userData.name.split(' ')[0];
            heroTitle.textContent = `Bienvenido de vuelta, ${firstName}`;
        }
        
        // Actualizar avatares (asegurando que use la misma imagen que perfil.html)
        const avatars = document.querySelectorAll('.profile-avatar, .preview-avatar');
        avatars.forEach(avatar => {
            avatar.src = userData.avatar;
            avatar.alt = `Perfil de ${userData.name}`;
            avatar.style.display = 'block'; // Forzar visualización
        });
        
        // Actualizar información en el dropdown
        const userDetails = document.querySelector('.user-details');
        if (userDetails) {
            userDetails.querySelector('h4').textContent = userData.name;
            userDetails.querySelector('p').textContent = userData.email;
        }
        
        // Actualizar puntos en el menú si existe el elemento
        const pointsMenuItem = document.querySelector('.profile-dropdown-menu a[href="mispuntos.html"]');
        if (pointsMenuItem) {
            pointsMenuItem.innerHTML = `<i class="fas fa-star"></i> Mis puntos (${userData.points})`;
        }
        
        // Actualizar datos en el hero section (coincidiendo con perfil.html)
        const features = document.querySelectorAll('.feature-claro');
        if (features.length >= 3) {
            features[0].innerHTML = `<i class="fas fa-star"></i> Tienes ${userData.points} puntos`;
            features[1].innerHTML = `<i class="fas fa-bicycle"></i> ${userData.trips} viajes realizados`;
            features[2].innerHTML = `<i class="fas fa-leaf"></i> Has ahorrado ${userData.co2Saved}kg de CO₂`;
        }
    }
    
    // Función para cerrar sesión
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulación de cierre de sesión
            console.log('Usuario cerró sesión');
            
            // Aquí en una aplicación real harías:
            // 1. Limpiar tokens de autenticación
            // 2. Hacer una llamada al backend para invalidar la sesión
            // 3. Limpiar cualquier dato de usuario en localStorage/sessionStorage
            
            // Redireccionar a la página de login
            window.location.href = 'login.html';
        });
    }
    
    // Opcional: Toggle del dropdown con click (además del hover)
    if (profileDropdown) {
        profileDropdown.addEventListener('click', function(e) {
            // Prevenir que el click cierre inmediatamente el dropdown
            e.stopPropagation();
            this.classList.toggle('active');
        });
        
        // Cerrar dropdown al hacer click fuera
        document.addEventListener('click', function() {
            profileDropdown.classList.remove('active');
        });
    }
    
    // Cargar datos del usuario al iniciar
    loadUserData();

    // Sobreescribir cualquier cambio después de un breve retraso
    setTimeout(loadUserData, 100);
});