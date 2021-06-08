var mongoose = require('mongoose');
const Resena = require('../models/Reseña');

//GETALL
exports.findAllResenas = function(req, res) {
    Resena.find(function(err, resenas) {
    if(err) res.send(500, err.message);

    console.log('GET /resenas')
        res.status(200).jsonp(resenas);
    });
};
//getByID
exports.findById = function(req, res) {
    Resena.findById(req.params.id, function(err, resena) {
        if(err) return res.send(500, err.message);
    
        console.log('GET /user/' + req.params.id);
            res.status(200).jsonp(resena);
        });
    };

//POST - Insert 
exports.addResena = function(req, res) {
        console.log('POST');
        console.log(req.body);
    
        var resena = new Resena({
            _id:  req.body._id,  
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
        user._id=  req.body._id;  
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