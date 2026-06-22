export class VerCitasModel {
  constructor() {
    this.todasLasCitas = [];
    this.citasUsuario = [];
    this.usuarioSesion = JSON.parse(localStorage.getItem("usuarioActivo"));
  }

  // Retorna el usuario que tiene la sesión activa actualmente
  getUsuarioActivo() {
    return this.usuarioSesion;
  }

  // Carga todas las citas del sistema y filtra únicamente las del usuario activo
  cargarCitas() {
    this.todasLasCitas = JSON.parse(localStorage.getItem("mis_citas")) || [];

    if (!this.usuarioSesion) return [];

    if (this.usuarioSesion.admin) {
      this.citasUsuario = this.todasLasCitas;
    } else {
      // Filtra comparando con el correo o id del usuario, tal como se guarda en citaController.js
      this.citasUsuario = this.todasLasCitas.filter(
        (cita) =>
          cita.id_usuario === this.usuarioSesion.correo ||
          cita.id_usuario === this.usuarioSesion.id,
      );
    }

    return this.citasUsuario;
  }

  // Modifica los datos de la cita y actualiza la base de datos local (localStorage)
  actualizarCita(indexFiltrado, nuevaFecha, nuevaHora) {
    // Localiza la cita en el arreglo que está viendo el usuario
    const citaTarget = this.citasUsuario[indexFiltrado];

    // Encuentra la posición real y global de esa cita en el localStorage general
    const indexGlobal = this.todasLasCitas.indexOf(citaTarget);

    if (indexGlobal !== -1) {
      // Sobreescribe los valores con los nuevos datos recibidos del formulario
      this.todasLasCitas[indexGlobal].fecha = nuevaFecha;
      this.todasLasCitas[indexGlobal].hora = nuevaHora;

      // Guarda los cambios de forma definitiva en el localStorage
      localStorage.setItem("mis_citas", JSON.stringify(this.todasLasCitas));
      return true;
    }
    return false;
  }

  // Elimina la cita del arreglo global y actualiza el localStorage
  eliminarCita(indexFiltrado) {
    const citaTarget = this.citasUsuario[indexFiltrado];
    const indexGlobal = this.todasLasCitas.indexOf(citaTarget);

    if (indexGlobal !== -1) {
      this.todasLasCitas.splice(indexGlobal, 1);
      localStorage.setItem("mis_citas", JSON.stringify(this.todasLasCitas));
      return true;
    }
    return false;
  }
}
