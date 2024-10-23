const db = require('../models');
const Experimento = db.Experimento;
const Log = db.Log; // Para registrar logs

// Crear un nuevo experimento
exports.crearExperimento = async (req, res) => {
    const { nombre, descripcion } = req.body;

    try {
        const nuevoExperimento = await Experimento.create({ nombre, descripcion });

        // Registrar log de la acción
        await Log.create({
            id_experimento: nuevoExperimento.id_experimento,
            accion: 'Creación de experimento',
            descripcion: `Se creó el experimento ${nombre}.`
        });

        res.status(201).json(nuevoExperimento);
    } catch (error) {
        // Registrar log del error
        await Log.create({
            accion: 'Error',
            descripcion: `Error al crear experimento: ${error.message}`
        });

        res.status(500).json({ msg: 'Error al crear el experimento' });
    }
};

// Obtener todos los experimentos
exports.obtenerTodos = async (req, res) => {
    try {
        const experimentos = await Experimento.findAll({ order: [['fecha_creacion', 'DESC']] });
        res.json(experimentos);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener los experimentos' });
    }
};

// Obtener un experimento por ID
exports.obtenerPorID = async (req, res) => {
    const { id } = req.params;

    try {
        const experimento = await Experimento.findByPk(id);
        if (!experimento) {
            return res.status(404).json({ msg: 'Experimento no encontrado.' });
        }

        res.json(experimento);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener el experimento' });
    }
};

// Editar un experimento por ID
exports.editarExperimento = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const experimento = await Experimento.findByPk(id);
        if (!experimento) {
            return res.status(404).json({ msg: 'Experimento no encontrado.' });
        }

        experimento.nombre = nombre || experimento.nombre;
        experimento.descripcion = descripcion || experimento.descripcion;
        await experimento.save();

        await Log.create({
            id_experimento: experimento.id_experimento,
            accion: 'Edición de experimento',
            descripcion: `Se editó el experimento ${id} con nombre ${nombre}.`
        });

        res.json({ msg: 'Experimento actualizado con éxito.', experimento });
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el experimento.' });
    }
};

// Eliminar un experimento por ID
exports.eliminarExperimento = async (req, res) => {
    const { id } = req.params;

    try {
        const experimento = await Experimento.findByPk(id);
        if (!experimento) {
            return res.status(404).json({ msg: 'Experimento no encontrado.' });
        }

        await experimento.destroy();

        // Registrar log de la acción
        await Log.create({
            accion: 'Eliminación de experimento',
            descripcion: `Se eliminó el experimento con ID ${id}.`
        });

        res.status(200).json({ msg: 'Experimento eliminado con éxito.' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el experimento' });
    }
};
