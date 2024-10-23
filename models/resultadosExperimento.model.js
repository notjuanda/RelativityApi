module.exports = (sequelize, DataTypes) => {
    const ResultadosExperimento = sequelize.define('ResultadosExperimento', {
        id_resultado: {
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
        sxx: DataTypes.NUMERIC,
        syy: DataTypes.NUMERIC,
        sxy: DataTypes.NUMERIC,
        r: DataTypes.NUMERIC,
        r2: DataTypes.NUMERIC,
        uno_menos_r2: DataTypes.NUMERIC,
        fecha_calculo: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return ResultadosExperimento;
};
