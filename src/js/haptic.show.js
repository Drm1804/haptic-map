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

    var showData = function(data){
        jqueryMap.nameElement.text(data.name);
        jqueryMap.typeElement.text(data.attributes.purpose);
    };

    var setJqueryMap = function () {
        var $append_target = moduleMap.$append_target;
        var $controlBox = $append_target.find('#haptic-show');


        jqueryMap = {
            showControlBox: $controlBox,
            nameElement: $controlBox.find('.haptic-show-name-span'),
            typeElement: $controlBox.find('.haptic-show-type-span')
        };
    };

    var initModule = function ($append_target) {
        moduleMap.$append_target = $append_target;
        $append_target.append(configMap.map_html);
        setJqueryMap();
    };

    return {
        initModule: initModule,
        showData: showData
    }
})();