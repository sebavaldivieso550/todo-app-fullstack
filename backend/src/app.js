const express = require('express');
const cors = require('cors'); // Import cors
const taskRoutes = require('./routes/tasksRoutes');

const app = express();

// Middleware
app.use(cors()); // CORS para todas las rutas (para la comunicacion frontend-backend)
app.use(express.json()); // Parsing de JSON en el cuerpo de las solicitudes

// Rutas de la API
app.use('/api/tasks', taskRoutes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal en el servidor!', error: err.message });
});

module.exports = app;