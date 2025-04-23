document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el círculo de progreso
    const circulo = document.querySelector('.circulo-progreso');
    const puntos = parseInt(circulo.dataset.puntos);
    const maxPuntos = parseInt(circulo.dataset.max);
    const porcentaje = (puntos / maxPuntos) * 360;
    
    circulo.style.background = `conic-gradient(var(--verde-ct) ${porcentaje}deg, var(--gris-medio) ${porcentaje}deg)`;
    
    // Botones de canje
    const btnsCanjear = document.querySelectorAll('.btn-canjear');
    const puntosUsuario = 120; // Esto debería venir de tu sistema
    
    btnsCanjear.forEach(btn => {
      const puntosRecompensa = parseInt(btn.closest('.tarjeta-recompensa').dataset.puntos);
      
      if(puntosUsuario < puntosRecompensa) {
        btn.disabled = true;
        btn.textContent = 'Puntos insuficientes';
        btn.style.background = 'var(--gris-medio)';
        btn.style.cursor = 'not-allowed';
      }
      
      btn.addEventListener('click', function() {
        if(!this.disabled) {
          const recompensa = this.closest('.tarjeta-recompensa').querySelector('h3').textContent;
          if(confirm(`¿Confirmas canjear ${puntosRecompensa} puntos por "${recompensa}"?`)) {
            // Aquí iría la lógica para canjear los puntos
            alert(`¡Felicidades! Has canjeado tus puntos por: ${recompensa}`);
            // Actualizar puntos del usuario
          }
        }
      });
    });
    
    // Filtros del historial
    const filtroMes = document.getElementById('filtro-mes');
    const filtroTipo = document.getElementById('filtro-tipo');
    
    [filtroMes, filtroTipo].forEach(filtro => {
      filtro.addEventListener('change', function() {
        // Aquí iría la lógica para filtrar el historial
        console.log(`Filtrar por: ${filtroMes.value} y ${filtroTipo.value}`);
      });
    });
    
    // CTA principal
    const btnCanjearDestacado = document.querySelector('.btn-canjear-destacado');
    btnCanjearDestacado.addEventListener('click', function() {
      // Desplazarse a la sección de recompensas
      document.querySelector('.recompensas-disponibles').scrollIntoView({
        behavior: 'smooth'
      });
    });
  });