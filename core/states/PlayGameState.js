/**
 * @class Estado de juego
 * @returns {PlayGameState}
 */
var nameSpace = nameSpace || {};
(function (nameSpace) {
	nameSpace.PlayGameState = function (_self) {

		nameSpace.StateClass.call(this, _self, "PlayGameState");
		

		// --------------------------------------------
		this.enter = function () {
			_self.SkinManager._customSkin.createApp();
			_self.SkinManager._customSkin.refreshColours();
			_self.SkinManager._customSkin.drawScene();
		}

		
	}
})(nameSpace);