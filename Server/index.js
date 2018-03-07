const express           = require('express');
const path              = require('path');
const router            = express.Router();
const fs                = require('fs');
const dbfirebase        = require("firebase-admin");
const EncryptAndDecrypt = require('../lib/EncryptAndDecrypt.js');
const ConsolLog         = require('../lib/ConsolLog/ConsolLog.js');
const serviceAccount    = require("../medical-cbf55-firebase-adminsdk-ebmfs-5626c57b76.json");


dbfirebase.initializeApp({
		credential: dbfirebase.credential.cert(serviceAccount),
		databaseURL: "https://medical-cbf55.firebaseio.com"
});

var db        = dbfirebase.database()
var ref       = db.ref('users');
//var usuariodb = ref.child('user');




router.get('/', (req,res)=>{
		
		res.sendFile(path.join(__dirname, '../public', 'LoginUP.html'));
	
})


router.post('/bBaseUsuario', (req,res)=>{
	
	var usuario = req.body.username;
	var passw   = req.body.password;
	
	var estoyEncriptando = EncryptAndDecrypt.encrypt(usuario);
	var estoyDesencriptando = EncryptAndDecrypt.decrypt(estoyEncriptando);
	
	ref.push({
		user: usuario,
		password: passw
	});
	
	ConsolLog.logger(usuario);
	
	
	res.send('Encriptados Locos');	
});

router.get('/rBaseUsuario', (req,res)=>{
	
	/*ref.child('Usuarios').once('value', function(snap){
		var usu = snap.val();
		
		//var datos = usu.toString();
		console.log(usu);
	});
	
	
	ref.orderByChild("Usuarios").equalTo(25).on("child_added", function(snapshot) {
		console.log(snapshot.key);
		
		//////////////////////////////////////////
		.equalTo('John Doe').on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
        console.log(data.key);
    });
});
		
		
		
	});*/
	
	
	ref.orderByChild('fullName').equalTo('Juana').on("value", function(snapshot) {
		//console.log(snapshot.key);
		console.log(snapshot.val());
		 snapshot.forEach(function(data) {
			console.log(data.key);
		});
		
	});
	
	/*ref.child('Usuarios').once("value").then(function(snapshot) {
    //var name = snapshot.child("user").val(); // {first:"Ada",last:"Lovelace"}
    var userjs     = snapshot.child("user").val(); // "Ada"
    //var passwordjs = snapshot.child("name").child("last").val(); // "Lovelace"
    //var age = snapshot.child("age").val(); // null
	console.log(userjs);
  });
	*/
	
	res.send('El Golden Oscar');
		
});

/////////////////////////////    Bryan //////////////////////////////////////
router.get('/Doctores', (req,res)=>{
		
	
	res.sendFile(path.join(__dirname, '../public', 'Doctores.html'));
	
		
});

router.get('/cReceta', (req,res)=>{
	
	
	res.sendFile(path.join(__dirname, '../public', 'FormularioReceta.html'));

	
});

router.post('/aBaseDatosReceta', (req,res)=>{
		
	var temperatura      = req.body.temperatura;
	var presion          = req.body.presion;
	var fechasis         = req.body.fechasis;
	var horasis          = req.body.horasis;
	var observaciones    = req.body.observaciones;
	var tratamiento      = req.body.tratamiento;
	var proxfecha        = req.body.proxfecha;
	var notificacion     = req.body.notificacion;
	var recomendaciones  = req.body.recomendaciones;
	
	
	var fechaFormatoB = proxfecha.split("-");
	var fechaB = fechaFormatoB[2]+'/'+fechaFormatoB[1]+'/'+fechaFormatoB[0]
	
	//////////////Insertar Base de datos///////////////////
	/*
	ref.push({
		temp: temperatura,
		pres: presion,
		datesys: fechasis,
		hoursys: horasis,
		obse: observaciones,
		treatm: tratamiento,
		proxdate: proxfecha,
		notify: notificacion,
		recoment: recomendaciones
	});
	*/
	/////////////Revizar///////////////////////////////////
	/*
	ref.once('value', function(snap){
		var usu = snap.val();
		
		//var datos = usu.toString();
		console.log(usu);
	});
	*/
	/////////////////////////////////////////////////////
	
	ConsolLog.logger(temperatura);
	ConsolLog.logger(presion);
	ConsolLog.logger(fechasis);
	ConsolLog.logger(horasis);
	ConsolLog.logger(observaciones);
	ConsolLog.logger(tratamiento);
	ConsolLog.logger(fechaB);
	ConsolLog.logger(notificacion);
	ConsolLog.logger(recomendaciones);
	
	
	
	
	res.send('Se insertaron los datos Lol');
	
		
});


/////////////////////////
module.exports = router;

