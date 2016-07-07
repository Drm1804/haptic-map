'use strict';

/*
 *
 *  Временный модуль приложения Haptic
 *
 *  Функционал: имитация получения внешних данных
 *
 * */

haptic.fake = (function () {

    var moduleMap = {
        $append_target: null,
        mapObject: null
    };

    var configMap = {
        map_html: '<div id="haptic-fake" class="haptic-fake" style="">' +
        '<span>lat:</span><input class="haptic-fake-input-lat" placeholder="lat" value="61.42147064208985" type="text" style="width: 100px; display: block;">' +
        '<span>lng:</span><input class="haptic-fake-input-lng" placeholder="lng" value="55.14788084304194" type="text" style="width: 100px; display: block;">' +
        '<input class="haptic-fake-input-click" type="submit"  value="Кликнуть"  style="width: 100px;display: block;"/>' +
        '' +
        '</div>'
    };


    var jqueryMap = {};

    function setJqueryMap() {
        var $append_target = moduleMap.$append_target;
        var $controlBox = $append_target.find('#haptic-fake');

        jqueryMap = {
            fakeControlBox: $controlBox,
            inputLng: $controlBox.find('.haptic-fake-input-lng'),
            inputLat: $controlBox.find('.haptic-fake-input-lat'),
            btnClick: $controlBox.find('.haptic-fake-input-click')
        };
    }

    function fillControlInput(lng, lat) {
        jqueryMap.inputLat.val(lat);
        jqueryMap.inputLng.val(lng);
    }

    var createClick = function () {
        var lat = jqueryMap.inputLat.val();
        var lng = jqueryMap.inputLng.val();

        haptic.click([lat, lng])
    };

    var initModule = function ($append_target) {
        moduleMap.$append_target = $append_target;
        $append_target.append(configMap.map_html);
        setJqueryMap();
        jqueryMap.btnClick.on('click', function () {
            createClick();
        })
    };


    return {
        initModule: initModule
    }
})();