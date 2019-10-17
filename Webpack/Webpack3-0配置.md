# 1. 代码分割(Code Splitting)
## 1.1 CommonsChunkPlugin
1. `CommonsChunkPlugin`可以进行同步代码分割。
2. 代码结构

`src/page/pageA.js`
```
import './subPageA'
import './subPageB'
import lodash from 'lodash'
console.log('this is pageA')
```
`src/page/pageB.js`
```
import './subPageA'
import './subPageB'
import lodash from 'lodash'
console.log('this is pageB')
```
`src/page/subPageA.js`
```
import './module'
console.log('this is subPageA')
export default 'subPageA'
```
`src/page/subPageB.js`
```
import './module'
console.log('this is subPageB')
export default 'subPageB'
```
`src/page/module.js`
```
console.log('this is module')
export default "Module"
```
3. 打包配置
```
//...
  entry: {
    pageA: './src/page/pageA',
    pageB: './src/page/pageB',
    vendor: ['lodash']
  },
//...
  plugins: [
    //将pageA和pageB中公共代码提出
    new webpack.optimize.CommonsChunkPlugin({ 
      name: 'common',
      minChunks: 2,
      chunks: ['pageA', 'pageB']
    }),
    //将lodash和webpack代码分别提出
    new webpack.optimize.CommonsChunkPlugin({ 
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    })
  ]
```
> `CommonsChunkPlugin`可以将`pageA`和`pageB`这两个入口文件中共同引入超过`minChunks`次的模块拆分出来，将`webpack`打包代码拆分出来，将第三方依赖模块(`lodash`)拆分出来，但不能对单个入口文件内部多次引入的模块进行拆分。**因为需要设置多个入口文件，因此`CommonsChunkPlugin`没有`webpack4.X`中的`SplitChunksPlugin`好用。**
## 1.2 异步代码分割和懒加载
### 1.2.1 require.ensure
1. 语法
`require.ensure([dependencies], callback, errorCallback, chunkName)`
引入模块并可以执行。
> `require.ensure`依赖`Promise`。如果浏览器不支持`Promise`，需要添加`polyfill`垫片。
2. 编辑打包配置文件
`webpack.config.js`
```
  entry: {
    pageA: './src/page/pageA'
  },
  output: {
    filename: '[name].[hash:5].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename:'[name].[hash:5].js'
  },
  plugins: []
```
> 入口文件只有`pageA`。
> 需要配置`chunkFilename`之后，`require.ensure`中的第四个参数`chunkName`才会生效。
3. 编辑代码
`src/page/pageA.js`
```
var page = 'pageA'
if(page === 'pageA') {
  require.ensure([], function () {
    const subPageA = require('./subPageA')
  }, 'subPageA');
} else {
  require.ensure([], function () {
    //require('./subPageB') 如果外部也引入了subPageB，则subPageB不会被单独打包
    const subPageB = require('./subPageB')
  }, 'subPageB');
}

require.ensure([], function () {
  const _ = require('lodash');
  console.log(_.join([1,2,3], '-'))
}, 'vendor')
```
此时，`subPageA`、`subPageB`以及`lodash`会被分割打包成单独的包。
虽然`subPageA`、`subPageB`都被分割单独打包，但是`subPageB`不会被加载到页面中。
> 如果外部也引入了`require.ensure`方法中通过`require`引入的模块，则该模块不会分割单独打包。
> 此时，由于`subPageA`和`subPageB`都引入了`module`，因此`module`被同时打包进了`subPageA`和`subPageB`。可通过`require.include`解决此问题。
### 1.2.2 require.include
1. 语法
`require.include([dependencies])`
如果两个子模块都引入一个第三方模块，可在父模块中使用`require.include()`。这样这个第三方模块就不会同时打包进两个子模块中了。
2. 编辑代码
`src/page/pageA.js`
```
require.include('./module')

var page = 'pageA'
if(page === 'pageA') {
  require.ensure([], function () {
    const subPageA = require('./subPageA')
  }, 'subPageA');
} else {
  //require('./subPageB') 如果外部也引入了subPageB，则subPageB不会被单独打包
  require.ensure([], function () {
    const subPageB = require('./subPageB')
  }, 'subPageB');
}

require.ensure([], function () {
  //会将lodash拆分打包成单独的包(除非外部已经引入了lodash)
  const _ = require('lodash');
  console.log(_.join([1,2,3], '-'))
}, 'vendor')
export default 'pageA'
```
3. 此时代码打包会将`subPageA`和`subPageB`中引入的`module`打包进`pageA`中。
### 1.2.3 import()
1. 语法
```
import(
    /* webpackChunkName: async-chunk-name */
   /* webpackMode: lazy */
   module
)
```
`webpack`推荐使用`import()`语法，不推荐使用`require.ensure`。
2. 安装依赖
`npm i @babel/plugin-syntax-dynamic-import -D`
3. 编辑`babel`配置
```
"plugins": [
    "@babel/plugin-syntax-dynamic-import"
]
```
4.  编辑代码
```
require.include('./module')

var page = 'pageA'
if(page === 'pageA') {
  import(/* webpackChunkName: 'subPageA' */ './subPageA').then(subPageA => {
    console.log(subPageA)
  });
} else {
  import(/* webpackChunkName: 'subPageB' */ './subPageB').then(subPageB => {
    console.log(subPageB)
  })
}

import(/* webpackChunkName: 'vendor' */ 'lodash').then(lodash => {
  console.log(lodash.join([1,2,3], '-'))
})

export default 'pageA'
```
只有配置`chunkFilename`之后，`webpackChunkName`才生效。
如果多个 `import()`的魔法注释`webpackChunkName`指定同一个名字，则这多个`import()`模块会打包成一个`bundle`。
如果外部也引入了`import()`方法中引入的模块，则该模块不会分割单独打包。
> 与`require.ensure`一样，由于`subPageA`和`subPageB`都引入了`module`，因此`module`被同时打包进了`subPageA`和`subPageB`。通过`require.include`解决此问题。
# 2.  加载样式
## 2.1 css-loader@1.X 配置项
1.  安装依赖
    `npm install --save-dev style-loader css-loader@1.0.1`
> `css-loader@1.X`版本配置与`@2.X`版本配置不同。
2.  编辑打包配置文件
    `webpack.dev.config.js`
```
 {
   test: /\.css$/,
   use: [
     "style-loader",
     {
       loader: 'css-loader',
       options: {
         minimize: true, //压缩(失效)
         modules: true, //开启modules
         localIdentName: '[path][name]__[local]--[hash:base64:5]'
       }
     }
   ]
 }
```
## 2.2 提取CSS文件
1. `extract-text-webpack-plugin`[文档](https://webpack.docschina.org/plugins/extract-text-webpack-plugin/)
> 在`webpack4`版本中，应使用[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)。
2. 安装依赖
`npm i extract-text-webpack-plugin -D`
3. 编辑打包配置文件
`webpack.dev.config.js`
```
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
//...
  module: {
    rules: [
      //...
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: { loader: "style-loader"}, //应用于没有被提取的CSS使用的loader
          use: [ {loader: 'css-loader'}]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].css', //提取的css文件名
      allChunks: false //异步加载的js模块中引入的css文件是否提取
    }),
    //...
 ]
}
```
> 使用模块热更新时，`css-loader`已经帮我们做了`module.hot.accept`监听`CSS`文件变化的代码。使用`extract-text-webpack-plugin`，则`CSS`模块自动热更新失效，需要手写`module.hot.accept`监听`CSS`文件变化的代码。
> 如果`ExtractTextWebpackPlugin`中的`filename`值为`css/[name].css`，则会将生成的`css`文件放入`css`文件夹中。
# 3. Tree Shaking
1. 一个简单的打包示例

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
2. 编辑打包配置文件
`webpack.dev.config.js`
```
const Webpack = require('webpack');
//...
module.exports = {
  //...
  plugins: [
    //...
    new Webpack.optimize.UglifyJsPlugin()
  ]
}
```
3. 打包输出
`npm run bundle`
`add`方法被打包，`minus`被`Tree Shaking`过滤掉了。
> `Tree Shaking`开启的关键在于`JavaScript`代码压缩。在`webpack3.X`版本中，通过`UglifyJsPlugin`插件进行`JavaScript`代码压缩。在`webpack4.X`版本中，`mode: production`生产模式默认进行`JavaScript`代码压缩。
# 4. mode
1. 不支持`--mode development/production`或配置文件中的`{mode: development/production}`定义开发模式和生产模式。
> `webpack3.X`版本和`webpack4.X`版本都可以使用环境变量，且用法相同。
可参考：[7. 环境变量](https://www.jianshu.com/p/ec902335f93e)。
