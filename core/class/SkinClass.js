/**
 * @class SkinClass Implementa las funciones obligatorias en los skin
 * Dibujo.
 * 
 * Jose Martinez 2022
*/




var GAME_WIDTH = 973;
var GAME_HEIGHT = 562;

var CORNER_WIDTH = 30;
var CORNER_HEIGHT = 30;


var nameSpace = nameSpace || {};
(function (nameSpace) {
    nameSpace.SkinClass = function (_self) {



        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        var canvas_lines = document.getElementById("canvas_lines");
        var ctx_lines = canvas_lines.getContext("2d");





        var colours = ["#F8FF4B", "#D48746", "#8EAE60", "#FFFFFF", "#C03866", "#5E77BB", "#000000"];


        var x = 0;
        var y = 0;
        var drawing = false;
        var completed = false;
        var self = this;

        /** 
        * Tools:
        * 0: LAPIZ, (DIBUJANDO)      
        * 2: LINEA
        * 3: IMAGENES
        * 4: GOMA
        *
        */

        // ----------- IMAGENES
        var app;
        var tr;
        var tl;
        var loader;
        var textures = {};
        var draggin = false;
        var image;
        var MIN_WIDTH = 50;

        var gameState = {
            size: null,
            sizeIndex: null,
            colorInex: null,
            color: null,
            tool: null
        }


        this.getImage = function () {
            return image;
        }

        this.loadTextures = function () {
            loader = new PIXI.Loader();
            loader.add("corner", _self.RouteManager.getSkinImages() + "corner.png")
                .add("forma_0", _self.RouteManager.getSkinImages() + "forma_0.png")
            loader.load()
            loader.onComplete.add((loader, resource) => {

                for (var [key, value] of Object.entries(resource)) {

                    textures[key] = value.texture;
                }


                _self.InputManager.fireEvent.apply(_self.InputManager, ["onImagesLoaded"]);

            });
        }

        // ------------------------------------------------
        this.refreshScreen = function () {

            // coloresgameState.color = colours[gameState.colorIndex],
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
            $(".btn_panel").removeClass("selected");
            $(".btn_tool_" + gameState.tool).addClass("selected");



        }

        this.getCenterCoordinates = function (img) {
            var x = (GAME_WIDTH - img.width) / 2;
            var y = (GAME_HEIGHT - img.height) / 2;
            newImage.x = x;
            newImage.y = y;
            newImage.width = img.width;
            newImage.height = img.height;
        }


        // -----------------------------------------------------------------------
        this.drawScene = function () {

            gameState.size = 4;
            gameState.colorIndex = 6;
            gameState.tool = 0;
            gameState.color = colours[gameState.colorIndex];
            self.refreshScreen();

            app = new PIXI.Application({
               width: GAME_WIDTH, height: GAME_HEIGHT, transparent: true
            }
            );
            document.getElementById("canvas_images").appendChild(app.view);
        }


        /**
         * EVENTOS PRINCIPALES DE RATON Y TOUCH
         ***********************************************************************/
        // -----------------------------------------------------------------------
        $("#canvas, #canvas_lines").bind('mousedown touchstart', function (e) {

            completed = true;
            switch (gameState.tool) {
                case 0: self.pencil_start(e); break;
                case 2: self.line_start(e); break;
                case 4: self.clear_start(e); break;
            }
            self.refreshScreen();
        })

        // -----------------------------------------------------------------------
        $("#canvas, #canvas_lines").bind('mousemove touchmove', function (e) {
            switch (gameState.tool) {
                case 0: self.pencil_move(e); break;
                case 2: self.line_move(e); break;
                case 4: self.clear_move(e); break;
            }
            self.refreshScreen();
        })

        // -----------------------------------------------------------------------
        $("#canvas, #canvas_lines").bind('mouseout touchend', function (e) {
            switch (gameState.tool) {
                case 0: self.pencil_out(e); break;
                case 2: self.line_out(e); break;
                case 4: self.clear_out(e); break;
            }
            self.refreshScreen();
        })

        // -----------------------------------------------------------------------
        $("#canvas, #canvas_lines").bind('mouseup touchend', function (e) {
            switch (gameState.tool) {
                case 0: self.pencil_end(e); break;
                case 2: self.line_end(e); break;
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
            if (gameState.tool == 3) {
                self.endImageDrag();
            }
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

        $(".btn_img").bind("mousedown touchstart", function (e) {
            var img = $(this).attr("id");
            setTimeout(function () {
                gameState.tool = 3;
                $("#" + img.split(".")[0]).addClass("selected");
                $("#canvas_images").css("display", "block");
                self.createImageToDraw(img);
            }, 301)
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
            setTimeout(function () {
                $(".panel").css("display", "none");
                $("#panel_formas").css("display", "flex");
            }, 300)
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
            setTimeout(function () {
                $(".panel").css("display", "none");
                $("#panel_personajes").css("display", "flex");
            }, 300)
        })

        $("#tampon").bind("mousedown touchstart", function () {
            setTimeout(function () {
                $(".panel").css("display", "none");
                $("#panel_tampon").css("display", "flex");
            }, 300)
        })

        $("#borrar").bind("mousedown touchstart", function () {
            gameState.tool = 4;
        })

        /* ******************************************************************* */


        // LINEA
        // *****************************************************************
        // ------------------------------------------------
        this.line_start = function (e) {
            x = this.getRealX(e);
            y = this.getRealY(e);
            drawing = true;
        

        }

        // ------------------------------------------------
        this.line_move = function (e) {
            if (drawing) {
                var x2 = this.getRealX(e);
                var y2 = this.getRealY(e);
                ctx_lines.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                this.line_draw(x, y, x2, y2, ctx_lines);
            }
        }


        // ------------------------------------------------
        this.line_out = function (e) {
            if (drawing) {
                var x2 = this.getRealX(e);
                var y2 = this.getRealY(e);
                ctx_lines.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                this.line_draw(x, y, x2, y2, ctx);
                drawing = false;
            }
        }

        // ------------------------------------------------
        this.line_end = function (e) {
            if (drawing) {
                var x2 = this.getRealX(e);
                var y2 = this.getRealY(e);
                this.line_draw(x, y, x2, y2, ctx);
                ctx_lines.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                drawing = false; $
                
            }
        }

        this.line_draw = function (x1, y1, x2, y2, _ctx) {
            var size = gameState.size;
            var color = gameState.color;
            _ctx.strokeStyle = color;
            _ctx.fillStyle = color;
            _ctx.lineWidth = size * 2;
            _ctx.beginPath();
            _ctx.moveTo(x1, y1);
            _ctx.lineTo(x2, y2);
            _ctx.stroke();
        }



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

        this.endImageDrag = function () {
            base_image = new Image();
            base_image.src = image.texture.textureCacheIds[1];
            base_image.onload = function () {
                ctx.drawImage(base_image, image.x, image.y, image.width, image.height);
                var stage = app.stage;
                for (var i = stage.children.length - 1; i >= 0; i--) { stage.removeChild(stage.children[i]); };
                $("#canvas_images").css("display", "none");
                gameState.tool = -1;
            }
        }


        this.createImageToDraw = function (imageName) {
            image = new PIXI.Sprite(textures[imageName]);
            image.x = 100;
            image.y = 100;
            app.stage.addChild(image);

            // tl -------------------------            
            tl = new PIXI.Sprite(textures.corner)
            tl.interactive = true;
            tl.buttonMode = true;
            app.stage.addChild(tl);
            tl.on('pointerdown', self.onDragLTStart)
                .on('pointerup', self.onDragLTEnd)
                .on('pointerupoutside', self.onDragLTEnd)
                .on('pointermove', self.onDragLTMove);

            // tr -------------------------            
            tr = new PIXI.Sprite(textures.corner)
            tr.buttonMode = true;
            tr.interactive = true;
            app.stage.addChild(tr);
            tr.on('pointerdown', self.onDragLRStart)
                .on('pointerup', self.onDragLREnd)
                .on('pointerupoutside', self.onDragLREnd)
                .on('pointermove', self.onDragLRMove);




            // Colocación
            self.calculateCornersCoords();
        }

        this.onDragLTStart = function (e) {
            draggin = true;
        };
        this.onDragLTEnd = function (e) {
            draggin = false;
        };
        this.onDragLTMove = function (e) {
            if (draggin == true) {

                var newPosition = e.data.getLocalPosition(this.parent);

                // x ---------------------
                var diff = Math.abs(tr.x - newPosition.x);
                if (diff > MIN_WIDTH && tr.x > newPosition.x) {


                    image.width = diff;
                    image.x = newPosition.x + CORNER_WIDTH / 2;
                    tl.x = newPosition.x;
                    self.calculateCornersCoords();
                }




            }
        }

        this.onDragLRStart = function (e) { };
        this.onDragLREnd = function (e) { };
        this.onDragLRMove = function (e) { }


        this.calculateCornersCoords = function () {

            tl.x = image.x - (CORNER_WIDTH / 2);
            tl.y = image.y - (CORNER_HEIGHT / 2);

            tr.x = image.x + image.width - (CORNER_WIDTH / 2)
            tr.y = image.y - (CORNER_HEIGHT / 2);
        }

        // Redimensionar
        // -----------------------------------------------------------------------
        this.redim = function () {

        };


    };
})(nameSpace);
