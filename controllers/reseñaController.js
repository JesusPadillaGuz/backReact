var mongoose = require('mongoose');
const Resena = require('../models/Reseña');
const {Contenido, ContenidoSchema} = require('../models/Contenido');
var uuid = require('uuid');
var emit = require('../app');
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
exports.findByIdUsuario = async(req, res)=> {
    Resena.find({_idUsuario: req.query.id}, async (err, resenas)=> {
        if(err) return res.send(500, err.message);
        for(let item in resenas){
            let content = await Contenido.find({'_id':resenas[item]['_idContenido']}).lean().exec();
                resenas[item]['_contenido'] = content;
        }
        console.log('GET /resenas/ByIdUsuario' + req.query.id);
            res.status(200).jsonp(resenas);
        });
    };

    //getByID
exports.findById = async(req, res)=> {
   var resena=  await Resena.find({_id: req.query.id}).lean().exec();;
        let content = await Contenido.find({'_id':resena[0]['_idContenido']}).lean().exec();
        resena[0]['_contenido'] = content;
        console.log("aqui",resena[0]['_contenido']);
        console.log('GET /resenas/ById' + req.query.id);
            res.status(200).jsonp(resena);
 
    };

//POST - Insert 
exports.addResena = function(req, res) {
        console.log('POST');
        console.log(req.body);
    var uuid = require('uuid');

    var dat= new Date().toISOString().slice(0, 10);
        var resena = new Resena({
            _id:  uuid.v4(),  
            _idUsuario:    req.body._idUsuario,
            _idContenido: req.body._idContenido,
            _fecha: dat,
            _calificacion: req.body._calificacion
        });
    
        resena.save(function(err, resena) {
            if(err) return res.status(500).send( err.message);
        
        
    //agarres el id del contenido que llega y traer de ese contenido traer todas las calificaciones
    //separarlas en una lista por calif del 1 al 5 
    Resena.find({_idContenido: req.body._idContenido}, async (err, resenas)=> {
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
        emit(counterScore,req.body._idContenido);

    }); 
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
    Resena.findById(req.query.id, function(err, user) {
            user.remove(function(err) {
                if(err) return res.status(500).send(err.message);
          res.status(200).send();
            })
        });
    };

    //getAllResenasDeContenidoByIDUsuario
    exports.findResenasEspecial = function(req, res) {
        idContenidos= [];
       
         Resena.find({
            _idUsuario: req.body._idUsuario
           // _idUsuario:"ead68f96-97a3-412a-9b4c-9110a61afa25"
          }, function(err, resenas) {
            if(err) return res.send(500, err.message);
        
            for(let item in resenas){
              idContenidos.push(resenas[item]['_idContenido']);
            }
            Resena.find({_idContenido: { $all : idContenidos }},function(err,resenasFinal){
                if(err){
                    console.log("trono en la query contenidos");
                    return res.send(500, err.message);
                } 
                console.log("resenas",resenasFinal)
                res.status(200).jsonp(resenasFinal);
            });
            }); 
            
        };

//getAllResenasDeContenidoByIDUsuario
exports.findContenidosUsuario = function(req, res) {
    idContenidos= [];
   console.log("Usuarioid",req.query.id);
     Resena.find({
        _idUsuario: req.query.id
       // _idUsuario:"ead68f96-97a3-412a-9b4c-9110a61afa25"
      }, function(err, resenas) {
        if(err) return res.send(500, err.message);
    
        for(let item in resenas){
          idContenidos.push(resenas[item]['_idContenido']);
        }
        console.log("UsuarioContenidos",idContenidos);
        Contenido.find({_id: { $in : idContenidos }},function(err,contenidos){
            if(err){
                console.log("trono en la query contenidos");
                return res.send(500, err.message);
            } 
            res.status(200).jsonp(contenidos);
        });
        }); 
        
    };

