document.addEventListener('DOMContentLoaded', function() {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const stationName = urlParams.get('estacion') || 'Universidad de Antioquia';
    
    // Variables globales para la reserva
    let bikeCode = '';
    let generatedCode = '';
    let miniMap; // Mapa definido a nivel superior para poder acceder en otras funciones

    // Función para cargar y buscar los datos de la estación
    function loadStationData() {
        fetch('../data/estaciones.json')
            .then(response => response.json())
            .then(stations => {
                const stationData = stations.find(station => station.name === stationName);
                
                if (!stationData) {
                    console.error('Estación no encontrada:', stationName);
                    // Mostrar datos por defecto o mensaje de error
                    const fallbackData = {
                        name: stationName,
                        address: 'Dirección no disponible',
                        schedule: 'Horario no disponible',
                        bikes: 0,
                        position: [6.244203, -75.581212] // Posición por defecto (Centro de Medellín)
                    };
                    updateUIWithStationData(fallbackData);
                    return;
                }
                
                // Llamar a la función que actualiza la UI con los datos reales
                updateUIWithStationData(stationData);
            })
            .catch(error => {
                console.error('Error al cargar las estaciones:', error);
                // Mostrar datos simulados como fallback
                const fallbackData = {
                    name: stationName,
                    address: 'Dirección no disponible',
                    schedule: 'Horario no disponible',
                    bikes: 0,
                    position: [6.244203, -75.581212] // Posición por defecto (Centro de Medellín)
                };
                updateUIWithStationData(fallbackData);
            });
    }
  
    // Función para actualizar la UI con los datos de la estación
    function updateUIWithStationData(stationData) {
        // Actualizar UI con datos de la estación
        document.getElementById('station-name').textContent = stationData.name;
        document.getElementById('station-address').textContent = stationData.address;
        document.getElementById('station-schedule').textContent = stationData.schedule;
        document.getElementById('available-bikes').textContent = stationData.bikes;
        
        // Configurar mapa pequeño
        miniMap = L.map('mini-map').setView(stationData.position, 16);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(miniMap);
        
        L.marker(stationData.position, {
            icon: L.divIcon({
                className: 'station-marker',
                html: `<div style="background-color: var(--verde-claro)">
                        <span>${stationData.bikes}🚲</span>
                    </div>`,
                iconSize: [40, 40]
            })
        }).addTo(miniMap);

        setupReservationProcess(stationData);
    }
  
    function setupReservationProcess(stationData) {
        // Configurar selector de tiempo
        const timeInput = document.getElementById('reservation-time');
        const now = new Date();
        const minTime = new Date(now.getTime() + 5 * 60000); // 5 minutos en el futuro
        const maxTime = new Date(now.getTime() + 15 * 60000); // 15 minutos en el futuro
        
        timeInput.min = formatDateTime(minTime);
        timeInput.max = formatDateTime(maxTime);
        timeInput.value = formatDateTime(minTime);
    
        // Funciones para manejar los pasos
        document.getElementById('continue-to-confirm').addEventListener('click', function() {
            // Validar que haya bicicletas disponibles
            if (stationData.bikes <= 0) {
                alert('No hay bicicletas disponibles en esta estación');
                return;
            }
            
            // Actualizar resumen
            document.getElementById('summary-station').textContent = stationData.name;
            document.getElementById('summary-address').textContent = stationData.address;
            
            const selectedTime = new Date(timeInput.value);
            document.getElementById('summary-time').textContent = formatTime(selectedTime);
            
            // Generar datos para la reserva
            bikeCode = `#B-${Math.floor(1000 + Math.random() * 9000)}`;
            generatedCode = generateRandomCode();
            
            document.getElementById('summary-bike').textContent = bikeCode;
            document.getElementById('summary-code').textContent = generatedCode;
            
            // Mostrar paso 2
            document.getElementById('step-1').classList.add('hidden');
            document.getElementById('step-2').classList.remove('hidden');
            
            // Actualizar paso activo
            updateActiveStep(2);
        });

        document.getElementById('back-to-selection').addEventListener('click', function() {
            document.getElementById('step-2').classList.add('hidden');
            document.getElementById('step-1').classList.remove('hidden');
            updateActiveStep(1);
        });

        document.getElementById('confirm-reservation').addEventListener('click', function() {
            // Aquí iría la lógica para confirmar la reserva con el backend
            
            // Actualizar datos en el paso 3
            document.getElementById('complete-station').textContent = stationData.name;
            document.getElementById('complete-bike').textContent = bikeCode;
            document.getElementById('complete-code').textContent = generatedCode;
            
            const selectedTime = new Date(timeInput.value);
            const limitTime = new Date(selectedTime.getTime() + 15 * 60000);
            document.getElementById('complete-time').textContent = formatTime(limitTime);
            
            // Mostrar paso 3
            document.getElementById('step-2').classList.add('hidden');
            document.getElementById('step-3').classList.remove('hidden');
            updateActiveStep(3);

            // Generar código QR
            generateQRCode(generatedCode);
            
            // Generar una notificación de reserva y programar la de vencimiento
            createReservationNotification(stationData.name, bikeCode, selectedTime);
            
            // Añadir botón para simular reserva vencida (solo para demo)
            agregarBotonSimulacion(stationData.name, bikeCode);
        });

        document.getElementById('view-directions').addEventListener('click', function() {
            // Abrir Google Maps con la ubicación de la estación
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${stationData.position[0]},${stationData.position[1]}`);
        });
    }

    // Funciones auxiliares
    function formatDateTime(date) {
        return date.toISOString().slice(0, 16);
    }

    function formatTime(date) {
        const options = { weekday: 'long', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('es-CO', options);
    }

    function generateRandomCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    function updateActiveStep(stepNumber) {
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) <= stepNumber) {
                step.classList.add('active');
            }
        });
    }

    function generateQRCode(code) {
        const canvas = document.getElementById("qr-code-canvas");
        if (!canvas) return;
        
        canvas.innerHTML = "";
        QRCode.toCanvas(document.createElement("canvas"), code, function(err, canvasEl) {
            if (!err && canvasEl) {
                canvas.appendChild(canvasEl);
            }
        });
    }
    
    // NUEVA FUNCIÓN: Crear notificación de reserva
    function createReservationNotification(stationName, bikeCode, reservationTime) {
        // Formato para la hora actual
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeStr = `${hours}:${minutes}`;
        
        // Formato para la fecha de la notificación
        const today = now.toLocaleDateString('es-CO', { weekday: 'long' });
        const fechaNotificacion = `Hoy - ${timeStr}`;
        
        // Formato para la hora de reserva
        const reservationHour = reservationTime.getHours().toString().padStart(2, '0');
        const reservationMinute = reservationTime.getMinutes().toString().padStart(2, '0');
        const reservationTimeStr = `${reservationHour}:${reservationMinute}`;
        
        // Crear objeto de notificación
        const nuevaNotificacion = {
            id: Date.now(), // ID único basado en timestamp
            icono: '📅',
            titulo: 'Reserva confirmada',
            descripcion: `Tu bicicleta ${bikeCode} ha sido reservada en ${stationName} para hoy a las ${reservationTimeStr}. Código: ${generatedCode}`,
            fecha: fechaNotificacion,
            leida: false
        };
        
        // Guardar la notificación en localStorage para que esté disponible en la página de notificaciones
        let notificacionesGuardadas = JSON.parse(localStorage.getItem('notificaciones') || '[]');
        notificacionesGuardadas.unshift(nuevaNotificacion); // Añadir al principio del array
        localStorage.setItem('notificaciones', JSON.stringify(notificacionesGuardadas));
        
        // Actualizar el contador de notificaciones en el icono de campana
        const notificationBadge = document.querySelector('.notification-badge');
        if (notificationBadge) {
            const contadorActual = parseInt(notificationBadge.textContent.replace('+', '')) || 0;
            notificationBadge.textContent = `+${contadorActual + 1}`;
            notificationBadge.style.display = 'flex'; // Asegurarse de que sea visible
        }
        
        // Mostrar un feedback visual temporal
        mostrarFeedbackNotificacion('¡Reserva confirmada! Se ha añadido una notificación');
        
        // Programar notificación de reserva vencida después de 15 minutos
        scheduleExpiredReservationNotification(stationName, bikeCode, reservationTime);
    }
    
    // NUEVA FUNCIÓN: Programar notificación de reserva vencida
    function scheduleExpiredReservationNotification(stationName, bikeCode, reservationTime) {
        // Guardar datos de la reserva en el localStorage para poder acceder después
        const reservationData = {
            stationName: stationName,
            bikeCode: bikeCode,
            reservationTime: reservationTime.getTime(),
            code: generatedCode
        };
        
        localStorage.setItem('currentReservation', JSON.stringify(reservationData));
        
        // Calcular tiempo hasta el vencimiento (15 minutos = 900000 milisegundos)
        const expirationDelay = 5 * 1000; // 15 minutos
        
        // Para fines de demostración/prueba, puedes usar un tiempo más corto como 15 segundos
        // const expirationDelay = 15 * 1000; // 15 segundos (solo para pruebas)
        
        // Guardar el ID del timeout para poder cancelarlo si es necesario
        const timeoutId = setTimeout(() => {
            createExpiredReservationNotification(stationName, bikeCode);
        }, expirationDelay);
        
        // Guardar el ID del timeout en sessionStorage para poder cancelarlo si es necesario
        sessionStorage.setItem('reservationTimeoutId', timeoutId);
    }
    
    // NUEVA FUNCIÓN: Crear notificación de reserva vencida
    function createExpiredReservationNotification(stationName, bikeCode) {
        // Formato para la hora actual
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeStr = `${hours}:${minutes}`;
        
        // Formato para la fecha de la notificación
        const fechaNotificacion = `Hoy - ${timeStr}`;
        
        // Crear objeto de notificación de reserva vencida
        const notificacionVencida = {
            id: Date.now(), // ID único basado en timestamp
            icono: '⏰',
            titulo: 'Reserva vencida',
            descripcion: `Tu reserva de la bicicleta ${bikeCode} en ${stationName} ha expirado por falta de retiro. La bicicleta ha sido liberada para otros usuarios.`,
            fecha: fechaNotificacion,
            leida: false
        };
        
        // Guardar la notificación en localStorage
        let notificacionesGuardadas = JSON.parse(localStorage.getItem('notificaciones') || '[]');
        notificacionesGuardadas.unshift(notificacionVencida); // Añadir al principio del array
        localStorage.setItem('notificaciones', JSON.stringify(notificacionesGuardadas));
        
        // Actualizar el contador de notificaciones en el icono de campana
        const notificationBadge = document.querySelector('.notification-badge');
        if (notificationBadge) {
            const contadorActual = parseInt(notificationBadge.textContent.replace('+', '')) || 0;
            notificationBadge.textContent = `+${contadorActual + 1}`;
            notificationBadge.style.display = 'flex'; // Asegurarse de que sea visible
        }
        
        // Mostrar un feedback visual temporal
        mostrarFeedbackNotificacion('Tu reserva ha expirado. Se ha liberado la bicicleta.');
        
        // Eliminar datos de la reserva actual
        localStorage.removeItem('currentReservation');
    }
    
    // Función auxiliar para mostrar feedback visual de la notificación
    function mostrarFeedbackNotificacion(mensaje) {
        const feedback = document.createElement('div');
        feedback.className = 'feedback-notificacion';
        feedback.innerHTML = `
            <i class="fas fa-bell"></i>
            <span>${mensaje}</span>
        `;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.classList.add('mostrar');
        }, 10);
        
        setTimeout(() => {
            feedback.classList.remove('mostrar');
            setTimeout(() => {
                feedback.remove();
            }, 300);
        }, 3000);
    }
    
    // NUEVA FUNCIÓN: Agregar botón para simular reserva vencida (para demostración)
    function agregarBotonSimulacion(stationName, bikeCode) {
        // Verificar si ya existe el botón de simulación
        if (document.getElementById('simulate-expired')) {
            return;
        }
        
        // Crear botón de simulación
        const btnSimular = document.createElement('button');
        btnSimular.id = 'simulate-expired';
        btnSimular.className = 'btn-secondary';
        btnSimular.innerHTML = '<i class="fas fa-clock"></i> Simular reserva vencida';
        btnSimular.style.marginTop = '20px';
        
        // Agregar evento al botón
        btnSimular.addEventListener('click', function() {
            // Cancelar el temporizador existente
            const timeoutId = sessionStorage.getItem('reservationTimeoutId');
            if (timeoutId) {
                clearTimeout(parseInt(timeoutId));
            }
            
            // Crear inmediatamente la notificación de reserva vencida
            createExpiredReservationNotification(stationName, bikeCode);
            
            // Desactivar el botón
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-check"></i> Simulación completada';
        });
        
        // Agregar el botón a la interfaz
        const completionCard = document.querySelector('.complete-card');
        completionCard.appendChild(btnSimular);
    }

    // Iniciar la carga de datos
    loadStationData();
});