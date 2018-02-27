> 学前端也快一年了，最近想试试大公司的面试，然后这里把所有的知识点都整理出来，然后慢慢消化。该片总字数：1494，速读3分钟，普通阅读5分钟。有兴趣的可以关注一下我的[blog](https://github.com/laihuamin/JS-total/issues)


### 总的知识点概览

语法、数据类型、运算、对象、function、继承、闭包、作用域、原型链、事件、RegExp、JSON、Ajax、DOM、BOM、内存泄漏、跨域、异步加载、模板引擎、前端MVC、前端MVVM、路由、模块化、Http、Canvas、jQuery、EMCAScript、ES6、NodeJS、Vue、React

### 语法篇

- 变量声明

有三种：var、let、const（具体的知识点放到后面总结）

- 变量名

区分大小写，必须以字母、下划线（_）或者美元符号（$）开头，后续可以是数字或字母

- 变量的作用域

声明在所有函数之外的叫全局作用域，可以被这个模块中的所有代码访问。
声明在函数内部的叫局部作用域，只能被该函数内部访问

- 变量声明提升

```js
console.log(a);//undefined
var a = 1;
```
这里就是变量提升的效果，其实相当于发生了以下过程：

```js
var a;
console.log(a)
a = 1;
```
仅对var有效

- 函数提升

定义一个函数有两种方式，一个是函数声明，还有一个是函数表达式。而只有函数声明会被提升到顶部，不包括函数表达式。

```js
// 函数声明

foo();  //bar
function foo() {
  console.log('bar')
}

//函数表达式

var baz = function() {
  console.log('baz');
}
```

### 动态类型

JavaScript是一种弱类型或者说动态语言，你不用提前设定变量类型，在运行的时候会自动确定。

```js
var foo = 2; //foo is a Number now
var foo = 'baz' //foo is a String now
var foo = true //foo is Boolean now
```

### 数据类型

加上es6的symbol之后就是七个：**六个原始类型和一个复杂数据类型**

- 原始类型：
Null、Undefined、Boolean、Number、String、Symbol
- 复杂类型：
Object

### 另外的区分方式

- 值类型：五种原始类型（string,number,boolean,null,undefined）
- 引用类型：数组、函数、对象等

### 按值传递

对于JavaScript中，对于参数传递、构造函数带return等情况都是按值传递的，对于引用类型，其实传的是对象的地址。我们可以看一下以下这个例子：

```js
//函数内部参数的改变并没有影响到外部变量
function foo(a) {
      a = a * 10;
}

var num = 10;
foo(num);
console.log(num); // 10  没有变化

function bar(b) {
    b.item = "new_value";         // 参数b得到了obj1的地址，也叫"指向obj1"
    console.log(b === obj1) ;     // true
}

var obj1 = {item: "old_value"};
bar(obj1);

console.log(obj1.item);            // new_value
```