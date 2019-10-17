### 扩展运算符
1. 函数Rest参数
```
    const sum = (...arg) => {
      console.log(arg); //[2, 4, 6]
      let total = 0;
      for(let i of arg) {
        total += i;
      }
      return total;
    }
    console.log(sum(2,4,6));// 12
```
2. 解构赋值
```
    let [x, ...y] = [4, 6, 8];
    console.log(y); //[6, 8];

    console.log(...[1,2,3]); //1 2 3

    let [a, b, c, d] = 'ES6';
    console.log(a, b, c, d); //E S 6 undefined
```
3. 字符串转化为数组
```
    const z = [...'abc'];
    console.log(z); //[a, b, c]
```
### Module模块
如果多个模块都import了同一个模块，则该模块只执行一次，多个模块共享该模块提供的接口。
```javascript
//Utils.js模块
const obj = new Object();
export default obj;

//DemoA.js
import Obj from './Utils'
console.log(Obj);     // {}
Obj.a = 1;

//DemoB.js
import Obj from './Utils'
console.log(Obj);    //{a:1}
```
**注意：**Utils.js在DemoA.js与DemoB.js 之前执行，并且只执行一次；不会new出来多个对象， DemoA.js与DemoB.js共享同一个obj对象。
