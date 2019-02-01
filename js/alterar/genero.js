$("#selectGeneroAtual").change (function () {
	//var autor = $(this).val().split("-");
	$("#nomeGenero").val ($(this).val());
	//$("#sobrenomeAutor").val (autor[1]);
});
function atualizaSelectGeneroAtual () {
	var select = $("#selectGeneroAtual");
	select.empty();
	$("<option>Nenhum</option>").appendTo (select);
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
$("#cadastrarGenero").click (function () {
	var nome = $("#nomeGenero").val();
	if (nome == "") {
		alert ("Campo nome não pode ficar em branco");
		return;
	}
	$.ajax({
	    url: "cgi-bin/alterar/genero.py",
	    type: "post",
	    datatype: "html",
	    data: "nome="+nome+"&Idcliente="+id+"&nomeAntigo="+$("#selectGeneroAtual").val(),
	    success: function (html)
	    {
	        var params = $(html).filter(function(){ return $(this).is('p') });
	        params.each(
	            function()
	            {
	            	console.log ($(this).text());
	            	if ($(this).text() == "Sucesso!") {
	            		alert ("Alteração feita com sucesso!");
	            		atualizaSelectGeneroAtual ();
	            	} else if ($(this).text() == "ERRO NOME") {
	            		alert ("Genero já existe :(");
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
$("#excluirGenero").click (function () {
	var nomeAntigo = $("#selectGeneroAtual").val();
	if ("Nenhum" == nomeAntigo) {
		alert("Selecione um genero primeiro!");
		return;
	}
	$.ajax({
	    url: "cgi-bin/exclusao/genero.py",
	    type: "post",
	    datatype: "html",
	    data: "&Idcliente="+id+"&generoAntiga="+nomeAntigo,
	    success: function (html)
	    {
	        var params = $(html).filter(function(){ return $(this).is('p') });
	        params.each(
	            function()
	            {
	            	console.log ($(this).text());
	            	if ($(this).text() == "Sucesso!") {
	            		alert ("Exclusão feita com sucesso!");
	            		atualizaSelectGeneroAtual ();
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