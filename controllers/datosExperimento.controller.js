const db = require('../models');
const DatosExperimento = db.DatosExperimento;
const Log = db.Log; // Para registrar logs

// Guardar datos del experimento
exports.guardarDatos = async (req, res) => {
    const { id_experimento, x, y } = req.body;

    try {
        const nuevoDato = await DatosExperimento.create({ id_experimento, x, y });

        // Registrar log de la acción
        await Log.create({
            id_experimento,
            accion: 'Registro de datos',
            descripcion: `Se registraron los valores x=${x}, y=${y} para el experimento ${id_experimento}.`
        });

        res.status(201).json(nuevoDato);
    } catch (error) {
        // Registrar log del error
        await Log.create({
            accion: 'Error',
            descripcion: `Error al registrar datos: ${error.message}`
        });

        res.status(500).json({ msg: 'Error al guardar los datos' });
    }
};

// Obtener todos los datos de un experimento
exports.obtenerDatosPorExperimento = async (req, res) => {
    const { id_experimento } = req.params;

    try {
        const datos = await DatosExperimento.findAll({ 
            where: { id_experimento },
            order: [['id_dato', 'ASC']]
        });

        if (datos.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron datos para este experimento.' });
        }

        res.json(datos);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener los datos' });
    }
};

// Editar un dato del experimento
exports.editarDato = async (req, res) => {
    try {
        const { id_dato } = req.params;
        const { x, y } = req.body;

        const dato = await DatosExperimento.findByPk(id_dato);
        if (!dato) {
        return res.status(404).json({ msg: 'Dato no encontrado.' });
        }
        
        dato.x = x;
        dato.y = y;
        await dato.save();

        res.json({ msg: 'Dato actualizado con éxito.', dato });
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el dato.', error });
    }
};
