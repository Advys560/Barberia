export default class UsuarioModel {
  static obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  }

  static existeCorreo(correo) {
    const usuarios = this.obtenerUsuarios();

    return usuarios.some((usuario) => usuario.correo === correo);
  }

  static guardarUsuario(usuario) {
    const usuarios = this.obtenerUsuarios();

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }
}
