/**
 * @class Clase que contiene métodos para depurar. 
 */

var nameSpace = nameSpace || {};
(function(nameSpace) {

    nameSpace.DebugManager = function(_self){



    // -------------------------------------------------------------------------- // 
	this.getMsgTime = function() {
		
		  var f=new Date();
		  cad=f.getUTCDay() + "/" + f.getUTCMonth()+ "/" + f.getUTCFullYear()+" - "+ f.getHours()+":"+f.getMinutes()+":"+f.getSeconds();
		  return cad;
	};

    
    // -------------------------------------------------------------------------- // 
	this.say = function(msg) {
	
	    if (MODE = DEV) {

	        try {
				if (typeof msg === "object") {
					console.log(msg);
				} else{
					console.log(this.getMsgTime() + " - " + msg);
				}
	            
	        }
	        catch (ee) {
	        }
	    }

	};
}

})(nameSpace);


