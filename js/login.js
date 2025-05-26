// CycleTech/js/logins.js

document.addEventListener('DOMContentLoaded', function() {
    // Mostrar/ocultar contraseña
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentNode.querySelector('input');
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Validación de documento (solo números)
    const documentoInput = document.getElementById('documento');
    if (documentoInput) {
        documentoInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // Carga del chatbot (si existe el contenedor)
    const chatbotContainer = document.getElementById('chatbot-container');
    if (chatbotContainer) {
        fetch("../chatbot/chatbot.html")
            .then(response => response.text())
            .then(data => {
                chatbotContainer.innerHTML = data;
                // Carga el JS del chatbot
                const script = document.createElement('script');
                script.src = "../chatbot/chatbot.js";
                document.body.appendChild(script);
            });
    }

    // --- LÓGICA DE INICIO DE SESIÓN CON USUARIOS DE PRUEBA Y LOCALSTORAGE ---

    const loginForm = document.querySelector('.login-form'); // Asegúrate que tu formulario tiene esta clase

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Previene la recarga de la página

            const documento = documentoInput.value;
            const contrasena = document.getElementById('contrasena').value;

            // Define una lista de usuarios de prueba (incluyendo los nuevos)
            // Estos son los usuarios con los que el login validará
            const FIXED_TEST_USERS = [
                {
                    documentNumber: "1234567890",
                    password: "password123",
                    name: "Usuario Principal",
                    email: "principal@example.com",
                    points: 120,
                    trips: 156,
                    co2Saved: 78.5,
                    avatar: "../imagen/avatar.png"
                },
                {
                    documentNumber: "2222222222",
                    password: "user2pass",
                    name: "Maria Lopez",
                    email: "maria.lopez@example.com",
                    points: 250,
                    trips: 30,
                    co2Saved: 120.3,
                    avatar: "../imagen/avatar2.png" // Asegúrate de tener esta imagen o ajusta la ruta
                },
                {
                    documentNumber: "3333333333",
                    password: "terceruser",
                    name: "Carlos Gomez",
                    email: "carlos.gomez@example.com",
                    points: 50,
                    trips: 5,
                    co2Saved: 15.0,
                    avatar: "../imagen/avatar3.png" // Asegúrate de tener esta imagen o ajusta la ruta
                }
                // Puedes agregar más usuarios aquí siguiendo el mismo formato
            ];

            // Busca si las credenciales coinciden con algún usuario de la lista de prueba
            const authenticatedUser = FIXED_TEST_USERS.find(user =>
                user.documentNumber === documento && user.password === contrasena
            );

            // 3. Evaluar el resultado de la autenticación
            if (authenticatedUser) {
                // Si las credenciales son correctas, establece la sesión en localStorage
                // Usa los datos del usuario autenticado directamente
                const userData = {
                    name: authenticatedUser.name,
                    email: authenticatedUser.email,
                    documentNumber: authenticatedUser.documentNumber,
                    avatar: authenticatedUser.avatar,
                    points: authenticatedUser.points,
                    trips: authenticatedUser.trips,
                    co2Saved: authenticatedUser.co2Saved,
                    isLoggedIn: true
                };
                localStorage.setItem('currentUser', JSON.stringify(userData));

                alert('¡Inicio de sesión exitoso!');
                window.location.href = '/vistas/index.html'; // Redirige a la página principal del servidor
            } else {
                alert('Documento o contraseña incorrectos. Por favor, inténtalo de nuevo.');
            }
        });
    }
});