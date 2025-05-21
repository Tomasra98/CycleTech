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

    // --- LÓGICA DE INICIO DE SESIÓN CON LOCALSTORAGE Y FALLBACK DE PRUEBA ---

    const loginForm = document.querySelector('.login-form'); // Asegúrate que tu formulario tiene esta clase

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Previene la recarga de la página

            const documento = documentoInput.value; // Ya definida arriba si existe el input
            const contrasena = document.getElementById('contrasena').value;

            // 1. Intentar autenticar con usuarios almacenados en localStorage
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            let userFound = storedUsers.find(user =>
                user.documentNumber === documento && user.password === contrasena
            );

            // 2. Si no se encuentra en localStorage, verificar con las credenciales de prueba fijas
            const TEST_DOCUMENTO = "1234567890";
            const TEST_CONTRASENA = "password123"; 

            if (!userFound && documento === TEST_DOCUMENTO && contrasena === TEST_CONTRASENA) {
                // Si coincide con las credenciales de prueba, crea un objeto de usuario temporal para la sesión
                userFound = {
                    documentNumber: TEST_DOCUMENTO,
                    name: "Usuario de Prueba",
                    email: "test@example.com"
                    // Puedes añadir más datos aquí si los necesitas en la sesión
                };
            }

            // 3. Evaluar el resultado de la autenticación
            if (userFound) {
                // Si las credenciales son correctas (ya sea de localStorage o de las de prueba)
                const userData = {
                    name: userFound.name || "Usuario General", // Usa el nombre del usuario encontrado o un genérico
                    email: userFound.email || "no-email@example.com", // Igual para el email
                    documentNumber: userFound.documentNumber, // Asegúrate de guardar el documento
                    avatar: "../imagen/avatar.png", // Asumiendo que esta ruta siempre es correcta
                    points: userFound.points || 120, // Si el usuario de localStorage tiene puntos, úsalos. Sino, un valor por defecto.
                    trips: userFound.trips || 156,
                    co2Saved: userFound.co2Saved || 78.5,
                    isLoggedIn: true
                };
                localStorage.setItem('currentUser', JSON.stringify(userData));
                
                alert('¡Inicio de sesión exitoso!');
                window.location.href = 'index.html'; // Redirige al index.html o 'perfil.html'
            } else {
                alert('Documento o contraseña incorrectos. Por favor, inténtalo de nuevo.');
            }
        });
    }
});