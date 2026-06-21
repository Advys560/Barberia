import LoginModel from "../models/Login.js";
import LoginView from "../views/Login.js";

export default class LoginController {
  constructor() {
    this.form = document.getElementById("loginForm");
    if (!this.form) return;

    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.inicializarMostrarPassword();
  }

  inicializarMostrarPassword() {
    const passwordInput = document.getElementById("password");
    const mostrarPasswordBtn = document.getElementById("mostrarPassword");

    if (passwordInput && mostrarPasswordBtn) {
      const icono = mostrarPasswordBtn.querySelector("i");

      mostrarPasswordBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          icono.classList.remove("fa-eye");
          icono.classList.add("fa-eye-slash");
        } else {
          passwordInput.type = "password";
          icono.classList.remove("fa-eye-slash");
          icono.classList.add("fa-eye");
        }
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { correo, password } = LoginView.obtenerDatosLogin();

    const usuario = LoginModel.validarCredenciales(correo, password);

    if (!usuario) {
      LoginView.mostrarErrorLogin();
      return;
    }

    LoginModel.guardarSesion(usuario);

    await LoginView.mostrarLoginExitoso(usuario.nombre);

    LoginView.limpiarFormulario();

    LoginView.redirigirInicio();
  }
}
