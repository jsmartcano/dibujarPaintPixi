/**
 * @class SkinClass Implementa las funciones obligatorias en los skin
 * Dibujo.
 * 
 * Jose Martinez 2022
*/



var nameSpace = nameSpace || {};
(function (nameSpace) {
    nameSpace.SkinClass = function (_self) {



        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        var colours = ["#F8FF4B", "#D48746", "#8EAE60", "#FFFFFF", "#C03866", "#5E77BB", "#000000"];


        var x = 0;
        var y = 0;
        var drawing = false;
        var completed = false;

        var self = this;

        /** 
        * Tools:
        * 0: LAPIZ, (DIBUJANDO)
        * 1: SPRITE
        * 2: LINEA
        * 3: PERSONAJES
        * 4: GOMA
        *
        */


        var gameState = {
            size: null,
            sizeIndex: null,
            colorInex: null,
            color: null,
            tool: null
        }


        // ------------------------------------------------
        this.refreshScreen = function () {

            // colores
            gameState.color = colours[gameState.colorIndex],
            $("#colores").css("background-color", gameState.color);

            // grosores
            $("#grosor").removeClass("grosor_1");
            $("#grosor").removeClass("grosor_2");
            $("#grosor").removeClass("grosor_3");
            $("#grosor").removeClass("grosor_4");
            switch (gameState.sizeIndex) {
                case 1: $("#grosor").addClass("grosor_1"); break;
                case 2: $("#grosor").addClass("grosor_2"); break;
                case 3: $("#grosor").addClass("grosor_3"); break;
                case 4: $("#grosor").addClass("grosor_4"); break;
            }

            // Herramientas
            $(".btn_tool").removeClass("selected");
            $(".btn_tool_"+gameState.tool).addClass("selected"); 

            

        }


        // -----------------------------------------------------------------------
        this.drawScene = function () {

            gameState.size = 4;
            gameState.colorIndex = 6;
            gameState.tool = 0;
            gameState.color = colours[gameState.colorIndex],
                self.refreshScreen();

        }


        /**
         * EVENTOS PRINCIPALES DE RATON Y TOUCH
         ***********************************************************************/
        // -----------------------------------------------------------------------
        $("#canvas").bind('mousedown touchstart', function (e) {

            completed = true;
            switch (gameState.tool) {
                case 0: self.pencil_start(e); break;
                case 4: self.clear_start(e); break;
            }
            self.refreshScreen();
        })

        // -----------------------------------------------------------------------
        $("#canvas").bind('mousemove touchmove', function (e) {
            switch (gameState.tool) {
                case 0: self.pencil_move(e); break;
                case 4: self.clear_move(e); break;
            }
            self.refreshScreen();
        })

        // -----------------------------------------------------------------------
        $("#canvas").bind('mouseout touchend', function (e) {
            switch (gameState.tool) {
                case 0: self.pencil_out(e); break;
                case 4: self.clear_out(e); break;
            }
            self.refreshScreen();
        })

        // -----------------------------------------------------------------------
        $("#canvas").bind('mouseup touchend', function (e) {
            switch (gameState.tool) {
                case 0: self.pencil_end(e); break;
                case 4: self.clear_end(e); break;
            }
            self.refreshScreen();
        })

        $(".btn_panel").bind("click mousedown", function () {
            // $(".btn_panel").removeClass("btn_pressed");
            var elem = $(this);
            elem.addClass("btn_pressed");
            setTimeout(function () {
                elem.removeClass("btn_pressed");
            }, 300)
            self.refreshScreen();
        })

        $(".volver").bind("mousedown touchstart", function () {
            setTimeout(function () {
                $(".panel").css("display", "none");
                $("#panel_principal").css("display", "flex");
            }, 300)

        })

        $("#pintar").bind("mousedown touchstart", function () {
            gameState.tool = 0;
        })

        $(".btn_color").bind("mousedown touchstart", function () {
            var id = $(this).attr("id").split("_")[1];
            gameState.colorIndex = id;
            gameState.color = colours[id];
            self.refreshScreen();
            setTimeout(function () {
                $(".panel").css("display", "none");
                $("#panel_principal").css("display", "flex");
            }, 300)
        })

        $(".btn_grosor").bind("mousedown touchstart", function () {
            var id = $(this).attr("id").split("_")[1];
            id = parseInt(id, 10);
            gameState.sizeIndex = id

            switch (id) {
                case 1: gameState.size = 4; break;
                case 2: gameState.size = 8; break;
                case 3: gameState.size = 12; break;
                case 4: gameState.size = 18; break;
            }

            self.refreshScreen();
            setTimeout(function () {
                $(".panel").css("display", "none");
                $("#panel_principal").css("display", "flex");
            }, 300)
        })

        $("#grosor").bind("mousedown touchstart", function () {
            setTimeout(function () {
                $(".panel").css("display", "none");
                $("#panel_grosor").css("display", "flex");
            }, 300)
        })

        $("#formas").bind("mousedown touchstart", function () {

        })

        $("#linea").bind("mousedown touchstart", function () {
            gameState.tool = 2;
        })

        $("#colores").bind("mousedown touchstart", function () {
            setTimeout(function () {
                $(".panel").css("display", "none");
                $("#panel_colores").css("display", "flex");
            }, 300)
        })

        $("#personajes").bind("mousedown touchstart", function () {

        })

        $("#borrar").bind("mousedown touchstart", function () {
            gameState.tool = 4;
        })

        /* ******************************************************************* */


        // LAPIZ
        // *****************************************************************
        // ------------------------------------------------
        this.pencil_start = function (e) {
            x = this.getRealX(e);
            y = this.getRealY(e);
            drawing = true;
            this.pencil_draw(x, y, x, y);
        }

        // ------------------------------------------------
        this.pencil_move = function (e) {
            if (drawing === true) {
                var x2 = this.getRealX(e);
                var y2 = this.getRealY(e);
                this.pencil_draw(x, y, x2, y2);
                x = x2;
                y = y2;
            }
        }

        // ------------------------------------------------
        this.pencil_out = function (e) {
            x = 0;
            y = 0;
            drawing = false;
        }

        // ------------------------------------------------
        this.pencil_end = function (e) {
            if (drawing === true) {
                var x2 = this.getRealX(e);
                var y2 = this.getRealY(e);
                this.pencil_draw(x, y, x2, y2)
                x = 0;
                y = 0;
                drawing = false;
            }
        }

        // ------------------------------------------------
        this.pencil_draw = function (x1, y1, x2, y2) {

            var size = gameState.size;
            var color = gameState.color;

            console.log("color: " + color);

            if (x1 && y1 && (x2 !== x1 || y2 !== y1)) {
                ctx.strokeStyle = color;
                ctx.fillStyle = color;
                ctx.lineWidth = size * 2;
                ctx.beginPath();
                ctx.moveTo(x2, y2);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x2, y2, size, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();

        }
        // ******************************************************************

        // BORRADOR
        // *****************************************************************
        // ------------------------------------------------
        this.clear_start = function (e) {
            x = this.getRealX(e);
            y = this.getRealY(e);
            drawing = true;
            this.clear_draw(x, y, x, y);
        }

        // ------------------------------------------------
        this.clear_move = function (e) {
            if (drawing === true) {
                var x2 = this.getRealX(e);
                var y2 = this.getRealY(e);
                this.clear_draw(x, y, x2, y2);
                x = x2;
                y = y2;
            }
        }

        // ------------------------------------------------
        this.clear_out = function (e) {
            x = 0;
            y = 0;
            drawing = false;
        }

        // ------------------------------------------------
        this.clear_end = function (e) {
            if (drawing === true) {
                var x2 = this.getRealX(e);
                var y2 = this.getRealY(e);
                this.clear_draw(x, y, x2, y2)
                x = 0;
                y = 0;
                drawing = false;
            }
        }

        // ------------------------------------------------
        this.clear_draw = function (x1, y1, x2, y2) {


            var r = gameState.size;

            for (var i = 0; i < Math.round(Math.PI * r); i++) {
                var angle = (i / Math.round(Math.PI * r)) * 360;
                ctx.clearRect(x, y, Math.sin(angle * (Math.PI / 180)) * r, Math.cos(angle * (Math.PI / 180)) * r);
            }



        }

        /** ******************************************** */


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
