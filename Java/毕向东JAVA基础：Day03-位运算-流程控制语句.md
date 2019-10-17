8. 位运算符
![image.png](https://upload-images.jianshu.io/upload_images/4989175-324e393de492c870.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

注释:①位运算速度非常快，但只能操作2的倍数。②左移几位就是乘以2的几次幂，右移几位就是除以2的几次幂(取整)，右移时最高位(符号位)是什么空位就补什么（符号不变）。③无符号右移，无论最高位是什么，空位都补零。④当要进行2的次幂的乘除运算的时候，使用<<左移动或>>右移动运算符，当要操作二进制中的一段二进制位的时候，使用>>>无符号右移运算符。⑤&和|不仅是逻辑运算符，还是位运算符。⑥&与运算可用于获取二进制中的有效位1。⑦一个数值^（异或）另外一个数值两次，结果还是这个数值（可用于二进制文件加密）。
注意:在Java中对一个int整数>> 1等于/2，两个操作都有取整的过程。在JavaScript中，>> 1操作有取整过程，而/2并没有取整的过程。
9. 位运算符的应用示例
```
//最有效率的方式算出2乘以8等于几
System.out.println(2<<3);

//对两个整数变量的值进行互换(不需要第三方变量)
//通过和的方式(此方法有个弊端，当两个数据较大，可能超出int范围)
int a = 3;
int b = 7;
a = a + b; //a = 3 + 7;
b = a - b; //b = 10 - 7 = 3;
a = a - b; //a = 10 - 3 = 7;
System.out.println("a="+a+",b="+b); //a=7,b=3

//技巧: 异或。
int a = 3;
int b = 7;
a = a ^ b;//a = 3 ^ 7;
b = a ^ b;//b = 3 ^ 7 ^ 7 = 3;
a = a ^ b;//a = 3 ^ 7 ^ 3 = 7;
System.out.println("a="+a+",b="+b); //a=7,b=3
```
10. 三元运算符 
(条件表达式)?表达式1:表达式2;
如果条件为true，运算后的结果是表达式1；
如果条件为false，运算后的结果是表达式2；
示例:
```
//求a、b、c的最大值
int a=3,b=6,c=8;
int d = a>b?(a>c?a:c):(b>c?b:c);
System.out.println(d);
```
表达式与语句的对比: 一个表达式会产生一个值,它可以放在任何需要一个值的地方。语句可以理解成一个行为,一个程序是由一系列语句组成的。表达式产生一个结果，语句是代码的执行单元。
注释:n元运算符为n个元素参与运算的运算符。
注意：三元运算符 ? 号和 : 之后必须有结果，即必须是一个表达式，不能是一个语句。
### 2.6 语句
1. 程序流程控制
(1) 判断结构 
(2) 选择结构
(3) 循环结构
2. 判断结构
if语句的三种格式
(1)if(条件表达式){
执行语句；
}
(2)if(条件表达式){
执行语句；
} else {
执行语句；
}
(3)if(条件表达式){
	执行语句；
	} else if (条件表达式){
	执行语句；
	}
……
else{
	执行语句；
	}
注释:三元运算符可以理解为if else的简写格式。不是所有的if else都可以简写为三元运算符，因为三元运算符运算完必须有结果。
3. 选择结构
switch语句
格式：
switch(表达式){
	case 取值1:
		执行语句;
		break;
	case 取值2:
		执行语句;
		break;
		……
	default:
		执行语句;
		break;
}
注释:①switch语句选择的类型只有四种：byte，short，int，char。②case与default之间没有顺序。先执行第一个case，没有匹配的case则执行default。③结束switch语句的两种情况：遇到break，执行到switch语句结束。④如果匹配的case或者default没有对应的break，那么程序会继续向下执行，运行可以执行的语句，直到遇到break或者switch结尾结束。
4. if语句和switch语句的对比
if可以用于判断数值，也可以用于判断区间。只要运算结果是boolean类型，都可以进行判断。
switch用于对固定的几个值进行判断，判断值的数据类型有限。
注释：对区间的判断建议使用if语句，对固定值得判断建议使用switch。
5. 循环结构 
代表语句：while ， do while ， for
(1)while语句格式：
while(条件表达式){
	执行语句;
}
(2)do while语句格式：
do{
	执行语句;
}while(条件表达式);
do while特点：是条件无论是否满足，循环体至少执行一次。
(3)for 语句格式
for(初始化表达式；循环条件表达式；循环后的操作表达式){
	执行语句;(循环体)
}
6. for循环与white循环的区别
```
public static void main(String[] args) {
    for(int x = 1; x <3; x++) {
        System.out.println(x);
    }
    System.out.println(x); //报错

    int y = 1;
    while(y<3) {
        System.out.println(y);
        y++;
    }
    System.out.println(y);//不报错
}
```
注释：for循环与while循环的区别——for循环中定义的循环变量在for循环结束后在内存中释放；while循环中定义的循环变量在循环结束后还可以继续使用。
7. 最简单无限循环格式：①while(true),  ②for(;;)无限循环存在的原因是并不知道循环多少次，而是根据某些条件，来控制循环。 
8. 语句嵌套
```
public static void main(String[] args) {
    for(int i = 0;i < 5; i++) {
        for(int j = 5;j > i; j--){
            System.out.print("*");
        }
        System.out.println();//起到换行的作用。
    }
}
```
9. break(跳出);  continue(继续)
break语句：结束当前循环。
应用于跳出选择结构(switch语句)或循环结构(for语句)。
continue语句：结束本次循环，进入下次循环。
应用于循环结构(for语句)。
```
public static void main(String[] args) {
    for(int x = 0; x < 3; x ++){
        for(int y = 0; y < 4; y ++){
            System.out.println("x=" + x);
            break;
        }
    }

    outer:for(int x = 0; x < 3; x ++){
        inner: for(int y = 0; y < 4; y ++){
            System.out.println("x=" + x);
            break outer;
        }
    }

    for(int x = 0; x < 3; x ++){
        for(int y = 0; y < 4; y ++){
            System.out.println("x=" + x);
            continue;
        }
    }

    outer:for(int x = 0; x < 3; x ++){
        inner:for(int y = 0; y < 4; y ++){
            System.out.println("x=" + x);
            continue outer;
        }
    }
}
```
注释:标号的出现，可以让这两个语句作用于指定的范围。
