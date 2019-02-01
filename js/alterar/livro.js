function atualizaSelectLivro () {
	selectAutor = $("#selectLivroAutor");
	selectGenero = $("#selectLivroGenero");
	selectEditora = $("#selectLivroEditora");
	selectAutor.empty();
	selectEditora.empty();
	selectGenero.empty();
	fazerRequisicaoLista ("cgi-bin/lista/genero.py", selectGenero);
	fazerRequisicaoLista ("cgi-bin/lista/autor.py", selectAutor);
	fazerRequisicaoLista ("cgi-bin/lista/editora.py", selectEditora);
}
function fazerRequisicaoLista (url, select) {
	$.ajax({
	    url: url,
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
$("#cadastrarLivro").click (function () {
	var titulo = $("#tituloLivro").val();
	var edicao = $("#edicaoLivro").val();
	var data = $("#dataLivro").val();
	var autor = $("#selectLivroAutor").val();
	var genero = $("#selectLivroGenero").val();
	var editora = $("#selectLivroEditora").val();
	//console.log (titulo+edicao+data+autor+genero+editora);
	if (titulo == "" || edicao == "" || data == ""){
		alert ("Campos precisam ser preenchidos");
		return;
	}
	autor_sobrenome = autor.split("-");
	autor = autor_sobrenome[0];
	var sobrenome = autor_sobrenome[1];
	$.ajax({
	    url: "cgi-bin/cadastro/livro.py",
	    type: "post",
	    datatype: "html",
	    data: "titulo="+titulo+"&Idcliente="+id+"&edicao="+edicao+"&genero="+genero+"&autor="+autor+"&sobrenome="+sobrenome+"&data="+data+"&editora="+editora,
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
	            		alert ("Livro já existe :(");
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