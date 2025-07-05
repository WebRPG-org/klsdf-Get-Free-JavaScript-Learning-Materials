(function () {

    //1.自定义窗体
    function 萤雪界面() {
        this.initialize.apply(this, arguments);
    }
    //2.继承Window_Base类
    萤雪界面.prototype = Object.create(Window_Base.prototype);
    萤雪界面.prototype.constructor = 萤雪界面;

    //3.初始化窗体大小
    var statusWindow = {
        x: 240,
        y: 0,
        width: 576,
        height: 624
    };
    萤雪界面.prototype.initialize = function () {
        Window_Base.prototype.initialize.call(this, statusWindow.x, statusWindow.y,
            statusWindow.width, statusWindow.height);
    };

    //知识条

    萤雪界面.prototype.知识条颜色1 = function () {
        return this.textColor(4);
    };
    萤雪界面.prototype.知识条颜色2 = function () {
        return this.textColor(5);
    };
    萤雪界面.prototype.知识条长度比例 = function () {
        return $gloablData.知识 / $gloablData.最大知识值;
    };

    萤雪界面.prototype.知识文字颜色 = function (知识度比值) {
        if (知识度比值 < 0.1)
            return this.textColor(10);
        else
            return this.textColor(0);
    }

    萤雪界面.prototype.画知识条 = function (x, y, width) {
        width = width || 186;
        var color1 = this.知识条颜色1();
        var color2 = this.知识条颜色2();
        var 知识度比值 = this.知识条长度比例()
        this.drawGauge(x, y, width, 知识度比值, color1, color2);//这个是用来画条的。比值就控制的是其长度。

        this.changeTextColor(this.textColor(0));//文字颜色
        this.drawText("知识度", x, y, 70);//绘制文字的内容和位置
        this.drawCurrentAndMax($gloablData.知识, $gloablData.最大知识值, x, y, width,
            this.饥饿文字颜色(知识度比值), this.normalColor());//绘制具体的数值。例如饥饿度是20，中国就会显示20

    }


    //饥饿条

    萤雪界面.prototype.饥饿条颜色1 = function () {
        return this.textColor(4);
    };
    萤雪界面.prototype.饥饿条颜色2 = function () {
        return this.textColor(5);
    };
    萤雪界面.prototype.饥饿条长度比例 = function () {
        return $gloablData.饱食度 / $gloablData.最大饱食度;
    };

    萤雪界面.prototype.饥饿文字颜色 = function (饥饿度比值) {
        if (饥饿度比值 < 0.1)
            return this.textColor(10);
        else
            return this.textColor(0);
    }

    萤雪界面.prototype.画饥饿条 = function (x, y, width) {
        width = width || 186;
        var color1 = this.饥饿条颜色1();
        var color2 = this.饥饿条颜色2();
        var 饥饿度比值 = this.饥饿条长度比例()
        this.drawGauge(x, y, width, 饥饿度比值, color1, color2);//这个是用来画条的。比值就控制的是其长度。

        this.changeTextColor(this.textColor(0));//文字颜色
        this.drawText("饱食度", x, y, 70);//绘制文字的内容和位置
        this.drawCurrentAndMax($gloablData.饱食度, $gloablData.最大饱食度, x, y, width,
            this.饥饿文字颜色(饥饿度比值), this.normalColor());//绘制具体的数值。例如饥饿度是20，中国就会显示20

    }


    //萤雪好感度条

    萤雪界面.prototype.好感度颜色1 = function () {
        return this.textColor(4);
    };
    萤雪界面.prototype.好感度颜色2 = function () {
        return this.textColor(5);
    };
    萤雪界面.prototype.萤雪好感度条长度比例 = function () {
        return $gloablData.萤雪好感度 / $gloablData.萤雪最大好感度;
    };

    萤雪界面.prototype.萤雪文字颜色 = function (好感度比例) {
        if (好感度比例 > 0.9)
            return this.textColor(10);
        else
            return this.textColor(0);
    }


    萤雪界面.prototype.画萤雪好感度条 = function (x, y, width) {
        width = width || 186;
        var color1 = this.好感度颜色1();
        var color2 = this.好感度颜色2();
        var 好感度比例 = this.萤雪好感度条长度比例()
        this.drawGauge(x, y, width, 好感度比例, color1, color2);//这个是用来画条的。比值就控制的是其长度。

        this.changeTextColor(this.textColor(0));//文字颜色
        this.drawText("萤雪好感度", x, y, 100);//绘制文字的内容和位置
        this.drawCurrentAndMax($gloablData.萤雪好感度, $gloablData.萤雪最大好感度, x, y, width,
            this.萤雪文字颜色(好感度比例), this.normalColor());//绘制具体的数值。例如饥饿度是20，中国就会显示20

    }

    //精力条

    萤雪界面.prototype.精力条颜色1 = function () {
        return this.textColor(4);
    };
    萤雪界面.prototype.精力条颜色2 = function () {
        return this.textColor(5);
    };
    萤雪界面.prototype.精力条长度比例 = function () {
        return $gloablData.精力 / $gloablData.最大精力值;
    };

    萤雪界面.prototype.精力文字颜色 = function (精力比值) {
        if (精力比值 < 0.1)
            return this.textColor(10);
        else
            return this.textColor(0);
    }

    萤雪界面.prototype.画精力条 = function (x, y, width) {
        width = width || 186;
        var color1 = this.精力条颜色1();
        var color2 = this.精力条颜色2();
        var 精力度比值 = this.精力条长度比例()
        this.drawGauge(x, y, width, 精力度比值, color1, color2);//这个是用来画条的。比值就控制的是其长度。

        this.changeTextColor(this.textColor(0));//文字颜色
        this.drawText("精力度", x, y, 70);//绘制文字的内容和位置
        this.drawCurrentAndMax($gloablData.精力, $gloablData.最大精力值, x, y, width,
            this.饥饿文字颜色(精力度比值), this.normalColor());//绘制具体的数值。例如饥饿度是20，中国就会显示20

    }
    //林玲好感度条
    萤雪界面.prototype.林玲好感度条长度比例 = function () {
        return $gloablData.林玲好感度 / $gloablData.林玲最大好感度;
    };

    萤雪界面.prototype.林玲文字颜色 = function (好感度比例) {
        if (好感度比例 > 0.9)
            return this.textColor(10);
        else
            return this.textColor(0);
    }


    萤雪界面.prototype.画林玲好感度条 = function (x, y, width) {
        width = width || 186;
        var color1 = this.好感度颜色1();
        var color2 = this.好感度颜色2();
        var 好感度比例 = this.林玲好感度条长度比例()
        this.drawGauge(x, y, width, 好感度比例, color1, color2);//这个是用来画条的。比值就控制的是其长度。

        this.changeTextColor(this.textColor(0));//文字颜色
        this.drawText("林玲好感度", x, y, 100);//绘制文字的内容和位置
        this.drawCurrentAndMax($gloablData.林玲好感度, $gloablData.林玲最大好感度, x, y, width,
            this.林玲文字颜色(好感度比例), this.normalColor());//绘制具体的数值。例如饥饿度是20，中国就会显示20

    }

    //林依好感度条
    萤雪界面.prototype.林依好感度条长度比例 = function () {
        return $gloablData.林依好感度 / $gloablData.林依最大好感度;
    };

    萤雪界面.prototype.林依文字颜色 = function (好感度比例) {
        if (好感度比例 > 0.9)
            return this.textColor(10);
        else
            return this.textColor(0);
    }


    萤雪界面.prototype.画林依好感度条 = function (x, y, width) {
        width = width || 186;
        var color1 = this.好感度颜色1();
        var color2 = this.好感度颜色2();
        var 好感度比例 = this.林依好感度条长度比例()
        this.drawGauge(x, y, width, 好感度比例, color1, color2);//这个是用来画条的。比值就控制的是其长度。

        this.changeTextColor(this.textColor(0));//文字颜色
        this.drawText("林依好感度", x, y, 100);//绘制文字的内容和位置
        this.drawCurrentAndMax($gloablData.林依好感度, $gloablData.林依最大好感度, x, y, width,
            this.林依文字颜色(好感度比例), this.normalColor());//绘制具体的数值。例如饥饿度是20，中国就会显示20

    }


    //小芳好感度条
    萤雪界面.prototype.小芳好感度条长度比例 = function () {
        return $gloablData.小芳好感度 / $gloablData.小芳最大好感度;
    };

    萤雪界面.prototype.小芳文字颜色 = function (好感度比例) {
        if (好感度比例 > 0.9)
            return this.textColor(10);
        else
            return this.textColor(0);
    }


    萤雪界面.prototype.画小芳好感度条 = function (x, y, width) {
        width = width || 186;
        var color1 = this.好感度颜色1();
        var color2 = this.好感度颜色2();
        var 好感度比例 = this.小芳好感度条长度比例()
        this.drawGauge(x, y, width, 好感度比例, color1, color2);//这个是用来画条的。比值就控制的是其长度。

        this.changeTextColor(this.textColor(0));//文字颜色
        this.drawText("小芳好感度", x, y, 100);//绘制文字的内容和位置
        this.drawCurrentAndMax($gloablData.小芳好感度, $gloablData.小芳最大好感度, x, y, width,
            this.小芳文字颜色(好感度比例), this.normalColor());//绘制具体的数值。例如饥饿度是20，中国就会显示20

    }

    //4.写刷新函数，系统会自动调用这个函数
    萤雪界面.prototype.refresh = function () {

        if($gloablData.游戏开始类型 == 1)
        {
            this.contents.clear();
            this.drawText("你的状态", 144, 0, 200);
            this.画饥饿条(100, 50, 250)
            this.画精力条(100, 100, 250)
            this.画知识条(100, 150, 250)
            this.画萤雪好感度条(100, 200, 250)
            this.画林玲好感度条(100, 250, 250)
            this.画林依好感度条(100, 300, 250)
            this.画小芳好感度条(100, 350, 250)
        }
        if($gloablData.游戏开始类型 == 2)
        {
            this.contents.clear();
            this.drawText("映月模式", 144, 0, 200);
        }


    };



    //5.将窗口布局到游戏里面
    Scene_Menu.prototype.createStatusWindow = function () {
        this._statusWindow = new 萤雪界面();
        this.addWindow(this._statusWindow);
    };

})();



var 窗体高度;
//显示天数
function Window_Days() {
    this.initialize.apply(this, arguments);
}
//继承自Window_Base
Window_Days.prototype = Object.create(Window_Base.prototype);
//设定构造函数
Window_Days.prototype.constructor = Window_Days;
//初始化
Window_Days.prototype.initialize = function (x, y) {
    var width = 240;
    var height = this.fittingHeight(1);
    窗体高度 = height;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.drawText('第' + DataController.nowDay() + '天', 0, 0, 200);
};

//显示金币
Window_Gold.prototype.value = function() {
    return $gloablData.金币;
};


//显示时间
function Window_TimeSlot() {
    this.initialize.apply(this, arguments);
}
//继承自Window_Base
Window_TimeSlot.prototype = Object.create(Window_Base.prototype);
//设定构造函数
Window_TimeSlot.prototype.constructor = Window_TimeSlot;
//初始化
Window_TimeSlot.prototype.initialize = function (x, y) {
    var width = 240;
    var height = this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    //判断时间
    switch (DataController.当前时间段()) {
        case 0:
            this.drawText('晚上', 0, 0, 200);
            break;
        case 1:
            this.drawText('早晨', 0, 0, 200);
            break;
        case 2:
            this.drawText('上午', 0, 0, 200);
            break;
        case 3:
            this.drawText('中午', 0, 0, 200);
            break;
        case 4:
            this.drawText('下午', 0, 0, 200);
            break;
    }


};
//重写Scene_Menu，加入我们自定窗口
Scene_Menu.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createGoldWindow();
    this.createStatusWindow();
    //加入我们自己的窗口

    var win = new Window_Days(0, this._commandWindow.height);
    this.addWindow(win);
    var win = new Window_TimeSlot(0, this._commandWindow.height + 窗体高度);
    this.addWindow(win);
};