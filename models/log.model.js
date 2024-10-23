module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('Log', {
        id_log: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_experimento: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Experimento',
                key: 'id_experimento'
            },
            onDelete: 'SET NULL'
        },
        accion: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        descripcion: DataTypes.TEXT,
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Log;
};
