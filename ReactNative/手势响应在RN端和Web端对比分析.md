在移动端应用开发过程中，手势是一个不可忽视的组成部分。ReactNative针对应用中的手势交互方式，提供了一系列解决方案，包括最基本的点击手势、复杂的responder手势以及滚动手势。本文结合原理和示例，分析RN端不同手势系统解决方案，并与Web端手势系统进行对比。文本所指的Web端，仅限于移动Web端，在PC端有另外一套鼠标的交互方式。
##简单的点击事件
移动应用中，点击手势是最简单也是最常用的手势。不管是在RN端还是在Web端，点击事件都已经被系统(RN)或者浏览器(Web)进行了封装，可以认为是各自平台下手势响应系统的简单情况。
### 一、RN端的Touchable系列组件
 RN端提供了四个可以添加点击事件的组件，分别是TouchableHighlight、TouchableNativeFeedback、TouchableOpacity以及TouchableWithoutFeedback。
使用这四个组件，我们可以绑定点击事件回调。这四个组件的区别在于点击时，RN封装了不同的点击效果。
Touchable系列组件可以给以下四个方法绑定回调函数：onPressIn、onPressOut、onPress以及onLongPress。通过这四个方法可以实现按下、抬起、点击、长按的交互方式。
```
<TouchableOpacity
    style={{width: 300, height: 300, backgroundColor: 'red'}}
    onPressIn={()=> {console.log('press in')}}
    onPressOut={()=> {console.log('press  out')}}
    onPress={()=>{console.log('press')}}
    onLongPress={()=>{console.log('long press')}}>
    <View/>
</TouchableOpacity>
```
问题：内外多层添加点击事件的Touchable系列组件，点击时回调如何触发，为什么？
(1) 只触发内层；(2)只触发外层;
(3)先触发内层再触发外层; (4)先触发外层再触发内层
### 二、Web端的click事件
在Web端，可以通过DOM0级事件处理函数onclick或者DOM2级事件处理函数addEventListener('click',callback)来绑定点击事件回调。
在Web端，所有DOM元素都支持添加click点击事件。在移动端，click事件只能实现手指点击的交互方式。如果要给按下、抬起、长按手势添加回调函数，则需要借助web端手势响应系统。
```
var div = document.getElementById('div');
div.onclick = function () {
    console.log('div');
}
div.addEventListener('click', function () {
    console.log('div');
})
```
问题：当内外多层添加点击事件的DOM元素，点击时回调如何触发，为什么？
	(1)只触发内层；(2)只触发外层;
	(3) 先触发内层再触发外层;  (4)先触发外层再触发内层
### 三、RN端与Web端对比
在简单点击事件方面，RN端与Web端主要有以下区别：
	1. RN端只提供了四个可以添加点击事件的组件；Web端几乎所有DOM元素都支持点击事件。
	2. RN端支持按下、抬起、点击、长按四种交互方式；Web端只支持点击交互方式，如果要实现其他交互方式需要借助Web端手势响应系统。
	3. RN端四个组件分别实现了不同的“点击态”，手指按下时出现透明度、颜色等视觉变化；Web端需要借助手势响应系统以及CSS样式实现。
	4. 当内外多层添加点击事件，RN端只触发内层组件的事件回调函数(onResponderTerminationRequest默认返回false，当有其他组件请求接替响应者时，当前组件不放权), Web端会先触发内层再触发外层的事件回调函数(stopPropagation默认不阻止事件冒泡)。
## 手势响应系统
RN端和Web端都有各自的手势响应系统，解决用户各种复杂手势交互问题。在RN端，通过Responder或PanResponder实现复杂手势交互方式，其中PanResponder是对Responder的封装。在Web端，通过Touch events实现复杂手势交互方式。
### 一、RN端的手势响应系统
1.  responder响应者的声明周期
	(1) 冒泡期是否响应
```
onStartShouldSetResponder: (evt) => true
```
 在用户开始触摸的时候，是否愿意成为响应者。
```
onMoveShouldSetResponder: (evt) => true
```
在每一个触摸点开始移动时，是否愿意成为响应者。
	(2) 响应过程
```
onResponderGrant: (evt) => {} 
```
响应触摸事件回调。
```
onResponderMove: (evt) => {} 
```
用户正在屏幕上移动手指时。
```
onResponderRelease: (evt) => {} 
```
触摸操作结束时触发。
(3) 响应放权与失败
```
onResponderReject: (evt) => {} 
```
响应者现在“另有其人”。
```
onResponderTerminationRequest: (evt) => true 
```
有其他组件请求接替响应者，当前的View是否“放权”。
```
onResponderTerminate: (evt) => {} 
```
响应者权力已经交出。
2. 捕获事件处理
	onStartShouldSetResponder与onMoveShouldSetResponder是以冒泡的形式调用的，即嵌套最深的节点最先调用。这意味着当多个View同时返回true时，最底层的View将优先“夺权”。
	有些时候，某个父View会希望能先成为响应者。我们可以利用“捕获期”来解决这一需求。响应系统在从最底层的组件开始冒泡之前，会首先执行一个“捕获期”，在此期间会触发on*ShouldSetResponderCapture系列事件。如果某个父View想要在触摸操作开始时阻止子组件成为响应者，那就应该处理onStartShouldSetResponderCapture事件并返回true值。
	(1) 捕获期是否响应
```
	onStartShouldSetResponderCapture: (evt) => true,
	onMoveShouldSetResponderCapture: (evt) => true,
```
3. PanResponder
	除了responder之外，RN还抽象出了一套PanResponder类。它提供了一个对触摸响应系统响应器的进一步封装。对于每一个处理函数，它在原生事件之外提供了一个新的gestureState对象。这个gestureState包含手势进行过程中更多的信息，例如dx/dy- 从触摸操作开始时的累计横/纵向路程；vx/vy - 当前的横/纵向移动速度；numberActiveTouches-当前在屏幕上的有效触摸点的数量。
	与responder相比，PanResponder的优势在于提供了更详细的触摸对象信息，特别是dx/dy，简化了代码逻辑书写。
4. RN端手势系统总结
	(1) RN端手势系统分为捕获阶段和冒泡阶段，在两个阶段都对View是否响应手势系统进行判断。
	(2) RN端手势响应系统默认只有一个responder响应者。正因为如此，才存在onResponderReject(响应失败)、onResponderTerminationRequest(是否放权)、onResponderTerminate(放权回调)三个方法。
	(3) 当有多层手势响应系统时，onResponderTerminationRequest方法是解决手势冲突的关键，对responder响应对象是否变化进行协商。
        (4) onResponderTerminationRequest接口的返回值不固定，一般为false，表示当前View不放权；当双指点击时，默认返回true，表示当前View放权。

5. RN端手势系统实现报表冻结滚动
```
this.panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (e, gestureState) => {
        const { bodyTable } = this;
        this.lastScrollLeft = bodyTable.scrollLeft;
        this.lastScrollTop = bodyTable.scrollTop;
        return true;
    },
    onPanResponderTerminationRequest: (e, gestureState) => {
        const {bodyTable} = this;
        const {dx, dy} = gestureState;
        if((Math.abs(dx) > Math.abs(dy) && this.lastScrollLeft === bodyTable.scrollLeft) || (Math.abs(dx) < Math.abs(dy) && this.lastScrollTop === bodyTable.scrollTop)) {
            return true;
        } 
        return false;
    },
    onPanResponderMove: (e, gestureState) => {
        const {dx, dy} = gestureState;
        const target = e.currentTarget;
        const { headTable, bodyTable, leftBodyTable } = this;
        if(target === headTable) {
            this._setScrollLeft(dx);
        } else if(target === bodyTable) {
            this._setScrollLeft(dx);
            this._setScrollTop(dy);
        } else if(target === leftBodyTable) {
            this._setScrollTop(dy);
        }
    }
})
```
### 二、Web端的touch手势响应系
1. Web端四种touch事件 
```
touchstart: (evt) => {}
```		
响应触摸事件回调。
```
touchmove: (evt) => {}
```
用户正在屏幕上移动手指时。
```
touchend: (evt) => {}
```
触摸操作结束时触发。
```
touchcancel: (evt) => {}
``` 	
系统取消touch事件时触发。
2. 事件捕获与事件冒泡
	Web端手势响应系统可以设置在事件捕获阶段触发或者在事件冒泡阶段触发，通过addEventListener进行设置。默认在冒泡阶段触发。
```
target.addEventListener(type, listener, useCapture);
```
3. 手势冲突解决 
	Web端手势响应系统通过阻止事件冒泡的方式解决滚动冲突问题。默认不阻止事件冒泡。
```
e.stopPropagation();
```
4. Web端手势系统实现报表冻结滚动
```
this.touchResponder = {
    onTouchStart: (e) => {
        const maxScrollLeft = this.tableManager.tableMaxScrollLeft();
        const maxScrollTop = this.tableManager.tableMaxScrollTop();
        if(e.touches.length === 1) {
            if(maxScrollLeft > 0 || maxScrollTop > 0){
                const { bodyTable } = this;
                startX = e.touches[0].pageX;
                startY = e.touches[0].pageY;
                this.lastScrollLeft = bodyTable.scrollLeft;
                this.lastScrollTop = bodyTable.scrollTop;
            }
        }
    },
    onTouchMove: (e) => {
        const maxScrollLeft = this.tableManager.tableMaxScrollLeft();
        const maxScrollTop = this.tableManager.tableMaxScrollTop();
        if(e.touches.length === 1) {
            const target = e.currentTarget;
            const { headTable, bodyTable, leftBodyTable } = this;
            const scrollLeftFn = (dx) => {
                if(maxScrollLeft > 0 && (target === headTable || target === bodyTable)) {
                    const scrollLeft = this.lastScrollLeft - dx;
                    if(scrollLeft <= 0) {
                        this._setScrollLeft(0);
                    } else if(scrollLeft >= maxScrollLeft) {
                        this._setScrollLeft(maxScrollLeft);
                    } else {
                        this._setScrollLeft(scrollLeft);
                        return true;
                    }
                }
            };
            const scrollTopFn = (dy) => {
                if(maxScrollTop > 0 && (target === leftBodyTable || target === bodyTable)) {
                    const scrollTop = this.lastScrollTop - dy;
                    if(scrollTop <= 0) {
                        this._setScrollTop(0);
                    } else if(scrollTop >= maxScrollTop) {
                        this._setScrollTop(maxScrollTop);
                    } else {
                        this._setScrollTop(scrollTop);
                        return true;
                    }
                }
            };
            const endX = e.touches[0].pageX;
            const dx = endX - startX;
            const endY = e.touches[0].pageY;
            const dy = endY - startY;
            const isScrollLeft = scrollLeftFn(dx);
            const isScrollTop = scrollTopFn(dy);
            let preventOuterEvent = false;
            if(Math.abs(dx) > 2 * Math.abs(dy)) {
                if(isScrollLeft) {
                    preventOuterEvent = true;
                }
            } else if(Math.abs(dy) > 2 * Math.abs(dx)) {
                if(isScrollTop) {
                    preventOuterEvent = true;
                }
            } else {
                if(isScrollLeft || isScrollTop) {
                    preventOuterEvent = true;
                }
            }
            if(preventOuterEvent) {
                e.stopPropagation();
                e.preventDefault();
            }
        }
    },
    onTouchEnd: () => {}
```
### 三、RN端与Web端手势系统对比
在手势响应系统方面，RN端与Web端对比如下：
	(1) RN端和Web端手势系统都可以指定事件触发时机(捕获阶段/冒泡阶段)，RN端是通过响应者的声明方法进行指定，Web端是通过addEventListener事件处理函数的第三个参数进行指定。
	(2) 当有多层视图添加手势响应系统时，RN端默认只有一个responder响应者。Web端默认多层全部都是响应者。  
	(3) RN端通过onResponderTerminationRequest手势系统方法的方式解决内外层手势冲突，比较方便。Web端通过stopPropagation阻止事件冒泡的方式解决内外层手势冲突。
	(4) RN端的PanResponder手势系统的封装性更好，提供了从触摸操作开始时的累计横/纵向路程，简化开发者的代码逻辑。
	(5) RN端提供了更全面的接口方法，包括响应阶段、响应过程、响应放权与响应失败。与RN端提供的方法相比，Web端相当与只提供了响应过程的接口方法。
## 滚动事件
### 一、滚动的两种实现方式
1. RN端两种滚动实现方式
	方式一：ScrollView组件实现滚动
	方式二：View和responder手势响应系统实现滚动
	问题：在原生端，这两种滚动实现方式原理相同吗？
2. Web端两种滚动实现方式
	方式一：CSS添加overflow:scroll实现滚动。
	方式二：div和touch手势响应系统实现滚动。
### 二、Web端两种滚动实现方式对比
1. 底层实现 
scroll滚动浏览器默认支持；touch手势系统滚动要开发者代码实现。
2. 滚动性能
scroll滚动性能较好；touch手势系统滚动消耗较大。
3. 嵌套滚动
scroll默认支持多层滚动嵌套；touch手势系统开发者手动解决滚动冲突。
4. 惯性滚动
scroll默认支持滚动惯性；touch手势系统要手动实现滚动惯性，性能较差。
5. 滚动条样式
scroll滚动浏览器默认添加滚动条；touch手势系统需要开发者用div模拟滚动条，比较复杂。
6. 冻结实现
touch手势系统监听手势实现行列冻结，没有延迟；scroll通过onScroll方法实现行列冻结，冻结滚动有延迟。
7. 回调参数
touch手势系统在手指滑动时，可以通过touch对象获取一系列触摸点数据信息，可以根据触摸点数据信息进行更加灵活的操作；scroll滚动在onScroll方法中无法获取触摸点对象，只能够通过事件对象获取当前滚动对象的滚动位置，不够灵活。
### 三、 Web端通过overflow:scroll实现报表冻结滚动
```
handleBodyScrollLeft = e => {
    if (e.currentTarget !== e.target) {
        return;
    }
    const target = e.target;
    const { headTable, bodyTable } = this;
    if (target.scrollLeft !== this.lastScrollLeft) {
        if (target === bodyTable && headTable) {
            headTable.scrollLeft = target.scrollLeft;
        } else if (target === headTable && bodyTable) {
            bodyTable.scrollLeft = target.scrollLeft;
        }
    }
    this.lastScrollLeft = target.scrollLeft;
};

handleBodyScrollTop = e => {
    const target = e.target;
    const { headTable, bodyTable, leftBodyTable } = this;
    if (target.scrollTop !== this.lastScrollTop && target !== headTable) {
        const scrollTop = target.scrollTop;
        if (leftBodyTable && target !== leftBodyTable) {
            leftBodyTable.scrollTop = scrollTop;
        }
        if (bodyTable && target !== bodyTable) {
            bodyTable.scrollTop = scrollTop;
        }
    }
    this.lastScrollTop = target.scrollTop;
};
```
### 四、RN端H5适配滚动实现
1. 在h5适配RN时，滚动可以由三种实现方式：
	(1) react-native-web在底层适配的RN端responder手势系统实现滚动
	(2) touch手势响应系统实现滚动
	(3) overflow:scroll的CSS样式实现滚动 
	当第一种滚动实现方式和第二三种滚动实现方式混合使用实现多层嵌套滚动时，会发生难以解决的滚动冲突问题，阻止事件冒泡对第一种滚动实现方式没有效果。
	如果只使用第一种滚动解决方案，优点在于滚动冲突容易解决并且接口封装性更好，缺点在于滚动条和惯性滚动实现复杂并且性能较差。
	如果只使用第二种滚动解决方案，则滚动冲突可以解决，缺点在于滚动条和惯性滚动实现复杂并且性能不好。
	如果只使用第三种滚动解决方案，则优点在于滚动条和惯性滚动浏览器默认实现且性能较好，缺点在于有冻结行列时存在滚动延迟的情况。
	现在H5端在目录、表单以及未冻结行列的报表是通过第三种方式实现滚动，在冻结行列的报表中是通过第二种方式实现滚动的，并通过阻止事件冒泡解决滚动冲突。
2. 目前存在的问题
	如果内层滚动通过touch手势系统实现，外层滚动通过overflow:scroll实现，则内层阻止事件冒泡可以阻止外层滚动触发，反之内层滚动通过overflow:scroll实现，外层滚动通过touch手势系统实现，则内层阻止事件冒泡无法阻止外层滚动触发，导致下拉刷新时发生滚动冲突。
	如果要实现下拉刷新，则需要全部使用touch手势系统实现滚动。如果要模拟滚动条和滚动惯性，可能借助第三方库会更方面些。
