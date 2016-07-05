'use strict';

/*
 *
 *  Функциональный модуль приложения Haptic
 *
 *  Функционал - управление событиями в приложении
 *
 * */

haptic.control = (function () {

    var jqueryMap = {};

    var setJqueryMap = function($container, $map){
        jqueryMap.$container = $container;
        jqueryMap.$map = $map;
    };


    var addEventListner = function(){
        $(document).on('click', function(ev){
            console.log('Произошел клик');
            console.log(ev);
        })
    };

    var createClick = function(){
        var e = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            clientX: 100,
            clientY: 100
        });
        //debugger;
        jqueryMap.$map[0].dispatchEvent(e);

    };

    var initModule = function($container, $map){
        setJqueryMap($container, $map);
    };


    return{
        initModule: initModule,
        addEventListner: addEventListner,
        createClick: createClick
    }

})();