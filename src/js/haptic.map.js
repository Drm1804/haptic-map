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
        map_html: '<div id="haptic-map" style="width:500px; height:400px"></div>'
    };

    var moduleMap = {
        $append_target: null
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
            mapDOMBlock: mapDOMBlock
        }
    };

    // Конец setJqueryMap


    /*
     *  Закрытый метод setJqueryMap
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
        // todo доделать
        DG.then(function () {
                configMap.map_html = DG.map('haptic-map', {
                    center: [54.98, 82.89],
                    zoom: 13
                });

                DG.marker([54.98, 82.89]).addTo(map);

                return true;
            },
            function () {
                return false;
            }
        );
    };

    // Конец initModule

    return {
        initModule: initModule

    }
})();