const db = require('../models');
const Log = db.Log;

// Obtener todos los logs ordenados por fecha
exports.obtenerLogs = async (req, res) => {
    try {
        const logs = await Log.findAll({ order: [['fecha', 'DESC']] });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener los logs', error: error.message });
    }
};

// Registrar un log de forma dinámica
exports.registrarLog = async (id_experimento, accion, descripcion) => {
    try {
        await Log.create({
            id_experimento,
            accion,
            descripcion
        });
        console.log(`Log registrado: ${accion} - ${descripcion}`);
    } catch (error) {
        console.error('Error al registrar log:', error.message);
    }
};
