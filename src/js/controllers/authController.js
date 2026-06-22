import { AuthView } from "../views/authView.js";

export class AuthController {
  constructor() {
    this.view = new AuthView();

    // Si la barra de navegación no está en esta página, no hace nada
    if (!this.view.existeNavbar()) return;

    this.verificarEstadoAuth();
    this.asociarEventos();
  }

  verificarEstadoAuth() {
    // El controlador accede a los datos (Simulando el Modelo)
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Le dice a la vista qué renderizar basado en los datos
    this.view.mostrarInterfazUsuarioLogueado(!!usuarioActivo);

    // Cambiar el botón principal en la página de inicio si existe
    try {
      const mainBtn =
        document.querySelector(".hero-content .btn-main") ||
        document.querySelector(".btn-main");
      if (mainBtn) {
        if (usuarioActivo) {
          // usuario logueado -> cambiar a Agendar Cita
          // ajustar ruta relativa según ubicación actual
          const currentPath = window.location.pathname;
          if (
            currentPath.endsWith("index.html") ||
            currentPath === "/" ||
            currentPath.includes("\\\\")
          ) {
            mainBtn.setAttribute("href", "src/hver_citas.html");
          } else {
            // si estamos dentro de /src/html/ (otras páginas), usar ruta relativa
            mainBtn.setAttribute("href", "ver_citas.html");
          }
          mainBtn.textContent = "Agendar Cita";
        } else {
          // no logueado -> volver a iniciar sesión
          mainBtn.setAttribute("href", "./src/html/Inicio_Sesion.html");
          mainBtn.textContent = "Iniciar Sesión";
        }
      }
    } catch (err) {
      // no crítico
      console.warn("No se pudo actualizar el botón principal:", err);
    }

    // Ajustar el enlace "Ver Citas" para cada rol
    try {
      const verCitasLinks = document.querySelectorAll(
        'a.link-item[href*="ver_citas"]',
      );
      if (verCitasLinks.length > 0 && usuarioActivo) {
        verCitasLinks.forEach((link) => {
          const currentPath = window.location.pathname;

          if (usuarioActivo.admin) {
            // El admin usa ver_citas.html
            if (currentPath.endsWith("index.html") || currentPath === "/") {
              link.setAttribute("href", "src/html/ver_citas.html");
            } else if (currentPath.includes("/src/html/")) {
              link.setAttribute("href", "./ver_citas.html");
            }
          } else if (usuarioActivo.role === "barbero") {
            // Los barberos van a su panel
            if (currentPath.endsWith("index.html") || currentPath === "/") {
              link.setAttribute("href", "src/html/barbero.html");
            } else if (currentPath.includes("/src/html/")) {
              link.setAttribute("href", "./barbero.html");
            }
          }
        });
      }
    } catch (err) {
      // no crítico
      console.warn("No se pudo ajustar el enlace Ver Citas:", err);
    }
  }

  asociarEventos() {
    // Escucha la acción de la vista y ejecuta la lógica de negocio
    this.view.onLogout(() => {
      localStorage.removeItem("usuarioActivo");
      this.verificarEstadoAuth(); // Redibuja la interfaz tras cerrar sesión

      const currentPath = window.location.pathname;
      if (currentPath.includes("/src/html/")) {
        window.location.href = "../../index.html";
      } else {
        window.location.href = "index.html";
      }
    });
  }
}
