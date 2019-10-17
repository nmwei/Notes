## 1. Vue概述
### 1.1 Vue介绍
Vue 是一套用于构建用户界面的渐进式框架。
### 1.2 Vue核心思想 
1. 双向数据绑定 
`Vue`双向数据绑定利用了`Object`对象的`set()`和`get()`方法，原理如下:
```
  <input type="text" id="userName" />
  <span id="uName"></span>
  <script>
    const obj = {}
    Object.defineProperty(obj, 'text', {
      get: function(val) {
        console.log('get init');
      },
      set: function(val) {
        console.log('set:' + val);
        ipt.value = val;
        span.innerText = val;
      }
    })
    const ipt = document.getElementById('userName');
    const span = document.getElementById('uName');
    ipt.addEventListener('keyup', function(e) {
      obj.text = e.target.value;
    })
  </script>
```
### 1.3 Vue与React对比
#### 1.3.1 不同点
**一、Vue**
* 简单的语法和项目构建。

**二、React**
* 适用于大型项目以及更好的可测试性。
* 更大的生态圈带来的更多的支持工具。
#### 1.3.2 相同点
* 虚拟`DOM`
* 轻量级
* 响应式
* 服务端渲染
* 易于集成路由工具、打包工具和状态管理工具
* 优秀的支持和社区
## 2. Vue基础语法
### 2.1 Vue环境搭建
#### 2.1.1 环境构建方式
1. 官方拷贝
`<script src="https://cdn.jsdelivr.net/npm/vue"></script>`
2. `npm` 安装
3. `vue-cli`工具构建
#### 2.1.1 vue-cli工具构建SPA应用
1. `npm i -g vue-cli`
2. `vue init webpack-simple demo `
初始化一个简单的`webpack`项目
3. `vue init webpack demo`
初始化一个完整的`webpack`项目
### 2.2  Vue基础语法
1. 模板语法
* `Mustache`语法：`{{msg}}`
* `Html`赋值：`v-html = ""`
* 绑定属性： `v-bind:id = ""`
* 使用表达式：`{{ok ? 'YES' : 'NO'}}`
* 文本赋值：`v-text = ""`
* 指令：`v-if = ""`
* 过滤器：`{{message | capitalize}}`和`v-bind:id = "rawId | formtaId"`
注释: `vue`组件中的`data`推荐使用方法的方式`data(){return {}}`返回数据，这样不同组件实例之间就不会共用数据。
2. `Class`和`Style`绑定
* 对象语法
```
<div v-bind:class="{active: isActive, 'text-danger': hasError}">
```
* 数组语法
```
<div v-bind:class="[activeClass, errorClass]">
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```
* style绑定
```
<div v-bind:style="{color: activeColor, fontSize: fontSize + 'px'}">
```
3. 条件渲染
* `v-if`
* `v-else`
* `v-else-if`
* `v-show`
* `v-cloak`
4. 事件处理器
* `v-on:click="greet"` 、 `@click="greet"`
*  `v-on:click.stop`、`v-on:click.stop.prevent`、`v-on:click.self`、`v-on:click.once`
* `v-on:keyup.enter/tab/delete/esc/space/up/down/left/right`
5. `Vue`组件
* 全局组件和局部组件
单页面应用一般使用的都是局部组件。
* 父子组件通讯-数据传递
```
//父组件
<template>
  <div class="hello">
    <Counter v-bind:num="num" v-on:incre="increment" v-on:decre="decrement"/>
    <span>{{`parent: ${num}`}}</span>
  </div>
</template>
<script>
import Counter from './Counter'
export default {
  data () {
    return {
      num: 10
    }
  },
  components: {
    Counter
  },
  methods: {
    increment() {
      this.num++
    },
    decrement() {
      this.num--
    }
  }
}
</script>

//子组件
<template>
  <div>
    <button @click="increment">+</button>
    <button v-on:click="decrement">-</button>
    <p><span>{{num}}</span></p>
  </div>
</template>
<script>
export default {
  props: ['num'],
  methods: {
    increment() {
      this.$emit('incre');
    },
    decrement() {
      this.$emit('decre')
    }
  }
}
</script>
```
* `Slot`
使用`slot`可以减少父组件`props`传值的数量以及子组件`$emit`触发父组件方法的数量。
```
 <modal v-bind:mdShow="mdShowCard" v-on:close="closeModelCard">
   <p slot="message">
     <svg class="icon-status-ok">
       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
     </svg>
     <span>加入购物车成功</span>
   </p>
   <div slot="btnGroup">
     <a class="btn btn--m" @click="mdShowCard=false">继续购物</a>
     <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
   </div>
 </modal>
```
### 2.3 路由 vue-router
#### 2.3.1路由基础介绍
1. 路由
根据不同的`url`地址展示不同的内容或页面。
2. 后端路由
服务器根据`url`地址返回不同页面。
3. 前端路由
不同路由对应不同内容或页面的任务交给前端来做。
4. 前端路由使用场景
单页面应用。
5. 前端路由的优缺点
  优点：路由跳转用户体验好。
  缺点：不利于`SEO`；浏览器前进后退重新发送请求，没有利用缓存；无法记住之前页面的滚动位置。
6. `vue-router`介绍
[vue-router官网](https://router.vuejs.org/zh/)
(1) 跳转组件 
`<router-link></router-link>`
注释: `router-link`就是一个封装好的`a`标签，可以添加样式。
(2) `js`跳转
`this.$router.push({path: ''})`
(3) 展示组件
`<router-view></router-view>`
注释: `vue-router`是对`historyAPI`的封装。
#### 2.3.2. 动态路由匹配
1. 动态路由介绍

| 模式 | 匹配路径 | $route.params |
| ------------- | --------- | ----------- | 
| /user/:username | /user/even | {username: 'even'} |
| /user/:username/post/:post_id | /user/even/post/123 | {username: 'even', post_id: 123}|
2. 动态路由的使用
```
//路由入口文件: scr/router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '@/views/GoodList'
Vue.use(Router)
export default new Router({
  mode: 'history', //默认值为hash
  routes: [
    {
      path: '/goods/:goodsId/user/:userName',
      name: 'GoodList',
      component: GoodList
    }
  ]
})
```
```
//src/views/GoodsList.vue文件
<template>
  <div>
    <div>这是商品列表页面</div>
    <span>{{$route.params.goodsId}}</span>
    <span>{{$route.params.userName}}</span>
  </div>
</template>
<script>
export default {}
```
* 使用`vue-cli`工具构建的项目已经嵌套`vue-router`。
* 路径完全匹配模式(`/goods/@@@/user/&&&`)才能够访问到该路由视图。
* `mode` 默认取值为`hash`，此时通过`#` + 路径才能访问到。如果取值为`history`，则不用加`#`。
#### 2.3.3. 嵌套路由
1. 嵌套路由的使用
```
//路由入口文件: scr/router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '@/views/GoodList'
import Title from '../views/Title'
import Image from '../views/Image'

Vue.use(Router)

export default new Router({
  mode: 'history', //默认值为hash
  routes: [
    {
      path: '/goods',
      name: 'GoodList',
      component: GoodList,
      children: [
        {
          path: 'title',
          name: 'title',
          component: Title
        },
        {
          path: 'img',
          name: 'img',
          component: Image
        }
      ]
    }
  ]
})
```

```
//src/views/GoodsList.vue文件
<template>
  <div>
    <div>这是商品列表页面</div>
    <router-link to="/goods/title">
      显示标题子路由
    </router-link>
    <router-link to="/goods/img">
      显示图片子路由
    </router-link>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {}
</script>
```
```
//src/views/Image.vue文件
<template>
  <div>图片子路由</div>
</template>
<script>
export default {}
</script>
```
```
//src/views/Title.vue文件
<template>
  <div>标题子路由</div>
</template>
<script>
export default {}
</script>
```
* 在`children`处注册路由时使用相对于父路由的路径即可，在`router-link`的 `to`属性跳转地址要使用完整路径。
* 从子路由的用法可知，路由的本质并不是整个页面的显示/隐藏切换，而是**`页面某个区域`**的显示隐藏切换。
#### 2.3.4. 编程式路由
1. 编程式路由介绍
使用`js`实现页面的跳转。
* `$router.push("name")`
* `$router.push({path: "name"})`
* `$router.push({path: "name?a=123})`
* `$router.push({path: "name", query: {a: 123}})`
* `$router.go(1/-1)`
注意: 对比区分`query`参数的传递与动态路由`params`参数的传递。 query传递的是`?a=1;b=2`字段，通过`$route.query.key`的方式取值。动态参数传递的是`/a/b`字段，通过`$route.params.key`的方式取值。
总结:①`$route.query.key`获取的是当前`url`中`query`中的字段值，`$route.params.key`获取的是当前`url`中`params`中的字段值。②使用 `router-link `组件跳转和`js`跳转都可以传递`params`和`query`。
2. 编程式路由的使用
```
//路由入口文件: scr/router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '@/views/GoodList'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  mode: 'history', //默认值为hash
  routes: [
    {
      path: '/goods',
      name: 'GoodList',
      component: GoodList
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})
```
```
//src/views/GoodsList.vue文件
<template>
  <div>
    <div>这是商品列表页面</div>
    <button @click="toCart">
      跳转到购物车
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    toCart() {
      this.$router.push({path: "/cart", query: {a: 1}})
    }
  }
}
</script>
```
```
//src/views/Cart.vue文件
<template>
  <div>
    <div>这是购物车页面</div>
    <span>{{$route.query.a}}</span>
    <button @click="backToGoods">
      返回商品列表
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    backToGoods() {
      this.$router.go(-1)
    }
  }
}
</script>
```
#### 2.3.5. 命名路由和命名视图
1.命名路由和命名视图介绍
给路由定义不同的名字，根据名字进行匹配。
给不同的`router-view `定义名字，通过名字进行对应组件的渲染。
2.  命名路由的使用
```
//路由入口文件: scr/router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '@/views/GoodList'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  mode: 'history', //默认值为hash
  routes: [
    {
      path: '/goods',
      name: 'GoodList',
      component: GoodList
    },
    {
      path: '/cart/:cartId',
      name: 'cart',
      component: Cart
    }
  ]
})
```
```
//src/views/GoodsList.vue文件
<template>
  <div>
    <div>这是商品列表页面</div>
    <router-link v-bind:to="{name: 'cart', params: {cartId:123}, query: {a:1}}">跳转到购物车页面</router-link>
  </div>
</template>
<script>
export default {}
</script>
```
```
//src/views/Cart.vue文件
<template>
  <div>
    <div>这是购物车页面</div>
    <span>{{$route.params.cartId}}</span>
    <span>{{$route.query.a}}</span>
  </div>
</template>
<script>
export default {}
</script>
```
3. 命名视图
[Vue Router文档-命名视图](https://router.vuejs.org/zh/guide/essentials/named-views.html#%E5%B5%8C%E5%A5%97%E5%91%BD%E5%90%8D%E8%A7%86%E5%9B%BE)
#### 2.3.6 HTML5 History 模式
1. `vue-router `默认` hash `模式 —— 使用` URL` 的 `hash`来模拟一个完整的 `URL`，于是当 `URL` 改变时，页面不会重新加载。
如果不想要很丑的 `hash`，我们可以用路由的 `history` 模式，这种模式充分利用 `history.pushState API` 来完成 `URL` 跳转而无须重新加载页面。
```
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```
2. 当你使用 `history` 模式时，`URL` 就像正常的 `url`，例如 `http://yoursite.com/user/id`，也好看！
不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器**直接访问** `http://oursite.com/user/id` 就会返回 `404`，这就不好看了。
所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 `URL` 匹配不到任何静态资源，则应该返回同一个`index.html `页面，这个页面就是你 `app` 依赖的页面。
注释：`vue-router`处理前端路由跳转，后端路由处理`ajax/fetch`请求以及用户访问`url`页面。当用户直接访问某一个路由页面`url`(`http://oursite.com/user/id`)时，该请求会由服务器端进行处理。
**注意**：把服务器的`url`解析重定向到`index.html`的首页里面即可。如果`mode` 取默认值`hash`，通过`# + 路径地址`才能访问到，后台是不识别锚点，不会出现`404`的状态。
3. 后端配置例子
（1）原生 `Node.js`
```
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.htm', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
```
(2) 基于 `Node.js` 的 `Express`
对于 Node.js/Express，请考虑使用 [connect-history-api-fallback 中间件](https://github.com/bripkens/connect-history-api-fallback)。
4. 给个警告，因为这么做以后，你的服务器就不再返回 `404` 错误页面，因为对于所有路径都会返回` index.html` 文件。为了避免这种情况，你应该在 `Vue` 应用里面覆盖所有的路由情况，然后在给出一个 `404` 页面。
```
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})
```
或者，如果你使用 `Node.js` 服务器，你可以用服务端路由匹配到来的 `URL`，并在没有匹配到路由的时候返回 `404`，以实现回退。更多详情请查阅 [Vue 服务端渲染文档](https://ssr.vuejs.org/zh/)。

### 2.4 请求数据 
#### 2.4.1 vue-resource
1. `vue-resource` 的请求`API`是按照`REST`风格设计的，它提供了7种请求`API`：
* `get(url, [options])`
* `head(url, [options])`
* `delete(url, [options])`
* `jsonp(url, [options])`
* `post(url, [body], [options])`
* `put(url, [body], [options])`
* `patch(url, [body], [options])`
2. 发送请求时的`options`选项对象包含以下属性

| 参数 |	 类型 |	描述 |
| :----: | :----: | ---- |
|`url`|	`string`|	请求的`URL`|
|`method`|	`string`|请求的`HTTP`方法，例如：'`GET`', '`POST`'或其他`HTTP`方法|
|`body`|	`Object`, `FormData string`|	`request body`|
|`params`	|`Object`|	请求的`URL`参数对象|
|`headers`	|`Object`	|`request header`|
|`timeout`|	`number`|	单位为毫秒的请求超时时间 (0 表示无超时时间)|
|`before`|	`function(request)`|	请求发送前的处理函数，类似于`jQuery`的`beforeSend`函数|
|`progress`|	`function(event)`|	`ProgressEvent`回调处理函数|
|`credientials`|	`boolean`|	表示跨域请求时是否需要使用凭证|
|`emulateHTTP`|	`boolean`|	发送`PUT`, `PATCH`, `DELETE`请求时以`HTTP POST`的方式发送，并设置请求头的`X-HTTP-Method-Override`|
|`emulateJSON`|	`boolean`|	将`request body`以`application/x-www-form-urlencoded content type`发送|
3. 全局拦截器`interceptors`
```
Vue.http.interceptors.push((request, next) => {
        // ...
        // 请求发送前的处理逻辑
        // ...
    next((response) => {
        // ...
        // 请求发送后的处理逻辑
        // ...
        // 根据请求的状态，response参数会返回给successCallback或errorCallback
        return response
    })
})
```
4. `vue-resource`使用示例
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>vue-resource</title>
  <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
  <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="../../node_modules/vue/dist/vue.js"></script>
  <script src="../../node_modules/vue-resource/dist/vue-resource.js"></script>
</head>
<body>
<div id="app">
  <h2>vue-resource演示</h2>
  <a href="#" @click="sendGet">发送Get请求</a>
  <a href="#" @click="sendPost">发送Post请求</a>
  <a href="#" @click="sendJsonp">发送Jsonp请求</a>
  <a href="#" @click="sendHttp">全局函数</a>
  <p v-text="response"></p>
</div>

<script>

  new Vue({
    el:"#app",
    data:{
      response:''
    },
    http: {
      root: 'http://localhost:8050/imoocmall/'
    },
    mounted() {
      Vue.http.interceptors.push((request, next) => {
        console.log('request init.');
        next((response) => {
          console.log('response init.');
          return response
        })
      })
    },
    methods:{
      sendGet() {
        this.$http.get('package.json',{
          params:{
            userId: "101",
          },
          headers:{
            access_token:"abc"
          }
        }).then(res => {
          this.response = res.data;
        }).catch(err => {
          this.response = err;
        });
      },
      sendPost() {
        this.$http.post('package.json', {
          userId: '102'
        }, {
          headers: {
            access_token:"abcd"
          }
        }).then(res => {
          this.response = res.data;
        }).catch(err => {
          this.response = err;
        });
      },
      sendJsonp(){
        this.$http.jsonp("http://www.imooc.com/course/ajaxskillcourse?cid=796",{
          params:{
            userId:"1001"
          }
        }).then(res => {
          this.response = res.data;
        }).catch(err => {
          this.response = err;
        })
      },
      sendHttp() {
        this.$http({
          url:"package.json",
          method:"GET",
          params:{ userId:"103" },
          headers:{ token:"123" },
          timeout:50,
          before() {
            console.log("before init")
          }
        }).then(res => {
          this.response = res.data;
        });
      }
    }
  });
</script>
</body>
</html>
```
注释: ①引入 `vue-resource`之后可以通过`this.$http`的方式使用。
#### 2.4.2 Axios
1. Axios简介
`Axios` 是一个基于 `promise` 的 `HTTP` 库，可以用在浏览器和 `node.js` 中。
2. 请求方法介绍
*  `axios.request(config)`
* `axios.get(url[, config])`
* `axios.delete(url[, config])`
* `axios.head(url[, config])`
* `axios.post(url[, data[, config]])`
* `axios.put(url[, data[, config]])`
* `axios.patch(url[, data[, config]])`
注意: ·Axios· 请求方法中没有`jsonp`请求。
3. 执行`get`请求
```
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 可选地，上面的请求可以这样做
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
4. 执行 `POST` 请求
```
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
5. 执行多个并发请求
```
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```
6. `Axios`使用示例
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>axios</title>
  <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="../../node_modules/vue/dist/vue.js"></script>
  <script src="../../node_modules/axios/dist/axios.js"></script>
</head>
<body>
<div id="app">
  <h2>vaxios演示</h2>
  <a href="#" @click="sendGet">发送Get请求</a>
  <a href="#" @click="sendPost">发送Post请求</a>
  <a href="#" @click="sendHttp">全局函数</a>
  <p v-text="response"></p>
</div>

<script>
  new Vue({
    el:"#app",
    data:{
      response:''
    },
    mounted() {
      axios.interceptors.request.use((req) => {
        console.log('request init.');
        return req;
      });
      axios.interceptors.response.use((res) => {
        console.log('response init.');
        return res;
      });
    },
    methods:{
      sendGet() {
        axios.get('../../package.json',{
          params:{
            userId: "101",
          },
          headers:{
            token:"abc"
          }
        }).then(res => {
          this.response = res.data;
        }).catch(err => {
          this.response = err;
        });
      },
      sendPost() {
        axios.post('../../package.json', {
          userId: '102'
          }, {
            headers: {
              token:"abcd"
            }
          }).then(res => {
          this.response = res.data;
        }).catch(err => {
          this.response = err;
        });
      },
      sendHttp() {
        axios({
          url:'../../package.json',
          method:"POST",
          data:{ userId:"103" },
          headers:{ token:"123" }
        }).then(res => {
          this.response = res.data;
        });
      }
    }
  });
</script>
</body>
</html>
```
注释：①`axios`的参数传递方式与`vue-resource`基本相同。② 注意区分`get`请求与`post`请求的参数传递方式。
### 2.5 Vuex基本用法
#### 2.5.1 Vuex介绍
1. `Vuex`是一个专门为`Vue.js`应用程序开发的状态管理模式。
2. 当我们构建一个中大型的单页应用程序时，`Vuex`可以更好的帮助我们在组件外部统一管理状态。
#### 2.5.2 核心概念
`State` `Getters` `Mutations` `Actions` `Modules`
1. `State`
`State`唯一数据源，单一状态树。
```javascript
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```
2. `Getters`
通过`Getters`可以派生出一些新的状态。
```javascript
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```
3. `Mutations`
更改`Vuex`的`store`中状态的**唯一**方法是提交`mutation`。
```javascript
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```
触发`mutation handler`：
```javascript
store.commit('increment')
```
4. `Actions`
`Action`提交的是`mutation`，而不是直接改变状态。
`Action`可以包含任意异步操作。
```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```
注释：`mutations `中的方法必须是同步的，`actions`中的方法可以有异步操作。
5. `Modules`
面对复杂的应用程序，当管理的状态比较多时，我们需要将`Vuex`的`store`对象分割成模块（`modules`）。
```javascript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
6. 概念关系图
![](https://upload-images.jianshu.io/upload_images/4989175-8dae55874bf9a0cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### 2.5.3 项目结构
```
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```
#### 2.5.4 代码示例
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vuex</title>
  <script src="../../node_modules/vue/dist/vue.js"></script>
  <script src="../../node_modules/vuex/dist/vuex.min.js"></script>
</head>
<body>
<div id="app">
  <h2>{{msg}}</h2>
  <button @click="add">同步增加</button>
  <button @click="asyncAdd">异步增加</button>
  <counter></counter>
</div>
<script>
  const counter = {
    template: `
      <div>
         <h3>{{count}}<h3>
         <h3>{{squareCount}}</h3>
      </div>
    `,
    computed: {
      ...Vuex.mapState(['count']),  //mapState语法糖
      /*count() {
        return this.$store.state.count;
      },*/
      squareCount() {
        return this.$store.getters.squareCount;
      }
    }
  };
  const store =  new Vuex.Store({
    state: {
      count: 0
    },
    getters: {
      squareCount(state) {
        return state.count * state.count;
      }
    },
    mutations: {
      increment(state, num) {
        state.count += num;
      }
    },
    actions: {
      asyncIncrement(context, num) {
        setTimeout(() => {
          context.commit('increment', num);
        }, 1000);
      }
    }
  });
  new Vue({
    el: '#app',
    store,
    data: {
      msg: 'Vuex的使用'
    },
    components: {
      counter
    },
    methods: {
      add() {
        this.$store.commit('increment', 1);
      },
      asyncAdd() {
        this.$store.dispatch('asyncIncrement', 2)
      }
    }
  })
</script>
</body>
</html>
```
## 3. Vue生态圈
### 3.1 模拟mock数据
在`vue`开发过程中，有时需要使用本地`json`模拟后台接口数据，测试前端页面展示情况。对于使用`vue-cli`工具构建的项目，封装了`express`框架，我们可以通过拦截请求的方式使用`mock`数据。
1. 创建`mock`数据`json`文件
2. 在`webpack.dev.conf.js`文件中拦截请求
```
//imoocmall/build/webpack.dev.conf.js文件
var goodsData = require('../mock/goods.json')
devServer: {
     before (app) {
       app.get('/goods', function (req, res) {
         res.json(goodsData);
       })
     },
    //...
}
//..
```
注释: 这里的`app.get('/goods', (req, res) => {})`就是`express`框架定义后端路由接口的写法。
3. 使用mock数据
```
axios.get('/goods',)
  .then(res => { 
    //...
})
```
### 3.2 图片懒加载
使用[vue-lazyload](https://www.npmjs.com/package/vue-lazyload)插件可以实现图片懒加载。
1. 安装
`npm i vue-lazyload -d`
2. 引入 
`src/main.js`
```
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
})
```
3. 使用
```
<img  v-lazy="'/static/'+good.productImage" alt="">
```
### 3.3 滚动加载
使用[vue-infinite-scroll](https://www.npmjs.com/package/vue-infinite-scroll)插件可以实现滚动加载。
1. 安装
`npm install vue-infinite-scroll --save`
2. 引入
`src/main.js`
```
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
```
3. 使用
```
<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
   <img src="../assets/loading-spinning-bubbles.svg" >
</div>

var count = 0;
new Vue({
  el: '#app',
  data: {
    data: [],
    busy: false
  },
  methods: {
    loadMore: function() {
      this.busy = true;
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: count++ });
        }
        this.busy = false;
      }, 1000);
    }
  }
});
```
注释：`infinite-scroll-disabled`表示滚动加载是否禁用。 
### 3.4 请求代理
1. 开发过程中，前端服务与后端接口一般存在着跨域问题。`vue-cli`提供了`proxyTable`代理功能解决跨域问题。
注释：①  开发环境前端服务端口`8080`(`/config/index.js中的port: 8080`)与后端服务端口(`/server/bin/www中的var port = normalizePort(process.env.PORT || '3000');`)不同，存在跨域，所有需要使用请求代理。② 一般仅在开发环境中配置。
注意：①跨域问题只是`web`前端浏览器的行为，在`web`前端请求不符合同源策略接口数据时出现。②后端`node`连接`mongodb`数据库即使协议域名端口不同(不符合同源策略)，也不存在跨域问题。
2. 修改`/config/index.js` 文件中的`dev.proxyTable`配置
```
proxyTable: {
      '/goods': {
        target: 'http://localhost:3000' 
      }
    }
}
```
此时，当我们请求 `http://localhost:8888/goods` 的时候,就等于请求了`http://localhost:3000/goods`。
注意： `'/goods'`规则不仅能够匹配`'/goods'`规则的路径，还能够匹配` '/goods/a'`、` '/goods/a/b'`等规则的路径。
```
proxyTable: {
      '/api': {
        target: 'http://localhost:3000' ,
        pathRewrite: {
          '^/api':  ''
        }
      }
    }
}
```
此时，当我们请求 `http://localhost:8888/api` 的时候,就等于请求了`http://localhost:3000`。
## 参考资料
* [webpack+vue-cil 中proxyTable配置接口地址代理](https://www.cnblogs.com/tugenhua0707/p/8052051.html)
