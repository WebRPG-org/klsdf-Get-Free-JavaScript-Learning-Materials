// // import.meta.url 返回模块的绝对的 `file:` URL。
// // url模块中fileURLToPath()函数，返回完全解析的特定于平台的 Node.js 文件路径
// // path模块中dirname()函数，返回路径的目录路径
// import fileURLToPath  from 'url';

// var dirname = require('path').dirname;
// const __dirname = dirname(__filename);

class YanUtil {

    /**修改数值的时候保证数值不超过最大值
     *  @data:数据
     * @max:最大值
     * @delta:变化的量
     * 
    */
    static changeDate(data, max, delta) {
        data += delta;
        if (data > max) {
            data = max;
        }
        return data;
    }


    //生成从[minNum,maxNum]的随机数
    static randomNum(minNum, maxNum) {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    }

    //调用插件指令，参数传入字符串进去
    static callPlyginCommand(pluginCommand){
        var args =pluginCommand.split(" ");
        var command = args.shift();
        Game_Interpreter.prototype.pluginCommand(command, args);
    }

    
    //向游戏中发布一个对话输入框
    static talk(content,defaultValue )
    {
        answer = prompt(content,defaultValue)

    }

    //判断玩家是否正在输入数据
    static isInputting()
    {
       return typeof(YanUtil.answer) == "undefined";
    }


    //判断是否是浏览器环境
    static isChrome()
    {
        return Utils.isNwjs()==false
    }


    //毫秒转天数
    static  formatDuring(millisecond) {
        var days = parseInt(millisecond / (1000 * 60 * 60 * 24));
        var hours = parseInt((millisecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((millisecond % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = (millisecond % (1000 * 60)) / 1000;
        return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
    }
}

YanUtil.answer = undefined

