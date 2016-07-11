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

    //------------------------------
    // Приватные методы
    //------------------------------

    /*
     *  Приватный метод getCenter
     *
     *  Назначение:
     *    считает центр карты по переданным координатам
     *
     *  Аргументы:
     *   mapCenter - массив объектов, координаты углов карты
     *
     *  Действие:
     *    Находит центр карты
     *
     *  Возвращает посчитанное значение
     *
     *  Исключения: нет
     *
     * */

    var getCenterMap = function (mapCoord) {
        var latCenter = (mapCoord[0].lat - mapCoord[1].lat) / 2 + mapCoord[1].lat;
        var lngCenter = (mapCoord[0].lng - mapCoord[3].lng) / 2 + mapCoord[3].lng;

        return [lngCenter, latCenter]
    };

    // Конец getCenter

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
                console.log(data.result[0]);
                haptic.show.showData(data.result[0])
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
        var centerCoord = getCenterMap(mapCoord);
        haptic.map.setViewMap(centerCoord, zoom);
    };

    // конец setViewMap

    //------------------------------
    // Открытые методы
    //------------------------------


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
        haptic.show.initModule($container);
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

        var mapCenter = getCenterMap(mapCoord);

        if (!moduleState.initMap) {
            haptic.map.initMap(mapCenter, zoom)
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
     *   *clickCoord - массив, координаты клика (обязательно)
     *   mapCoord - массив, координаты углов карты
     *   zoom - зум
     *
     * Действия:
     *  - проверяет аргументя на корректность.
     *  - проверяет инициализированна ли карта.
     *  - проверяет переданные координаты углов карты и zoom (mapCoord, zoom) на предмет изменения. Если область или масштаб
     *  изменились, перерисовываем карту.
     *  - создает на карте блок, имитирующий нажатие
     *  - делает запрос к апи, с вопросом, что находится по заданным координатам (clickCoord)
     *
     *
     * Возвращает:
     *   true - если функция выполнена
     *   false - если не выполнена
     */

    var click = function (clickCoord, mapCoord, zoom) {

        // Проверяеим обязательный параметр clickCoord
        if (!clickCoord || !Array.isArray(clickCoord)) {
            return false;
        }

        mapCoord = mapCoord || JSON.parse(moduleState.mapCoord);
        zoom = zoom || moduleState.mapZoom;

        // Проверяем инициализацию карты
        if (!moduleState.initMap) {
            console.error("The map wasn't initialized!");
            return false;
        }

        // Проверяем сменились ли координаты
        var strMapCoord = JSON.stringify(mapCoord);

        if (moduleState.mapCoord != strMapCoord || moduleState.zoom != zoom) {
            moduleState.mapCoord = strMapCoord;
            moduleState.zoom = zoom;
            setViewMap(mapCoord, zoom);
        }

        haptic.map.createClickCircle(clickCoord[0], clickCoord[1]);

        whatIsHere(clickCoord);

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