# 1. 重构与开发步骤
## 1.1 面板动画
### 1.1.1 问题分析
1. 参数面板的选择，显示/隐藏控制安全由`ContentPage`类控制。
```
showParameterView(animated, refresh) {
    setHistoryParameterPanelState(HistoryParameterState.ON);
    let model = this.contentPageModel.getQueryPaneModel();
    let type = Device.pad() && Device.isApp() ? BaseQueryPaneView.TYPE.MODEL : BaseQueryPaneView.TYPE.PUSH;
    let title = this.props.navigation.state.params.title;
    let showBackIcon = !this.isHome();
    this.queryPaneTag = BaseQueryPaneView.show(model, type, title, animated, showBackIcon, () => {
        this.queryPaneLeftPress()
    });
    refresh && this.forceUpdate();
}
```
2. 参数面板`tag`标识在`ContentPage`层保存控制
```
isContentHide(){
    return this.queryPaneTag && BaseQueryPaneView.isOpen(this.queryPaneTag);
}
```
3. 只能控制一个参数面板
```
close: (tag, type, animated) => {
    if (type === _QueryPaneType.PUSH) {
        BaseQueryPaneSlider.instance && BaseQueryPaneSlider.instance.close(animated);
    } else {
        Window.dismiss(tag);
    }
}
```
4. `phone`端和`pad`端接口不统一
```
    show: (model, type, title, animated, showBackIcon, onBackPress) => {
        let tag = null;
        if (type === _QueryPaneType.PUSH) {
            tag = _showSlider(model, title, showBackIcon, onBackPress, animated);
        } else {
            tag = _showScreen(model, onBackPress);
        }
        return tag;
    },

    close: (tag, type, animated) => {
        if (type === _QueryPaneType.PUSH) {
            BaseQueryPaneSlider.instance && BaseQueryPaneSlider.instance.close(animated);
        } else {
            Window.dismiss(tag);
        }
    }
```
5. `pad`端通过`react-navigation`导航实现，不支持`h5`
```
const _showScreen = (model: BaseQueryPaneModel, onBackPress: Function) => {
    let dismissScreen = () => {
        if (this.windowTag) {
            Window.dismiss(this.windowTag);
            this.windowTag = null;
            onBackPress && onBackPress(this.windowTag);
        }
    };
    dismissScreen = dismissScreen.bind(this);
    let routeConfigMap = {
        QueryPane: {
            screen: BaseQueryPaneScreen,
        },
        EditorPane: {
            screen: EditorPanelScreen
        }
    };
    let stackConfig = {
        initialRouteName: 'QueryPane',
        initialRouteParams: {
            model: model,
            title: I18N.getLocale('FR_PARAMETER_COMMIT'),
            backText: I18N.getLocale('FR_CLOSE'),
            onBackPress: dismissScreen,
            transitionConfig: () => ({
                transitionSpec: {
                    duration: 350,
                    easing: Easing.out(Easing.poly(5)),
                    timing: Animated.timing,
                },
                screenInterpolator: CardStackStyleInterpolator.forVertical
            })
        },
    };
    let navigationReducer = (preState, nextState, passedAction) => {
        if (passedAction.type === NavigationActions.NAVIGATE) {
            const editorRouteCount = nextState.routes.filter((route) => (route.routeName === 'EditorPane')).length;
            if (editorRouteCount > 1) {
                return preState;
            }
        }
        return nextState;
    };
    this.windowTag = Window.present(routeConfigMap, stackConfig, navigationReducer);

    return this.windowTag;
};
```
6. 参数面板和编辑面板动画不统一
```
<SafeAreaView style={{paddingTop, flex: 1, backgroundColor: 'transparent'}}>
    <Animated.View style={[{height}, {
        transform: [{
            translateY: this.state.offset.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0]
            })
        }]
    }]}>
        <BaseQueryPaneView model={model}
                           title={title}
                           backText={backText}
                           backIcon={backIcon}
                           onBackPress={this._onBackPress}
                           openEditor={this._openEditor}/>
    </Animated.View>
</SafeAreaView>
```
```
static open = (model, onFinishEdit) => {
    if (!model.isEnabled()) {
        return;
    }
    if (Device.pad() && Device.isApp()) {
        EditorPanelWindow.present(model);
    } else {
        const tag = Drawer.allocateTag();
        Drawer.openDrawer(
            tag,
            <EditorPanelUI
                model={model}
                onFinishEdit={() => {
                    Drawer.closeDrawer(tag);
                    onFinishEdit && onFinishEdit();
                }}
            />,
            {
                remainWidth: MODAL_WIDTH_LEFT,
                animationType: Drawer.ANIMATION.SLIDE_IN_RIGHT,
                transparent: false,
                cancelable: true
            }
        );
    }
}
```
### 1.1.2 代码提交
1. 代码提交记录
[FineReact](http://cloud.finedevelop.com:2015/projects/MO/repos/finereact/pull-requests/2671/diff)  / [FineReactBase](http://cloud.finedevelop.com:2015/projects/MO/repos/finereactbase/pull-requests/1278/diff)
2. 提交内容介绍
(1) `FR`与`BI`参数面板代码分离。
(2) 创建`QueryManager`类，管理各种类型参数面板。
(3) `QueryManager`类管理参数面板的创建、显示、隐藏等。
(4) 将参数面板渲染、显示、隐藏的逻辑从`ContentPage`转移到`QueryManager`。
(5) 分离现有两种`portal`类型参数面板：`slideUp`和`modal`
(6) 重构现有`slideUp`参数面板，将动画层与内容层分离。
(7) 重构`modal`参数面板，不再使用导航创建参数面板。
(8) 引入有限状态机[`javascript-state-machine`](https://www.npmjs.com/package/javascript-state-machine)管理参数面板显示/隐藏状态。
(9) `model`不直接传递给`queryView`，通过`QueryManager`接口代理传递。
(10) 参数面板显示/隐藏与编辑面板显示/隐藏使用同一个动画组件。
## 1.2 面板动画控制层
### 1.2.1 问题分析
1. 编辑面板渲染以及显示/隐藏逻辑耦合在`BaseAnimatedQuery`内部。
```
//QueryManager类控制参数面板
show(animated) {
    this.query.show(animated)
}

hide(animated) {
    this.query.hide(animated)
}

isShow() {
   return this.query.isShow()
}

isHide() {
    return this.query.isHide()
}

afterQueryShow = () => {
    this.options.afterQueryShow()
}

afterQueryHide = () => {
    this.options.afterQueryHide()
}
```
```
//BaseAnimatedQuery控制编辑面板
showEditor(widgetModel){
    const tag = Portal.allocateTag();
    Portal.showModal(
        tag,
        <AnimatedModal {...this.editorAnimateConfig(tag)}>
            <EditorPaneUI {...this.editorUIConfig(widgetModel, tag)}/>
        </AnimatedModal>
    )
}

hideEditor() {
    this.editorNode && this.editorNode.hide()
}
```
2. 编辑面板与编辑面板`header`头部未统一。
```
//QueryPaneUI
<QueryHeader
    title={this.props.title}
    backIcon={this.props.backIcon}
    backText={this.props.backText}
    onBackPress={this._onBackPress}
 />
```
```
//EditorPaneUI
 _renderNavigationView() {
     return (
         <SafeAreaView style={{flex: 1,paddingTop: this._getPaddingTop()}}>
             <View style={[styles.navigationBar, createDefaultHeaderStyle()]}>
                 <ButtonView
                     onPress={this._clear}
                     style={styles.button}>
                     <Text style={[styles.buttonText,{color:PlatformStandard.WRONG_RED}]}>
                         {I18N.getLocale('FR_CLEAR')}
                     </Text>
                 </ButtonView>
                 <ButtonView
                     onPress={this._submitEditorValue}
                     style={styles.button}>
                     <Text style={[styles.buttonText, {color: MainBoard.getInstance().getThemeStorage().getTheme()}]}>
                         {I18N.getLocale('FR_CONFIRM')}
                     </Text>
                 </ButtonView>
             </View>
             <EditorViewContainer
                 ref={node => this.containerView = node}
                 finishEdit = {this._onFinishEdit}
                 widgetModel={this.props.model}
                 style={{flex: 1}}
             />
         </SafeAreaView>
     )
 }
```
3. 在编辑面板`UI`的`constructor`里执行控件的`loadData`。
```
//EditorViewContainer
constructor(props, context){
    super(props, context);
    this.submitEditorValue = this.submitEditorValue.bind(this);
    this._closeEditView = this._closeEditView.bind(this);
    this._onBackClicked = this._onBackClicked.bind(this);
    this.props.widgetModel.loadData();
}
```
### 1.2.2 代码提交
1. 代码提交记录
[FineReactBase](http://cloud.finedevelop.com:2015/projects/MO/repos/finereactbase/pull-requests/1290/diff) / [FineReactBase](https://cloud.finedevelop.com/projects/MO/repos/finereactbase/pull-requests/1416/diff)
2. 提交内容介绍
(1) 创建编辑面板基类(`BaseAnimatedEditor`)，负责管理编辑面板。
(2) 实现`Model`和`SlideLeft`两种编辑面板。
(3) 创建通用头部组件`HeaderUI`。
(4) 参数面板与编辑面板使用`HeaderUI`组件。
(5) 在编辑面板的`afterEditorShow`钩子函数中加载控件数据。
## 1.3 引入顶部参数面板
### 1.3.1 问题分析
1. 导航头部在`FormPage`层渲染，但却在`FormView`层计算高度。
```
//FormPage
_getTopBarHeight() {
    return this.isZoomIn ? 0 : (FormView.getHeaderHeight(this._isHeaderAbsolute()));
}
```
```
//FormView
static getHeaderHeight(isAbsolute) {
    return ((Orientation.isPortrait() || Device.pad()) && isAbsolute)
        ? (APPBAR_HEIGHT + (Device.isIphoneX() ? 0 : Device.getStatusBarHeight(false)))
        : 0;
}
```
### 1.3.2 代码提交
1. 代码提交记录
[FineReact](http://cloud.finedevelop.com:2015/projects/MO/repos/finereact/pull-requests/2699/diff) / [FineReactBase](http://cloud.finedevelop.com:2015/projects/MO/repos/finereactbase/pull-requests/1300/diff)
2. 提交内容介绍
(1) 参数面板类型管理以及`Embed`视图渲染。
(2) 适配顶部参数面板视图对横竖屏切换、组件放大的影响。
## 1.4 支持不同动画配置信息
### 1.4.1 问题分析
1. 面板控制过程代码重复
```
    //BaseAnimatedQuery
    show(animated = false) {
        this.isHide() && this.queryState.show(animated)
    }

    isShow() {
       return this.queryState.is('显示')
    }

    hide(animated) {
        this.isShow() && this.queryState.hide(animated)
    }

    isHide() {
        return this.queryState.is('隐藏')
    }

    _initQueryState() {
        let self = this;
        this.queryState = new StateMachine({
            init: '隐藏',
            transitions: [
                { name: 'show', from: '隐藏', to: '显示' },
                { name: 'hide', from: '显示', to: '隐藏' },
            ],
            methods: {
                onShow(state, animated) {
                    self.showQuery(animated)
                },
                onHide(state, animated) {
                    self.hideQuery(animated)
                }
            }
        })
    }
```
```
    //BaseAnimatedEditor
    show(widgetModel, animated) {
        this.isHide() && this.editorState.show(widgetModel, animated)
    }

    isShow() {
        return this.editorState.is('显示')
    }

    hide(animated) {
        this.isShow() && this.editorState.hide(animated)
    }

    isHide() {
        return this.editorState.is('隐藏')
    }

    _initEditorState() {
        let self = this;
        this.editorState = new StateMachine({
            init: '隐藏',
            transitions: [
                { name: 'show', from: '隐藏', to: '显示' },
                { name: 'hide', from: '显示', to: '隐藏' },
            ],
            methods: {
                onShow(state, widgetModel, animated) {
                    self.showEditor(widgetModel, animated)
                },
                onHide(state, animated) {
                    self.hideEditor(animated)
                }
            }
        })
    }
```
2. 参数面板编辑面板配置信息类似
```
   //ModelPortalQuery
    queryAnimateConfig(tag, animated) {
        return {
            ...super.queryAnimateConfig(tag, animated),
            showType: 'fadeIn',
            hideType: 'fadeOut',
            containerStyle: styles.containerStyle,
            contentStyle: ModelPortalQuery.getContentStyle()
        }
    }

    static getContentStyle() {
        const {height} = Device.getScreenSize(Orientation.getCurrentOrientation());
        return {
            width: 540,
            borderRadius: 4,
            backgroundColor: 'white',
            height: Math.min(620, height * 0.8),
        }
    }
```
```
    //ModalPortalEditor
    editorAnimateConfig(tag, animated) {
        return {
            ...super.editorAnimateConfig(tag, animated),
            transparent: true,
            showType: 'bounceInRight',
            hideType:'bounceOutRight',
            containerStyle: styles.containerStyle,
            contentStyle: ModelPortalEditor.getContentStyle(),
        }
    }

    static getContentStyle() {
        const {height} = Device.getScreenSize(Orientation.getCurrentOrientation());
        return {
            width: 540,
            borderRadius: 4,
            backgroundColor: 'white',
            height: Math.min(620, height * 0.8),
        }
    }
```
3. 开发过程遇到的问题
![image.png](https://upload-images.jianshu.io/upload_images/4989175-e54861f58a056412.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(1) 如何对不同控件弹出不同编辑面板？
(2) 如何弹出非全屏编辑面板？
(3) 顶部参数面板的嵌入式视图层级？
### 1.4.2 代码提交
1. 代码提交记录
[FineReact](https://cloud.finedevelop.com/projects/MO/repos/finereact/pull-requests/2732/diff) / [FineReactBase](http://cloud.finedevelop.com:2015/projects/MO/repos/finereactbase/pull-requests/1324/diff)
2. 提交内容介绍
(1) 创建`AnimatedController`类，统一管理面板动画。
(2) 删除`BaseAnimatedQuery`和`BaseAnimatedEditor`中管理面板状态的代码。
(3) 编辑面板删除状态管理相关代码之后太简单了，没必要存在。
(4) 细化`show`和`showEditor`接口，支持自定义配置和只渲染视图。
```
//显示参数面板(默认配置)
show = (animated = false)
//显示参数面板(自定义配置)
showWithConfig(uiConfig, animateConfigFn)
//获取参数面板模态层(不含全屏Portal)，该接口还没用到。
renderQueryModal(uiConfig, animateConfigFn)

//显示编辑面板(默认配置)
showEditor(model, animated = true) 
//显示编辑面板(自定义配置)
showEditorWithConfig(uiConfig, animateConfigFn)
//获取编辑面板模态层(不含全屏Portal)
renderEditorModal(uiConfig, animateConfigFn) 
```
(5) 修改顶部参数面板内嵌节点的视图结构。
(6) 实现顶部嵌入式参数面板。
4. 问题
(1) 为什么`1.2.2`中创建了编辑面板相关类，`1.4.2`中又删除了。
(2) 参数面板需要创建几个`AnimatedController`。
`this.query = AnimatedController.create()`
`this.editor =  AnimatedController.create()`
(3) 如果只有之前的`slideUp`和`Model`两种参数面板，面板展示(`show`、`showWithConfig`、 `renderQueryModal`)接口设计到哪种细度比较合适。
# 2. 经验总结
1. 将目光聚焦在眼前的一小步，添加新功能与重构过程应该交替进行，而不是同时进行。
2. 代码结构应尽量与现有功能点匹配，合理设计而不需要过度设计。
