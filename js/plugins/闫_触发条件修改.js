
Game_Event.prototype.meetsConditions = function(page) {
    var c = page.conditions;
    if (c.switch1Valid) {
        if (!$gameSwitches.value(c.switch1Id)) {
            return false;
        }
    }
    if (c.switch2Valid) {
        if (!$gameSwitches.value(c.switch2Id)) {
            return false;
        }
    }
    if (c.variableValid) {
        if ($gameVariables.value(c.variableId) != c.variableValue) {
            return false;
        }
    }
    if (c.selfSwitchValid) {
        var key = [this._mapId, this._eventId, c.selfSwitchCh];
        if ($gameSelfSwitches.value(key) !== true) {
            return false;
        }
    }
    if (c.itemValid) {
        var item = $dataItems[c.itemId];
        if (!$gameParty.hasItem(item)) {
            return false;
        }
    }
    if (c.actorValid) {
        var actor = $gameActors.actor(c.actorId);
        if (!$gameParty.members().contains(actor)) {
            return false;
        }
    }

    var 触发条件  = $dataMap.events[this._eventId].meta.触发条件
    时间 = $gameVariables.value(3);//获得时间的变量
    if (触发条件) {
        if(时间==1 &&触发条件.indexOf("早晨")!== -1 )
        {
            return true;
        }
        if(时间==2 &&触发条件.indexOf("上午")!== -1 )
        {
            return true;
        }
        if(时间==3 &&触发条件.indexOf("中午")!== -1 )
        {
            return true;
        }
        if(时间==4 &&触发条件.indexOf("下午")!== -1 )
        {
            return true;
        }
        if(时间==0 &&触发条件.indexOf("晚上")!== -1 )
        {
            return true;
        }
  
    }
    return true;
};
