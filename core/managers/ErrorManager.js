/**
 * @class Clase que gestiona los errores que finalizan el programa
 */

var nameSpace = nameSpace || {};
(function(nameSpace) {


nameSpace.ErrorManager = function(_p) {

    var errorMessage;
    
    function _fireErr(txt) {
        errorMessage = txt;
        _p.DebugManager.say(txt);
        $("#preloadInitDiv").css("visibility", "hidden");
        _p.StatesManager.changeState("ErrorState");
    }

    function _getErrorMessage() {
        return errorMessage;
    }

    // -------------------------------------------------------------------------- // 		
    return {
        fireErr: _fireErr,
        getErrorMessage: _getErrorMessage
    };
};

})(nameSpace);
