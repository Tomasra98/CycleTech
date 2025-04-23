document.addEventListener('DOMContentLoaded', function() {
    // Filtrado por tipo de incumplimiento
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tableRows = document.querySelectorAll('.incumplimientos-table tbody tr');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remover active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Agregar active al botón clickeado
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        // Filtrar filas de la tabla
        tableRows.forEach(row => {
          if (filter === 'all') {
            row.style.display = '';
          } else {
            if (row.dataset.graduacion === filter) {
              row.style.display = '';
            } else {
              row.style.display = 'none';
            }
          }
        });
      });
    });
    
    // Búsqueda de incumplimientos
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    function performSearch() {
      const searchTerm = searchInput.value.toLowerCase();
      
      tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  });