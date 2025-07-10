# 📝 CrudNote

**CrudNote** es una aplicación web para crear, editar y compartir notas de manera colaborativa. Está diseñada como una herramienta práctica para gestionar ideas, tareas o recordatorios en equipo o de forma individual. Este proyecto simula un backend usando `json-server`.

---

## 🚀 Funcionalidades

- Registro e inicio de sesión con nombre de usuario o correo electrónico.
- Crear, editar y eliminar notas personales (CRUD).
- Compartir notas con otros usuarios con permisos de lectura o edición.
- Protección de rutas mediante sesión en `sessionStorage`.
- Tema claro/oscuro persistente con `localStorage`.
- Interfaz responsiva y moderna con HTML, CSS puro y JavaScript.
- Simulación de servidor REST con `json-server`.

---

## 📁 Estructura de archivos

CrudNote/

├── css/

│ └── home.css  (**Estilos para la pagina de notas**)

| └── index.css  **Los estilos de la pagina principal (Landing page)**

│ └── login_registro.css  **Estilos para login y registro**

| └── profile.css  **Los estilos del perfil**

├── img/

│ └── [archivos de imagen]

├── js/

│ └── auth.js  **Registro e inicio de sesión**

│ └── home.js  **CRUD de notas**

│ └── middleware.js  **Protección de rutas**

| └── profile.js  **Perfil del usuario**

│ └── theme.js  **Cambiar tema claro/oscuro**

├── db.json  **Base de datos simulada para json-server**

├── home.html  **Página principal de notas (dashboard)**

├── index.html  **Página principal (landing)**

├── login.html  **Página de inicio de sesión**

├── profile.html  **Perfil del usuario**

├── register.html  **Página de registro**

└── README.md  **Este archivo**

---

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3 (sin frameworks)
- JavaScript 
- json-server (para simular el backend)

---


## 🚀 Cómo ejecutar este proyecto

### ✅ Requisitos previos

- Tener instalado [Node.js](https://nodejs.org/)
- Tener instalado [JSON Server](https://www.npmjs.com/package/json-server)

**Puedes instalar JSON Server con este comando:**

- npm install -g json-server

### 📁 1. Clona el repositorio

git clone https://github.com/tu-usuario/crudnote.git
cd crudnote

### 🛠️ 2. Configura el archivo db.json

{
   "users": [],
  
   "notes": [],
  
   "sharedNotes": []
}


### ▶️ 3. Inicia el backend simulado

Ejecuta JSON Server con el siguiente comando:

 - json-server --watch db.json --port 3000

Esto levantará un servidor en:

- 📡 http://localhost:3000/

### 🌐 4. Abre la app en el navegador

- Solo abre el archivo index.html con tu navegador (O haz doble clic sobre index.html)

### ✨ Funcionalidades principales

- Registro e inicio de sesión

-  Crear, editar y eliminar notas personales

- Compartir notas con permisos (lectura o edición)

- Ver notas compartidas contigo

- Visualización del perfil

- Tema claro/oscuro con preferencia guardada

- Cerrar sesión

## 📌 Notas

- Las sesiones se manejan con sessionStorage

- El tema se guarda con localStorage

- No se puede compartir una nota con un usuario que no esté registrado


## 📬 Contacto

- Desarrollado por: `Yeferson Garcia --> coder junior `

## 🖼️ Capturas de pantalla

### 🏠 Página de inicio (Dashboard)

<img width="1837" height="963" alt="Image" src="https://github.com/user-attachments/assets/aa83c691-3b05-46d3-b85b-fc3454cc4744" />

---

### 🔐 Página de login

<img width="1837" height="963" alt="Image" src="https://github.com/user-attachments/assets/834a171a-9442-4c7e-ad41-f80eb1c33a0b" />

---

### 📝 Crear notas

<img width="1837" height="963" alt="Image" src="https://github.com/user-attachments/assets/a1a2d1bc-c830-4fc6-8a39-5da4ff8b47d5" />

---

### 🌙 Tema oscuro activado

<img width="1837" height="963" alt="Image" src="https://github.com/user-attachments/assets/826a4a3f-8888-47cf-a931-13a33d20c142" />

