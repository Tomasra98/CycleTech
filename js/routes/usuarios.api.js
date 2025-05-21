const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // Importar fs.promises para operaciones asíncronas
const Usuario = require('../models/modelo-usuario.js'); // CAMBIO: 'models' está DENTRO de 'js', entonces './models/modelo-usuario.js'

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // __dirname es C:\Users\...\CycleTech\js\routes
        // Para llegar a CycleTech/uploads, necesitamos subir 3 niveles:
        // C:\Users\...\CycleTech\js\routes -> C:\Users\...\CycleTech\js -> C:\Users\...\CycleTech -> C:\Users\...\CycleTech\uploads
        // Una forma más segura: path.join(__dirname, '..', '..', '..', 'uploads')
        // PERO! Si 'uploads' está en la raíz de CycleTech, es: path.join(__dirname, '..', '..', 'uploads')
        // Basado en tu estructura que 'js' y 'vistas' están en CycleTech, 'uploads' probablemente está en CycleTech.
        // Entonces, desde 'js/routes', necesitas subir dos niveles para llegar a 'CycleTech'.
        // Si 'uploads' está en la raíz de 'CycleTech', la ruta es:
        cb(null, path.join(__dirname, '..', '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/registro', upload.fields([
    { name: 'idDocument', maxCount: 1 },
    { name: 'civicCard', maxCount: 1 },
    { name: 'publicServicesInvoice', maxCount: 1 }
]), async (req, res) => {
    const requestId = Date.now(); // Identificador único para esta petición
    console.log(`[${requestId}] Petición de registro recibida a las: ${new Date().toISOString()}`);
    console.log(`[${requestId}] Body:`, req.body);
    console.log(`[${requestId}] Files:`, req.files);

    const uploadedFiles = []; // Para rastrear archivos subidos en esta petición
    if (req.files) {
        if (req.files['idDocument']) uploadedFiles.push(req.files['idDocument'][0].path);
        if (req.files['civicCard']) uploadedFiles.push(req.files['civicCard'][0].path);
        if (req.files['publicServicesInvoice']) uploadedFiles.push(req.files['publicServicesInvoice'][0].path);
    }

    try {
        const {
            documentNumber,
            documentType,
            name,
            firstLastName,
            secondLastName,
            address,
            municipality,
            occupation,
            phone,
            civicCardNumber,
            email,
            password
        } = req.body;

        console.log(`[${requestId}] documentNumber recibido:`, req.body.documentNumber);

        const idDocument = req.files['idDocument'] ? req.files['idDocument'][0].filename : '';
        const civicCard = req.files['civicCard'] ? req.files['civicCard'][0].filename : '';
        const publicServicesInvoice = req.files['publicServicesInvoice'] ? req.files['publicServicesInvoice'][0].filename : '';

        const newUser = new Usuario({
            documentNumber,
            documentType,
            name,
            firstLastName,
            secondLastName,
            address,
            municipality,
            occupation,
            phone,
            civicCardNumber,
            email,
            password,
            profilePicture: '',
            documents: {
                idDocument,
                civicCard,
                publicServicesInvoice
            }
        });

        console.log(`[${requestId}] Intentando guardar usuario a las: ${new Date().toISOString()}`);
        await newUser.save();
        console.log(`[${requestId}] Usuario guardado exitosamente a las: ${new Date().toISOString()}`);
        res.status(201).json({ message: 'Usuario registrado correctamente' });

    } catch (error) {
        console.error(`[${requestId}] Error al registrar usuario a las: ${new Date().toISOString()}:`, error);

        // Intentar eliminar archivos subidos si hubo error
        console.log(`[${requestId}] Error detectado. Intentando eliminar archivos:`, uploadedFiles);
        for (const filePath of uploadedFiles) {
            try {
                await fs.unlink(filePath);
                console.log(`[${requestId}] Archivo eliminado: ${filePath}`);
            } catch (unlinkError) {
                console.error(`[${requestId}] Error al eliminar archivo ${filePath}:`, unlinkError);
            }
        }

        if (error.code === 11000 && error.keyPattern && error.keyPattern.documentNumber) {
            res.status(409).json({ error: 'Ya existe un usuario con ese número de documento.' });
        } else if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            res.status(409).json({ error: 'Ya existe un usuario con ese correo electrónico.' });
        } else {
            res.status(500).json({ error: 'Error interno al registrar usuario', details: error.message });
        }
    }
});

// Ruta para el inicio de sesión (Login) - MODIFICADA PARA USAR 'documentNumber' Y RESPONDER JSON
router.post('/login', async (req, res) => {
    try {
        const { documentNumber, password } = req.body; // Esperamos 'documentNumber' del frontend

        // 1. Busca el usuario por documentNumber
        const user = await Usuario.findOne({ documentNumber });

        // 2. Si el usuario no existe
        if (!user) {
            // Enviamos JSON para que el frontend (login.js) pueda manejar la respuesta
            return res.status(401).json({ message: 'Credenciales inválidas: Documento no encontrado' });
        }

        // 3. Compara la contraseña
        // ¡IMPORTANTE! Recuerda cambiar esto para usar bcrypt para comparar contraseñas hasheadas en un entorno real.
        if (user.password !== password) {
            // Enviamos JSON
            return res.status(401).json({ message: 'Credenciales inválidas: Contraseña incorrecta' });
        }

        // 4. Si las credenciales son correctas
        // Enviamos JSON con mensaje de éxito y datos del usuario (sin contraseña)
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: {
                id: user._id,
                name: user.name,
                documentNumber: user.documentNumber,
                email: user.email, // Incluimos el email por si lo necesitas en el frontend
                // Añade otros campos del usuario que quieras que el frontend reciba (ej. profilePicture, points, etc.)
            }
        });

    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        // Enviamos JSON en caso de error interno del servidor
        res.status(500).json({ message: 'Error interno del servidor al intentar iniciar sesión' });
    }
});

module.exports = router;