const express = require('express');
const dbConnect = require('../config/mongo.js');
const mongoose = require('mongoose');
const usuariosRouter = require('./routes/usuarios.api.js');
const cors = require('cors');

const app = express();

dbConnect();

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'], // Cambiamos esto si el frontend está en otro puerto
  credentials: true
}));

app.use(express.json());
app.use('/api/usuarios', usuariosRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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
});