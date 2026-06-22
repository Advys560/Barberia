export default class SesionModel {
  // Cuentas predefinidas de acceso rápido
  static BACKDOOR = {
    correo: "admin@barber.com",
    password: "Admin123",
    nombre: "Administrador",
    admin: true,
    role: "admin",
  };

  static BARBER_ACCOUNTS = [
    {
      correo: "barbero1@barber.com",
      password: "Barbero123",
      nombre: "Barbero Uno",
      role: "barbero",
    },
    {
      correo: "barbero2@barber.com",
      password: "Barbero123",
      nombre: "Barbero Dos",
      role: "barbero",
    },
  ];

  static obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  }

  static validarCredenciales(correo, password) {
    // Chequear credenciales especiales primero
    if (
      correo === this.BACKDOOR.correo &&
      password === this.BACKDOOR.password
    ) {
      return this.BACKDOOR;
    }

    const usuarios = this.obtenerUsuarios();
    const usuariosRegistrados = [...usuarios, ...this.BARBER_ACCOUNTS];

    return usuariosRegistrados.find(
      (usuario) => usuario.correo === correo && usuario.password === password,
    );
  }

  static guardarSesion(usuario) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
  }
}
