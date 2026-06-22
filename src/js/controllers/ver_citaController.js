export class VerCitasController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.inicializar();
    }

    inicializar() {
        const usuario = this.model.getUsuarioActivo();

        // Sincroniza dinámicamente el estado de los botones del login/logout en el navbar
        this.view.configurarNavbar(usuario);

        // Control de seguridad: Si no está logueado, bloquea la vista y redirige
        if (!usuario) {
            Swal.fire({
                title: "Inicia Sesión",
                text: "Debes ingresar a tu cuenta para verificar tus citas.",
                icon: "warning",
                confirmButtonColor: '#C5A059'
            }).then(() => {
                window.location.href = "./Inicio_Sesion.html";
            });
            return;
        }

        // Pinta las citas del usuario en la primera carga de la pantalla
        this.actualizarTabla();

        // Enlaza los listeners definidos en la Vista con las respuestas de este Controlador
        this.view.onEditarClick(this.handleAbrirModalEdicion.bind(this));
        this.view.onEliminarClick(this.handleEliminarCita.bind(this));
        this.view.onGuardarEdicion(this.handleGuardarCambios.bind(this));
        this.view.onCancelarEdicion(() => this.view.cerrarModal());
        this.view.onLogoutClick(this.handleLogout.bind(this));
    }

    // Consulta los datos del modelo y le pide a la vista que actualice la tabla
    actualizarTabla() {
        const citas = this.model.cargarCitas();
        this.view.renderCitas(citas);
    }

    // Abre el formulario modal enviándole la información actual de la cita seleccionada
    handleAbrirModalEdicion(indexFiltrado) {
        const cita = this.model.citasUsuario[indexFiltrado];
        this.view.abrirModal(indexFiltrado, cita.fecha, cita.hora);
    }

    // Gestiona el envío del formulario para guardar modificaciones en el localStorage
    handleGuardarCambios({ index, fecha, hora }) {
        const exito = this.model.actualizarCita(index, fecha, hora);

        if (exito) {
            this.view.cerrarModal();
            Swal.fire({
                title: "¡Cita Modificada!",
                text: "Tu reserva ha sido reprogramada exitosamente.",
                icon: "success",
                confirmButtonColor: '#C5A059'
            });
            // Re-renderiza la tabla inmediatamente con los nuevos datos guardados
            this.actualizarTabla();
        }
    }

    // Gestiona la cancelación definitiva de una cita mediante confirmación previa
    handleEliminarCita(indexFiltrado) {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción cancelará tu cita de forma definitiva.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#d9534f',
            cancelButtonColor: '#2d2c2c',
            confirmButtonText: "Sí, cancelar cita",
            cancelButtonText: "Mantener cita"
        }).then((result) => {
            if (result.isConfirmed) {
                this.model.eliminarCita(indexFiltrado);
                
                Swal.fire({
                    title: "Eliminada",
                    text: "Tu reserva ha sido removida del sistema.",
                    icon: "success",
                    confirmButtonColor: '#C5A059'
                });
                
                this.actualizarTabla();
            }
        });
    }

    // Cierra la sesión destruyendo el token activo del localStorage y refresca la vista
    handleLogout() {
        localStorage.removeItem("usuarioActivo");
        window.location.reload();
    }
}