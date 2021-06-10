const {Contenido, ContenidoSchema} = require('../models/Contenido');

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var resenaSchema = new Schema({
  _id:    { type: String },
  _idUsuario:     { type: String },
  _idContenido:  { type: String },
  _contenido:  [{ type: ContenidoSchema }],
  _fecha: { type: Date },
  _calificacion:  { type: Number }
});

module.exports = mongoose.model('Resena', resenaSchema,'Resena');