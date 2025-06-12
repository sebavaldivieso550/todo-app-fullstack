const { pool } = require('../config/db');

// Obtener todas las tareas
const getAllTasks = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        res.json(rows);

    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener tareas' });
    } 
};

// Crear una nueva tarea
const createTask = async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'El título es obligatorio' });
    }

    try {
        const [result] = await pool.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description]);
        res.status(201).json({ id: result.insertId, title, description, completed: false });
        
    } catch (error) {
        console.error('Error al crear tarea:', error);
        res.status(500).json({ message: 'Error interno del servidor al crear tarea' });
    }
};

// Actualizar una tarea
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (!title && description === undefined && completed === undefined) {
        return res.status(400).json({ message: 'Se requiere al menos un campo (title, description, o completed) para actualizar' });
    }

    try {
        // Consulta dinamica para actualizar solo los campos proporcionados
        const updates = [];
        const values = [];

        if (title !== undefined) {
            updates.push('title = ?');
            values.push(title);
        }
        if (description !== undefined) {
            updates.push('description = ?');
            values.push(description);
        }
        if (completed !== undefined) {
            updates.push('completed = ?');
            values.push(completed);
        }

        if (updates.length === 0) {
            return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
        }

        values.push(id); // Añadir el ID al final para la clausula WHERE

        const [result] = await pool.query(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json({ message: 'Tarea actualizada exitosamente' });

    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        res.status(500).json({ message: 'Error interno del servidor al actualizar tarea' });
    }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(204).send(); // 204 no content, eliminacion exitosa
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar tarea' });
    }
};


module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};