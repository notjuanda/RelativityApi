const db = require('../models');
const DatosExperimento = db.DatosExperimento;
const Log = db.Log; // Para registrar logs
const path = require('path');
const fs = require('fs');
const csvParser = require('csv-parser');
const xlsx = require('xlsx');
const Experimento = db.Experimento;



// Validar si un valor es un número válido o asignar 0 por defecto
const validarNumero = (valor) => (isNaN(parseFloat(valor)) ? 0 : parseFloat(valor));

// Guardar datos del experimento con validación
exports.guardarDatos = async (req, res) => {
    const { id_experimento, x, y } = req.body;

    try {
        // Validar los valores recibidos
        const valorX = validarNumero(x);
        const valorY = validarNumero(y);

        const nuevoDato = await DatosExperimento.create({ 
            id_experimento, 
            x: valorX, 
            y: valorY 
        });

        // Registrar log de la acción
        await Log.create({
            id_experimento,
            accion: 'Registro de datos',
            descripcion: `Se registraron los valores x=${valorX}, y=${valorY} para el experimento ${id_experimento}.`
        });

        res.status(201).json(nuevoDato);
    } catch (error) {
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
            order: [['id_dato', 'ASC']],
        });
    
        if (datos.length === 0) {
            return res.status(200).json({ msg: 'Este experimento no tiene datos.', datos: [] });
        }
    
        res.status(200).json(datos);
        } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).json({ msg: 'Error al obtener los datos del experimento.' });
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

// Eliminar un dato por ID
exports.eliminarDato = async (req, res) => {
    const { id_dato } = req.params;
    try {
        const dato = await DatosExperimento.findByPk(id_dato);
        if (!dato) {
            return res.status(404).json({ msg: 'Dato no encontrado.' });
        }

        await dato.destroy();
        res.status(200).json({ msg: 'Dato eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el dato.', error: error.message });
    }
};

exports.uploadFile = async (req, res) => {
    try {
        // Verificar si se envió un archivo
        if (!req.files || !req.files.archivo) {
            await Log.create({
                accion: 'Error',
                descripcion: 'Intento de subida sin archivo adjunto.'
            });
            return res.status(400).json({ msg: 'No se ha enviado ningún archivo.' });
        }

        const archivo = req.files.archivo;
        const ext = path.extname(archivo.name);

        // Validar el tipo de archivo (solo CSV y XLSX)
        if (ext !== '.csv' && ext !== '.xlsx') {
            await Log.create({
                accion: 'Error',
                descripcion: `Archivo con extensión no permitida: ${ext}`
            });
            return res.status(400).json({ msg: 'Solo se permiten archivos CSV y XLSX.' });
        }

        // Ruta donde se guardará el archivo
        const uploadPath = path.join(__dirname, '..', 'public', 'uploads', archivo.name);

        // Mover el archivo a la carpeta 'public/uploads'
        archivo.mv(uploadPath, async (err) => {
            if (err) {
                console.error('Error al mover el archivo:', err);
                await Log.create({
                    accion: 'Error',
                    descripcion: `Error al mover el archivo: ${err.message}`
                });
                return res.status(500).json({ msg: 'Error al guardar el archivo.' });
            }

            // Procesar el archivo y extraer los datos
            let datos;
            if (ext === '.csv') {
                datos = await procesarCSV(uploadPath);
            } else if (ext === '.xlsx') {
                datos = await procesarXLSX(uploadPath);
            }

            // Crear el experimento en la base de datos
            const experimento = await Experimento.create({
                nombre: `Experimento - ${archivo.name}`,
                descripcion: `Datos importados desde ${archivo.name}`
            });

            // Guardar los datos del experimento en la base de datos
            for (const dato of datos) {
                await DatosExperimento.create({
                    id_experimento: experimento.id_experimento,
                    x: dato.x,
                    y: dato.y
                });
            }

            // Registrar log de la creación del experimento y subida del archivo
            await Log.create({
                id_experimento: experimento.id_experimento,
                accion: 'Creación de experimento y subida de archivo',
                descripcion: `Se creó el experimento ${experimento.nombre} con datos del archivo ${archivo.name}.`
            });

            res.status(200).json({
                msg: 'Archivo subido y procesado correctamente. Experimento creado.',
                experimento,
                datos
            });
        });
    } catch (error) {
        console.error('Error al subir y procesar el archivo:', error.message);
        await Log.create({
            accion: 'Error',
            descripcion: `Error inesperado: ${error.message}`
        });
        res.status(500).json({ msg: 'Error al subir y procesar el archivo.' });
    }
};

// Procesar archivo CSV: Extraer columnas 'x' e 'y'
const procesarCSV = (rutaArchivo) => {
    return new Promise((resolve, reject) => {
        const resultados = [];
        fs.createReadStream(rutaArchivo)
            .pipe(csvParser())
            .on('data', (data) => {
                if (data.x !== undefined && data.y !== undefined) {
                    resultados.push({ x: parseFloat(data.x), y: parseFloat(data.y) });
                }
            })
            .on('end', () => resolve(resultados))
            .on('error', (error) => reject(error));
    });
};

// Procesar archivo XLSX: Extraer columnas 'x' e 'y'
const procesarXLSX = (rutaArchivo) => {
    return new Promise((resolve, reject) => {
        try {
            const workbook = xlsx.readFile(rutaArchivo);
            const hoja = workbook.Sheets[workbook.SheetNames[0]]; // Leer la primera hoja
            const jsonData = xlsx.utils.sheet_to_json(hoja);

            const resultados = jsonData.map((row) => ({
                x: parseFloat(row.x),
                y: parseFloat(row.y),
            })).filter(row => !isNaN(row.x) && !isNaN(row.y)); // Filtrar valores inválidos

            resolve(resultados);
        } catch (error) {
            reject(error);
        }
    });
};
