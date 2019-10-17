## 1. Linux命令
### 1.1 常用命令
1. 显示文件或目录
`ls（选项）（参数）` 
`-l` 表示`long`，长格式列出
`-a` 表示`all`，包括隐藏文件
2. 创建目录
`mkdir 目录`  
3. 打印文件内容 
`cat 文件` 
4. 拷贝文件
`cp 原文件 新文件`
5. 移动或重命名
`mv  原文件 新文件` 
6. 删除文件
` rm 文件` 
注释：`rm -rf 目录` 强制递归删除目录。
7. 查看当前路径
`pwd`
8. 删除空目录
`rmdir 目录`      
9. 查找文件/目录
`find 文件/目录` 
10. 创建空文件
`touch 文件`    
### 1.2 打包压缩
1. 语法
`tar (选项) (参数)`
选项：`-c`   归档文件，` -x`  解压，`-z`  `gzip`压缩文件，`-j`   `bzip2`压缩文件，`-v`  显示压缩或解压缩过程 `v(view)`，`-f`   使用档案名字(这个参数是最后一个参数，后面只能接档案名)
2. 用法
(1) 压缩
`tar -cvf /home/abc.tar /home/abc`             只打包，不压缩
`tar -zcvf /home/abc.tar.gz /home/abc`       打包，并用`gzip`压缩
`tar -jcvf /home/abc.tar.bz2 /home/abc`      打包，并用`bzip2`压缩
(2) 解压
替换上面的命令`tar -cvf  / tar -zcvf  / tar -jcvf` 中的`c`换成`x`。
### 1.3 vim使用
1. `vim`有三种模式：命令模式、插入模式、编辑模式。
 使用`ESC`或`i`或`:`来切换模式。
2. 命令模式下
(1) **`vi 文件名` 编辑或创建文件**
(2) `dd` 删除当前行
(3) `ndd` 删除`n`行
(4) `yy` 复制当前行
(5) `nyy` 复制`n`行
(6) `p` 粘贴
(7) `:q`   退出
(8) `:q!` 强制退出
(9) `:wq` 保存并退出
### 1.4 用户及用户组
1. 创建用户
`adduser 用户名`
2. 将用户添加到指定用户组
`gpasswd -a nmwei sudo`
### 1.5 文件权限
1. 三种基本权限
（1）`r` 读  数值表示为4
（2）`w` 写 数值表示为2
（3）`x` 可执行 数值表示为1
2. 权限查看
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/workspace$ ls -l
total 12
drwxrwxr-x 3 nmwei nmwei 4096 Jul 21 12:00 imoocmall
drwxrwxr-x 2 nmwei nmwei 4096 Jul 21 21:04 website
drwxrwxr-x 2 nmwei nmwei 4096 Jul 22 09:56 weixinapp
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/workspace$ 
```
3. 权限分析 
`drwxrwxr-x`一共十个字符，分成四段。
(1) 第`1`个字符`d`表示目录，`-`表示普通文件，`l`表示链接。
(2) 第`2-4`个字符`rwx`表示当前所属用户的权限，用数值表示为`4+2+1=6`。
(3) 第`5-7`个字符`rwx`表示当前所属组的权限，用数值表示为`4+2+1=6`。
(4) 第`8-10`个字符`r-x`表示其他用户权限，用数值表示为`4+1=5`。
(5) 操作此文件的权限用数值表示为`775`。
4. 权限更改
`sudo chmod 765 filename`
### 1.6 系统、软硬件及开发工具
1. 以系统管理员(`root`)权限执行命令
`sudo + 命令`
2. 查看某端口对应进程`PID`
`lsof -i:3000` 
3. 结束`PID`对应的某进程 
`kill -9 PID`
4. 重启`ssh`
`sudo service ssh restart`
5. 启动、重新启动或关闭`mongodb`
`service mongod start/restart/stop`
6. 更新软件包列表
`apt-get update`
7. 更新已安装的软件包
`apt-get upgrade`
注释：执行`apt-get upgrade`命令之前应该先执行`apt-get update`。
8. 安装`nginx`
`apt-get install nginx`
9. 查看数据盘
`fdisk -l`
10. 查看磁盘使用情况
`df -h`
## 2. 项目部署 
![部署之路](https://upload-images.jianshu.io/upload_images/4989175-e41d370e001f6afc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 2.1 选购域名服务器及备案
1. 域名提供厂商
爱名网、`GoDaddy`、**阿里云**
注释：[阿里云域名注册](https://wanwang.aliyun.com/domain)
2. 服务器提供厂商
(1) 国外：亚马逊`AWS`、`Linode`、`DigitOcean`/`HeroKu`
(2) 国内：**阿里云`ECS`**、青云/`UCloud`/百度云
3. 阿里云服务器
(1) [服务器ECS选购](https://www.aliyun.com/product/ecs)
① 操作系统选择：`Ubuntu 14.04 64位`
② 自定义密码(`root`)：`Aa*********`
③ 安全组：类似防火墙功能，用于设置网络访问控制。
注释：阿里云 - 云服务器ECS - 立即购买 - 一键购买 - 推荐配置 - 入门型 - [立即购买](https://promotion.aliyun.com/ntms/act/qwbk.html#floor1)
(2) [云服务器ECS查看](https://ecs.console.aliyun.com/#/home)
注释：使用阿里云遇到问题时，可以通过提交工单进行提问。
4. 域名备案
导航栏 - 备案 - 备案服务号申请/备案服务号管理
注释：[阿里云ECS服务器可备案几个网站](https://help.aliyun.com/knowledge_detail/36893.html)
### 2.2 远程登录服务器
#### 2.2.1 root超级管理员权限登录
1. 第一次`root`登录
命令行输入：`ssh root@47.96.***.***`
密码：`Aa*********`
注释：①`SSH`是每一台`Linux`电脑的标准配置([`SSH`原理与运用](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html))。 ② 退出`ssh`登录命令为`control + d` 。
注意：① `root`是超级管理员用户，使用`root`权限操作服务器有一定的安全隐患。② 增强安全配置后的登录方式`ssh -p 39999 nmwei@47.96.***.***`。
2. 查看硬盘信息
`sudo fdisk -l`
```
Disk /dev/vda: 42.9 GB, 42949672960 bytes
255 heads, 63 sectors/track, 5221 cylinders, total 83886080 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x00040f1a

   Device Boot      Start         End      Blocks   Id  System
/dev/vda1   *        2048    83884031    41940992   83  Linux
```
3. 查看硬盘使用信息
`df -h`
```
Filesystem      Size  Used Avail Use% Mounted on
udev            484M  4.0K  484M   1% /dev
tmpfs           100M  360K   99M   1% /run
/dev/vda1        40G  3.1G   35G   9% /
none            4.0K     0  4.0K   0% /sys/fs/cgroup
none            5.0M     0  5.0M   0% /run/lock
none            497M     0  497M   0% /run/shm
none            100M     0  100M   0% /run/user
```
#### 2.2.2 创建用户及配置权限
1. 创建新用户
添加新用户: `adduser nmwei`
输入密码: `Nmw*********`
2. 给新用户添加权限
(1) 将`nmwei`用户添加到`sudo`分组
`gpasswd -a nmwei sudo`
(2) 设置权限
① 打开配置文件
`sudo visudo`
② 修改配置文件
`# User privilege specification`
`root    ALL=(ALL:ALL) ALL`
`nmwei  ALL=(ALL:ALL) ALL` 
**注意：配置文件中新添加内容(`nmwei  ALL=(ALL:ALL) ALL `)表示`nmwei`用户可以以`sudo + 命令`的方式调用`root`权限执行所有命令。**
③ 保存配置文件
退出：`control + X`
保存：`shift + Y`
确认：`return(回车)`
(3) 重启`ssh`
`sudo service ssh restart`
4. 使用新用户登录
登录：` ssh nmwei@47.96.***.***`
密码：`Nmw*********`
注释：① 登录成功之后，默认所在路径为`/home/nmwei`。② `~`对应路径即为`/home/nmwei`。
#### 2.2.3 本地无密码SSH登录
1.  `SSH`无密码登录介绍
(1) 操作过程：本地生成私钥和公钥，公钥添加到服务器
(2) 登录原理：本地私钥 → 本地添加到服务器的公钥 → 秘钥算法比对 → 登录成功
注意：如果本地之前已经生成过秘钥，则不用重新生成。否则会覆盖当前秘钥，导致无法连接之前比对成功的远程服务器`git`仓库。
2.  本地生成秘钥 
(1) 查看是否已有秘钥
```
➜  ~ pwd   #查看根路径
/Users/nimengwei
➜  ~ ls -a   #查看根目录下所有文件(夹)
➜  ~ cd .ssh   #进入.ssh文件夹 
➜  .ssh ls   #查看.ssh文件夹下所有文件(夹)
id_rsa      id_rsa.pub  known_hosts
``` 
注释：①`.ssh`目录位置为`/Users/nimengwei/.ssh`。 ②当前已经有`.ssh`目录以及`id_rsa`(私钥)、 `id_rsa.pub`(公钥)文件，则表示本地已经生成过秘钥。
(2) 生成秘钥
如果本地没有生成过秘钥，则需要生成秘钥。
```
➜  ~ ssh-keygen -t rsa -b 4096 -C "254060001@qq.com"  #连续回车(不需要输入密码)，则创建成功
```
(3) 查看秘钥内容
查看私钥内容：`cat id_rsa`
查看公钥内容：`cat id_rsa.pub`
(4) 加入代理
运行`ssh-agent`代理：`eval "$(ssh-agent -s)”`
加入代理：`ssh-add ~/.ssh/id_rsa`
3. 服务器生成秘钥
登录服务器：`ssh nmwei@47.96.***.***` 
查看有没有`.ssh`文件：`ls -a `
生成秘钥：`ssh-keygen -t rsa -b 4096 -C "254060001@qq.com"` 
运行`ssh-agent`代理：`eval "$(ssh-agent -s)"` 
加入代理：`ssh-add ~/.ssh/id_rsa `
4. 添加本地公钥到服务器认证
(1) 复制本地公钥
```
➜  ~ cd .ssh
➜  .ssh ls  
id_rsa      id_rsa.pub  known_hosts
➜  .ssh cat id_rsa.pub 
ssh-rsa AAAAB3NzaC1yc2EAAAADAQ... 254060001@qq.com
➜  .ssh 
```
(2) 添加本地公钥
① 创建/打开`authorized_keys`文件
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/.ssh$ vi authorized_keys
```
② 切换到编辑模式
```
ESC
```
③ 粘贴本地公钥
```
ssh-rsa AAAAB3NzaC1yc2EAAAAD... 254060001@qq.com
```
④ 保存并退出
```
shift + :
wq!
```
(3) 授权并重启服务器
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/.ssh$ chmod 600 authorized_keys
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/.ssh$ sudo service ssh restart
```
5. `ssh`无密码登录
```
➜  ~ ssh nmwei@47.96.***.***
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ 
```
6. `ssh`认证的其它使用场景 
`Github`、`Bitbucket`以及`Gitee`等代码托管平台设置本地`SSH`公钥(`id_rsa.pub`)，就可以使用`SSH`认证进行克隆上传代码，否则只能使用`Https`访问。
例如`Github`：`Settings - SSH and GPG keys - New SSH key`
### 2.3 增强服务器安全等级
#### 2.3.1 修改服务器默认登录端口
1. `Liunx`服务器默认登录端口为`22`，使用默认登录端口有一定的安全隐患。可将服务器默认端口修改为其他端口。
2.  打开配置文件
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ sudo vi /etc/ssh/sshd_config
```
3. 编辑配置文件
```
# What ports, IPs and protocols we listen for
# Port 22  #禁用默认端口22
Port 39999  #添加一个39999登录端口
.....
AllowUsers root nmwei #服务器只允许root和nmwei用户登录
```
注意：① 修改`sshd_config`配置文件之前，应新开一个终端并登录到服务器，避免配置文件修改失败之后无法登录。② `1-1024`之间的端口被系统占用，不要使用。最大端口号可设置为`65536`。③ 可以设置多个登录端口，即设置多行 `Port ****` 。
4. 重启`ssh`
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ sudo service ssh restart
```
5. 配置阿里云`ECS`安全组规则 
![ECS安全组配置](https://upload-images.jianshu.io/upload_images/4989175-3632dba259bd932c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
6. 验证`ssh`登录接口
```
➜  ~ ssh nmwei@47.96.***.***            
ssh: connect to host 47.96.***.*** port 22: Connection refused
➜  ~ ssh -p 39999 nmwei@47.96.***.***
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ 
```
注释：①`22`默认端口无法登录，只能通过`39999`登录端口。 ②此时服务器有`ssh -p 39999 root@47.96.***.***`和`ssh -p 39999 nmwei@47.96.***.***`两种登录方式。
#### 2.3.2 关闭服务器root登录权限
1. 阿里云服务超级管理员用户名都为`root`，有一定的安全隐患。可将`root`超级管理员登录权限关闭。
2.  打开配置文件
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ sudo vi /etc/ssh/sshd_config
```
3. 编辑配置文件
```
PermitRootLogin no #不允许root登录
PasswordAuthentication yes #允许使用密码登录
AllowUsers nmwei #只允许nmwei用户登录
```
4. 重启`ssh`
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ sudo service ssh restart
```
5. 验证`root`登录
```vim
➜  ~ ssh -p 39999 root@47.96.***.***
root@47.96.***.***'s password: 
Permission denied, please try again.
➜  ~ ssh -p 39999 nmwei@47.96.***.***
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ 
```
注释：①`root`超级管理员无法登录，只有`nmwei`用户可以登录。②当前服务器只有`ssh -p 39999 nmwei@47.96.***.***`一种登录方式。
### 2.3.3 配置 iptables 和 Fail2Ban 
### 2.4 搭建 Nodejs 生产环境
#### 2.4.1 搭建Node环境
1. 更新软件包列表
` sudo apt-get update`
2. 安装`linux`软件包文件
`sudo apt-get install vim openssl build-essential libssl-dev wget curl git`
3. 安装`Nodejs`
① 安装`nvm`
`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`
注释：`nvm`被安装到了`~/.nvm`目录。
② 使用`nvm`安装`Nodejs`
`nvm install v8.11.3`
③ 使用该`Nodejs`版本
`nvm use v8.11.3`
④ 将该`Nodejs`版本设置为默认版本
`nvm alias default v8.11.3`
注释：使用`nvm`安装的`node`目录为`~/.nvm/versions/node`。例如，`v8.11.3`版本`node`安装目录为`~/.nvm/versions/node/v8.11.3/bin`，全局安装的`node_modules`目录为`~/.nvm/versions/node/v8.11.3/lib`。
参考：[nvm](https://github.com/creationix/nvm)
4. 安装`npm`(指定国内镜像源)
`npm --registry=https://registry.npm.taobao.org install -g npm`
注释：① 临时使用淘宝镜像源安装`npm --registry https://registry.npm.taobao.org install express`。② 持久使用淘宝镜像源`npm config set registry https://registry.npm.taobao.org`。
5. 安装`cnpm`
`npm install -g cnpm`
6. 修改系统文件监督数目
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
7. 安装`npm`包文件
`npm i pm2 webpack gulp grunt-cli -g`
#### 2.4.2 PM2使用介绍
1. 开启一个服务
`pm2 start app.js`
2. 关闭一个服务
`pm2 stop app.js`
3. 删除一个服务
`pm2 delete app.js`
4. 查看服务列表
`pm2 list`
5. 展示一个服务信息
`pm2 show app`
注释：可以查看到服务对应的文件地址(`script path`)以及日志地址(`log path`)。
6. 展示所有服务日志
`pm2 logs`
7. 清除所有日志
`pm2 flush`
### 2.5 配置 Nginx 实现反向代理
1. 安装`Nginx`
(1) 更新包列表
`sudo apt-get update`
(2) 安装`nginx`
`sudo apt-get install nginx`
(3) 查看`nginx`版本
`nginx -v`
2. `nginx`配置代理转发
(1) 创建/打开`nginx`代理配置文件
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:/$ cd /etc/nginx/conf.d
nmwei@iZbp1ai95owp4twsjdkbv1Z:/etc/nginx/conf.d$ sudo vi  www-nimengwei-com-3000.conf
```
注释：`nginx`安装目录为`/etc/nginx`。② `nginx`配置文件目录为`/etc/nginx/conf.d`。
(2) 编辑`nginx`代理配置文件
```
upstream website {
  server 127.0.0.1:3000;
}

server {
 listen 80;
 server_name 47.96.***.***;

 location / {
   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
   proxy_set_header Host $http_host;
   proxy_set_header X-Nginx-Proxy true;
   proxy_pass http://website;
   proxy_redirect off;
  }
}
```
注释：该`nginx`代理配置文件的含义为当用户访问`47.96.***.***`时，转发到本机的`http:127.0.0.1:3000`。
(3) `nginx`测试及重启
测试`nginx`配置文件是否正确：`sudo nginx -t`
`nginx`重启：`sudo nginx -s reload`
注释：`nginx`主页路径为`/usr/share/nginx/html`
3. 返回头隐藏`nginx`版本信息
(1) 通过`nginx`代理的服务会返回`nginx`版本信息
  响应头`Response Headers`中`Server`字段值为`nginx/1.4.6 (Ubuntu)`。
(2) 编辑`nginx`配置文件
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ cd /etc/nginx
nmwei@iZbp1ai95owp4twsjdkbv1Z:/etc/nginx$ ls
conf.d          mime.types           nginx.conf       sites-enabled
fastcgi_params  naxsi_core.rules     proxy_params     uwsgi_params
koi-utf         naxsi.rules          scgi_params      win-utf
koi-win         naxsi-ui.conf.1.4.1  sites-available
nmwei@iZbp1ai95owp4twsjdkbv1Z:/etc/nginx$ sudo vi nginx.conf
```
(3) 取消`server_tokens`字段注释
```
server_tokens off;
```
(4) `nginx`重启
`sudo nginx -s reload`
注释：此时响应头`Response Headers`中`Server`字段值为`nginx`。
### 2.6 管理域名解析
#### 2.6.1 域名DNS服务器
1. 域名解析需要一个`DNS`服务器
`DNS`服务器可以将域名匹配到对应的`IP`地址。
一个域名只能够对应一个`IP`地址，但一个`IP`地址可以对应多个域名。
2. 阿里云提供了云解析`DNS`服务
当前分域名配的DNS服务器是：`dns30.hichina.com`, `dns29.hichina.com`
3. 如何修改阿里云购买域名的`DNS`服务器
登录阿里云 - 控制台 - 域名 - 管理 -修改`DNS`
参考：`DNSPod`官网 - 常见问题 - 功能介绍及使用教程 - 各个注册商修改域名`DNS`地址的方法 -  [万网注册商域名修改DNS地址](https://support.dnspod.cn/Kb/showarticle/tsid/40/)
#### 2.6.2 域名解析
1. 主机记录

| 主机记录 | 含义 |
| ------ | -------- |
| `www` | 解析后的域名为 `www.nimengwei.com` |
| `@` | 直接解析主域名 `nimengwei.com` |
| `*` | 泛解析，匹配其他所有域名 `*.nimengwei.com` |
2. 记录类型

| 记录类型 | 使用场景 |
| ------ | -------- |
| **`A记录`** | 地址记录，用来指定域名的**`IPv4`地址**（如：`8.8.8.8`），如果需要将域名指向一个`IP`地址，就需要添加`A`记录。|
| **`CNAME`** | 如果需要将域名指向**另一个域名**，再由另一个域名提供`ip`地址，就需要添加`CNAME`记录。|
| **`TXT`** | 在这里可以填写任何东西，长度限制`255`。绝大多数的`TXT`记录是用来做`SPF`记录（反垃圾邮件）。|
| `NS` |域名服务器记录，如果需要把子域名交给其他`DNS`服务商解析，就需要添加`NS`记录。|
| `AAAA` | 用来指定主机名（或域名）对应的`IPv6`地址（例如：`ff06:0:0:0:0:0:0:c3`）记录 。|
| **`MX`** | 如果需要设置邮箱，让邮箱能收到邮件，就需要添加`MX`记录。|
| 显性`URL` | 从一个地址`301`重定向到另一个地址的时候，就需要添加显性`URL`记录（注：`DNSPod`目前只支持`301`重定向）。 |
| 隐性`URL` | 类似于显性`URL`，区别在于隐性`URL`不会改变地址栏中的域名。|
| `SRV` | 记录了哪台计算机提供了哪个服务。格式为：服务的名字、点、协议的类型，例如：`_xmpp-server._tcp`。|
3. 设置`DNS`解析实现域名访问七牛云资源

(1) 操作七牛云
进入七牛云 - 资源主页 - 对象存储 - 新建/选择存储空间 - 融合`CDN`加速域名 - 立即绑定一个域名 - 加速域名(`weixin.cloud.nimengwei.com`)
进入七牛云 - 资源主页 - 融合`CDN` -域名管理 - 复制`CNAME`记录值
(2) 操作阿里云 - 
登录阿里云 - 控制台 - 域名 - 解析 
添加记录 - 选择`CNAME` - 填写主机记录(`weixin.cloud`) - 粘贴记录值 - 添加
![DNS解析七牛云资源](https://upload-images.jianshu.io/upload_images/4989175-ffd7cb7dd77b9c8d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

(3) 测试
进入七牛云 -  资源主页 - 对象存储 - 选择存储空间 - 内容管理 - 选择一张图片 - 复制外链 - 打开外链 - 将`url`中七牛默认外链域名`pdrecbudd.bkt.clouddn.com`替换为`weixin.cloud.nimengwei.com` - 成功访问
### 2.7 服务器配置安装 MongoDB
#### 2.7.1 Ubuntu 14.04系统安装 MongoDB
1. 必应搜索`install mongodb on ubuntu`
[安装文档：Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
注释：社区版本(`Community`)是免费的，企业版本(`Enterprise`)是收费的。
2. 安装`MongoDB`

(1) `Import the public key used by the package management system.`
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
```
(2) `Create a list file for MongoDB.`
```
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
```
(3) `Reload local package database.`
```
sudo apt-get update
```
(4) `Install the MongoDB packages.`
```
sudo apt-get install -y mongodb-org
```
3. 操作`MongoDB`

(1) 启动`MongoDB`
`sudo service mongod start`
(2) 重新启动`MongoDB`
`sudo service mongod restart`
(3) 关闭`MongoDB`
`sudo service mongod stop`
(4) **修改`MongoDB`默认端口**
编辑文件配置文件：`sudo vi /etc/mongod.conf`  
```
net:
  port: 19999
```
(5) 连接`MongoDB`:
`mongo --port 19999`
#### 2.7.2 MongoDB单表及数据库的导入导出
1. 上传数据库
(1) **本地**数据库备份
`mongodump -h 127.0.0.1:27017 -d dumall(数据库名字) -o dumall-backup(生成备份文件夹名字)`
注释：授权启动的`MongoDB`导出数据库的命令为：`mongodump -h 127.0.0.1:27017 -d dumall(数据库名字) -u dumall_manager(数据库用户名) -p dumall*********(数据库用户密码) -o dumall-backup(生成备份文件夹名字)`。与未授权启动相比，新增用户名密码参数：`-u 数据库用户名 -p 数据库用户密码`。
(2)  上传数据库备份
方法一：命令行上传
① **本地**打包压缩`dumall-backup`文件夹
`tar zcvf dumall.tar.gz(要生成的压缩包名字)  dumall-backup(要打包的源文件夹)`
② **本地**上传压缩包
`scp -P 39999 ./dumall.tar.gz nmwei@47.96.***.***:/home/nmwei/dbbackup/dumall-backup(上传到服务器的目录)`
③ **服务器端**解压缩包
`tar xvf dumall.tar.gz `
方法二：客户端上传
使用`FileZillia`客户端将`dumall-backup`文件夹上传到服务器
(3) 在**服务器端**导入`dumall-backup`数据库
`mongorestore -h 127.0.0.1:19999 -d dumall(生成的数据库名称) ./dbbackup/dumall-backup/dumall/(数据库表文件夹)`
注释：向授权启动的`MongoDB`导入数据库，则新增用户名密码参数：`-u 数据库用户名 -p 数据库用户密码`。
2. 上传数据库表
(1) **本地**数据库表导出
方法一：`MongoHub`导出
方法二：本地命令行导出
`mongoexport -d(指定数据库) demo -c(指定表名称) user -q(过滤条件，可以省略) '{"name": {$ne: null}}' -o(导出文件名) ./user.json`
注释：授权启动的`MongoDB`导出数据库表，则新增用户名密码参数：`-u 数据库用户名 -p 数据库用户密码`。
(2) **本地**上传数据库表
方法一：命令行上传
`scp -P 39999 ./user.json(本地文件) nmwei@47.96.***.***:/home/nmwei/dbbackup/dumall-backup/(上传到服务器的目录)`
注释：从服务器下载文件命令为：`scp -P 39999 nmwei@47.96.***.***:/home/nmwei/dbbackup/dumall-backup/user.json(服务器文件)  ./(本地文件目录)` 
方法二：客户端上传
使用`FileZillia`客户端将`user.json`上传到服务器。
(3)  在**服务器端**导入`user.json`表
`mongoimport -h 127.0.0.1:19999 -d(指定数据库) demo -c(指定表名称) user ./dbbackup/dumall-backup/user.json`
注释：向授权启动的`MongoDB`导入数据表，新增用户名密码参数：`-u 数据库用户名 -p 数据库用户密码`。
#### 2.7.3 线上MongoDB配置读写权限
1. 创建用户
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ mongo --port 19999
> use admin
> db.createUser({user:'userAdmin', pwd:'userAdmin*********', roles:["userAdminAnyDatabase"]})
> db.createUser({user:"dbAdmin", pwd:"dbAdmin*********",roles:["readWriteAnyDatabase","dbAdminAnyDatabase","clusterAdmin"]})
> use dumall
> db.createUser({user:'dumall', pwd:'dumall*********', roles:[{role:'readWrite', db: 'dumall'}]})
> use admin
> db.system.users.find().count()
3
```
注释：① 创建`dumall`用户需要先使用`use dumall`命令进入`dumall`数据库。② `userAdmin`管理员(`["userAdminAnyDatabase"]`)，可在`admin`中创建用户。`dbAdmin`管理员(`["readWriteAnyDatabase","dbAdminAnyDatabase","clusterAdmin"]`)，拥有增删改查任意数据库、复制、集群操作的权限。

2. 认证登录
(1) 打开配置文件 
`sudo vi /etc/mongod.conf`
(2) 编辑配置文件　
`security:  #打开认证`
　`authorization: enabled`
注意：不但要添加`authorization: enabled`，还要取消`security`注释。
(3) 重启数据库
`sudo service mongod restart`
#### 2.7.4 数据库定时备份
1. 定时备份数据库到服务器
(1) 创建备份文件夹、任务文件夹以及备份任务文件
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ ls
workspace
//创建备份文件夹
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ mkdir backup
//创建任务文件夹
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ mkdir tasks
//创建db备份文件夹
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ cd ~/backup
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/backup$ mkdir db
//创建dumall数据库备份文件夹
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/backup$ cd db
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/backup/db$ mkdir dumall
//创建dumall数据库备份任务脚本
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/backup/db$ cd ~/tasks
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/tasks$ vi dumalldb.backup.sh
```
注释：目录结构为`~/backup/db/dumall`和`~/tasks/dumalldb.backup.sh`。
(2) 编辑`dumall`数据库备份任务脚本
```
#!/bin/sh
backUpFolder=/home/nmwei/backup/db/dumall
date_now=`date +%Y%m%d%H%M`
backFileName=dumall_$date_now
cd $backUpFolder
mkdir -p $backFileName
mongodump -h 127.0.0.1:19999 -d dumall -u dumall -p dumall********* -o $backFileName
tar zcvf $backFileName.tar.gz $backFileName
rm -rf $backFileName
```
(3) 执行`dumall`数据库备份任务脚本
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ sh ./tasks/dumalldb.backup.sh 
```
注释：生成`~/backup/db/dumall/dumall_201808232214.tar.gz`备份文件。
(4) 进入系统定时任务
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ crontab -e
```
(5) 编辑系统定时任务
```
# m h  dom mon dow   command
30 22 23 * * sh /home/nmwei/tasks/dumalldb.backup.sh
```
(6) 退出系统定时任务
`Control + x`
`Shift + y`
`Enter 回车`
注释：`m`表示分钟，`h`表示小时，`dom`表示日期，`mon`表示月份，`dow`表示星期，`command`表示命令。
2. 定时上传数据库备份到七牛云

(1) 创建上传七牛云`js`文件
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/tasks$ vi dumalldb.upload.js
```
(2) 编辑上传七牛云`js`文件
```
var qiniu = require('qiniu');
var parts = process.env.NODE_ENV.split('@');
var file = parts[1] + '.tar.gz';
var filePath = parts[0] + '/' + file;
//上传凭证
var accessKey = 'ihsp5CZpo_-nPnTefUS_dXeWLd7tEOSEmOba9IlD';
var secretKey = 'w-VB9Q2wjeaLnq5rQ4sHEjiuqXNxrlR88azhKFos';
//创建鉴定对象mac
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
//上传位置
var bucket = 'dbbackup'; //要上传的空间
var key = file; //要生成的文件名
var options = {
  scope: bucket + ':' + key
};
//生成uploadToken
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);
var config = new qiniu.conf.Config();
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
// 文件上传
formUploader.putFile(uploadToken, key, filePath, putExtra, function(respErr,
  respBody, respInfo) {
  if (respErr) {
    throw respErr;
  }
  if (respInfo.statusCode == 200) {
    console.log(respBody);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
});
```
参考：七牛云 - 开发者中心 -SDK -官方SDK - 对象存储 - `Node.js` (服务端) - [文件上传](https://developer.qiniu.com/kodo/sdk/1289/nodejs#5) 
(3) 打开`dumall`数据库备份任务脚本
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/tasks$ vi dumalldb.backup.sh
```
(4) 编辑`dumall`数据库备份任务脚本
结尾添加以下脚本：
```
NODE_ENV=$backUpFolder@$backFileName node /home/nmwei/tasks/dumalldb.upload.js
```
(5) `tasks`目录下安装`qiniu`模块
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/tasks$ npm install qiniu
```
注释：`npm install -g`安装的`npm`包可以在命令行使用，而不是可以在任意项目中使用。
(6) 执行`dumall`数据库备份任务脚本
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/tasks$ sh ./dumalldb.backup.sh 
```
问题：如果执行`sudo sh ./dumalldb.backup.sh`，则报错`node: not found`。
注意：为提高安全性，每一个数据库应单独创建数据库备份、上传脚本以及定时任务。
> 此时，执行`sh ~/tasks/dumalldb.backup.sh
`脚本，在`~/backup/db/dumall`目录下生成备份文件的同时，在七牛对象存储的`dbbackup`存储空间上传备份文件。
### 2.8 部署和发布上线 Nodejs 项目
#### 2.8.1 本地代码上传到服务器
1. 代码上传到服务器的两种方法
方法一：本地通过`FileZilla`工具直接上传文件到服务器
方法二： 本地 -  私有`Git`仓库 - 服务器
2. 本地通过`FileZilla`工具直接上传文件到服务器
(1) 使用`FileZilla`工具连接阿里云`ECS`
文件 - 站点管理器 - 新站点
(2) 配置站点
![FileZilla工具截图](https://upload-images.jianshu.io/upload_images/4989175-0920ad2015fadb7c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/680)
注释：端口不填，则表示默认`22`端口。密码为`Nmw*********`。
(3) 文件上传
3. 本地 -  私有`Git`仓库 - 服务器
(1) [码云](https://gitee.com/)配置本地公钥以及服务器公钥
```
➜  ~ cat .ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCp4QvDRnHi8EHcrftrv+I8BNXSuejAXkEWoJ6l/BCF7uuaCSEFBKVp6wfWAYEvQ/jCIIZFpXtRlnzpHVQmJTperdL83gs6OsSo......
```
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/.ssh$ cat id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC5mpJLl8XbH/5KorYLu3L0PPXwxVVpvxD1wKaGc6DmWT9yoK2xY5slnzZmaNeO2fxGzPiY6nhmoOn2uE4aQmdckEczbgDdQJdjuFWxBGtmxVYKL2a1Hl+zo93t59+h6/abGspFqANLVrde0vzvrtOtNgoSuhMMuhy6cpnVpUK8kdK/aM06++r5eF4RcRjDfnK3CdCH......
```
(2) 码云创建私有仓库并上传本地项目代码
注释：码云提供了免费的私有`git`仓库。
(3) 服务器克隆码云私有仓库代码
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/workspace$ git clone git@gitee.com:nmwei/imoocmall.git
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/workspace$ cd imoocmall
nmwei@iZbp1ai95owp4twsjdkbv1Z:~/workspace/imoocmall$ npm install
```
#### 2.8.2 配置PM2一键部署项目
1. `PM2`不仅可以守护服务器`Nodejs`服务，实现平滑重启。也可以实现代码的自动更新，以及从本地到线上的部署。
参考：[PM2官网](http://pm2.keymetrics.io/)
2. 本地项目中根目录创建`ecosystem.json`
```
{
  "apps" : [
    {
      "name" : "myweb",
      "script" : "app.js",
      "env": {
        "COMMON_VARIABLE": "true"
      },
      "env_production": {
        "NODE_ENV": "production"
      }
  }],
  "deploy" : {
    "production" : {
      "user" : "nmwei",
      "host" : ["47.96.***.***"],
      "port": "39999",
      "ref"  : "origin/master",
      "repo" : "git@gitee.com:nmwei/myweb.git",
      "path" : "/www/myweb/production",
      "ssh_options": "StrictHostKeyChecking=no",
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```
参考：[PM2官网/Documentation/Deployment/SimpleDeploy](http://pm2.keymetrics.io/docs/usage/deployment/#simple-deploy)
[通过Github与PM2部署Node应用](https://segmentfault.com/a/1190000005171229)
注释：因为`pm2`的部署是通过`ssh`进行的，因此需要开通本地到远程服务器的无密码登录。
3. 本地向`git`仓库中上传`ecosystem.json`文件
4. 服务器创建项目文件夹
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ cd /www
nmwei@iZbp1ai95owp4twsjdkbv1Z:/www$ mkdir myweb
nmwei@iZbp1ai95owp4twsjdkbv1Z:/www$ ls
myweb  ssl
```
注释：创建`myweb`文件夹即可，无需创建子文件夹`production`。
5. 本地部署项目
```
➜  myweb git:(master) ✗ pm2 deploy ecosystem.json production setup
```
注释：如果本地部署命令失败，则需要在服务器修改文件夹权限：`nmwei@iZbp1ai95owp4twsjdkbv1Z:/www$ sudo chmod 777 myweb`
原理：本地利用`PM2`工具通知服务器向指定`git`仓库拉取代码。
6. 部署项目目录介绍
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:/www/myweb/production$ ls
current  shared  source
nmwei@iZbp1ai95owp4twsjdkbv1Z:/www/myweb/production$ cd current
nmwei@iZbp1ai95owp4twsjdkbv1Z:/www/myweb/production/current$ ls
app.js  README.md
```
(1) `current`: 运行文件。
(2) `shared`: 日志文件等。
(3) `source`: 源文件。
7. 修改服务器`.bashrc`配置文件

(1) 编辑`.bashrc`文件
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ vi .bashrc
```
(2) 修改`.bashrc`文件，注释以下代码
```
# If not running interactively, don't do anything
#case $- in
#    *i*) ;;
#      *) return;;
#esac
```  
(3) 重新运行`.bashrc`文件
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ source .bashrc
```
8. 本地更新服务器代码并重启服务
```
➜  myweb git:(master) pm2 deploy ecosystem.json production 
```
注释：此时浏览器访问`47.96.***.***:3000`，则可以访问该服务。
9. 添加域名解析
(1) 进入阿里云域名解析页面 
登录阿里云 - 控制台 - 域名 - 解析
(2) 添加一条域名解析记录
![主页域名解析记录](https://upload-images.jianshu.io/upload_images/4989175-b5136a73c1d6c35f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
10. 配置`Nginx`代理
(1) 创建并编辑配置文件
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ cd /etc/nginx/conf.d
nmwei@iZbp1ai95owp4twsjdkbv1Z:/etc/nginx/conf.d$ sudo vi www-nimengwei-com-3000.conf
```
(2) 配置文件内容如下
```
upstream website {
  server 127.0.0.1:3000;
}

server {
 listen 80;
 server_name www.nimengwei.com 47.96.***.***;

 location / {
   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
   proxy_set_header Host $http_host;
   proxy_set_header X-Nginx-Proxy true;
   proxy_pass http://website;
   proxy_redirect off;
  }
}
```
注释：该`nginx`代理配置文件的含义为当用户访问`www.nimengwei.com`或`47.96.***.***`时，转发到本机的`http:127.0.0.1:3000`。
(3) `nginx`测试及重启
测试`nginx`配置文件是否正确：`sudo nginx -t`
`nginx`重启：`sudo nginx -s reload`
11. 配置阿里云`ECS`安全组规则
允许`3000`端口被访问。
12. 此时当用户通过`www.nimengwei.com`或`47.96.***.***`路径，即可访问`47.96.***.***:3000`线上项目。
13. 如果需要更新线上项目，则需要以下步骤：
(1) 本地修改项目代码
(2) 代码修改提交到码云`git`私有仓库
(3) 本地通知服务器更新`git`仓库代码
```
➜  myweb git:(master) pm2 deploy ecosystem.json production 
```
#### 2.8.3 PM2一键部署imoocmall项目
1. 配置阿里云`ECS`安全组规则
允许`3001`端口被访问。
2. 服务器创建项目文件夹
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ cd /www
nmwei@iZbp1ai95owp4twsjdkbv1Z:/www$ mkdir imoocmall
nmwei@iZbp1ai95owp4twsjdkbv1Z:/www$ ls
imoocmall  myweb  ssl
```
3. 本地项目根目录创建`ecosystem.json`并上传到`git`仓库
```
{
  "apps" : [
    {
      "name" : "imoocmall",
      "script" : "bin/www",
      "env": {
        "COMMON_VARIABLE": "true"
      },
      "env_production": {
        "NODE_ENV": "production"
      }
  }],
  "deploy" : {
    "production" : {
      "user" : "nmwei",
      "host" : ["47.96.237.151"],
      "port": "39999",
      "ref"  : "origin/master",
      "repo" : "git@gitee.com:nmwei/imoocmall.git",
      "path" : "/www/imoocmall/production",
      "ssh_options": "StrictHostKeyChecking=no",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.json --env production",
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```
注释：与`myweb`项目相比，添加了`post-deploy`部署后需要执行的命令。
注意：如果修改了`ecosystem.json`，不能只通过`pm2 deploy ecosystem.json production`命令更新，需要在服务器`PM2`上删除该项目(`pm2 delete imoocmallc`)后重新部署。
4. 本地部署上传项目

(1) 项目部署
```
imoocmall git:(master) pm2 deploy ecosystem.json production setup
```
(2) 项目更新
``` 
imoocmall git:(master) pm2 deploy ecosystem.json production
```
注释：此时浏览器访问`47.96.***.***:3001`，则可以访问该服务。
5. 服务器添加域名解析记录
![imooc二级域名解析记录](https://upload-images.jianshu.io/upload_images/4989175-d294bab4270cb0e8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
6. 服务器配置`nginx`代理
(1) 创建并编辑配置文件
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ cd /etc/nginx/conf.d
nmwei@iZbp1ai95owp4twsjdkbv1Z:/etc/nginx/conf.d$ sudo vi imooc-nimengwei-com-3001.conf 
```
(2) 配置文件内容如下
```
upstream imooc {
  server 127.0.0.1:3001;
}

server {
 listen 80;
 server_name imooc.nimengwei.com;
 location / {
   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
   proxy_set_header Host $http_host;
   proxy_set_header X-Nginx-Proxy true;
   proxy_pass http://imooc;
   proxy_redirect off;
 }
}
```
(3) `nginx`测试及重启
测试`nginx`配置文件是否正确：`sudo nginx -t`
`nginx`重启：`sudo nginx -s reload`
7. 分析与总结
(1) 分析
由于`imooc.nimengwei.com`二级域名的解析记录值为`47.96.***.***`，所以用户访问`imooc.nimengwei.com` 地址时，相当于访问`47.96.***.***`的`IP`地址。由于`47.96.***.***`对应的服务器配置了`nginx`代理，所以用户访问`imooc.nimengwei.com`时，代理转发到`3001`端口。
(2) 总结
此时当用户通过`imooc.nimengwei.com`路径，即可访问`47.96.***.***:3001`线上项目。
#### 2.8.4 前端资源部署
1. 如何将前端资源部署到后端项目，当访问后端`'/'`路由时，返回前端页面。
[方法一：利用 Express 托管静态文件](http://www.expressjs.com.cn/starter/static-files.html)
[方法二：利用Express路由返回静态文件](http://www.expressjs.com.cn/guide/using-middleware.html#middleware.router)
2. 利用 `Express` 托管静态文件
```
//app.js
app.use(express.static(path.join(__dirname, 'views')));
```
3. 利用`Express`路由返回静态文件
```
// app.js
var indexRouter = require('./routes/index');
...
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
...
`app.use('/', indexRouter);`
```
```
// routes/index.js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
```
> 注意：不要与全局拦截发生冲突。
### 2.9 配置 HTTPS 协议
####2.9.1 SSL证书介绍
1. `Chrome`浏览器会将`http`协议的网站标记为不安全，苹果也要求所有应用必须采用`https`的加密连接。在国内，微信小程序要求开发者必须使用`https`的接入域名。
2. `SSL`证书分为如下种类
(1) 扩展验证型（`EV`）`SSL`证书
(2) 组织验证型（`OV`）`SSL`证书
(3) 域名验证型（`DV`）`SSL`证书
三类证书安全等级依次降低。
3. 申明`SSL`证书的平台
又拍云、腾讯云、七牛、阿里云。
4. 申请`SSL`证书的条件
域名已经通过备案。
####2.9.2 申请免费证书并配置Nginx
1. 腾讯云申请`SSL`证书

(1) 进入证书申请页面
腾讯云 - 控制台 - 云产品 - 域名与网站 -`SSL`证书管理 - 申请证书
(2) 申请证书
填写证书信息 - 手动`DNS`验证 - 确认申请
![填写证书信息](https://upload-images.jianshu.io/upload_images/4989175-f25879dc6173b3de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(3) 添加`DNS`解析记录
查看证书详情 - 添加`DNS`解析记录
![DNS解析记录](https://upload-images.jianshu.io/upload_images/4989175-04d2bfd0b6e205a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(4) 下载证书并解压缩
(5) 将`Nginx`文件夹中的`.key`和`.crt`文件上传到服务器
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:~$ cd /www/ssl
nmwei@iZbp1ai95owp4twsjdkbv1Z:/www/ssl$ ls
1_blog.nimengwei.com_bundle.crt 
2_blog.nimengwei.com.key
```
(6) 配置`nginx`代理
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:/etc/nginx/conf.d$ sudo vi blog-nimengwei-com-3003.conf 
```
```
upstream blog {
  server 127.0.0.1:3003;
}
server {
 listen 80;
 server_name blog.nimengwei.com;
 return 301 https://blog.nimengwei.com$request_uri;
}

server {
 listen 443;
 server_name blog.nimengwei.com; #填写绑定证书的域名
 ssl on;
 ssl_certificate /www/ssl/1_blog.nimengwei.com_bundle.crt;
 ssl_certificate_key /www/ssl/2_blog.nimengwei.com.key;
 ssl_session_timeout 5m;
 ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #按照这个协议配置
 ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;#按照这个套件配置
 ssl_prefer_server_ciphers on;

 if ($ssl_protocol = "") {
  rewrite ^(.*) https://$host$1 permanent;
 } 

 location / {
   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
   proxy_set_header Host $http_host;
   proxy_set_header X-Nginx-Proxy true;
   proxy_pass http://blog;
   proxy_redirect off;
 }
}
```
```
nmwei@iZbp1ai95owp4twsjdkbv1Z:/etc/nginx/conf.d$ sudo nginx -t
nmwei@iZbp1ai95owp4twsjdkbv1Z:/etc/nginx/conf.d$ sudo nginx -s reload
```
参考：证书管理 - 详情 - 指引文档 - [Nginx 证书部署](https://cloud.tencent.com/document/product/400/4143#2.-nginx-.E8.AF.81.E4.B9.A6.E9.83.A8.E7.BD.B2 "2\. Nginx 证书部署")
注释：亚洲诚信品牌免费型`DV`版`SSL`证书仅支持绑定一个一级域名或者子域名，且同一主域最多只能申请`20`张证书（一级域名及其子域名均属于同一主域）。 若您的业务因此次调整受限，建议您购买泛域名型`SSL`证书。
注意：不同平台上申请的`SSL`证书的协议配置(`ssl_protocols `)和套件配置(`ssl_ciphers`)不同。
2. 阿里云申请`SSL`证书
阿里云 - 控制台 - 产品与服务 - 安全云盾 - `SSL`证书 
购买证书 - `Symantec` - 免费型`DV SSL` - 立即购买
注释：其他步骤按照提示以及阿里云`SSL`[配置](https://help.aliyun.com/document_detail/98728.html)进行操作。
## 参考资料
[Node.js项目线上服务器部署与发布](https://coding.imooc.com/class/95.html)
[阿里云ECS服务器文档](https://help.aliyun.com/product/25365.html)
[Linux命令大全](http://man.linuxde.net/)
[Linux中常用操作命令](https://www.cnblogs.com/laov/p/3541414.html)
[MongDB的安装和基本操作(权限设置)](https://yq.aliyun.com/articles/220744)
