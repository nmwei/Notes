# 1. 内存管理机制
## 1.1 课程介绍
1. 课程概要
赋值语句内存分析
垃圾回收机制
内存管理机制
2. 课程目标
掌握赋值语句内存分析方法
掌握`id()`和`is`的使用
了解`Python`的垃圾回收机制
了解`Python`的内存管理机制
3. 内存与硬盘
内存是电脑的数据存储设备之一，其特点为容量较小，但数据传送速度较快，用以弥补硬盘虽然容量大但传送速度慢的缺点。
## 1.2 内存管理机制
1. `is`、`id()`和`==`
`a is b`等价于`id(a) == id(b)`，比较的是`id`(内存标识)是否相同。
`a == b`比较的是`value`(值)是否相同。
```
a1 = 5
a2 = 5
print(id(a1))  # 4313714912
print(id(a1) == id(a2), a1 is a2)  # True True

b1 = 'abc'
b2 = 'abc'
print(b1 == b2, b1 is b2)  # True True

c1 = [1]
c2 = [1]
print(c1 == c2, c1 is c2)  # True False

d1 = {'a': 1}
d2 = {'a': 1}
print(d1 == d2, d1 is d2)  # True False
```
2. 内存管理示例
```
def extend_list(value, list=[]):
    list.append(value)
    return list


l1 = extend_list(10)
l2 = extend_list(123, [])
l3 = extend_list('a')
print(l1)  # [10, 'a']
print(l2)  # [123]
print(l3)  # [10, 'a']
```
3. 垃圾回收机制
以引用计数为主，分代收集为辅。
```
class Cat(object):
    def __init__(self):
        print('{} init'.format(id(self)))

    def __del__(self):
        print('{} del'.format(id(self)))


while True:
    """ 自动回收内存 """
    c1 = Cat()


l = []
while True:
    """ 一直被引用，内存不会释放 """
    c1 = Cat()
    l.append(c1)
```
注意：在引用计数垃圾回收机制中，循环引用会导致内存泄漏。
4. 引用计数
每个对象都存在指向该对象的引用计数。
查看某个对象的引用计数：`sys.getrefcount()`
删除某个引用： `del`
```
import sys

# 基本数据类型
i = 1
print(sys.getrefcount(i))  # 181
i1 = 1
i2 = i1
print(sys.getrefcount(i))  # 183
del i1
print(sys.getrefcount(i))  # 182

# 引用数据类型
l = []
print(sys.getrefcount(l))   # 2
l1 = l
l2 = l1
print(sys.getrefcount(l))  # 4
del l2
print(sys.getrefcount(l))  # 3
```
5. 分代收集
`Python`将所有的对象分为`0`，`1`，`2`三代。
所有新建对象都是`0`代对象。
当某一代对象经历过垃圾回收，依然存活，那么它就被归入下一代对象。
6. 垃圾回收时机
当`Python`运行时，会记录其中分配对象(`object allocation`)和取消分配对象(`object deallocation`)的次数。当两者的差值高于某一个阈值时，垃圾回收才会启动。
查看阈值：`gc.get_threshold()` 
```
import gc

print(gc.get_threshold())  # (700, 10, 10) 依次表示第0、1、2代垃圾回收阈值
```
7. 手动回收
`gc.collect()`手动回收。
`objgraph`模块中的`count()`可以记录当前类产生的未回收实例对象个数。
```
class Person(object):
    pass


class Cat(object):
    pass


p = Person()
c = Cat()
p.pet = c
c.master = p
print(sys.getrefcount(p))  # 3
print(sys.getrefcount(c))  # 3

print(objgraph.count('Person'))  # 1
print(objgraph.count('Cat'))  # 1

del p
del c
gc.collect()  # p与c循环引用。如果不使用del，则无法回收。
print(objgraph.count('Person'))  # 0
print(objgraph.count('Cat'))  # 0
```
8. 内存池(`memory pool`)机制
当创建大量小内存对象时，频繁调用`new / malloc`会导致大量内存碎片，效率降低。内存池就是预先在内存中申请一定数量的、大小相等的内存块留作备用，当有新的内存需求时，就先从内存池中分配内存给这个需求，不够了再申请新的内存。这样做可以减少内存碎片，提高效率。
`Python3`中的内存管理机制——`Pymalloc`
针对小对象(`<=512bytes`)，`pymalloc`会在内存池中申请内存空间。
当内存`>512bytes`时，则使用`PyMen_RawMalloc()`和`PyMem_RawRealloc()`来申请新的内存空间。
注释：`1 Byte = 8 Bits`(即`1B = 8b`)
## 1.3 课程总结
1. 赋值语句内存分析
使用`id()`方法访问内存地址
使用`is`比较内存地址是否相同
2. 垃圾回收机制
引用计数为主，分代收集为辅
引用计数的缺陷是循环引用问题
3. 内存管理机制
内存池(`memory pool`)机制
# 2. 线程、进程、协程
## 2.1 课程介绍
1. 章节概要
进程、线程与并发
对多核的利用
实现一个线程
线程之间的通信
线程的调度和优化
2. 使用场景
快速高效的爬虫程序
多用户同时访问`Web`服务
电商秒杀、抢购活动
物联网传感器监控服务
## 2.2 线程
1. 线程介绍
在同一个进程下执行，并共享相同的上下文。
一个进程中的各个线程与主线程共享**同一片**数据空间。
线程包括开始、执行顺序和结束三部分。
线程可以被强占(中断)和临时挂起(睡眠)——让步
2. 多核的利用
单核`CPU`系统中，不存在真正的并发。
`GIL`全局解释器锁 - 强制在任何时候只有一个线程可以执行`Python`代码。
`I/O`密集型应用与`CPU`密集型应用。
3. `GIL`执行顺序
(1) 设置`GIL`
(2) 切换进一个线程去执行
(3) 执行下面操作之一
指定数量的字节码指令；
线程主动让出控制权(可以调用`time.sleep(0)`来完成)。
(4) 把线程设置回睡眠状态(切换出线程)
(5) 解锁`GIL`
(6) 重复上述步骤
4. `threading`模块对象
![threading模块对象](https://upload-images.jianshu.io/upload_images/4989175-8894d3b0e01adaa9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
5. `Thread`对象方法
![Thread对象方法](https://upload-images.jianshu.io/upload_images/4989175-ea3ff3e091d9504b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
6. 线程实现(面向过程)
```
import threading
import time


def loop():
    """ 新的线程执行的代码  """
    loop_thread = threading.current_thread()
    print('loop_thread: {}'.format(loop_thread.name))  # loop_thread: loop_thread
    n = 0
    while n < 5:
        print(n)  # 0 1 2 3 4
        n += 1


def use_thread():
    """ 新的线程执行函数 """
    now_thread = threading.current_thread()
    print('now_thread: {}'.format(now_thread.name))  # now_thread: MainThread
    # 创建线程
    t = threading.Thread(target=loop, name='loop_thread')
    # 启动线程
    t.start()
    # 挂起线程
    t.join()


if __name__ == '__main__':
    use_thread()
```
7. 线程实现(面向对象)
```
import threading


class LoopThread(threading.Thread):
    """ 自定义线程 """
    n = 0

    def run(self):
        loop_thread = threading.current_thread()
        print('loop_thread: {}'.format(loop_thread.name))  # loop_thread: loop_thread
        while self.n < 5:
            print(self.n)  # 0 1 2 3 4
            self.n += 1


if __name__ == '__main__':
    now_thread = threading.current_thread()
    print('now_thread: {}'.format(now_thread.name))  # now_thread: MainThread
    # 创建线程
    t = LoopThread(name='loop_thread')
    # 启动线程
    t.start()
    # 挂起线程
    t.join()
```
8. 多线程及存在的问题
```
import threading

# 我的银行账户
balance = 0

def change(n):
    global balance  # 局部作用域如果要修改全局变量，则需要global关键字声明。
    balance = balance + n
    balance = balance - n
    if balance != 0:
        print(balance) # balance有可能是-8 -5 0 5 8


class ChangeBalanceThread(threading.Thread):

    def __init__(self, num, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.num = num

    def run(self):
        for i in range(100000):
            change(self.num)


if __name__ == '__main__':
    # 创建线程
    t1 = ChangeBalanceThread(5)
    t2 = ChangeBalanceThread(8)
    # 启动线程
    t1.start()
    t2.start()
    # 挂起线程
    t1.join()
    t2.join()
```
注意：局部作用域如果要修改全局变量，则需要`global`关键字声明。
9. 锁
```
import threading

# 锁
my_lock = threading.Lock()

# 我的银行账户
balance = 0

def change(n):
    global balance  # 局部作用域如果要修改全局变量，则需要global关键字声明。
    # 添加锁
    my_lock.acquire()
    try:
        balance = balance + n
        balance = balance - n
        if balance != 0:
            print(balance)
    finally:
        # 释放锁
        my_lock.release()


class ChangeBalanceThread(threading.Thread):

    def __init__(self, num, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.num = num

    def run(self):
        for i in range(100000):
            change(self.num)


if __name__ == '__main__':
    # 创建线程
    t1 = ChangeBalanceThread(5)
    t2 = ChangeBalanceThread(8)
    # 启动线程
    t1.start()
    t2.start()
    # 挂起线程
    t1.join()
    t2.join()
```
10. 锁的简单写法
```
# 锁
my_lock = threading.Lock()

# 我的银行账户
balance = 0

def change(n):
    global balance 
    # 添加锁
    with my_lock:
        balance = balance + n
        balance = balance - n
        if balance != 0:
            print(balance)
```
11. 死锁
```
# 锁
my_lock = threading.Lock()

# 我的银行账户
balance = 0

def change(n):
    global balance
    # 添加锁
    my_lock.acquire()
    my_lock.acquire()
    try:
        balance = balance + n
        balance = balance - n
        print(balance)
    finally:
        # 释放锁
        my_lock.release()
        my_lock.release()
```
12. `threading.RLock`
我们使用`threading.Lock()`来进行加锁。`threading`中还提供了另外一个`threading.RLock()`锁。在同一线程内，对`RLock`进行多次`acquire()`操作，程序不会阻塞。
```
# 锁
my_lock = threading.RLock()

# 我的银行账户
balance = 0


def change(n):
    global balance  # 局部作用域如果要修改全局变量，则需要global关键字声明。
    # 添加锁
    my_lock.acquire()
    my_lock.acquire()
    try:
        balance = balance + n
        balance = balance - n
        print(balance)
    finally:
        # 释放锁
        my_lock.release()
        my_lock.release()
```
13. 使用线程池
```
import time
import threading
from concurrent.futures.thread import ThreadPoolExecutor
from multiprocessing.dummy import Pool


def run(n):
    """ 线程要做的事情 """
    time.sleep(1)
    print('thread: {}; n: {}'.format(threading.current_thread().name, n))


def main():
    """ 主线程做任务 """
    t1 = time.time()
    for n in range(100):
        run(n)
    print(time.time() - t1)  # 100.30s


def main_use_thread():
    """ 多线程做任务。10个线程。"""
    t2 = time.time()
    ls = []
    for i in range(100):
        t = threading.Thread(target=run, args=(i,))
        ls.append(t)
        t.start()
    for l in ls:
        l.join()
    print(time.time() - t2)  # 1.01s


def main_use_pool():
    """ 线程池 """
    t3 = time.time()
    pool = Pool(10)
    n_list = range(100)
    pool.map(run, n_list)
    pool.close()
    pool.join()
    print(time.time() - t3)  # 12.08s


def main_use_executor():
    """ 使用ThreadPoolExecutor来优化 """
    t4 = time.time()
    n_list = range(100)
    with ThreadPoolExecutor(max_workers=10) as executor:
        executor.map(run, n_list)
    print(time.time() - t4)  # 10.03s


if __name__ == '__main__':
    main()
    main_use_thread()
    main_use_pool()
    main_use_executor()
```
注意：线程传参的方式`threading.Thread(target=run, args=(i,))`。其中，`(i,)`表示元组。
## 2.3 进程
1. 进程介绍
是一个执行中的程序。
每个进程都拥有**自己的**地址空间、内存、数据栈以及其他用于跟踪执行的辅助数据。
操作系统管理所有进程的执行，并为这些进程合理地分配时间。
进程也可通过派生(`fork`或`spawn`)新的进程来执行其他任务。
2. 进程实现(面向过程)
```
import os
import time
from multiprocessing import Process


def do_sth(name):
    print("进程名称: {}, pid: {}".format(name, os.getpid()))  # 进程名称: my_process, pid: 47634
    time.sleep(3)
    print("进程要做的事情结束")  # 进程要做的事情结束


if __name__ == '__main__':
    print('当前进程pid: {}'.format(os.getpid()))  # 当前进程名称: 47651
    p = Process(target=do_sth, args=('my_process',))
    # 启动进程
    p.start()
    # 挂起进程
    p.join()
```
3. 进程实现(面向对象)
```
import os
import time
from multiprocessing import Process


class MyProcess(Process):
    def run(self):
        print("进程名称: {}, pid: {}".format(self.name, os.getpid()))  # 进程名称: my_process, pid: 47758
        time.sleep(3)
        print("进程要做的事情结束")  # 进程要做的事情结束


if __name__ == '__main__':
    print('当前进程pid: {}'.format(os.getpid()))  # 当前进程名称: 47757
    p = MyProcess(name='my_process')
    # 启动进程
    p.start()
    # 挂起进程
    p.join()
```
4. 进程之间通信
通过`Queue`、`Pipes`等实现进程之间的通信。
```
import time
import random
from multiprocessing import Process, Queue, current_process


class WriteProcess(Process):
    """ 写入的进程 """
    def __init__(self, queue, *args, **kwargs):
        self.queue = queue
        super().__init__(*args, **kwargs)

    def run(self):
        ls = [
            '第1行内容',
            '第2行内容',
            '第3行内容',
            '第4行内容',
            '第5行内容',
        ]
        for line in ls:
            print('进程名称: {}, 写入内容: {}'.format(current_process().name, line))
            self.queue.put(line)
            # 没写入一次，休息1-3s
            time.sleep(random.randint(1, 3))


class ReadProcess(Process):
    """ 读取的进程 """
    def __init__(self, queue, *args, **kwargs):
        self.queue = queue
        super().__init__(*args, **kwargs)

    def run(self):
        while True:
            content = self.queue.get()
            print('进程名称: {}, 读取内容: {}'.format(self.name, content))


if __name__ == '__main__':
    # 通过Queue共享数据
    q = Queue()
    # 写入内容的进程
    t_write = WriteProcess(q)
    t_write.start()
    # 读取内容的进程
    t_read = ReadProcess(q)
    t_read.start()
    t_write.join()
    # t_read.join() 
    t_read.terminate()
```
注意：进程类中的`self.name`等价于`current_process().name`。
5. 多进程中的锁
```
import random
import time
from multiprocessing import Process, Lock


class WriteProcess(Process):
    """ 写入文件 """
    lock = Lock()

    def __init__(self, file_name, index, *args, **kwargs):
        self.file_name = file_name
        self.index = index
        super().__init__(*args, **kwargs)

    def run(self):
        with self.lock:
            for i in range(5):
                with open(self.file_name, 'a+', encoding='utf-8') as f:
                    content = '现在是: {}, pid为: {}, 进程序号为: {}\n'.format(
                        self.name,
                        self.pid,
                        self.index
                    )
                    f.write(content)
                    time.sleep(random.randint(1, 5))
                    print(content)


if __name__ == '__main__':
    file_name = 'test.txt'
    for i in range(5):
        p = WriteProcess(file_name, i)
        p.start()
```
6. `multiprocessing.RLock`
我们使用`multiprocessing.Lock()`来进行加锁。`multiprocessing`中还提供了另外一个`multiprocessing.RLock()`锁。在同一进程内，对`RLock`进行多次`acquire()`操作，程序不会阻塞。
7. 进程池
```
import os
import random
import time
from multiprocessing import current_process, Pool


def run(file_name, index):
    """ 进程任务 """
    with open(file_name, 'a+', encoding='utf-8') as f:
        now_process = current_process()
        content = '{} - {} - {} \n'.format(
            now_process.name,
            now_process.pid,
            index
        )
        f.write(content)
        time.sleep(random.randint(1, 3))
        print(content)
        return 'OK'


if __name__ == '__main__':
    # print(os.cpu_count())  # 4核CPU
    file_name = 'test_pool.txt'
    pool = Pool(2)  # 创建有两个进程的进程池
    for i in range(20):
        # 同步添加任务
        # rest = pool.apply(run, args=(file_name, i))
        # 异步添加任务
        rest = pool.apply_async(run, args=(file_name, i))
        print('{} {}'.format(i, rest))
    pool.close()  # 关闭进程池
    pool.join()
```
注释：异步添加任务，不能保证任务的执行顺序。同步添加任务，可以保证任务的执行顺序。
## 2.4 协程
1. 协程介绍
协程就是协同多任务。
协程在一个进程或者是一个线程中执行。
协程不需要锁机制。
2. `yield`生成器
```
def count_down(n):
    """ 倒计时效果 """
    while n > 0:
        yield n
        n -= 1

if __name__ == '__main__':
    rest = count_down(5)
    print(next(rest))  # 5
    print(next(rest))  # 4
    print(next(rest))  # 3
    print(next(rest))  # 2
    print(next(rest))  # 1
```
3. `Python3.5`以前协程实现
使用生成器(`yield`)实现
```
def yield_test():
    """ 实现协程函数 """
    while True:
        n = (yield )
        print(n)


if __name__ == '__main__':
    rest = yield_test()
    next(rest)
    rest.send('1')  # 1
    rest.send('2')  # 2
```
4. `Python3.5`以后协程实现
使用`async`和`await`关键字实现
```
import asyncio


async def do_sth(x):
    print("等待中: {}".format(x))
    await asyncio.sleep(x)

# 判断是否是协程函数
print(asyncio.iscoroutinefunction(do_sth))  # True

# 创建任务
coroutine = do_sth(5)
# 创建事件循环队列
loop = asyncio.get_event_loop()
# 注册任务
task = loop.create_task(coroutine)
print(task)  # <Task pending coro=<do_sth() running at /Users/nimengwei/Code/mycode/python/Python零基础入门/Python基础知识/chapter09/async_test.py:4>>
# 等待协程任务执行结束
loop.run_until_complete(task)
print(task)  # <Task finished coro=<do_sth() done, defined at /Users/nimengwei/Code/mycode/python/Python零基础入门/Python基础知识/chapter09/async_test.py:4> result=None>
```
注意：必须使用`asyncio.sleep()`，不能使用`time.sleep()`。只有前者能返回一个协程对象。
5. 协程通信之嵌套调用
```
import asyncio


async def compute(x, y):
    await asyncio.sleep(1)
    return x + y


async def get_sum(x, y):
    rest = await compute(x, y)
    print("计算{} + {} = {}".format(x, y, rest))

loop = asyncio.get_event_loop()
# loop.run_until_complete(loop.create_task(get_sum(1, 2)))
loop.run_until_complete(get_sum(1, 2))
loop.close()
```
6. 协程通信之队列
```
import asyncio
import random


async def add(store):
    """ 写入数据到队列 """
    for i in range(5):
        await asyncio.sleep(random.randint(1, 3))
        await store.put(i)
        print('add {}, queue size: {}'.format(i, store.qsize()))


async def reduce(store):
    """ 从队列中删除数据 """
    for i in range(10):
        rest = await store.get()
        print('reduce {}, queue size: {}'.format(rest, store.qsize()))


if __name__ == '__main__':
    # 准备一个队列
    store = asyncio.Queue(maxsize=5)
    a1 = add(store)
    a2 = add(store)
    r1 = reduce(store)

    # 添加到事件队列
    loop = asyncio.get_event_loop()
    loop.run_until_complete(asyncio.gather(a1, a2, r1))
    loop.close()
```



