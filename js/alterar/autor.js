var Autor = function (nome, sobrenome, genero, idautor) {
	this.nome = nome;
	this.idautor = idautor;
}
$("#selectAutorAtual").change (function () {
	var autor = $(this).val().split("-");
	$("#nomeAutor").val (autor[0]);
	$("#sobrenomeAutor").val (autor[1]);
});
function atualizaSelectAutorAtual () {
	var select = $("#selectAutorAtual");
	select.empty();
	$("<option>Nenhum</option>").appendTo (select);
	$.ajax({
	    url: "cgi-bin/lista/autor.py",
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
function atualizaSelectAutor () {
	atualizaSelectAutorAtual();
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
	var nomeAntigo = $("#selectAutorAtual").val();
	$.ajax({
	    url: "cgi-bin/alterar/autor.py",
	    type: "post",
	    datatype: "html",
	    data: "nome="+nome+"&Idcliente="+id+"&sobrenome="+sobrenome+"&genero="+genero+"&autorAntigo="+nomeAntigo,
	    success: function (html)
	    {
	        var params = $(html).filter(function(){ return $(this).is('p') });
	        params.each(
	            function()
	            {
	            	console.log ($(this).text());
	            	if ($(this).text() == "Sucesso!") {
	            		alert ("Alteração feito com sucesso!");
	            		atualizaSelectAutorAtual ();
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
$("#excluirAutor").click (function () {
	var nomeAntigo = $("#selectAutorAtual").val();
	if ("Nenhum" == nomeAntigo) {
		alert("Selecione um autor primeiro!");
		return;
	}
	$.ajax({
	    url: "cgi-bin/exclusao/autor.py",
	    type: "post",
	    datatype: "html",
	    data: "&Idcliente="+id+"&autorAntigo="+nomeAntigo,
	    success: function (html)
	    {
	        var params = $(html).filter(function(){ return $(this).is('p') });
	        params.each(
	            function()
	            {
	            	console.log ($(this).text());
	            	if ($(this).text() == "Sucesso!") {
	            		alert ("Exclusão feita com sucesso!");
	            		atualizaSelectAutorAtual ();
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