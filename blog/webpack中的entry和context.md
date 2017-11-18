### 前言
配置webpack的环节中，entry是必不可少的一个环节，我最近做了一篇关于webpack的分享，然后也想做一个关于webpack的一个系列，讲讲我对于webpack的理解，以及我对于我们工程架构的理解。有兴趣的也可以关注一下我的[github](https://github.com/laihuamin/JS-total)，可以点个关注，喜欢或者收藏谢了0.0

### entry和context——是什么

在能有什么用之前，然我们前去了解一下他们两个到底是什么，其实entry和context从英文层面上我们就可以清晰的知道，一个是入口的意思，还有一个是上下文的意思，那么我们想知道他们到底有什么用，请看下面。

### context

[关于context的demo](https://github.com/laihuamin/webpack-domes/tree/master/context)

其实这个目录结构是这样的，有兴趣的可以去看一下这个小demo，是这个上下文的示意。

![文件的目录结构](http://laihuamin.oss-cn-beijing.aliyuncs.com/context.png)

目录中的dist是我打包出来的文件，而app中的文件是我书写的原文件，而webpack.config.js中的代码是这样的

```
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'app'),
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}
```
看这段代码，其实我们就可以猜到context的作用了，如果没有这个context，那我们的entry应该怎么写，是不是应该书写成
```
'./app/main.js'
```
还好我app中就一个main.js，要是来10个或者100个，那要多写多少个app，所以我们可以看到context的作用。他就是会将entry的根路口指向app这个文件夹

### entry

讲完context，那么我们应该要来讲讲什么呢，当然是entry入口文件啦，对于一个webpack打包配置文件来说，entry是我们最初配置的时候就该解决的问题。

对于entry这个配置项来说，我们可以把他分类型来看，entry一共可以分为string、array和object。其他的都是这几种的组合。


#### string

对于字符串，其实这是一个单一的入口，是一个一对一或者一对多的关系，在现在的单页应用SPA上面用的很多，我们可以来看一下我们的[demo](https://github.com/laihuamin/webpack-domes/tree/master/entry/string)。

在demo中我们的目录结构是这样的

![目录结构](http://laihuamin.oss-cn-beijing.aliyuncs.com/entry-string.png)

我们可以看一下webpack.config.js中的代码：

```
module.exports = {
    entry: './main.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    }
}
```

这是个一对一的关系，一个入口，产出一个bundle.js，所以这个是举个例子，比较简单，但是在真实的单页应用中，不会这么简单，他会是一个一对多的关系，一个入口，然后webpack会解析依赖然后将其打包多个文件。


#### array

讲完字符串我们来讲讲数组是个什么关系呢，数组其实是多对一的关系，就是入口可以是多个文件，但是出口会是一个模块，这个可以用在哪里呢，比如，我们项目中肯定会有很多公用的模块，那么这些模块有必要打包到很多个文件中么，答案当然是没有这个必要的，放一个里面，我们只要在html中引入一个就行了，多省事，还会用在这种情况上，比如jquery和lodash这样的不相互依赖的文件可以放到一个模块中。那我们来看看具体的[demo](https://github.com/laihuamin/webpack-domes/tree/master/entry/array)

在demo中我们的目录结构是这样的

![目录结构](http://laihuamin.oss-cn-beijing.aliyuncs.com/entry-array.png)

我们可以看一下webpack.config.js中的代码：

```
module.exports = {
    entry: ['./main1.js', './main2.js'],
    output: {
        path: __dirname,
        filename: 'bundle.js'
    }
}
```

到这里我们可以打开index.html文件看一下，是不是main1.js和main2.js中的两条代码都在bundle.js中了，所以，这个多对一的关系可以很好的用到真实的项目中。


#### object

最后一个对象，不用说大家应该也猜得到，当然是多对多的关系。也是在多页面应用中我们经常用到的，我这里举一个简单点的例子，具体的[demo](https://github.com/laihuamin/webpack-domes/tree/master/entry/object)


在demo中我们的目录结构是这样的

![目录结构](http://laihuamin.oss-cn-beijing.aliyuncs.com/entry-object.png)

我们可以看一下webpack.config.js中的代码：

```
module.exports = {
    entry: {
        one: './main1.js',
        two: './main2.js',
        'path/to/main': './main3.js'
    },
    output: {
        path: __dirname,
        filename: '[name].js'
    }
}

```

我们可以看到，前两个entry对象的键值对还是比较正常的，但第三个的时候我却把它换成了一个路径名，但是webpack很聪明，看到目录结构你就知道，其实webpack会解析这个路径，然后他会帮我们创建相对应的路径，比如，path文件夹中有to文件夹，在to文件夹中还有main.js。

但是在实际的项目中，entry肯定不会变的这么简单，我可以给大家提供几个例子，关于entry对象的收集，因为如果是数组和字符串，在单页应用中算简单的，但是在多页面应用中却是困难重重。

### 实际项目中的entry

![待收集资源的目录结构](http://laihuamin.oss-cn-beijing.aliyuncs.com/edu_h5.png)

收集entry对象的函数

```
const glob = require('glob')
const path = require('path')

const GLOB_FILE_PATH = './src/pages/**/index.js'
const CUT_PATH = './src/pages/'

exports.getEntries = function(argv){
    let  paths = glob.sync(GLOB_FILE_PATH)
    let  entries = {}
    for (let i = 0; i < paths.length; i++){
        let pathName = path.dirname(paths[i]).replace(new RegExp('^' + CUT_PATH), '')
        entries[pathName] = paths[i]
    }
    return entries
}
```

这里用正则来提取的键值对，有兴趣的同学也可以去了解一下glob这个文件读取模块。

### 总结

这算是我的第二篇webpack的文章，也是希望能给我个人的webpack系列文章有一个很好的开始，写写大家的支持，我会将webpack的配置项一个一个拿出来讲，然后配上demo这样希望能让大家更好的理解，这期讲了比较简单点的context和entry。下期将会带来output，希望喜欢的可以去我的[github](https://github.com/laihuamin/JS-total)上面点个star，文章属于纯原创，转载请注明出处谢谢