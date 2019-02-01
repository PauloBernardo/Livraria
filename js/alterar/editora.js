$("#selectEditoraAtual").change (function () {
	//var autor = $(this).val().split("-");
	$("#nomeEditora").val ($(this).val());
	//$("#sobrenomeAutor").val (autor[1]);
});
function atualizaSelectEditoraAtual () {
	var select = $("#selectEditoraAtual");
	select.empty();
	$("<option>Nenhum</option>").appendTo (select);
	$.ajax({
	    url: "cgi-bin/lista/editora.py",
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
$("#cadastrarEditora").click (function () {
	var nome = $("#nomeEditora").val();
	if (nome == "") {
		alert ("Campo nome não pode ficar em branco");
		return;
	}
	$.ajax({
	    url: "cgi-bin/alterar/editora.py",
	    type: "post",
	    datatype: "html",
	    data: "nome="+nome+"&Idcliente="+id+"&nomeAntigo="+$("#selectEditoraAtual").val(),
	    success: function (html)
	    {
	        var params = $(html).filter(function(){ return $(this).is('p') });
	        params.each(
	            function()
	            {
	            	console.log ($(this).text());
	            	if ($(this).text() == "Sucesso!") {
	            		alert ("Alteração feita com sucesso!");
	            		atualizaSelectEditoraAtual ();
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
$("#excluirEditora").click (function () {
	var nomeAntigo = $("#selectEditoraAtual").val();
	if ("Nenhum" == nomeAntigo) {
		alert("Selecione uma editora primeiro!");
		return;
	}
	$.ajax({
	    url: "cgi-bin/exclusao/editora.py",
	    type: "post",
	    datatype: "html",
	    data: "&Idcliente="+id+"&editoraAntiga="+nomeAntigo,
	    success: function (html)
	    {
	        var params = $(html).filter(function(){ return $(this).is('p') });
	        params.each(
	            function()
	            {
	            	console.log ($(this).text());
	            	if ($(this).text() == "Sucesso!") {
	            		alert ("Exclusão feita com sucesso!");
	            		atualizaSelectEditoraAtual ();
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