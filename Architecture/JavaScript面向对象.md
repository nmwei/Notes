`JavaScript`没有提供传统面向对象语言中的类式继承，而是通过原型委托的方式来实现对象与对象之间的继承。`JavaScript`也没有在语言层面提供对抽象类和接口的支持。
##1 封装
封装的目的在于将信息隐藏。广义的封装不仅包括**封装数据**和**封装实现**，还包括**封装类型**和**封装变化**。
### 1.1 封装数据
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
### 1.2 封装实现
1. 封装实现细节使对象内部的变化对其他对象而言是透明的，即不可见的。
2. 封装实现细节使对象之间的耦合变松散，对象之间只通过暴露的`API`接口来通讯。当我们修改一个对象时，可以随意修改它的内部实现。
3. 封装实现细节的例子有很多。例如：迭代器`each`函数。
### 1.3 封装类型
1. 对于静态类型语言，封装类型是通过抽象类和接口来进行的。将对象的真正类型隐藏在抽象类或者接口之后。
2. `JavaScript`是一门类型模糊语言。在封装类型方面，`JavaScript`没有能力，也没有必要做得更多。
3. 对于`JavaScript`设计模式实现来说，不区分类型是一种失色，也可以说是一种解脱。
### 1.4 封装变化
1. 考虑你的设计中哪些地方可能变化，找到并封装，这是许多设计模式的主题。
2. 设计模式被划分为创建型模式、结构型模式以及行为型模式。其中，创建型模式的目的就是封装**创建对象的变化**，结构型模式封装的是**对象之间的组合关系**，行为型模式封装的是**对象的行为变化**。
3. 通过封装变化的方式，把系统中稳定不变的部分和容易变化的部分隔离开来，在系统的演变过程中，我们只需要替换那些容易变化的部分，如果这些部分是已经封装好的，替换起来也相对容易。这可以最大限度的保证程序的稳定性和可扩展性。
## 2 继承
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
## 3 多态
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
## 4 UML类图
1. 类图
![类图](https://upload-images.jianshu.io/upload_images/4989175-ee0d597bdae8919d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
1. 类与类之间的关系
(1) 泛化表示继承，用空心箭头表示。
(2) 关联表示引用，用实心箭头表示。
![类与类关系图](https://upload-images.jianshu.io/upload_images/4989175-91189d48b23bceaa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 5 案例
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
注意：① 引用指的是一个类持有另一个类，而不是一个类的方法以另一个类为参数。 ② 类与类之间应该尽量减少耦合(最少知识原则)，能够通过将另一个类作为参数实现，就不要持有另一个类。
## 参考资料
* [Javascript 设计模式系统讲解与应用](https://coding.imooc.com/class/chapter/255.html)
* 《JavaScript设计模式与开发实践》(曾探)
