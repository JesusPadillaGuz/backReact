
var mongoose = require('mongoose');
const Resena = require('../models/Reseña');
var emit = require('../app');
const Contenido = require('../models/Contenido');
var uuid = require('uuid');

exports.getAllScoresByContentId = function(req, res) {

    Resena.find({_idContenido: req.query.id}, async (err, resenas)=> {
        if(err) return res.send(500, err.message);
        var counterScore ={
            "1star":0,
            "2star":0,
            "3star":0,
            "4star":0,
            "5star":0
        };
        for(let item in resenas){
            switch(resenas[item]['_calificacion']){
                case 1:counterScore['1star']+=1;
                break;
                case 2:counterScore['2star']+=1;
                break;
                case 3:counterScore['3star']+=1;
                break;
                case 4:counterScore['4star']+=1;
                break;
                case 5:counterScore['5star']+=1;
                break;
            }
        }
        emit(counterScore,req.query.id);
        console.log('this',counterScore);
        console.log('GET /contenidos/calificaciones')
        res.status(200).jsonp(counterScore);

    });
}

//GETALL
exports.findAllContenidos = function(req, res) {
    Contenido.find(function(err, contents) {
    if(err) res.send(500, err.message);

    console.log('GET /contents')
        res.status(200).jsonp(contents);
    });
};
//getByID
exports.findById = function(req, res) {
    Contenido.findById(req.params.id, function(err, content) {
        if(err) return res.send(500, err.message);
    
        console.log('GET /content/' + req.params.id);
            res.status(200).jsonp(content);
        });
    };
 
//POST - Insert 
exports.addContenido = function(req, res) {
        console.log('POST');
     
    
        var contenido = new Contenido({
            _id:  uuid.v4(),  
            _titulo:    req.body._titulo,
            _categoria: req.body._categoria,
            _url: req.body._url
        });

        console.log("contenido", contenido);
        contenido.save(function(err, contenido) {
            if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(contenido);
        });
    };

    //PUT - Update a register already exists
exports.updateContenido = function(req, res) {
    Contenido.findById(req.params.id, function(err, contenido) {
        contenido._id=  req.body._id;  
        contenido._titulo=  req.body._titulo;  
        contenido._categoria= req.body._categoria;  
        contenido._url= req.body._url;  
        contenido.save(function(err) {
                if(err) return res.status(500).send(err.message);
          res.status(200).jsonp(contenido);
            });
        });
    };

    //DELETE - Delete 
exports.deleteContenido = function(req, res) {
    Contenido.findById(req.query.id, function(err, contenido) {
        contenido.remove(function(err) {
                if(err) return res.status(500).send(err.message);
          res.status(200).send();
            })
        });
    };