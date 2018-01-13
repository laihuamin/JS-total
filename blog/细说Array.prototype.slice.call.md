### 前言

总觉得这个方法比较眼熟，但是不知道这个方法是干什么用的，那我们今天就来剖析一下这个方法

### 基本语法的讲解

- Array.prototype.slice()
Array是一个构造函数，原型中带有的slice方法就是我们平常用来切割数组用的，之后会返回一个数组，不清楚的朋友可以去MDN上看一下，[MDN之slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

- call和apply
call和apply、bind这已经是老生常谈的问题了，是可以改变this指向的，这里就简单点打个比方吧。

```js
function Food(){}
Food.prototype.say = function(){
  console.log(this.color)
}
var fish = new Food()
var o = {
  color: 'red'
}
fish.say.call(o);  //red
```

### 答疑解惑

Array.prototype.slice.call那么这个有什么用呢，我们来看个例子：

```js
function test(a,b,c,d) { 
  var arg = Array.prototype.slice.call(arguments,1); 
  console.log(arg); 
} 
test("a","b","c","d"); //b,c,d
```
看到这儿，可能有些人会说那能不能写arguments.slice(1)，当然不能，这样的话会报错，因为arguments是类数组对象，并没有slice这个方法。
[关于arguments对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)

### 真正的机制

Array.prototype.slice.call()能把类数组对象转化成数组，当然像传统的dom对象和js对象都是行不通的，我们接下来举个例子：
```js
var a={length:2,0:'lai',1:'hua'};//类数组,有length属性，长度为2，第0个是lai，第1个是hua
console.log(Array.prototype.slice.call(a,0));// ["lai", "hua"],调用数组的slice(0);
```
这个例子作证了我们的观点
接下来看一个实用的例子，这个例子看懂了，这个知识点也就懂了：
```
function bind(func, thisArg) {
    var nativeBind = Function.prototype.bind;
    var slice = Array.prototype.slice;
    if (nativeBind && func.bind === nativeBind) {
        return nativeBind.apply(func, slice.call(arguments, 1));
    }

    var args = slice.call(arguments, 2);
    return function () {
        return func.apply(thisArg, args.concat(slice.call(arguments)));
    };
}
```

上面这个式自己对bind的封装，可以兼容比较老的浏览器。

### 补充

最后补充一个通用的将类数组转化成数组的方法，因为考虑到可能有些不支持Array.prototype.slice，或者环境冲突的情况将这个原生方法覆盖：

```js
var toArray = function(s){
    try{
        return Array.prototype.slice.call(s);
    } catch(e){
        var arr = [];
        for(var i = 0,len = s.length; i < len; i++){
               arr[i] = s[i];
        }
         return arr;
    }
}
```