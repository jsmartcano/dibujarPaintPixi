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
			_self.SkinManager._customSkin.loadTextures();
		}

		this.onImagesLoaded = function () {
			_self.SkinManager._customSkin.drawScene();
		}
	}


})(nameSpace);