`web` 的性能一定程度上影响了用户留存率，`Google DoubleClick`研究表明：如果一个移动端页面加载时长超过 `3` 秒，用户就会放弃而离开。`BBC` 发现网页加载时长每增加 `1` 秒，用户就会流失 `10%`。
## 一. 监控指标
`Chrome`团队提出了一种 `RAIL` 模型来衡量应用性能，即： `Response`(响应)、`Animation`(动画)、`Idle`(浏览器空置状态)和 `Load`(加载)。如果在每个模块，都可以达到性能优化的目标值，那么最终用户感受到的将会是极致的体验。
1. `Response`(响应) - `100ms`
如果用户点击了一个按钮，你需要保证在用户察觉出延迟之前就得到反馈。我们需要：
(1) 在首次收到输入时，在100毫秒内得到回应。
(2) 如果最终结果还需要花更长的时间得到，那也要给用户一个“加载中”的标识，或是颜色的变更，告诉用户“本产品已经接收到了指令，还在处理中”，不至于让用户自我怀疑。
2. `Animation`(动画) - `16ms`
动画包含了以下概念：视觉动画、滚动、拖拽等。
合理地动画，每一帧动画要在`16`毫秒内完成，才能达到`60FPS`（`1000ms/60 ~= 16.6 ms`）
3. `Idle`(浏览器空置状态) - `50ms`
浏览器空闲的时候再处理耗时任务。合理地应用浏览器空闲时间，最好把时间以 `50` 毫秒为单位分组。因为应用应该在 `100` 毫秒内给出响应，不应该出现一个模板渲染`2` 秒之久。
备注：`Optimistic UI`
4. `Load`(加载) - `1s`
我们需要把最需要传达的内容在`1` 秒内渲染出来。我们要优先考虑关键渲染路径，将所有不需要在加载时处理的任务延迟到浏览器空闲时再处理。
## 二. Performance
浏览器提供的`performance api`是性能监控数据的主要来源。`performance` 提供高精度的时间戳，精度可达纳秒级别，且不会随操作系统时间设置的影响。目前主流浏览器都支持。
1. `performance.timing`对象
`performance`对象的`timing`属性指向一个对象，它包含了各种与浏览器性能有关的时间数据，提供浏览器处理网页各个阶段的耗时。
![image.png](https://upload-images.jianshu.io/upload_images/4989175-53a05a806402148f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```javascript
connectEnd: 1588117852573
connectStart: 1588117852492
domComplete: 1588117854411
domContentLoadedEventEnd: 1588117853956
domContentLoadedEventStart: 1588117853955
domInteractive: 1588117853955
domLoading: 1588117852694
domainLookupEnd: 1588117852492
domainLookupStart: 1588117852150
fetchStart: 1588117852137
loadEventEnd: 1588117854441
loadEventStart: 1588117854411
navigationStart: 1588117852120
redirectEnd: 0
redirectStart: 0
requestStart: 1588117852573
responseEnd: 1588117852670
responseStart: 1588117852667
secureConnectionStart: 1588117852505
unloadEventEnd: 1588117852680
unloadEventStart: 1588117852678
```
`navigationStart`：当前浏览器窗口的前一个网页关闭，发生`unload`事件时的`Unix`毫秒时间戳。如果没有前一个网页，则等于`fetchStart`属性。
`unloadEventStart`：如果前一个网页与当前网页属于同一个域名，则返回前一个网页的`unload`事件发生时的`Unix`毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为`0`。
`unloadEventEnd`：如果前一个网页与当前网页属于同一个域名，则返回前一个网页`unload`事件的回调函数结束时的`Unix`毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为`0`。
`redirectStart`：返回第一个`HTTP`跳转开始时的`Unix`毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为`0`。
`redirectEnd`：返回最后一个`HTTP`跳转结束时（即跳转回应的最后一个字节接受完成时）的`Unix`毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为`0`。
`fetchStart`：返回浏览器准备使用HTTP请求读取文档时的`Unix`毫秒时间戳。该事件在网页查询本地缓存之前发生。
`domainLookupStart`：返回域名查询开始时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于`fetchStart`属性的值。
`domainLookupEnd`：返回域名查询结束时的`Unix`毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于`fetchStart`属性的值。
`connectStart`：返回`HTTP`请求开始向服务器发送时的`Unix`毫秒时间戳。如果使用持久连接（`persistent connection`），则返回值等同于`fetchStart`属性的值。
`connectEnd`：返回浏览器与服务器之间的连接建立时的`Unix`毫秒时间戳。如果建立的是持久连接，则返回值等同于`fetchStart`属性的值。连接建立指的是所有握手和认证过程全部结束。
`secureConnectionStart`：返回浏览器与服务器开始安全链接的握手时的`Unix`毫秒时间戳。如果当前网页不要求安全连接，则返回0。
`requestStart`：返回浏览器向服务器发出`HTTP`请求时（或开始读取本地缓存时）`的Unix`毫秒时间戳。
`responseStart`：返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的`Unix`毫秒时间戳。
`responseEnd`：返回浏览器从服务器收到（或从本地缓存读取）最后一个字节时（如果在此之前`HTTP`连接已经关闭，则返回关闭时）的`Unix`毫秒时间戳。
`domLoading`：返回当前网页`DOM`结构开始解析时（即`Document.readyState`属性变为  `“loading” ` 、相应的`readystatechange`事件触发时）的`Unix`毫秒时间戳。
`domInteractive`：返回当前网页`DOM`结构结束解析、开始加载内嵌资源时（即`Document.readyState`属性变为`“interactive”`、相应的readystatechange事件触发时）的`Unix`毫秒时间戳。
`domContentLoadedEventStart`：返回当前网页`DOMContentLoaded`事件发生时（即`DOM`结构解析完毕、所有脚本开始运行时）的`Unix`毫秒时间戳。
`domContentLoadedEventEnd`：返回当前网页所有需要执行的脚本执行完成时的`Unix`毫秒时间戳。
`domComplete`：返回当前网页`DOM`结构生成时（即`Document.readyState`属性变为`“complete”`，以及相应的`readystatechange`事件发生时）的`Unix`毫秒时间戳。
`loadEventStart`：返回当前网页`load`事件的回调函数开始时的`Unix`毫秒时间戳。如果该事件还没有发生，返回`0`。
`loadEventEnd`：返回当前网页`load`事件的回调函数运行结束时的`Unix`毫秒时间戳。如果该事件还没有发生，返回`0`。
根据上面这些属性，可以计算出网页加载各个阶段的耗时。比如，网页加载整个过程的耗时的计算方法如下：
```
var t = performance.timing; 
var pageLoadTime = t.loadEventEnd - t.navigationStart;
```
重定向次数：`performance.navigation.redirectCount`
重定向耗时: `redirectEnd - redirectStart`
`DNS` 解析耗时: `domainLookupEnd - domainLookupStart`
`TCP` 连接耗时: `connectEnd - connectStart`
`SSL` 安全连接耗时: `connectEnd - secureConnectionStart`
网络请求耗时 `(TTFB)`: `responseStart - requestStart`
数据传输耗时: `responseEnd - responseStart`
`DOM` 解析耗时: `domInteractive - responseEnd`
资源加载耗时:`loadEventStart - domContentLoadedEventEnd`
首包时间: `responseStart - domainLookupStart`
白屏时间: `responseEnd - fetchStart`
首次可交互时间: `domInteractive - fetchStart`
DOM Ready 时间: `domContentLoadEventEnd - fetchStart`
页面完全加载时间: `loadEventStart - fetchStart`
http 头部大小： `transferSize - encodedBodySize`
2. `performance.now()`
返回当前网页自从`performance.timing.navigationStart`到当前时间之间的毫秒数。
```
performance.now()
//61919.05499999848
Date.now() - (performance.timing.navigationStart + performance.now())
//-0.965087890625
```
`performance.timing.navigationStart`加上`performance.now()`，近似等于`Date.now()`。但是，由于`performance.now()`带有小数，因此精度更高。
通过两次调用`performance.now()`方法，可以得到间隔的准确时间，用来衡量某种操作的耗时。
```
var start = performance.now();
for(let i = 0; i < 1000; i++) {}
var end = performance.now();

console.log('耗时：' + (end - start) + '毫秒。');
//耗时：0.029999995604157448毫秒。
```
3. `performance.mark()`
`mark`方法用于为相应的视点做标记。
```
window.performance.mark('mark1');
window.performance.mark('mark2');
window.performance.getEntriesByType('mark');
```
`clearMarks`方法用于清除标记，如果不加参数，就表示清除所有标记。
```
window.peformance.clearMarks('mark1');
window.performance.clearMarks();
```
4. `performance.getEntries()`
浏览器获取网页时，会对网页中每一个对象（脚本文件、样式表、图片文件等等）发出一个`HTTP`请求。`performance.getEntries`方法以数组形式，返回这些请求的时间统计信息，有多少个请求，返回数组就会有多少个成员。
```
window.performance.getEntries()[0].duration
// 1567.8199999965727
```
5. `performance.navigation`对象
除了时间信息，`performance`还可以提供一些用户行为信息，主要都存放在`performance.navigation`对象上面。
```
PerformanceNavigation {type: 1, redirectCount: 0}
```
(1) `performance.navigation.type`
该属性返回一个整数值，表示网页的加载来源，可能有以下`4`种情况：
`0`：网页通过点击链接、地址栏输入、表单提交、脚本操作等方式加载，相当于常数`performance.navigation.TYPE_NAVIGATENEXT`。
`1`：网页通过“重新加载”按钮或者`location.reload()`方法加载，相当于常数`performance.navigation.TYPE_RELOAD`。
`2`：网页通过“前进”或“后退”按钮加载，相当于常数`performance.navigation.TYPE_BACK_FORWARD`。
`255`：任何其他来源的加载，相当于常数`performance.navigation.TYPE_UNDEFINED`。
(2) `performance.navigation.redirectCount`
该属性表示当前网页经过了多少次重定向跳转。
6. `performance.memory`
描述内存多少，是在`Chrome`中添加的一个非标准属性。
```javascript
jsHeapSizeLimit: 2172649472
totalJSHeapSize: 47238861
usedJSHeapSize: 42139525
```
`jsHeapSizeLimit`: 内存大小限制
`totalJSHeapSize`: 可使用的内存
`usedJSHeapSize`: `JS`对象(包括`V8`引擎内部对象)占用的内存，不能大于`totalJSHeapSize`，如果大于，有可能出现了内存泄漏
7. `Chrome Devtools Performance`
https://segmentfault.com/a/1190000011516068
![image.png](https://upload-images.jianshu.io/upload_images/4989175-0416b7b0aba9c588.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 三. React Profile
1. 开启高亮更新
![image.png](https://upload-images.jianshu.io/upload_images/4989175-2fb15c64bac23271.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 查看性能数据
![image.png](https://upload-images.jianshu.io/upload_images/4989175-9ce818caf5823f3a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
从概念上讲，`React` 分两个阶段工作：
(1) `render`(渲染)阶段，确定需要对`DOM`进行哪些更改。在此阶段，`React`调用 `render` 方法，然后将结果与之前的渲染进行比较。
(2) `commit`(提交)阶段，是 `React` 做出任何更新的阶段。(对于 `React DOM` 来时，这是`React`插入，更新和删除`DOM`节点的时候。) `React` 也在这个阶段调用 `componentDidMount` 和 `componentDidUpdate` 等生命周期函数。
`DevTools Profiler`(分析器) 根据 `commits`(提交) 对性能信息进行分组。`commits`(提交) 显示在靠近 `Profiler`(分析器) 顶部的条形图中。
每个条形图的颜色和高度对应于 `commit`(提交) 渲染所需的时间 （较高的黄色竖条比较短的蓝色竖条耗时更长）。
3. 过滤`commits`
![image.png](https://upload-images.jianshu.io/upload_images/4989175-5a4fad55fed1da08.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 火焰图表（`Flame chart`）
火焰图表视图表示特定 `commits`(提交) 对应的应用的状态。 图表中的每个横条代表一个 `React` 组件（例如 `App` ，`Nav` ）。 横条的大小和颜色表示渲染组件及其子组件所需的时间。 （横条的宽度表示组件上次渲染时花费的时间，颜色表示当前 `commits`(提交) 部分所花费的时间。）
![image.png](https://upload-images.jianshu.io/upload_images/4989175-5b614359f1db81f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
可以通过单击组件放大或缩小火焰图。
5. 排序图表（`Ranked chart`）
排序图视图表示单个 `commit` 。 图表中的每个横条代表一个 `React` 组件。 对图表进行排序，以便渲染时间最长的组件位于顶部。
![image.png](https://upload-images.jianshu.io/upload_images/4989175-5b21aae57f9a2a75.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 四. 监控工具
### 合成监控
1. `Lighthouse`
(1) `chrome`运行
`Lighthouse`是直接集成到`chrome`开发者工具中的，位于`Audits`面板下
![image.png](https://upload-images.jianshu.io/upload_images/4989175-ab6116f30ddc0e9a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/4989175-7870b7d871109e4a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(2) 本地运行
```
~ npm i -g lighthouse
~ lighthouse http://secure.finedevelop.com:65081/webroot/decision/url/mobile
```
2. `PageSpeed`
https://developers.google.com/speed/pagespeed/insights/
![image.png](https://upload-images.jianshu.io/upload_images/4989175-d18734d173ca1502.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/440)
3. `WebPageTest`
https://www.webpagetest.org/
![image.png](https://upload-images.jianshu.io/upload_images/4989175-6215fc69c9f9f368.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/4989175-ffc5e3ce3ccc261c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
注释：关注`Start Render`、`First Contentful Paint`、`Speed Index`等性能指标。
### 真实用户监控
## 参考资料
[如何进行 web 性能监控？](http://www.alloyteam.com/2020/01/14184/ "如何进行 web 性能监控？")
[RAIL，以用户为核心的性能模型](https://zhuanlan.zhihu.com/p/20276064)
[Performance API](https://javascript.ruanyifeng.com/bom/performance.html)
[全新Chrome Devtools Performance使用指南](https://segmentfault.com/a/1190000011516068)
[React性能测量和分析](https://juejin.im/post/5d06bf0a51882528194a9736#react-devtool-%E7%9A%84-interactions)
