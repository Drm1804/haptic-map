/*
 * haptic.show.js
 * Модуль показа данных для Haptic
 *
 */


'use strict';

haptic.show = (function () {

    var moduleMap = {
        $append_target: null,
        mapObject: null
    };

    var configMap = {
        map_html: '<div id="haptic-show" class="haptic-show">' +
        '<p class="haptic-show-name">Имя: <span class="haptic-show-name-span"></span></p>' +
        '<p class="haptic-show-type">Тип: <span class="haptic-show-type-span"></span></p>' +
        '</div>'
    };

    var jqueryMap = {};


    //------------------------------
    // Приватные методы
    //------------------------------


    // Метод кэширует jQuery элементы
    var setJqueryMap = function () {
        var $append_target = moduleMap.$append_target;
        var $controlBox = $append_target.find('#haptic-show');


        jqueryMap = {
            showControlBox: $controlBox,
            nameElement: $controlBox.find('.haptic-show-name-span'),
            typeElement: $controlBox.find('.haptic-show-type-span')
        };
    };

    //------------------------------
    // Открытые методы
    //------------------------------

    /*
     *  Открытый метод showData
     *
     *  Назначение:
     *  отбражает данные на экране
     *
     *  Аргументы:
     *   data - Object с данными для вывода
     *
     *  Действие:
     *   - в заготовленный блок вставляет значения
     *
     *
     *  Исключения: нет
     *
     * */


    var showData = function(data){
        jqueryMap.nameElement.text(data.name);
        jqueryMap.typeElement.text(data.attributes.purpose);
    };

    // Конец showData

    /*
     *  Открытый метод initModule
     *
     *  Назначение:
     *    инициализирует модуль haptic.show
     *
     *  Аргументы:
     *   $append_target - jq-объект, в который модуль добавил свой HTML-шаблон
     *
     *  Действие:
     *   - добавляет свой шаблон в общую структуру HTML
     *   - вызывает собственный метод setJqueryMap, который заполняет jqueryMap
     *
     *
     *  Исключения: нет
     *
     * */

    var initModule = function ($append_target) {
        moduleMap.$append_target = $append_target;
        $append_target.append(configMap.map_html);
        setJqueryMap();
    };

    // Конец initModule

    return {
        initModule: initModule,
        showData: showData
    }
})();