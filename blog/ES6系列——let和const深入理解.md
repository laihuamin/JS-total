### 前言

在ES6中多了两个变量定义的操作符——let和const，在现在项目中，ES6已经是不可获缺，我打算在掘金上整理一套ES6的系列，会收集常用的知识点，喜欢的可以点个喜欢，关注，或者可以去[github](https://github.com/laihuamin/JS-total)点个star

### ES5没有块级作用域

大家都知道js是没有块级作用域的，我们先了解一下块级作用域。

> 任何一对花括号中的语句集都属于一个块，在这之中定义的所有变量在代码块外都是不可见的

了解定义之后，我们👀一个用烂了的例子：
```js
for(var i = 0; i < 10; i++) {
      console.log(1);
    }
console.log(i);
```
上面这个例子，最外面会输出10。显而易见，没有块级作用域。

### ES5可以怎么创建块级作用域

- 立即执行函数

关于这一点我们可以看道面试题就能明白。

```js
var func = [];
for(var i = 0; i < 10; i++) {
  func.push(function(){
    console.log(i)
  });
}
func.forEach((func) => {
  func();
})
//10个10
```
为什么会产生这样的事情呢？因为在循环内部这些i都是用同一个词法作用域的，换言之，这10个i用的都是最后的输出的i，最后的i也就等于10。
而立即执行函数就不一样，他用函数作用域代替块级作用域，强制在循环内部创建副本，以便输出1，2，3，4...

```js
var func = [];
for(var i = 0; i < 10; i++) {
  func.push((function(value){
    return function() {
      console.log(value)
    }
  })(i));
}
func.forEach((func) => {
  func();
})
//会输出1到9
```
对立即执行函数有兴趣的好可以看看这么几篇博文，我在这里就不用大篇幅赘述，我们简单过一下下面几种方法，然后去将我们今天的主角们。
[推荐博文](https://segmentfault.com/a/1190000003985390)
[推荐博文](http://www.cnblogs.com/TomXu/archive/2011/12/31/2289423.html)
- try-catch

try-catch这个创建块级作用域在红皮书中有提到过，我没用过，觉得这个知识点了解就可以，也不常用。

```js
try {
   throw 'myException';
}
catch (e) {
   console.log(e);
}
console.log(e);
//第一个输出myException，第二个输出e is not defined
```

### ES6中的块级作用域

在ES6中提出了let和const，我们可以看一下下面这几个例子，在每次循环中，let会创建一个词法作用域，并与之前迭代中同名变量的值将其初始化。

```js
for(let i = 0; i < 10; i++) {
      console.log(1);
    }
console.log(i);
//报错i is not defined
```

```js
const func = [];
for(let i = 0; i < 10; i++) {
  func.push(function(){
    console.log(i)
  });
}
func.forEach((func) => {
  func();
})
//会输出0到9
```
这个特性同样适用于for in

```js
const funcs = [],
  obj = {
    a: 'lai',
    b: 'hua',
    c: 'min'
  };
for (let key in obj) {
  funcs.push(() => {
    console.log(key)
  })
}
funcs.forEach((func) => {
  func()
});
//输出的是a  b  c
```

### 不能重复声明变量

在一个作用域中，已经用var、let、const声明过某标识符之后，不能在用let、const声明变量，不然会抛出错误

```js
var a = 0;
let a = 10;
// 报错
```
但是在作用域中嵌套一个作用域就不会，看下面这个例子

```js
var a = 0;
if (true) {
  let a = 10;
}
// 不会报错
```
const效果也是一致的，不过const用于定义常量，const还有一下特性

### const声明变量

当你用const声明变量，不初始化的话，就会发生报错

```js
const a;
// 报错
```

而const的本质是声明的，不允许修改绑定，但是允许修改值，所以大多数场景，我们都用const来声明对象，那样对象的指针不会改变，相对来说安全，看一下下面的例子

```js
const person = {
  name = 'laihuamin'
}
person.name = 'lai';
//到这里不会发生报错，只会改变值
person = {};
//这里改变了对象的指针，所以会发生报错
```

而const不止能用于对象指针绑定，还能运用在for in的迭代中，因为每次迭代不会修改已有的绑定，而是会创建新的绑定。看下面的例子

```js
const funcs = [],
  obj = {
    a: 'lai',
    b: 'hua',
    c: 'min'
  };
for (const key in obj) {
  funcs.push(() => {
    console.log(key)
  })
}
funcs.forEach((func) => {
  func()
});
//输出a b c
```
但是在循环中就不能用，循环会修改已有的绑定，而const定义的常量时不能修改绑定的，所以会报错。

### 没有变量提升

对于ES5的变量提升有一个经典的考题。如下：

```js
var a = 10;
(function () {
  console.log(a);
  var a = 1;
})();
// 这个会输出undefined
```
其实这个很好理解，js作用域连是从内向外寻找变量的，那么函数的作用域中有a这个变量，由于var会发生变量提升，就相当于下面这个过程

```js
var a;
console.log(a);
a = 1;
```
所以，这个a变量就是undefined。而let和const就不一样，把var换成let或者const都会报错。

### 暂时性死区

我们先来看例子，再来根据例子解析：

```js
console.log(a);
let a = 10;
//Uncaught ReferenceError: a is not defined
```
let和const定义的变量是存在暂时性死区的，而var没有，我们来了解一下两个操作符的工作原理：
对于var而言，当进入var变量的作用域时，会立即为他创建存储空间，并对它进行初始化，赋值为undefined，当函数加载到变量声明语句时，会根据语句对变量赋值。
而let和const却不一样，当进入let变量的作用域时，会立即给他创建存储空间，但是不会对他进行初始化，所以会抛出如上错误。

而对于typeof操作符来说，结果是一致的，一样会报错：
```js
console.log(typeof a);
let a = 10;
//Uncaught SyntaxError: Identifier 'a' has already been declared
```
所以最佳实践是把声明的变量全部提到作用域的开头，这样既方便管理，又能避免不必要的麻烦
### 全局变量绑定
var声明全局变量的时候，当使用关键词，那么就会覆盖掉window对象上原本拥有的属性，我们看一下下面这个例子：

```js
var RegExp = 'lai';
console.log(window.RegExp);
var a = 'hua';
console.log(window.a);
var Array = 'min';
console.log(window.Array);
var b = new Array();
//lai
//hua
//min
//Uncaught TypeError: Array is not a constructor
```
而换成let和const的时候就不会发生这样的事情，我们用同样的例子来看一看：
```js
let RegExp = 'lai';
console.log(window.RegExp);
let a = 'hua';
console.log(window.a);
let Array = 'min';
console.log(window.Array);
let b = new window.Array();
console.log(b);
//ƒ RegExp() { [native code] }
//undefined
//ƒ Array() { [native code] }
//[]
```
结果和上面一样，我们更可以进一步认证
```js
let RegExp = 'lai';
console.log(RegExp === window.RegExp);
var Array = 'hua';
console.log(Array === window.Array);

//会输出 false 和 true
```

### 总结

根据以上讲的，最佳实践应该是，能用const定义对象的，不要用let，能用let定义变量的，不要用var。至于他的很多特性，了解了能更好的帮助你运用。如果觉得笔者写的可以的点一个喜欢，之后还会持续更新其他板块，希望能给笔者的[github](https://github.com/laihuamin/JS-total)点个star，谢谢支持