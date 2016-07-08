'use strict';



/*
 *  haptic.js
 * Модуль корневого пространства имен
 */

var haptic = (function(){

    /*
     * Выносим в публичную область метод initMap
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

    var initMap = function(){
        var mapCoord =[{lat: 61.39949798583985,lng: 55.17184625776139},
            {lat: 61.41664266586304,lng: 55.17184625776139},
            {lat: 61.41664266586304,lng: 55.162065694932444},
            {lat: 61.39949798583985,lng: 55.162065694932444}];

        var zoom = 16;

        haptic.shell.initMap(mapCoord, zoom)
    };

    // Конец initMap


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
    */
    var click = function(clickCoord, mapCoord, zoom){
        console.log(clickCoord)

        // todo тестовые данные, используются только для отладки
        mapCoord = [{lat: 61.39949798583985,lng: 55.15223368925793},
            {lat: 61.41664266586304,lng: 55.1522459501258},
            {lat: 61.41664266586304,lng: 55.14246057917798},
            {lat: 61.39949798583985,lng: 55.14246057917798}];

        zoom = 16;




        haptic.shell.click(clickCoord, mapCoord, zoom);
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
        initMap: initMap,
        click: click,
        dblclick: dblclick
    }
})();