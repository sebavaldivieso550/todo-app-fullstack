import React, { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';
import { getAllTasks, createTask, updateTask, deleteTask } from './services/tasksService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para cargar las tareas al inicio
  useEffect(() => {
    fetchTasks();
  }, []); // El array vacio asegura que se ejecuta solo una vez al montar

  // Funcion para obtener todas las tareas del backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getAllTasks();
      setTasks(data);
      setError(null); // Limpiar cualquier error previo
    } catch (err) {
      console.error('Error al cargar las tares:', err);
      setError('Error al cargar las tareas. Por favor, intentelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Funcion para añadir una nueva tarea
  const handleAddTask = async (newTask) => {
    try {
      const addedTask = await createTask(newTask);
      // Añadir la nueva tarea al principio de la lista para que sea visible de inmediato
      setTasks(prevTasks => [addedTask, ...prevTasks]);
    } catch (err) {
        console.error('Error al añadir tarea:', err);
        alert('Error al añadir tarea: ' + err.message); // Muestra un mensaje de error al usuario
    }
  };

  // Funcion para marcar/desmarcar una tarea como completada
  const handleToggleComplete = async (id, completed) => {
    try {
      await updateTask(id, { completed }); // Solo envia el campo 'completed'
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, completed: completed } : task // Actualiza el estado local
        )
      );
    } catch (err) {
      console.error('Error al actualizar tarea:', err);
      alert('Error al actualizar tarea: ' + err.message);
    }
  };

  // Funcion para eliminar una tarea
  const handleDeleteTask = async (id) => {
    // Confirmacion antes de eliminar
    if (window.confirm('¿Estas seguro de que quieres eliminar esta tarea?')) {
      try {
        await deleteTask(id);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id)); // Filtra la tarea eliminada del estado local
      } catch (err) {
        console.error('Error al eliminar tarea:', err);
        alert('Error al eliminar tarea: ' + err.message);
      }
    }
  };

  // Renderizado condicional basado en el estado de carga y error
  if (loading) {
    return (
      <div className="App">
        <h1>Cargando tareas...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <h1>Error</h1>
        <p>{error}</p>
        <button onClick={fetchTasks}>Reintentar</button> {/* Boton para reintentar cargar */}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Lista de Tareas</h1>
      <TaskForm onAddTask={handleAddTask} /> {/* Componente para añadir nuevas tareas */}
      {tasks.length === 0 ? (
        <p>No hay tareas. Añade una.</p> /* Mensaje si no hay tareas */
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <TaskItem // Componente para cada tarea individual
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;