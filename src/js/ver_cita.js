import { VerCitasModel } from './models/ver_citaModel.js';
import { VerCitasView } from './views/ver_citaView.js';
import { VerCitasController } from './controllers/ver_citaController.js';

document.addEventListener("DOMContentLoaded", () => {
    // Instancia el modelo que gestionará el almacenamiento
    const model = new VerCitasModel();
    
    // Instancia la vista encargada del DOM
    const view = new VerCitasView();
    
    // Une los componentes mediante el controlador central
    new VerCitasController(model, view);
});