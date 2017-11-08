### 前言
最近在研究webpack的东西，然后也陆陆续续整理了几篇文章，从里面可以学到许多有用的插件和node的一些模块，今天我要介绍的就是hash和chunkhash，这个在webpack打包的过程中经常见到，有兴趣的可以关注一下我的[github](https://github.com/laihuamin/JS-total),点个star，关注和喜欢都行，🙏

### 两者的使用

```js
//使用hash的情况
output: {
  path: path.resolve(__dirname, '../dist/static'),
  publicPath: '/',
  filename: 'static/js/[name].[hash].js',
  chunkFilename: 'static/js/[id].[hash].js'
}
//使用chunkhash的情况
output: {
  path: config.prod.assetsRoot,
  filename: 'static/js/[name]-[chunkhash:16].js',
  chunkFilename: 'static/js/[id]-[chunkhash:16].js',
  publicPath: '/'
},
```
一般使用的时候，会用在文件的产出中，css和js都有，用于打包产出的文件
### hash和chunkhash是什么
大家都知道，用于优化页面性能的常用方法就是利用浏览器的缓存，文件的hash值，就相当于一个文件的身份证一样，很适用于前端静态资源的版本管理，前端实现增量更新的方案之一，那为什么会有两个东西呢，我们娓娓道来，先看两者的定义

- hash

> [hash] is replaced by the hash of the compilation.

compilation的hash值

- chunkhash

> [chunkhash] is replaced by the hash of the chunk.

chunk的hash值

后者很容易理解，因为chunk在webpack中的含义就是模块，那么chunkhash根据定义来就是模块内容计算出来的hash值。
在理解前者之前我们先来看一下compilation有什么作用

### compilation的浅析

webpack的官网文档中[HOW TO WRITE A PLUGIN](http://webpack.github.io/docs/how-to-write-a-plugin.html#compiler-and-compilation)中对这个有一段文字的解析

> A compilation object represents a single build of versioned assets. While running Webpack development middleware, a new compilation will be created each time a file change is detected, thus generating a new set of compiled assets. A compilation surfaces information about the present state of module resources, compiled assets, changed files, and watched dependencies. The compilation also provides many callback points at which a plugin may choose to perform custom actions.

翻译：

> compilation对象代表某个版本的资源对应的编译进程，当你跑webpack的development中间件，每当检测到一个文件被更新之后，一个新的comilation对象会被创建，从而引起新的一系列的资源编译。一个compilation含有关于模块资源的当前状态、被编译的资源，改变的文件和监听依赖的表面信息。compilation也提供很多回调方法，在一个插件可能选择执行制定操作的节点

而与compilation对应的还有一个compiler对象，我们也来介绍一下，这样能够更方便理解compilation

> The compiler object represents the fully configured Webpack environment. This object is built once upon starting Webpack, and is configured with all operational settings including options, loaders, and plugins. When applying a plugin to the Webpack environment, the plugin will receive a reference to this compiler. Use the compiler to access the main Webpack environment.

翻译:

> compiler对象代表的是整个webpack的配置环境，这个对象只在webpack开始的时候构建一次，且所有的操作设置包括options，loaders，plugin都会被配置，当在webpack中应用插件时，这个插件会接受这个compiler对象的引用。通过webpack的主环境去使用这个compiler。

简单的说，compiler是针对webpack的，是不变的webpack环境，而compilation这个就是每次有一个文件更新，然后会重新生成一个，那么当你一个文件的更新，所有的hash字段都会发生变化，这就很坑了，本来我们做增量更新就是想改的那个文件发生变化，但是如果全部都发生变化就没有意义了，我们来看一下实际操作中的例子：

- 修改前文件的hash

![修改前文件的hash](http://laihuamin.oss-cn-beijing.aliyuncs.com/before-hash.png)

- 修改后文件的hash

![修改后文件的hash](http://laihuamin.oss-cn-beijing.aliyuncs.com/after-hash.png)

而且从上图中可以看出，每次有文件更新，会产生一个新的compilation，从而会用新的compilation来计算得出新的hash，而且每个文件带有的hash值还是一样的，这样的肯定达不到我们的要求，那么如何避免这个问题呢？——chunkhash

### chunkhash

chunkhash是由chunk计算的得出的hash值，chunk指的是模块，这个hash值就是模块内容计算出来的hash值

- 修改单个文件前的chunkhash

![修改前的chunkhash](http://laihuamin.oss-cn-beijing.aliyuncs.com/before-chunkhash.png)

- 修改后的文件的chunkhash

![修改后的chunkhash](http://laihuamin.oss-cn-beijing.aliyuncs.com/after-chunkhash.png)

这里我们还得提一个问题，比如像vue这些框架，把js和css共同放在一个里面会时，我们一般会用一个插件叫extract-text-webpack-plugin，这样我们就能把css单独打包，但是这样就会产生一个问题，这样打包出来的css的chunkhash和js的chunkhash会不会是一样的呢，其实我这么问了，当然是会的啦。我们可以看一下下面两张图片。

![chunkhash计算出的js](http://laihuamin.oss-cn-beijing.aliyuncs.com/chunkhash-js.png)
![chunkhash计算出的css](http://laihuamin.oss-cn-beijing.aliyuncs.com/chunkhash-css.png)

其实也很简单，webpack的理念就是为了js的打包，style标签也会视为js的一部分，那么这我们会发现，还是有坑，当我们只改css的时候，js也会同时发生改变，那么我们还是没有做到严格意义上的增量更新，那么我们又该怎么解决呢？

### contenthash

使用方式如下：
```js
new ExtractTextPlugin({
  filename: 'static/css/[name]-[contenthash:16].css',
  allChunks: true
})
```
这样我们看打包后的效果。

![chunkhash计算出来的js](http://laihuamin.oss-cn-beijing.aliyuncs.com/chunhash-js.png)
![contenthash计算出来的css](http://laihuamin.oss-cn-beijing.aliyuncs.com/content-css.png)

### 总结

静态资源的管理是前端很重要的一块，最近由于业务转型，自己也在尝试换个架子，那么肯定得从研究webpack入手，现在webpack已经是必不可少的工具之一，这篇博文有借鉴网上的，如有侵权删，但是研究得出的结论我会记忆一生，所以建议看完这篇的小伙伴自己动手配置一边，喜欢的可以去github上点个star，喜欢和关注都行，最近有点忙，但是我还是每天会写一点博文。谢谢大家