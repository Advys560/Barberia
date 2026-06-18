const password = document.getElementById("password");
const mostrarPassword = document.getElementById("mostrarPassword");
const icono = mostrarPassword.querySelector("i");

mostrarPassword.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    icono.classList.remove("fa-eye");
    icono.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    icono.classList.remove("fa-eye-slash");
    icono.classList.add("fa-eye");
  }
});
