var mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
//var Usuario  = mongoose.model('Usuario');
var uuid = require('uuid');


//GETALL
exports.findAllUsers = function(req, res) {
    Usuario.find(function(err, users) {
    if(err) res.send(500, err.message);

    console.log('GET /users')
        res.status(200).jsonp(users);
    });
};
//getByID
exports.findById = function(req, res) {
    Usuario.findById(req.params.id, function(err, user) {
        if(err) return res.send(500, err.message);
    
        console.log('GET /user/' + req.params.id);
            res.status(200).jsonp(user);
        });
    };

    exports.loginUser = function(req, res) {
        console.log("params", req.body);
        Usuario.findOne({_correo: req.body._correo, _contrasena: req.body._contrasena}, function(err, user) {
            if(err) return res.send(500, err.message);
        
            console.log('POST /login/' + req.body._correo);
                res.status(200).jsonp(user);
            });
        };  
//POST - Insert 
exports.addUser = function(req, res) {
        console.log('POST');
     
    
        var usuario = new Usuario({
            _id:  uuid.v4(),  
            _nombre:    req.body._nombre,
            _apellido: req.body._apellido,
            _fechaNacimiento: req.body._fechaNacimiento,
            _correo: req.body._correo,
            _contrasena: req.body._contrasena,
            _url: req.body._url,
        });
        console.log("usuario", usuario);
        usuario.save(function(err, usuario) {
            if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(usuario);
        });
    };

    //PUT - Update a register already exists
exports.updateUser = function(req, res) {
    Usuario.findOne({_id: req.body._id}, function(err, user) {
        user._nombre=    req.body._nombre;  
        user._apellido= req.body._apellido;  

        user._url= req.body._url; 
        user.save(function(err) {
                if(err) return res.status(500).send(err.message);
          res.status(200).send();
            }); 
        });


    };

    //DELETE - Delete 
exports.deleteUser = function(req, res) {
    console.log("entro");
        Usuario.findById(req.body._id, function(err, user) {
            console.log("usuario",user);
            user.remove(function(err) {
                if(err) return res.status(500).send(err.message);
          res.status(200).send();
            })
        });
    };