var express = require('express');
var mongoose = require('mongoose');
// var bodyParser = require('body-parser'); ahora se usa solamente express
var cors = require('cors');
var methodOverride = require('method-override');
var moment = require('moment');


moment().format();

var app = express();
app.use(cors());//{origin:'http://localhost:4200'}

//const port = 7575;

app.set('port' , process.env.PORT || 7575);
/* Ahora cambio
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
*/
//y es como sigue
app.use(express.json());

app.use(methodOverride());

mongoose.connect('mongodb://localhost:27017/F5Gol');
mongoose.set('debug',true);

require('./models/sportComplex.js');
require('./models/user.js');
require('./models/reservation.js');

//Routes
app.use(require('./routes'));

var router=express.Router();

app.use(router);

/*
app.listen(port, () => {
  console.log('We are live on ' + port);
});
*/
app.listen(app.get('port'), () => {
  console.log('We are live on ' + app.get('port'));
});
