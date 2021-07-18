# 1. 介绍
1. `webpack`是一个模块打包(`module bundler`)工具。
> `A bundler for javascript and friends. Packs many modules into a few bundled assets. Code Splitting allows to load parts for the application on demand. Through "loaders", modules can be CommonJs, AMD, ES6 modules, CSS, Images, JSON, Coffeescript, LESS, ... and you custom stuff. ` 
2. 大版本变化
(1) `Webpack V1.0.0` - `2014.2.20`
编译打包、`HMR`(模块热更新)、代码分割、文件处理。
(2) `Webpack V2.2.0` - `2017.1.18`
`Tree Shaking`、`ES6 modules`(无需`babel`)、动态`Import`、新的文档。
(3) `Webpack V3.0.0` - `2017.6.19`
`Scope Hoisting`(作用域提升)、`Magic Comments`(魔法注释，配合动态`import`使用)
(4) `Webpack V4.0.0` - `2018.2.25`
支持零配置、开发与生产模式、`SplitChunksPlugin`替换`CommonChunkPlugin`。
# 2. 初始化
1. 创建项目文件夹
`webpack-operate`
2.  创建`package.json`文件
`➜  webpack-operate npm init`
3. 设置当前`npm`项目为私有项目
在`package.json`中添加`  "private": true`
4. 安装`webpack`以及`webpack-cli `
`➜  webpack-operate npm i webpack webpack-cli --save-dev`
> 业务逻辑中需要使用的包通过`--save`方式安装；只有打包过程需要使用的包通过`--save-dev`方式安装。
5. 命令介绍
* 获取`Webpack`信息
`npm info webpack` 
* 安装指定版本`Webpack`
`npm i webpack@4.16.5`
* 获取全局环境中`webpack`版本
`webpack -v  `
* 获取当前项目中`webpack`版本
`npx webpack -v `
#3. 模块打包
1. 创建打包配置文件
`webpack.dev.config.js`
2. 创建入口文件
`./src/index.js`
3. 编辑打包配置文件
`webpack.dev.config.js`
```javascript
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, 'dist')
  }
}
``` 
> `'./src/index.js'`是`{"main": './src/index.js'}`的简写。其中，`main`为`chunk name`。
> 如果希望将脚本打包到`dist/js/`文件夹中，可以修改`filename`值为`js/main.js`。即`filename`不仅可以设置文件名，还可以设置路径。
4. 创建打包命令
`package.json`文件
```
"scripts": {
    "bundle": "webpack --config ./webpack.dev.config.js --mode development"
}
```
* `mode`的含义
`mode`的值为`development`或`production`。当取值为`production`时，输出文件会被压缩。
* 打包配置
如果没有配置文件，则使用默认配置，入口文件为`./src/index.js`，输出文件为`dist/main.js`。
如果有`./webpack.config.js`文件，则默认使用该文件作为配置文件。
如果使用其它配置文件，则需要通过`--config`指定配置文件。
* `webpack`版本
如果直接通过`webpack`命令打包，则是使用全局安装的`webpack`打包。 
如果通过`npx webpack`/`npm run xxx(scripts内部定义命令)`，则使用当前项目安装的`webpack`打包。
```
➜  webpack-demo webpack -v
3.8.1
➜  webpack-demo npx webpack -v
4.29.6
➜  webpack-demo npm run version
> webpack-demo@1.0.0 ver /Users/nimengwei/Code/mycode/webpack/webpack-demo
> webpack -v
4.29.6
```
> `webpack3.X`版本不支持零配置(没有配置文件)，除非在命令行中指定入口文件和出口文件(`webpack entry output`)。
> `webpack3.X`版本不支持通过`mode`定义`development`(开发模式)或`production`(生产模式)。
5. 执行打包命令
`npm run bundle`
此时，生成`dist`文件夹，内部有打包后文件`main.js`。
```
➜  webpack-operate npm run bundle                      

> webpack-operate@1.0.0 bundle /Users/nimengwei/Code/mycode/webpack/webpack-operate
> webpack --config ./webpack.dev.config.js --mode development

Hash: 5b90c629ada6fed12c59 //当前打包的唯一标识
Version: webpack 4.29.6 //webpack版本
Time: 75ms  //打包用时
Built at: 04/02/2019 7:29:52 PM
  //输出文件   大小  输入chunks         输入chunks名称
  Asset      Size  Chunks             Chunk Names
main.js  3.77 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/index.js] 0 bytes {main} [built]
```
> 这里的`chunk`名称可以在`entry`入口中设置。
#4. 清理打包文件
1. 安装依赖
`➜  webpack-operate npm i clean-webpack-plugin -D`
2. 编辑打包配置文件
`webpack.dev.config.js`
```
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  //...
  plugins: [
    new CleanWebpackPlugin(),
  ]
  //...
}
```
3. `plugin`的作用是当打包进行到某一个时刻时，执行某些操作。例如，`clean-webpack-plugin`就是在打包前清除上次打包生成文件。
#5. html文件
## 5.1 html模板
1. `html-webpack-plugin`[文档](https://www.webpackjs.com/plugins/html-webpack-plugin/)
2. 安装依赖
`➜  webpack-operate npm i html-webpack-plugin --save-dev`
3. 创建`html`模板文件
`./index.html`
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Webpack操作指南</title>
</head>
<body>
  <h1>Webpack操作指南</h1>
</body>
</html>
```
4. 编辑打包配置文件
`webpack.dev.config.js`
```
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  //...
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
  //...
}
```
5. 执行打包
`npm run bundle`
此时，打包结束后，打包文件夹中会以`./index.html`为模板，自动生成一个`html`文件，并将打包生成的 `js`文件自动引入到该`html`文件中。
6. `html-webpack-plugin`就是在打包结束时根据指定模板生成`html`文件并插入打包生成的`js`文件。
7. 其它配置项
```
    new HtmlWebpackPlugin({
      template: './index.html', //模板文件
      chunks: ['app'], //生成html文件添加哪些chunks，默认全部添加
      minify: {
        collapseWhitespace: true //压缩html
      }
    })
```
## 5.2 html中引入图片
1. 准备工作
配置`5.1 html模板`；
配置`9. 加载图片`；
2. 修改`./index.html`
```
...
<img src="./assets/controls.png" data-src="./assets/controls.png">
<img src="${require('./assets/controls.png')}" data-src="${require('./assets/controls.png')}">
...
```
3. 执行打包
`npm run bundle`
发现第一种图片引入方式无法显示，第二种图片引入方式可以显示。
> 第二种图片引入方式可以显示的前提是需要在配置中为图片指定 `loader`（推荐 `file-loader` 或 `url-loader`）。
4. 安装依赖
`npm i -D html-loader`
5. 编辑打包配置文件
`webpack.dev.config.js`
```
{
  test: /\.html$/,
  use: [
    {
      loader: "html-loader",
      options: {
        attrs: [':src', ':data-src']
      }
    }
  ]
}
```
6. 执行打包
`npm run bundle`
此时第一种图片引入方式可以显示，第二种图片引入方式无法显示。
#6. 模块热更新
## 6.1 webpack --watch
1. 编辑打包命令
`package.json`文件
```
  "scripts": {
    //...
    "watch": "webpack --watch --config ./webpack.dev.config.js --mode development",
    //...
  }
```
2. 执行打包
`npm run watch`
`webpack`会监听打包文件，当文件内容发生变化时自动重新执行打包操作。
例如，修改`src/index.js`文件并保存(`webpack`会自动重新打包)，刷新`dist/index.html`文件，页面执行修改后的`js`文件。
> `webpack --watch`命令仅仅实现了自动打包操作，无法自动打开浏览器，无法开启一个本地服务，无法自动刷新。
3. `webpack`命令[配置参数](https://www.webpackjs.com/api/cli/)
语法：`webpack [--config webpack.config.js]`
`webpack --json`： 以 `JSON` 格式输出 `webpack` 的运行结果
`--config`： 配置文件的路径
`--progress`：打印出编译进度的百分比值
`--watch, -w`：观察文件系统的变化
`--color, --colors`：开启/关闭控制台的颜色
`--display-reasons`：显示模块包含在输出中的原因
## 6.2 webpack-dev-server
### 6.2.1 快速开发应用程序
1. 安装依赖
`➜  webpack-operate npm i webpack-dev-server --save-dev`
2. 编辑打包配置文件
`webpack.dev.config.js`
```
module.exports = {
  //...
  devServer: {
    open: true, //浏览器自动打开
    port: 9000, //指定端口号
    contentBase: './dist' //启动服务的目录
  }
  //...
}
```
> 默认浏览器不自动打开，默认端口为`8080`。
3. 编辑打包命令
`package.json`文件
```
"scripts": {
    "bundle": "webpack --config ./webpack.dev.config.js --mode development",
    "dev": "webpack-dev-server --config ./webpack.dev.config.js --mode development"
  },
```
> `webpack3.X`版本不支持`--mode development/production`设置打包模式。
4. 执行打包命令
`npm run dev`
此时浏览器自动打开`http://localhost:9000`，可以看到`html-webpack-plugin`在打包结束后生成的`index.html`文件(由于`html-webpack-plugin`的功能，该文件以`./index.html`为模板，以`./release/bundle.js`为`JavaScript`脚本)。且修改 `./src/index.js`文件时，浏览器自动刷新。
5. `webpack-dev-server`依赖于`webpack-cli`。安装`webpack-cli`会同时安装`webpack-dev-server`。对于`webpack3.X`版本来说，使用最新版本的`webpack-dev-server`会报错，可通过降低版本解决，例如`2.9.7`版本。
> 使用`webpack-dev-server`打包会在内存中生成打包文件，提升打包效率。 并不会实际生成`dist`文件夹以及打包输出文件。如果需要打包生成文件，仍然需要使用`webpack`命令。
>当前配置虽然实现了代码修改自动打包浏览器自动刷新。但浏览器刷新之前的页面操作无法保存，尚未实现不刷新浏览器在运行时更新所修改模块。
### 6.2.2 devServer.historyApiFallback
1. 当使用 [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History) 时，任意的 `404` 响应都可能需要被替代为 `index.html`。通过传入以下启用：
```
historyApiFallback: true
```
2. 通过传入一个对象，比如使用 `rewrites` 这个选项，此行为可进一步地控制：
```
historyApiFallback: {
  rewrites: [
    { from: /^\/$/, to: '/views/landing.html' },
    { from: /^\/subpage/, to: '/views/subpage.html' },
    { from: /./, to: '/views/404.html' }
  ]
}
```
3. 可以通过正则表达式匹配通用参数
```
historyApiFallback: {
  rewrites: [
    {
      from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
      to: function(context) {
        console.log(context.match[1], context.match[2])
        return '/' + context.match[1] + context.match[2] + '.html'
      }
    },
  ]
}
```
### 6.2.3 代理 
1. 文档
[`devserver-proxy`](https://www.webpackjs.com/configuration/dev-server/#devserver-proxy)
[`http-proxy-middleware`](https://github.com/chimurai/http-proxy-middleware#options)
2. 配置代理
编辑打包配置文件
`webpack.dev.config.js`
```
module.exports = {
  //...
  devServer: {
    open: true, //浏览器自动打开
    port: 9000,
    proxy: {
      '/api': {
        changeOrigin: true, //changes the origin of the host header to the target URL
        target: 'http://localhost:8880'
        //访问hocalhost:9000/api/...时，会被代理到hocalhost:8880/api/...
      }
    }
  }
}
```
此时，访问`hocalhost:9000/api/...`时，会被代理到`hocalhost:8880/api/...`。
> `proxy`代理只在开发环境中使用。
3. 支持`https`
默认情况下，不接受运行在 `HTTPS` 上，且使用了无效证书的后端服务器。如果你想要接受，修改配置如下：
```
proxy: {
  '/api': {
    target: 'http://localhost:8880',
      secure: false
    }
}
```
## 6.3 模块热更新(HMR)
1. [模块热替换](https://webpack.docschina.org/guides/hot-module-replacement/)(`hot module replacement` 或 `HMR`)是 `webpack` 提供的最有用的功能之一。它允许在运行时更新所有类型的模块，而无需完全刷新。
> 模块热更新为**无刷新浏览器**更新。
2. 编辑打包配置文件
`webpack.dev.config.js`
```
  //...
  devServer: {
    open: true, //浏览器自动打开
    port: 9000,
    contentBase: './dist',
    hot: true,
    hotOnly: true,
  }
  //...
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //...
  ]
  //...
```
> `hotOnly`为`true`，表示当`html`文件失效时，不自动刷新浏览器。
3. 执行打包命令
`npm run dev`
此时实现了`CSS`文件的模块热更新。
4. 监听`js`文件变化回调
```
if (module.hot) {
   module.hot.accept('./print.js', function() {
     console.log('Accepting the updated printMe module!');
    printMe();
   })
 }
```
> `./print.js`为当前打包中引入的模块。
 `js`模块热更新需要`module.hot.accept`监听文件变化的方式实现。
`css-loader`已经帮我们做了`module.hot.accept`监听`CSS`文件变化的代码。
在`react`和`vue`项目开发时，第三方`loader`也已经实现了`module.hot.accept`监听。
## 6.4 自定义打包脚本
1. 安装依赖
`➜  webpack-operate npm i express webpack-dev-middleware -D`
2. 编辑打包命令
`package.json`文件
```
  "scripts": {
    //...
    "server": "node server.js"
    //...
  }
```
3. 编辑打包配置文件
`webpack.dev.config.js`
```
  output: {
    //...
    publicPath: './',
    //...
  }
```
4. 创建并编辑打包脚本
`./server.js`
```
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.dev.config')

//根据config配置，返回一个编译器
//在node中直接使用Webpack
const complier = webpack(config) 

//创建一个express服务
const app = express();

//使用webpackDevMiddleware中间件
app.use(webpackDevMiddleware(complier, {
  publicPath: config.output.publicPath
}))

//开启服务，监听8080端口
app.listen(8080, () => {
  console.log("server is running!")
})
```
> [命令行](https://webpack.docschina.org/api/cli/)中使用`webpack`。[node.js](https://webpack.docschina.org/api/node/)中使用`webpack`。
5. 执行打包命令
`npm run server`
此时，开启了一个本地服务，手动打开`http://localhost:8080/`地址，可以看到`html-webpack-plugin`在打包结束后生成的`index.html`文件。与`webpack --watch`类似，修改代码后会重新打包，但没有实现自动打开浏览器，没有实现自动刷新。可以通过修改`server.js`的方式添加这些功能。
# 7. 开发调试
## 7.1 devtool
1. [SourceMap](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
保存打包前后代码位置信息，方便调试。
2. 编辑打包配置文件
`webpack.dev.config.js`
```
module.exports = {
  //...
  devtool: 'inline-source-map',
  //...
}
```
3. `devtool`字段值含义
![image.png](https://upload-images.jianshu.io/upload_images/4989175-71356843a866bc4e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

① `source-map`：完整映射到原始源代码。
② `inline`: `sourceMappingURL`指向`base64`字符串，否则打包生成`map`文件。
③ `cheap`：代码只映射到行信息，只映射业务代码，不映射第三方模块代码。
④ `module`： 不仅映射业务代码，而且映射第三方模块代码。
⑤ `eval`：以`eval(string)`的方式运行代码，打包速度最快。
> `eval`打包速度最快。
4. [devtool](https://webpack.docschina.org/configuration/devtool/)举例介绍
①`source-map`表示完整映射到原始源代码；`sourceMappingURL`指向打包生成的`map`文件。
②`inline-source-map`表示完整映射到原始源代码；`sourceMappingURL`指向`base64`字符串。
③`inline-cheap-source-map`表示代码只映射到行信息；`sourceMappingURL`指向`base64`字符串。
④`cheap-module-source-map`表示代码只映射到行信息；不仅映射业务代码，而且映射第三方模块代码；`sourceMappingURL`指向打包生成的`map`文件。
5. `devtool`适用环境
开发环境：`eval`、`eval-source-map`、`cheap-eval-source-map`、`cheap-module-eval-source-map`。
生产环境：`source-map`、`hidden-source-map`、`nosources-source-map`。
5. `devtool`最佳实践
开发(`development`)环境：`cheap-module-eval-source-map`/`cheap-module-source-map`
生产(`production`)环境：`source-map`
## 7.2 插件
1. 插件实现了对 `source map` 生成，进行更细粒度的控制。它可以替代 [`devtool`](https://www.webpackjs.com/configuration/devtool/) 选项。
2. 文档
[`eval-source-map-dev-tool-plugin`](https://www.webpackjs.com/plugins/eval-source-map-dev-tool-plugin/)
[`source-map-dev-tool-plugin`](https://www.webpackjs.com/plugins/source-map-dev-tool-plugin/)
## 7.3 CSS SourceMap
1. 准备工作
`10. 加载样式`
2. 编辑打包配置文件
`webpack.dev.config.js`
```
{
  test: /\.css$/,
  use: [
    {
      loader: "style-loader",
      options: {
        //singleton: true,
        sourceMap: true
      }
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [ require('autoprefixer')()],
        sourceMap: true
      }
    }
  ]
}
```
3. `CSS`开启`SourceMap`配置总结
(1) 关闭`style-loader`中的`singleton`选项。
(2) 处理样式的所有`loader`(`style-loader`、`css-loader`、`postcss-loader`)都开启`sourceMap`选项。
# 8. 加载脚本
## 8.1 ES6语法
1. 安装依赖
`npm i -D babel-loader @babel/core @babel/preset-env`
> 打开[babel](https://babel.docschina.org/setup#installation)文档，可以看到在不同工具中使用`babel`的方法。
2. 编辑打包配置文件
```
   //...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: []
        }
      }
    ]
  }
  //...
```
3. 执行打包命令
`npm run bundle`
此时生成的`app.bundle.js`大小为`28.8 KB`。 
> `@babel/preset-env`只支持`stage-4`范围内的`JavaScript`语法。
`stage`的包含顺序是：左边包含右边全部特性。
`stage-0 > stage-1 > stage-2 > stage-3 > stage-4`。
## 8.2 添加polyfill
1.  `babel-polyfill`[文档](https://babel.docschina.org/docs/en/babel-polyfill)
2. `babel-polyfill`[介绍](http://www.ruanyifeng.com/blog/2016/01/babel.html)
`Babel`默认只转换新的`JavaScript`句法（`syntax`），而不转换新的`API`，比如`Iterator`、`Generator`、`Set`、`Maps`、`Proxy`、`Reflect`、`Symbol`、`Promise`等全局对象，以及一些定义在全局对象上的方法（比如`Object.assign`）都不会转码。
举例来说，`ES6`在`Array`对象上新增了`Array.from`方法。`Babel`就不会转码这个方法。如果想让这个方法运行，必须使用`babel-polyfill`，为当前环境提供一个垫片。
3. 安装依赖
`npm install --save @babel/polyfill`
`@babel/polyfill`依赖安装到`dependencies`，而不是`devDependencies`。
4. 编辑入口文件
`src/index.js`
```
import "@babel/polyfill";
//...
```
5. 执行打包命令
`npm run bundle`
由于将所有的`polyfill`都打包输出，此时生成的`app.bundle.js`大小为`534 KB`。
6. `polyfill`按需打包
(1) 安装依赖
`npm i core-js@2 --save`
(2) 编辑打包配置文件
`webpack.dev.config.js` 
```
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [ "@babel/preset-env", {"useBuiltIns": "usage", "corejs": 2}]
          ],
          plugins: []
        }
      }
```
> `useBuiltIns`可选值为一个布尔值，默认为`false`。当设置为`true`时，表示使用浏览器内置的语法，而不是对任意插件进行全量`polyfill`。

(3) 编辑入口文件
`src/index.js`
```
//import "@babel/polyfill";
//...
```
> `When setting "useBuiltIns": "usage", polyfills are automatically imported when needed.
  Please remove the import '@babel/polyfill' call or use "useBuiltIns": 'entry' instead.`

(4) 执行打包命令
`npm run bundle`
此时生成的`app.bundle.js`大小为`84.6 KB `。
7. 指定项目支持的浏览器版本
(1) 编辑打包配置文件
`webpack.dev.config.js`
```
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            //browsers: [ ">1%"],
            chrome: "67",
            safari: "11.1"
          },
          "useBuiltIns": "usage",
          "corejs": 2
        }
      ]
    ],
    plugins: []
  }
}
```
> 当指定[`targets`](https://babel.docschina.org/docs/en/usage)浏览器版本时，`@babel/preset-env`和`@babel/polyfill`只对指定浏览器版本不支持的语法进行转码和添加垫片。

(2) 执行打包命令
`npm run bundle`
此时生成的`app.bundle.js`大小为`28.7 KB`。
## 8.3 transform-runtime
1.  `transform-runtime`[文档](https://babel.docschina.org/docs/en/babel-plugin-transform-runtime)
2. `transform-runtime`与`babel-polyfill`[对比](https://juejin.im/post/5a96859a6fb9a063523e2591)
运行环境中并没有实现的`API`，`babel-polyfill`会给其做兼容。 这样做有一个缺点，就是会污染全局变量。不推荐在一些方法类库中去使用。为了不污染全局对象和内置的对象原型，又想使用新的`API`，就可以使用`transform-runtime`。
> `transform-runtime`可以以闭包的形式实现`babel-polyfill`的功能，不污染全局变量。`src/index.js`文件中无需引入`import "@babel/polyfill";`。
3. 安装依赖
`npm install --save-dev @babel/plugin-transform-runtime`
`npm install --save @babel/runtime`
`npm install --save @babel/runtime-corejs2`
4. 编辑打包配置文件
`webpack.dev.config.js`
```
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    plugins: [
      [
        "@babel/plugin-transform-runtime",
        {
          "corejs": 2,
          "helpers": true,
          "regenerator": true,
          "useESModules": false
        }
      ]
    ]
  }
}
```
> `corejs`如果设置为`false`，则不需要安装`@babel/runtime-corejs2`。
5. 执行打包命令
`npm run bundle`
此时生成的`app.bundle.js`大小为`116 KiB` 。
6. 简化打包配置文件
创建`.babelrc`文件，并将`options`值剪切到该文件中。
```
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```
> 如果你写的是业务代码，则使用`babel-polyfill`。如果你写的是第三方类库，则需要使用`plugin-transform-runtime`。
## 8.4 Stage-0语法支持
1. 安装依赖
```
➜  webpack-operate npm i @babel/plugin-proposal-function-bind @babel/plugin-proposal-export-default-from @babel/plugin-proposal-logical-assignment-operaors @babel/plugin-proposal-optional-chaining @babel/plugin-proposal-pipeline-operator @babel/plugin-proposal-nullish-coalescing-operator @babel/plugin-proposal-do-expressions @babel/plugin-proposal-decorators @babel/plugin-proposal-function-sent @babel/plugin-proposal-export-namespace-from @babel/plugin-proposal-numeric-separator @babel/plugin-proposal-throw-expressions @babel/plugin-syntax-dynamic-import @babel/plugin-syntax-import-meta @babel/plugin-proposal-class-properties @babel/plugin-proposal-json-strings -D
```
2. 编辑`babel`配置文件
```
 "plugins": [
    // Stage 0
    "@babel/plugin-proposal-function-bind",

    // Stage 1
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-logical-assignment-operators",
    ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
    ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
    ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
    "@babel/plugin-proposal-do-expressions",

    // Stage 2
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",

    // Stage 3
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    "@babel/plugin-proposal-json-strings"
  ]
```
> [`Babel 7，Removing Babel's Stage Presets`]([https://lancelou.com/post/babel7-removing-babels-stage-presets-intro-and-meaning](https://lancelou.com/post/babel7-removing-babels-stage-presets-intro-and-meaning)
)
## 8.5 React语法
1. `babel-preset-react`[文档](https://babel.docschina.org/docs/en/babel-preset-react)
2. 安装依赖
`➜  webpack-operate npm i react react-dom --save`
`➜  webpack-operate npm install --save-dev @babel/preset-react`
3. 编辑`babel`配置文件
```
{
  "presets": [
    [
      "@babel/preset-env", {
        "targets": {
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": 2
      }
    ],
    "@babel/preset-react"
  ]
}
```
> `presets`的执行顺序为数组从后向前。`@babel/preset-env`和`@babel/preset-react`的顺序不能变。
4. 编辑入口文件
`./src/index.js`
```
import React, { Component } from 'react'
import ReactDom from 'react-dom'

class App extends Component {
  render() {
    return (
      <div>
        Hello world!!!
      </div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('root'))
```
#9. 加载图片
## 9.1 file-loader
1. 安装依赖
`npm install --save-dev file-loader`
2. 编辑打包配置文件
`webpack.dev.config.js`
```
  module: {
    rules: [{
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }]
  }
```
3. 添加图片
`src/assets/weixin.jpg`
4. 修改`src/index.js`文件
```
var img = require('./assets/weixin.jpg')

var myLogo = new Image()
myLogo.src = img
document.body.appendChild(myLogo)
```
> 图片资源作为`img`元素。
5. 修改`src/style.css`文件
```
body {
  background: url('./logo.png')
}
```
> 图片资源作为元素背景。
6. 修改图片打包输出路径及文件名
`webpack.dev.config.js`
```
  module: {
    rules: [{
      test: /\.(png|svg|jpg|gif)$/,
      use: {
        loader:'file-loader',
        options: {
          name: '[name]-[hash:5].[ext]',
          outputPath: 'images/'
        }
      }
    }]
  }
```
> `file-loader`中的[placeholders]( https://webpack.docschina.org/loaders/file-loader/#placeholders)文档。
## 9.2 url-loader
1.  安装`url-loader`
`➜  webpack-operate npm i url-loader --save-dev`
2. 修改打包配置文件
`webpack.dev.config.js`
```
module: {
    rules: [{
      test: /\.(png|svg|jpg|gif)$/,
      use: {
        loader:'url-loader',
        options: {
          name: '[name]-[hash:5].[ext]',
          outputPath: 'images/'
        }
      }
    }]
  }
```
>  `url-loader`拥有`file-loader`的全部功能。
`url-loader`会将图片转化为`base64`字符串。
3. 将大于`4KB`的图片资源打包输出
```
module: {
    rules: [{
      test: /\.(png|svg|jpg|gif)$/,
      use: {
        loader:'url-loader',
        options: {
          name: '[name]-[hash:5].[ext]',
          outputPath: 'images/',
          limit: 4096
        }
      }
    }]
  }
```
## 9.3 其它loader
1. 图片压缩
[img-loader](https://github.com/vanwagonet/img-loader)
2. 自动合成雪碧图
[postcss-sprites](https://github.com/2createStudio/postcss-sprites)
# 10. 加载样式
## 10.1 使用CSS样式
1. 安装[依赖](https://webpack.docschina.org/loaders/css-loader/)
`npm install --save-dev style-loader css-loader`
2. 编辑打包配置文件
`webpack.dev.config.js`
```
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
              "style-loader",  // 将 JS 字符串生成为 style 节点
              "css-loader",    // 将 CSS 转化成 CommonJS 模块
        ]
      }
    ]
  }
```
> `webpack`中`loader`数组的执行顺序为从后向前。
3. 创建`src/style.css`文件
```
.img {
  width: 300px;
  height: 300px;
  transform: translate(100px, 100px);
}
```
4. 修改`src/index.js`文件
```
import './style.css'
var logo = require('./assets/weixin.jpg')

var myLogo = new Image()
myLogo.src = logo
myLogo.classList.add('img')
document.body.appendChild(myLogo)
```
> 使用`file-loader`或`url-loader`后才能支持`weixin.jpg`文件引入。
> 这种方式引入的`CSS`文件会被`style`标签包裹并插入到页面`head`内部。
5. 查询参数[importLoaders](https://webpack.docschina.org/loaders/css-loader/#importloaders) 
 用于配置**`css-loader `作用于 `@import` 的资源之前**有多少个`loader`。
## 10.2 style-loader配置项
1.  `style-loader`配置项[文档](https://webpack.docschina.org/loaders/style-loader/)
2. 编辑打包配置文件
```
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              insertInto: () => document.querySelector("#root"),//插入到指定DOM
              singleton: true, //是否只使用一个style标签
              transform: './src/css-transform.js'
            }
          },
          'css-loader'
        ]
      }
```
3. 创建并编辑变形文件
```
module.exports = function(css) {
  // Here we can change the original css
  console.log(css);
  if(window.innerWidth > 768) {
    return css.replace('yellow', 'red');
  } else {
    return css.replace('yellow', 'pink');
  }
};
```
## 10.3 style-loader/useable
1.  编辑打包配置文件
`webpack.dev.config.js`
```
  {
    test: /\.css$/,
    use: [
      'style-loader/useable',
      'css-loader'
    ]
  }
```
2. 修改`src/index.js`文件
```
import base from './style.css'

let flag = true;
setInterval(() => {
  if(flag) {
    base.unuse()
  } else {
    base.use()
  }
  flag = !flag
}, 500);
```
`./style.css`样式每`500ms`在生效和不生效两种状态之间切换一次。
> 使用`style-loader/useable`后，样式默认不生效。必须调用`use()`方法才会生效。
## 10.4 CSS模块化
1. 修改`webpack.dev.config.js`
```
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]'
      }
    }
  ]
}
```
2. 修改`src/index.js`文件
```
import style from './style.css'
var src = require('./assets/weixin.jpg')

var logo1 = new Image()
logo1.src = src
logo1.classList.add(style.img)
document.body.appendChild(logo1)

var logo2 = new Image()
logo2.src = src
logo2.classList.add('img')
document.body.appendChild(logo2)
```
> `./style.css`并不会成为全局样式。
`style.img`类会创建一个由`[path][name]__[local]--[hash:base64:5]`组成的类名，并添加`./style.css`中的`.img`样式。
`'img'`类并不会添加`./style.css`中的`.img`样式。
3. 作用域
`:local(.className)` 可以被用来在局部作用域中声明 `className`。局部的作用域标识符会以模块形式暴露出去。
`:global(.className)` 可以用来声明一个明确的全局选择器。
> 以上配置都是`css-loader@2.X`版本的配置，`css-loader@1.X`版本[配置](https://www.jianshu.com/p/1943cfe750d1)与`@2.X`版本配置不同。
## 10.5 使用SCSS样式
1. 安装[依赖](https://webpack.docschina.org/loaders/sass-loader/)
`npm install sass-loader node-sass --save-dev`
2. 编辑打包配置文件
`webpack.dev.config.js`
```
{
  test: /\.scss$/,
  use: [
    "style-loader", // 将 JS 字符串生成为 style 节点
    "css-loader", // 将 CSS 转化成 CommonJS 模块
    "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
  ]
}
```
3. 创建`src/style.scss`文件
```
body {
  img {
    width: 300px;
    height: 300px;
  }
}
```
4. 引入`src/style.scss`文件
```
import './style.scss'
```
## 10.6 添加样式兼容前缀
1. 安装[依赖](https://webpack.docschina.org/loaders/postcss-loader/)
`➜  webpack-operate npm i postcss-loader autoprefixer -D`
> `-D`等价与`--save-dev`
2. 编辑打包配置文件
`webpack.dev.config.js`
```
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [ require('autoprefixer')()]
            }
          }
        ]
      }
    ]
  }
```
> `postcss-loader`如果与`sass-loader`同时使用，则`postcss-loader`在`loader`数组中位于`sass-loader`之后。
## 10.7 使用字体图标
1. 进入[阿里云图标网站](https://www.iconfont.cn/)
2.  创建项目并添加图标
3.  下载`Unicode`至本地并解压
4.  拷贝文件
    将`iconfont.eot`、`iconfont.svg`、`iconfont.ttf`、`iconfont.woff`文件拷贝到项目中。项目路径如下：
    `./src/font/iconfont.XXX`
5.  将`iconfont.css`文件内容拷贝到`src/style.css`并修改`url`路径
```
@font-face {font-family: "iconfont";
  src: url('./font/iconfont.eot?t=1554215262535'); /* IE9 */
  src: url('./font/iconfont.eot?t=1554215262535#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALoAAsAAAAABpQAAAKbAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBHIEcATYCJAMICwYABCAFhG0HMxvFBRHVk0tkXx9wcomVY8Ck6KrLNGtjkwhFT/9iuvM1Ch7cCAfnfTw87fft3Dfz/86KGyLaRCuNRKKSNVESGRqRrB2P4om6rwEKuABNzW1ibUkMt+iNRsSTWPbMSH8ks/pynaO0JXqChifQ1nSPpAg5c5zvkrXsITvJd+x8WEbQKUyFsAKgSxAl3/k81+QroAPJD3SOt6qgosQBjvc8QLvsaCAD3hg3jF3gEh4TaDNlQ5xZNJpUkVmrAnE7nQ+pkkvLMqsVoVlzMI/FkUr1qHJ5HP4+fu0KiUojsdou3apPqBNfsZekXb3Sni8IdoyEDWTiWm35giQYm7SVszn21Rx8Xaxr3yv26hLsr7MaO8AEVO5J42pvtVbBbU21iUOjPpfYvNt9hgdX+HwprZvevb4Q0sYkMrwR8lH7b63z+LyxOsJm/44P0PtN9uLlapBnxrYD/u7smF2/dxj+WHCwmMGTRa1+YXbxX60ql7Pck+SViyP1t7rUCdRb9T+Hk/PvXnP2eSl3U+5/6WXw7mVuqO8XRTlDJPhTXdl6i7zAdVa5ymiZHKhs3kFHmzbUULzPl7H2wduqh2JwRLTFZJpLirWMGTIbaGi3B03FcbRZd/54u353JJFbseYeQOjxFJUuL5D0eEtk5jMahvxBU0+waHMjuLDdUoCpNiUMGJ8Q/iCN6ko6Ptai5gvGryKgrC7kHkgqzYGlm8XaEiukObaod2wzS5BUl7AAz2FR1NBQnWHEesLcOIYh696kR3UpNDElDBifEP4gjepK+qNZK33/gvGrCKhloCZ/IKl0drB0swexNFe9Bu5FjXrHNrMESXUJCzAPi6KGpn5ehhHryYhi4xj2MNnXrK9vLb/uGLQJy1F17B1JV3FAXli8UAgA') format('woff2'),
  url('./font/iconfont.woff?t=1554215262535') format('woff'),
  url('./font/iconfont.ttf?t=1554215262535') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('./font/iconfont.svg?t=1554215262535#iconfont') format('svg'); /* iOS 4.1- */
}

:global(.iconfont) {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:global(.iconstar_blue:before) {
  content: "\e625";
}
```
> 由于`css-loader`使用了`css`模块化(`modules`)， 所以这里需要使用`:global(.className)`声明全局选择器。
6. 修改`src/index.js`
```
import './style.css'

document.body.innerHTML = `<div>
    <span class='iconfont iconstar_blue'></span>
    <span class='iconfont'>&#xe625;</span>
</div>`
```
7. 编辑打包配置文件
```
 {
    test: /\.(eot|ttf|svg|woff)$/,
    use: {
      loader: "file-loader",
      options: {
         name: '[name]-[hash:5].[ext]',
         outputPath: 'font/'
      }
    }
  }
```
#11. Entry与Output配置
##11.1 多个输出文件
1. 创建`src/print.js`文件
```
console.log('print')
```
2. 修改打包配置文件
`webpack.dev.config.js`
```
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
```
3. 执行打包命令
`npm run dev`
`webpack`打包输出几个`bundle`文件并不是由模块依赖树决定，而是根据打包配置文件中的`output`决定。即使`src/index.js`文件引入了`src/print.js`文件，仍会将后者打包输出为单独的`bundle`。
## 11.2 publicPath配置
1. 修改打包配置文件
`webpack.dev.config.js`
```
  //...
  output: {
    publicPath: 'http://cdn.com.cn',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
  //...
```
2. 执行打包命令
`npm run dev`
此时，通过`html-webpack-plugin`插件在`dist`目录中生成的`html`文件中引入打包生成的`js`文件的`src`会添加`http://cdn.com.cn`公共路径。
```
<script type="text/javascript" src="http://cdn.com.cn/app.bundle.js"></script>
<script type="text/javascript" src="http://cdn.com.cn/print.bundle.js"></script>
```
## 11.3 浏览器长缓存(Caching)
1. 提取第三方库的代码、使用`contentHash`、提取`webpack runtime`。
2. 在生产环境中。为了利用浏览器缓存并及时更新。我们希望当代码变化时，打包生成的文件名变化。当代码没有变化时，打包生成的文件名不变。
3. 修改打包配置文件
`webpack.dev.config.js`
```
//...
output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js',
  },
//...
```
> 打生产环境包才需要这样配置。
> 在使用 [`ExtractTextWebpackPlugin`](https://www.webpackjs.com/plugins/extract-text-webpack-plugin) 时，可以用 `[contenthash]` 来获取提取文件的 `hash`既不是`[hash]`也不是`[chunkhash]`）。
4. 在`webpack 4`早期版本中，可能出现代码内容没有变化，但是重新打包`contentHash`仍然变化的情况。原因是打包输出的`js`文件之间的关系代码`manifest`发生变化。可以通过将`manifest`代码分割的方式解决。
```
  //...
  optimization: {
    runtimeChunk: {
        name: 'runtime'
    }
  }
  //...
```
> 最新版本`webpack`不需要此项配置。
# 参考资料
[Javascript 设计模式系统讲解与应用](https://coding.imooc.com/class/chapter/255.html)
[Webpack中文文档](https://webpack.docschina.org/)
