var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var usuarioSchema = new Schema({
  _id:    { type: String },
  _nombre:     { type: String },
  _apellido:  { type: String },
  _fechaNacimiento: { type: Date },
  _correo:  { type: String },
  _contrasena: {type: String},
  _url: {type:String}
});

module.exports = mongoose.model('Usuario', usuarioSchema);
