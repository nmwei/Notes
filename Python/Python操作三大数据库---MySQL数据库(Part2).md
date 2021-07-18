# 1. MySQL的基本操作
## 1.1 介绍
1. 数据添加
`INSERT`语法、`INSERT`方言语法、`INSERT`子查询、`IGNORE`关键字。
2. 数据修改
`UPDATE`语法、`UPDATE`表连接
3. 数据删除
`DELETE`语法、`DELETE`表连接
## 1.2 数据插入操作
1. `INSERT`语句
`INSERT`语句可以向数据表写入记录，可以是一条记录，也可以是多条记录。
`INSERT INTO 表名(字段1,字段2, ...) VALUES(值1,值2,...);`
`INSERT INTO 表名(字段1,字段2, ...) VALUES(值1,值2,...), (值1,值2,...);`
例如：向部门表插入新的部门
```
INSERT INTO t_dept(deptno, dname, loc)
VALUES(50, "技术部", "北京");

INSERT INTO t_dept(deptno, dname, loc)
VALUES(60, "后勤部", "北京"), (70, "保安部", "北京");
```
注意：不声明字段名称也可以写入数据，不过会降低写入效率。
2.  `INSERT`插入字段可以有子查询，但子查询的结果必须是单行记录，并且子查询返回的字段必须只有一个。
例如：向技术部添加一名员工记录
```
INSERT INTO t_emp
(empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES(8081, "刘娜", "SALESMAN", 8000, "1988-12-21", 2000, NULL, 
(SELECT deptno FROM t_dept  WHERE dname = "技术部"));
```
3. `INSERT`语句方言
方言：只能在`MySQL`数据库上执行的`SQL`语法,不具备通用性。
`INSERT [INTO] 表名 SET 字段1=值1, 字段2=值2, ...;`
其中，`INTO`关键字可以省略。
```
INSERT INTO t_emp 
SET empno=8002, ename="Jake", job="SALESMAN", mgr=8000,
hiredate="1985-12-21",sal=2500,comm=NULL, deptno=50;
```
4. `IGNORE`关键字 
插入多条数据时，如果与现有的记录产生主键冲突或唯一值冲突，写入报错，导致一条记录也写不进去。使用`IGNORE`关键字会让`INSERT`忽略冲突的数据，只插入没有冲突的数据。
`INSERT [IGNORE] INTO 表名 ...;`
```
INSERT INTO t_dept(deptno, dname, loc)
VALUES(60, "A", "北京"), (80, "B", "上海");
-- 1062 - Duplicate entry '60' for key 'PRIMARY', Time: 0.012000s

INSERT IGNORE INTO t_dept(deptno, dname, loc)
VALUES(60, "A", "北京"), (80, "B", "上海");
-- Affected rows: 1, Time: 0.036000s
```
## 1.3 数据更新操作
1. `UPDATE`语句
`UPDATE [IGNORE] 表名 SET 字段1=值1, 字段2=值2,...`
`[WHERE 条件1 ...] [ORDER BY ...] [LIMIT ...];`
注意：`UPDATE`中的`LIMIT`子句只能写一个参数`LIMIT N`。不可以写`LIMIT N M`。
2. 数据更新练习
(1) 把每个员工的编号和上司的编号`+1`,使用`ORDER BY`子句完成
```
UPDATE t_emp 
SET empno=empno+1, mgr=mgr+1 
ORDER BY empno DESC;
```
注意：需要使用`ORDER BY`子句降序，否则在`+1`的时候可能发生主键冲突。
(2) 把月收入前`3`名的员工底薪减`100`元，用`LIMIT`子句完成
```
UPDATE t_emp 
SET sal = sal - 100
ORDER BY sal + IFNULL(comm,0) DESC
LIMIT 3;
```
(3) 把`10`部门中，工龄超过`20`年的员工，底薪增加`200`。
```
UPDATE t_emp 
SET sal = sal + 200
WHERE deptno = 10 AND DATEDIFF(NOW(),hiredate) / 365 > 20;
```
3. `UPDATE`语句的表连接
例如：把`ALLEN`调往`RESEARCH`部门，职务调整为`ANALYST`

(1) 相关子查询写法，效率非常低。
```
UPDATE t_emp
SET deptno = (SELECT deptno FROM t_dept WHERE dname = 'RESEARCH'),
job = 'ANALYST'
WHERE ename = 'ALLEN';
```
(2) 使用表连接来改造`UPDATE`语句
语法1：`UPDATE 表1 JOIN 表2 ON 条件 SET 字段1=值1, 字段2=值2, ...;`
语法2：`UPDATE 表1, 表2 WHERE 条件 SET 字段1=值1, 字段2=值2, ...;`
表连接的`UPDATE`语句可以修改多张表的记录。
```
UPDATE t_emp e 
JOIN t_dept d
SET e.deptno  = d.deptno, e.job = 'ANALYST', d.loc='北京'
WHERE e.ename = 'ALLEN' AND d.dname = 'RESEARCH';
```
注释：①`JOIN`表连接并没有写`ON`连接条件。②同时修改了两张表的数据。
4. 数据更新和数据删除时不推荐使用子查询的原因
(1) 子查询效率低
(2) 不允许对要更新或删除的数据做子查询
5. 把底薪低于公司平均底薪的员工，带薪增加`150`元
```
UPDATE t_emp e1 
JOIN (SELECT AVG(sal) avg FROM t_emp) s
ON e1.sal < s.avg
SET e1.sal = e1.sal + 150;
```
6. `UPDATE`语句的表连接既可以是内连接，又可以是外连接
例如：把没有部门的员工，或者`SALES`部门低于`2000`元底薪的员工，都调到`20`部门。
```
UPDATE t_emp e
LEFT JOIN t_dept d
ON e.deptno = d.deptno   
SET e.deptno = 20
WHERE e.deptno IS NULL OR (d.dname = 'SALES' AND e.sal < 2000);
```
注释：① 判断是否是`NULL`-` IS NULL`。② 如果不使用`LEFT JOIN`，则取不到没有部门的员工。
## 1.4 数据删除
1. `DELETE`语句用于删除记录
`DELETE [IGNORE] FROM 表名 [WHERE 条件1, 条件2...] [ORDER BY ...] [LIMIT ...];`
子句执行顺序：`FROM >  WHERE > ORDER BY > LIMIT > DELETE`
2. `DELETE`语句练习
(1) 删除`10`部门中，工龄超过`20`年的员工记录
```
DELETE FROM t_emp
WHERE deptno = 10 AND DATEDIFF(NOW(),hiredate) / 365 >= 20;
```
(2) 删除`20`部门中工资最高的员工记录
```
DELETE FROM t_emp 
WHERE deptno = 20 
ORDER BY sal + IFNULL(comm,0) DESC 
LIMIT 1;
```
3. `DELETE`语句的表连接
`WHERE`语句中写子查询的效率很低，我们可以使用表连接改造`DELETE`语句。
`DELETE 表1, ... FROM 表1 JOIN 表2  ON 条件` 
`[WHERE 条件1, 条件2...] [ORDER BY ...] [LIMIT ...];`
4.  `DELETE`语句表连接联系
(1) 删除`SALES`部门和该部门的全体员工记录
```
DELETE e, d FROM t_emp e JOIN t_dept d 
ON e.deptno = d.deptno
WHERE d.dname = 'SALES';
```
(2) 删除每个低于部门平均底薪的员工记录
```
DELETE e FROM t_emp e
JOIN (SELECT deptno, AVG(sal) sal FROM t_emp GROUP BY deptno) g
ON e.deptno = g.deptno
WHERE e.sal < g.sal;
```
(3) 删除员工`KING`和他直接下属的员工记录，用表连接实现
```
-- 表连接写法1
DELETE e1, e2 FROM t_emp e1 JOIN t_emp e2
ON e1.ename = 'KING' AND e1.empno = e2.mgr;

--表连接写法2
DELETE e1 FROM t_emp e1
JOIN (SELECT empno FROM t_emp WHERE ename = 'KING') e2
ON e1.mgr = e2.empno OR e1.ename = 'KING';
```
5. `DELETE`语句的表连接既可以是内连接，又可以是外连接
例如：删除`SALES`部门的员工以及没有部门的员工
```
DELETE e FROM t_emp e 
LEFT JOIN t_dept d
ON e.deptno = d.deptno
WHERE d.dname = 'SALES' OR e.deptno IS NULL;
```
6. 快速清空数据表中所有记录
`DELETE`语句是在事务机制下删除记录，删除记录之前，先把将要删除的记录保存到日志文件里，然后再删除记录。
`TRUNCATE`语句在事务机制之外删除记录，速度远超`DELETE`语句。
语法：`TRUNCATE TABLE 表名;`
```
TRUNCATE TABLE t_emp;
```
## 1.5 总结
1. 技能清单
掌握`INSERT`语法
掌握`UPDATE`语法
掌握`DELETE`语法
掌握数据更新和删除中的表连接语法
2. 知识体系
初识数据库：`MySQL`安装与使用
`DDL`阶段：管理数据库与数据表
`DML`阶段：数据的增删改查
# 2. MySQL基本函数的使用
## 2.1 介绍
1. 学习目标
(1) 数字函数
`FORMAT`、`ABS`、`MOD`、`CEIL`、`FLOOR`、`ROUND`、`EXP`...
(2) 字符函数
`UPPER`、`LOWER`、`CHAR_LRNGTH`、`CONCAT`、`INSTR`...
(3) 日期函数`&`条件函数
`NOW`、`DATE_FORMAT`、`DATE_ADD`、`DATEDIFF`、`IF`、`IFNULL`...
## 2.2 MySQL基本函数
1. `MySQL`的函数
数字函数、字符函数、日期函数、条件函数
2. 数字函数

| 函数 | 功能 | 用例 |
|:-:|:-:|:-:|
| `ABS` | 绝对值 | `ABS(-100)` |
| `ROUND` | 四舍五入 | `ROUND(4.62)` |
| `FLOOR` | 向下取整 | `FLOOR(9.9)` |
| `CEIL` | 向上取整 | `CEIL(3.2)` |
| `POWER` | 幂函数 | `POWER(2,3)` |
| `LOG` | 对数函数 | `LOG(7, 3)` |
| `LN` | 求对数函数(以`e`为底数) | `LN(10)` |
```
SELECT ABS(-100); # 100
SELECT ROUND(4.6288 * 100) / 100; # 4.6300
SELECT FLOOR(9.9); # 9
SELECT CEIL(3.2); # 4
SELECT POWER(2, 3); # 8
SELECT LOG(7, 3); # 0.5645750340535797
SELECT LN(10); # 2.302585092994046
```
| 函数 | 功能 | 用例 |
|:-:|:-:|:-:|
|` SQRT `| 开平方 |`SQRT(9)`|
|` PI `| 圆周率 |` PI() `|
|` SIN `| 正弦 |` SIN(1) `|
|` COS `| 余弦 |` COS(1) `|
|` TAN `| 正切 |` TAN(1) `|
|` COT `| 余切 |` COT(1) `|
|` RADIANS `| 角度转换弧度 |` RADIANS(30) `|
|` DEGREES `| 弧度转换角度 |` DEGREES(1) `|
```
SELECT SQRT(9); # 3
SELECT PI(); # 3.141593
SELECT SIN(RADIANS(30)); # 0.49999999999999994
SELECT COS(RADIANS(45)); # 0.7071067811865476
SELECT TAN(RADIANS(35)); # 0.7002075382097097
SELECT COT(RADIANS(45)); # 1.0000000000000002
SELECT DEGREES(1); # 57.29577951308232
```
3. 获取系统时间函数
`NOW()`- 获取当前系统日期和时间，格式为`yyyy-MM-dd hh:mm:ss` 
`CURDATE()`- 获取当前系统日期，格式为`yyyy-MM-dd` 
`CURTIME()` - 获取当前系统时间，格式为`hh:mm:ss` 
```
SELECT NOW(), CURDATE(), CURTIME();
2020-01-01 10:59:43	 2020-01-01 	10:59:43
```
4. 日期格式化函数
`DATE_FORMAT()` - 用于格式化日期

| 占位符 | 作用 | 占位符 | 作用 | 
|:-:|:-:|:-:|:-:|
| ` %Y ` | 年份 | ` %m ` | 月份 |
| ` %d ` | 日期 | ` %w ` | 星期(数字） |
| ` %W ` | 星期(名称） | ` %j ` | 本年第几天 |
| ` %U ` | 本年第几周 | ` %H ` | 小时(`24`) |
| ` %h ` | 小时(`12`) | ` %i ` | 分钟 |
| ` %s ` | 秒 | ` %r ` | 时间(`24`) |
| ` %T ` | 时间(`12)` |  |  |
```
-- 查询明天你的生日是星期几。
SELECT DATE_FORMAT('2020-04-05', '%w - %W') #0 - Sunday

-- 查询1981年上半年入职的员工有多少人
SELECT COUNT(*) FROM t_emp
WHERE DATE_FORMAT(hiredate, "%Y") = 1981
AND DATE_FORMAT(hiredate, "%m") <=6; # 5
```
 注释：数据库中支持的最小的时间单位是秒，而不是毫秒。
5. 日期偏移计算
`DATE_ADD()` - 可以实现日期偏移计算。
格式：`DATE_ADD(日期, INTERVAL 偏移量 时间单位)`
```
SELECT 
NOW(),
DATE_ADD(NOW(),INTERVAL 15 DAY) d1,
DATE_ADD(NOW(),INTERVAL -300 MINUTE) d2,
DATE_ADD(DATE_ADD(NOW(), INTERVAL -2 MONTH), INTERVAL -3 DAY) d3;
# 2020-01-01 11:31:28	2020-01-16 11:31:28	2020-01-01 06:31:28	2019-10-29 11:31:28
```
注释：在`MySQL`数据库中，两个日期不能直接加减，日期也不能与数字加减。
6. 日期差值
`DATEDIFF()` - 计算两个日期之间相差的天数。
```
SELECT DATEDIFF(NOW(),DATE_ADD(NOW(),INTERVAL -1 MONTH)); # 31
```
7. 字符函数

| 函数 | 功能 | 用例 |
|:-:|:-:|:-:|
|` LOWER `| 转换为小写 |` LOWER(ename) `|
|` UPPER `| 转换为大写 |` UPPER(ename) `|
|` LENGTH `| 字符数量 |` LENGTH(ename) `|
|` CONCAT `| 连接字符串 |` CONCAT(sal, "$") `|
|` INSTR `| 字符出现的位置 |` INSTR(ename, "A") `|
|` INSERT `| 插入/替换字符串 |` INSERT("你好", 1, 0, "先生") `|
|` REPLACE `| 替换字符 |` REPLACE("你好先生", "先生", "女士") `|
```
SELECT LOWER(ename), UPPER(ename), LENGTH(ename), 
CONCAT(sal, '$'), INSTR(ename,'A') FROM t_emp;
-- ...
-- allen	ALLEN	5	1600.00$	1

SELECT INSERT('你好', 1, 0, '先生'); # 先生你好
SELECT INSERT('你好', 1, 1, '先生'); # 先生好
SELECT REPLACE('你好先生', '先生', '女士'); # 你好女士
```
| 函数 | 功能 | 用例 |
|:-:|:-:|:-:|
| `SUNSTR` | 截取字符串 | `SUNSTR('你好世界', 3, 4)` |
| `SUNSTRING` | 截取字符串 | `SUNSTRING('你好世界', 3, 2)` |
| `LPAD` | 左侧填充字符 | `LPAD('Hello', 10, '*')` |
| `RPAD` | 右侧填充字符 | `RPAD('Hello', 10, '*')` |
| `TRIM` | 去除首尾空格 | `TRIM('    你好先生   ')` |
```
SELECT SUBSTR('你还世界',3, 4); # 世界
SELECT SUBSTRING('你好世界', 3, 2); # 世界
SELECT LPAD(SUBSTRING('12345678901',8,4),11,'*'); # *******8901
SELECT RPAD(SUBSTRING('李晓娜', 1, 1),LENGTH('李晓娜') / 3,'*'); # 李**
SELECT TRIM('    Hello World!  ') #Hello World!
```
8. 条件函数
`SQL`语句中可以利用条件函数来实现编程语言里的条件判断。
`IFNULL(表达式, 值)`
`IF(表达式, 值1, 值2)`
例如：中秋节公司员工发放礼品，`SALES`部门发放`礼品A`, 其余部门发放`礼品B`, 打印每个员工获得的礼品。
```
SELECT e.ename, d.dname,  IF(d.dname = 'SALES', '礼品A', '礼品B')
FROM t_emp e 
JOIN t_dept d 
ON e.deptno = d.deptno;
```
9. 复杂条件判断
公司年庆决定组织员工集体旅游，每个部门旅游目的地不同。`SALES`部门去`P1`地点，`ACCOUNTING`部门去`P2`地点，`RESEARCH`部门去`P3`地点，查询每名员工的旅行地点。
```
SELECT 
e.ename, d.dname,
CASE d.dname
	WHEN 'SALES' THEN 'P1'
	WHEN 'ACCOUNTING' THEN 'P2'
	WHEN 'RESEARCH' THEN 'P3'
END AS place
FROM t_emp e
JOIN t_dept d
ON e.deptno = d.deptno
```
10. 薪资调整方案
(1) `SALES`部门中工龄超过`20`年，涨`10%`。
(2) `SALES`部门中工龄不满`20`年，涨`5%`。
(3) `ACCOUNTING`部门，涨`300`。
(4) `RESEARCH`部门里低于部门平均底薪，涨`200`。
(5) 没有部门的员工，涨`100`。
```
UPDATE t_emp e LEFT JOIN t_dept d ON e.deptno = d.deptno
LEFT JOIN (SELECT deptno, AVG(sal) avg FROM t_emp GROUP BY deptno) g
ON e.deptno = g.deptno
SET e.sal = (
	CASE
	  WHEN d.dname = 'SALES' AND DATEDIFF(NOW(),e.hiredate) / 365 >= 20 THEN e.sal * 1.1
		WHEN d.dname = 'SALES' AND DATEDIFF(NOW(),e.hiredate) / 365 < 20 THEN e.sal * 1.05
		WHEN d.dname = 'ACCOUNTING' THEN e.sal + 300
		WHEN d.dname = 'RESEARCH' AND e.sal < g.avg THEN e.sal + 200
		WHEN e.deptno IS NULL THEN e.sal + 100
		ELSE e.sal
	END
);
```
## 2.3 总结
1. 技能清单
熟练运用数字函数。
熟练运用字符函数。
熟练运用日期函数。
熟练运用条件函数。
# 3. MySQL的综合应用
## 3.1 介绍
1. 数据库事务机制
`undo`和`redo`日志、开启事务、提交事务、回滚事务
2. 数据的导出和导入
`SQL`文件的导入和导出、`TXT`文档的导入与导出
3. 综合案例：设计数据表
设计新闻管理系统的数据表。
## 3.2 MySQL数据库的事务机制
1. 事务概念
`SQL`语句直接操作数据文件是很危险的。
`MySQL`有`5`种日志，其中`redo`日志和`undo`地址与事务有关。
![image.png](https://upload-images.jianshu.io/upload_images/4989175-753684dc3be87f3f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/860)
2. 事务机制(`Transaction`)
`RDBMS`(关系数据库) = `SQL`语句 + 事务(`ACID`)
事务是一个或者多个`SQL`语句组成的整体，要么全部执行成功，要么全部执行失败。
3. 管理事务
默认情况下，`MySQL`执行每条`SQL`语句都会自动开启和提交事务。
我们可以手动管理事务，让多条`SQL`语句纳入到一个事务之中。
```
START TRANSACTION;
SQL语句
[COMMIT | ROLLBACK];
```
```
START TRANSACTION;
DELETE FROM t_emp;
DELETE FROM t_dept;
SELECT COUNT(*) FROM t_emp; # 0
SELECT COUNT(*) FROM t_dept; # 0
COMMIT;
-- ROLLBACK;
```
注意：`COMMIT`语句执行之前虽然查到的数据集合数目为`0`。但此时是在`redo`文件中查到的结果，真实数据库里数据还没有被删除，直到执行`COMMIT`语句。
4. 事务的`ACID`属性
(1) 原子性 
一个事务中的所有操作要么全部完成，要么全部失败。事务执行后，不允许停留在中间某个状态。
(2) 一致性
不管在任何给定的时间、并发事务有多少，事务必须保证运行结果的一致性。
(3) 隔离性
隔离性要求事务不受其他并发事务的影响，如同在给定的时间内，该事务是数据库唯一运行的事务。
例如：默认情况下，`A`事务只能看到日志中该事务的相关数据。
(4) 持久性
事务一旦提交，结果便是永久性的。即便发生宕机，仍然可以依靠事务日志完成数据的持久化。
5. 事务的四个隔离级别

| 序号 | 隔离级别 | 功能 |
|:--:|:--:|:--:|
|`1`| `read uncommitted` | 读取未提交数据 |
|`2`| `read committed` | 读取已提交数据 |
|`3`| `repeatable read` | 重复读取 |
|`4`| `serializable` | 序列化 |
注释：默认隔离级别为`repeatable read`。
6. 买票事务案例
![image.png](https://upload-images.jianshu.io/upload_images/4989175-b0a6fffa9d30c05b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
-- 查询面板1 
START TRANSACTION;
UPDATE t_emp SET sal = 1;
```
```
-- 查询面板2
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
-- 设置当前会话事务隔离级别：允许读取其他事务未提交数据。
START TRANSACTION;
SELECT empno, ename, sal FROM t_emp;
COMMIT;
-- 7369	SMITH	1.00
-- 7499	ALLEN	1.00
-- 7521	WARD	1.00
```
注释：①一个查询面板就是一个`SESSION`会话。②`isolation`隔离。
7. 转账事务案例
![image.png](https://upload-images.jianshu.io/upload_images/4989175-e19ad55a43b756b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
-- 查询面板1
START TRANSACTION;
UPDATE t_emp SET sal = 1;
```
```
-- 查询面板2
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
-- 设置当前会话事务隔离级别：允许读取其他事务已提交数据
START TRANSACTION;
SELECT empno, ename, sal FROM t_emp;
COMMIT;
-- 7369	SMITH	800.00
-- 7499	ALLEN	1600.00
-- 7521	WARD	1250.00
```
8. 购物案例
![image.png](https://upload-images.jianshu.io/upload_images/4989175-b5baafa4f89b2616.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
`REPEATABLE READ`代表事务在执行中反复读取数据，得到的结果是一致的，不受其他事务的影响。
```
-- 查询面板1
START TRANSACTION;
UPDATE t_emp SET sal = 1;
COMMIT;
```
```
--查询面板2
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
SELECT empno, ename, sal FROM t_emp;
COMMIT;
```
注意：事务执行`SELECT`语句之后，数据才会保存到`undo`日志，之后的查询结果才不受其他事务对数据的修改影响。
9. 事务的序列化
由于事务并发执行所带来的的各种问题，前三种隔离级别只适用于某些业务场景中。序列化隔离，让事务逐一执行，就不会产生上述问题了。
该隔离级别牺牲了事务的并发性，很少使用。
```
-- 查询面板1
START TRANSACTION;
UPDATE t_emp SET sal = 1;
COMMIT;
```
```
--查询面板2
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION;
SELECT empno, ename, sal FROM t_emp;
COMMIT;
```
## 3.3 数据的持久化
1. 数据导出与备份的区别
数据导出：导出的只是数据文件。
数据备份：备份的是数据文件、日志文件、索引文件等。
2. 数据导出分类
`SQL`文件、文本文件
3. 导出`SQL`文件

(1) 命令行语法
`mysqldump -uroot -p [no-data] 逻辑库 > 路径`
```
➜  ~ mysqldump -uroot -p demo > /Users/nimengwei/downloads/demo.sql 
Enter password: 
➜  ~ 
```
(2) 图形化界面
![image.png](https://upload-images.jianshu.io/upload_images/4989175-4645b632821214ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

注释：当数据导出为`SQL`文件时，`MySQL`会生成可以创建这些数据的`SQL`语句，效率低。
4. 导入`SQL`文件

(1) 命令行语法
`USE demo;`
`SOURCE demo.sql;`
```
➜  ~ cd /Users/nimengwei/Downloads/sql_file 
➜  sql_file mysql -uroot -p
Enter password: 
mysql> USE demo;
Database changed
mysql> SOURCE demo.sql;
Query OK, 0 rows affected (0.00 sec)
mysql> 
```
(2) 图形化界面
![image.png](https://upload-images.jianshu.io/upload_images/4989175-6371649fa676fabc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
5. 图形化界面导出为文本文件

(1) 导出数据结构

![image.png](https://upload-images.jianshu.io/upload_images/4989175-a400da4f3965d1c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(2) 导出向导(数据)

![image.png](https://upload-images.jianshu.io/upload_images/4989175-290f6f10e2f9cafd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

注释：当数据导出为文本文件时，由于文本文件中没有`SQL`语句，`MySQL`导出时不执行词法分析和语法优化，效率高。
6. 图形化界面导入文本文件

(1) 导入数据结构
![image.png](https://upload-images.jianshu.io/upload_images/4989175-2539f4cc806c34e8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(2) 导入向导(数据)
![导入向导](https://upload-images.jianshu.io/upload_images/4989175-973f4246d804e618.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![设置数据起始行数](https://upload-images.jianshu.io/upload_images/4989175-5c80246c7cb0be6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![映射字段](https://upload-images.jianshu.io/upload_images/4989175-2b326f7942d1196e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 3.4 综合案例：新闻管理系统数据库设计
1. 新闻管理系统成员
![image.png](https://upload-images.jianshu.io/upload_images/4989175-2882388e470201b7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 新闻有哪些属性
![image.png](https://upload-images.jianshu.io/upload_images/4989175-6db246b11160e6e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 数据库`ER`图设计
![image.png](https://upload-images.jianshu.io/upload_images/4989175-5da8c1803d804712.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 数据加密
(1) 数据加密
分类：对称加密、非对称加密
(2) 对称加密
加密和解密使用同一个秘钥。
分类：`DES`加密(已淘汰)、`AES`加密
(3) 非对称加密
加密和解密使用不同的秘钥。
公钥可以解密私钥加密的数据，私钥可以解密公钥加密的数据。
分类：`RSA`加密、`DSA`加密、`ECC`加密
5. `AES`加密函数
`MySQL`提供了`AES`加密和解密的函数。
`AES_ENCRYPT(原始数据, 秘钥字符串);`
`AES`解密要使用与加密相同的秘钥，才能解密出原始数据。
`AES_DECRYPT(加密结果, 秘钥字符串);`
```
SELECT AES_ENCRYPT('你好世界','ABC123456');
# èZKaB§7^SÀT\­Hî 乱码了，可转化为16进制解决乱码
SELECT HEX(AES_ENCRYPT('你好世界','ABC123456')); 
# hex为2二进制转16进制
# E85A104B6142A7375E53C0545CAD48EE
SELECT AES_DECRYPT(UNHEX('E85A104B6142A7375E53C0545CAD48EE'), 'ABC123456') 
# unhex为16进制转2进制
# 你好世界
```
6. 数据库实现

(1) 创建数据库
```
# 创建vega数据库
CREATE DATABASE vega;
# 切换数据库
USE vega;
```
(2) `t_type`文章类型表
数据表中数据量不大时，可以不添加索引。例如：`t_type`文章类型表，`t_role`角色类型表。
```
# 创建文章类型表
CREATE TABLE t_type(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	type VARCHAR(20) NOT NULL UNIQUE
);

# 文章类型表插入数据
INSERT INTO t_type(type) 
VALUES("要闻"), ("体育"), ("科技"), ("娱乐"), ("历史");
```
(3) `t_role`角色类型表
```
# 创建角色类型表
CREATE TABLE t_role(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	role VARCHAR(20) NOT NULL UNIQUE
);

# 角色类型表插入数据
INSERT INTO t_role(role)
VALUES("管理员"), ("新闻编辑");
```
(4) `t_user`用户表
数据表中数据量很大，并且经常使用某些字段查找数据，则应该对这些字段创建索引。例如：`t_user`表中的`username`。
```
# 创建用户表
CREATE TABLE t_user(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(20) NOT NULL UNIQUE,
	password VARCHAR(500) NOT NULL,
	email VARCHAR(100) NOT NULL,
	role_id INT UNSIGNED NOT NULL,
	INDEX(username)
);

# 用户表插入数据
INSERT IGNORE INTO t_user(username, password, email, role_id) VALUES
('admin', HEX(AES_ENCRYPT('123456','HelloWord')), 'admin@163.com', 1),
('scott', HEX(AES_ENCRYPT('123456','HelloWord')), 'scott@163.com', 2);
```
(5) `t_news`新闻表
新闻内容数据的特点为：数据量大、安全级别低，适合存储在`mongodb`数据库中。通过`content_id`查找。
```
# 创建新闻表
CREATE TABLE t_news(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(40) NOT NULL,
	editor_id INT UNSIGNED NOT NULL,
	type_id INT UNSIGNED NOT NULL,
	content_id VARCHAR(24) NOT NULL,
	is_top TINYINT UNSIGNED NOT NULL,
	create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	state ENUM('草稿', '待审批', '已审批', '隐藏') NOT NULL,
	INDEX(editor_id),
	INDEX(type_id),
	INDEX(state),
	INDEX(is_top),
	INDEX(create_time)
);
```
## 3.5 总结
1. 技能清单
学习了事务机制的原理和特性。
掌握了事务的管理。
掌握了数据导出与导入的操作。
完成了新闻管理系统数据表的设计。
# 4. MySQL与Python交互
## 4.1 介绍
1. `MySQL Connector`模块
数据库连接池、预编译`SQL`、`CRUD`操作、事务管理、异常处理
2. 新闻管理系统
新闻管理、用户管理、系统登录、数据分页等
## 4.2 MySQL与Python的交互
1. `MySQL Connector`模块
`MySQL Connector`是`MySQL`官方的驱动模块，兼容性特别好。
```
➜  ~ pip3 install mysql-connector
...
Successfully installed mysql-connector-2.2.9
```
2. 创建连接

(1) 语法一
```
import mysql.connector
con = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password="299***",
    database="demo"
)

con.close()
```
(2) 语法二
```
import mysql.connector

config = {
    "host":"localhost",
    "port": 3306,
    "user": "root",
    "password": "299***",
    "database": "demo"
}

con = mysql.connector.connect(**config)

con.close()
```
3. 游标(`Cursor`)
`MySQL Connector`里的游标用来执行`SQL`语句，查询的结果集也会保存在游标中。
```
cursor = con.cursor()
cursor.execute(sql语句)
```
```
import mysql.connector

con = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password="299***",
    database="demo"
)

cursor = con.cursor()
sql = "SELECT empno, ename, hiredate FROM t_emp;"
cursor.execute(sql)
for item in cursor:
    print(item[0], item[1], item[2])
# 7369 SMITH 1980-12-17
# 7499 ALLEN 1981-02-20
# ...

con.close()
```
4. `SQL`注入攻击
```
import mysql.connector

config = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "299***",
    "database": "vega"
}

# 连接数据库
con = mysql.connector.connect(**config)

# 获取游标
cursor = con.cursor()
username = "1 OR 1=1"
password = "1 OR 1=1"
sql = "SELECT COUNT(*) FROM t_user WHERE username=%s" \
    " AND AES_DECRYPT(UNHEX(password), 'HelloWord')=%s;"

cursor.execute(sql%(username, password))
print(cursor.fetchone()[0])  # 2
# 关闭数据库连接
con.close()
```
注意：密码必须是字符串格式。
5. `SQL`注入攻击的危害
由于`SQL`语句是解释型语言，所以在拼接`SQL`语句的时候，容易被注入恶意的`SQL`语句。
```
id = "1 OR 1=1"
sql = "DELETE FROM t_news WHERE id={}".format(id)
```
6. `SQL`预编译机制
(1) `SQL`预编译机制
预编译`SQL`就是数据库提前把`SQL`语句编译成二进制，这样反复执行同一条`SQL`语句的效率就会提升。
(2) 抵御注入攻击
`SQL`语句编译的过程中，关键字已经被解析过了，所以向编译后的`SQL`语句传入参数，参数都被当做字符串处理，数据库不会解析其中注入的`SQL`语句。
注释：预编译机制既可以提升`SQL`语句的执行效率，又可以抵御注入攻击。
7. 抵御注入攻击
```
import mysql.connector

config = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "299***",
    "database": "vega"
}

# 连接数据库
con = mysql.connector.connect(**config)

# 获取游标
cursor = con.cursor()
username = "1 OR 1=1"
password = "1 OR 1=1"
sql = "SELECT COUNT(*) FROM t_user WHERE username=%s" \
    " AND AES_DECRYPT(UNHEX(password), 'HelloWord')=%s;"

cursor.execute(sql, (username, password))
print(cursor.fetchone()[0])  # 0
# 关闭数据库连接
con.close()
```
注意：`execute`的第二个参数为元组或数组，例如: `[a]`、`(a,)`。
8. 事务控制
```
con.start_transaction([事务隔离机制])
con.commit()
con.rollback()
```
9. 异常处理

(1) 语法
```
try:
    con = mysql.connector.connect(...)
    [ con.start_transaction() ]
    ...
    con.commit()
except Exception as e:
    [ con.rollback() ]
    print(e)
finally:
    if "con" in dir():
        con.close()
```
(2) 示例
```
import mysql.connector

try:
    con = mysql.connector.connect(
        host='localhost',
        port=3306,
        user='root',
        password='299***',
        database='demo'
    )
    con.start_transaction()
    cursor = con.cursor()
    sql = "INSERT INTO t_emp(empno,ename,job,mgr,hiredate,sal,comm,deptno) " \
          "VALUES(%s, %s, %s, %s, %s, %s, %s, %s);"
    cursor.execute(sql, (9600, '赵娜', 'SALESMAN', None,'1998-09-08', 2000, None, 10))
    con.commit()
except Exception as e:
    if 'con' in dir():
        con.rollback()
    print(e)
finally:
    if 'con' in dir():
        con.close()
```
10. 数据库连接池技术
数据库连接是一种关键的、有限的、昂贵的资源，在并发执行的应用程序中体现的尤为突出。`TCP`连接需要三次握手，四次挥手，然后数据库还要验证用户信息。
数据库连接池(`ConnectionPool`)预先创建出一些数据库连接，然后缓存起来，避免了程序语言反复创建和销毁连接的昂贵代价。
```
import mysql.connector.pooling

config = {
    'host': 'localhost',
    'port': '3306',
    'user': 'root',
    'password': '299***',
    'database': 'demo'
}

try:
    pool = mysql.connector.pooling.MySQLConnectionPool(
        **config,
        pool_size=10
    )
    con = pool.get_connection()
    con.start_transaction()
    cursor = con.cursor()
    sql = "UPDATE t_emp SET sal=sal+%s WHERE deptno=%s;"
    cursor.execute(sql, (200, 20))
    con.commit()
except Exception as e:
    if "con" in dir():
        con.rollback()
    print(e)
finally:
    if "con" in dir():
        con.close()
```
注意：使用数据库连接池(`ConnectionPool`)也需要关闭(`close`)。
11. 删除数据

(1) `DELETE`语句删除记录 
```
import mysql.connector.pooling

config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': '299***',
    'database': 'demo'
}

try:
    pool = mysql.connector.pooling.MySQLConnectionPool(
        **config,
        pool_size=10
    )
    con = pool.get_connection()
    con.start_transaction()
    cursor = con.cursor()
    sql = "DELETE e, d FROM t_emp e JOIN t_dept d ON e.deptno=d.deptno " \
          "WHERE d.deptno=20;"
    cursor.execute(sql)
    con.commit()
except Exception as e:
    if 'con' in dir():
        con.rollback()
    print(e)
finally:
    if "con" in dir():
        con.close()
```
(2) `TRUNCATE`语句快速删除记录
`TRUNCATE`语句是在事务机制之外删除记录。
```
import mysql.connector.pooling

config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': '299***',
    'database': 'demo'
}

try:
    pool = mysql.connector.pooling.MySQLConnectionPool(
        **config,
        pool_size=10
    )
    con = pool.get_connection()
    cursor = con.cursor()
    sql = "TRUNCATE TABLE t_emp"
    cursor.execute(sql)
except Exception as e:
    print(e)
```
12. 循环执行`SQL`语句

(1) `for`循环执行`execute()`函数
```
import mysql.connector.pooling

config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': '299***',
    'database': 'demo'
}

try:
    pool = mysql.connector.pooling.MySQLConnectionPool(
        **config,
        pool_size=10
    )
    con = pool.get_connection()
    con.start_transaction()
    cursor = con.cursor()
    sql = "INSERT INTO t_dept(deptno, dname, loc) VALUES (%s, %s, %s);"
    data = [[50, '部门1', '北京'], [60, '部门2', '上海']]
    for item in data:
        cursor.execute(sql, item)
    con.commit()
except Exception as e:
    if 'con' in dir():
        con.rollback()
    print(e)
finally:
    if "con" in dir():
        con.close()
```
(2) 游标(`cursor`)对象中的`executemany()`函数可以反复执行一条`SQL`语句。
```
import mysql.connector.pooling

config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': '299***',
    'database': 'demo'
}

try:
    pool = mysql.connector.pooling.MySQLConnectionPool(
        **config,
        pool_size=10
    )
    con = pool.get_connection()
    con.start_transaction()
    cursor = con.cursor()
    sql = "INSERT INTO t_dept(deptno, dname, loc) VALUES (%s, %s, %s);"
    data = [[70, '部门1', '北京'], [80, '部门2', '上海']]
    cursor.executemany(sql, data)
    con.commit()
except Exception as e:
    if 'con' in dir():
        con.rollback()
    print(e)
finally:
    if "con" in dir():
        con.close()
```
13. 使用`INSERT`语句，把部门平均底薪超过公司平均底薪这样的部门里的员工信息导入到`t_emp_new`表里，并且让这些员工隶属于`sales`部门。
编程语言中，数据库查询结果可以通过变量保存，比直接通过`SQL`语句操作数据库的写法简单。
```
import mysql.connector.pooling

config = {
    'host': 'localhost',
    'port': '3306',
    'user': 'root',
    'password': '299***',
    'database': 'demo'
}

try:
    pool = mysql.connector.pooling.MySQLConnectionPool(
        **config,
        pool_size=10
    )
    con = pool.get_connection()
    con.start_transaction()
    cursor = con.cursor()
    # 创建数据表
    sql = "CREATE TABLE t_emp_new LIKE t_emp;"
    cursor.execute(sql)
    # 公司平均底薪
    sql = "SELECT AVG(sal) as avg FROM t_emp;"
    cursor.execute(sql)
    avg = cursor.fetchone()[0]
    # print(avg) # 2073.214286
    # 部门底薪超过公司平均底薪的部门
    sql = "SELECT deptno FROM t_emp GROUP BY deptno HAVING AVG(sal) >= %s;"
    cursor.execute(sql, (avg,))
    deptnos = cursor.fetchall()
    # print(deptnos) # [(10,), (20,)]
    # 符合条件的部门员工导入到新表
    deptnos_str = '('
    for index in range(len(deptnos)):
        if index == len(deptnos) - 1:
            deptnos_str += (str(deptnos[index][0]))
        else:
            deptnos_str += (str(deptnos[index][0]) + ',')
    deptnos_str += ')'
    sql = "INSERT INTO t_emp_new (SELECT * FROM t_emp WHERE deptno IN {});".format(deptnos_str)
    cursor.execute(sql)
    sql = "DELETE FROM t_emp WHERE deptno IN {};".format(deptnos_str)
    cursor.execute(sql)
    # 将t_emp_new表的员工部门修改为sales部门
    sql = "SELECT deptno FROM t_dept WHERE dname=%s;"
    cursor.execute(sql, ['SALES'])
    new_emptno = cursor.fetchone()[0]
    print(new_emptno)
    sql = "UPDATE t_emp_new SET deptno=%s"
    cursor.execute(sql, [new_emptno])
    con.commit()
except Exception as e:
    if 'con' in dir():
        con.rollback()
    print(e)
finally:
    if "con" in dir():
        con.close()
```
注意：① `'CREATE TABLE t_emp_new LIKE t_emp;'`表示使用`t_emp`表的结构创建`t_emp_new`表。② `CREATE TABLE`语句为`DDL`语句，不受事务控制。③ 由于不知道符合条件的部门个数，因此该案例只能使用字符串拼接，不能使用字符串格式化。 ④ `INSERT INTO t_emp_new 查询出的表结果;`语法可以将查询出的数据表集合插入到`t_emp_new`表中。
14. 编写一个`INSERT`语句，向部门表插入两条记录，每条记录都在部门原有最大主键值的基础上加`10`。

(1) 不支持边插入，边查询本表数据
例如：`INSERT INTO 表名(字段1,字段2, ...) VALUES(值1,值2,...);`
```
INSERT INTO t_dept(deptno, dname, loc) 
VALUES((SELECT MAX(deotno) FROM t_dept) + 10, "A部门", "南京");
# 报错 Unknown column 'deotno' in 'field list', Time: 0.014000s
```
(2) 可以先查询出数据表，再写入
例如：`INSERT INTO 表名 数据集;`
```
INSERT INTO t_dept (SELECT MAX(deptno) + 10, "A部门", "南京" FROM t_dept);
```
```
INSERT INTO t_dept (SELECT MAX(deptno) + 10, "A部门", "南京" FROM t_dept) UNION 
(SELECT MAX(deptno) + 20, "B部门", "上海" FROM t_dept);
```
(3) `Python`语言实现
```
import mysql.connector.pooling

config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': '299***',
    'database': 'demo'
}

try:
    pool = mysql.connector.pooling.MySQLConnectionPool(
        **config,
        pool_size=10
    )
    con = pool.get_connection()
    con.start_transaction()
    cursor = con.cursor()
    sql = "INSERT INTO t_dept " \
          "(SELECT MAX(deptno) + 10, %s, %s FROM t_dept) " \
          "UNION " \
          "(SELECT MAX(deptno) + 20, %s, %s FROM t_dept);"
    cursor.execute(sql, ('A部门', '北京', 'B部门', '上海'))
    con.commit()
except Exception as e:
    if 'con' in dir():
        con.rollback()
    print(e)
finally:
    if "con" in dir():
        con.close()
```
## 4.3 总结
1. 技能清单
掌握了数据库连接池技术
掌握了`Python`程序的`CRUD`操作
掌握了用预编译`SQL`抵御`SQL`注入攻击
# 5. 开发新闻管理系统
1. 第三方模块
(1) 升级`pip`
`➜  ~ python3 -m pip install --upgrade pip`
(2) 安装`colorama`
`➜  ~ pip3 install colorama`
向控制台输出彩色文字
```
from colorama import Back, Fore, Style

print(Fore.LIGHTBLUE_EX, 'HelloWord')  # 设置字体颜色
print('HelloWord')
print(Back.LIGHTRED_EX, 'HelloWord')  # 设置背景色
print('HelloWord')
print(Style.RESET_ALL, 'HelloWord')  # 重置样式
```
2. 项目介绍

(1) 新建项目 
![image.png](https://upload-images.jianshu.io/upload_images/4989175-da315e2e69c22f49.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(2) 项目结构
`vega` - `db`、`service`、`app.py`
(3) 管理员身份操作流程图
![流程图](https://upload-images.jianshu.io/upload_images/4989175-3cea58d301d04e54.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 代码地址
[https://github.com/nmwei/database-vega](https://github.com/nmwei/database-vega)
4. 代码示例(部分)
(1) `mysql_db`提供数据库连接池
```
import mysql.connector.pooling

__config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': '299792',
    'database': 'vega'
}

try:
    pool = mysql.connector.pooling.MySQLConnectionPool(
        **__config,
        pool_size=10
    )
except Exception as e:
    print(e)
```
(2) `dao`文件用来操作数据库，以`user_dao.py`为例。
```
from db.mysql_db import pool

class UserDao:
    # 验证用户登录
    def login(self, username, password):
        try:
            con = pool.get_connection()
            cursor = con.cursor()
            sql = "SELECT COUNT(*) FROM t_user WHERE username=%s AND " \
                "AES_DECRYPT(UNHEX(password), 'HelloWord')=%s;"
            cursor.execute(sql, (username, password))
            count = cursor.fetchone()[0]
            # Python中的三元运算符
            return True if count == 1 else False
        except Exception as e:
            print(e)
        finally:
            if "con" in dir():
                con.close()
...
```

(3) `service`文件用来调用`dao`函数，并处理业务逻辑。以`user_service.py`为例。
```
from db.user_dao import UserDao


class UserService:
    __user_dao = UserDao()

    # 验证用户登录
    def login(self, username, password):
        return self.__user_dao.login(username, password)
...
```
(4) `app.py`程序入口
```
from colorama import Fore, Style
from getpass import getpass
from service.user_service import UserService
from service.news_service import NewsService
from service.role_service import RoleService
import os
import sys
import time

__user_service = UserService()
__news_service = NewsService()
__role_service = RoleService()

while True:  # 轮询操作
    os.system('clear')  # 如果是window系统，使用cls
    print(Fore.LIGHTBLUE_EX, '\n\t=================')
    print(Fore.LIGHTBLUE_EX, '\n\t欢迎使用新闻管理系统')
    print(Fore.LIGHTBLUE_EX, '\n\t=================')
    print(Fore.LIGHTGREEN_EX, '\n\t1. 登录系统')
    print(Fore.LIGHTGREEN_EX, '\n\t2. 退出系统')
    print(Style.RESET_ALL)  # 重置样式
    opt = input("\n\t请输入操作编号: ")
    if opt == '1':
        username = input('\n\t用户名: ')
        password = getpass('\n\t密码: ')  # 使输密码过程不可见
        result = __user_service.login(username, password)
        # 登录成功
...
```
注意：①`Python`中的三元运算符：`True if count == 1 else False`。②数据库中管理员用户名密码为：`admin` `123456`。
