const express           = require('express');
const path              = require('path');
const router            = express.Router();
const fs                = require('fs');
const dbfirebase        = require("firebase-admin");
const EncryptAndDecrypt = require('../lib/EncryptAndDecrypt.js');
const ConsolLog         = require('../lib/ConsolLog/ConsolLog.js');
const serviceAccount    = require("../medical-cbf55-firebase-adminsdk-ebmfs-5626c57b76.json");
const bodyParser 			= require('body-parser');

dbfirebase.initializeApp({
		credential: dbfirebase.credential.cert(serviceAccount),
		databaseURL: "https://medical-cbf55.firebaseio.com"
});

const db        = dbfirebase.database()
var db_users_info       = db.ref('users-info');
var recipe      = db.ref('recipe');

const PROFILE_DOCTOR="doctor";
const PROFILE_PACIENT="patient";


/*router.use(function (req, res, next) {
  	sess = req.session;
	console.log('sess mail: '+sess.mail);
	if(!sess.mail) {
		console.log('incorrect sess mail');
	   res.redirect('login');
	}
	else {
	    next();
	}
	
	//next();
  
});*/

router.get(['/login','/'], (req,res)=>{
		
		res.sendFile(path.join(__dirname, '../public', 'login.html'));
	
})


router.get('/bBaseUsuario', (req,res)=>{
	
	var usuario = req.body.username;
	var passw   = req.body.password;
	
	db_users_info.push({
		username: "carlosdotor",
		password: "pass123",
		mail: "carlosdotorpaciente@hotmail.com",
		profile:"patient"
	});
	
	ConsolLog.logger(usuario);
	
	
	res.send('Encriptados Locos');	
});

router.post('/validateUser', (req,res)=>{
	
	var usuario = req.body.username;
	var passw   = req.body.password;
	

	getUser(usuario,function(resp){
		console.log(resp);
		if(resp==null){
			res.redirect('login');
		}else if(resp.password===passw){
			req.session.mail=resp.mail;
			req.session.profile=resp.profile;

			if(req.session.profile===PROFILE_DOCTOR){
				res.redirect('doctor');
			}else{
				res.redirect('patient');
			}
		}
	});
	
});


/////////////////////////////    Bryan //////////////////////////////////////
router.get('/doctor', (req,res)=>{
		
	if(!req.session.mail) {
		console.log('incorrect sess mail');
	   res.redirect('login');
	}else
	
	
	res.sendFile(path.join(__dirname, '../public', 'doctor.html'));
	
		
});

router.get('/recipe', (req,res)=>{
		
	if(!req.session.mail) {
		console.log('incorrect sess mail');
	   res.redirect('login');
	}else
	
	
	res.sendFile(path.join(__dirname, '../public', 'doctorrecipe.html'));
	
		
});

router.post('/createRecipe', (req,res)=>{
	
	if(!req.session.mail) {
		console.log('incorrect sess mail');
	   res.redirect('login');
	}else{
	
	
	var pacientemail     = req.body.pacientEmail;	
	var temperatura      = req.body.temperatura;
	var presion          = req.body.presion;
	var fechasis         = req.body.fechasis;
	var horasis          = req.body.horasis;
	var observaciones    = req.body.observaciones;
	var tratamiento      = req.body.tratamiento;
	var proxfecha        = req.body.proxfecha;
	var notificacion     = req.body.notificacion;
	var recomendaciones  = req.body.recomendaciones;
	
	var fechaFormatoB;
	var fechaB;
	
	if(!proxfecha)
	{
		fechaB ='Sin información';
		
	}	
	else{
		fechaFormatoB = proxfecha.split("-");
		fechaB = fechaFormatoB[2]+'/'+fechaFormatoB[1]+'/'+fechaFormatoB[0]
	}
			
	//////////////Insertar Base de datos///////////////////
	
	
	recipe.push({
		doctoremail: req.session.mail,
		pacientemail:pacientemail,
		temperature: temperatura,
		pressure: presion,
		datesys: fechasis,
		hoursys: horasis,
		observation: observaciones,
		treatm: tratamiento,
		nextdate: fechaB,
		notify: notificacion,
		recomment: recomendaciones
	});
	
	/////////////Revisar///////////////////////////////////
	/*
	ref.once('value', function(snap){
		var usu = snap.val();
		
		//var datos = usu.toString();
		console.log(usu);
	});
	*/
	/////////////////////////////////////////////////////
	ConsolLog.logger(pacientemail);
	ConsolLog.logger(temperatura);
	ConsolLog.logger(presion);
	ConsolLog.logger(fechasis);
	ConsolLog.logger(horasis);
	ConsolLog.logger(observaciones);
	ConsolLog.logger(tratamiento);
	ConsolLog.logger(fechaB);
	ConsolLog.logger(notificacion);
	ConsolLog.logger(recomendaciones);
	
	
	
	res.sendFile(path.join(__dirname, '../public', 'recipeMessage.html'));
	}
});

router.get('/archivo', (req,res)=>{
		
	
  	console.log('session'+JSON.stringify(req.session));
  	if(!req.session.mail) {
		console.log('incorrect sess mail');
	   res.redirect('login');
	}else
	/*.writeFile('public/jsonvsfreddykrueger.json', JSON.stringify(myData,null,4), function(err){
    if (err) throw err;
    console.log('Salvado');
	});*/
	
	res.send('mail in session'+req.session.mail);
		
});

router.get('/patient', (req,res)=>{
		
	
  	console.log('session'+JSON.stringify(req.session));
  	if(!req.session.mail || req.session.profile!=PROFILE_PACIENT) {
		console.log('incorrect sess mail');
	   res.redirect('login');
	}else
	/*.writeFile('public/jsonvsfreddykrueger.json', JSON.stringify(myData,null,4), function(err){
    if (err) throw err;
    console.log('Salvado');
	});*/
	
	res.sendFile(path.join(__dirname, '../public', 'patient.html'));
		
});

router.get('/logout',function(req,res){
	req.session.destroy(function(err) {
	  if(err) {
	    console.log(err);
	  } else {
	    res.redirect('/');
	  }
	});
});

router.post('/getRecipesByCurrentUser', (req,res)=>{
	
	if(!req.session.mail) {
		console.log('incorrect sess mail');
	   res.send('no-session-data');
	}else{


	getRecipes(req.session.mail,'pacientemail',function(resp){
		if(resp==null){
			res.send('no-data');
		}else{
			res.send(resp);
		}
	});

	}
});

function getRecipes(user,field, callback){
	recipe.orderByChild(field).equalTo(user).on("value", function(snapshot) {

		if(snapshot.val()==null){
			callback(null);
		}else {
			console.log("*******count: "+snapshot.numChildren());
			console.log("data: "+JSON.stringify(snapshot.val()));
			var response=[];
			snapshot.forEach(function(data) {
		    response.push(data.val());
		 	});
			callback(JSON.stringify(response));
		}
	});
}
//////////////////////////////////////

router.post('/getRecipesByCurrentDoctor', (req,res)=>{
	
	if(!req.session.mail) {
		console.log('incorrect sess mail');
	   res.send('no-session-data');
	}else{


	getRecipes(req.session.mail,'doctoremail',function(resp){
		if(resp==null){
			res.send('no-data');
		}else{
			res.send(resp);
		}
	});

	}
});

function getUser(user, callback){
	db_users_info.orderByChild('mail').equalTo(user).on("value", function(snapshot) {
		console.log(snapshot);
		if(snapshot.val()===null){
			callback(null);
		}else {
			snapshot.forEach(function(data) {
		    callback(data.val());
		 	});
		}
	});
}



/////////////////////////
module.exports = router;

