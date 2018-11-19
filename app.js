var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var fs = require('fs');




//Lecture et affichage de tous les utilisateurs connus par notre serveur
var date_file = fs.readFileSync('users.json');
var users_file = JSON.parse(date_file);
console.log(users_file);




var users = require('./routes/users');

//Init App

var app = express();


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));


// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});

