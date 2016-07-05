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

    var click = function(){

    };

    var dblclick = function(){

    };

    return{
        initModule: initModule,
        click: click,
        dblclick: dblclick
    }

})();