# 模块
## 模块化的好处
- 可维护性
> 可维护性显而易见，未模块化之前，你要改代码，可能得改好几处，模块化之后，代码复用了，改一处就可以了
- 命名空间
> 什么叫命名空间，简单点讲就是变量容易重名，你叫张三，他也叫张三，这就很尴尬。

> 还有就是模块化可以防止污染全局变量，为什么这么说，因为打包过之后，是没有全局变量这一个概念的，模块顶级作用域定义的也会被封装到局部作用域中
- 重用代码
> 这点基本不用讲，模块化的根本就是复用，
## commonJS
- commonJS核心
> commonJS有三部分分别是模块的定义，模块的引用和模块的标识
- commonJS的导出和引入
> 导出： [module.export和export](https://github.com/laihuamin/node-learning/tree/master/node%E5%AD%A6%E4%B9%A0/%E7%AC%AC%E4%B8%80%E8%AF%BE)，[module.export和export的区别](https://github.com/laihuamin/node-learning/tree/master/node%E5%AD%A6%E4%B9%A0/%E7%AC%AC%E4%BA%8C%E8%AF%BE)

> 导入：require
```
const fs = require('fs');
```
> 注意点：commonJS是同步加载的，具体后面会讲到
## AMD与CMD
- AMD简介
> AMD又称异步模块加载，非阻塞性的模块加载
- AMD的格式
```
define(['myModule', 'otherModule'], function(myModule, otherModule){
    console.log(myModule.hello());
    console.log(otherModule.hello());
})
```
- AMD的原理
> AMD是通过appendChlid插入到DOM的，在模块加载成功之后，define会调用第二个回调函数
- CMD简介
> 和AMD原理一样
- CMD格式
```
define(function(require, export, module){
    var a = require('./a');
    module.export = {
        fn: a.doSomeThing()
    }
})
```
- 两者的区别
1.AMD推崇提前执行，CMD推崇延后执行
2.AMD推崇依赖前置，CMD推崇就近依赖
3.AMD推崇API一个多用，而CMD推崇API单一，举个例子，AMD中的require没有全局和局部之分，而CMD中只有局部没有全局，职责单一
## ES6模块
### 为什么要有模块？
> 模块与script有很大的不同：
- 模块代码自动运行在严格模式之下，并且没有任何办法跳出严格模式
- 在模块的顶级作用域添加全局变量，不会自动添加到共享作用域的全局中，只会在共享作用域函数内部存在
- 在模块顶级作用域添加this会变成undefined
- 模块不允许在代码中使用HTML风格的注释
- 如果想让外部访问模块必须导出
- 允许其他模块导入绑定
### 导出
> 利用export关键字将模块的部分代码导出，导出部分可以是常量，变量，函数，类等
- 语法及解析
```
//直接导出——不能匿名，但是可以是任何类型
export let color = "red";
//接口导出——跟上面直接导出类似
const b = (c) => c;
export {b};
//接口名修改导出——函数名是张三，我们非要把他导出叫李四
const a = (b) => b;
export { a as b};   //注意——引用也要引用李四
//默认值导出——对于匿名的我们可以这么做
export default function (){
    ...
}
//默认值导出2——和上面的类似，就是导出放在下面了
export {xxx as default}
```
### 导入
- 语法解析
```
// 完全导入
import * as xx from './example.js';
// 部分导入
import {xx, yy} from './example.js';
// 重命名导入
import {yy as xx} from './example.js';
```
- 多个模块导入
> 举个例子
```
import {sum} from "./example.js"
import {multiply} from "./example.js"
import {magicNumber} from "./example.js"
```
> 在这个例子中example文件只会被执行一次，其余的都是读取缓存来进行的
### 注意点
- export和import必须置于顶层代码中
```
//错误
function(){
    export.xxx;
    import xx from xx
}
```
- import导入的模块是只读的
```
//错误
import {obj} from xx;
obj = {} //错误
```
- ES6支持循环依赖
> 原因在与import是只读的，不可改变
```
//------ a.js ------
import {bar} from 'b'; // (i)
export function foo() {
    bar(); // (ii)
}

//------ b.js ------
import {foo} from 'a'; // (iii)
export function bar() {
    if (Math.random()) {
        foo(); // (iv)
    }
}
//foo永远是a.js中的foo，无法被改变
```
- 导入时不能使用解构
```
//错误
import {foo: {bar}} from './example.js'
```
## 面试题——commonJS和(AMD或者ES6)有什么区别
- 前者是同步加载的，后者是按需加载的，如果浏览器中也引用同步加载容易引起阻塞
- ES6 Module 中导入模块的属性或者方法是强绑定的，包括基础类型；而 CommonJS 则是普通的值传递或者引用传递。
