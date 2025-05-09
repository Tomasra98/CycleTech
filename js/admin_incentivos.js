// Verificar si el admin está logueado
if (!localStorage.getItem('adminLoggedIn')) {
  window.location.href = 'admin_login.html';
}

document.getElementById('logout-admin').addEventListener('click', function() {
  localStorage.removeItem('adminLoggedIn');
  window.location.href = 'admin_login.html';
});

// Cargar datos de incentivos (puedes usar una API o localStorage)
const loadIncentivos = () => {
  const incentivos = JSON.parse(localStorage.getItem('incentivos')) || [
    { accion: "Reservar y reclamar a tiempo", puntos: "+10" },
    { accion: "Devolución tardía", puntos: "-10" }
  ];

  const tableBody = document.querySelector('#puntos-table tbody');
  tableBody.innerHTML = '';

  incentivos.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="text" value="${item.accion}" data-index="${index}" data-field="accion"></td>
      <td><input type="text" value="${item.puntos}" data-index="${index}" data-field="puntos"></td>
      <td><button class="delete-row" data-index="${index}">Eliminar</button></td>
    `;
    tableBody.appendChild(row);
  });
};

// Agregar nueva fila
document.getElementById('add-row').addEventListener('click', function() {
  const tableBody = document.querySelector('#puntos-table tbody');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td><input type="text" placeholder="Nueva acción"></td>
    <td><input type="text" placeholder="Puntos"></td>
    <td><button class="delete-row">Eliminar</button></td>
  `;
  tableBody.appendChild(newRow);
});

// Guardar cambios
document.getElementById('save-changes').addEventListener('click', function() {
  const rows = document.querySelectorAll('#puntos-table tbody tr');
  const incentivos = [];

  rows.forEach(row => {
    const inputs = row.querySelectorAll('input');
    if (inputs[0].value && inputs[1].value) {
      incentivos.push({
        accion: inputs[0].value,
        puntos: inputs[1].value
      });
    }
  });

  localStorage.setItem('incentivos', JSON.stringify(incentivos));
  alert('Cambios guardados correctamente');
});

// Eliminar fila
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-row')) {
    e.target.closest('tr').remove();
  }
});

// Cargar datos al iniciar
loadIncentivos();