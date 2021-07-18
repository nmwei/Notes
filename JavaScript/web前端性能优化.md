# 1. 用户体验
1. 软件是用户通往资源的通道。例如：滴滴对应司机、乘客；淘宝、天猫对应购物；饿了么、美团对应周边生活；微信、QQ对应社交分享。性能直接影响用户获取资源体验。
2. 前端性能重要性
`Amazon`发现每`100ms`延迟导致`1%`的销量损失。
谷歌地图首页文件从`100KB`减少到`70KB`，流量在第一周涨了`10%`，在接下来的三周涨了`25%`。
腾讯根据长期数据监控发现，页面一秒钟延迟会造成页面访问量下降`9.4%`，跳出率增加`8.3%`，转化率下降`3.5%`。
3. 移动端性能
持续增长的移动用户和移动业务。
用户的手指操作较为频繁，需要有更快的反馈。
用户更缺乏耐心，大于`3s`加载会导致`53%`的跳出率(`bounce rate`)。
其实，不同网络环境、不同网站页面内容、不同用户群体特征，都会影响一个用户在浏览网页时对于性能的忍耐度。
4. 提高用户体验
(1) 前端性能提升
(2) 增加用户耐心度
不确定的等待会让用户感觉时间过了很久。交互反馈越快越好，例如：`Loading`。
转移用户注意力。例如：鲁大师。
# 2. 性能指标
1. 页面加载指标
(1) `Domcontentloaded`、`Load`与`Finish`
 `Domcontentloaded`：当初始的 `HTML` 文档被完全加载和解析完成之后触发。`$.ready()`是通过此事件实现的。
`Load`：页面所有资源加载结束时间。即：`window.onload`。
`Finish`：页面所有`http`请求结束时间。
这三个指标只与资源加载和数据请求有关，并不能很好的展示真实用户体验，我很可以很简单的利用后置加载来绕过这个时间。
(2) `TTFB`(等待时间)
发出页面请求到接收到应答数据第一个字节所花费的毫秒数。
可以相对的提供`DNS`查询，服务器响应，`SSL`认证，重定向等花费时间的参考。数据请求大部分时间消耗在`TTFB`，而不是`Content Download`。
(3) `FCP`(`First Contentful Paint`) 
页面首次有内容的时间。例如：加载动画。
(4)  `Speed Index`([速度指数](https://hzxiaosheng.bitbucket.io/work/2014/06/23/how-to-measure-user-experience.html))
 显示页面的可见部分的平均时间。
即：轮询得分 = 轮询间隔(一般为`100ms`) `*` (`1.0` - 页面完成度/`100`)
2. 前端性能监测
(1) 客户端设备
不同设备的网页打开速度差别很大，测试前端性能需要考虑客户端设备类型。
```
window.navigator.userAgent
```
(2) `html`文档请求各个时间端耗时
```
var times = window.performance.timing;
console.log('DNS解析时间: ' + (times.domainLookupEnd - times.domainLookupStart));
console.log('TCP连接时间: ' + (times.connectEnd - times.connectStart));
console.log('请求等待时间: ' + (times.responseStart - times.requestStart));
console.log('文档下载时间: ' + (times.responseEnd - times.responseStart));
```
(3) 总耗时
```
var times = window.performance.timing;
var startTime = times.navigationStart || times.fetchStart;
console.log('首字节时间: ' + (times.responseStart - startTime));
console.log('Domcontentloaded时间: ' + (times.domContentLoadedEventEnd - startTime));
console.log('Load时间: '+ (times.loadEventEnd - startTime));
```
(4) 渲染相关时间
渲染相关时间最能够体现页面打开性能。遗憾的是，渲染相关时间并没有统一的`api`接口。
① `Chrome`浏览器
```
performance.getEntriesByType('paint').forEach(item => {
    console.log(item.name + ' : ' + item.startTime)
})
//first-paint : 810.2550000185147
//first-contentful-paint : 810.2550000185147
```
② 通用方法
需要自定义页面首次有内容的时间和首屏渲染结束的时机。
```
var times = window.performance.timing;
var startTime = times.navigationStart || times.fetchStart;
var FirstContentfulPaint = new Date().getTime();
var FirstScreenTime = new Date().getTime();

console.log('FCP时间: ' + (FirstContentfulPaint - startTime));
console.log('首屏渲染结束时间: ' + (FirstScreenTime - startTime)); 
```
(5) 资源加载时间
`window.performance.getEntriesByType('resource')`
3. 性能监测数据分析
性能检测数据不宜使用平均数来统计计算，因为平均数非常容易受极大值和极小值的影响。
推荐使用**中位数**来描述页面性能数据的集中趋势，然后分析数值区间。
例如：定义数值区间，“非常快”(`<1s`)、“快”(`1-3s`)、“慢”(`3-5s`)、“非常慢”(`>5s`)等区间，来观察用户访问性能快慢的分布情况。
在中位数值区间的基础上，我们可以使用`n`秒开率作为性能优化指标。
4. 交互响应指标
手势交互响应时间
帧率`FPS`
异步请求完成时间
# 3. 性能测量工具
测量性能指标 `→` 性能优化 `→` 重新测量性能指标
## 3.1 Chrome DevTools
1. 长按刷新按钮 - 清除缓存刷新
2. 打开调试面板快捷键
`Command` + `option` + `i`
3. 自定义调试面板
`Command` + `Shift` + `p`
(1) 查看页面帧数
`Show frames per second(FPS) meter`
(2) 阻塞（禁用）某些请求
`Show Request blocking`
(3) 高亮重绘
`Show Rending` - `Paint flashing`
(4) 性能持续监测
`Show Performance monitor`
(5) 显示图层
`Show Layers`
4. `Network`
![image.png](https://upload-images.jianshu.io/upload_images/4989175-968bc28255ead940.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/840)
瀑布图(`Waterfall`)中蓝色的线表示`Domcontentloaded`，紫色的线表示`Load`。`Domcontentloaded`用了`1.2s`，`Load`用了`1.2s`，`Finish`用了`3.25s`。
页面一共发了`28`个请求，资源一共`6.4MB`。天猫首页所有资源仅有`2M`。
# 4. 传输加载优化
1. 输入`url`到页面展示整个过程
(1) `DNS`解析
(2) 建立`TCP`请求连接
(3) 服务器请求处理响应
(4) 客户端下载、解析、渲染显示页面
2. `DNS`解析
浏览器解析域名，拿到对应`IP`地址之后，才能和服务器进行通信。
浏览器缓存 → 系统缓存 → 路由器缓存→`ISP DNS`缓存 → 顶级`DNS`服务器/根`DNS`服务器
在链接对应的东西出现之前就已经解析完毕，能够减少用户点击链接时的延迟。
[`DNS`预解析](https://developer.mozilla.org/zh-CN/docs/Controlling_DNS_prefetching)：`<link rel="dns-prefetch" href="http://www.spreadfirefox.com/">`
3. 资源压缩
启用`Gzip`压缩、使用`Brotli`压缩(只支持`https`)
配置`nginx`启用`Gzip`。
4. 静态资源分多域名存储
浏览器请求并发限制(`Chrome`并发`6`条)针对的是同一个域名下的资源。
可以静态资源和服务分离，分多域名存储。
5. [启用Keep Alive](https://www.cnblogs.com/skynet/archive/2010/12/11/1903347.html)
当使用普通模式，即非`Keep Alive`模式时，每个请求/应答客户和服务器都要新建一个连接，完成之后立即断开连接（`HTTP`协议为无连接的协议）。
当使用`Keep Alive`模式（又称持久连接、连接重用）时，`Keep Alive`功能使客户端到服务器端的连接持续有效，当出现对服务器的后继请求时，`Keep Alive`功能避免了建立或者重新建立连接。
`Nginx`默认开启`keep alive`、`http 1.1`中默认启用`keep alive`。
(1) `keepalive_timeout` 避免重新连接最长时间。
(2) `keepalive_requests` 避免重新连接最大请求个数。
6. `HTTP`资源缓存
(1) 强缓存
① `Cache-Control: public/private/no-cache/no-store`
`public`：表明响应可以被任何对象缓存。
`private`：响应只能被单个用户缓存，不能作为共享(代理服务器)缓存。
`no-cache`：强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)。
`no-store`：不应存储有关客户端请求或服务器响应的任何内容，即不使用任何缓存。
② `Pragma`
`Pragma:no-cache`与`Cache-Control: no-cache`相同。
`Pragma: no-cache`兼容`http 1.0`。
`Cache-Control: no-cache`是`http 1.1`提供的。
③ `Expires`
服务器端在响应请求时用来规定资源的失效时间。
优先级：`Pragma` > `Cache-Control` > `Expires`
(2) 协商缓存
① `ETag`与`If-None-Match`
使用资源的最后修改时间作为协商缓存的标识。
② `Last-Modified`与`If-Modified-Since`
使用资源在服务器端的唯一标识作为协商缓存的表示。
7. [`Service Workers`](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)
`Service workers` 本质上充当 `Web` 应用程序、浏览器与网络（可用时）之间的代理服务器。这个 `API` 旨在创建有效的**离线体验**，它会拦截网络请求并根据网络是否可用采取来适当的动作、更新来自服务器的的资源。
注意：只能在`localhost`或者`https`中使用
8. [HTTP/2](https://segmentfault.com/a/1190000016656529) 
`HTTP/2 VS HTTP 1.1`：https://http2.akamai.com/demo
(1) 基于二进制传输
`HTTP2.0`中所有加强性能的核心是二进制传输。
在`HTTP1.x`中，我们是通过文本的方式传输数据。
(2) 请求响应多路复用
一个`TCP`连接中存在多个流，即可以同时发送多个请求。
(3) `Header`压缩
有效压缩`HTTP`标头字段来最小化协议开销
(4) 服务器推送(`Server push`)
在`HTTP2.0`中，服务端可以在客户端某个请求后，主动推送其他资源。
(5) 支持请求优先级
注意：适合较高的请求量，只能在`https`中使用
9. `WebSocket`技术
`HTTP`请求是单向请求，只能由客户端发起。如果服务器有连续的状态变化，我们只能使用轮询。轮询的效率低，非常浪费资源。使用`WebSocket`，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话。
10. `CDN`
将资源缓存在`CDN`节点上，后续访问即可直接通过`CDN`节点将资源返回到客户端，不需要重新回到源站服务器。
11. 优化资源加载的顺序
浏览器默认安排资源加载优先级 - `chrome`浏览器`networt`中的`priority`
(1) `preload`
`<link rel="preload" href="%PUBLIC_URL%/2.png" as="image" />`
提前加载较晚出现，但对当前页面非常重要的资源。优先级高。
(2) `prefetch`
`<link rel="prefetch" href="https://code.jquery.com/jquery-3.5.1.slim.min.js" as="script">`
浏览器空闲的时候，提前加载以后用到的资源。优先级低。
对于当前页面很有必要的资源使用`preload`，对于可能在将来的页面中使用的资源使用`prefetch`。
参考：[使用preload、prefetch调整优先级](https://juejin.im/post/6844903473163534343)
# 5. 浏览器渲染优化
1. 浏览器渲染流程
`DOM + CSSOM` → `Render Tree` → `Layouts` → `Paint ` → `Composite`
(1) 解析`HTML`文档，生成`DOM`；解析`CSS`，生成`CSSOM`
(2) 根据生成的`DOM`和`CSSOM`构建渲染树`Render Tree`
(3) 根据渲染树，计算每个节点在屏幕的布局(位置、尺寸)信息
(4) 将渲染树绘制到屏幕上
(5) 渲染层合并
注意：布局/回流(`Layouts`)是计算每个节点的位置和大小(盒子模型)的过程，绘制/重绘(`Paint`)是像素化每个节点的过程。
2. 重绘(`Paint`)与回流(`Layouts`)
重绘和重排可能代价比较昂贵，因此最好就是可以减少它的发生次数。
(1) 批量对`DOM`进行读写操作
[FastDom](https://github.com/wilsonpage/fastdom)
```
const images = document.getElementsByTagName('img');
const update = (timestamp) => {
    for (let i = 0; i < images.length; i++) {
        fastdom.measure(() => {
            const top = images[i].offsetTop;
            fastdom.mutate(() => {
                images[i].style.width = (
                    (Math.sin(top + timestamp / 1000) + 1) * 500 + 'px'
                )
            })
        })
    }
    if(this.state.animate) {
        window.requestAnimationFrame(update);
    }
};
update();
```
参考：[你真的了解回流和重绘吗？](https://juejin.im/post/6844903734951018504)
(2) 复合线程(`compositor thread`)与图层(`layers`)
以下样式只影响复合(`Composite`)，不会导致页面重排。
`transform: translate/scale/rotate/opacity`
可以通过`willChange: 'transform'`样式将元素提出到一个单独的层中。
```
let divs = [];
for (let i = 0; i < 300; i++) {
    divs.push(
        <div key={i} style={{width: 150, height: 150, overflow: 'hidden', border: '1px solid black'}}>
            <img style={{
                width: 100,
                margin: 10,
                animation: this.state.animate ? '3s linear 1s infinite running rotate' : ''
            }} src={logo} />
        </div>
    )
}
return divs
```
资源消耗程度：`JavaScript`操作`DOM` > 复合层渲染 > 普通`DOM`渲染
参考：[无线性能优化：Composite](https://fed.taobao.org/blog/taofed/do71ct/performance-composite/)
注意： `PC`中报表块在一个单独的图层中，`tab`切换切换没有导致整个页面重绘。`H5`中的`tab`没有在一个单独的图层中，`tab`切换导致整个页面重绘。
3. `SSR`服务器端渲染
(1) 优势
加速首屏加载，更好的`SEO`。
(2) 基于[Next.js](https://www.nextjs.cn/docs)实现`SSR`
系统环境要求：[Node.js 10.13](https://nodejs.org/)或更高版本。
4. 预渲染(`Pre-rendering`)页面
(1) 预渲染作用
大型单页应用的性能瓶颈- `JS`下载、解析、执行
`SSR`的主要问题：牺牲`TTFB`来补救`First Paint`；实现复杂
预渲染：打包时提前渲染页面，没有服务端参与。
(2) ⭐️⭐️⭐️ 使用[react-snap](https://github.com/stereobooster/react-snap)
内联样式，避免样式闪动。
`"inlineCss": true`
5. `windowing`和`Lazy loading`提高列表性能
窗口化(`windowing`)的含义是只渲染窗口内元素。即，滚入渲染、滚出卸载。
`Lazy loading`的含义是滚入渲染，滚出不卸载。
由于窗口化(`windowing`)只渲染可见的行，渲染和滚动性能都会有提升。
[react-window](https://github.com/bvaughn/react-window/)可以实现窗口化(`windowing`)。
注释：尝试使用`react-window`实现表格滚动渲染。
6. 使用骨架组件减少布局移动(`Layout Shift`)
(1) `Skeleton/Placeholder`的作用
在内容被完全加载出来之前，先将页面骨架加载出来。
(2) [react-placeholder](https://github.com/buildo/react-placeholder)实现骨架组件
# 6. 代码优化
1. 同样大小的资源，`JavaScript`文件加载后解析编译要比其他资源耗长的多。
(1) `Summary`中可以看出是哪个`js`文件
(2) `Evaluate Script`为解析耗时
(3) `Compile Script` 为编译耗时
(4) 解析 → 编译 → 执行
2. `V8`优化机制
脚本流
字节码缓存
懒解析
3. `HTML`优化
减少`iframe`的使用。
压缩空白符，删除注释。
避免`DOM`节点深层次嵌套。
避免`table`布局。
注释：`iframe`会阻塞父文档的加载。
4. `CSS`优化
降低`CSS`对渲染的阻塞
利用`GPU`进行完成动画
使用`font-display`属性
⭐️⭐️⭐️ 注意：使用`contain: layout`属性
# 7. 资源优化
1. 图片优化方案
(1) [gif、jpg、png、webp格式合理选择](https://juejin.im/post/6844903625731358727)
(2) 图片压缩
[jpeg图片压缩](https://imagemin.saasify.sh/)、[png图片压缩](https://github.com/imagemin/imagemin-pngquant)
(3) 图片懒加载
原生图片懒加载：`<img loading='lazy' src='XXX'>`
第三方图片懒加载：`verlok/lazyload`
(4) [渐进式图片](https://www.zhangxinxu.com/wordpress/2013/01/progressive-jpeg-image-and-so-on/)
(5) [响应式图片](http://www.ruanyifeng.com/blog/2019/06/responsive-images.html)
2. 字体优化
字体未加载完成时，浏览器隐藏或自动降级字体，导致字体闪烁。
`font-display`属性值含义如下：
![image.png](https://upload-images.jianshu.io/upload_images/4989175-db54c5679e7fea55.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)
3. 字体图标
(1) `Iconfont`
优点：多个图标一套字体；矢量图；通过`CSS`修改颜色大小
缺点：一个图标只能一个颜色
(2) `svg`
优点：保持了图片能力，支持多色彩；独立的矢量图形；`XML`语法，有利于`SEO`
`react中`使用：`svgr/webpack`
# 8. 构建优化
1. `webpack`打包速度优化
(1) `noParse`
打包时忽略较大的库。
被忽略的库不能有`import`、`require`、`define`的引入方式
(2) `Dllplugin`
避免开发环境打包时对不变的库重复构建。
2.  `Tree Shaking`
`webpack`中，`mode`为`production时`，默认会开启`Tree Shaking`。
`Tree Shaking`基于`ES6`的模块化语法(`import`、`export`)。 
[sideEffects](https://juejin.im/post/6844903640533041159) 
⭐️⭐️⭐️  `bable`需要修改以下配置，不转化`ES6`模块化语法，以便使用`tree shaking`、`sideEffects`等
```
['@babel/preset-env', {modules: false}]
```
注意：需要在现有项目中验证`Tree Shaking`有没有生效。
3. 作用域提升
 [通过Scope Hoisting优化Webpack输出](https://cloud.tencent.com/developer/article/1547650)
`webpack`中，`mode`为`production`时，默认会进行作用域提升。
⭐️⭐️⭐️  `bable`需要配置`modules: false`才会生效。
注意：需要在现有项目中验证作用域提升有没有生效。该插件已在生产环境中默认启用。
4. `bable`配置优化
⭐️⭐️⭐️  `useBuiltIn`设置`usage`
[按需加载polyfill](https://erasermeng.github.io/2017/11/02/%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BDpolyfill%E2%80%94%E2%80%94babel7%E7%9A%84%E6%AD%A3%E7%A1%AE%E6%89%93%E5%BC%80%E6%96%B9%E5%BC%8F/)
5. 代码拆分
单个`bundle`文件拆成若干小`bundle/chunks`
(1) `optimization.splitChunks`配置
(2) 动态`import()`
6. 资源压缩
`TerserPlugin`压缩`JavaScript`
`mini-css-extract-plugin`压缩`CSS`
`HtmlWebpackPlugin  minify`压缩`HTML`
7. 资源持久化缓存
每个打包的资源文件有唯一的`hash`值。
是有修改之后的文件，`hash`值才会变化。
[webpack中的hash、chunkhash、contenthash区别](https://juejin.im/post/6844903542893854734)
8. `webpack`打包监测与分析
(1) 打包体积分析
`Stats`分析与可视化图 - `Webpack Chart`
`webpack-bundle-analyzer`体积分析
⭐️⭐️  `source-map-explorer `代码占比分析
(2) 打包速度分析
`speed-measure-webpack-plugin` 打包速度分析
9. `React`按需加载实现
`React router`使用`Reloadable`高级组件实现动态引入
# 9. MVVM框架
`MVVM`框架在一个非常不错(没有直接操作`DOM`快)的开发效率和可维护的情况下，提供了一个还过得去的性能。`MVVM`框架可以较好的规避传统直接操作`DOM`的方式容易导致过多的页面重绘和回流。
# 10. 性能优化问题
1. 首屏加载优化
测量指标：`First Contentful Paint(FCP)`、`Largest Contentful Paint(LCP)`、`Time to Interactive(TTI)`
(1) 资源体积太大
资源压缩、传输压缩、代码拆分、`Tree Shaking`、`HTTP/2`、缓存
(2) 首页内容太多
路由/组件/内容`Lazy loading`、预渲染/`SSR`、`Inline CSS`
(3) 加载顺序不合适
`prefetch`、`preload`
2. [JavaScript内存管理](https://juejin.im/post/6844903869525262349)
变量创建时自动分配内存，不使用时自动“释放”内存 - `GC`(垃圾回收)。
局部变量，函数执行完，没有闭包引用，就会被标记回收。
全局变量，直至浏览器卸载页面时，才会被释放。
`GC`实现机制：引用计数、标记清除
引用计数：无法解决循环引用的问题
标记清除：标记变量是否还能再次被访问到
内存管理：避免全局变量产生、避免反复运行引发大量闭包、避免脱离的`DOM`元素
