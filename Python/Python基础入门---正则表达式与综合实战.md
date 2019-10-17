# 1. 初识正则表达式
## 1.1 课程介绍
1. 步骤介绍
正则表达式入门及应用
正则表达式的进阶
正则表达式案例
## 1.2 正则表达式基本操作
1. 什么是正则表达式
正则表达式(`regex`)是一些由字符和特殊符号组成的字符串。
正则表达式是能按照某种模式匹配一系列有相似特征的字符串。
2. 正则表达式中的符号

符号 | 描述 | 示例
-|--|-
`literal` | 匹配文本字符串的字面值`literal` |  `foo`
`re1\|re2` | 匹配正则表达式`re1`或者`re2` | `foo\|bar`
`.` | 匹配任何字符(除了`\n`之外) | `b.b`
`^` | 匹配字符串起始部分|`^Dear`
`$` | 匹配字符串终止部分 | `/bin/*sh$`
`*` | 匹配`0`次或多次前面出现的正则表达式 | `[A-Za-z0-9]*`
`+` | 匹配`1`次或多次前面出现的正则表达式 | `[a-z]+\.com`
`?` | 匹配`0`次或`1`次前面出现的正则表达式，或指明非贪婪限模式匹配。 | `goo?`
`{N}` | 匹配`N`次前面出现的正则表达式 | `[0-9]{3}`
`{M, N}` | 匹配`M-N`次前面出现的正则表达式 | `[0-9]{5,9}`
`[...]` | 匹配来自字符集的任意单一字符 | `[aeiou]`
`[x-y]` | 匹配`x~y`范围中的任意单一字符 | `[0-9],[A-Za-z]`
`[^...]` | 不匹配此字符集中出现的任何一个字符，包括某一范围的字符(如果此字符集中出现) | `[^aeiou],[^A-Za-z0-9]`
`(...)`|匹配封闭的正则表达式，然后另存为子组|`（[0-9]{3}?,f(oo\|u)bar`
贪婪模式：在整个表达式匹配成功的前提下，尽可能多的匹配字符。
非贪婪模式：在整个表达式匹配成功的前提下，尽可能少的匹配字符。
注释：默认是贪婪模式。
3. 正则表达式中的特殊字符
`\d` - 匹配一个数字字符。等价于`[0-9]`
`\D` - 匹配一个非数字字符。等价于`[^0-9]`
`\w` - 匹配包括下划线的任何单词字符。等价于`[A-Za-z0-9_]`
`\W` - 匹配任何非单词字符。等价于`[^A-Za-z0-9_]`
`\s` - 匹配任何不可见字符，包括空格、制表符、换页符等
`\S` - 匹配任何可见字符
`\b` - 匹配一个单词的边界
`\B` - 匹配非单词边界
`\n` - 匹配一个换行符
4. 修饰符
`re.I`-使匹配对大小写不敏感
`re.L`-做本地化识别（`locale-aware`）匹配
`re.M`-多行匹配，影响 `^` 和 `$`
`re.S`-使`.`匹配包括换行在内的所有字符
## 1.3 正则表达式应用
1. 身份证号码匹配
区域编号、出生年份、出生日期、性别(倒数第二位)
`(\d{6})(\d{4})((\d{2})(\d{2}))\d{2}\d([0-9]|X)`
2. 电子邮箱表达式匹配
`[a-zA-Z0-9_-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,5})`
3. 贪婪模式与非贪婪模式
```
import re

content = "abcabca"
regex1 = re.compile('ab.*a')
regex2 = re.compile('ab.*?a')
print(regex1.match(content).group())  # abcabca
print(regex2.match(content).group())  # abca
```
## 1.4 正则表达式进阶
1. 使用`re`模块直接匹配
```python
import re

print(re.match('hello', 'hello world'))  # <re.Match object; span=(0, 5), match='hello'>
```
2. 先编译再匹配
```
import re

# 将正则表达式编译
pattern = re.compile('hello')

# 通过match进行匹配
result = pattern.match('hello world')
print(result)  # <re.Match object; span=(0, 5), match='hello'>
```
注释：先编译再匹配的方式性能较高。
3. 匹配不到则返回`None`
```
import re

pattern = re.compile('hello')
print(pattern.match('Hello'))  # None
```
4. 忽略大小写
```
import re

pattern = re.compile('hello', re.I)
print(pattern.match('Hello'))  # <re.Match object; span=(0, 5), match='Hello'>
```
5. `r`转义
使用`Python`的`r`前缀，就不用考虑转义的问题了。
```
import re

pattern1 = re.compile('A\\b')
pattern2 = re.compile(r'A\b')

print(pattern1.match('A\b'))
# <re.Match object; span=(0, 1), match='A'>
print(pattern1.match('A\b'))
# <re.Match object; span=(0, 1), match='A'>
```
注释：`pattern1`和`pattern2`写法等价。
6. `findall`方法
```
import re

content = 'a1B22ccc333D4'

p2 = re.compile(r'[a-z]+', re.I)
print(p2.findall(content))  # ['a', 'B', 'ccc', 'D']

print(re.findall(r'[a-z]+', content, re.I))  # ['a', 'B', 'ccc', 'D']
print(re.findall(r'([a-z])\d', content, re.I))  # ['a', 'B', 'c', 'D']
print(re.findall(r'([a-z]+)(\d)', content, re.I))  # [('a', '1'), ('B', '2'), ('ccc', '3'), ('D', '4')]
```
注释：`group`与`findall`结合使用时，`findall`可以匹配组内字符串。
7. `search`方法
```
import re

content = 'hello world!'

regex = re.compile(r'world')
print(regex.search(content))
# <re.Match object; span=(6, 11), match='world'>

print(re.search(r'world', content))
# <re.Match object; span=(6, 11), match='world'>
```
8. `match()`与`search()`的区别
`match()`函数只检测字符串开头位置是否匹配，匹配成功返回结果。用于判断字符串开头或整个字符串是否匹配，速度快。
`search()`会整个字符串查找,直到找到一个匹配。
```
import re

content = 'hello world!'

print(re.search(r'hello', content))
# <re.Match object; span=(0, 5), match='hello'>
print(re.search(r'world', content))
# <re.Match object; span=(6, 11), match='world'>

print(re.match(r'hello', content))
# <re.Match object; span=(0, 5), match='hello'>
print(re.match(r'world', content))
# None
```
9. `group()`和`groups()`的使用
```
import re

result = re.search(r'world', 'hello world!')
print(result)
# <re.Match object; span=(6, 11), match='world'>
print(result.group())  # world
print(result.groups())  # ()

identity = '411423202010060028'
regex = re.compile(r'(\d{6})(?P<year>\d{4})((?P<month>\d{2})(?P<day>\d{2}))\d{2}\d(?P<sex>[0-9]|X)')
result = regex.search(identity)
print(result.group())  # 411423202010060028
print(result.group(2))  # 2020
print(result.groups())  # ('411423', '2020', '1006', '10', '06', '8')
print(result.groupdict())
# {'year': '2020', 'month': '10', 'day': '06', 'sex': '8'}
```
注释：`(?P<name>regex)`表示给组`regex`命名为`name`。
10. `split()`正则切割
```
import re

s = 'one1two22three333four4five5six6'

print(re.split(r'\d+', s))
# ['one', 'two', 'three', 'four', 'five', 'six', '']
```
11. `sub()`正则替换
```
import re

# 字符替换
s = 'one1two22three333four4five5six6'
s1 = re.sub(r'\d+', '@', s)
print(s1)
# one@two@three@four@five@six@

# 分组替换
s2 = 'hello world'
s3 = re.sub(r'(\w+) (\w+)', r'\2 \1', s2)
print(s3)  # world hello


# 复杂替换
s3 = 'hello world'
s4 = re.sub(r'(\w+) (\w+)', lambda m: m.group(2).upper() + ' ' + m.group(1).upper(), s2)
print(s4)  # WORLD HELLO
```
## 1.5 正则表达式综合实战
1. 匹配`html`字符串中的图片`src`
```
import re

with open('src.html', encoding='utf-8') as f:
    html = f.read()
    regex = re.compile(r'<img.+?src="(.+?)".+?>')
    images = regex.findall(html)
    for ls in images:
        print(ls)
```
注释：`?`实现非贪婪匹配。`findall`获取`group`内字符串。
# 2. 综合实战 - 飞机大战
## 2.1 课程介绍
1. 课程目标
掌握**面向对象**分析和开发的思想
能对项目进行拆分，进行**模块化开发**
了解**项目开发**的基本流程
理解并运用`Python`**包、模块**相关知识
理解并运用**文件读写**，**函数式编程**
理解简单**2d游戏**开发的基本思路
掌握**IDE调试**技巧
2. 重难点技能
面向对象分析及开发方法
`Python`包与模块：标准模块和第三方模块的使用
`Python`多线程、多进程的运用
游戏开发入门及对`Pygame`的使用
## 2.2 Pygame介绍及使用
1. `Pygame`介绍
`2D`游戏开发工具包。
2. `Pygame`文档
[http://www.pygame.org/docs/](http://www.pygame.org/docs/)
3. `Pygame`安装
(1) 创建项目
![image.png](https://upload-images.jianshu.io/upload_images/4989175-3dabed9ebf47ac49.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/840)
(2) 安装`pygame`
```
(PlaneWars) ➜  PlaneWars pip install pygame
Collecting pygame
  Downloading https://files.pythonhosted.org/packages/32/37/453bbb62f90feff2a2b75fc739b674319f5f6a8789d5d21c6d2d7d42face/pygame-1.9.6-cp37-cp37m-macosx_10_11_intel.whl (4.9MB)
    100% |████████████████████████████████| 4.9MB 1.5MB/s 
Installing collected packages: pygame
Successfully installed pygame-1.9.6
(PlaneWars) ➜  PlaneWars python
```
4. [`pygame`示例](https://www.pygame.org/docs/tut/PygameIntro.html)
```
import sys, pygame

# 1. pygame初始化
pygame.init()

size = width, height = 320, 240  # 元组，等价于(320, 240)
speed = [2, 2]
black = 0, 0, 0  # 元组，等价于(0, 0, 0)

# 2. 创建窗口对象
screen = pygame.display.set_mode(size)
# 获取图片对象
ball = pygame.image.load("intro_ball.gif")
# 获取图片对象位置
ballrect = ball.get_rect()

# 3. 游戏主循环
while 1:
    # 处理游戏事件
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()

    # 更新游戏状态(图片对象位置)
    ballrect = ballrect.move(speed)
    if ballrect.left < 0 or ballrect.right > width:
        speed[0] = -speed[0]
    if ballrect.top < 0 or ballrect.bottom > height:
        speed[1] = -speed[1]
    
    # 窗口视图绘制
    screen.fill(black)  # 使用黑色填充窗口
    screen.blit(ball, ballrect)  # 指定位置绘制图片
    pygame.display.flip() # 更新窗口
```
5. 游戏中的图片
(1) 图片加载
`bg = pygame.image.load(url)`
(2) 获取图片尺寸
`rect = bg.get_rect()`
(3) 图片移动
`rect.move((x, y))`
(4) 图片绘制
`screen.blit(ball, (x, y)/rect)`
```
import sys, pygame

# 初始化
pygame.init()

# 屏幕对象
screen = pygame.display.set_mode((500, 500))
# 加载图片
ball = pygame.image.load('intro_ball.gif')
# 获取图片位置
rect = ball.get_rect()

while True:
    # 处理事件
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
    # 绘制
    screen.blit(ball, rect)
    screen.blit(ball, rect.move([50, 50]))
    screen.blit(ball, (100, 100))
    pygame.display.flip()
```
注释：`pygame.display.set_mode()`和`pygame.image.load()`方法返回值都是`Surface`对象。`Surface.get_size()`方法可以获取尺寸。
6. `Surface`对象与`Rect`对象
(1) `Surface`对象
[pygame.Surface.get_size](https://www.pygame.org/docs/ref/surface.html#pygame.Surface.get_size)
[pygame.Surface.get_width](https://www.pygame.org/docs/ref/surface.html#pygame.Surface.get_width)
[pygame.Surface.get_height](https://www.pygame.org/docs/ref/surface.html#pygame.Surface.get_height)
[pygame.Surface.get_rect](https://www.pygame.org/docs/ref/surface.html#pygame.Surface.get_rect)
(2) `Rect`对象
[pygame.Rect.move](https://www.pygame.org/docs/ref/rect.html#pygame.Rect.move)
`Rect`对象具有几个虚拟属性，可用于移动和对齐`Rect`
`x`,`y`,`top`, `left`, `bottom`, `right`,`topleft`, `bottomleft`, `topright`, `bottomright`,`midtop`, `midleft`, `midbottom`, `midright`,`center`, `centerx`, `centery`,`size`, `width`, `height`,`w`,`h`
其中，尺寸初始信息为**图片原始尺寸**大小，位置初始信息为`(0, 0)`。
7. 游戏中的颜色和形状
```
import sys, pygame

# 初始化
pygame.init()

# 屏幕对象
screen = pygame.display.set_mode((500, 500))

red = pygame.Color(255, 0, 0)

while True:
    # 处理事件
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
    # 直线
    pygame.draw.line(screen, red, (10, 10), (80, 80), 5)
    # 矩形
    pygame.draw.rect(screen, red, (100, 100, 50, 50), 1)
    # 圆
    pygame.draw.circle(screen, red, (300, 300), 50, 10)
    pygame.display.flip()
```
8. 游戏中的文字
```
import sys, pygame


pygame.init()

screen = pygame.display.set_mode((500, 500))
red = pygame.Color(255, 0, 0)

font = pygame.font.Font('./static/hwxw.ttf', 60) # 字体文件 字体大小
text = font.render('华文新魏', True, red, (255, 255, 255)) # 文字 平滑字体 文字颜色 背景颜色

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    screen.blit(text, (20, 100))
    pygame.display.flip()
```
注释：颜色可以用`pygame.Color(R, G, B)`生成，也可以用`(R, G, B)`元组表示。
9. 游戏中的音乐
```
import sys, pygame

pygame.init()

screen = pygame.display.set_mode((500, 500))

pygame.mixer.music.load('./static/bg_music.mp3')  # 加载音乐
pygame.mixer.music.set_volume(0.5)  # 设置音量(0-1)
pygame.mixer.music.play(-1)  # 循环播放

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
```
注释：`game.mixer.music`用来播放背景音乐。
10. 游戏中的音效
```
import pygame

pygame.init()
sound = pygame.mixer.Sound('./static/bullet.wav')
sound.play()

while True:
    pass
```
注释：`pygame.mixer.Sound()`播放音效。音频可以可以是`OGG`音频文件或者`WAV`音频文件
11. 游戏中的动画切换
```
import sys, pygame

pygame.init()

screen = pygame.display.set_mode((500, 500))

hero1 = pygame.image.load('./static/hero1.png')
hero2 = pygame.image.load('./static/hero2.png')
clock = pygame.time.Clock()

count = 1
while True:
    clock.tick(60)  # 设置动画帧数
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
    screen.fill((255, 255, 255))
    # 等价写法: screen.fill(pygame.Color(255, 255, 255))
    if count % 2 == 0:
        screen.blit(hero1, (100, 100))
    else:
        screen.blit(hero2, (100, 100))
    count += 1
    pygame.display.flip()
```
12. 精灵、精灵组与碰撞检测
(1) 两个精灵之间的矩形检测
[pygame.sprite.collide_rect](https://www.pygame.org/docs/ref/sprite.html#pygame.sprite.collide_rect)
[pygame.sprite.collide_rect_ratio](https://www.pygame.org/docs/ref/sprite.html#pygame.sprite.collide_rect_ratio)
(2) 两个精灵之间的圆形检测
[pygame.sprite.collide_circle](https://www.pygame.org/docs/ref/sprite.html#pygame.sprite.collide_circle)
[pygame.sprite.collide_circle_ratio](https://www.pygame.org/docs/ref/sprite.html#pygame.sprite.collide_circle_ratio)
(3) 两个精灵之间的像素遮罩检测
[pygame.sprite.collide_mask](https://www.pygame.org/docs/ref/sprite.html#pygame.sprite.collide_mask)
(4) 精灵与精灵组之间的碰撞检测
[pygame.sprite.spritecollide](https://www.pygame.org/docs/ref/sprite.html#pygame.sprite.spritecollide)
(5) 两个精灵组之间的碰撞检测
[pygame.sprite.groupcollide](https://www.pygame.org/docs/ref/sprite.html#pygame.sprite.groupcollide)
(6) 将精灵从所有精灵组中删除
[pygame.sprite.Sprite.kill](https://www.pygame.org/docs/ref/sprite.html#pygame.sprite.Sprite.kill)
(7) 删除所有精灵
[pygame.sprite.Group.empty](https://www.pygame.org/docs/ref/sprite.html#pygame.sprite.Group.empty)
```
import sys, pygame

# 初始化
pygame.init()

# 屏幕对象
screen = pygame.display.set_mode((500, 500))


class Block(pygame.sprite.Sprite):
    def __init__(self, color, x, y, width, height):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.Surface([width, height])
        self.image.fill(color)
        self.rect = pygame.Rect(x, y, width, height)

    def move(self, x, y):
        self.rect = self.rect.move(x, y)


s1 = Block((255, 0, 0), 50, 50, 50, 50)
s2 = Block((0, 255, 0), 90, 90, 100, 50)

while True:
    # 处理事件
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
    screen.blit(s1.image, s1.rect)
    screen.blit(s2.image, s2.rect)
    # 矩形检测碰撞
    result1 = pygame.sprite.collide_rect(s1, s2)
    # 使用缩放为一定比例的圆，检测两个小精灵之间的碰撞
    result2 = pygame.sprite.collide_circle_ratio(0.5)(s1, s2)
    print(result1, result2)  # 1 False
    pygame.display.flip()
```
## 2.3 实战：飞机大战游戏
1. 开发步骤
面向对象项目分析
项目初始化
载入我方飞机
载入敌方飞机
碰撞检测、爆炸效果及音效
成绩统计
2. 项目扩展完善
使用多线程/多进程来扩展敌机数量
爆炸效果延时展示
添加游戏暂停功能
添加中型敌机，大型敌机
添加多条生命
记录玩家的多条分数记录
敌机发射子弹
3. 代码地址
[https://github.com/nmwei/PlaneWars](https://github.com/nmwei/PlaneWars)
[https://github.com/nmwei/MyPlaneWars](https://github.com/nmwei/MyPlaneWars)
