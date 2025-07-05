/*:
 * @plugindesc
 * 处理AI特效
 */

// AI对象
$ai = {};




$ai.speak = function (str) {
    $ai.keyWordCheck(str)
}

// 关键字识别
$ai.keyWordCheck = function (str) {
    var keyword =  /黑屏|看不见/;
    if( keyword.test(str) === true){
        $gameMessage.add("欸？您看不见吗？");
        return
    }


    keyword =  /你好|您好/;
    if( keyword.test(str) === true){
        $gameMessage.add("您好啊！");
        return
    }
}



$ai.sayHello = function () {
    var now = new Date()
    var nowHour = now.getHours();
    if(nowHour>6 && nowHour<12 )
    {
        $gameMessage.add("早上好！")
    }else if(nowHour>12 && nowHour<18 ){
        $gameMessage.add("下午好！")
    }else{
        $gameMessage.add("晚上好！")
    }

  }

$ai.close  = function()
{
    nw.Window.get().setAlwaysOnTop(false) 
    nw.Window.get().enterFullscreen();
}
$ai.start = function () {

    
    // nw.Window.get().setAlwaysOnTop(true) 
    //监听玩家是否失去焦点
    nw.Window.get().on('blur', function () {
         //强制窗口置顶
        nw.Window.get().focus()
    });



    // nw.Window.get().maximize()

    //阻止游戏关闭
    nw.Window.get().on('close', function () {
        //this.hide(); // 关闭窗口
        $gameMessage.add("无法关闭！")

    });


    // nw.Window.get().on('devtools-closed', function () {
    //     $gameMessage.add("关闭了！")
    // });

    // //失去焦点事件
    // nw.Window.get().on('enter-fullscreen', function () {
    //     $gameMessage.add("全屏！")
    // });


    return "已经成功开启"

}



var os = require('os')
function getUserInfo (){
    $gameMessage.add("你其实叫做"+os.userInfo().username+"吧")
    $gameMessage.add("你的CPU型号是"+os.cpus()[0].model)
    $gameMessage.add("内存为："+os.totalmem()/1024/1024/1024+"GB")
    $gameMessage.add("操作系统为："+os.platform())
}



// Input.keyMapper[65] = "A";

