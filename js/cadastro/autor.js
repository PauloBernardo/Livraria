function atualizaSelectAutor () {
	select = $("#selectAutor");
	select.empty();
	$.ajax({
	    url: "cgi-bin/lista/genero.py",
	    type: "post",
	    datatype: "html",
	    data: "Idcliente="+id+"&Tipo=Alfabetico",
	    success: function (html)
	    {
	        var params = $(html).filter(function(){ return $(this).is('p') });
	        var gerarOpcao = false;
	        params.each(
	            function()
	            {
	            	if ($(this).text() == "Sucesso!") {
	            		gerarOpcao = true;
	            	}
	            	else if (gerarOpcao) {
	            		$("<option>"+$(this).text()+"</option>").appendTo (select);
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
}
$("#cadastrarAutor").click (function () {
	var nome = $("#nomeAutor").val();
	var sobrenome = $("#sobrenomeAutor").val();
	var genero = $("#selectAutor").val();
	//console.log (genero);
	if (nome == "") {
		alert ("Campo nome não pode ficar em branco");
		return;
	}
	if (sobrenome == "") {
		lert ("Campo sobrenome não pode ficar em branco");
		return;
	}
	$.ajax({
	    url: "cgi-bin/cadastro/autor.py",
	    type: "post",
	    datatype: "html",
	    data: "nome="+nome+"&Idcliente="+id+"&sobrenome="+sobrenome+"&genero="+genero,
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
	            		alert ("Autor já existe :(");
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