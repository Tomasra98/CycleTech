document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const profileDropdown = document.querySelector('.profile-dropdown');
    const logoutBtn = document.getElementById('logout-btn');
    const heroTitle = document.querySelector('.hero-title-claro .texto-destacado');
    const profileNameElements = document.querySelectorAll('.profile-name, .user-details h4');
    const userEmailElement = document.querySelector('.user-details p');
    const avatarElements = document.querySelectorAll('.profile-avatar, .preview-avatar');
    const pointsFeature = document.querySelector('.feature-claro:nth-child(1) span');
    const tripsFeature = document.querySelector('.feature-claro:nth-child(2) span');
    const co2SavedFeature = document.querySelector('.feature-claro:nth-child(3) span');
    const notificationIcon = document.querySelector('.notification-icon');
    const profileTrigger = document.querySelector('.profile-trigger');
    const userActionsContainer = document.querySelector('.user-actions-container'); // Contenedor del icono de notificación y perfil

    // --- Funciones de Manejo de Sesión ---

    // Simula el inicio de sesión. En una app real, esto vendría de tu backend.
    function loginUser(name, email, avatarPath, points, trips, co2Saved) {
        const userData = {
            name: name,
            email: email,
            avatar: avatarPath,
            points: points,
            trips: trips,
            co2Saved: co2Saved,
            isLoggedIn: true // Indicador de sesión activa
        };
        localStorage.setItem('currentUser', JSON.stringify(userData)); // Guardar en localStorage
        console.log('Usuario logueado y datos guardados en localStorage.');
        updateUI(); // Actualizar la interfaz después de iniciar sesión
    }

    // Obtiene los datos del usuario logueado de localStorage
    function getLoggedInUser() {
        const userDataString = localStorage.getItem('currentUser');
        if (userDataString) {
            return JSON.parse(userDataString);
        }
        return null; // No hay usuario logueado
    }

    // Cierra la sesión del usuario
    function logoutUser() {
        localStorage.removeItem('currentUser'); // Eliminar datos del usuario de localStorage
        console.log('Sesión cerrada y datos eliminados de localStorage.');
        window.location.href = 'login.html'; // Redirigir a la página de login
    }

    // --- Función para Actualizar la Interfaz de Usuario ---
    function updateUI() {
        const currentUser = getLoggedInUser();

        if (currentUser && currentUser.isLoggedIn) {
            // Mostrar elementos de usuario logueado
            if (userActionsContainer) userActionsContainer.style.display = 'flex'; // Asegura que el contenedor de acciones de usuario sea visible
            
            // Actualizar nombre en el header y dropdown
            profileNameElements.forEach(el => {
                el.textContent = currentUser.name;
            });
            
            // Actualizar mensaje de bienvenida en hero section (solo en index.html)
            if (heroTitle) {
                const firstName = currentUser.name.split(' ')[0];
                heroTitle.textContent = `Bienvenido de vuelta, ${firstName}`;
            }
            
            // Actualizar email en el dropdown
            if (userEmailElement) {
                userEmailElement.textContent = currentUser.email;
            }

            // Actualizar avatares
            avatarElements.forEach(avatar => {
                avatar.src = currentUser.avatar;
                avatar.alt = `Perfil de ${currentUser.name}`;
                avatar.style.display = 'block';
            });
            
            // Actualizar puntos en el menú si existe el elemento
            const pointsMenuItem = document.querySelector('.profile-dropdown-menu a[href="mispuntos.html"]');
            if (pointsMenuItem) {
                pointsMenuItem.innerHTML = `<i class="fas fa-star"></i> Mis puntos (${currentUser.points})`;
            }
            
            // Actualizar datos en el hero section (si están presentes)
            if (pointsFeature) pointsFeature.innerHTML = `<i class="fas fa-star"></i> Tienes ${currentUser.points} puntos`;
            if (tripsFeature) tripsFeature.innerHTML = `<i class="fas fa-bicycle"></i> ${currentUser.trips} viajes realizados`;
            if (co2SavedFeature) co2SavedFeature.innerHTML = `<i class="fas fa-leaf"></i> Has ahorrado ${currentUser.co2Saved}kg de CO₂`;

        } else {
            // Si no hay usuario logueado, ocultar elementos de usuario y redirigir
            if (userActionsContainer) userActionsContainer.style.display = 'none'; // Ocultar el dropdown del perfil y notificaciones

            // Redirigir a login.html si no estamos ya en login, registro, o la página principal (index)
            const currentPath = window.location.pathname;
            const allowedPaths = ['/login.html', '/registro.html', '/index.html', '/']; // Agrega aquí todas las páginas que no requieren login
            
            // Verifica si la ruta actual es una de las permitidas para usuarios no logueados.
            // La condición currentPath === '/' es importante para el caso de que tu servidor sirva index.html como raíz.
            const isAllowedWithoutLogin = allowedPaths.some(path => currentPath.endsWith(path));

            if (!isAllowedWithoutLogin) {
                window.location.href = 'login.html'; // Redirigir si no está logueado y no está en una página pública
            }

            // Opcional: Mostrar un botón de "Iniciar Sesión" en el header si no hay sesión
            // Puedes añadir un placeholder en tu HTML y mostrarlo aquí.
        }
    }

    // --- Event Listeners ---

    // Evento para el botón de cerrar sesión
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logoutUser(); // Llama a la función de cierre de sesión
        });
    }
    
    // Toggle del dropdown con click (además del hover, si lo tienes por CSS)
    if (profileDropdown) {
        profileDropdown.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que el click se propague y cierre el dropdown
            this.classList.toggle('active');
        });
        
        // Cerrar dropdown al hacer click fuera
        document.addEventListener('click', function(event) {
            // Cierra el dropdown solo si el click no fue dentro del dropdown ni en el botón que lo activa
            if (profileDropdown && !profileDropdown.contains(event.target) && !profileTrigger.contains(event.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // --- Inicialización ---

    // Simulación de un usuario logueado (solo para pruebas)
    // En una aplicación real, esta función se llamaría después de un login exitoso
    // Para probar, puedes descomentar la siguiente línea y simular un login
    // loginUser("María González", "maria.gonzalez@example.com", "../imagen/avatar.png", 120, 156, 78.5);

    // Cargar los datos del usuario y actualizar la UI al cargar la página
    updateUI();
});