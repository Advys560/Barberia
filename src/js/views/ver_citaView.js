export class VerCitasView {
    constructor() {
        // Elementos de la sección de citas
        this.tablaBody = document.getElementById("tabla-citas-body");
        this.modal = document.getElementById("modal-editar-cita");
        this.formEditar = document.getElementById("form-editar-cita");
        this.inputIndex = document.getElementById("edit-index");
        this.inputFecha = document.getElementById("edit-fecha");
        this.inputHora = document.getElementById("edit-hora");
        this.btnCerrarModal = document.getElementById("btn-cerrar-modal");

        // Elementos de autenticación en el Navbar
        this.authLinks = document.getElementById("auth-links");
        this.logoutLink = document.getElementById("logout-link");
    }

    // Muestra u oculta las opciones de login/logout según el estado de la sesión
    configurarNavbar(usuarioLogueado) {
        if (usuarioLogueado) {
            if (this.authLinks) this.authLinks.style.display = "none";
            if (this.logoutLink) this.logoutLink.style.display = "block";
        } else {
            if (this.authLinks) this.authLinks.style.display = "flex";
            if (this.logoutLink) this.logoutLink.style.display = "none";
        }
    }

    // Dibuja las filas de la tabla dinámicamente con los datos de las citas
    renderCitas(citas) {
        this.tablaBody.innerHTML = "";
        
        if (!citas || citas.length === 0) {
            this.tablaBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center; color: #b3b3b3; padding: 20px;">
                        No tienes citas agendadas actualmente.
                    </td>
                </tr>`;
            return;
        }

        citas.forEach((cita, index) => {
            // Mapea de forma segura los objetos o cadenas guardadas por tu citaController.js
            const nombreServicio = cita.servicio?.nombre || cita.servicio || "N/A";
            const nombreBarbero = cita.barbero?.nombre_barbero || cita.barbero?.nombre || cita.barbero || "N/A";
            const fecha = cita.fecha || "N/A";
            const hora = cita.hora || "N/A";

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${nombreServicio}</td>
                <td>${nombreBarbero}</td>
                <td>${fecha}</td>
                <td>${hora}</td>
                <td>
                    <button class="btn-action btn-edit data-btn-editar" data-index="${index}">Modificar</button>
                    <button class="btn-action btn-delete data-btn-eliminar" data-index="${index}">Eliminar</button>
                </td>
            `;
            this.tablaBody.appendChild(tr);
        });
    }

    // Abre el modal de edición y carga los valores previos en los inputs
    abrirModal(indexFiltrado, fecha, hora) {
        this.inputIndex.value = indexFiltrado;
        this.inputFecha.value = fecha;
        this.inputHora.value = hora;
        this.modal.style.display = "flex";
    }

    // Oculta visualmente el modal
    cerrarModal() {
        this.modal.style.display = "none";
    }

    // --- Captura de Eventos del DOM para el Controlador ---
    onLogoutClick(callback) {
        if (this.logoutLink) {
            this.logoutLink.addEventListener("click", (e) => {
                e.preventDefault();
                callback();
            });
        }
    }

    onEditarClick(callback) {
        this.tablaBody.addEventListener("click", (e) => {
            if (e.target.classList.contains("data-btn-editar")) {
                callback(e.target.dataset.index);
            }
        });
    }

    onEliminarClick(callback) {
        this.tablaBody.addEventListener("click", (e) => {
            if (e.target.classList.contains("data-btn-eliminar")) {
                callback(e.target.dataset.index);
            }
        });
    }

    onGuardarEdicion(callback) {
        this.formEditar.addEventListener("submit", (e) => {
            e.preventDefault();
            callback({
                index: this.inputIndex.value,
                fecha: this.inputFecha.value,
                hora: this.inputHora.value
            });
        });
    }

    onCancelarEdicion(callback) {
        this.btnCerrarModal.addEventListener("click", callback);
    }
}