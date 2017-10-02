### 前言

cookie在web开发中时常被用到，也是面试官喜欢问的一块技术，很多人或许和我以前一样，只知其一不知其二，谈起web存储，都会答localStorage、sessionStorage、还有就是cookie，然后一些区别啊什么的倒背如流，cookie的优缺点也了然于心，但是当你看完这块内容之后，你会对cookie有另外独到的见解，希望以后问到这块技术，或者项目中遇到这个你都会处理，我在实习的过程中，一直在用，所以它真的不是口头说说的那么简单，让我们进入cookie的世界

### cookie是什么

这个讲起来很简单，了解http的同学，肯定知道，http是一个不保存状态的协议，什么叫不保存状态，就是一个服务器是不清楚是不是同一个浏览器在访问他，在cookie之前，有另外的技术是可以解决，这里简单讲一下，就是在请求中插入一个token，然后在发送请求的时候，把这个东西带给服务器，这种方式是易出错，所以有了cookie的出现

![cookie](
http://laihuamin.oss-cn-beijing.aliyuncs.com/cookie.png)

cookie是什么，cookie就是一种浏览器管理状态的一个文件，它有name，也有value，后面那些看不见的是Domain、path等等，我们后面会介绍

### cookie原理

![cookieSend](http://laihuamin.oss-cn-beijing.aliyuncs.com/cookieSend.png)


第一次访问网站的时候，浏览器发出请求，服务器响应请求后，会将cookie放入到响应请求中，在浏览器第二次发请求的时候，会把cookie带过去，服务端会辨别用户身份，当然服务器也可以修改cookie内容

### cookie不可跨域

我就几个例子你就懂了，当我打开百度的网页，我要设置一个cookie的时候，我的指令如下
```js
javascript:document.cookie='myname=laihuamin;path=/;domain=.baidu.com';
```
```js
javascript:document.cookie='myname=huaminlai;path=/;domain=.google.com';
```
当我将这两个语句都放到浏览器控制台运行的时候，你会发现一点,注意，上面两个cookie的值是不相同的，看清楚
![cookieDontDomain](http://laihuamin.oss-cn-beijing.aliyuncs.com/cookieDonDomain.png)
显而易见的是，真正能把cookie设置上去的只有domain是.baidu.com的cookie绑定到了域名上，所以上面所说的不可跨域性，就是不能在不同的域名下用，每个cookie都会绑定单一的域名

### cookie的属性
cookie的属性众多，我们可以来看一下下面这张图，然后我们一个一个分析

![cookieAttr](http://laihuamin.oss-cn-beijing.aliyuncs.com/cookieAttr.png)

#### name
这个显而易见，就是代表cookie的名字的意思，一个域名下绑定的cookie，name不能相同，相同的name的值会被覆盖掉，有兴趣的同学可以试一试，我在项目中切实用到过

#### value
这个就是每个cookie拥有的一个属性，它表示cookie的值，但是我在这里想说的不是这个，因为我在网上看到两种说法，如下：<br/>
1.cookie的值必须被URL编码<br/>
2.对cookie的值进行编码不是必须的，还举了原始文档中所说的，仅对三种符号必须进行编码：分号、逗号和空格

这个东西得一分为二来看，先看下面的图

![cookievalue](http://laihuamin.oss-cn-beijing.aliyuncs.com/cookieValue.png)

我在网上看到那么一种说法：
> 由于cookie规定是名称/值是不允许包含分号，逗号，空格的，所以为了不给用户到来麻烦，考虑服务器的兼容性，任何存储cookie的数据都应该被编码。

#### domain
这个是指的域名，这个代表的是，cookie绑定的域名，如果没有设置，就会自动绑定到执行语句的当前域，还有值得注意的点，统一个域名下的二级域名也是不可以交换使用cookie的，比如，你设置www.baidu.com和image.baidu.com,依旧是不能公用的

#### path
path这个属性默认是'/'，这个值匹配的是web的路由，举个例子：
```
//默认路径
www.baidu.com
//blog路径
www.baidu.com/blog
```
我为什么说的是匹配呢，就是当你路径设置成/blog的时候，其实它会给/blog、/blogabc等等的绑定cookie

#### cookie的有效期
![cookieMaxAge](http://laihuamin.oss-cn-beijing.aliyuncs.com/cookieMaxAge.png)

什么是有效期，就是图中的Expires属性，一般浏览器的cookie都是默认储存的，当关闭浏览器结束这个会话的时候，这个cookie也就会被删除，这就是上图中的——session(会话储存)。

如果你想要cookie存在一段时间，那么你可以通过设置Expires属性为未来的一个时间节点，Expires这个是代表当前时间的，这个属性已经逐渐被我们下面这个主人公所取代——Max-Age

Max-Age，是以秒为单位的，Max-Age为正数时，cookie会在Max-Age秒之后，被删除，当Max-Age为负数时，表示的是临时储存，不会生出cookie文件，只会存在浏览器内存中，且只会在打开的浏览器窗口或者子窗口有效，一旦浏览器关闭，cookie就会消失，当Max-Age为0时，又会发生什么呢，删除cookie，因为cookie机制本身没有设置删除cookie，失效的cookie会被浏览器自动从内存中删除，所以，它实现的就是让cookie失效。

#### secure

![cookieSecure](http://laihuamin.oss-cn-beijing.aliyuncs.com/cookieSecure.png)

这个属性译为安全，http不仅是无状态的，还是不安全的协议，容易被劫持，打个比方，你在手机端浏览网页的时候，有没有中国移动图标跳出来过，闲言少叙，当这个属性设置为true时，此cookie只会在https和ssl等安全协议下传输

- 提示：这个属性并不能对客户端的cookie进行加密，不能保证绝对的安全性

#### HttpOnly

这个属性是面试的时候常考的，如果这个属性设置为true，就不能通过js脚本来获取cookie的值，能有效的防止xss攻击,看MDN的官方文档：
![httpOnly](http://laihuamin.oss-cn-beijing.aliyuncs.com/cookieHttpOnly.png)

#### 关于js操作cookie
document.cookie可以对cookie进行读写，看一下两条指令：
```
//读取浏览器中的cookie
console.log(document.cookie);
//写入cookie
document.cookie='myname=laihuamin;path=/;domain=.baidu.com';
```

#### 服务端如何去设置cookie

关于怎么设置cookie，我们只要打开控制台，看一个http的请求头和响应头中的东西即可明白：
![setCookie](http://laihuamin.oss-cn-beijing.aliyuncs.com/setCookie.png)

服务端就是通过setCookie来设置cookie的，注意点，要设置多个cookie时，得多写几个setCookie，我们还可以从上图看到，请求可以携带cookie给后端。


### 总结
cookie讲了这么多，自己也收获了很多，也希望分享给大家，或许写的不够好，请见谅，如果觉得我写的好的朋友，给个star，[github地址](https://github.com/laihuamin/JS-total)