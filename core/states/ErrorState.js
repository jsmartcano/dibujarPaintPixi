
var nameSpace = nameSpace || {};
(function (nameSpace) {
    nameSpace.ErrorState = function (_self) {

        nameSpace.StateClass.call(this, _self, "ErrorState");


        this.enter = function () {
            var msg = _self.ErrorManager.getErrorMessage();
            _self.DebugManager.say(this.toString() + " enter");
            $("body").html(msg);
            $("#body").css("background-color", "#FFF");
            throw new Error("--------" + msg);

        };

    };
})(nameSpace);