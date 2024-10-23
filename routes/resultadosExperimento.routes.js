module.exports = (app) => {
    const resultadosController = require("../controllers/resultadosExperimento.controller.js");
    const router = require("express").Router();

    // Rutas para obtener cada cálculo individualmente

    // Obtener Sxx
    router.get('/:id_experimento/sxx', resultadosController.obtenerSxx);

    // Obtener Syy
    router.get('/:id_experimento/syy', resultadosController.obtenerSyy);

    // Obtener Sxy
    router.get('/:id_experimento/sxy', resultadosController.obtenerSxy);

    // Obtener r (coeficiente de correlación)
    router.get('/:id_experimento/r', resultadosController.obtenerR);

    // Obtener R² (coeficiente de determinación)
    router.get('/:id_experimento/r2', resultadosController.obtenerR2);

    // Obtener 1 - R²
    router.get('/:id_experimento/uno_menos_r2', resultadosController.obtenerUnoMenosR2);

    //todos los resultados
    router.get('/:id_experimento/todos', resultadosController.obtenerTodosLosResultados);

    app.use('/api/resultados', router);
};
