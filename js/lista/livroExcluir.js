var lembrar = false;
var cachorrada = false;
var opcaoExcluir = "";
var target = null;
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
	console.log (livroData);
	$.ajax({
	    url: "cgi-bin/exclusao/livro.py",
	    type: "post",
	    datatype: "html",
	    data: "Idcliente="+id+"&livroData="+livroData,
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
function apagarLivros () {
	var tamanho = livros.length;
	for (i = 0; i < tamanho; i++) {
		livros.pop ();
	}
}
