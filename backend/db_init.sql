USE todo_db; -- Mismo nombre que en docker-compose.yml

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Algunas tareas de ejemplo (opcional)
INSERT INTO tasks (title, description, completed) VALUES
('Aprender Docker', 'Entender docker-compose y Dockerfiles', TRUE),
('Crear API RESTful', 'Implementar rutas para CRUD de tareas', FALSE),
('Desarrollar Frontend React', 'Crear componentes para la UI', FALSE);

-- El usuario 'user' usa el plugin de autenticacion antiguo
ALTER USER 'user'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;