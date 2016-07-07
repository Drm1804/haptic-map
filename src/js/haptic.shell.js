/*
 * haptic.shell.js
 * Модуль Shell для Haptic
 * 
 */

'use strict';

haptic.shell = (function(){


    var jqueryMap = {};

    var setJqueryMap = function($container){
        jqueryMap.$container = $container;
    };

    var moduleState = {
        initMap: false
    };

    /*
    *  Открытый модуль initModule
    *
    *  Назначение:
    *  Требует, чтобы модуль shell предоставил свою функциональность
    *
    *  Аргументы:
    *   $container - jq-объект, в котором будет работать модуль
    *
    *  Действие:
    *   - инизиализацию модуля haptic.map
    *   - вызов метода createMap модуля haptic.map
    *   - вызов метода createMap модуля haptic.map.initMap()
    *
    *  Возвращает:
    *   true в случае успеха, иначе false
    *
    *  Исключения: нет
    *
    * */

    var initModule = function($container){
        setJqueryMap(setJqueryMap);
        haptic.map.initModule($container);
        haptic.fake.initModule($container);
    };
    // Конец initModule


    /*
     * Публичный метод initMap
     *
     * Метод инициализирует карту
     *
     * Аргументы:
     *   mapCoord - массив объектов с координатами карты
     *   zoom - зум
     *
     *
     *
     * Возвращает:
     *   true - если функция выполнена
     *   false - если не выполнена
     */

    var initMap = function(mapCoord, zoom){

        haptic.map.initMap(mapCoord, zoom)
            .then(function(){
                moduleState.initMap = true;
            })

    };

    // Конец initMap

    /*
     * Публичный метод click
     *
     * Метод имитирует одинарный клик по карте.
     *
     * Аргументы:
     *   clickCoord - массив, координаты клика
     *   mapCoord - массив, координаты углов карты
     *   zoom - зум
     *
     *
     *
     * Возвращает:
     *   true - если функция выполнена
     *   false - если не выполнена
     */
    var click = function(clickCoord, mapCoord, zoom){


        // todo create method getCenterMap
        haptic.map.getCenterMap(mapCoord);



        haptic.map.whatIsHere(clickCoord.lat, clickCoord.lng)
            .then(function(data){
                // console.log(data)
            });

    };

    var dblclick = function(){

    };

    return{
        initModule: initModule,
        initMap: initMap,
        click: click,
        dblclick: dblclick
    }

})();