'use strict';



/*
 *  haptic.js
 * Модуль корневого пространства имен
 */

var haptic = (function(){


    /*
    * Выносим в публичную область метод click
    *
    * Метод имитирует одинарный клик по карте.
    *
    * Метод ссылается на аналогичный метод из модуля Shell,
    * вынесен сюда для удобства использования извне
    */
    var click = function(lat, lng){
        haptic.shell.click(lat, lng);
    };



    /*
     * Выносим в публичную область метод dblclick
     *
     * Метод имитирует двойной клик по карте
     *
     * Метод ссылается на аналогичный метод из модуля Shell,
     * вынесен сюда для удобства использования извне
     */
    var dblclick = function(){
        haptic.shell.dblclick();
    };

    var initModule = function($container){
        haptic.shell.initModule($container);
    };

    return {
        initModule: initModule,
        click: click,
        dblclick: dblclick
    }
})();