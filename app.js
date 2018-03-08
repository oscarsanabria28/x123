const express      = require('express');
const path         = require('path');
const userModule   = require('./Server');
const bodyParser   = require('body-parser');
const session 		= require('express-session');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
     resave: true,
     saveUninitialized: true,
     secret: "secret"
 }));

app.use(express.static(path.join(__dirname,'public')));

app.use('/',userModule);


var server = app.listen(8080 , ()=>{
                        
    console.log("Server prendido");	
                        
});