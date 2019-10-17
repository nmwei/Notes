# 1. Tree Shaking
## 1.1 JS Tree Shaking
### 1.1.1 本地代码Tree Shaking
1. 一个简单的打包示例

(1) 打包入口代码
`src/index.js`
```
import { add } from './math'
add(1,5)
```
`src/math.js`
```
export const add = (a, b) => {
  console.log(a + b)
}

export const minus = (a, b) => {
  console.log(a - b)
}
```
(2) 打包输出
`npm run bundle`
```
//...
/*! exports provided: add, minus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "minus", function() { return minus; });
const add = (a, b) => {
  console.log(a + b);
};
const minus = (a, b) => {
  console.log(a - b);
};
//...
```
(3) 问题分析
`src/index.js`仅引入了`add`方法，但是却打包了`add`方法和`minus`方法。
2. `Tree Shaking`
[tree shaking](https://webpack.docschina.org/guides/tree-shaking/) 是一个术语，通常用于描述移除 `JavaScript` 上下文中的未引用代码(`dead-code`)。
> `webpack 2.0`及之后版本支持`Tree Shaking`。
>  `webpack 3.X`[版本](https://www.jianshu.com/p/1943cfe750d1)开启`Tree Shaking`方式与 `webpack 4.X`不同。
> `Tree Shaking`只支持`ES Module`模块引入方式。不支持`commonjs`模块引入方式。

3. `development`模式开启`Tree Shaking`

(1) 编辑打包配置文件
`webpack.dev.config.js`
```
optimization: {
   usedExports: true
}
```
(2) 将文件标记为`side-effect-free`(无副作用)
编辑`package.json`
```
"sideEffects": ["*.css"]
```
> `side-effect-free`数组中标记的文件即使没有通过`ES Module`，也会被打包输出。如果没有文件设置为`side-effect-free`，则`sideEffects`值设置为`false`。

(3) 打包输出
```
/*! exports provided: add, minus */
/*! exports used: add */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return add; });
/* unused harmony export minus */
const add = (a, b) => {
  console.log(a + b);
};
const minus = (a, b) => {
  console.log(a - b);
};

/***/
```
4. `production`模式开启`Tree Shaking`
生产模式自动开启`Tree Shaking`，无需设置`optimization`。
> `Tree Shaking`开启的关键在于`JavaScript`代码压缩。在`webpack3.X`版本中，通过`UglifyJsPlugin`插件进行`JavaScript`代码压缩。在`webpack4.X`版本中，`mode: production`生产模式默认进行`JavaScript`代码压缩。
5. 结论
你可以将应用程序想象成一棵树。绿色表示实际用到的 `source code`(源码) 和`library`(库)，是树上绿色的树叶。灰色表示未引用代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。
>在以`import { add } from './math'`的方式引入模块时，`Tree Shaking`能够将`'./math'`中未被引入的模块过滤掉。
### 1.1.2  Lodash Tree Shaking
1. 编辑打包入口文件
`src/index.js`
```
import { join } from 'lodash';
console.log(_.join(['1','2', '3'], '-'))
```
2. 打包输出
```
     Asset       Size  Chunks             Chunk Names
index.html  199 bytes          [emitted]  
   main.js   70.3 KiB       0  [emitted]  app
```
只用到了`lodash`中的`join`方法，`main.js`包大小为`0.3 KiB`。很明显。`Tree Shaking`并没有生效。
3. 安装依赖
`npm i babel-plugin-lodash -D`
4. 编辑打包配置文件
`webapck.dev.config.js`
```
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [ "@babel/preset-env", {"useBuiltIns": "usage", "corejs": 2}]
          ],
          plugins: [
            "lodash" //对lodash进行Tree Shaking
          ]
        }
      }
```
5. 打包输出
```
     Asset       Size  Chunks             Chunk Names
index.html  199 bytes          [emitted]  
   main.js   1.08 KiB       0  [emitted]  app
```
经过`Tree Shaking`后，`main.js`包大小为`1.08 KiB`。
> 使用`babel-plugin-lodash`插件后，即使使用`import lodash from 'lodash'`方式引入`lodash`，`Tree Shaking`仍然生效。
## 1.2 CSS Tree Shaking
1. 安装依赖
` npm i -D purifycss-webpack purify-css glob-all`
2. 编辑打包配置文件
`webpack.dev.config.js`
```
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');
module.exports = {
//...
  plugins: [
    new PurifyCSS({
      paths: glob.sync([
        path.join(__dirname, './src/*.js')
      ])
    })
  ]
}
```
3. 打包输出
生成的`css`文件不包含`./src/*.js`中使用不到的样式。
> `purify-css`和`css modules`不可以同时使用。
# 2. webpack-merge
1. 安装依赖
`npm i webpack-merge -D`
2. 打包配置文件
(1) `build/webpack.base.config.js`
```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    publicPath: '',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [ require('autoprefixer')]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [ require('autoprefixer')]
            }
          }
        ]
      },
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
      },
      {
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name]-[hash:5].[ext]',
            outputPath: 'font/'
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader:'url-loader',
          options: {
            name: '[name]-[hash:5].[ext]',
            outputPath: 'images/',
            limit: 4096
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new CleanWebpackPlugin()
  ]
}
```
(2) `build/webpack.dev.config.js`
```
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const devConfig = {
  mode: "development",
  devtool: 'cheap-module-eval-source-map',
  optimization: {
    usedExports: true
  },
  devServer: {
    open: true, //浏览器自动打开
    port: 9000,
    contentBase: './dist',
    hot: true,
    //hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(baseConfig, devConfig)
```
(3) `build/webpack.prod.config.js`
```
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const prodConfig = {
  mode: "production",
  devtool: 'cheap-module-source-map',
}

module.exports = merge(baseConfig, prodConfig)
```
> `webpack-merge`可以对`module.rules`进行合并，但无法对单个`rule`中的`loader`进行合并。
3. 创建打包命令
`package.json`
```
  "scripts": {
    "build": "webpack --config ./build/webpack.prod.config.js",
    "dev": "webpack --config ./build/webpack.dev.config.js",
    "start": "webpack-dev-server --config ./build/webpack.dev.config.js",
  }
```
# 3. js代码分割(Code Splitting)
## 3.1 单独文件打包输出的缺点
1. 安装`lodash`
`npm i --save lodash`
2. 编辑`src/index.js`
```
import _ from 'lodash'
console.log(_.join(['1','2', '3'], '-'))
```
3. 打包分析
```
        Asset       Size  Chunks             Chunk Names
app.bundle.js   1.38 MiB     app  [emitted]  app
   index.html  221 bytes          [emitted]  
Entrypoint app = app.bundle.js
```
> 将`lodash`和业务代码打包到一个文件`app.bundle.js`。页面加载`js`耗时时间久。页面代码更新时，`app.bundle.js`全量更新。
## 3.2 多入口实现分包
1. 编辑打包配置文件
```
  entry: {
    lodash: path.resolve(__dirname, '../src/lodash.js'),
    app: path.resolve(__dirname, '../src/index.js')
  }
``` 
2. 编辑`src/lodash.js`
```
import lodash from 'lodash'
window.lodash = lodash
```
3. 编辑`src/index.js`
```
console.log(window.lodash.join(['1','2', '3'], '-'))
```
4. 打包分析
```
           Asset       Size  Chunks             Chunk Names
   app.bundle.js   29.1 KiB     app  [emitted]  app
      index.html  284 bytes          [emitted]  
lodash.bundle.js   1.38 MiB  lodash  [emitted]  lodash
Entrypoint lodash = lodash.bundle.js
Entrypoint app = app.bundle.js
```
> `entry`为多入口时，入口文件顺序即是`html`模板引入对应输出文件的顺序。**不同入口文件之间没有依赖关系**。
## 3.3 SplitChunksPlugin配置
### 3.3.1 同步代码分割
1. 通过[`SplitChunksPlugin`](https://webpack.docschina.org/plugins/split-chunks-plugin/)实现同步代码分割。
> `webpack 4+`支持`SplitChunksPlugin`。
2. 编辑打包配置文件
`webpack.base.config.js`
```
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
```
3. 编辑`src/index.js`
```
import _ from 'lodash'
console.log(_.join(['1','2', '3'], '-'))
```
4. 打包分析
`npm run dev`
```
Built at: 04/12/2019 9:37:25 AM
                Asset       Size       Chunks             Chunk Names
        app.bundle.js   32.4 KiB          app  [emitted]  app
           index.html  289 bytes               [emitted]  
vendors~app.bundle.js   1.35 MiB  vendors~app  [emitted]  vendors~app
Entrypoint app = vendors~app.bundle.js app.bundle.js
```
`lodash`打包输出代码被分割到`vendors~app.bundle.js`文件中。
> `chunk`表示打包输出模块，打包输出几个文件，`chunks`就有几个。
> 同步代码分割可以通过**浏览器缓存**功能提升第二次页面加载速度。
5. 指定代码分割打包输出文件名

(1) 编辑打包配置文件
```
  output: {
    //...
    chunkFilename: '[name].chunk.js',
    //...
  }
```
> 在`html`页面中直接引入的资源文件(`js`、`css`)命名以 `filename`为规则。间接引用的资源文件命名以`chunkFilename`为规则

(2) 打包分析
`npm run dev`
```
Built at: 04/12/2019 9:39:07 AM
               Asset       Size       Chunks             Chunk Names
       app.bundle.js   32.4 KiB          app  [emitted]  app
          index.html  288 bytes               [emitted]  
vendors~app.chunk.js   1.35 MiB  vendors~app  [emitted]  vendors~app
Entrypoint app = vendors~app.chunk.js app.bundle.js
```
### 3.3.2 异步代码分割
1. 使用[`@babel/plugin-syntax-dynamic-import`](https://babel.docschina.org/docs/en/babel-plugin-syntax-dynamic-import)实现代码分割
2. 安装依赖
`npm i @babel/plugin-syntax-dynamic-import -D`
3. 编辑`babel`配置
```
"plugins": [
    "@babel/plugin-syntax-dynamic-import"
]
```
4. 编辑`src/index.js`
```
import('lodash').then(({default : _}) => {
  console.log(_.join(['1','2', '3'], '-'))
})
```
5. 打包分析
`npm run dev`
```
Built at: 04/12/2019 9:29:30 AM
        Asset       Size  Chunks             Chunk Names
  0.bundle.js   1.35 MiB       0  [emitted]  
app.bundle.js   33.8 KiB     app  [emitted]  app
   index.html  221 bytes          [emitted]  
```
> `webpack`会自动对通过`import()`方法异步加载的模块进行代码分割。
> 异步代码分割既可以通过**浏览器缓存**功能提升第二次页面加载速度，又可以通过**懒加载**的方式提升首次页面加载速度。
6. 指定代码分割打包输出文件名
```
import(/* webpackChunkName: "lodash" */'lodash').then(({default : _}) => {
//...
```
> `import()`方法代码分割的底层还是通过`SplitChunksPlugin`实现的，`splitChunks`配置参数同样会影响`import()`方法代码分割情况。
### 3.3.3 SplitChunksPlugin配置参数
1. `optimization.splitChunks`默认配置项
```
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```
> `webpack4.X`版本才支持`SplitChunksPlugin`。在`webpack3.X`中，使用`CommonsChunkPlugin`进行代码分割。
2. `optimization.splitChunks`配置项说明
```
  optimization: {
    splitChunks: {
      chunks: 'all',
      //initial只对同步代码分割，async(默认)只对异步代码分割、all所有代码都做代码分割
      minSize: 30000,
      //大于30000Bit的模块才做代码分割
      maxSize: 0,
      //当模块大于maxSize时，会对模块做二次代码分割。当设置为0时，不做二次分割。
      minChunks: 1,
      //当打包输出chunks文件引用该模块的次数达到一定数目时才做代码分割。
      maxAsyncRequests: 5,
      //异步加载的js文件最大数目为边界条件进行代码分割
      maxInitialRequests: 3,
      //以初始加载的js文件最大数目为边界条件进行代码分割
      automaticNameDelimiter: '~',
      //代码分割生成文件连接符
      name: true,
      //代码分割生成文件自动生成文件名
      cacheGroups: {
        //代码分割缓存组，被分割代码文件通过缓存组输出为一个文件。
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          //模块路径正则表达式
          priority: -10,
          //缓存组优先级，一个模块优先打包输出到优先级高的缓存组中。
          name: 'vendor'
          //代码分割打包输出文件名
        },
        lodash: {
          test: /[\\/]lodash[\\/]/,
          priority: -5,
        },
        jquery: {
          test: /[\\/]jquery[\\/]/,
          priority: -5,
        },
        default: {
          //默认缓存组，一般设置priority优先级数值最小
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          //代码分割的模块A引用其他模块B，B已经被打包输出，则不再重新打包进入A
          name: 'common',
          chunks: 'all'
        }
      }
    }
  }
```
> **`optimization.splitChunks.chunks`可设置，默认值为`async`，表示默认只对动态`import()`做代码分割。`splitChunks.cacheGroups.{cacheGroup}.chunks`同样可以设置，默认值为`all`,表示`cacheGroups`分组代码分割优先级高于`import()`**。
## 3.4 懒加载(Lazy Loading)
1. [`Lazy Loading`](https://webpack.docschina.org/guides/lazy-loading/)文档。
2. `import()`实现懒加载
```
const lazyConsole = async () => {
  const {default : _} = await import(/* webpackChunkName: "lodash" */'lodash');
  console.log(_.join(['1','2', '3'], '-'))
};

document.addEventListener('click', lazyConsole)
```
`import()`动态加载不仅可以实现代码分割，还可以实现懒加载。
`lodash`模块生成的`vendors~lodash.bundle.js`文件在点击页面时才加载。
> 只有配置`chunkFilename`之后，`webpackChunkName`才生效。
如果多个 `import()`的魔法注释`webpackChunkName`指定同一个名字，则这多个`import()`模块会打包成一个`bundle`。
如果外部也引入了`import()`方法中引入的模块，则该模块不会分割单独打包。
## 3.5 预取/预加载模块(prefetch/preload module)
### 3.5.1 查看页面代码利用率
1. `chrome`浏览器打开网页
2. 打开调试面板
3. `commond + shift + p` -  `show coverage` - `instrument coverage`
![image.png](https://upload-images.jianshu.io/upload_images/4989175-b2fca193d70a2bc0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 刷新网页
![代码利用率](https://upload-images.jianshu.io/upload_images/4989175-48482f32ee52b7a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
5. 分析结果
红色表示加载并运行代码，绿色表示只加载未运行代码。
可以看到该页面加载的每一个文件的利用率以及综合利用率。
点击右侧横条，可以看到具体文件代码利用情况。
![image.png](https://upload-images.jianshu.io/upload_images/4989175-6e5bf583cb737aba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 3.5.2 提高代码利用率
1. 通过`import()`异步模块懒加载的方式可以提高首屏代码利用率。
2. 未使用懒加载
`src/index.js`
```
document.addEventListener('click',  () => {
  const element = document.createElement('div');
  element.innerHTML = 'Dell Li';
  document.body.appendChild(element)
});
```
代码利用率为：`77%`
![image.png](https://upload-images.jianshu.io/upload_images/4989175-8833bd55882b67a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 通过懒加载
`src/index.js`
```
document.addEventListener('click',  () => {
  import('./click').then(({default: click}) => {
    click && click()
  })
});
```
`src/click.js`
```
const handleClick = () => {
  const element = document.createElement('div');
  element.innerHTML = 'Dell Li';
  document.body.appendChild(element)
};

export default handleClick
```
代码利用率为：`81.5%`
![image.png](https://upload-images.jianshu.io/upload_images/4989175-515ce24ed2280c29.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
> 异步模块懒加载虽然可以减少首屏代码量，缩短网页首次加载时间，但等待用户交互后才请求对应`js`文件，会影响用户体验。可以通过`prefetch/preload`方式解决该问题。
### 3.5.3 prefetch/preload module
1. `webpack v4.6.0+` 添加了预取和预加载([prefetch/preload module](https://webpack.docschina.org/guides/code-splitting/#%E9%A2%84%E5%8F%96-%E9%A2%84%E5%8A%A0%E8%BD%BD%E6%A8%A1%E5%9D%97-prefetch-preload-module-))的支持。
2. 使用`prefetch`
`src/index.js`
```
document.addEventListener('click',  () => {
  import(/* webpackPrefetch: true */ './click').then(({default: click}) => {
    click && click()
  })
});
```
这会生成 `<link rel="prefetch" href="1.bundle.js">` 并追加到页面头部，指示着浏览器在闲置时间预取`1.bundle.js`文件。
3. `prefetch` / `preload`指令对比
* `preload chunk`会在父`chunk`加载时，以并行方式开始加载。`prefetch chunk` 会在父 `chunk` 加载结束后开始加载。
* `preload chunk` 具有中等优先级，并立即下载。`prefetch chunk` 在浏览器闲置时下载。
* `preload chunk` 会在父 `chunk` 中立即请求，用于当下时刻。`prefetch chunk` 会用于未来的某个时刻。
* 浏览器支持程度不同。
# 4. CSS文件的代码分割
## 4.1 现有CSS打包分析
1. 打包配置
`webpack.base.config.js`
```
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [ require('autoprefixer')]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [ require('autoprefixer')]
            }
          }
        ]
      }
    ]
  }
```
2. 入口文件

`src/index.js`
```
import './style.css'
```
`src/style.css`
```
body {
  background: yellow;
}
```
3. 打包输出
`npm run build`
```
Built at: 04/12/2019 3:53:13 PM
            Asset       Size  Chunks             Chunk Names
    app.bundle.js   6.79 KiB       0  [emitted]  app
app.bundle.js.map   3.04 KiB       0  [emitted]  app
       index.html  221 bytes          [emitted]  
Entrypoint app = app.bundle.js app.bundle.js.map
```
4. 存在的问题
没有打包输出`css`文件，`css`代码被打包到`js`中。
## 4.2 MiniCssExtractPlugin
1. `MiniCssExtractPlugin`[文档介绍](https://webpack.docschina.org/plugins/mini-css-extract-plugin/)
该插件将`CSS`分割到文件中。对每个`js`文件中的`css`代码创建一个`css`文件。支持`css`按需加载和`sourcemap`。
`MiniCssExtractPlugin`不支持`HMR`(模块热更新)，建议在生产环境中使用。
> 在`webpack4`版本中，我们之前首选使用的[extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)完成了其历史使命。推荐使用[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)。
2. 安装`MiniCssExtractPlugin`
`npm install --save-dev mini-css-extract-plugin`
3. `webpack.base.config.js`中对`css`和`scss`文件的`loader`处理移动到 `webpack.dev.config.js`中。
4. 修改打包配置文件
`webpack.pro.config.js`
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//...
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [ require('autoprefixer')]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [ require('autoprefixer')]
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({})
  ]
```
> 与之前的配置相比做了两点修改，一个是引入`new MiniCssExtractPlugin({})`插件，一个是`MiniCssExtractPlugin.loader`替换`style-loader`。
> 由于`webpack-merge`可以对`module.rules`进行合并，但无法对单个`rule`中的`loader`进行合并。所以在`webpack.pro.config.js`里写了完整的处理`css `和`sass`文件的`rule`。也可以在`webpack.base.config.js`通过环境变量的逻辑进行判断添加`MiniCssExtractPlugin.loader`或者`style-loader`。
5. 打包输出
`npm run build`
```
Built at: 04/12/2019 4:16:56 PM
            Asset        Size  Chunks             Chunk Names
    app.bundle.js  1010 bytes       0  [emitted]  app
app.bundle.js.map    3.04 KiB       0  [emitted]  app
          app.css    66 bytes       0  [emitted]  app
      app.css.map   170 bytes       0  [emitted]  app
       index.html   259 bytes          [emitted]  
Entrypoint app = app.css app.bundle.js app.css.map app.bundle.js.map
```
打包输出了`css`文件。
> 如果没有打包输出`css`文件。原因可能是`production`自动开启`Tree Shaking`，需要将`css`文件标记为`side-effect-free`(无副作用)。
`"sideEffects"`: `["*.css"]` 
6. `css`文件命名规则
```
plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].chunk.css"
    })
]
```
7. `css`文件压缩

(1) 安装依赖
`npm install --save-dev optimize-css-assets-webpack-plugin`
(2) 编辑配置文件
`webpack.prod.config.js`
```
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
  //...
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({})
    ]
  }
  //...
}
```
(3) 打包输出
```
Built at: 04/12/2019 4:50:40 PM
            Asset       Size  Chunks             Chunk Names
    app.bundle.js    4.1 KiB       0  [emitted]  app
app.bundle.js.map   3.66 KiB       0  [emitted]  app
          app.css   56 bytes       0  [emitted]  app
       index.html  259 bytes          [emitted]  
Entrypoint app = app.css app.bundle.js app.bundle.js.map
```
8. 可通过`cacheGroups`实现将所有`js`文件中的`css`打包到一个`css`文件中([Extracting all CSS in a single file](https://webpack.docschina.org/plugins/mini-css-extract-plugin/#extracting-all-css-in-a-single-file))和将一个入口文件对应的所有`css`打包到一个`css`文件中([Extracting CSS based on entry](https://webpack.docschina.org/plugins/mini-css-extract-plugin/#extracting-css-based-on-entry))。
# 5. 打包分析(bundle analysis)
## 5.1 打包分析工具介绍
1. 如果我们以分离代码作为开始，那么就应该以检查模块的输出结果作为结束，对其进行分析是很有用处的。
2. [官方提供分析工具](https://github.com/webpack/analyse) 是一个好的初始选择。下面是一些可选择的社区支持工具：
(1) [webpack-chart](https://alexkuz.github.io/webpack-chart/)：`webpack stats` 可交互饼图。
(2) [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/)：可视化并分析你的`bundle`，检查哪些模块占用空间，哪些可能是重复使用的。
(3) [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)：一个`plugin`和`CLI`工具，它将`bundle`内容展示为便捷的、交互式、可缩放的树状图形式。
(4) [webpack bundle optimize helper](https://webpack.jakoblind.no/optimize)：此工具会分析你的`bundle`，并为你提供可操作的改进措施建议，以减少`bundle`体积大小。
## 5.2 官方分析工具
1. `analyse`[文档](https://github.com/webpack/analyse)
2. 编辑打包命令
`package.json`
```
  "scripts": {
    "dev": "webpack  --profile --json > stats.json --config ./build/webpack.dev.config.js"
  }
```
3. 打包输出
`npm run dev`
生成`stats.json`文件，该文件中包含打包信息。
4. 使用`analyse`分析打包结果 
将`stats.json`文件上传到`analyse`[分析地址](http://webpack.github.io/analyse/)，即可看到打包细节信息。
## 5.3  webpack-bundle-analyzer
1. 安装依赖
`npm install --save-dev webpack-bundle-analyzer`
2. 编辑打包配置文件
`webpack.base.config.js`
```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```
3. 打包结果分析
![image.png](https://upload-images.jianshu.io/upload_images/4989175-91d60380a4eaebff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
如果打包生成的**不同**`Asset`引入了**相同**的`js`文件，则说明该`js`文件被重复打包进两个不同的资源，需要修改配置将该`js`文件进行分割。
# 6. Shimming
`shimming`[文档](https://www.webpackjs.com/guides/shimming/)
## 6.1 shimming 全局变量
1. 一些第三方的库(`library`)可能会引用一些全局依赖（例如`jQuery` 中的 `$`）。这些“不符合规范的模块”就是 `shimming` 发挥作用的地方。
2. 安装`jquery`
`npm i jquery lodash --save`
3. 修改打包配置文件
`webpack.base.config.js`
```
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      join: ['lodash', 'join']
    })
  ]
``` 
> 当有模块使用`$`时，会自动`import $ from 'jquery'`
4. 可直接使用`$`
`src/index.js`
```
const dom = $('div')
dom.html(join(['hello', 'world'], ' '))
$('body').append(dom)
```
> `shimming`和`alias`对比：`alias`的作用是创建 `import` 或 `require` 的别名，来确保模块引入变得更简单。`shimming`的作用是解决一些第三方的库(`library`)可能会引用的一些全局依赖。即：`alias`使模块引入更简单，不用写复杂路径；`shimming`使模块不用引入，使用全局变量的方式。
## 6.2 imports-loader
1. 打印现在模块中`this`指向 
`src/index.js`
```
console.log(this === window); //false
```
2. 安装依赖
`npm i imports-loader -D`
3. 编辑打包配置文件
`webpack.base.config.js`
```
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {loader: "babel-loader"},
          {loader: "imports-loader?this=>window"}
        ]
      }
    ]
  }
```
4. 打印现在模块中`this`指向
`src/index.js`
```
console.log(this === window); //true
```
> 项目中配置`imports-loader?this=>window`可能导致打包错误，`'import' and 'export' may only appear at the top level (4:0)`。
# 7. 环境变量
1. 修改打包配置文件

`webpack.dev.config.js`
```
const devConfig = {
  //...
}
module.exports = devConfig
```
`webpack.prod.config.js`
```
const prodConfig = {
  //...
}
module.exports = prodConfig
```
`webpack.base.config.js`
```
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev.config')
const prodConfig = require('./webpack.prod.config')

const baseConfig = {
  //...
}
module.exports = (env) => {
  if(env && env.production) {
    return merge(baseConfig, prodConfig)
  } else {
    return merge(baseConfig, devConfig)
  }
}
```
2. 修改打包命令
`package.json`
```
  "scripts": {
    "build": "webpack --env.production --config ./build/webpack.base.config.js",
    "dev": "webpack --config ./build/webpack.base.config.js",
    "start": "webpack-dev-server --config ./build/webpack.base.config.js"
  }
```
> 这里的`--env.production`与打包配置文件中的`env && env.production`对应。
> 如果使用`--env.production=abc`，则打包配置文件中需要使用`env && env.production==='abc'`的写法。
> 如果使用`--env production`，则打包配置文件中需要使用`env === 'production'`的写法。
# 8. TypeScript
## 8.1 引入TypeScript
1. 安装依赖
`➜  webpack-operate npm i ts-loader typescript -D`
2. 项目根目录创建`TypeScript`配置文件
`tsconfig.json`
```
{
  "compilerOptions": {
    "module": "commonjs", //模块引入机制
    "target": "es5", //转化为es5
    "sourceMap": true, //支持sourceMap
    "allowJs": true //支持js引入
  },
  "exclude": [
    "node_modules"
  ]
}
```
3. 创建入口文件
`src/index.ts`
```
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return 'Hello' + this.greeting;
    }
}

let greeter = new Greeter('world')
alert(greeter.greet())
```
4. 编辑打包配置文件
`webpack.config.base.js`
```
  entry: {
    app: path.resolve(__dirname, '../src/index.ts'),
  }
  //...
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use:  "ts-loader"
      }
     ]
     //...
  }
```
5. 打包输出
`npm run bundle`
## 8.2 对库代码进行编译检查
1. [查询](https://microsoft.github.io/TypeSearch/)`TypeScript`支持编译检查的库。
2. 对库代码进行编译检查——以`lodash`为例

(1) 安装依赖
`➜  webpack-operate npm i @types/lodash --save-dev`
(2) 修改`ts`文件
`src/index.ts`
```
import * as _ from 'lodash'

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        //return _.join(123) //传参不是数组，标红报错
        return _.join([ 'Hello', this.greeting], ' ');
    }
}

let greeter = new Greeter('world')
alert(greeter.greet())
```
# 9. Eslint
## 9.1 使用eslint
1. 安装依赖
`➜  webpack-operate npm i eslint -D`
2. 初始化`eslint`配置文件
`npx eslint --init`
自动生成`.eslintrc.js`文件。
```
➜  webpack-operate npx eslint --init
? How would you like to use ESLint? To check syntax and find problems
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? React
? Where does your code run? (Press <space> to select, <a> to toggle all, <i> to invert selection)Browser
? What format do you want your config file to be in? JavaScript
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest
? Would you like to install them now with npm? Yes
```
3. 使用`airbnb`规则
(1) 安装依赖
`➜  webpack-operate npm install eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y babel-eslint -D`
(2) 修改`.eslintrc.js`配置文件
```
  "extends": "airbnb",
  "parser": "babel-eslint"
```
3. 检查代码
(1) 命令行检查方式
`npx eslint XXX(文件夹名字)`
(2) 编辑器检查方式
![image.png](https://upload-images.jianshu.io/upload_images/4989175-702f65bca5101303.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 使某些规则失效
编辑`.eslintrc.js`规则文件
```
  "rules": {
    "no-unused-vars": 0
  }
```
> 以上是在项目中使用`eslint`，与`Webpack`无关。
## 9.2 Webpack中配置eslint
1. `eslint-loader` [文档](https://webpack.js.org/loaders/eslint-loader)
2. 安装依赖
`➜  webpack-operate npm i eslint-loader -D`
3. 编辑打包配置文件

`webpack.base.config.js`
```
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {loader: "babel-loader"},
          {loader: "eslint-loader"}
        ]
      }
    ]
  }
```
`webpack.dev.config.js`
```
  devServer: {
    overlay: true
  }
```
> `eslint-loader`的作用是打包时先使用`eslint`检查规则，应该放在`babel-loader`之后。`overlay`的作用是使用`webpack-dev-server`打包时，将报错信息显示在页面上。
4. 对不符合规范的代码进行简单修复
```
   {
     loader: "eslint-loader",
     options: {
       fix: true
     }
   }
```
> 使用`eslint-loader`会在打包前对代码进行检查，降低打包效率。在实际项目开发中，一般使用`eslint`与`git`结合，在代码提交到`git`仓库时对代码进行检查。
# 10. PWA
1. 安装依赖
`➜  webpack-operate npm i workbox-webpack-plugin -D`
2. 编辑生产环境打包配置文件
`webpack.prod.config.js`
```
const WorkBoxPlugin = require('workbox-webpack-plugin')

var prodConfig = {
  //...
  plugins: [
    new WorkBoxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
  //...
}
```
> 生产环境才需要使用`PWA`。
3. 编辑入口文件
`src/index.js`
```
//业务代码
import('lodash').then(({default : _}) => {
  console.log(_.join(['1','2', '3'], '-'))
})

//使用serviceWorker
if('serviceWorker' in navigator) { //如果浏览器支持serviceWorker
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(res => {
        console.log('serviceWorker registed')
      })
      .catch(err => {
        console.log('serviceWorker registe err')
      })
  })
}
```
> `service-worker.js`文件在打包时生成。
4. 打包输出
`npm run build`
```
                                                Asset       Size  Chunks             Chunk Names
                      2.6c02624b28028221db11.chunk.js    529 KiB       2  [emitted]  
                  2.6c02624b28028221db11.chunk.js.map    630 KiB       2  [emitted]  
                    app.051fb24e16eb3c7493d6.chunk.js  812 bytes       0  [emitted]  app
                app.051fb24e16eb3c7493d6.chunk.js.map  783 bytes       0  [emitted]  app
                                           index.html  326 bytes          [emitted]  
precache-manifest.a8a4feb9efc884fe5d31eed9b7b76ac0.js  445 bytes          [emitted]  
               runtime.a366ecc84e6df04acf79.bundle.js   8.81 KiB       1  [emitted]  runtime
           runtime.a366ecc84e6df04acf79.bundle.js.map    8.8 KiB       1  [emitted]  runtime
                                    service-worker.js  927 bytes          [emitted]  
Entrypoint app = runtime.a366ecc84e6df04acf79.bundle.js runtime.a366ecc84e6df04acf79.bundle.js.map app.051fb24e16eb3c7493d6.chunk.js app.051fb24e16eb3c7493d6.chunk.js.map
```
5. 本地开启一个服务
```
➜  webpack-operate cd dist
➜  dist http-server
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.1.3:8080
  http://192.168.57.1:8080
Hit CTRL-C to stop the server
```
6. 测试`PWA`
打开`http://127.0.0.1:8080`，可以看到`html`页面。
关闭服务，刷新浏览器，仍然可以正常访问页面。
# 11. 编写并发布一个npm包
1. 创建文件夹`nmw-lodash`
2. 将项目初始化为一个`npm`包
`➜  nmw-lodash npm init -y`
3. 安装依赖
`➜  nmw-lodash npm i webpack webpack-cli --save`
`➜  nmw-lodash npm i lodash --save`
4. 编写代码

`src/index.js`
```
import * as math from './math'
import * as string from './string'

export default {
  math,
  string
}
```
`src/math.js`
```
export function add(a, b) {
  return a + b;
}
```
`src/string.js`
```
import _ from 'lodash'

export function join(a, b) {
  return _.join([a, b], ' ')
}
```
5. 创建并编辑打包配置文件
`webpack.config.js`
```
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'nmw-lodash.js',
    library: "nmwLodash", //以script标签引入时，支持nmwLodash全局变量
    libraryTarget: "umd" //支持umd规范引入
    //libraryTarget: "global" nmwLodash挂载在global上。
  },
  externals: [
    "lodash" //不打包lodash
  ]
}
```
> 文档：[`output.libraryExport`](https://www.webpackjs.com/configuration/output/#output-librarytarget); [`output.library`](https://www.webpackjs.com/configuration/output/#output-library); [`externals`](https://www.webpackjs.com/configuration/externals/)
6. 创建打包命令
`package.json`
```
  "scripts": {
    "build": "webpack"
  }
```
7. 修改`npm`包入口文件
`package.json`
```
  "main": "./dist/nmw-lodash.js",
```
8. 打包输出
`npm run build`
9. 在`npm`官网注册账号
10. 添加账号密码
`➜  nmw-lodash npm adduser`
11. 发布项目
`npm publish`
# 12. 打包性能优化
## 12.1 优化配置
1. 跟上技术的迭代
`Node`、`Npm`、`Yarn`
2. 在尽可能少的模块上应用`Loader`
例如：使用`exclude`和`include`。
```
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: [{loader: "babel-loader"}]
}
```
> `exclude`表示**不**进行`loader`编译的路径。
`include`表示**只**进行`loader`编译的路径。
3. `Plugin`尽可能精简并确保可靠
例如：只在生产环境使用`MiniCssExtractPlugin`对`CSS`进行分割。
```
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
//...
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].chunk.css"
    })
  ]
```
4. `resolve`参数合理配置 ([文档](https://webpack.docschina.org/configuration/resolve/))
(1) `resolve.alias`：创建 `import` 或 `require` 的别名，来确保模块引入变得更简单。
例如：`import Utility from 'Utilities';`
(2) `resolve.extensions`：自动解析确定的扩展。能够使用户在引入模块时不带扩展。
例如：`import File from '../path/to/file';`
(3) `resolve.mainFiles`
解析目录时要使用的文件名。
例如：`resolve`配置如下
```
  resolve: {
    extensions: ['.js', '.jsx'],
    mainFiles: ['index'],  //默认配置
    alias: {
      child: path.resolve(__dirname, '../src/components/child')
    }
  }
```
模块引入方式如下：
```
import Child from 'child';
```
`resolve`配置不宜过于复杂，否则会使模块查找时间增加，降低`webpack`打包速度。
5.  控制包文件大小
(1) 使用`Tree Shaking`
(2) `Code Splitting`代码分割
6. `thread-loader`、`parallel-webpack`、`happypack`多进程打包
7. 合理使用`SourceMap`
8. 结合`state`分析打包结果(`bundle analysis`)
9. 开发环境内存编译(`webpack-dev-server`)
10. 开发环境无用插件剔除
## 12.2 DIIPlugin
### 12.2.1 使用DIIPlugin
1. 测试打包速度
`npm run build`  打包耗时约`950ms`
2. 第三方模块没有必要频繁重新打包。可以将第三方模块打包输出，`webpack`进行项目打包时，直接使用已经被打包的第三方模块，不再重新打包。
3. 创建并编辑打包配置文件
`webpack.dll.config.js`
```
const path = require('path');
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['react', 'react-dom', 'lodash'],
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, '../dll'),
    library: "[name]" //以vendors全局变量的方式暴露
  },
  plugins: [
    new webpack.DllPlugin({ //生成vendors.manifest.json映射文件
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json')
    })
  ]
}
```
4. 创建打包命令
`package.json`
```
  "scripts": {
    //...
    "build:dll": "webpack --config ./build/webpack.dll.config.js",
    //...
  }
```
5. 打包生成`vendors`包
`npm run build:dll`
生成`vendors.dll.js`以及`vendors.manifest.json`映射文件。
6. 安装依赖
`npm i add-asset-html-webpack-plugin -D`
7. 编辑打包配置文件
`webpack.base.config.js`
```
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
//...
  plugins: [
    //...
    new AddAssetHtmlPlugin({
      //将vendors.dll.js插入html模板中
      filepath: path.resolve(__dirname, '../dll/vendors.dll.js') 
    }),
      //打包代码时，第三方模块如果在vendors.manifest.json有映射，则直接在vendors全局变量中取。
    new webpack.DllReferencePlugin({ 
      manifest: path.resolve(__dirname, '../dll/vendors.manifest.json')
    })
  ],
```
> `AddAssetHtmlPlugin`插件必须放在`HtmlWebpackPlugin`后面。
8. 测试打包速度
`npm run build`  打包耗时约`670ms`
9. 总结
生成`vendors`包及映射 - 将`vendors`包插入`html`模板 - 以`vendors`全局变量暴露 - 使用`vendors`包
### 12.2.2 多个DIIPlugin
1. 编辑`dll`包打包配置文件
`webpack.dll.config.js`
```
  //...
  entry: {
    vendors: ['lodash'],
    react: ['react', 'react-dom']
  }
  //...
```
2. 编辑打包配置文件
`webpack.base.config.js`
动态生成`plugins`数组。
```
const fs = require('fs')

const plugins =[
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/index.html')
  }),
  new CleanWebpackPlugin()
  //...
]

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
//根据 dll 目录中生成的文件，添加对应插件。
files.forEach(file => {
  if(/.*\.dll\.js/.test(file)) {
      //XXX.dll.js插入html模板中
      plugins.push(new AddAssetHtmlPlugin({ 
        filepath: path.resolve(__dirname, '../dll', file)
      }))
  }
  if(/.*\.manifest\.json/.test(file)) { 
    //根据XXX.manifest.json映射，直接在XXX全局变量中获取第三方模块。
    plugins.push(new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll', file)
    }))
  }
})
```
# 13. 多页面打包配置
## 13.1 介绍
1. 多页面应用
① 生成多个`html`文件。
② 各个`html`文件引入对应的`jsbundle`。
2. 多页面应用的实现方式
(1) 多配置
对多个`webpack`配置分别打包，生成多个`html`页面。
(2) 单配置
对一个`webpack`配置进行打包，生成多个`html`页面。
> `html-webpack-plugin`[文档](https://github.com/jantimon/html-webpack-plugin)
## 13.2 多配置
1. 技术基础
(1) `webpack`打包可以接收一个配置数组。
(2) `parallel-webpack`提高打包速度。
> 直接使用`webpack`也可以接收一个配置数组，但串行打包过程速度比较慢。`parallel-webpack`可以并行打包，提高打包速度。
2. 特点
(1) 优点
可以使用`parallel-webpack`提高打包速度。
配置之间更加独立、灵活。
(2) 缺点
不能多页面之间共享代码。
3. 创建编辑模板文件
`src/index.html`
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
</body>
</html>
```
> 如果打包配置文件添加了`html-loader`，会正常解析`html`文件作为模版，就会直接把 `<%= htmlWebpackPlugin.options.title %>`解析成字符串。
4. 创建编辑入口文件

`src/index.js`
```
console.log('this is index.js');
```
`src/list.js`
```
console.log('this list.js');
```
5. 编辑打包配置文件
`webpack.pro.config.js`
```
const baseConfig = require('./webpack.base.config');
//...
const prodConfig = {
//...
}
const buildConfig = merge(baseConfig, prodConfig);

const generatePage = function (
  { entry = '',
    title = '',
    name = '',
    chunks = [],
    template = path.resolve(__dirname, '../src/index.html')
  } = {}) {
  return {
    entry,
    plugins: [
      new HtmlWebpackPlugin({
        chunks,
        template,
        title,
        filename: name + '.html'
      })
    ]
  }
};

const indexConfig = generatePage({
  entry: {
    app: path.resolve(__dirname, '../src/index.js')
  },
  title: 'page index',
  name: 'index',
  chunks: ['runtime','vendors','app']
});

const listConfig = generatePage({
  entry: {
    list: path.resolve(__dirname, '../src/list.js')
  },
  title: 'page list',
  name: 'list',
  chunks: ['runtime','vendors','list']
});

const pagesConfig = [indexConfig, listConfig];
module.exports = pagesConfig.map(pageConfig => merge(pageConfig, buildConfig));
```
> 多配置在同一个文件中，生成一个配置数组。
> ⭐️⭐️这里的`chunks: ['runtime','vendors','app'/'list']`可以省略，因为是多配置，默认会插入所有`chunks`。如果是`13.3`中的单配置，入口有多个，那么就必须指定插入的`chunks`。
6. 打包
`npm run build`
```
Hash: 10dc11f107c648d35db3659186349535b844a395
Version: webpack 4.30.0
Child
    Hash: 10dc11f107c648d35db3
    Time: 876ms
    Built at: 06/01/2019 4:38:36 PM
            Asset       Size  Chunks             Chunk Names
    app.bundle.js  963 bytes       0  [emitted]  app
       index.html  190 bytes          [emitted]  
Child
    Hash: 659186349535b844a395
    Time: 850ms
    Built at: 06/01/2019 4:38:36 PM
             Asset       Size  Chunks             Chunk Names
    list.bundle.js  962 bytes       0  [emitted]  list
         list.html  191 bytes          [emitted]  
```
> 多配置打包不可以使用`clean-webpack-plugin`，否则后一个打包会清除前一个打包结果。
7. 使用`parallel-webpack`打包
(1) 安装 
`npm i parallel-webpack -D`
(2) 打包
`./node_modules/parallel-webpack/bin/run.js --config=build/webpack.prod.config.js`
## 13.3 单配置
1. 特点
(1) 优点
可以共享各个`entry`之间的公用代码。
(2) 缺点
打包比较慢。
输出的内容比较复杂。
配置不够独立，相互耦合。例如：无法实现对不同入口设置不同的`splitChunks`代码分割规则、无法实现对不同入口设置不同的动态路由(`splitChunks`会将公共代码提出来，提前加载)。
> 单配置时，`webpack`打包配置对不同入口的所有`chunks`都生效。只要有一个入口的同步代码依赖树中含有某一个模块，该模块就不会被动态路由异步加载。
2. 编辑打包配置文件
`webpack.pro.config.js`
```
//...
const buildConfig = merge(baseConfig, prodConfig);
//...
const pagesConfig = [indexConfig, listConfig];
module.exports = merge(pagesConfig.concat(buildConfig));
```
> `webpack-merge`可以接收多个参数`merge(object1, object2, object3, ...)`，也可以接收一个数组`merge([object1, object2, object3, ...])`。
3. 打包
`npm run build`
```
Version: webpack 4.30.0
Time: 668ms
Built at: 06/01/2019 4:54:57 PM
         Asset       Size  Chunks             Chunk Names
 app.bundle.js  963 bytes       0  [emitted]  app
    index.html  190 bytes          [emitted]  
list.bundle.js  963 bytes       1  [emitted]  list
     list.html  191 bytes          [emitted]  
Entrypoint app = app.bundle.js
Entrypoint list = list.bundle.js
```
