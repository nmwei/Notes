## 1. 简单使用
1. 介绍
`Web Worker` 的作用，就是为 `JavaScript` 创造多线程环境，允许主线程创建 `Worker` 线程，将一些任务分配给后者运行。
在主线程运行的同时，`Worker` 线程在后台运行，两者互不干扰。等到 `Worker` 线程完成计算任务，再把结果返回给主线程。
2. `Web Worker`简单使用
[`Web Worker`示例](https://mdn.github.io/simple-web-worker/)
```
//main.js
const first = document.querySelector('#number1');
const second = document.querySelector('#number2');
const result = document.querySelector('.result');

if (window.Worker) {
	const myWorker = new Worker("worker.js");

	first.onchange = function() {
	  myWorker.postMessage([first.value, second.value]);
	}

	second.onchange = function() {
	  myWorker.postMessage([first.value, second.value]);
	}

	myWorker.onmessage = function(e) {
	  result.textContent = e.data;
	}

	myWorker.onerror = function (e) {
	  console.log(['ERROR: ', e.lineno, ' in ', e.filename, ': ', e.message].join(''));
	};
}
```
```
//worker.js
onmessage = function(e) {
  const result = e.data[0] * e.data[1];
  if (isNaN(result)) {
    postMessage('Please write two numbers');
  } else {
    const workerResult = 'Result: ' + result;
    postMessage(workerResult);
  }
}
```
3. `Web Worker`使用限制
(1) 同源限制
分配给 `Worker` 线程运行的脚本文件，必须与主线程的脚本文件同源。
(2) `DOM` 限制
`Worker` 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 `DOM` 对象，也无法使用`document`、`window`、`parent`这些对象。但是，`Worker` 线程可以`navigator`对象和`location`对象。
(3) 通信联系
`Worker` 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。
(4) 脚本限制
`Worker`线程不能执行`alert()`方法和`confirm()`方法，但可以使用 `XMLHttpRequest`对象发出`AJAX`请求。
(5) 文件限制
`Worker`线程无法读取本地文件，即不能打开本机的文件系统(`file://`)，它所加载的脚本，必须来自网络。
4. `Worker` 线程一旦新建成功，就会始终运行，比较耗费资源。使用完毕必须关闭。
(1) 主线程终止`worker`
`myWorker.terminate();`
(2) `worker`线程终止`worker`
`close();`
5. 数据通信
主线程与 `Worker` 之间的通信内容，可以是文本，也可以是对象。
[`Structured Clone`](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWeb_Workers_API%2FStructured_clone_algorithm) 是 `postMessage` 默认的通信方式。这种通信是拷贝关系，即是传值而不是传址，`Worker` 对通信内容的修改，不会影响到主线程。
主线程与 `Worker` 也可以交换二进制数据，比如 `File`、`Blob`、`ArrayBuffer` 等类型。
6. 兼容性
主流浏览器在几年前就支持`Worker`。
![image.png](https://upload-images.jianshu.io/upload_images/4989175-f0caaf9a56024667.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 2. Web Worker 文献综述
1. `web worker`和`setTimeout / Promise.all`区别
JS 单线程中的“并发”通过`Event Loop`实现不同`Task`的上下文切换 (`Context Switch`)。这些 `Task` 通过 `BOM API` 调起其他线程为主线程工作, 但回调函数代码逻辑依然由 JS 串行运行。
`Web Worker` 是 `JS` 多线程运行技术。
2. 拆分同步逻辑的异步方案
将同步任务拆分为多个小于 `16ms` 的子任务, 然后在页面每一帧前通过 `requestAnimationFrame` 按计划执行一个子任务, 直到全部子任务执行完毕。
拆分同步逻辑存在以下几个问题：
(1) 不是所有 `js` 逻辑都可拆分
比如数组排序, 树的递归查找, 图像处理算法等。
(2) 可以拆分的逻辑难以把控粒度
拆分的子任务在高性能机器上可以控制在`16ms`内, 但在性能落后机器 上就超过了。
3. 性能提升
(1) 多线程与`CPU`核数
`Worker`多线程并不会直接带来计算性能的提升, 能否提升与设备`CPU`核数和线程策略有关。真正带来性能提升的是多核多线程并发。
(2) 通信速度
提升的性能 = 并行提升的性能 – 通信消耗的性能
4. 数据传输方式
(1) `Structured Clone`
[`Structured Clone`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) 是 `postMessage` 默认的通信方式。复制一份线程 `A` 的 `JS Object`内存给到线程 `B`, 线程`B`能获取和操作新复制的内存。
简单有效地隔离不同线程内存, 避免冲突。但`Object`规模过大时, 会占用大量的线程时间。
兼容性：较好
(2) `Transfer Memory`
线程`A`将指定内存的所有权和操作权转给线程`B`, 转让后线程`A`无法再访问这块内存。
 `Transfer Memory`以失去控制权来换取高效传输, 通过内存独占给多线程并发加锁。
兼容性：`IE11+`
(3) `Shared Array Buffer`
[`Shared Array Buffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) 是共享内存, 线程`A`和线程`B`可以**同时访问和操作**同一块内存空间，数据共享。
多个并行的线程共享内存，会产生竞争问题，不像前 2 种传输方式默认加锁。
兼容性：[只有Chrome 68+支持](https://caniuse.com/#search=sharedarray).
5. `Web Worker`适用场景
(1) `2010` 年， [The Basics of Web Workers](https://www.html5rocks.com/en/tutorials/workers/basics/)
数据处理、文本处理、图像/视频处理、网络处理
(2) 2018 年, [Parallel programming in JavaScript using Web Workers](https://itnext.io/achieving-parallelism-in-javascript-using-web-workers-8f921f2d26db)
`Canvas drawing`(离屏渲染方面)、`Virtual DOM diffing`(前端框架方面)、`indexedDB`(本地存储方面)、`Webassembly`(编译型语言方面) 
## 参考资料
* [使用 Web Workers-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)
* [Web Worker 文献综述](http://www.alloyteam.com/2020/07/14680)
* [石墨表格之 Web Worker 应用实战](https://zhuanlan.zhihu.com/p/29165800)
* [Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
