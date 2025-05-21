// js/puntos.js

document.addEventListener('DOMContentLoaded', function() {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser'));

    let puntosUsuario = 0; // Valor por defecto
    
    if (currentUserData && currentUserData.isLoggedIn) {
        puntosUsuario = currentUserData.points || 0;
        // userTrips = currentUserData.trips || 0; 
        // userCO2Saved = currentUserData.co2Saved || 0; 
    } else {
        // Si no hay usuario logueado, puedes redirigir a login o mostrar un mensaje.
        // window.location.href = 'login.html'; 
        console.warn("No hay usuario logueado en 'Mis Puntos'. La información no se actualizará.");
        // Opcional: Deshabilita los elementos que dependen de la sesión
        const sectionsToHide = ['.resumen-puntos', '.recompensas-disponibles', '.sumar-puntos', '.cta-puntos'];
        sectionsToHide.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) element.style.display = 'none';
        });
        return; // Detiene la ejecución si no hay usuario logueado
    }

    // Función para calcular el nivel de ciclista
    function getCyclistLevel(points) {
        if (points < 100) return "Principiante";
        if (points >= 100 && points < 250) return "Ciclista Urbano"; 
        if (points >= 250 && points < 500) return "Explorador";
        if (points >= 500 && points < 1000) return "Maestro Ciclista";
        if (points >= 1000) return "Embajador CycleTech"; 
        return "Desconocido";
    }

    const cyclistLevel = getCyclistLevel(puntosUsuario);

    // --- Actualizar elementos del header (si no tienes un usuario.js separado) ---
    // Si ya tienes un usuario.js que hace esto, puedes quitar esta parte de aquí
    const headerProfileNameElement = document.querySelector('.profile-name');
    const headerProfileAvatarElement = document.querySelector('.profile-avatar');
    const previewAvatarElement = document.querySelector('.preview-avatar');
    const userDetailsH4 = document.querySelector('.user-details h4');
    const userDetailsP = document.querySelector('.user-details p');

    if (headerProfileNameElement) {
        headerProfileNameElement.textContent = currentUserData.name || "Usuario";
    }
    if (headerProfileAvatarElement) {
        headerProfileAvatarElement.src = currentUserData.avatar || "../imagen/avatar.png";
    }
    if (previewAvatarElement) {
        previewAvatarElement.src = currentUserData.avatar || "../imagen/avatar.png";
    }
    if (userDetailsH4) {
        userDetailsH4.textContent = currentUserData.name || "Usuario";
    }
    if (userDetailsP) {
        userDetailsP.textContent = currentUserData.email || "email@example.com";
    }


    // --- Actualizar el círculo de progreso y texto ---
    const circulo = document.querySelector('.circulo-progreso');
    const puntosTotalSpan = document.getElementById('my-points-value'); 
    const nivelActualDiv = document.getElementById('my-points-level'); 
    const nextLevelInfoSpan = document.getElementById('next-level-info'); 

    if (circulo) {
        circulo.dataset.puntos = puntosUsuario; 
        // Define un maxPuntos razonable para que el círculo se llene completamente al alcanzar el nivel más alto.
        // Si el nivel más alto es 1000, usa 1000.
        const maxPuntosParaCirculo = 1000; // Ajusta esto según tu escala de puntos total para el progreso visual

        // Calcula el porcentaje de llenado del círculo.
        let porcentaje = (puntosUsuario / maxPuntosParaCirculo) * 100;
        if (porcentaje < 0) porcentaje = 0;
        if (porcentaje > 100) porcentaje = 100; // Limita a 100% para que el círculo no se desborde

        // Convierte el porcentaje a grados (0-360)
        const grados = (porcentaje / 100) * 360;
        
        circulo.style.background = `conic-gradient(var(--verde-ct) ${grados}deg, var(--gris-medio) ${grados}deg)`;
    }

    if (puntosTotalSpan) {
        puntosTotalSpan.textContent = `${puntosUsuario} pts`;
    }
    if (nivelActualDiv) {
        nivelActualDiv.textContent = cyclistLevel;
    }

    // Lógica para el texto "Próximo nivel"
    if (nextLevelInfoSpan) {
        let nextLevelPointsNeeded = 0;
        let nextLevelName = "";

        if (puntosUsuario < 100) {
            nextLevelPointsNeeded = 100 - puntosUsuario;
            nextLevelName = "Ciclista Urbano";
        } else if (puntosUsuario >= 100 && puntosUsuario < 250) {
            nextLevelPointsNeeded = 250 - puntosUsuario;
            nextLevelName = "Explorador";
        } else if (puntosUsuario >= 250 && puntosUsuario < 500) {
            nextLevelPointsNeeded = 500 - puntosUsuario;
            nextLevelName = "Maestro Ciclista";
        } else if (puntosUsuario >= 500 && puntosUsuario < 1000) {
            nextLevelPointsNeeded = 1000 - puntosUsuario;
            nextLevelName = "Embajador CycleTech";
        } else {
            // Ya es Embajador CycleTech o más
            nextLevelPointsNeeded = 0; // No se necesitan más puntos para el siguiente nivel
            nextLevelName = "¡Felicidades, has alcanzado el máximo nivel!";
        }

        if (nextLevelPointsNeeded > 0) {
            nextLevelInfoSpan.innerHTML = `<i class="fas fa-medal"></i> <span>Próximo nivel: ${nextLevelName} en ${nextLevelPointsNeeded} pts más</span>`;
        } else {
            nextLevelInfoSpan.innerHTML = `<i class="fas fa-trophy"></i> <span>${nextLevelName}</span>`; 
        }
    }

    // --- Botones de canje ---
    const btnsCanjear = document.querySelectorAll('.btn-canjear');
    
    btnsCanjear.forEach(btn => {
        const tarjetaRecompensa = btn.closest('.tarjeta-recompensa');
        const puntosRecompensa = parseInt(tarjetaRecompensa.dataset.puntos);
        
        if (puntosUsuario < puntosRecompensa) {
            btn.disabled = true;
            btn.textContent = 'Puntos insuficientes';
            btn.style.background = 'var(--gris-medio)';
            btn.style.cursor = 'not-allowed';
        } else {
            btn.disabled = false;
            btn.textContent = 'Canjear'; 
            btn.style.background = ''; // Restablecer al estilo CSS original
            btn.style.cursor = 'pointer'; // Restablecer cursor
        }
        
        btn.addEventListener('click', function() {
            if(!this.disabled) {
                const recompensa = tarjetaRecompensa.querySelector('h3').textContent;
                if(confirm(`¿Confirmas canjear ${puntosRecompensa} puntos por "${recompensa}"?`)) {
                    // Lógica para canjear los puntos: DECREMENTAR los puntos en localStorage
                    currentUserData.points = puntosUsuario - puntosRecompensa;
                    localStorage.setItem('currentUser', JSON.stringify(currentUserData));
                    
                    alert(`¡Felicidades! Has canjeado tus puntos por: ${recompensa}`);
                    window.location.reload(); 
                }
            }
        });
    });
    
    // --- Filtros del historial ---
    const filtroMes = document.getElementById('filtro-mes');
    const filtroTipo = document.getElementById('filtro-tipo');
    
    [filtroMes, filtroTipo].forEach(filtro => {
        filtro.addEventListener('change', function() {
            console.log(`Filtrar por: ${filtroMes.value} y ${filtroTipo.value}`);
            // Aquí iría la lógica para filtrar el historial de puntos mostrado en la tabla
            // Necesitarías una estructura de datos para el historial de puntos para poder filtrarlos
        });
    });
    
    // --- CTA principal ---
    const btnCanjearDestacado = document.querySelector('.btn-canjear-destacado');
    if (btnCanjearDestacado) { 
        btnCanjearDestacado.addEventListener('click', function() {
            const recompensasSection = document.querySelector('.recompensas-disponibles');
            if (recompensasSection) {
                recompensasSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Lógica para el menú desplegable del perfil (duplicada de logout.js si no hay un script general)
    const profileTrigger = document.querySelector('.profile-trigger');
    const profileDropdownContent = document.querySelector('.profile-dropdown-content');

    if (profileTrigger && profileDropdownContent) {
        profileTrigger.addEventListener('click', function() {
            profileDropdownContent.classList.toggle('show');
        });

        window.addEventListener('click', function(event) {
            if (!event.target.matches('.profile-trigger') && !event.target.closest('.profile-dropdown')) {
                if (profileDropdownContent.classList.contains('show')) {
                    profileDropdownContent.classList.remove('show');
                }
            }
        });
    }
});