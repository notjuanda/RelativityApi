module.exports = (app) => {
    const datosController = require("../controllers/datosExperimento.controller.js");
    const router = require("express").Router();

    // Ruta para guardar datos del experimento
    router.post('/', datosController.guardarDatos);

    // Ruta para obtener todos los datos de un experimento específico
    router.get('/:id_experimento', datosController.obtenerDatosPorExperimento);

    app.use('/api/datos', router);
};
