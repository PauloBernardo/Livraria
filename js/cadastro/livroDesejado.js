function atualizaSelectLivroDesejado () {
	select = $("#selectLivroDesejado");
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
$("#cadastrarLivroDesejado").click (function () {
	preco = $("#precoLivroDesejado").val();
	empresa = $("#empresa").val ();
	select = $("#selectLivroDesejado").val();
	idlivro = select.split("-")[4];
	if (preco == "" || empresa == "") {
		alert ("Preencha todos os campos");
		return;
	}
	preco = preco.replace ("R", "");
	preco = preco.replace ("$", "");
	preco = preco.replace (",", ".");
	preco = parseFloat (preco);
	console.log (preco+empresa+idlivro);
	$.ajax({
	    url: "cgi-bin/cadastro/livroDesejado.py",
	    type: "post",
	    datatype: "html",
	    data: "preco="+preco+"&Idcliente="+id+"&idlivro="+idlivro+"&empresa="+empresa,
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
	            		alert ("Livro desejado já cadastrado :(");
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