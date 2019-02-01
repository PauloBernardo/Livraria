function queryString(parameter) {  
      var loc = location.search.substring(1, location.search.length);   
      var param_value = false;   
      var params = loc.split("&");   
      for (i=0; i<params.length;i++) {   
          param_name = params[i].substring(0,params[i].indexOf('='));   
          if (param_name == parameter) {                                          
              param_value = params[i].substring(params[i].indexOf('=')+1)   
          }   
      }   
      if (param_value) {   
          return param_value;   
      }   
      else {   
          return undefined;   
      }   
}
var Cliente = function (nome, login, senha, icone, idcliente) {
    this.nome = nome;
    this.login = login;
    this.senha = senha;
    this.icone = icone;
    this.idcliente = idcliente;
}
var cliente = null;
var variavel = queryString("login");
//variavel = variavel.toUpperCase();
var id = queryString("ID");
var iconePerfilCliente = "";
function getCliente () {
  $.ajax({
                url: "cgi-bin/getIcone.py",
                type: "post",
                datatype: "html",
                data: "id="+id,
                success: function (html)
            {
                var params = $(html).filter(function(){ return $(this).is('p') });
                params.each(
                    function()
                    {
                      if ($(this).text().indexOf("Sucesso") != -1) {
                        var seila = $(this).text().split("=");
                        //console.log (seila);
                        if (seila.length == 6) {
                            cliente = new Cliente (seila[1], seila[2], seila[3], seila[4], seila[5]);
                            //console.log (cliente);
                            iconePerfilCliente = cliente.icone;
                            montaPerfil (cliente.nome);
                            try {
                              atualizaFormulario ();
                            } catch (e) {
                             // console.log (e);
                            }
                        }
                      } else {
                        console.log ("Erro ao pegar imcone");
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
getCliente ();
function montaPerfil (nome) {
  console.log ($("#menu").css("display"));
  if ($("#menu").css("display") == "none") {
      var area = $("#areaPerfil");
      $("#menuAnexo").prepend (area);
  }
  $("img#perfil").attr("src", iconePerfilCliente);
  $("p.nome").text (nome.toUpperCase());
  $("#nome").text (nome.toUpperCase());
}
//console.log (id);
//console.log (variavel);
//console.log ("ueee");
//$("#nome").text(variavel);
$("a.Home").click (function () {
    redirecionar ("indexLogado.html");
});
$("a.ListaDesejo").click (function () {
    redirecionar ("listaDesejos.html");
});
$("a.ListaComprado").click (function (){
    redirecionar ("ListaComprado.html");
});
$("a.Cadastro").click (function () {
    redirecionar ("cadastroLogado.html");
});
$("a.ListaLidos").click (function () {
    redirecionar ("listaLidos.html");
});
$("a.ListaLivro").click (function () {
    redirecionar ("listaLivro.html");
});
$("a.alterarExcluir").click (function () {
    redirecionar ("alterar.html");
});
$("a.Ajuda").click (function () {
    redirecionar ("ajuda.html");
});
$("img#sair").click (function () {
    window.location.href = "index.html";
});
$("img#alterar").click (function () {
    redirecionar ("alterarCliente.html");
});
function redirecionar (pagina) {
  window.location.href = pagina+"?login="+variavel+"&ID="+id;
}