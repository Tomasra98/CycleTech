// estaciones.js
document.addEventListener('DOMContentLoaded', async function() {
  // Cargar datos desde el JSON
  let stations = [];
  try {
    const response = await fetch('../data/estaciones.json');
    stations = await response.json();
  } catch (error) {
    console.error('Error cargando estaciones:', error);
    // Puedes mostrar un mensaje de error al usuario aquí
    return;
  }
  // Elementos del DOM
  const zoneFilter = document.getElementById('zone-filter');
  const statusFilter = document.getElementById('status-filter');
  //const typeFilter = document.getElementById('type-filter');
  const sortStations = document.getElementById('sort-stations');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const toggleFilters = document.getElementById('toggle-filters');
  const filtersContainer = document.getElementById('filters-container');
  const stationsList = document.getElementById('stations-list');

  // Mapa Leaflet
  const map = L.map('stations-map').setView([6.244203, -75.581215], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Marcadores y tarjetas
  let markers = [];
  let currentStations = [...stations];

  // Función para renderizar estaciones
  function renderStations(stationsToRender) {
    // Limpiar listado y marcadores
    stationsList.innerHTML = '';
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
  
    // Crear tarjetas y marcadores
    stationsToRender.forEach(station => {
      // Determinar estado real basado en disponibilidad
      const hasBikes = station.bikes > 0;
      const hasAnchorages = station.anchorages > 0;
      
      // Actualizar el status según disponibilidad real
      if (hasBikes && hasAnchorages) {
        station.status = "both";
      } else if (hasBikes) {
        station.status = "available";
      } else if (hasAnchorages) {
        station.status = "anchorage";
      } else {
        station.status = "empty";
      }
  
      // Crear tarjeta
      const stationCard = document.createElement('div');
      stationCard.className = 'station-card'; // Solo la clase base      stationCard.dataset.zone = station.zone;
      //stationCard.dataset.type = station.type;
      stationCard.dataset.status = station.status;
      stationCard.dataset.name = station.name.toLowerCase();
  
      stationCard.innerHTML = `
      <div class="station-status">
        <span class="status-badge ${hasBikes ? (hasAnchorages ? 'both' : 'available') : ''}">${station.bikes} bicis</span>
        <span class="status-badge ${hasAnchorages ? (hasBikes ? 'both' : 'anchorage') : ''}">${station.anchorages} anclajes</span>
      </div>
        <div class="station-info">
          <h4>${station.name}</h4>
          <p><i class="fas fa-map-marker-alt"></i> ${station.address}</p>
          <p><i class="fas fa-clock"></i> ${station.schedule}</p>
        </div>
        <div class="station-actions">
          <button class="btn-station btn-reserve ${!hasBikes ? 'disabled' : ''}" ${!hasBikes ? 'disabled' : ''}>
            <i class="fas fa-bicycle"></i> ${!hasBikes ? 'Sin bicis' : 'Reservar'}
          </button>
          <button class="btn-station btn-directions ${!hasAnchorages ? 'disabled' : ''}" ${!hasAnchorages ? 'disabled' : ''}>
            <i class="fas fa-route"></i> ${!hasAnchorages ? 'Sin anclajes' : 'Cómo llegar'}
          </button>
        </div>
      `;
      stationsList.appendChild(stationCard);
  
      // Determinar color del marcador
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
  
      // Crear marcador en el mapa
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
  
      // Configurar popup
      marker.bindPopup(`
        <h4>${station.name}</h4>
        <p>Bicicletas: ${station.bikes}</p>
        <p>Anclajes: ${station.anchorages}</p>
        <button class="map-popup-btn" onclick="window.redirectToReservation('${station.name}')" ${!hasBikes ? 'disabled' : ''}>
          ${!hasBikes ? 'No disponible' : 'Reservar'}
        </button>
      `);
  
      markers.push(marker);
    });
  
    // Añadir eventos a los botones
    addStationEvents();
  }

  // Función para aplicar filtros
  function applyFilters() {
    const zoneValue = zoneFilter.value;
    const statusValue = statusFilter.value;
    //const typeValue = typeFilter.value;
    const searchValue = searchInput.value.toLowerCase();
  
    currentStations = stations.filter(station => {
      // Determinar disponibilidad real
      const hasBikes = station.bikes > 0;
      const hasAnchorages = station.anchorages > 0;
      
      // Filtro por zona
      if (zoneValue !== 'all' && station.zone !== zoneValue) return false;
      
      // Filtro por tipo
      //if (typeValue !== 'all' && station.type !== typeValue) return false;
      
      // Filtro por estado (usando disponibilidad real)
      if (statusValue !== 'all') {
        if (statusValue === 'available' && !hasBikes) return false;
        if (statusValue === 'anchorage' && !hasAnchorages) return false;
        if (statusValue === 'both' && (!hasBikes || !hasAnchorages)) return false;
      }
      
      // Filtro por búsqueda
      if (searchValue && !station.name.toLowerCase().includes(searchValue)) return false;
      
      return true;
    });
  
    // Ordenar estaciones
    sortStationsList();
  }

  // Función para ordenar estaciones
  function sortStationsList() {
    const sortValue = sortStations.value;
    
    currentStations.sort((a, b) => {
      if (sortValue === 'distance') {
        return 0; // En una implementación real usarías geolocalización
      } else if (sortValue === 'availability') {
        return (b.bikes + b.anchorages) - (a.bikes + a.anchorages);
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    renderStations(currentStations);
  }

  // Función para añadir eventos a los botones
  function addStationEvents() {
    // Botones de reserva
    document.querySelectorAll('.btn-reserve').forEach(btn => {
      btn.addEventListener('click', function() {
        if (this.classList.contains('disabled')) return;
        
        const stationName = this.closest('.station-card').querySelector('h4').textContent;
        window.location.href = `reservar.html?estacion=${encodeURIComponent(stationName)}`;
      });
    });
    
    // Botones de cómo llegar
    document.querySelectorAll('.btn-directions').forEach(btn => {
      btn.addEventListener('click', function() {
        if (this.classList.contains('disabled')) return;
        
        const stationCard = this.closest('.station-card');
        const stationName = stationCard.querySelector('h4').textContent;
        // Encontrar la estación en el array original
        const station = stations.find(s => s.name === stationName);
        if (station && station.position) {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${station.position[0]},${station.position[1]}`);
        } else {
            alert(`No se pudo obtener la ubicación de ${stationName}`);
        }
    });
});
  }

  // Event listeners
  zoneFilter.addEventListener('change', applyFilters);
  statusFilter.addEventListener('change', applyFilters);
  //typeFilter.addEventListener('change', applyFilters);
  sortStations.addEventListener('change', sortStationsList);
  searchBtn.addEventListener('click', applyFilters);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') applyFilters();
  });
  toggleFilters.addEventListener('click', function() {
    filtersContainer.style.display = filtersContainer.style.display === 'none' ? 'flex' : 'none';
  });

  // Inicialización
  renderStations(stations);

  // Hacer función accesible para los popups
  window.redirectToReservation = function(stationName) {
    window.location.href = `reservar.html?estacion=${encodeURIComponent(stationName)}`;
  };
});