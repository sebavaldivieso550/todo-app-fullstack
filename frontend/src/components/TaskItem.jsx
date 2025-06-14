import React from "react";

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-item-content">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
            </div>
            <div className="task-actions">
                <button
                    className={`toggle-button ${task.completed ? 'completed' : ''}`}
                    onClick={() => onToggleComplete(task.id, !task.completed)}
                >
                    {task.completed ? 'Deshacer' : 'Completar'}
                </button>
                <button className="delete-button" onClick={() => onDelete(task.id)}>
                    Eliminar
                </button>
            </div>
        </li>
    );
};

export default TaskItem;