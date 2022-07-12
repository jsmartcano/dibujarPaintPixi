/**
 * @class Estado de carga del skin.
 * @returns {LoadSkinState}
 */
var nameSpace = nameSpace || {};
(function (nameSpace) {
	nameSpace.LoadSkinState = function (_self) {

		nameSpace.StateClass.call(this, _self, "LoadSkinState");

		this.enter = function () {
			_self.DebugManager.say(this.toString() + " enter");
			_self.DebugManager.say("Loading skin... ");
			_self.SkinManager.loadSkin();
		};

		this.onSkinLoaded = function () {
			_self.DebugManager.say("SKIN loaded");
			_self.ScaleManager.start();
			_self.StatesManager.changeState("DrawSceneState");
		};

	}
})(nameSpace);