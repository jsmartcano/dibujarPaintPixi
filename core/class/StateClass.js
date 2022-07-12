/**
 * @class StateClass: Clase basica que representa a un estado
 * @param {*} _self: Referencia a la clase contenedora, siempre el PLAYER 
 * @param {*} stateName: Nombre del estado para integrarse en la pila
 * 
 * @author: Jose Martinez, 2019
 */

var nameSpace = nameSpace || {};
(function (nameSpace) {

	nameSpace.StateClass = function (_self, stateName) {


		this.stateToReturn = null;

		// Número de veces que se ha entrado en el estado
		var _enterTimes = 0;

		// Nombre completo del estado, incluida su ruta relativa a partir de la carpeta states
		var _fullName = null;

		/**************************************************************************** */

		// Funcion que se ejecuta sólo una vez cuando se ha incializado el estado
		// -----------------------------------------------------------------------
		this.init = function () {
			_self.DebugManager.say("StateClass: " + this.toString() + " init");
		};

		// ------------------------------------------------------------------------
		this.getEnterTimes = function () {
			return _enterTimes;
		}

		// Se ejecuta cada vez que entra
		// -------------------------------------------------------------------------
		this.beforeEnter = function () {
			_self.DebugManager.say("StateClass: " + this.toString() + " beforeEnter");
		}

		// ------------------------------------------------------------------------
		this.incEnterTimes = function () {
			_enterTimes++;
			_self.DebugManager.say("StateClass: " + this.toString() + " Enter Times = " + _enterTimes);
		}

		// ----------------------------------------
		this.exit = function () {
			_self.DebugManager.say("StateClass: " + this.toString() + " exit");
		};

		// Se ejecuta siempre que se entra en el estado
		// --------------------------------------------
		this.enter = function () {
			_self.DebugManager.say("StateClass: " + this.toString() + " enter, stateToReturn: " + this.stateToReturn);
		};

		// ----------------------------------------
		this.pause = function () {
			_self.DebugManager.say("StateClass: " + this.toString() + " pause");
		};

		// ----------------------------------------
		this.resume = function () {
			_self.DebugManager.say("StateClass: " + this.toString() + " resume");
		};

		// ----------------------------------------
		this.setFullName = function (fullName) {
			_self.DebugManager.say("StateClass: " + this.toString() + " fullname = " + fullName);
			_fullName = fullName;
		}

		// ----------------------------------------
		this.getFullName = function () {
			return _fullName;
		}

		// ----------------------------------------
		this.toString = (function () {
			var _name = stateName;
			return function () {
				return _name;
			}
		})();

	}

})(nameSpace);