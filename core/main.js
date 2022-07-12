
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




