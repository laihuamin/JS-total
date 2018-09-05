最近一直在研究event loop相关的，首先我们可以从[HTML standard](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue)，标准中对于event loop的介绍。

> To coordinate events, user interaction, scripts, rendering, networking, and so forth, user agents must use event loops as described in this section. There are two kinds of event loops: those for browsing contexts, and those for workers.

为了协调事件，用户交互，脚本，渲染，网络请求，等等，必须用到event loop。而event loop有两种类型，一种browsing contexts和另一种workers。


### task

一个event loop中会有一个或者多个task队列。而来源不同的task将会放入到不同的task中。

典型的任务源：

- DOM操作
- 用户交互（点击事件之类的）
- 网络请求
- script代码
- setTimeout/setInterval
- I/O
- UI交互
- setImmediate(nodejs环境中)

大致有这么几种，关于macrotask这个说法，并没有在标准中被提及。

### Microtask

一个事件循环只有一个Microtask，以下几种任务被认为是microtask

- promise
- promise回调（then和catch）
- MutationObserver
- process.nextTick(nodejs环境中)


### 关于EL的机制

可以观看标准的8.1.4.2 processing model中的解释，过程很长，很复杂。

但是其实总结的来说就是以下这段话：

`先运行一个task,然后再去清空Microtask队列，在运行一个task,然后再去清空Microtask队列`

那么我们来看一个例子：

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

当然，答案不重要，其中的过程能理解最重要。

- 循环1

运行过程：
script脚本被当作一个task，放入到task队列中

【task队列】：
1、将定时器set1和set2放入到task队列中。
2、将Promise放入到microtask队列中
3、输出start

【microtask队列】：
1、执行promise的回调，输出promise3

- 循环2

运行过程：
在task队列中，将set1当作一个task。

【task队列】：
1、输出timer1
2、将promise放入到microtask队列中

【microtask队列】
1、执行promise的回调，输出promise1

- 循环3

运行过程：
在task队列中，将set2当作一个task。

【task队列】：
1、输出timer2
2、将promise放入到microtask中
3、将set3放入到task队列中

【microtask】
1、执行promise的回调，输出promise2

- 循环4

运行过程：
在task队列中，将set3当作一个task。

【task队列】：
1、输出timer3
2、经过 microtask checkpoint检测，microtask队列为空，跳过。

- 答案：

```
start
promise3
timer1
promise1
timer2
promise2
timer3
```