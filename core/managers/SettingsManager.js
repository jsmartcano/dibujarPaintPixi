/**
 * @class Clase con los parámetros y sus procedimientos
 * @returns {Settings}
 */
var nameSpace = nameSpace || {};
(function(nameSpace) {
	nameSpace.SettingsManager = function(_self) {
	

			
	/**
	 * Lista de parámetros estandar
	 */
		this.list = new Array();
	
		this.getDefaultLang = function () {
		    return "es";
		};
       			
	/**
	 * Devuelve un parámetro si existe, y si no, devuelve null
	 */
	this.getSetting = function(pTxt) {
		txt = pTxt.toUpperCase();
		for (var i=0; i<this.list.length;i++) {
			var s = this.list[i];
			if (s.getName()==txt) {				
			   // _self.DebugManager.say("found setting "+txt+" = "+s.getValue()+", type: "+s.getType()+", from: "+s.getValueFrom());
				return s;
			}
		}
		_self.DebugManager.say("NOT found setting "+txt,10);
		return null;
	};
	
	 
		this.listToString = function() {		
			for (var i=0; i<this.list.length;i++) {
				var s = this.list[i];
				
					_self.DebugManager.say(s.toString());
				
				}
			};
			
		this.getLangNav = function() {
		    var idioma_Nav;  
		    if (navigator.language){
		        idioma_Nav = navigator.language;
		    } else {
		        idioma_Nav = navigator.browserLanguage;
		    }
		    idioma_Nav=idioma_Nav.toLowerCase();
		    idioma_Nav = idioma_Nav.substr(0, 2);
		    return idioma_Nav;
		}
			
		this.getOSName = function () {
		   // return "ANDROID";
			return BrowserDetect.OS.toUpperCase();
		};

	
		this.getBrowserName = function() {
			return BrowserDetect.browser.toUpperCase();
		};
		
		this.getBrowserVersion = function() {
			return BrowserDetect.version.toString().toUpperCase();
		};
	
		
		this.isIE = function() {
			var os = this.getOSName();
			var nav = this.getBrowserName();
	
			if (os == "WINDOWS" && nav == "EXPLORER") {
				return true;
			} 
			else 
			{
				return false;
			}
		}


		
	//Creación de parámetros		
		
	// Especifica el interfaz a cargar
	this.list.push(new nameSpace.SettingClass("SKIN","string","avanzo"));
		
    // Escalado
	this.list.push(new nameSpace.SettingClass("AURESWF", "intenger", 0));


		    		
	
};
})(nameSpace);