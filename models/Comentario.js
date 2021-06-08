var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var comentarioSchema = new Schema({
  _id:    { type: String },
  _idUsuario:     { type: String },
  _idResena:  { type: String },
  _fecha: { type: Date },
  _comentario:  { type: String },
});

module.exports = mongoose.model('Comentario', comentarioSchema);
