### 前言

es2015虽然是主流，但是每年都会有新的东西更新，在这些东西中，有许多东西值得我们去学习，以及使用，本篇文章，将提供一些平常业务开发中经常会用到的方法。希望能对大家的学习有帮助。个人的[github博客](https://github.com/laihuamin/JS-total/issues)


### ECMAScript 2016

#### 1、Array.prototype.includes

includes这个方法，是检测数组中是否含有相应的元素，返回的值是true和false。与indexOf方法功能相似，但是还会有许多差异性。

[![includes.png](https://i.loli.net/2018/07/07/5b40d60aac55d.png)](https://i.loli.net/2018/07/07/5b40d60aac55d.png)

其第二个参数还可以代表查询的位置是否正确

[![includes-other.png](https://i.loli.net/2018/07/07/5b40d7d0dc1eb.png)](https://i.loli.net/2018/07/07/5b40d7d0dc1eb.png)

#### 2、求幂操作符

在es2016里面平方操作变得更加渐变，只要使用操作符`**`就可以实现。

![](https://s1.ax1x.com/2018/07/09/PmxeAS.png)

### ECMAScript 2017

#### 1、Object.value()

Object.value()的功能其实和Object.keys()相似,主要作用是取得对象的值，放入到数组中，同样不包括任何原型链中的值。

![Object.value()](https://s1.ax1x.com/2018/07/09/PmzLdK.png)

#### 2、Object.entries()

Object.entries()也是和Object.key()相关的，该方法是返回一个数组，数组的元素是对象自身的所有可以遍历的键值对数组

![Object.entries()](https://s1.ax1x.com/2018/07/09/PnpxKA.png)

#### 3、String.padStart

该方法的作用就是用自定义的字符补全字符串的长度，比如我们平常在做的，小于10的时候自动补零就可以用这个实现。

**例子1：**

![stringPadStart.png](https://i.loli.net/2018/07/11/5b461df8a69d9.png)

#### 4、String.padEnd

该方法和String.padStart相同，只是前者是从字符串的头部开始补全，后者是从字符串的尾部开始补全。

### 总结

这一篇只是介绍了一些实用的方法，下一篇会具体分析一下async/await。