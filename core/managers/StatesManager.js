/**
 * @class StatesManager Factoría y gestión de estados
 * @param {*} _self 
 * @returns {StatesManager}
 * 
 * @author: Jose Martinez, 2019
 */
 var nameSpace = nameSpace || {};
 (function(nameSpace) {
 
	 nameSpace.StatesManager = function(_self) {
	
		var running = true;
			
		var states = new Array();	// Contiene todos los estados del player
		var stack = new nameSpace.StackClass(_self);	// Pila con los estados en uso
		var debug = _self.DebugManager.say;
		var name = "StatesManager";
		var args = null;	// Argumentos de llamada que se le pasan al estado llamado.
		
		this.stack = stack;
		
		/**
		 * Se llama al principio de la ejecución. Pone en marcha la máquina de estados
		 */
		this.start = function(state) {	
			debug(name + " start " + state);
			// transicion al estado incial
			this.changeState( state );
		};

	

		this.stop = function() {
			running = false;
		}
		
		this.currentState = function() {
			if (!stack.empty()) {
				return stack.top();
			} else {
				return null;
			}
		};
			
		/** 
		 * Cambiar a otro estado
		 * *******************************************************************************************
		 */
		this.changeState = function(state, stateToReturn, _args) {

				if (running==false) {
					return;
				}

			

				args = _args || null;

				// Limpieza del estado actual.
				if (!stack.empty())
				{
					// exit() sobre el iltimo estado.
					stack.top().exit();
					// Elimina el ultimo estado.
					stack.pop();
				}
				loadState(state,changeStateCallBack,stateToReturn);
		};
		
		/**
		 * Retrollamada de chageState 
		 */
		function changeStateCallBack(state,stateToReturn) {

				if (running==false) {
					return;
				}
			
				if (stack.numberOfItems()>0) {
					stack.pop();
				}

				state.stateToReturn = stateToReturn;
				
				// Transicion al nuevo estado. 
				stack.push(state);
				stack.toDebugItems();
				// enter() sobre el nuevo estado.
				stack.top().incEnterTimes();
				stack.top().beforeEnter();
				stack.top().enter(args);				
		};
			
		/**
		 * Poner en la pila el estado actual
		 * *******************************************************************************************
		 */
		this.pushState = function(state,stateToReturn, _args) {	
				if (running==false) {
					return;
				}

				args = _args || null;
			

				// Pausa del estado actual.
				if (!stack.empty())
					stack.top().pause();

				loadState(state,pushStateCallBack,stateToReturn);
		};
		
		/**
		 * Retrollamada de pushState
		 */
		function pushStateCallBack(state,stateToReturn) {

				if (running==false) {
					return;
				}
				
				state.stateToReturn = stateToReturn;

				// Transicion al nuevo estado.
				stack.push(state);
				stack.toDebugItems();
				// enter sobre el nuevo estado.
				stack.top().incEnterTimes();
				stack.top().enter(args);			
		};
		
		/**
		 * Quitar de la pila el estado actual y poner en la cima el anterior guardado
		 * *******************************************************************************************
		 */
		this.popState = function(_args){ 

			if (running==false) {
				return;
			}

			args = _args || null;

		

				if (!stack.empty())
				{
					stack.top().exit();
					stack.pop();
					stack.toDebugItems();
				}
							
				if (!stack.empty()) {
					stack.top().resume(args);
				}
		};
		


		/*
		*******************************************************************************************
		**/

		/**
		 * Obtiene un estado que llega como parámetro
		 * Si no está cargado, lo carga e inserta en el array
		 * de states, para saber que el estado ya existe
		 */
		function loadState(state,callback,stateToReturn) {	

			if (running==false) {
				return;
			}
			
			var fileState = _self.Utils.getFile(state);
			
			// Si ya existe el estado no lo carga
			// ------------------------------------------
			for (var i=0;i<states.length;i++) {
				if (states[i].getFullName()==state) {
					callback(states[i],stateToReturn);
					return;
				}
			}


			// Si no existe
			// ---------------------------------------						
			var src = _self.RouteManager.getStates() + state + ".js";
			var script = document.createElement("script");			
			script.setAttribute("type", "text/javascript");
			script.setAttribute("src", src); 		
						
			// Insertar script en la cabecera
			document.getElementsByTagName("head")[0].appendChild(script);								
	
			script.onerror = function() {
				_self.ErrorManager.fireErr("Error loading STATE" + src);
			};
	
			script.onload = function() {						
				debug(state + " loaded");
				var tmpState = eval("new nameSpace."+fileState+"(_self)");
				tmpState.setFullName(state);
				states.push(tmpState);

				tmpState.init();			
				callback(tmpState,stateToReturn);
			}								

		};

        /**
         * Busca un estado en la pila y lo devuelve.
         * Si no lo encuentra devuelve null
         */
		this.getState = function(state) {

			if (running==false) {
				return;
			}

		    var fileState = _self.Utils.getFile(state);
		    
		    for (var i = 0; i < states.length; i++) {
		        if (states[i] == fileState) {
		            return states[i];		            
		        }
		    }
		    return null;
		}
		
			
 };

})(nameSpace);
				
		