document.addEventListener('DOMContentLoaded', function() {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const stationName = urlParams.get('estacion') || 'Universidad de Antioquia';
    
    // Simular datos de la estación (en producción esto vendría de una API)
    const stationData = {
      name: stationName,
      address: 'Cl. 67 #53-108, Medellín',
      schedule: '5:30 AM - 10:00 PM',
      bikes: 5,
      position: [6.267135, -75.568865]
    };
  
    // Actualizar UI con datos de la estación
    document.getElementById('station-name').textContent = stationData.name;
    document.getElementById('station-address').textContent = stationData.address;
    document.getElementById('station-schedule').textContent = stationData.schedule;
    document.getElementById('available-bikes').textContent = stationData.bikes;
    
    // Configurar mapa pequeño
    const miniMap = L.map('mini-map').setView(stationData.position, 16);
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
      
      // Generar datos aleatorios para la demo
      document.getElementById('summary-bike').textContent = `#B-${Math.floor(1000 + Math.random() * 9000)}`;
      document.getElementById('summary-code').textContent = generateRandomCode();
      
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
      document.getElementById('complete-bike').textContent = document.getElementById('summary-bike').textContent;
      document.getElementById('complete-code').textContent = document.getElementById('summary-code').textContent;
      
      const selectedTime = new Date(timeInput.value);
      const limitTime = new Date(selectedTime.getTime() + 15 * 60000);
      document.getElementById('complete-time').textContent = formatTime(limitTime);
      
      // Mostrar paso 3
      document.getElementById('step-2').classList.add('hidden');
      document.getElementById('step-3').classList.remove('hidden');
      updateActiveStep(3);
    });
  
    document.getElementById('view-directions').addEventListener('click', function() {
      // Abrir Google Maps con la ubicación de la estación
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${stationData.position[0]},${stationData.position[1]}`);
    });
  
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
  });