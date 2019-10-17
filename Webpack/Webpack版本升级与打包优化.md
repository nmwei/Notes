# 1. 9.0版本
## 1.1 动态路由修改
1. 打包分析
```
Show chunks: All (3.3 MB)
js/app.f6e590defd09f0af0533.js (1.23 MB)
js/0.dcb7a6fef441f8b29aad.js (759.71 KB)
js/1.12b87a568748b35be091.js (753 KB)
js/vendor.3a71817ce04ee0d52abd.js (477.57 KB)
js/2.b41119393c5fed1db5a7.js (50.59 KB)
js/3.1e900085df4e92b118d0.js (44.05 KB)
js/4.cd0ae5676c3c19029aaa.js (30.54 KB)
js/5.43b81f7e8267bd84e89e.js (2.27 KB)
js/6.8d54cf0b69937a8c4ca4.js (1.73 KB)
js/manifest.aab2c6e6e57bd770452c.js (1.58 KB)
```
![image.png](https://upload-images.jianshu.io/upload_images/4989175-084a7be855cba66f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

(1) 动态路由生成`js`文件没有自定义名
(2) `0.js`和`1.js`代码几乎都是重复的。
(3) `2.js`、`3.js`、`4.js`动态路由生成的代码体积太小。
2. 设置打包配置`chunkFilename`
`webpack.config.production.js`
 ```
     output: {
         path: config.path.dist,
-        filename: 'js/[name].[chunkhash].js',
-        chunkFilename: 'js/[id].[chunkhash].js',
+        filename: 'js/[name].[chunkhash:5].js',
+        chunkFilename: 'js/[name].[chunkhash:5].js',
         publicPath: '?op=resource&encode=utf8&resource=/com/fr/wei/plugin/h5reportnew/dist/'
     },
```
3. 自定义`chunkName`并进行路由合并 
`routerConfig.web.js`
```
-import Login from 'bundle-loader?lazy!../../platform/view/Login/'
-import Directory from 'bundle-loader?lazy!../../platform/view/Directory'
-import ReportPage from 'bundle-loader?lazy!../../fr/page/ReportPage'
-import FormPage from 'bundle-loader?lazy!../../fr/page/FormPage'
-import WebPage from 'bundle-loader?lazy!../../platform/view/WebPage'
-import ChangePassword from 'bundle-loader?lazy!../../platform/view/ChangePassword/ChangePassword'
-import CprPage from 'bundle-loader?lazy!../../fr/page/CprPage'
+import Login from 'bundle-loader?lazy&name=platform!../../platform/view/Login/'
+import Directory from 'bundle-loader?lazy&name=platform!../../platform/view/Directory'
+import ReportPage from 'bundle-loader?lazy&name=FRPage!../../fr/page/ReportPage'
+import FormPage from 'bundle-loader?lazy&name=FRPage!../../fr/page/FormPage'
+import WebPage from 'bundle-loader?lazy&name=platform!../../platform/view/WebPage'
+import ChangePassword from 'bundle-loader?lazy&name=platform!../../platform/view/ChangePassword/ChangePassword'
+import CprPage from 'bundle-loader?lazy&name=platform!../../fr/page/CprPage'
```
4. 打包分析
```
Show chunks: All (2.57 MB)
js/app.3027a.js (1.23 MB)
js/FRPage.792bb.js (771.79 KB)
js/vendor.6f983.js (477.57 KB)
js/platform.aee33.js (128.05 KB)
js/manifest.0559a.js (1.46 KB)
```
![image.png](https://upload-images.jianshu.io/upload_images/4989175-8cdbc097331ec4fe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 1.2 图表资源提前加载
1. 图表资源加载分析
在`ChartView`组件的`didMount`中请求加载图表资源，导致图表空白`1-2s`才能渲染出来。
2. 提前加载图表资源
```
<link rel="stylesheet" type="text/css" href="<%= htmlWebpackPlugin.options.sourcePath + '/com/fr/web/core/css/leaflet.css' %>"/>
<script type="text/javascript" src="<%= htmlWebpackPlugin.options.sourcePath + '/com/fr/mobile/js/appChart.js' %>"></script>
<script type="text/javascript" src="<%= htmlWebpackPlugin.options.sourcePath + '/com/fr/web/core/js/vancharts-all.js' %>"></script>
```
3. 时间对比
![测试数据.png](https://upload-images.jianshu.io/upload_images/4989175-e6d454ad561c7cca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 1.3 打包区分不同入口
1. 多入口分析  
项目支持多入口，不同入口打开同一个`html`页面。页面初始加载`app.js`、`vendor.js`、`manifest.js`资源。当路由跳转到`platform`或`FRPage`对应页面时，动态加载`platform.js`和`FRPage.js`。
当从模板页(`cpt`、`frm`)进入项目时，`FRPage.js`仍通过动态路由的方式加载，加载时机有些延迟，增加了页面打开时间(客户反映提升不大)。
2. 打包生成多个`html`页面，不同入口打开不同的`html`页面。当从登录页进入项目时，使用动态路由；当直接打开`cpt`或者`frm`模板时，不使用动态路由，提前加载对应`js`资源。
3. 打包分析
```
Show chunks: All (4.55 MB)
js/sync.3bd37d4.js (1.98 MB)
js/app.cf1d197.js (1.23 MB)
js/FRPage.2285cd3.js (770.97 KB)
js/vendor.72c6bc3.js (478.69 KB)
js/platform.d5fb09a.js (128.02 KB)
js/manifest.43d0f75.js (1.46 KB)
```
![image.png](https://upload-images.jianshu.io/upload_images/4989175-a530750e910fc70a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 1.4 代码分割
1. `Performance`分析图
![有几个图表的表单.png](https://upload-images.jianshu.io/upload_images/4989175-49f375fa9651d72e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 生成的`app.js`体积很大，但`CommonsChunkPlugin`只适用于多入口文件公共模块代码分割。本项目入口只有一个`index.web.js`，不符合`CommonsChunkPlugin`插件的应用场景。
3. `webpack`升级
(1) `Cyclic dependency error`
解决：[https://github.com/marcelklehr/toposort/issues/20](https://github.com/marcelklehr/toposort/issues/20)
(2) 其他见`10.0 webpack`升级遇到问题及解决方案。
4. 代码分割
```
optimization: {
    splitChunks: {
        chunks: 'all',
        maxInitialRequests: 6,
        automaticNameDelimiter: '-',
        cacheGroups: {
            //base代码分割
            baseComponent: {
                test: /[\\/]public[\\/]base[\\/]components/,
                priority: 5,
                name: 'baseComponent'
            },
            appBase: {
                test: /[\\/]public[\\/]base/,
                priority: 0,
                name: 'appBase'
            },
            //react
            react: {
                test: /[\\/]node_modules[\\/](react\.*|redux\.*)|[\\/]lib[\\/]reactweb/,
                priority: -5,
                name: 'react',
            },
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                name: 'vendor'
            }
        }
    }
}
```
5. 时间对比
![测试数据](https://upload-images.jianshu.io/upload_images/4989175-b14066b760c257a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 2. 10.0版本打包优化
## 2.1 知识扩展
1. [babel-node 命令](http://www.ruanyifeng.com/blog/2016/01/babel.html)
2. [minimist 轻量级的命令行参数解析引擎](https://jarvys.github.io/2014/06/01/minimist-js/ "minimist轻量级的命令行参数解析引擎")
3. [define-plugin](https://www.webpackjs.com/plugins/define-plugin/)
## 2.2 问题分析
1. `happypack`报错
`Cannot read property 'length' of undefined`
```
if (resolve.length === 4) {
                ^
TypeError: Cannot read property 'length' of undefined
    at resolveLoader (...\node_modules\happypack\lib\WebpackUtils.js:138:17)
    at ...\node_modules\happypack\lib\WebpackUtils.js:126:7
    at ...\node_modules\happypack\node_modules\async\lib\async.js:713:13
```
分析：`happypack 4.X`不兼容`webpack 4.X`。
解决：升级`happypack`为 `5.X`版本。
2. `file-loader`报错
`Cannot read property 'fileLoader' of undefined`
```
ERROR in ./node_modules/rs-styles/images/sampleStamp.png
Module build failed: TypeError: Cannot read property 'fileLoader' of undefined
    at Object.module.exports (/Users/uri/Documents/connect/dashboard/node_modules/file-loader/index.js:14:28)
    at Object.module.exports (/Users/uri/Documents/connect/dashboard/node_modules/url-loader/index.js:31:23)
```
分析：`url-loader`使用了旧版本的`file-loader`。
解决：更新升级`file-loader`版本。
参考：[https://github.com/webpack/webpack/issues/6419](https://github.com/webpack/webpack/issues/6419)
3. `file-loader`报错
`file-loader fails with JSON files in Webpack 4`
```
Module parse failed: Unexpected token m in JSON at position 0
You may need an appropriate loader to handle this file type.
SyntaxError: Unexpected token m in JSON at position 0
    at JSON.parse (<anonymous>)
    at JsonParser.parse (/Users/jeremy/Documents/Development/webpack-file-loader-test/node_modules/webpack/lib/JsonParser.js:15:21)
```
分析：在`webpack4.X`版本中，默认支持`json`文件，无需`loader`处理。
解决：删除`json`处理的`loader`(`{test: /\.json$/,use: 'json-loader'}`)。
参考：[https://github.com/webpack-contrib/file-loader/issues/259](https://github.com/webpack-contrib/file-loader/issues/259)
**4. 动态`import()`报错(☆☆)**
```
ERROR in ./pages/Home/index.tsx 5:16
Module parse failed: Unexpected token (5:16)
You may need an appropriate loader to handle this file type.
| import { BeatLoader } from 'react-spinners';
| export const LoadableHomePage = Loadable({
>   loader: () => import(
|   /* webpackChunkName: "homepage" */
|   './page'),
```
方法一：`npm update acorn --depth 20`、`npm dedupe`、删除`node_modules`、删除`package.lock.json`、`npm install`。
方法二：`npm install webpack@4.28.4`
参考：[https://github.com/webpack/webpack/issues/8656](https://github.com/webpack/webpack/issues/8656)
5. `uglifyjs-webpack-plugin`压缩动态`import()`语法报错
分析：`uglifyjs-webpack-plugin`只支持`ES5`代码压缩，不支持`ES6`代码压缩。
解决：使用`terser-webpack-plugin`替换掉`uglifyjs-webpack-plugin`。
参考：[https://webpack.docschina.org/plugins/terser-webpack-plugin](https://webpack.docschina.org/plugins/terser-webpack-plugin)
6. `import()`动态加载魔法注释`webpackChunkName`失效
分析：①在项目中使用了`module:metro-react-native-babel-preset`，该`preset`是`babel`为`ReactNative`应用提供的，`ReactNative`应用默认使用它转化代码。②该`preset`支持动态`import()`,无需再使用`@babel/plugin-syntax-dynamic-import`。③ 该`preset`会在`babel`打包过程中删除注释内容。
![image.png](https://upload-images.jianshu.io/upload_images/4989175-62c25ad1750768fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
解决：`babel`配置中添加`comments: true`。
参考：[https://github.com/webpack/webpack/issues/4861](https://github.com/webpack/webpack/issues/4861)
[https://babeljs.io/docs/en/options#comments](https://babeljs.io/docs/en/options#comments)
[https://www.npmjs.com/package/metro-react-native-babel-preset](https://www.npmjs.com/package/metro-react-native-babel-preset)
7. 打包生成的`bundle`中含有动态`import()`之外的`js`文件
![image.png](https://upload-images.jianshu.io/upload_images/4989175-1092709cae232d80.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
分析：`optimization.splitChunks`在进行代码分割时，会默认将不同`chunk`引入的相同`modules`进行分割，避免这些代码重复打包到不同的`bundle`。
解决：配置`optimization.splitChunks`中的`cacheGroups`，将共用代码提取到自定义的`group`中。
```
optimization: {
  splitChunks: {
     chunks: 'all',
     cacheGroups: {
       commons: {
        minChunks: 2,
        priority: -20,
        name: 'commons',
      }
    }
  }
}
```
8. `webpack`打包资源过大警告
```
WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets: 
  js/commons.532a8.js (515 KiB)
  js/vendor.b2172.js (414 KiB)
  js/BIPage.dafcb.js (477 KiB)
  js/app.c64e5.js (1.2 MiB)

WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
  app (1.77 MiB)
      js/react.97c29.js
      js/vendor.b2172.js
      js/app.c64e5.js
```
分析：`webpack`推荐打包生成的`asset`单个资源大小和入口资源大小在`244 KiB`以内。
隐藏：`performance: { hints: false }`
参考：[https://github.com/webpack/webpack/issues/3486](https://github.com/webpack/webpack/issues/3486)
9.  `Tree Shaking`为何不生效？
分析：关于`lodash`，已经通过`babel-plugin-lodash`实现了`Tree Shaking`。对于业务模块，由于`react-native`使用的打包工具`metro`不支持`Tree Shaking`，因此不支持。
解决：如果`babel`配置文件中使用`module:metro-react-native-babel-preset`，则可以支持`Tree Shaking`。但这样会导致`react-native`项目无法打包。
参考：[https://www.npmjs.com/package/metro-react-native-babel-preset](https://www.npmjs.com/package/metro-react-native-babel-preset)
[https://github.com/facebook/metro/issues/227](https://github.com/facebook/metro/issues/227)
## 2.3 打包优化
### 2.3.1 代码分割
1. 同步代码分割
通过`optimization.splitChunks.cacheGroups`，对`base`、`reactweb`、`react`以及`node_modules`分别进行**同步代码分割**，生成`appBase.js`、`reactweb.js`、`react.js`以及`vendors.js`。
```
optimization: {
    splitChunks: {
        chunks: 'all',
        maxInitialRequests: 5,
        automaticNameDelimiter: '-',
        cacheGroups: {
            //同步模块代码分割
            appBase: {
                test: /[\\/]public[\\/]base/,
                priority: 0,
                name: 'appBase',
                chunks: 'initial'
            },
            reactWeb: {
                test: /[\\/]lib[\\/]reactweb/,
                priority: 0,
                name: 'reactWeb',
                chunks: 'initial'
            }，

            //node_modules代码分割
            react: {
                test: /[\\/]node_modules[\\/](react\.*|redux\.*)/,
                priority: -5,
                name: 'react',
            },
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                name: 'vendor'
            }
        }
    }
}
```
2. 异步代码分割
通过动态`import()`，对`Login`、`Directory`、`ReportPage`、`FormPage`、`BIPage`、`WebPage`、`ChangePassword`进行**异步代码分割**。
```
Loadable({
    loader: () => import(/*webpackChunkName: "Login"*/'../../platform/view/Login'),
    loading: () => null,
})
```
3. 打包

![image.png](https://upload-images.jianshu.io/upload_images/4989175-271d2a5ae73a8bd1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 动态`import()`异步代码分割生成的一些`bundler`体积非常小。可以利用魔法注释中的`webpackChunkName`合并`bundler`
### 2.3.2 Base Tree Shaking
**一. 问题分析**
 1. `base`文件夹中绝大部分模块(`modules`)只在`BIPage`、`ReportPage`、`FormPage`等异步`Chunks`中使用。为什么没有被打包到这些异步模块中，而是**全部**被同步代码分割出来了呢？
即：为什么动态`import()`异步代码分割对`base`中模块`modules`失效？
> 如果没有对`base`的同步代码分割，这些`base`模块会被打包到入口`app.js`。
2. 分析
一个模块如果被动态`import()`对应的异步`chunk`引入，同时被同步`chunk`引入，则该`module`会被打包进入同步`chunk`对应的`bundler`。

**二. 逐个切断依赖关系**
1. 使`app chunk`依赖树中不引入`base/index`模块。 
能够最大限度的降低`app.js`的`bundler`体积。但`app`中的依赖树比较复杂，逐个修改的工作量比较大。依赖树中只要有一条线指向`base/index`模块，就不能解决问题。
2. 如何查找`app chunk`依赖树中哪些`modules`引入了`base/index.js`？
(1) 注释掉那些动态`import()`引入的`chunks`，只打包`app`对应的`chunk`。
(2) 通过[分析工具](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fwebpack%2Fanalyse)可以查看`module`之间的依赖关系。
(3) 找到依赖`base/index.js`的模块，修改依赖关系。
![image.png](https://upload-images.jianshu.io/upload_images/4989175-1b6b38c567cb2265.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/4989175-a08bc0137c302fe4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
> 对`app bundler`和`platform bundler`过滤`base modules`。在进入模板页之前，减少`js bundler`的体积。

**三. babel插件**
1.  三个插件

(1) [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) 插件
```
// Use this:
import MyUtilFn from 'utils/MyUtilFn';
// Instead of that:
import MyUtilFn from '../../../../utils/MyUtilFn';
```
可以实现`webpack`中的`resolve.alias`的功能。
参考：[custom-aliases-in-react-native-with-babel](https://www.novis.co/post/custom-aliases-in-react-native-with-babel/)。
(2) [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
```
import { TimePicker } from "antd"
↓ ↓ ↓ ↓ ↓ ↓
var _button = require('antd/lib/time-picker');
```
可以实现`webpack`中第三方库的`Tree Shaking`功能。
(3) [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports)
```
//Causes this code:
import { MyModule } from 'my-library';
import { App } from 'my-library/components';
import { Header, Footer } from 'my-library/components/App';
//to become:
import MyModule from 'my-library/MyModule';
import App from 'my-library/components/App';
import Header from 'my-library/components/App/Header';
import Footer from 'my-library/components/App/Footer';
```
可以实现第三方库与本地代码的`Tree Shaking`。
> 第一个插件的作用是实现`resolve.alias`。后两个插件的作用是实现`tree shaking`。后两个插件和第一个插件共同使用时，后两个插件不生效。
2. 最佳实践
由于`babel-plugin-module-resolver`与另外两个插件共用使用时，另外两个插件不生效。因此，`H5`端使用`webpack`自身支持的`resolve.alias`和另外两个插件的其中之一(推荐`babel-plugin-transform-imports`)实现`Tree Shaking`。`App`端使用[`babel-plugin-module-resolver`](https://github.com/tleunen/babel-plugin-module-resolver) 插件实现`alias`。
![image.png](https://upload-images.jianshu.io/upload_images/4989175-6e1af6e031a2ddd3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 注意事项

(1) 使用`babel-plugin-transform-imports`转换插件实现`TreeShaking`，需要保证一个`module`对应一个文件。
```
module.exports = function(importName, matches) {
    if(components.includes(importName)) {
        return `base/components/${importName}`
    }
    if(transMap[importName]) {
        return transMap[importName]
    }
    console.error(importName + ` must define the transform import format!`);
};
```
(2) 修改`transformImport.js`中转换函数后需要清除缓存文件
![image.png](https://upload-images.jianshu.io/upload_images/4989175-680f810eb2897b89.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
使用默认的缓存目录 `node_modules/.cache/babel-loader`，如果在任何根目录下都没有找到`node_modules`目录，将会降级回退到操作系统默认的临时文件目录。
### 2.3.3 CSS资源
1. 项目中外部式样式和嵌入式样式比较少，对页面加载影响微乎其微。
2. 因为与`app`共用代码。项目中绝大部分样式是通过`StyleSheet.create({})`以行内形式嵌入，导致打包输出的`js`文件体积增加。但如果不修改写法，行内样式无法抽出。
### 2.3.4 图片资源
1. 图片资源预想的是将小图片转化为`base64`字符串或者使用`CSS spirit`。后来发现遇到问题如下：
![image.png](https://upload-images.jianshu.io/upload_images/4989175-ead677a8a311858d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

(1) 由于现有`icon.js`的写法。使用`base64`字符串会将没有使用到的小图标也打包到`js`文件中。造成`js`中图标体积约`400KB`。
(2) `CSS spirit`图片拼接比较麻烦，现有的以`webpack-spritesmith`、`postcss-sprites`为代表的插件也是以`css`文件为基础，需要修改现有`Icon`组件的实现方式。即使解决了该问题，雪碧图拼接会将所有小图标拼成一个大图片，包括使用不到的图标。
# 3. 代码逻辑 
1. 区分不同入口逻辑
从`js`分包的角度来看，动态`import()`异步资源加载不适用于用户直接打开模板时的入口，`js`分包已经做了入口区分。从代码逻辑上来看，不同入口代码逻辑也应该做区分，减少直接打开模板生成的`bundler`体积。
2. 异步阻塞逻辑优化
页面渲染之前的异步回调会推迟页面初始渲染时间。
