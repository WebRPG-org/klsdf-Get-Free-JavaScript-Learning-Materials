/*:
 * @plugindesc
 * 管理和处理游戏剧情用
 * 
 * @help
 * 本插件提供了全局存档的控制接口，如果想要控制全局存档需要两个步骤
 * 1. 在$storyGlobalInfo中添加变量
 * 2. 在使用后要记得保存，例如：
 *      $gloablData.某个自定义数据 = true;
 *      SaveController.autoSave();
 *      window.close()
 */

(function () {


    // //自动开始
    _Scene_Title_Start = Scene_Title.prototype.start
    Scene_Title.prototype.start = function () {
        //开始的时候先加载存档的数据
        SaveController.loadStoryInfo();

        if(YanUtil.isChrome())
        {
            Stage.prototype.initialize.call(this);

                SaveController.autoLoad();

                this.fadeOutAll();
                SceneManager.clearStack();
                $gamePlayer.reserveTransfer(23, 1, 1);//加载自动事件
                $gamePlayer.requestMapReload();
                SceneManager.goto(Scene_Map);
            return 
        }
        
        switch ($gloablData.游戏开始类型) {
            case 0:
                //开始00和01的界面

                Stage.prototype.initialize.call(this);

                SaveController.autoLoad();

                this.fadeOutAll();
                SceneManager.clearStack();
                $gamePlayer.reserveTransfer(1, 1, 1);//加载自动事件
                $gamePlayer.requestMapReload();
                SceneManager.goto(Scene_Map);
                break;
                
            case 1://保持默认界面
            case 2:
                break;    
                //进入映月界面
            case 3:
                //开始00和01的界面

                Stage.prototype.initialize.call(this);

                SaveController.autoLoad();

                this.fadeOutAll();
                SceneManager.clearStack();
                $gamePlayer.reserveTransfer(55, 1, 1);//加载自动事件
                $gamePlayer.requestMapReload();
                SceneManager.goto(Scene_Map);
                break;
            case 4:
                window.close();
                break;
        }


    }


})()


