关于事件这一块在《深入浅出的nodejs》中很少讲到，书里面只是在第三章提及了4个API方法，比如两个定时器（setTimeout和setInterval），process.nextTick()和setImmediate。

[浏览器中的event loop](https://github.com/laihuamin/JS-total/issues/43)

### 前篇回顾

```js
setTimeout(()=>{
    console.log('timer1')

    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)

setTimeout(()=>{
    console.log('timer2')

    Promise.resolve().then(function() {
        console.log('promise2')
    })
    setTimeout(() => {
    	console.log('timer3')
    }, 0)
}, 0)

Promise.resolve().then(function() {
    console.log('promise3')
})

console.log('start')
```

浏览器中输出结果：

```js
start
promise3
timer1
promise1
timer2
promise2
timer3
```
这个输出结果的原因我们已经在上一篇文章中说明，本章就不多加赘述。

在nodejs中，运行却能得到不同的结果，让我们先来过一下node的事件模型。
```js
start
promise3
timer1
timer2
promise1
promise2
timer3
```
### node中的事件循环模型

node的事件循环分为6个阶段

[源代码地址](https://github.com/libuv/libuv/blob/v1.x/src/unix/core.c#L348-L397)有兴趣的可以去看一下源代码

![node-phase.png](https://i.loli.net/2018/09/03/5b8c84aca9792.png)

六个阶段的功能如下：

- timers：这个阶段执行定时器队列中的回调，比如setTimeout()和setInterval()
- I/O callbacks：这个阶段执行几乎所有的回调。但是不包括close事件，定时器和setImmediate的回调。
- idle,prepare：仅在内部使用。
- poll：等待新的I/O事件，node会在一些特殊的情况下使用
- check：setImmediate()的回调会在这个中执行。
- close callbacks：例如socket.on('close', ...)执行close的回调。


#### poll阶段

当有数据或者连接传入事件循环的时候，先进入的是poll阶段，这个阶段，先检查poll queue中是否有事件，有任务就按先进先出的顺序执行回调，如果队列为空，那么会先检查是否有到期的setImmdiate，如果有，将其的callback推入check队列中，同时还会检查是否有到期的timer，如果有，将其callback推入到timers队列中。如果前面两者都为空，那么直接进入I/O callback，并执行这个事件的callback。

#### check阶段

check阶段专门用来执行setImmidate的回调函数。

#### close阶段

用于执行close事件的回调函数

#### timer阶段

用于执行定时器设置的回调函数

#### I/O callback阶段

用于执行大部分I/O事件的回调函数。

#### process.nextTick

这个钩子在node的事件循环模型中没有提及，但是node中有一个特殊的队列，nextTick queue。在node事件循环进入到下一个阶段的时候，都会去检测nextTick queue中有没有清空，如果没有清空，那么就会去清空nextTick queue中的事件。


### 循环过程

在[官网的文档](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)里面有那么一段话：

> When Node.js starts, it initializes the event loop, processes the provided input script (or drops into the REPL, which is not covered in this document) which may make async API calls, schedule timers, or call process.nextTick(), then begins processing the event loop.

- 循环开始之前

1、所有同步任务
2、脚本任务中发送的api请求
3、规划定时器同步任务的生效时间
4、执行process.nextTick()

- 开始循环

> 第一种情况

1、清空当前循环内的 Timers Queue，清空NextTick Queue，清空Microtask Queue
2、清空当前循环内的 I/O Queue，清空NextTick Queue，清空Microtask Queue
3、进入poll阶段
4、清空当前循环内的 Check Queue，清空NextTick Queue，清空Microtask Queue
5、清空当前循环内的 Close Queue，清空NextTick Queue，清空Microtask Queue

> 第二种情况

1、先进入poll阶段
2、清空当前循环内的 Check Queue，清空NextTick Queue，清空Microtask Queue
3、清空当前循环内的 Close Queue，清空NextTick Queue，清空Microtask Queue
4、清空当前循环内的 Timers Queue，清空NextTick Queue，清空Microtask Queue
5、清空当前循环内的 I/O Queue，清空NextTick Queue，清空Microtask Queue

- setTimeout 和 setImmediate 的区别

```js
setTimeout(() => {
  console.log('timeout')
}, 0);

setImmediate(() => {
  console.log('immediate')
});
```

直接运行脚本，输出的结果是

```js
timeout
immediate
```

当我们把他放在同一个I/O循环中运行

```js
const fs = require('fs');

fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout')
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })
})
```

输出的结果是

```js
immediate
timeout
```

- process.nextTick和microtask

```js
process.nextTick(() => {
    console.log('nextTick')
})

Promise.resolve().then(() => {
    console.log('promise')
})
```

输出的结果是

```js
nextTick
promise
```

nodejs中的实现方式：microtask queue的任务通过runMicrotasks将microtask queue中的task放入到nextTick中，所以microtask的任务会在nextTick queue之后执行。

- process.nextTick() 和 setImmediate()

> 书本中是推荐使用setImmediate()，用户如果递归调用process.nextTick()的时候，会造成I/O被榨干。而使用setImmediate，只会在check中执行，不至于异步调用的时候无法执行。