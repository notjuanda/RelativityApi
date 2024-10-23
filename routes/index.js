module.exports = app => {
    require('./experimento.routes')(app);
    require('./datosExperimento.routes')(app);
    require('./resultadosExperimento.routes')(app);
    require('./log.routes')(app);
};
