module.exports = (app) => {
    const experimentoController = require("../controllers/experimento.controller.js");
    const router = require("express").Router();

    // Crear un nuevo experimento
    router.post('/', experimentoController.crearExperimento);

    // Obtener todos los experimentos
    router.get('/', experimentoController.obtenerTodos);

    // Obtener un experimento por ID
    router.get('/:id', experimentoController.obtenerPorID);

    // Eliminar un experimento por ID
    router.delete('/:id', experimentoController.eliminarExperimento);

    // Editar un experimento por ID
    router.put('/:id', experimentoController.editarExperimento);

    app.use('/api/experimentos', router);
};
