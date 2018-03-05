const fs = require('fs');

function logger(text){
	
	var myData = {formatoJson:text}
	
	console.log(text);
	fs.appendFile('public/jsonvsfreddykrueger.json', JSON.stringify(myData,null,4)+'\n', function(err){
		if (err) throw err;
			console.log('Salvado');
	});
			
};

module.exports.logger=logger;

