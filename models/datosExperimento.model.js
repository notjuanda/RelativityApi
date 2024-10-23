module.exports = (sequelize, DataTypes) => {
    const DatosExperimento = sequelize.define('DatosExperimento', {
        id_dato: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_experimento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Experimento',
                key: 'id_experimento'
            },
            onDelete: 'CASCADE'
        },
        x: {
            type: DataTypes.NUMERIC,
            allowNull: false
        },
        y: {
            type: DataTypes.NUMERIC,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return DatosExperimento;
};
