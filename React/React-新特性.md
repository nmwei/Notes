1. `React` 中一个常见模式是为一个组件返回多个元素。`Fragments` 可以让你聚合一个子元素列表，并且不在`DOM`中增加额外节点。
```
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```
注意：①`key` 是唯一可以传递给 `Fragment` 的属性。② 在 `React` 中，`<></>` 是 `<React.Fragment><React.Fragment/>` 的语法糖。
2.  `Strict Mode`严格模式
`StrictMode`是一个用以标记出应用中潜在问题的工具。与`Fragment`类似，`StrictMode`不会渲染任何真实的`UI`。它为其后代元素触发额外的检查和警告。
```
import { StrictMode, Component } from 'react'

class Child extends Component {
  // 以下三个函数在 React v16.3 已不被推荐，未来的版本会废弃。
  componentWillMount() {
    console.log('componentWillMount')
  }
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }
  render() {
    return (
      <div />
    )
  }
}

export default class StrictModeExample extends Component {
  render() {
    return (
      <StrictMode>
        <Child />
      </StrictMode>
    )
  }
}
```
由于在`StrictMode`内使用了三个即将废弃的`API`，打开控制台 ，可看到如下错误提醒：
![控制台报错信息](https://upload-images.jianshu.io/upload_images/4989175-8d2e8edf94a90d7c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
注释：严格模式检查只在开发模式下运行，不会与生产模式冲突。
3. `createRef (v16.3)`
(1) 老版本`ref`使用方式
① 字符串形式： `<input ref="input" />`
② 回调函数形式：`<input ref={input => (this.input = input)} />`
(2) [字符串形式缺点](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact%2Fpull%2F8333%23issuecomment-271648615)
① 需要内部追踪 `ref` 的 `this` 取值，会使 `React` 稍稍变慢。
② 有时候`this`与你想象的并不一致。
```
import React from 'react'

class Children extends React.Component {
  componentDidMount() {
    // <h1></h1>
    console.log('children ref', this.refs.titleRef)
  }
  render() {
    return (
      <div>
        {this.props.renderTitle()}
      </div>
    )
  }
}

class Parent extends React.Component {
  // 放入子组件渲染
  renderTitle = () => (
    <h1 ref='titleRef'>{this.props.title}</h1>
  )

  componentDidMount() {
    // undefined
    console.log('parent ref:', this.refs.titleRef)
  }
  render() {
    return (
      <Children renderTitle={this.renderTitle}></Children>
    )
  }
}

export default Parent
```
(3) `createRef`[语法](https://react.docschina.org/docs/react-api.html#reactcreateref)
```
import React from 'react'

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}

export default MyComponent
```
4. 调用`setState`更新状态时，若之后的状态依赖于之前的状态，推荐使用传入函数形式。
语法：`setState((prevState, props) => stateChange, [callback])`
例如，假设我们想通过`props.step`在状态中增加一个值：
```
this.setState((prevState, props) => {
  return {counter: prevState.counter + props.step};
});
```
5. 错误边界
(1) 错误边界用于捕获其**子组件树** `JavaScript` 异常，记录错误并展示一个回退的 `UI` 的 `React` 组件，避免整个组件树异常导致页面空白。
(2) 错误边界在渲染期间、生命周期方法内、以及整个组件树构造函数内捕获错误。
(3) 组件如果定义了`static getDerivedStateFromError()`或`componentDidCatch()`中的任意一个或两个生命周期方法 。当其子组件抛出错误时，可使用`static getDerivedStateFromError()`更新`state`，可使用`componentDidCatch()`记录错误信息。
```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```
而后你可以像一个普通的组件一样使用：
```
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```
注释：`getDerivedStateFromError `和`componentDidCatch`方法使用一个即可捕获**子组件树**错误。
6. `Portal` 
(1) `Portals` 提供了一种很好的将子节点渲染到父组件以外的 `DOM` 节点的方式。
(2) 通过 `Portals` 进行事件冒泡
尽管 `portal` 可以被放置在`DOM` 树的任何地方，但在其他方面其行为和普通的 `React` 子节点行为一致。一个从 `portal` 内部会触发的事件会一直冒泡至包含 `React` 树 的祖先。
```
import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
  render() {
    return this.props.clicks % 2 === 1
      ? this.props.children
      : ReactDOM.createPortal(
        this.props.children,
        document.getElementById('modal'),
      );
  }
}

class Child extends React.Component {
  render() {
    return (
      <button>Click</button>
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <Modal clicks={this.state.clicks}>
          <Child />
        </Modal>
      </div>
    );
  }
}

export default Parent
```
注释：当组件由`portal`渲染方式切换为普通渲染方式，会导致该组件被卸载之后重新渲染。组件放大功能如果通过`portal`方式实现，放大前的状态(滚动位置、焦点位置等)无法保持。 
7. `fiber`[介绍](https://zhuanlan.zhihu.com/p/26027085)
`fiber`是`React 16`中新的和解引擎。它的主要目的是使虚拟`DOM`能够进行增量渲染。
(1) 同步更新过程的局限
当`React`决定要加载或者更新组件树时，会做很多事，比如调用各个组件的生命周期函数，计算和比对`Virtual DOM`，最后更新`DOM`树，这整个过程是同步进行的。浏览器那个唯一的主线程都在专心运行更新操作，无暇去做任何其他的事情。
![更新过程的函数调用栈](https://upload-images.jianshu.io/upload_images/4989175-6b295ca95c2974d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(2) `React Fiber`的方式
破解`JavaScript`中同步操作时间过长的方法其实很简单——分片。
`React Fiber`把更新过程碎片化，执行过程如下面的图所示，每执行完一段更新过程，就把控制权交还给`React`负责任务协调的模块，看看有没有其他紧急任务要做，如果没有就继续去更新，如果有紧急任务，那就去做紧急任务。
维护每一个分片的数据结构，就是`Fiber`。
![更新过程的函数调用栈](https://upload-images.jianshu.io/upload_images/4989175-6f3f928c50c4f630.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(3) `React Fiber `更新过程的两个阶段
在`React Fiber`中，一次更新过程会分成多个分片完成，所以完全有可能一个更新任务还没有完成，就被另一个更高优先级的更新过程打断，这时候，优先级高的更新任务会优先处理完，而低优先级更新任务所做的工作则会完全作废，然后等待机会重头再来。
`React Fiber`一个更新过程被分为两个阶段(`Phase`)：第一个阶段`Reconciliation Phase`和第二阶段`Commit Phase`。
在第一阶段`Reconciliation Phase`，`React Fiber`会找出需要更新哪些`DOM`，这个阶段是可以被打断的；但是到了第二阶段`Commit Phase`，那就一鼓作气把`DOM`更新完，绝不会被打断。
(4) `React Fiber`对现有代码的影响
![image.png](https://upload-images.jianshu.io/upload_images/4989175-bbfba8211a547989.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
因为第一阶段的过程会被打断而且“重头再来”，就会造成第一阶段中的生命周期函数在一次加载和更新过程中可能会被多次调用！
第一个阶段的四个生命周期函数中，`componentWillReceiveProps `、`componentWillMount`和`componentWillUpdate`这三个函数可能包含副作用，所以当使用`React Fiber`的时候一定要重点看这三个函数的实现。
注释：大家应该都清楚进程（`Process`）和线程（`Thread`）的概念，在计算机科学中还有一个概念叫做`Fiber`，英文含义就是“纤维”，意指比`Thread`更细的线，也就是比线程(`Thread`)控制得更精密的并发处理机制。
8. 声明周期变化
从 `v16.3` 开始，原来的三个生命周期 `componentWillMount`、`componentWillUpdate`、`componentWillReceiveProps` 将被废弃，取而代之的是两个全新的生命周期:
① `static getDerivedStateFromProps`
② `getSnapshotBeforeUpdate`
9. `getDerivedStateFromProps`用法
`static getDerivedStateFromProps(nextProps, prevState)`
组件**实例化后**和**接受新属性时**将会调用`getDerivedStateFromProps`。它应该返回一个对象来更新状态，或者返回`null`来表明新属性不需要更新任何状态。
如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用。
如果你只想处理变化，你可能想去比较新旧值。调用`this.setState()`通常不会触发`getDerivedStateFromProps()`。
10. `getStapshotBeforeUpdate`
`getSnapshotBeforeUpdate()`在最新的渲染输出提交给`DOM`前将会立即调用。它让你的组件能在当前的值可能要改变前获得它们。这一生命周期返回的任何值将会 作为参数被传递给`componentDidUpdate()`。
```
class ScrollingList extends React.Component {
  listRef = React.createRef();

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the current height of the list so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      return this.listRef.current.scrollHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    if (snapshot !== null) {
      this.listRef.current.scrollTop +=
        this.listRef.current.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
}
```
在上面的例子中，为了支持异步渲染，在`getSnapshotBeforeUpdate` 中读取`scrollHeight`而不是`componentWillUpdate`，这点很重要。由于异步渲染，在“渲染”时期（如`componentWillUpdate`和`render`）和“提交”时期（如`getSnapshotBeforeUpdate`和`componentDidUpdate`）间可能会存在延迟。如果一个用户在这期间做了像改变浏览器尺寸的事，从`componentWillUpdate`中读出的`scrollHeight`值将是滞后的。
11. `Context`用法
```
import React from 'react'

const ThemeContext = React.createContext();

const ThemedButton = (props) => (
  <ThemeContext.Consumer>
    { context => <span style={{color: context}}>{props.text}</span> }
  </ThemeContext.Consumer>
)

const Toolbar = () => (
  <ThemeContext.Provider value='red'>
    <ThemedButton text="Context API"/>
  </ThemeContext.Provider>
)

export default Toolbar
```
注释：在 `Context.Consumer` 中，`children`必须为函数。
# 参考资料
[React中文文档](https://react.docschina.org/)
[深入React v16新特性（一）](https://juejin.im/post/5ad949e36fb9a07aa92544e4)
[深入React v16新特性（二）](https://juejin.im/post/5ade9be2f265da0b8f622ddf)
