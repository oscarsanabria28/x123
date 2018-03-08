const express           = require('express');
const path              = require('path');
const router            = express.Router();
const fs                = require('fs');
const dbfirebase        = require("firebase-admin");
const EncryptAndDecrypt = require('../lib/EncryptAndDecrypt.js');
const ConsolLog         = require('../lib/ConsolLog.js');
const serviceAccount    = require("../medical-cbf55-firebase-adminsdk-ebmfs-5626c57b76.json");
const bodyParser 			= require('body-parser');

dbfirebase.initializeApp({
		credential: dbfirebase.credential.cert(serviceAccount),
		databaseURL: "https://medical-cbf55.firebaseio.com"
});

const db        = dbfirebase.database()
var db_users_info       = db.ref('users-info');
var table_recipe      = db.ref('recipe');

const PROFILE_DOCTOR="doctor";
const PROFILE_PACIENT="pacient";


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
		username: "bryanpacient",
		password: "pass123",
		mail: "bryan_mg125@hotmail.com",
		profile:"pacient"
	});
	
	
	
	
	res.send('Encriptados Locos');	
});

router.post('/validateUser', (req,res)=>{
	
	var usuario = req.body.username;
	var passw   = req.body.password;
	
	db_users_info.orderByChild('mail').equalTo(usuario).on("child_added", function(snapshot) {

		if(snapshot.val()==null){
			res.redirect('login');
		}else if(snapshot.val().password===passw){
			req.session.mail=snapshot.val().mail;
			req.session.profile=snapshot.val().profile;

			if(req.session.profile===PROFILE_DOCTOR){
				res.redirect('doctor');
			}else{
				res.redirect('patient');
			}

			
		}else{
			res.redirect('login');
		}
	});	
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


	getRecipes(req.session.mail,function(resp){
		if(resp==null){
			res.send('no-data');
		}else{
			res.send(resp);
		}
	});

	}
});

function getRecipes(user, callback){
	table_recipe.orderByChild('pacientemail').equalTo(user).on("value", function(snapshot) {

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



/////////////////////////
module.exports = router;

