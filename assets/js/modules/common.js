App.Common = (function (App) {
    'use strict';

    var overlay = (function () {
        var overlay = document.getElementById('overlay');

        function show () {
            overlay.classList.add('active');
        }

        function hide () {
            overlay.classList.remove('active');
        }

        return {
            show: show,
            hide: hide
        }
    })();

    /** Init */
    function init () {

    }

    return {
        init: init,
        overlay: overlay
    }
})(App);