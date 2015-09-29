/**
 * Created by tboursier on 23/09/2015.
 */

(function () {

    var App = function () {
        this.Tools.init(this);
        this.Canvas.init(this);
        this.Drawings.init(this);
    };

    App.prototype.Tools = (function () {

        var self,
            tool = document.getElementsByClassName('tool'),
            size = document.getElementsByClassName('size'),
            color = document.getElementsByClassName('color'),
            loading = document.getElementById('loading'),
            tool_len = tool.length,
            size_len = size.length,
            color_len = color.length,
            i = 0,
            j = 0,
            k = 0,
            tempTool,
            currentTool,
            tempSize,
            currentLineWidth,
            tempColor,
            currentStrokeStyle;

        // tool
        var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            dataURL,
            icon;

        // icons
        var icons = {
            'pencil': '\uf040',
            'eraser': '\uf12d'
        };

        function init (_this) {

            self = _this;

            showInstructions();

            loading.classList.add('inactive');

            for (i; i < tool_len; i++) {
                tool[i].onclick = function (e) {
                    e.stopPropagation();
                    changeTool(this);
                }
            }

            for (j; j < size_len; j++) {
                size[j].onclick = function (e) {
                    e.stopPropagation();
                    changeLineWidth(this);
                }
            }

            for (k; k < color_len; k++) {
                color[k].onclick = function (e) {
                    e.stopPropagation();
                    changeStrokeStyle(this);
                }
            }

            var save = document.getElementById('save').onclick = function () {
              console.log(self.Canvas.saveCanvas());
            };

        }

        function showInstructions () {
                return (function () {
                    var timer = 0,
                        blocks_instructions = document.getElementsByClassName('instruction'),
                        blocks_instructions_len = blocks_instructions.length,
                        blocks_arr = [],
                        show_time = 4000,
                        i = 0,
                        y = 0,
                        instruction_a,
                        instruction_b,
                        popin,
                        instruction_text,
                        instruction_index,
                        template,
                        currentBlock,
                        currentPopin;

                    function getTemplate (index, text) {
                        return '<div class="wrapper">' +
                            '<div class="arrow"></div>' +
                            '<p>' +
                            '<span class="index">' + index + '</span>' +
                            '<span class="text">' + text + '</span>' +
                            '</p>' +
                            '</div>';
                    }

                    function insertBlock (y) {
                        setTimeout(function () {
                            var index;

                            (function () {
                                if (y === 0) {
                                    return;
                                }

                                currentPopin.classList.remove('active');
                                currentBlock.classList.remove('active');
                            })();

                            if (y === blocks_arr.length) {
                                return;
                            }

                            instruction_text = blocks_arr[y].getAttribute('data-instruction-text');
                            instruction_index = blocks_arr[y].getAttribute('data-instruction-index');

                            template = getTemplate(instruction_index, instruction_text);

                            popin = document.createElement('div');
                            popin.setAttribute('class', 'popin instruction');
                            popin.setAttribute('data-instruction', instruction_index);
                            popin.innerHTML = template;

                            blocks_arr[y].appendChild(popin);

                            currentPopin = popin;
                            currentBlock = blocks_arr[y];

                            currentPopin.classList.add('active');
                            currentBlock.classList.add('active');

                        }, y * 4000);
                    }

                    for (i; i < blocks_instructions_len; i++) {
                        if (blocks_instructions[i].nodeType == 1) {
                            blocks_arr.push(blocks_instructions[i]);
                        }
                    }

                    blocks_arr.sort(function(a, b) {
                        instruction_a = a.getAttribute('data-instruction-index');
                        instruction_b = b.getAttribute('data-instruction-index');

                        return instruction_a == instruction_b ? 0 : (instruction_a > instruction_b ? 1 : -1);
                    });

                    for (y; y < blocks_arr.length + 1; y++) {
                        insertBlock(y);
                    }

            })();
        }

        function changeTool (tool) {

            tempTool = tempTool || tool;

            tempTool.classList.remove('active');

            tempTool = tool;
            tempTool.classList.add('active');

            icon = icons[tool.getAttribute('data-icon')];
            currentTool = tool.getAttribute('data-icon');

            canvas.width = 74;
            canvas.height = 74;

            ctx.fillStyle = "#000000";
            ctx.font = "3.4em FontAwesome";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(icon, 20, 20);

            dataURL = canvas.toDataURL('image/png');

            document.getElementsByTagName('body')[0].style.cursor = 'url(' + dataURL +'), auto';
        }

        function changeLineWidth (size) {

            var width = size.getAttribute('data-size');

            tempSize = tempSize || size;

            tempSize.classList.remove('active');

            tempSize = size;
            tempSize.classList.add('active');

            switch (width) {
                case 'small':
                    width = 3;
                    break;
                case 'medium':
                    width = 20;
                    break;
                case 'large':
                    width = 50;
                    break;
            }

            currentLineWidth = width;
        }

        function changeStrokeStyle (color) {

            var style = color.getAttribute('data-color');

            tempColor= tempColor || color;

            tempColor.classList.remove('active');

            tempColor = color;
            tempColor.classList.add('active');

            currentStrokeStyle = style;
        }

        function getCurrentTool () {
            return currentTool;
        }

        function getCurrentLineWidth () {
            return currentLineWidth;
        }

        function getCurrentStrokeStyle () {
            return currentStrokeStyle;
        }

        return {
            init: init,
            showInstructions: showInstructions,
            changeTool: changeTool,
            changeLineWidth: changeLineWidth,
            getCurrentTool: getCurrentTool,
            getCurrentLineWidth: getCurrentLineWidth,
            getCurrentStrokeStyle: getCurrentStrokeStyle
        }
    })();

    App.prototype.Canvas = (function () {

        var self,
            canvas = document.getElementById('canvas'),
            ctx = canvas.getContext("2d"),
            mousePressed = false,
            params = {},
            canvas_loaded,
            lastX,
            lastY;

        canvas.width = 816;
        canvas.height = 700;

        function init (_this) {

            self = _this;

            canvas.addEventListener("mousemove", function (e) {

                if (mousePressed) {
                    switch (self.Tools.getCurrentTool()) {
                        case 'pencil' :
                            setParams(e, true);
                            draw();
                            break;
                    }
                }
            }, false);
            canvas.addEventListener("mousedown", function (e) {
                mousePressed = true;

                switch (self.Tools.getCurrentTool()) {
                    case 'pencil' :
                        setParams(e, false);
                        draw();
                        break;
                }
            }, false);
            canvas.addEventListener("mouseup", function (e) {
                mousePressed = false;
            }, false);

        }

        function setParams(e, isDown) {
            var rect = canvas.getBoundingClientRect(),
                bodyElt = document.body,
                top = rect.top + bodyElt .scrollTop,
                left = rect.left + bodyElt .scrollLeft;

            params.posX = e.pageX - left;
            params.posY = e.pageY - top;
            params.isDown = isDown;
            params.strokeStyle = self.Tools.getCurrentStrokeStyle() || '#000';
            params.lineWidth = self.Tools.getCurrentLineWidth() || 20;
        }

        function getCanvas () {
            return canvas.toDataURL('image/png');
        }

        function saveCanvas () {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("drawing-test", getCanvas());
            }

        }

        function draw() {

            if (params.isDown) {
                ctx.beginPath();
                ctx.strokeStyle = params.strokeStyle;
                ctx.lineWidth = params.lineWidth;
                ctx.lineJoin = "round";
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(params.posX, params.posY);
                ctx.closePath();
                ctx.stroke();
            }

            lastX = params.posX;
            lastY = params.posY;
        }

        return {
            init: init,
            getCanvas: getCanvas,
            saveCanvas: saveCanvas
        }
    })();

    App.prototype.Drawings = (function () {
        var self,
            count = 0,
            drawings_len;

        function init (_this) {

            self = _this;

            function watchDrawings () {
                drawings_len = getAllDrawings().length;

                if (drawings_len !== count) {
                    count = drawings_len;
                    refreshDrawings();
                }
            }

            function refreshDrawings () {
                canvas_loaded = getAllDrawings ();

                var canvas_list = document.getElementById('drawings'),
                    template = '';

                if (canvas_loaded.length === 0) {
                    return;
                }

                template += '<ul>';

                for (var y = 0; y < canvas_loaded.length; y++) {
                    var img=new Image();

                    img.src = localStorage.getItem('drawing-' + canvas_loaded[y]);
                    template += '<li id="drawing-'+ canvas_loaded[y] + '" class="drawing"></li>';

                    canvas_list.innerHTML = template;

                    var drawing = document.getElementById('drawing-' + canvas_loaded[y]);
                    drawing.appendChild(img);
                    drawing.classList.add('active');
                }

                template += '</ul>';
            }

            setInterval(watchDrawings, 2000);

        }

        function getAllDrawings () {
            var drawings = [],
                item,
                name,
                i;

            if (typeof localStorage !== 'undefined') {
                for (i in localStorage) {
                    name = i.split('-');

                    if (name[0] === 'drawing') {
                        drawings.push(name[1]);
                    }
                }
            }

            return drawings;
        }

        return {
            init: init,
            getAllDrawings: getAllDrawings
        }
    })();

    window.onload = function () {
        var app = new App();
    };

})();