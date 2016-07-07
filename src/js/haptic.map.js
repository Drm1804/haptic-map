'use strict';

/*
 *
 *  Функциональный модуль приложения Haptic
 *
 *  Функционал - прослойка между приложением и api картографического сервиса
 *
 * */

haptic.map = (function () {

    var configMap = {
        map_html: '<div id="haptic-map" class="haptic-map"></div>',
        circle_html: '<div class="haptic-map-circle"></div>'
    };

    var moduleMap = {
        $append_target: null,
        mapObject: null
    };

    var jqueryMap = {};


    var setViewMap = function(mapCoord, zoom){
        moduleMap.mapObject.setView([mapCoord[0], mapCoord[1]], zoom);
        return true;
    };

    /*
     *  Открытый метод getCenter
     *
     *  Назначение:
     *  Считает центр карты по переданным координатам
     *
     *  Аргументы:
     *   mapCenter - массив объектов, координаты углов карты
     *
     *  Действие:
     *    Находит центр карты
     *
     *  Возвращает высчитанное значение
     *
     *  Исключения: нет
     *
     * */

    var getCenterMap = function(mapCoord){
        var latCenter = (mapCoord[0].lat - mapCoord[1].lat)/2 + mapCoord[1].lat;
        var lngCenter = (mapCoord[0].lng - mapCoord[3].lng)/2 + mapCoord[3].lng;

        return [lngCenter, latCenter]
    };

    // Конец initModule


    /*
     *  Открытый метод initModule
     *
     *  Назначение:
     *  Требует, чтобы модуль shell предоставил свою функциональность
     *
     *  Аргументы:
     *   $append_target - jq-объект, в который модуль добавил свой HTML-шаблон
     *
     *  Действие:
     *   - добавляет свой шаблон в общую структуру HTML
     *   - вызывает собственный метод setJqueryMap, который заполняет jqueryMap
     *   - вызывает собственный метод initMap, который инициализирует карту
     *   - инициализирует модуль управления картой (haptic.control.js)
     *
     *  Возвращает:
     *   true в случае успеха, иначе false
     *
     *  Исключения: нет
     *
     * */

    var initModule = function ($append_target) {
        $append_target.append(configMap.map_html);
        moduleMap.$append_target = $append_target;
        setJqueryMap();

        return true;
    };

    // Конец initModule


    /*
     *  Открытый метод whatIsHere
     *
     *  Назначение:
     *  Узнает что находится по переданным координатам
     *
     *  Аргументы:
     *   _lat - number/string - широта
     *   _lng - number/string - долгота
     *
     *  Действие:
     *   - делает асинхронный запрос к Апи
     *
     *  Возвращает promise
     *
     *  Исключения: нет
     *
     * */
    var whatIsHere = function (_lat, _lng) {
        var lat = +_lat;
        var lng = +_lng;
        console.log('lat: ' + lat + ',' + 'lng: ' + lng);
        return DG.ajax({
            url: 'http://catalog.api.2gis.ru/geo/search',
            data: {
                key: 'ruczoy1743',
                version: 1.3,
                q: lat + ',' + lng
            },
            success: function (data) {
                console.log(data.result[0]);

            },
            error: function (error) {
                console.log(error);

            }
        });
    };

    // Конец whatIsHere

    /*
     *  Открытый метод createClickCircle
     *
     *  Назначение:
     *  создает на карте круг, обозначающий одиночный клик
     *
     *  Аргументы:
     *   _lat - number/string - широта (координаты центра кртуга)
     *   _lng - number/string - долгота (координаты центра кртуга)
     *
     *
     *  Действие:
     *   - создает html-элемент в виде круга на месте клика
     *   - удаляет этот элемент по истичению времени
     *
     *  Возвращает:
     *   true в случае успеха, иначе false
     *
     *  Исключения: нет
     *
     * */

    var createClickCircle = function(_lat, _lng){
        var circle = $(configMap.circle_html);
        jqueryMap.mapDOMBlock.append(circle);

        setTimeout(function(){
            $(circle).remove();
        }, 3000)
    };

    // Конец createClickCircle

    /*
     *  Конфигурационный метод setJqueryMap
     *
     *  Назначение:
     *  Конфигурирует переменную jqueryMap, чтобы ограничить запросы к DOM
     *
     *  Аргументы:
     *
     *  Действие:
     *   - находит блок mapDOMBlock
     *   - добавляет его в переменную jqueryMap
     *
     *  Возвращает:
     *
     *  Исключения: нет
     *
     * */

    var setJqueryMap = function () {
        var $append_target = moduleMap.$append_target;
        var mapDOMBlock = $append_target.find('#haptic-map');

        jqueryMap = {
            $append_target: $($append_target),
            mapDOMBlock: mapDOMBlock
        }
    };

    // Конец setJqueryMap

    var subscribeEvent = function () {
        moduleMap.mapObject.on('preclick', function (ev) {
            whatIsHere(ev.latlng.lng, ev.latlng.lat);
            // console.log('Координаты клика ' + ev.latlng.lat + '/' + ev.latlng.lng + '');
        })
    };

    /*
     *  Закрытый метод initMap
     *
     *  Назначение:
     *  Добавляет карту на страницу
     *
     *  Аргументы:
     *    mapCoord - координаты углов карты
     *    zoom - zoom
     *
     *  Действие:
     *   - добавляет карту на страницу
     *
     *  Возвращает:
     *     true в случае успеха, иначе false
     *
     *  Исключения: нет
     *
     * */

    var initMap = function (mapCoord, zoom) {

        var mapCenter = getCenterMap(mapCoord);

        zoom = 16;

        return DG.then(function () {
                moduleMap.mapObject = DG.map('haptic-map', {
                    // todo сделать центровку карты из внешних данных
                    center: [mapCenter[0], mapCenter[1]],
                    zoom: zoom,
                    zoomControl: false,
                    fullscreenControl: false,
                    dragging: false,
                    geoclicker: false,
                    boxZoom: false,
                    doubleClickZoom: false
                });
                subscribeEvent();
            }
        );


    };

    // Конец initModule

    return {
        initMap: initMap,
        setViewMap: setViewMap,
        getCenterMap: getCenterMap,
        initModule: initModule,
        whatIsHere: whatIsHere,
        createClickCircle: createClickCircle

    }
})();