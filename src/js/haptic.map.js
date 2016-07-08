'use strict';

/*
 *
 *  Функциональный модуль приложения Haptic
 *
 *  Функционал - прослойка между приложением и api картографического сервиса.
 *
 *  Модуль построен по принципу "глупый модуль", и является только прослойкой, логики в нем нет.
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


    //------------------------------
    // Открытые методы
    //------------------------------

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
    var whatIsHere = function (lat, lng) {
        console.log('lat: ' + lng + ',' + 'lng: ' + lat);

        /*
        *  Ебаные колходники, сука!
        *  Везде, сука везде используется порядок Широта/Долгота
        *  Но, сука, только в этом методе, один единственный метод принимает первым параметром Долготу, а вторым Широту
        *
        *  Очень, бля, удобно!
        *
        * */
        return DG.ajax({
            url: 'http://catalog.api.2gis.ru/geo/search',
            data: {
                key: 'runmzw5222',
                version: 1.3,
                q: lng + ',' + lat
            },
            success: function(data){
                console.log(data.result[0]);
                var circle = DG.circleMarker([lat, lng],{color: "red", className: 'haptic-map-circle'}).addTo(moduleMap.mapObject);
                circle.setRadius(10);
                circle.setStyle({className: 'haptic-map-circle'});
                setTimeout(function(){

                    circle.remove();
                }, 2000);

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
     *   _lat - number/string - широта (координаты центра круга)
     *   _lng - number/string - долгота (координаты центра круга)
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

    var createClickCircle = function(offset){
        //offset = [10, 10];
        var circle = $(configMap.circle_html);
        jqueryMap.mapDOMBlock.append(circle);
        circle.css({top: offset[0] + '%', left: offset[1] + '%'});

        //setTimeout(function(){
        //    $(circle).remove();
        //}, 3000)
    };

    // Конец createClickCircle

    //------------------------------
    // Приватные методы
    //------------------------------

    /*
     *  Приватный метод setJqueryMap
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
            whatIsHere(ev.latlng.lat, ev.latlng.lng);
            // console.log('Координаты клика ' + ev.latlng.lat + '/' + ev.latlng.lng + '');
        })
    };

    /*
     *  Приватный initMap
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

    var initMap = function (mapCenter, zoom) {

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
        initModule: initModule,
        whatIsHere: whatIsHere,
        createClickCircle: createClickCircle

    }
})();