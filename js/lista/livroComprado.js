var livros = [];
var limitador = 20;
var inicio = 0;
var fixarTitulo = false;
var fixarAutor = false;
var fixarGenero = false;
var fixarEditora = false;
var lembrar = false;
var cachorrada = false;
var opcaoExcluir = "";
var target = null;
var Livro = function (titulo, autor, genero, editora, edicao, datas, preco, dataCompra) {
	this.titulo = titulo;
	this.autor = autor;
	this.genero = genero;
	this.edicao = edicao;
	this.editora = editora;
	this.datas = datas;
	this.preco = preco;
	this.dataCompra = dataCompra;
}
function atualizaTabela (como, especial) {
	if (!cachorrada) {
		$("#tabelaLivro tbody").empty ();
	}
	$.ajax({
	    url: "cgi-bin/lista/livroComprado.py",
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
	            		if (dados.length == 8) {
	            			livro = new Livro (dados[0], dados[1], dados[2], dados[3],dados[4], dados[5], dados[6], dados[7]);
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
function esquecer () {
	lembrar = false;
	opcaoExcluir = "";
	target = null;
}
function colocaNaTable () {
	$("#tabelaLivro tbody").empty();
	esquecer ();
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
		$("<td>"+livros[i].preco+"</td>").appendTo (tr);
		$("<td>"+livros[i].dataCompra+"</td>").appendTo (tr);
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
$(document).on ("click","img.excluir", function () {
	var tr = $(this).parent().parent();
	if (lembrar) {
		if (opcaoExcluir == "pesquisa") {
			tr.css ("display", "none");
		}
		else if (opcaoExcluir == "permanentemente") {
			excluirLivro (tr);
		}
	} else {
		target = tr;
		box = $("#promptExcluir");
		box.css ("display", "block");
	}
});
$("#cancelarExclusao").click (function () {
	$("#promptExcluir").css ("display", "none");
	target = null;
});
$("#pesquisaAtual").click (function () {
	box = $("#promptExcluir");
	box.css ("display", "none");
	target.css ("display", "none");
	lembrar = $("#lembrar").prop("checked");
	if (lembrar) {
		opcaoExcluir = "pesquisa";
	}
});
$("#permanentemente").click (function () {
	box = $("#promptExcluir");
	box.css ("display", "none");
	target.css ("display", "none");
	excluirLivro (target);
	lembrar = $("#lembrar").prop("checked");
	if (lembrar) {
		opcaoExcluir = "permanentemente";
	}
});
function excluirLivro (livrinho) {
	var tds = livrinho.find ("td");
	var nomeSobrenome =  $(tds[1]).text().split (", ");
	var sobrenome = nomeSobrenome[0];
	var nome = nomeSobrenome[1];
	var livroData = $(tds[0]).text() + ","+nome+","+sobrenome+","+$(tds[4]).text()+","+$(tds[3]).text();
	var preco =  $(tds[6]).text();
	var data =  $(tds[7]).text();
	console.log (data,preco, livroData);
	$.ajax({
	    url: "cgi-bin/exclusao/LivroComprado.py",
	    type: "post",
	    datatype: "html",
	    data: "Idcliente="+id+"&preco="+preco+"&data="+data+"&livroData="+livroData,
	    success: function (html)
	    {
	        var params = $(html).filter(function(){ return $(this).is('p') });
	        var gerarOpcao = false;
	        //var index = 0;
	        params.each(
	            function()
	            {
	            	if ($(this).text() == "Sucesso!") {
	            		alert ("Sucesso");
	            		reformularLista();
	            	} else {
	            		console.log ($(this).text());
	            	}
	            }
	        );
	        //colocaNaTable();
	    },
	    error: function(request, ajaxOptions, thrownError)
	    {
	        $("#debug").html(request.responseText);
	        $("#debug").html("5566");
	    }
	});
}
function reformularLista () {
	cachorrada = true;
	apagarLivros ();
	atualizaTabela("normal");
}
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
atualizaTabela ("normal");
$("#calcularValorTotal").click (function () {
	valor = 0;
	for (i = 0; i < livros.length; i++) {
		valor += parseFloat (livros[i].preco);
	}
	$("#respostaValorTotal").text (valor).css ("color", "white");
});
$("#calcularValorParcial").click (function () {
	table = $("#tabelaLivro tbody tr");
	valor = 0;
	for (i = 0; i < table.length; i++) {
		var preco = $(table[i]).find ("td");
		valor += parseFloat ($(preco[6]).text());
	}
	$("#respostaValorParcial").text (valor).css ("color", "white");
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
$("#ordenaPorPreco").click (function () {
	apagarLivros ();
	atualizaTabela ("preco");
});
$("#ordenaPorAlfabeto").click (function () {
	apagarLivros ();
	atualizaTabela ("normal");
});
function apagarLivros () {
	var tamanho = livros.length;
	for (i = 0; i < tamanho; i++) {
		livros.pop ();
	}
}
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
$("#selectPreco").change (function () {
	preco = $(this).val ();
	if (preco == "Todos") {
		colocaNaTable ();
		return;
	}
	else {
		if (preco.indexOf("20,00") != -1) {
			preco = 20;
			colocaNaTableComFiltroEspecialPreco (preco, "menor");
		} else if (preco.indexOf("50,00") != -1){
			preco = 50;
			colocaNaTableComFiltroEspecialPreco (preco, "menor");
		} else if (preco.indexOf("Acima de R$ 100,00") != -1) {
			preco = 100;
			colocaNaTableComFiltroEspecialPreco (preco, "maior");
		} else if (preco.indexOf("Abaixo de R$ 100,00") != -1) {
			preco = 100;
			colocaNaTableComFiltroEspecialPreco (preco, "menor");
		}
	}
	console.log (preco);
});
$("#nomeGenero").keyup (function () {
	genero = $("#nomeGenero").val ();
	if (genero == "") {
		colocaNaTable();
		return;
	}
	colocaNaTableComFiltro (genero, "genero");
});
function colocaNaTableComFiltroEspecialPreco (preco, tipo) {
	$("#tabelaLivro tbody").empty ();
	var valor = "";
	esquecer ();
	for (i = 0; i < livros.length; i++) {
		if ((livros[i].preco < preco && tipo == "menor") || (livros[i].preco > preco && tipo == "maior")) {
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
			$("<td>"+livros[i].preco+"</td>").appendTo (tr);
			$("<td>"+livros[i].dataCompra+"</td>").appendTo (tr);
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
function colocaNaTableComFiltro (filtro, tipo) {
	$("#tabelaLivro tbody").empty ();
	var valor = "";
	esquecer ();
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
			$("<td>"+livros[i].preco+"</td>").appendTo (tr);
			$("<td>"+livros[i].dataCompra+"</td>").appendTo (tr);
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