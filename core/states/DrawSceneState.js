/**
 * @class Estado inicial ejecutado antes de cargar los parametros 
 *
*/
var nameSpace = nameSpace || {};
(function (nameSpace) {
	nameSpace.DrawSceneState = function (_self) {

		nameSpace.StateClass.call(this, _self, "DrawSceneState");

		this.enter = function () {
			_self.DebugManager.say(this.toString() + " enter");		
			_self.SkinManager.showSkin(true);			
			_self.SkinManager.showPreloadInit(false);
			_self.StatesManager.changeState("PlayGameState");

		};

	};
})(nameSpace);

