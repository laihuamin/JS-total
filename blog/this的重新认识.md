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
> new操作符，对于大家来说并不陌生，那么，他是进行了什么样的操作呢？

- new操作符做了什么？
1、他会先创建一个原型为空的对象
2、将这个函数的prototype赋值给对象的`_proto_`
3、将这个对象当作this传入到函数中，如果没有return，直接返回函数中this的属性，如果有return，直接返回return中的内容
- 接下来，我们来用函数模拟一下这个行为
```
function NewFunc(){
    const obj = {};
    if(func.prototype !== null){
        obj._proto_ = func.prototype;        
    }
    var ret1 = func.apply(obj, Array.prototype.slice.call(arguments, 1))
    if((typeof ret1 === 'object' || typeof ret1 === 'function') && ret1 !== null ){
        return ret1
    }
    return obj;
}
```
- 举几个例子
```
function Person1(name) {
    this.name = name;
}
function Person2(name) {
    this.name = name;
    return this.name;
}
function Person3(name) {
    this.name = name;
    return new Array();
}
function Person4(name) {
    this.name = name;
    return new String(name);
}
function Person5(name) {
    this.name = name;
    return function() {};
}


const person1 = new Person1('xl');
const person2 = new Person2('xl');
const person3 = new Person3('xl');
const person4 = new Person4('xl');
const person5 = new Person5('xl');
```
- 结果
```
xl
xl
[]
xl
function(){}
```
### 硬绑定
> 介绍完上面这几个，还遗漏了一个，便是bind，这个就是我们这里将的硬绑定，bind会把this强制绑定到对象上

```
function thisBind(){
    console.log(this.name)
}
obj={
    name: 'laihuamin'
}
var bar = thisBind.bind(obj);
bar(); //laihuamin
```
- 我们还可以实现一个简单的bind函数
```
function bind(fn, obj){
    fn.apply(obj, arguments)
}
```
- ES5中内置的bind函数
```
if(!Function.prototype.bind) {
    Function.prototype.bind = function(oThis){
        if(typeof this !== 'function') {
            throw new TypeError(
                "Function.prototype.bind what is trying to be bound is not callable"
            );
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function(){},
        fBound = function () {
            return fToBind.apply((this instanceof fNOP && oThis ? this : oThis), aArgs.concat(Array.prototype.call(arguments)))
        }
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    }
}
```
### 几个绑定的优先级
- 隐形绑定和显性绑定的优先级判断
```
function thisBind(){
    console.log(this.name);
}
obj1 = {
    name: 'laihuamin',
    fn: thisBind
}

obj2 = {
    name: 'huaminlai',
    fn: thisBind
}

obj1.fn(); //laihuamin
obj1.fn.apply(obj2) //huaminlai
```
> 这里明显可以看出显性绑定优先级高于隐性绑定

- new绑定和显性绑定、硬绑定
> 硬绑定和显性绑定的优先级应该是一致的，因为bind在显性绑定的基础上封装了一层，那我们就比较显性绑定是不能与new绑定进行比较的，因为new没有办法和apply、call一起使用那么我们有什么更好的方法呢，可以让new绑定和硬绑定进行比较

```
function thisBind(){
    this.name = name
}
obj = {}
var bar = thisBind.bind(obj);
bar(2);
var obj2 = new bar(3);
console.log(obj.name);  //2
console.log(obj2.name);  //3
```
> 从这个例子我们可以看出，new绑定可以改变硬绑定的this的指向，所以，优先级是比硬绑定高的

- this绑定优先级排序
```
new绑定 > 硬绑定 = 显示绑定 > 隐性绑定 > 默认绑定
```
- 如何去看this的绑定情况
```
1、先看有没有new关键字
2、在看是否有显性绑定和硬绑定
3、再次，你可以看是否隐形绑定
4、最后在根据默认绑定来判断
```
### 安全的使用方式
- 忽略this的情况
> 如果你把null和undefined作为this的绑定，这些值就会被忽略，实际应用的是默认的绑定

```
function foo() {
    console.log(this.a)
}
var a = 2;
foo.call(null); //2
```
- 这样的操作可以进行什么呢？有两个作用，第一个可以传入参数，第二个是可以进行函数柯里化
```
function foo() {
    console.log(this.a + 'is' + this.b);
}
//展开参数
foo.apply(null, [2, 3]);
//类似与es6中的扩展运算符
foo(...[2, 3]);
//函数柯里化
var bar = foo.bind(null, 2);
bar(3); // 2+3
```
- 更安全的this
> 忽略this绑定我们有更安全的方式，传入一个DMZ对象

```
//DMZ对象
Object.create(null)
//展开对象
var a = Object.create(null);
function foo() {
    console.log(this.a + 'is' + this.b);
}
//展开参数
foo.apply(a, [2, 3]);
//类似与es6中的扩展运算符
foo(...[2, 3]);
//函数柯里化
var bar = foo.bind(a, 2);
bar(3); // 2+3
```
### 软绑定