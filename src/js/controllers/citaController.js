// citaController.js

export class CitaController {

    constructor(model, view) {

        this.model = model;
        this.view = view;

        this.currentDate = new Date();

        this.inicializarEventos();

        this.view.renderCalendar(
            this.currentDate,
            this.handleDiaSeleccionado.bind(this)
        );

        this.actualizarVista();
    }

    inicializarEventos() {

        this.view.onServicioClick(
            this.handleServicioSeleccionado.bind(this)
        );

        this.view.onBarberoClick(
            this.handleBarberoSeleccionado.bind(this)
        );

        this.view.onHoraClick(
            this.handleHoraSeleccionada.bind(this)
        );

        this.view.onPrevMes(
            this.handleMesAnterior.bind(this)
        );

        this.view.onNextMes(
            this.handleMesSiguiente.bind(this)
        );
    }

    handleServicioSeleccionado(id, nombre, precio, card) {

        this.model.setServicio(id, nombre, precio);

        this.view.marcarServicio(card);

        this.actualizarVista();
    }

    handleBarberoSeleccionado(id, nombre, card) {

        this.model.setBarbero(id, nombre);

        this.view.marcarBarbero(card);

        this.actualizarVista();
    }

    handleHoraSeleccionada(hora, btn) {

        this.model.setHora(hora);

        this.view.marcarHora(btn);

        this.actualizarVista();
    }

    handleDiaSeleccionado(dayElement, fechaStr) {

        this.model.setFecha(fechaStr);

        this.view.marcarDia(dayElement, fechaStr);

        this.actualizarVista();
    }

    handleMesAnterior() {

        this.currentDate.setMonth(
            this.currentDate.getMonth() - 1
        );

        this.view.renderCalendar(
            this.currentDate,
            this.handleDiaSeleccionado.bind(this)
        );
    }

    handleMesSiguiente() {

        this.currentDate.setMonth(
            this.currentDate.getMonth() + 1
        );

        this.view.renderCalendar(
            this.currentDate,
            this.handleDiaSeleccionado.bind(this)
        );
    }

    actualizarVista() {

        const resumen = this.model.getResumen();

        this.view.actualizarResumen(resumen);

        this.view.habilitarBoton(
            this.model.estaCompleta()
        );
    }
}