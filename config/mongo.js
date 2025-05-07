const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();

console.log("DB_URI:", process.env.DB_URI); // Solamente es para ver por consola,
// y así asegurarnos que la aplicación está leyendo correctamente el valor de .env

async function dbConnect() {
    const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/CycleTech";
    try {
        await mongoose.connect(DB_URI);
        console.log("Conexión exitosa a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}

module.exports = dbConnect;
