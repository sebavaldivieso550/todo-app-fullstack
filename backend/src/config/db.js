const mysql = require('mysql2/promise'); // Import version de promesas
require('dotenv').config({ path: './.env' }); // Cargar variables de entorno

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testDbConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos MySQL exitosa!');
        connection.release(); // Liberar la conexion
    } catch (error) {
        console.error('Error al conectar a la base de datos MySQL:', error.message);
        process.exit(1); // Salir de la aplicacion si la conexion falla
    }
}

module.exports = {
    pool,
    testDbConnection
};