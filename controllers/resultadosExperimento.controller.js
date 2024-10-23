const db = require('../models');
const DatosExperimento = db.DatosExperimento;
const Log = db.Log;

// Función auxiliar para obtener los datos
async function obtenerDatos(id_experimento) {
    const datos = await DatosExperimento.findAll({ where: { id_experimento } });
    if (datos.length === 0) {
        throw new Error('No se encontraron datos para este experimento.');
    }
    return datos;
}

// Calcular Sxx manualmente
exports.obtenerSxx = async (req, res) => {
    try {
        const datos = await obtenerDatos(req.params.id_experimento);
        let Sxx = 0;
        for (const { x } of datos) {
            Sxx += x * x;
        }
        res.json({ Sxx });

        await Log.create({
            id_experimento: req.params.id_experimento,
            accion: 'Cálculo de Sxx',
            descripcion: `Se calculó Sxx para el experimento ${req.params.id_experimento}.`
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Calcular Syy manualmente
exports.obtenerSyy = async (req, res) => {
    try {
        const datos = await obtenerDatos(req.params.id_experimento);
        let Syy = 0;
        for (const { y } of datos) {
            Syy += y * y;
        }
        res.json({ Syy });

        await Log.create({
            id_experimento: req.params.id_experimento,
            accion: 'Cálculo de Syy',
            descripcion: `Se calculó Syy para el experimento ${req.params.id_experimento}.`
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Calcular Sxy manualmente
exports.obtenerSxy = async (req, res) => {
    try {
        const datos = await obtenerDatos(req.params.id_experimento);
        let Sxy = 0;
        for (const { x, y } of datos) {
            Sxy += x * y;
        }
        res.json({ Sxy });

        await Log.create({
            id_experimento: req.params.id_experimento,
            accion: 'Cálculo de Sxy',
            descripcion: `Se calculó Sxy para el experimento ${req.params.id_experimento}.`
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Calcular r manualmente
exports.obtenerR = async (req, res) => {
    try {
        const datos = await obtenerDatos(req.params.id_experimento);
        let Sxx = 0, Syy = 0, Sxy = 0;
        for (const { x, y } of datos) {
            Sxx += x * x;
            Syy += y * y;
            Sxy += x * y;
        }
        const r = Sxy / Math.sqrt(Sxx * Syy);
        res.json({ r });

        await Log.create({
            id_experimento: req.params.id_experimento,
            accion: 'Cálculo de r',
            descripcion: `Se calculó r para el experimento ${req.params.id_experimento}.`
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Calcular R² manualmente
exports.obtenerR2 = async (req, res) => {
    try {
        const datos = await obtenerDatos(req.params.id_experimento);
        let Sxx = 0, Syy = 0, Sxy = 0;
        for (const { x, y } of datos) {
            Sxx += x * x;
            Syy += y * y;
            Sxy += x * y;
        }
        const r = Sxy / Math.sqrt(Sxx * Syy);
        const R2 = r * r;
        res.json({ R2 });

        await Log.create({
            id_experimento: req.params.id_experimento,
            accion: 'Cálculo de R²',
            descripcion: `Se calculó R² para el experimento ${req.params.id_experimento}.`
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Calcular 1 - R² manualmente
exports.obtenerUnoMenosR2 = async (req, res) => {
    try {
        const datos = await obtenerDatos(req.params.id_experimento);
        let Sxx = 0, Syy = 0, Sxy = 0;
        for (const { x, y } of datos) {
            Sxx += x * x;
            Syy += y * y;
            Sxy += x * y;
        }
        const r = Sxy / Math.sqrt(Sxx * Syy);
        const R2 = r * r;
        const unoMenosR2 = 1 - R2;
        res.json({ unoMenosR2 });

        await Log.create({
            id_experimento: req.params.id_experimento,
            accion: 'Cálculo de 1 - R²',
            descripcion: `Se calculó 1 - R² para el experimento ${req.params.id_experimento}.`
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Obtener todos los resultados en un solo endpoint
exports.obtenerTodosLosResultados = async (req, res) => {
    try {
        const datos = await obtenerDatos(req.params.id_experimento);
        
        let Sxx = 0, Syy = 0, Sxy = 0;
        for (const { x, y } of datos) {
            Sxx += x * x;
            Syy += y * y;
            Sxy += x * y;
        }

        const r = Sxy / Math.sqrt(Sxx * Syy);
        const R2 = r * r;
        const unoMenosR2 = 1 - R2;

        const resultados = {
            Sxx,
            Syy,
            Sxy,
            r,
            R2,
            unoMenosR2
        };

        res.json(resultados);

        await Log.create({
            id_experimento: req.params.id_experimento,
            accion: 'Cálculo completo',
            descripcion: `Se calcularon todos los resultados para el experimento ${req.params.id_experimento}.`
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
