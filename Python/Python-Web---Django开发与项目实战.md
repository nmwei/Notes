# 1. 入门Django框架
## 1.1 介绍
1. 内容
环境搭建及版本选择
URL及视图函数
模板、`ORM`、表单
后台管理、命令行工具、安全及运维
## 1.2 初识Django
### Django介绍
1. `Django`发展历史
`world online`的三位工程师使用`Python`开发了`Django`。
`Django`根据比利时的爵士音乐家`Django Reinhardt`命名。
`2005`年开源，`2008`年发布`1.0`版本。
`LTS(Long Term Support)`支持。
2. `Django`介绍
开源免费的`Python`高级`web`框架，内置电池，用于快速开发可靠、安全、可扩展的`web`应用。
[https://docs.djangoproject.com/en/1.11/](https://docs.djangoproject.com/en/1.11/)
3. `MVT`模型
模型(`Model`) `←→` 视图(`View`) `←→` 模板(`Template`)
4. 网站开发流程
(1) 选择合适的版本
(2) 安装及配置
(3) 生成项目结构
(4) 内容开发
(5) 迭代、上线、维护
5. 版本兼容情况

|`Django`版本 | `Python`版本 |
|:--:|:--|
| `1.11` | `2.7`、`3.4`、`3.5`、`3.6`、`3.7(added in 1.11.17)` |
| `2.0` | `3.4`、`3.5`、`3.6`、`3.7` |
| `2.1`、`2.2` | `3.5`、`3.6`、`3.7` |
![image.png](https://upload-images.jianshu.io/upload_images/4989175-19c49dcdc44bc371.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
当前选择：`Django V1.11.*`
6. 环境参数
`Windows 10`、`Xampp/Navicat for MySQL`、`Python 3.6+`、`Django 1.11.*`、`Flask 1.0.*`
7. 安装`Django 1.11.*`
(1) 安装
`pip3 install -i https://pypi.doubanio.com/simple django==1.11.28`
其中，`-i`表示指定源。
(2) 检测版本
```
➜  ~ python3
Python 3.7.1 (default, Nov 28 2018, 11:55:14) 
[Clang 9.0.0 (clang-900.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import django
>>> django.__version__
'1.11.28'
>>> quit()
```
### 初始化项目
1. 创建虚拟环境
`django1.11`虚拟环境
```
➜  django mkdir django1.11 # 创建虚拟环境目录
➜  django cd django1.11  # 进入目录
➜  django1.11 pipenv --python 3.7.1 # 初始化当前虚拟环境的Python版本
✔ Successfully created virtual environment!
Virtualenv location: /Users/nimengwei/Envs/django1.11-yxhb7L3z
➜  django1.11 pipenv shell # 激活虚拟环境
(django1.11) ➜  django1.11 pip install django==1.11.28 # 安装django1.11.28
Successfully installed django-1.11.28 pytz-2019.3
(django1.11) ➜  django1.11 python3 
>>> django.__version__
'1.11.28'
>>> quit() # 退出Python
(django1.11) ➜  django1.11 exit # 退出虚拟环境
➜  django1.11 
```
`django3.0`虚拟环境
```
➜  django mkdir django3.0 # 创建虚拟环境目录
➜  django cd django3.0 # 进入目录
➜  django3.0 pipenv --python 3.7.1 # 初始化当前虚拟环境的Python版本
✔ Successfully created virtual environment! 
Virtualenv location: /Users/nimengwei/Envs/django3.0-T5e2e5tT
➜  django3.0 pipenv shell # 激活虚拟环境
(django3.0) ➜  django3.0 pip install django # 安装django最新稳定版
(django3.0) ➜  django3.0 python3
>>> import django
>>> django.__version__
'3.0.4'
>>> quit() # 退出Python
(django3.0) ➜  django3.0 exit # 退出虚拟环境
➜  django3.0 
```
2. 命令行创建`django`项目
(1) 命令介绍
生成项目模板 `django-admin.py startproject 项目名称`
创建模块 `python manage.py startapp 模块名`
启动服务器 `python manage.py runserver`
(2) 命令行演示
```
➜  ~ cd /Users/nimengwei/Code/mycode/python/django/django1.11 # 进入虚拟环境目录
➜  django1.11 pipenv shell # 激活虚拟环境
(django1.11) ➜  django1.11 cd ../../project #进入项目所在文件夹
(django1.11) ➜  project django-admin.py startproject django_project  # 生成项目模板
(django1.11) ➜  project cd django_project
(django1.11) ➜  django_project python manage.py startapp accounts
(django1.11) ➜  django_project python manage.py startapp course
(django1.11) ➜  django_project python manage.py runserver # 启动服务器
March 21, 2020 - 12:22:44
Django version 1.11.28, using settings 'django_project.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```
注意：激活虚拟环境之后，可以在任意路径创建项目。
3. 项目模板生成的目录结构
`|--django_project`  项目目录
`|      |--__init__.py`  包的入口文件
`|      |--settings.py`  项目配置文件
`|      |--urls.py`        `url`访问地址配置文件
`|      |--wsgi.py`      `uwsgi`配置
`|--db.sqlite3`          `sqlite`数据库
`|--manage.py`        命令管理工具
`|--accounts`            `accounts`模块
`|--course`                `course`模块
4. `Pycharm`创建`django`项目
(1) `New Project`新建项目
![新建项目](https://upload-images.jianshu.io/upload_images/4989175-b16bbb6636df99e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(2) 添加`Pipenv`虚拟环境
![虚拟环境](https://upload-images.jianshu.io/upload_images/4989175-cf481a99da946a31.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(3)运行项目
![运行项目](https://upload-images.jianshu.io/upload_images/4989175-ef764e6ec4b2752c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(4) 修改配置
![修改配置](https://upload-images.jianshu.io/upload_images/4989175-9129c44d291979c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### URL配置及参数传递
1. `RUL`协议
`http` - 超文本传输协议资源 
`https` - 用安全套接字层传送的超文本传输协议
`ftp` - 文件传输协议
注释：`http`默认端口为`80`，`https` 默认端口为`443`。
2. `HTTP`状态码
`2xx`- 请求成功
`3xx` - 重定向
`4xx` - 请求错误
`5xx` - 服务器错误
3. `URL`的正则匹配
(1) [参数传递](https://github.com/nmwei/django_ide/commit/647385ac331665619c8f02724932ba33eba25073)
`urls.py`
```
url(r'^article/(?P<year>[0-9]{4})/$', views.article)
```
`views.py`
```
def article(request, year):
    return HttpResponse('article: ' + year)
```
(2) `URL`的嵌套
命令行创建模块
```
➜  django_ide git:(master) ✗ cd /Users/nimengwei/Code/mycode/python/django/django1.11
➜  django1.11 pipenv shell
Launching subshell in virtual environment...
 . /Users/nimengwei/Envs/django1.11-yxhb7L3z/bin/activate                                                                                           
nimengwei@nimengweideMacBook-Pro django1.11 %  . /Users/nimengwei/Envs/django1.11-yxhb7L3z/bin/activate
(django1.11) nimengwei@nimengweideMacBook-Pro django1.11 % cd /Users/nimengwei/Code/mycode/python/Project/django_ide
(django1.11) nimengwei@nimengweideMacBook-Pro django_ide % python manage.py startapp oauth
(django1.11) nimengwei@nimengweideMacBook-Pro django_ide % python manage.py startapp accounts
(django1.11) nimengwei@nimengweideMacBook-Pro django_ide % python manage.py startapp pay     
(django1.11) nimengwei@nimengweideMacBook-Pro django_ide % 
```
[URL嵌套](https://github.com/nmwei/django_ide/commit/76e13a28a7e5c63fb934e1816f77dd6de5a74062)
4. 设计优雅的`URL`
(1) 更简洁的`URL`
优化前：`http://example.com/article/?year=2018&month=12&day=21`
优化后：`http://example.com/article/2018/12/21`
(2) 使用命名空间
两种不同的角色，访问不同的`URL`，但是结果相同。
使用`namespace`指定命名空间。
```
urlpatterns = [
    url(r'^author-polls/', include('polls.urls', namespace='author-polls')),
    url(r'^publisher-polls/', include('polls.urls', namespace='publisher-polls')),
]
```
(3) 使用`name`给`URL`指定名称
```
 url(r'^article/2018/$', views.article, name='article_detail')
```
[给URL指定名称并逆向解析](https://github.com/nmwei/django_ide/commit/9b470cc3b13b37c3c8808192d38c34d292c12086)
5. 
## 1.3 视图
## 1.4 模板语法
# 2. 实战：Django对象关系映射（ORM）
# 3. 表单介绍与使用
# 4. Web项目实战-后台管理系统
# 5. Django命令工具与中间件
# 6. Django的安全及维护
