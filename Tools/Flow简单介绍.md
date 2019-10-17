Flow是JavaScript静态类型检查工具，由Facebook团队于2014年首次提出。该库的目标在于检查JavaScript 中的类型错误。
## 安装与配置
**安装npm包**
```javascript
npm install --save-dev flow-bin
```
**定义npm脚本命令**
在package.json文件中的scripts 项添加：
```javascript
"scripts": {
  "flow": "flow"
}
```
**创建配置文件**
在项目的根目录下创建一个.flowconfig配置文件。我们可以通过以下命令创建一个空配置文件：
```javascript
npm run flow init
```
## 常用命令
重新检测所有文件
```javascript
npm run flow check
```
