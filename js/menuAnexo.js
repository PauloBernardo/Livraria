$("#abreMenu").click ( function () {
	var menu = $("#menuAnexo");
	if (menu.css("display") == "none") {
		menu.css ("display", "block");
		$(this).css ("left", "50%");
	} else {
		menu.css ("display", "none");
		$(this).css ("left", "0px");
	}
});