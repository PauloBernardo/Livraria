$("#autores").click (function () {
	resetar();
	$(this).css ("background-color", "skyblue");
	$("#cadastroAutores").css ("display", "block");
	atualizaSelectAutor();
});
$("#editoras").click (function () {
	resetar();
	$(this).css ("background-color", "skyblue");
	$("#cadastroEditoras").css ("display", "block");
	atualizaSelectEditoraAtual();
});
$("#generos").click (function () {
	resetar();
	$(this).css ("background-color", "skyblue");
	$("#cadastroGeneros").css ("display", "block");
	atualizaSelectGeneroAtual();
});
$("#livros").click (function () {
	resetar();
	$(this).css ("background-color", "skyblue");
	$("#cadastroLivros").css ("display", "block");
	atualizaSelectLivro();
});
$("#livrosComprados").click (function () {
	resetar();
	$(this).css ("background-color", "skyblue");
	$("#cadastroLivrosComprados").css ("display", "block");
	atualizaSelectLivroComprado();
});
$("#livrosLidos").click (function () {
	resetar();
	$(this).css ("background-color", "skyblue");
	$("#cadastroLivrosLidos").css ("display", "block");
	atualizaSelectLivroLido();
});
$("#livrosDesejados").click (function () {
	resetar();
	$(this).css ("background-color", "skyblue");
	$("#cadastroLivrosDesejados").css ("display", "block");
	atualizaSelectLivroDesejado ();
});

function resetar () {
	$("#autores").css ("background-color", "white");
	$("#editoras").css ("background-color", "white");
	$("#generos").css ("background-color", "white");
	$("#livros").css ("background-color", "white");
	$("#livrosComprados").css ("background-color", "white");
	$("#livrosLidos").css ("background-color", "white");
	$("#livrosDesejados").css ("background-color", "white");

	$("#cadastroAutores").css ("display", "none");
	$("#cadastroEditoras").css ("display", "none");
	$("#cadastroGeneros").css ("display", "none");
	$("#cadastroLivros").css ("display", "none");
	$("#cadastroLivrosComprados").css ("display", "none");
	$("#cadastroLivrosLidos").css ("display", "none");
	$("#cadastroLivrosDesejados").css ("display", "none");
}