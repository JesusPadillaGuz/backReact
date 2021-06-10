var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var contenidoSchema = new Schema({
  _id:    { type: String },
  _titulo:     { type: String },
  _categoria:  { type: String },
  _url: {type:String}
});

module.exports = {
  Contenido: mongoose.model('Contenido', contenidoSchema,'Contenido'),
  ContenidoSchema: contenidoSchema
};

