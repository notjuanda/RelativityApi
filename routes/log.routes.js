module.exports = (app) => {
    const logController = require("../controllers/log.controller.js");
    const router = require("express").Router();

    // Ruta para obtener todos los logs
    router.get('/', logController.obtenerLogs);

    app.use('/api/logs', router);
};
