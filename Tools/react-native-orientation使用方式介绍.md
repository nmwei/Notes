1. Github地址
 [react-native-orientation](https://github.com/yamill/react-native-orientation)
2.  执行npm命令
```javascript
npm install --save react-native-orientation@git+https://github.com/yamill/react-native-orientation.git
```
**注意：** 不能使用`npm install --save react-native-orientation`安装稳定版npm包，有bug。
3. 执行npm命令
  ```javascript
 react-native link react-native-orientation
```
4. 配置`AppDelegate.m`文件
```
#import "Orientation.h" // <--- import
@implementation AppDelegate
  // ...
 - (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
    return [Orientation getOrientation];
  }
@end
```
5. 配置`MainActivity.java`文件
```java
    import android.content.Intent; // <--- import
    import android.content.res.Configuration; // <--- import

    public class MainActivity extends ReactActivity {
      ......
      @Override
      public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
      ......
    }
```
