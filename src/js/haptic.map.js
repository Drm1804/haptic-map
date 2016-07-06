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
            map_html: '<div id="haptic-map" class="haptic-map"></div>'
        };

        var moduleMap = {
            $append_target: null,
            mapObject: null
        };

        var jqueryMap = {};

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
            initMap();

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
        var whatIsHere = function (_lat, _lng) {

            var lat = +_lat;
            var lng = +_lng;
            console.log('lat: ' + lat + ',' + 'lng: ' + lng);
            // debugger;
            DG.ajax({
                url: 'http://catalog.api.2gis.ru/geo/search',
                data: {
                    key: 'ruczoy1743',
                    version: 1.3,
                    q: lat + ',' + lng
                    // q: 'Москва, Красная площадь, 2'
                },
                success: function (data) {
                    console.log(data);
                    console.log(data.result[0]);
                },
                error: function (error) {
                    console.log(error);

                }
            });
        };

        // Конец whatIsHere

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

        var initMap = function () {

            DG.then(function () {
                    moduleMap.mapObject = DG.map('haptic-map', {
                        // todo сделать центровку карты из внешних данных
                        center: [55.147345, 61.408079],
                        zoom: 13,
                        zoomControl: false,
                        fullscreenControl: false,
                        dragging: false,
                        geoclicker: false,
                        boxZoom: false,
                        doubleClickZoom: false
                    });
                    subscribeEvent();

                    return true;
                },
                function () {
                    return false;
                }
            );


        };

        // Конец initModule

        return {
            initModule: initModule,
            whatIsHere: whatIsHere

        }
    })();