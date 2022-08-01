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

        var tintColours = [0xF8FF4B, 0xD48746, 0x8EAE602, 0xFFFFFF, 0xC03866, 0x5E77BB, 0x000000];


        var x = 0;
        var y = 0;
        var x2 = 0;
        var y2 = 0;
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
        var bl;
        var br;
        var mv;
        var loader;
        var textures = {};
        var draggin_tl = false;
        var draggin_tr = false;
        var draggin_bl = false;
        var draggin_br = false;
        var draggin_mv = false;
        var image;
        var MIN_IMAGE = 50;

        var gameState = {
            size: null,
            sizeIndex: null,
            colorIndex: null,
            color: null,
            tool: null
        }


        this.getImage = function () {
            return image;
        }

        this.loadTextures = function () {
            loader = new PIXI.Loader();
            loader.add("corner", _self.RouteManager.getSkinImages() + "corner.png")
            $(".btn_img").each(function (index, elem) {
                var id = $(this).attr("id");
                var draw = $(this).attr("draw_img");
                loader.add(id, _self.RouteManager.getSkinImages() + draw);
            })

            loader.load()
            loader.onComplete.add((loader, resource) => {

                for (var [key, value] of Object.entries(resource)) {

                    textures[key] = value.texture;
                }


                _self.InputManager.fireEvent.apply(_self.InputManager, ["onImagesLoaded"]);

            });
        }

        $("#activador").bind("click touchstart", function (e) {
            e.preventDefault();
            if ($("#palette").hasClass("oculto")) {
                $("#palette").removeClass("oculto");
            } else {
                $("#palette").addClass("oculto");
            }
        })

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
            });
            document.getElementById("canvas_images").appendChild(app.view);

            if (GUARDAR_DATOS_EN_STORY == true) {
                var imgData = self.getVariable("Datos");
                if (imgData != "") {
                    var myImage = new Image();
                    myImage.src = imgData;
                    myImage.onload = function () {
                        ctx.drawImage(myImage, 0, 0);
                    }
                }
            }


        }


        /**
         * EVENTOS PRINCIPALES DE RATON Y TOUCH
         ***********************************************************************/
        // -----------------------------------------------------------------------
        $("#canvas, #canvas_lines").bind('mousedown touchstart', function (e) {
            e.preventDefault();

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
            e.preventDefault();
            switch (gameState.tool) {
                case 0: self.pencil_move(e); break;
                case 2: self.line_move(e); break;
                case 4: self.clear_move(e); break;
            }
            self.refreshScreen();

        })

        this.endTools = function (e) {
            switch (gameState.tool) {
                case 0: self.pencil_out(e); break;
                case 2: self.line_out(e); break;
                case 4: self.clear_out(e); break;
            }
            self.refreshScreen();
        }

        var x2, y2;
        // -----------------------------------------------------------------------
        $("#canvas_lines").on("tapend", function (e) {
            e.preventDefault();
            self.endTools(e);
        })

        $("#canvas_lines").on("touchend"), function (e) {
            e.preventDefault();
            self.endTools(e);
        }

        $("#canvas").on("touchend"), function (e) {
            e.preventDefault();
            self.endTools(e);
        }
        // -----------------------------------------------------------------------
        $("#canvas_lines").on("touchcancel"), function (e) {
            e.preventDefault();
            self.endTools(e);
        }
        $("#canvas").on("touchcancel"), function (e) {
            e.preventDefault();
            self.endTools(e);
        }


        // -----------------------------------------------------------------------
        $("#canvas, #canvas_lines").bind('mouseout', function (e) {
            e.preventDefault();
            self.endTools(e);
        })

        // -----------------------------------------------------------------------
        $("#canvas, #canvas_lines").bind('mouseup', function (e) {
            e.preventDefault();
            self.endTools(e);
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
            self.clearPixi();
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
            x2 = x;
            y2 = y;
            drawing = true;


        }

        // ------------------------------------------------
        this.line_move = function (e) {
            if (drawing) {
                x2 = this.getRealX(e);
                y2 = this.getRealY(e);
                ctx_lines.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                this.line_draw(x, y, x2, y2, ctx_lines);
            }
        }


        // ------------------------------------------------
        this.line_out = function (e) {
            if (drawing) {
                ctx_lines.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                this.line_draw(x, y, x2, y2, ctx);
                drawing = false;
            }
        }

        // ------------------------------------------------
        this.line_end = function (e) {
            if (drawing) {
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
            try {
                if (e.originalEvent.touches == null) {
                    return e.clientX;
                }
            } catch (ee) { }

            try {
                if (e.originalEvent.touches) {
                    return e.originalEvent.touches[0].clientX;
                }
            } catch (ee) { }

            try {
                if (e.originalEvent.changedTouches) {
                    return e.originalEvent.changedtouches[0].clientX;
                }
            } catch (ee) { }
        }

        this.getY = function (e) {
            try {
                if (e.originalEvent.touches == null) {
                    return e.clientY;
                }
            } catch (ee) { }

            try {
                if (e.originalEvent.touches) {
                    return e.originalEvent.touches[0].clientY;
                }
            } catch (ee) { }

            try {
                if (e.originalEvent.changedTouches) {
                    return e.originalEvent.changedtouches[0].clientY;
                }
            } catch (ee) { }
        }


        // -----------------------------------
        this.getVariable = function (variable) {
            var varId = IDENTIFICADOR + "_" + variable;
            var result = "";
            _self.DebugManager.say("GET VARIABLE " + varId);
            try {
                var p = parent.GetPlayer();
                result = p.GetVar(varId);
                _self.DebugManager.say("GET VARIABLE " + varId + " => " + result);
            } catch (ee) {
                _self.DebugManager.say("No se ha podido hacer get de " + varId);
            }
            return result;
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


                if (image.avz_color == true) {
                    ctx_lines.fillStyle = gameState.color;
                    ctx_lines.fillRect(image.x, image.y, image.width, image.height);
                    ctx_lines.globalCompositeOperation = "destination-in";
                    ctx_lines.drawImage(base_image, image.x, image.y, image.width, image.height);
                    ctx_lines.globalCompositeOperation = "source-over";

                } else {
                    ctx_lines.fillStyle = colours[6];
                    ctx_lines.fillRect(image.x, image.y, image.width, image.height);
                    ctx_lines.globalCompositeOperation = "destination-in";
                    ctx_lines.drawImage(base_image, image.x, image.y, image.width, image.height);
                    ctx_lines.globalCompositeOperation = "source-over";
                }

                ctx.drawImage(canvas_lines, 0, 0);
                ctx_lines.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

                self.clearPixi();
                $("#canvas_images").css("display", "none");
                gameState.tool = -1;
            }
        }

        this.clearPixi = function () {
            while (app.stage.children.length > 0) {
                var child = app.stage.getChildAt(0);
                app.stage.removeChild(child);
            }
        }

        this.convertColor = function (colorString) {


            const colorNumber = parseInt(colorString.slice(1), 16);


            const rgb = colorNumber >>> 8;
            const alpha = (colorNumber & 0xff) / 255;


            image.tint = rgb;
            image.alpha = alpha;

        }

        this.createImageToDraw = function (imageName) {
            image = new PIXI.Sprite(textures[imageName]);
            image.x = (GAME_WIDTH - image.width) / 2;
            image.y = (GAME_HEIGHT - image.height) / 2;

            app.stage.addChild(image);
            if (imageName.indexOf("personaje") == -1) {
                self.convertColor(gameState.color + "FF");
                image.avz_color = true;
            } else {
                image.avz_color = false;
            }



            // tl -------------------------            
            tl = new PIXI.Sprite(textures.corner)
            tl.interactive = true;
            tl.buttonMode = true;
            app.stage.addChild(tl);
            tl.on('pointerdown', self.onDragTLStart)
                .on('pointerup', self.onDragTLEnd)
                .on('pointerupoutside', self.onDragTLEnd)
                .on('pointermove', self.onDragTLMove);

            // tr -------------------------            
            tr = new PIXI.Sprite(textures.corner)
            tr.buttonMode = true;
            tr.interactive = true;
            app.stage.addChild(tr);
            tr.on('pointerdown', self.onDragTRStart)
                .on('pointerup', self.onDragTREnd)
                .on('pointerupoutside', self.onDragTREnd)
                .on('pointermove', self.onDragTRMove);

            // bl -------------------------            
            bl = new PIXI.Sprite(textures.corner)
            bl.buttonMode = true;
            bl.interactive = true;
            app.stage.addChild(bl);
            bl.on('pointerdown', self.onDragBLStart)
                .on('pointerup', self.onDragBLEnd)
                .on('pointerupoutside', self.onDragBLEnd)
                .on('pointermove', self.onDragBLMove);

            // br -------------------------            
            br = new PIXI.Sprite(textures.corner)
            br.buttonMode = true;
            br.interactive = true;
            app.stage.addChild(br);
            br.on('pointerdown', self.onDragBRStart)
                .on('pointerup', self.onDragBREnd)
                .on('pointerupoutside', self.onDragBREnd)
                .on('pointermove', self.onDragBRMove);


            // move -------------------------            
            mv = new PIXI.Sprite(textures.corner)
            mv.buttonMode = true;
            mv.interactive = true;
            app.stage.addChild(mv);
            mv.on('pointerdown', self.onDragMVStart)
                .on('pointerup', self.onDragMVEnd)
                .on('pointerupoutside', self.onDragMVEnd)
                .on('pointermove', self.onDragMVMove);

            // Colocación
            self.calculateCornersCoords();
        }


        this.onDragBLMove = function (e) {

            if (draggin_bl == true) {

                var newPosition = e.data.getLocalPosition(this.parent);

                // x ---------------------
                var diff_X = Math.abs(br.x - newPosition.x);
                if (diff_X > MIN_IMAGE && br.x > newPosition.x) {
                    image.width = diff_X;
                    image.x = newPosition.x + CORNER_WIDTH / 2;
                }

                // y ---------------------
                var diff_Y = Math.abs(tl.y - newPosition.y);
                if (diff_Y > MIN_IMAGE && tl.y < newPosition.y) {
                    image.height = diff_Y;

                }


                self.calculateCornersCoords();

            }

        }
        this.onDragBRMove = function (e) {

            if (draggin_br == true) {

                var newPosition = e.data.getLocalPosition(this.parent);

                // x ---------------------
                var diff_X = Math.abs(bl.x - newPosition.x);
                if (diff_X > MIN_IMAGE && bl.x < newPosition.x) {
                    image.width = diff_X;
                }

                // y ---------------------
                var diff_Y = Math.abs(tr.y - newPosition.y);
                if (diff_Y > MIN_IMAGE && tr.y < newPosition.y) {
                    image.height = diff_Y;
                }


                self.calculateCornersCoords();
            }

        }


        this.onDragTRMove = function (e) {

            if (draggin_tr == true) {

                var newPosition = e.data.getLocalPosition(this.parent);

                // x ---------------------
                var diff_X = Math.abs(tl.x - newPosition.x);
                if (diff_X > MIN_IMAGE && tl.x < newPosition.x) {
                    image.width = diff_X;
                }

                // y ---------------------
                var diff_Y = Math.abs(br.y - newPosition.y);
                if (diff_Y > MIN_IMAGE && br.y > newPosition.y) {
                    image.height = diff_Y;
                    image.y = newPosition.y + CORNER_HEIGHT / 2;
                }


                self.calculateCornersCoords();

            }

        }


        // -----------------------------------
        this.onDragTLMove = function (e) {
            if (draggin_tl == true) {

                var newPosition = e.data.getLocalPosition(this.parent);

                // x ---------------------
                var diff_X = Math.abs(tr.x - newPosition.x);
                if (diff_X > MIN_IMAGE && tr.x > newPosition.x) {
                    image.width = diff_X;
                    image.x = newPosition.x + CORNER_WIDTH / 2;
                }

                // y ---------------------
                var diff_Y = Math.abs(bl.y - newPosition.y);
                if (diff_Y > MIN_IMAGE && bl.y > newPosition.y) {
                    image.height = diff_Y;
                    image.y = newPosition.y + CORNER_HEIGHT / 2;
                }


                self.calculateCornersCoords();

            }
        }

        // -----------------------------------
        this.onDragMVMove = function (e) {
            if (draggin_mv == true) {

                var newPosition = e.data.getLocalPosition(this.parent);

                var diff_X = Math.abs(mv.x - newPosition.x);
                var diff_Y = Math.abs(mv.y - newPosition.y);
                if (newPosition.x > mv.x) {
                    image.x = image.x + diff_X;
                } else {
                    image.x = image.x - diff_X;
                }

                if (newPosition.y > mv.y) {
                    image.y = image.y + diff_Y;
                } else {
                    image.y = image.y - diff_Y;
                }


                self.calculateCornersCoords();

            }
        }

        this.onDragTLStart = function (e) { draggin_tl = true; };
        this.onDragTLEnd = function (e) { draggin_tl = false; }

        this.onDragTRStart = function (e) { draggin_tr = true; };
        this.onDragTREnd = function (e) { draggin_tr = false; };

        this.onDragBRStart = function (e) { draggin_br = true; };
        this.onDragBREnd = function (e) { draggin_br = false; }

        this.onDragBLStart = function (e) { draggin_bl = true; };
        this.onDragBLEnd = function (e) { draggin_bl = false; }

        this.onDragMVStart = function (e) { draggin_mv = true; };
        this.onDragMVEnd = function (e) { draggin_mv = false; }





        this.calculateCornersCoords = function () {

            tl.x = image.x - (CORNER_WIDTH / 2);
            tl.y = image.y - (CORNER_HEIGHT / 2);

            tr.x = image.x + image.width - (CORNER_WIDTH / 2)
            tr.y = image.y - (CORNER_HEIGHT / 2);

            bl.x = image.x - (CORNER_WIDTH / 2)
            bl.y = image.y + image.height - (CORNER_HEIGHT / 2);

            br.x = image.x + image.width - (CORNER_WIDTH / 2)
            br.y = image.y + image.height - (CORNER_HEIGHT / 2);

            mv.x = (image.x + image.width / 2) - (CORNER_WIDTH / 2);
            mv.y = (image.y + image.height / 2) - (CORNER_HEIGHT / 2);


        }

        // Redimensionar
        // -----------------------------------------------------------------------
        this.redim = function () {

        };


    };
})(nameSpace);
