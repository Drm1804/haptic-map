'use strict';



/*
 *  haptic.js
 * Модуль корневого пространства имен
 */

var haptic = (function(){

    
    
    var initModule = function($container){
        haptic.shell.initModule($container);
    };

    return {
        initModule: initModule
    }
})();