# 1. Linux简介与安装
## 1.1 Linux的基本介绍
1. 操作系统
`Unix` → `Max OS`、`Linux`或(`GNU/Linux`)
`MS-DOS` → `Windows`
2. `Linux`无处不在
大部分网站的服务器都是`Linux`系统
`Android`系统的底层用的是修改过的`Linux`内核
全球`500`台最快的超级计算机中，`80%`采用`Linux`系统
3. `Linux`特点
免费、更新频繁
4. 不同`Linux`发行版
`RedHat`：性能稳定，老牌的`Linux`发行版。收费的是`RHEL`(企业版)。
`Fedora`：`RedHat`的社区免费后继版。
`CentOS`：可以算是`RHEL`的克隆版，免费。
`Mandriva`：最早`Mandrake`的开发者是基于`RedHat`进行开发的。
`SUSE`：德国最著名的`Linux`发行版。
`Debian`：迄今为止，最遵循`GNU`规范的`Linux`系统。
`Ubuntu`：`Debian`的后继或一个分支。
`Gentoo`：高度的自定制性。
`Slackware`：历史最悠久的`Linux`发行版，创建于`1992`年。
`Deepin`：中国发行。对优秀的开源产品进行集成和配置，开发软件。
总结如下：
`Linux`→ `Mandriva`、`Red Hat`、`Debian`、`Slackware`
`Debian`→ `Knoppix`、`Ubuntu`、`Skolelinux`
5. `Ubuntu`
简便易用、更新频繁、社区完善、标准化
有多个版本：桌面版、服务器版、嵌入式版、云版
[官网](https://ubuntu.com/)、[中文官网](https://cn.ubuntu.com/)、[优麒麟](https://www.ubuntukylin.com/)
6. `Linux`主流桌面管理器
`Gnome`、`KDE`、`Unity`、`XFCE`
## 1.2 Ubuntu系统的安装
1. 华为云安装`Ubuntu`系统
系统版本 `Ubuntu 18.04.4 LTS` 
密码 `Aa299***` 
2. 第一次`root`登录
命令行输入：`ssh root@121.37.170.230`
密码：`Aa299***`
报错：`WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!
Host key verification failed.
`
由于更换了服务器的操作系统，导致之前配置的`SSH`免密登录失效。
解决：`ssh-keygen -R 121.37.170.230`
重新登录：`ssh root@121.37.170.230`
3. `XFCE`介绍
`XFCE`是一个精简的轻量化桌面，与`Gnome`和`KDE`相比更小巧，并且界面美观、对用户友好，适合云服务器远程连接场景下使用。
**资料：**[Linux的桌面环境gnome、kde、xfce、lxde 等等使用比较](https://www.cnblogs.com/chenmingjun/p/8506995.html)
4. 安装`XFCE`桌面并使用`VNC Viewer`连接
(1) 安装`VNC Server`
远程登录云服务器
`ssh root@121.37.170.230`
更新软件列表
`sudo apt update`
安装`Xfce`桌面环境。
 `sudo apt install xfce4 xfce4-goodies`
安装`TightVNC`服务器
`sudo apt install tightvncserver`
初始化`VNC Server`
`vncserver`
输入密码、验证密码、输入`n`
(2) 配置`VNC Server`
停止第一个虚拟桌面
`vncserver -kill :1`
修改`xstartup`文件
`vim ~/.vnc/xstartup`
按`i`进入编辑模式，添加以下内容
`#!/bin/sh`
`xrdb $HOME/.Xresources`
`startxfce4 &`
配置可执行
`sudo chmod +x ~/.vnc/xstartup`
重启`VNC Server`
`vncserver`
回显信息中出现类似这样的一条信息：`Log file is /root/.vnc/xxx:1.log`。其中，`1`表示当前用户分配的是`VNC`的第一个虚拟桌面。
(3) 云服务器控制台配置
更改安全组规则，放行`5901`端口。
(4) 使用`VNC Viewer`连接云服务器
在本地`PC`打开`VNC Viewer`客户端，输入云服务器的弹性公网`IP:5901`，设置名称，单击`OK`。
**注意：**① 服务器重启后，需要重新执行`vncserver`重启`VNC Server`。②`xxx:1.log`日志中的`1`与`5901`端口中的`1`对应。 ③`XFCE`桌面配置重置命令 `rm -r ~/.config/xfce4` ④ 如果本地通过`VNC Viewer`连接时报错`Too many authentication failures`，则需要重启`vncserver`。即：`sudo vncserver -kill :1`和 `sudo vncserver :1`
**资料：** [使用VNC Viewer连接Linux云服务器](https://support.huaweicloud.com/bestpractice-ecs/zh-cn_topic_0168615364.html)
5. 安装`Gnome`桌面(可选)
[在Ubuntu Server 18.04上安装GNOME桌面](https://cloud.tencent.com/developer/news/380637)
# 2. Linux中基本命令的使用
## 2.1 终端的基本操作
1. 终端介绍
有些操作使用终端更方便快捷。
`Linux`和`Unix`终端命令大部分类似。
自从`20`世纪`6,70`年代开始，终端基本没变。一次学习，终身受用。
`mac OS`系统使用的是`Unix`终端。
2. 命令行`Command Line`提示符拆解
`root@ecs-x-large-2-linux-20200315202744:~# `
`root`: 当前用户名
`ecs-x-large-2-linux-20200315202744`：主机名。
`~`：当前用户的家目录
`#`：用户权限，其中`$`表示普通用户，`#`表示超级管理员。
```shell
// 切换到超级管理员
root@ecs-x-large-2-linux-20200315202744:~# sudo su
//查看用户
root@ecs-x-large-2-linux-20200315202744:~# whoami
root
//查看主机
root@ecs-x-large-2-linux-20200315202744:~# hostname
ecs-x-large-2-linux-20200315202744
```
3. 命令介绍
(1) 格式
`command parameters`
命令区分大小写。
(2) 短参数
`command -p`、`command -p -a`、`command -pa`、`command -p 10`
一个横线、短参数可以合并、通过空格赋值。
(3) 长参数
`command --para`、`command --para1 --para2`、`command --para=10`
两个横线、长参数不可以合并、通过等号赋值。
(4) 其他参数
有些参数的形式没有绝对的准则。例如: `ls 路径名`
(5) 命令补全
按一次`Tab`键补全命令或路径。
按两次`Tab`键列出所有相关命令。
```shell
root@ecs-x-large-2-linux-20200315202744:~# ls
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
root@ecs-x-large-2-linux-20200315202744:~# ls -a
.              .bash_history  .dbus     .ssh              Desktop    Pictures
root@ecs-x-large-2-linux-20200315202744:~# ls --all
.              .bash_history  .dbus     .ssh              Desktop    Pictures
root@ecs-x-large-2-linux-20200315202744:~# ls Desktop
root@ecs-x-large-2-linux-20200315202744:~# date 
Fri Jul 31 08:30:38 CST 2020
root@ecs-x-large-2-linux-20200315202744:~# c
Display all 103 possibilities? (y or n)
c++                        clear_console
c++filt                    cloud-init
c89                        cloud-init-per
c89-gcc                    cmp
root@ecs-x-large-2-linux-20200315202744:~# logout
Connection to 121.37.170.230 closed.
➜  ~ 
```
**注意：**①按两次`Tab`列出所有相关命令。如果相关命令太多时，则只显示第一页。按空格显示下一页，按回车显示下一行，按`Q`退出显示。 ②`logout`关闭服务器连接。
4. 查看命令历史记录
上下查找： `↑`、`↓`
搜索查找：`Ctrl + R`
`(reverse-i-search)d': date`
列出所有：`history`
5. 快捷键
清屏：`Ctrl + L`或者`clear`
`Ctrl + D`：退出连接或关闭命令行：
`Ctrl + A`：光标跳到一行命令起始位置
`Ctrl + E`：光标跳到一行命令结束位置
`Ctrl + U`：删除在光标左侧的所有命令字符
`Ctrl + K`：删除在光标右侧的所有命令字符
`Ctrl + W`：删除在光标左侧的一个单词
`Ctrl + Y`：粘贴用`Ctrl + U`、`Ctrl + K`或`Ctrl + W`删除的字符串。
**注释：**`Ctrl + L`和`clear`相当于滚动到新的一屏。而`macOS`中的`command + K`才是真正的清屏。
## 2.2 Linux下的文件操作
### 2.2.1 Linux文件系统
1. `Linux`中的文件目录组织形式
`Linux`有且只有一个根目录，就是`/`。
`Linux`用`/`来表示目录的层级与包含关系。
`Linux`的目录形式为：`/usr/bin`。
`bin`是`usr`目录的子目录，`usr`是`/`根目录的子目录。
2. `/`根目录的直属子目录介绍
(1) `bin`
`binary`二进制文件，包含用户的所有可执行程序。
(2) `boot`
`boot`启动，包含与`Linux`启动密切相关的文件。
(3) `etc`
包含系统的配置文件。
(4) `home`
用户的私人目录。在这个目录中，我们放置私人的文件。
`Linux`中的每个用户(除了`root`)都在`home`目录中有一个私人目录(家目录)。
例如：用户名是`nmw`，那么我的私人目录(家目录)就是`/home/nmw`。
(5) `lib`
`library`“库”，包含被程序所调用的库文件。
例如：`.so`结尾的文件。`windows`中这样的库文件是以`.dll`结尾的。
(6) `media`
媒体，当可移动的外设(例如`USB`盘、`SD`卡、`DVD`、光盘等)插入电脑时，`Linux`可以让我们通过`media`的子目录访问这些外设的内容。
(7) `mnt`
`mount`挂载，类似于`media`，但一般用于临时挂载一些装置。
(8) `opt`
`optional application software package`“可选的应用软件包”。
用于安装多数第三方软件和插件。
(9) `root`
根，超级管理员的`root`的家目录。
一般用户的家目录位于`/home`下，`root`用户例外。
(10) `sbin`
`system binary`系统二进制文件，比`bin`多了个`system`。
包含的是系统级的重要可执行程序。
(11) `srv`
`service`服务，包含一些网络服务启动后所需要取用到的数据。
(12) `tmp`
`temporary`临时，普通用户和程序存放临时文件的地方。
(13) `usr`
`Unix Software Resource`表示`Unix`操作系统软件资源(历史遗留命名)。
该目录是最庞大的目录之一，安装了大部分用户要调用的程序。
类似于`Windows`中的`C:\Windows`和`C:\Program Files`这两个文件夹的集合。
(14) `var`
包含程序的数据，例如`log`日志文件。
```shell
root@ecs-x-large-2-linux-20200315202744:~# pwd
/root
root@ecs-x-large-2-linux-20200315202744:~# cd /
root@ecs-x-large-2-linux-20200315202744:/# ls
CloudResetPwdUpdateAgent                    initrd.img.old  sbin
CloudrResetPwdAgent                         lib             snap
HostGuardAgent_Linux64_V1.12.50.deb.sha256  lib64           srv
bin                                         lost+found      swapfile
boot                                        media           sys
dev                                         mnt             tmp
etc                                         opt             usr
home                                        proc            var
hostguard_setup_config.dat                  root            vmlinuz
initrd.img                                  run             vmlinuz.old
root@ecs-x-large-2-linux-20200315202744:/# cd root
root@ecs-x-large-2-linux-20200315202744:~# 
```
**注意：**① `pwd`命令可以打印当前所在的绝对目录结构。② 以上目录列表形式不仅限于`Linux`系统，类`Unix`系统类似。
```shell
➜  ~ cd /
➜  / ls
Applications Users        cores        home         sbin         var
Library      Volumes      dev          opt          tmp
System       bin          etc          private      usr
➜  / cd ~
➜  ~ pwd
/Users/nimengwei
➜  ~ 
```
3. [Linux文件系统结构图](https://qianngchn.github.io/wiki/10.html)
`/`：`bin`、`dev`、`home`、`lib`、`root`、`var`
`home`：`drew`、`nmw`
4. `witch`命令
获取命令的可执行文件的位置。
```shell
root@ecs-x-large-2-linux-20200315202744:~# pwd
/root
root@ecs-x-large-2-linux-20200315202744:~# which pwd
/bin/pwd
root@ecs-x-large-2-linux-20200315202744:~# which which
/usr/bin/which
```
注意：`Windows`命令中可执行程序一般以`.exe`为后缀，而`Linux`中一般没有后缀名。
5. `ls`命令
(1) `--color=auto/none`
开启/关闭颜色，默认开启。
其中：蓝色→目录；绿色→可执行文件；绿色→压缩文件；浅蓝色→链接文件；灰色→其他文件。
(2) `-a`
`a`是`all`，显示隐藏的文件。
以`.`开头的文件是隐藏文件。
`.`表示当前目录。
`..`表示上一级目录。
(3) `-A`
与`-a`的区别就是不列出`.`和`..`两个文件。
(4) `-l`
列出文件和目录详细信息的列表。
(5) `-h`
`h`是`humain readable`，表示适合人类阅读的。
(6) `-t`
按照文件最后一次修改时间排序。
```shell
root@ecs-x-large-2-linux-20200315202744:~# ls
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
root@ecs-x-large-2-linux-20200315202744:~# ls -a
.              .bash_history  .dbus     .ssh              Desktop    Pictures
..             .bashrc        .gnupg    .viminfo          Documents  Public
root@ecs-x-large-2-linux-20200315202744:~# ls .
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
root@ecs-x-large-2-linux-20200315202744:~# ls ..
bin                                         lost+found      swapfile
boot                                        media           sys
initrd.img                                  run             vmlinuz.old
root@ecs-x-large-2-linux-20200315202744:~# ls -l
total 32
drwxr-xr-x 2 root root 4096 Jul 30 09:49 Desktop
drwxr-xr-x 2 root root 4096 Jul 30 09:49 Documents
drwxr-xr-x 2 root root 4096 Jul 30 09:49 Downloads
root@ecs-x-large-2-linux-20200315202744:~# ls -lh
total 32K
drwxr-xr-x 2 root root 4.0K Jul 30 09:49 Desktop
drwxr-xr-x 2 root root 4.0K Jul 30 09:49 Documents
drwxr-xr-x 2 root root 4.0K Jul 30 09:49 Downloads
root@ecs-x-large-2-linux-20200315202744:~# ls -lath
total 128K
-rw-r--r--  1 root root 1.5K Aug  1 00:45 .bash_history
-rw-------  1 root root  35K Jul 31 21:15 .xsession-errors
drwx------ 17 root root 4.0K Jul 31 20:08 .
-rw-------  1 root root 1.3K Jul 31 20:08 .ICEauthority
```
**注释：**：① `total 32`：该层文件/文件夹大小之和。
② `drwxr-xr-x 2 root root 4096 Jul 30 09:49 Desktop`：`drwxr-xr-x`文件权限，`2`对于目录表示目录中文件个数，对于文件则表示链接数目，`root`文件所有者名称，`root`文件所在的群组，`4096`文件大小，`Jul 30 09:49`最近修改的时间，`Desktop`文件/目录名。
6. `cd`命令
可以使用相对路径和绝对路径(`/`开头)。
回到家目录：`cd ~`或者`cd`
```shell
root@ecs-x-large-2-linux-20200315202744:~# cd /
root@ecs-x-large-2-linux-20200315202744:/# cd usr
root@ecs-x-large-2-linux-20200315202744:/usr# pwd
/usr
root@ecs-x-large-2-linux-20200315202744:/usr# cd ..
root@ecs-x-large-2-linux-20200315202744:/# cd usr/games
root@ecs-x-large-2-linux-20200315202744:/usr/games# cd ../..
root@ecs-x-large-2-linux-20200315202744:/# cd ~
root@ecs-x-large-2-linux-20200315202744:~# cd /usr/games
root@ecs-x-large-2-linux-20200315202744:/usr/games# cd ~
root@ecs-x-large-2-linux-20200315202744:~# cd ../usr/games
root@ecs-x-large-2-linux-20200315202744:/usr/games# 
```
**注意：**两次`tab`可以自动补全命令。
7. `du`命令
`du`是`disk usage`的缩写，表示磁盘使用/占用。
可以查看文件和目录所占的空间大小。
(1) `-h`
表示适合人类阅读的。
(2) `-a`
默认`du`目录只显示目录大小。加上`-a`，则会显示目录和文件的大小。
(3) `-s`
只显示目录总大小，不显示目录和文件列表。
```shell
root@ecs-x-large-2-linux-20200315202744:~# du -ah
4.0K	./Pictures
4.0K	./.viminfo
4.0K	./.dbus/session-bus/90234ee485824633a7d7fa2e6f70265b-1
8.0K	./.dbus/session-bus
12K	./.dbus
.....
644K	.
root@ecs-x-large-2-linux-20200315202744:~# du -sh
644K	.
```
**注意：**`ls -l`只会统计文件或目录本身的大小。`du`命令会遍历目录内部的目录和文件，统计所有文件大小。
### 2.2.2 Linux文件操作
1. 显示文件内容
(1) `cat`命令
一次性显示文件所有内容。
`-n`参数表示显示行号。
(2) `less`命令
分页显示文件内容。
显示内容之后的快捷键如下：
① `q`-中止读取文件 ② 空格-读取下一屏内容 ③ 回车-读取下一行 
④ `d` - 前进半个页面 ⑤ `u`-后退半页 ⑥ `b`或者`↓`-后退一页
⑦ `y`或者`↑`-后退一行 ⑧ `=`-显示你在文件中的位置 ⑨ `h` - 显示帮助文档
⑩ `/` - 进入搜索模式。`n` -跳转到下一个搜索结果。`N`-跳转到上一个搜索结果。
```shell
root@ecs-x-large-2-linux-20200315202744:/var/log# less syslog
root@ecs-x-large-2-linux-20200315202744:/var/log# cat syslog
Aug  1 06:25:01 ecs-x-large-2-linux-20200315202744 rsyslogd:  [origin software="rsyslogd" swVersion="8.32.0" x-pid="685" x-info="http://www.rsyslog.com"] rsyslogd was HUPed 
...
```
2. 显示文件的首位
(1) `head`命令
显示文件的开头几行
`-n` - 显示几行，默认显示10行。
(2) `tail`命令
显示文件的结尾几行
① `-n` - 显示几行，默认显示10行。
② `-f` - 实时追踪文件的更新。
默认每过`1s`检查一次文件是否有更新。
可以用`-s`参数指定间隔检查的秒数，例如：`tail -f -s 4 syslog`
`Ctrl + c`终止查看。
```shell
root@ecs-x-large-2-linux-20200315202744:/var/log# head -n 1 syslog
Aug  1 06:25:01 ecs-x-large-2-linux-20200315202744 rsyslogd:  [origin software="rsyslogd" swVersion="8.32.0" x-pid="685" x-info="http://www.rsyslog.com"] rsyslogd was HUPed
root@ecs-x-large-2-linux-20200315202744:/var/log# tail -n 2 syslog
Aug  1 09:42:54 ecs-x-large-2-linux-20200315202744 systemd[1]: Started Session 26 of user root.
Aug  1 09:47:00 ecs-x-large-2-linux-20200315202744 systemd[1]: Started Session 27 of user root.
root@ecs-x-large-2-linux-20200315202744:/var/log# tail -f syslog
Aug  1 09:05:10 ecs-x-large-2-linux-20200315202744 org.freedesktop.thumbnails.Cache1[1764]: Registered thumbailer /usr/bin/gdk-pixbuf-thumbnailer -s %s %u %o
Aug  1 09:05:10 ecs-x-large-2-linux-20200315202744 org.freedesktop.thumbnails.Cache1[1764]: Registered thumbailer /usr/bin/gdk-pixbuf-thumbnailer -s %s %u %o
Aug  1 09:05:10 ecs-x-large-2-linux-20200315202744 dbus-daemon[1764]: [session uid=0 pid=1764] Successfully activated service 'org.freedesktop.thumbnails.Cache1'
...
^C
```
**注意：**`Ctrl + c`可以终止大部分终端命令。
3. `touch`命令
创建一个空白文件。
该命令的设计初衷是修改文件的时间戳。如果文件不存在，就会新建一个新的。
```shell
root@ecs-x-large-2-linux-20200315202744:~# ls
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
root@ecs-x-large-2-linux-20200315202744:~# touch new_file
root@ecs-x-large-2-linux-20200315202744:~# ls
Desktop    Downloads  Pictures  Templates  new_file
Documents  Music      Public    Videos
root@ecs-x-large-2-linux-20200315202744:~# ls -l
total 32
drwxr-xr-x 2 root root 4096 Jul 30 09:49 Public
drwxr-xr-x 2 root root 4096 Jul 30 09:49 Templates
drwxr-xr-x 2 root root 4096 Jul 30 09:49 Videos
-rw-r--r-- 1 root root    0 Aug  1 10:00 new_file
...
root@ecs-x-large-2-linux-20200315202744:~# touch new_file2 new_file3
root@ecs-x-large-2-linux-20200315202744:~# ls
Desktop    Downloads  Pictures  Templates  new_file   new_file3
Documents  Music      Public    Videos     new_file2
```
4. `mkdir`命令
创建一个目录。
(1) 创建单层目录
`mkdir 目录`
(2) 创建多层目录
`mkdir  -p 目录1/目录2/目录3`
```shell
root@ecs-x-large-2-linux-20200315202744:~# mkdir new_folder
root@ecs-x-large-2-linux-20200315202744:~# mkdir new_folder2 new_folder3
root@ecs-x-large-2-linux-20200315202744:~# ls
Desktop    Downloads  Pictures  Templates  new_file   new_file3   new_folder2
Documents  Music      Public    Videos     new_file2  new_folder  new_folder3
root@ecs-x-large-2-linux-20200315202744:~# mkdir -p dir1/dir2/dir3
root@ecs-x-large-2-linux-20200315202744:~# cd dir1/dir2
root@ecs-x-large-2-linux-20200315202744:~/dir1/dir2# ls
dir3
```
5. `cp`命令
拷贝文件或目录。
(1) 拷贝文件
`cp 文件 备份文件`：拷贝文件到当前目录为一个新的文件名。
`cp 文件 目录`：拷贝文件到其他目录。
`cp 文件 目录/备份文件`：拷贝文件到其他目录为一个新的文件名。
```shell
root@ecs-x-large-2-linux-20200315202744:~# cp new_file new_file_copy
root@ecs-x-large-2-linux-20200315202744:~# ls
Desktop    Music     Templates  new_file   new_file_copy  new_folder3
Documents  Pictures  Videos     new_file2  new_folder
Downloads  Public    dir1       new_file3  new_folder2
root@ecs-x-large-2-linux-20200315202744:~# cp new_file new_folder
root@ecs-x-large-2-linux-20200315202744:~# cd new_folder
root@ecs-x-large-2-linux-20200315202744:~/new_folder# ls
new_file
root@ecs-x-large-2-linux-20200315202744:~/new_folder# cd ..
root@ecs-x-large-2-linux-20200315202744:~# cp new_file new_folder/new_file_copy
root@ecs-x-large-2-linux-20200315202744:~# cd new_folder
root@ecs-x-large-2-linux-20200315202744:~/new_folder# ls
new_file  new_file_copy
```
(2) 拷贝目录
添加`-r`参数，表示`recursive`递归拷贝。
目录中的所有内容(子目录和文件)都会被拷贝。
```shell
root@ecs-x-large-2-linux-20200315202744:~# cp -r new_folder new_folder_copy
root@ecs-x-large-2-linux-20200315202744:~# cd new_folder_copy
root@ecs-x-large-2-linux-20200315202744:~/new_folder_copy# ls
new_file  new_file_copy
root@ecs-x-large-2-linux-20200315202744:~/new_folder_copy# 
```
6. 使用通配符`*`
例如：`cp *.txt folder` 把当前目录下所有`txt`文件拷贝到`folder`目录中。
`cp ha* folder`：把当前目录以`ha`开头的文件都拷贝到`folder`目录中。
```shell
root@ecs-x-large-2-linux-20200315202744:~# cp new_file* new_folder2
root@ecs-x-large-2-linux-20200315202744:~# cd new_folder2
root@ecs-x-large-2-linux-20200315202744:~/new_folder2# ls
new_file  new_file2  new_file3  new_file_copy
```
7. `mv`命令
`mv`表示`move`移动。`mv`命令有两个功能。
(1) 移动文件/目录
移动目录也不需要添加新的参数(`-r`)。
```shell
root@ecs-x-large-2-linux-20200315202744:~# mv new_file2 new_folder3 new_folder
root@ecs-x-large-2-linux-20200315202744:~# cd new_folder
root@ecs-x-large-2-linux-20200315202744:~/new_folder# ls
new_file  new_file2  new_folder3  new_file_copy
```
(2) 重命名文件/目录
移动到当前目录则相当于重命名。
```shell
root@ecs-x-large-2-linux-20200315202744:~# ls
Desktop    Music     Templates  new_file       new_folder2
Documents  Pictures  Videos     new_file_copy  new_folder_copy
Downloads  Public    dir1       new_folder
root@ecs-x-large-2-linux-20200315202744:~# mv new_folder2 new_folder2_rename
root@ecs-x-large-2-linux-20200315202744:~# ls
Desktop    Music     Templates  new_file       new_folder2_rename
Documents  Pictures  Videos     new_file_copy  new_folder_copy
Downloads  Public    dir1       new_folder
root@ecs-x-large-2-linux-20200315202744:~# 
```
**注意：**拷贝、移动等命令都可以使用通配符`*`。
8. `rm`命令
删除文件和目录。
`-i`：询问是否删除。
`-f`：不询问强制删除。
`-r`：递归删除，用来删除目录。
```shell
root@ecs-x-large-2-linux-20200315202744:~# rm new_file_copy
root@ecs-x-large-2-linux-20200315202744:~# rm -i  new_file
rm: remove regular empty file 'new_file'? n
root@ecs-x-large-2-linux-20200315202744:~# rm -r new_folder2_rename
root@ecs-x-large-2-linux-20200315202744:~# ls
Desktop    Downloads  Pictures  Templates  dir1      new_folder
Documents  Music      Public    Videos     new_file  new_folder_copy
```
**注意：**① `rm -rf`的含义是强制递归删除文件夹，很危险。② 超级管理员运行`rm -rf /*`或者`rm -rf /`命令会删除你的整个`Linux`系统。
9. `rmdir`
只能用来删除一个空的目录，不常用。
```shell
root@ecs-x-large-2-linux-20200315202744:~# mkdir aaa
root@ecs-x-large-2-linux-20200315202744:~# rmdir aaa
```
10. 文件的存储
文件名、权限和文件内容。
每个文件的文件内容被分配一个标识号码，即`inode`。
每个文件名都绑定到它的文件内容，用`inode`标识。
`ls -i` - 查看文件的`inode`
```shell
root@ecs-x-large-2-linux-20200315202744:~# ls -i
1843494 Desktop    1843495 Downloads  1843500 Pictures  1843496 Templates
1843498 Documents  1843499 Music      1843497 Public    1843501 Videos
```
11. `ln`命令
创建链接(快捷方式)。
分类：`Physical link`物理链接/硬链接、`Symbolic link`符号链接/软链接
硬链接只能够指向文件。软链接既能够指向文件，又能够指向目录。软链接应用更广泛。
(1) `Physical link`物理链接/硬链接
创建`文件1`的硬链接`文件2`
命令：`ln 文件1 文件2`  
原理：`文件1` → `inode`文件内容，`文件2` → `inode`文件内容
介绍：`文件2`和`文件1`的`inode`相同。修改`文件1`和`文件2`，则修改的是同一块内容。`文件1`和`文件2`都删除，文件内容才会删除。
```shell
root@ecs-x-large-2-linux-20200315202744:~# mkdir test
root@ecs-x-large-2-linux-20200315202744:~# cd test
root@ecs-x-large-2-linux-20200315202744:~/test# touch f1
root@ecs-x-large-2-linux-20200315202744:~/test# ln f1 f2
root@ecs-x-large-2-linux-20200315202744:~/test# ls -l
total 0
-rw-r--r-- 2 root root 0 Aug  1 12:02 f1
-rw-r--r-- 2 root root 0 Aug  1 12:02 f2
root@ecs-x-large-2-linux-20200315202744:~/test# ls -i
1843520 f1  1843520 f2
root@ecs-x-large-2-linux-20200315202744:~/test# 
```
**注意：**`2`表示指向该文件内容的文件数为`2`。`f1`和`f2`指向的文件内容`inode`相同(`1843520`)。
(2) `Symbolic link`符号链接/软链接
创建`文件1`的软链接`文件2`
命令：`ln -s 文件1 文件2` 。其中，`s`是`symbolic`符号的缩写。
原理：`文件1` → `inode`文件内容，`文件2` → `文件1`
介绍：`文件2`和`文件1`的`inode`不同。如果删除`文件1`，则`文件2`会变成死链接。
```shell
root@ecs-x-large-2-linux-20200315202744:~/test# touch f1
root@ecs-x-large-2-linux-20200315202744:~/test# ls
f1
root@ecs-x-large-2-linux-20200315202744:~/test# ln -s f1 f2
root@ecs-x-large-2-linux-20200315202744:~/test# ls
f1  f2
root@ecs-x-large-2-linux-20200315202744:~/test# ls -l
total 0
-rw-r--r-- 1 root root 0 Aug  1 12:15 f1
lrwxrwxrwx 1 root root 2 Aug  1 12:16 f2 -> f1
root@ecs-x-large-2-linux-20200315202744:~/test# ls -i
1843520 f1  1843521 f2
```
**注意：**第一个字符`-`表示普通文件，`l`表示软链接。 `1`表示指向该文件内容的文件数为`1`。`f1`和`f2`指向的文件内容`inode`不同。
## 2.3 Linux下的权限管理
### 2.3.1 用户权限
1. `Linux`中的用户组织
`Linux`系统是一个多用户多任务的分时操作系统，任何一个要使用系统资源的用户，都必须首先向系统管理员申请一个账号，然后以这个账号的身份进入系统。
用户 账号一方面可以帮助系统管理员对使用系统的用户进行跟踪，并控制他们对系统资源的访问；另一方面也可以帮助用户组织文件，并为用户提供安全性保护。
2. `sudo`与`su`相关命令
`sudo`：暂时切换到超级用户模式以执行超级用户权限，需要输入**当前**用户密码。有时间限制，`Ubuntu`默认为一次时长`15`分钟。
`su`：切换到某某用户模式，需要输入**切换后**账户的密码。如果不加账户默认为`root`账户。没有时间限制。
`sudo su`：运行`sudo`命令给`su`命令提权，运行`su`命令，切换到`root`模式。
**注意：**普通用户切换到`root`用户模式有两种方式。一种是`su`命令，需要输入`root`密码，一种是`sudo su`命令，需要输入当前用户密码。
3. 创建用户
`adduser nmw`
```shell
root@ecs-x-large-2-linux-20200315202744:~# adduser nmw
Adding user `nmw' ...
Adding new group `nmw' (1000) ...
Adding new user `nmw' (1000) with group `nmw' ...
Creating home directory `/home/nmw' ...
Copying files from `/etc/skel' ...
Enter new UNIX password: 
Retype new UNIX password: 
passwd: password updated successfully
Changing the user information for nmw
Enter the new value, or press ENTER for the default
	Full Name []: nimengwei
	Room Number []: 
	Work Phone []: 17626186618
	Home Phone []: 
	Other []: 
Is the information correct? [Y/n] y
```
创建用户后会默认在`/home`目录中添加`nmw`用户的家目录。
```shell
root@ecs-x-large-2-linux-20200315202744:~# cd /home
root@ecs-x-large-2-linux-20200315202744:/home# ls
nmw
```
4. 修改密码
`passwd nmw`
5. 删除用户
删除用户：`deluser nmw`
删除用户及对应家目录：`deluser --remove-home nmw`
**注意：**`adduser`和`deluser`只是`Debian`一族(包括`Ubuntu`)才有的命令。其他`Linux`发行版，添加用户和删除用户一般用`useradd`和`userdel`。
6. 用户群组管理
(1) 创建用户如果不设置群组，则会创建一个和用户名相同的群组，并将用户划归到这个群组。
(2) 查看家目录
```shell
root@ecs-x-large-2-linux-20200315202744:~# ls -l /home
total 4
drwxr-xr-x 2 nmw nmw 4096 Aug  1 17:39 nmw
```
其中，第三列`nmw`表示文件/目录的所有者，第四列`nmw`表示文件或/目录所在的群组。
(3) 创建群组
`addgroup friends`
```shell
root@ecs-x-large-2-linux-20200315202744:~# addgroup friends
Adding group `friends' (GID 1001) ...
Done.
```
(4) 删除群组
`delgroup happy`
```shell
root@ecs-x-large-2-linux-20200315202744:~# delgroup happy
Removing group `happy' ...
Done.
```
7. 修改用户群组
(1) `usermod 用户名`
`-l`对用户重命名。`/home`中的家目录名不变，需要手动修改。
`-g`修改用户所在群组。原群组剔除此用户。
`-G`将用户添加到多个群组。原群组剔除此用户。
`-aG`追加到新的群组。原群组不剔除此用户。
**注意：**使用`usermod`命令修改用户组时，很容易被剔除原有组，因此[尽量不要使用](https://serverfault.com/questions/688685/usermod-ag-vs-gpasswd-a-as-a-best-practice)。可以使用`gpasswd`命令。
(2) `gpasswd -a 用户名 组名`
一次从一个组中添加（或删除）一个用户。
(3) `groups 用户名`
可以查看该用户所在的群组
```shell
root@ecs-x-large-2-linux-20200315202744:~# usermod -g friends nmw
root@ecs-x-large-2-linux-20200315202744:~# usermod -G friends,happy nmw
root@ecs-x-large-2-linux-20200315202744:~# usermod -aG friends,happy nmw
root@ecs-x-large-2-linux-20200315202744:~# groups nmw
nmw : friends happy
root@ecs-x-large-2-linux-20200315202744:~# groups root
root : root
root@ecs-x-large-2-linux-20200315202744:~# gpasswd -a nmw sudo
Adding user nmw to group sudo
```
### 2.3.2 文件权限
1. 文件访问权限符
`-`：如果在第一个字符，表示普通文件；否则，表示没有权限。
`d`：目录；
`l`：链接；
`r`：读；
`w`：写
`x`：执行/运行
2. 三种基本权限
(1) `r` 读 数值表示为`4`
(2) `w` 写 数值表示为`2`
(3) `x` 可执行 数值表示为`1`
3. 文件权限介绍
例如：`drwxrwxr-x`
一共十个字符，分成四段。
(1) 第`1`个字符`d`表示目录，`-`表示普通文件，`l`表示链接。
(2) 第`2-4`个字符`rwx`表示当前所属用户的权限，用数值表示为`4+2+1=7`。
(3) 第`5-7`个字符`rwx`表示当前所属组的权限，用数值表示为`4+2+1=7`。
(4) 第`8-10`个字符`r-x`表示其他用户权限，用数值表示为`4+1=5`。
此文件的权限用数值表示为`775`。
4. 使用数字分配权限
`chmod 765 filename`
参数：`-R` 递归修改文件访问权限。
`chmod`是`change`和`mode`的缩写。
只要你是此文件的所有者，就可以用`chmod`来修改文件的访问权限。
```shell
root@ecs-x-large-2-linux-20200315202744:/home/nmw# touch 1.txt
root@ecs-x-large-2-linux-20200315202744:/home/nmw# ls -l
total 0
-rw-r--r-- 1 root root 0 Aug  1 20:06 1.txt
root@ecs-x-large-2-linux-20200315202744:/home/nmw# chmod 600 1.txt
root@ecs-x-large-2-linux-20200315202744:/home/nmw# ls -l
total 0
-rw------- 1 root root 0 Aug  1 20:06 1.txt
```
5. 使用字母分配权限
范围：`u`用户、`g`群组、`o`其他、`a`所有
分配：`+`添加权限、`-`移除权限、`=`分配权限。
`chmod u+rx file`：所属用户添加读和运行的权限。
`chmod g+r file`：群组其他用户增加读的权限。
`chmod o-r file`：其他用户移除读的权限。
`chmod g+r o-r file`：群组其他用户增加读的权限，其他用户移除读的权限。
`chmod go-r file`：群组其他用户和其他用户移除读的权限。
`chmod a+x file`：所属用户增加运行的权限。
`chmod u=rwx,g=r,o=- file`：所属用户分配读写和执行权限，群组其他用户分配读的权限，其他用户分配无权限。
**注意：**使用字母分配权限不需要一次设置三组。
# 3. Linux中的文本编辑和软件安装
## 3.1 Nano文本编辑器
1. `Linux`终端文本编辑器
`Nano`、`Vim`、`Emacs`等
2. `nano`介绍
`nano`：毫微、十亿分之一。
功能强大，适合入门。
`Ubuntu`和`macOS`系统都默认安装了`Nano`和`Vim`。
注释：`pico`的含义是万亿分之一。
3. `nano`组合快捷键
`Ctrl + G`显示帮助文档、`Ctrl + O`保存文件、`Ctrl + R`打开其他文件
 `Ctrl + Y`上一个屏幕、`Ctrl + V`下一个屏幕、`Ctrl + K`剪切当前一行
`Ctrl + U`粘贴剪切的内容、`Ctrl + X`退出、`Ctrl + W`查找
`Ctrl + \`替换、`Ctrl + F`向前移动一格光标、`Ctrl + B`向后移动一格光标
`Ctrl + P`向上移动一行、`Ctrl + N`向下移动一行
4. `nano`的参数
`nano 文件`：如果有文件且有写的权限，则打开。如果没有文件，则创建文件。
(1) `-m` 
激活鼠标控制光标位置。
(2) `-i`
激活自动缩进的功能。
(3) `-A`
激活智能`Home`键的功能。
```shell
nano -miA file_nano
```
5. 单个用户配置`.nanorc`
每个`Linux`用户都可以在自己的**家目录**创建`.nanorc`文件。
每次`nano`启动前，都会读取此配置文件。
语法：通过`set`和`unset`进行配置。
例如：`set mouse`激活鼠标，`set autoindent`激活自动缩进，`set smarthome`激活只能`Home`键。
```shell
root@ecs-x-large-2-linux-20200315202744:/home/nmw# nano .nanorc
root@ecs-x-large-2-linux-20200315202744:/home/nmw# cat .nanorc
set mouse
set autoindent
set smarthome
```
**注释：**`vim`的配置文件是`.vimrc`，`bash shell`的配置文件是`.bashrc`。可以通过`nano ~/.nanorc`进行单用户`nano`配置。
6. 配置全局`nanorc`
全局`nano`配置文件只能被`root`用户修改。
位置：`/etc/nanorc`。
命令：`sudo nano /etc/nanorc`
优先级：家目录下的`.nanorc`配置优先级更高。
**总结：**单用户配置文件在`~/`，全局配置文件在`/etc/`。单用户配置文件起始为点`.`，全局配置文件没有。
7. `bash`配置
`shell`是用户和操作系统之间的命令解释器。`Ubuntu`和大部分常见的`Linux`发行版默认的`shell`程序就是`bash`。
单个用户配置文件：`nano ~/.bashrc`
全局配置文件：`nano /etc/bash.bashrc`
优先级：家目录下`.bashrc`配置优先级更高。
配置别名: 配置文件中添加`alias 别名='命令'`
8. `profile`配置
单个用户配置文件：`nano ~/.profile`
全局配置文件：`nano /etc/profile`
`.bashrc`与`.profile`对比如下：
(1) 登录的`shell`：用户名/密码 → 使用`.profile`配置的`shell`→调用`.bashrc`
(2) 不登录的`shell`：使用`.bashrc`配置的`shell`
9. 使配置文件立即生效
修改`.bashrc`和`.profile`文件后，默认在用户下次登录系统时才生效。
可使用`source`命令使改动立即生效：
`source .bashrc`
## 3.2 Ubuntu中的软件安装
1. 本章节软件安装相关知识点是基于`Debian`的`Linux`发行版。不是`Debian`一族的`Linux`发行版软件安装方式稍有不同，例如：`Fedora`、`Redhat`、`CentOS`。
2. 软件包
包的后缀：`.deb`
软件仓库：`repository` 全球有很多软件仓库。
软件仓库列表文件：`nano /etc/apt/sources.list`
3. 软件仓库列表信息
`deb http://archive.ubuntu.com/ubuntu/ bionic universe`
`deb`：`Debian`
`http://archive.ubuntu.com/ubuntu/`：仓库地址
`bionic`：`Ubuntu 18.04`代号
`universe`：软件仓库的区域
如果要切换到其他软件仓库，只需要修改仓库地址。
4. 包管理工具
`apt-get`：常用。
`aptitude`：卸载软件时可以卸载不同的依赖。默认没有安装。
5. 常用命令介绍
以下命令都需要`root`权限，非`root`用户需要加`sudo`。
更新可安装的软件列表：`apt-get update`
升级所有已安装软件：`apt-get upgrade`
在软件列表里搜索可用软件：`apt-cache search`
安装软件：`apt-get install XXX`
卸载软件：`apt-get autoremove XXX`
6. `dpkg`命令
`dpkg`是`apt-get`和`aptitude`两个命令的基础命令。
`dpkg`可以安装本地的`.deb`软件包。
安装：`dpkg -i XXX.deb`
卸载：`dpkg -r XXX`
## 3.3 RTFM阅读那该死的手册
1. `Read The Fucking Manual`
可执行程序或`shell`命令
系统调用(`Linux`内核提供的函数)
库调用(程序库中的函数)
特殊文件(通常在`/dev`下)
文件格式和惯例(例如`/etc/passwd`)
游戏
杂项(包括宏包和惯例，比例`man(7)`，`groff(7)`)
系统管理命令(通常只能被`root`用户使用)
内核子程序
2. `man`命令
查看相关命令或函数：`man 数字 命令/函数` 
如果不加数字，`man`默认从数字较小的手册中寻找相关命令和函数。
`↑`和`↓`实现上一行和下一行跳转，空格键实现下一页跳转，`/`斜杠实现搜索，`q`退出。
```shell
root@ecs-x-large-2-linux-20200315202744:~# man ls
NAME
       ls - list directory contents
SYNOPSIS
       ls [OPTION]... [FILE]...
DESCRIPTION
       -a, --all
              do not ignore entries starting with .
       -A, --almost-all
              do not list implied . and ..
       ...
```
**注释：**`NAME `名字，`SYNOPSIS`摘要，`DESCRIPTION `描述，`AUTHOR`作者，`REPORTING BUGS`报告故障，`COPYRIGHT`版权，`SEE ALSO`另见。
3. `SYNOPSIS`区域介绍
**示例1**
```shell
root@ecs-x-large-2-linux-20200315202744:~# man mkdir
SYNOPSIS
       mkdir [OPTION]... DIRECTORY...
```
(1) 字段介绍
`[OPTION]`：可选，添加参数，例如：`-m`、`-p`、`-v`等。
`DIRECTORY`：必选，目录。
`...`：表示可以指定多个参数和多个目录
(2) 字体介绍
粗体：表示要原封不动的输入。例如：`mkdir`
下划线：表示要用实际内容替换。例如：`[OPTION]`和`DIRECTORY`
**示例2**
```shell
root@ecs-x-large-2-linux-20200315202744:~# man cp
SYNOPSIS
       cp [OPTION]... [-T] SOURCE DEST
       cp [OPTION]... SOURCE... DIRECTORY
       cp [OPTION]... -t DIRECTORY SOURCE...
```
(1) 拷贝一个源文件到目标文件
`cp [OPTION]... [-T] SOURCE DEST`
例如：`cp file.txt file_copy.txt`
(2) 拷贝一个或多个源文件到目录
`cp [OPTION]... SOURCE... DIRECTORY`
例如：`cp file.txt file_copy.txt photo/`
(3) 拷贝一个或多个源文件到目录
`cp [OPTION]... -t DIRECTORY SOURCE...`
不常用。与`(2)`效果相同，但是把目录名放在了前面。`-t`必须加。
**示例3**
```shell
root@ecs-x-large-2-linux-20200315202744:~# man apt-get
SYNOPSIS
       apt-get [-asqdyfmubV] [-o=config_string] [-c=config_file]
               [-t=target_release] [-a=architecture] {update | upgrade |
               dselect-upgrade | dist-upgrade |
               install pkg [{=pkg_version_number | /target_release}]...  |
               remove pkg...  | purge pkg...  |
               source pkg [{=pkg_version_number | /target_release}]...  |
               build-dep pkg [{=pkg_version_number | /target_release}]...  |
               download pkg [{=pkg_version_number | /target_release}]...  |
               check | clean | autoclean | autoremove | {-v | --version} |
               {-h | --help}}
```
该命令区域只有一行，只是显示在了多行。
(1) `[-asqdyfmubV]`
可以使用`-a`、`-s`、`-q`、`-d`等参数中的一个或多个。
(2) `[-o=config_string] [-c=config_file] [-t=target_release] [-a=architecture]`
这几个参数如果使用，必须加上参数值。
(3)  `{update | upgrade | ... | {-v | --version} | {-h | --help}}`
必须且只能使用`|`(或)隔开的某一项。
例如：`apt-get install XXX`、`apt-get update`、`apt-get autoclean`
错误用法：`apt-get update install XXX`
4. 查找命令
语法：`apropos 关键字`
在手册中查找所有含有此关键字的相关命令。
```shell
root@ecs-x-large-2-linux-20200315202744:~# apropos sound
default.pa (5)       - PulseAudio Sound Server Startup Script
pacat (1)            - Play back or record raw or encoded audio streams on a PulseA...
pacmd (1)            - Reconfigure a PulseAudio sound server during runtime
pactl (1)            - Control a running PulseAudio sound server
pamon (1)            - Play back or record raw or encoded audio streams on a PulseA...
paplay (1)           - Play back or record raw or encoded audio streams on a PulseA...
parec (1)            - Play back or record raw or encoded audio streams on a PulseA...
parecord (1)         - Play back or record raw or encoded audio streams on a PulseA...
pavucontrol (1)      - A volume control for the PulseAudio sound server
pulseaudio (1)       - The PulseAudio Sound System
start-pulseaudio-x11 (1) - PulseAudio Sound Server X11 Startup Script
```
5. `-h`和`--help`参数
显示命令的帮助文档。
```shell
root@ecs-x-large-2-linux-20200315202744:~# apt-get -h
apt 1.6.12 (amd64)
Usage: apt-get [options] command
       apt-get [options] install|remove pkg1 [pkg2 ...]
       apt-get [options] source pkg1 [pkg2 ...]
...
Most used commands:
  update - Retrieve new lists of packages
  upgrade - Perform an upgrade
  install - Install new packages (pkg is libc6 not libc6.deb)
...
```
注释：`-h`没有`man`命令详细，但比`man`命令可读性更强。
6. `whatis`命令
`whatis`命令是`man`命令的精简版。只会显示`man`命令显示手册的开头部分。
```shell
root@ecs-x-large-2-linux-20200315202744:~# whatis ls
ls (1)               - list directory contents
```
7. `locate`命令
搜索包含关键字的所有文件和目录。
语法：`locate 文件/目录`
特点：从文件数据库中查找，速度快。对于刚创建的文件，还没有被收录到文件数据库，因此`locate`目录就查不到。模糊查询。
文件数据库更新：`Linux`系统一般每天会更新一次文件数据库。我们可以使用`updatedb`命令强制系统立即更新文件数据库。
```shell
root@ecs-x-large-2-linux-20200315202744:~# locate nmw
/home/nmw
/home/nmw/.bash_logout
/home/nmw/.bashrc
root@ecs-x-large-2-linux-20200315202744:~# touch new_file
root@ecs-x-large-2-linux-20200315202744:~# locate new_file
root@ecs-x-large-2-linux-20200315202744:~# updatedb
root@ecs-x-large-2-linux-20200315202744:~# locate new_file
/root/new_file
root@ecs-x-large-2-linux-20200315202744:~# 
```
8. `find`命令
搜索包含关键字的所有文件和目录。
语法：`find [path] what [do]`
含义: `path`指定在哪个目录内查找，默认从当前目录开始查找。`what`要查找的文件名、大小、最近访问时间等。`do`对查找到的文件做后续操作。
`what`参数：`-name`文件名，`-size`文件大小，`-atime`最近访问时间，`-type`文件类型
特点：与`locate`命令不同，`find`命令不会在文件数据库中查找文件记录，而是实际遍历你的硬盘。因此可以查找到刚创建的文件。精准查询，可以使用`*`通配符实现模糊查询。
9. `find`命令参数
(1) `-name`根据文件名查找
```shell
root@ecs-x-large-2-linux-20200315202744:~# find -name new_file
./new_file
root@ecs-x-large-2-linux-20200315202744:~# find -name syslog
root@ecs-x-large-2-linux-20200315202744:~# find /var/log -name syslog
/var/log/syslog
/var/log/installer/syslog
root@ecs-x-large-2-linux-20200315202744:~# find /var/log -name syslog*  
/var/log/syslog.1
/var/log/syslog.2.gz
/var/log/syslog
/var/log/syslog.4.gz
/var/log/syslog.3.gz
/var/log/installer/syslog
```
(2) `-size`根据文件大小查找
```shell
root@ecs-x-large-2-linux-20200315202744:~# find /var -size +50M
/var/cache/apt/srcpkgcache.bin
/var/cache/apt/pkgcache.bin
root@ecs-x-large-2-linux-20200315202744:~# find -size 2k
./.ICEauthority
./.config/xfce4/xfconf/xfce-perchannel-xml/xfce4-desktop.xml
root@ecs-x-large-2-linux-20200315202744:~# find -size 10k
./.config/xfce4/xfconf/xfce-perchannel-xml/xfce4-keyboard-shortcuts.xml
```
(3) `-atime`根据文件最近访问时间查找
```shell
root@ecs-x-large-2-linux-20200315202744:~# find / -name *.log -atime -7
/root/.vnc/ecs-x-large-2-linux-20200315202744:1.log
/usr/local/hostguard/log/daemon.log
/usr/local/hostguard/log/hostguard.log
...
```
**注释：**`-atime -7`表示最近`7`天访问过。
(4) `-type`根据类型查找
`-type d`只查找目录，`-type f`只查找文件。
```shell
root@ecs-x-large-2-linux-20200315202744:~# find -name file1
./file1
root@ecs-x-large-2-linux-20200315202744:~# find -name file1 -type d
root@ecs-x-large-2-linux-20200315202744:~# find -name file1 -type f
./file1
```
10.`find`命令操作查找结果
(1) `-printf`格式化打印
`%p`文件名，`%u`文件所有者、`\n`换行。
(2) `-delete`删除
(3) `-exec` 无提示操作
`{}` 用于与`-exec`选项结合使用来匹配所有文件，然后会被替换为相应的文件名。
(4) `-ok` 提示操作
与`-exec`参数作用相同，但会对每一个文件操作做确认提示。
```shell
root@ecs-x-large-2-linux-20200315202744:~# find -name file1
./file1
root@ecs-x-large-2-linux-20200315202744:~# find -name file1 -print
./file1
root@ecs-x-large-2-linux-20200315202744:~# find -name file1 -printf "%p - %u\n"
./file1 - root
root@ecs-x-large-2-linux-20200315202744:~# find -name file1 -exec chmod 600 {} \;
root@ecs-x-large-2-linux-20200315202744:~# ls -l file1
-rw------- 1 root root 0 Aug  4 21:04 file1
root@ecs-x-large-2-linux-20200315202744:~# find -name file1 -ok chmod 600 {} \;
< chmod ... ./file1 > ? y
root@ecs-x-large-2-linux-20200315202744:~# find -name file1 -ok chmod 600 {} \;
< chmod ... ./file1 > ? y
root@ecs-x-large-2-linux-20200315202744:~# find -name file1 -delete
root@ecs-x-large-2-linux-20200315202744:~# find -name file1
```
**注释：**`find -name file1`等价于`find -name file1 -print`
**资料：**[find命令](https://man.linuxde.net/find)
