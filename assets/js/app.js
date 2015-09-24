/**
 * Created by tboursier on 23/09/2015.
 */

(function () {

    var App = function () {};

    App.prototype.Tools = (function () {

        function init () {
            var tool = document.getElementsByClassName('tool'),
                loading = document.getElementById('loading'),
                len = tool.length,
                i = 0;

            loading.classList.add('inactive');

            for (i; i < len; i++) {
                tool[i].onclick = function () {
                    changeTool(this);
                }
            }
        }

        function changeTool (tool) {
            var canvas = document.createElement("canvas"),
                ctx = canvas.getContext("2d"),
                dataURL;

            var icons = {
                'pencil': '\uf040',
                'eraser': '\uf12d'
            };

            var icon = icons[tool.getAttribute('data-icon')];

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

        return {
            init: init,
            changeTool: changeTool
        }
    })();

    App.prototype.Canvas = (function () {

        function init () {
            var tool = document.getElementsByClassName('tool'),
                loading = document.getElementById('loading'),
                len = tool.length,
                i = 0;

            loading.classList.add('inactive');

            for (i; i < len; i++) {
                tool[i].onclick = function () {
                    changeTool(this);
                }
            }
        }

        function changeTool (tool) {

        }

        return {
            init: init,
            createCanvas: createCanvas
        }
    })();

    window.onload = function () {
        var app = new App();

        app.Tools.init();
        app.Canvas.init();
    };

})();