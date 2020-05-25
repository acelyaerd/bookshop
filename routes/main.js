module.exports = function(app)

{
const { check, validationResult } = require('express-validator');
const redirectLogin = (req, res, next) => {
                                                                                                                     
   if (!req.session.userId ) {
     res.redirect('./login')
   } else { next (); }
 }

     app.get('/',function(req,res){
        res.render('index.html')
     });
     app.get('/about',function(req,res){
        res.render('about.html');
    });

    app.get('/search', redirectLogin, function(req,res){

       res.render("search.html");
       });

    // app.get('/search-result', function (req, res) {
         //searching in the database
        // res.send('This is the keyword you  entered: '+ req.query.keyword+ ' This is the result of the search:' );
     app.post('/search-result', function(req, res) {
      var MongoClient = require('mongodb').MongoClient;
      var url = 'mongodb://localhost';
      MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var db = client.db('mybookshopdb');
      //var query = { name:req.query.keyword };      
      db.collection('books').find({name: req.body.keyword}).toArray((findErr, results) => {
      if (findErr) throw findErr;
      else
        // res.render('list.ejs', {availablebooks:results});
      client.close();
  res.render('search-result.ejs', {availablebooks:results}); 
  });
});
});
        
   
    
   app.get('/register', function (req,res) {
         res.render('register.html');                                                                   
      });                                                                                                 

        app.get('/list', redirectLogin, function(req, res) {
      var MongoClient = require('mongodb').MongoClient;
      var url = 'mongodb://localhost';
      MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var db = client.db('mybookshopdb');                                                                     
      db.collection('books').find().toArray((findErr, results) => {
      if (findErr) throw findErr;
      else
         res.render('list.ejs', {availablebooks:results});
      client.close();                                                                                              
  });
});
});

        app.get('/addbook', redirectLogin, function(req,res){
                res.render('addbook.html');
        });

        app.post('/registered',[check('email').isEmail()] , function (req,res) {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        const plainPassword = req.sanitize(req.body.password);
        const username = req.sanitize(req.body.username);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.redirect('./register'); }
       else {
        bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        // Store hashed password in your database.
        // saving data in database
                                                                                              
       var MongoClient = require('mongodb').MongoClient;                                                          var url = 'mongodb://localhost'; 
        MongoClient.connect(url, function(err, client) {                                                           if (err) throw err;                                                  
        var db = client.db ('mybookshopdb');
                                                                                                       
        db.collection('users').insertOne({
                                                                                                        
        username: req.body.username,                                                                  
        password: hashedPassword,                                                                      
        email: req.body.email                                                                        
        });
                                                                                                          
        client.close();                                                                                             
        res.send('You are now registered, Your user name is: '+ req.body.username +' your email is: ' + req.body.email + ' your password is: '+ req.body.password +' and your hashed password is: '+ hashedPassword+'<a href='+'./'+'>Home</a>');
        });
       });
}
});

      app.post('/bookadded', function (req,res) {
       // saving data in database
       var MongoClient = require('mongodb').MongoClient;
       var url = 'mongodb://localhost';
       MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db ('mybookshopdb');
        db.collection('books').insertOne({
        name: req.body.name,
        price: req.body.price 
        });
        client.close();
        res.send(' This book is added to the database, name: '+ req.body.name + ' price '+ req.body.price+'<a href='+'./'+'>Home</a>' );        });     
        });



//*****************login*******************

     app.get('/login', function (req,res) {
           res.render('login.html');
     });
                                                                                        

      app.post('/loggedin', function (req, res) {
            var MongoClient = require('mongodb').MongoClient;
            var url = 'mongodb://localhost';
            MongoClient.connect(url, function (err, client) {
                if (err) throw err;
                var db = client.db('mybookshopdb');
                const bcrypt = require('bcrypt');
                const plainPassword = req.body.password;
                let users = db.collection('users');
                users.findOne({username: req.body.username}, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        var hashedPassword = result.password;
                        bcrypt.compare(plainPassword, hashedPassword, function (err, result)
{
                            if (result == true) {
                                // **** save user session here, when login is successful
                                req.session.userId = req.body.username;   
                                res.send("hi " + req.body.username +'<br />'+'<a href='+'./'+'>Home</a>');
                            } else {
                                res.send("Wrong Login");
                            }
                        });
                    }else {
                        res.send("non-existent user.")
                    }
                    client.close();  
                });
            });
        });
                                                                                                      

/* 
                                                                                                      
app.get('/list', function(req, res) {
        var sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            res.render('list.ejs', {availablebooks: result});                  
         });
    });
*/

app.get('/weather', function(req, res){
    const request = require('request');
          
let apiKey = 'ea2280b832c98da507831e436589731f';
//let city = 'london';
let city = req.query.city
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
             
request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    var weather = JSON.parse(body)
    var wmsg = 'It is '+ weather.main.temp + ' degrees in '+ weather.name +'! <br> humidity now is:'+ weather.main.humidity;
    res.send (wmsg);
   // res.send(body);
  } 
});
});   
//------------------  
    app.get('/weatherform', function(req, res){
    res.render('weatherform.html');
    });

//------------------
app.get('/api', function (req,res) {
     var MongoClient = require('mongodb').MongoClient;
     var url = 'mongodb://localhost';
     MongoClient.connect(url, function (err, client) {
     if (err) throw err                                                                                                                                                
     var db = client.db('mybookshopdb');                                                                                                                                                                   
      db.collection('books').find().toArray((findErr, results) => {                                                                                                                                
      if (findErr) throw findErr;
      else
         res.json(results);                                                                                                                                             
      client.close();                                                                                                                                                   
  });
});
});




    app.get('/addbook', function(req, res){
    res.render('addbook.html');
    });


      app.get('/list', function(req, res) {
      var MongoClient = require('mongodb').MongoClient;
      var url = 'mongodb://localhost';
      MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var db = client.db('mybookshopdb');
      db.collection('books').find().toArray((findErr, results) => {
      if (findErr) throw findErr;
      else
         res.render('list.ejs', {availablebooks:results});
      client.close();
  });
});
});


//logout route:
  app.get('/logout', redirectLogin, (req,res) => {
     req.session.destroy(err => {
     if (err) {
       return res.redirect('./')
     }
     res.send('you are now logged out. <a href='+'./'+'>Home</a>');
     })
     })

} 
