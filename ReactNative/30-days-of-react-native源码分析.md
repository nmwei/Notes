## [Github地址](https://github.com/fangwei716/30-days-of-react-native)
## 入口-index.ios.js
Swiper插件
``` javascript
import Swiper from 'react-native-swiper';
<Swiper height={150} showsButtons={false} autoplay={true}  activeDot={}>
　//Todo
</Swiper>
```
## Day01 - A stopwatch
设置顶部状态栏
``` javascript
import {StatusBar } from 'react-native';
...
componentDidMount() {
    StatusBar.setBarStyle(0);
  }
```
## Day02 - A weather app
## Day03 - Twitter
createAnimatedComponent使得任何一个React组件支持动画。用它来创建Animated.View等等。
加载完成之后页面图标放大淡出动画：
```javascript
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
......
componentDidMount() {
    Animated.timing(
       this.state.transformAnim,    
       {toValue: 50,
        duration: 1200,
        delay:2000,
        easing: Easing.elastic(2),
      },          
    ).start();
    Animated.timing(         
       this.state.opacityAnim,    
       {toValue: 0,
        duration: 800,
        easing: Easing.elastic(1),
        delay:2200,
      },          
     ).start();
    setTimeout(() => {
      this.props.hideThis();
    }, 3300);              
  }

  render () {
    return(
      <Animated.View style={[styles.entrance,{opacity:this.state.opacityAnim}]}>
        <AnimatedIcon size={60} style={[styles.twitter,{transform:[{scale:this.state.transformAnim}]}]} name="logo-twitter"></AnimatedIcon>
      </Animated.View>
    )
  }
```
scrollView下拉刷新
```javascript
 <ScrollView
      refreshControl={
          <RefreshControl
              //决定加载进去指示器是否为活跃状态，也表明当前是否在刷新中
              refreshing={this.state.isRefreshing}  
              //当视图开始刷新的时候调用
              onRefresh={()=>this._onRefresh()}
              // iOS平台适用  设置加载进度指示器的颜色
              tintColor="red" 
          />
        }
      >
           ......
</ScrollView>
```
## Day04 - Cocoapods
## Day05 - Find my location
MapView组件在React Native0.42以后已被淘汰，使用react-native-maps模块替代。
## Day06 - Spotify
 ```javascript
import Video from 'react-native-video';
```
## Day07 - Moveable Circle
**手势系统**——拖拽组件
```javascript
class MoveableCircle extends Component{
  constructor() {
    super();
    this.state = {
      color: "rgba(255,255,255,0.7)",
    };
  }

  // 初始left值
  _previousLeft = Util.size.width/2-40;
  // 初始top值
  _previousTop = Util.size.height/2-50;
  //最大top值
  _maxTop = Util.size.height-110;
  //最大left值
  _maxLeft = Util.size.width-98;
  _circleStyles = {};
  //http://stackoverflow.com/questions/32721630/javascript-syntax-null
  circle = (null : ?{ setNativeProps(props: Object): void });

  _updatePosition() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  _endMove(evt, gestureState) {
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
    this.setState({
      color: "rgba(255,255,255,0.7)"
    });
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
        //要求成为响应者：
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        onPanResponderGrant: (evt, gestureState) => {
          this.setState({
            color: "white",
          })
        },

        onPanResponderMove: (evt, gestureState) => {
            // 最近一次的移动距离为gestureState.move{X,Y}
            // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
           this._circleStyles.style.left = this._previousLeft + gestureState.dx;
           this._circleStyles.style.top = this._previousTop + gestureState.dy;
           if (this._circleStyles.style.left<0) {
              this._circleStyles.style.left = 0;
           };
           if (this._circleStyles.style.top<5) {
              this._circleStyles.style.top = 5;
           };
           if (this._circleStyles.style.left>this._maxLeft) {
              this._circleStyles.style.left = this._maxLeft;
           };
           if (this._circleStyles.style.top>this._maxTop) {
              this._circleStyles.style.top = this._maxTop;
           };
           this._updatePosition();
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,

        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
        onPanResponderTerminate: (evt, gestureState) => this._endMove(evt, gestureState),
    });

    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
      },
    };

  }

  componentDidMount() {
    this._updatePosition();
  }

  render() {
    return(
      <View ref={(circle) => {this.circle = circle;}} style={styles.MoveableCircle} {...this._panResponder.panHandlers}>
        <Icon ref="baseball" name="ios-baseball" color={this.state.color} size={120}></Icon>
      </View>
    )
  }
}
```
## Day08 - Swipe Left Menu
**手势系统**——DrawerNavigator（⭐️⭐️⭐️）
## Day09 - Twitter Parallax View
**手势系统**——位置、尺寸、透明度对着拖动而渐变（⭐️⭐️⭐️⭐️）
```javascript
class TwitterUser extends Component{
	constructor() {
        super();
        this.state = {
            scrollEnabled: false, //scrollView是否可以滚动（scrollView与最外层view只有一个可以滚动）
            scale: 1,             //图标的初始scale值
            iconTop: 95,          //图标的初始top值
            bannerTop:0,          //banner的初始top值
            opacity:0,            //view的初始opacity值
        };

        this._scrollEnabled = false; //scrollView是否可以滚动

        this._previousTop = 0;  //上一次拖动之后的最外层view的top值
        this._iconTop = 95;     //上一次拖动之后图标的top值
        this._scale = 1;        //上一次拖动之后图标的scale值
        this._bannerTop = 0;    //上一次拖动之后banner的top值
        this._opacity = 0;      //上一次拖动之后banner的opacity值
        this._minTop = -192;    //最外层view的最小top值
        this._userStyle = {};   //最外层view的style样式
        this.user = (null : ?{ setNativeProps(props: Object): void }); //对最外层view进行flow类型检查
    }

    //最外层view作为手势的响应者，使用setNativeProps直接修改属性
    _updatePosition() {
	   this.user && this.user.setNativeProps(this._userStyles);
	}

	//手指松开当前最外层view的响应者，或者有其他组件成为新的响应者时，执行该函数
	_endMove(evt, gestureState) {
	    //使用最新的top值赋值给this._previousTop
		this._previousTop = this._userStyles.style.top;
	}

	componentWillMount() {
	    //组件将要渲染时，创建手势系统
		this._panResponder = PanResponder.create({
            //要求成为响应者：
	        onStartShouldSetPanResponder: (evt, gestureState) => true,
	        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
	        onMoveShouldSetPanResponder: (evt, gestureState) => {
	    	    return gestureState.dy/gestureState.dx!=0;
		    },
            // 开始手势操作。
	        onPanResponderGrant: (evt, gestureState) => {
                //给用户一些视觉反馈，让他们知道发生了什么事情！
                // gestureState.{x,y}0 现在会被设置为0
	        },
	        onPanResponderMove: (evt, gestureState) => {
                // 最近一次的移动距离为gestureState.move{X,Y}
                // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
                // 外层view的top值为0 + gestureState.dy   注意gestureState.dy为负值
                this._userStyles.style.top = this._previousTop + gestureState.dy;
                //图标的尺寸scale
                this._scale = 1 + this._userStyles.style.top/162.5;
                //图标的top值
                this._iconTop = 95 - this._userStyles.style.top/4.16;
                //banner的top值
                this._bannerTop = 0;
                //view的opacity值
                this._opacity = 0;
                this._scrollEnabled = false;

                if (this._userStyles.style.top< -62.5) {
                    this._scale = 0.6;
                    this._iconTop = 110;
                    this._bannerTop = -this._userStyles.style.top-62.5;
                    //Math.pow(x, y)得到x的y次幂
                    this._opacity = Math.pow((-this._userStyles.style.top-62.5)/129.5,0.5)
                };
                if (this._userStyles.style.top>0) {
                    this._userStyles.style.top = 0;
                    this._scale = 1;
                    this._iconTop = 95
                }
                if (this._userStyles.style.top < this._minTop) {
                    this._userStyles.style.top = this._minTop;
                    this._opacity = 1;
                    this._bannerTop = 129.5;
                    this._scrollEnabled = true;
                };
                this.setState({
                    scrollEnabled: this._scrollEnabled,
                    scale: this._scale,
                    iconTop: this._iconTop,
                    bannerTop: this._bannerTop,
                    opacity: this._opacity
                });
		   	    this._updatePosition();
	        },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
            // 一般来说这意味着一个手势操作已经成功完成。
            onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
            // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            onPanResponderTerminate: (evt, gestureState) => this._endMove(evt, gestureState),
            onShouldBlockNativeResponder: (event, gestureState) => true,
	 	});

        this._userStyles = {
            style: {
                top: this._previousTop,
            },
        };
    }

    componentDidMount() {
        this._updatePosition();
    }

	render () {
		let panProps = this.state.scrollEnabled?{}:{...this._panResponder.panHandlers};
		return(
		    <View ref={(user) => {this.user = user}} style={styles.userContainer} {...panProps}>
				 <View style={styles.userPanel}>
                     <Image style={[styles.banner,{top: this.state.bannerTop}]} source={{uri:'banner'}} />
                     <View style={[styles.iconContainer,{top:this.state.iconTop,transform:[{scale:this.state.scale}]}]}>
                        <Image style={styles.icon} source={{uri:"icon"}}></Image>
                     </View>
                     <View style={styles.userControl}>
                        <TouchableHighlight style={styles.controlIcon}>
                            <Icon name="ios-settings" color="#8999a5" size={20}></Icon>
                         </TouchableHighlight>
                        <TouchableHighlight style={styles.controlBtn}>
                          <Icon name="ios-people" color="#8999a5" size={20}></Icon>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.controlBtn2}>
                          <Text style={styles.controlBtnText}>编辑个人资料</Text>
                        </TouchableHighlight>
                     </View>
                     <View style={styles.userInfo}>
                         <Text style={styles.userInfoName}>Github</Text>
                         <Text style={styles.userInfoAccount}>@Github</Text>
                         <View style={styles.userInfoFollow}>
                             <Text style={styles.userInfoFollowing}><Text style={styles.fontEm}>183</Text> 正在关注</Text>
                             <Text style={styles.userInfoFollower}><Text style={styles.fontEm}>830k</Text> 关注者</Text>
                         </View>
                     </View>
                      {this.state.bannerTop<=0?<View></View>:<Image style={[styles.banner,{top: this.state.bannerTop}]} source={{uri:'banner'}}></Image>}
                      {this.state.bannerTop<=0?<View></View>:<Image style={[styles.banner,{top: this.state.bannerTop, opacity:this.state.opacity}]} source={{uri:'bannerBlur'}}></Image>}
                      <Text style={{position:"absolute",left:Util.size.width/2-30, fontSize:20, fontWeight:"500", top: this.state.bannerTop+90,opacity:this.state.opacity, backgroundColor:"transparent", color:"#fff"}}>Github</Text>
                      <View style={styles.segment}>
                        <SegmentedControlIOS values={['推文', '媒体', '喜欢']}  selectedIndex={0} tintColor="#2aa2ef"/>
                      </View>
                 </View>
                <ScrollView contentInset={{top:0}} style={styles.detailScroll} scrollEnabled={this.state.scrollEnabled}>
                    <View style={{width:Util.size.width,backgroundColor:"#f5f8fa"}}>
                        <Image style={{width:Util.size.width, height:0.835*Util.size.width, resizeMode:"contain"}} source={{uri:'moreinfo'}}></Image>
                    </View>
                </ScrollView>
			</View>
		)
	}
}
```
## Day10 - Tumblr Menu
[Easing的使用](https://facebook.github.io/react-native/docs/easing.html)
```javascript
export default class extends Component{
  constructor() {
    super();
    this.state = {
      shift: new Animated.Value(-120),
      show:false,
    };
  }

  _pushMenu() {
    this.setState({
      show: true,
    });

    Animated.timing(         
       this.state.shift,    
       {toValue: Util.size.width === 375? 50:30,
        duration: 200,
        delay:100,
        easing: Easing.elastic(1),
      },          
    ).start();
  }

  _popMenu() {
    Animated.timing(         
       this.state.shift,    
       {toValue: -120,
        duration: 200,
        delay:100,
        easing: Easing.elastic(1),
      },          
    ).start();

    setTimeout(()=>{
      this.setState({
        show: false,
      })
    },500);
  }

  componentDidMount() {
    StatusBar.setBarStyle(1);
  }
  ......
}
```
## Day11 - Using OpenGL with React native
[gl-react-native](https://github.com/ProjectSeptemberInc/gl-react-native)
## Day12 - Charts
## Day13 - A twitter tweet UI
## Day14 - Tinder Like Swipe
[react-native-tinder-swipe-cards](https://github.com/meteor-factory/react-native-tinder-swipe-cards)
## Day15 - Time picker
[Modal](https://reactnative.cn/docs/0.44/modal.html#content)组件可以用来覆盖包含React Native根视图的原生视图（如UIViewController，Activity）。在嵌入React Native的混合应用中可以使用Modal。Modal可以使你应用中RN编写的那部分内容覆盖在原生视图上显示。
```javascript
 <Modal  animationType="slide" transparent={false} visible={this.state.showModal}>
      ······
</Modal>
 ```
## Day16 - Unlock with gesture
[react-native-gesture-password](https://github.com/spikef/react-native-gesture-password)
## Day17 - Native search bar and Fuzzy search
[react-native-search-bar](https://github.com/umhan35/react-native-search-bar)
f使用 for in 循环遍历对象的属性时，原型链上的所有属性都将被访问，推荐总是使用[hasOwnProperty](http://wangjingyi.iteye.com/blog/2038264)方法， 这将会避免原型对象扩展带来的干扰。
```javascript
const stateData = {a:1 ,b:2,c:3}
this.states = [];
for (let key in stateData) {
  if (stateData.hasOwnProperty(key)) {
    this.states.push(stateData[key]);
  }
}
 ```
## Day 18 - Sortable List
**手势系统**——拖拽排序（⭐️⭐️⭐️⭐️⭐️）
[**代码**](https://github.com/fangwei716/30-days-of-react-native/blob/development/view/day18.js)
LayoutAnimation的使用
[官网文档](https://facebook.github.io/react-native/docs/layoutanimation.html#content)
[React Native超棒的LayoutAnimation(布局动画)](http://blog.csdn.net/developer_jiangqq/article/details/50662430)
[React Native API模块之LayoutAnimation布局动画详解](http://www.lcode.org/react-native-api%E6%A8%A1%E5%9D%97%E4%B9%8Blayoutanimation%E5%B8%83%E5%B1%80%E5%8A%A8%E7%94%BB%E8%AF%A6%E8%A7%A3-androidios%E9%80%9A%E7%94%A862/)
```javascript
this.animations = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
  },
  update: {
    type: LayoutAnimation.Types.linear,
    springDamping: 0.7,
  },
};
...
if (this.finalIndex != this.index) {
  this.index = this.finalIndex;
  this.setState({
    selected: this.finalIndex,
  });
}
LayoutAnimation.configureNext(this.animations);
...
box.setNativeProps({style: {top,left,...shadowStyle}});
LayoutAnimation.configureNext(this.animations);
```
## Day 19 - Unlock app with touchID
[react-native-touch-id](https://github.com/naoufal/react-native-touch-id)
## Day 20 - Sigle page Reminder
LayoutAnimation的使用
```javascript
this.animations = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
  },
  update: {
    type: LayoutAnimation.Types.linear,
    springDamping: 0.7,
  },
};
......
this.setState({
  listData,
  numOfItems,
});
LayoutAnimation.configureNext(this.animations);
```
## Day21 - Multi page Reminder
## Day22 - Google Now
## Day23 - Local WebView An example using D3.js
## Day 24 - Youtube scrollable tab
[react-native-scrollable-tab-view](https://github.com/brentvatne/react-native-scrollable-tab-view)
## Day25 - TO BE UPDATED
## Day26 - TO BE UPDATED
## Day27 - iMessage Gradient
The chat bubble changes its gradient color with its pageY.
[react-native-linear-gradient](https://github.com/brentvatne/react-native-linear-gradient)
## Day28 - iMessage Image Picker.
## Day29 - TO BE UPDATED
## Day30 - Push Notification.
