import { Cita } from "./models/citaModel.js";
import { CitaView } from "./views/citaView.js";
import { CitaController } from "./controllers/citaController.js";

const model = new Cita();
const view = new CitaView();

new CitaController(model, view);