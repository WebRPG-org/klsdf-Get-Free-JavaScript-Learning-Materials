/*:
* @plugindesc  成就系统
* @author  闫辰祥
* @help  直接使用 例如 AchievementSystem.add("梦之始","开始游戏")
*/

(function () {
    var stylesheet = document.createElement("link")
    stylesheet.rel = "stylesheet"
    stylesheet.href = "./css/achievement.css"
    stylesheet.type = "text/css"
    document.head.appendChild(stylesheet)
})();


AchievementSystem = {}
AchievementSystem._achievements = []

//判断是否获得某个成就
AchievementSystem.has = function (title) {
    for (let i = 0; i < AchievementSystem._achievements.length; i++) {
        if (AchievementSystem._achievements[i].title == title)
            return true;

    }
    return false;
}

//为成就系统添加一个成就
AchievementSystem.add = function (title, info) {
    if (AchievementSystem.has(title) == true)
        return;

    //添加成就信息
    var achievmentRecord = { title, info }
    AchievementSystem._achievements.push(achievmentRecord);


    var achievmentNode = document.createElement("div");
    achievmentNode.classList += "achievment-node"

    var titleNode = document.createElement("div");
    titleNode.appendChild(document.createTextNode("获得成就：" + title))
    titleNode.classList += "title-node"


    var infoNode = document.createElement("div");
    infoNode.appendChild(document.createTextNode(info))
    infoNode.classList += "info-node"

    achievmentNode.appendChild(titleNode);
    achievmentNode.appendChild(infoNode);
    document.body.appendChild(achievmentNode);

    setTimeout(() => {

        achievmentNode.parentNode.removeChild(achievmentNode);

    }, 10000)

    return true;

}



