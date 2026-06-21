import { Cita } from "./models/citaModel.js";
import { CitaView } from "./views/citaView.js";
import { CitaController } from "./controllers/citaController.js";
import RegistroController from "./controllers/Registro.js";
import LoginController from "./controllers/Login.js";
import { AuthController } from "./controllers/authController.js"; // Nuevo

// Inicializar componentes globales (como la barra de navegación/auth)
new AuthController();

// Inicializar controladores específicos por página
const isCitasPage =
  document.getElementById("lista-servicios") &&
  document.getElementById("lista-barberos") &&
  document.getElementById("calendar-days");

if (isCitasPage) {
  const model = new Cita();
  const view = new CitaView();
  new CitaController(model, view);
}

if (document.getElementById("registro")) {
  new RegistroController();
}

if (document.getElementById("loginForm")) {
  new LoginController();
}
