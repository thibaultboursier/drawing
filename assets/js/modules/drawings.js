App.Drawings = (function () {
    'use strict';

    var count = 0,
        drawings_len;

    function init () {

        function getTemplate (name) {
            var template = '';

            template += '<li id="drawing-'+ name + '" class="drawing"></li>';

        }

        function insertDrawing (name) {
            var canvas_list = document.getElementById('drawings').firstChild,
                canvas_list_html = canvas_list.innerHTML,
                img = new Image();

            img.src = localStorage.getItem('drawing-' + name);

            canvas_list.innerHTML = canvas_list_html;

            var drawing = document.getElementById('drawing-' + name);
            drawing.appendChild(img);
            drawing.classList.add('active');
        }

        function watchDrawings () {
            drawings_len = getAllDrawings().length;

            if (drawings_len !== count) {
                count = drawings_len;
                refreshDrawings();
            }
        }

        function refreshDrawings () {
            var canvas_loaded = getAllDrawings ();

            if (canvas_loaded.length === 0) {
                return;
            }

            for (var y = 0; y < canvas_loaded.length; y++) {
                insertDrawing(name);
            }
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