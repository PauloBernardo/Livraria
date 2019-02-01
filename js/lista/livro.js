var livros = [];
var limitador = 20;
var inicio = 0;
var fixarTitulo = false;
var fixarAutor = false;
var fixarGenero = false;
var fixarEditora = false;
var Livro = function (titulo, autor, genero, editora, edicao, datas) {
	this.titulo = titulo;
	this.autor = autor;
	this.genero = genero;
	this.edicao = edicao;
	this.editora = editora;
	this.datas = datas;
}
function atualizaTabela (como, especial) {
	if (!cachorrada) {
		console.log ("apagando tabela");
		$("#tabelaLivro tbody").empty ();
	}
	$.ajax({
	    url: "cgi-bin/lista/livro.py",
	    type: "post",
	    datatype: "html",
	    data: "Idcliente="+id+"&Tipo="+como+"&especial="+especial,
	    success: function (html)
	    {
	        var params = $(html).filter(function(){ return $(this).is('p') });
	        var gerarOpcao = false;
	        //var index = 0;
	        params.each(
	            function()
	            {
	            	if ($(this).text() == "Sucesso!") {
	            		gerarOpcao = true;
	            	}
	            	else if (gerarOpcao) {
	            		//index++;
	            		
	            		var dados = $(this).text().split("-");
	            		if (dados.length == 6) {
	            			livro = new Livro (dados[0], dados[1], dados[2], dados[3],dados[4], dados[5]);
	            			livros.push (livro);
	            		}
	            	} else {
	            		console.log ($(this).text());
	            	}
	            }
	        );
	        if (!cachorrada) {
	        	colocaNaTable();
	        } else {
	        	cachorrada = false;
	        }
	    },
	    error: function(request, ajaxOptions, thrownError)
	    {
	        $("#debug").html(request.responseText);
	        $("#debug").html("5566");
	    }
	});
}
function colocaNaTable () {
	$("#tabelaLivro tbody").empty();
	for (i = inicio; i < livros.length && i < limitador; i++) {
		if (fixarEditora) {
		if (livros[i].editora.indexOf ($("#nomeEditora").val()) == -1) {
		continue;
		}
		}
		if (fixarTitulo) {
		if (livros[i].titulo.indexOf ($("#nomeTitulo").val()) == -1) {
		continue;
		}
		}
		if (fixarGenero) {
		if (livros[i].genero.indexOf ($("#nomeGenero").val()) == -1) {
		continue;
		}
		}
		if (fixarAutor) {
		if (livros[i].autor.indexOf ($("#nomeAutor").val()) == -1) {
		continue;
		}
		}
		var tr = $("<tr></tr>").addClass("dados");
		$("<td>"+livros[i].titulo+"</td>").appendTo (tr);
		$("<td>"+livros[i].autor+"</td>").appendTo (tr);
		$("<td>"+livros[i].genero+"</td>").appendTo (tr);
		$("<td>"+livros[i].editora+"</td>").appendTo (tr);
		$("<td>"+livros[i].edicao+"</td>").appendTo (tr);
		$("<td>"+livros[i].datas+"</td>").appendTo (tr);
		var imgExcluir = $("<img src='img/teste.png'/>").addClass("excluir");
		var excluir = $("<td></td>").addClass("excluir");
		excluir.append (imgExcluir);
		tr.append (excluir);
		var imgAlterar = $("<img src='img/alterar.png'/>").addClass("alterar");
		var alterar = $("<td></td>").addClass("alterar");
		alterar.append (imgAlterar);
		tr.append (alterar);
		tr.appendTo ($("#tabelaLivro tbody"));
	}
}
atualizaTabela ("normal");
$("#nomeTitulo").keyup (function () {
	titulo = $("#nomeTitulo").val ();
	if (titulo == "") {
		colocaNaTable ();
		return;
	}
	colocaNaTableComFiltro(titulo,"titulo");
});
$("#nomeAutor").keyup (function () {
	autor = $("#nomeAutor").val ();
	if (autor == "") {
		colocaNaTable ();
		return;
	}
	colocaNaTableComFiltro(autor, "autor");
});
$("#nomeEditora").keyup (function () {
	editora = $("#nomeEditora").val ();
	if (editora == "") {
		colocaNaTable();
		return;
	}
	colocaNaTableComFiltro (editora, "editora");
});
/*
$("#pesquisarTitulo").click (function () {
	titulo = $("#nomeTitulo").val ();
	if (titulo == "") {
		return;
	}
	colocaNaTableComFiltro(titulo,"titulo");
});
$("#pesquisarAutor").click (function () {
	autor = $("#nomeAutor").val ();
	if (autor == "") {
		return;
	}
	colocaNaTableComFiltro(autor, "autor");
});
$("#pesquisarEditora").click (function () {
	editora = $("#nomeEditora").val ();
	if (editora == "") {
		return;
	}
	colocaNaTableComFiltro (editora, "editora");
});
$("#pesquisarGenero").click (function () {
	genero = $("#nomeGenero").val ();
	if (genero == "") {
		return;
	}
	colocaNaTableComFiltro (genero, "genero");
});*/
$("#fixarTitulo").click (function() {
	titulo = $(this).text();
	if (titulo == "Fixar") {
		$(this).text("Desfixar");
		fixarTitulo = true;
	} else {
		$(this).text ("Fixar");
		fixarTitulo = false;
	}
});
$("#fixarAutor").click (function() {
	autor = $(this).text();
	if (autor == "Fixar") {
		$(this).text("Desfixar");
		fixarAutor = true;
	} else {
		$(this).text ("Fixar");
		fixarAutor = false;
	}
});
$("#fixarGenero").click (function() {
	genero = $(this).text();
	if (genero == "Fixar") {
		$(this).text("Desfixar");
		fixarGenero = true;
	} else {
		$(this).text ("Fixar");
		fixarGenero = false;
	}
});
$("#fixarEditora").click (function() {
	editora = $(this).text();
	if (editora == "Fixar") {
		$(this).text("Desfixar");
		fixarEditora = true;
	} else {
		$(this).text ("Fixar");
		fixarEditora = false;
	}
});
$("#nomeGenero").keyup (function () {
	genero = $("#nomeGenero").val ();
	if (genero == "") {
		colocaNaTable();
		return;
	}
	colocaNaTableComFiltro (genero, "genero");
});
$("#anterior").click (function () {
	numeroAtual = $("#numeroDeQuantidade").text ();
	//console.log ("oxe"+numeroAtual);
	if (numeroAtual == "1") {
		//console.log (numeroAtual);
		//$("#numeroDeQuantidade").text (parseInt(numeroAtual)+1);
		return;
	}
	else {
		$("#numeroDeQuantidade").text (parseInt(numeroAtual)-1);
		inicio -= 20;
		limitador -= 20;
		colocaNaTable();
	}
});
$("#proximo").click (function () {
	if (inicio+20 > livros.length) {
		return;
	}
	numeroAtual = $("#numeroDeQuantidade").text ();
	$("#numeroDeQuantidade").text (parseInt(numeroAtual)+1);
	inicio += 20;
	limitador += 20;
	colocaNaTable ();
	return;
});
function colocaNaTableComFiltro (filtro, tipo) {
	$("#tabelaLivro tbody").empty ();
	opcaoExcluir = "";
	lembrar = false;
	var valor = "";
	for (i = 0; i < livros.length; i++) {
		if (tipo == "titulo") {
			valor = livros[i].titulo.toUpperCase();
		} else if (tipo == "autor") {
			valor = livros[i].autor.toUpperCase ();
		} else if (tipo == "editora") {
			valor = livros[i].editora.toUpperCase();
		} else if (tipo == "genero") {
			valor = livros[i].genero.toUpperCase();
		}
		if (valor.indexOf (filtro.toUpperCase()) != -1) {
			if (fixarEditora) {
				if (livros[i].editora.indexOf ($("#nomeEditora").val()) == -1) {
					continue;
				}
			}
			if (fixarTitulo) {
				if (livros[i].titulo.indexOf ($("#nomeTitulo").val()) == -1) {
					continue;
				}
			}
			if (fixarGenero) {
				if (livros[i].genero.indexOf ($("#nomeGenero").val()) == -1) {
					continue;
				}
			}
			if (fixarAutor) {
				if (livros[i].autor.indexOf ($("#nomeAutor").val()) == -1) {
					continue;
				}
			}
			var tr = $("<tr></tr>").addClass("dados");
			$("<td>"+livros[i].titulo+"</td>").appendTo (tr);
			$("<td>"+livros[i].autor+"</td>").appendTo (tr);
			$("<td>"+livros[i].genero+"</td>").appendTo (tr);
			$("<td>"+livros[i].editora+"</td>").appendTo (tr);
			$("<td>"+livros[i].edicao+"</td>").appendTo (tr);
			$("<td>"+livros[i].datas+"</td>").appendTo (tr);
			var imgExcluir = $("<img src='img/teste.png'/>").addClass("excluir");
			var excluir = $("<td></td>").addClass("excluir");
			excluir.append (imgExcluir);
			tr.append (excluir);
			var imgAlterar = $("<img src='img/alterar.png'/>").addClass("alterar");
			var alterar = $("<td></td>").addClass("alterar");
			alterar.append (imgAlterar);
			tr.append (alterar);
			tr.appendTo ($("#tabelaLivro tbody"));
		}
	}
}