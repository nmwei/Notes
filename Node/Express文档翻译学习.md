## 1. 入门
高度包容、快速而极简的 `Node.js` `Web` 框架
### 1.1 安装
```
npm install express --save
```
### 1.2 hello world
1. 创建名为 `app.js` 的文件，然后添加以下代码
```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```
注释: 此应用程序以`“Hello World!”`响应针对根 `URL (/) `路由的请求。对于其他所有路径，它将以 `404` `Not Found` 进行响应。
### 1.3 Express 生成器
可使用应用程序生成器工具 (`express`) 快速创建应用程序框架。
1. 安装`express-generator`生成器
(1) 全局安装：`npm i express-generator -g`
(2) 查看命令：`express -h`
(3) 查看版本：`express --version` 
2. 创建名为 `server` 的 `Express`应用程序
 `express server`
3. 安装依赖
`cd server`
`npm install`
4. 启动程序
`npm start`
5. 项目文件介绍
*  `bin/www` 项目入口文件
*  `public` 资源文件
*  `routes` 路由
*  `views` 视图
6. 使用`html`模板替换`jade`模板
* 安装`ejs`
` npm i ejs --save`
* 修改`app.js`
```
const ejs = require('ejs');

//app.set('view engine', 'jade');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
```
### 1.4 基本路由
1. 路由用于确定应用程序如何响应对特定端点的客户机请求。
2. 每个路由可以具有一个或多个处理程序函数，这些函数在路由匹配时执行。
3. 路由定义采用以下结构：
`app.METHOD(PATH, HANDLER)`
其中：`app` 是 `express` 的实例。`METHOD` 是 [HTTP 请求方法](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)。`PATH` 是服务器上的路径。`HANDLER` 是在路由匹配时执行的函数。
4. 简单路由演示
* 以主页上的 `Hello World!` 进行响应：
```
app.get('/', function (req, res) {
  res.send('Hello World!');
});
```
* 在根路由 (`/`) 上（应用程序的主页）对 `POST` 请求进行响应：
```
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
```
* 对 `/user` 路由的 `PUT` 请求进行响应：
```
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
```
* 对 `/user` 路由的 `DELETE` 请求进行响应：
```
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
```
### 1.5 静态文件
1. 为了提供诸如图像、`CSS` 文件和 `JavaScript` 文件之类的静态文件，请使用 `Express` 中的 `express.static `内置中间件函数。
2. 将包含静态资源的目录的名称传递给 `express.static` 中间件函数，以便开始直接提供这些文件。例如，使用以下代码在名为` public `的目录中提供图像、`CSS` 文件和 `JavaScript` 文件：
```
app.use(express.static('public'));
```
3. 可以访问位于 `public` 目录中的文件
`http://localhost:3000/images/kitten.jpg`
`http://localhost:3000/css/style.css`
`http://localhost:3000/js/app.js`
`http://localhost:3000/images/bg.png`
`http://localhost:3000/hello.html`
4. 要使用多个静态资源目录，请多次调用` express.static` 中间件函数：
```
app.use(express.static('public'));
app.use(express.static('files'));
```
5. 向 `express.static `函数提供的路径相对于您在其中启动 `node` 进程的目录。如果从另一个目录运行 `Express `应用程序，那么对于提供资源的目录使用绝对路径会更安全：
```
app.use('/static', express.static(__dirname + '/public'));
```
### 1.6 常见问题及解答
1. 如何定义模型？
`Express` 没有数据库概念。此概念留给第三方 `Node` 模块实现，因此可以接入几乎任何数据库。
2. 如何处理 `404` 响应？
`Express` 执行了所有中间件函数和路由，且发现它们都没有响应。您需要做的只是在堆栈的最底部（在其他所有函数之下）添加一个中间件函数来处理 `404` 响应：
```
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
```
3. 如何设置错误处理程序？
错误处理中间件的定义方式与其他中间件基本相同，差别在于错误处理中间件有四个自变量而不是三个，专门具有特征符` (err, req, res, next)`：
```
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```
注意：错误处理中间件始终采用四个自变量。必须提供四个自变量，以将函数标识为错误处理中间件函数。否则，`next` 对象将被解释为常规中间件，从而无法处理错误。
## [2. 指南](http://expressjs.com/zh-cn/guide/routing.html)
## [3. API参考](http://expressjs.com/zh-cn/4x/api.html)
### 3.1 express()
#### Methods
##### [express.json()](http://expressjs.com/zh-cn/4x/api.html#express.json)
#####  [express.static()](http://expressjs.com/zh-cn/4x/api.html#express.static)
#####  [express.Router()](http://expressjs.com/zh-cn/4x/api.html#express.router)
#####  [express.urlencoded()](http://expressjs.com/zh-cn/4x/api.html#express.urlencoded)
### 3.2 Application
#### Properties
#####  [app.locals](http://expressjs.com/zh-cn/4x/api.html#app.locals)
##### [app.mountpath](http://expressjs.com/zh-cn/4x/api.html#app.mountpath)
#### Events
#####  [mount](http://expressjs.com/zh-cn/4x/api.html#app.onmount)
#### Methods
#####  [app.all()](http://expressjs.com/zh-cn/4x/api.html#app.all)
##### [app.delete()](http://expressjs.com/zh-cn/4x/api.html#app.delete.method)
#####  [app.disable()](http://expressjs.com/zh-cn/4x/api.html#app.disable)
##### [app.disabled()](http://expressjs.com/zh-cn/4x/api.html#app.disabled)
##### [app.enable()](http://expressjs.com/zh-cn/4x/api.html#app.enable)
##### [app.enabled()](http://expressjs.com/zh-cn/4x/api.html#app.enabled)
##### [app.engine()](http://expressjs.com/zh-cn/4x/api.html#app.engine)
##### [app.get()](http://expressjs.com/zh-cn/4x/api.html#app.get)
##### [app.get()](http://expressjs.com/zh-cn/4x/api.html#app.get.method)
##### [app.listen()](http://expressjs.com/zh-cn/4x/api.html#app.listen)
##### [app.METHOD()](http://expressjs.com/zh-cn/4x/api.html#app.METHOD)
##### [app.param()](http://expressjs.com/zh-cn/4x/api.html#app.param)
##### [app.path()](http://expressjs.com/zh-cn/4x/api.html#app.path)
##### [app.post()](http://expressjs.com/zh-cn/4x/api.html#app.post.method)
##### [app.put()](http://expressjs.com/zh-cn/4x/api.html#app.put.method)
##### [app.render()](http://expressjs.com/zh-cn/4x/api.html#app.render)
##### [app.route()](http://expressjs.com/zh-cn/4x/api.html#app.route)
##### [app.set()](http://expressjs.com/zh-cn/4x/api.html#app.set)
##### [app.use()](http://expressjs.com/zh-cn/4x/api.html#app.use)
### 3.3 Request
#### Properties
##### [req.app](http://expressjs.com/zh-cn/4x/api.html#req.app)
##### [req.baseUrl](http://expressjs.com/zh-cn/4x/api.html#req.baseUrl)
##### [req.body](http://expressjs.com/zh-cn/4x/api.html#req.body)
包含在`request body`请求体中提交的键-值对数据。默认情况下，它是 `undefined`。在你使用`body`解析中间件时才会被填充，例如：[body-parser](https://www.npmjs.org/package/body-parser) 或者 [multer](https://www.npmjs.org/package/multer)。
下面这个例子展示了如何使用`body`解析中间件来填充`req.body`。
```javascript
var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); 

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.post('/', function (req, res) {
  console.log(req.body);
  res.json(req.body);
})
```
##### [req.cookies](http://expressjs.com/zh-cn/4x/api.html#req.cookies)
当使用 [cookie-parser](https://www.npmjs.com/package/cookie-parser) 中间件时，此属性是一个包含由请求发送的`cookie`的对象。如果请求不包含`cookie`，则默认为`{}`。
```
// Cookie: name=tj
req.cookies.name
// => "tj"
```
如果`cookie`已经签名，则必须使用[req.signedCookies](http://expressjs.com/zh-cn/4x/api.html#req.signedCookies)。
有关更多信息、问题或关注，请参阅[cookie-parser](https://github.com/expressjs/cookie-parser)。

##### [req.fresh](http://expressjs.com/zh-cn/4x/api.html#req.fresh)
##### [req.hostname](http://expressjs.com/zh-cn/4x/api.html#req.hostname)
##### [req.ip](http://expressjs.com/zh-cn/4x/api.html#req.ip)
##### [req.ips](http://expressjs.com/zh-cn/4x/api.html#req.ips)
##### [req.method](http://expressjs.com/zh-cn/4x/api.html#req.method)
##### [req.originalUrl](http://expressjs.com/zh-cn/4x/api.html#req.originalUrl)
##### [req.params](http://expressjs.com/zh-cn/4x/api.html#req.params)
1. 返回一个匹配路由参数的`object`对象。例如，如果路由路径为`/user/:name`,那么可以通过`req.params.name`取到`name`字段值。默认返回值为空对象`{}`。
```javascript
// GET /user/tj
req.params.name
// => "tj"
```
注意：与`vue-router`用法类似。
2. 如果在路由中定义了正则表达式，使用`req.params[n]`可以获取捕获组。其中，`n`表示第`n`个捕获组。该规则适用于未定义通配符匹配的字符串路由，例如：`/file/*`。
```javascript
// GET /file/javascripts/jquery.js
req.params[0]
// => "javascripts/jquery.js"
```
3. 如果需要在`req.params`中对参数进行更改，可以使用`app.param`处理程序。 更改仅适用于路由路径中已定义的参数。
4. 在中间件或路由处理程序中对`req.params`对象所做的任何更改都将被重置。
5. `Express`将自动解码`req.params`中的值。(使用`decodeURIComponent`)。
##### [req.path](http://expressjs.com/zh-cn/4x/api.html#req.path)
##### [req.protocol](http://expressjs.com/zh-cn/4x/api.html#req.protocol)
##### [req.query](http://expressjs.com/zh-cn/4x/api.html#req.query)
一个包含路由中每个查询字符串参数的属性的对象。如果没有查询字符串，就是一个空对象`{}`。
```
// GET /search?q=tobi+ferret
req.query.q
// => "tobi ferret"

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
// => "desc"

req.query.shoe.color
// => "blue"

req.query.shoe.type
// => "converse"
```
##### [req.route](http://expressjs.com/zh-cn/4x/api.html#req.route)
##### [req.secure](http://expressjs.com/zh-cn/4x/api.html#req.secure)
##### [req.signedCookies](http://expressjs.com/zh-cn/4x/api.html#req.signedCookies)
##### [req.stale](http://expressjs.com/zh-cn/4x/api.html#req.stale)
##### [req.subdomains](http://expressjs.com/zh-cn/4x/api.html#req.subdomains)
##### [req.xhr](http://expressjs.com/zh-cn/4x/api.html#req.xhr)
#### Methods
##### [req.accepts()](http://expressjs.com/zh-cn/4x/api.html#req.accepts)
##### [req.acceptsCharsets()](http://expressjs.com/zh-cn/4x/api.html#req.acceptsCharsets)
##### [req.acceptsEncodings()](http://expressjs.com/zh-cn/4x/api.html#req.acceptsEncodings)
##### [req.acceptsLanguages()](http://expressjs.com/zh-cn/4x/api.html#req.acceptsLanguages)
##### [req.get()](http://expressjs.com/zh-cn/4x/api.html#req.get)
##### [req.is()](http://expressjs.com/zh-cn/4x/api.html#req.is)
##### [req.param()](http://expressjs.com/zh-cn/4x/api.html#req.param)
> 已经被废弃，推荐直接使用`req.params`，`req.body`和`req.query`。

返回当前“name”参数的值。
```
// ?name=tobi
req.param('name')
// => "tobi"

// POST name=tobi
req.param('name')
// => "tobi"

// /user/tobi for /user/:name 
req.param('name')
// => "tobi"
```
查找的顺序如下：
* `req.params`
* `req.body`
* `req.query`

如果在任何请求对象中都没有找到参数，您可以指定`defaultValue`来设置默认值。
必须使用`body`解析中间件，以便`req.param()`可以正常工作。 更多细节参考：[req.body](http://www.expressjs.com.cn/4x/api.html#req.body) 。


##### [req.range()](http://expressjs.com/zh-cn/4x/api.html#req.range)

### 3.4 Response
#### Properties
##### [res.app](http://expressjs.com/zh-cn/4x/api.html#res.app)
##### [res.headersSent](http://expressjs.com/zh-cn/4x/api.html#res.headersSent)
##### [res.locals](http://expressjs.com/zh-cn/4x/api.html#res.locals)
#### Methods
##### [res.append()](http://expressjs.com/zh-cn/4x/api.html#res.append)
##### [res.attachment()](http://expressjs.com/zh-cn/4x/api.html#res.attachment)
##### [res.cookie()](http://expressjs.com/zh-cn/4x/api.html#res.cookie)
`res.cookie(name, value [, options])`
设置`cookie`键值对，`value`参数可以是一个字符串或者可以转化为`json`的对象。`options`参数是一个包含以下属性的对象。
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| `domain` | String | cookie的域名。默认为应用程序的域名。 |
| `encode` | Function | 用于cookie值编码的同步函数。默认为“encodeURIComponent”。 |
| `expires` | Date | 相对于GMT标准的过期时间。如果没有指定或设置为0，则创建会话cookie。 |
| `httpOnly` | Boolean | 是否只能由web服务器访问的cookie标记。 |
| `maxAge` | Number | 用于设置相对于当前时间(以毫秒为单位)的到期时间。 |
| `path` | String | cookie存储路径，默认为 “/”。 |
| `secure` | Boolean | 标记cookie仅允许被https请求使用。 |
| `signed` | Boolean | 表明cookie是否被签名。 |
| `sameSite` | Boolean or String |  [参考](https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site-00#section-4.1.1) |
```
res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
```
##### [res.clearCookie()](http://expressjs.com/zh-cn/4x/api.html#res.clearCookie)
`res.clearCookie(name [, options])`
清除由名称指定的`cookie`。有关`options`对象的详细信息，请参阅`res.cookie()`。
```
res.cookie('name', 'tobi', { path: '/admin' });
res.clearCookie('name', { path: '/admin' });
```
##### [res.download()](http://expressjs.com/zh-cn/4x/api.html#res.download)
##### [res.end()](http://expressjs.com/zh-cn/4x/api.html#res.end)
##### [res.format()](http://expressjs.com/zh-cn/4x/api.html#res.format)
##### [res.get()](http://expressjs.com/zh-cn/4x/api.html#res.get)
##### [res.json()](http://expressjs.com/zh-cn/4x/api.html#res.json)
##### [res.jsonp()](http://expressjs.com/zh-cn/4x/api.html#res.jsonp)
##### [res.links()](http://expressjs.com/zh-cn/4x/api.html#res.links)
##### [res.location()](http://expressjs.com/zh-cn/4x/api.html#res.location)
##### [res.redirect()](http://expressjs.com/zh-cn/4x/api.html#res.redirect)
##### [res.render()](http://expressjs.com/zh-cn/4x/api.html#res.render)
##### [res.send()](http://expressjs.com/zh-cn/4x/api.html#res.send)
##### [res.sendFile()](http://expressjs.com/zh-cn/4x/api.html#res.sendFile)
##### [res.sendStatus()](http://expressjs.com/zh-cn/4x/api.html#res.sendStatus)
##### [res.set()](http://expressjs.com/zh-cn/4x/api.html#res.set)
##### [res.status()](http://expressjs.com/zh-cn/4x/api.html#res.status)
##### [res.type()](http://expressjs.com/zh-cn/4x/api.html#res.type)
##### [res.vary()](http://expressjs.com/zh-cn/4x/api.html#res.vary)
### 3.5 Router
#### Methods
##### [router.all()](http://expressjs.com/zh-cn/4x/api.html#router.all)
##### [router.METHOD()](http://expressjs.com/zh-cn/4x/api.html#router.METHOD)
##### [router.param()](http://expressjs.com/zh-cn/4x/api.html#router.param)
##### [router.route()](http://expressjs.com/zh-cn/4x/api.html#router.route)
##### [router.use()](http://expressjs.com/zh-cn/4x/api.html#router.use)



## 参考资料
* [Express中文网](http://www.expressjs.com.cn/)
* [Express中文文档](http://expressjs.com/zh-cn/)
