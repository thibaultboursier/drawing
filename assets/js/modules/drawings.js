App.Drawings = (function (App) {
    'use strict';

    var count = 0,
        drawings_len;

    function init () {

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
})(App);