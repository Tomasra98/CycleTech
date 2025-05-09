document.addEventListener('DOMContentLoaded', function() {
  // Actualizar el círculo de progreso
  const circulo = document.querySelector('.circulo-progreso');
  const puntos = parseInt(circulo.dataset.puntos);
  const maxPuntos = parseInt(circulo.dataset.max);
  const porcentaje = (puntos / maxPuntos) * 360;
  
  circulo.style.background = `conic-gradient(var(--verde-ct) ${porcentaje}deg, var(--gris-medio) ${porcentaje}deg)`;
  
  // Cargar recompensas desde localStorage
  const loadRecompensas = () => {
    const recompensas = JSON.parse(localStorage.getItem('recompensas')) || [];
    const recompensasContainer = document.querySelector('.grid-recompensas');
    
    if (recompensasContainer) {
      recompensasContainer.innerHTML = '';
      
      recompensas.forEach(recompensa => {
        const card = document.createElement('div');
        card.className = 'tarjeta-recompensa';
        card.dataset.puntos = recompensa.puntos;
        card.innerHTML = `
          <div class="recompensa-img" style="background-image: url('${recompensa.imagen}')"></div>
          <h3>${recompensa.nombre}</h3>
          <p class="puntos-recompensa">${recompensa.puntos} pts</p>
          <button class="btn-canjear">Canjear</button>
        `;
        recompensasContainer.appendChild(card);
      });
      
      // Actualizar botones de canje
      updateCanjeButtons();
    }
  };
  
  // Actualizar estado de botones de canje
  const updateCanjeButtons = () => {
    const btnsCanjear = document.querySelectorAll('.btn-canjear');
    const puntosUsuario = parseInt(document.querySelector('.circulo-progreso').dataset.puntos);
    
    btnsCanjear.forEach(btn => {
      const puntosRecompensa = parseInt(btn.closest('.tarjeta-recompensa').dataset.puntos);
      
      if(puntosUsuario < puntosRecompensa) {
        btn.disabled = true;
        btn.textContent = 'Puntos insuficientes';
        btn.style.background = 'var(--gris-medio)';
        btn.style.cursor = 'not-allowed';
      } else {
        btn.disabled = false;
        btn.textContent = 'Canjear';
        btn.style.background = '';
        btn.style.cursor = '';
      }
      
      btn.addEventListener('click', function() {
        if(!this.disabled) {
          const recompensa = this.closest('.tarjeta-recompensa').querySelector('h3').textContent;
          if(confirm(`¿Confirmas canjear ${puntosRecompensa} puntos por "${recompensa}"?`)) {
            // Actualizar puntos del usuario
            const nuevosPuntos = puntosUsuario - puntosRecompensa;
            document.querySelector('.circulo-progreso').dataset.puntos = nuevosPuntos;
            document.querySelector('.puntos-total').textContent = `${nuevosPuntos} pts`;
            
            // Actualizar progreso
            const maxPuntos = parseInt(document.querySelector('.circulo-progreso').dataset.max);
            const porcentaje = (nuevosPuntos / maxPuntos) * 360;
            document.querySelector('.circulo-progreso').style.background = 
              `conic-gradient(var(--verde-ct) ${porcentaje}deg, var(--gris-medio) ${porcentaje}deg)`;
            
            alert(`¡Felicidades! Has canjeado tus puntos por: ${recompensa}`);
            updateCanjeButtons();
            
            // Aquí podrías guardar los puntos actualizados en localStorage o enviarlos al servidor
          }
        }
      });
    });
  };
  
  // Cargar recompensas al iniciar
  loadRecompensas();
  
  // Resto del código existente...
  // Filtros del historial
  const filtroMes = document.getElementById('filtro-mes');
  const filtroTipo = document.getElementById('filtro-tipo');
  
  [filtroMes, filtroTipo].forEach(filtro => {
    filtro.addEventListener('change', function() {
      console.log(`Filtrar por: ${filtroMes.value} y ${filtroTipo.value}`);
    });
  });
  
  // CTA principal
  const btnCanjearDestacado = document.querySelector('.btn-canjear-destacado');
  btnCanjearDestacado.addEventListener('click', function() {
    document.querySelector('.recompensas-disponibles').scrollIntoView({
      behavior: 'smooth'
    });
  });
});