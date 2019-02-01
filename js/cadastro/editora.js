$("#cadastrarEditora").click (function () {
	var nome = $("#nomeEditora").val();
	if (nome == "") {
		alert ("Campo nome não pode ficar em branco");
		return;
	}
	$.ajax({
	    url: "cgi-bin/cadastro/editora.py",
	    type: "post",
	    datatype: "html",
	    data: "nome="+nome+"&Idcliente="+id,
	    success: function (html)
	    {
	        var params = $(html).filter(function(){ return $(this).is('p') });
	        params.each(
	            function()
	            {
	            	console.log ($(this).text());
	            	if ($(this).text() == "Sucesso!") {
	            		alert ("Cadastro feito com sucesso!");
	            	} else if ($(this).text() == "ERRO NOME") {
	            		alert ("Editora já existe :(");
	            	} else {
	            		alert ("Error, verifique os campos.");
	            	}
	            }
	        );
	    },
	    error: function(request, ajaxOptions, thrownError)
	    {
	        $("#debug").html(request.responseText);
	        $("#debug").html("5566");
	    }
	});
});