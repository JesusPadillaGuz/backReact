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

var router = express.Router();
router.get('/', function(req, res) {
   res.send("Hello World!");
});
app.use(router);

var UsuarioCtrl = require('./controllers/usuarioController');
var ResenaCtrl = require('./controllers/reseñaController');
var ComentarioCtrl = require('./controllers/comentarioController');
// API routes
var users = express.Router();

users.route('/users')
  .get(UsuarioCtrl.findAllUsers)
  .post(UsuarioCtrl.addUser);

  users.route('/users/:id')
  .get(UsuarioCtrl.findById)
  .put(UsuarioCtrl.updateUser)
  .delete(UsuarioCtrl.deleteUser);

  users.route('/login')
  .get(UsuarioCtrl.loginUser);

app.use('/api', users);

var resenas = express.Router();
resenas.route('/resenas')
  .get(ResenaCtrl.findAllResenas)
  .post(ResenaCtrl.addResena);

  resenas.route('/resenas/:id')
  .get(ResenaCtrl.findById)
  .put(ResenaCtrl.updateResena)
  .delete(ResenaCtrl.deleteResena);
  resenas.route('/resenas/ContenidosUsuario')
.get(ResenaCtrl.findResenasPorContenidosUsuario);

app.use('/api', resenas);

var comentarios = express.Router();
comentarios.route('/comentarios')
  .get(ComentarioCtrl.findAllComentarios)
  .post(ComentarioCtrl.addComentario);

  resenas.route('/comentarios/:id')
  .get(ComentarioCtrl.findById)
  .delete(ComentarioCtrl.deleteComentario);

app.use('/api', comentarios);





mongoose.connect('mongodb://localhost/react', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
 });
});

