# 1. MongoDB的介绍
## 1.1 介绍
1. 了解`MongoDB`数据库
`MongoDB`数据库与其他`NoSQL`数据库的区别。
2. 安装`MongoDB`及客户端
安装`MongoDB`数据库，安装`RoBo3T`客户端。
3. 掌握`MongoDB`用户管理
有哪些内置角色？
如何创建用户？
## 1.2 MongoDB的介绍与安装
1. `NoSQL`数据库简介
`NoSQL`泛指非关系型数据库。随着`Web2.0`和`Web3.0`技术的兴起，传统关系型数据库无法应对如此巨大的数据存储和处理。所以非关系型(`NoSQL`)数据库得以发展。
注意：① 关系型数据库有严谨的数据模型和验证机制，不会被`NoSQL`数据库取代，适合保存高价值的数据。`NoSQL`数据库适合保存海量低价值的数据。两者之间是互补的关系。② `NoSQL`数据库无法做表连接。
2. `MongoDB`数据库简介
`MongoDB`是一个介于关系型数据库和非关系型数据库之间的产品，是非关系型数据库中功能最丰富，最像关系型数据库的产品。
注意：`Redis`利用内存来缓存数据，`MongoDB`利用硬盘来存储数据。`Redis`可存储数据速度更快，`MongoDB`可存储数据体积更大。
3. `MongoDB`用`C++`编写而成，性能良好，可以安装在多种系统上。
4. [MongoDB安装、配置以及操作介绍](https://www.jianshu.com/p/8336cbeca84c)
## 1.3 总结
1. 了解`MongoDB`数据库的特点
2. 掌握安装`MongoDB`的方法
3. 掌握`MongoDB`的用户管理
# 2. MongoDB的基本操作
## 2.1 介绍
1. 数据的查询
表达式、条件查询、分页、排序、去除重复
2. 数据的写入
添加数据、修改数据、删除数据
3. 管理索引
创建索引、查看索引、删除索引
## 2.2 MongoDB的增删改查
1. 掌握数据查询
2. 掌握数据的写入
3. 掌握索引机制
# 3. 数据的导入导出
1. 掌握`mongoexport`导出数据集合
2. 掌握`mongoimport`导入数据集合
3. 掌握`mongodump`导出逻辑库数据
4. 掌握`mongorestore`导入逻辑库数据
# 4. MongoDB与Python交互
## 4.1 介绍
1. 安装`pymongo`模块
`pip`安装`pymongo`模块
2. 学习`pymongo`的`CRUD`
查询数据、添加数据、修改数据、删除数据
3. 学习`GridFS`引擎
`GridFS`存储机制，文件的保存、查询、提取和删除
## 4.2 MongoDB与Python的交互
1. `Python`语言有很多操作`MongoDB`的模块，其中`pymongo`是特别常用的驱动模块。
文档：[https://api.mongodb.com/python/current/tutorial.html](https://api.mongodb.com/python/current/tutorial.html)
2. 安装`pymongo`
`pip3 install pymongo`
如果安装失败可以使用镜像路径`-i https://pypi.doubanio.com/simple`
3. 创建连接
`MongoClient`是`MongoDB`的客户端代理对象，可以用来执行增删改查操作，并且内置了连接池。
```
from pymongo import MongoClient

client = MongoClient(host='localhost', port=27017)
client.school.authenticate('school', 'school')
```
4. 数据写入
`insert_one`和`insert_many`两个函数可以向`MongoDB`写入数据。
```
from mongodb.mongo_db import client

try:
    client.school.teacher.insert_one({'name': '李璐'})
    client.school.teacher.insert_many([
        {'name': '陈刚'},
        {'name': '郭丽丽'}
    ])
except Exception as e:
    print(e)
```
5. 数据查询
`find_one`和`find`两个函数可以从`MongoDB`中查询数据。
```
from mongodb.mongo_db import client

try:
    teachers = client.school.teacher.find({})
    for one in teachers:
        print(one["_id"], one["name"])
        # 5e3e7a4a81ba17404ca286dd 李璐
        # 5e3e7a4a81ba17404ca286de 陈刚
        # 5e3e7a4a81ba17404ca286df 郭丽丽
    teacher = client.school.teacher.find_one({'name': '陈刚'})
    print(teacher["_id"], teacher["name"])
    # 5e3e7a4a81ba17404ca286de 陈刚
except Exception as e:
    print(e)
```
6. 数据修改
`update_one`和`update_many`两个函数可以修改`MongoDB`数据。
```
from mongodb.mongo_db import client

try:
    client.school.teacher.update_many({}, {'$set': {'role': ['班主任']}})
    client.school.teacher.update_one({'name': '李璐'}, {'$set': {'sex': '女'}})
    client.school.teacher.update_one({'name': '郭丽丽'}, {'$push': {'role': '年级主任'}})
except Exception as e:
    print(e)
```
7. 数据删除
`delete_one`和`delete_many`两个函数可以删除`MongoDB`数据。
```
from mongodb.mongo_db import client

try:
    client.school.teacher.delete_one({'name': '李璐'})
    client.school.teacher.delete_many({})
except Exception as e:
    print(e)
```
8. 其他操作
`skip` - 跳过指定数量
`limit` - 限制数量
`count` - 查询数量
`distinct` - 查询不重复的字段值
`sort` - 对记录排序
```
from mongodb.mongo_db import client

try:
    client.school.student.insert_many([
        {'name': '陈刚', 'age': 20},
        {'name': '郭丽丽', 'age': 22},
        {'name': '陈刚', 'age': 10},
    ])
    students = client.school.student.find({}).skip(1).limit(2)
    for one in students:
        print(one['name'])  # 郭丽丽 陈刚
    students = client.school.student.distinct('name')
    print(students)  # ['陈刚', '郭丽丽']
    students = client.school.student.find({}).sort([('age', -1)])
    for one in students:
        print(one['name'])  # 郭丽丽 陈刚 陈刚
except Exception as e:
    print(e)
```
9. 文件存储
存储在硬盘上：最简单，但不适用于分布式部署环境。
存储在文件服务器上：`NAS`可以存放大量文件，并能应对分布式环境，但对文件管理不方便。
存储在`NoSQL`数据库：普通`SQL`数据库不适合存储文件，但`MongoDB`提供了文件存储。
10. `GridFS`存储引擎
 `GridFS`是`MongoDB`的文件存储方案，主要用于存储超过`16M`(`BSON`文件限制)的文件(如：图片、音频等)，对于大文件有着更好的性能。
注释：`MongoDB`中单个文档(`document`)存储大小限制为`16M`。
11.  `GridFS`存储原理
 `GridFS`使用两个集合来存储文件，一个是`chunks`集合，用来存放文件；另一个集合是`file`，用于存储文件的元数据。
`GridFS`会把文件分割成若干`chunks`(`256KB`)，然后在`files`记录他们。
12. 使用`GridFS`存储文件
```
from mongodb.mongo_db import client
from gridfs import GridFS

db = client.school
gfs = GridFS(db, collection='book')
file = open('/Users/nimengwei/Downloads/Node.js开发指南.pdf', 'rb')
args = {'type': 'PDF', 'keyword': 'node'}
gfs.put(file, filename='Node.js开发指南', **args)
file.close()
```
![image.png](https://upload-images.jianshu.io/upload_images/4989175-194239a3dbcbbd0a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
13. 查询`GridFS`中存储的文件
`find`和`find_one`函数可以查询`GridFS`中存储的文件。
```
from mongodb.mongo_db import client
from gridfs import GridFS
import math
import datetime

db = client.school
gfs = GridFS(db, collection='book')

book = gfs.find_one({'filename': 'Node.js开发指南'})
print(book.filename, book.type, book.keyword)  # Node.js开发指南 PDF node
print('%dM'%math.ceil(book.length / 1024 / 1024))  # 9M

books = gfs.find({'type': 'PDF'})
for one in books:
    # UTC转换成北京时间
    uploadDate = one.uploadDate + datetime.timedelta(hours=8)
    # 格式化日期
    uploadDate = uploadDate.strftime('%Y-%m-%d %H:%M:%S')
    print(one._id, one.filename, uploadDate)
    # 5e3ec3177c30f29b4bfe1265 Node.js开发指南 2020-02-08 22:18:00
```
14. 判断是否存储了文件
`exists`函数可以判断`GridFS`是否存储某个文件。
```
from mongodb.mongo_db import client
from gridfs import GridFS
from bson.objectid import ObjectId

db = client.school
gfs = GridFS(db, collection='book')

rs = gfs.exists(ObjectId('5e3ec3177c30f29b4bfe1265'))
print(rs)  # True
rs = gfs.exists(**{'filename': '123.html'})
print(rs)  # False
rs = gfs.exists(**{'type': 'PDF'})
print(rs)  # True
```
15. 读取文件
`get`函数可以从`GridFS`中读取文件，并且只能通过主键查找文件。
```
from mongodb.mongo_db import client
from gridfs import GridFS
from bson.objectid import ObjectId

db = client.school
gfs = GridFS(db, collection='book')

document = gfs.get(ObjectId('5e3ec3177c30f29b4bfe1265'))
file = open('/Users/nimengwei/Downloads/Node.js开发指南copy.pdf', 'wb')
file.write(document.read())
file.close()
```
16. 删除文件
`delete`函数可以从`GridFS`中删除文件，并且只能先通过主键查找记录。
```
from mongodb.mongo_db import client
from gridfs import GridFS
from bson.objectid import ObjectId

db = client.school
gfs = GridFS(db, collection='book')

gfs.delete(ObjectId('5e3ec3177c30f29b4bfe1265'))
```
## 4.3 总结
1. 技能清单
学习`pymongo`模块的`CRUD`函数
掌握了用`GridFS`引擎存储文件
# 5. 开发新闻管理系统
1. 学习目标
(1) 完成新闻正文的编写
用`wangEditor`插件编写`HTML`格式的新闻正文，保存成文件。
(2) 完成新闻正文的存储
添加新闻、修改新闻、删除新闻、审批新闻
2. 代码地址
[https://github.com/nmwei/database-vega](https://github.com/nmwei/database-vega)
3. 总结
(1) `MySQL`
关系型：保存关系复杂的高价值数据。
(2) `Redis`
高速缓存：缓存经常被读取的热数据。
(3) `MongoDB`
非关系型：保存海量低价值的数据。
(4) 新闻管理系统
实战案例：利用`Python`结合三种数据库。
