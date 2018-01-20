> 如果你能确切的答出可以，那恭喜你，你可以绕道了

### 前言
有人会说，这个问题好奇葩，放在别的语言里，这要是能输出true，估计是见鬼了，但是你别说，放在js中好真有可能。最近在一个人的推特上提了一个问题：

- 问题：Can (a==1 && a==2 && a==3) ever evaluate to true?
- 答案：yes

![](http://laihuamin.oss-cn-beijing.aliyuncs.com/twitter1.png)

在这篇文章中，我将解释这段代码的原理：

```js
const a = {
  num: 0,
  valueOf: function() {
    return this.num += 1
  }
};
const equality = (a==1 && a==2 && a==3);
console.log(equality); // true
```

你可以打开chorme浏览器，然后打开开发者模式，在console中输入这段代码，你就可以看到输出结果([windows]: Ctrl + Shift + J [mac]: Cmd + Opt + J)

### 有什么窍门呢？

其实也没有，能有的就是js中的两个概念：

- 隐式转换
- object的valueOf函数

### 隐式转换

注意：这题里面我们用的是==而不是===，在js中==代表的是等于而不是全等，那么就存在变量的隐式转化问题。这就意味着结果会比我们所期望的更多的可能性。对于js的隐式转化，真的有很多文章，我推荐一下以下几篇博客，如果你想要了解，可以点进去：

[推荐博客](https://github.com/jawil/blog/issues/1)

### valueOf

JavaScript提供了一种将对象转化为原始值的方法：Object.prototype.valueOf()，默认情况下，返回正在被调用的对象。

我们举个例子:

```js
const a = {
  num: 0
}
```

我们可以对上述对象使用valueOf方法，他会返回一个对象。

```js
a.valueOf();
// {num: 0}
```
是不是很酷，我们可以用typeOf来检测一下这个输出结果的类型：

```js
typeof a.valueOf();
// "object"
```

为了让valueOf可以更方便将一个对象转化成原始值，我们可以重写他，换种说法就是我们可以通过valueOf来返回一个字符串、数字、布尔值等来代替一个对象，我们可以看以下代码：

```js
a.valueOf = function() {
  return this.num;
}
```

我们已经重写了原生的valueOf()方法，当我们调用valueOf的时候，他会返回a.num。那我们现在运行以下：

```js
a.valueOf();
// 0
```

我们得到0了，这很合理，因为0就是赋给a.num的值。那我们可以来做几个测试：

```js
typeof a.valueOf();
// "number"

a.num == a.valueOf()
// true
```

很好，**但为什么这个很重要呢？**

这很重要，因为当你两种不同类型的遇到相等操作符的时候，js会对其进行类型转化——它企图将操作数的类型转化为类似的。

在我们的问题中：`(a==1 && a==2 && a==3)`JavaScript会企图将对象转化成数字的类型，进行比较。**当要转化的是一个Object的时候，JavaScript会调用valueOf()方法。**

自从我们改变了valueOf()方法之后，我们能不能做到以下几点呢：

```js
a == 0

// true
```
我们做到了，异常轻松。

**现在我们需要做的的一点是：当我们每次去调用a的值的时候，能改变它。**

幸运的是，在JavaScript中有`+=`符号。

`+=`这个运算符可以轻松的去改变一个的值，我们可以举个简单的例子:

```js
let b = 1
console.log(b+=1); // 2
console.log(b+=1); // 3
console.log(b+=1); // 4
```

正如你所见的，我们每次使用加法赋值运算符，可以让我们的变量增加。

所以我们可以将这个观念用到valueOf()中。

```js
a.valueOf = function() {
  return this.num += 1;
}
```

当我们每次调用valueOf的时候，他会将变量增加1返回给我们。

随着这个改变，我们来运行下面的代码：

```js
const equality = (a==1 && a==2 && a==3);
console.log(equality); // true
```

这就是它的工作原理。

**记住下面两点:**

- 使用相等操作符，js会做强制类型转化
- 我们的对象每次调用valueOf()它的值会增加1

所以比较的时候我们每次都能得到true。

- 补充第二点的运算过程

```js
a                     == 1   -> 
a.valueOf()           == 1   -> 
a.num += 1            == 1   -> 
0     += 1            == 1   ->
1                     == 1   -> true
a                     == 2   -> 
a.valueOf()           == 2   -> 
a.num += 1            == 2   -> 
1     += 1            == 2   ->
2                     == 2   -> true
a                     == 3   -> 
a.valueOf()           == 3   -> 
a.num += 1            == 3   -> 
2     += 1            == 3   ->
3                     == 3   -> true
```

### 总结

谢谢你观看这个小实验，希望你能从中学到东西，有兴趣的朋友也可以去我的[github](https://github.com/laihuamin/JS-total)点个star，你的支持是我持续输出的动力，谢谢！！！