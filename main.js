/ / saving data in database
res.send('Hello'+ req.body.first + ' '+ req.body.last +' you are now registered!We will send an email to your address :' + req.body.email);

  });


app.get('/list', function(req, res) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            res.render('list.ejs', {availablebooks: result});
         });
    });
