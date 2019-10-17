10. 输入月份输出季节
```
public static void main(String[] args) {
    int x = 5;
    switch(x){
        case 3:
        case 4:
        case 5:
            System.out.println(x+ "月是春天");
            break;
        case 6:
        case 7:
        case 8:
            System.out.println(x+ "月是夏天");
            break;
        case 9:
        case 10:
        case 11:
            System.out.println(x+ "月是秋天");
            break;
        case 12:
        case 1:
        case 2:
            System.out.println(x+ "月是冬天");
            break;
        default:
            System.out.println(x+ "没有对应的季节");
            break;
    }
}
```
11. 获取任何一个10进制整数的16进制表现形式
```
public static void main(String[] args) {
    int  num = 26;
    for(int i = 0; i < 8; i ++) {
        int n = num & 15;
        if(n < 10) {
            System.out.println((char)(n + '0'));
        } else {
            System.out.println((char)(n - 10 + 'A'));
        }
        num = num >>> 4;
        //打印的结果为A1000000:
    }
}
```
注释:①(char)(n-10+'A')的过程如下——n-10为int数值型，'A'为char字符型。int数值型与char字符型相加，char字符型自动转化为int数值型。(char)强制类型转换，将生成的int数值型转化为char字符型。②在ASCII码中，'1'对应49 ；'a'对应97；'A'对应65。
注意:一个整数（int）默认占32个二进制位，4进制由2个二进制组成，8进制由3个二进制组成，16进制由4个二进制组成。一个整数(int)占32/4 = 8个八进制位。
问题：①十六进制数字的顺序不对。②存在多余的零。
12. 九九乘法表
```
public static void main(String[] args) {
    for(int i = 1; i <= 9; i++) {
        for(int j=1; j <= i; j++) {
            System.out.print(j + "*" + i + "=" +i*j +"\t");
            // \t:制表符  \n:换行
        }
        System.out.println();
    }
}
```
13. 打印带双引号的"Hello World"
```
    System.out.println("\"Hello World\"");
```
### 2.7 函数
1. 函数
(1) 函数的定义
(2) 函数的特点
(3) 函数的应用
(4) 函数的重载
2. 函数就是定义在类中的具有特定功能的一段独立小程序。函数也称为方法。
注释:①在Java中函数就是方法，方法就是函数。②Java中所有的方法都定义在类中。
3. 函数的格式
修饰符 返回值类型 函数名(参数类型 形式参数1,参数类型 形式参数2,...)
{
		执行语句;
		return 返回值;
}
返回值类型：函数运行后的结果的数据类型。
参数类型：是形式参数的数据类型。
形式参数：是一个变量，用于存储调用函数时传递给函数的实际参数。
实际参数：传递给形式参数的具体数值。
return：用于结束函数。
返回值：该函数运算后的结果，该结果会返回给调用者。
4. 函数示例
```
public static void main(String[] args) {
    draw(4, 5);
}

public static void draw(int row, int col)
{
    if(row <= 0 || col <= 0){
        return;
    }
    for(int x = 0; x < row; x++) {
        for(int y = 0; y < col; y++){
            System.out.print("*");
        }
        System.out.println();
    }
    //return;
}
```
注释:①public static为修饰符。②draw方法若无static修饰符，则报错(Error: 无法从静态上下文中引用非静态方法。public修饰符在这里可以省略。③函数中必须有返回值，除非函数的返回值类型为void。④不允许逻辑代码写在主函数中，主函数中只有调其他方法的代码。⑤函数三要素：函数名、参数列表、返回值。
注意:一个方法里的代码最多20行，复杂功能应拆分为几个小的功能，提高复用性。函数应满足单一功能原则，即每一个函数只实现一个功能。
5. 函数的特点
对于函数没有具体返回值的情况，返回值类型用关键字void表示，那么该函数中的return语句如果在最后一行可以省略不写。
注意:(1)函数中只能调用函数，不可以在函数内部定义函数。(2)定义函数时，函数的结果应该返回给调用者，交由调用者处理。
注释:①若在返回值类型关键字为void的函数中省略return，则javac命令将源文件(.java)转化为类文件(.class)的时候会在函数尾默认帮我们添加return语句。②在Java中，不允许在函数内部定义函数，故没有闭包的概念。
6. 函数的重载(overload)
在同一个类中，允许存在一个以上的同名函数，只要它们的参数个数或者参数类型不同即可。
注释:重载的条件—①函数名相同。②参数个数和参数类型不完全相同。
注意:函数是否重载与返回值类型无关，只看参数列表。
7. 函数的重载
```
public static void main(String[] args) {
    int sum1 = add(2,3);
    System.out.println(sum1);
    int sum2 = add(2,3,5);
    System.out.println(sum2);
}

static int add(int num1, int num2) {
    return num1 + num2;
}

static int add(int num1, int num2, int num3) {
    return num1 + num2 + num3;
}
```
注释:函数名相同，参数类型相同，参数个数不同。
注意：功能一样的函数应以重载的形式存在，不宜定义不同的函数名。
8. 重载错误示例
```
public static void main(String[] args) {}

static void add() {}

static int add() {
    //Error:(13, 16) java: 已在类 day04.Demo07中定义了方法 
    return 2;
}
```
注意:函数名相同，参数个数和参数类型也相同，编译时报错。
9. 函数的内存调用过程
```
public static void main(String[] args) {
    int sum = add(3, 4);
    System.out.println(sum);
}

public static int add(int a, int b) {
    return  a + b;
}
```
内存调用过程：main方法压栈→add方法压栈→add方法弹栈→main方法弹栈
注释：①进栈的含义为开辟内存空间，弹栈的含义为释放内存空间。②栈内存的特点是先进后出。
### 2.8 数组
1. 数组的定义
同一种类型数据的集合。其实数组就是一个容器。
注释:在Java中，数组只能够存储同一种数据类型，并且数组的长度不可变。
2. 数组的定义方式
格式1-创建并定义长度:
元素类型[] 数组名 = new 元素类型[元素个数或数组长度];
int[] arr = new int[5];
注释：①int表示数组中的元素的类型，而不是数组的类型。② 5表示数组的长度。③ int[] arr 等价于 int arr[]。
格式2-创建并赋值:
元素类型[] 数组名 = new 元素类型[]{元素，元素，……};
int[] arr = new int[]{3,5,1,7};
int[] arr = {3,5,1,7};
String[] arr = {"1","2"};
注释：①数组可以存储多个数据，并且可以对数据进行编号，操作元素可以通过编号（索引）完成。②在JavaScript中，数组用[]包裹；Java中，数组用{}包裹。
3. Java程序在运行时，需要在内存中分配空间。为了提高运算效率，对空间进行了不同区域划分，每一片内存处理数据方式和内存管理方式不同。
Java对内存空间的划分: 栈、堆、方法区、本地方法区、寄存器。
其中：寄存器是CPU用的，本地方法区与系统底层方法有关，稍作了解即可。
![image.png](https://upload-images.jianshu.io/upload_images/4989175-34a60b4d7708653a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/4989175-98c77c48455662d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(1) 栈内存
①	存储局部变量(只要是在方法或语句中定义的变量都是局部变量)。
②	一旦变量的生命周期结束，该变量就被释放。
(2) 堆内存
①	存储的都是实体（对象），通过new建立的实例都存放在堆内存中。
②	每一个实体都有一个首地址值。
③	实体中的变量都有默认初始化值。
 int-0, double-0.0, boolean-false, char-'\u0001'
 实体-null
④	当实体不再被引用，会在不确定的时间内被垃圾回收器回收。 
注释：局部变量与实体的垃圾回收机制不同，局部变量在生命周期结束后被释放，实体在不被变量引用时被释放。
4. 堆内存中实体的默认值
```
public static void main(String[] args) {
    int[] arr = new int[3];
    System.out.println(arr[2]); //0
}
```
注释：与JavaScript不同，Java中不同类型元素组成的数组默认值不同。 
5. 数组操作常见问题
问题1:数组脚标越界异常
int[] arr = new int[3];
System.out.println(arr[3]);//ArrayIndexOutOfBoundsException
//访问数组中不存在的脚标时发生。
问题2:空指针异常
int[] arr = new int[3];
arr = null;
System.out.println(arr[0]);//NullPointerException
//arr引用没有指向实体，却操作实体中的元素时。
注释：两种错误都是运行期错误，编译时正常。 
6. 数组的length属性
```
public static void main(String[] args) {
    int[] arr = {23, 12, 7};
    for(int x = 0; x < arr.length; x++) {
        System.out.println("arr["+x+"]=" + arr[x]);
    }
}
```
注释:通过数组的length属性可以获取数组的长度。
7. 数组求和
```
public static void main(String[] args) {
    int[] arr = {2,3,6,1};
    int sum = add(arr);
    System.out.println(sum); //打印数组的和
    int sum2 = add({1,2,3}); //报错
}

public static int add(int[] arr) {
    int sum = 0;
    for(int i = 0 ; i < arr.length; i++) {
        sum += arr[i];
    }
    return  sum;
}
```
注释:与JavaScript不同-①数组用{}包裹。②数组的长度不可改变。③若函数的参数为数组类型，则实参必须是一个堆地址，而不能是数组数据本身。④匿名对象可以作为实际参数进行传递（见P36）。
8. 获取最值 
```
public static int getMax(int[] arr) {
    int max = arr[0];
    for(int x = 1; x < arr.length; x++) {
        max = arr[x] > max ? arr[x] : max;
    }
    return max;
}

public static int getMax2(int[] arr) {
    int max = 0;
    for(int x = 1; x < arr.length; x++) {
        max = arr[x] > arr[max] ? x : max;
    }
    return arr[max];
}
```
注释：max的初始值可以是数组中的任意一个元素，或任意一个角标。
