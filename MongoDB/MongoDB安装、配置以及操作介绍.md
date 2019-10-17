## 1. 简介
1. 数据库分类
（1）关系型数据库，是指采用了关系模型来组织数据的数据库。关系型数据库遵循`ACID`规则。
（2）非关系型的数据库(`NoSQL-Not Only SQL`)是对不同于传统的关系型数据库的数据库管理系统的统称。
参考： [关系型数据库和非关系型数据库区别、oracle与mysql的区别](https://blog.csdn.net/ochangwen/article/details/53423301)
2. `MongoDB` 将数据存储为一个文档，数据结构由键值(`key=>value`)对组成。
3. `MongoDB` 文档类似于 `JSON `对象。字段值可以包含其他文档，数组及文档数组。
4. 数据库对比

| `SQL`术语/概念 | `MongoDB`术语/概念 | 解释/说明 |
|----|----|----|
| `database` | `database` | 数据库 |
| `table` | `collection` | 数据库表/集合 |
| `row` | `document` | 数据记录行/文档 |
| `column` | `field` | 数据字段/域 |
|`index` | `index` | 索引 |
| `table joins` |  | 表连接，`MongoDB`不支持 |
| `primary key` | `primary key` | 主键，`MongoDB`自动将`_id`字段设置为主键 |
* 一个服务可以创建多个`database`数据库。
* 一个数据库`database`可以由多个集合`collection`组成。
* 一个集合`collection`一般由多个同类型文档`document`组成。
* 一个文档`document`由多个`field`字段组成。
* `index`索引以及`_id`主键是对文档`document`的标识。
## 2. 安装
1. 路径
  (1) 安装目录
  `/usr/local/Cellar/mongodb/4.0.4_1`
  (2) 配置文件目录
   `/usr/local/etc/mongod.conf`
  注释: 配置文件中有数据库目录和日志输出文件目录。
  (3) 日志输出文件目录
  `/usr/local/var/log/mongodb/mongo.log`
  (4) 数据库目录  
  `/usr/local/var/mongodb`
注释: `admin`数据库是存放管理员信息的数据库。
2. `mongod.conf`配置文件
```
systemLog:
  destination: file
  # 日志文件路径
  path: /usr/local/var/log/mongodb/mongo.log
  # 日志是累加而不是覆盖
  logAppend: true
storage:
  # 数据库存储路径
  dbPath: /usr/local/var/mongodb
net:
  #port: 19999 绑定端口，如果不填，则表示27017端口
  # 绑定ip, 如果要绑定多个ip，可以用数组表示
  bindIp: 127.0.0.1
```
注意：①如果绑定`0.0.0.0`，则所有客户端都能够访问(即使不配置`bindIp`，外网仍无法访问)。 ② 如果`mongod.conf`文件中绑定了`ip`，则只有绑定的`ip`对应的客户端才能够访问。
3. 启动
(1) 开启MongoDB服务
`mongod -f /usr/local/etc/mongod.conf `
地址：`http://localhost:27017/`
注释: 可以修改`MongoDB`默认`27017`端口
注意：如果无法开启，则尝试通过删除重建数据库目录的方式解决①`rm -rf /usr/local/var/mongodb ` ② `mkdir /usr/local/var/mongodb`
(2) 客户端连接服务端
`mongo`
4. 关闭MongoDB服务
`use admin; ` 
`db.shutdownServer();`
注释: 只有在`admin`数据库中时才能关闭`MongoDB`服务。
5. 安装路径下的`exe`程序介绍
(1) `mongo.exe` 客户端， **支持js语法！**
(2) `mongod.exe` 服务端
(3) `mongodump.exe` 备份工具
(4) `mongorestore.exe` 恢复工具
(5) `mongoexport.exe` 导出工具
(6) `mongoimport.exe` 导入工具
(7) `mongostat.exe` 实时性能监控工具
(8) `mongotop.exe` 跟踪`MongDB`实例读写时间工具
注释: `mongo.exe`客户端工具和`mongod.exe`服务端工具最常用。
## 3. 操作
### 3.1 mongo.exe客户端
#### 3.1.1 操作用户
#### 3.1.1.1 创建用户
1. 创建`root`用户
```
 # 非认证启动
 mongod -f /usr/local/etc/mongod.conf 
```
```
# 新开窗口进入shell终端
➜  ~ mongo
# 查看已有数据库
> show dbs 
# 查看/切换到admin数据库
> use admin
switched to db admin
# 创建root用户，指定用户名、密码、角色和数据库
> db.createUser({user: 'root', pwd: 'root', roles:[{role: 'userAdminAnyDatabase', db: 'admin'}]})
Successfully added user: {
	"user" : "root",
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		}
	]
}
```
注释: ① 建立了 `userAdminAnyDatabase` 角色，用来管理用户，可以通过这个角色来创建、删除用户。② `userAdminAnyDatabase `权限只是针对用户管理的，对其他(数据库读写等)是没有权限的。
注意: ① **`用户与数据库`**是绑定的，在某一个数据库里创建的用户只能够在该数据库中进行认证。② 一般只创建操作当前数据库的用户(`db`填当前数据库)，如果创建了操作其他数据库的用户，则需要在用户创建库中进行认证，然后再去其他数据库中操作 ③ 以非认证的方式启动数据库则不需要用户权限。
2. 通过`root`用户创建其他用户
```
 # 认证启动
mongod -config /usr/local/etc/mongod.conf --auth
```
```
# 新开窗口进入shell终端
➜  ~ mongo
> show dbs 
# Error 报错。没有验证，所以没有权限。
> use admin  #验证，因为在admin下面添加的帐号，所以要到admin下面验证。
switched to db admin
> db.auth('root', 'root')
1
> show dbs
# 展示所有数据库
> use test  #在test库里创建帐号
switched to db test
> db.createUser({user: 'test', pwd: 'test', roles: [{role: 'readWrite', db: 'test'}]})
> show users #查看当前库下的用户
```
注释: ① `--auth`代表授权启动，需要帐号密码才能访问。`auth=true`可以加到`mongo.conf`配置文件里面去进行统一管理。② 以非认证的方式启动`mongoDB`也可以创建用户，创建过程与创建`root`用户相同。
3. 用户角色分类
* 数据库用户角色：`read`、`readWrite`;
* 数据库管理角色：`dbAdmin`、`dbOwner`、`userAdmin`；
* 集群管理角色：`clusterAdmin`、`clusterManager`、`clusterMonitor`、`hostManager`；
* 备份恢复角色：`backup`、`restore`；
* 所有数据库角色：`readAnyDatabase`、`readWriteAnyDatabase`、`userAdminAnyDatabase`、`dbAdminAnyDatabase`
* 超级用户角色：`root `
* 内部角色：`__system`
4. 具体角色权限
* `Read`：允许用户读取指定数据库
* `readWrite`：允许用户读写指定数据库
* `dbAdmin`：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问`system.profile`
* `userAdmin`：允许用户向`system.users`集合写入，可以找指定数据库里创建、删除和管理用户
* `clusterAdmin`：只在`admin`数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
* `readAnyDatabase`：只在`admin`数据库中可用，赋予用户所有数据库的读权限
* `readWriteAnyDatabase`：只在`admin`数据库中可用，赋予用户所有数据库的读写权限
* `userAdminAnyDatabase`：只在`admin`数据库中可用，赋予用户所有数据库的`userAdmin`权限
* `dbAdminAnyDatabase`：只在`admin`数据库中可用，赋予用户所有数据库的`dbAdmin`权限。
* `root`：只在`admin`数据库中可用。超级账号，超级权限(不建议使用)。
##### 3.1.1.2 授权认证
```
 # 认证启动
mongod -config /usr/local/etc/mongod.conf --auth
```
```
# 新开窗口进入shell终端
➜  ~ mongo

# root用户授权验证
> use admin 
switched to db admin
> show dbs # 报错，没有权限
> db.auth('root', 'root') # 授权用户
> show dbs # 成功，展示所有数据库

# test用户授权验证
> use test
> show tables # 报错，没有权限
> db.auth('test', 'test') # 授权用户
> show tables  # 成功，展示当前数据库中所有表
```
##### 3.1.1.3 查看/删除用户
```
> mongo 
# 操作所有用户只在admin数据库中可用
> use admin 
switched to db admin
> db.auth('root','root') # 授权认证
> show users #查看当前数据库中的用户
> db.system.users.find().pretty()  #查看所有数据库中的用户
{
	"_id" : "admin.root",
	"user" : "root",
	"db" : "admin",
	"credentials" : {
		"SCRAM-SHA-1" : {
			"iterationCount" : 10000,
			"salt" : "myPBMNr+71D/BHR2KNIs7g==",
			"storedKey" : "ar4RsCe/Mn0rm3DpCscUtLJy32Q=",
			"serverKey" : "fbZ69Fo+IPMxFCznNIW2rZJqoDU="
		}
	},
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		}
	]
}
> db.system.users.find().count()
1
> db.system.users.remove({user:"root"})
WriteResult({ "nRemoved" : 1 })
> db.system.users.find().count()
0
```
#### 3.1.2 操作数据库
##### 3.1.2.1 查询
1. 查看所有数据库
   `show dbs`
2. 新建/切换到数据库
   `use test`
注释: 只有在插入表数据之后才真正实现数据库的创建。
3. 查看当前数据库
  `db`
   注释： `db`表示当前数据库。
4. 查看集合
   `show collections/tables` 
5. 查看当前集合所有数据
    `db.集合名.find()`
6. 格式化查看当前集合所有数据
    `db.集合名.find().pretty()`
7. 查看集合中第一条数据
    `db.集合名.findOne()`
8. 限制数量
    `db.集合名.find().limit(数量)`
9. 跳过指定数量
    `db.集合名.find().skip(数量)`
10. 查询数量
    `db.表名.find().count()`
11. 排序
    `db.表名.find().sort({"字段名":1}) //1表示升序;  -1表示降序`
12. 指定字段返回
    `db.表名.find({},{"字段名":0}) //1返回; 0不返回`　　
13. 比较查询 
  大于- `$gt`；小于- `$lt`；大于等于- `$gte`；小于等于- `$lte`；非等于- `$ne`；或者- `$or`；包含- `$in`；不包含- `$nin`；
14. 正则表达式
`/匹配字符/`或`new RegExp("匹配字符")`
```javascript
 > for(let i = 0; i < 10; i++) {
     db.tb.save({'name': 'jake'+ i, id: i, msg: {age:i}})
     //mongo.exe 客户端， 支持js语法!
  }
> db.tb.find()   
0-10
> db.tb.find({'id': 3})
3
> db.tb.find({'msg.age': 6})
6
> db.tb.find().limit(3)
0-2
> db.tb.find().limit().skip(2).limit(2)
2、3
> db.tb.find({'msg.age': {'$gt':7}})
8、9
> db.tb.find({'id': {'$lt':3, '$gte':1}})
1、2 
> db.tb.find({'id': {'$ne':3}})
0-2、4-9
> db.tb.find({'$or': [{'id':3}, {'name': 'jake7'}]})
3、7
> db.tb.find({'id': {'$in': [2,4]}});
2、4
> db.tb.find({'id': {'$nin': [1,3,5,7,9]}});
0、2、4、6、8
> db.tb.find({'id': {'$gt':2}}).count()
7
> db.tb.find({'msg.age': {'$lte':6}}).sort({id: -1}).limit(2);
6、5
> db.tb.find({id: {'$gte': 6}}, {msg: 0})
{ "_id" : ObjectId("5b559f72e1aefaf030c8d016"), "name" : "jake6", "id" : 6 }
{ "_id" : ObjectId("5b559f72e1aefaf030c8d017"), "name" : "jake7", "id" : 7 }
{ "_id" : ObjectId("5b559f72e1aefaf030c8d018"), "name" : "jake8", "id" : 8 }
{ "_id" : ObjectId("5b559f72e1aefaf030c8d019"), "name" : "jake9", "id" : 9 }
> db.tb.find({name: /^jake(1|2)$/})
{ "_id" : ObjectId("5b559f72e1aefaf030c8d011"), "name" : "jake1", "id" : 1, "msg" : { "age" : 1 } }
{ "_id" : ObjectId("5b559f72e1aefaf030c8d012"), "name" : "jake2", "id" : 2, "msg" : { "age" : 2 } }
```
##### 3.1.2.2  增加
  1. 新增数据库表
 `db.createCollection('user')`
**注释：一个集合相当于一个表。**
  2. 创建集合并插入数据
  (1) 使用`insert`方法插入一条数据
  `db.user.insert({id:1, name:'hello'})`
  (2) 使用`save`方法插入一条数据
  `db.user.save({id:2, name:'mongo'})`
  (3) 插入数据时指定`_id`
  `db.user.insert({_id: 0, id:1, name:'hello'})`
   `db.save.insert({_id: 0, id:1, name:'hello'})`
注意: ① 如果已有`user`表则在该表中插入一条数据，如果没有`user`表则创建`user`表并插入一条数据。② 如果未指定`_id`，则`mongodb`会给该条数据默认生成`_id`。③ 如果指定的`_id`与已有某条数据的`_id`相同，则`sava`方法更新数据，`insert`方法抛出异常。
##### 2.1.2.3 删除
   1. 删除当前数据库
  `db.dropDatabase()`
   2. 删除数据库表
   `db.表名称.drop()`
   3. 删除表中某一条数据
   `db.表名.remove(条件);`
```javascript
> db.tb.remove({id: {$gt: 5}})
```
##### 3.1.2.4 修改
   1. 更新集合中某一条数据
  `db.表名.update({"条件字段名":"字段值"},{$set:{"要修改的字段名":"修改后的字段值"}});`
```javascript
> db.tb.update({name: 'jake0'}, {$set: {'msg.age': 6}});
> db.tb.update({'msg.age': 5}, {$set: {'id': 10}})
```
注释：`update`方法的第一个参数起到查询的效果，更新查询到的某一条数据。
### 3.2 Node操作数据库
#### 3.2.1 增删改查
##### 3.2.1.1 增加
1. 创建集合
```javascript
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';

MongoClient.connect(url, (err, client) => {
    console.log('连接成功!');
    const db = client.db('test');
    db.createCollection('tb1', function (err, res) {
        if (err) throw err;
        console.log("创建tb1集合!");
        client.close();
    });
});
``` 
2. 创建集合并插入数据
```javascript
const MongoClient = require('mongodb').MongoClient;

const DB_CONN_STR = 'mongodb://127.0.0.1:27017';

MongoClient.connect(DB_CONN_STR, (err, client) => {
    console.log('连接成功!');
    const db = client.db('test');
    const collection = db.collection('tb2');
    const data = [
        {name: 'wilson01', age: 18},
        {name: 'wilson02', age: 20}
    ];
    collection.insert(data, (err, result) => {
        if(err) {
            console.log('Err' + err);
            return;
        } else {
            console.log(result);
            client.close();
            //{ result: { ok: 1, n: 2 },
            //   ops:
            //    [ { name: 'wilson01', age: 18, _id: 5b55de761ffbb2ac7f041dcf },
            //      { name: 'wilson02', age: 20, _id: 5b55de761ffbb2ac7f041dd0 } ],
            //   insertedCount: 2,
            //   insertedIds: { '0': 5b55de761ffbb2ac7f041dcf, '1': 5b55de761ffbb2ac7f041dd0 }
            // }
        }
    })
});
```
注释: `insert()`方法既能够插入一条又能够插入多条数据； `insertOne()`方法只能够插入一条数据；`insertMany()`方法可以插入多条数据。
##### 3.2.1.2 查询
1. 简单查询
```
const MongoClient = require('mongodb').MongoClient;

const DB_CONN_STR = 'mongodb://127.0.0.1:27017';

const selectedData = (client, callback) => {
    const db = client.db('test');
    const collection = db.collection('tb2');
    const whereStr = {age: 20};
    collection.find(whereStr).toArray((err, result) => {
        if(err) {
            console.log('Err' + err);
            return;
        } else {
            callback(result);
            //[{ _id: 5b55de761ffbb2ac7f041dd0, name: 'wilson01', age: 20 }]
        }
    })
};

MongoClient.connect(DB_CONN_STR, (err, client) => {
    console.log('连接成功!');
    selectedData(client, (result) => {
        console.log(result);
        client.close();
    });
});
```
2. 条件查询
```javascript
const MongoClient = require('mongodb').MongoClient;

const DB_CONN_STR = 'mongodb://127.0.0.1:27017';

const selectedData = (client, callback) => {
    const db = client.db('test');
    const collection = db.collection('tb');
    //查询所有
    collection.find().toArray((err, result) => {
        if(err) throw  err;
        callback(result);
        //1，2，3，4，5
    })
    //正则查询
    collection.find({name: /^jake(1|2)$/}).toArray((err, result) => {
        if(err) throw  err;
        callback(result);
        //1，2
    })
    //查询排序
    collection.find({id: {$gt: 2}}).sort({id: -1}).toArray((err, result) => {
        if(err) throw  err;
        callback(result);
        //5, 4, 3
    })
    //查询分页
   collection.find({id: {$ne: 3}}).limit(3).toArray((err, result) => {
        if(err) throw  err;
        callback(result);
        //1, 2, 4
    })
    //查询跳页
    collection.find().skip(2).toArray((err, result) => {
        if(err) throw  err;
        callback(result);
        //3, 4，5
    })
};

MongoClient.connect(DB_CONN_STR, (err, client) => {
    selectedData(client, (result) => {
        console.log(result);
        client.close();
    });
});
```
注释: 支持`mongo`命令终端支持的查询语句。
##### 3.2.1.3 修改 
```
const MongoClient = require('mongodb').MongoClient;

const DB_CONN_STR = 'mongodb://127.0.0.1:27017';

const updateData = (client, callback) => {
    const db = client.db('test');
    const collection = db.collection('tb2');
    const whereStr = {name: 'wilson01'};
    const updateStr = {$set: {age: 28}};
    collection.updateMany(whereStr, updateStr, (err, result) => {
        if(err) {
            console.log('Err' + err);
            return;
        } else {
            callback(result);
        }
    })
};

MongoClient.connect(DB_CONN_STR, (err, client) => {
    console.log('连接成功!');
    updateData(client, (res) => {
        console.log(res.result.nModified + " 条文档被更新");
        //1 条文档被更新
        client.close();
    });
});
```
注释: ① `updateOne()`方法只会更新第一个符合条件的数据。 `updateMany()`方法会更新所有符合条件的数据。② `res.result.nModified` 为被更新的条数。
##### 3.2.1.4 删除
1. 删除集合
```
const MongoClient = require('mongodb').MongoClient;

const DB_CONN_STR = 'mongodb://127.0.0.1:27017';

const delData = (client, callback) => {
    const db = client.db('test');
    const collection = db.collection('tb2');
    collection.drop((err, result) => {
        if(err) throw  err;
        callback(result)
    })
};

MongoClient.connect(DB_CONN_STR, (err, client) => {
    console.log('连接成功!');

    delData(client, (res) => {
        console.log(res);
        client.close();
    });
});
```
2. 删除查询到的数据
```
const MongoClient = require('mongodb').MongoClient;

const DB_CONN_STR = 'mongodb://127.0.0.1:27017';

const delData = (client, callback) => {
    const db = client.db('test');
    const collection = db.collection('tb2');
    const whereStr = {name: 'wilson01'};
    collection.deleteOne(whereStr, (err, result) => {
        if(err) {
            console.log('Err' + err);
            return;
        } else {
            callback(result);
        }
    })
};

MongoClient.connect(DB_CONN_STR, (err, client) => {
    console.log('连接成功!');

    delData(client, (res) => {
        console.log(res.result.n + " 条文档被删除");
        //1 条文档被删除
        client.close();
    });
});
```
注释: ① `deleteOne()`方法会删除第一条符合条件的数据。`deleteMany()` 方法会删除所有符合条件的数据。② `res.result.n` 删除的条数。
### 3.3 其他exe程序操作
1. `mongoimport`导入 
`mongoimport --host 127.0.0.1:19999 -d(指定数据库) demo -c(指定表名称) user --file ./dbbackup/dumall-backup/user.json`
2. `mongoexport`导出
`mongoexport -d(指定数据库) demo -c(指定表名称) user -q(过滤条件，可以省略) ‘{“name”: {$ne: null}}’ -o(导出文件名) `
## 4. 参考
[MongoDB中文文档](http://www.mongodb.org.cn/)
[Mac环境下安装和配置MongoDB](https://www.imooc.com/article/22733)
[mac系统下安装、启动、停止mongodb](https://www.cnblogs.com/haonanZhang/p/8213947.html)
[MongoDB 3.0 用户创建](https://www.cnblogs.com/zhoujinyi/p/4610050.html)
