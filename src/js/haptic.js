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
    * Аргументы:
    *   clickCoord - массив, координаты клика
    *   mapCoord - массив, координаты углов карты
    *   zoom - зум
    *
    * Метод ссылается на аналогичный метод из модуля Shell,
    * вынесен сюда для удобства использования извне
    *
    * Возвращает:
    *   true - если функция выполнена
    *   false - если не выполнена
    */
    var click = function(clickCoord, mapCoord, zoom){
        
        
        
        if(!clickCoord || !Array.isArray(clickCoord) || !Array.isArray(mapCoord) || !mapCoord || !zoom){
            return false;
        }
        haptic.shell.click(clickCoord, mapCoord, zoom);
        return true;
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