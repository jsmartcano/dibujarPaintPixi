/**
 * @class Clase con funciones utilidades
 * @returns {Utils}
 */
var nameSpace = nameSpace || {};
(function(nameSpace) {
nameSpace.UtilsClass = function(_self) {
	
	/**
	 * Extender el objeto String de javascript para funciones necesarias
	 * 
	 */
	String.prototype.capitalizeFirstLetter = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	};

	//Polyfill ENTRIES
	// -------------------------------
	if (!Object.entries)
		Object.entries = function( obj ){
		var ownProps = Object.keys( obj ),
			i = ownProps.length,
			resArray = new Array(i); // preallocate the Array
		while (i--)
		resArray[i] = [ownProps[i], obj[ownProps[i]]];

		return resArray;
	};
	


	String.prototype.replaceAt = function (index, character) {
	    return this.substr(0, index) + character + this.substr(index + character.length);
	}

    // Polyfill TRIM
	if (!String.prototype.trim) {
	    (function () {
	        // Make sure we trim BOM and NBSP
	        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	        String.prototype.trim = function () {
	            return this.replace(rtrim, '');
	        };
	    })();
	}

	String.prototype.clean = function () {
	    //return this.replace(/\s+/g, ' ').trim();
	    return this.replace(/\r?\n|\r/g, "");
	}

    /**
    * Extender array para crear una función que me diga si existe un elemento
    * Arrays asociativos
    */
	Array.prototype.containsIndex = function (obj) {
	    var result = false;
	    if (this[obj] !== undefined) {
	        result = true;
	    } 
	    return result;
	}

		// -----------------------------------------------------------------------------
		this.centerVertically = function (child, parent) {
			var parentH = $(parent).innerHeight();
			var childH =  $(child).innerHeight();
			var top=0;
			if (parentH>childH) {
			   top = (parentH / 2) - (childH / 2);
			}
			return top;
		}

		// -----------------------------------------------------------------------------
		this.centerHorizontally = function (child, parent) {
			var parentH = $(parent).innerWidth();
			var childH =  $(child).outerWidth();
			var top=0;
			if (parentH>childH) {
			   top = (parentH / 2) - (childH / 2);
			}
			return top;
		}

    /**
    * Extender un array para ver si contiene un elemento
    */
	if (!Array.prototype.includes) {
	    Array.prototype.includes = function (searchElement /*, fromIndex*/) {
	        'use strict';
	        var O = Object(this);
	        var length = parseInt(O.length) || 0;
	        if (len === 0) {
	            return false;
	        }
	        var n = parseInt(arguments[1]) || 0;
	        var k;
	        if (n >= 0) {
	            k = n;
	        } else {
	            k = len + n;
	            if (k < 0) { k = 0; }
	        }
	        var currentElement;
	        while (k < len) {
	            currentElement = O[k];
	            if (searchElement === currentElement ||
                   (searchElement !== searchElement && currentElement !== currentElement)) {
	                return true;
	            }
	            k++;
	        }
	        return false;
	    };
	}

	this.shuffle = function(array) {
	    var currentIndex = array.length, temporaryValue, randomIndex;

	    // While there remain elements to shuffle...
	    while (0 !== currentIndex) {

	        // Pick a remaining element...
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;

	        // And swap it with the current element.
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }

	    return array;
	}
	
	this.isNumeric = function( obj ) {
	    return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	};

	this.parsearXML = function(data) {
		var result=null;
		_self.DebugManager.say("In parsearXML(data) --> "+typeof data);
		var tipo = typeof data;
		if(tipo == "string"){
			if (typeof window.DOMParser != "undefined") 
			{
			    var parser = new DOMParser();
			    result = parser.parseFromString(data, "text/xml");
			} 
			else if (typeof window.ActiveXObject != "undefined") 
			{ 
				result = new ActiveXObject('Microsoft.XMLDOM');      
				result.async = false;      
				result.loadXML(data);
			}			
		} else if (tipo == "object"){       
			result = data;    
		}
		return result;
	};
	
	/**
	 * Carga de hoja de estilos
	 */
	this.loadCssScript = function(id, skin, rel, media) {
		   var src = _self.RouteManager.getSkin() + "css/" + id + ".css";
		   this.loadScript(undefined,"text/css","link",rel, media, src);		
	};
	
	this.loadCssCustomJsScript = function(skin) {
		   var src = _self.RouteManager.getSkin() + "CustomSkinClass.js";
		   this.loadScript(src,"text/javascript","script");		   
	};

	this.loadLangJsScript = function(skin) {
		var src = _self.RouteManager.getSkin() + "langs.js";
		this.loadScript(src,"text/javascript","script");		   
	}

	this.loadInterfazJsScript = function(skin) {
		var src = _self.RouteManager.getSkin() + "interfaz.js";
		this.loadScript(src,"text/javascript","script");		   
	}

	this.loadQuestionsJsScript = function(skin) {
		var src = _self.RouteManager.getSkin() + "questions.js";
		this.loadScript(src,"text/javascript","script");		   
	}

	this.loadNodesJsScript = function(skin) {
		var src = _self.RouteManager.getSkin() + "nodes.js";
		this.loadScript(src,"text/javascript","script");		   
	}
	
	
	/**
	 * Carga script
	 * 
	 */
	this.loadScript = function(src,type,element, rel, media, href) {
		 var script = document.createElement(element);
		
		 
		   // Atributos del script		   
		   script.setAttribute("type", type);
				     
		   if (src!=undefined) { script.setAttribute("src", src);  }
		   if (href!=undefined) { script.setAttribute("href", href);  }
		   if (rel!=undefined) { script.setAttribute("rel", rel);  }
		   if (media!=undefined) { script.setAttribute("media", media);  }
		   	
		   // Insertar script en la cabecera
		   document.getElementsByTagName("head")[0].appendChild(script);
		   
		   		   		   
	};
	
	
	this.existsFile = function(file) {
		var result=false;
		
		$.ajax({
		    url:file,
		    async: false, 
		    type:'HEAD',		    
		    success: function()
		    {
		    	result=true;
		    }
		});
		return result;
	};
	
	this.replaceAll = function(text, searchStr, replaceStr) { 
	    while (text.toString().indexOf(searchStr) != -1)
	        text = text.toString().replace(searchStr, replaceStr); 
	    return text; 
	};

	this.encodeTxt = function (txt) {
	    var str = encodeURI(txt);
	    str = this.replaceAll(str, "%", "");
	    return str;
	}
	
	
	/**
	 * Obtiene la ruta de la cadena dada.
	 * Da todo el path menos el último item
	 * @param str
	 */
	this.getFolder = function(str) {
		var result = "";
		if (str.indexOf("/")>-1)
		{ // hay ruta
			var arr = str.split("/");
			arr.pop();
			result = arr.join("/") + "/";				
		}
		return result;
	};
	
	/**
	 * Obtiene el archivo despreciando la cadena
	 */
	this.getFile = function(str) {
	    var result = str;
	    var char = null;
	    if (str.indexOf("/") > -1) { char = "/"; }
	    if (str.indexOf("\\") > -1) { char = "\\"; }
        
	    if (char != null) { // hay ruta
	        var arr = str.split(char);
	        result = arr.pop();
	    }
		return result;
	};

	this.getExtension = function (str) {
	    var arr = str.split(".");
	    var ext = arr[arr.length - 1];
	    return ext;
	}


    // Obtener valor de una cadena subcadena en cadena formato [sep][item=value]
    // -----------------------------------------------------------------------------
	this.getValue = function(pStr, strItem, sep) {
	  
	    var stringArr = pStr.split(sep);
	    var strItemArr = "";
	    var valueItemArr = "";
	    var i;

	    for (i = 0; i < stringArr.length; i++) {
	        strItemArr = stringArr[i].split("=")[0];
	        valueItemArr = stringArr[i].split("=")[1];
	        if (strItemArr.toUpperCase() == strItem.toUpperCase()) {
	            
	            return valueItemArr;
	        }
	    }
	  
	    return "";
	}

	this.getRandom = function (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;        
	}

		
	this.getUniqueId = function () {
	    var d = new Date();
	    return "unique-" + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds();
	}


	/**
	 * Generar random no existentes en un array
	 * @param {*} arr Array con números prohibidos
	 * @param {*} min 
	 * @param {*} max 
	 */
	this.getNewRandom = function(arr, min, max) {
		var maxTries = 500;
		var tries = 0;
		var r = this.getRandom(min,max);	
		while (arr.includes(r) && tries < maxTries) {
			r = this.getRandom(min,max);	
			tries = tries + 1;
		}
		return r;
	}
  
  // Array fill Polyfill
  if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function(value) {

      // Pasos 1-2.
      if (this == null) {
        throw new TypeError('esto es nulo o no definido');
      }

      var O = Object(this);

      // Pasos 3-5.
      var len = O.length >>> 0;

      // Pasos 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Paso 8.
      var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Pasos 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Paso 11.
      var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Paso 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Paso 13.
      return O;
    }
  });
}

}

})(nameSpace);
