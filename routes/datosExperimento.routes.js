module.exports = (app) => {
    const datosController = require("../controllers/datosExperimento.controller.js");
    const router = require("express").Router();

    // Ruta para guardar datos del experimento
    router.post('/', datosController.guardarDatos);

    // Ruta para obtener todos los datos de un experimento específico
    router.get('/:id_experimento', datosController.obtenerDatosPorExperimento);

    // Ruta para editar un dato del experimento
    router.put('/:id_dato', datosController.editarDato);

    // Ruta para eliminar un dato del experimento
    router.delete('/:id_dato', datosController.eliminarDato);


    app.use('/api/datos', router);
};
