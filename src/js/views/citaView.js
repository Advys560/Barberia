// citaView.js
// Solo toca el DOM. No guarda datos ni toma decisiones.

export class CitaView {

    constructor() {
        // Guardamos referencias a los elementos del HTML que vamos a usar
        // Es como decirle al View: "estos son los elementos con los que vas a trabajar"
        this.listaServicios   = document.getElementById("lista-servicios");
        this.listaBarberos    = document.getElementById("lista-barberos");
        this.hoursContainer   = document.getElementById("hours-container");
        this.calendarTitle    = document.getElementById("calendar-title");
        this.calendarDays     = document.getElementById("calendar-days");
        this.prevBtn          = document.getElementById("prev-month");
        this.nextBtn          = document.getElementById("next-month");
        this.inputFecha       = document.getElementById("fecha");
        this.inputHora        = document.getElementById("hora");
        this.btnConfirmar     = document.getElementById("btn-confirmar");

        // Elementos del resumen lateral
        this.resumenServicio  = document.getElementById("resumen-servicio");
        this.resumenBarbero   = document.getElementById("resumen-barbero");
        this.resumenFecha     = document.getElementById("resumen-fecha");
        this.resumenHora      = document.getElementById("resumen-hora");
    }

    // ─────────────────────────────────────────
    // MÉTODOS DE ESCUCHA (reciben una función callback del Controller)
    // ─────────────────────────────────────────

    // Cuando el usuario hace clic en una tarjeta de servicio
    onServicioClick(callback) {
        this.listaServicios.addEventListener("click", (e) => {
            // closest() busca el ancestro más cercano con esa clase
            // Así funciona aunque el clic caiga en el <h3> o el <p> internos
            const card = e.target.closest(".servicio-card");
            if (!card) return; // si el clic no fue en una tarjeta, ignorar

            // Leer los data-* del HTML y pasárselos al Controller via callback
            const id     = card.dataset.id;
            const nombre = card.dataset.nombre;
            const precio = card.dataset.precio;
            callback(id, nombre, precio, card);
        });
    }

    // Cuando el usuario hace clic en un botón de barbero
    onBarberoClick(callback) {
        this.listaBarberos.addEventListener("click", (e) => {
            // El botón está dentro de la tarjeta, subimos con closest()
            const card = e.target.closest(".barbero-card");
            if (!card) return;

            const id     = card.dataset.id;
            const nombre = card.dataset.nombre;
            callback(id, nombre, card);
        });
    }

    // Cuando el usuario hace clic en una hora
    onHoraClick(callback) {
        this.hoursContainer.addEventListener("click", (e) => {
            if (!e.target.classList.contains("hour-btn")) return;
            const hora = e.target.getAttribute("data-time");
            callback(hora, e.target);
        });
    }

    // Cuando el usuario navega el calendario
    onPrevMes(callback) {
        this.prevBtn.addEventListener("click", callback);
    }

    onNextMes(callback) {
        this.nextBtn.addEventListener("click", callback);
    }

    // ─────────────────────────────────────────
    // MÉTODOS DE MARCAR SELECCIÓN (feedback visual)
    // ─────────────────────────────────────────

    marcarServicio(cardElement) {
        // Quitar clase "active" de todas las tarjetas
        this.listaServicios.querySelectorAll(".servicio-card")
            .forEach(c => c.classList.remove("active"));
        // Poner "active" solo en la seleccionada
        cardElement.classList.add("active");
    }

    marcarBarbero(cardElement) {
        this.listaBarberos.querySelectorAll(".barbero-card")
            .forEach(c => c.classList.remove("active"));
        cardElement.classList.add("active");
    }

    marcarHora(btnElement) {
        this.hoursContainer.querySelectorAll(".hour-btn")
            .forEach(b => b.classList.remove("active"));
        btnElement.classList.add("active");
        this.inputHora.value = btnElement.getAttribute("data-time");
    }

    marcarDia(dayElement, fechaStr) {
        this.calendarDays.querySelectorAll(".day")
            .forEach(d => d.classList.remove("active"));
        dayElement.classList.add("active");
        this.inputFecha.value = fechaStr;
    }

    // ─────────────────────────────────────────
    // CALENDARIO (misma lógica del citas.js original, ahora en el View)
    // ─────────────────────────────────────────

    renderCalendar(currentDate, onDiaClick) {
        const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                       "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

        const year  = currentDate.getFullYear();
        const month = currentDate.getMonth();

        this.calendarTitle.textContent = `${meses[month]} ${year}`;
        this.calendarDays.innerHTML = "";

        let startDayIndex = new Date(year, month, 1).getDay();
        startDayIndex = startDayIndex === 0 ? 6 : startDayIndex - 1;

        const totalDays = new Date(year, month + 1, 0).getDate();

        // Espacios vacíos para alinear el primer día
        for (let i = 0; i < startDayIndex; i++) {
            const empty = document.createElement("div");
            empty.classList.add("day", "empty");
            this.calendarDays.appendChild(empty);
        }

        // Días reales
        for (let day = 1; day <= totalDays; day++) {
            const span = document.createElement("span");
            span.classList.add("day");
            span.textContent = day;

            const mes = String(month + 1).padStart(2, "0");
            const dia = String(day).padStart(2, "0");
            const fechaStr = `${year}-${mes}-${dia}`;

            // Si este día ya estaba seleccionado, mantener el "active"
            if (this.inputFecha.value === fechaStr) {
                span.classList.add("active");
            }

            span.addEventListener("click", () => onDiaClick(span, fechaStr));
            this.calendarDays.appendChild(span);
        }
    }

    // ─────────────────────────────────────────
    // RESUMEN LATERAL
    // ─────────────────────────────────────────

    actualizarResumen(resumen) {
        this.resumenServicio.textContent = `Servicio: ${resumen.servicio}`;
        
        this.resumenBarbero.textContent  = `Barbero: ${resumen.barbero}`;
        this.resumenBarbero.style.display = "block";

        this.resumenFecha.textContent    = `Fecha: ${resumen.fecha}`;
        this.resumenFecha.style.display  = "block";

        this.resumenHora.textContent     = `Hora: ${resumen.hora}`;
        this.resumenHora.style.display   = "block";
    }

    // Dentro de citaView.js
habilitarBoton(estaCompleta) {
    const btn = document.getElementById('btn_agendar_cita'); // Asegúrate de usar este ID exacto
    if (btn) {
        btn.disabled = !estaCompleta;
    }
}
    // Dentro de tu clase CitaView en citaView.js agrega:

onConfirmarClick(callback) {
    const btn = document.getElementById('btn_agendar_cita');
    if (btn) {
        btn.addEventListener('click', callback);
    }
}
}
