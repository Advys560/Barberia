export class BarberoView {
  constructor() {
    this.calendarDays = document.getElementById("calendar-days-barbero");
    this.calendarTitle = document.getElementById("calendar-title-barbero");
    this.prevBtn = document.getElementById("prev-month-barbero");
    this.nextBtn = document.getElementById("next-month-barbero");
    this.listaCitas = document.getElementById("lista-citas-barbero");
    this.fechaSeleccionada = document.getElementById("fecha-seleccionada");
  }

  renderCalendar(currentDate, onDiaClick, selectedDate) {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    this.calendarTitle.textContent = `${meses[month]} ${year}`;
    this.calendarDays.innerHTML = "";

    let startDayIndex = new Date(year, month, 1).getDay();
    startDayIndex = startDayIndex === 0 ? 6 : startDayIndex - 1;
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startDayIndex; i++) {
      const empty = document.createElement("div");
      empty.classList.add("day", "empty");
      this.calendarDays.appendChild(empty);
    }

    for (let day = 1; day <= totalDays; day++) {
      const span = document.createElement("span");
      span.classList.add("day");
      span.textContent = day;

      const mes = String(month + 1).padStart(2, "0");
      const dia = String(day).padStart(2, "0");
      const fechaStr = `${year}-${mes}-${dia}`;

      if (selectedDate === fechaStr) {
        span.classList.add("active");
      }

      span.addEventListener("click", () => onDiaClick(span, fechaStr));
      this.calendarDays.appendChild(span);
    }
  }

  renderCitas(citas) {
    this.listaCitas.innerHTML = "";

    if (!citas || citas.length === 0) {
      this.listaCitas.innerHTML = `
        <p class="placeholder-text">
          No hay citas para esta fecha. Selecciona otro día o verifica el calendario.
        </p>`;
      return;
    }

    citas.forEach((cita) => {
      const servicio = cita.servicio?.nombre || cita.servicio || "Servicio no definido";
      const cliente = cita.nombre_cliente || cita.id_usuario || "Cliente desconocido";
      const fecha = cita.fecha || "Fecha no definida";
      const hora = cita.hora || "Hora no definida";
      const barbero = cita.barbero?.nombre_barbero || cita.barbero?.nombre || cita.barbero || "Barbero no definido";

      const citaCard = document.createElement("div");
      citaCard.classList.add("cita-card");
      citaCard.innerHTML = `
        <div class="cita-card-header">
          <span class="cita-fecha">${fecha}</span>
          <span class="cita-hora">${hora}</span>
        </div>
        <div class="cita-card-body">
          <p><strong>Cliente:</strong> ${cliente}</p>
          <p><strong>Servicio:</strong> ${servicio}</p>
          <p><strong>Barbero:</strong> ${barbero}</p>
        </div>`;

      this.listaCitas.appendChild(citaCard);
    });
  }

  setFechaSeleccionada(fecha) {
    if (!fecha) {
      this.fechaSeleccionada.textContent = "Selecciona un día";
    } else {
      this.fechaSeleccionada.textContent = fecha;
    }
  }

  onPrevMes(callback) {
    if (this.prevBtn) this.prevBtn.addEventListener("click", callback);
  }

  onNextMes(callback) {
    if (this.nextBtn) this.nextBtn.addEventListener("click", callback);
  }
}
