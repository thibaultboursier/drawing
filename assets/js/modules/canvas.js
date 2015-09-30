App.Canvas = (function (App) {
    'use strict';

    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext("2d"),
        mousePressed = false,
        params = {},
        canvas_loaded,
        lastX,
        lastY;

    canvas.width = 816;
    canvas.height = 700;

    function init () {

        canvas.addEventListener("mousemove", function (e) {

            if (mousePressed) {
                switch (App.Tools.getCurrentTool()) {
                    case 'pencil' :
                        setParams(e, true);
                        draw();
                        break;
                }
            }
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            mousePressed = true;

            switch (App.Tools.getCurrentTool()) {
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
        params.strokeStyle = App.Tools.getCurrentStrokeStyle() || '#000';
        params.lineWidth = App.Tools.getCurrentLineWidth() || 20;
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
})(App);