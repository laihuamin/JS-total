## 函数
### 函数声明与表达式
- 函数声明
> 语法
```
// MDN中有说明一个函数最多拥有255个参数
function functionName(arg){
    //函数体
}
```
> 示例
```
function square(number) {
    return number * number;
}
```
- 函数表达式
> 语法
```
const functionName = function() {
    //函数体
}
```
> 示例
```
const square = function(number) {
    return number * number;
}
```
- 两者的区别
> 函数声明有变量提升，函数表达式没有变量提升
```
square1(1) //可行
square2(1)  //报错
function square1(number) {
    return number * number;
}
const square2 = function(number) {
    return number * number;
}
```
- Function构造函数
> 语法
```
const functionName = new Function('arg', 'functionBody');
```
> 示例
```
const sum = new Function('a', 'b', 'return a+b')
sum(1, 2);
```
- 函数内部引用自身的方式
> 例子
```
const foo = function bar() {}
```
> 语法
1.foo
2.函数名bar
3.argument.callee
### 作用域与作用域链
- 作用域
> 作用域控制着变量可访问的范围，有全局作用域和局部作用域之分，作用域也控制着变量的声明周期
- 作用域链
> 每个函数内部都有一个[[Scope]],包含了这个函数所有能访问的对象集合
```
function add(num1, num2){
    return num1 + num2;
}
```
> 下列图片只列举了部分

![](http://7xnxzw.com1.z0.glb.clouddn.com/js%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%93%BE_01.jpg)
- 模仿块级作用域——立即执行
> 语法
(function(){
    ...
})();
> 例子
```
//未立即执行
for(var i = 0; i < 3; i++){
    setTimeout(function(){
        console.log(i);
    }, i*1000)
}
//立即执行
for(var i = 0; i < 3; i++){
    (function(){
        setTimeout(function(){
            console.log(i);
        }, i*1000); 
    })();
}
```
### 构造函数
- 构造函数的写法
```
function People(name, age){
    this.name = name;
    this.age = age;
}
```
- 注意点
> 函数首字母大写
### 闭包
- 定义
> 闭包是指那些能够访问自由变量的函数
- 自由变量
> 可以在函数内使用的，既不是函数的参数，也不是局部变量
- 举例
```
const a = 1;
function () {
    console.log(a);
}
foo();
```
> 讲道理a既不是函数参数，也不是局部变量，就是自由变量
- 理论角度的闭包——所有js函数
- 实践角度的闭包
1.函数上下文已销毁，但是函数仍然存在
2.代码中引用自由变量
```
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
var foo = checkscope();
foo();
```
> 可以上面一段代码执行的上下文改变：
1.checkscope()的时候返回的是一个f(),将一个函数的引用给了foo
2.foo变成了全局函数，不会在checkscope()运行完后销毁
- 闭包面试题
```
var data = [];
for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}
data[0]();
data[1]();
data[2]();
```
> 答案都是3,因为var是没有块级作用域，所以所有函数访问的都是一个i，也就是3
```
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}

data[0]();
data[1]();
data[2]();
```
> 立即执行函数可以产生块级作用域，将i的值存在function匿名函数中
### 柯里化
### ES6函数新特性
[整理的第一篇](https://github.com/laihuamin/program-blog/issues/2)
[整理的第二篇](https://github.com/laihuamin/program-blog/issues/3)
### this，apply，call，bind
[整理的第一篇](https://github.com/laihuamin/program-blog/issues/19)