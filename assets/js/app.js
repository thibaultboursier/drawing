/**
 * Created by tboursier on 23/09/2015.
 */

(function () {

    window.App = window.App || {};

    /** Init Application */
    App.Init = function () {
        App.Tools.init();
        App.Canvas.init();
        App.Drawings.init();
    };

    window.onload = function () {
        App.Init();
    };

})();