> 学前端也快一年了，最近想试试大公司的面试，然后这里把所有的知识点都整理出来，然后慢慢消化。该片总字数：1861，速读三分半钟，普通阅读五分钟。有兴趣的可以关注一下我的[blog](https://github.com/laihuamin/JS-total/issues)

### 总的知识点概览

语法、数据类型、运算、对象、function、继承、闭包、作用域、原型链、事件、RegExp、JSON、Ajax、DOM、BOM、内存泄漏、跨域、异步加载、模板引擎、前端MVC、前端MVVM、路由、模块化、Http、Canvas、jQuery、EMCAScript、ES6、NodeJS、Vue、React

### 描述

一般来说，一个函数是可以供外部调用的“子程序”（或者供内部调用比如递归），在JS中，函数是一等公民，因为它可以像任何对象一样拥有方法和属性。与其他对象的区别是可以被调用。

### 函数声明
函数的定义中有两种函数声明和函数表达式，而函数声明就是其中的一种。

```js
function name([param[,param[,...param]]]){statements}
```

- name 函数名
- param 传递给函数的参数名称，一个函数最多可以有255个
- statements 组成函数的语句

### 函数表达式
不以function开头的就是函数表达式。

```js
var myFunction = function() {
  statements
}
```

当函数只使用一次时，一般使用IIFE，如以下这种形式
```js
(function() {
    statements
})();
```

IIFE是在函数声明后立即调用的函数表达式。

### 函数声明vs函数表达式
我们先来举个例子：
```js
//函数声明
function foo() {}
//函数表达式
var foo = function () {}
```

方法一和方法二都是创建一个函数，且都是命名为foo，但是两者还是有区别的，js解析器中存在一种变量（函数）声明被提升的机制，也就是说变量（函数）声明会被提升到最前端，即使写在最后面的也会被提升到最前方。

我们可以看个例子:

```js
console.log(foo); // function foo() {}
console.log(bar); // undefined
function foo() {}
var bar = function bar_fn() {};
console.log(foo); // function foo() {}
console.log(bar); // function bar_fn() {}
```

### 箭头函数

箭头函数表达书存在着更简短的语法。

```js
//第一种
([param][, param]) => {statements}
//第二种
param => expression
```

- param

参数名称，零参数需要用()表示，只有一个参数的时候不需要用括号

- statements or expression

多个声明statements需要用大括号扩起来，单个的时候不需要。expression也表示隐式返回值。

举两个例子：
```js
//第一种
(a, b) => {
  var c = a + b;
  return c;
}
//第二种
n => n + 1
```
### 参数(arguments)对象

- arguments：一个包含了传递给当前执行函数参数的类似于数组的对象——类数组对象
- arguments.callee：只当前正在执行的函数（不过不建议使用）
- arguments.length：传递参数的数目

### block-level函数

从ES6开始，在严格模式下禁止使用块里的函数作用域。举个例子

```js
'use strict';

function f() {
  return 1;
}
//block-level函数
{
  function f() {
    return 2;
  }
}

f() === 1;// true

```

在非严格模式下，也不要用。块中的函数声明表现奇怪。

```js
if (shouldDefineZero) {
   function zero() {     // DANGER: 兼容性风险
      console.log("This is zero.");
   }
}
```
在ES6中，shouldDefineZero为false，那么zero永远不会被定义，但是存在历史遗留问题，ES6是新的标准，但是在以前，无论这个块是否执行，一些浏览器都会定义zero。

更加安全的方式是使用函数表达式：

```js
var zero;
if (0) {
   zero = function() {
      console.log("This is zero.");
   };
}
```