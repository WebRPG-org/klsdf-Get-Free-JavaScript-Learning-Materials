DAO = {}


/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} data 数据，格式是一个对象字面量，例如{id:1,switch:on}
 */
DAO.add = function (db, storeName, data) {
  var request = db
    .transaction([storeName], "readwrite") // 创建事务对象 指定表格名称和操作模式（"只读"或"读写"）
    .objectStore(storeName) // 获得仓库对象
    .add(data);

  request.onsuccess = function (event) {
    console.log("数据写入成功");
  };

  request.onerror = function (event) {
    console.log("数据写入失败");
  };
}


//删除数据
DAO.remove = function () {

}

//修改数据
DAO.update = function () {

}

/**
 * 通过主键读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} key 主键值
 */
DAO.queryByKey = function (db, storeName, key) {
  return new Promise((resolve, reject) => {
    var request = db.transaction([storeName])
      .objectStore(storeName)
      .get(key); 

    request.onerror = function (event) {
      console.log("事务失败");
    };

    request.onsuccess = function (event) {
      console.log("主键查询结果: ", request.result);
      resolve(request.result);
    };
  });

}




/**
 * 通过游标读取数据，会查询整张表
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 */
 DAO.queryByCursor = function(db, storeName) {
  let list = [];
  var store = db
    .transaction(storeName, "readwrite") // 事务
    .objectStore(storeName); // 仓库对象
  var request = store.openCursor(); // 指针对象
  // 游标开启成功，逐行读数据
  request.onsuccess = function (e) {
    var cursor = e.target.result;
    if (cursor) {
      // 必须要检查
      list.push(cursor.value);
      cursor.continue(); // 遍历了存储对象中的所有内容
    } else {
      console.log("游标读取的数据：", list);
    }
  };
}



/**
 * 打开数据库
 * @param {object} dbName 数据库的名字
 * @param {string} storeName 仓库名称
 * @param {string} version 数据库的版本
 * @return {object} 该函数会返回一个数据库实例，如果没有就会创建一个
 */
DAO.openDB = function (dbName, version = 1) {
  return new Promise((resolve, reject) => {
    var request = window.indexedDB.open(dbName, version);


    request.onsuccess = function (event) {
      db = request.result;
      
      console.log('数据库打开成功');
      resolve(db)
    };


    request.onupgradeneeded = function (event) {
      console.log("数据更新")
      db = event.target.result;
      var objectStore;
      if (!db.objectStoreNames.contains('person')) {
        //创建仓库
        objectStore = db.createObjectStore('person', { keyPath: 'id' });

        //创建index
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
      }


    }


  })

}



