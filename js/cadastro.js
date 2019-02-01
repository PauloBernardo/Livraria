$("#teste").click (function () {
	var nome = $("#nome").val ();
	var login = $("#Login").val ();
	var senha = $("#Senha").val ();
	var imagem = $("img.Selecionado");
	var icone = imagem.attr("src");
	var confirm = $("#confirmeSenha").val();
	if (nome == "" || login == "" || senha == "" || icone == null) {
		alert ("Preencha os dados!");
		return;
	}
	if (senha != confirm) {
		alert ("Confirme sua senha!");
		return;
	}
	$.ajax({
	    url: "cgi-bin/cadastro.py",
	    type: "post",
	    datatype: "html",
	    data: "nome="+nome+"&login="+login+"&senha="+senha+"&icone="+icone,
	    success: function (html)
	    {
	        var params = $(html).filter(function(){ return $(this).is('p') });
	        params.each(
	            function()
	            {
	            	if ($(this).text() == "Sucesso!") {
	            		alert ("Cadastro feito com sucesso!");
	            		$("#nome").val ("");
						$("#Login").val ("");
						$("#Senha").val ("");
						imagem.removeClass ("Selecionado");
						$("#confirmeSenha").val("");
	            	} else if ($(this).text() == "ERRO LOGIN") {
	            		alert ("Login já existe :(");
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
$("img").click (function () {
	var imagem = $(this);
	$("img").removeClass ("Selecionado");
	imagem.addClass ("Selecionado");
	//console.log (imagem.hasClass("Selecionado"));
});