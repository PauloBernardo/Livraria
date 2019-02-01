var target = null; 
var dataAntiga = null;
var precoAntigo = null;
var livroAntigo = null;
function atualizaSelectLivroComprado () {
	select = $("#selectLivroComprado");
	select.empty();
	$.ajax({
	    url: "cgi-bin/lista/livro.py",
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
	            	} else {
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
}
$(document).on ("click", "img.alterar", function () {
	atualizaSelectLivroComprado ();
	tr = $(this).parent().parent();
	target = tr;
	tds = tr.find ("td");
	var preco = $(tds[6]).text();
	var data = $(tds[7]).text ();
	precoAntigo = preco;
	dataAntiga = data;
	var nomeSobrenome =  $(tds[1]).text().split (", ");
	var sobrenome = nomeSobrenome[0];
	var nome = nomeSobrenome[1];
	livroAntigo = $(tds[0]).text() + ","+nome+","+sobrenome+","+$(tds[4]).text()+","+$(tds[3]).text();
	console.log (livroAntigo);
	$("#precoLivroComprado").val (preco);
	$("#dataCompraLivro").val(data);
	$("#promptAlterar").css ("display", "block");
});
$("#cancelarAlteracao").click (function () {
	$("#promptAlterar").css ("display", "none");
	target = null;
	dataAntiga = null;
	precoAntigo = null;
	livroAntigo = null;
});
$("#alterarLivroComprado").click (function () {
	var preco = $("#precoLivroComprado").val ();
	var data = $("#dataCompraLivro").val();
	var livro = $("#selectLivroComprado").val().split("-")[4];
	if (preco == "" || data == "" || livro == "" || livro == undefined || preco == NaN) {
		alert ("Preencha os dados!");
		return;
	}
	preco = preco.replace ("R", "");
	preco = preco.replace ("$", "");
	preco = preco.replace (",", ".");
	preco = parseFloat (preco);
	console.log (preco);
	if (Number.isNaN(preco)) {
		alert ("Digite um número válido!");
		return;
	}
	$.ajax({
	    url: "cgi-bin/alterar/livroDesejado.py",
	    type: "post",
	    datatype: "html",
	    data: "Idcliente="+id+"&Tipo=Alfabetico&preco="+preco+"&data="+data+"&idlivro="+livro+"&precoAntigo="+precoAntigo+"&dataAntiga="+dataAntiga+"&livroAntigo="+livroAntigo,
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
						dataAntiga = null;
						precoAntigo = null;
						livroAntigo = null;
						var dados = $(this).text().split("-");
						var livroAUX = null;
						console.log (dados);
	            		if (dados.length == 9) {
	            			livroAUX = new Livro (dados[1], dados[2], dados[3], dados[4],dados[5], dados[6], dados[7], dados[8]);
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
						$(tds[6]).text(livroAUX.preco);
						$(tds[7]).text (livroAUX.dataCompra);
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