/*:
* @plugindesc
* 本类负责游戏的存档，和DataController配合使用
* 
* @help
* 本类负责游戏的存储和读取，具体的数据控制由DataController负责
* 1. 在$storyGlobalInfo中添加变量
* 2. 在使用后要记得保存，例如：
*      $gloablData.某个自定义数据 = true;
*      SaveController.autoSave();
*      window.close()
*/

class SaveController {
    //自动保存
    static autoSave(savePosition = 1) {//默认第一个存档
        console.log("保存成功")
        $gameSystem.onBeforeSave();
        DataManager.saveGame(savePosition)
    }
    //自动加载
    static autoLoad(savePosition = 1) {
        DataManager.loadGame(savePosition)
    }

    //加载存档的全局数据
    static loadStoryInfo() {//获取故事控制对象的属性

        //游戏每次加载的时候，首先加载存档，如果没有存档，那么就先保存再加载。

        var tempGlobalInfo = DataManager.loadGlobalInfo() || [];
        try {
            //tempGlobalInfo[0]是个null，真正的数据在1
            $gloablData = tempGlobalInfo[1].自定义数据;
        } catch (error) {
            //额外代码，第一次会初始化$gloablData
            $gloablData.initialize ()
            //要是第一次游戏，那么递归一下，再次加载存档
            this.autoSave();
            //把读取的数据存到$gloablData，以便使用
            $gloablData = this.loadStoryInfo();
        }
        return $gloablData;
    }

    static saveGlobalInfo(){
        var tempGlobalInfo = DataManager.loadGlobalInfo();
        tempGlobalInfo[1].自定义数据=$gloablData;
        DataManager.saveGlobalInfo(tempGlobalInfo)
    }
}



//重写全局存档的内容
DataManager.makeSavefileInfo = function () {
    var info = {};
    info.globalId = this._globalId;
    info.title = $dataSystem.gameTitle;
    info.characters = $gameParty.charactersForSavefile();
    info.faces = $gameParty.facesForSavefile();
    info.playtime = $gameSystem.playtimeText();
    info.timestamp = Date.now();

    info.自定义数据 = $gloablData;//自定义的数据，$gloablData在DataController声明
    return info;
};

