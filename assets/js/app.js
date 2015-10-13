/**
 * Created by tboursier on 23/09/2015.
 */

(function () {
    'use strict';
    
    window.App = window.App || {};

    /** Init application */
    App.Init = function () {
        App.Tools.init();
        App.Canvas.init();
        App.Drawings.init();
    };

    window.onload = function () {
        App.Init();
    };

})();
