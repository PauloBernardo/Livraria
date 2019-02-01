function atualizaSelectLivroLido () {
	select = $("#selectLivroLido");
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
$("#cadastrarLivroLido").click (function () {
	data = $("#dataLivroLido").val();
	palavras = $("#palavrasChaves").val ();
	select = $("#selectLivroLido").val();
	idlivro = select.split("-")[4];
	if (data == "" || palavras == "") {
		alert ("Preencha todos os campos");
		return;
	}
	console.log (data+palavras+idlivro);
	$.ajax({
	    url: "cgi-bin/cadastro/livroLido.py",
	    type: "post",
	    datatype: "html",
	    data: "data="+data+"&Idcliente="+id+"&idlivro="+idlivro+"&palavras="+palavras,
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
	            		alert ("Livro lido já cadastrado :(");
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