// mapa-compartido.js
document.addEventListener('DOMContentLoaded', async function() {
    // Cargar datos desde el JSON
    let stations = [];
    try {
      const response = await fetch('../data/estaciones.json');
      stations = await response.json();
    } catch (error) {
      console.error('Error cargando estaciones:', error);
      return;
    }
  
    // Inicializar mapa
    const map = L.map('stations-map').setView([6.244203, -75.581215], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // Crear marcadores
    stations.forEach(station => {
      const hasBikes = station.bikes > 0;
      const hasAnchorages = station.anchorages > 0;
      
      let iconColor;
      if (station.status === "both") {
        iconColor = 'var(--azul-oscuro)'; // Azul oscuro para ambos disponibles
      } else if (station.status === "available") {
        iconColor = 'var(--verde-claro)'; // Verde claro para solo bicis
      } else if (station.status === "anchorage") {
        iconColor = 'var(--verde-oscuro)'; // Verde oscuro para solo anclajes
      } else {
        iconColor = 'var(--texto-claro)'; // Gris para vacías
      }
  
      const marker = L.marker(station.position, {
        icon: L.divIcon({
          className: 'station-marker',
          html: `<div style="background-color: ${iconColor}">
                  <span>${station.bikes}🚲</span>
                  <span>${station.anchorages}🔒</span>
                </div>`,
          iconSize: [40, 40]
        })
      }).addTo(map);
  
      marker.bindPopup(`
        <h4>${station.name}</h4>
        <p>Bicicletas: ${station.bikes}</p>
        <p>Anclajes: ${station.anchorages}</p>
        <button class="map-popup-btn" onclick="window.location.href='reservar.html?estacion=${encodeURIComponent(station.name)}'" ${!hasBikes ? 'disabled' : ''}>
          ${!hasBikes ? 'No disponible' : 'Reservar'}
        </button>
      `);
    });
  
    // Función para actualizar datos periódicamente
    async function updateStationData() {
      try {
        const response = await fetch('../data/estaciones.json');
        const updatedStations = await response.json();
        
        // Aquí deberías actualizar los marcadores en el mapa
        // Esto es más complejo y requiere eliminar los antiguos y crear nuevos
        // O implementar una lógica de actualización de marcadores existentes
        
        // Programar próxima actualización
        setTimeout(updateStationData, 30000); // Cada 30 segundos
      } catch (error) {
        console.error('Error actualizando estaciones:', error);
        setTimeout(updateStationData, 60000);
      }
    }
  
    // Iniciar la actualización periódica
    updateStationData();
  });