export class Cita {
    
  constructor() {
    this.Servicio = null;
    this.Barbero = null;
    this.Fecha = null;
    this.Hora = null;
  }

  setServicio(id, nombre, precio) {
    this.Servicio = { id, nombre, precio };
  }

  setBarbero(id_barbero, nombre_barbero) {
    this.Barbero = { id_barbero, nombre_barbero };
  }

  setFecha(fecha) {
    this.Fecha = fecha;
  }

  setHora(hora) {
    this.Hora = hora;
  }

  estaCompleta() {
    return (
      this.Servicio !== null &&
      this.Barbero !== null &&
      this.Fecha !== null &&
      this.Hora !== null
    );
  }

  getResumen() {
    return {
      servicio: this.Servicio
        ? `${this.Servicio.nombre} - $${this.Servicio.precio}`
        : "Sin seleccionar",
      barbero: this.Barbero ? this.Barbero.nombre_barbero : "Sin seleccionar",
      fecha: this.Fecha ? this.Fecha : "Sin seleccionar",
      hora: this.Hora ? this.Hora : "Sin seleccionar",
    };
  }
}
