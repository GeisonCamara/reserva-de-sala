module.exports = function(server) {
    var express = require('express');
    var Busca = require ('../routes/busca');
    var Participante = require ('../routes/participante');
    var Sala = require ('../routes/sala');
    var Data = require ('../routes/data');
    var Responsavel = require ('../routes/responsavel');
    var Inserir = require ('../routes/inserir');
    var Deletar = require ('../routes/deletar');

    server.use('/busca', Busca);
    server.use('/participante', Participante);
    server.use('/sala', Sala);
    server.use('/data', Data);
    server.use('/responsavel', Responsavel);
    server.use('/inserir', Inserir);
    server.use('/deletar', Deletar);
};