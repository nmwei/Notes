### 01 -Java基础-基础常识-软件开发
1. 软件是一系列按照特定顺序组织的计算机**数据**和**指令**的集合。
2. 常见的软件
①**系统**软件。例如：windows，Linux等。
②**应用**软件。例如：扫雷，迅雷，QQ等。
3. 软件的出现实现了人与计算机之间更好的交互。

### 02 -Java基础-基础常识-人机交互方式
1. 交互方式
①**图形化界面**方式（Graphical User Interface - GUI）。
②**命令行**方式（command-line interface - CLI）。
**注意：**如果一个程序双击并未进入图形化界面，说明该程序的交互方式为命令行界面的方式。
2. dos(磁盘操作系统)命令行常见指令
  * help:	dos个命令的详细信息
  * cls: 	清屏
  * dir:	列出当前目录下的文件及文件夹 
  * md: 	创建目录
  * rd: 	删除目录
  * cd: 	进入指定目录
  * cd..:	退回到上一级目录
  * cd/: 	退回到根目录
  * del: 	删除文件
  * exit: 	退出dos命令行 
**注释:**①使用cd/和cd\都可以进入到根目录下。
②使用rd命令删除目录和使用del命令删除文件，被删除的文件夹和被删除的文件不会进入回收站。
③使用rd命令只能够删除空目录。
④del 文件夹，进入该文件夹并提示是否删除该文件夹内所有文件。
⑤del \*，提示是否确认删除该路径下所有文件。
⑥del \*.txt，直接删除该路径下所有txt格式文件。
⑦从C:\Users\nmw>目录进入D:目录的命令d:。 
 
### 03-Java基础-基础常识-计算机语言
1. 计算机语言
人与计算机**交流**的方式。

### 04-Java基础-Java语言概述
1. Java语言是SUN(`Stanford University Network`，斯坦福大学网络公司)**1995**年推出的一门高级编程语言。
2. Java是一门**面向Internet**的编程语言。
3. Java语言的特点
①**面向对象**；②**安全可靠**；③**跨平台**。
**注意：①**C是**面向过程**的语言，C++和Java是**面向对象**的语言。②Java与C#语法非常类似。
4. Java语言的三种技术架构： 
①J2SE(`Java 2 Platform Standard Edition`）标准版
 开发普通**桌面和商务**应用程序。比如：扫雷。
②J2EE(`Java 2 Platform Enterprise Edition`) 企业版
开发**企业环境**下的应用程序，主要针对于**Web应用程序**开发。比如： Servlet Jsp等
③J2ME(`Java 2 Platform Micro Edition`) 小型版
开发**电子消费产品**和**嵌入式设备**提供的解决方案。
**注释：**Java5.0版本后，更名为 JAVAEE、JAVASE、JAVAME。
**注意：** ①手机操作系统：Android、iOS、Windows Phone、黑莓、塞班等。②由于手机的智能化（内置操作系统），操作系统厂商基于操作系统提供开发工具，J2ME逐渐没落。

### 05-Java基础-跨平台性
1. 跨平台性
通过Java语言编写的应用程序在**不同系统**平台上都可以运行。
**注释：**①不同操作系统的内核不同。②C++ 编写的程序只能够在window系统上运行。③window系统是由C和C++编写的。
2. 跨平台性的原理
在不同操作系统上安装与该操作系统相关的Java虚拟机(`JVM Java Virtual Machine`)。JVM来负责Java程序在该系统中的运行。
**注意：**JVM是用于解释并执行Java程序的应用软件。Java语言通过JVM具备跨平台的能力，而JVM本身并不跨平台。

### 06-Java基础-环境搭建-了解JDK&JRE
1. JRE与JDK
① JRE(`Java Runtime Environment` 
Java运行环境)：包括Java虚拟机(`JVM Java Virtual Machine`)和Java核心类库等。
**注释：**计算机想要运行一个开发好的Java程序，只需要安装JRE即可。
**注意：**JRE = JVM + 类库
②JDK(`Java Development Kit` Java开发工具包)
JDK是提供给Java开发人员使用的，包含java开发工具和JRE。
Java开发工具：编译工具(`javac.exe`) 、 打包工具(`jar.exe`)等
**注释：**安装了JDK，就不用再单独安装JRE了。
**注意：**JDK = JRE + 开发工具

### 07-Java基础-环境搭建-jdk下载&安装
1. JDK安装
[Oracle官网](http://www.oracle.com)
2. 安装目录
`C:\Program Files\Java\jdk1.8.0_74\bin`
其中: `bin`文件夹的全称为(binary二进制) ，bin文件夹中为Java的工具、命令、执行程序、开发工具。
`jre`文件夹放的是Java的运行程序。lib文件夹中放的是Java类库。`src.zip`放的是Java的源代码。
**注释:**bin文件夹中放置工具文件已经成为一种规范，其他软件类似。

### 08-Java基础-环境搭建-Path配置

1. 错误操作
DOS命令行进入bin目录并输入：`javac -version`可以查看JDK版本。如果DOS命令行并不在bin路径，则出现错误提示。
2. 错误分析
当前执行的程序在当前目录下如果不存在，windows系统会在系统中已有的一个名为path的环境变量指定目录中查找。如果还没有找到，就出现以上的错误提示。
**问题：**①每次执行javac命令都要先进入到bin目录内，如何简化步骤？②为什么CMD在任何路径下输入notepad都能够打开记事本，输入winmine都能够打开扫雷？
3. 一劳永逸配置方式
一般情况下，使用命令行交互方式运行某一程序，必须到该程序所在的目录，除非把**该程序所在的路径**定义到**path**环境变量中（Window系统）。
**注释：**Path中记录的是应用程序的路径。
**扩展：**.exe是可执行**应用程序**，.txt是用于存储文本数据的**文件**。双击.txt首先打开一个应用程序（记事本），该应用程序打开.txt文件。

### 09-Java基础-环境搭建-环境变量配置技巧
1. 为了不因为jdk的目录或者目录名称的改变，而不断更改path的值，而导致对path变量值的误操作，可以通过以下技巧完成。
新创建一个环境变量 JAVA_HOME 记录住jdk的目录。在path中通过%%动态的获取JAVA_HOME的值即可。
`JAVA_HOME=F:\jdk1.6.0_01`
`path=%JAVA_HOME%\bin;%path%`
`%path%`：动态获取path环境变量的值。
`%JAVA_HOME%`：动态获取名称为`JAVA_HOME`环境变量的值。

### 10-Java基础-环境搭建-环境变量临时配置
1. 临时配置方式：通过dos命令中set命令完成
 * set ：用于查看本机的所有环境变量的信息。
 * set  变量名 ：查看具体一个环境变量的值。
 * set  变量名=：清空一个环境变量的值。
 * set  变量名=具体值 ：给指定变量定义具体值。
 * set  path=新值;%path%：在原有环境变量值基础上添加新值。
**注意：**这种配置方式只在当前dos窗口有效。窗口关闭，配置消失。
