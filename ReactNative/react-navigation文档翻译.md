# 一. Hello Mobile Navigation
>让我们使用**React Naviation**来创建一个简单的聊天会话应用，可以跨平台运行在安卓和iOS客户端。
##Setup and Installation- 配置和安装
首先，确定你已经配置好了**React Native**开发环境；然后，创建一个新的项目；安装**react-navigation**包：
``` javascript
# Create a new React Native App
react-native init SimpleApp
cd SimpleApp

# Install the latest version of react-navigation from npm
npm install --save react-navigation

# Run the new app
react-native run-android # or:
react-native run-ios
```
检查你的iOS或者安卓设备是否成功显示出了ReactNative的初始App界面。
我们想要在iOS和Android平台共享一份代码，让我们删除`index.ios.js`和`index.android.js`文件的内容，使用`import './App';` 的写法。
现在为我们app的实现创建一个新的文件：`App.js`。
## Introducing Stack Navigator -简介
对于我们的app，我们想要实现一个概念性的**栈导航器**，在这个导航器中，每一个新的场景组件都被放入到栈的顶部，并且返回时同样移除栈顶的那个场景组件。我们可以使用**StackNavigator**。让我们从一个组件场景的情况开始。
>**注意：**场景组件既为一般的组件，该组件被**react-navigation**渲染成一个路由页面。

```javascript
import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    return <Text>Hello, Navigation!</Text>;
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
```
这个场景的`标题`在[static navigationOptions](https://reactnavigation.org/docs/navigators/navigation-options)中是可以配置的。那里有很多关于导航的选项都可以被配置。
现在同一个路由场景可以在iPhone和Android应用中出现。
## Adding a New Screen-添加一个新的组件场景
在`App.js`文件中，让我们添加一个新的组件场景，叫做`ChatScreen `：
```javascript
class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}
```
我们在`HomeScreen`组件中添加一个按钮，使用`Chat`的路由名称链接到`ChatScreen `。
```javascript
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => navigate('Chat')}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}
```
我们使用的**navigate**函数来跳转到`ChatScreen`组件场景。该函数可以从当前场景（HomeScreen）的[navigation属性](https://reactnavigation.org/docs/navigators/navigation-prop)中找到。但是想要实现跳转，我们必须将`ChatScreen`组件添加到我们的`StackNavigator`中：
```javascript
const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
});
```
现在你可以使用navigate函数跳转到一个新的组件场景，然后返回。

![first-navigation-iphone.gif](http://upload-images.jianshu.io/upload_images/4989175-930b23062dd4373f.gif?imageMogr2/auto-orient/strip)
##Passing params-传递参数
`ChatScreen`组件场景强制固定所有参数的做法并不可取，如果我们可以传递一个参数到`ChatScreen`组件场景，这将比较有用。让我们开始做吧。在我们调用navigate函数，添加一个指定的路由名字的时候，我们可以传递参数`pasrams`到新的路由中。首先，我们编辑**HomeScreen**组件场景，传递一个**user**的参数到新的路由。 
```javascript
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => navigate('Chat', { user: 'Lucy' })}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}
```
我们可以编辑**ChatScreen**组件场景，使用路由传过来的**user**参数：
```javascript
class ChatScreen extends React.Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}
```
现在你可以看到，当你使用navigate函数跳转到**ChatScreen**路由页面时传递的name参数。尝试修改**HomeScreen**组件场景，看看将会发生什么。
![first-navigation-iphone.png](http://upload-images.jianshu.io/upload_images/4989175-e9ec67c2f074ad08.png?imageMogr2/auto-orient/strip)
# 二.  Nesting Navigators
>由多种形式导航构成的移动应用是很常见的。在React Navigation中，路由和导航都是存在的，允许你为应用构建复杂的导航结构。在我们的聊天会话应用中，我们想要在一个组件场景中放入一个tab标签，来浏览最近的会话记录或者所有的联系人。

## Introducing Tab Navigator-tab导航简介
让我们在App.js中创建一个新的tab导航`(TabNavigation)`:
```javascript
import { TabNavigator } from "react-navigation";

class RecentChatsScreen extends React.Component {
  render() {
    return <Text>List of recent chats</Text>
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return <Text>List of all contacts</Text>
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});
```
如果**MainScreenNavigator **场景组件作为导航的顶层组件，应用将会看起来像这样：
![simple-tabs-iphone.png](http://upload-images.jianshu.io/upload_images/4989175-398a5cd7afe8536a.png?imageMogr2/auto-orient/strip)
##Nesting a Navigator in a screen-一个场景中嵌套一个导航
我们想要这些tab标签在应用中的一个场景中出现，但是导航栈中新的场景可以覆盖这些tab标签。
让我们将tabs导航作为一个顶层场景组件添加到我们之前创建的[**StackNavigator**](https://reactnavigation.org/docs/intro/)导航中。
```javascript
const SimpleApp = StackNavigator({
  Home: { screen: MainScreenNavigator },
  Chat: { screen: ChatScreen },
});
```
 由于**MainScreenNavigator**已经成为`SimpleApp`的一个场景组件，我们可以设置`navigationOptions`。
```javascript
MainScreenNavigator.navigationOptions = {
  title: 'My Chats',
};
```
>注意：MainScreenNavigator本质上是一个React组件类，可以设置静态方法 navigationOptions。

让我们给每一个tab标签也添加一个按钮来链接到一个聊天会话场景。
```javascript
<Button
  onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
  title="Chat with Lucy"
/>
```
现在我们已经将一个导航器（navigator）嵌套到另外一个中。我们可以在导航器之间使用navigate方法。
![nested-iphone.png.gif](http://upload-images.jianshu.io/upload_images/4989175-dab23c28e2aa5c4a.gif?imageMogr2/auto-orient/strip)
>**注意：** 导航器的分类 、嵌套与跳转
* 分类：StackNavigator为screen路由切换，TabNavigator为tab路由切换。
* 嵌套：StackNavigator与TabNavigator可以相互多层嵌套。
* 跳转：多层嵌套时，不同层级的组件场景都可以通过`navigate（title）`方法进行跳转。
# 三. Configuring the Header
>只有StackNavigator导航系统支持设置头部。

在之前的例子中，我们在App中创建了一个**StackNavigation**来展示几个界面。
当导航到一个会话界面的时候，我们可以通过向navigate方法中传递参数来向新的路由传递。在这个时候，我们希望在会话界面中提供人的名字（`Lucy`）。
 ```javascript
this.props.navigation.navigate('Chat', { user:  'Lucy' });
```
`user`参数可以被会话界面所接收：
```javascript
class ChatScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    return <Text>Chat with {params.user}</Text>;
  }
}
```
##Setting the Header Title - 设置头部标题
Next, the header title can be configured to use the screen param:
下面，可以使用参数来定义头部标题：
```javascript
class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });
  ...
}
```
##Adding a Right Button - 添加一个右侧按钮
接下来我们添加一个 [头部导航选项](https://reactnavigation.org/docs/navigators/navigation-options#Stack-Navigation-Options) 来允许我们添加一个定制的右侧按钮：
```javascript
static navigationOptions = {
  headerRight: <Button title="Info" />,
  ...
```
导航器选项可以根据[导航器属性](https://reactnavigation.org/docs/navigators/navigation-prop)来定义。让我们根据路由参数来渲染一个不同的按钮，并且按钮当按下时执行`navigation.setParams`方法。
```javascript
static navigationOptions = ({ navigation }) => {
  const {state, setParams} = navigation;
  const isInfo = state.params.mode === 'info';
  const {user} = state.params;
  return {
    title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
    headerRight: (
      <Button
        title={isInfo ? 'Done' : `${user}'s info`}
        onPress={() => setParams({ mode: isInfo ? 'none' : 'info'})}
      />
    ),
  };
};
```
现在，头部可以影响视图的路由／状态：
看其余的头部选项信息, 到[头部选项文档](https://reactnavigation.org/docs/navigators/navigation-options#Stack-Navigation-Options)。
# 四. NavigationPlayground 
### App.js - StackNavigator路由栈
1.  StyleSheet定义最细的线
```javascript
//这一常量定义了当前平台上的最细的宽度。可以用作边框或是两个元素间的分隔线。
StyleSheet.hairlineWidth 
```
2. StackNavigator方法参数
```javascript
const AppNavigator = StackNavigator({
  ...ExampleRoutes,
  Index: {
    screen: MainScreen,
  },
}, {
  //初始页面: 如果不设置该项，则显示位置在第一个的页面组件（SimpleStack）。
  initialRouteName: 'Index',
    //头部什么时候重新渲染：
    //float: 只有一个head头部，页面切换的时候有动画，ios里常用。
    //screen: 每一个屏幕都有一个头部，安卓里常用。
    //none: 不渲染head头部(该AppNavigator路由就没有头部)
  headerMode: 'none',
    // 路由切换动画
    // card: 使用安卓ios默认切换方式。ios-左滑动出现，android-向上渐变。
    // modal: 从屏幕底部向上弹出，只在ios上生效。
  mode: Platform.OS === 'ios' ? 'modal' : 'card',
});
```
3. 遍历对象
```javascript
//routeName表示key值
Object.keys(ExampleRoutes).map(
     (routeName: string) =>{
                //Todo
      }
```

###  SimpleStack.js - StackNavigator路由栈
4. ES6中的变量与字符串的拼接方法
```javascrpt
//``内部防止字符串和变量
//${}内放变量，${}外放字符串
//变量与变量之间没有连接符（${}${}）；字符串与变量之间（${}字符串）没有连接符
   `${params.name}'s Profile!`;
`${navigation.state.params.name}'s Photos`;
//可以换行
`${navigation.state.params.mode === 'edit' ? 'Now Editing ' : '' }${navigation.state.params.name}'s Profile`
```
5. 使用`navigate`方法可以推入哪些路由页面。
```javascript
AppNavigator  = StackNavigator (
      A: {screen: A}, 
      B: {screen: B}
)
B = StackNavigator({
       B1 : {screen: B1},
       B2: {screen: B2},
       B3: {screen: B3}
});
```
**分析：** ①同一级路由页面之间可以使用`navigator`方法跳转： A、B之间；B1、B2、B3之间。②不同级路由之间可以相互跳转（不推荐这样使用），A可以直接跳转到B1、B2、B3；B1、B2、B3可以直接跳转到A。
**注意：**  A.navigator(B) 与A.navigator(B1)的对比：因为B路由栈的初始路由页面是B1，所以两者都是显示B1页面；但是前者是A-B1的过程，而后者是A-B1-B1的过程。
6. navigation.goBack(null) 返回到哪里
不管有多层嵌套，`navigation.goBack(null)`都返回加载此页面的地方。
即： `navigation.goBack(null)`既有可能返回到当前路由栈的**上一个页面**，又可能返回多**上一级路由栈**。
7. 一个路由栈嵌套在另一个路由栈中，父路由栈展示子路由栈的时候如何隐藏头部
```javascript
//SimpleStack路由栈嵌套在AppNavigator路由栈中
//设置AppNavigator展示SimpleStack时无header头部。
//SimpleStack.navigationOptions这种写法与static navigationOptions写法对比
SimpleStack.navigationOptions = {
    header: null
};
```
8.  React无状态组件特点
 *  不需要声明类，可以避免大量的譬如extends或者constructor这样的代码；
 * 不需要显示声明this关键字 ，可以不用绑定this；
 * 支持设置默认的Props类型与值；
 * 可以访问Prop和Context的
```javascript
const Text = (props, context) =>
        <p style={context}>props.children</p>;
Text.contextTypes = {
       fontFamily: React.PropTypes.string
};
Text.propTypes = { children: React.PropTypes.string };
Text.defaultProps = { children: 'Hello World!' };
class App extends React.Component {
  static childContextTypes = {
        fontFamily: React.PropTypes.string
  }
  getChildContext() {
         return {
           fontFamily: 'Helvetica Neue'
         };
   }
  render() {
         return <Text>Hello World</Text>;
  }
}
```
 **注意：**我们会使用函数式无状态组件，除非需要本地 state 或生命周期函数的场景 。无状态组件输出方式完全取决于两个参数。
**扩展:**  [Context，React中隐藏的秘密！](https://github.com/brunoyang/blog/issues/9)

###  SimpleTabs.js - TabNavigator路由栈
1.  如何设置`TabNavigator`的被选中tab的颜色
```javascript
const SimpleTabs = TabNavigator({
      Home: {screen: MyHomeScreen},
      People: {screen: MyPeopleScreen},
      Chat: {screen: MyChatScreen},
      Settings: {screen: MySettingsScreen}
    }, {
      tabBarOptions: {
          //被选中tab的tintColor颜色值
          activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
      },
      //tab在页面的顶部（top）还是底部（bottom）
      tabBarPosition: 'bottom',
      //是否有切换动画
      animationEnabled: true,
      //是否可以手指滑动切换
      swipeEnabled: true,
});
```
2. 如何配置每一个tab的一些信息
```javascript
MySettingsScreen.navigationOptions = {
        //设置tab文字
      tabBarLabel: 'Settings',
        //设置tab图标
      tabBarIcon: ({ tintColor, focused }) => (
        //tintyColor在被选中时和未被选中时颜色值不同
        //focused是一个是否被选中的布尔值
        <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={26}
            style={{ color: tintColor }}
        />
      ),
};
```

### Drawer.js - DrawerNavigator
1. DrawerNavigator方法
```javascript
const DrawerExample = DrawerNavigator({
      Inbox: {screen: InboxScreen},
      Drafts: {screen: DraftsScreen},
  }, {
      //初始展示项
      initialRouteName: 'Drafts',
      contentOptions: {
        //被选中drawer的tintColor颜色值
        activeTintColor: '#e91e63'
  },
});
```
2. DraftScreen组件
```javascript
const DraftsScreen = ({ navigation }) => (
      <MyNavScreen
        banner={'Drafts Screen'}
        navigation={navigation}
      />
);
DraftsScreen.navigationOptions = {
      //drawer显示的文字
      drawerLabel: 'Drafts',
      drawerIcon: ({ tintColor }) => (
      //tintColor在被选中和未被选中时的颜色不同。
          <MaterialIcons
            name="drafts"
            size={24}
            style={{ color: tintColor }}
        />
    ),
};
```
3. MyNavScreen组件
```javascript
const MyNavScreen = ({ navigation, banner }) => (
      <ScrollView style={styles.container}>
        <SampleText>{banner}</SampleText>
        <Button
          //注意：打开drawer的方法
          onPress={() => navigation.navigate('DrawerOpen')}
          title="Open drawer"
        />
        <Button
          onPress={() => navigation.goBack(null)}
          title="Go back"
        />
      </ScrollView>
);
```

###  其他
1.   StackNavigator隐藏header的两种写法的对比
```javascript
//写法一
const ProfileNavigator = StackNavigator({
        Home: {screen: MyHomeScreen},
        Profile: {screen: MyProfileScreen},
}, {
        //内外层header都不渲染
        navigationOptions: {header: null}
});
//写法二
const ProfileNavigator = StackNavigator({
        Home: { screen: MyHomeScreen},
        Profile: {screen: MyProfileScreen},
}, {
        //内层header不渲染
        headerMode: 'none' 
});
//写法三
ProfileNavigator.navigationOptions = {
        //外层不渲染
        header: null
}
```
**写法一： ** 设置`MyHomeScreen`和`MyProfileScreen`路由页面没有头部。设置的是内层和外层路由页面都没有头部。 优先级低于在`MyHomeScreen`和`MyProfileScreen`通过 `static navigationOptions`方法设置。
**写法二： **  设置`MyHomeScreen`和`MyProfileScreen`路由页面没有头部。设置的只是内层路由页面没有头部。
**写法三：**  表示`ProfileNavigator`作为一个外层路由页面时没有头部。
**引申：** note this changed starting [beta9](https://github.com/react-community/react-navigation/releases/tag/v1.0.0-beta.9)
```javascript
Before:
        { header: { visible: false, }}
Now:
        { header: null,}
```
