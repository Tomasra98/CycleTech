const estaciones = [
    {
      "name": "Universidad de Antioquia",
      "position": [6.267135, -75.568865],
      "bikes": 5,
      "anchorages": 3,
      "status": "both",
      "zone": "centro",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cl. 67 #53-108, Medellín"
    },
    {
      "name": "Parque Berrío",
      "position": [6.251847, -75.563593],
      "bikes": 2,
      "anchorages": 7,
      "status": "both",
      "zone": "centro",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 50 #52-21, Medellín"
    },
    {
      "name": "San Antonio",
      "position": [6.246512, -75.573456],
      "bikes": 0,
      "anchorages": 10,
      "status": "anchorage",
      "zone": "centro",
      "type": "manual",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cl. 44 #46-35, Medellín"
    },
    {
      "name": "Poblado - Provenza",
      "position": [6.208874, -75.570182],
      "bikes": 8,
      "anchorages": 0,
      "status": "available",
      "zone": "poblado",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 43A #6 Sur-145, Medellín"
    },
    {
      "name": "Estación Estadio",
      "position": [6.256483, -75.590454],
      "bikes": 4,
      "anchorages": 6,
      "status": "both",
      "zone": "laureles",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cl. 48 #73-10, Medellín"
    },
    {
      "name": "Unicentro",
      "position": [6.239678, -75.587763],
      "bikes": 3,
      "anchorages": 5,
      "status": "both",
      "zone": "belen",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cl. 38 #65-100, Medellín"
    },
    {
      "name": "Boston - Parque",
      "position": [6.235432, -75.574321],
      "bikes": 7,
      "anchorages": 1,
      "status": "both",
      "zone": "boston",
      "type": "manual",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 45 #50-20, Medellín"
    },
    {
      "name": "Estación Industriales",
      "position": [6.240112, -75.583456],
      "bikes": 2,
      "anchorages": 8,
      "status": "both",
      "zone": "belen",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cl. 32 #65-30, Medellín"
    },
    {
      "name": "Estación Universidad Nacional",
      "position": [6.266543, -75.576543],
      "bikes": 6,
      "anchorages": 4,
      "status": "both",
      "zone": "centro",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cl. 65 #55-45, Medellín"
    },
    {
      "name": "Estación San Diego",
      "position": [6.238765, -75.567890],
      "bikes": 1,
      "anchorages": 9,
      "status": "both",
      "zone": "poblado",
      "type": "manual",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 43 #30-25, Medellín"
    },
    {
      "name": "Estación Los Colores",
      "position": [6.260987, -75.599876],
      "bikes": 5,
      "anchorages": 5,
      "status": "both",
      "zone": "laureles",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cl. 47 #72-50, Medellín"
    },
    {
      "name": "Estación Oviedo",
      "position": [6.229876, -75.573210],
      "bikes": 0,
      "anchorages": 12,
      "status": "anchorage",
      "zone": "poblado",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 43 #6 Sur-150, Medellín"
    },
    {
      "name": "Estación Suramericana",
      "position": [6.253456, -75.598765],
      "bikes": 4,
      "anchorages": 4,
      "status": "both",
      "zone": "sura",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 64 #49-30, Medellín"
    },
    {
      "name": "Estación Aguacatala",
      "position": [6.198765, -75.576543],
      "bikes": 3,
      "anchorages": 7,
      "status": "both",
      "zone": "poblado",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 48 #10-45, Medellín"
    },
    {
      "name": "Estación Guayabal",
      "position": [6.243210, -75.612345],
      "bikes": 6,
      "anchorages": 2,
      "status": "both",
      "zone": "guayabal",
      "type": "manual",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cl. 30 #75-20, Medellín"
    },
    {
      "name": "Estación San Javier",
      "position": [6.245678, -75.610987],
      "bikes": 2,
      "anchorages": 8,
      "status": "both",
      "zone": "guayabal",
      "type": "manual",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 80 #30-15, Medellín"
    },
    {
      "name": "Estación Floresta",
      "position": [6.254321, -75.587654],
      "bikes": 5,
      "anchorages": 3,
      "status": "both",
      "zone": "laureles",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cl. 50 #72-30, Medellín"
    },
    {
      "name": "Estación Nutibara",
      "position": [6.248765, -75.565432],
      "bikes": 0,
      "anchorages": 9,
      "status": "anchorage",
      "zone": "centro",
      "type": "manual",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 52 #50-10, Medellín"
    },
    {
      "name": "Estación Prado",
      "position": [6.257654, -75.558765],
      "bikes": 7,
      "anchorages": 0,
      "status": "available",
      "zone": "centro",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cl. 55 #45-20, Medellín"
    },
    {
      "name": "Estación Envigado",
      "position": [6.175432, -75.587654],
      "bikes": 4,
      "anchorages": 6,
      "status": "both",
      "zone": "poblado",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 40 #30 Sur-15, Envigado"
    },
    {
      "name": "Estación Itagüí",
      "position": [6.172345, -75.609876],
      "bikes": 3,
      "anchorages": 5,
      "status": "both",
      "zone": "sur",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cl. 35 #50-20, Itagüí"
    },
    {
      "name": "Estación Sabaneta",
      "position": [6.153456, -75.598765],
      "bikes": 2,
      "anchorages": 8,
      "status": "both",
      "zone": "sur",
      "type": "manual",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 45 #75 Sur-10, Sabaneta"
    },
    {
      "name": "Estación La América",
      "position": [6.245678, -75.576543],
      "bikes": 5,
      "anchorages": 3,
      "status": "both",
      "zone": "laureles",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 80 #42-30, Medellín"
    },
    {
      "name": "Estación San Ignacio",
      "position": [6.248765, -75.567890],
      "bikes": 0,
      "anchorages": 9,
      "status": "anchorage",
      "zone": "centro",
      "type": "manual",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cl. 44 #48-15, Medellín"
    },
    {
      "name": "Estación Caribe",
      "position": [6.278765, -75.587654],
      "bikes": 6,
      "anchorages": 0,
      "status": "available",
      "zone": "norte",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 60 #45-20, Medellín"
    },
    {
      "name": "Estación Niquía",
      "position": [6.298765, -75.543210],
      "bikes": 3,
      "anchorages": 7,
      "status": "both",
      "zone": "bello",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cl. 50 #45-30, Bello"
    },
    {
      "name": "Estación Universidad de Medellín",
      "position": [6.234567, -75.598765],
      "bikes": 4,
      "anchorages": 4,
      "status": "both",
      "zone": "belen",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 87 #30-45, Medellín"
    },
    {
      "name": "Estación San Cristóbal",
      "position": [6.265432, -75.632109],
      "bikes": 2,
      "anchorages": 8,
      "status": "both",
      "zone": "guayabal",
      "type": "manual",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 120 #45-20, Medellín"
    },
    {
      "name": "Estación Belén",
      "position": [6.231234, -75.598765],
      "bikes": 5,
      "anchorages": 3,
      "status": "both",
      "zone": "belen",
      "type": "automatic",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cl. 30 #75-10, Medellín"
    },
    {
      "name": "Estación La Estrella",
      "position": [6.143456, -75.643210],
      "bikes": 1,
      "anchorages": 9,
      "status": "both",
      "zone": "sur",
      "type": "manual",
      "schedule": "5:30 AM - 10:00 PM",
      "address": "Cra. 50 #85 Sur-15, La Estrella"
    }
];

let intervalo = null;

function simularEvento() {
    const estacion = estaciones[Math.floor(Math.random() * estaciones.length)];

    const puedeRetirar = estacion.bikes > 0;
    const puedeAnclar = estacion.anchorages > 0;

    const accion = Math.random() < 0.5 ? 'retirar' : 'anclar';

    if (accion === 'retirar' && puedeRetirar) {
      estacion.bikes--;
      estacion.anchorages++;
      logEvento(`🚲 Retiro en "${estacion.name}"`);
    } else if (accion === 'anclar' && puedeAnclar) {
      estacion.bikes++;
      estacion.anchorages--;
      logEvento(`🔒 Anclaje en "${estacion.name}"`);
    } else {
      logEvento(`❌ No se pudo ${accion} en "${estacion.name}"`);
    }
  }

function iniciarSimulacion() {
    if (!intervalo) {
      intervalo = setInterval(() => {
        simularEvento();
        mostrarEstado();
      }, 100);
    }
  }

function detenerSimulacion() {
    clearInterval(intervalo);
    intervalo = null;
  }

function mostrarEstado() {
    const output = estaciones.map(est => {
      return `${est.name}: 🚲 ${est.bikes} | ⛓️ ${est.anchorages} / ${est.anchorages + est.bikes}`;
    }).join('\n');
    document.getElementById('output').textContent = output;
 }

function logEvento(texto) {
    console.log(texto);
 }

mostrarEstado(); // mostrar estado inicial