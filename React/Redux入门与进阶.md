# 一. Redux入门
1. `Redux Devtools`调试插件安装
设置 - 扩展程序 - 打开`Chrome`网上应用店 - `Redux Devtools`
2. 使用`Redux`实现`TodoList`

(1) 安装`redux`
```
➜  my-react-app git:(master) ✗ yarn add redux
```
(2) 创建`Store`
```
// src/store/index.js
import { createStore } from 'redux'
import reducer from './reducer'

//store是唯一的，只有store能改变state
const store = createStore(
  reducer,
  //Redux DevTools调试工具
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
``` 
(3) 创建`actionTypes`
```
// src/store/actionTypes.js
export const CHANGE_INPUT_VALUE = 'change_input_value'
export const ADD_TODO_ITEM = 'add_todo_item'
export const DELETE_TODO_ITEM = 'delete_todo_item'
```
(4) 创建`actionCreators`
```
// src/store/actionCreators.js
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes'

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE, value
})

export const getAddTodoItemAction = () => ({
  type: ADD_TODO_ITEM
})

export const getDeleteTodoItemAction = (value) => ({
  type: DELETE_TODO_ITEM, value
})
```
(5) 实现`reducer`
```
// src/store/reducer.js
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes'

const defaultState = {
  inputValue: '',
  list: []
}

//redux是一个纯函数，输入固定则输出固定，且没有副作用
//redux不应修改旧的state
export default (state = defaultState, action) => {
  switch(action.type){
    case  CHANGE_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.value
      }  
    case ADD_TODO_ITEM:
      return {
        ...state,
        inputValue: '',
        list: [...state.list, state.inputValue]
      }
    case DELETE_TODO_ITEM:
      return {
        ...state,
        list: state.list.filter(
          (item, index) => index !== action.value
        )
      }
  }
  return state
}
```
(6) 实现`TodoList`组件
```
// src/TodoList.js
import React, { Component } from 'react';
import { Input, Button, List } from 'antd'
import store from './store'
import {getInputChangeAction, getAddTodoItemAction, getDeleteTodoItemAction} from './store/actionCreators'

class TodoList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = store.getState()
    this._handleStoreChange = this._handleStoreChange.bind(this)
    this._handleInputChange = this._handleInputChange.bind(this)
    this._handleButtonClick = this._handleButtonClick.bind(this)
    //订阅Store变化，执行_handleStoreChange方法
    store.subscribe(this._handleStoreChange)
  }

  render() {
    return (
      <div>
        <div style={{display: 'flex'}}>
          <Input 
            placeholder='todo info'
            value = {this.state.inputValue}
            onChange={this._handleInputChange}
          />
          <Button 
            type="primary"
            onClick={this._handleButtonClick}
          >
            提交
          </Button>
        </div>
        <List
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (
              <List.Item onClick={this._handleItemDelete.bind(this, index)}>{item}</List.Item>
            )
          }
        />
      </div>
    )
  }

  _handleStoreChange() {
    this.setState(store.getState())
  }

  _handleInputChange(e) {
    store.dispatch(getInputChangeAction(e.target.value))
  }

  _handleButtonClick() {
    store.dispatch(getAddTodoItemAction())
  }

  _handleItemDelete(index) {
    store.dispatch(getDeleteTodoItemAction(index))
  }
}

export default TodoList;
```
3. `Redux`核心`API`
(1) `createStore`： 创建应用唯一的`store`。
(2) `store.dispatch`：派发`action`， 该`action`会传递给`store`。
(3) `store.getState`：获取`store`中所有数据内容。
(4) `store.subscribe`：订阅`store`改变，绑定回调函数。
# 二. Redux中间件
1. `Redux`中间件介绍
① 中间件指`action`和`store`“中间”。中间件是对`dispatch`方法的升级。
② 流程图
![image.png](https://upload-images.jianshu.io/upload_images/4989175-92b8c79b92a9db21.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. `redux-thunk`中间件

① 安装`redux-thunk`
```
 yarn add redux-thunk
```
② 创建`store`时引入`redux-thunk`中间件
```
//src/store/index.js
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'

//Redux DevTools调试工具
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

const store = createStore(reducer, enhancer)

export default store
```
③ 定义`action`
```
//src/store/actionCreators.js
export const getInitListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
})

export const getInitList = () => {
  return (dispatch) => {
    axios.get('/list.json').then((res) => {
      dispatch(getInitListAction(res.data))
    })
  }
}
```
④ 分发`action`
```
  //src/components/TodoList/TodoList.js
  componentDidMount() {
    store.dispatch(getInitList());
  }
```
⑤ `redux-thunk`使用总结
使用`redux-thunk`后，`action`可以不是一个对象，而是一个方法。 `dispatch`方法类型的`action`，会调用该方法，并传入`dispatch`实参。
在函数内部可以通过该实参`dispatch`其他`action`动作。
总结：`redux-thunk`中间件将异步获取数据代码抽离到`aciton`中。 
3. `redux-saga`中间件

① 安装`redux-saga`
```
yarn add redux-saga
```
② 创建`store`时引入`redux-thunk`中间件
```
//src/store/index.js
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import todoSagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

//Redux DevTools调试工具
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));


//store是唯一的，只有store能改变state
const store = createStore(reducer, enhancer)

sagaMiddleware.run(todoSagas)

export default store
```
③ 定义`sagas`
```
//src/store/sagas.js
import { takeEvery, put } from 'redux-saga/effects'
import { GET_INIT_LIST } from './actionTypes'
import axios from "axios"
import {getInitListAction} from "./actionCreators"

function *getInitList() {
  try {
    const res = yield axios.get('/list.json')
    const action = getInitListAction(res.data)
    yield put(action)
  } catch (e) {
    console.log('list.json 网络请求失败！')
  }
}

//generator函数
function* mySaga() {
  yield takeEvery(GET_INIT_LIST, getInitList);
}

export default mySaga;
```
④ 分发`action`
```
//src/components/TodoList/TodoList.js
componentDidMount() {
  store.dispatch(getInitList())
}
```
⑤ `redux-saga`使用总结
使用 `redux-saga`后，`action`可以不被`reducer`处理，而是被`saga`处理。 
在`saga`函数内部可以通过`put`方法`dispatch`其它`action`动作。
总结：`redux-saga`中间件将异步获取数据代码抽离到`saga`中。
# 三. react-redux介绍
1. 使用`react-redux`实现`TodoList`

(1) 安装`react-redux`
```
➜  my-react-app git:(master) ✗ yarn add react-redux
```
(2) 创建`Store`
```
// src/store/index.js
import  { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

export default store
``` 
(3) 使用`Provider`组件包裹根组件
```
//src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import TodoList from './components/TodoList/TodoList'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <TodoList/>
  </Provider>,
  document.getElementById('root')
);
```
注释：`store`传入`Provider`组件，使`Provider`内部组件都有机会获取`store`中的`state`。
(4) 创建`actionTypes`
```
// src/store/actionTypes.js
export const CHANGE_INPUT_VALUE = 'change_input_value'
export const ADD_TODO_ITEM = 'add_todo_item'
export const DELETE_TODO_ITEM = 'delete_todo_item'
```
(5) 创建`actionCreators`
```
// src/store/actionCreators.js
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes'

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE, value
})

export const getAddTodoItemAction = () => ({
  type: ADD_TODO_ITEM
})

export const getDeleteTodoItemAction = (value) => ({
  type: DELETE_TODO_ITEM, value
})
```
(6) 实现`reducer`
```
// src/store/reducer.js
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes'

const defaultState = {
  inputValue: '',
  list: []
}

//redux是一个纯函数，输入固定则输出固定，且没有副作用
//redux不应修改旧的state
export default (state = defaultState, action) => {
  switch(action.type){
    case  CHANGE_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.value
      }  
    case ADD_TODO_ITEM:
      return {
        ...state,
        inputValue: '',
        list: [...state.list, state.inputValue]
      }
    case DELETE_TODO_ITEM:
      return {
        ...state,
        list: state.list.filter(
          (item, index) => index !== action.value
        )
      }
  }
  return state
}
```
(7) 实现`TodoList`组件
```
// src/TodoList.js
import React from 'react'
import { Input, Button, List } from 'antd'
import { connect } from 'react-redux'
import { getInputChangeAction, getAddTodoItemAction, getDeleteTodoItemAction } from '../../store/actionCreators'

const TodoList = (props) => {
  const {inputValue, handleInputChange, addListItem, list, handleItemDelete} = props
  return (
    <div>
      <di>
        <Input value={inputValue} onChange={handleInputChange}/>
        <Button type="primary" onClick={addListItem}>
          提交
        </Button>
      </di>
      <List bordered dataSource={list} renderItem={(item, index) => (
          <List.Item onClick={() => {handleItemDelete(index)}}>
            {item}
          </List.Item>
        )}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange(e) {
      dispatch(getInputChangeAction(e.target.value))
    },
    handleItemDelete(index) {
      dispatch(getDeleteTodoItemAction(index))
    },
    addListItem() {
      dispatch(getAddTodoItemAction())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```
注释：`TodoList`为一个`UI`(纯)组件，`connect(mapStateToProps, mapDispatchToProps)(TodoList)`为一个容器组件。业务逻辑被抽离到`mapStateToProps`和`mapDispatchToProps`方法中。
2. `react-redux`与`redux`用法差异
① `Provider`组件。
② `connect`方法。
3. `redux`中`combineReducers`方法的使用
① 创建`TodoList`对应的`reducer`文件
```
// ./src/components/TodoList/store/reducer.js
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from '../../../store/actionTypes'

const defaultState = {
  inputValue: '',
  list: []
}

//redux是一个纯函数，输入固定则输出固定，且没有副作用
//redux不能修改旧的state
export default (state = defaultState, action) => {
  switch(action.type){
    case  CHANGE_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.value
      }
    case ADD_TODO_ITEM:
      return {
        ...state,
        inputValue: '',
        list: [...state.list, state.inputValue]
      }
    case DELETE_TODO_ITEM:
      return {
        ...state,
        list: state.list.filter(
          (item, index) => index !== action.value
        )
      }
  }
  return state
}
```
② 使用`combineReducers`
```
// src/store/reducer.js
import todoListReducer from '../components/TodoList/store/reducer'
import { combineReducers } from 'redux'

export default combineReducers({
  todoList: todoListReducer
})
```
③ 修改`TodoList`组件
```
// src/components/TodoList/TodoList.js
//......
const mapStateToProps = (state) => {
  return {
    inputValue: state.todoList.inputValue,
    list: state.todoList.list
  }
}
//......
```
