# 第一章 课程简介和开发前的准备
## 1.1 主要内容
1. iOS开发准备
    * 常见App类型
    * App基本技术架构
    * 开发环境搭建
2. 实现App的基本页面
    * 常用App的页面结构分析
    * 导航、列表、滚动视图、WebView以及动画
    * 相关开源项目对比分析
3. 实现App的基本功能
    * 网络、图片、存储、音视频、布局等
    * 复杂列表、复杂内容页、日志与上报等
    * 相关开源项目对比分析
4. 实现App的辅助功能
    * 登录、分享、频道管理
    * 定位、推送
    * Extension开发与应用上架
## 1.2 App技术栈解析
1. App展示界面、动画  
    底部TabBar、Navigation导航、列表、图片ImageView、Button、Label、TextView、WebView、动画
2. App通用技术架构
    网络、存储、图片、音频视频、数据解析、布局渲染、启动、日志系统、上报系统
3. App常用功能
    复杂内容页、登录、分享、频道管理、推送/定位、Extension、证书、上架流程 
## 1.3 使用Xcode创建第一个工程
1. 创建工程  
打开Xcode-Create a new Xcode project-iOS、App、Next-项目信息-项目位置
2. Xcode项目界面
![img](https://raw.githubusercontent.com/nmwei/Notes/master/Imgs/ios/xcode.png)
3. [hello world](https://github.com/nmwei/Notes/commit/b0656cab49d1aebffbebd455b3b99da01ffaa615#diff-46c4417fd68f6e9733114fbaff9b91883328f0112fdcbbd4ff98fcd67cc61dcd)
    ```
    @implementation ViewController
    - (void)viewDidLoad {
        [super viewDidLoad];
        // Do any additional setup after loading the view.
        [self.view addSubview:({
            UILabel *label = [[UILabel alloc] init];
            label.text = @"hello world";
            [label sizeToFit];
            label.center = CGPointMake(self.view.frame.size.width/2, self.view.frame.size.height/2);
            label;
        })];
    }
    @end
    ```
# 第二章 实现App的基本界面
## 2.1 UIView
1. MVC模式: iOS中的架构基石  
M-Model数据;  
V-View视图，例如：UIView  
C-Controller管理，例如：UIViewController
2. UIView介绍  
(1) UIView是最基础的视图类  
(2) UIView是各种视图类型的父类，例如：UIImageView、UILabelView
(3) UIView布局：大小、位置
(4) addSubView添加子View, 栈结构管理所有子View, 后入栈的位于更上层
3. UIView创建及添加
```
    UIView *view = [[UIView alloc] init];
    view.backgroundColor = [UIColor redColor];
    view.frame = CGRectMake(100, 100, 100, 100);
    [self.view addSubview:view];
    
    UIView *view2 = [[UIView alloc] init];
    view2.backgroundColor = [UIColor greenColor];
    view2.frame = CGRectMake(150, 150, 100, 100);
    [self.view addSubview:view2];
```
4. UIView生命周期
```
@interface TestView : UIView
@end

@implementation TestView
- (instancetype)init{
    self = [super init];
    if (self) {
    
    }
    return self;
}

- (void)willMoveToSuperview:(nullable UIView *)newSuperview{
    [super willMoveToSuperview:newSuperview];
}
- (void)didMoveToSuperview{
    [super didMoveToSuperview];
    
}
- (void)willMoveToWindow:(nullable UIWindow *)newWindow{
    [super willMoveToWindow:newWindow];
}
- (void)didMoveToWindow{
    [super didMoveToWindow];
}
@end
```


## 2.2 
# 第三章 实现App的基础功能
# 第四章 App功能扩展和完善

