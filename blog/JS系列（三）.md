> 学前端也快一年了，最近想试试大公司的面试，然后这里把所有的知识点都整理出来，然后慢慢消化。该片总字数：2585，速读四分半，普通阅读7分钟。有兴趣的可以关注一下我的[blog](https://github.com/laihuamin/JS-total/issues)

### 总的知识点概览

语法、数据类型、运算、对象、function、继承、闭包、作用域、原型链、事件、RegExp、JSON、Ajax、DOM、BOM、内存泄漏、跨域、异步加载、模板引擎、前端MVC、前端MVVM、路由、模块化、Http、Canvas、jQuery、EMCAScript、ES6、NodeJS、Vue、React

### JS对象和属性

一个JS的对象可以有很多属性。我们来举个例子：

```js
var myCar = new Object();
myCar.make = "Ford";
myCar.model = "Mustang";
myCar.year = 1969;
```
当一个属性未赋值时值为undefined；

```js
console.log(myCar.noProperty)  //undefined
```

当然属性的访问不仅只有点的形式，还可以使用方括号

```js
myCar["make"] = "Ford";
```

### 枚举一个对象的所有属性

原生的三种方法：

- for...in循环：遍历对象中可枚举的属性。
- Object.keys(o)：返回一个对象o自身含有(不包括原型中)的所有属性的名称的数组。
- Object.getOwnPropertyNames：该方法返回一个数组，它包含了对象o所有的属性名称(包括不可枚举)。

### 创建一个新的对象

- 使用构造函数

定义构造函数
```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
```
new创建一个新的实例对象

```js
var mycar = new Car("Eagle", "Talon TSi", 1993);
```

- 直接定义

```js
var myCar = {
  make: 'Eagle',
  model: 'Talon TSi',
  year: 1993
}
```
- 使用Object.create方法

```js
//创建一个原型为null的空对象
var o = Object.create(null);
//创建一个原型为空对象的，拥有属性值p，值为24
var o = Object.create({}, {p: {value: 24}})
console.log(o.p);  //24
//该属性值是只可读，不可写、不可枚举、不可配置

//以下对象的p属性是可读可写可配置可枚举。
var o2 = Object.create({}, {
  p: {
    value: 24,
    writable: true,
    enumerable: true,
    configurable: true 
  }
})

```

### 用this来引用对象

this在这里指的是上下午指针，很多情况我们都用它来代表一个对象，我们可以看一段下面的代码：

```js
//方法
function validate(obj, lowval, hival) {
  if ((obj.value < lowval) || (obj.value > hival)) {
    alert("Invalid Value!");
  }
}
```
```html
<input type="text" name="age" size="3"
  onChange="validate(this, 18, 99)">
```
这里的this代表的就是input这个dom节点。当然它还有好多方面，以后我们细讲。

### getters和setters

getter是一个获取对象某个值的方法，而setters是一个设置对象某个值的方法。我们来看一下他们的使用：

```js
var o = {
  a: 7,
  get b() {
    return this.a + 1;
  },
  set c(d) {
    this.a = d / 2;
  }
}

console.log(o.a); //7
console.log(o.b); //8
o.c = 50;
console.log(o.a); //25
```

上述过程就是：

先输出o中a的属性值，
在输出o中b的属性值，等于a + 1，
再设定o中a的值，
最后输出设定过的a的值。

- 当我们想用getter和setter来设定对象的某一个值的时候我们可以使用Object.defineProperty这个方法。我们看下面这个例子：

```js
var d = Date.prototype;
Object.defineProperty(d, "year", {
  get: function() { return this.getFullYear() },
  set: function(y) { this.setFullYear(y) }
});
```
例子中的getFullYear和setFullYear，指的是其他的方法。

当然我们还可以用Object.defineProperties方法来把第一个例子改的更具可读性。

```js
var o = { a:0 }

Object.defineProperties(o, {
    "b": { get: function () { return this.a + 1; } },
    "c": { set: function (x) { this.a = x / 2; } }
});

o.c = 10;
console.log(o.b);
```


### 比较对象

对象是一个引用类型，两个独立声明的对象永远不可能相等，即使值相同也是，我们看下面的例子：

```js
var fruit = {name: "apple"};
var fruitbear = {name: "apple"};

fruit == fruitbear // return false
fruit === fruitbear // return false
```

只有两个对象的引用相同的时候才会返回true。

```js
// 两个变量, 同一个对象
var fruit = {name: "apple"};
var fruitbear = fruit;  // 将fruit的对象引用(reference)赋值给 fruitbear
                        // 也称为将fruitbear“指向”fruit对象
// fruit与fruitbear都指向同样的对象
fruit == fruitbear // return true
fruit === fruitbear // return true
```