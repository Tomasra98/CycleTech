document.addEventListener('DOMContentLoaded', function() {
    // Animación para los elementos de la línea de tiempo
    const levels = document.querySelectorAll('.level');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateX(0)';
        }
      });
    }, { threshold: 0.1 });
  
    levels.forEach((level, index) => {
      level.style.opacity = 0;
      level.style.transform = 'translateX(-20px)';
      level.style.transition = `all 0.5s ease ${index * 0.2}s`;
      observer.observe(level);
    });
  
    // Efecto hover para las tarjetas de beneficio
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.benefit-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      });
      
      card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.benefit-icon');
        icon.style.transform = 'scale(1) rotate(0)';
      });
    });

    document.addEventListener('DOMContentLoaded', function() {
      const incentivos = JSON.parse(localStorage.getItem('incentivos')) || [
        { accion: "Reservar y reclamar a tiempo", puntos: "+10" },
        { accion: "Devolución tardía", puntos: "-10" }
      ];
    
    });    
    console.log('Vista informativa de incentivos cargada');
  });