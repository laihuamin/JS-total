### 前言
这篇文章是网上看到的，自己实验了一遍，把过程和结果都分享给大家，网上的那片我也会注明出处，希望对大家真实过程中有用，喜欢的点个赞，或者给我的[github](https://github.com/laihuamin/JS-total)点个star谢谢.

### 平常我们用的console.log

```js
let a = 10;
console.log(a);
```
这个使用在正常不过，确实方便，而且还可以用alert一样的效果。不过下面和大家介绍的，对大家应该有用。

### 显示信息

```js
console.log(10); //10
console.info('信息')；
console.warn('警告');
console.error('错误');
```
后面几个的输出结果如下：

![console.info](http://laihuamin.oss-cn-beijing.aliyuncs.com/consoleInfo.png)

![console.warn](http://laihuamin.oss-cn-beijing.aliyuncs.com/consoleWarn.png)

![console.error](http://laihuamin.oss-cn-beijing.aliyuncs.com/consoleError.png)

### 占位符

先看例子：

![placeholder](http://laihuamin.oss-cn-beijing.aliyuncs.com/palceholder.png)

占位符不止这些，还有字符串%s，浮点型%f和对象%o。不过这些功能现在应该用不到了，从es6出了模版字符串之后，字符串的拼接已经不是什么难事。

### 输出信息组

```js
console.group("第一组");
  console.log("第一组第一条:github:github.com/laihuamin");
  console.log("第一组第二条:github:github.com/laihuamin");
console.groupEnd();
console.group("第二组信息");
  console.log("第二组第一条:github:github.com/laihuamin");
  console.log("第二组第二条:github:github.com/laihuamin");
console.groupEnd();
```

输出结果：

![console.group](http://laihuamin.oss-cn-beijing.aliyuncs.com/consoleGroup.png)

### 输出对象

console.dir可以输出对象的所有属性和方法，console.log可以输出对象内容

```js
console.log(document.body);
console.dir(document.body);
```

输出结果：

![console.dir](http://laihuamin.oss-cn-beijing.aliyuncs.com/consoleDir.png)


### 输出计时时间

console.time是输出时间的函数
```js
console.time("控制台计时器一");
  for(var i=0;i<10000;i++){
    for(var j=0;j<10000;j++){}
  }
console.timeEnd("控制台计时器一");
```

输出结果：
![console.time](http://laihuamin.oss-cn-beijing.aliyuncs.com/consoleTime.png)


### 追踪函数的调用轨迹
console.trace是追踪函数的轨迹

```js
function add(a,b){
  console.trace(); 
  return a+b; 
}
let x = add3(1,1); 
function add3(a,b){
  return add2(a,b);
} 
function add2(a,b){
  return add1(a,b);
} 
function add1(a,b){
  return add(a,b);
}
```

输出结果：
![console.trace](http://laihuamin.oss-cn-beijing.aliyuncs.com/console.trace.png)


这篇文章出于猎奇心里0.0