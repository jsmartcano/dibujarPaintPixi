/**
 * @class Clase que se encarga de la redimensión del player 
 * @returns {ScaleManager}
 */
var nameSpace = nameSpace || {};
(function(nameSpace) {
	nameSpace.ScaleManager = function(_self) {
	
	var ratio = 0;
	
	var aureswf = 0;
	
	/*************************************************************************/
	/** INICAR REDIMENSION. SE EJECUTA SOLO UNA VEZ							**/
	/*************************************************************************/
	
	/**
	 * Inicia el sistema de redimensión. 
	 */
	function _start() 
	{

	    _self.DebugManager.say("******************************** INICIO SISTEMA REDM ");
	    aureswf = _self.SettingsManager.getSetting("AURESWF").getValue();
		_self.DebugManager.say("Init Redim System");
		
		$(window).resize(function() {
			_redim();
		});
		try {
			top.window.addEventListener("orientationchange", function() {
				_redim();
			 }, false);
		} catch(ee) { _self.DebugManager.say(ee.name + ":" + ee.message); }
		_redim();		
	};
	
	
	/*************************************************************************/
	/** BLOQUE REDIMENSION. SE EJECUTA CADA VEZ QUE 						**/
	/** CAMBIA TAMAÑO DE PANTALLA 											**/
	/*************************************************************************/
	
	/**
	 * Se lanza cada vez que se detecta cambio de tamaño de ventana y se encarga
	 * de modificar el tamaño del curso, y/o su posición en la pantalla
	 * 
	 */
	function _redim() {
	    if (aureswf == 1) {
	        _self.SkinManager._customSkin.redim();
	    }
	}
	
	
	
	
	return {
		redim : _redim,
		start: _start
	};
	
}
})(nameSpace);
		