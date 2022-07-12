/**
 * @class Clase que recibe los eventos de respuesta del usuario y los pasa
 * al estado actual. El estado actual dependiendo de cual sea, los gestionará de forma
 * diferente. 
 */
var nameSpace = nameSpace || {};
(function(nameSpace) {
    nameSpace.InputManager = function(_self) {

	/**
	 * Invocación de eventos.
	 * Llegan los argumentos que nos pase el llamante, que son 2
	 * 
	 * Contexto de ejecución, siempre el InputManager, no cuenta como indice del array
	 * arguments -> Array de argumentos del llamante
	 * 
	 * Ejemplo de llamada:
	 * _self.InputManager.fireEvent.apply(_self.InputManager.fireEvent,["onReady"]);
	 * 
	 * arguments[0] -> Evento a ejecutar en el estado actual, onReady
	 * arguments[1..n] -> Parámetros del llamante
	 * 
	 * Se hace la llamada pasanto el contexto, y los argumentos.
	 * La función receptora debe tener un argumento para recibir el array de parámetros
	 * y entonces podrá hacer <parametro>[0..n], de lo contrario, debe leer el 
	 * argumento[0], que a su vez será el array de parámetros.
	 * 
	 * Esta llamada debe tener el formato: estado + "_" + evento
	 * Se itenta hacer la llamada a la cima de la pila.
	 * 
	 * JMc
	 */
			
    function fireEvent() {
        
        // Construcción de las cadenas a evaluar    
        var currentState = "_self.StatesManager.currentState()";
        var customEvent = arguments[0];

        // Lista los argumentos recibidos
        if (customEvent != "onTimeTick") {
            for (var i = 0; i < arguments.length; i++) {
                _self.DebugManager.say("Params: " + i + ": " + arguments[i]);
            };
        }

        // Obitiene el nombre del estado actual
        if (typeof _self.StatesManager.currentState.toString == "function") {
            var currentStateName = _self.StatesManager.currentState().toString();
        } else
        {
            // TODO: Ver cuando el estado actual no tiene toString            
            _self.ErrorManager.fireErr("********************** ERROR typeof _self.StatesManager.currentState.toString <> FUNCTION");
        }

        // Si existe en la cima de la pila
        if (typeof eval(currentState + "." + customEvent) === "function") {
            eval(currentState + "." + customEvent + ".call(" + currentState + ",arguments)");
        }
        else {
            //if (customEvent != "onTimeTick") {
                _self.DebugManager.say("event " + customEvent + " not implemented in currentState");
          //  }
        }
    };
	
	return {
		fireEvent: fireEvent
	};
	
}
})(nameSpace);
