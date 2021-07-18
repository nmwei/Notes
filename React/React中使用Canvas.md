
# 1. Canvas
1. `Canvas`是HTML5新增的组件，它就像一块幕布，可以用`JavaScript`在上面绘制各种图表、动画等。
只能够`js`脚本驱动是`Canvas`的特点。
2. `canvas`元素
```
<canvas id='mycanvas' width=400 height=400>
    Your browser does not support the canvas element.
</canvas>
```
* 支持`canvas`的浏览器会只渲染`canvas`标签，而忽略其中的替代内容。不支持 `canvas`的浏览器则会直接渲染替代内容。
* 说明`canvas`内部是不可以嵌套其他`dom`结构的。
3. `CanvasRenderingContext2D`对象
所有的绘图操作都需要通过这个对象完成。
![image.png](https://upload-images.jianshu.io/upload_images/4989175-19b8f4ed9f634c1c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 绘制折线路径
```
//canvas元素
var c=document.getElementById('mycanvas');
//context对象
var ctx=c.getContext('2d');
ctx.beginPath();
//①定义样式
ctx.strokeStyle='green';		//颜色
ctx.lineWidth=20;				//线宽
ctx.lineCap='square';			//端点
ctx.lineJoin='round';			//拐点
//②定义路径
ctx.moveTo(50,50);		//起点
ctx.lineTo(100,100);		//拐点
ctx.lineTo(50,200);		//终点
ctx.closePath();				//闭合
//③绘制
ctx.stroke();
```
![image.png](https://upload-images.jianshu.io/upload_images/4989175-a7d60d449766ecba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)
* `canvas`元素必须通过`width`、`height`设置宽高。重新设置`width`或`height`，画布中任何已绘对象都将被清除。
* 每一个`canvas`元素仅有一个`context`对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法和属性。
* 定义样式和定义路径(位置尺寸)的相对位置可调整，但绘制必须在定义样式和定义路径(位置尺寸)之后，否则样式和路径无法生效。
* 若未定义样式，则为默认样式；若未修改样式，则为上次样式。
5. 绘制其它路径
```
//矩形路径
//位置(50,20)，尺寸(200,200)
ctx.rect(50,20,200,200);
//③绘制
ctx.stroke();

//原型路径
//②定义位置尺寸
//中心点坐标(100,70),半径50,开始角180度，结束角0度，逆时针。
ctx.arc(100,70,50,Math.PI,0,true);
//③绘制
ctx.stroke();
```
6. 绘制笑脸
```
ctx.clearRect(0, 0, 200, 200); // 擦除(0,0)位置大小为200x200的矩形，擦除的意思是把该区域变为透明
ctx.fillStyle = '#dddddd'; // 设置颜色
ctx.fillRect(10, 10, 130, 130); // 把(10,10)位置大小为130x130的矩形涂色
// 利用Path绘制复杂路径:
var path=new Path2D();
path.arc(75, 75, 50, 0, Math.PI*2, true);
path.moveTo(110,75);
path.arc(75, 75, 35, 0, Math.PI, false);
path.moveTo(65, 65);
path.arc(60, 65, 5, 0, Math.PI*2, true);
path.moveTo(95, 65);
path.arc(90, 65, 5, 0, Math.PI*2, true);
ctx.strokeStyle = '#0000ff';
ctx.stroke(path);
```
![image.png](https://upload-images.jianshu.io/upload_images/4989175-b6dd1a5264b416f5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
7. 绘制图片
```
var img = new Image()
img.src = src
img.onload=function(){
    //剪切位置(0,0),剪切尺寸(600,600),
    //放置位置(0,0),放置尺寸(100,100);
    ctx.drawImage(img,0,0,600,600,0,0,100,100);
}
```
![image.png](https://upload-images.jianshu.io/upload_images/4989175-1f501990d7c650d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
8. `canvas`动画
```
var walk = require('../assets/1.jpg');
var img=document.createElement('img');
document.body.appendChild(img)
img.src=walk
img.onload=function(){
    var x=0;
    setInterval(function(){
        ctx.clearRect(0,0,500,500);
        ctx.drawImage(img, x,0,180,400,0,0,180,400);
        x+= 180;
        if (x>=900) {
            x=0
        };
    },100)
};
```
9. [SVG vs canvas：如何选择](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/gg193983(v=vs.85)?redirectedfrom=MSDN)

| 对比 | `Canvas` | `SVG` |
|--|--|--|
| 操作对象 | 基于像素 | 基于图形元素 |
| 元素 | 单个`HTML`元素 | 多种图形元素(`Rect`,`Path`,`Line`...) |
| 驱动 | 脚本驱动 | 支持脚本和`CSS` |
| 交互粒度 | 用户交互到像素点`(x, y)` | 用户交互到图形元素 |
| 性能 | 适合较小面积，较多的对象 | 适合较少的对象，较大的面积 |
![image.png](https://upload-images.jianshu.io/upload_images/4989175-e75612f187feafd0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 2. [react-konva](https://github.com/konvajs/react-konva)
1. `react-konva`和`react-canvas`是`github`上星星比较多的`react`相关`canvas`第三方库。由于`react-canvas`从`17`年`3`月之后就没有更新了，且不支持`react 16`，因此不再考虑。这里主要介绍`react-konva`的使用。
2. `React Konva`是一个`JavaScript`库，用于使用`React`绘制复杂的画布图形。
3. 基本概念
把整个视图看做一个舞台`stage`。而舞台中的每一层，看做`layer`。`layer`层中有许多`group`组。在`group`中绘制画图、图片等`shape `。
```
               Stage
                |
         +------+------+
         |             |
       Layer         Layer
         |             |
   +-----+-----+     Shape
   |           |
 Group       Group
   |           |
   +       +---+---+
   |       |       |
Shape   Group    Shape
           |
           +
           |
         Shape
```
4. [示例](https://codesandbox.io/s/5m3nwp787x?file=/index.js)
```
import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";

class ColoredRect extends React.Component {
  state = {
    color: "green"
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render() {
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}

class App extends Component {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try click on rect" />
          <ColoredRect />
        </Layer>
      </Stage>
    );
  }
}

render(<App />, document.getElementById("root"));
```
# 参考
[学习HTML5 Canvas这一篇文章就够了](https://blog.csdn.net/u012468376/article/details/73350998)
[Konva入门教程](https://www.cnblogs.com/imgss/p/10557824.html)




