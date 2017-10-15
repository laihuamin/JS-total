## host

### 前言

在实习过程中，这个东西用到的确实多，当初只知道我该怎么去配这个东西，预发调试的时候，这个东西用的很多，等会我会先介绍工具，然后再去了解这个东西的原理，工作中应该都能用的到，我去两家公司实习过，确实都用到了，所以，觉得有用的可以收藏，点个喜欢，或者关注都可以，或者在去我的[github](https://github.com/laihuamin/JS-total)点个赞也是极好的，谢谢支持。


### host是什么

hosts文件(域名解析文件)是一个用于储存计算机网络中各节点信息的计算机文件。这个文件负责将主机名称映射到相应的IP地址。hosts文件通常用于补充或取代网络中DNS的功能。和DNS不同的是，计算机的用户可以直接对hosts文件进行控制。
或许可以举个例子，讲的通俗点，我们就拿百度举例子好了，`www.baidu.com`的ip地址长久不发生变化的话，你就可以将百度的网址写到host里面，那样的话我们，以后访问百度这个地址就不在需要DNS解析了，当你输入www.baidu.com之后，会直接去host文件中寻找，直接进行访问。

### host文件位置

![host文件位置](http://laihuamin.oss-cn-beijing.aliyuncs.com/host-location.png)

### 神器推荐——switchHosts

这个工具真的好用，和charles一样，如果已经在用了的朋友可以跳过这一段，还没有用的，我来安利一下，没有接触这款工具的时候，我们修改host文件有以下几种方法：

#### 覆盖法

先将host文件是不允许直接修改的，先将host文件复制出来，然后修改后在复制进去，覆盖掉。

#### mac修改host
[mac修改host](http://www.52mac.com/soft/5966-1-1.html)

#### switchHosts
但是switchHosts用起来就比较简单，按钮切换就行

![switchHosts](http://laihuamin.oss-cn-beijing.aliyuncs.com/switchHost.png)

### host的文件格式

其实host的书写格式很简单，如下：
```
IP地址   主机或者域名   [主机的别名] [主机的别名]
```
host文件的注释格式，如下：
```
# ...
```
我们可以看一下以下这个例子
![host](http://laihuamin.oss-cn-beijing.aliyuncs.com/host.png)

### host文件能干嘛
能干嘛是我们最想要了解到，知道是什么之后，主要作用有以下几点：
- 加速DNS

正如他是什么里面书写的

- 将域名映射到本地

一般我们不改变host文件的时候，我文件中会有以下内容
```
127.0.0.1  localhost localhost.localdomain 
```
这个是代表什么呢，其实localhost大家在开发中也经常用到，而127.0.0.1这个是本地的ip地址，我们可以用localhost:8080访问本地，我们也可以用127.0.0.1:8080访问本地是一个道理.那么我们在本地调试的时候，可以把线上的域名映射到本地，那么一些页面路由的跳转，调试起来会方便很多

### 总结

写这篇文章的目的一来是介绍一个工具switchHosts，二来是让大家了解以下hosts文件，因为很多公司都会自己配一些host。这些host我觉得第一可以方便调试，还有就是让一些域名不受到污染，因为域名绑定的dns是错误的，而host中的ip地址才是正确的。如果觉得我写的还可以的给我的github点个star，谢谢支持