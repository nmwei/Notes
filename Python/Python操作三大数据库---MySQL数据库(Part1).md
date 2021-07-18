# 1. MySQL的介绍
## 1.1 介绍
1. 学习目标
了解关系型数据库的重要性
掌握`MySql`的安装和配置
实践用户创建、分配权限和密码修改
2. 内容
了解关系型数据库的诞生原因和独特优势
安装并初始化`MySQL`数据库
学习管理`MySQL`服务
创建新用户，并分配权限
了解`MySQL`常用配置参数
## 1.2 MySQL的下载与安装
1. 数据库简介
数据库系统(`DBMS`)是指一个能为用户提供信息服务的系统。它实现了有组织地、动态地储存大量相关数据的功能，提供了数据处理和信息资源共享的便利手段。
注意：数据的价值要远远大于程序的价值。
2. 操作系统中数据存放的载体
`windows`、`linux`和`macOS`都是基于文件的操作系统。因此，数据库中的数据也是基于文件保存的。
3. 数据库相对于一般文件的优势
支持条件语句快速查询
支持不同表的关联查询
4. 关系型数据库
关系型数据库系统(`RDBMS`)是指使用了关系模型的数据库系统。
关系模型中，数据是分类存放的，数据之前可以有联系。
5. 第一个关系型数据库
`1976`年`IBM`的`System R`团队在出版的论文中阐述了关系模型。`1979`年`Oracle`公司推出了首个关系型数据库成品。
6. 主流关系型数据库
`DB2`：随着硬件服务器赠送的，但硬件非常贵。
`Oracle`：未开源，无法定制。
`MySQL`：性能不如`DB2`和`Oracle`，但免费开源。
`SQL Server`：免费，但不支持`Linux`系统。
7. 非关系型数据库(`NoSQL`)
非关系型数据库指的是数据分类存放，但是数据之间没有关联关系的数据库系统。
8. 主流非关系型数据库
`Redis`：用内存保存数据
`MemCache`：用内存保存数据
`MongoDB`：用硬盘保存数据
`Neo4J`：用硬盘保存数据
9. `MySQL`数据库
`MySQL`是应用最广泛、普及度最高的开源关系型数据库。
`MySQL`由瑞典`MySQL AB`公司开发，目前属于`Oracle`旗下产品。
10. `MySQL`大事记
`1996`年 - `MySQL 1.0`版本诞生
`1999`年 - `MySQL AB`公司成立
`2000`年 - `MySQL 4.0`发布
`2003`年 - `MySQL 5.0`发布(支持事务机制)
11. `MySQL`版权归属
`2008`年，`MySQL AB`被`SUN`公司收购。
`2009`年，`SUN`被`Oracle`公司收购。
12. `MySQL`衍生版
`MySQL`、`PERCONA`、`MariaDB` 
13. `MySQL`下载安装
[MySQL下载安装](https://www.cnblogs.com/lurenq/p/10802090.html)
`MySQL`安装目录：`/usr/local/mysql`
`MySQL`数据库数据文件路径：`/usr/local/mysql/data`
[MySQL密码重置](https://blog.csdn.net/zyz1431/article/details/79244002)
`MySQL密码`：`299***`
注意：在密码重置命令`SET PASSWORD FOR 'root'@'localhost' = PASSWORD('XXXXXX');`中，`localhost`表示该用户只允许本地登录。
14. `MySQL`启动
(1) 图形界面
![image.png](https://upload-images.jianshu.io/upload_images/4989175-5e2a030c3146ef91.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(2) 命令行
启动
`sudo /usr/local/mysql/support-files/mysql.server start`
停止
`sudo /usr/local/mysql/support-files/mysql.server stop`
重启
`sudo /usr/local/mysql/support-files/mysql.server restart`
15. `MySQL`简单操作
登录：`mysql -u root -p`
查看数据库：`mysql> show databases;`
退出数据库：`mysql> quit;`
注释：`root`为管理员用户。
16. 使用`Navicat`管理`MySQL`用户
(1) 下载安装[`Navicat`](https://www.navicat.com.cn/products)
(2) 创建`MySQL`数据连接
![image.png](https://upload-images.jianshu.io/upload_images/4989175-05a839e3b9e25012.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
注释：`MySQL`默认端口号为`3306`。
(3) 新建用户
![image.png](https://upload-images.jianshu.io/upload_images/4989175-77cc1aff3220f45c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(4) 设置用户常规信息
![image.png](https://upload-images.jianshu.io/upload_images/4989175-cd75fbdfce465912.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
注释：主机`%`表示可以在任何主机登录，`localhost`表示该用户只允许本地登录。密码为`123456`。
(5) 设置用户权限
![image.png](https://upload-images.jianshu.io/upload_images/4989175-550670034049e736.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
注释：服务器权限为对所有数据库的权限；对象权限是对指定数据库的权限。
(6) 测试自定义用户连接
![image.png](https://upload-images.jianshu.io/upload_images/4989175-d044431b26c10a4f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
17. `MySQL`配置文件
在`my.cnf`文件中，我们可以设置各种`MySQL`配置。例如：字符集、端口号、目录地址等等。

(1) 查看默认指定的`my.cnf`路径
`mysql --help|grep 'my.cnf'`
```
nimengwei@nimengweideMacBook-Pro ~ % mysql --help|grep 'my.cnf'
                      order of preference, my.cnf, $MYSQL_TCP_PORT,
/etc/my.cnf /etc/mysql/my.cnf /usr/local/mysql/etc/my.cnf ~/.my.cnf 
nimengwei@nimengweideMacBook-Pro ~ % 
```
这是四个默认的指定路径，`MySQL`从第一个路径依次去找`my.cnf`配置文件。
(2) 创建`my.cnf`文件
```
nimengwei@nimengweideMacBook-Pro /etc % sudo vim my.cnf
```
(3)写入配置内容
[默认配置文件地址](https://www.fromdual.com/mysql-configuration-file-sample)
(4) 修改文件权限
`sudo chmod 664 /etc/my.cnf`
(5) 重启`MySQL`
注意：`macOS`下为`my.cnf`，`windows`下为`my.ini`。
参考：[Mac 安装MySQL my.cnf配置文件](https://blog.csdn.net/jyongchong/article/details/77862819)
## 1.3 总结
1. 技能清单
掌握`MySQL`数据库的安装和管理。明白逻辑库、数据表和数据目录的对应关系。
懂得`MySQL`数据库的常用参数设置：端口号、字符集、`IP`绑定、连接数等。
掌握`MySQL`数据库的用户管理，能创建用户并分配权限，设置远程登录。
对于`MySQL`数据库上忘记密码的账户，能重置该账户的密码信息。
# 2. 数据库表的相关操作
## 2.1 介绍
1. 管理逻辑库和数据表
创建、删除、修改逻辑库和数据表
2. 了解常用的数据类型和约束
字符串、整数、浮点数、精确数字、日期、枚举。
主键约束、非空约束、唯一约束、外键约束。
3. 掌握索引运行机制和使用原则
排序为什么可以提高数据检索速度？
怎么创建和删除索引？
什么条件下使用索引？
## 2.2 数据库表的创建
1. `SQL`语言
`SQL`是用于访问和处理数据的标准的计算机语言。
2. `SQL`语言分类
数据操作语言(`DML`) - 添加、修改、删除、查询
数据控制语言(`DCL`) - 用户、权限、事务
数据定义语言(`DDL`) - 逻辑库、数据表、视图、索引
3. `SQL`语句注意事项
`SELECT "HelloWorld";`
`SQL`语句不区分大小写，但是字符串区分大小写。
`SQL`语句**必须以分号结尾**。
`SQL`语句中的空白和换行没有限制，但是不能破坏语法。
4. `SQL`语句的注释
`# 单行注释`
`/*  多行注释 */`
5. 操作逻辑库
```
SHOW DATABASES;  # 显示所有数据库
CREATE DATABASE demo; # 创建数据库
DROP DATABASE demo; # 删除指定数据库
```
6. 创建数据表
```
CREATE TABLE 数据表(
    列名1 数据类型 [约束] [COMMENT 注释],
    列名1 数据类型 [约束] [COMMENT 注释],
    ...... 
)[COMMENT = 注释];
```
```
USE test;
CREATE TABLE student(
	id INT UNSIGNED PRIMARY KEY,
	name VARCHAR(20) NOT NULL,
	sex CHAR(2) NOT NULL,
	birthday DATE NOT NULL,
	tel CHAR(11) NOT NULL,
	remark VARCHAR(200)
)default charset = utf8;
```
对应数据库表位置：`/usr/local/mysql/data/test/student.ibd`
`UNSIGNED`：无符号整数。
注意：中括号内为可选内容。
7. 设置编码
创建数据表时指定编码
```
CREATE TABLE student(
  ...
)default charset = utf8;
```

设置数据库编码
```
ALTER DATABASE XXX CHARACTER SET utf8;
```
8. 数据表添加数据
```
INSERT INTO student VALUES(1, "李强", "男", "1995-5-15", "13356789012", NULL);
```
创建数据表时需要设置`utf8`编码，否则添加数据时报以下错误：
`1366 - Incorrect string value: '\xE6\x9D\x8E\xE5\xBC\xBA' for column 'name' at row 1, Time: 0.000000s`。
9. 数据表的其他操作
```
SHOW  TABLES; # 查看当前数据库中的数据表
DESC student;  # 查看某个数据表结构
SHOW CREATE TABLE student; # 查看建表时候的SQL语句
DROP TABLE student; #删除数据库表
```
10. 数据类型

(1) 数字 

| 类型 | 大小 | 说明 |
|:---:|:---:|:---:|
| `TINYINT` | `1`字节 | 小整数 |
| `SMALLINT` | `1`字节 | 普通整数 |
| `MEDIUMINT` | `3`字节 |普通整数 |
| `INT` | `4`字节 | 较大整数 |
| `BAGINT` | `8`字节 | 大整数 |
| `FLOAT` | `4`字节 | 单精度浮点数 |
| `DOUBLE` | `8`字节 | 双精度浮点数 |
| `DECIMAL` | ------ | 高精度小数 `DECIMAL(10, 2)` |
十进制的浮点数无法在计算机中用二进制精确表达。
例如：`0.2  = 1/8 + 1/16 + 1/32 + ……`
`DECIMAL`保存小数不会丢失精度，`10`表示整数和小数一共`10`个字符，`2`表示`2`个小数。
```
CREATE TABLE temp(
	id INT UNSIGNED PRIMARY KEY,
	num FLOAT(20,10)
)
INSERT INTO temp VALUES(1, 0.2); #保存为 0.2000000030
```
```
CREATE TABLE temp(
	id INT UNSIGNED PRIMARY KEY,
	num DECIMAL(20,10)
)
INSERT INTO temp VALUES(1, 0.2);  # 保存为 0.2000000000
```
(2) 字符串

| 类型 | 大小 | 说明 | 
|:---:|:---:|:---:|
| `CHAR` | `1`-`255`字符 | 固定长度字符串 |
| `VARCHAR` | `1`-`65535`字符 | 不固定长度字符串 |
| `TEXT` | `1`-`65535`字符 | 不确定长度字符串 |
| `MEDIUMTEXT` | `1`-`1`千`6`百万字符 | 不确定长度字符串 |
| `LONGTEXT` | `1`-`42`亿字符 | 不确定长度字符串 |
(3) 日期类型

| 类型 | 大小 | 说明 | 
|:---:|:---:|:---:|
| `DATE` | `3`字节 | 日期 |
| `TIME` | `3`字节 | 时间 |
| `YEAR` | `1`字节 | 年份 |
| `DATETINE` | `8`字节 | 日期时间 |
| `TIMESTAMP` | `4`字节 | 时间戳 |
10. 修改表结构

(1) 添加字段
```
ALTER TABLE student
ADD address VARCHAR(200) NOT NULL,
ADD home_tel CHAR(11) NOT NULL;
```
(2) 修改字段类型和约束
```
ALTER TABLE student
MODIFY address VARCHAR(300) NOT NULL,
MODIFY home_tel VARCHAR(20) NOT NULL;

DESC student; # 查看某个数据表结构
```
(3) 修改字段名称
```
ALTER TABLE student
CHANGE address home_address VARCHAR(300) NOT NULL;
DESC student; # 查看某个数据表结构
```
(4) 删除字段
```
ALTER TABLE student
DROP home_address,
DROP home_tel;
DESC student; # 查看某个数据表结构
```
## 2.3 数据库表字段约束
1. 数据库的范式
构造数据库必须遵守一定的规则，这种规则就是范式。

(1) 第一范式 - 原子性
数据表的每一列都是不可分割的基本数据项，同一列中不能有多个值，也不能存在重复的属性。

学号| 姓名 | 班级
|:-:|:-:|:-:|
`1000`| 刘娜| 高`3`年级`1`班
高`3`年级`1`班数据可分割。
学号| 姓名 | 年级 | 班级
|:-:|:-:|:-:|:-:|
`1000`| 刘娜| 高`3`|`1`班
(2) 第二范式 - 唯一性
数据表中的每条记录必须是唯一的。为了实现区分，通常要为表加上一个列用来存储唯一标识，这个唯一属性列被称作主键列。
| 学号 | 考试成绩 | 日期 |
|:-:|:-:|:-:|
| `230` | `58` | `2018-07-15` |
| `230` | `58` | `2018-07-15` |
无法区分重复数据。
|流水号| 学号 | 考试成绩 | 日期 |
|:-:|:-:|:-:|:-:|
| `201807151087` | `230` | `58` | `2018-07-15` |
| `201807152396` | `230` | `58` | `2018-07-15` |
(3) **第三范式 - 关联性**
每列都与主键有直接关系，不存在传递依赖。
爸爸| 儿子 | 女儿 | 女儿的玩具 | 女儿的衣服  
|:-:|:-:|:-:|:-:|:-:|
| 陈华 | 陈浩 | 陈婷 | 海绵宝宝 | 校服
后两列与主键无直接关系。
爸爸| 儿子 | 女儿 | 
|:-:|:-:|:-:|
| 陈华 | 陈浩 | 陈婷 |

| 女儿 | 女儿的玩具 | 女儿的衣服  
|:-:|:-:|:-:|
| 陈婷 | 海绵宝宝 | 校服
依照第三范式，数据可以拆分保存到不同的数据表，彼此保持关联。
编号| 部门 | 电话 | 
|:-:|:-:|:-:|
| `10` | 财务部 | `1001` |
| `20` | 技术部 | `1002` |
| `30` | 销售部 | `1003` |

编号| 姓名 | 性别 |  部门 | 入职日期 |
|:-:|:-:|:-:|:-:|:-:|
| `1` | 陈浩 | 男 | `10` | `2018-5-10` |
| `2` | 李婷婷 | 女 | `30` | `2018-3-22` |
2. 字段约束
`MySQL`中的字段约束共有四种。

约束名称| 关键字 | 描述 | 
|:-:|:-:|:-:|
| 主键约束 | `PRIMARY KEY` | 字段值唯一，且不能为`NULL` |
| 非空约束 | `NOT NULL` | 字段值不能为`NULL` |
| 唯一约束 | `UNIQUE` | 字段值唯一(非`NULL`时)，且可以为`NULL` |
| 外键约束 | `FOREIGN KEY` | 保持关联数据的逻辑性 |
3. 主键约束
主键约束要求字段的值在全表必须唯一，而且不能为`NULL`值。
由于数字检索非常快，建议主键使用数字类型。
如果主键是数字类型，还可以设置自动增长。
```
CREATE TABLE teacher(
	id INT PRIMARY KEY AUTO_INCREMENT,
	...
);
```
`AUTO_INCREMENT`表示`id`未指定时，自增。
4. 非空约束
非空约束要求字段值不能为`NULL`。
```
CREATE TABLE t_teacher(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(200) NOT NULL,
	married BOOLEAN NOT NULL DEFAULT FALSE
);
```
`DEFAULT`表示默认值。
5. 唯一约束
唯一约束要求字段值如果不为`NULL`，那么在全表必须唯一。
```
CREATE TABLE t_teacher(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	tel CHAR(11) NOT NULL UNIQUE,
	married BOOLEAN NOT NULL DEFAULT FALSE
)default charset = utf8;
```
6. 外键约束
外键约束用来保证关联数据的逻辑关系。
父表`t_dept`如下：

| deptno | dname | tel |
|:-:|:-:|:-:|
| `10` | 财务部 | `1001` |
| `20` | 技术部 | `1002` |
| `30` | 销售部 | `1003` |
子表`t_emp`如下：
| empno |ename | sex | deptno | hiredate|
|:-:|:-:|:-:|:-:|:-:|
| `1` | 陈浩 | 男 | `10` | `2018-05-10` |
| `2` | 李婷婷 | 女 | `30` | `2018-03-22` |
```
CREATE TABLE t_dept(
	deptno INT UNSIGNED PRIMARY KEY,
	dname VARCHAR(20) NOT NULL UNIQUE,
	tel CHAR(4) UNIQUE
);
```
```
CREATE TABLE t_emp(
	empno INT UNSIGNED PRIMARY KEY,
	ename VARCHAR(20) NOT NULL,
	sex ENUM("男", "女") NOT NULL,
	deptno INT UNSIGNED NOT NULL,
	hiredate  DATE NOT NULL,
	FOREIGN KEY (deptno) REFERENCES t_dept(deptno)
)
```
由于存在外键约束，如果想删除某一个部门，必须先删除该部门内全部员工。
7. 外键约束闭环问题
如果形成外键闭环，我们将无法删除任何一张表的记录。
**开发过程中，应避免外键约束。**
8. 数据库的索引机制
一旦数据排序之后，查找的速度就会翻倍，现实世界和程序世界都是如此。
主键默认有索引，除了主键之外，我们可以给其他字段添加索引。字段添加索引可以加快查询速度。
9. 创建索引的方式
(1) 创建数据表时候添加索引
```
CREATE TABLE 表名称(
    ......,
    INDEX [索引名称] (字段),
    ......
);
```
```
CREATE TABLE t_message(
	id INT UNSIGNED PRIMARY KEY,
	content VARCHAR(200) NOT NULL,
	type ENUM("公告", "通报", "个人通知") NOT NULL,
	create_time TIMESTAMP NOT NULL,
	INDEX idx_type (type)
);
```
(2) 创建数据表之后再添加索引
```
//添加索引方式一
CREATE INDEX 索引名称 ON 表名(字段);
//添加索引方式二
ALTER TABLE 表名称 ADD INDEX [索引名](字段);
//查看索引
SHOW INDEX FROM 表名;
//删除索引
DROP INDEX 索引名称 ON 表名;
```
```
CREATE TABLE t_message(
	id INT UNSIGNED PRIMARY KEY,
	content VARCHAR(200) NOT NULL,
	type ENUM("公告", "通报", "个人通知") NOT NULL,
	create_time TIMESTAMP NOT NULL,
	INDEX idx_type (type)
);

SHOW INDEX FROM t_message;
DROP INDEX idx_type ON t_message;
CREATE INDEX idx_type ON t_message(type);
DROP INDEX idx_type ON t_message;
ALTER TABLE t_message ADD INDEX idx_type(type);
```
10. 索引的使用原则
数据**量很大**，而且**经常被查询**的数据表可以设置索引。
索引只添加在经常被用作索引条件的字段上。
不要在大字段上设置索引。
## 2.4 总结
1. 掌握了数据库和数据表的管理
2. 了解`MySQL`常用数据类型
3. 掌握`MySQL`的字段约束
4. 掌握索引机制以及适用场景
# 3. 数据库的基本查询
## 3.1 介绍
1. 数据的简单查询
无条件查询记录，字段的计算和字段的别名。
2. 数据的高级查询
数据排序、分页、去除重复数据。
3. 数据的有条件查询
条件表达式：数字运算符、比较运算法、逻辑运算符、按位运算符。
## 3.2 数据操作语言的基本操作
1. 数据表的基本查询
查询某一个表的所有字段：`SELECT * FROM 表名;`
查询某一个表的某些字段：`SELECT 字段1, 字段2, 字段3 FROM 表名;`
`SELECT`语句屏蔽了物理层的操作，用户不必关心数据的真实存储，交由数据库高效的查找数据。
```
USE demo;
SELECT * FROM t_emp;
# 7369	SMITH	CLERK	7902	1980-12-17	800.00		20
# 7499	ALLEN	SALESMAN	7698	1981-02-20	1600.00	300.00	30
# 7521	WARD	SALESMAN	7698	1981-02-22	1250.00	500.00	30

SELECT empno,ename,sal FROM t_emp; 
# 7369	SMITH	800.00
# 7499	ALLEN	1600.00
# 7521	WARD	1250.00
```
2. 列设置别名
`SELECT`子句中如果使用了表达式，那么这列的名字就默认为表达式。我们可以通过`AS`对列进行重命名。
 ```
SELECT empno, sal * 12 FROM t_emp;
# empno sal*12 
# 7369	9600.00
# 7499	19200.00

SELECT empno, sal * 12 AS "income" FROM t_emp;
# empno income 
# 7369	9600.00
# 7499	19200.00
```
3. 查询部分数据(数据分页)
`SELECT 字段 FROM 数据表 LIMIT 起始位置, 数据量;`
```
SELECT empno, ename FROM t_emp LIMIT 10, 5;
# 7876	ADAMS
# 7900	JAMES
# 7902	FORD
# 7934	MILLER
```
注意：`LIMIT N`等价于`LIMIT 0 N`，表示查询前`N`条数据。
子句执行顺序：`FROM` > `SELECT` > `LIMIT`。
4. 查询结果排序
`SELECT 字段 FROM 数据表 ORDER BY 列名 [ASC|DESC];`
排序规则：如果是数字类型，按照数据大小；如果是日期类型，按照日期先后；如果是字符串类型，按照字符集序号。
```
SELECT empno, ename, sal, deptno FROM t_emp ORDER BY sal; # 升序
# 7369	SMITH	800.00	20
# 7900	JAMES	950.00	30
# 7876	ADAMS	1100.00	20
# 7521	WARD	1250.00	30

SELECT empno, ename, sal, hiredate FROM t_emp ORDER BY hiredate DESC; # 降序
# 7876	ADAMS	1100.00	1983-01-12
# 7788	SCOTT	3000.00	1982-12-09
# 7934	MILLER	1300.00	1982-01-23
# 7900	JAMES	950.00	1981-12-03
```
5. 多个排序字段
首先采用第一个排序字段进行排序，如果第一个排序字段的值相同，则继续采用第二个排序字段，依次类推。如果所有的排序字段的值都相同，则比较主键大小。
```
SELECT empno, ename, sal, hiredate FROM t_emp ORDER BY sal DESC, hiredate; #工资降序，日期升序
# 7902	FORD	3000.00	1981-12-03
# 7788	SCOTT	3000.00	1982-12-09
```
6. 排序并查询部分数据
```
SELECT empno, ename, sal, hiredate FROM t_emp ORDER BY sal DESC LIMIT 3;
# 7839	KING	5000.00	1981-11-17
# 7902	FORD	3000.00	1981-12-03
# 7788	SCOTT	3000.00	1982-12-09
```
子句执行顺序：`FROM` > `SELECT` > `ORDER BY` > `LIMIT`。
7. 查询结果去重
`SELECT DISTINCT 字段 FROM 数据表`
```
SELECT DISTINCT job FROM t_emp;
# CLERK
# SALESMAN
# MANAGER
# ANALYST
# PRESIDENT
```
8. `DISTINCT`关键字注意事项
使用`DISTINCT`的`SELECT`子句中只能查询一列数据，如果查询多列，去除重复记录就会失效。
```
SELECT DISTINCT job, ename FROM t_emp;
# CLERK	SMITH
# SALESMAN	ALLEN
# SALESMAN	WARD
# MANAGER	JONES
```
`DISTINCT`关键字只能在`SELECT`子句中使用一次且只能修饰第一个字段。
```
SELECT job, DISTINCT ename FROM t_emp; 
# SELECT使用多次，报错
SELECT DISTINCT job, DISTINCT ename FROM t_emp; 
# SELECT修饰第二个字段，报错
```
## 3.3 条件查询
1. 条件查询
`SELECT 字段 FROM 数据表 WHERE 条件 [AND|OR] 条件;`
```
SELECT empno, ename, sal FROM t_emp 
WHERE (deptno = 10 OR deptno = 30) AND sal > 2000;
# 7698	BLAKE	2850.00
# 7782	CLARK	2450.00
# 7839	KING	5000.00
```
2. 运算符
数字运算符、比较运算符、逻辑运算符、按位运算符
3. 数字运算符

|表达式|意义|例子|
|:-:|:-:|:-:|
| `+` | 加 | `1+ 2` | 
| `-` | 减 | `2 - 4` | 
| `*` | 乘 | `7 * 9` | 
| `/` | 除 | `351 / 15` | 
| `%` | 求模 | `10 % 3` | 
```
SELECT 10 + NULL; # NULL
SELECT NOW(); # 2019-12-11 21:34:49

SELECT ename, sal, hiredate, comm
FROM t_emp
WHERE deptno = 10 AND (sal + IFNULL(comm,0)) * 12 > 15000
AND DATEDIFF(NOW(),hiredate) / 365 >= 20
# CLARK	2450.00	1981-06-09	
# KING	5000.00	1981-11-17	
# MILLER	1300.00	1982-01-23
```
注意：`IFNULL(M, N)`表示当`M`为`NULL`时，值为`N`；否则，值为`M`。
4. 比较运算符

|表达式|意义|例子|
|:-:|:-:|:-:|
| `>` | 大于 | `age > 18` |
| `>=` | 大于等于 | `age >= 18` |
| `<` | 小于 | `age < 18` |
| `<=` | 小于等于 | `age <= 18` |
| `=` | 等于 | `age = 18` |
| `!=` | 不等于 | `age != 18` |
| `IN` | 包含 | `age IN(18, 20, 22)`  |
| `IS NULL` |  为空 | `comm IS NULL` |
| `IS NOT NULL` | 不为空 | `comm IS NOT NULL` |
| `BETWEEN AND` | 范围 | `sal BETWEEN 200 AND 300` |
| `LIKE` | 模糊查询 | `ename LIKE "_A%"`(`_`表示一个字符，`%`表示任意个字符) |
| `REGEXP` | 正则表达式 | `ename REGEXP "[a-zA-Z]{4}"` |
```
SELECT empno, ename, sal, deptno, hiredate
FROM t_emp
WHERE deptno IN(10, 20, 30) 
AND job != "SALESMAN"
AND hiredate < "1981-06-01"
# 7369	SMITH	800.00	20	1980-12-17
# 7566	JONES	2975.00	20	1981-04-02
# 7698	BLAKE	2850.00	30	1981-05-01

SELECT ename,comm, sal 
FROM t_emp 
WHERE comm IS not NULL
AND sal BETWEEN 1000 AND 3000
AND ename LIKE "%A%";
# ALLEN	300.00	1600.00
# WARD	500.00	1250.00
# MARTIN	1400.00	1250.00
```
注意：使用`IS NULL`判断是否为空，`= NULL`无法判断。 
5. 逻辑运算符

|表达式|意义|例子|
|:-:|:-:|:-:|
| `AND` | 与 | `age > 18 AND sex = "男"` |
| `OR` | 或 | `age > 18 OR sex = "男"` |
| `NOT` | 非 | `NOT deptno = 20` (等价于 `deptno != 20`) |
| `XOR` | 异或 | `age > 18 XOR sex = "男"` |
```
SELECT 
ename, deptno
FROM t_emp
WHERE NOT deptno IN(10, 20) AND sal > 2000;
# BLAKE	30
```
注释：`AND`的优先级高于`OR`。
6. 二进制按位运算
二进制位运算的实质是将参与运算的两个操作符，按对应的二进制数逐位进行逻辑运算。

|表达式|意义|例子|
|:-:|:-:|:-:|
| `&` | 与 | `3&7` |
| `\|` | 或 | `3\|7` |
| `~` | 取反 | `~10` |
| `^` | 异或 | `3^7` |
| `<<` | 左移 | `10<<1` |
| `>>` | 右移 | `10>>1` |
```
SELECT 3 & 7   #0011 & 0111 = 0011 即 3
```
7. `WHERE`子句的注意事项
`WHERE`子句中，我们应该把索引条件或者筛选掉记录最多的条件写在最左侧。
从左到右：索引条件 > 筛选掉最多记录的条件 > 普通检索条件
```
SELECT empno, ename FROM t_emp WHERE ename="FORD" AND sal >= 2000;
SELECT empno, ename FROM t_emp WHERE deptno = 10 AND sal > 2000; 
```
8. 子句执行顺序
子句执行顺序：`FROM` > `WHERE` >`SELECT` > `ORDER BY` > `LIMIT`。
找数据表 > 条件过滤 > 字段过滤 > 排序 > 数量过滤
## 3.4 总结
1. 掌握`SELECT`子句中的列别名和去除重复记录
2. 掌握数据排序语法
3. 掌握数据分页语法
4. 掌握有条件查询的语法和运算符
# 4. 数据库的高级查询
## 4.1 介绍
1. 数据统计分析
聚合函数、分组查询、`HAVING`子句。
2. 多表连接查询
内连接、外连接以及多表查询的多种用法。
3. 子查询
单行子查询、多行子查询、`WHERE`子查询、`FROM`子查询、`SELECT`子查询。
## 4.2 高级查询
1. 聚合函数
聚合函数可以对数据求和、求最大值、最小值以及平均值等等。
```
SELECT AVG(sal + IFNULL(comm,0)) AS avg FROM t_emp;
# 2195.000000
```
2. `SUM`函数
`SUM`函数用于求和，只能用于数字类型，字符类型的统计结果为`0`，日期类型的统计结果为毫秒数相加。
```
SELECT SUM(sal) FROM t_emp WHERE deptno IN(10, 20);
# 19625.00
```
3. `MAX`函数
`MAX`函数用于获得非空值的最大值。
```
SELECT MAX(sal + IFNULL(comm, 0)) FROM t_emp WHERE deptno IN(10, 20);
# 5000.00
SELECT MAX(LENGTH(ename)) FROM t_emp;
# 6
```
4. `MIN`函数
`MIN`函数用于获得非空值的最小值。
```
SELECT MIN(empno), MIN(hiredate) FROM t_emp;
# 7369	1980-12-17
```
5. `AVG`函数
`AVG`函数用于获得非空值的平均值，非数字数据统计结果为`0`。
```
SELECT AVG(sal + IFNULL(comm, 0)) FROM t_emp; # 2195.000000
SELECT  ROUND(AVG(sal + IFNULL(comm, 0)), 1) FROM t_emp; # 2195.0
SELECT AVG(ename) FROM t_emp; # 0
```
使用`ROUND`可以对数据进行四舍五入。
6. `COUNT`函数
`COUNT(*)`用于获得所有(包含空值)的记录数，`COUNT(列名)`用于获得列值为非空值的记录数。
```
SELECT COUNT(*), COUNT(comm) FROM t_emp;  # 15  5
```
7. 查询`10`和`20`部门中，底薪超过`2000`元并且工龄超过`15`年的员工数量
```
SELECT COUNT(*) 
FROM t_emp 
WHERE deptno IN(10, 20) 
AND sal >=2000 
AND DATEDIFF(NOW(),hiredate) / 365 >= 15; # 5
```
8. `WHERE`语句中不可以使用聚合函数
聚合函数是对`WHERE`语句查询出的数据集合进行求和、求最值以及平均值等。聚合函数依赖于`WHERE`语句查询出的数据结果。因此，`WHERE`语句中不能使用聚合函数。
条件过滤是查询前的过滤条件，聚合函数是查询后的统计分析。即：条件过滤 → 查询结果 → 聚合函数。
例如：查询`1985`年以后入职的员工，底薪超过公司平均底薪的员工数量。
```
SELECT COUNT(*) FROM t_emp 
WHERE hiredate >= '1985-01-01' AND sal > AVG(sal); # 报错
```
注释：正确写法参考**内连接查询**。
9. 分组查询
默认情况下，聚合函数是对全表范围内查询到的数据做统计。无法对数据进行分组，分别计算各组使用聚合函数的统计结果。
`GROUP BY`子句的作用是通过一定的规则将一个数据集划分成若干个小的区域，然后分别对每个小区域进行数据汇总处理。
```
SELECT deptno, ROUND(AVG(sal)) FROM t_emp GROUP BY deptno;
# 10	2917
# 20	2175
# 30	1557
```
注意：分组查询`SELECT`语句除了聚合函数结果之外，只能够输出`GROUP BY`对应的组别。
10. 逐级分组
数据库支持多列分组条件，执行的时候逐级分组。
例如：查询每个部门里，每种职位的员工数量和员工底薪。
```
SELECT deptno, job, COUNT(*), ROUND(AVG(sal) )
FROM t_emp 
GROUP BY deptno, job
ORDER BY deptno;

-- 10	CLERK	1	1300
-- 10	MANAGER	1	2450
-- 10	PRESIDENT	1	5000
-- 20	ANALYST	2	3000
-- 20	CLERK	2	950
-- 20	MANAGER	1	2975
-- 30	CLERK	1	950
-- 30	MANAGER	1	2850
-- 30	SALESMAN	5	1420
```
11. 分组查询对`SELECT`子句的要求
查询语句中如果含有`GROUP BY`子句，那么`SELECT`子句中的内容就必须要遵守以下规定：`SELECT`子句中可以包含聚合函数，或者`GROUP BY`子句的分组列，其余内容均不可以出现在`SELECT`子句中。
分析：如果使用`GROUP BY`子句分组查询，那么聚合函数结果和`GROUP BY`子句的分组列结果在一组中只有一个结果。而其他内容，一组中有多个结果。因此，无法匹配。
```
SELECT deptno, COUNT(*), ROUND(AVG(sal)) FROM t_emp GROUP BY deptno;
-- 10	3	2917
-- 20	5	2175
-- 30	7	1557

SELECT deptno, COUNT(*), sal FROM t_emp GROUP BY deptno; # 报错
```
如果数据通过`deptno`分成了`n`组。那么`deptno`的数量等于`n`，表示每一组的`deptno`；`COUNT(*)`的数量等于`n`，表示每一组数据的个数；`sal`的数量不等于`n`。
12. 对分组结果集合再次做汇总计算
```
SELECT deptno, COUNT(*), AVG(sal), MAX(sal), MIN(sal), SUM(sal)
FROM t_emp 
GROUP BY deptno 
WITH ROLLUP;

-- 10 3	2916.666667	5000.00	1300.00	8750.00
-- 20	5	2175.000000	3000.00	800.00	10875.00
-- 30 7	1557.142857	2850.00	950.00	10900.00
-- NULL	15	2035.000000	5000.00	800.0030525.00
```
13. `GROUP_CONCAT`函数
`GROUP_CONCAT`函数可以把分组查询中的某个字段拼接成一个字符串。
例如：查询每个部门中的底薪超过`2000`元的人数和员工姓名。
```
SELECT deptno, COUNT(*), ename
FROM t_emp 
WHERE sal > 2000 
GROUP BY deptno;  # 报错

SELECT deptno, COUNT(*), GROUP_CONCAT(ename)  
FROM t_emp 
WHERE sal > 2000 
GROUP BY deptno;
-- 10	2	CLARK,KING
-- 20	3	JONES,SCOTT,FORD
-- 30	1	BLAKE
```
注意：`WHERE`语句必须在`GROUP BY`语句之前。
14. 各种子句的执行顺序
`FROM`  > `WHERE` > `GROUP BY` > `SELECT` > `ORDER BY` > `LIMIT`
找数据表 > 条件过滤 > 分组 > 字段过滤 > 排序 > 数量过滤
15. 分组查询遇到的困难？
 `WHERE`语句中不可以使用聚合函数。
例如：查询部门平均底薪超过`2000`元的部门编号。
```
SELECT deptno FROM t_emp 
WHERE AVG(sal) > 2000 GROUP BY deptno; # 报错
```
16. `HAVING`子句的使用
 `HAVING`子句和`WHERE`子句类似，都可以用来做条件筛选，区别在于`HAVING`子句写在`GROUP BY`子句之后。`GROUP BY`子句执行分组之后，会立即执行`HAVING`子句。
例如：查询部门平均底薪超过`2000`元的部门编号。
```
SELECT deptno FROM t_emp 
GROUP BY deptno HAVING AVG(sal) >= 2000;
-- 10
-- 20
```
查询每个部门中，`1982`年以后入职的员工超过`2`个人的部门编号
```
SELECT deptno FROM t_emp 
WHERE hiredate >= "1982-01-01" 
GROUP BY deptno 
HAVING COUNT(*) >= 2
ORDER BY deptno;
-- 20

SELECT deptno FROM t_emp 
WHERE hiredate >= "1982-01-01" 
GROUP BY deptno 
HAVING sal >= AVG(sal); -- 报错
```
17. `WHERE`子句与`HAVING`子句
`WHERE`子句：对一组数据进行过滤。
`GROUP BY`子句：对一组数据进行分组。
`HAVING`子句：对多组数据进行过滤。
```
SELECT deptno, COUNT(*) FROM t_emp 
GROUP BY 1 
HAVING deptno in (10, 20);
-- 10	3
-- 20	5

SELECT deptno, COUNT(*) FROM t_emp 
WHERE deptno in (10, 20)
GROUP BY 1; 
-- 10	3
-- 20	5
```
注释：按照数字`1`分组，会依据`SELECT`子句中的第一列进行分组。
18. 字段表达式和聚合函数表达式
(1) 字段表达式
① 将一组数据进行**过滤**，结果为一组数据。
② 将一组数据进行**输出**，结果为一组数据。
(2) 聚合函数(和、最值、平均值)表达式
③ 将一组数据进行统计**输出**，结果为一个数据。
④ 将多组数据进行统计**输出**，结果为一组数据。
⑤ 将多组数据的统计结果进行**过滤**，结果为一组数据。
`SELECT`语句(无`GROUP BY`)：对**一组**数据进行**输出**。使用②、③，但②、③不可以同时使用。
`SELECT`语句(有`GROUP BY`)：对**多组**数据进行**输出**。使用④。
`WHERE`语句：对**一组**数据进行**过滤**。使用①。
`HAVING`语句：对**多组**数据进行**过滤**。使用⑤。
注意：**分组字段**与普通字段不同，与聚合函数的使用场景相同。
## 4.3 表的内外连接
1. 从多张表中查询数据
从多张表中提取数据，必须规定连接条件的表连接语句，否则就会出现无条件连接，两张表的数据会交叉连接，产生笛卡尔积。
```
SELECT empno, ename, dname FROM t_emp JOIN t_dept;
-- 产生笛卡尔积， 共 15 * 4 = 60 条记录

SELECT e.empno, e.ename, d.dname
FROM t_emp e JOIN t_dept d ON e.deptno = d.deptno
-- 共15条数据
```
注释：笛卡尔乘积是指在数学中，两个集合`X`和`Y`的笛卡尔积（`Cartesian product`），又称直积，表示为`X × Y`，第一个对象是`X`的成员而第二个对象是`Y`的所有可能有序对的其中一个成员。
2. 表连接分类
内连接：结果集中只保留符合连接条件的记录。
外连接：不管是否符合连接条件，记录都保留在结果集中。
3. 内连接
内连接是最常见的一种表连接，用于查询多张关系表符合连接条件的记录。
`SELECT ... FROM 表1 JOIN 表2 ON 连接条件 JOIN 表3 ON 连接条件;`
`SELECT ... FROM 表1 JOIN 表2 WHERE 连接条件;`
`SELECT ... FROM 表1, 表2 WHERE 连接条件;`
```
SELECT e.empno, e.ename, d.dname
FROM t_emp e JOIN t_dept d 
ON e.deptno = d.deptno
-- 写法1

SELECT e.empno, e.ename, d.dname
FROM t_emp e JOIN t_dept d 
WHERE e.deptno = d.deptno
-- 写法2

SELECT e.empno, e.ename, d.dname
FROM t_emp e, t_dept d 
WHERE e.deptno = d.deptno
-- 写法3
```
4. 内连接练习
(1) 查询每个员工的工号、姓名、部门名称、底薪、职位、工资等级
```
-- 写法一
SELECT e.empno, e.ename, d.dname, e.sal, e.job, s.grade
FROM t_emp e 
JOIN t_dept d ON  e.deptno = d.deptno 
JOIN t_salgrade s ON e.sal BETWEEN s.losal AND s.hisal;

-- 写法二
SELECT e.empno, e.ename, d.dname, e.sal, e.job, s.grade
FROM t_emp e, t_dept d, t_salgrade s 
WHERE e.deptno = d.deptno AND e.sal BETWEEN s.losal AND s.hisal;
```
总结：内连接的数据表不一定必须有同名字段，只要字段之间符合逻辑关系(例如：`e.sal BETWEEN s.losal AND s.hisal`)即可。
(2) 查询与员工`SCOTT`相同部门的员工
```
-- 写法1：子查询的写法, 性能很差
SELECT ename FROM t_emp 
WHERE deptno = (SELECT deptno FROM t_emp WHERE ename = "SCOTT") AND ename != "SCOTT";
-- SMITH JONES ADAMS FORD

-- 写法2：表连接的写法，性能很好
SELECT e2.ename FROM t_emp e1 
JOIN t_emp e2 
ON e1.deptno = e2.deptno
WHERE e1.ename = "SCOTT" AND e2.ename != "SCOTT"
-- SMITH JONES ADAMS FORD

-- 写法3：表连接的等价写法
SELECT e2.ename FROM t_emp e1, t_emp e2 
WHERE e1.ename = "SCOTT" AND e1.deptno = e2.deptno AND e2.ename != "SCOTT";
-- SMITH JONES ADAMS FORD
```
总结：相同的数据表也可以做表连接。
(3) 查询底薪超过公司平均底薪的员工信息
```
SELECT e2.ename, e2.empno, e2.sal
FROM t_emp e1 JOIN t_emp e2
ON e2.sal >=  AVG(e1.sal); 
-- 报错: 聚合函数不能写在ON子句或WHERE子句中

SELECT e.ename, e.empno, e.sal
FROM t_emp e JOIN (SELECT  AVG(sal) avg FROM t_emp) t 
ON e.sal >= t.avg;
-- JONES	7566	2975.00
-- BLAKE	7698	2850.00
-- CLARK	7782	2450.00
-- SCOTT	7788	3000.00
-- KING	7839	5000.00
-- FORD	7902	3000.00
```
总结：`t`为`t_emp`表中平均月薪的查询结果，`t`也是一张数据表。
(4) 查询`RESEARCH`部门人数、最高底薪、最低底薪、平均底薪、平均工龄
```
SELECT COUNT(*), MAX(e.sal), MIN(e.sal), AVG(e.sal), 
FLOOR(AVG(DATEDIFF(NOW(), e.hiredate)/365)) avg
FROM t_emp e JOIN t_dept t ON e.deptno = t.deptno WHERE t.dname = "RESEARCH"
-- 5	3000.00	800.00	2175.000000	37
```
(5) 查询每种职业的最高工资、最低工资、平均工资、最高工资等级和最低工资等级。
```
SELECT e.job, 
MAX(e.sal + IFNULL(e.comm,0)), 
MIN(e.sal + IFNULL(e.comm,0)), 
AVG(e.sal + IFNULL(e.comm,0)), 
MAX(s.grade),
MIN(s.grade)
FROM t_emp e JOIN t_salgrade s 
ON (e.sal + IFNULL(e.comm,0)) BETWEEN s.losal AND s.hisal
GROUP BY e.job;

-- ANALYST	3000.00	3000.00	3000.000000	4	4
-- CLERK	1300.00	800.00	1037.500000	2	1
-- MANAGER	2975.00	2450.00	2758.333333	4	4
-- PRESIDENT	5000.00	5000.00	5000.000000	5	5
-- SALESMAN	2650.00	1500.00	1900.000000	4	3	
```
(6) 查询每个底薪超过部门平均底薪的员工信息
```
SELECT  e.empno, e.ename, e.deptno
FROM t_emp e 
JOIN (SELECT AVG(sal) avg, deptno FROM t_emp GROUP BY deptno) d
ON e.deptno = d.deptno AND e.sal > d.avg;
-- 7839	KING	10
-- 7566	JONES	20
-- 7788	SCOTT	20
-- 7902	FORD	20
-- 7499	ALLEN	30
-- 7698	BLAKE	30
```
5. 外连接
外连接与内连接的区别在于，除了符合条件的记录之外，结果集中还会保留不符合条件的记录(保留所有记录)。
```
SELECT e.empno, e.ename, e.deptno 
FROM t_emp e JOIN t_dept d 
ON e.deptno = d.deptno;
-- 14条记录
-- ......
-- 7902	FORD	20
-- 7934	MILLER	10

SELECT e.empno, e.ename, e.deptno 
FROM t_emp e LEFT JOIN t_dept d 
ON e.deptno = d.deptno;
-- 15条记录
-- .....
-- 7902	FORD	20
-- 7934	MILLER	10
-- 8000	陈浩	
```
6. 左连接与右连接
左外连接(`LEFT JOIN`)：保留左表所有数据记录，与右表做连接。如果右表没有匹配项，则使用`NULL`值进行匹配。右外连接(`RIGHT JOIN`)相反。
```
SELECT e.empno, e.ename, e.deptno 
FROM t_emp e LEFT JOIN t_dept d 
ON e.deptno = d.deptno;
-- 15条记录

SELECT e.empno, e.ename, e.deptno 
FROM t_dept d RIGHT JOIN t_emp e
ON e.deptno = d.deptno;
-- 15条记录
```
7. 外连接练习
查询每个部门的名称和人数，如果部门没有员工，员工数量为`0`。
```
-- 错误写法
SELECT d.dname, COUNT(*) 
FROM t_dept d LEFT JOIN t_emp e ON
d.deptno = e.deptno GROUP BY d.deptno;
-- ACCOUNTING	3
-- RESEARCH	5
-- SALES	6
-- OPERATIONS	1  错误结果

--正确写法
SELECT d.dname, COUNT(e.deptno) 
FROM t_dept d LEFT JOIN t_emp e ON
d.deptno = e.deptno GROUP BY d.deptno;
-- ACCOUNTING	3
-- RESEARCH	5
-- SALES	6
-- OPERATIONS	0
```
注意：员工使用`NULL`与左边的部门匹配，`COUNT(*)`计算结果为`1`。
8. `UNION`关键字可以将多个查询语句的结果集进行合并。
查询语句 `UNION` 查询语句 `UNION` ......
要求：不同查询语句的结果集的字段相同。
例如：查询每个部门的名称和人数。如果部门没有员工，员工数量为`0`。如果员工没有部门，部门名称使用`NULL`代替。
```
(SELECT d.dname, COUNT(e.deptno) 
FROM t_dept d LEFT JOIN t_emp e 
ON d.deptno = e.deptno 
GROUP BY d.deptno) 
UNION
(SELECT d.dname, COUNT(*) 
FROM t_dept d RIGHT JOIN t_emp e 
ON d.deptno = e.deptno 
GROUP BY d.deptno);
-- ACCOUNTING	3
-- RESEARCH	5
-- SALES	6
-- OPERATIONS	0
-- NULL	1
```
9. 查询每个员工的编号、姓名、部门名称、月薪、工资等级、工龄、上司编号、上司姓名、上司部门
```
SELECT 
e1.empno, 
e1.ename, 
d1.dname, 
e1.sal + IFNULL(e1.comm, 0), 
s.grade, 
DATEDIFF(NOW(),e1.hiredate) / 365,
e2.empno AS mgrempno, 
e2.ename AS mgrname, 
d2.dname AS mgrdname
FROM t_emp e1 
LEFT JOIN t_emp e2 
ON e1.mgr = e2.empno
LEFT JOIN t_dept d1 
ON e1.deptno = d1.deptno
LEFT JOIN t_salgrade s
ON e1.sal BETWEEN s.losal AND s.hisal
LEFT JOIN t_dept d2 
ON e2.deptno = d2.deptno;
```
10. 内连接只保留符合条件的记录，所以查询条件写在`ON`子句和写在`WHERE`子句中的效果是相同的。在外连接里，条件写在`ON`子句里，不符合条件的记录仍会保留；但条件写在`WHERE`子句里，不符合条件的记录会被过滤掉。
```
SELECT e.empno, e.ename, d.dname
FROM t_emp e LEFT JOIN t_dept d
ON e.deptno = d.deptno AND e.deptno = 10;
-- 15条记录
-- ......
-- 7900	JAMES	 NULL
-- 7902	FORD	 NULL

SELECT e.empno, e.ename, d.dname
FROM t_emp e LEFT JOIN t_dept d
ON e.deptno = d.deptno WHERE e.deptno = 10;
-- 3条记录
-- 7782	CLARK	ACCOUNTING
-- 7839	KING	ACCOUNTING
-- 7934	MILLER	ACCOUNTING
```
## 4.4 子查询的语法规则
1. 子查询
在查询语句中嵌套查询语句。
2. `SELECT`、`FROM`、`WHERE`子句中都可以定义子查询。但只推荐使用`FROM`子句的子查询。
`FROM`子句中的子查询，把查询结果当做一张表来使用，只执行一次，推荐使用。
`WHERE`子句和`SELECT`子句中的子查询，会执行多次，不推荐使用。
3. `WHERE`子查询
最简单，容易理解。
每输出一条记录时都要重新执行一次子查询，效率低。
例如：查询底薪超过员工平均底薪的员工信息。
```
SELECT empno, ename, sal 
FROM t_emp 
WHERE sal > (SELECT AVG(sal) FROM t_emp);
```
4. `FROM`子查询
这种子查询只会执行一次，所以执行效率很高。
例如：查询底薪超过员工平均底薪的员工信息。
```
SELECT e.empno, e.ename, e.sal 
FROM t_emp e 
JOIN (SELECT AVG(sal) avg FROM t_emp) e1
ON e.sal > e1.avg;
```
5. `SELECT`子查询
每输出一条记录时都要重新执行一次子查询，效率低。
例如：查询每个员工的姓名、部门编号、部门名称。
```
SELECT e.empno, e.ename, 
(SELECT dname FROM t_dept WHERE deptno = e.deptno) dname
FROM t_emp e;
```
6. 单行子查询与多行子查询
单行子查询的结果集只有一条记录，多行子查询的结果集有多条记录。
多行子查询只能出现在`WHERE`子句和`FROM`子句中，不能出现在`SELECT`子句中。
7. 使用子查询查找`FORD`和`MARTIN`两个人的同事
```
-- 写法1：WHERE子查询
SELECT ename 
FROM t_emp
WHERE deptno IN(SELECT deptno FROM t_emp WHERE ename IN ('FORD', 'MARTIN'))
AND ename NOT IN('FORD', 'MARTIN');

-- 写法2： FORM子查询
SELECT e1.ename FROM t_emp e1 
JOIN (SELECT deptno FROM t_emp WHERE ename IN ('FORD', 'MARTIN')) e2
ON e1.deptno = e2.deptno
AND e1.ename NOT IN('FORD', 'MARTIN');
```
8. `WHERE`子句中的多行子查询
`WHERE`子句中，可以使用`IN`、`ALL`、`ANY`、`EXISTS`来处理多行表达式结果集的条件判断。
(1) 查询比`FORD`和`MARTIN`两个人底薪都高的员工
```
SELECT ename FROM t_emp
WHERE sal > ALL(SELECT sal FROM t_emp WHERE ename IN('FORD', 'MARTIN'))
AND ename NOT IN('FORD', 'MARTIN');
```
(2) 查询比`FORD`和`MARTIN`任意一个人底薪高的员工
```
SELECT ename FROM t_emp
WHERE sal > ANY(SELECT sal FROM t_emp WHERE ename IN('FORD', 'MARTIN'))
AND ename NOT IN('FORD', 'MARTIN');
```
9. `EXISTS`关键字
`EXISTS`关键字是把原来在子查询之外的条件判断，写到了子查询的里面。
`SELECT ... FORM 表名 WHERE [NOT] EXISTS(子查询);`
例如：查询工资等级是3级或者4级的员工信息
```
-- 写法1：性能很差
SELECT ename, empno, sal FROM t_emp WHERE EXISTS(
	SELECT * FROM t_salgrade 
	WHERE sal BETWEEN losal AND hisal
	AND grade IN(3, 4)
)

-- 写法2：FORM子查询，性能好。
SELECT ename, empno 
FROM t_emp e JOIN
(SELECT losal, hisal FROM t_salgrade WHERE grade IN(3, 4)) s
ON e.sal BETWEEN s.losal AND s.hisal;
```
## 4.5 总结
1. 技能清单
掌握了汇总函数和分组统计
掌握了表连接语法，内连接和外连接
掌握了子查询的语法
掌握了子查询与表连接的转换
