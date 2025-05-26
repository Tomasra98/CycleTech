document.addEventListener('DOMContentLoaded', function() {
  // Acordeón de preguntas
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const icon = item.querySelector('.faq-icon');
      
      question.addEventListener('click', function() {
          // Cierra todos los demás items
          faqItems.forEach(otherItem => {
              if (otherItem !== item) {
                  otherItem.classList.remove('active');
                  otherItem.querySelector('.faq-answer').style.maxHeight = null;
                  otherItem.querySelector('.faq-icon').classList.replace('fa-chevron-up', 'fa-chevron-down');
              }
          });
          
          // Alterna el item actual
          const isActive = item.classList.toggle('active');
          
          if (isActive) {
              answer.style.maxHeight = answer.scrollHeight + 'px';
              icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
          } else {
              answer.style.maxHeight = null;
              icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
          }
      });
  });
  
  // Filtrado por categorías
  const categoryBtns = document.querySelectorAll('.category-btn');
  
  categoryBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          // Remover active de todos los botones
          categoryBtns.forEach(b => b.classList.remove('active'));
          
          // Agregar active al botón clickeado
          this.classList.add('active');
          
          const category = this.dataset.category;
          const faqItems = document.querySelectorAll('.faq-item');
          
          if (category === 'all') {
              faqItems.forEach(item => {
                  item.style.display = 'block';
              });
          } else {
              faqItems.forEach(item => {
                  if (item.dataset.category === category) {
                      item.style.display = 'block';
                  } else {
                      item.style.display = 'none';
                  }
              });
          }
      });
  });
  
  // Búsqueda en FAQs
  const searchInput = document.querySelector('.faq-search-box input');
  const searchBtn = document.querySelector('.faq-search-btn');
  
  function performSearch() {
      const searchTerm = searchInput.value.toLowerCase().trim();
      const faqItems = document.querySelectorAll('.faq-item');
      
      if (searchTerm === '') {
          // Si la búsqueda está vacía, mostrar todas
          faqItems.forEach(item => {
              item.style.display = 'block';
          });
          return;
      }
      
      faqItems.forEach(item => {
          const question = item.querySelector('.faq-question-text').textContent.toLowerCase();
          const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
          
          if (question.includes(searchTerm) || answer.includes(searchTerm)) {
              item.style.display = 'block';
              // Abrir el item si coincide con la búsqueda
              item.classList.add('active');
              item.querySelector('.faq-answer').style.maxHeight = item.querySelector('.faq-answer').scrollHeight + 'px';
              item.querySelector('.faq-icon').classList.replace('fa-chevron-down', 'fa-chevron-up');
          } else {
              item.style.display = 'none';
          }
      });
  }
  
  // Event listeners para búsqueda
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          performSearch();
      }
  });
  
  // Botones de contacto
  const chatBtn = document.querySelector('.contact-btn:nth-of-type(1)');
  const emailBtn = document.querySelector('.contact-btn:nth-of-type(2)');
  
  if (chatBtn) {
      chatBtn.addEventListener('click', function() {
          alert('El chat de soporte se abrirá en una nueva ventana.');
      });
  }
  
  if (emailBtn) {
      emailBtn.addEventListener('click', function() {
          window.location.href = 'mailto:soporte@cycletech.com?subject=Consulta%20CycleTech';
      });
  }
});