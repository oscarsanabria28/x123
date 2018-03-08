function getRecipesByUser(){

	$.ajax({
        url: "/getRecipesByCurrentUser",
        type: "post",
        success: function (response) {
        	//alert(response);
           if(response=="no-session-data"){
              window.location("login");
           }else if(response=="no-data"){
              $("#accordion").html="Aún no tienes ninguna receta.";
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
  var res=''
    +'<div class="col-sm-12">'
    +'<label>Mail del Doctor: </label> <p>'+item.doctoremail+'</p>'
    +'</div>'
    +'<div class="col-sm-6">'
    +'<label>Fecha de la consulta: </label> <p>'+item.datesys +' a '+item.hoursys+'</p>'
    +'</div>'
    +'<div class="col-sm-6">'
    +'<label>Próxima cita: </label> <p>'+item.nextdate+'</p>'
    +'</div>'
    +'<div class="col-sm-4">'
    +'<label>Presión: </label> <p>'+item.pressure+'</p>'
    +'</div>'
    +'<div class="col-sm-4">'
    +'<label>Temperatura: </label> <p>'+item.temperature+'</p>'
    +'</div>'
    +'<div class="col-sm-4">'
    +'<label>Notificación: </label> <p>'+item.notify+'</p>'
    +'</div>'
    +'<div class="col-sm-6">'
    +'<label>Recomendaciones: </label> <p>'+item.recomment+'</p>'
    +'</div>'
    +'<div class="col-sm-6">'
    +'<label>Observaciones: </label> <p>'+item.observation+'</p>'
    +'</div>'
    +'<div class="col-sm-12">'
    +'<label>Tratamiento: </label> <p>'+item.treatm+'</p>'
    +'</div>';
  return res;
}




