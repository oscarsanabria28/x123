
////////////Fecha/////////////
	
function  getCurrentdate (){	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	
	var yyyy = today.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	} 
	
	 return dd+'/'+mm+'/'+yyyy;
}
/////////////Hora///////////////////

function getCurrenthour (){
	var hour = new Date();
    var hh  = hour.getHours();
	var min = hour.getMinutes();
	var ss  = hour.getSeconds();
	
	if(ss<10){
		ss='0'+ss;
	}
	if(min<10){
		min='0'+min;
	} 	
	
	return hh+':'+min+':'+ss;
}