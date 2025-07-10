const API_URL = "http://localhost:3000";
const user = JSON.parse(sessionStorage.getItem("user"));

// Redirigir si no hay sesión activa
if (!user) {
  location.href = "login.html";
}

// Aplicar tema oscuro si está activado en localStorage
const theme = localStorage.getItem("theme");
if (theme === "dark") {
  document.body.classList.add("dark");
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.clear();
  location.href = "index.html";
});

async function loadUserInfo() {
  try {
    const res = await fetch(`${API_URL}/users/${user.id}`);
    if (!res.ok) throw new Error("No se pudo cargar la información del usuario.");

    const data = await res.json();
    document.getElementById("username").textContent = data.username;
    document.getElementById("email").textContent = data.email;

    const fecha = new Date(data.createdAt || data.id); 
    document.getElementById("registeredAt").textContent = fecha.toLocaleDateString();
  } catch (err) {
    alert(err.message);
  }
}

// Mostrar notas compartidas por el usuario
async function loadSharedByMe() {
  try {
    const res = await fetch(`${API_URL}/sharedNotes`);
    if (!res.ok) throw new Error("No se pudieron cargar las notas compartidas.");

    const shared = await res.json();
    const myShared = shared.filter(s => s.sharerId === user.id);
    const list = document.getElementById("sharedNotesList");

    if (myShared.length === 0) {
      list.innerHTML = "<li class='note-empty'>No has compartido ninguna nota.</li>";
      return;
    }

    for (const s of myShared) {
      const [noteRes, userRes] = await Promise.all([
        fetch(`${API_URL}/notes/${s.noteId}`),
        fetch(`${API_URL}/users/${s.sharedWith}`)
      ]);

      const note = await noteRes.json();
      const receptor = await userRes.json();

      const li = document.createElement("li");
      li.className = "card";
      li.innerHTML = `
        <p><strong>Nota:</strong> ${note.title}</p>
        <p><strong>Compartida con:</strong> ${receptor.username} (${receptor.email})</p>
        <p><strong>Permiso:</strong> ${s.permission === "edit" ? "Lectura y edición" : "Solo lectura"}</p>
      `;

      list.appendChild(li);
    }
  } catch (err) {
    alert(err.message);
  }
}

loadUserInfo();
loadSharedByMe();
