# 1. create-react-app
1. 使用`create-react-app`创建项目
```
create-react-app my-react-app
```
2. 启动项目
```
cd my-react-app 
yarn start
```
注释：也可以使用`npm start`启动项目。
3. `mock`数据

① 创建`mock`数据文件
```
// /public/api/data.json
{
  "success": true,
  "data": [1, 2, 3]
}
```
② 请求数据
```
fetch('/api/data.json')
  .then(res => res.json())
  .then(data => console.log(data))
 // {data: [1, 2, 3], success: true}
```
# 2. react-transition-group
1. [文档地址](https://reactcommunity.org/react-transition-group/)
2. 安装`react-transition-group`
```
➜  my-react-app git:(master) ✗ yarn add react-transition-group
```
3. `CSSTransition`组件的简单使用
```
import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'
import './style.css'

class App extends Component {

  constructor(props, context){
    super(props, context)
    this.state = {
      show: true
    }
  }

  render() {
    
    return (
      <div>
        <CSSTransition
          in={this.state.show}
          timeout={1000}
          classNames='fade'
          appear={true} //第一次展示时也添加动画效果
          unmountOnExit //出场之后将元素移除
          onEntered={   //入场动画结束钩子函数 
            el => console.log(el) //el表示内部元素
          }  
        >
          <div>Hello</div>
        </CSSTransition>
        <button onClick={this._toggleShow}>Toggle</button>
      </div>
    );
  }

  _toggleShow = () => {
    this.setState({
      show: !this.state.show
    })
  }
}

export default App;
```
```
/* 定义class为fade的
CSSTransition元素第一次展示时动画 */
.fade-appear {
  opacity: 0;
}

.fade-appear-active {
  opacity: 1;
  transition: opacity 1s ease-in
}

/* 定义class为fade的
CSSTransition元素入场动画 */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  opacity: 1;
  transition: opacity 1s ease-in
}

.fade-enter-done {
  opacity: 1;
}

/* 定义class为fade的
CSSTransition元素出场动画 */
.fade-exit {
  opacity: 1;
}

.fade-exit-active {
  opacity: 0;
  transition: opacity 1s ease-in
}

.fade-exit-done {
  opacity: 0;
}
```
4. `CSSTransition`组件的其它钩子函数
`onEnter`：入场动画执行第一帧时钩子函数
`onEntering`：入场动画执行第二帧时钩子函数
`onEntered`：入场动画执行最后一帧钩子函数
`onExit`：出场动画执行第一帧时钩子函数
`onExiting`：出场动画执行第二帧时钩子函数
`onExited`：出场动画执行最后一帧钩子函数
5. `Transition`是更底层组件，`CSSTransition`组件是根据`Transition`组件实现的。
# 3. styled-components
1. `js`文件中引入`css`文件的弊端
引入的`css`文件在整个`html`中生效。
2. 安装`styled-components`
```
➜  my-react-app git:(master) ✗ yarn add styled-components
```
3. 全局样式  

① 创建全局样式组件
```
//src/style.js
import { createGlobalStyle } from 'styled-components'

export const Globalstyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`
```
② 使用全局样式组件
```
import { Globalstyle } from './style.js'

ReactDOM.render(
  <Provider store={store}>
    <TodoList/>
    <Globalstyle />
  </Provider>,
  document.getElementById('root')
);
```
4. 创建带样式的元素

(1) 创建组件
```
//src/components/TodoList/style.js
import styled from 'styled-components'
import icon from '../../statics/weixin.jpg'

export const HeaderWrapper  = styled.div.attrs({
  //属性
})`
  height: 56px;
  background: url(${icon});
  &.right {
    float: right
  }
  .text {
     font-size: 20px;
     color: ${props => props.textColor}
  }
`
```
注释：①`&.right`表示`class`为`right`的`HeaderWrapper`组件的样式。②`.text`表示`HeaderWrapper`内`class`为`text`的元素的样式。③支持`props`传值。
(2) 使用组件
```
import { HeaderWraper } from './style'
const TodoList = (props) => {
  return (
    <HeaderWraper textColor='red'>
     //...
    </HeaderWraper>
  )
}
```
注释：该组件是一个有样式的`div`元素包裹层。
# 4. Iconfont阿里云图标
1. 进入[阿里云图标网站](https://www.iconfont.cn/)
2. 创建项目并添加图标
3. 下载`Unicode`至本地并解压
4. 拷贝文件
将`iconfont.css`、`iconfont.eot`、`iconfont.svg`、`iconfont.ttf`、`iconfont.woff`文件拷贝到项目中。项目路径如下：
`./src/statics/iconfonts/iconfont.XXX`
5. 使用`styled-components`导入`CSS`文件
① 重命名`iconfont.css`为`iconfont.js`
② 编辑`iconfont.js`文件
```
import { createGlobalStyle } from 'styled-components'

export const IconFontGlobalComponent = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('./iconfont.eot?t=1550907977882'); /* IE9 */
  src: url('./iconfont.eot?t=1550907977882#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,dfA2nmlc/BurCg==') format('woff2'),
  url('./iconfont.woff?t=1550907977882') format('woff'),
  url('./iconfont.ttf?t=1550907977882') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('./iconfont.svg?t=1550907977882#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconstar_blue:before {
  content: "\e625";
}
`
```
6. 引入全局组件
```
import { IconFontGlobalComponent } from './statics/iconfonts/iconfont'

ReactDOM.render(
  <Provider store={store}>
    <TodoList/>
    <IconFontGlobalComponent />
  </Provider>,
  document.getElementById('root')
);
```
7. 使用字体图标
```
 <span className="iconfont">&#xe625;</span>
```
# 5. Immutable的用法
## 5.1 immutable使用
1. 安装`immutable.js`
```
➜  my-react-app git:(master) ✗ yarn add immutable
```
2. 改写`reducer.js`
```
// ./src/components/TodoList/store/reducer.js
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from '../../../store/actionTypes'
import { fromJS } from 'immutable'


const defaultState = fromJS({
  inputValue: '',
  list: []
})

export default (state = defaultState, action) => {
  switch(action.type){
    case  CHANGE_INPUT_VALUE:
      return state
        .set('inputValue', action.value)
    case ADD_TODO_ITEM:
      return state
        .merge({
           list: state.get('list').push(state.get('inputValue')),
           inputValue: ''
        })
    case DELETE_TODO_ITEM:
      return state
        .set('list', state.get('list').filter((item, index) => index !== action.value))
  }
  return state
}
```
注意：`state`为`immutable`对象，其内部`list`值也为`immutable`对象。为保持数据类型统一，当`action`类型为`ADD_TODO_ITEM`或`DELETE_TODO_ITEM `时，需要设置`list`值仍为`immutable`对象。
3. 改写`TodoList`组件
```
// src/components/TodoList/TodoList.js
//......
const mapStateToProps = (state) => {
  return {
    inputValue: state.todoList.get('inputValue'),
    list: state.todoList.get('list')
  }
}
//......
```
## 5.2 redux-immutable使用
1. 安装` redux-immutable`
```
➜  my-react-app git:(master) ✗ yarn add redux-immutable
```
2. 改写`reducer`
```
//src/store/reducer.js
import todoListReducer from '../components/TodoList/store/reducer'
import { combineReducers } from 'redux-immutable'

export default combineReducers({
  todoList: todoListReducer
})
```
注释：`combineReducers`从`redux-immutable`中引入，使该函数生成`immutable`对象。
3. 改写`TodoList`组件
```
// src/components/TodoList/TodoList.js
//......
const mapStateToProps = (state) => {
  return {
    inputValue: state.getIn(['todoList', 'inputValue']),
    list: state.getIn(['todoList','list'])
  }
}
//......
```
# 6. [react-router](https://reacttraining.com/react-router/)
## 6.1 路由实现
1. 安装
```
 yarn add react-router-dom
```
2. 使用
```
//src/pages/home/home.js
import { Link } from 'react-router-dom'
import React from 'react'

const Home = () => (
  <div>
    <Link to="/detail">to Detail</Link>
    <Link to="/param/1">to Param</Link>
    <Link to="/query?query=1">to Query</Link>
  </div>
);

export default Home
```
```
//src/pages/detail/detail.js
import { Link } from 'react-router-dom'
import React from 'react';

const Detail = () => (
  <Link to="/"><h1>Detail</h1></Link>
)

export default Detail
```
```
//src/pages/param/param.js
import { Link, Redirect, withRouter } from 'react-router-dom'
import React from 'react'

const Param = (props) => {
  return props.match.params.id === '1'
    ? (<Link to="/">{props.match.params.id}</Link>)
    : <Redirect to='/'/>
}

//使用witchRouter装饰，则该组件可以拿到match值
export default withRouter(Param)
```
```
//src/pages/query/query.js
import { Link } from 'react-router-dom'
import React from 'react'

const Query = () => (
  <Link to="/">
    <h2>Detail</h2>
  </Link>
)

export default Query
```
```
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render(
  <div>
    <BrowserRouter>
      <div>
        <Route path='/' exact component={Home}/>
        <Route path='/detail' exact component={Detail}/>
        <Route path='/param/:id' exact component={Param}/>
        <Route path='/query' exact component={Query}/>
      </div>
    </BrowserRouter>
  </div>,
  document.getElementById('root')
);
```
注释：①如果不添加`exact`属性，则进入`/detail`路径时，`Home`和`Detail`都会显示出来。②`Redirect`为重定向组件，渲染该组件时，路由会重定向到`to`属性对应的路由。
# 6.2 问题分析
###  6.2.1 webpack-dev-server单页面路由问题
1. 使用`webpack-dev-server`开启服务
2. 问题描述
点击`link`可以实现路由跳转跳转，但是直接访问`http://localhost:9000/detail`无法访问。
3. 问题分析
在访问`/detail`路径时，`webpack-dev-server`以为你想要打开的是`http://localhost:9000/detail.html`。因为没有此页面，所以报错。
4. 解决方案
配置[devServer.historyApiFallback](https://www.webpackjs.com/configuration/dev-server/#devserver-historyapifallback)
`webpack.config.js`
```
module.exports = {
  //...
  devServer: {
    historyApiFallback: true
  }
};
```
# 7. [react-loadable](https://github.com/jamiebuilds/react-loadable)异步组件
1. 安装`react-loadable`
```
npm i react-loadable --save
```
2. 使用`react-loadable`
```
import Loadable from 'react-loadable';
import React from 'react'

const LoadableComponent = Loadable({
  loader: () => import('./detail'),
  loading: () => <div>正在加载</div>,
});

export default () => <LoadableComponent/>
```
注释：`/detail`对应组件被`react-loadable`封装之后会异步加载。
# 参考资料
- [React 16.4 开发简书项目 从零基础入门到实战](https://coding.imooc.com/class/chapter/229.html)
