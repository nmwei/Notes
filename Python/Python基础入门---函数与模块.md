# 1. 函数
## 1.1 介绍
1. 课时介绍
(1) 函数介绍。
(2) 函数参数与返回值。
(3) 函数应用。
2. 目标
(1) 掌握函数的作用和如何定义函数。
(2) 理解函数中的形参与实参。
(3) 理解函数中的返回值。
## 1.2 函数介绍
1. 函数介绍
函数(`Function`)是实现具有特定功能的代码块。
2. 函数特点
隐藏实现功能的细节。
复用代码。
提高可读性、便于调试。
3. 函数定义
```
'''
def 函数名(形参1, 形参2, 形参3....):
      函数体
      return 返回值
'''
```
```
# 函数定义
def goose():
    print("鹅,鹅,鹅，曲项向天歌。白毛浮绿水，红掌拨清波。")
    # 向控制台输出50个*号分隔符
    print("*" * 40)

    
# 函数调用
goose()
goose()
goose()
```
## 1.3 函数使用
1. 函数参数
```
def oper(num, num1, num2):
    if num < 100:
        print(num1 * num2)
    else:
        print(num1 + num2)


oper(1314, 52, 0) # 52
oper(5, 2, 0) # 0
```
2. 函数返回值
```
def default_return():
    print("函数默认返回值")


print(default_return()) 
# 函数默认返回值
# None
```
```
def login(username,password):
    if username == "imooc" and password == "123456":
        return "登录成功"
    else:
        return "请重新登录"

    
print(login("imooc", "123456")) # 登录成功
print(login("mooc", "123456"))  #请重新登录
```
注释：如果没有返回值，默认返回值`None`。
3. 参数默认值
```
def default_param(a, b = 2, c = 3):
    print(a + b + c)


default_param(1) # 6
default_param(1, 3) # 7
default_param(1, 3, 5) # 9
```
4. 关键字传参 
关键字传参可以是无序的。
```
def keyword_param(name, age, height):
    print(name, age, height)


keyword_param('张三', 28, 178) # 张三 28 178
keyword_param('张三', age=28, height=178)  # 张三 28 178
keyword_param(age=28, name='张三', height=178)  # 张三 28 178
```
5. 混合形式传参
函数定义时，`*`之后的参数表示必须通过关键字参数。
```
def keyword_param(name, *, age, height):
    print(name, age, height)


keyword_param('张三', age=28, height=178)  
# 张三 28 178
keyword_param(age=28, name='张三', height=178)  
# 张三 28 178
keyword_param('张三', age=28, 178) 
# SyntaxError: positional argument follows keyword argument
```
```
def info(*, desc,birth, name='imooc'):
    print("{}-{}出生于{}".format(name, desc, birth))


info(desc = "程序员的梦工厂", birth= "2013年8月")
```
6. 序列传参
```
def calc(a, b, c):
    return (a + b) * c


print([1, 5, 10]) # [1, 5, 10]
print(*[1, 5, 10]) # 1 5 10
print(calc(*[1, 5, 10])) # 60
```
7. 元组传参
```
def seq(num,num1,num2):
    if num < 88:
        return num1 * num2
    else:
        return num1 + num2


tuple1 = (5,2,1)
print(seq(*tuple1)) # 2
```
8. 字典传参
```
def health_check(name, age, height):
    print(name, age, height)


health_check(**{'name': '张三', 'height':178, 'age': 26})
# 张三 26 178
```
9. 返回值包含多个数据
```
def get_detail():
    return {
        'asset': 20000000,
        'employee': [
            {'name': '张三', 'salary': 10000},
            {'name': '李四', 'salary': 16000}
        ]
    }


print(get_detail().get('employee')[0].get('salary')) #10000
```
10. 随机数
```
import random

r = random.randint(1, 16)
print(r) #11
```
## 1.4 项目实战
1. 功能介绍
(1) 双色球随机选号
(2) 号码百事通
(3) 天气预报
2. 代码实现
```
import random

phone_numbers_str = "匪警[110],火警[119],急救中心[120]"
weather_str = "南京,07月05日,23-31℃,阴转多云,东南风3-4级~北京,07月05日,21-29℃,小雨转雷阵雨,东北风3-4级"


# 生成双色球(随机数、嵌套循环)
def generate_unionlotto(n):
    for j in range(0, int(n)):
        for i in range(0, 6):
            red = random.randint(1, 33)
            print(red, end=" ")
        blue = random.randint(1, 16)
        print(blue)


# 号码百事通(字符串切割、列表)
def find_phone(keyword):
    phone_list = phone_numbers_str.split(",")
    for p in phone_list:
        if p.find(keyword) != -1:
            print(p)


# 获取指定城市天气(字符串切割、字典)
def get_weather(city):
    city_list = weather_str.split("~")
    weather_data = {}
    for c in city_list:
        w = c.split(",")
        weather_data[w[0]] = {
            "city": w[0],
            "date": w[1],
            "temperature": w[2],
            "weather": w[3],
            "wind": w[4]
        }
    if city in weather_data:
        return weather_data.get(city)
    else:
        return {}


while True:
    print("1-双色球随机选号")
    print("2-号码百事通")
    print("3-明日天气预报")
    print("0-结束程序")

    c = input("请输入功能编号：")
    if c == "1":
        generate_unionlotto(input("您要生成几注双色球号码: "))
    elif c == "2":
        n = input("请输入您要查询的机构或者电话号码: ")
        find_phone(keyword=n)
    elif c == "3":
        n = input("请输入您要查询的天气: ")
        w = get_weather(n)
        if "city" in w:
            print("{city} {date} {temperature} {weather} {wind}".format_map(w))
        else:
            print("未找到{}的天气数据".format(n))
    elif c == "0":
        break
    else:
        print("您输入的功能编号有误，请重新输入")
    print("====================================================")

print("感谢您的使用，祝您生活愉快,再见！")
```
# 2. 模块与包
## 2.1 介绍
1. 章节概要
`Python`模块介绍；模块导入及定位；模块属性；
包的介绍及使用；标准模块；第三方模块。
## 2.2 模块介绍
1. 模块介绍 
模块就是程序，模块的名称就是不含`.py`后缀的文件名。
2. 模块的好处
可维护性更强，方便代码重用。
3. 模块导入

`chapter/hello.py`
```python
def func():
    print('hello world！')
```
`chapter/test.py`
```python
import hello

hello.func()  #hello world！
```
4. 模块定位
从左到右优先级依次降低：
当前包 → 内置函数 → `sys.path`(环境变量)
```
Last login: Sat Jul  6 07:59:21 on ttys003
➜  ~ python
Python 2.7.15 (default, Oct  2 2018, 12:50:38) 
[GCC 4.2.1 Compatible Apple LLVM 9.0.0 (clang-900.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import hello
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ImportError: No module named hello
>>> import sys
>>> sys.path
['', '/usr/local/Cellar/python@2/2.7.15_1/Frameworks/Python.framework/Versions/2.7/lib/python27.zip', '/usr/local/Cellar/python@2/2.7.15_1/Frameworks/Python.framework/Versions/2.7/lib/python2.7', '/usr/local/Cellar/python@2/2.7.15_1/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-darwin', '/usr/local/Cellar/python@2/2.7.15_1/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-mac', '/usr/local/Cellar/python@2/2.7.15_1/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-mac/lib-scriptpackages', '/usr/local/Cellar/python@2/2.7.15_1/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-tk', '/usr/local/Cellar/python@2/2.7.15_1/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-old', '/usr/local/Cellar/python@2/2.7.15_1/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-dynload', '/usr/local/lib/python2.7/site-packages']
>>> sys.path.append("/Users/nimengwei/Code/mycode/python/imooc-project/chapter01")
>>> import hello
>>> hello.func()
hello world
```
5. 模块属性
`dir` - 列出对象的所有属性及方法
`__name__` - 模块的名称
`__file__` - 文件全路径
`help` - 查看类、方法的帮助信息
(1) 模块代码
```
'''
文档注释
hello模块
'''
name = 'Hello Module'


def func():
    print('hello world')


def add(num1, num2):
    return num1 + num2
```
(2) 命令行输出
```
(venv) ➜  chapter01 python3
Python 3.7.1 (default, Nov 28 2018, 11:55:14) 
[Clang 9.0.0 (clang-900.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import hello
>>> dir(hello)
['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'add', 'func', 'name']
>>> hello.__name__
'hello'
>>> hello.__file__
'/Users/nimengwei/Code/mycode/python/imooc-project/chapter01/hello.py'
>>> hello.__doc__
'\n文档注释\nhello模块\n'
>>> dir(hello.add)
['__annotations__', '__call__', '__class__', '__closure__', '__code__', '__defaults__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__get__', '__getattribute__', '__globals__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__kwdefaults__', '__le__', '__lt__', '__module__', '__name__', '__ne__', '__new__', '__qualname__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__']
>>> help(hello)
NAME
    hello

DESCRIPTION
    文档注释
    hello模块

FUNCTIONS
    add(num1, num2)
    
    func()

DATA
    name = 'Hello Module'

FILE
    /Users/nimengwei/Code/mycode/python/imooc-project/chapter01/hello.py

>>> quit()
(venv) ➜  chapter01 
```
## 2.3 包介绍及引用
1. 包的简介
包可以用来组织模块。
包目录必须包含文件`__init__.py`。
包解决了模块命名冲突问题。
![image.png](https://upload-images.jianshu.io/upload_images/4989175-5acbe9508ccdeb49.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
注释：包与文件夹的区别在于多了一个`__init__.py`文件。
2. 包的引用
(1) 引入整个包
`import module`
(2) 只引入所需要的属性和方法
`from module.XX.XX import XX`
(3) 指定别名
`from module.XX.XX import XX as rename`
(4) 引入所有(不推荐)
`from module.XX import *`
```
from alipay.tools import pay
from wechat_pay.tools import pay as we_pay
import alipay

pay() #alipay
we_pay() #wechat pay
alipay.tools.pay() #alipay
```
注意：`from`右侧可以通过`.`进行多层查找，`import`右侧不可以。
# 3. 标准模块与第三方模块
## 3.1 介绍
1. 章节概要
标准模块：`os`及`os.path`模块；时间、日期模块。
第三方模块：第三方模块安装与使用。
## 3.2 标准模块
1. 文档
`Python`文档：[https://docs.python.org/zh-cn/3.7/](https://docs.python.org/zh-cn/3.7/)
`os 模块`文档：[https://docs.python.org/zh-cn/3.7/library/os.html](https://docs.python.org/zh-cn/3.7/library/os.html)
2. `os`模块语法
`environ`：包含环境变量的映射。
`system(command)`：在子`shell`中执行操作系统命令。
`sep`：路径中使用的分隔符。
`pathsep`：分隔不同路径的分隔符。
`linesep`：行分隔符(`\n`、`\r`或`\r\n`)。
`urandom(n)`：返回`n`个字节的强加密随机数据。
`argv`：命令行参数，包括脚本名。
`getcwd`：放回当前所在的目录。
`modules`：一个字典，将模块名映射到加载的模块。
`path`：一个列表，包含要在其中查找模块的目录的名称。
`platform`：一个平台标识符，如`sunos5`或`win32`。
`mkdir/rmdir`：创建和删除文件夹。
`os.path`：文件目录相关操作。
3. `os`模块使用
```
(venv) ➜  imooc-project python3
Python 3.7.1 (default, Nov 28 2018, 11:55:14) 
[Clang 9.0.0 (clang-900.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import os
>>> dir(os)
['CLD_CONTINUED', 'CLD_DUMPED', 'CLD_EXITED', 'CLD_TRAPPED', 'DirEntry', 'EX_CANTCREAT', 'EX_CONFIG', 'EX_DATAERR', 'EX_IOERR', 'EX_NOHOST', 'EX_NOINPUT', 'EX_NOPERM', 'EX_NOUSER', 'EX_OK', 'EX_OSERR', 'EX_OSFILE', 'EX_PROTOCOL', 'EX_SOFTWARE', 'EX_TEMPFAIL', 'EX_UNAVAILABLE', 'EX_USAGE', 'F_LOCK', 'F_OK', 'F_TEST', 'F_TLOCK', 'F_ULOCK', 'MutableMapping', 'NGROUPS_MAX', 'O_ACCMODE', 'O_APPEND', 'O_ASYNC', 'O_CLOEXEC', 'O_CREAT', 'O_DIRECTORY', 'O_DSYNC', 'O_EXCL', 'O_EXLOCK', 'O_NDELAY', 'O_NOCTTY', 'O_NOFOLLOW', 'O_NONBLOCK', 'O_RDONLY', 'O_RDWR', 'O_SHLOCK', 'O_SYNC', 'O_TRUNC', 'O_WRONLY', 'PRIO_PGRP', 'PRIO_PROCESS', 'PRIO_USER', 'P_ALL', 'P_NOWAIT', 'P_NOWAITO', 'P_PGID', 'P_PID', 'P_WAIT', 'PathLike', 'RTLD_GLOBAL', 'RTLD_LAZY', 'RTLD_LOCAL', 'RTLD_NODELETE', 'RTLD_NOLOAD', 'RTLD_NOW', 'R_OK', 'SCHED_FIFO', 'SCHED_OTHER', 'SCHED_RR', 'SEEK_CUR', 'SEEK_DATA', 'SEEK_END', 'SEEK_HOLE', 'SEEK_SET', 'ST_NOSUID', 'ST_RDONLY', 'TMP_MAX', 'WCONTINUED', 'WCOREDUMP', 'WEXITED', 'WEXITSTATUS', 'WIFCONTINUED', 'WIFEXITED', 'WIFSIGNALED', 'WIFSTOPPED', 'WNOHANG', 'WNOWAIT', 'WSTOPPED', 'WSTOPSIG', 'WTERMSIG', 'WUNTRACED', 'W_OK', 'X_OK', '_Environ', '__all__', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', '_execvpe', '_exists', '_exit', '_fspath', '_fwalk', '_get_exports_list', '_putenv', '_spawnvef', '_unsetenv', '_wrap_close', 'abc', 'abort', 'access', 'altsep', 'chdir', 'chflags', 'chmod', 'chown', 'chroot', 'close', 'closerange', 'confstr', 'confstr_names', 'cpu_count', 'ctermid', 'curdir', 'defpath', 'device_encoding', 'devnull', 'dup', 'dup2', 'environ', 'environb', 'error', 'execl', 'execle', 'execlp', 'execlpe', 'execv', 'execve', 'execvp', 'execvpe', 'extsep', 'fchdir', 'fchmod', 'fchown', 'fdopen', 'fork', 'forkpty', 'fpathconf', 'fsdecode', 'fsencode', 'fspath', 'fstat', 'fstatvfs', 'fsync', 'ftruncate', 'fwalk', 'get_blocking', 'get_exec_path', 'get_inheritable', 'get_terminal_size', 'getcwd', 'getcwdb', 'getegid', 'getenv', 'getenvb', 'geteuid', 'getgid', 'getgrouplist', 'getgroups', 'getloadavg', 'getlogin', 'getpgid', 'getpgrp', 'getpid', 'getppid', 'getpriority', 'getsid', 'getuid', 'initgroups', 'isatty', 'kill', 'killpg', 'lchflags', 'lchmod', 'lchown', 'linesep', 'link', 'listdir', 'lockf', 'lseek', 'lstat', 'major', 'makedev', 'makedirs', 'minor', 'mkdir', 'mkfifo', 'mknod', 'name', 'nice', 'open', 'openpty', 'pardir', 'path', 'pathconf', 'pathconf_names', 'pathsep', 'pipe', 'popen', 'pread', 'putenv', 'pwrite', 'read', 'readlink', 'readv', 'register_at_fork', 'remove', 'removedirs', 'rename', 'renames', 'replace', 'rmdir', 'scandir', 'sched_get_priority_max', 'sched_get_priority_min', 'sched_yield', 'sendfile', 'sep', 'set_blocking', 'set_inheritable', 'setegid', 'seteuid', 'setgid', 'setgroups', 'setpgid', 'setpgrp', 'setpriority', 'setregid', 'setreuid', 'setsid', 'setuid', 'spawnl', 'spawnle', 'spawnlp', 'spawnlpe', 'spawnv', 'spawnve', 'spawnvp', 'spawnvpe', 'st', 'stat', 'stat_result', 'statvfs', 'statvfs_result', 'strerror', 'supports_bytes_environ', 'supports_dir_fd', 'supports_effective_ids', 'supports_fd', 'supports_follow_symlinks', 'symlink', 'sync', 'sys', 'sysconf', 'sysconf_names', 'system', 'tcgetpgrp', 'tcsetpgrp', 'terminal_size', 'times', 'times_result', 'truncate', 'ttyname', 'umask', 'uname', 'uname_result', 'unlink', 'unsetenv', 'urandom', 'utime', 'wait', 'wait3', 'wait4', 'waitpid', 'walk', 'write', 'writev']
>>> os.environ
environ({'__INTELLIJ_COMMAND_HISTFILE__': '/Users/nimengwei/Library/Preferences/PyCharm2019.1/terminal/history/history-2', 'HOME': '/Users/nimengwei', 'ZDOTDIR': '', '__CF_USER_TEXT_ENCODING': '0x1F5:0x19:0x34', 'LOGIN_SHELL': '1', 'PATH': '/Users/nimengwei/Code/mycode/python/imooc-project/venv/bin:/Users/nimengwei/.nvm/versions/node/v10.10.0/bin:/Users/nimengwei/.rbenv/shims:/Users/nimengwei/.rbenv/shims:/Users/nimengwei/.rbenv/shims:/Users/nimengwei/.rbenv/bin:/usr/local/opt/openssl/bin:/Users/nimengwei/.yarn/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/nimengwei/.rbenv/shims:/Users/nimengwei/.rbenv/bin:/usr/local/opt/openssl/bin:/Users/nimengwei/.yarn/bin:/Users/nimengwei/Documents/Maven/apache-maven-3.6.1/bin:/usr/local/mysql/bin:/Users/nimengwei/Library/Android/sdk/tools:/Users/nimengwei/Library/Android/sdk/platform-tools:/Users/nimengwei/Documents/Ant/apache-ant-1.9.14/bin:/Users/nimengwei/.rvm/bin:/Users/nimengwei/Documents/Maven/apache-maven-3.6.1/bin:/usr/local/mysql/bin:/Users/nimengwei/Library/Android/sdk/tools:/Users/nimengwei/Library/Android/sdk/platform-tools:/Users/nimengwei/Documents/Ant/apache-ant-1.9.14/bin:/Users/nimengwei/.rvm/bin', 'USER': 'nimengwei', 'SSH_AUTH_SOCK': '/private/tmp/com.apple.launchd.tK0EFPaCjp/Listeners', 'TMPDIR': '/var/folders/9j/f0z7v4zs7xl5jy80flh4kclh0000gn/T/', 'SHELL': '/bin/zsh', 'LOGNAME': 'nimengwei', 'XPC_SERVICE_NAME': '0', 'LC_CTYPE': 'zh_CN.UTF-8', 'Apple_PubSub_Socket_Render': '/private/tmp/com.apple.launchd.aC7XQb9Z9r/Render', 'XPC_FLAGS': '0x0', 'TERM': 'xterm-256color', 'TERMINAL_EMULATOR': 'JetBrains-JediTerm', 'SHLVL': '1', 'PWD': '/Users/nimengwei/Code/mycode/python/imooc-project', 'OLDPWD': '/Users/nimengwei/Code/mycode/python/imooc-project/chapter01', 'ZSH': '/Users/nimengwei/.oh-my-zsh', 'PAGER': 'less', 'LESS': '-R', 'LSCOLORS': 'Gxfxcxdxbxegedabagacad', 'M2_HOME': '/Users/nimengwei/Documents/Maven/apache-maven-3.6.1', 'M2': '/Users/nimengwei/Documents/Maven/apache-maven-3.6.1/bin', 'ANDROID_HOME': '/Users/nimengwei/Library/Android/sdk', 'ANT_HOME': '/Users/nimengwei/Documents/Ant/apache-ant-1.9.14', 'NVM_DIR': '/Users/nimengwei/.nvm', 'NVM_CD_FLAGS': '-q', 'rvm_prefix': '/Users/nimengwei', 'rvm_path': '/Users/nimengwei/.rvm', 'rvm_bin_path': '/Users/nimengwei/.rvm/bin', '_system_type': 'Darwin', '_system_name': 'OSX', '_system_version': '10.14', '_system_arch': 'x86_64', 'rvm_version': '1.29.4 (latest)', 'RBENV_SHELL': 'zsh', 'NVM_BIN': '/Users/nimengwei/.nvm/versions/node/v10.10.0/bin', 'VIRTUAL_ENV': '/Users/nimengwei/Code/mycode/python/imooc-project/venv', 'PS1': '(venv) ${ret_status} %{$fg[cyan]%}%c%{$reset_color%} $(git_prompt_info)', 'rvm_alias_expanded': '', 'rvm_bin_flag': '', 'rvm_docs_type': '', 'rvm_gemstone_package_file': '', 'rvm_gemstone_url': '', 'rvm_niceness': '', 'rvm_nightly_flag': '', 'rvm_only_path_flag': '', 'rvm_pretty_print_flag': '', 'rvm_proxy': '', 'rvm_quiet_flag': '', 'rvm_ruby_bits': '', 'rvm_ruby_file': '', 'rvm_ruby_make': '', 'rvm_ruby_make_install': '', 'rvm_ruby_mode': '', 'rvm_script_name': '', 'rvm_sdk': '', 'rvm_silent_flag': '', 'rvm_use_flag': '', 'rvm_hook': '', '_': '/Users/nimengwei/Code/mycode/python/imooc-project/venv/bin/python3', '__PYVENV_LAUNCHER__': '/Users/nimengwei/Code/mycode/python/imooc-project/venv/bin/python3'})
>>> os.sep
'/'
>>> os.getcwd()
'/Users/nimengwei/Code/mycode/python/imooc-project'
>>> os.chdir('/Users/nimengwei/Desktop')
>>> os.getcwd()
'/Users/nimengwei/Desktop'
>>> os.listdir()
['.DS_Store', '.localized', 'mobile-21826', 'fr-plugin-h5Report-10.2.21.zip']
>>> os.mkdir('hello')
>>> os.listdir()
['.DS_Store', '.localized', 'mobile-21826', 'hello', 'fr-plugin-h5Report-10.2.21.zip']
>>> os.rename('hello', 'world')
>>> os.listdir()
['.DS_Store', '.localized', 'world', 'mobile-21826', 'fr-plugin-h5Report-10.2.21.zip']
>>> os.rmdir('world')
>>> os.listdir()
['.DS_Store', '.localized', 'mobile-21826', 'fr-plugin-h5Report-10.2.21.zip']
```
4. `op.path`模块使用
```
>>> dir(os.path)
['__all__', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', '_get_sep', '_joinrealpath', '_varprog', '_varprogb', 'abspath', 'altsep', 'basename', 'commonpath', 'commonprefix', 'curdir', 'defpath', 'devnull', 'dirname', 'exists', 'expanduser', 'expandvars', 'extsep', 'genericpath', 'getatime', 'getctime', 'getmtime', 'getsize', 'isabs', 'isdir', 'isfile', 'islink', 'ismount', 'join', 'lexists', 'normcase', 'normpath', 'os', 'pardir', 'pathsep', 'realpath', 'relpath', 'samefile', 'sameopenfile', 'samestat', 'sep', 'split', 'splitdrive', 'splitext', 'stat', 'supports_unicode_filenames', 'sys']
>>> os.getcwd()
'/Users/nimengwei/Desktop'
>>> os.listdir()
['.DS_Store', '.localized', 'mobile-21826', 'fr-plugin-h5Report-10.2.21.zip']
>>> os.path.isdir('mobile-21826')
True
>>> os.path.isfile('mobile-21826')
False
>>> os.path.exists('mobile-21826')
True
>>> os.path.exists('mobile-21827')
False
>>> f = '/Users/nimengwei/Desktop/.DS_Store'
>>> os.path.exists('.DS_Store')
True
>>> os.path.dirname(f)
'/Users/nimengwei/Desktop'
>>> os.path.split(f)
('/Users/nimengwei/Desktop', '.DS_Store')
>>> os.path.basename(f)
'.DS_Store'
>>> os.path.splitext('/Users/nimengwei/Desktop/fr-plugin-h5Report-10.2.21.zip')
('/Users/nimengwei/Desktop/fr-plugin-h5Report-10.2.21', '.zip')
>>> f2 = os.path.join('/Users/nimengwei/Desktop', 'a', 'b', 'c')
>>> f2
'/Users/nimengwei/Desktop/a/b/c'
>>> os.mkdir(f2)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
FileNotFoundError: [Errno 2] No such file or directory: '/Users/nimengwei/Desktop/a/b/c'
>>> os.makedirs(f2)
```
注意：获取当前位置的的绝对路径`os.path.dirname(os.path.abspath(__file__))`。
5. `DateTime`模块语法
`timedelta`：对日期/时间进行加减操作时使用。
`date`：`date`类表示一个日期。
`datetime.strftime`：将`datetime`对象格式化成字符串。
`datetime.strptime`：将字符串按照一定的格式转换成`datetime`对象。
`time`：表示一个时间的类。
`datetime.now`：系统的当前时间。
`day`：`Datetime`对象的属性，类型的还有`minute, hour`等。
`days`：`Timedelta`的属性，类似的还有`minutes, hours`等。
6. `DateTime`模块使用
```python
from datetime import datetime

print(dir(datetime))
# ['__add__', '__class__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__ne__', '__new__', '__radd__', '__reduce__', '__reduce_ex__', '__repr__', '__rsub__', '__setattr__', '__sizeof__', '__str__', '__sub__', '__subclasshook__', 'astimezone', 'combine', 'ctime', 'date', 'day', 'dst', 'fold', 'fromisoformat', 'fromordinal', 'fromtimestamp', 'hour', 'isocalendar', 'isoformat', 'isoweekday', 'max', 'microsecond', 'min', 'minute', 'month', 'now', 'replace', 'resolution', 'second', 'strftime', 'strptime', 'time', 'timestamp', 'timetuple', 'timetz', 'today', 'toordinal', 'tzinfo', 'tzname', 'utcfromtimestamp', 'utcnow', 'utcoffset', 'utctimetuple', 'weekday', 'year']

print(datetime.now()) # 2019-07-06 22:37:01.341135
print(datetime.today()) # 2019-07-06 22:37:01.341135
print(datetime.now().date()) # 2019-07-06
print(datetime.now().time()) # 22:37:01.341135

print(datetime.now().year) # 2019
print(datetime.now().month) # 7
print(datetime.now().day) # 6
print(datetime.now().hour) # 22
print(datetime.now().minute) # 37
print(datetime.now().second) # 1
print(datetime.now().microsecond) # 341135
```
注意：`datetime.now()`和`datetime.today()`返回值相同。
7. `time`模块使用
```
import time

print(dir(time))
# ['CLOCK_MONOTONIC', 'CLOCK_MONOTONIC_RAW', 'CLOCK_PROCESS_CPUTIME_ID', 'CLOCK_REALTIME', 'CLOCK_THREAD_CPUTIME_ID', '_STRUCT_TM_ITEMS', '__doc__', '__loader__', '__name__', '__package__', '__spec__', 'altzone', 'asctime', 'clock', 'clock_getres', 'clock_gettime', 'clock_gettime_ns', 'clock_settime', 'clock_settime_ns', 'ctime', 'daylight', 'get_clock_info', 'gmtime', 'localtime', 'mktime', 'monotonic', 'monotonic_ns', 'perf_counter', 'perf_counter_ns', 'process_time', 'process_time_ns', 'sleep', 'strftime', 'strptime', 'struct_time', 'thread_time', 'thread_time_ns', 'time', 'time_ns', 'timezone', 'tzname', 'tzset']
print(time.time()) # 1562423980.68991
time.sleep(2) # 休眠2秒
```
注意：这里也可以使用`from time import time`。
8. 自定义日期时间
```
from datetime import datetime, date, time
# 自定义日期和时间
d = datetime(2018, 10, 30, 14, 36)
print(d) #2018-10-30 14:36:00

d2 = date(2019, 7, 9)
print(d2) #2019-07-09

t = time(9, 10, 16)
print(t) #09:10:16
```
注意：`datetime.time`模块与`time`模块不同。
9. `time`模块与`datetime.time`模块
```
import datetime, time

d1 = datetime.datetime(2019, 10, 10, 8, 10)
print(d1) #2019-10-10 08:10:00

time.sleep(2)

d2 = datetime.date(2019, 11, 11)
print(d2) #2019-11-11

t1 = datetime.time(11, 11)
print(t1) #11:11:00
```
10. `DateTime`模块转换参数表
`%A`：星期的名称，如`Monday`。
`%B`：月份名，如`January`。
`%m`：用数字表示的月份(`01~12`)。
`%d`：用数字表示月份中的一天(`01~31`)。
`%Y`：四位的年份，如`2015`。
`%y`：两位的年份，如`15`。
`%H`：`24`小时制的小时数(`00~23`)。
`%l`：`12`小时制的小时数(`01~12`)。
`%p`：`am`或`pm`。
`%M`：分钟数(`00~59`)。
`%S`：秒数(`00~61`)。
11. 字符串解析为日期
```
from datetime import datetime

#字符串解析(parse)为日期
ds = '2018-10-30 14:36:09'
ds_t = datetime.strptime(ds, '%Y-%m-%d %H:%M:%S')
print(ds_t.second) #9
```
注意：`strptime`是`datetime`类的方法。
12. 日期转化为字符串
```
from datetime import datetime

# 日期格式化(format)为字符串
n = datetime.now()
print(n) #2019-07-09 21:41:40.322937
n_str = n.strftime('%m/%d %H:%M:%S')
print(n_str) #07/09 21:41:05
```
注意：`strftime`是`datetime`对象的方法。
13. 日期加减操作
```
from datetime import datetime, timedelta

n = datetime.now()
print(n) #2019-07-09 21:45:27.029259
n_next = n + timedelta(days=5, hours=42, seconds=20)
print(n_next) #2019-07-16 15:45:27.029259

d1 = datetime(2019, 7, 9)
d2 = datetime(2020, 2, 6)
rest = d2 - d1
print(dir(rest))
#['__abs__', '__add__', '__bool__', '__class__', '__delattr__', '__dir__', '__divmod__', '__doc__', '__eq__', '__floordiv__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__mod__', '__mul__', '__ne__', '__neg__', '__new__', '__pos__', '__radd__', '__rdivmod__', '__reduce__', '__reduce_ex__', '__repr__', '__rfloordiv__', '__rmod__', '__rmul__', '__rsub__', '__rtruediv__', '__setattr__', '__sizeof__', '__str__', '__sub__', '__subclasshook__', '__truediv__', 'days', 'max', 'microseconds', 'min', 'resolution', 'seconds', 'total_seconds']

print(type(rest)) #<class 'datetime.timedelta'>
print(rest.days) #212
```
## 3.3 第三方模块
1. `Python`第三方库
[https://pypi.org/](https://pypi.org/)
2. 第三方库介绍
`Django`：一个自带电池的`web`开发框架。
`Flask`：简单易用，快速上手的微型`web`开发框架。
`mysqlclient`：使用`Python`操作`mysql`数据的工具库。
3. 第三方包安装

(1) `pip install XXX`
```
(venv) ➜  imooc-project python3
Python 3.7.1 (default, Nov 28 2018, 11:55:14) 
>>> import django
ModuleNotFoundError: No module named 'django'
>>> quit()
(venv) ➜  imooc-project pip install Django
Successfully installed Django-2.2.3
(venv) ➜  imooc-project python3
Python 3.7.1 (default, Nov 28 2018, 11:55:14) 
>>> import django
>>> 
```
注意：在虚拟环境中使用`pip install XXX`，会将`XXX`安装到该虚拟环境中。在非虚拟环境中使用`pip install XXX`，会将`XXX`安装到`Python2`版本中。如果想安装到`Python3`版本，则需要使用`pip3 install XXX`。
(2) `pip install XXX.zip`
下载`flask-1.1.1.zip`文件。
```
(venv) ➜  imooc-project pip install flask-1.1.1.zip
Processing ./flask-1.1.1.zip
Successfully installed Flask-1.1.1 Jinja2-2.10.1 MarkupSafe-1.1.1 Werkzeug-0.15.4 click-7.0 itsdangerous-1.1.0
(venv) ➜  imooc-project python3
Python 3.7.1 (default, Nov 28 2018, 11:55:14) 
>>> import flask
>>> 
```
(3) `python setup.py install`
解压`flask-1.1.1.zip`文件，进入`flask-1.1.1`目录。
```
(venv) ➜  flask-1.1.1 python setup.py install
(venv) ➜  flask-1.1.1 python 
>>> import flask
>>> 
```
4. `pip`其他命令
`pip help` 查看命令
`pip uninstall` 卸载 
## 3.4 总结
1. 重点知识
`os`模块对文件和文件夹的基础操作；
对文件路径的解析；
获取`datetime`对象的年月日时分秒等信息；
`datetime`对象和字符串的相互转换。
2. 难点知识
`datetime`对象的加减操作。
掌握第三方包的学习方法。
# 4. 自定义包
## 4.1 介绍
1. 概要
虚拟环境介绍
`virtualenv`虚拟环境
`pipenv`虚拟环境
实战 - 模块与包
## 4.2 虚拟环境的安装及使用
1. `virtualenv`虚拟环境

(1) 安装`virtualenv`
```
➜  ~ pip install virtualenv
```
(2) 创建虚拟环境
① 创建名称为`django1.11`的虚拟环境
```
➜  ~ cd /Users/nimengwei/Code/mycode/python 
➜  python mkdir envs
➜  python cd envs
➜  envs virtualenv django1.11   #创建django1.11虚拟环境，django1.11为自定义名
...
➜  envs cd django1.11 
➜  django1.11 ls
bin     include lib
➜  django1.11  cd bin
➜  bin ls
activate         activate_this.py pip2             python2
activate.csh     easy_install     pip2.7           python2.7
activate.fish    easy_install-2.7 python           wheel
activate.ps1     pip              python-config
➜  bin source activate # 激活当前django1.11虚拟环境
(django1.11) ➜  bin pip install django==1.11 #当前虚拟环境安装django1.11
...
(django1.11) ➜  bin python #执行Python
...
>>> import django # 导入django
>>> quit() # 退出Python
(django1.11) ➜  bin deactivate #退出当前django1.11虚拟环境
➜  bin 
```
注释：当`(django1.11) ➜`时，表示当前`django1.11`虚拟环境处于激活状态。
② 创建名称为`flask`的虚拟环境
```
➜  envs virtualenv flask #创建名称为flask的虚拟环境
...
➜  envs ls
django1.11 flask
➜  envs cd flask/bin 
➜  bin source activate #激活虚拟环境
(flask) ➜  bin pip install flask #安装flask包
...
(flask) ➜  bin python #进入Python环境
Python 2.7.15 (default, Oct  2 2018, 12:50:38) 
>>> import flask
>>> quit() # 退出Python环境
(flask) ➜  bin deactivate #退出虚拟环境
```
③ 切换虚拟环境
```
➜  bin pwd      
/Users/nimengwei/Code/mycode/python/envs/flask/bin
➜  bin cd ../../django1.11/bin
➜  bin source activate
(django1.11) ➜  bin 
```
2. 使用`virtualenvwrapper`操作`virtualenv`虚拟环境

(1) 安装
```
➜  ~ pip install virtualenvwrapper
```
(2) 配置环境变量
```
➜  ~ vi ~/.bash_profile
```
```
export WORKON_HOME=~/Code/mycode/python/envs #指定虚拟环境所在目录
source /usr/local/bin/virtualenvwrapper.sh
```
```
➜  ~ source ~/.bash_profile
```
(3) 使用
```bash
➜  ~ workon #查看虚拟环境目录都有哪些虚拟环境
django1.11
flask
➜  ~ workon django1.11 #激活django1.11 虚拟环境
(django1.11) ➜  ~ python
Python 2.7.15 (default, Oct  2 2018, 12:50:38) 
>>> import django
>>> quit()
(django1.11) ➜  ~ workon flask #激活flask虚拟环境
(flask) ➜  ~ python        
Python 2.7.15 (default, Oct  2 2018, 12:50:38) 
>>> import flask
>>> import django #flask虚拟环境并没有安装django库
ImportError: No module named django
>>> quit()
(flask) ➜  ~ deactivate #退出当前虚拟环境
➜  ~ 
```
3. 虚拟环境`Python`版本
`virtualenv`和`virtualenvwrapper`操作虚拟环境不能选择`Python`版本。
`pipenv`和`Pycharm`可以解决这个问题。
4. `pipenv`虚拟环境
```bash
➜  ~ pip install pipenv #安装pipenv
Successfully installed certifi-2019.6.16 enum34-1.1.6 pipenv-2018.11.26 typing-3.7.4
➜  ~ cd Envs 
➜  Envs mkdir py2.7vir #创建虚拟环境目录
➜  Envs cd py2.7vir #进入虚拟环境目录
➜  py2.7vir pipenv --help
➜  py2.7vir pipenv --python 2.7 #初始化当前虚拟环境的Python版本为2.7(要求已安装 Python2.7.X版本)
✔ Successfully created virtual environment! 
➜  py2.7vir pipenv shell #激活虚拟环境
(py2.7vir) ➜  py2.7vir python #执行Python
Python 2.7.15 (default, Oct  2 2018, 12:50:38) 
>>> print "hello"
hello
>>> quit() #退出Python
(py2.7vir) ➜  py2.7vir pipenv install request #安装第三方库
(py2.7vir) ➜  py2.7vir exit #退出虚拟环境
➜  py2.7vir pipenv --py
/Users/nimengwei/Envs/py2.7vir-HAWFTxvC/bin/python
➜  py2.7vir pipenv --where
/Users/nimengwei/Envs/py2.7vir
```
```bash
➜  Envs mkdir py3.7vir #创建虚拟环境文件件
➜  Envs cd py3.7vir #进入虚拟环境文件夹
➜  py3.7vir pipenv --python 3.7 #初始化虚拟环境Python版本
✔ Successfully created virtual environment! 
➜  py3.7vir pipenv shell #激活虚拟环境
(py3.7vir) ➜  py3.7vir python  #执行Python              
Python 3.7.1 (default, Nov 28 2018, 11:55:14) 
>>> quit() #退出Python
(py3.7vir) ➜  py3.7vir pipenv install request #安装第三方库
(py3.7vir) ➜  py3.7vir exit #退出虚拟环境
➜  py3.7vir cd ..
➜  Envs workon
imooc-project
py2.7vir-HAWFTxvC
py3.7vir-yObGL-H-
```
5. `Pycharm`操作虚拟环境
(1) 创建新的虚拟环境
`Preferences - Project interpreter - Show All - + - New environment - OK - Apply`
![image.png](https://upload-images.jianshu.io/upload_images/4989175-0c65b09590cf9f56.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
注意：`Base interpreter`可以选择虚拟环境对应的`Python`版本。
(2) 添加已有虚拟环境
`Preferences - Project interpreter - Show All - + - Existing environment - OK - Apply`
![image.png](https://upload-images.jianshu.io/upload_images/4989175-d472d603cf588e2a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
注意：`Base interpreter`可以选择虚拟环境对应的`Python`版本。
(3) 选择虚拟环境
`Editor Configurations - Python interpreter`
## 4.3 自定义包
1. 新建`Python`项目
![image.png](https://upload-images.jianshu.io/upload_images/4989175-d5f0f05eda3f5b6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

注意：新建项目时可以创建新的虚拟环境，或选择已有的环境(`Existing interpreter - System Interpreter`)。
2. 代码实现
`新建 -  Python Package - trans`
`新建 - Python File - tools`
`新建 - 目录 - work`
`新建 - Python File - tools`

(1) `utils/trans/tools.py`
```
import random
from datetime import datetime

def gen_trans_id(date=None):
    '''
    根据所传入的时间得到一个唯一的交易流水ID
    :param date: 日期
    :return: 交易流水ID字符串
    '''
    if date is None:
        date = datetime.now()
    date_str = date.strftime('%Y%m%d%H%M%S%f')
    random_str = str(random.randint(100000, 999999))
    return date_str + random_str
```
(2) `utils/constants.py`
```
FILE_UNKNOWN = -1 #为止文件类型
FILE_TYPR_IMG = 0 #图片类型
FILE_TYPR_DOC = 1 #文档类型
```
(3) `utils/work/tools.py`
```
import os
import constants

def get_file_type(file_name):
    '''
    根据文件名称来判断文件类型
    :param filename: str 文件名称
    :return: int 文件类型
    -1: 未知类型; 0: 图片类型; 1: 文档类型
    '''
    path_name, ext = os.path.splitext(file_name) #元组取值
    if ext.lower() in ('.png', '.jpg', '.gjf', '.bmp'):
        result = constants.FILE_TYPR_IMG
    elif ext in ('.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'):
        result = constants.FILE_TYPR_DOC
    else:
        result = constants.FILE_UNKNOWN
    return result
```
注意：`constants`模块与`tools`模块并不在同一个文件夹下，但可以用`import constants`直接导入`constants`模块。
(4) `utils/work/__init__.py`
```
from . import tools
#如果没有此引入，则utils/test_modules.py中以下代码会报错
'''
import work
work.tools.get_file_type()
'''
```
(5) `utils/test_modules.py`
```
from datetime import datetime
from trans.tools import gen_trans_id
import work

def test_trans_tools():
    '''
    测试trans包下的tools模块
    :return:
    '''
    print(gen_trans_id())
    print(gen_trans_id(datetime(2005, 9, 1, 12, 30, 45)))


def test_work_tools():
    '''
    测试work包下的tools模块
    :return:
    '''
    print(work.tools.get_file_type('/Users/nimengwei/text.py')) #-1
    print(work.tools.get_file_type('/Users/nimengwei/Downloads/controls.png')) #0

if __name__ == '__main__':
    test_trans_tools()
    test_work_tools()
```
注释：导入使用模块对应的包`option + return`。调试时可使用`选中表达式 - 添加到观察点`观察表达式的值。
## 4.4 总结
1.  内容
虚拟环境介绍
`virtualenv`虚拟环境
`pipenv`虚拟环境
实战 - 模块与包
2. 重点
什么是虚拟环境
如何安装和切换虚拟环境
模块和包实战
3. 难点
对虚拟环境的理解和使用
模块和包实践
# 5. 高阶函数
## 5.1 介绍
1. 目标
理解`lambda`函数的演变过程。
掌握`filter`、`map`、`reduce`函数的使用。
## 5.2 使用高阶函数
1. 章节概要
`lambda`函数
装饰器
带参数的装饰器
2. `lambda`函数
`lambda`是一种表达式，创建内嵌的简单匿名函数。
3. `filter`函数
`filter()`函数用于对序列过滤，返回符合过滤条件的迭代器对象。该函数接收两个参数，第一个为过滤函数，第二个为可迭代对象。
```
def is_odd(n):
    '''
    判断是否是奇数
    '''
    return n % 2 != 0

def list_filter(l):
    '''
    过滤列表/元组中的元素
    :param l: list/tuple 要过滤的列表/元组
    :return: 过滤过的列表/元组
    '''
    return filter(is_odd, l)

def list_lambda_filter(l):
    return filter(lambda n: n % 2 != 0, l)

if __name__ == '__main__':
    l = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    print(list(list_filter(l))) #[1, 3, 5, 7, 9]
    print(tuple(list_lambda_filter(l))) # (1, 3, 5, 7, 9)
```
4. `sort`函数
```
stus = [
    {"name": "xm", "age": 18},
    {"name": "xw", "age": 20},
    {"name": "xl", "age": 15},
]

stus.sort(key= lambda item: item["age"])
print(stus[1]["name"]) # xm
```
5. `map`函数
`map`将传入的函数依次作用到序列的每个元素，并把一个`map`对象作为结果返回。
```
def pow_number(n):
    return n ** 3

def map_test(l):
    return map(pow_number, l)

def map_lambda_test(l):
    return map(lambda n: n ** 3, l)

print(list(map_test([1, 2, 3])))  # [1, 8, 27]
print(list(map_lambda_test([1, 2, 3])))  # [1, 8, 27]
```
6. `map`函数拓展
```
print(list(map(lambda x, y: x * y, [1, 3], [2, 4])))  # [2, 12]
print(list(map(str, [1, 2, 3, 4])))  # ['1', '2', '3', '4']
```
7. `reduce`函数
```
from functools import reduce

def get_sum(m, n):
    return m + n

def list_sum(l):
    return reduce(get_sum, l)

def list_lambda_sum(l):
    return reduce(lambda m, n: m + n, l)

l = [1, 2, 3, 4]
print(sum(l))  # 10
print(list_sum(l))  # 10
print(list_lambda_sum(l))  # 10
```
注释：`reduce`函数需要从`functools`导入。
## 5.3 总结
1. 重点
理解`lambda`函数的演变过程
掌握`filter`、`map`、`reduce`函数的使用。
2. 难点
掌握`filter`、`map`、`reduce`函数的使用场景。
# 6. 文件读写
## 6.1 介绍
1. 章节概要
文件读写模式
文件打开和关闭
文件的读取
文件的写入
## 6.2 文件读写
1. 文件读写模式
`r`： 读取模式(默认值)。
`w`：写入模式(覆盖写入)
`x`：独占写入模式
`a`：附加模式(附加写入)
`b`：二进制模式(与其他模式结合使用)
`t`：文本模式(默认值，与其他模式结合使用)
`+`：读写模式(与其他模式结合使用)
注意：读取模式`r`，覆盖写入模式`w`，附加写入模式`a`，附加读写模式`r+`。
2. 文件的打开和关闭
使用`open`函数打开文件： `f = open('test.txt')`
使用`close`函数关闭文件：`f.close()`。
```
f = open('test.txt')

print(f)
# <_io.TextIOWrapper name='test.txt' mode='r' encoding='UTF-8'>
#       文件对象         文件名        模式(默认r)      编码

help(open)
'''
open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
    Open file and return a stream.  Raise OSError upon failure
    ...
    'r'       open for reading (default)
    'w'       open for writing, truncating the file first
    'x'       create a new file and open it for writing
    'a'       open for writing, appending to the end of the file if it exists
    'b'       binary mode
    't'       text mode (default)
    '+'       open a disk file for updating (reading and writing)
    'U'       universal newline mode (deprecated)
    ...
'''
print(dir(f))
# ['_CHUNK_SIZE', '__class__', '__del__', '__delattr__', '__dict__', '__dir__', '__doc__', '__enter__', '__eq__', '__exit__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__lt__', '__ne__', '__new__', '__next__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '_checkClosed', '_checkReadable', '_checkSeekable', '_checkWritable', '_finalizing', 'buffer', 'close', 'closed', 'detach', 'encoding', 'errors', 'fileno', 'flush', 'isatty', 'line_buffering', 'mode', 'name', 'newlines', 'read', 'readable', 'readline', 'readlines', 'reconfigure', 'seek', 'seekable', 'tell', 'truncate', 'writable', 'write', 'write_through', 'writelines']
print(f.mode) # r
print(f.name) # test.txt
f.close() # 此处应该做异常处理
```
注意：`f.close()`需要做异常处理
3. `with`语句
到达语句末尾时，将自动关闭文件。
```
with open('test.txt') as f:
    print(f.mode) # r
    print(f.name) # test.txt
```
4. 文件的读取
`read()`：读取文件。可指定参数表示读几个字符(字节)。
`readline()`：读取一行数据，返回字符串。可指定参数表示读该行几个字符(字节)。
`readlines()`：读取所有行，并返回列表。
`seek()`：定位到文件指定位置。
```
relative_path = 'test.txt'
absolute_path = '/Users/nimengwei/Code/mycode/python/chapter06/test.txt'

with open(relative_path, encoding='utf-8') as f:
    print(f.read())
    '''
    123456789
    123456789
    123456789
    '''

with open(absolute_path, encoding='utf-8') as f:
    print(f.read(3))  # 123
    print(f.read(3))  # 456

with open(relative_path, encoding='utf-8') as f:
    f.seek(2)  # 定位到f文本的第三个字符
    print(f.read(3))  # 345

with open(absolute_path, encoding='utf-8') as f:
    print(f.readline())  # 123456789

with open(absolute_path, encoding='utf-8') as f:
    print(f.readlines())  # ['123456789\n', '123456789\n', '123456789']
```
注意：`path`可以是绝对路径，也可以是相对路径。在不使用`seek()`方法时，文件会依次向后读取。
5. 文件写入
使用`write`函数向打开的文件对象写入内容。
使用`writelines`函数向打开的文件对象写入多行内容。
```
from datetime import datetime
import random

file_name = 'write_test.txt'


def write_file():
    """
    文件多行
    :return:
    """
    f = open(file_name, 'w')
    f.write('hello')
    f.write('\n')  # 换行
    f.write('world')
    f.close()


def write_lines():
    """
    多行写入
    :return:
    """
    with open(file_name, 'w') as f:
        f.writelines(['第一行', '\n', '第二行', '\r\n', '第三行'])


def write_add():
    """
    附加写入
    :return:
    """
    user_id = random.randint(1000, 9999)
    time_now = datetime.now()
    log = '\n用户 {0} - 访问时间 {1}'.format(user_id, time_now)
    with open(file_name, 'a') as f:
        f.write(log)


def read_and_write():
    """
    读写操作
    :return:
    """
    with open(file_name, 'r+') as f:
        if '1' in f.read():
            f.write('\nbbb')
        else:
            f.write('\naaa')


if __name__ == '__main__':
    write_file()
    write_lines()
    write_add()
    read_and_write()
```
## 6.3 总结
1. 重点知识
常用的文件读写模式。
两种文件打开和关闭方式。
文件的读取和写入。
# 7. 作业
1. 题目要求
根据现实生活中的猜数字游戏的游戏规则，运用`Python`语言模拟实现猜数字游戏的的基本功能，请学员们参考真实的猜数字游戏规则和如下的程序运行效果图进行代码编写，以实现“数字猜猜猜”小游戏的基本功能。游戏规则介绍如下：
(1) 玩家根据提示进行数字区间起始位置和终止位置的输入
(2) 依据 `1` 中输入的数字区间，产生该区间内一个随机数，用于进行猜测比对的终值
(3) 提示用户输入所猜测的数字，与 `2` 中产生的随机数字进行比对，并将相应的信息写入指定的日志文件（日志文件名称：`record.txt`；日志文件路径：与`.py`文件处于同一级目录）
(4) 依据 `3` 中的比对结果。若两者不等，打印友好提示，重复 `3`、`4` 步骤；若两者相等，则退出该函数，执行下列语句
(5) 打印如效果图所示，用以提示游戏结束的信息
2. 运行效果图
![image.png](https://upload-images.jianshu.io/upload_images/4989175-c56c492068b8a0e0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 代码
```
import random
import sys
from datetime import datetime


def guide_page(guide_word):
    """
    打印引导字符串
    :param guide_word:
    :return:
    """
    print("*********************{}********************".format(guide_word))


def all_num(n):
    """
    判断是否是数字字符
    :param n:
    :return:
    """
    return str.isdigit(n)


def num_legal(ls):
    """
    判断区间数字大小关系
    :param ls:
    :return:
    """
    if ls[0] == ls[1]:
        print("您输入的区间数字相同！！请重新启动程序。")
        sys.exit()
    elif ls[0] > ls[1]:
        print("您输入的数字区间大小有误！！请重新启动程序。")
        sys.exit()
    else:
        return 1


def get_final_num():
    """
    获取随机数
    :return:
    """
    list_str = [min_str, max_str]
    filter_list_str = list(filter(lambda n: all_num(n), list_str))
    if len(filter_list_str) == 2:
        list_num = [int(min_str), int(max_str)]
        num_legal(list_num)
        return random.randint(list_num[0], list_num[1])
    else:
        print("您输入的为非数字字符，请重新启动程序！！")
        sys.exit()


def check_num_legal(num):
    """
    判断数字是否在区间内
    :param num:
    :return:
    """
    min_num = int(min_str)
    max_num = int(max_str)
    return min_num <= num <= max_num


def write_record(times, value):
    """
    日志附加写入
    :param times:
    :param value:
    :return:
    """
    with open('record.txt', 'a+') as f :
        time_now = datetime.now()
        write_log = '{0}: 第{1}次您猜测的数字为: {2}\n'.format(time_now, times, value)
        f.write(write_log)


def main():
    # 获取随机数字
    temp = get_final_num()
    print("所产生的随机数字区间为: [{}, {}]".format(min_str, max_str))
    guess_times = 0
    while True:
        # 获取猜测数字
        guess_str = input("请继续输入您猜测的数字: ")
        print("**********")
        if not all_num(guess_str):
            print("对不起您输入的为非数字字符！！")
            continue
        guess_num = int(guess_str)
        # 猜测数字合法校验
        if not check_num_legal(guess_num):
            print("对不起您输入的数字未在指定区间！！！")
            continue
        # 随机数字与猜测数字大小比较
        guess_times += 1
        write_record(guess_times, guess_num)
        if guess_num < temp:
            print("Lower than the answer")
        elif guess_num > temp:
            print("Higher than the answer")
        else:
            print("恭喜您！只用了{}次就赢得了游戏".format(guess_times))
            break


if __name__ == '__main__':
    guide_page("欢迎进入数字猜猜猜小游戏")
    min_str = input("请输入数值区间起始值: ")
    max_str = input("请输入数值区间终止值: ")
    main()
```
注意：退出系统`sys.exit()`。判断是否是数字字符串`str.isdigit()`。
