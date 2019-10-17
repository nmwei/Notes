## 几个问题
1. 一个弹性布局可以由哪几方面决定？
2. `flex`布局在`web`端与`react-native`端表现一样吗？ 
3. `react-native`中的`flex:1`样式的含义？
## 1. 简介
`2009`年，`W3C`提出了一种新的方案——`Flex`布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了几乎所有浏览器的支持，成为未来布局的首选方案。
## 2. 基本概念
1. `Flex`是`Flexible Box`的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为`Flex`布局。设为`Flex`布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。
2. `用Flex`布局的元素，称为`Flex`容器（`flex container`），简称"容器"。它的所有子元素自动成为容器成员，称为`Flex`项目（`flex item`），简称"项目"。
3. 容器默认存在两根轴：水平的主轴（`main axis`）和垂直的交叉轴（`cross axis`）。项目默认沿主轴排列。
>**`Flex`布局关键因素: ①主轴与交叉轴方向; ②两个方向对齐方式; ③两个方向伸缩情况;④是否换行。**

## 3. 容器属性
### 3.1 7个容器属性
1. 容器属性表

| 属性| 含义|
|-----|------|
| `display: flex` | 定义flex布局 |
| `flex-direction`|定义主轴与交叉轴方向|
|`flex-wrap`|定义主轴方向是否换行|
|`flex-flow`|定义主轴与交叉轴方向、是否换行	|
|`justify-content`|定义项目在主轴方向对齐方式|
|`align-items`|定义项目在交叉轴方向**对齐方式及伸缩情况**|
|`align-content`|定义多根轴线在交叉轴方向的对齐方式|
2. 常用属性
`flex-direction`、`justify-content`、`align-items`
### 3.2 display: flex属性
1. 设置`flex`布局
(1) `Web`端视图
 ![Web端视图](https://upload-images.jianshu.io/upload_images/4989175-1c2b18192edb1636.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/380)
(2) `RN`端视图
 ![RN端视图](https://upload-images.jianshu.io/upload_images/4989175-638dede4f41729f4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/108)
2. `RN`端与`Web`端差异
(1) `Web`端
需要设置`display: flex`
主轴方向默认水平向右。
(2) `RN`端
元素的`display`属性取值为`flex`和`none`，默认为`flex`。
主轴方向默认竖直向下。	
### 3.3 flex-direction属性
1. 定义主轴与交叉轴方向
`flex-direction: row | row-reverse | column | column-reverse;`
 ①`row`（默认值）主轴方向水平向右，交叉轴方向竖直向下。
②`row-reverse`	主轴方向水平向左，交叉轴方向竖直向下。
③`column`	主轴方向竖直向下，交叉轴方向水平向右。
④`column-reverse` 主轴方向竖直向上，交叉轴方向水平向右。
2.`RN`端与`Web`端差异
`RN`端默认值为`column`。
### 3.4 flex-wrap属性
1. 定义主轴方向是否换行
`flex-wrap: nowrap | wrap | wrap-reverse;`
①`nowrap`（默认）不换行。
②`wrap` 换行，第一行在上方。
③`wrap-reverse` 换行，第一行在下方。
3. `RN`端与`Web`端差异
`RN`端属性取值没有`wrap-reverse`。
### 3.5 flex-flow属性
1. 定义主轴与交叉轴方向、是否换行
`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。
2. `RN`端与`Web`端差异
`RN`端不支持此属性。
### 3.6 justify-content属性
1. 定义项目在主轴方向对齐方式
`justify-content: flex-start | flex-end | center | space-between | space-around;`
①`flex-start`（默认值）向主轴起点方向对齐	
②`flex-end` 向主轴终点方向对齐
③`center` 向主轴中点方向对齐
④`space-between`	 两端对齐，间隔相等
⑤`space-around` 两侧间隔相等，项目间隔是项目与边框间隔的2倍
2. 此属性`RN`端与`Web`端无差异
### 3.7 align-items属性
1. 定义项目在交叉轴方向对齐方式及伸缩情况
 `align-items: flex-start | flex-end | center | baseline | stretch;`
①`flex-start`	向交叉轴起点方向对齐
②`flex-end`	向交叉轴终点方向对齐
③`center`	向交叉轴中点方向对齐
④`baseline`	项目的第一行文字的基线对齐
⑤`stretch`（默认值）如果项目未设置高度或设为auto，将占满整个容器的高度
注释: `stretch`为默认属性值，即项目在交叉轴方向若未设置尺寸，则占满容器尺寸；若已设置尺寸，则等于设置尺寸，既不可被拉伸又不可被压缩。
当`align-items`属性为其他属性值时，无论项目在交叉轴方向是否设置尺寸，都以自身尺寸为准，既不可被压缩，又不可被拉伸。
2. `RN`端与`Web`端差异
`RN`端`baseline`属性值的表现为项目底边对齐。
### 3.8 align-content属性
1.	定义多根轴线在交叉轴方向的宽度及对齐方式
`align-content: flex-start | flex-end | center | space-between | space-around | stretch;`
①`flex-start`	与交叉轴的起点对齐。
②`flex-end`	与交叉轴的终点对齐。
③`center`	与交叉轴的中点对齐。
④`space-between`	与交叉轴两端对齐，轴线之间的间隔平均分布
⑤`space-around` 每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
⑥`stretch`（默认值）轴线占满整个交叉轴。
注释: 无论项目轴线有一根或多根时，`align-items`属性都生效。只有当项目轴线有多根时，该属性才生效。
2. `RN`端与`Web`端差异
`RN`端默认属性值为`flex-start`。
## 4.项目属性
### 4.1 6个项目属性
| 属性| 含义|
|-----|------|
|`order`|定义项目在主轴方向的排列顺序|
|`flex-grow`|定义项目在主轴方向的放大比例|
|`flex-shrink`|定义项目在主轴方向的缩小比例|
|`flex-basis`|定义在分配多余空间之前，项目占据的主轴空间|
|`flex`|	定义项目在主轴方向的伸缩情况|
|`align-self`|定义单个项目在交叉轴方向的对齐方式及伸缩情况|
### 4.2 order属性
1. 定义项目在主轴方向的排列顺序
`order: <integer>;`
注释:数值越小，排列越靠前，默认为`0`。
2. `RN`端与`Web`端差异
`RN`端不支持`order`属性。
### 4.3 flex-grow属性
1. 定义项目在主轴方向的放大比例
`flex-grow: <number>;`
注释:①默认为`0`, 即如果存在剩余空间，也不放大。②如果所有项目的`flex-grow`属性都为`1`，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为`1`，则前者占据的剩余空间将比其他项多一倍。即: `放大宽度 = 弹性宽度 * (flex-grow/sum(flex-grow)) `
注意: 剩余空间的分配比例只与`flex-grow`的属性值有关，与各个项目的初始尺寸无关。
2. 此属性`RN`端与`Web`端无差异
### 4.4 flex-shrink属性
1. 定义项目在主轴方向的缩小比例
`flex-shrink: <number>;`
注释: ①默认为`1`，即如果空间不足，该项目将缩小。②如果所有项目的`flex-shrink`属性都为`1`，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为`0`，其他项目都为`1`，则空间不足时，前者不缩小。
2.`RN`端与`Web`端差异
`RN`端默认属性值为`0`，当空间不足时，项目不缩小。
总结:`Web`端默认不放大但缩小，RN端默认不放大且不缩小。
### 4.5 flex-basis属性
1. 定义在分配多余空间之前，项目占据的主轴空间
`flex-basis: <length> | auto;`
注释:①浏览器在该属性值的基础上进行缩放。②默认值为`auto`，即项目的本来大小。③可以设置为与`width`或`height`属性一样的值。
2. 此属性`RN`端与`Web`端无差异
### 4.6 flex属性
1. `flex`属性是`flex-grow`, `flex-shrink`和`flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。
快捷值：`auto (1 1 auto)`、`none (0 0 auto)`。
注释:①`auto`为常用属性值，即项目在主轴方向可伸缩。②外边距不可伸缩。
②可设置某个项目的宽度为固定百分比，其余项目平均分配剩余空间。
`.item{flex:auto}`  `.item1{flex:0 0 60%}`
③可设置某个项目的宽度为固定像素，其余项目平均分配剩余空间。
`.item{flex:auto}`	`.item1{flex:0 0 100px}`
2. `RN`端与`Web`端差异
(1) `flex`属性的表现与`Web`端不同，取值只能为数字。
(2) `flex`属性并不简单是`flex-grow/shrink/basis`的简化
(3) `flex`默认值为`0`，表示项目保持原始尺寸，且总是不可伸缩。
(4) 若`flex`取值为`-1`，则表示项目保持原始尺寸，但当容器尺寸不够时，缩小到`minWidth`或`minHeight`。
(5) 若`flex`取值为`n(n>=1)`，则按照`flex`值的比例分配剩余空间，剩余空间指的是容器尺寸减去`flex`值为`0`或`-1`项目的尺寸。
### 4.7 align-self属性
1. 定义单个项目在交叉轴方向的对齐方式及伸缩情况
`align-self: auto | flex-start | flex-end | center | baseline | stretch;`
注释: ①默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。②该属性可能取`6`个值，除了`auto`，其他都与`align-items`属性完全一致。
注意: 子未设置`align-self`属性，则继承父的`align-items`属性。子设置`align-self`属性，可以覆盖父的`align-items`属性。
2. 此属性`RN`端与`Web`端无差异
## 5. Flex常用属性汇总(Web端)
![web端flex布局常用属性](https://upload-images.jianshu.io/upload_images/4989175-1eaafaa1ceb77d5a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)
注释:`Flex`布局关键因素:①主轴与交叉轴方向;②两个方向对齐方式;③两个方向伸缩情况。④是否换行。
## 6.参考资料
[Flex 布局语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)
[Flex布局实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html?bsh_bid=683103006)
[Flex布局演示](http://static.vgee.cn/static/index.html)
[ReactNative/LayoutPropTypes](https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/LayoutPropTypes.js)


