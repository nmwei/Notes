## 一. 最简单的Webpack打包项目
1. 单个文件打包
(1) 按照[**Webpack操作指南**](https://www.jianshu.com/p/080af62fd9f0)中**初始化**、**模块打包**、**模块热更新**、**开发调试**部分构建项目。
(2) 修改打包命令
```
"scripts": {
    "dev": "webpack --config ./webpack.dev.config.js --mode development",
    "start": "webpack-dev-server --config ./webpack.dev.config.js --mode development"
  }
```
(3) 编辑打包入口文件
```
//src/index.js
console.log(1);
```
(4) 生成打包文件
`npm run dev`
2. 分析打包文件
```
//release.bundle.js
//整个bundle.js为一个(function(modules){})(modules)的自执行
(function(modules) {
  //module缓存，缓存id-module，其中module对象为{i, l, exports}
  var installedModules = {};
  function __webpack_require__(moduleId) {
    //如果该id已经缓存，则直接返回module.exports
    if(installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    //创建module对象{i, l, exports}
    var module = installedModules[moduleId] = {
      i: moduleId, //module id
      l: false, //是否loaded
      exports: {} //exports
    };
 		//执行module函数，modules为最外层自执行函数的实参
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
 		// 修改module标识为loaded，标识模块已经载入
		module.l = true;
    //返回module的exports属性
 		return module.exports;
 	}

 	// expose the modules object (__webpack_modules__)
 	__webpack_require__.m = modules;

 	// expose the module cache
 	__webpack_require__.c = installedModules;

 	// define getter function for harmony exports
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};

 	// define __esModule on exports
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};

 	// create a fake namespace object
 	// mode & 1: value is a module id, require it
 	// mode & 2: merge all properties of value into the ns
 	// mode & 4: return value when already ns object
 	// mode & 8|1: behave like require
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};

 	// getDefaultExport function for compatibility with non-harmony modules
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};

 	// Object.prototype.hasOwnProperty.call
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

 	// __webpack_public_path__
 	__webpack_require__.p = "";
 	// Load entry module and return exports
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
}) ({
  "./src/index.js": (function(module, exports, __webpack_require__) {
      "use strict";
      console.log(1);
    })
 });
//sourceMap文件地址，访问data:appli……可以看到该包对应的sourceMap信息。
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZX……
```
注释：[SourceMap](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)保存打包前后代码位置信息，方便调试。
## 参考文章
[webpack原理](https://segmentfault.com/a/1190000015088834)
[webpack 打包JS 的运行原理](https://zhuanlan.zhihu.com/p/32093510)
 
