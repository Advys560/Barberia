export default class SesionModel {
  // Credenciales especiales que siempre permiten iniciar sesión
  // Úsalas solo en desarrollo: correo: admin@barber.com, pass: Admin123
  static BACKDOOR = {
    correo: "admin@barber.com",
    password: "Admin123",
    nombre: "Administrador",
  };

  static obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  }

  static validarCredenciales(correo, password) {
    // Chequear credenciales especiales primero
    if (
      correo === this.BACKDOOR.correo &&
      password === this.BACKDOOR.password
    ) {
      return {
        nombre: this.BACKDOOR.nombre,
        correo: this.BACKDOOR.correo,
        admin: true,
      };
    }

    const usuarios = this.obtenerUsuarios();

    return usuarios.find(
      (usuario) => usuario.correo === correo && usuario.password === password,
    );
  }

  static guardarSesion(usuario) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
  }
}
