/*
 * haptic.shell.js
 * Модуль Shell для Haptic
 */

'use strict';

haptic.shell = (function(){

    var jqueryMap = {};


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
        jqueryMap.$container = $container;
        console.log(DG)
    };

    // Конец initModule

    return{
        initModule: initModule
    }

})();