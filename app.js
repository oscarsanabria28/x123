const express      = require('express');
const path         = require('path');
const userModule   = require('./Server');
const bodyParser   = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(express.static(path.join(__dirname,'public')));


app.use('/',userModule);




var server = app.listen(8080 , ()=>{
                        
    console.log("Server prendido");	
                        
});