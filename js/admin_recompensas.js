// Redirigir si no hay sesión activa de admin
if (!localStorage.getItem('adminLoggedIn')) {
  window.location.href = 'admin_login.html';
}

let recompensas = JSON.parse(localStorage.getItem('recompensas')) || [];

document.addEventListener('DOMContentLoaded', () => {
  // Cargar recompensas al iniciar
  loadRecompensas();

  // Botón cerrar sesión
  document.getElementById('logout-admin').addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin_login.html';
  });

  // Botón añadir nueva recompensa
  document.getElementById('add-recompensa').addEventListener('click', () => {
    recompensas.push({
      nombre: "Nueva Recompensa",
      puntos: 50,
      imagen: "",
      editing: true,
      isNew: true
    });
    loadRecompensas();
  });

  // Delegación de eventos para editar, guardar, cancelar, eliminar
  document.getElementById('recompensas-container').addEventListener('click', (e) => {
    const card = e.target.closest('.recompensa-card');
    if (!card) return;

    const index = parseInt(card.dataset.index);

    if (e.target.closest('.btn-edit')) {
      recompensas[index].editing = true;
      loadRecompensas();
    }

    if (e.target.closest('.btn-save')) {
      const cardElem = document.querySelector(`.recompensa-card[data-index="${index}"]`);
      recompensas[index] = {
        nombre: cardElem.querySelector('.edit-nombre').value,
        puntos: parseInt(cardElem.querySelector('.edit-puntos').value),
        imagen: cardElem.querySelector('.edit-imagen').value,
        editing: false,
        isNew: false
      };
      localStorage.setItem('recompensas', JSON.stringify(recompensas));
      loadRecompensas();
    }

    if (e.target.closest('.btn-cancel')) {
      if (recompensas[index].isNew) {
        recompensas.splice(index, 1);
      } else {
        recompensas[index].editing = false;
      }
      localStorage.setItem('recompensas', JSON.stringify(recompensas));
      loadRecompensas();
    }

    if (e.target.closest('.btn-delete')) {
      if (confirm('¿Estás seguro de eliminar esta recompensa?')) {
        recompensas.splice(index, 1);
        localStorage.setItem('recompensas', JSON.stringify(recompensas));
        loadRecompensas();
      }
    }
  });
});

function loadRecompensas() {
  const container = document.getElementById('recompensas-container');
  container.innerHTML = '';

  // Eliminar recompensas que fueron canceladas sin guardar
  recompensas = recompensas.filter(r => !(r.isNew && !r.editing));
  localStorage.setItem('recompensas', JSON.stringify(recompensas));

  recompensas.forEach((recompensa, index) => {
    const card = document.createElement('div');
    card.className = 'recompensa-card';
    card.dataset.index = index;

    if (recompensa.editing) {
      card.innerHTML = `
        <div class="recompensa-img" style="background-image: url('${recompensa.imagen}')"></div>
        <div class="recompensa-info">
          <input type="text" value="${recompensa.nombre}" class="edit-nombre" placeholder="Nombre">
          <input type="number" value="${recompensa.puntos}" class="edit-puntos" placeholder="Puntos" min="1">
          <input type="text" value="${recompensa.imagen}" class="edit-imagen" placeholder="URL de imagen">
        </div>
        <div class="recompensa-actions">
          <button class="btn-save"><i class="fas fa-save"></i> Guardar</button>
          <button class="btn-cancel"><i class="fas fa-times"></i> Cancelar</button>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="recompensa-img" style="background-image: url('${recompensa.imagen}')"></div>
        <div class="recompensa-info">
          <h3>${recompensa.nombre}</h3>
          <p class="puntos-recompensa">${recompensa.puntos} pts</p>
        </div>
        <div class="recompensa-actions">
          <button class="btn-edit"><i class="fas fa-edit"></i> Editar</button>
          <button class="btn-delete"><i class="fas fa-trash"></i> Eliminar</button>
        </div>
      `;
    }

    container.appendChild(card);
  });
}
