/*:
* @plugindesc 本插件用于给一个事件添加可以鼠标左键点击的效果
* 
* @author 闫辰祥
* 
*
* 
* 
* @help 
* 插件指令：
* 事件点击 开始
* 事件点击 关闭
* 
* 安装好之后，用鼠标点击事件，然后事件就会被触发
* 对不希望触发的事件，可以在备注加上   <不可点击>  来关闭触发
*
*
* 技术群：529245311
*/


var 闫 = 闫 || {};
闫.Parameters = PluginManager.parameters('闫_鼠标触发事件');

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if (command === '事件点击') {
        switch (args[0]) {
            case '开始':
                可以开始点了 = true
                break;
            case '关闭':
                可以开始点了 = false
                break;
        }
    }
};

var 可以开始点了 = true

var temp_TouchInput_onMouseDown = TouchInput._onMouseDown
TouchInput._onMouseDown = function (event) {
    temp_TouchInput_onMouseDown.call(this, event)

    if($dataMap == null)
    {
        return
    }
    if (event.button === 0 && 可以开始点了) {
        // var x = Graphics.pageToCanvasX(event.pageX);
        // var y = Graphics.pageToCanvasY(event.pageY);

        x = $gameMap.canvasToMapX(TouchInput.x);
        y = $gameMap.canvasToMapY(TouchInput.y);

        var event = $gameMap.eventsXy(x, y)[0];

       
        var eventId = $gameMap.eventIdXy(x,y);
        if (!event)
            return
        if(!event.page())
            return
        if ($dataMap.events[eventId].meta.不可点击)
            return

        event.start();
    }
};


