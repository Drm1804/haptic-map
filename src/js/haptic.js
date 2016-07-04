'use strict';



/*
 *  haptic.js
 * Модуль корневого пространства имен
 */

var haptic = (function(){

    var initModule = function($container){
        console.log('Модуль иницилизирован');
        console.log($container);
    };

    return {
        initModule: initModule
    }
})();