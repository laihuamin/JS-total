## 一篇关于ajax的故事
### 前言
我为什么要写这个呢，以前面试的时候问过这些，还有就是我个人来看，学习前端其实闭包啊，原型啊，等等的问题，被写烂了，但是关于数据交互这一块的很少，我们在业务中，数据交互用的并不占少数，整理一篇给大家，也给我自己，希望喜欢的点一个关注[GitHub](https://github.com/laihuamin/JS-total)
### ajax

#### 什么是ajax

其实呢，说起ajax，大家都不陌生，但是这里我还是详细的介绍一下，也好为我下一篇博文做基础，下一篇内容是和数据交互相关的，ajax全称Asynchronous JavaScript and XML（异步的javascript和XML）,为什么会有这么一种技术的出现呢，因为前端时常会有这样的需求，我们只要局部刷新，不需要整一个刷新的时候，便吹生了这样的技术ajax，具体它是怎么实现的我们下面娓娓道来。

#### ajax实现的基本流程

其实以前看到过一个变态的面试题，让你自己写一个原生的ajax，如果你让我查接口我能写的出来，但是让我默写我办不到，因为现在用的基本都是jquery封装的ajax，确实人家封装的很好，所以我们只要懂得了ajax的怎么实现的基本流程，我觉得对于像我这样的应届生够了。

ajax的基本流程：

- 页面js脚本实例化一个XMLHttprequest对象
- 设置好服务端给定的url、必要的查询参数、回调函数等
- 向服务端发起请求，服务端处理请求之后的结果返回给页面
- 触发原先订好的回调函数，来获取数据

ajax实现局部刷新的流程也是这样，因为我们可以发出ajax向服务器获取这个局部相关的少量数据，然后运用这部分数据来更新页面

#### ajax追本溯源
其实呢，ajax是在2005年由google的Jesse James Garrett发表了一篇文章中提出的，它依赖于XMLHttp实现的，XMLHttp是1998年由微软提出的，google用ajax开发Google Maps等产品，运用若干年之后，才在文章中发表，那么其实ajax是给Google Maps这样的复杂应用而生的，但是，我想谈谈ajax带来的副产品，表单提交

#### ajax在数据交互中的应用
我觉得ajax用于数据交互，对于我这些初学者更应该把握好两点，一点是GET和POST的区别，重中之重，还有一点，可以了解一下什么是RESTFUL风格，其他更加深人的可以结合promise规范，看一下jquery的ajax是怎么封装的等等，这篇博文不会写这些，我打算后期出一篇promise规范相关的，把现在的一些fetch等新出来的数据交互手段进行归纳，举个ajax应用的例子：
```js
$.ajax({
	type: "post",  //数据传输的方法
	url: ...,  //一般这里会是后端给你的接口路径
 	data: {data},//这里是一个提交的数据内容
	success: function(){}	//成功后进行的操作
	error: function(){}		//数据审核不通过，后端一般会返回false然后进行的操作
```


#### GET和POST的区别
碰到一样东西时，我们应该先去查文档，把基本概念搞清楚，然后在开始分析利和弊

- 基本概念

其实在MDN的解释中就可以清楚的发现两者的区别：

> HTTP GET 方法请求指定的资源。使用 GET 的请求应该只用于获取数据。

> HTTP POST 方法 发送数据给服务器. 

- 安全性

关于两者的安全性，这个毋庸置疑，但是你只知道POST是比GET安全，但你不知道，为什么？

![](http://mmbiz.qpic.cn/mmbiz/VUGnGjllRE5vZcld02bjOjWPPBRXYdhLVXZkPZibSibtVZoIkDcBTQJ3mFibpNtqOSNTLDs01s2rmB6PyCoibjczxQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

深入了解一点的会发现，get方式的http请求是这样的

![GET](http://laihuamin.oss-cn-beijing.aliyuncs.com/GET.png)

你的参数会被拼接到url上，然后进行传输，这样就会又一个问题，参数都是可见的，就像我截图的一样，而POST就不一样

![POST](http://laihuamin.oss-cn-beijing.aliyuncs.com/POST.png)

涂了点，因为接口是公司的，POST方式url后面是不带参数的，POST放在Request body中（这点是来自W3C）

- 书签

GET可作为书签收藏，因为参数是拼在URL上的，POST就不可以了

- 历史

GET请求的参数能存在浏览器历史中，而POST不能，原因也在于一个参数是拼接在url中，而一个不是

- 对数据长度的限制

这一点我想要好好谈谈，GET的数据长度限制来源于哪里，还是上面讲的一点，GET的参数是拼接在URL中的，理论上URL中的参数是可以无限加长的，但是这样势必会给浏览器和服务器带来很重的负担，所以业界有一种不成文的规定，大多数浏览器在URL的限制是2K，而大多数服务器的限制在64K。
在这点上很多人都会有误区，我们得明白一下几点：

1.http是没有限制GET和POST的传递数据长度的
> The HTTP protocol does not place any a priori limit on the length of a URI. Servers MUST be able to handle the URI of any resource they serve, and SHOULD be able to handle URIs of unbounded length if they provide GET-based forms that could generate such URIs. A server SHOULD return 414 (Request-URI Too Long) status if a URI is longer than the server can handle (see section 10.4.15). 

>  Note: Servers ought to be cautious about depending on URI lengths above 255 bytes, because some older client or proxy implementations might not properly support these lengths.

2.规定是来源于浏览器和服务器

- 对数据的编码

这点也是跟GET是拼接在URL上一样，那么GET的参数只能进行URL编码，而POST就不一样，可以进行二进制编码等

- 性能方面

这个方面就是GET比较出色了，这一点自己也是在整理的时候才关注起来的，很多知识来源于网络，所以，大家可以看，如果和你实际情况不符，可以在评论中提出：
> GET产生一个TCP数据包；POST产生两个TCP数据包。
对于GET请求来说，是把http header和data一起发送给服务器，然后服务器会返回200。
但是POST就不一样，是先发送http header，然后服务器响应100后，在将data发送给服务器，然后服务器响应200

对于性能而言，一个走了一趟，一个走了两趟，明显是走一趟的来的快捷

- 总结

全部使用POST明显是不合理的，在一些数据不敏感，请求频繁，数据量小于浏览器限制2K，这样的情况还是选择GET会比较合理。

#### 结语
关于RESTful风格，笔者也在探索阶段，现在只会书写，但是为什么是这样写的，这样的格式是怎么来的，自己也不清楚，哈哈哈，不过，可以给大家推荐几本书，有兴趣的可以看一下《REST in Practice》,还有一个是REST风格的提出者发表的[论文(英文版)](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)

#### 文章中参考的博文
[来源知乎](https://zhuanlan.zhihu.com/p/22536382)
[来源知乎](https://www.zhihu.com/question/28586791)

#### 备注
希望喜欢的朋友点个喜欢，也可以关注，要是能给博主的[GitHub](https://github.com/laihuamin/JS-total)点个star就更好了，大家一起努力，🙏🙏🙏

	