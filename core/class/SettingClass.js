			
/**
 * @class Setting Representa un parámetro.
 */
var nameSpace = nameSpace || {};
(function(nameSpace) {
	nameSpace.SettingClass = function(name,type,defaultValue) {
		var _name = null;
		var _urlValue = null;
		var _contentValue = null;
		var _manifestValue = null;
		var _defaultValue = null;
		var _userValue = null;
		var _type = null;
		
		_name = name.toUpperCase();
		_type= type.toUpperCase();
		
		if (
				defaultValue!=undefined && 
				defaultValue!="undefined" &&
				defaultValue!=null
			) {
			_defaultValue = defaultValue;
		}
			
		
		this.setUserValue = function(val) { _userValue = this.formatValue(val); };
		this.setUrlValue = function(val) {_urlValue = this.formatValue(val);};
		this.setManifestValue = function(val) {	_manifestValue = this.formatValue(val);	};
		this.setContentValue = function(val) {	_contentValue = this.formatValue(val);	};
		this.getType = function() {	return _type; };
		this.getName = function() {	return _name; };
		
		/**
		 * Devuelve el valor del parámetro, con la prioridad:
		 * 0 el valor que le ha dado el usuario, (valor que se da en tiempo de 
		 * ejecución por una elección del usuario o un evento en el programa)
		 * 1 el valor que ha llegado como parámetro por url
		 * 2 el valor del imsmanifest.xml, (en caso que sea scorm)
		 * 3 el valor del content.xml
		 * 
		 */
		this.getValue = function() { 
			var result = null;
			if (_defaultValue!=null) { result = _defaultValue; }
			if (_contentValue!=null) { result = _contentValue; }
			if (_manifestValue!=null) { result = _manifestValue; }
			if (_urlValue!=null) { result = _urlValue; }
			if (_userValue!=null) { result = _userValue; }
			return result; 
		};
		
		this.getValueFrom = function() {
			var result = "NULL_VALUE";
			if (_defaultValue!=null) { result = "DEFAULT"; }
			if (_contentValue!=null) { result = "CONTENT_XML"; }
			if (_manifestValue!=null) { result = "SCORM_MANIFEST"; }
			if (_urlValue!=null) { result = "URL"; }
			if (_userValue!=null) { result = "USER"; }
			return result; 
		};
		
		this.formatValue = function(val) {
			var result = null;
			switch(_type) {
				case "STRING": result = val; break;
				case "INTEGER": result = parseInt(val,10); break;
			}
			return result;
		};

		this.toString = function () {
		    return "setting: " + _name + ": " + this.getValue() + ", (" + _type + "), from " + this.getValueFrom();
		}
	};
})(nameSpace);