## setTimeout和setInterval
- setTimeout的使用
```
setTimeout(cb, time);
```
> setTimeout传入的是两个参数，第一个参数是cb代表的是回调函数callback，第二个代表的是时间，以ms计算

- setInterval的使用
```
setInterval(cb, time);
```
> setInterval传入的也是两个参数，第一个参数是cb代表的是回调函数callback，第二个代表的也是时间，以ms计算

## setTimeout和setInterval的区别和注意点
- 区别
> setTimeout含义是定时器，到达一定的时间触发一次，但是setInterval含义是计时器，到达一定时间触发一次，并且会持续触发

- 相互之间的转换
```js
function run() {
    //其他代码
    setTimeout(function(){
        run();
    }, 10000);
}
setInterval(function(){
    run();
}, 10000);

```
> *上面的代码还是有区别的：*
第一段代码使用的是setTimeout来实现的，这个实现就有一个缺点，就是setTimeout是在代码的执行时间上加10秒，比如run()执行了100s,而整个过程可能是110s，
第二段代码就不一样了，setInterval是当run()跑了不到10s，那么就是10s走一回，如果setInterval大于10s，我们后面详解。

## 你真的了解么————setInterval
```js
setInterval(function(){
    // ...
}, 100)
```
- 我们先思考两种情况，第一种func的执行时间小于100ms，第二种情况func的执行时间大于100ms
> 第一个当执行时间小于100ms的时候

![image](https://user-images.githubusercontent.com/28126886/30782756-ed3c8e66-a16a-11e7-8dda-a7f88899eddd.png)
- 第二个当100ms时，还得分两种情况，因为可能有150ms的，还可能时500ms的等等
> 我们先看类似于150ms的，当执行完后他会立即触发第二次

![image](https://user-images.githubusercontent.com/28126886/30782800-6fc8cf8e-a16b-11e7-9939-27b51d900464.png)
> 那我们来看一下第三种情况，其实根据setInterval的机制，他会抛弃掉中间所发生的，我们用图表来看一看就明白了

![image](https://user-images.githubusercontent.com/28126886/30782840-019f928a-a16c-11e7-9daa-c2e018cee5d3.png)
## 你真的了解——setTimeout
- 第一个，经常会出错的问题就是setTimeout中的this
```js
var i = 0;
const o = {
    i: 1;
    fn: function(){
        console.log(this.i);
    }
}
setTimeout(o.fn, 1000); //0
```
> 这里可以看出，如果是o对象调用的话，就会是1，但是他输出的确实0，因为有两点原因：
1.setTimeout是运行在全局环境下的
2.其实他是发生了下面的步骤：
```js
var a = o.fn;
a();
//只有这样，this才会被绑定到全局上去
```
- 第二个，setTimeout还能干什么？
> 其实不是的，我们先来看一下，setTimeout的一个面试中经常会问到的问题
```js
setTimeout(function(){
    console.log(1);
},0);
console.log(2);
```
> 其实这个特性说来话长，输出的是先2后1，因为setTimeout会把第一个函数放进任务队列，然后走一个event loop，所以会先输出的是2，才会输出1

> 那我们试想一下，这个特性我们可以用来做什么？当事件冒泡的时候，会正常情况下，会先触发子元素，然后在触发父元素，那么我们使用这个特性是不是能让其先触发父元素，在触发子元素，(题主没试过)

这篇文章就写到这儿，后面会出一篇定时器和事件循环的博客总结
