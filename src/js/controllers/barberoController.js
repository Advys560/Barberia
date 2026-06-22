export class BarberoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentDate = new Date();
    this.fechaSeleccionada = null;

    this.inicializar();
  }

  inicializar() {
    const usuario = this.model.getUsuarioActivo();

    if (!usuario || usuario.role !== "barbero") {
      Swal.fire({
        title: "Acceso denegado",
        text: "Debes iniciar sesión como barbero para ver este panel.",
        icon: "warning",
        confirmButtonColor: "#C5A059",
      }).then(() => {
        window.location.href = "./Inicio_Sesion.html";
      });
      return;
    }

    this.renderCalendar();
    this.view.onPrevMes(this.handleMesAnterior.bind(this));
    this.view.onNextMes(this.handleMesSiguiente.bind(this));
  }

  renderCalendar() {
    this.view.renderCalendar(this.currentDate, this.handleDiaSeleccionado.bind(this), this.fechaSeleccionada);
    this.cargarCitasSeleccionadas();
  }

  handleDiaSeleccionado(_, fecha) {
    this.fechaSeleccionada = fecha;
    this.view.setFechaSeleccionada(fecha);
    this.cargarCitasSeleccionadas();
  }

  cargarCitasSeleccionadas() {
    let citas = this.model.cargarCitas();

    if (this.fechaSeleccionada) {
      citas = citas.filter((cita) => cita.fecha === this.fechaSeleccionada);
    }

    this.view.renderCitas(citas);
  }

  handleMesAnterior() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  handleMesSiguiente() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }
}
