function atualizaFormulario () {
	$("#nome").val (cliente.nome);
	$("#Login").val (cliente.login);
	var icones  = $("#icones img");
	for (i = 0; i < icones.length; i++){
		if ($(icones[i]).attr("src") == cliente.icone) {
			$(icones[i]).addClass ("Selecionado");
		}
	} 
}
$("#teste").click (function () {
	var nome = $("#nome").val ();
	var login = $("#Login").val ();
	var senhaAtual = $("#senhaAtual").val ();
	var senha = $("#Senha").val ();
	var confirmeSenha = $("#confirmeSenha").val();
	var icone = $("img.Selecionado").attr("src");
	if (nome == "" || login == "" || senhaAtual == "" || senha == "" || confirmeSenha == "" || icone == "") {
		alert ("Preencha os dados!");
		return;
	}
	if (senhaAtual != cliente.senha) {
		alert ("Senha errada!!");
		return;
	}
	if (senha != confirmeSenha) {
		alert ("Verifique se digitou as senhas corretamente!");
		return;
	}
	var clienteData = nome+","+login+","+senha+","+icone+","+cliente.login; 
	$.ajax({
                url: "cgi-bin/alterar/cliente.py",
                type: "post",
                datatype: "html",
                data: "id="+id+"&clienteData="+clienteData,
                success: function (html)
            {
                var params = $(html).filter(function(){ return $(this).is('p') });
                params.each(
                    function()
                    {
                      if ($(this).text().indexOf("Sucesso") != -1) {
                        	alert ("Sucesso ao alterar!")
                        	cliente = new Cliente (nome, login, senha, icone, id);
                        	iconePerfilCliente = icone;
                        	montaPerfil (nome);
                        }
                       else {
                        console.log ("Erro!!");
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
