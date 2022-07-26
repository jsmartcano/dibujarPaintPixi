/**
 * @class Clase que se encarga de la carga del script. 
 * @returns {SkinManager}
 */
var nameSpace = nameSpace || {};
(function(nameSpace) {
	nameSpace.SkinManager = function(_self) {
	
	/*
	 * Miembro que se convertirá en una clase al crear el skin.
	 * El skin debe ser una clase CustomSkinClass, y se pueden tener funcionalidades
	 * personalizadas siempre bajo la interfaz de CustomSkinClass
	 */
	this._customSkin = null;
	
	var timer;
		
	/**
	 *  Entrada para la carga del skin del curso. Carga el skin y crea los scripts
	 *  css y js del skin
	 */
	this.loadSkin = function() {
		
	    var skin = _self.SettingsManager.getSetting("SKIN").getValue();
		var self = this;
		  
		 _self.Utils.loadCssScript("style", skin, "stylesheet", "all");
		 _self.Utils.loadCssCustomJsScript(skin);
		 _self.Utils.loadInterfazJsScript(skin);			 		 
		 
		 // Comprobar que esté todo cargado y continuar
		 timer = setInterval(function() {
			_self.DebugManager.say("Waiting for load game skin...");
			if (nameSpace.interfaz == null) {return; }			
			if (nameSpace.CustomSkinClass == null) {return; }
			clearInterval(timer);
			self.skinLoaded();
		 }, 500);
		
	};
		

	this.showPreloadInit = function (visible) {
	    if (visible == true) {
	        $("#preloadInitDiv").css("visibility", "visible");
	    } else {
	        $("#preloadInitDiv").css("visibility", "hidden");
	    }
	};

	this.showSkin = function (visible) {
	    _self.DebugManager.say("SHOW SKIN ... ");
	    if (visible == true) {
	        $("#resizable_wrapper").fadeIn(500);
	    } else {
	        $("#resizable_wrapper").fadeOut(400);
	    }
	};

	/**
	 * Una vez que la carga se ha hecho completa, se llama a la función de custom
	 * configureHtmlInterfaz para distribuir todos los elementos HTML por el escenario,
	 * y para el cálculo de las áreas html para cada objeto del skin
	 */
	this.skinLoaded = function() {
	    _self.DebugManager.say("Configure stage... ");
		this._customSkin = new nameSpace.CustomSkinClass(_self);						
		_self.InputManager.fireEvent.apply(_self.InputManager,["onSkinLoaded"]);				
	};
	
	
	
	
}
})(nameSpace);