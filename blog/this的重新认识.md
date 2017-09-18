## 原来写的this，最近看书又有了新的认识
[原来的博客](https://github.com/laihuamin/program-blog/issues/19)
## 对this的重新认识
### 默认绑定的情况
- 在严格模式下，this绑定的是undefined
- 在非严格模式下，this绑定的是全局作用域
### 隐形绑定
> 这种情况就是我们所说的调用时决定的绑定，举个例子
```
function thisBind() {
    console.log(this.name);
}
const obj = {
    name: 'laihuamin',
    fn: thisBind
}
obj.fn(); // laihuamin
const bar = obj.fn;
let name = 'huaminlai';
bar(); // undefined
setTimeout(obj.fn, 1000); //undefined
```
> 是不是很奇怪，不应该绑定到全局么，基础不扎实的我也是这么认为的，那我们看下面这个例子

```
function thisBind() {
    console.log(this.name);
}
const obj = {
    name: 'laihuamin',
    fn: thisBind
}
obj.fn(); // laihuamin
const bar = obj.fn;
var name = 'huaminlai';    //改了操作符哦
bar(); // huaminlai
setTimeout(obj.fn, 1000); //huaminlai
```
> 其实到这里，我们已经大致知道了，是let这里出了问题，跑个题继续往下看，我们在看一个例子

```
window.a = 1;
console.log(a) // 1
var a = 2;
window.a // 2
```
> 其实在这里，有两个概念，顶层对象和全局变量，顶层对象即window对象，全局变量在ES5中是顶层对象的属性，但是这就会产生很大的问题，第一个，顶层对象的属性是可读可写的，这个不利于模块化编程，第二个，window对象是实体含义，但是可以随意改变属性就不是这个味道了。

```
var a = 1;
window.a // 1

let b = 1;
window.b // undefined
```
> 在ES6中对这个就有所改观，es6中规定，let，const，class定义的全局变量不属于顶层对象，但是还保留了var，function定义的变量为顶层对象的属性

- 跑题结束，不过，补了一个不起眼的知识点
### 显性绑定
> 显示绑定是用apply和call方法将this绑定到指定的

- 这两种方法的工作机制
> 他们的第一个参数都是要绑定的对象，第二个参数call和apply有区别，apply需要传入的是一个数组，而call传入的是一个个变量

- 例子
```
function foo() {
    console.log(this.a);
}
const obj = {
    a: 2
}
foo.call(obj); //2
```
- 新问题——当你第一个对象传入的是string，boolean，number这么三个基础类型时，又会发生什么呢
> call和apply会把这些基本累心转化成new String(...),new Boolean(...),new Number(...)来处理
### new绑定
### 硬绑定
### 几个绑定的优先级
### 安全的使用方式
### 软绑定