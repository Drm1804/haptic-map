'use strict';

/*
 *
 *  Временный модуль приложения Haptic
 *
 *  Функционал: имитация получения внешних данных
 *
 * */

haptic.fake = (function () {

    var configMap = {
        map_html: '<div id="haptic-fake" style="position:absolute; right: 0; top: 0;">' +
        '<span>lng:</span><input class="haptic-fake-input-lng" placeholder="lng" type="text" style="width: 100px; display: block;">' +
        '<span>lat:</span><input class="haptic-fake-input-lat" placeholder="lat" type="text" style="width: 100px; display: block;">' +
        '<input class="haptic-fake-input-click" type="submit"  value="Кликнуть"  style="width: 100px;display: block;"/>' +
        '' +
        '</div>'
    };


    var jqueryMap = {};

    function setJqueryMap() {
        var $append_target = stateMap.$append_target;
        var $controlBox = $append_target.find('#haptic-fake');

        jqueryMap = {
            fakeControlBox:  $controlBox,
            inputLng: $controlBox.find('.haptic-fake-input-lng'),
            inputLat: $controlBox.find('.haptic-fake-input-lat'),
            btnClick: $controlBox.find('.haptic-fake-input-click')
        };
    }

    function fillControlInput(lng, lat){
        jqueryMap.inputLat.val(lat);
        jqueryMap.inputLng.val(lng);
    }

    var createClick = function () {
        haptic.click();
    };

    var initModule = function ($append_target) {
        $append_target.append(configMap.map_html);
        setJqueryMap()
    };


    return {
        initModule: initModule,
        createClick: createClick
    }
})();