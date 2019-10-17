## 1. TypeScript介绍
### 1.1 初识TypeScript 
1. TypeScript是微软开发的一门编程语言，是JavaScript的一个超集。
2. TypeScript扩展了JavaScript的语法，添加了一些新的遵循ES6规范的语法，具有基于类的面向对象编程的特性。任何已经存在的JavaScript程序可以不加任何改动的在TypeScript运行环境下运行。 
3. Angular2框架使用TypeScript编写。
### 1.2 课程内容介绍
1. 学习TypeScript的好处
2. 安装TypeScript开发环境
3. TypeScript概念、语法和特性介绍
##2. TypeScript的优势
1. 支持部分ES6规范 
2. 类型检查
3. 面向对象的特性
## 3. 搭建TypeScript开发环境
### 3.1 在线编译器(compiler)
1. 编译器将TypeScript代码编译成JavaScript代码。
2. 在线编译地址
	http://www.typescriptlang.org/play/index.html
### 3.2 本地编译器(compiler)
1.	安装步骤
①	安装node.js
②	npm install –g typescript  
③	创建Hello.ts
④	书写代码
⑤	tsc Hello.ts
⑥	生成Hello.js
2.	Webstorm IDE编辑器
	可自动将.ts文件转换为.js文件
## 4. 字符串新特性
1.	多行字符串
.ts文件
```
const str = `ab
c`;
```
.js文件
```
var str = "ab\nc";
```
2.	字符串模板
.ts文件
```
var myname = '小明';
var getName = function () {
    return '小李';
};
console.log(`hello ${myname}, 你好 ${getName()}`);
```
.js文件
```
var myname = '小明';
var getName = function () {
    return '小李';
};
console.log("hello " + myname + ", \u4F60\u597D " + getName());
```
3. 自动拆分字符串
```
function test(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
};
var myname = '小明';
var getAge = function () {
    return 18;
}
test`hello my name is ${myname}, i'm ${getAge()}`;
```
形参a对应的实参为["hello my name is ", ", i'm ", ""]
形参b对应的实参为"小明"
形参c对应的实参为18。
## 5. 参数新特性
### 5.1 参数类型
1.	在参数名称后面使用冒号来指定参数的类型 
2.	如何声明类型  
```
var str: string = 'str';
str = 1; //Type '1' is not assignable to type 'string'.
```
虽然编译检查错误，但是.ts文件生成的.js文件并没有错误。
3.	类型推断机制
var str2 = 'str2';
str2 = 1; //Type '1' is not assignable to type 'string'.
	变量会根据第一次赋值时的类型推断应赋值的类型。
4.	五中基本类型
	string、number、boolean、any、void
```
var str:string = 'str';
var strArr: string[] = ['a','b'];
var num:number = 13;
var numArr: Array<number> = [1,2];
var boo: boolean = true;
let array:[string, number];
array = ['hello', 10];
var any:any = 'any';
any = 3; 
function voidFn(): void{
}
```
5.	函数参数类型以及返回值类型
```
function test(num: number): string{
    return "";
};
test(13);
```
6.	自定义类型 
```
class Person {
    name: string;
    age: number;
}
var p: Person = new Person();
p.name = 'zhangsan';
p.age = 18;
```
### 5.2 参数默认值 
1.	在参数民称后面使用等号来指定参数的默认值 
```
function test(a: string, b: string, c: string = 'z'){
    console.log(a);
    console.log(b);
    console.log(c);
}
test('x', 'y');  
```
注意：有默认值的参数必须声明必选参数之后。
### 5.3 可选参数
1.	在方法的参数声明后面用问号来表明此参数为可选参数
```
function test(a: string, b?: string, c: string = 'z'){
    console.log(a);
    console.log(b);
    console.log(c);
}
test('x');
```
注意：①函数体中应对可选参数未传的情况做对应处理。②可选参数必须声明在必选参数之后。③有默认值的参数与可选参数的顺序不固定。  
## 6. 函数新特性
### 6.1 Rest与Spread操作符
1.	用来声明任意数量的方法参数。
2.	…使用在形参上，将实参转化为数组
.ts文件
```
function fn(...args) {
    args.forEach(arg => {
        console.log(arg);
    })
}
fn(1, 2, 3);
fn(5, 6);
```
 .js文件
```
function fn() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    args.forEach(function (arg) {
        console.log(arg);
    });
}
fn(1, 2, 3);
fn(5, 6);
```
3. …使用在实参上
```
function fn(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}
var args = [1, 2];
fn(...args);
var args2 = [5, 6, 7];
fn(...args2);
```
注释：TypeScript还不支持，ES6支持。
### 6.2 generator函数
1.	控制函数的执行过程，手动暂停和恢复代码执行。
```
function* doSomething(){
    console.log('start');
    yield;
    console.log('end');
}
var fn = doSomething();
fn.next(); //start
fn.next(); //end
```
注释：TypeScript还不支持generator函数，ES6支持。
2.	示例
```
function* getStockPrice(stock){
    while(true){
        yield Math.random()*100;
    }
}
var priceGenerator = getStockPrice('IBM');
var limitPrice = 15;
var price = 100;
while(price > limitPrice){
    price = priceGenerator.next().value;
    console.log(`generator return ${price}`);
}
console.log(`buy at ${price}`); 
```
### 6.3 解构表达式  
1.	通过表达式将对象或数组拆解成任意数量的变量。
2.	对象的解构赋值
```
const { a, b: b1, c: {d}} = { a: 1, b: 2 , c: {d:3}};
console.log(a);  //1
console.log(b1); //2 
console.log(d);  //3
```
3.	数组的解构赋值
```
const arr = [1, 2, 3, 4, 5];
const [a, ,c, ...other] = arr;
console.log(a); //1
console.log(c); //3
console.log(other);//[4, 5]
```
4.	函数参数的解构赋值 
```
var arr = [1,2,3,4];
function fn([a,,b,...others]){
    console.log(a);//1
    console.log(b);//3
    console.log(others); //[4]
}
fn(arr);
```
## 7. 表达式与循环 
### 7.1 箭头表达式
1.	示例
```
const arr = [1, 2, 3, 4];
const arr1 = arr.filter(item => item % 2 == 0);
console.log(arr1); //[2, 4]
```
2.	用来声明匿名函数，消除传统匿名函数的this指针问题。
```
function Person(name:string) {
    this.name = name;
    setTimeout(function () {
        console.log(this.name); //空
        console.log(this);  //window对象
    }, 1000);

    setTimeout(() => {
        console.log(this.name); //zhangsan
        console.log(this);      //Person对象
    }, 2000);
}

var p = new Person('zhangsan');
```
### 7.2 for…of…循环 
1.	forEach循环、for…in…循环与for…of…循环对比  
```
var arr = [1, 2, 3, 4];
arr.des = 'four';
arr.forEach(item => console.log(item)); //1,2,3,4
//优点：不遍历des属性。 缺点：不能使用break语句中断循环
for (let i in arr) {
    console.log(i); //0,1,2,3,des
}
//优点：可以使用break语句中断循环。 缺点：遍历des属性。
for (let i of arr) {
    console.log(i);  //1，2，3，4
}
//优点：不遍历des属性，可以使用break语句中断循环。
```
注释：every方法可以中断循环。
	  for…of…循环可以用来遍历Array、Map、Set、String。
## 8. 面向对象特性 
### 8.1 类  
1.	面向对象特性 
	类是TypeScript的核心，使用TypeScript开发时，大部分代码都书写在类中。 
2.	类的声明
	权限修饰符：public(默认)、private、protected
	public修饰或无权限修饰符时，该成员可以在本类以及本类以外被访问。
	Private修饰的成员只能够在本类内被访问。
	Protected修饰的成员只能够在被本类内或其子类被访问。
```
class Person{
    name;
    public age;
    private sex;
    protected eat() {
        console.log('eat');
    }
}
const p1 = new Person();
p1.name = 'xm';
p1.age = 18;
p1.sex = 'man'; //错误
p1.eat(); //错误
```
3.	类的构造函数
```
class Person{
    name;
    constructor(name:string) {
        this.name = name;
    }
    getName() {
        console.log(this.name);
    }
}
var p1 = new Person('xm');
p1.getName();
```
等价写法
```
class Person{
    constructor(public name:string) {
        this.name = name;
    }
    getName() {
        console.log(this.name);
    }
}
```
4.	类的继承
	super关键字既可以调用父类的构造函数，又可以调用父类的成员函数。
```
class Person{
    constructor(private name:string) {
        this.name = name;
    }
    getName() {
        console.log(this.name);
    }
    eat() {
        console.log('eat');
    }
}
class Employee extends Person{
    code: string;
    constructor(name: string, code: string) {
        super(name);
        this.code = code;
    }
    getCode() {
        console.log(this.code)
    }
    work() {
        super.eat();
        this.doWork();
    }
    private doWork() {
        console.log('work');
    }
}
var p1 = new Employee('xm', '001');
p1.getCode();
p1.work();
```
### 8.2 泛型   
1.	参数化的类型，一般用来限制集合的内容。
```
class Person{
    name;
    constructor(name){
        this.name = name;
    }
}
class Employee extends Person{}

const persons: Array<Person> = [];

persons[0] = new Person('xm');
persons[1] = new Employee('xl');
persons[2] = 2;
```
### 8.3 接口
1.	用来建立某种代码约定，使其他开发者在调用某个方法或创建新的类时必须遵循接口所定义的代码约定。  
2.	接口作为方法参数的类型声明
```
interface IPerson{
    name: string;
    age: number;
}
class Person{
    constructor(public config: IPerson) {
    }
}
const p = new Person({
    name: 'zs',
    age: 18
});
```
3.	类实现接口
```
interface Animal{
    eat();
}
class Sheep implements Animal{
    eat() {
        console.log('grass');
    }
}  
```
### 8.4 模块(Module) 
1.	模块可以帮助开发者将代码分割为可重用的单元。开发者可以自己决定将模块中的哪些资源(类、方法、变量)暴露出去供外部使用，哪些资源只在模块内部使用。
注释：一个文件就是一个模块。
2.	import与export
a.ts文件
```
const a = 1;
const fn =()=>{};
class Person{};
export {a,fn,Person}
```
b.ts文件 
```
import {a, fn, Person} from "./a";
console.log(a);
fn();
new Person();
```
### 8.5 注解(annotation)
1.	注解为程序的元素(类、方法、变量) 加上更直观明了的说明，这些说明信息与程序的业务逻辑无关，而是供指定的工具或框架使用。 
### 8.6 类型定义文件(*.d.ts) 
1.	类型定义文件用来帮助开发者在TypeScript中使用已有的JavaScript工具包。如：Jquery。 
## 9. 课程总结
1.	基本概念以及优势、开发环境搭建、语法和特性。
