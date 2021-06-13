var mongoose = require('mongoose');
const Comentario = require('../models/Comentario');
var uuid = require('uuid');

//GETALL
exports.findAllComentarios = function(req, res) {
    Comentario.find(function(err, comentarios) {
    if(err) res.send(500, err.message);
    console.log('GET /comentarios')
        res.status(200).jsonp(comentarios);
    });
};
//getByID
exports.findById = function(req, res) {
    Comentario.findById(req.params.id, function(err, comentario) {
        if(err) return res.send(500, err.message);
    
        console.log('GET /comentario/' + req.params.id);
            res.status(200).jsonp(comentario);
        });
    };

//POST - Insert 
exports.addComentario = function(req, res) {
        console.log('POST');
        console.log(req.body);
        var dat= new Date().toISOString().slice(0, 10);
    var uuid = require('uuid');
        var comentario = new Comentario({
            _id:  uuid.v4(),
            _idUsuario:req.body._idUsuario,
            _idResena: req.body._idResena ,
            _fecha: dat,
            _comentario:req.body._comentario
        });

        comentario.save(function(err, comentario) {
            if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(comentario);
        });
    };

    //DELETE - Delete 
exports.deleteComentario = function(req, res) {
    Comentario.findById(req.body._id, function(err, comentario) {
        console.log("here",req.query.id);
        comentario.remove(function(err) {
                if(err) return res.status(500).send(err.message);
          res.status(200).send("200");
            })
        });
    };