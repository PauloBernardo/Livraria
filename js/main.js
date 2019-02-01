//console.log ("Será que da certo?");
/*
$.getJSON( "ajax/teste.json", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});
*/
$('#teste').click (function()
        {
        	console.log ("Entrei");
        	var login = $("#Login").val();
        	var senha = $("#Senha").val();
        	//console.log (login);
        	//console.log (senha);
        	if (senha == "") {
        		senha = "default";
        	}
        	var logado = false;
            $.ajax({
                url: "cgi-bin/login.py",
                type: "post",
                datatype: "html",
                data: "login="+login+"&senha="+senha,
                success: function (html)
		        {
		            var params = $(html).filter(function(){ return $(this).is('p') });
		            params.each(
		                function()
		                {
		                	console.log ($(this).text().indexOf("Sucesso"));
		                	console.log ($(this).text());
		                	if ($(this).text().indexOf("Sucesso") != -1) {
		                		var seila = $(this).text().split("=");
		                		login = seila[1];
		                		var id = seila [3];
		                		//console.log (seila);
		     					window.location.href = "indexLogado.html?login="+login+"&ID="+id;
		     					//sessionStorage.setItem ('login', login);
		                		logado = true;
		                	}
		                	/*
		                    var value = "<li>" + $(this).html() + "</li>";
		                    $("body").append( value ); */
		                }
		            );
		            if (logado == false) {
		            	alert ("Login ou senha errados!");
		            }
		        },
		        error: function(request, ajaxOptions, thrownError)
		        {
		            $("#debug").html(request.responseText);
		            $("#debug").html("5566");
		        }
            });
});