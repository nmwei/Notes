## 1. transform 
1. 通过`transform`转换，我们能够对元素进行移动(`translate`)、旋转(`rotate`)、伸缩(`scale`)、翻转(`skew`)。转换是使元素改变形状、尺寸和位置的一种效果。
2. 浏览器支持
`Internet Explorer 10`、`Firefox` 以及 `Opera` 支持 `transform` 属性。`Chrome` 和 `Safari` 需要前缀 -`webkit-`。
注释：`Internet Explorer 9` 需要前缀 `-ms-`。
### 1.1 2D 转换
3. `2D`转换方法: `translate()`; `rotate()`; `scale()`; `skew()`; `matrix()`; 
4. `CSS`示例
```
div{
  transform: rotate(30deg);
  -ms-transform: rotate(30deg);	/* IE 9 */
  -webkit-transform: rotate(30deg);	/* Safari and Chrome */
  -o-transform: rotate(30deg);		/* Opera */
  -moz-transform: rotate(30deg);	/* Firefox */
}
```
5. `translate()`移动
```
transform: translate(50px,100px);  /*右移50px，下移100px*/
transform: translate(50px);  /*右移50px*/
translateX(100px);  /*右移100px*/
translateY(100px);	/*下移100px*/
```
注释:使用`translate`移动元素无需设置绝对定位。
6. `rotate()`旋转
```
transform: rotate(30deg);  /*顺时针旋转30度*/
```
注释: 2D旋转即为3D旋转中的绕Z轴旋转`transform:rotateZ(30deg)`。
7. `scale()`伸缩
```
transform:scale(2);	/*宽度和高度都放大2倍*/
transform:scale(1,2); /*高度放大2倍*/
transform:scaleX(2); /*宽度放大2倍*/
transform:scaleY(2); /*高度放大2被*/
```
8. `skew()`翻转 
```
transform:skew(30deg); /*以X轴为轴翻转30度*/
transform:skew(30deg,20deg); /*以X轴为轴翻转30度，以Y轴为轴翻转20度*/
transform:skewX(30deg); /*以X轴为轴翻转30度*/
transform:skewY(30deg);  /*以Y轴为轴翻转30度*/
```
9. `transform-origin`被转换元素的基准位置 
```
transform-origin:center;	/*中心点作为基准位置(默认)*/
transform-origin:left;	/*左边中点作为基准位置*/
transform-origin:top;	/*上边中点作为基准位置*/
transform-origin:right;	/*右边中点作为基准位置*/
transform-origin:bottom;	/*底边中点作为基准位置*/
transform-origin:left top;	/*左上端点作为基准位置*/
transform-origin:right top; /*右上端点作为基准位置*/
transform-origin:right bottom;	/*右下端点作为基准位置*/
transform-origin:left bottom; /*左下端点作为基准位置*/
transform-origin:200px 100px; (200px,100px)/*相对坐标作为基准位置*/
```
10. [matrix(n,n,n,n,n,n)](http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-矩阵/comment-page-2/) 
定义 2D 转换，使用六个值的矩阵。
### 1.2 3D 转换
1. `3D`转换可以实现元素在`X`轴、`Y`轴、`Z`轴方向上的移动、旋转、伸缩、以及翻转处理。
注释：[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)
2. `translate()`移动
```
transform:translateX(50px);
transform:translateY(100px);
transform:translateZ(20px);
/* 第二种写法 */
transform:translateX(50px) translateY(100px) translateZ(20px);
```
3. `rotate()`旋转
```
 transform:rotateX(45deg);
 transform:rotateY(45deg);
 transform:rotateZ(45deg);
 /* 第二种写法 */
 transform:rotateX(45deg) rotateY(45deg) rotateZ(45deg);
```
4. `scale()`伸缩
```
transform:scaleX(0.5);
transform:scaleY(1);
transform:scaleZ(2);
/* 第二种写法 */
transform:scaleX(0.5) scaleY(1) scaleZ(2);
```
5. `skew()`翻转
```
transform:skewX(45deg);
transform:skewY(45deg);   
```     
注意:和`2D`效果类似，翻转只有两个方向。
## 2. transition
1. `CSS3`中的动画分为`animation`功能与`transition`功能，这两种功能都可以通过改变`CSS`中的属性值来产生动画效果。
(1) `animation`功能支持通过关键帧的指定在页面上产生复杂的动画效果。
(2) `transition`功能支持从一个属性值平滑过渡到另一个属性值。
注释：`animation`支持关键帧(中间状态)的设定；支持动画暂停效果；支持延迟时间与动画结束后的状态设定。`transition`不支持中间状态的设定。不支持动画暂停效果。不支持延迟时间与动画结束后的状态设定。
2. 语法
`transition:属性名称 过渡时间 速度曲线 延迟时间
  ,属性名称 过渡时间 速度曲线 延迟时间`
属性名称：默认值(`all`) 、`width`
过渡时间：默认值(`0`)、`3s`、`2000ms`
速度曲线：默认值(`ease`)(慢-快-慢) 、`linear`(匀速)、`ease-in`(慢-块) 、`ease-out`(快-慢)
延迟时间：默认值(`0`)、`3s`、`2000ms`
注释:过渡时间不可省略，其余都可省略。
3. 应用于单项属性的过渡效果
```
div{
  transition: width 2s;
  -moz-transition: width 2s;	/* Firefox 4 */
  -webkit-transition: width 2s;	/* Safari 和 Chrome */
  -o-transition: width 2s;	/* Opera */
}
div:hover{
  width: 300px;
}
```
4. 应用于多项属性的过渡效果
如需添加多个样式的过渡效果，则用逗号隔开。
```
div{
  transition: width 2s, height 3s, transform 5s;
}
```
5. 应用于所有属性的过渡效果
```
div{
  transition: 2s;
}
```
注释:默认值为`all`。  
## 3. animation与@keyframes
1. `transition`实现动画时只能指定要改变的**属性**的**开始值**和**结束值**，然后在这两个值之间进行**平滑过渡**的方式来实现动画效果，不能实现比较复杂的动画效果；而`animation`通过定义多个关键帧(`@keyframes`)以及定义每个关键帧中元素的属性值来实现更为复杂的动画效果。
2. `@keyframes`规则用于创建动画。在 `@keyframes` 中规定某项 `CSS` 样式，就能创建由当前样式逐渐改为新定义样式的动画效果。
3. `@keyframe`语法
`@keyframe 关键帧集合的名称{创建关键帧的代码}`
4. `animation`功能的使用方法
`animation:动画名称 动画时间 速度曲线 延迟时间 
  执行次数 执行方向 是否暂停  其它状态`
动画名称：关键帧集合的名称
动画时间：默认值(`0`)、`3s` 、`2000ms`
速度曲线：默认值(`ease`)(慢-快-慢) 、`linear`(匀速)、`ease-in`(慢-块)、`ease-out`(快-慢)
延迟时间：默认值(`0`)、`3s` 、`2000ms`、`-2s`(立即执行，跳过2秒)
执行次数：默认值(`1`) 、`5`、`infinite`(无限次播放)
执行方向：默认值(`normal`)(每次动画执行完毕后返回初始状态) 、`alternate`(正反交替轮流播放)、`reverse`(反向执行动画)、`alternate-reverse`(反向开始交替轮流播放)
是否暂停：默认值(`running`)(动画正在播放)、`paused`(动画已暂停)。
其它状态：默认值(`none`)(不改变默认行为)、`forwards`（当动画完成后，保持最后一个属性值）、`backwards`(在 `animation-delay` 所指定的一段时间内，在动画显示之前，应用开始属性值)、`both`(向前和向后填充模式都被应用)。
注释: 动画名称与动画时间不可省略，其余都可省略。
5. 简单示例
```
#tc{animation:zh 4s;}
@keyframes zh{
	0%{height: 150px;width: 150px;background-color:pink;}
	25%{height: 200px;width: 200px;background-color:green;}
	50%{height: 100px;width: 100px;background-color:yellow;}
	70%{height: 400px;width: 400px;background-color:blue;}
	100%{height: 500px;width: 500px;background-color:pink;}
}
```
注释:为了得到最佳的浏览器支持，应始终定义`0%`和 `100%`选择器。
6. 暂停动画
`animation-play-state: paused|running;`
`plused`：定义动画暂停
`running`：定义动画播放
```
tc.onmouseover=function(){
   this.style.animationPlayState='paused';
};
tc.onmouseout=function(){
  this.style.animationPlayState='running';
}
```
7. 动画起始终止状态
`animation-fill-mode : none | forwards | backwards | both;`
`none`：默认值(以初始状态作为起始终止状态)
`forwards`：以`100%`时的属性值作为动画终止状态
`backwards`：以`0%`时的属性值作为延迟时间内的状态
`both`：`forwards`与`backwards`模式都将生效
注释:`animation-fill-mode`属性必须定义在`animation`属性之后才会生效。
## 4. 总结
1. `transform`
`CSS3`中的变形处理，实现文字和图像的移动、旋转、伸缩、翻转等。
2. `transition`
`CSS3`中的动画功能，通过一个属性值平滑过渡到另一个属性值来实现。
3. `animation`
`CSS3`中的动画功能，通过在样式中创建多个关键帧，在这些关键帧中编写样式，并且能够在页面上综合运行这些关键帧来实现较为复杂的动画。
4. 重绘与回流
(1) 重绘
操作影响了页面的可见性，但是没有影响布局，浏览器发生重绘。
改变透明度、背景颜色、字体颜色、改变同等尺寸`img`会发生重绘。
(2) 回流
浏览器重新计算所有元素的尺寸和位置。
`CSS`样式没有放在`head`头部、删减`Dom`节点、改变`Dom`节点尺寸等会引起回流。
注释:重绘布局不变、重新绘制。回流布局改变、重新绘制。
5. 为避免回流，使用`CSS3`执行动画的元素应绝对定位(脱离文档流)。
### 参考资料
[响应式布局页面](https://imooc.nimengwei.com)
[理解CSS3 transform中的Matrix(矩阵)](http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-矩阵/comment-page-2)
[好吧，CSS3 3D transform变换，不过如此！](https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)
