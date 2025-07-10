const API_URL = "http://localhost:3000/users";

// REGISTRO
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Validar que no esté en uso
    const res = await fetch(`${API_URL}?email=${email}&username=${username}`);
    const existing = await res.json();

    if (existing.length > 0) {
      alert("Correo o usuario ya en uso.");
      return;
    }

    const newUser = {
      username,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    alert("Registro exitoso. Redirigiendo al login...");
    sessionStorage.setItem("user", JSON.stringify(user));
    window.location.href = "login.html";
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loginId = document.getElementById("loginId").value.trim();
    const password = document.getElementById("loginPassword").value;

    const res = await fetch(`${API_URL}?${loginId.includes('@') ? 'email' : 'username'}=${loginId}`);
    const users = await res.json();

    if (users.length === 0 || users[0].password !== password) {
      alert("Credenciales incorrectas.");
      return;
    }

    const user = users[0];

    sessionStorage.setItem("user", JSON.stringify(user));
    window.location.href = "home.html";
  });
}
