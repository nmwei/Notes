## 1. 面向对象
###1.1 封装
封装的目的在于将信息隐藏。广义的封装不仅包括**封装数据**和**封装实现**，还包括**封装类型**和**封装变化**。
#### 1.1.1 封装数据
1. 在`Java`中，封装数据是由语法解析来实现的，提供了`public`、`protected`、`private`等关键字来提供不同的访问权限。
2. 在`JavaScript`中，只能依赖变量作用域来模拟实现封装性。
```
var myObj = (function() {
  var _name = 'sven'
  return {
    getName: function() {
      return _name
    }
  }
})()

console.log(myObj.getName()) // sven
console.log(myObj._name) // undefined
```
#### 1.1.2 封装实现
1. 封装实现细节使对象内部的变化对其他对象而言是透明的，即不可见的。
2. 封装实现细节使对象之间的耦合变松散，对象之间只通过暴露的`API`接口来通讯。当我们修改一个对象时，可以随意修改它的内部实现。
3. 封装实现细节的例子有很多。例如：迭代器`each`函数。
#### 1.1.3 封装类型
1. 对于静态类型语言，封装类型是通过抽象类和接口来进行的。将对象的真正类型隐藏在抽象类或者接口之后。
2. `JavaScript`是一门类型模糊语言。在封装类型方面，`JavaScript`没有能力，也没有必要做得更多。
3. 对于`JavaScript`设计模式实现来说，不区分类型是一种失色，也可以说是一种解脱。
#### 1.1.4 封装变化
1. 考虑你的设计中哪些地方可能变化，找到并封装，这是许多设计模式的主题。
2. 设计模式被划分为创建型模式、结构型模式以及行为型模式。其中，创建型模式的目的就是封装**创建对象的变化**，结构型模式封装的是**对象之间的组合关系**，行为型模式封装的是**对象的行为变化**。
3. 通过封装变化的方式，把系统中稳定不变的部分和容易变化的部分隔离开来，在系统的演变过程中，我们只需要替换那些容易变化的部分，如果这些部分是已经封装好的，替换起来也相对容易。这可以最大限度的保证程序的稳定性和可扩展性。
###1.2 继承
1. `JavaScript`选择了基于原型的面向对象系统。在原型编程的思想中，类并不是必须的，对象未必从类中创建而来，一个对象可以通过克隆另一个对象而得到。
2. 虽然`JavaScript`的对象最初都是由`Object.prototype`对象克隆而来的，但对象构造器的原型可以动态指向其它对象。这样一来，当对象`a`需要借用对象`b`的能力时，可以有选择性地把对象`a`的构造器的原型指向对象`b`，从来达到继承的效果。
3. 原型继承
```
var obj = {name: 'sven'}
var A = function() {}

A.prototype = obj

var a = new A()
console.log(a.name) //sven
```
`name`属性查找：`a → a.__proto__→ obj`
4. 原型继承链
```
var obj = {name: 'sven'}

var A = function() {}
A.prototype = obj

var B = function() {}
B.prototype = new A()

var b = new B()
console.log(b.name) //sven
```
`name`属性查找链：`b → b.__proto__ → new A() → A.prototype → obj`
###1.3  多态
1. 多态将“做什么”和“谁去做”分离开来。实现多态的关键在于消除类型之间的耦合关系。
2. 在`Java`中，可以通过向上转型来实现多态。由于`JavaScript`的变量类型在运行期是可变的，所以`JavaScript`对象的多态性是与生俱来的。
3. 多态的最根本好处在于，你不必再向对象询问“你是什么类型”而后根据得到的答案调用对象的某个行为——你只管调用该行为就是了，其他的一切多态机制都会为你安排妥当。
4. 多态将过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句。
5. 代码演示
```
class GoogleMap {
  show() {
    console.log('开始渲染谷歌地图')
  }
}

class BaiduMap {
  show() {
    console.log('开始渲染百度地图')
  }
}

const renderMap = map => {
  if(map.show instanceof Function) {
    map.show()
  }
}

renderMap(new GoogleMap())
renderMap(new BaiduMap())
```
###1.4 UML类图
1. 类图
![类图](https://upload-images.jianshu.io/upload_images/4989175-ee0d597bdae8919d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
1. 类与类之间的关系
(1) 泛化表示继承，用空心箭头表示。
(2) 关联表示引用，用实心箭头表示。
![类与类关系图](https://upload-images.jianshu.io/upload_images/4989175-91189d48b23bceaa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 1.5 示例
1. 使用`class`简单实现`jQuery`中的`$`选择器
```javascript
class jQuery {
  constructor(selector) {
    const slice = Array.prototype.slice
    const dom = slice.call(document.querySelectorAll(selector))
    this.selector = selector || ''
    const len = dom ? dom.length : 0;
    this.length = len
    for(let i = 0; i < len; i++) {
      this[i] = dom[i]
    }
  }
  append(node) {}
  addClass(name) {}
  html(data) {}
}

window.$ = selector => new jQuery(selector)
```
2. 打车时可以打专车或快车。任何车都有车牌号和名称。快车每公里1元，专车每公里2元。行程开始时，显示车辆信息。行程结束时，显示打车金额。行程距离为5公里。
![UML类图](https://upload-images.jianshu.io/upload_images/4989175-356ceb25e6683059.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
//父类 - 车
class Car {
  constructor(name, number) {
    this.name = name
    this.number = number
  }
}

//子类 - 快车
class KuaiChe extends Car {
  constructor(name, number) {
    super(name, number)
    this.price = 1
  }
}

//子类 - 专车
class ZhuanChe extends Car {
  constructor(name, number) {
    super(name, number)
    this.price = 2
  }
}

//行程
class Trip {
  constructor(car, distance) {
    this.car = car
    this.distance = distance
  }

  start() {
    console.log(`行程开始 车名为${this.car.name}，车牌号为${this.car.number}`)
  }

  end() {
    console.log(`行程结束 车费为${this.distance * this.car.price}`)
  }
}

const zhuanChe = new ZhuanChe('专车', '299567')
const trip = new Trip(zhuanChe, 5)
trip.start()
trip.end()
```
注意：将行程抽象为一个类，而不是车的一个属性。
3. 某停车厂分3层，每层100个车位。每个车位都能够检测到车辆的驶入和离开。车辆进入前，显示每层空余车位数量。车辆进入时，摄像头可识别车牌号和时间。车辆出来时，出口显示器显示车牌号和停车时间。
类： 停车场、层、车位、车辆、摄像头、显示器。
![UML类图](https://upload-images.jianshu.io/upload_images/4989175-192e456f28572b34.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
//车辆
class Car {
  constructor(number) {
    this.number = number
  }
}

//停车位
class Stall {
  constructor() {
    this.empty = true
  }

  in() {
    this.empty = false
  }

  out() {
    this.empty = true
  }
}

//停车层
class Floor {
  constructor(index, stalls) {
    this.index = index
    this.stalls = stalls || []
  }

  emptyNum() {
    return this.stalls.filter(stall => stall.empty).length
  }
}

//出口显示屏
class Screen {
  show(car, inTime) {
    console.log(`车牌号为${car.number},停留时间为${Date.now() - inTime}`)
  }
} 

//入口摄像头
class Camera {
  shoot(car) {
    return {
      number: car.number,
      inTime: Date.now()
    }
  }
}

//停车场
class Park {
  constructor(floors, camera, screen) {
    this.camera = camera
    this.screen = screen
    this.floors = floors || []
    this.carList = {};
  }

  emptyNum() {
    let num = 0
    this.floors.forEach(floor => {
      const emptyNum = floor.emptyNum()
      num += emptyNum
    })
    return num;
  }

  showMsg() {
    let info = ''
    for(let i = 1; i < this.floors.length; i++) {
      const floor = this.floors[i]
      info += `第${floor.index}层还有${floor.emptyNum()}个空位`
    }
    console.log(info)
  }

  in(car) {
    if(this.emptyNum() > 0) {
      const info = this.camera.shoot(car)
      for(let i = 1; i < this.floors.length; i ++) {
        const floor = this.floors[i]
        const allNum = floor.stalls.length
        const emptyNum = floor.emptyNum()
        if(emptyNum > 0) {
          let index = 1; 
          while(!floor.stalls[index].empty) {
            index++
          }
          const stall = floor.stalls[index]
          stall.in()
          //保存停车位信息
          info.stall = stall
          break
        }
      } 
      this.carList[car.number] = info
    } else {
      console.log('停车场已满')
    }
  }

  out(car) {
    const info = this.carList[car.number]
    info.stall.out()
    this.screen.show(car, info.inTime)
    delete this.carList[car.number]
  }
}

//测试代码
const floors = []
for(let i = 1; i <= 3; i ++) {
  const stalls = []
  for(let j = 1; j <= 100; j++) {
    stalls[j] = new Stall()
  }
  floors[i] = new Floor(i, stalls)
}

const camera = new Camera()
const screen = new Screen()
const park = new Park(floors, camera, screen)
const car1 = new Car('100')
const car2 = new Car('200')
const car3 = new Car('300')
park.in(car1)
park.showMsg()
park.in(car2)
park.showMsg()
park.out(car1)
park.showMsg()
park.in(car3)
park.showMsg()
park.out(car2)
park.showMsg()
park.out(car3)
park.showMsg()
```
注意：① 引用指的是一个类持有另一个类，而不是一个类的方法以另一个类为参数。 ② 类与类之间应该尽量减少耦合，能够通过将另一个类作为参数实现，就不要持有另一个类。
## 2. 设计模式
1. 简介
在面向对象软件设计过程中针对**特定问题**的简洁而优雅的解决方案。即设计模式是在某种场合下对某个问题的一种解决方案。
2. 分类
(1) 创建型
工厂模式、单例模式、原型模式。
(2) 结构型 
适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。
(3) 行为型
策略模式、模板方法模式、观察者模式、迭代器模式、职责链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。
### 2.1 工厂模式
1. 介绍
对`new`创建对象的封装。
2. `UML`类图
![UML类图](https://upload-images.jianshu.io/upload_images/4989175-3cb0309c2fac5fc2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 使用场景

(1) `jQuery`中的`$('div')`
```
class jQuery{
   // ...
}
window.$ = function(selector) {
   return new jQuery(selector)
}
```
(2) `React`中的`React.createElement`
```
class Vnode(tag, attrs, children) {
   // ...
}
React.createElement = function(tag, attrs, children) {
    return new Vnode(tag, attrs, children)
}
```
(3) `Vue`异步组件
```
Vue.component('async-example', function(resolve, reject) {
  setTimeout(function() {
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```
工厂方式创建对象与`new`创建对象相比，书写简便并且封装性更好。
### 2.2 单例模式
1. 介绍
保证一个类仅有一个实例，并提供一个访问它的全局访问点。
注释：单例模式的核心是确保只有一个实例，并提供全局访问。
2. 代码演示
```
class Single {
  login() {
    console.log('login')
  }
}

Single.getInstance = (function() {
  let instance
  return () => {
    if(!instance) {
      instance = new Single()
    }
    return instance
  }
})()

let obj1 = Single.getInstance()
obj1.login()
let obj2 = Single.getInstance()
obj1.login()

console.log(obj1 === obj2) //true
```
注释：① `Single`类的使用者必须知道这是一个单例类，与以往通过`new Single()`的方式不同，这里必须使用`Single.getInstance()`来创建单例对象。② 该示例为惰性单例，在使用的时候才创建对象。
3. `JavaScript`中的单例模式
在传统面向对象语言中，单例对象从类中创建而来。`JavaScript`其实是一门无类语言，创建**唯一对象**并不需要先创建一个类。传统的单例模式实现在`JavaScript`中并不适用。
```
const single = {
  a() {
    console.log('1')
  }
}
```
4. 创建对象与单例模式分离
```
const getSingle = fn => {
  let result
  return () => result || (result = fn(arguments)) 
}

const createObj = () => new Object();

const createSingleObj = getSingle(createObj)
const s1 = createSingleObj()
const s2 = createSingleObj()
console.log(s1) //{}
console.log(s1 === s2) //true
```
注释：创建对象与管理单例的职责被分布在两个不同的方法中。
5. 使用场景

(1) `jQuery`中只有一个`$`
```
if(window.jQuery) {
  return window.jQuery
} else {
  // 初始化...
}
```
(2) `vuex`和`redux`中的`store`
### 2.3 适配器模式
1. 介绍
旧接口格式和使用者不兼容，使用适配器转换接口。
2. `UML`类图
![image.png](https://upload-images.jianshu.io/upload_images/4989175-62a5648f00635eb8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 代码演示
```
class Adaptee {
  specifiRequest() {
    return '德国标准插头'
  }
}

class Target {
  constructor() {
    this.adaptee = new Adaptee()
  }

  request() {
    let info = this.adaptee.specifiRequest()
    return `${info} - 转换器 - 中国标准插头`
  }
 }

 let target = new Target()
 console.log(target.request()) 
```
4. 使用场景

(1) 封装旧接口
```
//适配jQuery中的$.ajax()
const $ = {
  ajax: function(options) {
    return ajax(options)
  }
}
```
(2) `vue computed`
```
  <div id="app">
    <p>顺序: {{message}}</p>
    <p>逆序: {{reverseMessage}}</p>
  </div>
  <script src = "https://cdn.bootcss.com/vue/2.5.14/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        message: 'hello'
      },
      computed: {
          reverseMessage: function() {
            return this.message.split('').reverse().join('')
          }
        }
    })
  </script>
```
### 2.4 装饰器模式
1. 介绍
装饰器模式可以动态地给某个对象添加额外的职责，而不会影响从这个类中派生的其他对象。
2. 模式分析
在传统的面向对象语言中，给对象添加功能常常使用继承的方式。继承的方式并不灵活，会导致超类和子类存在强耦合性，并且在完成一些功能复用的同时，有可能创建出大量的子类。
装饰器模式能够在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责。与继承相比，装饰者是一种更轻便灵活的做法，这是一种“即用即付”的方式。
3. `UML`类图
![image.png](https://upload-images.jianshu.io/upload_images/4989175-5cb29619f0f8b5fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 代码演示
```
class Plane{
  fire() {
    console.log('发射普通子弹')
  }
}

class MissileDecorator {
  constructor(plane) {
    this.plane = plane
  }

  fire() {
    this.plane.fire()
    console.log('发射导弹')
  }
}

class AtomDecorator {
  constructor(plane) {
    this.plane = plane
  }

  fire() {
    this.plane.fire()
    console.log('发射原子弹')
  }
}

let plane = new Plane()
plane = new MissileDecorator(plane)
plane = new AtomDecorator(plane)
plane.fire() //发射普通子弹 发射导弹 发射原子弹
```
5. `before`和`after`钩子函数
```
Function.prototype.before = function(beforefn) {
  var _self = this
  return function() {
    beforefn.apply(this, arguments)
    return _self.apply(this, arguments)
  }
}

Function.prototype.after = function(afterfn) {
  var _self = this
  return function() {
    var ret = _self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}

 var fun = function() {
  console.log(1)
 }

 var beforeFun = fun.before(function() {
   console.log(0)
 })
 beforeFun() //0 1 


 var afterFun = fun.after(function() {
   console.log(2)
 }).after(function() {
   console.log(3)
 })
 afterFun() //1 2 3
```
6. `ES7`中的装饰器
(1) 配置环境
① 安装插件
`➜  design npm i babel-plugin-transform-decorators-legacy --save-dev`
② 修改`webpack`打包配置文件
```
module.exports = {
 //...
  module: {
    rules: [{
    test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env'],
          plugins: ['babel-plugin-transform-decorators-legacy']
        }
      }
    }]
  },
 //...
}
```
(2) 装饰类
```
@testDec1
@testDec2(false)
class Demo {}

function testDec1( target) {
  target.isDec1 = true
}

function testDec2( bool ) {
  return function(target) {
    target.isDec2 = bool
  }
}

console.log(Demo.isDec1) //true
console.log(Demo.isDec2) //false
```
(3) 装饰对象
```
function mixins(...list) {
  return function(target) {
    Object.assign(target.prototype, ...list)
  }
}

const Foo = {
  foo() {
    console.log('foo')
  }
}

@mixins(Foo)
class B {}

const b = new B()
b.foo() //foo
```
(4) 装饰方法
① 设置方法只可执行，不可修改
```
class Person {
  constructor() {
    this.first = 'A'
    this.last = 'B'
  }

  @readonly
  name() { return `${this.first} ${this.last}` }
}

function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

const p = new Person()
//A B
console.log(p.name())  
//Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Person>'
p.name = () => {} 
```
② 方法执行添加日志
```
class Math{
  @log
  add(a, b) {
    return a + b
  }
}

function log(target, name, descriptor) {
  let oldValue = descriptor.value
  descriptor.value = function() {
    console.log(`calling ${name} wich`, arguments)
    return oldValue.apply(this, arguments)
  }
  return descriptor
}

const math = new Math()
const result = math.add(2, 4)
console.log(result)
```
7.  [`core-decorators`](https://www.npmjs.com/package/core-decorators) 第三方库
提供常用的装饰器。
```
import { readonly } from 'core-decorators'
class Person {
  constructor() {
    this.first = 'A'
    this.last = 'B'
  }

  @readonly
  name() { 
     return `${this.first} ${this.last}` 
  }

  @deprecate()
  getName() {
    return `${this.first} ${this.last}`
  }
}

const p = new Person()
console.log(p.name()) 
//A B 
console.log(p.getName()) 
//DEPRECATION Person#getName: This function will be removed in future versions.
//A B 
p.name = () => {} 
//Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Person>'
```
### 2.5 代理模式
1. 介绍
使用者无权访问目标对象，通过代理做授权和控制。
2.  `UML`类图
![UML类图](https://upload-images.jianshu.io/upload_images/4989175-c383649e60ab9266.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 代码演示
```
class RealImg {
  constructor(fileName) {
    this.fileName = fileName
    this.loadFromDisk()
  }

  display() {
    console.log(`display... ${this.fileName}`)
  }

  loadFromDisk() {
    console.log(`loading... ${this.fileName}`)
  }
}

class ProxyImg {
  constructor(fileName) {
    this.realImg = new RealImg(fileName)
  }

  display() {
    this.realImg.display()
  }
}

const proxyImg = new ProxyImg('1.png')
proxyImg.display()
```
注释：代理和本体接口必须一致，在任何使用本体的地方都可以替换成使用代理。
4. 使用场景

(1) 事件代理
```
var ul = document.getElementById('ul')
ul.addEventListener('click', function(e) {
  var target = e.target;
  if(target.nodeName === 'LI') {
    alert(target.innerHTML)
  }
})
```
(2) `jQuery`中的`$.proxy`
```
$('ul').click(function() {
  var self = this
  setTimeout(function() {
     $(self).css('background', 'red')
  }, 1000) 
})

//使用$.proxy保存this
$('ul').click(function() {
  setTimeout($.proxy(function() {
     $(this).css('background', 'red')
  }, this), 1000) 
})
```
(3) 图片预加载
```
var myImg = (function() {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return function(src){
    imgNode.src = src
  }
})()

var proxyImg = (function() {
  var img = new Image()
  img.onload = function() {
    myImg(this.src)
  }

  return function(src) {
    myImg('loading.gif')
    img.src = src
  }
})()

proxyImg('1.png')
```
(4) 缓存代理
```
//计算乘积
const mult = function(){
  let a = 1
  debugger;
  for(let i = 0; i < arguments.length; i++) {
    a *= arguments[i]
  }
  return a
}

//缓存代理工厂
const createProxyFactory = fn => {
  let cache = {}
  return function(){
    const args = Array.prototype.join.call(arguments, ',')
    if(cache[args]) {
      return cache[args]
    }
    return cache[args] = fn.apply(this, arguments)
  }
}

var proxyMult = createProxyFactory(mult)
console.log(proxyMult(1,2,3,4)) //24
console.log(proxyMult(1,2,3,4)) //24
```
(5) `ES6`中的`Proxy`
```
//明星
let star = {
  name: '张XX',
  age: 25,
  phone: '13900001111'
}

//经纪人
let agent = new Proxy(star, {
  get: function (target, key, receiver) {
    if(key === 'phone') {
      //返回经纪人自己的电话
      return '13922225555'
    }
    if(key === 'price') {
      //明星不报价，经纪人报价
      return 120000
    }
    return target[key]
  },
  set: function (target, key, value, receiver) {
    if(key === 'customPrice') {
      if(value < 100000) {
        throw new Error('价格太低')
      } else {
        target[key] = value
        return true
      }
    }
  }
})

console.log(agent.name) //张XX
console.log(agent.age) //25 
console.log(agent.phone) //13922225555
console.log(agent.price) //120000
agent.customPrice = 150000
console.log(star.customPrice) //150000
agent.customPrice = 90000 //Uncaught Error: 价格太低
```
5. 与其他设计模式对比
(1) 代理模式与适配器模式对比
适配器模式：提供一个不同的接口。
代理模式：提供一模一样的接口。
(2) 代理模式与装饰器模式
装饰器模式：扩展功能，原有功能不变且可直接使用。
代理模式：使用原有功能，但是经过限制和约束。
### 2.6 外观模式
1. 介绍
为子系统中的一组接口提供了一个高层接口，使用者使用这个高层接口。
2. 使用场景
```
function bindEvent(elem, type, selector, fn) {
  if(fn == null) {
    fn = selector
    selector = null
  }
  //...
}

// 调用
bindEvent(elem, 'click', '#div1', fn)
bindEvent(elem, 'click', fn)
```
### 2.7 观察者模式
1. 介绍
观察者模式又叫做发布-订阅模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生变化时，所有依赖于它的对象都将得到通知。
2. `UML`类图
![image.png](https://upload-images.jianshu.io/upload_images/4989175-560f5f30c623d200.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 代码演示
```
class Subject {
  constructor() {
    this.state = 0
    this.observers = []
  }
  
  getState() {
    return this.state
  }

  setState(state) {
    this.state = state
    this.notifyAllObservers()
  }

  notifyAllObservers() {
    this.observers.forEach(observer => {
      observer.update(this.state)
    })
  }

  attach(observer) {
    this.observers.push(observer)
    observer.subject = this
  }
}

class Observer {
  constructor(name) {
    this.name = name
    this.subject = null
  }

  update(state) {
    console.log(`${this.name} update state to ${state}`)
  }
}

const sub = new Subject()
const obs1 = new Observer('obs1')
const obs2 = new Observer('obs2')
sub.attach(obs1)
sub.attach(obs2)

sub.setState(1)
sub.setState(2)
sub.setState(3)
```
4. 使用场景

(1) `DOM`事件
```
document.body.addEventListener('click', function() {
  console.log(1)
}, false)

document.body.addEventListener('click', function() {
  console.log(2)
}, false)

document.body.click() //模拟用户点击
```
(2) `Promise`

(3) `jQuery`中`callbacks`
```
var callbacks = $.Callbacks()
callbacks.add(function(info) {
  console.log('fn1', info)
})
callbacks.add(function(info) {
  console.log('fn2', info)
})
callbacks.add(function(info) {
  console.log('fn3', info)
})

callbacks.fire('go')
callbacks.fire('fire')
```
(4) `nodejs`自定义事件
① `EventEmitter`类
```
const EventEmitter = require('events').EventEmitter

const emitter = new EventEmitter()
emitter.on('some', info => {
  console.log('fn1', info)
})

emitter.on('some', info => {
  console.log('fn2', info)
})
emitter.emit('some', 'fire1')
```
② `EventEmitter`应用
```
const EventEmitter = require('events').EventEmitter

class Dog extends EventEmitter {
  constructor(name) {
    super()
    this.name = name
  }
}

const simon = new Dog('simon')
simon.on('bark', function(voice) {
  console.log(this.name, voice)
})
setInterval(function() {
  simon.emit('bark', '汪')
}, 1000)
```
③ `fs`文件系统读取文件字符数
```
const fs = require('fs')
const readStream = fs.createReadStream('./node_modules/accepts/index.js')
let length = 0
readStream.on('data', function(chunk) {
  let len = chunk.toString().length
  console.log('len', len) //len 5252
  length += len
})
readStream.on('end', function() {
  console.log('length', length) //length 5252
})
```
④ `fs`文件系统读取文件行数
```
const fs = require('fs')
const readLine = require('readline')
let rl = readLine.createInterface({
  input: fs.createReadStream('./node_modules/accepts/index.js'),
})
let lineNum = 0
rl.on('line', function(line) {
  lineNum ++
})
rl.on('close', function() {
  console.log('lineNum', lineNum) //lineNum 238
})
```
### 2.8 迭代器模式
1. 介绍
提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
注释：`object`不是有序数据集合，`ES6`中的`map`是有序数据集合。
2. `UML`类图
![UML类图](https://upload-images.jianshu.io/upload_images/4989175-c77ca73800c12d6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 代码演示
```
class Iterator {
  constructor(container) {
    this.list = container.list
    this.index = 0
  }

  next() {
    if(this.hasNext()) {
      return this.list[this.index++] 
    }
    return null
  }

  hasNext() {
    return this.index < this.list.length
  }
}

class Container {
  constructor(list) {
    this.list = list
  }

  getIterator() {
    return new Iterator(this)
  }
}

var arr = [1, 2, 3, 4, 5]
var container = new Container(arr)
var iterator = container.getIterator()
while(iterator.hasNext()) {
  console.log(iterator.next())
}
```
4. 使用场景

(1) `jQuery`中的`each`方法
```
var arr = [1,2,3]
var nodeList = document.getElementsByTagName('li')
var $a = $('li')

function each(data) {
  var $data = $(data)
  $data.each(function(key, val) {
    console.log(key, val)
  })
}

each(arr)
each(nodeList)
each($a)
```
(2) 迭代器模式替换`if...else`
```
const getActiveUploadObj = () => {
  try{
    return new ActiveXObject('TXFTNActiveX.FTNUpload')
  } catch (e) {
    return false
  }
}

const getFlashUploadObj = () => {
  if(supportFlash()) {
    const str = '<object type="application/x-shockwave-flash"></object>'
    return $(str).appendTo($('body'))
  }
}

const getFormUploadObj = () => {
  const str = '<input name="file" type="file" class="ui-file" />'
  return $(str).appendTo($('body'))
}

const interatorUploadObj = function(){
  for(let i = 0, fn; fn=arguments[i++];) {
    var uploadObj = fn()
    if(uploadObj !== false) {
      return uploadObj
    }
  } 
}

const uploadObj = interatorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUploadObj)
```
(3)  `ES6`中的`Iterator`
`ES6`语法中，有序数据集合的数据类型有多个。例如：`Array`、`Map`、`Set`、`String`、`TypedArray`等。需要有一个统一的遍历接口来遍历所有数据类型。以上数据类型都有一个`[Symbol.iterator]`属性。属性值是函数，执行函数返回一个迭代器。此迭代器有`next()`方法可顺序迭代子元素。
```
Array.prototype[Symbol.iterator]
ƒ values() { [native code] }
Array.prototype[Symbol.iterator]()
Array Iterator {}
Array.prototype[Symbol.iterator]().next()
{value: undefined, done: true}
```
`Iterator`使用示例
```
function each(data) {
  let iterator = data[Symbol.iterator]()

  let item = { done: false }
  while(!item.done) {
    item = iterator.next()
    if(!item.done) {
      console.log(item.value)
    }
  }
}

var map = new Map()
map.set(1, 'a')
map.set(2, 'b')
var arr = [1,2,3]
var str = 'abc'
each(arr)
each(str)
each(map)
```
ES6中的`for...of`语法是对`Iterator`的封装
```
function each(data) {
  for(let item of data) {
    console.log(item)
  }
}

var map = new Map()
map.set(1, 'a')
map.set(2, 'b')
var arr = [1,2,3]
var str = 'abc'
each(arr)
each(str)
each(map)
```
### 2.9 状态模式
1. 介绍
将状态封装成独立的类，并将请求委托给当前的状态对象，当对象的内部状态改变时，会带来不同的行为变化。
注释：状态模式的关键是把事物的每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部。
2. `UML`类图
![image.png](https://upload-images.jianshu.io/upload_images/4989175-672cd4031d9a7f61.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 代码演示
```
class OffLightState {
  constructor(light) {
    this.light = light
  }

  switch() {
    console.log('微光') //offLightState对应的行为
    this.light.setState(this.light.weakLightState) //切换状态到weakLightState
  }
}

class WeakLightState {
  constructor(light) {
    this.light = light
  }

  switch() {
    console.log('强光')
    this.light.setState(this.light.strongLightState)
  }
}

class StrongLightState {
  constructor(light) {
    this.light = light
  }

  switch() {
    console.log('关灯')
    this.light.setState(this.light.offLightState)
  }
}

class Light {
  constructor() {
    this.offLightState = new OffLightState(this)
    this.weakLightState = new WeakLightState(this)
    this.strongLightState = new StrongLightState(this)
  }

  init() {
    this.currState = this.offLightState
  }

  setState(newState) {
    this.currState = newState
  }

  press() {
    this.currState.switch()
  }
}

const light = new Light()
light.init()
light.press() //微光
light.press() //强光
light.press() //关灯
```
注释：状态的切换规律事先被完好定义在各个状态类中。在`Context`中再也找不到任何一个跟状态切换相关的条件分支语句。
4. 使用场景
(1) 有限状态机
有限个状态知之间切换。
使用开源库：[`javascript-state-machine`](https://www.npmjs.com/package/javascript-state-machine)
```
import StateMachine from 'javascript-state-machine'
import $ from 'jquery'

let fsm = new StateMachine({
  init: '收藏',
  transitions: [
    {
      name: 'doStore',
      form: '收藏',
      to: '取消收藏'
    },
    {
      name: 'deleteStore',
      form: '取消收藏',
      to: '收藏'
    }
  ],
  methods: {
    onDoStore: function() {
      alert('收藏成功') 
      updateText()
    },
    onDeleteStore: function() {
      alert('取消收藏成功') 
      updateText()      
    }
  }
})

let $btn = $('#btn')

$btn.click(function() {
  if(fsm.is('收藏')) {
    fsm.doStore()
  } else {
    fsm.deleteStore()
  }
})

// 更新按钮文案 
function updateText() {
  $btn.text(fsm.state)
}

//初始化文案
updateText()
```
(2) `Promise`实现
```
import StateMachine from 'javascript-state-machine'

const fsm = new StateMachine({
  init: 'pending',
  transitions: [
    {
      name: 'resolve',
      from: 'pending',
      to: 'fullfilled'
    },
    {
      name: 'reject',
      from: 'pending',
      to: 'rejected'
    }
  ],
  methods: {
    onResolve(state, data){
      //state - 当前状态机实例; data - fsm.resolve(xxx) 传递的参数
      data.successList.forEach(fn => fn())
    },
    onReject(state, data){
      //state - 当前状态机实例; data - fsm.reject(xxx) 传递的参数
      data.failList.forEach(fn => fn())
    }
  }
})

class MyPromise {
  constructor(fn) {
    this.successList = []
    this.failList = []
    fn(() => {
      // resolve 函数
      fsm.resolve(this)
    }, () => {
      // reject 函数
      fsm.reject(this)
    })
  }

  then(successFn, failFn) {
    this.successList.push(successFn)
    this.failList.push(failFn)
  }
}

function loadImg(src) {
  const mp = new MyPromise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = src
  })
  return mp
}

let src = 'https://www.baidu.com/img/bd_logo1.png'
let mp = loadImg(src)

mp.then(() => {
  console.log('success1')
}, () => {
  console.log('fail1')
})

mp.then(() => {
  console.log('success2')
}, () => {
  console.log('fail2')
})
```
5. 与策略模式对比
策略模式中各个策略类之间是平等又平行的，他们之间没有任何联系，客户必须熟知这些策略类的所用，以便随时主动切换算法；而在状态模式中，状态之间的切换早已被预先设定，“改变行为”这件事情发生在状态模式内部，客户并不需要了解这些细节。
### 2.10 原型模式
`JavaScript`选择了基于原型的面向对象系统。在原型编程的思想中，类并不是必须的，对象未必从类中创建而来，一个对象可以通过克隆另一个对象而得到。
#### 2.10.1 使用克隆的原型模式
1. 原型模式是用于创建对象的一种模式。我们不再关心对象的具体类型，而是找到一个对象，然后通过克隆来创建一个一模一样的对象
2. `ES5`中提供了`Object.create`方法，可以用来克隆对象。
```
let obj = {
  getName() {
    return this.first + '  ' + this.last
  },

  say() {
    alert('hello')
  }
}

let x = Object.create(obj)
x.first = 'A'
x.last = 'B'
alert(x.getName())
x.say()
```
在不支持`Object.create`方法的浏览器中，则可以使用以下代码：
```
//兼容不支持浏览器
Object.create = Object.create || function(obj) {
  var F = function() {}
  F.prototype = obj
  return new F()
}
```
3. 原型模式提供了一种便捷的方式去创建某个类型的对象，克隆只是创建这个对象的过程和手段。通过克隆，我们不再关心对象的具体类型。
#### 2.10.2 JavaScript中的原型继承
1. 原型编程遵循以下基本规则
① 所有的数据都是对象。
② 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
③ 对象会记住它的原型。
④ 如果对象无法响应某个请求，它会把这个请求委托给自己的原型。
1. `JavaScript`中的根对象是`Object.prototype`，`Object.prototype`对象是一个空的对象。`JavaScript`中的每一个对象，实际上都是从`Object.prototype`对象克隆而来的。
```
var obj1 = new Object()
var obj2 = {}

console.log(Object.getPrototypeOf(obj1) === obj1.__proto__)  //true
console.log(Object.getPrototypeOf(obj1) === Object.prototype) //true
console.log(Object.getPrototypeOf(obj2) === Object.prototype) //true
```
### 2.11 桥接模式
1. 介绍
把抽象化与实现化解耦，使两者可以独立变化。
2. 代码演示
```
class Color {
  constructor(name) {
    this.name = name
  }
}

class Shape {
  constructor(name, color) {
    this.name = name
    this.color = color
  }

  draw() {
    console.log(`${this.color.name} ${this.name}`)
  }
}

let red = new Color('red')
let circle = new Shape('circle', red)
circle.draw() //red circle
```
### 2.12 组合模式
1. 介绍
生成树形结构，表示“整体-部分”关系。让整体和部分具有一致的操作方式。
注释：组合模式最大的优点在于可以一致地对待组合对象和基本对象。客户不需要知道当前处理的是宏任务还是普通任务。
2. 特点
① 使用树形方式创建对象的结构。
② 把相同操作应用在组合对象和单个对象上。
3. 使用场景
虚拟`DOM`中的`vnode`是这种形式。
4. 组合模式注意事项
① 组合对象和叶对象是聚合关系而非父子关系。
② 组合对象和叶对象拥有相同的接口。
③ 对组合对象和叶对象的操作必须具有一致性。
### 2.13 享元模式
1. 介绍
享元模式是一种用于性能优化的模式，享元模式的核心是运用共享技术来有效支持大量细粒度的对象。
2. 代码演示
```
class Model {
  constructor(sex) {
    this.sex = sex
    this.underwear = ''
  }

  setUnderwear(underwear) {
    this.underwear = underwear
  }

  takePhoto() {
    console.log(`sex: ${this.sex}; underwear: ${this.underwear}`)
  }
}

const maleModel = new Model('male')
const femaleModel = new Model('female')

for(let i = 1; i<= 50; i++) {
  maleModel.setUnderwear('underwear' + i)
  maleModel.takePhoto()
}

for(let j = 1; j<= 50; j++) {
  femaleModel.setUnderwear('underwear' + j)
  femaleModel.takePhoto()
}
```
3. 内部状态与外部状态
享元模式要求将对象的属性划分为内部状态和外部状态(状态在这里通常指属性)。
① 内部状态存储于对象内部。
② 内部状态可以被一些对象共享。
③ 内部状态独立于具体的场景，通常不会改变。
④ 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。 
### 2.14 策略模式
1. 介绍
定义一系列的算法，把不同策略封装起来，并且使他们可以相互替换。
注释：策略模式可以替代`if...else...`语句。
2. 代码演示
```
//不使用策略模式
class User {
  constructor(type) {
    this.type = type
  }

  buy() {
    if(this.type === 'oridinary') {
      console.log('普通用户购买')
    } else if(this.type === 'member') {
      console.log('会员用户购买')
    } else if('this.type' === 'vip') {
      console.log('vip 用户购买')
    }
  }
}

let u1 = new User('member') 
u1.buy() //会员用户购买

//使用策略模式
class OridinaryUser {
  buy() {
    console.log('普通用户购买')
  }
}
class MemberUser {
  buy() {
    console.log('会员用户购买')
  }
}

class VipUser {
  buy() {
    console.log('vip 用户购买')
  }
}

class UserManager {
  constructor() {
    this.user = null
  }

  setUser(user) {
    this.user= user
  }

  userBuy() {
    this.user.buy()
  }
}

const m = new UserManager()
const u = new OridinaryUser()
m.setUser(u)
m.userBuy() //普通用户购买
```
注释：策略模式的实现至少由两部分组成。第一个部分是一组策略类(`OridinaryUser`、`MemberUser`、`VipUser`)，策略类封装了具体的算法，并负责具体的计算过程。第二个部分是环境类(`UserManager`)，环境类接受客户的请求，随后把请求委托给某一个策略类。
3. `JavaScript`中的策略模式
策略对象从各个策略类中创建而来，环境对象从环境类中创建而来，这是模拟一些传统面向对象语言的实现。在`JavaScript`中，函数也是对象，所以更简单和直接的做法是把策略对象和环境对象直接定义为函数。
```
const strategies = {
  oridinary() {
    console.log('普通用户购买')
  },
  member() {
    console.log('会员用户购买')
  },
  vip() {
    console.log('vip 用户购买')
  }
}

const userBuy = user => strategies[user]()
userBuy('member') //会员用户购买
```
### 2.15 模板方法模式
1. 介绍
在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。
2. 代码演示
```
class Beverage {
  init() {
    this.boilWater()
    this.brew()
    this.pourInCup()
    this.addCondiments()
  }

  boilWater() {
    console.log('把水煮沸')
  }

  brew(){} //沸水冲泡饮料
  pourInCup(){} //饮料倒进杯子
  addCondiments(){} //加调料
}

class Coffee extends Beverage {
  brew(){
    console.log('用沸水冲泡咖啡')
  } 
  pourInCup(){
    console.log('把咖啡倒进杯子')
  } 
  addCondiments(){
    console.log('加糖和牛奶')
  } 
}

class Tea extends Beverage {
  brew(){
    console.log('用沸水浸泡茶叶')
  } 
  pourInCup(){
    console.log('把茶倒进杯子')
  } 
  addCondiments(){
    console.log('加柠檬')
  } 
}

const coffee = new Coffee()
coffee.init()

const tea = new Tea()
tea.init()
```
3. 模式对比
策略模式和模板方法是一对竞争者。在大多数情况下，他们可以相互替换使用。模板方法模式基于继承的思想，而策略模式则偏重于组合和委托。
### 2.16 职责链模式
1. 介绍
使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。
2. 代码演示
① 流程审批(职责链每个节点都处理)
```
class Action {
  constructor(name) {
    this.name = name
    this.nextAction = null
  }

  setNextAction(action) {
    this.nextAction = action
  }

  handle() {
    console.log(`${this.name} 审批`)
    this.nextAction && this.nextAction.handle()
  }
}

const action1 = new Action('组长')
const action2 = new Action('经理')
const action3 = new Action('总监')

action1.setNextAction(action2)
action2.setNextAction(action3)

action1.handle()
```
② 购买商品(职责链只有一个节点处理)
```
const order500 = (orderType, pay, stock) => {
  if(orderType === 1 && pay === true){
    console.log('500元定金预购，得到100优惠券')
    return true
  }
  return false
}

const order200 = (orderType, pay, stock) => {
  if(orderType === 2 && pay === true){
    console.log('200元定金预购，得到50优惠券')
    return true
  }
  return false
}

const orderNormal = (orderType, pay, stock) => {
  if(stock > 0){
    console.log('普通购买，无优惠券')
  } else {
    console.log('手机内存不足')
  }
  return true
}

class Chain {
  constructor(fn) {
    this.fn = fn
    this.successor = null
  }

  setNextSuccessor(successor){
    this.successor = successor
  }

  passRequest() {
    const res = this.fn.apply(this, arguments)
    return res ? res : this.successor && this.successor.passRequest.apply(this.successor, arguments)
  }
}

const chainOrder500 = new Chain(order500)
const chainOrder200 = new Chain(order200)
const chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

chainOrder500.passRequest(1, true, 500) //500元定金预购，得到100优惠券
chainOrder500.passRequest(2, true, 500) //200元定金预购，得到50优惠券
chainOrder500.passRequest(3, false, 500) //普通购买，无优惠券
chainOrder500.passRequest(3, false, 0) //手机内存不足
```
3. 使用场景 
① 作用域链
② 原型链
③ 事件冒泡
④ `jQuery`的链式操作
⑤ `Promise.then`的链式操作
### 2.17 命令模式
1. 介绍
执行命令时，发布者和执行者分开。中间加入命令对象，作为中转站。
2. 应用场景
有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接受者能够消除彼此之间的耦合关系。
3. 代码演示
```
//接受者
class Receiver{
  exec() {
    console.log('执行')
  }
}

//命令者
class  Command {
  constructor(receiver) {
    this.receiver = receiver
  }

  cmd() {
    console.log('执行命令')
    this.receiver.exec()
  }
}

//触发者
class Invoker {
  constructor(command) {
    this.command = command
  }

  invoke() {
    console.log('开始')
    this.command.cmd()
  }
}

//士兵
const soldier = new Receiver()
//小号手
const trumpeter = new Command(soldier)
//将军
const general = new Invoker(trumpeter)

general.invoke()
```
4. `JavaScript`中的命令模式
命令模式的由来，其实是回调(`callback`)函数的一个面向对象的替代品。`JavaScript`将函数作为一等对象，与策略模式一样，命令模式早已融入到了`JavaScript`语言中。运算块可以封装在普通函数中。**函数作为一等对象，本身就可以被四处传递。**
```
const bindClick = (button, func) => {
  button.onclick = func
}

const MenuBar = {
  refresh() {
    console.log('刷新菜单界面')
  }
}

const SubMenu = {
  add() {
    console.log('增加子菜单')
  },
  del() {
    console.log('删除子菜单')
  }
}

bindClick(button1, MenuBar.refresh)
bindClick(button2, SubMenu.add)
bindClick(button3, SubMenu.del)
```
### 2.18 备忘录模式
1. 介绍
随时记录一个对象的状态变化。随时可以恢复之前的某个状态(如撤销功能)。
2. 代码演示
```
//备忘类
class Memento {
  constructor(content) {
    this.content = content
  }

  getContent() {
    return this.content
  }
}

//备忘列表
class CareTaker {
  constructor() {
    this.list = []
  }

  add(memento) {
    this.list.push(memento)
  }

  get(index) {
    return this.list[index]
  }
}

//编辑器
class Editor {
  constructot() {
    this.content =  null
  }

  setContent(content) {
    this.content = content
  }

  getContent() {
    return this.content
  }

  saveContentToMemento() {
    return new Memento(this.content)
  }

  setContentFromMemento(mement) {
    return this.content = mement.getContent()
  }
 }

 //测试代码
const editor = new Editor()
const careTaker = new CareTaker()

editor.setContent('1')
editor.setContent('2')
careTaker.add(editor.saveContentToMemento())
editor.setContent('3')
careTaker.add(editor.saveContentToMemento())
editor.setContent('4')
console.log(editor.getContent()) // 4
editor.setContentFromMemento(careTaker.get(1)) //撤销
console.log(editor.getContent()) // 3 
editor.setContentFromMemento(careTaker.get(0)) //撤销
console.log(editor.getContent()) // 2
```
### 2.19 中介者模式
1. 介绍
解除对象与对象之间的紧耦合关系。增加一个中介者对象后，所有的相关对象都通过中介者对象来通讯，而不是互相引用。当一个对象发生改变时，只需要通知中介者对象即可。
2. 中介者模式使网状的多对多关系变成了相对简单的一对多关系
![image.png](https://upload-images.jianshu.io/upload_images/4989175-38b8a0320722f13c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 现实中的中介者
① 机场指挥塔
② 博彩公司
4. 代码演示
```
class A {
  constructor() {
    this.number = 0
  }

  setNumber(num, m) {
    this.number = num
    if(m) {
      m.setB()
    }
  }
}

class B {
  constructor() {
    this.number = 0
  }

  setNumber(num, m) {
    this.number = num
    if(m) {
      m.setA()
    }
  }
}

//中介者
class Mediator {
  constructor(a, b) {
    this.a = a
    this.b = b
  }

  setB() {
    let num = this.a.number
    this.b.setNumber(num / 10)
  }

  setA() {
    let num = this.b.number
    this.a.setNumber(num + 5)
  }
}

const a = new A()
const b = new B()
const m = new Mediator(a, b)
a.setNumber(100, m)
console.log(a.number, b.number)

b.setNumber(100, m)
console.log(a.number, b.number)
```
### 2.20 访问者模式
1. 介绍
将数据操作与数据结构进行分离。
### 2.21 解释器模式
1. 介绍
描述语言语法如何定义，如何解释和编译。
## 3. 设计原则和编程技巧
### 3.1 设计原则概述
1. 《`UNIX/LINUX`设计哲学》设计准则
① 小既是美。
② 每个程序只做一件事情。
③ 快速建立原型。
④ 舍弃高效率而取可移植性。
⑤ 避免强制性的图形化界面交互。
⑥ 让每个程序都成为过滤器。
⑦ 寻求90%的解决方案。
注释：花20%的成本解决80的需求。
2. 五大设计原则(`SOLID`)
① `S` - 单一职责原则
② `O` - 开放封闭原则
③ `L` - 李氏置换原则
④ `I` - 接口独立原则
⑤ `D` - 依赖倒置原则
3. 单一职责原则
一个程序只做好一件事情。
4. 开放封闭原则 
对扩展开放，对修改封闭。
增加需求时，扩展新代码，而非修改已有代码。
5. 李氏置换原则
子类能覆盖父类。
父类能出现的地方子类就能出现。
6. 接口独立原则
保持接口的独立，避免出现“胖接口”。
7. 依赖倒置原则
 面向接口编程，依赖于抽象而不依赖于具体。
### 3.2 单一职责原则
1. 简介
就一个类、对象以及方法而言，应该仅有一个引起它变化的原因。
注释：单一职责原则定义为“**引起变化的原因**”。如果我们有两个动机去改写一个方法，那么这个方法就具有两个职责。
2. 原则
一个对象(方法)只做一件事情。
3. 设计模式验证
① 代理模式
图片预加载代理模式中，代理对象负责预加载职责，本体对象负责图片加载职责。
② 迭代器模式
迭代器模式提供遍历访问聚合对象的职责。
③ 单例模式
将创建对象与管理单例分别封装在两个方法中，两个方法相互独立互不影响。
④ 装饰者模式
让类或者对象一开始只具有一些基础的职责，更多的职责在代码运行时被动态装饰到对象上面。装饰者模式可以为对象动态增加职责，从另一个角度来看， 这也是分离职责的一种方式。
4. 应用场景
① 如果有两个职责总是同时变化，那就不必分离他们。即使两个职责已经被耦合在一起，但它们还没有发生改变的征兆，那么也许没有必要主动分离它们。
② 在方便性与稳定性之间要有一些取舍。具体是选择方便性还是稳定性，并没有标准答案，而是要取决于具体的应用环境。例如：`jQuery`的 `attr` 是个非常庞大的方法，既负责赋值，又负责取值，这对于`jQuery`的维护者来说，会带来一些困难，但对于`jQuery`的用户来说，却简化了用户的使用。
5. 优缺点
① 优点
按照职责把对象分解成更小的粒度，降低了单个类或者对象的复杂度，有助于代码的复用，也有利于进行单元测试。
② 缺点
增加了编写代码的复杂度，也增大了这些对象之间相互联系的难度。
### 3.3 最少知识原则
1. 简介
最少知识原则(`LKP`)指一个软件实体应当尽可能少地与其他实体发生相互作用。这里的软件实体不仅包括对象，还包括系统、类、模块、函数、变量等。
2. 减少对象之间的联系
单一职责原则指导我们把对象划分成较小的粒度，提高对象的可复用性。但越来越多的对象之间可能会产生错综复杂的联系，如果修改了其中一个对象，很可能会影响到跟它相互引用的其他对象。
最少知识原则要求我们尽量减少对象之间的交互。如果两个对象之间不必彼此直接通信，那么这两个对象就不要发生直接的相互联系。
3. 设计模式验证
① 中介者模式
增加一个中介者对象，让所有的相关对象都通 过中介者对象来通信，而不是互相引用。当一个对象发生改变时，只需要通知中介者对象即可。
② 外观模式
外观模式对客户提供一个简单易用的高层接口，高层接口会把客户的请求转发给子系统来完成具体的功能实现。
### 3.4 开放-封闭原则
1. 简介
软件实体(类、模块、函数)等应该是可以扩展的，但是不可修改。
2. 原则
当需要改变一个程序的功能或者给这个程序增加新功能的时候，可以使用增加代码的方式，但是不允许改动程序的源代码。
4. 实现方式
通过封装变化的方式，可以把系统中稳定不变的部分和容易变化的部分隔离开来。
(1) 利用对象多态性
利用对象的多态性来消除条件分支语句。
(2) 放置挂钩
在程序有可能发生变化的地方放置一个挂钩，挂钩的返回结果决定了程序的下一步走向。
(3) 回调函数
把一部分易于变化的逻辑封装在回调函数里，然后把回调函数当作参数传入一个稳定和封闭的函数中。
4. 设计模式验证
① 观察者模式
当有新的订阅者出现时，发布者的代码不需要进行任何修改；同样当发布者需要改变时，也不会影响到之前的订阅者。
② 模板方法模式
子类的方法种类和执行顺序都是不变的，所以我们把这部分逻辑抽出来放到父类的模板方法里面；而子类的方法具体怎么实现则是可变的，于是把这部分变化的逻辑封装到子类中。通过增加新的子类，便能给系统增加新的功能，并不需要改动抽象父类以及其他的子类。
③ 策略模式
策略模式将各种算法都封装成单独的策略类，这些策略类可以被交换使用。策略和使用策略的客户代码可以分别独立进行修改而互不影响。
④ 代理模式
图片预加载示例中，代理函数`proxyMyImage`负责图片预加载，`myImage`图片加载函数不需要任何改动。
⑤ 职责链模式
新增处理函数时，不需要改动原有的链条节点代码，只需要在链条中增加一个新的节点。
### 3.5 代码重构
1. 提炼函数
如果在函数中有一段代码可以被独立出来，那我们最好把这些代码放进另外一个独立的函数中。
```
var getUserInfo = function () {
  ajax('http:// xxx.com/userInfo', function (data) {
    console.log('userId: ' + data.userId);
    console.log('userName: ' + data.userName);
    console.log('nickName: ' + data.nickName);
  })
}

//改成
var getUserInfo = function () {
  ajax('http:// xxx.com/userInfo', function (data) {
    printDetails(data);
  });
};
var printDetails = function (data) {
  console.log('userId: ' + data.userId);
  console.log('userName: ' + data.userName);
  console.log('nickName: ' + data.nickName);
};
```
2. 合并重复的条件片段
如果一个函数体内有一些条件分支语句，而这些条件分支语句内部散布了一些重复的代码，那么就有必要进行合并去重工作。
```
var paging = function (currPage) {
  if (currPage <= 0) {
    currPage = 0;
    jump(currPage); // 跳转 
  } else if (currPage >= totalPage) {
    currPage = totalPage;
    jump(currPage);
  } else {
    jump(currPage);
  }
};

//改成
var paging = function (currPage) {
  if (currPage <= 0) {
    currPage = 0;
  } else if (currPage >= totalPage) {
    currPage = totalPage;
  }
  jump(currPage); // 把 jump 函数独立出来 
};
```
3. 把条件分支语句提炼成函数
在程序设计中，复杂的条件分支语句是导致程序难以阅读和理解的重要原因，而且容易导致一个庞大的函数。
```
var getPrice = function (price) {
  var date = new Date();
  if (date.getMonth() >= 6 && date.getMonth() <= 9) {
    return price * 0.8;
  }
  return price;
};

//改成
var isSummer = function () {
  var date = new Date();
  return date.getMonth() >= 6 && date.getMonth() <= 9;
};
var getPrice = function (price) {
  if (isSummer()) { // 夏天
    return price * 0.8;
  }
  return price;
};
```
4. 合理使用循环
在函数体内，如果有些代码实际上负责的是一些重复性的工作，那么合理利用循环不仅可以 完成同样的功能，还可以使代码量更少。
```
var createXHR = function () {
  var xhr;
  try {
    xhr = new ActiveXObject('MSXML2.XMLHttp.6.0');
  } catch (e) {
    try {
      xhr = new ActiveXObject('MSXML2.XMLHttp.3.0');
    } catch (e) {
      xhr = new ActiveXObject('MSXML2.XMLHttp');
    }
  }
  return xhr;
};
var xhr = createXHR();

//改成
var createXHR = function () {
  var versions = ['MSXML2.XMLHttp.6.0ddd', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
  for (var i = 0, version; version = versions[i++];) {
    try {
      return new ActiveXObject(version);
    } catch (e) {
    }
  }
};
var xhr = createXHR();
```
5. 提前让函数退出代替嵌套条件分支
嵌套的条件分支语句绝对是代码维护者的噩梦。嵌套的条件分支往往是由一些深信“每个函数只能有一个出口的”程序员写出的。但实际上，如果对函数的剩余部分不感兴趣，那就应该立即退出。
```
var del = function (obj) {
  var ret;
  if (!obj.isReadOnly) { // 不为只读的才能被删除
    if (obj.isFolder) { // 如果是文件夹
      ret = deleteFolder(obj);
    } else if (obj.isFile) {
      ret = deleteFile(obj);
    }
  }
  return ret;
};

var del = function (obj) {
  if (obj.isReadOnly) {
    return;
  }
  if (obj.isFolder) {
    return deleteFolder(obj);
  }
  if (obj.isFile) {
    return deleteFile(obj);
  }
};
```
6. 传递对象参数代替过长的参数列表
有时候一个函数有可能接收多个参数，而参数的数量越多，函数就越难理解和使用。在使用的时候，还要小心翼翼，以免少传了某个参数或者把两个参数搞反了位置。
这时我们可以把参数都放入一个对象内，不用再关心参数的数量和顺序，只要保证参数对应的 `key` 值不变就可以了。
7. 尽量减少参数数量
在实际开发中，向函数传递参数不可避免，但我们应该尽量减少函数接收的参数数量。
8. 少用三目运算符
如果条件分支逻辑简单且清晰，这无碍我们使用三目运算符；但如果条件分支逻辑非常复杂，我们最好的选择还是按部就班地编写 `if`、`else`。
9. 合理使用链式调用
经常使用`jQuery`的程序员相当习惯链式调用方法，在`JavaScript` 中，可以很容易地实现方法的链式调用，即让方法调用结束后返回对象自身。
使用链式调用的方式可以省下一些字符和中间变量，但调试时非常不方便。如果我们知道一条链中有错误出现，必须得先把这条链拆开才能加上一些调试`log`或者增加断点。
如果该链条的结构相对稳定，后期不易发生修改，那么使用链式调用无可厚非。但如果该链 条很容易发生变化，导致调试和维护困难，那么还是建议使用普通调用的形式。
10. 分解大型类
面向对象设计鼓励将行为分布在合理数量的更小对象之中。
11. 用`return`退出多重循环
假设在函数体内有一个两重循环语句，我们需要在内层循环中判断，当达到某个临界条件时退出外层的循环。我们大多数时候会引入一个控制标记变量或设置循环标记。
这两种做法无疑都让人头晕目眩，更简单的做法是在需要中止循环的时候直接退出整个方法。
如果在循环之后还有一些将被执行的代码，我们可以把循环后面的代码放到 return 后面，如果代码比较多，就应该把它们提炼成一个单独的函数。
## 4. 综合案例
### 4.1 模拟购物车
1. 案例分析
(1) 使用`jQuery`做一个模拟购物车示例。
(2) 显示购物列表、加入购物车、从购物车删除
2. 涉及到的设计模式
(1) 创建型
工厂模式、单例模式
(2) 结构型
装饰器模式、代理模式
(3) 行为型
观察者模式、状态模式、模板方法模式
3. `UML`类图
![image.png](https://upload-images.jianshu.io/upload_images/4989175-10a152f78bf7ba8c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 代码演示
[imooc-design-mode](https://github.com/nmwei/imooc-design-mode)
## 5. 项目应用场景总结
1. 单例模式
① `mainboard`为单例，是否可以不声明为类，直接字面量对象。
② 利用装饰器模式，给类添加管理单例的方法，与创建对象的方法分离。
③ 现有通过`this._groupsMap`缓存的方式使用单例模式替换。
2. 装饰器模式
①  `app`监控功能
②  `titleWidgetModel`装饰类
3. 代理模式
② `BaseLayout/utils.js`中的`createZoomSelectComponent`方法使用缓存代理。
4. 职责链模式
① `BaseLayout/utils.js`中的`createZoomSelectComponent`方法使用职责链模式和缓存代理。
5. 组合模式
① 布局与组件的关系可以使用组合模式。**先创建整个表单的树结构**，再逐层遍历，而不是生成单层布局-控件结构。
6. 策略模式
① 参数面板两种动画。
② 目录跳转`cpt/frm`。
7. 状态模式
① 可放大组件的放大状态。
② 可选中组件的选中状态。
③ 参数面板展示隐藏状态。
## 参考资料
* [Javascript 设计模式系统讲解与应用](https://coding.imooc.com/class/chapter/255.html)
* 《JavaScript设计模式与开发实践》(曾探)
