var express = require('express');
var app = express();
var port = process.env.PORT || 2005;

app.use('assets/', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

var mongoose = require('mongoose');
var config = require('./config');
mongoose.connect(config.getConnectionString(), { useNewUrlParser: true });

var todoController = require('./controllers/todoController');
todoController(app);

app.listen(port, function(){ 
    console.log('listening at port ' + port);
 });