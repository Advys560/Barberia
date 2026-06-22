export class BarberoModel {
  constructor() {
    this.usuarioSesion = JSON.parse(localStorage.getItem("usuarioActivo"));
    this.todasLasCitas = [];
    this.citasAsignadas = [];
    this.fechaSeleccionada = null;
  }

  getUsuarioActivo() {
    return this.usuarioSesion;
  }

  cargarCitas() {
    this.todasLasCitas = JSON.parse(localStorage.getItem("mis_citas")) || [];

    if (!this.usuarioSesion || this.usuarioSesion.role !== "barbero") {
      return [];
    }

    const barberoId = this.usuarioSesion.barberoId;
    const barberoNombre = this.usuarioSesion.nombre;

    this.citasAsignadas = this.todasLasCitas.filter((cita) => {
      if (!cita.barbero) return false;

      if (barberoId != null && cita.barbero.id_barbero != null) {
        return String(cita.barbero.id_barbero) === String(barberoId);
      }

      return (
        cita.barbero.nombre_barbero === barberoNombre ||
        cita.barbero === barberoNombre
      );
    });

    return this.citasAsignadas;
  }

  filtrarPorFecha(fecha) {
    if (!fecha) {
      return this.cargarCitas();
    }

    return this.cargarCitas().filter((cita) => cita.fecha === fecha);
  }
}
