// Base de conocimiento para el asistente IA
const aiKnowledge = {
  // Información sobre el servicio
  servicio: "CycleTech es un sistema de bicicletas compartidas que opera en la ciudad. Contamos con más de 200 estaciones y 2,500 bicicletas distribuidas estratégicamente.",
  horario: "Nuestro servicio está disponible 24/7, los 365 días del año. Sin embargo, el soporte técnico funciona de 8:00 a 20:00.",
  precios: "Este servicio es totalmente gratis.",
  mantenimiento: "Las bicicletas reciben mantenimiento una vez por semana. Si encuentras una bici en mal estado, puedes reportarla desde la app y recibirás 50 puntos de recompensa.",
  
  // Problemas comunes
  app: "Si la aplicación no funciona correctamente, te recomendamos: 1) Actualizar a la última versión, 2) Reiniciar tu dispositivo, 3) Verificar tu conexión a internet.",
  devolucion: "Si la estación está llena y no puedes devolver la bicicleta, tienes 15 minutos adicionales gratis para ir a otra estación. También puedes usar la función 'Reservar espacio' en la app.",
  
  // Seguridad
  robo: "Si tu bicicleta es robada mientras la usas, debes reportarlo inmediatamente al 112 y luego notificarnos a través de la línea de emergencia 900-123-456.",
  accidente: "En caso de accidente, primero asegúrate de que todos estén bien y llama a emergencias si es necesario. Luego, notifica el incidente desde la app en la sección 'Reportar problema'.",
  
  // Funcionalidades especiales
  rutas: "La app incluye un planificador de rutas que te sugiere los caminos más seguros y con carriles bici. También puedes ver las rutas más populares de otros usuarios.",
  eventos: "Organizamos tours guiados los fines de semana y eventos comunitarios mensuales. Consulta la sección 'Eventos' en nuestra app o sitio web.",
  
  // Sostenibilidad
  impacto: "Hasta la fecha, nuestros usuarios han evitado la emisión de más de 500 toneladas de CO2 y han recorrido colectivamente más de 2 millones de kilómetros en nuestras bicicletas.",
  iniciativas: "Colaboramos con el ayuntamiento en iniciativas de movilidad sostenible y donamos el 1% de nuestros ingresos a proyectos de infraestructura ciclista en la ciudad.",
  
  // Información sobre incentivos
  incentivos: {
    actualizacion: "Los puntos se actualizan inmediatamente después de cada uso del servicio. Puedes verlos reflejados en tu perfil en tiempo real.",
    comercios: "Puedes ver los comercios aliados en la sección 'Incentivos' de la plataforma web, donde encontrarás un mapa interactivo con todos nuestros aliados comerciales.",
    vencimiento: "Los puntos tienen una vigencia de 3 meses desde que los obtienes. Te recomendamos revisarlos periódicamente para aprovecharlos antes de su vencimiento.",
    canje: "¡Sí! Puedes canjear tus puntos tantas veces como quieras, siempre que tengas el saldo suficiente para cada canje.",
    perdida: "Si pierdes puntos por algún inconveniente técnico, puedes reportarlo en la sección de ayuda y nuestro equipo evaluará tu caso para realizar la reposición correspondiente.",
    noUso: "Si reservas una bicicleta y no la utilizas, la reserva se cancelará automáticamente después de 15 minutos y podrías recibir una penalización de 50 puntos por no liberar el recurso para otros usuarios."
  },

  // Preguntas frecuentes sobre CycleTech (aplicativo web)
  cycleTech: {
    descripcion: "CycleTech es una plataforma web gratuita que permite consultar, reservar y usar bicicletas de forma inteligente, incorporando herramientas como gamificación, monitoreo por IoT y paneles solares.",
    diferencia: "CycleTech se diferencia de otros sistemas como EnCicla en que permite reservar bicicletas desde la web, acceder a incentivos por buen uso, y propone estaciones móviles y temporales, además de integrar funciones de gamificación y recompensas.",
    app: "No es necesario descargar una app para usar CycleTech. Todo se gestiona desde la plataforma web, que es responsive y se adapta fácilmente a dispositivos móviles.",
    gamificacion: "La gamificación en el sistema significa que se incorporan elementos de juego como puntos, niveles o premios por buen comportamiento: usar frecuentemente el sistema, devolver a tiempo, o estacionar en zonas estratégicas.",
    disponibilidad: "Desde el portal web puedes ver en tiempo real la disponibilidad de bicicletas y estaciones cercanas.",
    turistas: "Sí, los turistas pueden usar CycleTech. Deben registrarse en el sistema siguiendo un proceso sencillo.",
    datos: "Para registrarte en la web necesitas un correo electrónico válido, un documento de identidad y aceptar los términos y condiciones del servicio.",
    problemas: "Si tienes un problema con el sistema o una bicicleta, puedes reportarlo directamente en la sección de ayuda de la web, donde se activará un chat en línea o formulario de soporte."
  },

  // Preguntas frecuentes sobre EnCicla
  encicla: {
    descripcion: "EnCicla es el sistema público de bicicletas del Área Metropolitana del Valle de Aburrá, que permite a los ciudadanos movilizarse de forma sostenible y gratuita.",
    registro: "Puedes registrarte en EnCicla ingresando a encicla.metropol.gov.co y siguiendo los pasos del formulario de inscripción. Debes adjuntar tu documento de identidad y una foto tipo carné.",
    estaciones: "Las estaciones de EnCicla están distribuidas en Medellín y municipios cercanos como Envigado, Itagüí y Bello. Puedes consultar el mapa en el sitio web de EnCicla.",
    tiempo: "El tiempo máximo de uso de una bicicleta EnCicla es de 60 minutos continuos, con un intervalo de espera de 15 minutos para hacer un nuevo préstamo.",
    costo: "EnCicla es completamente gratuito para los usuarios registrados.",
    penalizacion: "Si no devuelves la bicicleta a tiempo, podrías recibir una sanción o suspensión temporal del servicio."
  }
};

// chatbot.js

const chatbotResponses = {
  gamificacion: "La gamificación en CycleTech significa que incorporamos elementos de juego como puntos, niveles o premios para hacer que tu experiencia de ciclismo urbano sea más divertida y motivadora. Ganarás puntos por kilómetros recorridos, reducción de emisiones y consistencia.",
  disponibilidad: "Puedes ver en tiempo real la disponibilidad de bicicletas desde la sección 'Estaciones' en nuestra app. Los colores indican: verde (muchas disponibles), amarillo (pocas disponibles) y rojo (estación vacía o llena).",
  turistas: "¡Sí! Hay una opción para usuarios temporales, ideal para turistas. Puedes adquirir pases de 24 horas, 3 días o 7 días usando tu tarjeta de crédito directamente en la aplicación o en cualquiera de nuestros quioscos.",
  registro: "Necesitas: 1) Correo electrónico, 2) Documento de identidad, 3) Aceptar los términos y condiciones. El registro toma menos de 2 minutos y puedes empezar a usar el servicio inmediatamente.",
  // Respuestas sobre incentivos
  puntos: "Los puntos se actualizan inmediatamente después de cada uso del servicio. Puedes verlos en tu perfil en tiempo real.",
  comercios: "Encuentra todos nuestros comercios aliados en la sección 'Incentivos' de la plataforma web, donde tenemos un mapa interactivo completo.",
  vencimiento: "Tus puntos tienen una vigencia de 3 meses. Te enviamos notificaciones cuando están próximos a vencer para que puedas aprovecharlos.",
  canje: "¡Claro que sí! Puedes canjear tus puntos tantas veces como quieras mientras tengas saldo suficiente para cada canje.",
  
  // Respuestas sobre CycleTech
  cycleTech: "CycleTech es nuestra plataforma web gratuita que te permite consultar, reservar y usar bicicletas inteligentes con gamificación, monitoreo IoT y tecnología solar.",
  appMobile: "No necesitas descargar ninguna app. Nuestra plataforma web es responsive y funciona perfectamente en cualquier dispositivo móvil.",
  soporte: "Si tienes algún problema, ve a la sección 'Ayuda' en la web donde encontrarás un chat en vivo y un formulario de soporte técnico disponible de 8:00 a 20:00.",
  
  // Respuestas sobre EnCicla
  encicla: "EnCicla es el sistema público de bicicletas del Valle de Aburrá que permite movilidad gratuita y sostenible en Medellín y municipios cercanos.",
  registroEncicla: "Para registrarte en EnCicla, visita encicla.metropol.gov.co y completa el formulario de inscripción con tu documento y foto tipo carné."
};

// Asegúrate de que esta función sea accesible globalmente
window.toggleChatbot = function() {
  const chatbotBox = document.getElementById('chatbotBox');
  chatbotBox.classList.toggle('active');
  if (chatbotBox.classList.contains('active')) {
    chatbotBox.style.display = 'flex';
    setTimeout(() => {
      chatbotBox.style.opacity = '1';
      chatbotBox.style.transform = 'translateY(0)';
    }, 10);
  } else {
    chatbotBox.style.opacity = '0';
    chatbotBox.style.transform = 'translateY(10px)';
    setTimeout(() => {
      chatbotBox.style.display = 'none';
    }, 300);
  }
};

function toggleMoreOptions() {
  console.log("toggleMoreOptions llamado"); // Log para depuración
  const hiddenOptions = document.querySelectorAll('.hidden-option');
  const optionsContainer = document.getElementById('optionsContainer');
  const showMoreBtn = document.getElementById('showMoreBtn');
  
  // Cambiar visibilidad de las opciones ocultas
  hiddenOptions.forEach(option => {
    option.classList.toggle('visible');
    console.log("Toggle class en opción:", option.textContent.trim()); // Log para depuración
  });
  
  // Expandir el contenedor si es necesario
  optionsContainer.classList.toggle('expanded');
  
  // Cambiar el texto del botón
  if (hiddenOptions[0].classList.contains('visible')) {
    showMoreBtn.textContent = 'Mostrar menos ▲';
  } else {
    showMoreBtn.textContent = 'Mostrar más ▼';
  }
}

function connectToAI() {
  addBotMessage("¡Hola! Soy CycleBot, el asistente de IA de CycleTech. Puedes preguntarme lo que quieras sobre nuestro servicio. ¿En qué puedo ayudarte hoy?");
  showCustomInput();
}

function showCustomInput() {
  document.getElementById('quickQuestions').style.display = 'none';
  document.getElementById('showMoreBtn').style.display = 'none';
  const inputContainer = document.createElement('div');
  inputContainer.className = 'chatbot-input-container visible';
  inputContainer.innerHTML = `
    <input type="text" class="chatbot-input" placeholder="Escribe tu pregunta..." id="userQuestion">
    <button class="btn-send" onclick="sendToAI()">
      <i class="fas fa-paper-plane"></i>
    </button>`;
  document.querySelector('.chatbot-body').insertBefore(inputContainer, document.querySelector('.chatbot-footer'));
}

function sendToAI() {
  const input = document.getElementById('userQuestion');
  if (input.value.trim() === '') return;
  
  const userQuestion = input.value.trim();
  addUserMessage(userQuestion);
  input.value = '';
  
  // Pequeña demora para simular "pensamiento" del chatbot
  setTimeout(() => {
    const response = generateAIResponse(userQuestion);
    addBotMessage(response);
  }, 1000);
}

// Función para mejorar la detección de preguntas relacionadas con el BANCO DE PREGUNTAS
function enhancedResponseDetection(question) {
  question = question.toLowerCase();
  
  // Detección de preguntas sobre incentivos
  if (question.includes('puntos') && (question.includes('actualiz') || question.includes('cuando'))) {
    return aiKnowledge.incentivos.actualizacion;
  }
  
  if (question.includes('comercios') || question.includes('aliados') || question.includes('tiendas')) {
    return aiKnowledge.incentivos.comercios;
  }
  
  if (question.includes('vencimiento') || question.includes('caducan') || question.includes('expiran')) {
    return aiKnowledge.incentivos.vencimiento;
  }
  
  if ((question.includes('canje') || question.includes('canjear') || question.includes('usar')) && 
      (question.includes('puntos') || question.includes('varias veces') || question.includes('más de una vez'))) {
    return aiKnowledge.incentivos.canje;
  }
  
  if ((question.includes('pierdo') || question.includes('perdida') || question.includes('perder')) && 
      question.includes('puntos')) {
    return aiKnowledge.incentivos.perdida;
  }
  
  if ((question.includes('no uso') || question.includes('no utilizo') || question.includes('sin usar')) && 
      question.includes('bicicleta') && (question.includes('reserv') || question.includes('apartad'))) {
    return aiKnowledge.incentivos.noUso;
  }
  
  // Detección de preguntas sobre CycleTech
  if (question.includes('qué es') && (question.includes('cycletech') || question.includes('cycle tech'))) {
    return aiKnowledge.cycleTech.descripcion;
  }
  
  if ((question.includes('diferencia') || question.includes('distinto')) && 
      (question.includes('cycletech') || question.includes('encicla'))) {
    return aiKnowledge.cycleTech.diferencia;
  }
  
  if ((question.includes('app') || question.includes('aplicación') || question.includes('descargar')) && 
      question.includes('cycletech')) {
    return aiKnowledge.cycleTech.app;
  }
  
  if (question.includes('gamificación') || question.includes('juego') || question.includes('premio')) {
    return aiKnowledge.cycleTech.gamificacion;
  }
  
  if ((question.includes('disponib') || question.includes('hay')) && question.includes('bicicletas')) {
    return aiKnowledge.cycleTech.disponibilidad;
  }
  
  if (question.includes('turista') || question.includes('visitante') || question.includes('extranjero')) {
    return aiKnowledge.cycleTech.turistas;
  }
  
  if (question.includes('datos') && (question.includes('registro') || question.includes('registrar'))) {
    return aiKnowledge.cycleTech.datos;
  }
  
  if ((question.includes('problema') || question.includes('error') || question.includes('falla')) && 
      (question.includes('sistema') || question.includes('bicicleta'))) {
    return aiKnowledge.cycleTech.problemas;
  }
  
  // Detección de preguntas sobre EnCicla
  if (question.includes('qué es') && question.includes('encicla')) {
    return aiKnowledge.encicla.descripcion;
  }
  
  if ((question.includes('registro') || question.includes('registrar')) && question.includes('encicla')) {
    return aiKnowledge.encicla.registro;
  }
  
  if ((question.includes('estación') || question.includes('estaciones') || question.includes('ubicación')) && 
      question.includes('encicla')) {
    return aiKnowledge.encicla.estaciones;
  }
  
  if ((question.includes('tiempo') || question.includes('duración') || question.includes('cuánto')) && 
      (question.includes('uso') || question.includes('usar')) && question.includes('encicla')) {
    return aiKnowledge.encicla.tiempo;
  }
  
  if ((question.includes('costo') || question.includes('precio') || question.includes('valor') || 
       question.includes('gratis')) && question.includes('encicla')) {
    return aiKnowledge.encicla.costo;
  }
  
  if ((question.includes('penalización') || question.includes('sanción') || question.includes('multa')) && 
      question.includes('encicla')) {
    return aiKnowledge.encicla.penalizacion;
  }
  
  // Si no hay coincidencia específica, devolvemos null para que el flujo continúe con la lógica existente
  return null;
}

function generateAIResponse(question) {
  // Primero intentamos con la detección mejorada
  const enhancedResponse = enhancedResponseDetection(question);
  if (enhancedResponse) {
    return enhancedResponse;
  }
  
  // Convertir pregunta a minúsculas para facilitar la comparación
  question = question.toLowerCase();
  
  // Verificar primero las respuestas pre-configuradas
  for (const [key, value] of Object.entries(chatbotResponses)) {
    if (question.includes(key)) {
      return value;
    }
  }
  
  // Buscar en la base de conocimiento ampliada
  let bestMatch = null;
  let highestScore = 0;
  
  for (const [key, value] of Object.entries(aiKnowledge)) {
    // Si es un objeto anidado, procesarlo por separado
    if (typeof value === 'object' && value !== null) {
      for (const [subKey, subValue] of Object.entries(value)) {
        // Calcular un puntaje simple para objetos anidados
        const combinedKey = key + " " + subKey;
        const keywords = combinedKey.split(' ');
        let score = 0;
        
        keywords.forEach(word => {
          if (question.includes(word.toLowerCase())) {
            score += 1;
          }
        });
        
        if (score > highestScore) {
          highestScore = score;
          bestMatch = subValue;
        }
      }
    } else {
      // Calcular un puntaje simple basado en cuántas palabras del key aparecen en la pregunta
      const keywords = key.split(' ');
      let score = 0;
      
      keywords.forEach(word => {
        if (question.includes(word.toLowerCase())) {
          score += 1;
        }
      });
      
      // Buscar palabras clave específicas en la pregunta
      const specificKeywords = {
        'precio': ['precio', 'costo', 'tarifa', 'cuánto cuesta', 'mensualidad', 'pago'],
        'horario': ['horario', 'horas', 'cuando abre', 'cierra', 'disponible'],
        'app': ['aplicación', 'app', 'móvil', 'celular', 'smartphone'],
        'robo': ['robo', 'robado', 'roban', 'seguridad', 'perdida'],
        'accidente': ['accidente', 'choque', 'golpe', 'caída', 'emergencia'],
        'rutas': ['ruta', 'camino', 'trayecto', 'recorrido', 'mapa'],
        'eventos': ['evento', 'actividad', 'tour', 'visita', 'recorrido guiado']
      };
      
      if (specificKeywords[key]) {
        specificKeywords[key].forEach(keyword => {
          if (question.includes(keyword)) {
            score += 2; // Dar más peso a keywords específicas
          }
        });
      }
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = value;
      }
    }
  }
  
  if (bestMatch && highestScore > 0) {
    return bestMatch;
  }
  
  // Respuestas para saludos comunes
  if (question.match(/hola|buenos días|buenas tardes|buenas noches|saludos/i)) {
    return "¡Hola! Soy CycleBot, el asistente virtual de CycleTech. ¿En qué puedo ayudarte hoy?";
  }
  
  // Respuestas para agradecimientos
  if (question.match(/gracias|te agradezco|muchas gracias|thank you/i)) {
    return "¡De nada! Estoy aquí para ayudarte con cualquier duda sobre CycleTech.";
  }
  
  // Respuestas para despedidas
  if (question.match(/adiós|hasta luego|chao|bye|nos vemos/i)) {
    return "¡Hasta pronto! Si tienes más preguntas, no dudes en volver a consultar.";
  }
  
  // Respuesta por defecto - ahora ofreciendo soporte al cliente
  offerCustomerSupport();
  return "Lo siento, no tengo información específica sobre eso. ¿Te gustaría hablar con nuestro equipo de soporte al cliente? Si es así, por favor déjame tu correo electrónico para que podamos contactarte.";
}

function addUserMessage(text) {
  const messagesContainer = document.getElementById('chatMessages');
  const message = document.createElement('div');
  message.className = 'chatbot-message user';
  message.innerHTML = `<p>${text}</p>`;
  messagesContainer.appendChild(message);
  scrollToBottom();
}

function addBotMessage(text) {
  const messagesContainer = document.getElementById('chatMessages');
  const message = document.createElement('div');
  message.className = 'chatbot-message bot';
  message.innerHTML = `<p>${text}</p>`;
  messagesContainer.appendChild(message);
  scrollToBottom();
}

function scrollToBottom() {
  const messagesContainer = document.getElementById('chatMessages');
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

document.addEventListener('DOMContentLoaded', function() {
  // Configurar el botón "Mostrar más"
  const showMoreBtn = document.getElementById('showMoreBtn');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', toggleMoreOptions);
  }
});

// Manejar clics en opciones del chatbot y otros elementos
document.addEventListener('click', function(e) {
  // Verificar si el clic fue en el botón Mostrar más
  if (e.target.id === 'showMoreBtn' || e.target.closest('#showMoreBtn')) {
    toggleMoreOptions();
  }
  // Verificar si se hizo clic en una opción del chatbot
  if (e.target.closest('.chatbot-option')) {
    const option = e.target.closest('.chatbot-option');
    const questionType = option.dataset.question;
    const response = chatbotResponses[questionType] || "No tengo una respuesta para eso aún.";
    addUserMessage(option.textContent.trim());
    setTimeout(() => {
      addBotMessage(response);
    }, 500);
  }
  
  // Cerrar al hacer clic fuera
  const chatbotContainer = document.getElementById('chatbotContainer');
  const chatbotBox = document.getElementById('chatbotBox');
  if (chatbotBox && chatbotBox.classList.contains('active') && 
      !chatbotContainer.contains(e.target)) {
    toggleChatbot();
  }
});

// Nueva función para ofrecer soporte al cliente
function offerCustomerSupport() {
  // Cambia el input normal por un input para correo electrónico
  const inputContainer = document.querySelector('.chatbot-input-container');
  if (inputContainer) {
    const userInput = document.getElementById('userQuestion');
    if (userInput) {
      userInput.placeholder = "Introduce tu correo electrónico...";
      userInput.type = "email";
      
      // Cambiamos la función del botón de enviar
      const sendButton = inputContainer.querySelector('.btn-send');
      if (sendButton) {
        sendButton.onclick = function() { sendEmailToSupport(); };
      }
    }
  }
}

// Nueva función para procesar el correo electrónico
function sendEmailToSupport() {
  const emailInput = document.getElementById('userQuestion');
  if (!emailInput || emailInput.value.trim() === '') return;
  
  const userEmail = emailInput.value.trim();
  
  // Validación simple de correo electrónico
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(userEmail)) {
    addBotMessage("Por favor, introduce un correo electrónico válido.");
    return;
  }
  
  addUserMessage(userEmail);
  emailInput.value = '';
  
  // Restaurar el input a su estado normal
  emailInput.placeholder = "Escribe tu pregunta...";
  emailInput.type = "text";
  
  // Restaurar la función original del botón
  const sendButton = document.querySelector('.btn-send');
  if (sendButton) {
    sendButton.onclick = function() { sendToAI(); };
  }
  
  // Mensaje de confirmación
  setTimeout(() => {
    addBotMessage("¡Gracias! Hemos registrado tu correo electrónico. Nuestro equipo de soporte se pondrá en contacto contigo lo antes posible. ¿Hay algo más en lo que pueda ayudarte mientras tanto?");
  }, 1000);
  
  // Aquí iría el código para enviar el correo a un sistema de tickets o CRM
  console.log("Correo para soporte:", userEmail);
}