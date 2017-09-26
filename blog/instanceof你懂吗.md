### 简单介绍——instanceof
> instanceof的发明是为了弥补typeof所带来的缺陷，因为typeof在检测object类型的时候，总是会返回object，所以js提供了另外一个接口来实现对对象类型的判断，那就是我们的instanceof，我们先来看一下他的用法：
```js
const obj = new Object();
console.log(obj instanceof Object) //true
```
### 其实他没那么简单——instanceof
> 其实他的功能还很强大，我们可以看一下下面的例子
```js
function Foo(){};
const foo = new Foo();
console.log(foo instanceof Foo);
```
> 不仅可以检测原有的object类型，还可以检测自定义你构造函数类型
### instanceof和继承也有关哦
> instance不仅可以检测实例本身的构造函数，他还可以检测，实例的父类型继承，我们看一下下面这个例子
```js
function Foo() {};
function Bar() {};
Bar.prototype = new Foo();
Bar.prototype.constructor = Bar;
const bar = new Bar();
console.log(bar instanceof Bar); //true
console.log(bar instanceof Foo); //true
```
### 你又觉得你了解了吗——instanceof复杂用法
> 其实instanceof还有很多复杂用法，我们看一下下面的例子
```js
function Foo() {};
console.log(Object instanceof Object); //true
console.log(Function instanceof Function); //true
console.log(Number instanceof Number); //false
console.log(String instanceof String); //false
console.log(Function instanceof Object); //true
console.log(Foo instanceof Function); //true
console.log(Foo instanceof Foo); //false
```
- 一脸懵逼？理解上述的例子还得从两个方面入手，instanceof操作符的机制和js继承的机制
### 来聊聊instanceof操作符的机制
> 从网上的一篇博客中找到一段自己实现instanceof的代码，如下
```js
function  instance_of (L, R){
    var O = R.prototype;    //右边表达式的显示原型
    var L = L._proto_;  //左边的表达式的隐式原型
    while(true){
        if(L === null){
            return false;
        };
        if(O === L){
            return true;
        };
        L = L._proto_;
    }
}
```
### 关键——js的原型继承机制
> 原型和原型链是js中很重要的一部分，我们用流程图来看一下
![image](https://user-images.githubusercontent.com/28126886/30860374-874bef70-a28c-11e7-82eb-7a399f34413d.png)
> 有几点需要注意：
1.Object是构造函数，他的_proto_指向Function.prototype
2.Function.prototype的_proto_指向Object.prototype
3.Object.prototype的_proto_指向null
### 看完了你还懂么
- Object instanceof Object
> 左边的Object的_proto_指向Function.prototype，Function.prototype指向Object.prototype
- console.log(Function instanceof Function);
> 左边的Function的_proto_指向Function.prototype
- console.log(Number instanceof Number);
> 左边的Number的_proto_指向Function.prototype，所以原型链向上已经回不到Number.prototype,所以返回false
- console.log(String instanceof String);
> 和上面同理
- console.log(Function instanceof Object);
> 左边的Function的_proto_指向Function.prototype，而Function.prototype的_proto_指向Object.prototype，所以返回true
- console.log(Foo instanceof Function);
> Foo是构造函数，所以他的_proto_是指向Function.prototype，所以返回true
- console.log(Foo instanceof Foo); //false
> 上面已经解释了指向，这个肯定为false
### 总结
- instanceof搞懂两点很重要，一个是原型链，还有一个是instanceof操作符的机制，与君共勉，希望能给个star