const mongoose = require("mongoose");

// Definimos el esquema del usuario
const userSchema = new mongoose.Schema({
  documentNumber: { type: String, required: true, unique: true },
  documentType: { type: String, required: true },
  name: { type: String, required: true },
  firstLastName: { type: String, required: true },
  secondLastName: { type: String },
  address: { type: String, required: true },
  municipality: { type: String, required: true },
  occupation: { type: String, required: true },
  phone: { type: String, required: true },
  civicCardNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "/imagen/avatar.png" },
  documents: {
    idDocument: { type: String, required: true },
    civicCard: { type: String, required: true },
    publicServicesInvoice: { type: String, required: true }
  },
  points: { type: Number, default: 0 },
  trips: { type: Number, default: 0 },
  co2Saved: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Usuario = mongoose.model("Usuario", userSchema); 
// Automáticamente crea la colección "usuarios" en la base de datos
// (En este caso, el modelo se llama Usuario, MongoDB pluraliza automáticamente el nombre del modelo)
// También lo pone en minúsculas
// Por eso la colección se llama "usuarios" y no "Usuario"
// Podemos especificar manualmente el nombre de la colección al definir el modelo, así:

// const Usuario = mongoose.model('Usuario', userSchema, 'usuarios'); // 'usuarios' es el nombre exacto de la colección


// La pluralización automática de mongoose a veces funciona mal sea en español, en inglés, 
// u otro idioma, sobre todo en español, en todos los idiomas puede fallar
// especialmente si el nombre del modelo no es singular o si se usa un nombre poco común. 

// Casi siempre es mejor especificar el nombre de la colección.

module.exports = Usuario;
