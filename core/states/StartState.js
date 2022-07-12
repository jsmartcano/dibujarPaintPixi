/**
 * @class Estado inicial ejecutado antes de cargar los parametros 
 *
*/
var nameSpace = nameSpace || {};
(function (nameSpace) {
	nameSpace.StartState = function (_self) {

		nameSpace.StateClass.call(this, _self, "StartState");

		this.enter = function () {
			_self.DebugManager.say(this.toString() + " enter");
			_self.DebugManager.say("Game Version: " + _self.getVersion());
			_self.SkinManager.showPreloadInit(true);		
			_self.StatesManager.changeState("LoadSkinState");
		};

	};
})(nameSpace);

