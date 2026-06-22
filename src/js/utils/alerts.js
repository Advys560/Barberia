// utils/alerts.js
export function redirectAlert(mensaje, icon, citaObj) {
  const resumen = citaObj.getResumen();

  Swal.fire({
    title: mensaje,
    icon: icon,
    html: `
      <div style="text-align: left; background: #1a1a1a; padding: 15px; border-radius: 8px; border: 1px solid #C5A059; margin-top: 15px; font-family: 'Montserrat', sans-serif; color: #E5E5E5;">
        <p style="margin-bottom: 10px;"><strong style="color: #C5A059;">✂️ Servicio:</strong> ${resumen.servicio}</p>
        <p style="margin-bottom: 10px;"><strong style="color: #C5A059;">💈 Barbero:</strong> ${resumen.barbero}</p>
        <p style="margin-bottom: 10px;"><strong style="color: #C5A059;">📅 Fecha:</strong> ${resumen.fecha}</p>
        <p style="margin-bottom: 0;"><strong style="color: #C5A059;">⏰ Hora:</strong> ${resumen.hora} p.m</p>
      </div>
    `,
    background: '#000000',
    color: '#E5E5E5',
    
    // Configuración personalizada de botones permanentes
    showCancelButton: true,
    confirmButtonColor: '#C5A059',
    cancelButtonColor: '#2d2c2c',
    confirmButtonText: 'Agendar otra cita',
    cancelButtonText: 'Volver al inicio',
    
    // Evita cierres accidentales fuera de la ventana
    allowOutsideClick: false,
    allowEscapeKey: false,

    showClass: {
      popup: `animate__animated animate__fadeInUp animate__faster`,
    },
    hideClass: {
      popup: `animate__animated animate__fadeOutDown animate__faster`,
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Recargar la página actual para agendar una nueva cita limpia
      window.location.reload();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Regresar a la página de bienvenida principal
      window.location.href = '../../index.html'; 
    }
  });
}