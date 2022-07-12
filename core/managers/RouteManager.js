/**
 * @class RouteManager Clase que se encarga de componer url y paths
 * @returns {RouteManager}
 */
var nameSpace = nameSpace || {};
(function(nameSpace) {
    nameSpace.RouteManager = function(_self) { 

    var root = "../";
    var player = "./";
      
    var core = player + "core/";
    var includes = player + "includes/";

    var states = core + "states/";
    var _class = core + "class/";
    var jwplayer7 = includes + "jwplayer/7.7.2/";
    var jwplayer8 = "includes/jwplayer-8.0.0/";

    var videos = player + "videos/";
    var sounds = player + "sounds/";
    
    this.getJwplayer7 = function () { return jwplayer7; };
    this.getJwplayer8 = function () { return jwplayer8; };


    this.getVideos = function(){return videos;}
    this.getSounds = function(){return sounds;}

    // --------------------------------------------------------------------
	this.getCore = function() { return core; };		
	this.getStates = function () { return states; };
	this.getClass = function () { return _class; };
   		
    // --------------------------------------------------------------------
    this.getSkin = function () { return player + "skins/" + _self.SettingsManager.getSetting("SKIN").getValue() + "/"; };
    this.getSkinImages = function () { return player + "skins/" + _self.SettingsManager.getSetting("SKIN").getValue() + "/images/"; }
    	
	// --------------------------------------------------------------------
    this.getPlayer = function () { return player; };

    this.getStory = function() {
        return player + "story/";
    }
    
  
	

	
}
})(nameSpace);