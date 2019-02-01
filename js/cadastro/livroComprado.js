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
$("#cadastrarLivroComprado").click (function () {
	preco = $("#precoLivroComprado").val();
	data = $("#dataCompraLivro").val ();
	select = $("#selectLivroComprado").val();
	idlivro = select.split("-")[4];
	if (preco == "" || data == "") {
		alert ("Preencha todos os campos");
		return;
	}
	preco = preco.replace ("R", "");
	preco = preco.replace ("$", "");
	preco = preco.replace (",", ".");
	preco = parseFloat (preco);
	//console.log (preco);
	if (Number.isNaN(preco)) {
		alert ("Digite um número válido!");
		return;
	}
	$.ajax({
	    url: "cgi-bin/cadastro/livroComprado.py",
	    type: "post",
	    datatype: "html",
	    data: "preco="+preco+"&Idcliente="+id+"&data="+data+"&idlivro="+idlivro,
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
	            		alert ("Livro comprado já cadastrado :(");
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