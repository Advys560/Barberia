// citaController.js
import { redirectAlert } from "../utils/alerts.js"; // Asegúrate de que la ruta a tu archivo de alertas sea la correcta
import LoginModel from "../models/Login.js";

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

        // 👉 NUEVO EVENTO: Escuchar el botón desde la vista corporativa
        // Si tu CitaView no tiene este método aún, lo agregaremos en el paso 2
        if (this.view.onConfirmarClick) {
            this.view.onConfirmarClick(this.handleConfirmarCita.bind(this));
        }
    }

// Dentro de citaController.js

handleConfirmarCita() {
    if (this.model.estaCompleta()) {
        
        // 1. Obtener los datos reales del usuario logueado usando la llave correcta
        const usuarioSesion = JSON.parse(localStorage.getItem("usuarioActivo"));

        // 2. Si no hay sesión (por seguridad), frenamos el proceso
        if (!usuarioSesion) {
            Swal.fire({
                title: "Inicia Sesión",
                text: "Debes tener una cuenta activa para poder agendar una cita.",
                icon: "warning",
                confirmButtonColor: '#C5A059'
            });
            return; 
        }

        // 3. Estructurar la cita vinculando la cuenta real detectada
        const nuevaCita = {
            id_usuario: usuarioSesion.correo || usuarioSesion.id || "ID_Anonimo", // Se vincula a su correo único
            nombre_cliente: usuarioSesion.nombre || "Cliente", // Su nombre real guardado
            servicio: this.model.Servicio,
            barbero: this.model.Barbero,
            fecha: this.model.Fecha,
            hora: this.model.Hora,
            registradoEl: new Date().toLocaleString()
        };

        // 4. Guardar en el historial general de localStorage
        const historialCitas = JSON.parse(localStorage.getItem('mis_citas')) || [];
        historialCitas.push(nuevaCita);
        localStorage.setItem('mis_citas', JSON.stringify(historialCitas));

        // 5. Lanzar la alerta definitiva con los dos botones personalizados
        redirectAlert(
            "¡Cita Registrada con Éxito!", 
            "success", 
            this.model
        );
    }
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