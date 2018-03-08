function getRecipesByDoctor(){

	$.ajax({
        url: "/getRecipesByCurrentDoctor",
        type: "post",
        success: function (response) {
        	//alert(response);
           if(response=="no-session-data"){
              window.location("login");
           }else if(response=="no-data"){
              $("#accordion").html="Aun no tienes ninguna receta.";
           }else{
              //$("#accordion").html("Hello World");
              $("#accordion").html(formatRecipesResponse($.parseJSON(response)));
           }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }


    });

}

function formatRecipesResponse(response){
  var position=1;
  var res=''


  response.forEach(function(item) {
      res=res+createRow(item,position++);
  });

  return res;
}

function createRow(item,position){
  
    var idContent='collapse'+position;
    var idHeader='collapseHeader'+position;

    var res=''
    +'<div class="card">'
    +'<div class="card-header" role="tab" id="'+idHeader+'">'
    +  '<h5 class="mb-0">'
    +    '<a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#'+idContent+'" aria-expanded="false" aria-controls="'+idContent+'">'
    +      'Receta #'+position
    +    '</a>'
    +  '</h5>'
    +'</div>'
    +'<div id="'+idContent+'" class="collapse" role="tabpanel" aria-labelledby="'+idHeader+'">'
    +  '<div class="card-block">'
    +    '<div>'+createItemLabels(item)+'</div>'
    +  '</div>'
    +'</div>'
  +'</div>';

  return res;
  /*createItemLabels(JSON.stringify(item));*/
}

function createItemLabels(item){

  var mail = item.pacientemail==null ? "Sin Info" : item.pacientemail;
  var date = item.datesys==null ? "Sin Info" : item.datesys;
  var hour = item.hoursys==null ? "Sin Info" : item.hoursys;
  var nextDate = (item.nextdate==null || item.nextdate=="") ? "Sin Info" : item.nextdate;
  var pressure = item.pressure==null ? "Sin Info" : item.pressure;
  var temp = item.temperature==null ? "Sin Info" : item.temperature;
  var notify = item.notify==null ? "Sin Info" : item.notify;
  var recomm = item.recomment==null ? "Sin Info" : item.recomment;
  var observation = item.observation==null ? "Sin Info" : item.observation;
  var treatm = item.treatm==null ? "Sin Info" : item.treatm;
  
  var res=''
    +'<div class="col-sm-12">'
    +'<label>Mail del Paciente: </label> <p>'+mail+'</p>'
    +'</div>'
    +'<div class="col-sm-6">'
    +'<label>Fecha de la consulta: </label> <p>'+date +' a '+hour+'</p>'
    +'</div>'
    +'<div class="col-sm-6">'
    +'<label>Proxima cita: </label> <p>'+nextDate+'</p>'
    +'</div>'
    +'<div class="col-sm-4">'
    +'<label>Presion: </label> <p>'+pressure+'</p>'
    +'</div>'
    +'<div class="col-sm-4">'
    +'<label>Temperatura: </label> <p>'+temp+'</p>'
    +'</div>'
    +'<div class="col-sm-4">'
    +'<label>Notificacion: </label> <p>'+notify+'</p>'
    +'</div>'
    +'<div class="col-sm-6">'
    +'<label>Recomendaciones: </label> <p>'+recomm+'</p>'
    +'</div>'
    +'<div class="col-sm-6">'
    +'<label>Observaciones: </label> <p>'+observation+'</p>'
    +'</div>'
    +'<div class="col-sm-12">'
    +'<label>Tratamiento: </label> <p>'+treatm+'</p>'
    +'</div>';
  return res;
}