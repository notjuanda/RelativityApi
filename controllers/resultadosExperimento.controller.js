const db = require('../models');
const DatosExperimento = db.DatosExperimento;
const Log = db.Log;

// Función auxiliar para obtener los datos del experimento
async function obtenerDatos(id_experimento) {
    return await DatosExperimento.findAll({ where: { id_experimento } });
}

// Función auxiliar para calcular Sxx
async function calcularSxx(datos) {
    let sumX = 0, sumX2 = 0;
    const n = datos.length;

    datos.forEach(d => {
        d.x = Number(d.x);
        sumX += d.x;
        sumX2 += d.x * d.x;
    });

    return sumX2 - (sumX * sumX) / n;
}

// Función auxiliar para calcular Syy
async function calcularSyy(datos) {
    let sumY = 0, sumY2 = 0;
    const n = datos.length;

    datos.forEach(d => {
        d.y = Number(d.y);
        sumY += d.y;
        sumY2 += d.y * d.y;
    });

    return sumY2 - (sumY * sumY) / n;
}

// Función auxiliar para calcular Sxy
async function calcularSxy(datos) {
    let sumX = 0, sumY = 0, sumXY = 0;
    const n = datos.length;

    datos.forEach(d => {
        d.x = Number(d.x);
        d.y = Number(d.y);
        sumX += d.x;
        sumY += d.y;
        sumXY += d.x * d.y;
    });

    return sumXY - (sumX * sumY) / n;
}

// Endpoint para obtener Sxx
exports.obtenerSxx = async (req, res) => {
    try {
        const datos = await obtenerDatos(req.params.id_experimento);
        if (datos.length === 0) {
            return res.status(400).json({ msg: 'No hay datos disponibles para calcular Sxx.' });
        }

        const Sxx = await calcularSxx(datos);
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

// Endpoint para obtener Syy
exports.obtenerSyy = async (req, res) => {
    try {
        const datos = await obtenerDatos(req.params.id_experimento);
        if (datos.length === 0) {
            return res.status(400).json({ msg: 'No hay datos disponibles para calcular Syy.' });
        }

        const Syy = await calcularSyy(datos);
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

// Endpoint para obtener Sxy
exports.obtenerSxy = async (req, res) => {
    try {
        const datos = await obtenerDatos(req.params.id_experimento);
        if (datos.length === 0) {
            return res.status(400).json({ msg: 'No hay datos disponibles para calcular Sxy.' });
        }

        const Sxy = await calcularSxy(datos);
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

// Endpoint para obtener r
exports.obtenerR = async (req, res) => {
    try {
        const datos = await obtenerDatos(req.params.id_experimento);
        const Sxx = await calcularSxx(datos);
        const Syy = await calcularSyy(datos);
        const Sxy = await calcularSxy(datos);

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

// Endpoint para obtener R²
exports.obtenerR2 = async (req, res) => {
    try {
        const datos = await obtenerDatos(req.params.id_experimento);
        const Sxx = await calcularSxx(datos);
        const Syy = await calcularSyy(datos);
        const Sxy = await calcularSxy(datos);

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

// Endpoint para obtener 1 - R²
exports.obtenerUnoMenosR2 = async (req, res) => {
    try {
        const datos = await obtenerDatos(req.params.id_experimento);
        const Sxx = await calcularSxx(datos);
        const Syy = await calcularSyy(datos);
        const Sxy = await calcularSxy(datos);

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

// Endpoint para obtener todos los resultados
exports.obtenerTodosLosResultados = async (req, res) => {
    try {
        const datos = await obtenerDatos(req.params.id_experimento);
        if (datos.length === 0) {
            return res.status(200).json({ msg: 'Este experimento no tiene datos aún.', resultados: null });
        }

        const Sxx = await calcularSxx(datos);
        const Syy = await calcularSyy(datos);
        const Sxy = await calcularSxy(datos);
        const r = Sxy / Math.sqrt(Sxx * Syy);
        const R2 = r * r;
        const unoMenosR2 = 1 - R2;

        const resultados = { Sxx, Syy, Sxy, r, R2, unoMenosR2 };
        res.json(resultados);

        await Log.create({
            id_experimento: req.params.id_experimento,
            accion: 'Cálculo completo',
            descripcion: `Se calcularon todos los resultados para el experimento ${req.params.id_experimento}.`
        });
    } catch (error) {
        console.error('Error al obtener los resultados:', error);
        res.status(500).json({ msg: 'Error al obtener los resultados del experimento.' });
    }
};
