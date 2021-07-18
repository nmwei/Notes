# 1. Python概述
## 1.1 介绍
1. 步骤介绍 
`Python`初识；变量和字符串；流程控制语句；
运算符；可变类型的数据集合；非可变类型的数据集合。
## 1.2 Python介绍
1. 编程语言发展史
第一代：机器语言。
第二代：汇编语言。
第三代：编程语言。
2. `Python`的由来
“人生苦短，我用`Python`”—— 吉多·范罗苏姆（`Guido van Rossum`）
3. `Python`的版本
`Python`的主要版本：`Python 2`与`Python 3`
`Python 3`目前最新版本：`3.7`
`Python 2`已经停止更新，`2020`年退出历史舞台。
4. `Python`的设计目标
简单优雅的语言，像自然语言一样容易理解。
`Python`是开源的，全世界程序员都在为之添砖加瓦。
`Python`适用于短平快的日常任务。
5. `Python`的特点
`Python`是完全面向对象的语言。
`Python`拥有强大的标准库，代码量极少。
`Python`拥有海量的第三方模块。
6. `Python`的优缺点
优点：简单、易学；免费、开源；丰富的库、可扩展性。
缺点：运行速度慢；国内刚刚起步；中文资料匮乏。
7. `Python`是最好的大数据、人工智能语言。
8. 解释型语言
解释器是将代码转换为机器语言的程序。
使用解释器运行的语言也称为“解释型语言”。
`Python`是一门解释型语言。
9. 程序的执行原理
![image.png](https://upload-images.jianshu.io/upload_images/4989175-11fc0127c54b9c01.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
10. 解释器的执行流程
![image.png](https://upload-images.jianshu.io/upload_images/4989175-e366d45118b8ea78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 1.3 开发环境配置
1. `Python`官网
[https://www.python.org/](https://www.python.org/)
2. 使用`Homebrew`安装`Python`
(1) `Python2`和`Python3`可以同时存在。
(2) 查看程序安装位置
`which python3`
```
➜  ~ python --version
Python 2.7.15
➜  ~ python3 --version
zsh: command not found: python3
➜  ~ brew install python3
Updating Homebrew...
➜  ~ python3 --version
Python 3.7.1
➜  ~ which python
/usr/local/bin/python
➜  ~ which python3
/usr/local/bin/python3
```
3. 安装编辑器——`PyCharm`
[http://www.jetbrains.com/](http://www.jetbrains.com/)
4. 第一个`Python`程序
![image.png](https://upload-images.jianshu.io/upload_images/4989175-c741495aaa89190a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 2. Python变量和字符串
## 2.1 介绍
1. 课时介绍
`print()`函数；变量的定义与使用；
字符串介绍；字符串常用函数应用。
2. 目标
理解函数的用途；掌握变量的创建与使用；掌握字符串的操作技巧。
## 2.2 函数与注释
1. `print()`函数
用于向控制台输出字符串。
```
print('hello python!')
print(123) //数字
print("hello\nworld!") //换行
```
2. 注释
`#`单行注释
`"""`块注释`"""`或`'''`块注释`'''`
```
# 单行注释
"""
块注释
"""
'''
块注释
'''
```
## 2.3 变量
1. 定义变量
变量名 = 值
```
name = "张三" #字符串
age = 18 #整数
pi = 3.14 #浮点数
is_weekend = True #布尔型数据: True和False
print(name, age, pi, is_weekend)
```
2. 变量的命名要求
(1) 只能包含字母、数字与下划线
(2) 不能数字开头。
(3) 不能与`Python`关键字重名。
建议：多个单词之间使用下划线连接。
3. 变量的数据类型
变量在赋值时会自动判断数据的类型。
四种数据类型：字符串、整数、浮点数、布尔型。
4. `type`函数
用于得到变量的数据类型：`type(变量)`
输出：`str | int | float | bool`
```
print(type("2"))    #<class 'str'>
print(type(2))      #<class 'int'>
print(type(2.0))    #<class 'float'>
print(type(False))  #<class 'bool'>
```
5. 基本运算符
加(`+`)、减(`-`)、乘(`*`)、除(`/`)、除法取整(`//`)、除法取余(`%`)、幂(`**`)
```
m = 10
n = 5
# 变量m的值加3，n的值加5
m = m + 3
n = n + 5
# 求m和n的平均值
averageResult = (m + n) / 2
# 求m的平方乘以n的平方
productResult = (m ** 2) * (n ** 2)
# 根据效果图进行输出averageResult、productResult
print("m和n的平均值:", averageResult)
# m和n的平均值: 11.5
print("m的平方乘以n的平方值:", productResult)
# m的平方乘以n的平方值: 16900
print("m和n的平均值:" + str(averageResult))
# m和n的平均值:11.5
print("m和n的平均值:" + averageResult) 
#TypeError: can only concatenate str (not "float") to str
```
6. 接收用户收入
`input()` 函数接收一个标准输入数据，返回的数据类型为`str`字符串类型。
语法：变量 = `input("提示信息")`
```
name = input("请输入您的姓名: ")
mobile = input("请输入您的手机号: ")
print(name, mobile)
print(type(mobile)) 

'''
请输入您的姓名: drew
请输入您的手机号: 110
drew 110
<class 'str'>
'''
```
7. 字符串和数字相互转化
(1) 字符串→数字：`int(字符串)`、`float(字符串)`
(2) 数字→字符串：`str(数字)`
```
number = input("请输入数字: ") #请输入数字: 3
print(int(number) * 2) #6
print(float(number) / 2) #1.5
print(int(1.8)) #1
print(int("1.5")) #invalid literal for int() with base 10: '1.5'
```
通过`input()`函数输入的数字，需要将其转换为数字才可以进行数值上的加减操作。
## 2.4 字符串
1. 字符串介绍
字符串就是一系列字符的组合。
`Python`中字符串可以使用单引号，也可以使用双引号。
2. 字符串拼接
```
str1 = "双引号"
str2 = '单引号'
str3 = 'He say "hello"'
str4 = "He's name is andy."
print(str1 + str2 + str(123)) #双引号单引号123
print(str3) #He say "hello"
print(str4) #He's name is andy.
```
3. 字符串大小写转换
(1) `str.lower()` 转换为小写
(2) `str.upper()` 转换为大写
(3) `str.capitalize()` 首字母大写
(4) `str.title()` 每个单词首字母大写
(5) `str.swapcase()` 大小写互换
```
print('bmw'.upper()) #BMW
print('BMW'.lower()) #bmw
print('how are you?'.capitalize()) #How are you?
print('hello python'.title()) #Hello Python
print('bMw'.swapcase()) #BmW
```
4. 字符串格式化
语法：`str.format()`
```
str1 = "{} {} you.".format("I", "love")
print(str1) #I love you.
str2 = "{2}.{1}.{0}".format("com", "imooc", "www")
print(str2) #www.imooc.com
str3 = "{s3}.{s2}.{s1}:{d1}".format(s1 = "com", s2 = "imooc", s3 = "www", d1 = 8081)
print(str3) #www.imooc.com:8081
```
注意：匹配项可以不是字符串。
5. 数字格式化
语法：`format(数字, 格式)`
```
num = 12345.6789
# 保留两位小数
str1 = format(num, '0.2f'); #f表示浮点数
print(str1) #12345.68
print(type(str1)) #<class 'str'>

#货币,分割
print(format(num, ",")) #12,345.6789
print(format(num, "0,.3f")) #12,345.679
account = "001"
print("请您向{}账户转账￥{:0,.3f}".format(account, num))
#请您向001账户转账￥12,345.679
```
注意：在字符串格式化输出时，如需要对匹配的数字进行格式化，则需要在`{}`内增加`:`前缀，前缀后写上数字格式化语句。
6. 早期的格式化输出
早期字符串格式化使用`%s`(字符串)、`%d`(整数)、`%f`(浮点数)来格式化字符串。
```
print("He is %d years old."%(25))  #He is 25 years old.
print("我叫%s, 今年%d岁, 体重%.1f公斤。"%("小明", 26, 70))  #我叫小明, 今年26岁, 体重70.0公斤。
```
7. 制表符与换行符
制表符是指增加字符的缩进，在字符串中使用`\t`。
换行符是指为字符串换行输出，在字符串中使用`\n`。
```
print("姓名\t性别\t年龄\n张三\t男\t26")
#姓名	性别	年龄
#张三	男	26
```
8. 删除空白
`str.lstrip()` 删除左侧空白。
`str.rstrip()` 删除右侧空白。
`str.strip()` 删除两侧空白。
```
str = " python   "
print(str, len(str)) #python    10
print(str.lstrip(), len(str.lstrip())) #python    9
print(str.rstrip(), len(str.rstrip())) # python 7
print(str.strip(), len(str.strip())) #python 6
print("aaaaaPythonaaaaa".strip("a")) #Python
```
9. 查找字符串
语法：`字符串.find(目标字符串, 开始位置, 结束位置)`
获取子字符串出现的位置。
语法：`目标字符串 in 字符串`
```
str = "Nice to meet you, i need your help!"
print(str.find("ee")) #9
print(str.find("ee", 10)) #21

is_exist = "ee" in str
print(is_exist) #True
```
10. 字符串替换
语法：`字符串.replace(原始字符串, 目标字符串, 替换次数)`
```
str = "abbcccdddd"
print(str.replace("c", "C")) #abbCCCdddd
print(str.replace("c", "C", 2)) #abbCCcdddd
```
注意：如果没有指定替换次数，则匹配项全部替换。
11. 字符串切分为列表
```
source = 'a,b,c,d'
print(source.split(',')) #['a', 'b', 'c', 'd']
```
# 3. Python流程控制语句
## 3.1 介绍
1. 课时介绍 
分支语句的简单书写。
多条件下的分支语句。
分支语句的应用。
循环结构介绍。
循环的执行、跳出和终止。
循环语句的应用。
2. 目标
掌握分支结构的使用方法。
掌握循环结构的使用方法。
## 3.2 分支语句
1. 分支语句的基本书写形式
```
age = 16
if age < 18:
    print("未满18岁，禁止入门")
    print("您可以在监护人的陪同下进入")
else:
    print("欢迎光临")
    print("请进！")
print("不缩进的内容不属于条件语句！")

'''
未满18岁，禁止入门
您可以在监护人的陪同下进入
不缩进的内容不属于条件语句！
'''
```
注意：`Python`中条件语句没有`()`和`{}`，使用冒号和缩进进行分界。
2. 比较运算符
`==`、`!=`、`>`、`<`、`>=`、`<=`
```
print(1 == 1) #True
print(1 == 1.0) #True
print(1 == True) #True
print(0 == False) #True
print("abc" != "Abc") #True
print(" abc  ".strip().lower() == "ABC".strip().lower()) #True
```
3. 逻辑运算符
`and(与)`、`or(或)`、`not(非)`
优先级：`not` > `and` > `or`
```
a = 3 > 1 #True
b = 2 <= 0 #False
c = 0 == False #True
d = "a" == "A" #False

print(a and b) #False
print(a or b) #True
print(not d) #True
print(a and b or c and not d) #True
print(a and (b or c and not d)) #True
```
4. 判断是否是闰年
能被`4`整除但是不能被`100`整除的年份，或者能被`400`整除的年份。
```
year = input("请输入正确的年份：")
year = int(year)

if year % 4 == 0 and year % 100 != 0 or year % 400 == 0:
    print("{0}年是闰年".format(year))
else:
    print("{0}年不是闰年".format(year))

#请输入正确的年份：2016
#2016年是闰年
```
5. 多分支语句
```
weight = input("请输入您的体重(kg):")
height = input("请输入您的身高(m):")

weight = float(weight)
height = float(height)

bmi = weight / height ** 2
print(bmi)

if bmi <= 18.4:
    print("测试结果: 偏瘦")
elif bmi <= 23.9:
    print("测试结果: 正常")
elif bmi < 27.9:
    print("测试结果: 偏胖")
else:
    print("测试结果: 肥胖")

'''
请输入您的体重(kg):64
请输入您的身高(m):1.77
20.428357113217785
测试结果: 正常
'''
```
6. 分支语句嵌套
```
low = input("请输入您的低压值:")
high = input("请输入您的高压值:")

low = int(low)
high = int(high)

if 60 <low < 90 and 90 < high < 140:
    print("您的血压正常，请继续保持健康的生活习惯")
else:
    if low <= 60:
        print("您的低压过低, 请注意补充营养。")
    elif high <= 90:
        print("您的高压过低，请加强锻炼，提高心肺功能。")
    else:
        print("您的血压已经超标，请尽快就医。")

'''
请输入您的低压值:80
请输入您的高压值:90
您的高压过低，请加强锻炼，提高心肺功能。
'''  
```
7. 三元运算符
```
str = '1' if True else '0'
```
## 3.3 循环语句
1. `while`循环
循环三要素：循环执行条件、要执行的循环代码、修改循环条件。
```
i = 0
while i < 5:
    print("Python{}".format(i))
    i = i + 1

'''
Python0
Python1
Python2
Python3
Python4
'''
```
2. 计算从`1`到`1000`以内所有奇数的和
```
sum1 = 0
num1 = 1
# 循环条件
while num1 <= 1000:
    # 判断条件
    if num1 % 2 == 1:
        # 求和
        sum1 = sum1 + num1
    num1 = num1 + 1
print(sum1) # 250000
```
3. 阶乘计算器
能够输入自定义的数值`n (1 - 100`)。
计算`n`的阶乘(`1 * 2 * 3 …… * n`)。
当前阶乘能被`5`整除，则打印中间结果。
```
num = input("请输入要计算的数值(1:100): ")
num = int(num)
if 1 <= num <= 100:
    i = 1
    result = 1
    while i <= num:
        result = result * i
        if i % 5 == 0:
            print("{}:{}".format(i, result))
        i = i + 1
    print("最终结果:{}".format(result))
else:
    print("只允许输入1-100有效数值！")

'''
请输入要计算的数值(1:100): 20
5:120
10:3628800
15:1307674368000
20:2432902008176640000
最终结果:2432902008176640000

请输入要计算的数值(1:100): 120
只允许输入1-100有效数值！
'''
```
4. `continue`关键字
跳过当前循环语句
```
i = 0
while i <= 99:
    i = i + 1
    if i % 17 != 0:
        continue
    print(i)

'''
17
34
51
68
85
'''
```
5. `break`关键字
终止循环语句
```
i = 0
while i < 3:
    i = i + 1
    security = input("请输入验证码: ")
    if security == "329018":
        print("您的话费余额为158元")
        break
print("欢迎您的来电")

'''
请输入验证码: 329018
您的话费余额为158元
欢迎您的来电

请输入验证码: 112
请输入验证码: 223
请输入验证码: 1123
欢迎您的来电
'''
```
6. 循环嵌套
```
# 九九乘法表 
i = 1
while i < 10:
    j = 1
    while j <= i:
        # end=""表示结尾不换行
        print("{} * {} = {}\t".format(j, i, j * i), end="")
        j = j + 1
    print("")
    i = i + 1
```
7. 打印`1`到`1000`之间所有质数
```
i = 2
while i <= 1000:
    is_prime = True
    j = 2
    while j < i:
        if i % j == 0:
            is_prime = False
            break
        j = j + 1
    if is_prime:
        print("{}是质数".format(i))
    i = i + 1
```
# 4. 常用运算符的使用
## 4.1 介绍
1. 目标
了解七类运算符的用途。
掌握二进制与十进制相互转换的技巧。
## 4.2 常用运算符
1. 运算符分类
算数运算符；比较运算符；逻辑运算符；
赋值运算符；成员运算符；身份运算符；位运算符。
2. 赋值运算符
`=`、`+=`、`-=`、`*=`、`/=`、`%=`、`**=`、`//=`
```
a = 2
print(a) #2
a += 1
print(a) #3
a -= 1
print(a) #2
a *= 3
print(a) #6
a /= 2
print(a) #3.0
a %= 5
print(a) #3.0
a **= 2
print(a) #9.0
a //= 2
print(a) #4.0
```
3. 成员运算符
`in`：值是否在指定的序列中。
`not in`：值是否不在指定的序列中。
```
sheet = ['张三','李四','王五']

print('张三' in sheet) #True
print('张三' not in sheet) #False
```
4. 身份运算符
`is`：两个变量是否引用自一个对象。
`is not`：两个变量是否引用自不同对象。
```
a = 5
b = 5
c = 5.0
print(a is b) #True
print(a is not c) #True
print(a is c) #False
print(a == c) #True
```
注意：`is`相当于`JavaScript`中的`===`。
5. 二进制与十进制相互转换
二进制转十进制：从右向左每位数乘以`2`的`N`次方(`0`开始)后累加。
十进制转二进制：十进制对`2`取余，将余数放在二进制左侧。
6. 位运算符
`&`与、`|`或、`^`异或、`~`取反、`<<`左移、`>>`右移。
```
a = 60 #00111100
b = 13 #00001101

print("a & b = ", a & b ) #12  00001100
print("a | b = ", a | b) #61  00111101
print("a ^ b = ", a ^ b) #49  00110001
print("~a = ", ~a) #-61  11000011 = -(00111100 + 1)
print("a << 3 = ", a << 3) #480  00111100000
print("a >> 2 = ", a >> 2) #15  00001111
```
# 5. 列表与字典
## 5.1 介绍
1. 课时介绍
列表的简单介绍、基本操作、应用。
字典的简单介绍、基本操作、应用。
2. 目标
列表的特性与使用方法。
字典的特性与使用方法。
## 5.2 列表
1. 数据结构
数据结构是指计算机存储、组织数据的结构。
2. `Python`常用数据结构
(1) 列表(`List`)
(2) 元组(`Tuple`)
(3) 字典(`Dictionary`)
(4) 集合(`Set`)
3. 列表(`List`)
列表中的数据按顺序排列。
列表有正序与倒序两种索引。
列表可存储任意类型数据，且允许重复。
4. 列表的创建
```python
list = ['a', True, 1, 2.0]
print(list) #['a', True, 1, 2.0]
```
5. 列表的取值
```python
letters = ['a', 'b', 'c', 'd', 'e', 'f']
# 正序:  0,  1,  2,  3,  4,  5
# 倒序: -6, -5, -4, -3, -2, -1

#长度
print(len(letters))    #6
#取值
print(letters[3])      #d
print(letters[-2])     #e
#截取子数组
print(letters[1 : 4])  #['b', 'c', 'd']
#查找元素下标
print(letters.index('b')) #1
```
6. `for...in`语句
可用于遍历列表、元组等数据结构。
```python
letters = ['a', 'b', 'c', 'd', 'e', 'f']

# for..in..遍历
for letter in letters:
    print(letter) # a b c d e f

# while遍历
i = 0
while i < len(letters):
    print(letters[i]) # a b c d e f
    i += 1
```
7. 列表反转
```python
letters = ['a', 'b', 'c', 'd', 'e', 'f']
letters.reverse()
print(letters) #['f', 'e', 'd', 'c', 'b', 'a']
```
8. 列表排序
```python
numbers = [23, 16, 29, 7, 5, 32]
numbers.sort()
print(numbers) #[5, 7, 16, 23, 29, 32]
numbers.sort(reverse=True)
print(numbers) #[32, 29, 23, 16, 7, 5]
```
9. 列表的增删改查
```python
letters = ['a', 'b', 'c', 'd', 'e']
# 新增
letters.append('f') #末尾新增单个元素
print(letters)
#['a', 'b', 'c', 'd', 'e', 'f']
letters.insert(2, 'B') #指定位置新增单个元素
print(letters)
# ['a', 'b', 'B', 'c', 'd', 'e', 'f']
letters.insert(len(letters), 'F') #指定位置新增单个元素
print(letters)
# ['a', 'b', 'B', 'c', 'd', 'e', 'f', 'F']

# 修改
letters[0] = 'A' #修改单个元素
print(letters)
# ['A', 'b', 'B', 'c', 'd', 'e', 'f', 'F']
letters[3 : 6] = ['C', 'D', 'E'] #修改子数组
print(letters)
# ['A', 'b', 'B', 'C', 'D', 'E', 'f', 'F']

# 删除
letters.remove('b') # 删除指定元素
print(letters)
# ['A', 'B', 'C', 'D', 'E', 'f', 'F']
letters.pop(5) #删除指定序号
print(letters)
# ['A', 'B', 'C', 'D', 'E', 'F']
letters[2 : 4] = [] #删除子数组
print(letters)
# ['A', 'B', 'E', 'F']

# 查询
print(letters.index('E')) #2
```
10. 查询列表中某个元素的个数
```python
letters = ['a', 'b', 'c', 'd', 'b']
print(letters.count('b')) #2
```
11. 列表扩展
```python
letters = ['a', 'b', 'c', 'd', 'b']
letters.append(['e', 'f'])
print(letters)
# ['a', 'b', 'c', 'd', 'b', ['e', 'f']]
letters = ['a', 'b', 'c', 'd', 'b']
letters.extend(['e', 'f'])
print(letters)
# ['a', 'b', 'c', 'd', 'b', 'e', 'f']
```
12. 列表是否含有某个元素
```python
letters = ['a', 'b', 'c', 'd', 'b']
print('a' in letters) #True
letters.remove('a')
print('a' in letters) #False
```
13. 列表拷贝
```python
letters = ['a', 'b', 'c', 'd', 'b']
letters1 = letters.copy()
print(letters1) #['b', 'c', 'd', 'b']
print(letters1 == letters) #True
print(letters1 is letters) #False
```
注意：`Python`中的`==`没有`JavaScript`中的`==`严格。
14. 列表清空
```python
letters = ['a', 'b', 'c', 'd', 'b']
letters.clear()
print(letters) #[]
```
15. 二维数组
```
emp_list = []
while True:
    info = input("请输入员工信息: ")
    if info == "" :
        print("程序结束")
        break
    info_list = info.split(",")
    if len(info_list) != 3:
        print("输入格式不正确, 请重新输入")
        continue
    emp_list.append(info_list)
print(emp_list)
for emp in emp_list:
    print("{n}, 年龄: {a}, 工资: {s}".format(n = emp[0], a = emp[1], s = emp[2]))

'''
请输入员工信息: 张三,24,5000
请输入员工信息: 李四,26,8000
请输入员工信息: 王五,29
输入格式不正确, 请重新输入
请输入员工信息: 王五,29,12000
请输入员工信息: 
程序结束
[['张三', '24', '5000'], ['李四', '26', '8000'], ['王五', '29', '12000']]
张三, 年龄: 24, 工资: 5000
李四, 年龄: 26, 工资: 8000
王五, 年龄: 29, 工资: 12000
'''
```
## 5.3 字典
1. 字典(`Dictionary`)
字典采用键(`key`)：值(`value`)形式表达数据。
字典中`key`不允许重复，`value`允许重复。
字典是可修改的，运行时动态调整存储空间。
2. 创建字典
使用`{}`创建字典。
使用`dict`函数创建字典。
3. `{}`创建空字典
```
dict1 = {}
print(type(dict1))
#<class 'dict'>

dict2 = {
    'num': 1,
    'str': 'abc'
}
print(dict2)
#{'num': 1, 'str': 'abc'}
```
4. `dict()`方法创建字典
```
dict3 = dict(bool = True, list = [1,2,3])
print(dict3)
#{'bool': True, 'list': [1, 2, 3]}
```
5. `dict.fromkeys()`创建字典
```
dict4 = dict.fromkeys(['a', 'b'])
print(dict4)
#{'a': None, 'b': None}

seq = ('c', 'd')
dict6 = dict.fromkeys(seq)
print(dict6) #{'c': None, 'd': None}

dict5 = dict.fromkeys(['e', 'f'], 'N/A')
print(dict5)
# {'e': 'N/A', 'f': 'N/A'}
```
6. 字典的取值操作
```
dic = {
    'num': 1,
    'str': 'abc',
    'bool': True,
    'list': [1, 2, 3]
}
#[]取值
print(dic["num"])
# print(dic["num1"]) #报错:KeyError: 'num1'

#get取值
print(dic.get('str'))
print(dic.get('str1')) # None
print(dic.get('str2', '默认值')) #默认值
```
7. 成员运算符
```
dic = {
    'num': 1,
    'str': 'abc',
    'bool': True,
    'list': [1, 2, 3]
}
print('bool' in dic) #True
print('bool1' not in dic) #True
```
8. `for..in..`遍历
```
dic = {
    'num': 1,
    'str': 'abc',
    'bool': True,
    'list': [1, 2, 3]
}

for key in dic:
    print(dic[key]) #1 abc True [1, 2, 3]

for key, value in dic.items():
    print(key, value) #num 1 str abc bool True list [1, 2, 3]
```
9. 字典的新增和更新
```
dic = {
    'num': 1,
    'str': 'abc',
    'bool': True,
    'list': [1, 2, 3]
}

dic['num'] = 2
dic.update(num = 3, bool = False, dic1 = {})
print(dic)
#{'num': 3, 'str': 'abc', 'bool': False, 'list': [1, 2, 3], 'dic1': {}}
```
10. 字典的删除
```
dic = {
    'num': 1,
    'str': 'abc',
    'bool': True,
    'list': [1, 2, 3]
}

# 删除指定键值对
v = dic.pop('num')
print(v) #1
print(dic) #{'str': 'abc', 'bool': True, 'list': [1, 2, 3]}

# 删除末尾键值对
kv = dic.popitem()
print(kv) #('list', [1, 2, 3])
print(dic) #{'str': 'abc', 'bool': True}

# 清空字典
dic.clear()
print(dic) #{}
```
11. 为字典设置默认值
```
emp1 = {'name': 'Jacky', 'grade': 'B'}
emp2 = {'name': 'Lily'}

emp1.setdefault('grade', 'C')
emp2.setdefault('grade', 'C')
print(emp1) #{'name': 'Jacky', 'grade': 'B'}
print(emp2) #{'name': 'Lily', 'grade': 'C'}
```
12. 字典的视图
```
dic = {
    'num': 1,
    'str': 'abc'
}
ks = dic.keys()
print(ks)
#dict_keys(['num', 'str'])
vs = dic.values()
print(vs)
#dict_values([1, 'abc'])
its = dic.items()
print(its)
#dict_items([('num', 1), ('str', 'abc')])

dic['bool'] = False
print(ks)
#dict_keys(['num', 'str', 'bool'])
print(vs)
#dict_values([1, 'abc', False])
print(its)
#dict_items([('num', 1), ('str', 'abc'), ('bool', False)])
```
13. 格式化字符串
```
dic = {'name': 'drew', 'sex': '男', 'age': 23}
# 新版本API
str1 = "姓名: {name}, 性别: {sex}, 年龄: {age}".format_map(dic)
print(str1) #姓名: drew, 性别: 男, 年龄: 23
# 老版本API
str2 = "姓名: %(name)s, 性别: %(sex)s, 年龄: %(age)d"%dic
print(str2) #姓名: drew, 性别: 男, 年龄: 23
```
14. 散列值(`hash`)
字典也称为`哈希(hash)`，对应散列值。
散列值是从任何一种数据中创建数字“指纹”。
`Python`中提供了`hash()`函数生成散列值。
```
print(hash('abc')) #3827701554127172734
print(hash('abc')) #3827701554127172734
print(hash('bcd')) #9209557169529816299
print(2468) #2468
```
15. 字典的存储原理
![image.png](https://upload-images.jianshu.io/upload_images/4989175-f34f33c10144eb1c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
16. 字典综合练习
```
source = "drew,男,26$ni,男,23"
employees_list = source.split("$")
employees_dec = {}
for employee in employees_list:
    employee_list = employee.split(',')
    employees_dec[employee_list[0]] = {
        'name': employee_list[0],
        'sex': employee_list[1],
        'age': employee_list[2]
    }

name = input("请输入员工姓名: ")
if name in employees_dec:
    print("姓名: {name} 性别: {sex} 年龄:{age}".format_map(employees_dec[name]))
else:
    print("员工信息不存在！")

# 请输入员工姓名: ni
# 姓名: ni 性别: 男 年龄:23
```
# 6. 元组与集合
## 6.1 介绍
1. 课时介绍
元组简单介绍；元组与序列的基本操作；
集合简单介绍；集合的基本操作。
2. 目标
理解元组与列表的差别。
了解序列及其常用类型。
掌握集合的特性与常用函数。
## 6.2 元组与序列基本操作
1. 元组(`Tuple`)
元组是不可变的列表(`List`)。
元组使用小括号(`()`)，列表使用中括号(`[]`)。
2. 元组创建
```
tup1 = 'a', 'b', 'c' 
#不推荐这种不加小括号的写法
print(tup1) #('a', 'b', 'c')
tup2 = ('a', 'b', 'c')
print(tup2) #('a', 'b', 'c')
print(type(tup2)) #<class 'tuple'>
```
3. 元组取值
```
tup1 =('a', 'b', 'c', 1, 2, 3)
print(tup1[2])    # c
print(tup1[-1])   # 3
print(tup1[1: 4]) # ('b', 'c', 1)
print('c' in tup1)# True
```
4. 元组不可修改
```
tup1 =('a', 'b', 'c')
tup1[0] = 2
# TypeError: 'tuple' object does not support item assignment

tup2 = (['a', 'b'], 'c')
tup2[0][1] = 'B'
print(tup2) #(['a', 'B'], 'c')
```
5. 元组运算符
```
tup1 = (5,6,7) + (8, 9, 10)
print(tup1) #(5, 6, 7, 8, 9, 10)

tup2 = ('see', 'you') * 2
print(tup2) #('see', 'you', 'see', 'you')
```
元组运算符也适用于列表操作。
6. 单元素元组
如果元组只有一个元素，必须在元素后增加一个逗号。
```
tup3 = ('see') * 3
print(tup3) #seeseesee
tup4 = ('see',) * 3
print(tup4) #('see', 'see', 'see')
```
7. 序列
序列(`Sequence`)是指“有序”的队列。
序列中的元素顺序按添加顺序排列。
序列中的数据通过“索引”进行获取。
8. 序列包含的常用数据结构
字符串(`Str`)、列表(`List`)、元组(`Tuple`)、数字序列(`Range`)。
9. 数字序列
`range`表示数字序列，内容不可变。
数字序列使用`range()`函数创建。
```
r = range(10, 20)   #生成10到19的整数
print(type(r))      #<class 'range'>
print(r[9])         #19
print(r[3:5])       #range(13, 15)
r[0] = 3            #TypeError: 'range' object does not support item assignment
print(r[10])        #IndexError: range object index out of range
```
10. 定义数字序列步长
```
r2 = range(10, 20, 2)
print(r2[2])    #14
print(r2[2: 4]) #range(14, 18, 2)
print(15 in r2) #False
```
11. 斐波那契数列
```
result = []
for i in range(0, 10):
    if i == 0 or i == 1:
        result.append(1)
    else:
        result.append(result[i - 1] + result[i - 2])
        result.append(result[i - 1] + result[i - 2])
print(result) #[1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```
12. 序列类型互相转换
`list()` - 转换为列表；
`tuple()` - 转换为元组；
`join()`、`str()` - 转换为字符串。
```
l1 = ['a', 'b', 'c']
t1 = ('a', 'b', 'c')
s1 = 'abc'
r1 = range(1, 9, 2)

#list() - 转换为列表
print(list(t1)) #['a', 'b', 'c']
print(list(s1)) #['a', 'b', 'c']
print(list(r1)) #[1, 3, 5, 7]

#tuple() - 转换为元组
print(tuple(l1)) #('a', 'b', 'c')
print((tuple(s1))) #('a', 'b', 'c')
print(tuple(r1)) #(1, 3, 5, 7)

#join()、str() - 转换为字符串
print(str(l1)) #['a', 'b', 'c']
print(''.join(l1))  #abc
print(','.join(t1)) #a,b,c

#数字序列合并为字符串
s2 = ''
for i in r1:
    s2 += str(i)
print(s2) #1357
```
## 6.3 集合基本操作
1. 集合
集合元素无序、不能重复。
集合可变、允许数学运算、分散存储。
2. `{}`创建集合
```
college1 = {"哲学", "经济学", "法学", "教育学"}
print(college1) #{'哲学', '教育学', '经济学', '法学'}
```
注意: 每次运行打印的顺序不同，故集合是无序的。
3. `set()`创建集合
`set()`函数可以将其他数据结构转化为集合。
```
college2 = set(["哲学", "经济学", "法学", "教育学"])
print(college2) #{'哲学', '教育学', '经济学', '法学'}
college3 = set(("哲学", "经济学", "法学", "教育学"))
print(college3) #{'哲学', '教育学', '经济学', '法学'}
college4 = set("中华人民共和国")
print(college4) #{'国', '华', '共', '中', '人', '和', '民'}
```
4. 空集合
`set()`
```
print(type({})) #<class 'dict'> 空字典
print(type(set())) #<class 'set'> 空集合
```
5. 集合的数学运算
交集(`intersection`)、并集(`union`)、差集(`difference`)。
(1) 交集
```
college1 = {"哲学", "经济学", "法学", "教育学"}
college2 = set(("金融学", "哲学", "经济学", "历史学", "文学"))
# intersection生成新集合
college3 = college1.intersection(college2)
print(college3) #{'哲学', '经济学'}
print(college1) #{'哲学', '经济学', '教育学', '法学'}

# intersection_update更新原有集合
college3 = college1.intersection_update(college2)
print(college3) #None
print(college1) #{'哲学', '经济学'}
```
(2) 并集
```
college1 = {"哲学", "经济学", "法学", "教育学"}
college2 = set(("金融学", "哲学", "经济学", "历史学", "文学"))

college3 = college1.union(college2)
print(college3) 
#{'金融学', '哲学', '法学', '教育学', '经济学', '文学', '历史学'}
```
(3) 差集
```
college1 = {"哲学", "经济学", "法学", "教育学"}
college2 = set(("金融学", "哲学", "经济学", "历史学", "文学"))

college3 = college1.difference(college2)
print(college3) #{'法学', '教育学'}
print(college1) #{"哲学", "经济学", "法学", "教育学"}
college4 = college1.difference_update(college2)
print(college4) #None
print(college1) #{'法学', '教育学'}

college1 = {"哲学", "经济学", "法学", "教育学"}
college2 = set(("金融学", "哲学", "经济学", "历史学", "文学"))
college3 = college2.difference(college1)
print(college3) #{'文学', '金融学', '历史学'}

# 双向差集
college1 = {"哲学", "经济学", "法学", "教育学"}
college2 = set(("金融学", "哲学", "经济学", "历史学", "文学"))

college3 = college1.symmetric_difference(college2)
print(college3) #{'历史学', '文学', '法学', '教育学', '金融学'}
print(college1) #{'教育学', '法学', '哲学', '经济学'}

college4 = college1.symmetric_difference_update(college2)
print(college4) #None
print(college1) #{'金融学', '教育学', '历史学', '法学', '文学'}
```
6. 集合间的关系操作

(1) 元素是否相同
```
s1 = {1, 2, 3, 4, 5}
s2 = {2, 5, 3, 1, 4}
print(s1 == s2) #True
```
(2) 是否是父/子集
```
s3 = {1, 3}
s4 = {1, 2, 3, 4}
print(s3.issubset(s4)) #True
print(s4.issuperset(s3)) #True
```
(3) 是否有无交集
```
s5 = {5}
s6 = {1, 3, 5, 7}
print(s5.isdisjoint(s6)) #False  True表示无交集, False表示有交集
```
7. 集合的操作
(1) 遍历
```
college1 = {'a', 'b', 'c'}
for c in college1:
    print(c) #b a c 无序
```
(2) 判断元素是否属于集合
```
college1 = {'a', 'b', 'c'}
print('b' in college1) #True
print('B' in college1) #False
```
(3) 新增
```python
college1 = {'a', 'b', 'c'}

college1.add('c') #已有该元素，则不新增
college1.add('d') #新增一个元素
print(college1) #{'d', 'c', 'a', 'b'}

college1.update(['e', 'f']) #新增多个元素
print(college1) #{'a', 'b', 'd', 'f', 'c', 'e'}
```
(4) 更新
只能够通过删除再添加的方式实现更新。
```python
#college1.remove('d') #删除元素，如果元素不存在，则报错。
college1.discard('d') #删除元素，如果元素不存在，则忽略。
college1.add('D')
print(college1) #{'c', 'b', 'e', 'f', 'D', 'a'}
```
8. 生成式
语法：`数据 循环语句(一次或多次)  判断语句`
(1) 列表生成式
```
list1 = []
for i in range(10, 20):
    list1.append(i * 10)
print(list1)
#[100, 110, 120, 130, 140, 150, 160, 170, 180, 190]

list2 = [i * 10 for i in range(10, 20)]
print(list2)
#[100, 110, 120, 130, 140, 150, 160, 170, 180, 190]

list3 = [i * 10 for i in range(10, 20) if i % 2 == 0]
print(list3)
#[100, 120, 140, 160, 180]

list4 = [i * j for i in range(1, 4) for j in range(1, 4)]
print(list4)
#[1, 2, 3, 2, 4, 6, 3, 6, 9]
```
(2) 字典生成式
```
list5 = ['a', 'b', 'c']
dict = {i + 1: list5[i] for i in range(0, len(list5))}
print(dict) #{1: 'a', 2: 'b', 3: 'c'}
```
(3) 集合生成式
```
set = {i * j for i in range(1, 4) for j in range(1, 4) if i == j}
print(set) #{1, 4, 9}
```
# 7. 作业
1. 题目要求
根据业务需求，现要求慕友们开发一个货币兑换的服务系统，具体要求如下：
(1) 实现人民币兑换美元的功能
(2) 实现美元兑换人民币的功能
(3) 实现人民币兑换欧元的功能
(4) 1美元=6.72人民币，1人民币=0.13欧元
2. 运行效果图
![image.png](https://upload-images.jianshu.io/upload_images/4989175-87915e8a19c04d8f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 代码
```
while True:
    print("****************欢迎使用货币转换系统*****************")
    service_menu = {
        "1" : "人民币转换美元",
        "2" :  "美元转换人民币",
        "3" : "人民币转换欧元",
        "0" :  "结束程序"
    }
    # 打印系统介绍
    for key, value in service_menu.items():
        print("{}.{}".format(key, value))

    # 提示用户输入服务类型
    Your_Choice = input("请您选择需要的服务: ")
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

    # 执行不同服务分支逻辑
    if Your_Choice == "0":
        print("感谢您的使用, 祝您生活愉快, 再见!")
        break
    elif Your_Choice == '1':
        print("欢迎使用人民币转换美元服务")
        your_money = input("请您输入需要转换的人民币金额: ")
        print("您需要转换的人民币为: {}元".format(your_money))
        RMB_to_US = int(your_money) / 6.72
        print("兑换成美元为:{:0.2f}$".format(RMB_to_US))
        print("===================================")
    elif Your_Choice == '2':
        print("欢迎使用美元转换人民币服务")
        your_money = input("请您输入需要转换的美元金额: ")
        print("您需要转换的美元为: {}元".format(your_money))
        US_to_RMB = int(your_money) * 6.72
        print("兑换成人民币为:{:0.2f}元".format(US_to_RMB))
        print("===================================")
    elif Your_Choice == '3':
        print("欢迎使用人民币转换欧元服务")
        your_money = input("请您输入需要转换的人民币金额: ")
        print("您需要转换的人民币为: {}元".format(your_money))
        RMB_to_EUR = int(your_money) * 0.13
        print("兑换成欧元为:{:0.2f}欧元".format(RMB_to_EUR))
        print("===================================")
    else:
        print("您输入的选择有误,请重新输入")
```


