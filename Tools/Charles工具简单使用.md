# 一. 使用Charles实现mock数据
1. 桌面创建`todolist.json`文件
```
➜  ~ cd Desktop
➜  Desktop touch todolist.json
```
2. 编辑`todolist.json`文件
`["Dell", "Lee", "Imooc"]`
3. 打开`Charles`代理
`Charles` - `Proxy` - `macOS Proxy`
4. 配置`Charles`本地代理
① `Charles` - `Tools` - `Map Local Settings` - `add`
② 添加请求代理映射
![image.png](https://upload-images.jianshu.io/upload_images/4989175-c65df2436ba64801.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
5. 使用`axios`请求`mock`数据
① 安装`axois`
```
➜  my-react-app git:(master) ✗ yarn add axios 
```
注释：也可以使用`npm install axios --save`安装。
② 使用`axios`请求数据
```
import axios from 'axios'
//省略...
axios.get('/api/todolist')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  }) 
```
