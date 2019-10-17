## 一. 介绍
1. `MongoDB` 是文档型数据库(`Document Database`)，不是关系型数据库(`Relational Database`)。而`Mongoose`可以将` MongonDB` 数据库存储的文档(`documents`)转化为`javascript` 对象，然后可以直接进行数据的增删改查。
注释：`Mongoose`是在`node.js`异步环境下对`mongodb`进行便捷操作的对象模型工具。`Mongoose`只能作为`NodeJS`的驱动，不能作为其他语言的驱动。
2. `Mongooose`中有三个比较重要的概念，分别是`Schema`、`Model`、`entity`。它们的关系是`Schema`生成`Model`， `Model`实例出`entity`。
3. `Schema`不具备操作数据库的能力。`Model`和`entity`都可对数据库操作造成影响，`Model`比`entity`更具操作性。
4. `Schema`用于定义数据库的结构。每个`Schema`都会映射到`mongodb`中的一个`collection`。
5. `Model`是由`Schema`编译而成的构造器，具有抽象属性和行为，可以对数据库进行增删查改。`Model`的每一个实例`entity`就是一个文档`document`。
注释： `Schema`对应数据库中一个集合`collection`里文档`document`的数据结构。`Model`对应一个集合 `collection`。`entity`是`Model`的实例，对应集合`collection`中的一个文档`document`。
## 二. 连接数据库
1. 使用`connect()`方法连接数据库。
语法: `mongoose.connect(url, options)`
参数：`options`为可选参数，优先级高于`url`。`options`可用选项如下：

|  选项 |   含义 |
|:---------:|--------|
| db | 数据库设置 |
| server | 服务器设置 |
| replset | 副本集设置 |
| user | 用户名 |
| pass | 密码 |
| auth | 鉴权选项 |
| mongos | 连接多个数据库
2. 简单连接，传入`url`参数以及`db`数据库名称。
```
mongoose.connect('mongodb://127.0.0.1/test');
```
注意：默认端口为`27017`。
3. 传入用户名、密码、端口等参数。
```
mongoose.connect('mongodb://username:password@host:port/database?options...');
```
4. 通过`mongoose.connection`监听连接状态。
```javascript
var mongoose =  require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test');

mongoose.connection.on('connected', function() {
  console.log('MongoDB connected connected');
})
mongoose.connection.on('error', function() {
  console.log('MongoDB connected error');
})
mongoose.connection.on('disconnected', function() {
  console.log('MongoDB connected disconnected');
})
```
5. 避免多次连接
新建一个`mongoose.js`:
```javascript
var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/test');
module.exports = mongoose;
```
每个`module`中，引用`var mongoose = require('./mongoose.js')`。
6. 断开连接
语法：`mongoose.disconnect()`
```javascript
mongoose.connect('mongodb://127.0.0.1:27017/test');

setTimeout(()=> {
  mongoose.disconnect();
}, 2000);

mongoose.connection.on('connected', function() {
  console.log('MongoDB connected connected');
})
mongoose.connection.on('error', function() {
  console.log('MongoDB connected error');
})
mongoose.connection.on('disconnected', function() {
  console.log('MongoDB connected disconnected');
})
```
## 三. Scheme
1. `Schema`主要用于定义`MongoDB`中集合`collection`里文档`document`的结构。定义`Schema`非常简单，指定字段名和类型即可。
2. `Scheme`支持以下8种类型
`String`字符串、`Number`数字 、`Date`日期、`Buffer`二进制、`Boolean`布尔值、`Mixed` 混合类型、`ObjectId`对象ID、`Array`数组。 
3. 通过`mongoose.Schema`来调用`Schema`，然后使用`new`方法来创建`schema`对象。
```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
```
4. 创建`Schema`对象时，声明字段类型有两种方法，一种是首字母大写的字段类型，另一种是引号包含的小写字段类型。
```javascript
var mySchema = new Schema({title:String, author:String});
//或者 
var mySchema = new Schema({title:'string', author:'string'});
```
5. 如果需要在`Schema`定义后添加其他字段，可以使用`add()`方法。
```javascript
var MySchema = new Schema();
MySchema.add({ name: 'string', color: 'string', price: 'number' });
```
6. 在`schema`中设置`timestamps`为`true`，`schema`映射的文档`document`会自动添加`createdAt`和`updatedAt`这两个字段，代表创建时间和更新时间。
```javascript
var UserSchema = new Schema(
  {...},
  { timestamps: true }
);
```
7. 每一个文档`document`都会被`mongoose`添加一个不重复的`_id`，`_id`的数据类型不是字符串，而是`ObjectID`类型。如果在查询语句中要使用`_id`，则需要使用`findById`语句，而不能使用`find`或`findOne`语句。
## 四. Model
1. 模型`Model`是根据`Schema`编译出的构造器，或者称为类。
2. 使用`model()`方法将`Schema`编译为`Model`
语法：`mongoose.model("模型名称", Scheme, "Collection名称(可选)")`
注意：如果未传第三个参数指定`Collection`集合名称。则`Mongoose`会将`Collection`集合名称设置为模型名称的小写版。如果名称的最后一个字符是字母，则会变成复数；如果名称的最后一个字符是数字，则不变。例如，如果模型名称为`MyModel`，则集合名称为`mymodels`；如果模型名称为`Model1`，则集合名称为`model1`。
```javascript
var schema = new mongoose.Schema({ num:Number, name: String, size: String});
var MyModel = mongoose.model('MyModel', schema);
```
3. 生成实例`entity`
```javascript
var schema = new mongoose.Schema({ num:Number, name: String, size: String});
var MyModel = mongoose.model('MyModel', schema);
var doc = new MyModel({ size: 'small' });
console.log(doc.size);//'small'
```
4. 实例`entity`保存为文档`document`
通过`new Model()`创建的实例`entity`，必须通过`save()`方法，才能将对应文档`document`保存到数据库的集合`collection`中。回调函数是可选项，第一个参数为`err`，第二个参数为保存的文档`document`对象。
语法：`save(function (err, doc) {})`
```javascript
var mongoose =  require('mongoose');

mongoose.connect('mongodb://test:test@127.0.0.1:27017/test');

var schema = new mongoose.Schema({ num:Number, name: String, size: String});
var MyModel = mongoose.model('MyModel', schema);
var doc = new MyModel({ size: 'small' });
doc.save(function (err,doc) {
  //{ __v: 0, size: 'small', _id: 5970daba61162662b45a24a1 }
  console.log(doc);
})
```
注释：① 一个实例`Entiy`对应一条文档`document`。② 实例`entity`的`save`方法只能够在文档`document`中保存`scheme`结构范围内的字段。
## 五. 自定义方法
1. 实例方法 
`Model`的实例`entity`有很多内置方法，例如 `save`。可以通过`Schema`对象的`methods`属性给`entity`自定义扩展方法。
```javascript
var schema = new mongoose.Schema({ num:Number, name: String, size: String });        
schema.methods.findSimilarSizes = function(cb){
  return this.model('MyModel').find({size:this.size},cb);
}

var MyModel = mongoose.model('MyModel', schema);
var doc1 = new MyModel({ name:'doc1', size: 'small' });
var doc2 = new MyModel({ name:'doc2', size: 'small' });
var doc3 = new MyModel({ name:'doc3', size: 'big' });
doc1.save();
doc2.save();
doc3.save();
setTimeout(function(){
    doc1.findSimilarSizes(function(err,docs){
        docs.forEach(function(item,index,arr){
            //doc1
            //doc2
            console.log(item.name)        
        })
    })  
},0) 
```
2. 静态方法  
可以通过`Schema`对象的`statics`属性给 `Model `添加静态方法。
```javascript
var schema = new mongoose.Schema({ num:Number, name: String, size: String });
schema.statics.findByName = function(name,cb){
    return this.find({name: new RegExp(name,'i')},cb);
}

var MyModel = mongoose.model('MyModel', schema);
var doc1 = new MyModel({ name:'doc1', size: 'small' });
var doc2 = new MyModel({ name:'doc2', size: 'small' });
var doc3 = new MyModel({ name:'doc3', size: 'big' });
doc1.save();
doc2.save();
doc3.save();
setTimeout(function(){
    MyModel.findByName('doc1',function(err,docs){
        //[ { _id: 5971e68f4f4216605880dca2,name: 'doc1',size: 'small',__v: 0 } ]
        console.log(docs);
    })
},0)
```
注释：静态方法是通过`Schema`对象的`statics`属性给`model`添加方法；实例方法是通过`Schema`对象的`methods`是给`entity`添加方法。
3. 查询方法
通过`schema`对象的`query`属性，给`model`添加查询方法。
```javascript
var schema = new mongoose.Schema({ age:Number, name: String});        
schema.query.byName = function(name){
    return this.find({name: new RegExp(name)});
}

var temp = mongoose.model('temp', schema);   
temp.find().byName('huo').exec(function(err,docs){
    //[ { _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 27 },
    // { _id: 5971f93be6f98ec60e3dc86e, name: 'huo', age: 30 } ]
    console.log(docs);
}) 
```
注释：查询方法需要有 `.find()` 作为开头。
问题：静态方法与查询方法的本质区别？
## 六. 新增文档
1. `mongoose`提供了三种新增文档`document`的方法：
(1) `entity`的`save()`方法
(2) `model`的`create()`方法
(3) `model`的`insertMany()`方法
2. `entity`的`save()`方法
**`save([options], [options.safe], [options.validateBeforeSave], [fn])`**
```javascript
mongoose.connect('mongodb://test:test@127.0.0.1:27017/test');

var schema = new mongoose.Schema({name: String, age: Number});
var model = mongoose.model('temp', schema);
var entity = new model({name: 'john', age: 18});
entity.save((err, doc) => {
  //{ _id: 5b63a49e8910503426acd587, name: 'john', age: 18, __v: 0 }
  console.log(doc);
})
```
3. `model`的`create()`方法
使用`save()`方法，需要先实例化为`entity`，再使用`save()`方法保存文档`document`。而`create()`方法直接在模型`model`上操作，并且可以同时新增多个文档`document`。
**`Model.create(doc(s), [callback])`**
```javascript
mongoose.connect('mongodb://test:test@127.0.0.1:27017/test');

var schema = new mongoose.Schema({name: String, age: Number});
var model = mongoose.model('temp', schema);
model.create([{name:"lily"}, {name:'jane'}],(err, docs) => {
    console.log(docs);
    //[ { _id: 5b643cc96ca76572d64e242c, name: 'lily', __v: 0 },
    //{ _id: 5b643cc96ca76572d64e242d, name: 'jane', __v: 0 } ]
});
```
4. `model`的`insertMany()`方法
```javascript
mongoose.connect('mongodb://test:test@127.0.0.1:27017/test');
var schema = new mongoose.Schema({name: String, age: Number});
var model = mongoose.model('temp', schema);
model.insertMany([{name:"a"}, {name:"b"}],(err, docs) => {
  console.log(docs);
  //[ { _id: 5b643db39d69e1731042a0f1, name: 'a', __v: 0 },
  // { _id: 5b643db39d69e1731042a0f2, name: 'b', __v: 0 } ]
});
```
**注意：新增文档方法的`callback`回调函数不能使用`exec`方法改写。查询文档、更新文档以及删除文档方法的`callback`回调函数大多数都可以使用`exec`方法改写。**
问题：`model`的`create()`方法与`insertMany()`方法的区别。
## 七. 查询文档
1. `mongoose`提供了三种查询文档`document`的方法：
(1) `find()`
(2) `findById()` 
(3) `findOne()` 
2. `find()`方法
**`Model.find(conditions, [projection], [options], [callback])`**
```javascript
mongoose.connect('mongodb://test:test@127.0.0.1:27017/test');

var schema = new mongoose.Schema({name: String, age: Number});
var model = mongoose.model('temp', schema);
for(let i = 1; i < 10; i++) {
  new model({name: `jake${i}`, age: i}).save();
}

//查找所有文档
model.find((err, docs) => {
  console.log(docs);//1,2,3,4,5,6,7,8,9
});

//查找年龄大于等于6的文档
model.find({age: {$gte: 6}}, (err, docs) => {
  console.log(docs); //6，7，8，9
});

//查找年龄大于等于6文档的另一种写法
model.find({age: {$gte: 6}}).exec((err, docs) => {
  console.log(docs); //6，7，8，9
});

//年龄大于8,且名字存在'jake'的数据
model.find({age: {$gt: 8}, name: /jake/}, (err, docs) => {
  console.log(docs); //9
});

//年龄等于1，且只输出'name'字段
model.find({age: {$lt: 3}}, 'name', (err, docs) => {
  console.log(docs);
  //[ { _id: 5b644b5a43048277c40834c6, name: 'jake1' },
  //{ _id: 5b644b5a43048277c40834c7, name: 'jake2' } ]
});

//年龄等于1，且不需要输出_id
model.find({age: 1}, {name: 1, _id: 0}, (err, docs) => {
  console.log(docs); //[ { name: 'jake1' } ]
});

//搜索年龄大于2，且搜索结果跳过前2条, 只留3条，且按年龄倒序
model.find({age: {$gt: 2}}).skip(2).limit(3).sort({age: -1}).exec((err, docs) => {
  console.log(docs); //7,6,5
});
```
注释： 可参考`mongo.exe`程序以及`node`原生查询`mongodb`数据库`API`，接口类似。
注意：① 两种写法`find(..., callback)`和`find(...).exec(callback)`。② `node`查询通过`toArray(err, docs)`方法获取文档数组，`mongoose`查询通过`exec(err, docs)`方法获取文档数组。
3. `findById()`方法
**`Model.findById(id, [projection], [options], [callback])`**
```javascript
model.findById('5b644b5a43048277c40834c7', (err, doc) => {
  console.log(doc);
  //{ _id: 5b644b5a43048277c40834c7, name: 'jake2', age: 2, __v: 0 }
});

//另一种写法
model.findById('5b644b5a43048277c40834c7').exec((err, doc) => {
  console.log(doc);
  //{ _id: 5b644b5a43048277c40834c7, name: 'jake2', age: 2, __v: 0 }
});

//只输出name字段
model.findById('5b644b5a43048277c40834c7', {name: 1, _id: 0}).exec((err, doc) => {
  console.log(doc);
  //{ name: 'jake2' }
});

//输出最少字段
model.findById('5b644b5a43048277c40834c7', {lean: true}).exec((err, doc) => {
  console.log(doc);
  //{ _id: 5b644b5a43048277c40834c7 }
});
```
4. `findOne()`方法
该方法返回查找到的所有实例的第一个。
**`Model.findOne([conditions], [projection], [options], [callback])`**
```javascript
model.findOne({age: {$gt: 5}}, (err, doc) => {
  console.log(doc);
  //{ _id: 5b644b5a43048277c40834cb, name: 'jake6', age: 6, __v: 0 }
});

model.findOne({age: {$gt: 5}}, {_id: 0}).exec((err, doc) => {
  console.log(doc);
  //{ name: 'jake6', age: 6, __v: 0 }
});

model.findOne({age: {$gt: 5}}, {name: 1}).lean().exec((err, doc)=> {
  console.log(doc);
  //{ _id: 5b644b5a43048277c40834cb, name: 'jake6' }
});
```
5. 常用的查询条件如下
```
$or　　　　     或关系
$nor　　　     或关系取反
$gt　　　　    大于
$gte　　　     大于等于
$lt　　　　    小于
$lte　　　     小于等于
$ne　　        不等于
$in　　        在多个值范围内
$nin　　       不在多个值范围内
$all　　    　 匹配数组中多个值
$regex　　    正则，用于模糊查询
$size　　   　匹配数组大小
$maxDistance　范围查询，距离（基于LBS）
$mod　　　  　取模运算
$near　　　   邻域查询，查询附近的位置（基于LBS）
$exists　　   字段是否存在
$elemMatch　  匹配内数组内的元素
$within　　　 范围查询（基于LBS）
$box　　　  　 范围查询，矩形范围（基于LBS）
$center　　　  范围醒询，圆形范围（基于LBS）
$centerSphere　范围查询，球形范围（基于LBS）
$slice　　　  　查询字段集合中的元素（比如从第几个之后，第N到第M个元素)
```
6. `$where`操作符
如果要进行更复杂的查询，需要使用`$where`操作符，`$where`操作符功能强大而且灵活，它可以使用任意的`JavaScript`作为查询的一部分，包含`JavaScript`表达式的字符串或者`JavaScript`函数。
(1) 使用字符串
```javascript
model.find({$where:"this.x == this.y"},(err,docs) => {
  console.log(docs);
  //[{ _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1},
  //{ _id: 5972ed35e6f98ec60e3dc889, name: 'li', age: 20, x: 2, y: 2 }]
});

model.find({$where:"obj.x == obj.y"}, (err,docs) =>{
  //[ { _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1},
  //{ _id: 5972ed35e6f98ec60e3dc889, name: 'li', age: 20, x: 2, y: 2 }]
  console.log(docs);
});
```
(2) 使用函数
```javascript
model.find({$where:() => {
        return obj.x !== obj.y;
    }}, (err,docs) =>{
    //[ { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 },
    //{ _id: 5972ed35e6f98ec60e3dc888, name: 'huo', age: 30, x: 2, y: 1 } ]
    console.log(docs);
}) 

model.find({$where:() => {
        return this.x !== this.y;
    }},(err,docs) =>{
    //[ { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 },
    //{ _id: 5972ed35e6f98ec60e3dc888, name: 'huo', age: 30, x: 2, y: 1 } ]
    console.log(docs);
}) 
```
## 八. 更新文档
### 更新方法
1. 文档更新可以使用以下几种方法。
(1) `update()`
(2) `updateOne()`
(3) `updateMany()`
(4)  `find() + save()`
(5) `findOne() + save()`
(6) `findByIdAndUpdate()`
(7) `findOneAndUpdate()`
2. `update()`
第一个参数`conditions`为查询条件，第二个参数`doc`为需要修改的数据，第三个参数`options`为控制选项，第四个参数是回调函数。
**`Model.update(conditions, doc, [options], [callback])`**
`options`有如下选项：
```
　　safe (boolean)： 默认为true。安全模式。
　　upsert (boolean)： 默认为false。如果不存在则不创建新记录。
　　multi (boolean)： 默认为false。是否更新多个查询记录。
　　runValidators： 如果值为true，执行Validation验证。
　　setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。
　　strict (boolean)： 以strict模式进行更新。
　　overwrite (boolean)： 默认为false。禁用update-only模式，允许覆盖记录。
```
(1) 只更新第一条满足条件的数据
```javascript
model.update({age: {$gt: 7}}, {age: 10}, (err, row)=> {
  //{ n: 1, nModified: 1, ok: 1 }
  console.log(row);
});

//使用exec的写法
model.update({age: {$gt: 7}}, {age: 10}).exec((err, row)=> {
  //{ n: 1, nModified: 1, ok: 1 }
  console.log(row);
});
```
(2) 更新所有满足条件的数据
```javascript
model.update({age: {$gt: 7}}, {age: 10}, {multi: true}).exec((err, row)=> {
  //{ n: 2, nModified: 1, ok: 1 }
  console.log(row);
});
```
(3) 如果没有符合条件的数据，则什么都不做
```javascript
model.update({age: 100}, {age: 1000}).exec((err, row)=> {
  //{ n: 0, nModified: 0, ok: 1 }
  console.log(row);
});
```
(4) 如果设置`upsert`参数为`true`，若没有符合查询条件的文档，`mongo`将会综合第一第二个参数向集合插入一个新的文档。
```javascript
model.update({age: 100}, {name: 'jake100'}, {upsert: true}).exec((err, row)=> {
  //{n: 1,
  // nModified: 0,
  // upserted: [ { index: 0, _id: 5b646510d22cf9feac0bd2f5 } ],
  // ok: 1 }
  console.log(row);
});

//验证插入文档
model.find({age: '100'}).exec((err, docs) =>{
  console.log(docs)
  //[ { _id: 5b646510d22cf9feac0bd2f5,
  //     age: 100,
  //     __v: 0,
  //     name: 'jake100' } ]
});
```
注意：`update()`方法中的回调函数不能省略，否则数据不会被更新。如果无需在回调函数中做进一步操作，则可以使用`exec()`简化代码。
例如：`temp.update({name:/aa/},{age: 0},{upsert:true}).exec();`
3. `updateOne()`
`updateOne()`方法只能更新找到的第一条数据，即使设置`{multi:true}`也无法同时更新多个文档。
```javascript
model.updateOne({age: {$gt: 8}}, {name: 'jake80'}).exec((err, res)=> {
  //{ n: 1, nModified: 1, ok: 1 }
  console.log(res);
});
```
4. `updateMany()`
`updateMany()`与`update()`方法唯一的区别就是默认更新多个文档，即使设置`{multi:false}`也无法只更新第一个文档。
`Model.updateMany(conditions, doc, [options], [callback])`
```javascript
model.updateMany({age: {$gt: 8}}, {name: 'jake80'}).exec((err, res)=> {
  //{ n: 3, nModified: 3, ok: 1 }
  console.log(res);
});
```
5. `find() + save()`
如果需要更新的操作比较复杂，可以使用`find()+save()`方法来处理。
```javascript
model.find({age: {$gt: 8}}).exec((err, docs)=> {
  docs.forEach(doc => {
    doc.name = `jake${doc.age}`;
    doc.save();
  });
  console.log(docs);
  //[ { _id: 5b644b5a43048277c40834cd, name: 'jake10', age: 10, __v: 0 },
  //{ _id: 5b644b5a43048277c40834ce, name: 'jake10', age: 10, __v: 0 },
  //{ _id: 5b646510d22cf9feac0bd2f5, age: 100, __v: 0, name: 'jake100' } ]
});
```
6. `findOne() + save()`
如果需要更新的操作比较复杂，可以使用`findOne()`+`save()`方法来处理。
```javascript
model.findOne({age: 10}).exec((err, doc)=> {
  doc.name = 'jake9';
  doc.age = 9;
  doc.save();
  console.log(doc);
  //{ _id: 5b644b5a43048277c40834cd, name: 'jake9', age: 9, __v: 0 }
});
```
7. `findByIdAndUpdate()`
**`Model.findOneAndUpdate([conditions], [update], [options], [callback])`**
8. `findOneAndUpdate()`
**`Model.findOneAndUpdate([conditions], [update], [options], [callback])`**
###  修改器
数据准备工作，创建集合及文档数据如下：
```
var mongoose =  require('mongoose');
mongoose.connect('mongodb://test:test@127.0.0.1:27017/test');

var schema = new mongoose.Schema({
  name: String,
  age: Number,
  array: [Number]
});
var Model = mongoose.model('temp', schema);
for(let i = 1; i < 10; i++) {
  new Model({name: `jake${i}`, age: i, array: []
 }).save();
}
```
#### 对象修改器
1. `$inc` 增减修改器，只对数字有效。
找到`age`等于1的文档，修改`age`字段值，自减5。
```
Model.update({age: 1}, {$inc: {age: -5}}).exec()
```
2. `$set` 指定一个键的值
```
Model.update({name: 'jake1'}, {$set: {age: 2}}).exec()
```
3. `$unset`删除一个键
```
Model.update({name: 'jake1'}, {$unset: {age: ''}}).exec()
```
注意：`$unset`操作符只匹配`key`，`value`可以是任意值。
#### 数组修改器
1. `$push`数组尾部插入。
给匹配文档的`array`键对应数组插入数字1。
```
Model.update({age: 2}, {$push: {array: 1}}).exec();
```
2. `$addToSet`数组尾部插入，如果存在则不插入。
```
Model.update({age: 2}, {$addToSet: {array: 1}}).exec();
```
3. `$pop` 数组尾部删除。
传入1删除数组尾元素，传入-1删除数组首元素。
```
Model.update({age: 2}, {$pop: {array: 1}}).exec();
```
4. `$pull`删除数组指定元素。
```
Model.update({age: 2}, {$pull: {array: 6}}).exec();
```
## 九. 删除文档
1. 有三种方法用于文档删除。
(1) `remove()`
(2) `findOneAndRemove()`
(3) `findByIdAndRemove()`
注意：这些方法中的回调函数不能省略，否则数据不会被删除。当然，可以使用`exec()`方法来简写代码。
2. `remove()`
`remove`有两种形式，一种是`Model`的`remove()`方法，一种是`document`的`remove()`方法。
(1) `Model`的`remove()`方法
该方法的第一个参数`conditions`为查询条件，第二个参数为回调函数。
**`model.remove(conditions, [callback])`**
```javascript
model.remove({age: {$gte:9}}, (err, res) => {
  console.log(res);
  //{ n: 3, ok: 1 }
});

//使用exec的写法
model.remove({age: {$gte:9}}).exec((err, res) => {
  console.log(res);
  //{ n: 0, ok: 1 }
});
```
(2) `document`的`remove()`方法
**`document.remove([callback])`**
```javascript
model.findOne({age: 8}).exec((err, doc) => {
    doc.remove((err, doc) => {
      console.log(doc);
      //{ _id: 5b64fdfa1bfab0852697bc00, name: 'jake8', age: 8, __v: 0 }
    });
});
```
注释：①`model`的`remove()`方法回调可以使用`exec()`方法改写， `document`的`remove()`方法不可以。②`model`的`remove()`方法删除符合条件的所有`document`文档，`document`的`remove()`方法删除当前文档。
3. `findOneAndRemove()`
`model`的`remove()`会删除符合条件的所有数据，如果只删除符合条件的第一条数据，则可以使用`model`的`findOneAndRemove()`方法。
**`Model.findOneAndRemove(conditions, [options], [callback])`**
```javascript
model.findOneAndRemove({age: {$gte: 0}}, (err, doc) => {
  console.log(doc);
  //{ _id: 5b644b5a43048277c40834c6, name: 'jake1', age: 1, __v: 0 }
});

model.findOneAndRemove({age: {$gte: 0}}).exec((err, doc) => {
  console.log(doc);
  //{ _id: 5b644b5a43048277c40834c7, name: 'jake2', age: 2, __v: 0 }
});
```
4. `findByIdAndRemove()`
**`Model.findByIdAndRemove(id, [options], [callback])`**
```javascript
model.find().exec((err, docs) => {
  const docIdArr = docs.map(doc => doc._id);
  model.findByIdAndRemove(docIdArr[0]).exec((err, doc) => {
    console.log(doc);
    //{ _id: 5b644b5a43048277c40834c8, name: 'jake3', age: 3, __v: 0 }
  })
});
```
## 十. Promise
1. `Mongoose`异步操作，例如`.save()`方法，会返回一个`ES6`标准的[`promises`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)。你可以使用类似 `MyModel.findOne({}).then()` 和 `await MyModel.findOne({}).exec()`的写法。
```javascript
var gnr = new Band({
  name: "Guns N' Roses",
  members: ['Axl', 'Slash']
});

var promise = gnr.save();
assert.ok(promise instanceof Promise);

promise.then(function (doc) {
  assert.equal(doc.name, "Guns N' Roses");
});
```
2. [`mongoose queries`](http://mongoosejs.com/docs/queries.html) 查询操作虽然有`then`方法，但并不是一个完全的`promise`。可以使用`exec()`方法将其转化为一个完全的`promise`。
```javascript
var query = Band.findOne({name: "Guns N' Roses"});
assert.ok(!(query instanceof Promise));

// A query is not a fully-fledged promise, but it does have a `.then()`.
query.then(function (doc) {
  // use doc
});

// `.exec()` gives you a fully-fledged promise
var promise = query.exec();
assert.ok(promise instanceof Promise);

promise.then(function (doc) {
  // use doc
});
```
3. 可以通过重写`mongoose.Promise`的方式使用第三方`promise`库，例如 [`bluebird`](https://www.npmjs.com/package/bluebird)。
```javascript
var query = Band.findOne({name: "Guns N' Roses"});

// Use bluebird
mongoose.Promise = require('bluebird');
assert.equal(query.exec().constructor, require('bluebird'));
```
## 十一. 前后钩子
1. 前后钩子即`pre()`和`post()`方法，又称为中间件，是在执行某些操作时可以执行的函数。中间件在`schema`上指定，类似于静态方法或实例方法等。
注意：①前后钩子方法定义在`schema`上。② 前后钩子方法必须在`Model`创建之前定义，否则不生效。
2. 可以在`model`执行下列操作时，设置前后钩子。
`init  validate  save  remove  count  find  findOne 
 findOneAndRemove  findOneAndUpdate  insertMany  update`
3. `pre()`中间件
以`find()`方法为例，在执行`find()`方法之前，执行`pre()`方法。
```javascript
mongoose.connect('mongodb://test:test@127.0.0.1:27017/test');

var schema = new mongoose.Schema({name: String, age: Number});

schema.pre('find', (next) => {
  console.log('pre hook fu1');
  next();
});

schema.pre('find', (next) => {
  console.log('pre hook fu2');
  next();
});

var Model = mongoose.model('temp', schema);

Model.find((err, docs) => {
  console.log(docs[0]);
  //pre hook fu1
  //pre hook fu2
  //{ _id: 5b644b5a43048277c40834c9, name: 'jake4', age: 4, __v: 0 }
});
```
4. `post()`中间件
`post()`方法并不是在执行某些操作后再去执行的方法，而在执行某些操作前最后执行的方法，`post()`方法里不可以使用`next()`。
```javascript
mongoose.connect('mongodb://test:test@127.0.0.1:27017/test');

var schema = new mongoose.Schema({name: String, age: Number});

schema.post('find', (next) => {
  console.log('post hook fu1');
});

schema.post('find', (next) => {
  console.log('post hook fu2');
});

var Model = mongoose.model('temp', schema);

Model.find((err, docs) => {
  console.log(docs[0]);
  //post hook fu1
  //post hook fu2
  //{ _id: 5b644b5a43048277c40834c9, name: 'jake4', age: 4, __v: 0 }
});
```
## 十二. 查询后处理
1. 常用的查询后处理的方法如下所示
* `sort`     排序
* `skip`     跳过
* `limit`    限制
* `select`   显示字段
* `exect`    执行
* `count`    计数
* `distinct` 去重
2. 方法示例
```javascript
mongoose.connect('mongodb://test:test@127.0.0.1:27017/test');

var schema = new mongoose.Schema({name: String, age: Number});
var Model = mongoose.model('temp', schema);

for(let i = 1; i <= 15; i++) {
  new Model({name: `jake${i}`, age: i}).save();
}

Model.find((err, docs) => {
  console.log(docs); //1 - 15
});

//sort 排序
Model.find().sort({'age': -1}).exec((err, docs) => {
  console.log(docs); //15 - 1
});

//skip 跳过
Model.find().skip(3).exec((err, docs) => {
  console.log(docs); //4 - 15
});

//limit 限制
Model.find().limit(2).exec((err, docs) => {
  console.log(docs); //1 - 2
});

//select 限制字段
Model.find().select({name: 1, _id: 0}).exec((err, docs) => {
  console.log(docs[0]); //{ name: 'jake2' }
});

//链式操作
Model.find().sort({'age': -1}).skip(2).limit(1).select({age: 1, _id: 0}).exec((err, docs) => {
  console.log(docs); //[ { age: 13 } ]
});

//count显示文档数目
Model.find().count().exec((err, count) => {
  console.log(count); //15
});

//distinct 去重
Model.find().distinct('name').exec((err, arr) => {
  console.log(arr); //jake1-jake15
});
```
## 十三. 文档验证
1. 如果不进行文档验证，保存文档时，就可以不按照`Schema`设置的字段进行设置，分为以下几种情况。
```javascript
var mongoose =  require('mongoose');
mongoose.connect('mongodb://test:test@127.0.0.1:27017/test');

var schema = new mongoose.Schema({name: String, age: Number,x: Number, y: Number});
var Model = mongoose.model('temp', schema);
```
(1) 缺少字段的文档也可以保存成功
```javascript
new Model({age: 10}).save((err, doc) => {
  console.log(doc);
  //{ _id: 5b65862905b74ea05e211322, age: 10, __v: 0 }
});
```
(2) 包含未设置的字段的文档也可以保存成功，未设置的字段不被保存。
```javascript
new Model({age: 11, z: 10}).save((err, doc) => {
  console.log(doc);
  //{ _id: 5b65865ca0864ba06fb02d37, age: 11, __v: 0 }
});
```
(3) 包含字段类型与设置不同的文档可以保存成功，不同字段类型的字段被保存为设置的字段类型
```javascript
new Model({age:true,name:10}).save(function(err,doc){
  //{ _id: 5b6586b547589ba082d19c3c, age: 1, name: '10', __v: 0 }
  console.log(doc);
});
```
2. 通过文档验证，就可以避免以上几种情况发生。文档验证在`SchemaType`中定义，格式如下。
**`{name: {type:String, validator:value}}`**
常用验证包括以下几种：
`required`： 数据必须填写
`default`: 默认值
`min`: 最小值(只适用于数字)
`max`: 最大值(只适用于数字)
`match`: 正则匹配(只适用于字符串)
`enum`:  枚举匹配(只适用于字符串)
`validate`: 自定义匹配
3. `required`文档验证
将`age`设置为必填字段，如果没有`age`字段，文档将不被保存，且出现错误提示。
```javascript
var schema = new mongoose.Schema({age:{type:Number,required:true}, name: String,x:Number,y:Number});
var Model = mongoose.model('temp', schema);
new Model({name:"abc"}).save((err,doc) => {
  //Path `age` is required.
  console.log(err.errors['age'].message);
});
```
4. `default`文档验证
设置`age`字段的默认值为18，如果不设置`age`字段，则会取默认值。
```javascript
var schema = new mongoose.Schema({ age:{type:Number,default:18}, name:String,x:Number,y:Number});
var Model = mongoose.model('temp', schema);
new Model({name:'a'}).save((err,doc) => {
  //{ __v: 0, name: 'a', _id: 59730d2e7a751d81582210c1, age: 18 }
  console.log(doc);
});
```
5. `min、max`文档验证
将`age`的取值范围设置为`[0,10]`。如果`age`取值为`20`，文档将不被保存，且出现错误提示。
```javascript
var schema = new mongoose.Schema({ age:{type:Number,min:0,max:10}, name: String,x:Number,y:Number});
var Model = mongoose.model('temp', schema);
new Model({age:20}).save((err,doc) => {
  //Path `age` (20) is more than maximum allowed value (10).
  console.log(err.errors['age'].message);
});
```
6. `match`文档验证
将`name`的`match`设置为必须存在`'a'`字符。如果`name`不存在`'a'`，文档将不被保存，且出现错误提示。
```javascript
var schema = new mongoose.Schema({ age:Number, name:{type:String,match:/a/},x:Number,y:Number});
var Model = mongoose.model('temp', schema);
new Model({name:'bbb'}).save((err,doc) => {
  //Path `name` is invalid (bbb).
  console.log(err.errors['name'].message);
});
```
7. `enum`文档验证
将`name`的枚举取值设置为`['a','b','c']`，如果`name`不在枚举范围内取值，文档将不被保存，且出现错误提示。
```javascript
var schema = new mongoose.Schema({ age:Number, name:{type:String,enum:['a','b','c']},x:Number,y:Number});
var Model = mongoose.model('temp', schema);
new Model({name:'bbb'}).save((err,doc) => {
  //`bbb` is not a valid enum value for path `name`.
  console.log(err.errors['name'].message)
});
```
8. `validate`文档验证
`validate`实际上是一个函数，函数的参数代表当前字段的值，返回`true`表示通过验证，返回`false`表示未通过验证。利用`validate`可以自定义任何条件。
例如，定义名字`name`的长度必须在4个字符以上。
```javascript
var schema = new mongoose.Schema({ 
  name:{
    type: String, 
    validate: value =>value.length > 4
  }, 
  age: Number,
  x: Number,
  y: Number
});
var Model = mongoose.model('temp', schema);
new Model({name:'abc'}).save((err, doc) => {
  //Validator failed for path `name` with value `abc`
  console.log(err.errors['name'].message);
});
```
## 十四. population连表操作
1. `population`介绍
(1) `MongoDB`是文档型数据库，所以它没有关系型数据库`joins`(数据库的两张表通过"外键"建立连接关系) 特性。在建立数据的关联时会比较麻烦。为了解决这个问题，`Mongoose`封装了一个[`population`](http://mongoosejs.com/docs/populate.html)功能。使用`population`可以实现在一个 `document`中填充其他 `collection(s)` 的 `document(s)`。 
(2) 在定义`schema`的时候，如果设置某个 `field` 关联另一个`schema`，那么在获取 `document` 的时候就可以使用 `population` 功能通过关联`schema`的 `field` 找到关联的另一个 `document`，并且用被关联 `document` 的内容替换掉原来关联字段(`field`)的内容。
2. 连表关系场景
场景：用户`user`可以写文章`post`，并且对文章`post`进行评论`comment`。
分析：一个用户`user`可以写多篇文章`post`。一篇文章`post `只能有一个作者`user`，但可以有多条评论`comment`。一条评论`comment` 只属于一篇文章`post`，且只属于一个用户`user`。
示例：用户`A`写了文章`A`、评论`A`，用户`B`写了文章`B`、评论`B`，用户`C`写了文章`C`、评论`C`；用户`A`在文章`B`上添加了评论`A`，用户`B`在文章`C`上添加了评论`B`，用户`C`在文章`A`上添加了评论`C`。
3. 连表关系示例代码
(1) 创建用户、文章、评论三个`schema`和`Model`
```javascript
var mongoose =  require('mongoose');
mongoose.connect('mongodb://test:test@127.0.0.1:27017/test');

var Schema = mongoose.Schema;

//创建用户scheme以及model
var userSchema = new Schema({
  name  : String,
  posts : [{ type: Schema.Types.ObjectId, ref: 'post' }]
});
var UserModel = mongoose.model('user', userSchema);

//创建文章scheme以及model
var postSchema = new Schema({
  name  : String,
  poster   : { type: Schema.Types.ObjectId, ref: 'user' },
  comments : [{ type: Schema.Types.ObjectId, ref: 'comment' }],
});
var PostModel = mongoose.model('post', postSchema);

//创建评论scheme以及model
var commentSchema = new Schema({
  name  : String,
  post      : { type: Schema.Types.ObjectId, ref: "post" },
  commenter : { type: Schema.Types.ObjectId, ref: 'user' },
});
var CommentModel = mongoose.model('comment', commentSchema);
```
* 创建了三个 `Model`：`UserModel`，`PostModel`，`CommentModel`。
* `UserModel` 的属性 `posts`对应是一个 `ObjectId` 的数组，`ref`表示关联`PostModel`。
* `PostModel`的属性 `poster` 和 `comments` 分别关联`UserModel`和`CommentModel`。
* `CommentModel`的属性 `post` 和 `commenter` 分别关联`PostModel`和`UserModel`。
注意：① `ref`指向`mongoose.model(name, schema);`方法的`name`参数，而不是方法返回值`model`。②`userSchema`中应该保存而未保存` comments`数组。
(2) 创建`entity`实例、建立关系并保存数据
```javascript
//创建三个用户userA、userB、userC
var userA = new UserModel({name: 'userA'});
var userB = new UserModel({name: 'userB'});
var userC = new UserModel({name: 'userC'});
//创建三篇文章postA、postB、postC
var postA = new PostModel({name:  'postA'});
var postB = new PostModel({name:  'postB'});
var postC = new PostModel({name:  'postC'});
//创建三个评论commentA、commentB、commentC
var commentA = new CommentModel({name: 'commentA'});
var commentB = new CommentModel({name: 'commentB'});
var commentC = new CommentModel({name: 'commentC'});

//建立用户与文章的关系
userA.posts.push(postA._id);
//moongoose封装的语法糖，与userA.posts.push(postA)写法含义相同
userB.posts.push(postB);
userC.posts.push(postC);
//建立文章与用户、评论的关系
postA.poster = userA;
postB.poster = userB;
postC.poster = userC;
postA.comments.push(commentC);
postB.comments.push(commentA);
postC.comments.push(commentB);
//建立评论与用户、文章的关系
commentA.post = postB;
commentB.post = postC;
commentC.post = postA;
commentA.commenter = userA;
commentB.commenter = userB;
commentC.commenter = userC;

//保存数据
userA.save();
userB.save();
userC.save();
postA.save();
postB.save();
postC.save();
commentA.save();
commentB.save();
commentC.save();
```
4. `population`连表操作
(1) `query.populate`
语法：**`query.populate(path, [select], [model], [match], [options])`**
**`path`**：`String | Object` ；指定要填充的关联字段。
**`select`**：`Object | String`；指定填充 `document`中的哪些字段。
**`model`**：`Model`；指定关联字段的`model`，若未指定则使用`Schema`的`ref`。
**`match`**：`Object`；指定附加的查询条件。
**`options`**：`Object`；指定附加的其他查询选项，如排序以及条数限制等。
```javascript
UserModel.find().skip(1).limit(1)
  .populate('posts', 'name')
  .exec((err, docs) => {
    console.log(docs[0].posts);
    //[{"_id":"5b6655ac4f1303b2933a7dc0","name":"postB"}]
});

UserModel.findOne({name: 'userC'})
  .populate({
    path: 'posts',
    select: { name: 1, _id: 0}
  })
  .exec((err, doc) => {
    console.log(doc.posts); //[{"name":"postC"}]
  });

PostModel.findOne({name: 'postA'})
  .populate('poster comments', 'name -_id')
  .exec((err, doc)=> {
    console.log(doc.poster); //{ name: 'userA' }
    console.log(doc.comments); //[{"name":"commentC"}]
  });

PostModel.findOne({name: 'postC'})
  .populate([
    {path: 'poster', select: 'name'},
    {path: 'comments', select: {_id: 0}}
  ])
  .exec((err, doc) => {
    console.log(doc.poster);
    //{ _id: 5b6655ac4f1303b2933a7dbe, name: 'userC' }
    console.log(doc.comments);
    //[{"name":"commentB","post":"5b6655ac4f1303b2933a7dc1","commenter":"5b6655ac4f1303b2933a7dbd","__v":0}]
  });
```
(2) `Model.populate` 
语法：**`Model.populate(docs, options, [cb(err,doc)])`**
```
CommentModel.findOne((err, doc) => {
  CommentModel.populate(doc, {path: 'post commenter', select: 'name'}, (err, doc) => {
    console.log(doc.post);
    //{ _id: 5b6655ac4f1303b2933a7dc0, name: 'postB' }
    console.log(doc.commenter);
    //{ _id: 5b6655ac4f1303b2933a7dbc, name: 'userA' }
  })
});
```
(3) `document.populate`
语法：**`Document.populate([path], [callback])`**
```
CommentModel.findOne((err, doc) => {
  doc.populate({path: 'post commenter', select: 'name'}, (err, doc) => {
    console.log(doc.post);
    //{ _id: 5b6655ac4f1303b2933a7dc0, name: 'postB' }
    console.log(doc.commenter);
    //{ _id: 5b6655ac4f1303b2933a7dbc, name: 'userA' }
  })
});
```
## 十五. 参考资料
[Mongoose官网](http://mongoosejs.com/)
[Mongoose Promise语法](http://mongoosejs.com/docs/promises.html)
[Mongoose基础入门](https://www.cnblogs.com/xiaohuochai/p/7215067.html)
[Mongoose 之 Population 使用](https://segmentfault.com/a/1190000002727265)
[Mongoose 使用之 Population](https://my.oschina.net/calvinchen/blog/137932)
