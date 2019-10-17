# 1. 编写一个Loader
##1.1 初始化项目
1. 创建文件夹
`make-loader`
2. 初始化`npm`包
`➜  make-loader npm init -y`
3. 安装依赖
`➜  make-loader npm i webpack webpack-cli --D`
4. 创建打包入口文件
`src/index.js`
```
console.log("drew");
```
5. 创建打包配置文件
`webpack.config.js`
```
module.exports = {
  mode: "development",
  entry: {
    main: './src/index.js'
  }
}
```
6. 添加打包命令
`package.json`
```
  "scripts": {
    "build": "webpack"
  }
```
7. 打包输出
`npm run build`
## 1.2 最简单的loader
1. `loaders`[文档](https://www.webpackjs.com/api/loaders/)
2. 创建`loader`
`loaders/replaceLoader.js`
```
module.exports = function (source) {
  //console.log(source);  //console.log("drew");
  return source.replace('drew', 'nmwei')
}
```
> 不能使用箭头函数，否则`this`指向错误，无法使用`this.XXX`的`api`。
3. 使用`loader`
`webpack.config.js`
```
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        path.resolve(__dirname, './loaders/replaceLoader.js')
      ]
    }]
  }
```
4. 打包输出
`npm run build`
```
/***/ (function(module, exports) {
eval("console.log(\"nmwei\");\n\n//# sourceURL=webpack:///./src/index.js?");
/***/ })
/******/ });
```
## 1.3 loader传参
1. 编辑`loader`
`loaders/replaceLoader.js`
```
//不能写箭头函数，否则this指向错误
module.exports = function (source) {
  //console.log(source); //console.log("drew");
  return source.replace('drew', this.query.name)
}
```
> 通过`this.query`获取参数。
2. 编辑打包配置文件
`webpack.config.js`
```
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        {
          loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
          options: { name: 'nimengwei' }
        }
      ]
    }]
  }
```
3. 打包输出
`npm run build`
```
/***/ (function(module, exports) {
eval("console.log(\"nimengwei\");\n\n//# sourceURL=webpack:///./src/index.js?");
/***/ })
/******/ });
```
4. 使用`loader-utils`获取参数
(1) 安装依赖
`➜  make-loader npm i loader-utils --D`
(2) 编辑`loader`
`loaders/replaceLoader.js`
```
const loaderUtils = require('loader-utils');

module.exports = function (source) {
  //console.log(source); //console.log("drew");
  const options = loaderUtils.getOptions(this);
  return source.replace('drew', options.name)
}
```
## 1.4 this.callback
1. [语法](https://www.webpackjs.com/api/loaders/#this-callback)
一个可以同步或者异步调用的可以返回多个结果的函数。预期的参数是：
```
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
);
```
* 第一个参数必须是 `Error` 或者 `null`
* 第二个参数是一个 `string` 或者 [`Buffer`](https://nodejs.org/api/buffer.html)。
* 可选的：第三个参数必须是一个可以被[这个模块](https://github.com/mozilla/source-map)解析的 `source map`。
* 可选的：第四个选项，会被 `webpack` 忽略，可以是任何东西（例如一些元数据）。
2. 编辑`loader`
`loaders/replaceLoader.js`
```
const loaderUtils = require('loader-utils');

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  this.callback(null, source.replace('drew', options.name));
}
```
## 1.5 this.async
1. [文档](https://www.webpackjs.com/api/loaders/#this-async)
告诉 [`loader-runner`](https://github.com/webpack/loader-runner) 这个 `loader` 将会异步地回调。返回 `this.callback`。
2. 编辑`loader`
`loaders/replaceLoader.js`
```
const loaderUtils = require('loader-utils');

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  const callback = this.async();
  setTimeout(() => {
    callback(null, source.replace('drew', options.name));
  }, 1000)
}
```
## 1.6 简化loader路径
1. 编辑打包配置文件
`webpack.config.js`
```
  resolveLoader: {
    modules: [ 'node_modules', './loaders' ]
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        {
          loader: 'replaceLoader.js',
        },
        {
          loader: 'replaceLoaderAsync.js',
          options: {
            name: 'nimengwei'
          }
        }
      ]
    }]
  }
```
# 2. 编写一个Plugin
## 2.1 Plugin介绍
1. `Plugin`和`Loader`的区别
 `Loader`：处理某种类型文件。
`Plugin`：在打包的某一个时刻做一些事情。
`webpack`源码中有很大一部分都是基于`Plugin`机制编写的。
2. `compiler` 钩子[文档](https://www.webpackjs.com/api/compiler-hooks/)
`Compiler` 模块是 `webpack` 的支柱引擎，它通过 [CLI](https://www.webpackjs.com/api/cli) 或 [Node API](https://www.webpackjs.com/api/node) 传递的所有选项，创建出一个 `compilation` 实例。它扩展(`extend`)自 `Tapable` 类，以便注册和调用插件。大多数面向用户的插件首，会先在 `Compiler`上注册。
3. 相关钩子
以下生命周期钩子函数，是由 `compiler` 暴露，可以通过如下方式访问：
`compiler.hooks.someHook.tap(...)`
取决于不同的钩子类型，也可以在某些钩子上访问 `tapAsync` 和`tapPromise`。
(1) `AsyncSeriesHook`表示异步的钩子，使用`tapAsync` 或`tapPromise`监听。
(2) `SyncHook`表示同步的钩子，使用`tap`监听。

| 钩子 | 类型 | 执行时机 | 参数 | 
|:-----:|:--------:|:------:|:-----:|
| `compile` | `SyncHook ` | 一个新的编译(`compilation`)创建之后，钩入(`hook into`) `compiler`。 | `compilationParams` |
| `emit` | `AsyncSeriesHook ` | 生成资源到 `output` 目录之前。 | `compilation` |
| `done` | `SyncHook` | 编译(`compilation`)完成。 | `stats` |
| ... | ...  | ...  | ... |
## 2.2 初始化项目
1. 创建文件夹
`plugin`
2. 初始化`npm`包
`npm init -y`
3. 安装依赖
`npm i webpack webpack-cli --D`
4. 创建打包入口文件
`src/index.js`
```
console.log("hello world!");
```
5. 创建打包配置文件
`webpack.config.js`
```
module.exports = {
  mode: "development",
  entry: {
    main: './src/index.js'
  }
}
```
6. 添加打包命令
`package.json`
```
  "scripts": {
    "build": "webpack"
  }
```
7. 打包输出
`npm run build`
## 2.3 编写Plugin 
1. 创建插件文件
`plugins/copyright-webpack-plugin.js`
```
class CopyRightWebpackPlugin {
  constructor(options) {
    //console.log(options) //{ name: 'drew' }
  }

  apply(compiler) {
    //compile为同步的钩子，使用tap监听
    compiler.hooks.compile.tap('CopyRightWebpackPlugin', (compilationParams) => {
      console.log('compile');
    })

    //emit为异步的钩子，使用tapAsync或tapPromise监听
    compiler.hooks.emit.tapAsync('CopyRightWebpackPlugin', (compilation, cb) => {
      compilation.assets['copyright.txt'] = {
        source: function () {
          return 'copyright by nimengwei'
        },
        size: function () {
          return 22
        }
      }
      cb()
    })
  }
}

module.exports = CopyRightWebpackPlugin
```
> `loader`是一个函数，`plugin`是一个类。
2. 编译打包配置文件
`webpack.config.js`
```
const CopyRightWebpackPlugin = require('./plugins/copyright-webpack-plugin')

//...
  plugins: [
    new CopyRightWebpackPlugin({
      name: 'drew'
    })
  ]
//...
```
3. 打包输出
`npm run build`
```
        Asset      Size  Chunks             Chunk Names
copyright.txt  22 bytes          [emitted]  
      main.js   3.8 KiB    main  [emitted]  main
```
生成`copyright.txt`文件，内容为`copyright by nimengwei`。
## 2.4 调试
1. [node.js调试入门](https://www.imooc.com/learn/1093)
2. 插件代码添加断点
```
  //...
    compiler.hooks.emit.tapAsync('CopyRightWebpackPlugin', (compilation, cb) => {
      debugger;
      //...
    })
  //...
```
3. 添加调试命令
`package.json`
```
//...
  "scripts": {
    "build": "webpack",
    "debug": "node --inspect --inspect-brk node_modules/webpack/bin/webpack.js"
  }
//...
```
> `webpack`命令等价于`node node_modules/webpack/bin/webpack.js`。
`--inspect`表示开启`node`调试工具。
`--inspect-brk`表示在`webpack.js`的第一行添加一个断点。
4. 打包调试
`npm run debug`
```
> plugin@1.0.0 debug /Users/nimengwei/Code/mycode/webpack/plugin
> node --inspect --inspect-brk node_modules/webpack/bin/webpack.js

Debugger listening on ws://127.0.0.1:9229/9137ce93-f858-4850-a92b-5630a73110d1
For help, see: https://nodejs.org/en/docs/inspector
```
5. 打开`127.0.0.1:9229/json`
![image.png](https://upload-images.jianshu.io/upload_images/4989175-4a6e2f5a5cfecdcf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
6. 打开`devtoolsFrontendUrl`值 `chrome-devtools://devtools/bundled/...`
7. 调试代码打包完成
```
Built at: 04/19/2019 8:36:12 AM
        Asset      Size  Chunks             Chunk Names
copyright.txt  22 bytes          [emitted]  
      main.js   3.8 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/index.js] 28 bytes {main} [built]
Waiting for the debugger to disconnect...
```
# 3. 编写一个Bundler
## 3.1 模块分析
1. 初始化项目

(1) 项目文件夹
`bundler`
(2) 业务代码
`src/word.js`
```
export const word = 'hello';
```
`src/message.js`
```
import { word } from './word.js';
const message = `say ${word}`;
export default message
```
`src/index.js`
```
import message from './message.js'
console.log(message)
```
(3) 打包脚本
`bundler.js`
2. 安装依赖
`➜  bundler npm install cli-highlight -g`
`➜  bundler npm i @babel/parser --save`
`➜  bundler npm i @babel/traverse --save`
`➜  bundler npm i @babel/core --save `
`➜  bundler npm install @babel/preset-env --save`
>  `cli-highlight`：在`cmd`中高亮打印代码。
`babel-parser`([文档](https://babeljs.io/docs/en/babel-parser))：将代码字符串转化为抽象语法树(`AST`)。
`@babel/traverse`：对抽象语法树遍历进行封装。
`@babel/core`为([文档](https://babeljs.io/docs/en/babel-core))：`babel`核心模块。
`@babel/preset-env`([文档](https://babeljs.io/docs/en/babel-preset-env))：转化代码。
3. 编辑打包文件
`bundler.js`
```
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, 'utf-8');
  //console.log(content);  //代码字符串
  const ast = parser.parse(content, {
    sourceType: "module"
  })
  //console.log(ast) //抽象语法树
  //console.log(ast.program.body);
  const dependencies = {};
  traverse(ast, {
    //获取ImportDeclaration语法节点数组
    ImportDeclaration({node}) {
      //filename所在文件夹
      const dirname = path.dirname(filename);
      //获取import引入的文件的绝对路径
      const newFile = `./${path.join(dirname, node.source.value)}`;
      dependencies[node.source.value] = newFile;
    }
  });
  //console.log(dependencies); //{ './message.js': './src/message.js' }
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  }); //ast转化为es5代码
  return {
    code,
    filename,
    dependencies
  }
}

const moduleInfo = moduleAnalyser('./src/index.js');
console.log(moduleInfo);
```
4. 打包输出
`➜  bundler node bundler.js | highlight`
```
{ code:
   '"use strict";\n\nvar _message = _interopRequireDefault(require("./message.js"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n\nconsole.log(_message["default"]);',
  filename: './src/index.js',
  dependencies: { './message.js': './src/message.js' } }
```
> 实现了对单个文件依赖和源代码的分析。
## 3.2 依赖图谱(Dependencies Graph)
1. 编辑打包文件
`bundler.js`
```
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, 'utf-8');
  //console.log(content);  //代码字符串
  const ast = parser.parse(content, {
    sourceType: "module"
  })
  //console.log(ast) //抽象语法树
  //console.log(ast.program.body);
  const dependencies = {};
  traverse(ast, {
    //获取ImportDeclaration语法节点数组
    ImportDeclaration({node}) {
      //filename所在文件夹
      const dirname = path.dirname(filename);
      //获取import引入的文件相对于当前文件的路径
      const newFile = `./${path.join(dirname, node.source.value)}`;
      dependencies[node.source.value] = newFile;
    }
  });
  //console.log(dependencies); //{ './message.js': './src/message.js' }
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  }); //ast转化为es5代码
  return {
    filename,
    dependencies,
    code
  }
}

//生成依赖图谱
const makeDependenciesGraph = (entry) => {
  const entryModule = moduleAnalyser(entry);
  const graphArray = [entryModule];
  for (let i = 0; i < graphArray.length; i++) {
    const dependencies = graphArray[i].dependencies;
    if(dependencies) {
      for(let j in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[j]));
      }
    }
  }
  const graph = {};
  graphArray.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })
  return graph;
}

const graphInfo = makeDependenciesGraph('./src/index.js');
console.log(graphInfo);
```
2. 打包输出
`➜ bundler node bundler.js | highlight`
```
{ './src/index.js':
   { dependencies: { './message.js': './src/message.js' },
     code:
      '"use strict";\n\nvar _message = _interopRequireDefault(require("./message.js"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n\nconsole.log(_message["default"]);' },
  './src/message.js':
   { dependencies: { './word.js': './src/word.js' },
     code:
      '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports["default"] = void 0;\n\nvar _word = require("./word.js");\n\nvar message = "say ".concat(_word.word);\nvar _default = message;\nexports["default"] = _default;' },
  './src/word.js':
   { dependencies: {},
     code:
      '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.word = void 0;\nvar word = \'hello\';\nexports.word = word;' } }
```
> 生成`{src: {dependencies, code}, ...}`依赖图谱。
## 3.3 生成代码
1. 编辑打包文件
`bundler.js`
```
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, 'utf-8');
  //console.log(content);  //代码字符串
  const ast = parser.parse(content, {
    sourceType: "module"
  })
  //console.log(ast) //抽象语法树
  //console.log(ast.program.body);
  const dependencies = {};
  traverse(ast, {
    //获取ImportDeclaration语法节点数组
    ImportDeclaration({node}) {
      //filename所在文件夹
      const dirname = path.dirname(filename);
      //获取import引入的文件相对于当前文件的路径
      const newFile = `./${path.join(dirname, node.source.value)}`;
      dependencies[node.source.value] = newFile;
    }
  });
  //console.log(dependencies); //{ './message.js': './src/message.js' }
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  }); //ast转化为es5代码
  return {
    filename,
    dependencies,
    code
  }
}

//生成依赖图谱
const makeDependenciesGraph = (entry) => {
  const entryModule = moduleAnalyser(entry);
  const graphArray = [entryModule];
  for (let i = 0; i < graphArray.length; i++) {
    const dependencies = graphArray[i].dependencies;
    if(dependencies) {
      for(let j in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[j]));
      }
    }
  }
  const graph = {};
  graphArray.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })
  return graph;
}

const generateCode = (entry) => {
  const graph = makeDependenciesGraph(entry);
  const graphStr = JSON.stringify(graph)
  return `
  (function(graph) {
      function require(module) {
         function localRequire(relativePath) {
             return require(graph[module].dependencies[relativePath])
         }
         var exports = {};
         (function(require, exports, code) {
             eval(code)
         })(localRequire, exports, graph[module].code);
         return exports;
      }
      require('${entry}');
  })(${graphStr});
  `;

}

const code = generateCode('./src/index.js');
console.log(code);
```
2. 打包输出
`➜ bundler node bundler.js | highlight`
```
(function(graph) {
      function require(module) {
         function localRequire(relativePath) {
             return require(graph[module].dependencies[relativePath])
         }
         var exports = {};
         (function(require, exports, code) {
             eval(code)
         })(localRequire, exports, graph[module].code);
         return exports;
      }
      require('./src/index.js')
  })({"./src/index.js":{"dependencies":{"./message.js":"./src/message.js"},"code":"\"use strict\";\n\nvar _message = _interopRequireDefault(require(\"./message.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(_message[\"default\"]);"},"./src/message.js":{"dependencies":{"./word.js":"./src/word.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _word = require(\"./word.js\");\n\nvar message = \"say \".concat(_word.word);\nvar _default = message;\nexports[\"default\"] = _default;"},"./src/word.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.word = void 0;\nvar word = 'hello';\nexports.word = word;"}});
```
3. 将打包文件在浏览器控制台执行
打印出 `say hello`
![image.png](https://upload-images.jianshu.io/upload_images/4989175-a92739864ffd163d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 4. Create-React-App
1. [create-react-app](https://facebook.github.io/create-react-app/)
实现了`css`模块热更新，没有实现`js`模块热更新。
2. 初始化项目
`➜  webpack create-react-app my-app`
`➜  webpack cd my-app`
`➜  my-app git:(master) npm start`
3. 弹出`webpack`配置
`➜  my-app git:(master) ✗ npm run eject`
生成`config`和`scripts`文件夹。
> 使用`Create-React-App`初始化的项目打包配置默认是隐藏的，通过此命令可以展示出来。该命令是不可逆的。
4. 配置介绍
`scripts/build.js`：生产环境打包脚本。
`scripts/start.js`：开发环境打包脚本。
`config/env.js`：初始化环境变量。
`config/paths.js`：路径`url`。
`config/webpack.config.js`：`webpack`配置文件。
`config/webpackDevServer.config.js`：`webpackDevServer`配置文件。
# 5.  Vue-Cli 3.0
1. [vue-cli](https://cli.vuejs.org/zh/)
2. 初始化项目
`➜ webpack npm install -g @vue/cli`
`➜  webpack vue create my-project`
`➜  webpack cd my-project`
`➜  my-project git:(master) npm run serve`
3. 与`create-react-app`不同，`vue-cli`并没有提供类似`eject`的方法，暴露`webpack`打包配置，只提供了一些简单配置项。
4. [配置参考](https://cli.vuejs.org/zh/config/)
5. 创建`vue.config.js`
```
const path = require('path')

module.exports = {
  outputDir: 'build', //打包输出文件件
  devServer: {
    //不仅在build文件件中查找，还在static文件中查找
    contentBase: [path.resolve(__dirname, 'static')]
  },
  configureWebpack: { //可以添加webpack配置
  }
}
```
> 一般不需要直接通过`configureWebpack`添加`webpack`配置。
6. 打包
`➜  my-project git:(master) ✗ npm run serve`
7. 打开页面
![image.png](https://upload-images.jianshu.io/upload_images/4989175-7e731b7724bac122.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/4989175-0e860234f823d80a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 六. 总结
1. `webpack`和`grunt`和`gulp`有什么不同？
`webpack`是一个模块打包器，他可以递归的打包项目中的所有模块，最终生成几个打包后的文件。他和其他的工具最大的不同在于他支持`code-splitting`、模块化(`AMD`、`ES Module`、`CommonJS`)、全局分析。
2. 什么是`module`，什么是`chunk`，什么是`bundle`？
`module`是开发中的单个模块。
`chunk`是指`webpack`在进行模块的依赖分析的时候，分割出来的代码块。
`bundle`是由`webpack`打包出来的文件。
3. 什么是`Loader`，什么是`Plugin`？
`Loader`是用来告诉`webpack`如何转化处理某一类型的文件，并且引入到打包出的文件中。
`Plugin`是用来自定义`webpack`打包过程的方式，一个插件是含有
`apply`方法的一个对象，通过这个方法可以参与到`webpack`打包的整个生命周期。
4. `webpack-dev-server`和`http`服务器(例如：`nginx`)有什么区别？
 `webpack-dev-server`使用内存来存储`webpack`开发环境下的打包文件，并且可以使用模块热更新。
