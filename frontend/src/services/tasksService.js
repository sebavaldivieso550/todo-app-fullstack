const API_URL= 'http://localhost:5000/api/tasks'; // Coincide con el puerto del backend

// Ver todas las tareas
const getAllTasks = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

// Crear nueva tarea
const createTask = async (task) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

// Actualizar una tarea
const updateTask = async (id, updates) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    // PUT puede devolver 204 no content, en ese caso no deberiamos intentar parsear JSON
    if (response.status === 204) return null;
    return await response.json();
};

// Borrar una tarea
const deleteTask = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    // DELETE suele devolver 204 No Content
    if (response.status === 204) return null;
    return await response.json();
};

export {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};