/*:
* @plugindesc
* 处理游戏的剧情数据
*/



////////////////////////////////////游戏数据控制////////////////////////////////

//用户的自定义数据，这个是初始值，之后会被覆盖
$gloablData = {};

$gloablData.initialize = function () {
    //0：初始界面
    //1：萤雪模式
    //2：映月模式
    //3: 林依模式
    this.游戏开始类型 = 0;


    this.饱食度 = 100;
    this.最大饱食度 = 100;

    this.精力 = 100;
    this.最大精力值 = 100;

    this.知识 = 0;
    this.最大知识值 = 100;

    this.萤雪好感度 = 0;
    this.萤雪最大好感度 = 100;

    this.映月好感度 = 0;
    this.映月最大好感度 = 100;

    this.林玲好感度 = 0;
    this.林玲最大好感度 = 100;

    this.林依好感度 = 0;
    this.林依最大好感度 = 100;

    this.小芳好感度 = 0;
    this.小芳最大好感度 = 100;

    //游戏剧情控制变量
    this.第一次来萤雪房间学习 = true;
    this.第一次遇到小芳运动 = false;
    this.参加了考试 = false;
    this.考试成绩 = 0;

    this.接受了小芳的邀请 = true;
    this.接受了萤雪的邀请 = true;
    this.接受了林玲的邀请 = true;
    this.接受了林依的邀请 = true;


    this.每日金币消耗 = 50;
    this.每日饱食度消耗 = 30;
    this.每日精力消耗 = 30;

    //游戏的多周目变量
    this.内存泄露 = false;
    this.萤雪周目数 = 0;//0代表初始化
    this.映月周目数 = 0;
    this.映月被杀 = false;
    this.进入林依的长期模式 = false
    this.打开林依的次数 = 0;

    this.学会传送 = false;
    this.学会时间倒流  = false;
    this.学会修改金币 = false;
    this.学会成就系统 = false;
    this.学会开启事件触发 = false;
    this.找到映月的游戏 = false;
    this.学会保存游戏 = false;
    


    //物品

}



//数据初始化
DataController = {}

//新周目数据初始化
DataController.initialize = function () {
    $gloablData.金币 = 500;
    $gloablData.最大金币 = 9999999;

    $gloablData.饱食度 = 100;
    $gloablData.最大饱食度 = 100;

    $gloablData.精力 = 100;
    $gloablData.最大精力值 = 100;

    $gloablData.知识 = 0;
    $gloablData.最大知识值 = 100;

    $gloablData.萤雪好感度 = 0;
    $gloablData.萤雪最大好感度 = 100;

    $gloablData.映月好感度 = 100;
    $gloablData.映月最大好感度 = 999;

    $gloablData.林玲好感度 = 0;
    $gloablData.林玲最大好感度 = 100;

    $gloablData.林依好感度 = 0;
    $gloablData.林依最大好感度 = 100;

    $gloablData.小芳好感度 = 0;
    $gloablData.小芳最大好感度 = 100;

    $gloablData.第一次来萤雪房间学习 = true;
    $gloablData.第一次遇到小芳运动 = false;
    $gloablData.参加了考试 = false;
    $gloablData.考试成绩 = 0;

    $gloablData.接受了小芳的邀请 = false;
    $gloablData.接受了萤雪的邀请 = false;
    $gloablData.接受了林玲的邀请 = false;
    $gloablData.接受了林依的邀请 = false;



}

//女主角攻略条件

//在湖边遇到萤雪时进行判断
DataController.萤雪攻略条件判断 = function()
{
    return $gloablData.萤雪好感度 >= 40 && $gloablData.接受了林玲的邀请 == false && $gameVariables.value(1) <= 35
}



DataController.林玲攻略条件判断 = function () {
    return $gloablData.林玲好感度 >= 40 && $gloablData.接受了林玲的邀请 == false && $gameVariables.value(1) >= 35
}

DataController.小芳攻略条件判断 = function () {
    return $gloablData.小芳好感度 >= 70 && $gloablData.接受了小芳的邀请 == false
}


//结局判断条件


DataController.判断开除 = function () {  
    //当第九天的时候，若没有参加考试，并且知识低于30
    return DataController.nowDay() >=9&& $gloablData.参加了考试==false && $gloablData.知识<=30
}


//每日资源的消耗
DataController.DailyConsume = function () {
    $gloablData.饱食度 = $gloablData.饱食度 - $gloablData.每日饱食度消耗;
    $gloablData.金币 = $gloablData.金币 - $gloablData.每日金币消耗;
    $gloablData.精力 = $gloablData.精力 - $gloablData.每日精力消耗;
}

//饱食度+40，金钱-30
DataController.吃饭 = function () {
    DataController.增减饱食度(40)
    DataController.增减金币(-30)
}


//饱食度+30，金钱-10，
DataController.在食堂吃饭 = function () {
    
    DataController.增减饱食度(30)
    DataController.增减金币(-10)
}

//饱食度+40，金钱-50，精力+20
DataController.吃夜宵 = function () {
    DataController.增减饱食度(40)
    DataController.增减金币(-50)
    DataController.增减精力(20)
}

//金币+70，精力-30，林依好感度+5
DataController.java咖啡店打工 = function () {
    DataController.增减金币(70)
    DataController.增减精力(-30)
    DataController.增减林依好感度(5)
}


//金币-30，精力+30
DataController.买咖啡 = function () {
    DataController.增减金币(-30)
    DataController.增减精力(30)
}

//萤雪好感度+5，知识+5，精力-10
DataController.找萤雪补习 = function () {
    DataController.增减知识(5)
    DataController.增减精力(-10)
    DataController.增减萤雪好感度(5)
}


//知识+5，精力-20，萤雪好感度+2
DataController.上课 = function () {
    DataController.增减知识(5)
    DataController.增减精力(-20)
    DataController.增减萤雪好感度(2)
}

//知识+7，精力-10
DataController.去图书馆自习 = function () {
    DataController.增减知识(7)
    DataController.增减精力(-10)
}

//精力+50
DataController.睡觉 = function () {
    DataController.增减精力(50)
}


//林玲好感度+5，金钱-30，精力-5，
DataController.去电玩店 = function () {
    DataController.增减精力(-5)
    DataController.增减金币(-30)
    DataController.增减林玲好感度(5)
}

//精力-30，精力最大值+20，小芳好感度+5
DataController.健身 = function () {
    // DataController.增减小芳好感度(5)
    DataController.增减精力(-30)
    $gloablData.最大精力值 += 10;
}

//精力+30，知识+2
DataController.去公园思考 = function () {
    DataController.增减精力(30)
    DataController.增减知识(2)
}


DataController.增减成绩 = function (分数) {
    $gloablData.考试成绩 = YanUtil.changeDate($gloablData.考试成绩, 100, 分数)
}

DataController.增减金币 = function (变化的金币值) {

    $gloablData.金币 = YanUtil.changeDate($gloablData.金币, $gloablData.最大金币, 变化的金币值)
    // $gameParty.gainGold(变化的金币值);
}

DataController.增减精力 = function (变化的精力值) {
    $gloablData.精力 = YanUtil.changeDate($gloablData.精力, $gloablData.最大精力值, 变化的精力值)
}

DataController.增减知识 = function (变化的知识) {
    $gloablData.知识 = YanUtil.changeDate($gloablData.知识, $gloablData.最大知识值, 变化的知识)
}

DataController.增减饱食度 = function (变化的饱食度) {
    $gloablData.饱食度 = YanUtil.changeDate($gloablData.饱食度, $gloablData.最大饱食度, 变化的饱食度)
}

DataController.增减萤雪好感度 = function (变化的值) {
    $gloablData.萤雪好感度 = YanUtil.changeDate($gloablData.萤雪好感度, $gloablData.萤雪最大好感度, 变化的值)
}

DataController.增减林玲好感度 = function (变化的值) {
    $gloablData.林玲好感度 = YanUtil.changeDate($gloablData.林玲好感度, $gloablData.林玲最大好感度, 变化的值)
}

DataController.增减林依好感度 = function (变化的值) {
    $gloablData.林依好感度 = YanUtil.changeDate($gloablData.林依好感度, $gloablData.林依最大好感度, 变化的值)
}

DataController.增减小芳好感度 = function (变化的值) {
    $gloablData.小芳好感度 = YanUtil.changeDate($gloablData.小芳好感度, $gloablData.小芳最大好感度, 变化的值)
}




//时间过去一天
DataController.timePass = function () {
    $gameTemp.reserveCommonEvent(1);
}


//将时间跳转到第day天的第time时段,time从1开始计数
DataController.changeTimeTo = function(day,time)
{
    $gameVariables.setValue(1,day*5+time -1)
    DataController.timePass ()
}

DataController.当前时间段 = function () {
    var 故事进度 = $gameVariables.value(1);
    return 故事进度 % 5;
}

//当前的天数，这里要注意，因为开局时是从0开始的，而一天循环是5，所以要-1
DataController.nowDay = function () {
    return Math.floor(($gameVariables.value(1)-1) / 5);
}

//是否为某天，例如  是否为("早晨，中午")
DataController.当前时间是否为 = function (触发条件) {
    var 时间 = DataController.当前时间段()
    if (时间 == 1 && 触发条件.indexOf("早晨") !== -1) {
        return true;
    }
    if (时间 == 2 && 触发条件.indexOf("上午") !== -1) {
        return true;
    }
    if (时间 == 3 && 触发条件.indexOf("中午") !== -1) {
        return true;
    }
    if (时间 == 4 && 触发条件.indexOf("下午") !== -1) {
        return true;
    }
    if (时间 == 0 && 触发条件.indexOf("晚上") !== -1) {
        return true;
    }
    return false;
}

//是否为清晨
DataController.isEarlymorning = function () {
    return this.当前时间段() == 1;
}

//是否为上午
DataController.isMorning = function () {
    return this.当前时间段() == 2;
}

//是否为中午
DataController.isNoon = function () {
    return this.当前时间段() == 3;
}

//是否为下午
DataController.isAfternoon = function () {
    return this.当前时间段() == 4;
}

//是否为晚上
DataController.isNight = function () {
    return this.当前时间段() == 0;
}


//保存和读取游戏的全局数据
DataController.saveGlobal = function () {  
    SaveController.saveGlobalInfo()
}

DataController.loadGlobal = function () {  
    SaveController.loadStoryInfo()
}


//保存和读取游戏的局部数据
DataController.save = function () {
    
    if($gloablData.游戏开始类型 == 3 || $gloablData.游戏开始类型 == 4)
    {
        return
    }

    if ($gloablData.游戏开始类型 == 1) {
        SaveController.autoSave(1)
    } else if ($gloablData.游戏开始类型 == 2) {
        SaveController.autoSave(2)
    }
}

DataController.load = function () {

    if($gloablData.游戏开始类型 == 3 || $gloablData.游戏开始类型 == 4)
    {
        return
    }

    if ($gloablData.游戏开始类型 == 1) {
        SaveController.autoLoad(1)
    } else if ($gloablData.游戏开始类型 == 2) {
        SaveController.autoLoad(2)
    }
}

//开始映月
DataController.StartYingyue = function () {
    $gloablData.游戏开始类型 = 2;
    SaveController.saveGlobalInfo()
    nw.Window.open('index.html', {}, function (new_win) {
        //新窗口创建时的回调函数
        new_win.on('focus', function () {
            $gloablData.游戏开始类型 = 2;
        });
    });
}

//开始萤雪
DataController.StartYingxue = function () {
    $gloablData.游戏开始类型 = 1;
    SaveController.saveGlobalInfo()
    nw.Window.open('index.html', {}, function (new_win) {
        //新窗口创建时的回调函数
        new_win.on('focus', function () {
            $gloablData.游戏开始类型 = 1;
        });
    });
}

DataController.readClipboard = function()
{
    var clipboard = nw.Clipboard.get();
    return  clipboard.get('text');
}

DataController.writeClipboard = function (msg) {

    var clipboard = nw.Clipboard.get();
    // 向剪贴板写入
    clipboard.set(msg, 'text');
}



//在映月被杀死之后，进入了萤雪的第三模式
DataController.进入第三模式 = function () {
    $gloablData.映月被杀 = true
    $gloablData.游戏开始类型= 3;
    SaveController.saveGlobalInfo()
    window.close()

} 

DataController.进入第四模式 = function () {
    $gloablData.游戏开始类型= 4;
    SaveController.saveGlobalInfo()
    window.close()

}
DataController.进入上午考试 = function () {
    DataController.changeTimeTo(7,2)
    $gamePlayer.reserveTransfer(14,1,1,0,0)
}



// {
//     "0": "highres,{{masterpiece}},best quality, spring,yingxue,1girl, solo,blue ribbon, blue eyes,detailed eyes,beautiful eyes, twintails,sleeveless,china dress, teenage, <lora:YingXue_AnimeMix:0.55>,smile",
//     "30": "highres,{{masterpiece}},best quality, summer,yingxue,1girl, solo,blue ribbon, blue eyes,detailed eyes,beautiful eyes, twintails,sleeveless,china dress, teenage, <lora:YingXue_AnimeMix:0.55>,smile",
//     "60": "highres,{{masterpiece}},best quality, autumn,yingxue,1girl, solo,blue ribbon, blue eyes,detailed eyes,beautiful eyes, twintails,sleeveless,china dress, teenage, <lora:YingXue_AnimeMix:0.55>,cry,sad",
//     "90": "highres,{{masterpiece}},best quality, winter,yingxue,1girl, solo,blue ribbon, blue eyes,detailed eyes,beautiful eyes, twintails,sleeveless,china dress, teenage, <lora:YingXue_AnimeMix:0.55>,cry,sad,smile"
// }
    