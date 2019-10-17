##[Github地址](https://github.com/crazycodeboy/GitHubPopular)
Interactionmanager可以将一些耗时较长的工作安排到所有互动或动画完成之后再进行。这样可以保证JavaScript动画的流畅运行。应用这样可以安排一个任务在交互和动画完成之后执行：
```javascript
InteractionManager.runAfterInteractions(() => {
  // ...耗时较长的同步的任务...
});
```
使用react-native自带的Navigator组件。navigator跳转到的页面如果需要返回到该页面，则使用navigator.push()。如果不需要返回该页面，则使用 navigator.resetTo()。
```javascript
import {Navigator}from 'react-native'
//主页替换启动页
this.timer = setTimeout(() => {
    InteractionManager.runAfterInteractions(() => {
        SplashScreen.hide();
        navigator.resetTo({
            component: HomePage,
            name: 'HomePage',
            params:{
                theme:this.theme
            }
        });
    });
}, 500);
```
**注意：**InteractionManager.runAfterInteractions与setTimeout可以结合使用。
AsyncStorage持久化缓存的读取与缓存的过程是异步的，可以与Promise结合，避免多层回调。
```javascript
export default class ThemeDao {
    getTheme() {
        return new Promise((resolve, reject)=> {
            AsyncStorage.getItem(THEME_KEY, (error, result)=> {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    this.save(ThemeFlags.Default);
                    result = ThemeFlags.Default;
                }
                resolve(ThemeFactory.createTheme(result));
            });
        });
    }

    save(themeFlag) {
        AsyncStorage.setItem(THEME_KEY, themeFlag, (error, result)=> {

        });
    }
}

new ThemeDao().getTheme().then((data=>{
    this.theme=data;
}));
 ```
**注意：** class的用法。
