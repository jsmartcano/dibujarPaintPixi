/**
 * @class Implementación sencilla de pila LIFO
 */
var nameSpace = nameSpace || {};
(function(nameSpace) {
nameSpace.StackClass = function(_self) {
			
	var _stack = new Array();		// contiene los estados
	
	this.pop = function(arg) { 
		_stack.shift(arg);
	};
	
	this.push = function(arg) {
		_stack.unshift(arg);
	};
	
	this.numberOfItems = function() {
		return _stack.length;
	};
	
	this.toDebugItems = function() {
		var str = "STACK: ";
		for (var i=0;i<_stack.length;i++) {
			str += "/" + _stack[i].toString();

		}
		_self.DebugManager.say(str);
	};
	
	this.empty = function() {
		return _stack.length == 0;
	};
	
	this.top = function() {
		if (this.empty()) {
			return null;
		} else {
			return _stack[0];
		}
		
	};
	
}
})(nameSpace);