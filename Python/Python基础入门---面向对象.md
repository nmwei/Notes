# 1. 初识面向对象
## 1.1 介绍
1. 步骤介绍
面向对象的概述
面向对象的实现
面向对象的应用
内存管理
进程、线程、协程
2. 概要
面向对象的三大特征
面向对象三大特征的举例
3. 目标
了解面向对象编程的思路
了解面向对象与面向过程的区别
了解面向对象编程的优点
了解面向对象的三大特征
## 1.2 什么是面向对象
1. 类与对象
类是抽象的概念。
对象是类的实例。
2. 封装
隐藏实现细节，提供访问接口。
3. 继承
一种类与类之间的派生关系。
4. 多态
父类引用指向子类对象。
# 2. 类的特性
## 2.1 类的定义与实现
1. 类的方法
`dir` 列出类的所有属性及方法
`help` 查看类、方法的帮助信息
`__init__` 构造方法
`__del__` 析构函数
`__doc__` 显示类的文档注释字符串
`__module__` 显示类所在的模块名
`__bases__` 一个元组显示类所继承的所有父类
2. 在编写代码时只写框架思路，具体实现还未编写就可以用 `pass` 进行占位，使程序不报错，不会进行任何操作。
```
x = 5

if x < 6:
    pass
```
3. 判断是否是某个类的实例
`isinstance(instance, Class)`
4. 类与对象
```
class Cat(object):
    """ 猫科动物类 """

    tag = '猫科动物'

    def __init__(self, name, age, sex = "公"):
        self.name = name
        self.__age = age
        self.sex = sex

    def show_info(self):
        info = "我叫{}, 今年{}岁, 性别{}".format(self.name, self.__age, self.sex)
        print(info)

    def get_age(self):
        return self.__age

    def set_age(self, age):
        self.__age = age

    def eat(self):
        print("吃鱼")

    def catch(self):
        print("捉老鼠")


class Dog(object):
    pass


if __name__ == '__main__':
    # 小黑对象
    black_cat = Cat('小黑', 2)
    black_cat.eat()  # 吃鱼
    black_cat.show_info()  # 我叫小黑, 今年2岁
    print(black_cat.name)  # 小黑
    # print(black_cat.__age) # 静态属性，无法访问。会报错！'AttributeError: 'Cat' object has no attribute '__age'
    black_cat.set_age(1)
    black_cat.show_info()  # 我叫小黑, 今年1岁, 性别公
    print(Cat.tag)  # 猫科动物
    print(black_cat.tag)  # 猫科动物
    print(isinstance(black_cat, Cat))  # True

    # 小白对象
    white_cat = Cat('小白', 3, '母')
    white_cat.show_info()  # 我叫小白, 今年3岁, 性别母
    white_cat.__age = 4  # 静态属性，无法修改。不会报错！
    white_cat.show_info()  # 我叫小白, 今年3岁, 性别母
    print(isinstance(white_cat, Dog))  # False
```
注释：`__`开头表示私有变量/方法。静态属性/方法被实例继承(与`Java`相同，与`JavaScript`不同)。
注意：`tag`为静态属性，而不是成员属性。
## 2.2 类的继承与多态
1. 方法介绍
(1) 判断是否是父子类关系
`issubclass(Child, Parent)` 
(2) 子类调用父类方法
```
def eat(self):
    super(Cat, self).eat()
    print("猫还喜欢吃鱼")
```
2. 继承示例
```
class Animal(object):
    """ 动物基类 """
    tag = "动物"

    def __init__(self, name):
        self.name = name

    def eat(self):
        print("动物都吃东西")


class Cat(Animal):
    """ 猫科动物 """
    tag = "猫科动物"

    def __init__(self, name, age):
        super(Cat, self).__init__(name)
        self.__age = age

    def get_age(self):
        return self.__age

    def eat(self):
        super(Cat, self).eat()
        print("猫还吃鱼")

    def catch(self):
        print("捉老鼠")


if __name__ == '__main__':
    print(issubclass(Cat, Animal))  # True
    print(issubclass(Cat, object))  # True
    cat = Cat('小黑', 3)
    print(cat.name)  # 小黑
    print('年龄: {}'.format(cat.get_age()))  # 年龄: 3
    print(cat.tag)  # 猫科动物
    cat.eat()  # 动物都吃东西 猫还吃鱼
```
3. 多重继承
```
class NavMixin(object):
    """导航功能"""
    def nav(self):
        print("具备导航功能")


class Animal(object):
    """ 动物基类 """
    tag = "动物"

    def __init__(self, name):
        self.name = name

    def eat(self):
        print("动物都吃东西")


class Dog(Animal):
    """犬科动物"""
    tag = '犬科动物'

    def eat(self):
        super(Dog, self).eat()
        print("狗喜欢啃骨头")


class GoldDog(Dog, NavMixin):
    """金毛寻回犬"""
    pass


print(issubclass(GoldDog, Dog))  # True
print(issubclass(GoldDog, NavMixin))  # True

gd = GoldDog("小金毛")
gd.eat()  # 动物都吃东西  # 狗喜欢啃骨头
gd.nav()  # 具备导航功能
```
注意：如果多重继承的父类定义了同名方法，则调用位置靠前的父类的方法。
4. 如果输出内容含有花括号时，需要加一层`{}`
```
print("{{{}}}".format("字符串")) # {字符串}
```
5. 子类调用父类构造函数
① `super().__init__(参数1, 参数2)` 
② `super(子类, self).__init__(参数1, 参数2)`
③ `父类.__init__(self, 参数1, 参数2)`
第一种方式仅在`python3`中支持。
多重继承时，前两种方式只能调第一个父类的构造方法，第三种方式可以调用任意一个父类的构造方法。
```
class ParentA(object):
    def __init__(self):
        print("I am ParentA")

    def say(self):
        print("Say ParentA")


class ParentB(object):
    def __init__(self):
        print("I am ParentB")

    def say(self):
        print("Say ParentB")


class Children(ParentA, ParentB):
    def __init__(self):
        super(Children, self).__init__()
        ParentB.__init__(self)


Children()
#  I am ParentA
#  I am ParentB
```
6. 图形面向对象示例
```
class Point(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def string(self):
        print("{{X：{}, Y：{}}}".format(self.x, self.y))


class Circle(Point):
    def __init__(self, x, y, radius):
        super(Circle, self).__init__(x, y)
        self.radius = radius

    def string(self):
        print("该图形初始化点为：{{X：{}, Y：{}}}; {{半径为：{}}}".format(self.x, self.y, self.radius))


class Size(object):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def string(self):
        print("{{Width：{}, Height：{}}}".format(self.width, self.height))


class Rectangle(Point, Size):
    def __init__(self, x, y, width, height):
        Point.__init__(self, x, y)
        Size.__init__(self, width, height)

    def string(self):
        print("该图形初始化点为：{{X：{}, Y：{}}}; 长宽分别为：{{Width：{}, Height：{}}}".format(self.x, self.y, self.width, self.height))


if __name__ == "__main__":
    c = Circle(5, 5, 8)
    c.string()
    # 该图形初始化点为：{X：5, Y：5}; {半径为：8}
    r1 = Rectangle(15, 15, 15, 15)
    r1.string()
    # 该图形初始化点为：{X：15, Y：15}; 长宽分别为：{Width：15, Height：15}
    r2 = Rectangle(40, 30, 11, 14)
    # 该图形初始化点为：{X：40, Y：30}; 长宽分别为：{Width：11, Height：14}
    r2.string()
```
7. 重写对象的`__str__`方法
被`@property`修饰
```
class Cat(object):
    """ 猫科动物 """

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        """重写对象的__str__方法"""
        return "我叫: {}, 今年{}岁".format(self.name, self.age)


if __name__ == "__main__":
    c = Cat("小黑", 2)
    print(c)  # 我叫: 小黑, 今年2岁
```
注意：如果没有重写`__str__`方法，则打印结果为`<__main__.Cat object at 0x10d99c128>`。
## 2.3 类的高级特性
1. `@property`和`@XXX.setter`
将类的方法当做属性来使用。
`@property`相当于`javascript`中的`get`方法。
`@XXX.setter`相当于`javascript`中的`set`方法
```
class Cat(object):
    """ 猫科动物 """

    def __init__(self, name, age):
        self.name = name
        self.__age = age

    @property
    def age(self):
        return self.__age

    @age.setter
    def age(self, age):
        if not isinstance(age, int):
            print("年龄只能是整数")
        elif age < 0 or age > 20:
            print("年龄只能在0-20之间")
        else:
            self.__age = age

    @property
    def show_info(self):
        return "我叫: {}, 今年{}岁".format(self.name, self.age)


if __name__ == "__main__":
    c = Cat("小黑", 2)
    print(c.show_info)  # 我叫: 小黑, 今年2岁
    c.age = '3'  # 年龄只能是整数
    c.age = 26  # 年龄只能在0-20之间
    c.age = 6
    print(c.show_info)  # 我叫: 小黑, 今年6岁
```
`javascript`代码实现如下：
```
class Cat {
  constructor(name, age) {
  	this.name = name
  	this._age = age
  }
  
  get age() {
  	return this._age
  }
  
  set age(age){
  	if(typeof age !== "number") {
    	console.log("年龄只能是整数")
    } else if(age < 0 || age > 20) {
  		console.log("年龄只能在0-20之间")
    } else {
    	this._age = age 
    }
  }
  
  get show_info(){
  	return `我叫: ${this.name}, 今年${this._age}岁`
  }
}

c = new Cat("小黑", 2)
console.log(c.show_info)  // 我叫: 小黑, 今年2岁
c.age = '3'  // 年龄只能是整数
c.age = 26  // 年龄只能在0-20之间
c.age = 6
console.log(c.show_info)  // 我叫: 小黑, 今年6岁
```
注意：`isinstance(age, int/str)`判断是否是数字/字符串。
参考：[《使用@property》](https://www.liaoxuefeng.com/wiki/897692888725344/923030547069856)
2. `__slots__`
`__slots__`可以限制该类可以添加的属性。`__slots__`定义的属性仅对当前类起作用，对继承的子类是不起作用的。除非在子类中也定义`__slots__`。这样，子类允许定义的属性就是自身的`__slots__`加上父类的`__slots__`。
```
class Cat(object):
    """ 猫科动物 """

    __slots__ = ('name', 'age')

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def show_info(self):
        return "我叫: {}, 今年{}岁".format(self.name, self.age)


class HuaCat(Cat):
    __slots__ = ('color',)


def eat():
    print("我喜欢吃鱼")


if __name__ == "__main__":
    c = HuaCat("咪咪", 2)
    print(c.show_info())  # 我叫: 咪咪, 今年2岁
    c.color = '白色'  #
    print(c.color)  # 白色
    c.eat = eat  # AttributeError: 'Cat' object has no attribute 'eat'
```
注意：若元组只有一个元素，则需要加`,`。
3. 静态方法和实例方法
`@staticmethod`  表示静态方法，没有默认参数。
`@classmethod` 表示类方法，第一个默认参数为该类对象(`cls`)。
```
class Cat(object):

    tag = "猫科动物"  # 静态属性

    def __init__(self, name):
        self.name = name  # 实例属性

    @staticmethod
    def static_fn(arg):  # 静态方法
        """静态方法"""
        print("调用静态方法, 参数为:{}".format(arg))

    @classmethod
    def class_fn(cls, arg):  # 类方法
        """类方法"""
        print("调用类方法, 参数为:{}".format(arg))

    def show_info(self):  # 实例方法
        """实例方法"""
        print("类的属性: {}, 实例的属性: {}".format(self.tag, self.name))


if __name__ == '__main__':
    # 类调用静态方法
    Cat.static_fn(1)  # 调用静态方法, 参数为:1
    c = Cat("小花")
    # 实例调用静态方法
    c.static_fn(2)  # 调用静态方法, 参数为:2

    # 类调用类方法
    Cat.class_fn(3)  # 调用类方法, 参数为:3
    # 实例调用类方法
    c.class_fn(4)  # 调用类方法, 参数为:4

    # 实例调用实例方法
    c.show_info()  # 类的属性: 猫科动物, 实例的属性: 小花
```
注意：类和实例都可以调用静态方法和类方法。
4. `hasattr`判断对象是否拥有某个属性
```
class Person(object):
    def __init__(self, name):
        self.name = name


p = Person('小明')
print(hasattr(p, 'name'))  # True
print(hasattr(p, 'age'))   # False

dict1 = {"a": 1, "b": 2}
print(hasattr(dict1, "a"))  # False
print("a" in dict1)  # True 
```
注意：`hasattr`只能判断对象，不能判断字典。
## 2.4 总结
1. 小结
面向对象、类与对象、多重继承、类的高级特性、静态方法和实例方法。
# 3. 面向对象应用
## 3.1 介绍
1. 章节概要
迭代器、生成器、实战：模拟`range`函数效果、异常处理。
## 3.2 装饰器的介绍与应用
1. 装饰器
是一个返回函数的高阶函数，用来拓展原来函数的功能。
2. 简单装饰器
```
def log(func):
    def wrapper():
        print("开始执行")
        func()
        print("结束执行")
    return wrapper


def log_in(func):
    def wrapper():
        print("start...")
        func()
        print("end...")
    return wrapper


@log
@log_in
def hello():
    print("hello world")


if __name__ == '__main__':
    hello()
    # 开始执行
    # start...
    # hello world
    # end...
    # 结束执行
```
注释：`@log`装饰`hello`方法相当于`hello = log(hello)`。
3. 装饰器传参、被装饰函数传参及返回值
```
def log(name=None):
    def decorator(func):
        def wrapper(*args, **kwargs):
            print("start call {}...".format(name))
            print(args, kwargs)
            res = func(*args, **kwargs)
            print("end call {}...".format(name))
            return res
        return wrapper
    return decorator


@log('hello')
def hello():
    print("hello world")


@log('add')
def add(a, b):
    return a + b


if __name__ == '__main__':
    hello()
    # start call hello...
    # () {}
    # hello world
    # end call hello...

    result = add(3, b=5)
    # start call add...
    # (3,) {'b': 5}
    # end call add...
    print(result)
    # 8
```
4. 带参数的装饰器之`wraps`
```
from functools import wraps


def wrapper1(func):
    def wrapper_fn():
        """装饰器函数1"""
        func()
    return wrapper_fn


def wrapper2(func):
    @wraps(func)
    def wrapper_fn():
        """装饰器函数2"""
        func()
    return wrapper_fn


def fun1():
    """函数1"""
    pass


@wrapper1
def fun2():
    """函数2"""
    pass


@wrapper2
def fun3():
    """函数3"""
    pass


if __name__ == '__main__':
    print("doc: {}, name: {}".format(fun1.__doc__, fun1.__name__))
    # doc: 函数1, name: fun1
    print("doc: {}, name: {}".format(fun2.__doc__, fun2.__name__))
    # doc: 装饰器函数1, name: wrapper_fn
    print("doc: {}, name: {}".format(fun3.__doc__, fun3.__name__))
    # doc: 函数3, name: fun3
```
5. 类的装饰器
装饰器实现实现单例模式。
```
def wrapper(cls):
    def wrapper_fn(*args, **kwargs):
        if not cls.instance:
            cls.instance = cls(*args, **kwargs)
        return cls.instance
    return wrapper_fn


@wrapper
class Person(object):
    instance = None

    def __init__(self, name):
        self.name = name

    def print_info(self):
        print(self.name)


if __name__ == "__main__":
    p1 = Person('张三')
    p1.print_info()  # 张三
    print(id(p1))  # 4499276296

    p2 = Person('李四')
    p2.print_info()  # 张三
    print(id(p2))  # 4499276296
```
注释：`@wrapper`装饰`Person`类相当于`Person = wrapper(Person)`。
## 3.3 迭代器与生成器
1. 迭代器(`iterate`)介绍
`iterate`意味着重复多次。
实现了`__iter__`方法的对象是可迭代的。
实现了`__next__`方法的对象是迭代器。
调用`__next__`，迭代器返回下一个值。
如果迭代器没有下一个值了，则触发`StopIteration`异常。
2. 简单迭代器
可以直接使用`for...in...`循环的数据类型都被称为可迭代对象，例如：列表、字典、元组。使用`iter()`方法把可迭代对象转换成迭代器。
```
l = [1, 2, 3, 4]
i = iter(l)
print(i.__next__())  # 1
print(next(i))  # 2
print(i.__next__())  # 3
print(next(i))  # 4
print(i.__next__())  # Error: StopIteration
```
注释：`i.__next__()`和 `next(i)`方法等价。
3. 自定义迭代器
```
class PowNumber(object):
    """迭代器，生成1, 2, 3...数的平方"""
    value = 0

    def __init__(self, max_value):
        self.max_value = max_value

    def __next__(self):
        self.value += 1
        if self.value > self.max_value:
            raise StopIteration
        return self.value ** 2

    def __iter__(self):
        return self


if __name__ == '__main__':
    p = PowNumber(10)
    print(p. __next__())  # 1 
    print(next(p))  # 4
    print(next(p))  # 9
    for i in p:
        print(i)  # 16 25 35...100
```
注释：使用`p.__next__()`或`next(p)`迭代时，超出最后一个值报错。使用`for...in...`迭代时，超出最后一个值停止迭代，不报错。
`Python`中的`raise`相当于`JavaScript`中的`throw`， 用来抛出异常。
注意：使用`for...in...`循环既可以遍历可迭代对象，又可以遍历迭代器。 
4. 生成器介绍
生成器是一种使用普通函数语法定义的迭代器。
包含`yield`语句的函数都被称为生成器。
不使用`return`返回一个值，而是生成多个值，每次生成一个。
每次使用`yield`生成一个值后，函数都将冻结。
被重新唤醒后，函数将从停止的地方开始继续执行。
注释：生成器是一种特殊的迭代器。
5. 生成器简单示例
```
l1 = [x * x for x in [1, 2, 3, 4, 5]]
print(l1)  # [1, 4, 9, 16, 25]
l2 = (x * x for x in [1, 2, 3, 4, 5])
print(l2)  # <generator object <genexpr> at 0x106c28408>

print(next(l2))  # 1
print(next(l2))  # 4
print(next(l2))  # 9
for item in l2:
    print(item)  # 16 25
```
注意：`[x * x for x in [1, 2, 3, 4, 5]]`为列表推导式的写法。
6. 自定义生成器
```
def pow_number1():
    for x in [1, 2, 3, 4]:
        yield x * x


def pow_number2():
    return (x * x for x in [1, 2, 3, 4])


if __name__ == '__main__':
    res1 = pow_number1()
    print(res1)  # <generator object pow_number1 at 0x10a87f408>
    for i in res1:
        print(i)  # 1 4 9 16

    res2 = pow_number2()
    print(res2)  # <generator object pow_number2.<locals>.<genexpr> at 0x10e8437c8>
    for i in res2:
        print(i)  # 1 4 9 16
```
7. 模拟`range`函数
```
class IterRange(object):
    """使用迭代器模拟range方法"""
    def __init__(self, start, end):
        self.start = start - 1
        self.end = end

    def __next__(self):
        self.start += 1
        if self.start >= self.end:
            raise StopIteration
        return self.start

    def __iter__(self):
        return self


class GenRange(object):
    """使用生成器模拟range方法"""
    def __init__(self, start, end):
        self.start = start - 1
        self.end = end

    def range(self):
        while True:
            self.start += 1
            if self.start >= self.end:
                break
            yield self.start


def gen_range(start, end):
    """使用生成器模拟range方法"""
    start -= 1
    while True:
        start += 1
        if start >= end:
            break
        yield start


def range_test1(range):
    print(range)
    print(list(range))


def range_test2(range):
    for i in range:
        print(i)


if __name__ == "__main__":
    # 测试内置range方法
    range_test1(range(5, 10))  # range(5, 10) [5, 6, 7, 8, 9]
    range_test2(range(5, 10))  # 5 6 7 8 9
    # 迭代器模拟的range方法
    range_test1(IterRange(5, 10))  # <__main__.IterRange object at 0x10a92f198> [5, 6, 7, 8, 9]
    range_test2(IterRange(5, 10))  # 5 6 7 8 9
    # 生成器模拟的range方法
    range_test1(GenRange(5, 10).range())  # <generator object GenRange.range at 0x10a9057c8> [5, 6, 7, 8, 9]
    range_test2(GenRange(5, 10).range())  # 5 6 7 8 9
    range_test1(gen_range(5, 10))  # <generator object gen_range at 0x10a9057c8> [5, 6, 7, 8, 9]
    range_test2(gen_range(5, 10))  # 5 6 7 8 9
```
## 3.4 实战-文件备份
1. 代码演示
```
import os


class FileBackup(object):
    """文件备份"""

    def __init__(self, src, dist, file_type):
        """
        构造方法
        :param src: 源目录
        :param dist: 目标目录
        :param file_type: 备份文件类型
        """
        self.src = src
        self.dist = dist
        self.type = file_type

    def backup(self):
        """
        拷贝src目录下所有层级指定类型文件
        """
        self.backup_dir(self.src, self.dist)

    def backup_dir(self, src_dir_path, dist_dir_path):
        """
        备份某一目录下所有层级指定类型文件
        :param src_dir_path: 源文件夹
        :param dist_dir_path: 目标文件夹
        :return:
        """
        if not os.path.exists(dist_dir_path):
            os.makedirs(dist_dir_path)
        file_names = os.listdir(src_dir_path)
        for file_name in file_names:  # 遍历目录中所有文件/文件夹
            src_file_path = os.path.join(src_dir_path, file_name)
            dist_file_path = os.path.join(dist_dir_path, file_name)
            if os.path.isfile(src_file_path):  # 是文件
                if os.path.splitext(src_file_path)[-1].lower() == self.type:  # 是指定文件类型
                    print(">>> {} 开始备份".format(file_name))
                    self.backup_file(src_file_path, dist_file_path)
                    print(">>> {} 备份完成".format(file_name))
                else:  # 不是指定文件类型
                    print("{} 文件类型不符合要求，跳过".format(file_name))
            else:  # 是文件夹
                self.backup_dir(src_file_path, dist_file_path)

    @staticmethod
    def backup_file(src_file_path, dist_file_path):
        """
        备份文件
        :param src_file_path: 源文件路径
        :param dist_file_path: 目标文件路径
        :return:
        """
        with open(src_file_path, 'rb') as file, open(dist_file_path, 'wb') as file_dist:
            while True:
                rest = file.read(100)
                if not rest:
                    break
                file_dist.write(rest)
            file_dist.flush()


if __name__ == '__main__':
    base_path = os.path.dirname(__file__)
    src_path = os.path.join(base_path, 'src')
    dist_path = os.path.join(base_path, 'dist')
    bak = FileBackup(src_path, dist_path, '.png')
    bak.backup()
```
语法：`with open('path1') as file1, open('path2') as file2:`。
注意：除文本文件之外，读取其他格式文件必须使用二进制模式`b`。
## 3.5 异常处理
1. 异常概述
异常是某个类的实例，有一些内置的异常类。
2. 内置的异常类
`Exception` - 几乎所有异常都是从它派生出来的
`AttributeError` - 引用属性或属性赋值失败时触发
`OSError` - 操作系统不能执行指定任务(例如打开文件)时触发
`IndexError` - 操作序列中不存在的索引时触发
`KeyError` - 操作映射中不存在的键时触发
`NameError` - 找不到变量时触发
`SyntaxError` - 代码不正确时触发
`TypeError` - 将内置操作或函数用于类型不正确的对象时触发
`ValueError` - 将内置操作或函数用于类型正确但包含的值不合适时触发
`ZeroDivisionError` - 除法或求模运算时第二个参数为零时触发
3. 异常捕获
```
def test_div(num1, num2):
    return num1 / num2


if __name__ == '__main__':

    # 一次捕获所有异常
    try:
        rest = test_div(5, 0)
        print("{}结果是".format(rest))
    except Exception as err:
        print(err)  # 出错了

    # 一次捕获某一个异常
    try:
        rest = test_div(5, 0)
        print("{}结果是".format(rest))
    except ZeroDivisionError:
        print("报错了，除数不能为0")  # 报错了，除数不能为0
    except TypeError:
        print("报错了，请输入数字")

    # 一次捕获多个异常
    try:
        rest = test_div(5, '0')
        print("{}结果是".format(rest))
    except (ZeroDivisionError, TypeError):
        print("异常了")  # 异常了

    # 捕获并打印异常
    try:
        rest = test_div(5, 0)
        print("{}结果是".format(rest))
    except (ZeroDivisionError, TypeError) as err:
        print(err)  # division by zero

    # finally语法
    try:
        rest = test_div(5, '1')
    except Exception as err:
        print(err)  # unsupported operand type(s) for /: 'int' and 'str'
    finally:
        print("finally")
```
4. 异常应用
```
try:
    f = open("1.txt", 'r')
    rest = f.read()
    print(rest)
except Exception as err:
    print(err)  # [Errno 2] No such file or directory: '1.txt'
finally:
    try:
        f.close()
        print('closed')
    except Exception as err:
        print(err)  # name 'f' is not defined
```
注意：如果文件不存在的话，`open()`和`close()`都会抛出异常，所以都要加异常捕获。
5. 自定义异常
通过继承`Exception`类来自定义异常。
```
class ApiException(Exception):
    def __init__(self, code, msg):
        self.code = code
        self.msg = msg

    def __str__(self):
        return "Error: {} - {}".format(self.code, self.msg)


def divide(num1, num2):
    """除法实现"""
    if not isinstance(num1, int) or not isinstance(num2, int):
        raise ApiException('400001', '两个参数必须都是整数')
    if num2 == 0:
        raise ApiException('400002', '除数不能为0')
    return num1 / num2


if __name__ == "__main__":
    try:
        print(divide(5, 0))
    except ApiException as err:
        print(err)  # Error: 400002 - 除数不能为0
```
6. 异常的传递
如果异常不被捕获，那么它会一层一层的向上传递。
```
def my_for():
    for i in range(1, 10):
        print(i)
        if i == 5:
            raise Exception('这是一个异常')


def do_sth():
    my_for()


def test_trans():
    do_sth()


if __name__ == '__main__':
    try:
        test_trans()
    except Exception as err:
        print(err)  # 1 2 3 4 5 这是一个异常
```
