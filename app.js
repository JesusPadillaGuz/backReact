    //hacer todos los update como el de usuarioController
    var express    = require("express"),  
    app        = express(),
    http       = require("http"),
    server     = http.createServer(app),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');
    var methodOverride  = require("method-override");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const io = require('socket.io')(server);

module.exports = (emmitingData,id) => {
  console.log("entro",id);
  //io.sockets.emit(id,emmitingData);
  socket.broadcast.emit(id,emmitingData);
}


var router = express.Router();
router.get('/', function(req, res) {
   res.send("Hello World!");
});
app.use(router);

var UsuarioCtrl = require('./controllers/usuarioController');
var ResenaCtrl = require('./controllers/reseñaController');
var ComentarioCtrl = require('./controllers/comentarioController');
var ContenidoCtrl = require('./controllers/contenidoController');
// API routes
var users = router;

users.route('/users')
  .get(UsuarioCtrl.findAllUsers)
  .post(UsuarioCtrl.addUser);

  users.route('/users/ById')
  .get(UsuarioCtrl.findById)
  .put(UsuarioCtrl.updateUser)
  .delete(UsuarioCtrl.deleteUser);

  users.route('/login')
  .post(UsuarioCtrl.loginUser);

app.use('/api', users);

var resenas =  router;
resenas.route('/resenas')
  .get(ResenaCtrl.findAllResenas)
  .post(ResenaCtrl.addResena);

  resenas.route('/resenas/ById')
  .get(ResenaCtrl.findById)
  .put(ResenaCtrl.updateResena)
  .delete(ResenaCtrl.deleteResena);

  resenas.route('/resenas/ByIdUsuario')
  .get(ResenaCtrl.findByIdUsuario
    );

  resenas.route('/resenas/Especial')
.get(ResenaCtrl.findResenasEspecial);

resenas.route('/resenas/contenidos/ByUsuario')
.get(ResenaCtrl.findContenidosUsuario);

app.use('/api', resenas);

var comentarios = router;
comentarios.route('/comentarios')
  .get(ComentarioCtrl.findAllComentarios)
  .post(ComentarioCtrl.addComentario);

  resenas.route('/comentarios/ById')
  .get(ComentarioCtrl.findById)
  .delete(ComentarioCtrl.deleteComentario);

app.use('/api', comentarios);

 var contenidos = router;
contenidos.route('/contenidos')
  .get(ContenidoCtrl.findAllContenidos)
  .post(ContenidoCtrl.addContenido);

  resenas.route('/contenidos/ById')
  .get(ContenidoCtrl.findById)
  .put(ContenidoCtrl.updateContenido)
  .delete(ContenidoCtrl.deleteContenido);

contenidos.route('/contenidos/calificaciones')
  .get(ContenidoCtrl.getAllScoresByContentId); 

app.use('/api', contenidos);





mongoose.connect('mongodb://localhost/react', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3001, function() {
    console.log("Node server running on http://localhost:3001");
 });
});

