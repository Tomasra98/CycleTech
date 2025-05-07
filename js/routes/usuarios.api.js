const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // Importar fs.promises para operaciones asíncronas
const Usuario = require('../models/modelo-usuario.js');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
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

module.exports = router;
