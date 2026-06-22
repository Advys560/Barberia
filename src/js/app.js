import { Cita } from "./models/citaModel.js";
import { CitaView } from "./views/citaView.js";
import { CitaController } from "./controllers/citaController.js";
import RegistroController from "./controllers/Registro.js";
import LoginController from "./controllers/Login.js";
import { AuthController } from "./controllers/authController.js";
import { BarberoModel } from "./models/barberoModel.js";
import { BarberoView } from "./views/barberoView.js";
import { BarberoController } from "./controllers/barberoController.js";

// Inicializar componentes globales
new AuthController();

// Inicializar controladores específicos por página
const isCitasPage =
  document.getElementById("lista-servicios") &&
  document.getElementById("lista-barberos") &&
  document.getElementById("calendar-days");

if (isCitasPage) {
  const model = new Cita();
  const view = new CitaView();
  new CitaController(model, view); // 👈 El controlador se encargará del botón internamente
}

const isBarberoPage =
  document.getElementById("calendar-days-barbero") &&
  document.getElementById("lista-citas-barbero");

if (isBarberoPage) {
  const model = new BarberoModel();
  const view = new BarberoView();
  new BarberoController(model, view);
}

if (document.getElementById("registro")) {
  new RegistroController();
}

if (document.getElementById("loginForm")) {
  new LoginController();
}