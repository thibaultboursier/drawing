App.Common = (function () {
    'use strict';

    /**
     * Handle application popins
     * @return {Object}
     */
    var popin = (function () {
        var _overlay = document.getElementById('overlay');

        /** Show overlay */
        function _showOverlay () {
            overlay.classList.add('active');
        }

        /** Hide overlay */
        function _hideOverlay () {
            overlay.classList.remove('active');
        }

        /** Show popin */
        function show () {
            _showOverlay();
        }

        /** Hide popin */
        function hide () {
            _hideOverlay();
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
        popin: popin
    }
})();