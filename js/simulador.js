// simulador.js
let estaciones = require('../data/estaciones.json');const fs = require('fs');

let tiempoGlobal = 0;
let contadorReservas = 0;

// Simulación cada segundo
const intervalo = setInterval(() => {
  tiempoGlobal++;
  simularEvento();
  procesarReservas();
  guardarJSON();
  mostrarEstado();

  if (tiempoGlobal >= 60) {
    clearInterval(intervalo);
    console.log("⏹️ Simulación terminada.");
  }
}, 1000);

// ---------- FUNCIONES SIMULACIÓN ----------

function simularEvento() {
  const estacion = estaciones[Math.floor(Math.random() * estaciones.length)];
  const puedeRetirar = estacion.bikes > estacion.reservas.length;
  const puedeAnclar = estacion.anchorages > 0;

  const accion = Math.random();

  if (accion < 0.4 && puedeRetirar) {
    estacion.bikes--;
    estacion.anchorages++;
    log(`🚲 Retiro normal en "${estacion.name}"`);
  } else if (accion < 0.7 && puedeAnclar) {
    estacion.bikes++;
    estacion.anchorages--;
    log(`🔒 Anclaje en "${estacion.name}"`);
  } else if (accion < 0.9 && puedeRetirar) {
    contadorReservas++;
    estacion.reservas.push({ id: contadorReservas, tiempo: tiempoGlobal });
    log(`🕒 Reserva creada en "${estacion.name}" (ID ${contadorReservas})`);
  }
}

function procesarReservas() {
  estaciones.forEach(est => {
    est.reservas = est.reservas.filter(reserva => {
      if (tiempoGlobal - reserva.tiempo >= 5) {
        const seRetira = Math.random() < 0.5;

        if (seRetira) {
          est.bikes--;
          est.anchorages++;
          log(`✅ Retiro de bicicleta reservada en "${est.name}" (ID ${reserva.id})`);
        } else {
          log(`❌ Reserva no usada en "${est.name}" (ID ${reserva.id})`);
        }

        return false; // eliminar
      }
      return true; // mantener
    });
  });
}

function guardarJSON() {
  fs.writeFileSync('./data/estaciones.json', JSON.stringify(estaciones, null, 2));
}

function mostrarEstado() {
  console.clear();
  console.log(`⏱️ Tiempo: ${tiempoGlobal}s\n`);
  estaciones.forEach(est => {
    console.log(`${est.name}: 🚲 ${est.bikes} | ⛓️ ${est.anchorages} / ${est.bikes + est.anchorages} | 🔒 Reservas: ${est.reservas.length}`);
  });
  console.log("\n");
}

function log(msg) {
  console.log(`[${tiempoGlobal}s] ${msg}`);
}
