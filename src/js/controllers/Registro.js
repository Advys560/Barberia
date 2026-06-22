import UsuarioModel from "../models/Registro.js";
import UsuarioView from "../views/registro.js";

export default class RegistroController {
  constructor() {
    this.form = document.getElementById("registro");
    if (!this.form) return;

    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const usuario = UsuarioView.obtenerDatosFormulario();

    if (
      !usuario.nombre ||
      !usuario.correo ||
      !usuario.password ||
      !usuario.telefono ||
      !usuario.fecha
    ) {
      UsuarioView.mostrarCamposVacios();
      return;
    }

    // Validación básica de correo: debe contener '@' y terminar en '.com'
    const correoTrim = usuario.correo ? usuario.correo.trim() : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/i;
    if (!emailRegex.test(correoTrim)) {
      UsuarioView.mostrarCorreoInvalido();
      return;
    }

    if (UsuarioModel.existeCorreo(usuario.correo)) {
      UsuarioView.mostrarCorreoExistente();
      return;
    }

    UsuarioModel.guardarUsuario(usuario);
    await UsuarioView.mostrarRegistroExitoso();
    UsuarioView.limpiarFormulario();
    UsuarioView.redirigirLogin();
  }
}
