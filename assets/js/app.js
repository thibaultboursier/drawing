/**
 * Created by tboursier on 23/09/2015.
 */

(function () {

    var App = function () {
        this.Tools.init(this);
        this.Canvas.init(this);
    };

    App.prototype.Tools = (function () {

        var self,
            tool = document.getElementsByClassName('tool'),
            size = document.getElementsByClassName('size'),
            loading = document.getElementById('loading'),
            tool_len = tool.length,
            size_len = size.length,
            i = 0,
            j = 0,
            tempTool,
            currentTool,
            currentLineWidth;

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

            loading.classList.add('inactive');

            for (i; i < tool_len; i++) {
                tool[i].onclick = function () {
                    changeTool(this);
                }
            }

            for (j; j < size_len; j++) {
                size[j].onclick = function (e) {
                    e.stopPropagation();
                    changeLineWidth(this);
                }
            }
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

        function getCurrentTool () {
            return currentTool;
        }

        function getCurrentLineWidth () {
            return currentLineWidth;
        }

        return {
            init: init,
            changeTool: changeTool,
            changeLineWidth: changeLineWidth,
            getCurrentTool: getCurrentTool,
            getCurrentLineWidth: getCurrentLineWidth
        }
    })();

    App.prototype.Canvas = (function () {

        var self,
            canvas = document.getElementById('canvas'),
            ctx = canvas.getContext("2d"),
            mousePressed = false,
            params = {},
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
            params.strokeStyle = self.Tools.getCurrentStrokeStyle || 'blue';
            params.lineWidth = self.Tools.getCurrentLineWidth() || 20;

            console.log(self.Tools.getCurrentLineWidth());
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
            init: init
        }
    })();

    window.onload = function () {
        var app = new App();
    };

})();