[原文](https://jsblog.insiderattack.net/event-loop-and-the-big-picture-nodejs-event-loop-part-1-1cb67a182810)

先说1.1总揽：
- Reactor模式
- Reactor模式中的协调机制Event Loop
- Reactor模式中的事件分离器Event Demultiplexer
- 一些Event Demultiplexer处理不了的复杂I/O接口比如File I/O、DNS等
- 复杂I/O的解决方案
- 未完待续

### 前言
nodejs和其他编程平台的区别在于如何去处理I/O接口，我们听一个人介绍nodejs，总是会说是一个**基于v8引擎，没有堵塞，事件驱动**的语言，那这些又意味着什么呢？什么叫‘没有堵塞’和‘事件驱动’？所有的答案都在nodejs的核心——**Event Loop**。
在这一系列的帖子中，我们将一起去描述什么是Event Loop，它是如何工作的，它是如何影响我们的应用的，如何充分的利用他甚至更多。为什么不用一篇代替一个系列的帖子呢，因为这样的话，他就会变成一个很长很长的帖子，我会肯定会错过很多东西，因此我才把它写成一个系列，在第一篇帖子中，我将讲述nodejs如何工作，如何通过I/O，他如何与其他平台一起工作等。

### Reactor Pattern

nodejs工作在一个事件驱动的模型中，这个模型涉及一个事件分离器和事件循环，所有的I/O请求最终将会生成一个事件完成、事件失败或者唤醒其他事件的结果。这些事件将会根据以下规则做处理：

- 1.事件分离器收到I/O请求，之后将这些请求委托给相应的硬件

- 2.曾经被处理过的请求（比如来自可读取文件的数据，来自可读取接口的数据），事件分离器会为要进行的特殊操作添加注册回调程序。

- 3.如果事件可以在事件循环中被处理，那么将有序的被执行，直到循环为空

- 4.如果没有事件在事件循环中，或者事件分离器没有添加任何请求，这个 程序将被完成，否则，程序将从第一步在开始，进行循环操作。

这整个工程的协调机制我们叫做Event Loop

![Event Loop](http://laihuamin.oss-cn-beijing.aliyuncs.com/Event-loop%281%29.jpeg)

Event Loop其实是一个单线程的半无限循环，为什么会说是半无限呢？因为在没有工作需要完成的时候程序会退出。从开发者的角度来说，这些是程序退出的点。

> 注意：不要把Event Loop和Event Emitter弄混淆,Event Emitter和这个机制完全是不同的概念，在最后一篇帖子，我会解释Event Emitter是如何通过Event Loop影响事件的处理。

上面的图是对NodeJs如何工作以及展示一种被叫做Reactor Pattern的主要组件的设计模式的高级概览。
但是真正的复杂度远超于它，那它有多复杂呢？

> Event demultiplexer不是一个在所有os平台中解析所有I/O类型的单一组件。
Event queue在这里展示出来的不是一个单一的队列，在其中所有类型的事件会在队列中排队或者从队列中移除，并且I/O不是唯一一个要排队的事件类型

让我们继续深挖

### Event Demultiplexer

Event Demultiplexer并不是一个现实存在的组件，而是在reactor pattern中的一个抽象概念。

在现实中，Event Demultiplexer 在不同的系统中以不同的名字被实现，比如在linux中叫做epoll, 在MacOS中叫做kqueue，在Solaris中叫event post，在window系统下叫做IOCP等。

nodeJS可以使用Event Demultiplexer提供的底层非阻塞、异步硬件I/O功能。

### Complexities in File I/O

但是令人苦恼的是，不是所有类型的I/O都可以使用Event Demultiplexer被执行，甚至是在相同的操作系统中，支持不同类型的I/O也是很复杂的。

通常来说，epoll, kqueue, event ports和IOCP可以使用非阻塞的方式执行网络I/O。

但是文件I/O就复杂多了，某些系统，比如Linux不支持完全异步的方式去访问文件系统，在MacOS系统中文件系统对事件的发送和接收会有限制（你可以在[这里](http://blog.libtorrent.org/2012/10/asynchronous-disk-io/)了解更多）。

为了提供完全异步而去解决所有文件系统的复杂性是非常复杂的，几乎是不可能的。

### Complexities in DNS

和文件I/O一样，由node API提供某些DNS的功能也存在一定的复杂性。

比如dns.lookup等Node DNS功能访问系统的一些配置文件，例如nsswitch.conf、resolv.conf和/etc/hosts。

上面描述的文件系统复杂性也适用于dns.resolve函数。

### The solution?

因此，引入了一个线程池来支持I/O功能，这些功能不能由硬件异步I/O实用程序（如epoll / kqueue / event ports或IOCP）直接解决。

现在我们知道不是所有的I/O功能都可以在线程池中运行。nodeJS已经尽最大努力来使用非阻塞和硬件的异步I/O方式来完成大部分I/O功能，但是对于一些复杂的、阻塞的I/O还是通过引入一个线程池的方式来解决

### 未完待续
该篇先翻译到这，有些地方翻译的不好请指出，过几天我会继续出第二篇。