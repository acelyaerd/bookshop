var express = require ('express');
var bodyParser= require ('body-parser');

const mysql = require('mysql');
const app = express();
const port = 8000;
const expressSanitizer = require('express-sanitizer');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/mybookshopdb";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();                                                                                                       
});

var session = require ('express-session'); 
var validator = require ('express-validator');

app.use(expressSanitizer());

app.use(bodyParser.urlencoded({ extended: true }))

///added for session management
app.use(session({
    secret: 'somerandomstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

//////////////
// new code added to your Express web server
require('./routes/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
