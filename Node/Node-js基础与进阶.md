 ## 1.  概述 
1. 介绍
`Node.js` 是一个基于 `Chrome V8` 引擎的 `JavaScript` 运行环境。`Node.js` 使用了一个事件驱动、非阻塞式`I/O` 的模型，使其轻量又高效。 `Node.js` 的包管理器 `npm`，是全球最大的开源库生态系统。
2. 特点
* 使用`JavaScript`作为开发语言
* 基于`ChromeV8`引擎
* 单线程
* 事件驱动
* 非阻塞的`I/O`
## 2. assert - 断言
## 3. Buffer - 缓冲器
## 4. child_process - 子进程
## 5. cluster - 集群
## 6. console - 控制台
## 7. crypto - 加密
## 8. dgram - 数据报
## 9. dns - 域名服务器
## 10. Error - 异常
## 11. events - 事件
## 12. fs - 文件系统
## 13. global - 全局变量
## 14. http - HTTP
**一、http.request(options, callback)**
这个函数允许后台发布请求。
`options`可以是一个对象或一个字符串。如果`options`是一个字符串, 它将自动使用`url.parse()`解析。
**二、http.get(options, callback)**
因为大部分的请求是没有报文体的`GET`请求，所以`Node`提供了这种便捷的方法。该方法与`http.request()`的唯一区别是它设置的是`GET`方法并自动调用`req.end()`。
**三、http.createServer([options][, requestListener])**
1. 开启一个服务
```
const http = require("http");
const url = require('url');
const util = require('util');

//事件驱动，回调在客户端访问该服务时触发
var server = http.createServer((request, response) => {

  //打印url，这里只能取到相对路径，不能拿到完整的url
  console.log(request.url);
  //将url字符串转化为一个对象
  const urlObj = url.parse(request.url);
  //返回 object 的字符串表示，主要用于调试
  const urlObjStr = util.inspect(urlObj);


  response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
  response.write("Hello World\n");
  response.write(urlObjStr)
  response.end();
});

server.listen(8888, () => {
  console.log("服务器已经启动，请访问 'http://127.0.0.1:8888'")
}); //服务监听8888端口
```
2. 返回`html`文件
```
let http = require('http');
let url = require('url');
let util = require('util');
let fs = require('fs');

let server = http.createServer((req,res)=>{
  var pathname = url.parse(req.url).pathname;
  console.log("file:"+pathname.substring(1))
  fs.readFile(pathname.substring(1), (err,data) => {
      if(err){
          res.writeHead(404,{
            'Content-Type':'text/html'
          });
      }else{
        res.writeHead(200,{
          'Content-Type':'text/html'
        });
        res.write(data.toString());
      }
      res.end();
  });
});

server.listen(8888,'127.0.0.1', ()=>{
  console.log("服务器已经运行，请打开浏览,输入:http://127.0.0.1:8888 来进行访问.")
});
```
## 15. https - HTTPS
1. `get`方法请求数据
```
let https = require('https');
let util = require('util')
https.get("https://m.imooc.com/api/search/searchword", function (res) {
    let data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        let result = JSON.parse(data);
        console.log("result:"+util.inspect(result))
    })
});
```
## 16. module - 模块
1. 在 `Node.js` 模块系统中，每个文件都被视为独立的模块。

`circle.js 文件`
```
const { PI } = Math;
exports.area = (r) => PI * r ** 2;
exports.circumference = (r) => 2 * PI * r;
```

`foo.js文件`
```
const circle = require('./circle.js');
console.log(`半径为 4 的圆的面积是 ${circle.area(4)}`);
```
2. `module.exports`属性可以被赋予一个新的值。

`square.js文件`
```
// 赋值给 `exports` 不会修改模块，必须使用 `module.exports`
module.exports = class Square {
  constructor(width) {
    this.width = width;
  }
  area() {
    return this.width ** 2;
  }
};
```
`bar.js文件`
```
onst Square  = require('./square.js');
const mySquare = new Square(2);
console.log(`mySquare 的面积是 ${mySquare.area()}`);
```
## 17. net - 网络
## 18. os - 操作系统
## 19. path - 路径
## 20. process - 进程
## 21. querystring - 查询字符串
`querystring` 模块提供了一些实用函数，用于解析与格式化 `URL `查询字符串。 可以通过以下方式使用：
```
const querystring = require('querystring');
```
**一、 querystring.stringify(obj, [sep], [eq])**
序列化一个对象到一个` query string`。可以选择是否覆盖默认的分割符(`'&'`)和分配符(`'='`)。
```
querystring.stringify({foo: 'bar', baz: 'qux'}, ';', ':')
//'foo:bar;baz:qux'
```
**二、 querystring.parse(str, [sep], [eq], [options])**
 将一个 `query string` 反序列化为一个对象。可以选择是否覆盖默认的分割符('&')和分配符('=')。
options对象可能包含`maxKeys`属性(默认为1000), 它可以用来限制处理过的键(`key`)的数量。设为0可以去除键(`key`)的数量限制。
```
querystring.parse('foo=bar&baz=qux&baz=quux&corge')
//{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }
```
**三、 querystring.escape**
供`querystring.stringify` 使用的转意函数，在必要的时候可被重写。
**四、querystring.unescape**
供 `querystring.parse` 使用的反转意函数，在必要的时候可被重写。
注释: 当`querystring.stringify()`方法传入的参数出现汉子时，会默认调用`querystring.escape()`方法对汉子进行转义处理；当`querystring.parse()`方法传入的参数出现转义之后的字符时，会默认调用`querystring.unescape()`方法对转义字符进行反转义处理。

## 22. readline - 逐行读取
## 23. repl - 交互式解释器
## 24. stream - 流
## 25. string_decoder - 字符串解码器
## 26. timer - 定时器
## 27. tls - 安全传输层
## 28. tty - 终端
## 29. url - 网址
`url` 模块提供了一些实用函数，用于` URL` 处理与解析。 可以通过以下方式使用：
```
const url = require('url');
```
**一、 url字段信息**
例如: `http://user:pass@host.com:8080/p/a/t/h?query=string#hash`
* `protocol`：请求协议，小写
`http:`
* `host`: URL主机名已全部转换成小写, 包括端口信息
'host.com:8080'
* `auth`: URL中身份验证信息部分
`user:pass`
* `hostname`:	主机的主机名部分, 已转换成小写
`host.com`
* `port`: 主机的端口号部分
`8080`
* `pathname`: `URL`的路径部分,位于主机名之后请求查询之前。 
`/p/a/t/h`
* `search`: `URL` 的“查询字符串”部分，包括开头的问号 
`?query=string`
* `path`: `pathname` 和 `search` 连在一起。
`/p/a/t/h?query=string`
* `query`: 查询字符串中的参数部分（问号后面部分字符串）或者使用` querystring.parse()` 解析后返回的对象
`query=string` or `{'query':'string'}`
*` hash`: 	`URL` 的 “`#`” 后面部分（包括 `# `符号） 
'`#hash`'
注释:①`host = hostname + port;` ②`path = pathname + search;` ③`search = ? +  query;`

**二、url.parse(urlStr, [parseQueryString], [slashesDenoteHost])**
输入 `URL` 字符串，返回一个对象。
将第二个参数设置为 `true` 则使用 `querystring` 模块来解析 `URL `中的查询字符串部分，默认为` false`。
将第三个参数设置为 `true` 来把诸如` //foo/bar `这样的URL解析为` { host: 'foo', pathname: '/bar' }` 而不是 `{ pathname: '//foo/bar' }`。 默认为` false`。
**三、url.format(urlObj)**
输入一个`URL` 对象，返回格式化后的 `URL `字符串。
**四、url.resolve(from, to)**
以一种 `Web` 浏览器解析超链接的方式把一个目标 `URL` 解析成相对于一个基础 `URL`。
```
const url = require('url');
url.resolve('/one/two/three', 'four');         
// '/one/two/four'
url.resolve('http://example.com/', '/one');    
// 'http://example.com/one'
url.resolve('http://example.com/one', '/two'); 
// 'http://example.com/two'
```
## 30. util - 实用工具
## 31. v8 - V8引擎
## 32. vm - 虚拟机
## 33. zlib - 压缩
## 参考资料
* [Node中文文档](http://nodejs.cn/api/)
