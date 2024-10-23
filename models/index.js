const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

// Inicialización de Sequelize
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "postgres",  // Cambiado a PostgreSQL
        logging: false,        // Opcional: desactivar logs de SQL
    }
);

const db = {};

// Guardamos las instancias de Sequelize
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importamos los modelos y aplicamos `freezeTableName: true`
db.Experimento = require("./experimento.model")(sequelize, DataTypes);
db.DatosExperimento = require("./datosExperimento.model")(sequelize, DataTypes);
db.ResultadosExperimento = require("./resultadosExperimento.model")(sequelize, DataTypes);
db.Log = require("./log.model")(sequelize, DataTypes);

// **Definición de Relaciones entre Modelos**

// Relación uno a muchos: Experimento -> DatosExperimento
db.Experimento.hasMany(db.DatosExperimento, { foreignKey: "id_experimento" });
db.DatosExperimento.belongsTo(db.Experimento, { foreignKey: "id_experimento" });

// Relación uno a uno: Experimento -> ResultadosExperimento
db.Experimento.hasOne(db.ResultadosExperimento, { foreignKey: "id_experimento" });
db.ResultadosExperimento.belongsTo(db.Experimento, { foreignKey: "id_experimento" });

// Relación uno a muchos: Experimento -> Log
db.Experimento.hasMany(db.Log, { foreignKey: "id_experimento" });
db.Log.belongsTo(db.Experimento, { foreignKey: "id_experimento" });

module.exports = db;
