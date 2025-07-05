/*:
* @plugindesc  弹幕系统
* @author  闫辰祥
* @help  可以发送弹幕
* 使用时可以使用默认值，比如 new Danmaku(['测试','文字'])
* 也可以详细进行配置，比如  new Danmaku(['测试','文字'],{color:"red"}),
* 也可以同时对多个弹幕进行配置，比如  new Danmaku(['测试','文字',"123"],{color:"red"},{fontSize:"100px"})
* new Danmaku(['测试','文字'],{color:"red",fontSize:"100px",speed:2})
*/



class DannmakuConfig {
    constructor(config) {
        config = config || {};
        this.time = config.time || 1;//每隔几秒发送一个弹幕
        this.speed = config.speed || 5;//弹幕速度
        this.color = config.color || 'black';//弹幕颜色
        this.fontSize = config.fontSize || '30px';//弹幕大小
    }
}

class Danmaku {
    constructor(texts, ...config) {
        let tempThis = this
        let configs = [new DannmakuConfig()]//
        for (let i = 0; i < config.length; i++) {
            configs[i]= new DannmakuConfig(config[i])
        }

        for (let i = 0; i < texts.length; i++) {
            let useconfig = {}
            if(i>=configs.length)
            {
                useconfig =  configs[configs.length-1]
        
            }else{
                useconfig =  configs[i]
            }

            setTimeout(function () {
 
               tempThis.send(texts[i],useconfig)
            }, i*useconfig.time* 1000)
        }
    }

    send(text, config) {
        let 弹幕 = document.createElement("div");
        let node = document.createTextNode(text);
        弹幕.appendChild(node);

        弹幕.style.position = "fixed";
        弹幕.style.zIndex = "20"
        弹幕.style.whiteSpace = 'nowrap '
        let height = window.innerHeight;
        let width = window.innerWidth;
        弹幕.style.top = Math.random() * height * 0.8 + "px";
        弹幕.style.left = width - 300 + "px"

        //可修改变量
        弹幕.style.color = config.color;
        弹幕.style.fontSize = config.fontSize;
        

        document.body.appendChild(弹幕);

        let timeControler = setInterval(() => {
            弹幕.style.left = parseInt(弹幕.style.left) - config.speed + "px";
            if (parseInt(弹幕.style.left) < -500) {
                clearInterval(timeControler);
                弹幕.parentNode.removeChild(弹幕)
            }
        }, 10);
    }
}

