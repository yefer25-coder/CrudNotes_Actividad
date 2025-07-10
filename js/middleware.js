(function () {
  const user = sessionStorage.getItem("user");

  if (!user) {
    alert("Debes iniciar sesión para acceder a esta página.");
    window.location.href = "login.html";
  }
})();
