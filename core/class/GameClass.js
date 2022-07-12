

var nameSpace = nameSpace || {};
(function (nameSpace) {

    // Clase juego
    // ---------------------------------------------------
    nameSpace.GameClass = function () {

        // Managers
        this.DebugManager = new nameSpace.DebugManager(this);
        this.SettingsManager = new nameSpace.SettingsManager(this);
        this.RouteManager = new nameSpace.RouteManager(this);
        this.Utils = new nameSpace.UtilsClass(this);
        this.StatesManager = new nameSpace.StatesManager(this);
        this.SkinManager = new nameSpace.SkinManager(this);
        this.ScaleManager = new nameSpace.ScaleManager(this);
        this.InputManager = new nameSpace.InputManager(this);
        this.ErrorManager = new nameSpace.ErrorManager(this);
    

       var version = {
            major: 1,
            minor: 0,
            patch: 0
        };

        this.GAME_STATE = {
           data: new Array(),   
           map: new Array(),
           completed: false,      
        }

      
        /**
         * Comprobaremos
         * 1. que no haya mas palabras que filas
         * 2. que ninguna palabra sea mayor del número de columnas
         */
        this.check = function() {
            var message = "";
            var error = 0;
            var numWords = PALABRAS.length;
           
            for (var i=0;i<PALABRAS.length;i++) {
                var word = PALABRAS[i];
                wlength = word.length;
                if (wlength>NUMERO_DE_COLUMNAS && wlength>NUMERO_DE_FILAS) {
                    error = 1;
                    message = message + "<BR/>ERROR => La palabra "+word+" tiene " + wlength +" letras, es mas larga que el número de filas,que es " + NUMERO_DE_FILAS + ", el número de columnas, que es " + NUMERO_DE_COLUMNAS;  
                }
            }

            return {error,message}
        }

        // Get version
        // ---------------------------------------------------
        this.getVersion = function () {
            return version.major + "." + version.minor + "." + version.patch;
        }
        
     
    }


}) (nameSpace);