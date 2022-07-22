
/**
 * Inicio del programa
 */

/**
 * Espacio de nombres del proyecto para no mezclar con otros players o juegos
 * utilizado para la creación de los manager
 */

var nameSpace = nameSpace || {};
nameSpace.game = new nameSpace.GameClass();


$(document).ready(function() {  

	// Start!!
    nameSpace.game.StatesManager.start("StartState");
	
});


var finished = 0;
function doFinish(msg) {

	nameSpace.game.DebugManager.say("----> In hacerFinish desde " + msg + ". Se ha ordenado cerrar la ventana");
	if (finished == 0) {
		finished = 1;
		try {
			var canvas = document.getElementById('canvas');
			var ctx = canvas.getContext('2d');
			var imgData = canvas.toDataURL();
			nameSpace.game.SkinManager._customSkin.setVariable("Datos", imgData)
		} catch (ee) {
			var a = 1;
		}


	}

}

if (GUARDAR_DATOS_EN_STORY == true) {
	if (parent != window) {


		window.onbeforeunload = function () {
			doFinish("window.onbeforeunload");
		};
		window.onunload = function () { doFinish("window.onunload"); };
		try {
			$(window).unload(function () { doFinish("$(window).unload"); });
		} catch (ee) { }

		if (window.top) {
			try {
				window.top.onunload = function () { doFinish("window.top.onunload"); };
			} catch (ee) { }
			try {
				window.top.onbeforeunload = function () { doFinish("window.top.onbeforeunload"); };
			} catch (ee) { }
		}

		if (window.frames && window.frames.length > 0) {
			for (var i = window.frames.length - 1; i >= 0; i--) {
				var frame = window.frames[i];
				try { frame.onunload = function () { doFinish("window.frame " + i + ".onunload"); }; } catch (ee) { };
				try { frame.onbeforeunload = function () { doFinish("window.frame " + i + ".onbeforeunload"); }; } catch (ee) { };
			}
		}
	}
}