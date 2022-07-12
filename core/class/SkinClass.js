/**
 * @class SkinClass Implementa las funciones obligatorias en los skin
 * Dibujo.
 * 
 * Jose Martinez 2022
*/

var nameSpace = nameSpace || {};
(function (nameSpace) {
    nameSpace.SkinClass = function (_self) {


        var app;
        var graphics;
        var ctx;
        var canvas
        var renderer;

        var colours = [0xF8FF4B, 0xD48746, 0x8EAE60, 0xFFFFFF, 0xC03866, 0xC03866,0x000000];

        // var canvas = document.getElementById("canvas");
        // var ctx = canvas.getContext("2d");


        var x = 0;
        var y = 0;
        var drawing = false;
        var size = 5;
        var colorSelected = 0;
        var color = colours[colorSelected];
        var completed = false;

        var self = this;


        // -----------------------------------------------------------------------
        this.createApp = function () {
            app = new PIXI.Application({

                width: 987, height: 448,
                backgroundAlpha: 0, autostart: true
            })
            graphics = new PIXI.Graphics();
            canvas = document.getElementById("canvas_wrapper");
            canvas.appendChild(app.view);



            // -----------------------------------------------------------------------
            $("#canvas_wrapper").bind('mousedown touchstart', function (e) {
                x = self.getRealX(e);
                y = self.getRealY(e);
                drawing = true;
                completed = true;
                self.draw(x, y, x, y);
            })

            // -----------------------------------------------------------------------
            $("#canvas_wrapper").bind('mousemove touchmove', function (e) {
                if (drawing === true) {
                    var x2 = self.getRealX(e);
                    var y2 = self.getRealY(e);
                    self.draw(x, y, x2, y2);
                    x = x2;
                    y = y2;
                }
            })



            // -----------------------------------------------------------------------
            $("#canvas_wrapper").bind('mouseout touchend', function (e) {
                x = 0;
                y = 0;
                drawing = false;
            })

            // -----------------------------------------------------------------------
            $("#canvas_wrapper").bind('mouseup touchend', function (e) {
                if (drawing === true) {
                    var x2 = self.getRealX(e);
                    var y2 = self.getRealY(e);
                    self.draw(x, y, x2, y2)
                    x = 0;
                    y = 0;
                    drawing = false;
                }
            })
        }

        // this.gameLoop = function (delta) {
        //     _self.DebugManager.say("ee");
        // }




        this.getRealX = function (e) {
            return this.getX(e) - canvas.getBoundingClientRect().left;
        }

        this.getRealY = function (e) {
            return this.getY(e) - canvas.getBoundingClientRect().top;
        }

        this.getX = function (e) {
            if (e.originalEvent.touches == null) {
                return e.clientX;
            } else {
                return e.originalEvent.touches[0].clientX;
            }
        }

        this.getY = function (e) {
            if (e.originalEvent.touches == null) {
                return e.clientY;
            } else {
                return e.originalEvent.touches[0].clientY;
            }
        }


        // -----------------------------------------------------------------------
        this.drawScene = function () {






        }

        // -----------------------------------
        this.setVariable = function (variable, value) {
            var varId = IDENTIFICADOR + "_" + variable;
            _self.DebugManager.say("SET VARIABLE " + varId + " => " + value);
            try {
                var p = parent.GetPlayer();
                p.SetVar(varId, value);
            } catch (ee) {
                _self.DebugManager.say("No se ha podido hacer set de " + varId + " a " + value);
            }
        }




        // ------------------------------------------------
        this.refreshColours = function () {

        }

        this.clearCircle = function (x, y, r) {
            for (var i = 0; i < Math.round(Math.PI * r); i++) {
                var angle = (i / Math.round(Math.PI * r)) * 360;
                graphics.clearRect(x, y, Math.sin(angle * (Math.PI / 180)) * r, Math.cos(angle * (Math.PI / 180)) * r);
            }
        }

        // -----------------------------------------------------------------------
        this.draw = function (x1, y1, x2, y2) {

            if (colorSelected == 8) {
                this.clearCircle(x2, y2, size * 6);
            } else {

                if (x1 && y1 && (x2 !== x1 || y2 !== y1)) {
                    graphics.lineStyle(size * 3, color);
                    graphics.moveTo(x1, y1);
                    graphics.lineTo(x2, y2);
                    graphics.endFill();
                    app.stage.addChild(graphics);

                }
                graphics.lineStyle(size, color);
                graphics.beginFill(color, 1);
                graphics.drawCircle(x2, y2, size);
                graphics.endFill();
                app.stage.addChild(graphics);
            }


        }


        // Redimensionar
        // -----------------------------------------------------------------------
        this.redim = function () {
            _self.DebugManager.say("redim screen...");
            setTimeout(function () {
                try {
                    var main = $("#resizable_wrapper");
                    var htmlContent = $("html");
                    var game_wrapper = $("#game_wrapper");

                    // Calcular el ratio de largo y ancho, nos quedamos con el menor
                    var w = (htmlContent.innerWidth() * 100) / game_wrapper.width();
                    var h = (htmlContent.innerHeight() * 100) / game_wrapper.height();
                    var ratio = w;
                    if (h < w) {
                        ratio = h;
                    } else {
                        ratio = w;
                    }
                    main.css("position", "absolute");
                    main.css("transform", "scale(" + (ratio) / 100 + "," + (ratio) / 100 + ")");
                    main.css("transform-origin", "left top");

                    // Centrar contenido ya escalado
                    var left = (htmlContent.innerWidth() - (main.width() * ratio / 100)) / 2;
                    var top = (htmlContent.innerHeight() - (main.height() * ratio / 100)) / 2;
                    main.css("left", left + "px");
                    main.css("top", top + "px");

                    //console.log(w + " - " + h);
                } catch (ee) {

                }
            }, 100);
        };



    };
})(nameSpace);
