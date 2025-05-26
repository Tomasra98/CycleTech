const express = require('express');
const dbConnect = require('../config/mongo.js'); // CORREGIDO: 'config' está fuera de 'js', por eso '../'
const mongoose = require('mongoose');
const usuariosRouter = require('./routes/usuarios.api.js'); // CORRECTO: 'routes' está dentro de 'js', por eso './'
const cors = require('cors');
const path = require('path');

const app = express();

dbConnect(); // Asegúrate de que config/mongo.js esté exportando la función correctamente

app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3000'],
    credentials: true
}));

app.use(express.json());

// --- SERVIR ARCHIVOS ESTÁTICOS ---
// __dirname en este contexto es 'C:\Users\...\CycleTech\js'.
// Queremos servir la carpeta 'CycleTech/' (la raíz del proyecto) como la raíz de nuestro servidor web.
// Para ir de 'CycleTech/js' a 'CycleTech/', usamos 'path.join(__dirname, '..')'.
app.use(express.static(path.join(__dirname, '..')));

// Las rutas para tus HTMLs están en 'vistas/' que está fuera de 'js/'.
// Si ya estás sirviendo la raíz del proyecto (CycleTech) con app.use(express.static(path.join(__dirname, '..'))),
// entonces puedes acceder a tus HTMLs como http://localhost:3000/vistas/login.html.
// Si quieres que http://localhost:3000/login.html funcione, necesitas una ruta específica:

// Ruta para la página principal
app.get('/', (req, res) => {
    // Esto apunta a CycleTech/vistas/index.html
    res.sendFile(path.join(__dirname, '..', 'vistas', 'index.html'));
});

// Ruta para servir otras páginas HTML directamente (e.g., /login.html, /perfil.html)
app.get('/:pageName.html', (req, res) => {
    const pageName = req.params.pageName;
    // Esto apunta a CycleTech/vistas/login.html, etc.
    res.sendFile(path.join(__dirname, '..', 'vistas', `${pageName}.html`));
});


// --- RUTAS DE API ---
// El router de usuarios ahora se monta en /api/usuarios
app.use('/api/usuarios', usuariosRouter);

// Ruta para probar la conexión a la base de datos (déjala como estaba)
app.get('/db-test', (req, res) => {
    const dbStatus = mongoose.connection.readyState;
    let statusMessage;
    switch (dbStatus) {
        case 0:
            statusMessage = 'Desconectado';
            break;
        case 1:
            statusMessage = 'Conectado';
            break;
        case 2:
            statusMessage = 'Conectando';
            break;
        case 3:
            statusMessage = 'Desconectando';
            break;
        default:
            statusMessage = 'Estado desconocido';
    }
    res.json({
        status: statusMessage,
        dbName: mongoose.connection.name,
        host: mongoose.connection.host,
        port: mongoose.connection.port
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`__dirname es: ${__dirname}`); // Para depuración
    console.log(`Ruta calculada para usuarios.api.js: ${path.join(__dirname, 'routes', 'usuarios.api.js')}`); // Para depuración
    console.log(`Ruta calculada para config/mongo.js: ${path.join(__dirname, '..', 'config', 'mongo.js')}`); // Para depuración
});