//'INSERT INTO reservas SET ?';
var express = require('express');
var Inserir = express.Router();
//var Reserva = getmodule('api/api');

//CONEXAO SERVER.
var mysql = require('mysql');
var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '123456',
   port : 3306, //port mysql
   database:'api'
});
Inserir.post('/:data/:pauta/:participantes/:responsavel/:sala/:horario', function(req, res){
    var data = req.params.data;
    var pauta = req.params.pauta.replace(/[:%20]/g, ' ');
    var participantes = req.params.participantes.replace(/[:%20]/g, ' ');
    var responsavel = req.params.responsavel.replace(/[:%20]/g, ' ');
    //var sala = req.params.sala.replace(/%20/gi, " ");
    var sala = req.params.sala;
    var hora = req.params.horario;
    console.log(sala);
    console.log(hora);

    //connection.query('SET @sala = (SELECT id FROM salas WHERE nomeSala LIKE ?)',[sala + '%'],function(err,result){
      connection.query('SET @responsavel = (SELECT id FROM usuarios WHERE nome LIKE ?)',[responsavel + '%'],function(err,result){
        //connection.query('SET @horario = (SELECT id FROM horarios WHERE hora LIKE ?)',[hora + '%'],function(err,result){
          connection.query('INSERT INTO reunioes SET dia = ?, pauta = ?, integranteId = ?, responsavelId = @responsavel, salasId = ?, horariosId = ?',[data, pauta, participantes, sala, hora],function(err,result){
            if (err) throw err;
            res.sendStatus(200);
    	});
    });
});

module.exports = Inserir;