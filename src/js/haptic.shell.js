/*
 * haptic.shell.js
 * Модуль Shell для Haptic
 * 
 */

'use strict';

haptic.shell = (function () {


    var jqueryMap = {};

    var setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
    };

    var moduleState = {
        initMap: false,
        mapCoord: null,
        mapZoom: null
    };


    /*
     * Приватный метод whatIsHere
     *  Метод запрашивает данные о том, что находится по этим координатам
     *
     * Аргументы:
     *  clickCoord - массив с координатами клика
     *
     * Возвращает promise

     */

    var whatIsHere = function (clickCoord) {
        haptic.map.whatIsHere(clickCoord[0], clickCoord[1])
            .then(function (data) {
                // todo сделать метод для отображения информации на экране
                // console.log('====================');
                // console.log(data)
            });
    };

    // конец whatIsHere

    /*
     * Приватный метод setViewMap
     *
     * Метод имитирует одинарный клик по карте.
     *
     * Аргументы:
     *   mapCoord - массив объектов с координатами карты
     *   zoom - зум
     *
     *
     *
     * Возвращает:

     */

    var setViewMap = function (mapCoord, zoom) {
        var centerCoord = haptic.map.getCenterMap(mapCoord);
        haptic.map.setViewMap(centerCoord, zoom);
    };

    // конец setViewMap


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

    var initModule = function ($container) {
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

    var initMap = function (mapCoord, zoom) {
        if (!moduleState.initMap) {
            haptic.map.initMap(mapCoord, zoom)
                .then(function () {
                    moduleState.initMap = true;
                    moduleState.mapZoom = zoom;
                    // Серилизуем объект, чтобы его потом можно было удобнее сравнивать
                    moduleState.mapCoord = JSON.stringify(mapCoord);
                })
        } else {
            console.error("The map was initialized!")
        }


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

    var click = function (clickCoord, mapCoord, zoom) {

        // Проверяем инициализацию карты
        if (!moduleState.initMap) {
            console.error("The map wasn't initialized!");
            return false;
        }

        // Проверяем сменились ли координаты
        var strMapCoord = JSON.stringify(mapCoord);

        if (moduleState.mapCoord != strMapCoord || zoom != !moduleState.zoom) {
            setViewMap(mapCoord, zoom);
        }

        // todo сделать метод, который будет имитировать клик на карте отображая кружок

    };

    // Конец click


    var dblclick = function () {

    };

    return {
        initModule: initModule,
        initMap: initMap,
        click: click,
        dblclick: dblclick
    }

})();