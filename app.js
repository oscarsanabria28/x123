const express      = require('express');
const path         = require('path');
const pug          = require('pug');
const userModule   = require('./Server');
const bodyParser   = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname,'public')));

app.use('/Login',userModule);


var server = app.listen(8080 , ()=>{
                        
    console.log("Server prendido");	
                        
});