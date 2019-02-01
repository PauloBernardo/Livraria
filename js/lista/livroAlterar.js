var target = null; 
var livroAntigo = null;
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
$(document).on ("click", "img.alterar", function () {
	atualizaSelectLivro ();
	tr = $(this).parent().parent();
	target = tr;
	tds = tr.find ("td");
	var nomeSobrenome =  $(tds[1]).text().split (", ");
	var sobrenome = nomeSobrenome[0];
	var nome = nomeSobrenome[1];
	livroAntigo = $(tds[0]).text() + ","+nome+","+sobrenome+","+$(tds[4]).text()+","+$(tds[3]).text();
	console.log (livroAntigo);
	$("#promptAlterar").css ("display", "block");
});
$("#cancelarAlterar").click (function () {
	$("#promptAlterar").css ("display", "none");
	target = null;
	livroAntigo = null;
});
$("#alterarLivro").click (function () {
	var titulo = $("#tituloLivro").val ();
	var edicao = $("#edicaoLivro").val();
	var data = $("#dataLivro").val ();
	var editora = $("#selectLivroEditora").val ();
	var genero = $("#selectLivroGenero").val ();
	var autor = $("#selectLivroAutor").val ().split("-");
	var nome = autor[0];
	var sobrenome = autor[1];
	var livro = titulo+","+nome+","+sobrenome+","+genero+","+edicao+","+editora+","+data;
	if (titulo == "" || edicao == "" || data == "") {
		alert ("Preencha os dados!");
		return;
	}
	console.log(livro);
	$.ajax({
	    url: "cgi-bin/alterar/livro.py",
	    type: "post",
	    datatype: "html",
	    data: "Idcliente="+id+"&livro="+livro+"&livroAntigo="+livroAntigo,
	    success: function (html)
	    {
	        var params = $(html).filter(function(){ return $(this).is('p') });
	        var gerarOpcao = false;
	        params.each(
	            function()
	            {
	            	if ($(this).text().indexOf ("Sucesso!") != -1) {
	            		alert ("Sucesso");
	            		$("#promptAlterar").css ("display", "none");
	            		var tr = target;
						target = null;
						livroAntigo = null;
						var dados = $(this).text().split("-");
						var livroAUX = null;
						console.log (dados);
	            		if (dados.length == 7) {
	            			livroAUX = new Livro (dados[1], dados[2], dados[3], dados[4],dados[5], dados[6]);
	            			//livros.push (livro);
	            		}
						//tr = $(this).parent().parent();
						console.log (tr);
						tds = tr.find ("td");
						$(tds[0]).text (livroAUX.titulo);
						$(tds[1]).text (livroAUX.autor);
						$(tds[2]).text (livroAUX.genero);
						$(tds[3]).text (livroAUX.editora);
						$(tds[4]).text (livroAUX.edicao);
						$(tds[5]).text (livroAUX.datas);
						reformularLista();
	            	} else if ($(this).text() == "ERRO NOME") {
	            		alert ("Já existe este livro comprado!");
	            	}
	            	else {
	            		console.log ($(this).text());
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