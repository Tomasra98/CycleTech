document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const stationName = urlParams.get('estacion') || 'Universidad de Antioquia';

  const stationData = {
    name: stationName,
    address: 'Cl. 67 #53-108, Medellín',
    schedule: '5:30 AM - 10:00 PM',
    bikes: 5,
    position: [6.267135, -75.568865]
  };

  document.getElementById('station-name').textContent = stationData.name;
  document.getElementById('station-address').textContent = stationData.address;
  document.getElementById('station-schedule').textContent = stationData.schedule;
  document.getElementById('available-bikes').textContent = stationData.bikes;

  const miniMap = L.map('mini-map').setView(stationData.position, 16);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
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

  const timeInput = document.getElementById('reservation-time');
  const now = new Date();
  const minTime = new Date(now.getTime() + 5 * 60000);
  const maxTime = new Date(now.getTime() + 15 * 60000);
  timeInput.min = formatDateTime(minTime);
  timeInput.max = formatDateTime(maxTime);
  timeInput.value = formatDateTime(minTime);

  let generatedCode = "";

  document.getElementById('continue-to-confirm').addEventListener('click', function () {
    if (stationData.bikes <= 0) {
      alert('No hay bicicletas disponibles en esta estación');
      return;
    }

    document.getElementById('summary-station').textContent = stationData.name;
    document.getElementById('summary-address').textContent = stationData.address;

    const selectedTime = new Date(timeInput.value);
    document.getElementById('summary-time').textContent = formatTime(selectedTime);

    const bikeCode = `#B-${Math.floor(1000 + Math.random() * 9000)}`;
    generatedCode = generateRandomCode();

    document.getElementById('summary-bike').textContent = bikeCode;
    document.getElementById('summary-code').textContent = generatedCode;

    document.getElementById('step-1').classList.add('hidden');
    document.getElementById('step-2').classList.remove('hidden');
    updateActiveStep(2);
  });

  document.getElementById('back-to-selection').addEventListener('click', function () {
    document.getElementById('step-2').classList.add('hidden');
    document.getElementById('step-1').classList.remove('hidden');
    updateActiveStep(1);
  });

  document.getElementById('confirm-reservation').addEventListener('click', function () {
    document.getElementById('complete-station').textContent = stationData.name;
    document.getElementById('complete-bike').textContent = document.getElementById('summary-bike').textContent;
    document.getElementById('complete-code').textContent = generatedCode;

    const selectedTime = new Date(timeInput.value);
    const limitTime = new Date(selectedTime.getTime() + 15 * 60000);
    document.getElementById('complete-time').textContent = formatTime(limitTime);

    document.getElementById('step-2').classList.add('hidden');
    document.getElementById('step-3').classList.remove('hidden');
    updateActiveStep(3);

    generateQRCode(generatedCode);
  });

  document.getElementById('view-directions').addEventListener('click', function () {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${stationData.position[0]},${stationData.position[1]}`);
  });

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
    canvas.innerHTML = "";
    QRCode.toCanvas(document.createElement("canvas"), code, function (err, canvasEl) {
      if (!err) canvas.appendChild(canvasEl);
    });
  }
});
