const API_URL = "http://localhost:3000";

const user = JSON.parse(sessionStorage.getItem("user"));
const welcome = document.getElementById("welcome");
const form = document.getElementById("noteForm");
const notesList = document.getElementById("notesList");

welcome.textContent = `Hola, ${user.username}`;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();
  const shareInput = document.querySelector(".share-input").value.trim();
  const permission = document.querySelector(".share-permission").value;

  if (!title || !content) return alert("Completa ambos campos.");

  const nuevaNota = {
    userId: user.id,
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaNota),
  });

  if (res.ok) {
    const notaCreada = await res.json();

    if (shareInput) {
      let users = [];

      const resUser = await fetch(`${API_URL}/users?username=${shareInput}`);
      users = await resUser.json();

      if (users.length === 0) {
        const resEmail = await fetch(`${API_URL}/users?email=${shareInput}`);
        users = await resEmail.json();
      }

      if (users.length > 0) {
        const targetUser = users[0];

        if (targetUser.id !== user.id) {
          const shared = {
            noteId: notaCreada.id,
            sharedWith: targetUser.id,
            permission,
            sharerId: user.id,
            noteOwner: user.id
          };

          const resShared = await fetch(`${API_URL}/sharedNotes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(shared),
          });

          if (resShared.ok) {
            alert(`Nota compartida con ${targetUser.username} (${permission})`);
          }
        } else {
          alert("No puedes compartir contigo mismo.");
        }
      } else {
        alert("Usuario no encontrado para compartir.");
      }

      document.querySelector(".share-input").value = "";
    }

    form.reset();
    loadNotas();
  } else {
    alert("Error al crear la nota.");
  }
});

async function loadNotas() {
  const res = await fetch(`${API_URL}/notes?userId=${user.id}`);
  const notas = await res.json();

  notesList.innerHTML = "";

  notas.forEach((nota) => {
    const div = document.createElement("div");
    div.classList.add("note-card");
    div.innerHTML = `
      <h3 contenteditable="false" class="note-title">${nota.title}</h3>
      <p contenteditable="false" class="note-content">${nota.content}</p>

      <div class="note-actions">
        <button class="edit-btn">Editar</button>
        <button class="save-btn" style="display:none">Guardar</button>
        <button class="cancel-btn" style="display:none">Cancelar</button>
        <button class="delete-btn">Eliminar</button>
      </div>
    `;

    const titleEl = div.querySelector(".note-title");
    const contentEl = div.querySelector(".note-content");
    const editBtn = div.querySelector(".edit-btn");
    const saveBtn = div.querySelector(".save-btn");
    const cancelBtn = div.querySelector(".cancel-btn");
    const deleteBtn = div.querySelector(".delete-btn");

    let titleOriginal = nota.title;
    let contentOriginal = nota.content;

    editBtn.addEventListener("click", () => {
      titleOriginal = titleEl.textContent;
      contentOriginal = contentEl.textContent;

      titleEl.contentEditable = true;
      contentEl.contentEditable = true;

      editBtn.style.display = "none";
      saveBtn.style.display = "inline-block";
      cancelBtn.style.display = "inline-block";
    });

    cancelBtn.addEventListener("click", () => {
      titleEl.textContent = titleOriginal;
      contentEl.textContent = contentOriginal;

      titleEl.contentEditable = false;
      contentEl.contentEditable = false;

      editBtn.style.display = "inline-block";
      saveBtn.style.display = "none";
      cancelBtn.style.display = "none";
    });

    saveBtn.addEventListener("click", async () => {
      const updated = {
        ...nota,
        title: titleEl.textContent.trim(),
        content: contentEl.textContent.trim(),
      };

      const res = await fetch(`${API_URL}/notes/${nota.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        titleEl.contentEditable = false;
        contentEl.contentEditable = false;
        editBtn.style.display = "inline-block";
        saveBtn.style.display = "none";
        cancelBtn.style.display = "none";
      } else {
        alert("Error al guardar los cambios.");
      }
    });

    deleteBtn.addEventListener("click", async () => {
      const confirmDelete = confirm("¿Estás seguro de eliminar esta nota?");
      if (!confirmDelete) return;

      const res = await fetch(`${API_URL}/notes/${nota.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        loadNotas();
      } else {
        alert("Error al eliminar la nota.");
      }
    });

    notesList.appendChild(div);
  });
}

async function loadNotasCompartidas() {
  const res = await fetch(`${API_URL}/sharedNotes?sharedWith=${user.id}`);
  const shared = await res.json();

  for (const s of shared) {
    const noteRes = await fetch(`${API_URL}/notes/${s.noteId}`);
    const nota = await noteRes.json();

    const div = document.createElement("div");
    div.classList.add("note-card");
    div.innerHTML = `
      <h3 class="note-title">${nota.title}</h3>
      <p class="note-content">${nota.content}</p>
      <p class="shared-label">Compartida contigo (${s.permission === "edit" ? "Lectura y edición" : "Solo lectura"})</p>
    `;

    if (s.permission === "edit") {
      div.querySelector(".note-title").contentEditable = true;
      div.querySelector(".note-content").contentEditable = true;

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Guardar cambios";
      saveBtn.addEventListener("click", async () => {
        const updated = {
          ...nota,
          title: div.querySelector(".note-title").textContent.trim(),
          content: div.querySelector(".note-content").textContent.trim(),
        };

        const res = await fetch(`${API_URL}/notes/${nota.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });

        if (res.ok) {
          alert("Cambios guardados.");
        } else {
          alert("Error al guardar.");
        }
      });

      div.appendChild(saveBtn);
    }

    notesList.appendChild(div);
  }
}

loadNotas();
loadNotasCompartidas();
