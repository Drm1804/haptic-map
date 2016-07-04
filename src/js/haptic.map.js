'use strict';

/*
*
*  Функциональный модуль приложения Haptic
*
*  Функционал - прослойка между приложением и api картографического сервиса
*
* */

haptic.map = (function(){



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
     *
     *  Возвращает:
     *   true в случае успеха, иначе false
     *
     *  Исключения: нет
     *
     * */
    
    var initModule = function(){
        return true;
    };

    // Конец initModule

    return{
        initModule: initModule

    }
})();