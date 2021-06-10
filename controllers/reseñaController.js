var mongoose = require('mongoose');
const Resena = require('../models/Reseña');
const {Contenido, ContenidoSchema} = require('../models/Contenido');
var uuid = require('uuid');

//GETALL
exports.findAllResenas = async (req, res) => {
    Resena.find({}, async (err, resenas) => {
    if(err) res.send(500, err.message);
    for(let item in resenas){
        let content = await Contenido.find({'_id':resenas[item]['_idContenido']}).lean().exec();
            resenas[item]['_contenido'] = content;
    }

    console.log('GET /resenas')
        res.status(200).jsonp(resenas);
    });
};
//getByID
exports.findById = function(req, res) {
    Resena.findById(req.params.id, function(err, resena) {
        if(err) return res.send(500, err.message);
    
        console.log('GET /resenas/' + req.params.id);
            res.status(200).jsonp(resena);
        });
    };

//POST - Insert 
exports.addResena = function(req, res) {
        console.log('POST');
        console.log(req.body);
    var uuid = require('uuid');
        var resena = new Resena({
            _id:  uuid.v4(),  
            _nombre:    req.body._nombre,
            _apellido: req.body._apellido,
            _fechaNacimiento: req.body._fechaNacimiento,
            _correo: req.body._correo,
            _contrasena: req.body._contrasena,
            _url: req.body._url,
        });
    
        resena.save(function(err, resena) {
            if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(resena);
        });
    };

    //PUT - Update a register already exists
exports.updateResena = function(req, res) {
    Resena.findById(req.params.id, function(err, user) {
        user._nombre=    req.body._nombre;  
        user._apellido= req.body._apellido;  
        user._fechaNacimiento= req.body._fechaNacimiento;  
        user._correo= req.body._correo;  
        user._contrasena= req.body._contrasena;  
        user._url= req.body._url;  
        user.save(function(err) {
                if(err) return res.status(500).send(err.message);
          res.status(200).jsonp(user);
            });
        });
    };

    //DELETE - Delete 
exports.deleteResena = function(req, res) {
    Resena.findById(req.params.id, function(err, user) {
            user.remove(function(err) {
                if(err) return res.status(500).send(err.message);
          res.status(200).send();
            })
        });
    };

    //getAllResenasDeContenidoByIDUsuario
exports.findResenasPorContenidosUsuario = function(req, res) {
    idContenidos= [];
    Resena.find({
        _idUsuario: req.body._idUsuario
      }, function(err, resenas) {
        if(err) return res.send(500, err.message);
    
        for(let item in resenas){
          idContenidos.push(item._idContenido);
        }
console.log("here",idContenidos);
        Resena.find({_idContenido: { $all : idContenidos }},function(err,resenasFinal){
            if(err){
                console.log("trono en la query contenidos");
                return res.send(500, err.message);
            } 
            console.log('GET /resenas/ContenidosUsuario' + req.params.id);
            res.status(200).jsonp(resenasFinal);
        });
        });
        
    };