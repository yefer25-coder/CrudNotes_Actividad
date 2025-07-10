// Logica para aplicar tema oscuro y guardarlo en "localStorage"

function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const newTheme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
}

applySavedTheme();

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("toggleThemeBtn");
  if (btn) {
    btn.addEventListener("click", toggleTheme);
  }
});
