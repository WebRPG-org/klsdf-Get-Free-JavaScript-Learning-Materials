Window_TitleCommand.prototype.makeCommandList = function () {

    this.addCommand("开始游戏", 'startgame');
    // this.addCommand(TextManager.newGame, 'newGame');
    // this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
    this.addCommand(TextManager.options, 'options');

    // this.addCommand("测试",   'test');//第一个是按钮名称，第二个是绑定的方法名
};


//重写窗体
Scene_Title.prototype.createCommandWindow = function () {
    this._commandWindow = new Window_TitleCommand();
    this._commandWindow.setHandler('startgame', this.startgame.bind(this));
    // this._commandWindow.setHandler('newGame', this.commandNewGame.bind(this));
    // this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
    this._commandWindow.setHandler('options', this.commandOptions.bind(this));

    //test方法在这里写，以此类推，可以写很多的方法。

    this.addWindow(this._commandWindow);
};

//这个是test方法的具体功能，也就是点击之后触发的事件
Scene_Title.prototype.startgame = function () {
    if ($gloablData.游戏开始类型 == 1)//萤雪
    {
        //萤雪的时候，打开插件指令
        YanUtil.callPlyginCommand("事件点击 开始")
        //开始新游戏
        if ($gloablData.萤雪周目数 == 0) {
            $dataSystem.startMapId = 11;
            $dataSystem.startX = 3;
            $dataSystem.startY = 3;
            DataManager.setupNewGame();
            this._commandWindow.close();
            this.fadeOutAll();
            SceneManager.goto(Scene_Map);
            $gloablData.萤雪周目数 = 1
        } else {
            SaveController.autoLoad(1);
            this._commandWindow.close();
            this.fadeOutAll();
            SceneManager.goto(Scene_Map);
        }
    }else if($gloablData.游戏开始类型 == 2)
    {   
        //映月的时候，关闭插件指令
        YanUtil.callPlyginCommand("事件点击 关闭")
        //开始新游戏
        if ($gloablData.映月周目数 == 0) {
            $dataSystem.startMapId = 24;
            $dataSystem.startX = 4;
            $dataSystem.startY = 3;
            DataManager.setupNewGame();
            this._commandWindow.close();
            this.fadeOutAll();
            SceneManager.goto(Scene_Map);
            $gloablData.映月周目数 = 1
            SaveController.saveGlobalInfo()
        } else {
            SaveController.autoLoad(2);
            this._commandWindow.close();
            this.fadeOutAll();
            SceneManager.goto(Scene_Map);
        }
    }




}