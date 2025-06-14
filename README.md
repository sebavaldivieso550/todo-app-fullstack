# Aplicación Full-Stack de Gestión de Tareas (To-Do App)

Este proyecto es una aplicación completa (Full-Stack) para la gestión de tareas, construida con React (Vite) en el frontend, Node.js (Express) en el backend, y MySQL como base de datos, todo orquestado con Docker Compose para el entorno de desarrollo. La aplicación permite a los usuarios crear, leer, actualizar (marcar como completadas) y eliminar tareas.

## Características Principales

* **Gestión de Tareas (CRUD):** Permite añadir nuevas tareas, ver todas las tareas existentes, marcar tareas como completadas/incompletas y eliminar tareas.
* **Frontend React (Vite):** Interfaz de usuario moderna y reactiva construida con React y optimizada con Vite para un desarrollo rápido.
* **Backend Node.js (Express):** Una API RESTful robusta que maneja las operaciones de la base de datos y sirve los datos al frontend.
* **Base de Datos MySQL:** Almacenamiento persistente de las tareas.
* **Docker Compose:** Entorno de desarrollo contenedorizado para MySQL, garantizando una configuración consistente.
* **CORS Management:** Configuración para permitir la comunicación segura entre el frontend y el backend desplegados en diferentes dominios/puertos.
* **Variables de Entorno:** Gestión segura de configuraciones sensibles y específicas del entorno.

## Tecnologías Utilizadas

* **Frontend:**
    * React (con Vite)
    * HTML5
    * CSS3
    * JavaScript (ES6+)
* **Backend:**
    * Node.js
    * Express.js
    * `mysql2` (driver para MySQL)
    * `dotenv`
    * `cors`
* **Base de Datos:**
    * MySQL
* **Contenedorización:**
    * Docker
    * Docker Compose

## Estructura del Proyecto
``````
todo-app-fullstack/
    backend/
        src/
            config/  #Configuracion de la base de datos
            controllers/  #Logica de negocio para las tareas
            models/  #Modelos de datos y consultas a la DB
            routes/  #Definicion de las rutas de la API
            app.js  #Archivo principal del servidor Express
        env.example  #Ejemplo de variables de entorno para backend
        db_init.sql  #Script de inicializacion de la base de datos
        package.json  #Dependencias y scripts del backend
    fontend/
        public/
        src/
            components/  #Componentes reutilizables
            services/  #Logica para la comunicacion con la API
            App.css
            App.jsx  #Componente principal de la aplicacion
            index.css
            main.jsx  #Punto de entrada de la aplicacion React
        package.json  #Dependencias y scripts del frontend
    docker-compose.yml  #Configuracion de Docker Compose para MySQL
    .gitignore  #Archivo de ignorar para git
    README.md  #Este archivo
``````

## Configuración y Ejecución Local

Sigue estos pasos para levantar la aplicación en tu máquina local.

**Prerrequisitos:**

* Node.js (v18 o superior recomendado)
* npm (v8 o superior recomendado)
* Docker Desktop (o Docker Engine)

1.  **Clonar el Repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/todo-app-fullstack.git](https://github.com/TU_USUARIO/todo-app-fullstack.git)
    cd todo-app-fullstack
    ```
    *(Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub)*

2.  **Configurar la Base de Datos con Docker Compose:**
    Asegúrate de que Docker Desktop esté corriendo. Desde la raíz del proyecto (`todo-app-fullstack/`):
    ```bash
    docker-compose up -d
    ```
    Esto iniciará un contenedor MySQL en el puerto `3306` y ejecutará `db_init.sql` para crear la tabla `tasks`.

3.  **Configurar el Backend:**
    Navega a la carpeta `backend/`:
    ```bash
    cd backend
    ```
    Instala las dependencias:
    ```bash
    npm install
    ```
    Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables (estas coincidirán con la configuración de Docker Compose):
    ```dotenv
    PORT=5000
    DB_HOST=localhost
    DB_USER=user
    DB_PASSWORD=password
    DB_DATABASE=todo_db
    ```
    Vuelve a la raíz del proyecto:
    ```bash
    cd ..
    ```

4.  **Configurar el Frontend:**
    Navega a la carpeta `frontend/`:
    ```bash
    cd frontend
    ```
    Instala las dependencias:
    ```bash
    npm install
    ```
    Crea un archivo `.env` en la carpeta `frontend/` con la siguiente variable:
    ```dotenv
    VITE_API_URL=http://localhost:5000/api/tasks
    ```
    Vuelve a la raíz del proyecto:
    ```bash
    cd ..
    ```

5.  **Iniciar el Backend:**
    Abre una nueva terminal, navega a `todo-app-fullstack/backend/` y ejecuta:
    ```bash
    npm start
    ```
    El servidor Express debería iniciarse en `http://localhost:5000`.

6.  **Iniciar el Frontend:**
    Abre otra nueva terminal, navega a `todo-app-fullstack/frontend/` y ejecuta:
    ```bash
    npm run dev
    ```
    La aplicación React se abrirá en tu navegador (generalmente `http://localhost:5173`).

## Despliegue (Deployment)

Esta aplicación está diseñada para ser desplegada en servicios de nube que ofrezcan niveles gratuitos.

* **Backend (API):** Desplegado en [Render.com](https://render.com/)
    * **URL de la API:** [ENLACE_A_TU_BACKEND_EN_RENDER]
* **Base de Datos:** Desplegado en [PlanetScale.com](https://planetscale.com/) (MySQL compatible)
* **Frontend (UI):** Desplegado en [Vercel.com](https://vercel.com/)
    * **URL de la Aplicación:** [ENLACE_A_TU_FRONTEND_EN_VERCEL]

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras un error o tienes una sugerencia, por favor abre un issue o un pull request.