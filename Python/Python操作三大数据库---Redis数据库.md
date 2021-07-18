# 1. Redis数据库介绍
## 1.1 介绍
1. 了解`NoSQL`数据库
为什么要抛弃关系型数据库？
为什么`NoSQL`数据库的读写速度远超`MySQL`？
有哪些常用的`NoSQL`数据库?
2. 安装`Redis`数据库
安装`Redis`数据库
安装`Redis Desktop Manager`客户端
3. `Redis`相关配置
端口号、密码、占用内存大小、持久化方案等
## 1.2 Redis数据库的安装和配置
1. 利用缓存优化数据的读写
应用程序 - 缓存 - 数据库 - 硬盘
2. 高速缓存的应用案例
微博大`V`的微博数据被存放于高速缓存中，普通人的数据存放于普通`NoSQL`数据库里。
门户网站、电商网站、视频网站首页的内容都需要缓存。
双十一购物狂欢节，订单先被高速缓存，然后负载低谷期再写入数据库。
电商平台秒杀、抢购业务需要用高速缓存来实现顺序操作。
3. `Redis`简介
`Redis`是美国`VMware`公司开源的`NoSQL`数据库产品，基于`Key-Value`存储格式，可将数据保存在**内存**或者**硬盘**中。
可以将使用频率高的热数据放到`Redis`数据库中，并保存到内存中。
4. `Redis`性能
`Redis`是单线程模型的`NoSQL`数据库，由`C`语言编写，官方提供的数据是可以达到`100000+`的`QPS`(每秒内查询次数)。
![image.png](https://upload-images.jianshu.io/upload_images/4989175-ca739b03cc9c1f40.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
5. `Redis`安装
(1) [参考文档](https://www.cnblogs.com/yanguobin/p/11446967.html)
(2) 安装目录
`/usr/local/redis-5.0.5`
(3) 启动
```
# 直接启动
➜  ~ redis-server
```
```
# 使用配置启动
➜  ~ cd /usr/local/redis-5.0.7
➜  redis-5.0.7 redis-server redis.conf  
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 5.0.7 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                   
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 8930
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           http://redis.io        
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'
```
注释：日志在控制台中输出。
(4) 退出
查看`redis`的`pid`：`ps aux|grep redis`
结束进程：`kill -15 pid`
6. `Redis`命令行客户端
```
➜  ~ redis-cli
127.0.0.1:6379> select 0
OK
127.0.0.1:6379> set username scott
OK
127.0.0.1:6379> get username
"scott"
127.0.0.1:6379> del username
(integer) 1
127.0.0.1:6379> get username
(nil)
127.0.0.1:6379> 
```
 `Redis`内置了`16`个逻辑库(`0-15`)，每个逻辑库都是空的，可以通过`select index`选择逻辑库。
7. 安装图形客户端
`RedisDesktopManager`是目前最优秀的`Redis`图形客户端工具。
![image.png](https://upload-images.jianshu.io/upload_images/4989175-167a5e7e16e519b5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
参考文档：[http://www.sohu.com/a/281755318_100264293](http://www.sohu.com/a/281755318_100264293)
注意：`RedisDesktopManager`是用来连接`Redis`(`redis-cli`)，而不是启动`Redis`(`redis-server`)。
8. `Redis`的持久化
为了防止意外宕机丢失数据，`Redis`提供了两种持久化的方式。
(1) `RDB`持久化
在指定的时间间隔内将内存中的数据集快照写入磁盘，实际操作过程是`fork`一个子进程，先将数据集写入临时文件，写入成功后，再替换之前的文件，用二进制压缩存储。
```
save 900 1 # 900秒内写入1次，则同步
save 300 10 # 300秒内写入10次，则同步
save 60 10000 # 60秒内写入10000次，则同步
```
(2) `AOF`持久化
以日志的形式记录服务器所处理的每一个写、删除操作，查询操作不会记录，以文本的方式记录，可以打开文件看到详细的操作记录。
```
# appendfsync no  # 表示系统决定同步频率
appendfsync everysec # 表示每秒同步一次
# appendfsync always # 表示每次修改数据都同步
```
9. `Redis`配置参数(一)

| 序号 | 参数 | 作用 |
|:-:|:-:|-|
| `1` | `port` | 端口号，默认`6379` |
| `2` | `bind` | 允许的`IP`，默认只允许本机访问 |
| `3` | `timeout` | `client`空闲多少秒后关闭连接，默认`0`代表无限制。 |
| `4` | `loglevel` | 日志级别，分为：`debug`、`verbose`、`notice`、`warning`，默认为`notice`
| `5` | `logfile` | 日志文件地址 |
| `6` | `syslog-enabled` | 将日志输出到控制台(`yes`)，将日志输出到日志文件(`no`) |
10. 修改配置
(1) 修改
`/usr/local/redis-5.0.7/redis.conf`
```
bind 0.0.0.0

timeout 300

logfile "logs.log"

syslog-enabled no
```
 `bind 127.0.0.1`表示只有当前主机可以访问当前`Redis`服务器。`bind 0.0.0.0`表示任何主机都能访问当前`Redis`服务器。
(2) 重启`Redis`
```
➜  ~ cd /usr/local/redis-5.0.7
➜  redis-5.0.7 redis-server redis.conf  
```
此时在控制台中不会输出日志。而是生成`/usr/local/redis-5.0.7/logs.log`日志文件。
![image.png](https://upload-images.jianshu.io/upload_images/4989175-e0859cd364287026.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
11. `Redis`配置参数(二)

| 序号 | 参数 | 作用 |
|:-:|:-:|-|
| `1` | `databases` | 逻辑库的数量，默认`16` |
| `2` | `save` | `RDB`文件同步的频率 |
| `3` | `rdbcompression` | 同步`RDB`文件的时候是否采用压缩，默认`yes` |
| `4` | `dbfilename` | `rdb`镜像文件名称，默认`dump.rdb` |
| `5` | `dir` | `rdb`文件的目录，默认`./`，为`redis`目录 |
| `6` | `requirepass` | 访问密码，默认无需密码 |
12. 修改配置
(1) 修改配置文件
```
databases 4

save 900 1
save 300 10
save 60 10000

requirepass abc123456
```
(2) 重启`Redis`
```
➜  ~ cd /usr/local/redis-5.0.7
➜  redis-5.0.7 redis-server redis.conf 
```
(3) 使用`RedisDesktopManager`客户端连接
![image.png](https://upload-images.jianshu.io/upload_images/4989175-c495b856e8123387.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
13. `Redis`配置参数(三)

| 序号 | 参数 | 作用 |
|:-:|:-:|-|
| `1` | `maxclients` | 最大连接数，默认无限制 |
| `2` | `maxmemory` | 占用内存的大小，默认无限制 |
| `3` | `appendonly` | 开启`AOF`备份 |
| `4` | `appendfilename ` | `AOF`备份文件名 |
| `5` | `appendfsync` | `AOF`同步的频率，分为`no`、`everysec`、`always` |
注释：`appendfsync`值为`no`表示系统决定同步频率，`everysec`表示每秒同步一次，`always`表示每次修改数据都同步。
14. 修改配置
(1) 修改配置文件
```
# save 900 1
# save 300 10
# save 60 10000

maxclients 2000

maxmemory 500m

appendonly yes

appendfilename "appendonly.aof"

appendfsync everysec
```
开启`AOF`备份，需要关闭`RDB`备份。
(2) 重启`Redis`
```
➜  ~ cd /usr/local/redis-5.0.7
➜  redis-5.0.7 redis-server redis.conf 
```
## 1.3 总结
1. 技能清单
学些了`NoSQL`数据库的使用意义。
掌握了`Redis`数据库的安装方法。
掌握了`Redis`客户端的使用。
了解了`Redis`的常用配置。
# 2. Redis常用数据结构
## 2.1 介绍
1. `Redis`的五种数据类型
无条件查询记录，字段的计算和字段的别名
2. `Redis`的`Key`命令
数据排序、分页、去除重复记录
## 2.2 Redis常用数据结构
1. `Redis`五种数据类型
字符串、哈希、列表、集合、有序集合
2. `Redis`字符串类型
`String`类型既可以保存普通文字，也可以保存序列化的二进制数据。
`String`类型最大可以存储`512M`数据。
3. 字符串指令(一)
(1) 设置`Key-Value`
`SET Key Value`
(2) 获取`Value`
`GET Key`
(3) 删除`Key-Value`
`DEL Key`
命令行客户端示例如下：
```
➜  ~ redis-cli -a "abc123456"
Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.
127.0.0.1:6379> SET email drew@163.com
OK
127.0.0.1:6379> GET email
"drew@163.com"
127.0.0.1:6379> DEl email
(integer) 1
127.0.0.1:6379> GET email
(nil)
127.0.0.1:6379> 
```
注释：`FLUSHDB`清空当前逻辑库、`FLUSHALL`清空所有逻辑库。
4. 字符串指令(二)
(1) 获取截取`Value`内容
`GETRANGE Key 起始位置 结束位置`
(2) 获取`Value`长度
`STRLEN Key`
(3) 设置带有过期时间(秒)的`Key-Value`
`SETEX Key 时间数值 Value`
```
Redis:0>set email drew@163.com
"OK"
Redis:0>getrange email 0 3
"drew"
Redis:0>getrange email 0 -1
"drew@163.com"
Redis:0>strlen email
"12"
Redis:0>setex username 5 drew
"OK"
Redis:0>get username
"drew"
Redis:0>get username
null
Redis:0>
```
5. 字符串指令(三)
(1) 设置多个`Key-Value`
`MSET Key1 Value1 Key2 Value2`
(2) 获取多个`Value`
`MGET Key1 Key2`
```
Redis:0>mset username jack sex male age 24
"OK"
Redis:0>mget username sex age 
 1)  "jack"
 2)  "male"
 3)  "24"
```
6. 字符串指令(四)
(1) 在`Value`结尾追加内容
`APPEND Key 字符串`
```
Redis:0>setex temp 60 ABCD
"OK"
Redis:0>get temp
"ABCD"
Redis:0>append temp 1234
"8"
Redis:0>get temp
"ABCD1234"
Redis:0>get temp
null
```
7. 字符串指令(五)
(1) `Value`自增`1`
`INCR Key`
(2) `Value`自增指定的整数值
`INCRBY Key 整数`
(3) `Value`自增指定的浮点数
`INCRBYFLOAT Key 浮点数`
(4) `Value`自减`1`
`DECR Key`
(5) `Value`自减指定的整数值
`DECRBY Key 整数`
```
Redis:0>setex num 100 0
"OK"
Redis:0>incr num
"1"
Redis:0>get num
"1"
Redis:0>incrby num 20
"21"
Redis:0>get num
"21"
Redis:0>incrby num -2
"19"
Redis:0>get num
"19"
Redis:0>incrbyfloat num 2.56
"21.56"
Redis:0>get num
"21.56"
Redis:0>incrbyfloat num -4.6
"16.96"
Redis:0>get num
"16.96"
```
注意：并没有`DECRBYFLOAT`自减指定的浮点数的方法。
8. `Redis`哈希类型
哈希类型可以保存更复杂的结构化数据。
9. 哈希指令(一)
(1) 设置哈希表字段
`HSET Key k v`
(2) 设置哈希表多个字段
`HMSET Key k v k v`
(3) 获取哈希表某个字段值
`HGET Key  k`
(4) 获取哈希表多个字段值
`HMGET Key k1 k2 k3`
(5) 获取哈希表所有字段值
`HGETALL Key`
(6) 获取哈希表中所有字段`key`值
`HKEYS Key`
(7) 获取哈希表中所有字段`value`值
`HVALS Key`
(8) 获取哈希表中字段数量
`HLEN Key`
(9) 判断哈希表是否含有某个字段
`HEXISTS Key k1`
(10) 删除哈希表的字段
`HDEL Key k1 k2`
```
Redis:0>hset 8000 ename Tom
"1"
Redis:0>hset 8000 job SELESMAN
"1"
Redis:0>hmset 9000 ename Scott job SALESMAN deptno 10
"OK"
Redis:0>hget 9000 ename
"Scott"
Redis:0>hmget 9000 ename deptno job
 1)  "Scott"
 2)  "10"
 3)  "SALESMAN"
Redis:0>hgetall 9000
 1)  "ename"
 2)  "Scott"
 3)  "job"
 4)  "SALESMAN"
 5)  "deptno"
 6)  "10"
Redis:0>hkeys 9000
 1)  "ename"
 2)  "job"
 3)  "deptno"
Redis:0>hvals 9000
 1)  "Scott"
 2)  "SALESMAN"
 3)  "10"
Redis:0>hlen 9000
"3"
Redis:0>hexists 9000 job
"1"
Redis:0> hdel 9000 job deptno
"2"
Redis:0>hkeys 9000
 1)  "ename"
```
10. 哈希指令(二)
(1) 哈希表的某个字段加上指定的整数值
`HINCRBY Key k num`
(2) 哈希表的某个字段机上指定的浮点数
`HINCRBYFLOAT Key k float`
```
Redis:0>hmset 8000 deptno 10 sal 4000
"OK"
Redis:0>hincrby 8000 deptno 5 
"15"
Redis:0>hincrbyfloat 8000 sal 500.5
"4500.5"
```
11. `Redis`列表类型
列表类型可以保存序列化数据。
注释：列表元素可以重复。
12. 列表指令
(1) 右侧插入元素
`RPUSH Key  值1 值2 值3`
(2) 左侧插入元素
`LPUSH Key 值1 值2`
(3) 设置列表指定位置的值
`LSET Key 位置 值`
(4) 截取子列表
`LRANGE Key 其实位置 结束位置`
(5) 获取列表长度
`LLEN Key`
(6) 获取指定位置元素
`LINDEX Key 位置`
(7) 指定元素前/后插入元素
`LINSERT Key before/after 指定元素 插入元素`
(8) 删除第一个元素
`LPOP Key`
(9) 删除最后一个元素
`RPOP Key`
(10) 删除指定元素
`LREM Key 删除数量(从左往右删) 值`
```
Redis:0>rpush dname 技术部 后勤部 售后部
"3"
Redis:0>lpush dname 秘书处
"4"
Redis:0>lset dname 2 销售部 
"OK"
Redis:0>lrange dname 0 2
 1)  "秘书处"
 2)  "技术部"
 3)  "销售部"
Redis:0>lrange dname 0 -1
 1)  "秘书处"
 2)  "技术部"
 3)  "销售部"
 4)  "售后部"
Redis:0>llen dname
"4"
Redis:0>lindex dname 2
"销售部"
Redis:0>linsert dname before 秘书处 董事会
"5"
Redis:0>lrange dname 0 -1
 1)  "董事会"
 2)  "秘书处"
 3)  "技术部"
 4)  "销售部"
 5)  "售后部"
Redis:0>lpop dname
"董事会"
Redis:0>rpop dname
"售后部"
Redis:0>lrange dname 0 -1
 1)  "秘书处"
 2)  "技术部"
 3)  "销售部"
Redis:0>rpush dname 技术部
"4"
Redis:0>lpush dname 技术部
"5"
Redis:0>lrange dname 0 -1
 1)  "技术部"
 2)  "秘书处"
 3)  "技术部"
 4)  "销售部"
 5)  "技术部"
Redis:0>lrem dname 2 技术部
"2"
Redis:0>lrange dname 0 -1
 1)  "秘书处"
 2)  "销售部"
 3)  "技术部"
```
13. `Redis`集合类型
可以将集合看做是元素不可以重复的列表。
注释：集合不可以重复、没有索引、根据哈希值排序。
14. 集合指令
(1) 集合添加元素
`SADD Key item1 item2 item3`
(2) 查看集合元素
`SMEMBERS Key`
(3) 获取集合长度
`SCARD Key`
(4) 判断是否含有某个元素
`SISMEMBER Key item`
(5) 删除元素
`SREM Key  item1 item2`
(6) 随机删除并返回集合的某个元素
`SPOP Key`
(7) 随机返回集合中的元素
`SRANDMEMBER Key 数量`
```
Redis:0>sadd empno 8001 8002 8003 8002
"3"
Redis:0>smembers empno
 1)  "8001"
 2)  "8002"
 3)  "8003"
Redis:0>scard empno
"3"
Redis:0> sismember empno 8002
"1"
Redis:0> srem empno 8001
"1"
Redis:0>smembers empno
 1)  "8002"
 2)  "8003"
Redis:0> del empno
"1"
Redis:0> sadd empno 3 5 1 2 9
"5"
Redis:0>srandmember empno 3
 1)  "5"
 2)  "9"
 3)  "3"
Redis:0>spop empno
"2"
Redis:0>spop empno
"9"
Redis:0>smembers empno
 1)  "1"
 2)  "3"
 3)  "5"
```
15. `Redis`有序集合类型
有序集合是带有排序功能的集合(无重复值)，`Redis`会按照元素分数值排序。
16. 有序集合指令
(1) 添加元素
`ZADD Key 分数值 元素 分数值 元素`
(2) 提升元素的分数值
`ZINCRBY  Key 分数值 元素`
(3) 获取正序指定范围元素
`ZRANGE Key 起始序号  结束序号`
(4) 获取倒序指定范围元素
`ZREVRANGE Key 起始序号 结束序号`
(5) 获得有序集合长度
`ZCARD Key`
(6) 查询某个分数值区间内的元素数量
`ZCOUNT Key 最小分数值 最大分数值`
(7) 返回元素的分数值
`ZSCORE Key 元素`
(8) 获取分数值区间内的集合内容(升序)
`ZRANGEBYSCORE Key 最小分数值 最大分数值`
其中，`(`表示开区间，`+inf`表示正无穷，`-inf`表示负无穷。
(9) 获取分数值区间内的集合内容(降序)
`ZREVRANGEBYSCORE Key 最大分数值 最小分数值`
(10) 获取元素的升序排名(从`0`开始)
`ZRANK Key 元素`
(11) 获取元素的降序排名(从`0`开始)
`ZREVRANK Key 元素`
(12) 删除有序集合中的元素
`ZREM Key 元素1 元素2 `
(13) 删除排名区间内的元素
`ZREMRANGEBYRANK Key 最小排名 最大排名`
(14) 删除分数值区间内的元素
`ZREMRANGEBYSCORE Key 最小分数值 最大分数值`
注意：字符串元素需要添加双引号。`-n`序号表示倒数第`n`个。
```
Redis:0>zadd keyword 0 "鹿晗" 0 "马云" 0 "张朝阳"
"3"
Redis:0>zrange keyword 0 1
 1)  "张朝阳"
 2)  "马云"
Redis:0>zincrby keyword 1 "鹿晗"
"1"
Redis:0>zincrby keyword 5 "马云"
"5"
Redis:0>zincrby keyword 2 "张朝阳" 
"2"
Redis:0>zrevrange keyword 0 -1
 1)  "马云"
 2)  "张朝阳"
 3)  "鹿晗"
Redis:0>zrange keyword 0 1
 1)  "鹿晗"
 2)  "张朝阳"
Redis:0>zcard keyword
"3"
Redis:0>zcount keyword 2 5
"2"
Redis:0>zscore keyword "马云"
"5"
Redis:0>zrangebyscore keyword 2 5
 1)  "张朝阳"
 2)  "马云"
Redis:0>zrangebyscore keyword 2 (5
 1)  "张朝阳"
Redis:0>zrangebyscore keyword 2 +inf
 1)  "张朝阳"
 2)  "马云"
Redis:0>zrevrangebyscore keyword 5 2
 1)  "马云"
 2)  "张朝阳"
Redis:0>zrank keyword "马云"
"2"
Redis:0>zrevrank keyword "马云"
"0"
Redis:0>zadd keyword 9 "李彦宏"
"1"
Redis:0>zrem keyword "鹿晗"
"1"
Redis:0>zrevrange keyword 0 -1
 1)  "李彦宏"
 2)  "马云"
 3)  "张朝阳"
Redis:0>zremrangebyrank keyword 0 1
"2"
Redis:0>zremrangebyscore keyword 9 9
"1"
Redis:0>zrevrange keyword 0 -1

Redis:0>zadd keyword 2 "张朝阳"  7 "李彦宏" 10 "马云"
"3"
Redis:0>zremrangebyrank keyword 0 -3
"1"
Redis:0>zrevrange keyword 0 -1
 1)  "马云"
 2)  "李彦宏"
```
## 2.3 Redis中常用命令
1. `Redis` 命令参考
[https://class.imooc.com/lesson/943#mid=22498](https://class.imooc.com/lesson/943#mid=22498)
2. `Redis`中的`Key`命令
(1) 删除记录
`DEL Key`
(2) 判断是否存在某个`Key`
 `EXISTS Key` 
(3) 设置过期时间(秒)
`EXPIRE Key 秒值`
(4) 设置过期时间(毫秒)
`PEXPIRE Key 毫秒值`
(5) 设置过期时间(`UNIX`时间戳，单位为秒)
`EXPIREAT Key UNIX秒值`
(6) 设置过期时间(`UNIX`时间戳，单位为毫秒)
`PEXPIREAT Key UNIX毫秒值`
(7) 移除过期时间
`PERSIST Key`
(8) 把记录迁移到其他逻辑库
 `MOVE Key 新的逻辑库`
(9) 修改`Key`名称
`RENAME OldKey  NewKey`
(10) 判断值的数据类型
`TYPE Key`
```
Redis:0>set name drew
"OK"
Redis:0>exists name
"1"
Redis:0>del name
"1"
Redis:0>exists name
"0"
Redis:0>set name drew
"OK"
Redis:0>expire name 5
"1"
Redis:0>get name
null
Redis:0>expireat name 15790764623 
"1"
Redis:0>move name 1
"1"
Redis:0>select 1
"OK"
Redis:1>get name
"drew"
Redis:1>rename name username
"OK"
Redis:1>get username
"drew"
Redis:1>sadd empno 8001 8002 8003 8002
"3"
Redis:1>type empno
"set"
```
## 2.4 总结
1. 技能清单
学习了`Redis`五种常用数据类型。
掌握了操作`Key`的命令。
# 3. Redis事务特性
## 3.1 介绍
1. `Redis`事务机制
 `Redis`的事务机制的原理？
 `Redis`的事务具备具备`ACID`属性吗？
 `Redis`的事务能用来做什么？
2. 管理事务的命令
`WATCH`、`UNWATCH`、`MULTI`、`EXEC`、`DISCARD`
## 3.2 Redis事务特性
1. 回顾`MySQL`数据库事务机制
数据库引入事务机制是为了防止对数据文件进行直接操作的时候出现意外宕机，引发数据错乱。
`undo`日志记录了数据修改之前的原始状态，`redo`日志记录了修改了哪些数据。
`undo`日志和`redo`日志保证了业务操作的原子性。
2. `Redis`数据库事务机制
`Redis`是异步单线程执行，一个线程对应所有客户端。哪个客户端上传了命令，线程就会执行，并不能保证一个客户端的多个命令不会被其他客户端的命令插队。
3. `Redis`事务的特点
 `Redis`的事务和数据库的事务有明显差异，它并不满足数据库事务的`ACID`属性。 `Redis`的事务更像是批处理执行。

| 序号 | 属性 | `Redis` | `MySQL` |
|:-:|:-:|:-:|:-:|
| `1` | 原子性 | `No` | `Yes` |
| `2` | 一致性 | `Yes` | `Yes` |
| `3` | 隔离性 | `Yes` | `Yes` |
| `4` | 持久性 | `No` | `Yes` |
4. 监控记录
为了保证事务的一致性，在开启事务之前必须要使用`WATCH`命令监视要操作的记录。
`WATCH kill_num kill_user`
5. 开启事务
```
MULTI
...
EXEC
```
开启事务后所有操作都不会立即执行，只有执行`EXEC`命令的时候才会批处理执行。如果我们监视的数据被其他客户端修改了，那么我们开启的事务就会自动关闭。
6. 开启事务后所有操作都不会立即执行，只有执行`EXEC`命令的时候才会批处理执行。
控制台`1`
```
Redis:0>set num 0
"OK"
Redis:0>watch num
"OK"
Redis:0>multi
"OK"
Redis:0>incr num 
"QUEUED"
Redis:0>incrby num 10
"QUEUED"
```
控制台`2`
```
Redis:0>get num
"0"
```
控制台`1`
```
Redis:0>exec
 1)  "1"
 2)  "11"
```
控制台`2`
```
Redis:0>get num
"11"
```
7. 如果我们监视的数据被其他客户端修改了，那么我们开启的事务就会自动关闭。
控制台`1`
```
Redis:0>set num 0
"OK"
Redis:0>watch num
"OK"
Redis:0>multi
"OK"
Redis:0>incrby num 500
"QUEUED"
```
控制台`2`
```
Redis:0>set num 50
"OK"
Redis:0>
```
控制台`1`
```
Redis:0>exec

Redis:0>get num
"50"
```
8. 取消事务
`Redis`没有事务的回滚机制，并不能保证原子性。
事务在没有提交执行(`EXEC`)前，是可以取消的。如果事务已经提交执行(`EXEC`)，就无法取消了。
`DISCARD`
```
Redis:0>set num 0
"OK"
Redis:0>watch num
"OK"
Redis:0>multi
"OK"
Redis:0>set num 100
"QUEUED"
Redis:0>discard
"OK"
Redis:0>exec
"ERR EXEC without MULTI"
Redis:0>get num
"0"
```
## 3.3 总结
1. 技能清单
学习了`Redis`事务机制的原理
掌握管理`Redis`事务的命令
# 4. Redis与Python交互
## 4.1 介绍
1. 安装`redis-py`模块
升级`pip`命令，用`pip`命令安装`redis-py`模块
2. 掌握`Redis`的`CRUD`操作
用`redis-py`模块管理`redis`中的数据，包括事务机制。
3. 编写程序案例
利用`Python`多线程，模拟电商秒杀活动的商品抢购，用`Redis`事务来避免超买和超卖。
## 4.2 Redis与Python的交互
1.`redis-py`模块安装
`➜  ~ pip3 install redis`
2. `redis-py`创建连接
```
import redis

try:
    r = redis.Redis(
        host="localhost",
        port=6379,
        password="abc123456",
        db=0
    )
except Exception as e:
    print(e)
```
注意: 与`MySQL`不同，`Redis`没有用户管理。
3. `redis-py`创建连接池
```
import redis

try:
    pool = redis.ConnectionPool(
        host="localhost",
        port=6379,
        password="abc123456",
        db=0,
        max_connections=200
    )
except Exception as e:
    print(e)
```
4. `redis-py`创建与关闭连接
从连接池中获得的连接，不用关闭，垃圾回收的时候连接会自动被归还到连接池。
```
# 连接池文件代码
import redis

try:
    pool = redis.ConnectionPool(
        host="localhost",
        port=6379,
        password="abc123456",
        db=0,
        max_connections=200
    )
except Exception as e:
    print(e)
```
```
# 连接文件代码
import redis
from test.redis_db import pool

con = redis.Redis(
    connection_pool=pool
)
# ...
del con
```
5. `redis-py`字符串指令(一)
设置单个`Key`-`Value`
```
import time
import redis
from test.redis_db import pool

con = redis.Redis(
    connection_pool=pool
)

try:
    con.set("country", "英国")
    con.set("city", "伦敦")
    city = con.get("city").decode("utf-8")  # 伦敦
    print(city)  # 伦敦
    con.expire("city", 5)
    time.sleep(6)
    city = con.get("city")
    print(city)  # None
except Exception as e:
    print(e)
finally:
    del con
```
注意：中文需要使用`decode("utf-8")`解码。
6. `redis-py`字符串指令(二)
设置多个`Key`-`Value`
```
import redis
from test.redis_db import pool

con = redis.Redis(
    connection_pool=pool
)

try:
    con.delete("country", "city")
    con.mset({"country": "德国", "city": "柏林"})
    result=con.mget("country", "city")
    print(result) # [b'\xe5\xbe\xb7\xe5\x9b\xbd', b'\xe6\x9f\x8f\xe6\x9e\x97']
    for one in result:
        print(one.decode("utf-8"))  # 德国 柏林
except Exception as e:
    print(e)
finally:
    del con
```
注释：删除`redis`字段`con.delete("key1", "key2")`。
7. `redis-py`列表指令
```
from test.redis_db import pool
import redis

con = redis.Redis(
    connection_pool=pool
)

try:
    con.rpush('dname', '董事会', '秘书处', '财务部', '技术部')
    con.lpop('dname')
    result = con.lrange('dname', 0, -1)
    for item in result:
        print(item.decode('utf-8'))
except Exception as e:
    print(e) # 秘书处 财务部 技术部
finally:
    del con
```
8. `redis-py`集合指令
```
from test.redis_db import pool
import redis

con = redis.Redis(
    connection_pool=pool
)

try:
    con.sadd('employee', 8001, 8002, 8003)
    con.srem('employee', 8002)
    result = con.smembers('employee')
    for one in result:
        print(one.decode('utf-8'))  # 8001 8003
    con.lpush("code", "Java", "PHP", "HTML", "Python")
    con.rpop("code")
    result = con.lrange("code", "0", "-1")
    for one in result:
        print(one.decode('utf-8'))  # Python HTML PHP
except Exception as e:
    print(e)
finally:
    del con
```
9. `redis-py`有序集合指令
```
from test.redis_db import pool
import redis

con = redis.Redis(
    connection_pool=pool
)

try:
    con.zadd('keyword', {'马云': 0, '张朝阳': 0, "丁磊": 0})
    con.zincrby('keyword', 10, '马云')
    result = con.zrevrange('keyword', 0, -1)
    for one in result:
        print(one.decode('utf-8'))  # 马云 张朝阳 丁磊
except Exception as e:
    print(e)
finally:
    del con
```
10. `redis-py`哈希指令
```
from test.redis_db import pool
import redis

con = redis.Redis(
    connection_pool=pool
)

try:
    con.hmset('9527', {'name': 'Scott', 'sex': 'male', 'age': 35})
    con.hset('9527', 'city', '纽约')
    con.hdel('9527', 'sex')
    result = con.hexists('9527', 'name')
    print(result)  # True
    result = con.hgetall('9527')
    for key in result:
        print(key.decode('utf-8'), result.get(key).decode('utf-8'))
        # name Scott 
        # age 35
        # city 纽约
except Exception as e:
    print(e)
finally:
    del con
```
11. `redis-py`的事务函数
`redis-py`模块用`pipeline`(管道)的方式向`Redis`服务器传递批处理命令和执行事务。
```
from test.redis_db import pool
import redis

con = redis.Redis(
    connection_pool=pool
)

try:
    pipeline = con.pipeline()
    pipeline.watch('9527')  # 监视数据
    pipeline.multi()  # 开启事务
    pipeline.hset('9527', 'name', 'Jack')
    pipeline.hset('9527', 'age', 23)
    pipeline.execute()  # 提交事务
except Exception as e:
    print(e)
finally:
    if 'pipeline' in dir():
        pipeline.reset()  # 只有重置pipeline，con对应的连接才会从连接池回收
    del con
```
12. 从`txt`文档中解析学生的信息，把语数外成绩都超过`85`分的学生信息，缓存到`Redis`哈希表中。
```
620,王伟,2-1,96,89,75
621,赵芳芳,2-1,71,62,80
622,许丽丽,2-2,96,88,89
624,胡倩倩,2-2,98,99,100
625,李伟,2-3,53,68,67
```
```
from test.redis_db import pool
import redis

con = redis.Redis(
    connection_pool=pool
)

try:
    file = open(
        file="考试成绩.txt",
        mode='r',
        encoding='utf-8'
    )
    data = file.read().splitlines()
    for item in data:
        temp = item.split(',')
        sid = temp[0]
        name = temp[1]
        class_no = temp[2]
        score_1 = int(temp[3])
        score_2 = int(temp[4])
        score_3 = int(temp[5])
        if score_1 >= 85 and score_2 >= 85 and score_3 >= 85:
            con.hmset(sid, {
                'name': name,
                'class_no': class_no,
                'score_1': score_1,
                'score_2': score_2,
                'score_3': score_3
            })
except Exception as e:
    print(e)
finally:
    if 'file' in dir():
        file.close()
    del con
```
13. 用`Python`程序模拟`300`名观众，为五位嘉宾(马云、丁磊、张朝阳、马化腾、李彦宏)随机投票，最后按照降序排列结果。
```
import random
from test.redis_db import pool
import redis

con = redis.Redis(
    connection_pool=pool
)

try:
    con.delete('ballot')
    con.zadd('ballot', {'马云': 0, '丁磊': 0, '张朝阳': 0, '马化腾': 0, '李彦宏': 0})
    names = ['马云', '丁磊', '张朝阳', '马化腾', '李彦宏']
    for i in range(0, 300):
        num = random.randint(0, 4)
        name = names[num]
        con.zincrby('ballot', 1, name)
    result = con.zrevrange('ballot', 0, -1, "WITHSCORES")  # 加上WITHSCORES，表示获得值和分数
    for item in result:
        print(item[0].decode('utf-8'), int(item[1]))
except Exception as e:
    print(e)
finally:
    del con
```
14. `Python`线程池
如果程序中经常需要使用线程，频繁的创建和销毁线程会浪费很多硬件资源，所以需要把线程与任务分离开。线程池中的线程可以反复利用，省去了重复创建的麻烦。
```
import time
from concurrent.futures.thread import ThreadPoolExecutor

def say_hello():
    time.sleep(1)
    print('Hello')

executor = ThreadPoolExecutor(20)
for i in range(0, 10):
    executor.submit(say_hello)
```
15. 用`Python`多线程模拟商品秒杀过程，不可以出现超买和超卖的情况。假设`A`商品有`10`件参与秒杀活动，`1000`个用户参与秒杀，`10`分钟秒杀自动结束。
```
from test.redis_db import pool
import redis
import random
from concurrent.futures.thread import ThreadPoolExecutor


# 生成1000个用户id
s = set()
while True:
    if len(s) == 1000:
        break
    num = random.randint(10000, 100000)
    s.add(num)

# 创建连接
con = redis.Redis(
    connection_pool=pool
)
try:
    # 删除相关数据
    con.delete('kill_total', 'kill_num', 'kill_flag', 'kill_user')
    # 初始化数据
    con.set('kill_total', 10)  # 一共10件秒杀商品
    con.set('kill_num', 0)  # 已秒杀几件商品
    con.set('kill_flag', 1)  # 秒杀是否结束
    con.expire('kill_flag', 60 * 10)  # 10分钟后描述结束
except Exception as e:
    print(e)
finally:
    del con

# 创建线程池
executor = ThreadPoolExecutor(200)

'''
kill_total 商品总数
kill_num 成功抢购数
kill_flag 有效标志位
kill_user 成功抢购的用户ID
'''
def buy():
    connection = redis.Redis(
        connection_pool=pool
    )
    try:
        if connection.exists('kill_flag') == 1:
            pipeline = connection.pipeline()
            pipeline.watch('kill_num', 'kill_user')
            total = int(pipeline.get('kill_total').decode('utf-8'))
            num = int(pipeline.get('kill_num').decode('utf-8'))
            if num < total:
                pipeline.multi()
                pipeline.incr('kill_num')  # 已秒杀商品数加1
                user_id = s.pop()
                pipeline.rpush('kill_user', user_id)  # 保存秒杀到商品的用户id
                pipeline.execute()
    except Exception as e:
        print(e)
    finally:
        if 'pipeline' in dir():
            pipeline.reset()
        del con


for i in range(0, 1000):
    executor.submit(buy)
print('秒杀已经结束')
```
## 4.3 总结
1. 技能清单
掌握了`redis-py`模块的连接池
掌握了`redis-py`模块的`CRUD`操作
掌握了`redis-py`模块的事务管理
# 5. 开发新闻管理系统
1. 代码地址
[https://github.com/nmwei/database-vega](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fnmwei%2Fdatabase-vega)
2. 技能清单
完成了已审批新闻的缓存
完成了删除新闻，自动删除`redis`缓存的功能
完成了编辑新闻，自动删除`redis`缓存的功能
