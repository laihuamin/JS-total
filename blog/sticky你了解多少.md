## sticky你了解多少
### 前言
以前呢position只有4种属性，但是到了css3之后呢，又添了这个家伙，刚接触css的时候也不知道，最近业务中碰到的次数越来越多了，就想写一篇自己研究的，让大家参考参考，可能写的不够好，不过，看了之后觉得喜欢的可以点个喜欢，或者点个关注，博文中有几篇高赞的也可以看一看，或者觉得博主写的不错，可以给我的[github](https://github.com/laihuamin/JS-total)点个star

### css定位
在讲什么是sticky之前，我们先来补一下css中的三个定位，知道的朋友可以跳过这一段,我们先来看一下没有定位的默认状态，一下都会以这个举例：

![position-static](http://laihuamin.oss-cn-beijing.aliyuncs.com/position-static.png)

#### 相对定位
相对于其正常位置进行定位,但是不影响其他元素的偏移。元素的位置通过 left, top, right 以及 bottom 属性进行规定。
![position-relative](http://laihuamin.oss-cn-beijing.aliyuncs.com/position-relative2.png)
#### 绝对定位
相对定位的元素并未脱离文档流，而绝对定位的元素则脱离了文档流。在布置文档流中其它元素时，绝对定位元素不占据空间。绝对定位元素相对于最近的非 static 祖先元素定位。当这样的祖先元素不存在时，则相对于根级容器定位。举个例子：
![position-absolute](http://laihuamin.oss-cn-beijing.aliyuncs.com/position-absolute.png)

#### 固定定位
固定定位与绝对定位相似，但元素的包含块为 viewport 视口。该定位方式常用于创建在滚动屏幕时仍固定在相同位置的元素。
![position-fixed](http://laihuamin.oss-cn-beijing.aliyuncs.com/position-fixed.png)

### 什么是sticky
MDN给出的解释是
> 粘性定位是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。

MDN中的说法以及例子

![](http://laihuamin.oss-cn-beijing.aliyuncs.com/MDN.png)

可以，我的实践结果告诉我，MDN给的那个解释有错误，可能是我理解的不够深，但是我把我的探索过程和大家分享，要是大家觉得我哪里说错了，一定要在评论中纠正我，这样我可以及时修改，以免误导大家.

首先我们来看一下，relative和fixed定位下，滚动会有什么样的效果，我们来看几张图片

![relative](http://laihuamin.oss-cn-beijing.aliyuncs.com/relative.png)

![fixed](http://laihuamin.oss-cn-beijing.aliyuncs.com/fixed.png)

我来大致介绍一下这两个情况下滚动会发生些什么，fixed是根据html定位的，他会一直呆在原地，而relative就不一样，他会跟着滚上去，有兴趣的可以自己去jsbin上试一试，亲身体验一下，接下来我要和大家讲讲我们今天的主角，sticky，我们也来看几张图,我们先来研究他到底是基于什么定位的。

![未滚动](http://laihuamin.oss-cn-beijing.aliyuncs.com/sticky1.png)

![滚动](http://laihuamin.oss-cn-beijing.aliyuncs.com/sticky2.png)

笔者自己玩过了，总结出来一套：

1、其实sticky是根据窗口定位的，但是这个有个前提，不能脱离body的范围，我们可以从1和2看到，当top小于body的margin的时候，它的top是不起作用的，只有当向上滚了50以上之后，你会发现，sticky是基于窗口定位的，笔者很巧的用了100和50这两个值，其实我为什么说和MDN上有区别，就是这个阈值范围是错的,你们可以自己体验一把，可以将margin设成100，top设置成30，你就可以看出阈值是70.

2、第二点，我在放两张图，是sticky和fixed的区别。

![fixed](http://laihuamin.oss-cn-beijing.aliyuncs.com/fixed1.png)

![sticky](http://laihuamin.oss-cn-beijing.aliyuncs.com/sticky3.png)

你会发现，其实fixed属于脱离文档流，sticky不属于脱离文档流，这点和relative很像，不影响布局，但是会根据位置偏移，但是也没有MDN中所说的阈值变化一说，只能说很像。

- 注意：

这两点是我自己实践出来的，和权威有区别，你们也可以试试，然后我们在评论中可以探讨。

### 兼容性
关注新东西时，兼容性总是关键，掌握他也得从这点入手，这样才能挑战移动端的各种机型等等。
![sticky兼容性](http://laihuamin.oss-cn-beijing.aliyuncs.com/stickyUse.png)

我们先看pc端的，IE是完全不支持的，在后面我会讲一种js来实现sticky的效果，其他兼容性还可以，我们可以用到浏览器前缀，来更好的兼容它。何为浏览器前缀，我们举个例子:

```
.sticky { 
	position: -webkit-sticky; 
	position:sticky; 
	top: 15px;  
}
```

### 不兼容的情况
我们先要搞清楚sticky这个属性是怎么来的，sticky的提出是因为屏幕越做越大，但是屏幕大了不适宜阅读，网页主体大小没有多大变化，这样就会导致很多空白区，这些空白区用来干什么呢，打广告呗，还有就是用来做导航条，不需要考虑内容已开始就被导航条遮盖的情况，导航条的情况属于大多数，我们可以用js来模拟一下：

HTML
```html
<div class="header"></div>  
```

CSS
```css
.sticky { 
	position: fixed;
	top: 0;
} 
.header {
	width: 100%; 
	background: red; 
	height:100px;}
```

JS
```js
const header = document.querySelector('.header'); 
const origOffsetY = header.offsetTop; 
function onScroll(e) { 
	window.scrollY >= origOffsetY ? header.classList.add('sticky') : header.classList.remove('sticky'); 
} 
document.addEventListener('scroll', onScroll);
```

这个原理就是监听滚动事件，然后给元素添加position：fixed属性，我模拟的这个有两点做的不够好：

1、滚动事件触发的太频繁，没有用节流函数，也算我懒吧，大家用的时候要注意
2、还有一点就是那个我上面指出的第二点，未滚动时，那个类似于relative的状态我模拟不出来，或者就是那个第二点我理解错误，有什么想法，可以一起在评论中交流。

### 总结
这种属性，自己摸索一边真的有助于掌握，这篇博文，是我摸索的结果，我信我自己没有出错，如果有意见不符可以在评论中探讨，本来还有几个例子的，但是我觉得直接放代码晦涩难懂，又没有一种好的方式，不知道掘金允不允许将jsbin嵌到页面中，自己也没尝试，不过，我觉得我已经把特性搞懂了，也尽最大努力把它讲明白，还是建议自己实践一遍，如果喜欢给个喜欢，关注，或者去我的[github](https://github.com/laihuamin/JS-total)点个star，对我的支持是我在前端探索的最大动力，谢谢。