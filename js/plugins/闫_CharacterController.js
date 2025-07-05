/*:
* @plugindesc
* 管理角色的各种数据
* 
* @help
* CharacterController.query("角色代号")
* CharacterController.upData("角色代号","键","值")
*/

let { readFile, writeFile, readFileSync } = require('fs')

class CharacterController {
    // 查询某个角色的数据
    static query(characterId) {
        var data =  readFileSync(`json/${characterId}.json`, 'utf-8')
        return JSON.parse(data)
    }
    // 修改数据   --> 其实就是把原数据删除，把修改的数据放进去
    static upData(characterId, key, value) {
        readFile(`json/${characterId}.json`, 'utf-8', (err, data) => {
            if (err) throw err
            let res = JSON.parse(data)
            res[key] = value
            writeFile(`json/${characterId}.json`, JSON.stringify(res), err => {
                if (err) throw err
                console.log('修改成功')
            })
        })
    }
}



// query()

// // 增加数据
// function add(obj) {
//     readFile(filePath, 'utf-8', (err, data) => {
//         if (err) throw err
//         let res = JSON.parse(data)
//         // 需要得到id，id为数组中最后一个图书的id+1
//         let index = res[res.length - 1].id + 1
//         // 向obj对象中添加id属性
//         obj.id = index
//         res.push(obj)
//         // 写入到json文件中 --> 需要把res转为字符串写入到json文件
//         writeFile(filePath, JSON.stringify(res), err => {
//             if (err) throw err
//             console.log('添加成功')
//         })
//     })
// }
// // add({ bookName: "斗罗大陆", author: "唐家三少", hero: "唐三" })



// 修改id为3的图书信息为：天官赐福、墨香铜臭、谢怜
// upData({ id: 3, bookName: "天官赐福", author: "墨香铜臭", hero: "谢怜" })

// // 删除数据
// // 根据图书的id删除对应的数据
// function del(id) {
//     readFile(filePath, 'utf-8', (err, data) => {
//         if (err) throw err
//         let res = JSON.parse(data)
//         // 数组的filter方法可以返回满足筛选条件的结果
//         let r = res.filter(item => {
//             // 只有当图书的id不为3，才返回结果
//             return id !== item.id
//         })
//         writeFile(filePath, JSON.stringify(r), err => {
//             if (err) throw err
//             console.log('删除成功')
//         })
//     })
// }
// // 删除图书id为3的数据
// del(3)
