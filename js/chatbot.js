// Respuestas del chatbot
const chatbotResponses = {
  gamificacion: "La gamificación en CycleTech significa que incorporamos elementos de juego como puntos, niveles o premios por buen comportamiento: usar frecuentemente el sistema, devolver a tiempo, o estacionar en zonas estratégicas.",
  disponibilidad: "Puedes ver en tiempo real la disponibilidad de bicicletas y estaciones cercanas desde el portal web en la sección 'Estaciones'.",
  turistas: "¡Sí! Hay una opción para usuarios temporales mediante verificación rápida, ideal para turistas o asistentes a eventos.",
  registro: "Necesitas: 1) Correo electrónico, 2) Documento de identidad, 3) Aceptar los términos del servicio. También puedes iniciar sesión con cuentas como Google.",
  problemas: "Para problemas técnicos: 1) Reporta en la sección 'Ayuda' de la web, 2) Llama al 01 8000 123456, 3) Escribe a soporte@cycletech.com",
  costo: "El sistema es completamente gratuito para los usuarios registrados.",
  devolucion: "Si no devuelves la bicicleta a tiempo podrías recibir una sanción o suspensión temporal del servicio."
};

// Función para mostrar/ocultar el chatbot
function toggleChatbot() {
  const chatbotBox = document.getElementById('chatbotBox');
  chatbotBox.classList.toggle('active');
  
  // Mostrar/ocultar con animación
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
}

// Conectar con agente humano
function connectToHuman() {
  addBotMessage("Estoy conectándote con un agente humano. Por favor espera...");
  
  // Simular tiempo de espera
  setTimeout(() => {
    addBotMessage("Todos nuestros agentes están ocupados. Por favor intenta más tarde o escribe tu consulta y te responderemos por correo.");
    showCustomInput();
  }, 2000);
}

// Mostrar input para preguntas personalizadas
function showCustomInput() {
  document.getElementById('quickQuestions').style.display = 'none';
  
  const inputContainer = document.createElement('div');
  inputContainer.className = 'chatbot-input-container visible';
  inputContainer.innerHTML = `
    <input type="text" class="chatbot-input" placeholder="Escribe tu pregunta..." id="userQuestion">
    <button class="btn-send" onclick="sendCustomQuestion()">
      <i class="fas fa-paper-plane"></i>
    </button>
  `;
  
  document.querySelector('.chatbot-body').insertBefore(inputContainer, document.querySelector('.chatbot-footer'));
}

// Enviar pregunta personalizada
function sendCustomQuestion() {
  const input = document.getElementById('userQuestion');
  if (input.value.trim() === '') return;
  
  addUserMessage(input.value);
  input.value = '';
  
  // Respuesta automática
  setTimeout(() => {
    addBotMessage("Hemos registrado tu pregunta. Un agente te responderá a tu correo en las próximas 24 horas.");
  }, 1000);
}

// Añadir mensaje del usuario
function addUserMessage(text) {
  const messagesContainer = document.getElementById('chatMessages');
  const message = document.createElement('div');
  message.className = 'chatbot-message user';
  message.innerHTML = `<p>${text}</p>`;
  messagesContainer.appendChild(message);
  scrollToBottom();
}

// Añadir mensaje del bot
function addBotMessage(text) {
  const messagesContainer = document.getElementById('chatMessages');
  const message = document.createElement('div');
  message.className = 'chatbot-message bot';
  message.innerHTML = `<p>${text}</p>`;
  messagesContainer.appendChild(message);
  scrollToBottom();
}

// Scroll al final del chat
function scrollToBottom() {
  const messagesContainer = document.getElementById('chatMessages');
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Inicialización del chatbot
document.addEventListener('DOMContentLoaded', function() {
  // Configurar eventos de las opciones rápidas
  document.querySelectorAll('.chatbot-option').forEach(option => {
    option.addEventListener('click', function() {
      const questionType = this.dataset.question;
      const response = chatbotResponses[questionType];
      
      addUserMessage(this.textContent.trim());
      setTimeout(() => {
        addBotMessage(response);
      }, 500);
    });
  });
  
  // Cerrar al hacer clic fuera
  document.addEventListener('click', function(e) {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotBox = document.getElementById('chatbotBox');
    
    if (!chatbotContainer.contains(e.target) && chatbotBox.classList.contains('active')) {
      toggleChatbot();
    }
  });
});