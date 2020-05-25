var express = require ('express')
var bodyParser= require ('body-parser')
const app = express()
const port = 8000
app.use(bodyParser.urlencoded({ extended: true }))
// new code added to your Express web server
require('./routes/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//////////////

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
