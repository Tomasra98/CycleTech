// js/sessionChecker.js (Crea este archivo si no lo tienes, o integra su lógica en un archivo global.js si ya usas uno)

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Selectores para elementos del header que cambian con el login
    const userActionsContainer = document.querySelector('.user-actions-container'); // Contenedor de notificaciones y perfil
    const loginRegisterLinks = document.querySelector('.login-register-links'); // Asume que tienes un contenedor para estos enlaces en tu header cuando no hay login

    const profileNameSpan = document.querySelector('.profile-name');
    const profileAvatarImg = document.querySelector('.profile-avatar');
    const previewAvatarImg = document.querySelector('.user-preview .preview-avatar');
    const previewNameH4 = document.querySelector('.user-preview h4');
    const previewEmailP = document.querySelector('.user-preview p');

    // Selectores para elementos específicos de index.html (sección hero)
    const heroTitleSpan = document.querySelector('.hero-title-claro .texto-destacado');
    const heroMessageP = document.querySelector('.hero-mensaje p');
    const heroFeaturesDiv = document.querySelector('.hero-features-claro');
    const heroCtaButtonsDiv = document.querySelector('.cta-buttons');
    const heroPointsSpan = document.querySelector('.hero-features-claro .feature-claro:nth-child(1) span');
    const heroTripsSpan = document.querySelector('.hero-features-claro .feature-claro:nth-child(2) span');
    const heroCo2Span = document.querySelector('.hero-features-claro .feature-claro:nth-child(3) span');


    if (currentUser && currentUser.isLoggedIn) {
        // --- USUARIO LOGUEADO: Mostrar info de perfil, ocultar login/registro ---

        if (userActionsContainer) userActionsContainer.style.display = 'flex'; // Muestra el contenedor de notificaciones/perfil
        if (loginRegisterLinks) loginRegisterLinks.style.display = 'none';    // Oculta los enlaces de login/registro (si existen)

        // Actualiza el nombre y avatar en el header
        if (profileNameSpan) profileNameSpan.textContent = currentUser.name || 'Usuario';
        if (profileAvatarImg && currentUser.avatar) profileAvatarImg.src = currentUser.avatar;
        if (previewAvatarImg && currentUser.avatar) previewAvatarImg.src = currentUser.avatar;
        if (previewNameH4) previewNameH4.textContent = currentUser.name || 'Usuario';
        if (previewEmailP) previewEmailP.textContent = currentUser.email || 'correo@ejemplo.com';

        // Actualiza el contenido de la sección Hero en index.html
        if (heroTitleSpan) heroTitleSpan.textContent = `Bienvenido de vuelta, ${currentUser.name ? currentUser.name.split(' ')[0] : 'Usuario'}`;
        if (heroMessageP) heroMessageP.textContent = `¿Listo para tu próximo viaje en bicicleta? Revisa la disponibilidad en las estaciones cercanas.`;
        if (heroFeaturesDiv) heroFeaturesDiv.style.display = 'flex'; // Muestra las métricas (puntos, viajes, CO2)
        if (heroCtaButtonsDiv) { // Restaurar botones originales o mostrarlos
             heroCtaButtonsDiv.innerHTML = `
                <div class="hero-cta-claro">
                    <a href="reservar.html" class="btn-hero btn-hero-azul">
                        <i class="fas fa-bicycle"></i> Reservar ahora
                    </a>
                </div>
                <div class="hero-cta-claro">
                    <a href="login.html" class="btn-hero btn-hero-azul">
                        <i class="fas fa-bicycle"></i> Desanclar bicicleta
                    </a>
                </div>
            `;
        }

        // Actualiza las métricas específicas
        if (heroPointsSpan) heroPointsSpan.innerHTML = `<i class="fas fa-star"></i> Tienes ${currentUser.points || 0} puntos`;
        if (heroTripsSpan) heroTripsSpan.innerHTML = `<i class="fas fa-bicycle"></i> ${currentUser.trips || 0} viajes realizados`;
        if (heroCo2Span) heroCo2Span.innerHTML = `<i class="fas fa-leaf"></i> Has ahorrado ${currentUser.co2Saved || 0}kg de CO₂`;


    } else {
        // --- USUARIO NO LOGUEADO: Ocultar info de perfil, mostrar login/registro ---

        if (userActionsContainer) userActionsContainer.style.display = 'none'; // Oculta el contenedor de notificaciones/perfil
        // Mostrar los enlaces de login/registro si existen en el header
        // Esto asume que tienes un div con la clase 'login-register-links' en tu header
        if (loginRegisterLinks) loginRegisterLinks.style.display = 'flex'; 
        
        // Si no tienes un contenedor específico para los enlaces de login/registro que se muestran cuando no hay sesión,
        // tendrías que inyectarlos en el DOM o asegurar que estén visibles por defecto y solo el perfil se oculte.

        // Lógica para páginas protegidas (redirige si no está logueado)
        const protectedPages = ['mispuntos.html', 'perfil.html', 'reservar.html']; // AGREGA TODAS TUS PÁGINAS PROTEGIDAS AQUÍ
        const currentPage = window.location.pathname.split('/').pop(); // Obtiene el nombre del archivo HTML actual

        if (protectedPages.includes(currentPage) && currentPage !== 'login.html') { // Asegura no redirigir si ya estás en login.html
            alert('Debes iniciar sesión para acceder a esta página.');
            window.location.href = '/vistas/login.html'; // Redirige al login
        }

        // Si es index.html y no está logueado, ajusta la sección Hero para mostrar opciones de login/registro
        if (currentPage === 'index.html' || currentPage === '') { // '' para la ruta raíz /
            if (heroTitleSpan) heroTitleSpan.textContent = 'Explora Medellín en bicicleta';
            if (heroMessageP) heroMessageP.textContent = 'Inicia sesión o regístrate para comenzar tu aventura con CycleTech.';
            if (heroFeaturesDiv) heroFeaturesDiv.style.display = 'none'; // Oculta las métricas
            if (heroCtaButtonsDiv) { // Cambia los botones a Iniciar Sesión / Registrarse
                heroCtaButtonsDiv.innerHTML = `
                    <div class="hero-cta-claro">
                        <a href="login.html" class="btn-hero btn-hero-azul">
                            <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                        </a>
                    </div>
                    <div class="hero-cta-claro">
                        <a href="registro.html" class="btn-hero btn-hero-azul">
                            <i class="fas fa-user-plus"></i> Registrarse
                        </a>
                    </div>
                `;
            }
        }
    }
});