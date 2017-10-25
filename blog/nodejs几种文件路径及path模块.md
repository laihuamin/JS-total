### 前言

最近在写一篇weex的webpack配置，刚刚踩坑了，weekpack中会用到path模块，而对于这个模块，我想抽离出来看一下，因为这个用到的还是比较多的,喜欢的朋友可以点个喜欢，或者去我的[github](https://github.com/laihuamin/JS-total)点个star也行，谢谢支持，举起小手指点一点哦😯。

### node中的路径分类

node中的路径大致分5类，__dirname,__filename,process.cwd(),./,../,其中前三个都是绝对路径

我们先来看一个简单点的例子

假如，我有一个文件的目录结构如下：

```
editor/
  - dist/
  - src/
      - task.js
```
然后我们在task.js文件中写入一下代码

```js
const path = require('path');
console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(path.resolve('./'));
```

在editor目录下运行node src/task.js，我们可以看到结果如下：

```
/Users/laihuamin/Documents/richEditor/editor/src
/Users/laihuamin/Documents/richEditor/editor/src/task.js
/Users/laihuamin/Documents/richEditor/editor
/Users/laihuamin/Documents/richEditor/editor
```

然后我们有可以在src目录下运行这个文件，node task.js,运行结果如下：

```
/Users/laihuamin/Documents/richEditor/editor/src
/Users/laihuamin/Documents/richEditor/editor/src/task.js
/Users/laihuamin/Documents/richEditor/editor/src
/Users/laihuamin/Documents/richEditor/editor/src
```

对比两个输出结果，我们可以归纳一下几点：
1.__dirname:返回的是这个文件所在文件夹的位置
2.__filename:你运行命令代表的是文件所在的位置，不管你运行什么命令，都是指向文件
3.process.cwd():你运行node命令所在文件夹的位置，比如你在src目录下运行，那么就是输出到src为止，下面的同理。

### path

讲完前面三个绝对路径，我倒是挺想来聊聊path这个模块的，这个node模块在很多地方都有应用，所以，对于我们来说，掌握他，对我们以后的发展更有利，不用每次看webpack的配置文件还要去查询一下这个api是干什么用的，很影响我们的效率

[nodeJS/path](https://nodejs.org/api/path.html)

上面那个网站有详细的api，但是我们这里不用都掌握吧，我就讲几个我遇到过的，我觉得webpack等工程配置中会用到的

### path.normalize

这个方法就是把不规范的路径规范化，比如看下面的例子

```js
const path = require('path');
console.log(path.normalize('/foo/bar//baz/asdf/quux/..'));
```
输出结果：
```
/foo/bar/baz/asdf
```

### path.join

```js
const path = require('path');
console.log(path.join('src', 'task.js'));

const path = require('path');
console.log(path.join('dist', 'task.js'));

const path = require('path');
console.log(path.join(''));
```

这么两个的输出结果是：

```
src/task.js
dist/task.js
.
```

他的作用也就显而易见，他有一下几条规则：
1.传入的参数是字符串的路径片段，可以是一个，也可以是多个

2.返回的是一个拼接好的路径，但是根据平台的不同，他会对路径进行不同的规范化，举个例子，Unix系统是”/“，Windows系统是”\“，那么你在两个系统下看到的返回结果就不一样。

3.如果返回的路径字符串长度为零，那么他会返回一个'.'，代表当前的文件夹。

4.如果传入的参数中有不是字符串的，那就直接会报错

### path.parse
我们先来看个例子，在src目录下的task.js写入
```js
const path = require('path');
console.log(path.parse('/Users/laihuamin/Documents/richEditor/editor'));
```
然后运行node src/task.js之后,输出的结果如下：
```js
{ 
  root: '/',
  dir: '/Users/laihuamin/Documents/richEditor',
  base: 'editor',
  ext: '',
  name: 'editor' 
}
```
他返回的是一个对象，那么我们来把这么几个名词熟悉一下：

```
┌────────────────────—————————————————————─┬───────────┐
│          dir                             │    base   │
├────┬                                     ├─────—─┬───┤
│root│                                     │ name  │ext│
"  /  Users/laihuamin/Documents/richEditor / editor ''
└────┴────────——————————————————————───—───┴───—───┴───┘
```

![path.parse](http://laihuamin.oss-cn-beijing.aliyuncs.com/path.parse.png)

这个表格应该展示的很形象，但是我们还是来解释一下这些名词：
1.root：代表根目录
2.dir：代表文件所在的文件夹
3.base：代表整一个文件
4.name：代表文件名
5.ext: 代表文件的后缀名

那我们根据下面的规则，来看一下下面这个例子，最好自己脑子做一遍

```js
const path = require('path');
console.log(path.parse('/Users/laihuamin/Documents/richEditor/editor/src/task.js'));
```

输出的结果：
```
{ 
  root: '/',
  dir: '/Users/laihuamin/Documents/richEditor/editor/src',
  base: 'task.js',
  ext: '.js',
  name: 'task' 
}
```
你做对了么？0.0

### path.basename

那有了前面这个铺垫，想必这个接口猜也能猜的到了。。。。我们看下面这个例子

```js
const path = require('path');
console.log(path.basename('/Users/laihuamin/Documents/richEditor/editor/src/task.js'));
```

输出的结果是：
```
task.js
```

我们还是简单介绍一下，接收两个参数，一个是path,还有一个是ext（可选参数）.
```js
const path = require('path')
console.log(path.basename('/Users/laihuamin/Documents/richEditor/editor/src/task.js', '.js'));
```

输出结果:
```
task
```

### path.dirname

这个接口比basename还要简单，我就不多说了，看例子，看结果
```js
const path = require('path');
console.log(path.basename('/Users/laihuamin/Documents/richEditor/editor/src/task.js'));
```
输出的结果:

```
/Users/laihuamin/Documents/richEditor/editor/src
```
注意一下，接收的参数是字符串类型
### path.extname
这个就是展示文件的扩展名，我们得注意几种情况
```js
const path = require('path');
path.extname('index.html');
path.extname('index.coffee.md');
path.extname('index.');
path.extname('index');
path.extname('.index');
```

输出的结果是：
```
.html
.md
.
''
''
```
自己注意一下这几个情况

### path.resolve

我们通过下面这几个例子先来熟悉一下：

```js
const path = require('path');
console.log(path.resolve('/foo/bar', '/bar/faa', '..', 'a/../c'));
```

输出的结果是

```
/bar/c
```

他就相当于一堆cd操作，我们一步一步看

```
cd /foo/bar/    //这是第一步, 现在的位置是/foo/bar/
cd /bar/faa     //这是第二步，这里和第一步有区别，他是从/进入的，也就时候根目录，现在的位置是/bar/faa
cd ..       //第三步，从faa退出来，现在的位置是 /bar
cd a/../c   //第四步，进入a，然后在推出，在进入c，最后位置是/bar/c
```
但是这个操作和cd还是有区别的，这个路径不一定要存在，而且最后的可以是文件


### path.relative

这个返回的是from到to的相对路径，什么意思呢，我们看下面的例子就知道了.

```js
const path = require('path');
console.log(path.relative('src/bar/baz', 'src/aaa/bbb'));
```
输出的结果是：

```
../../aaa/bbb
```

### 总结
这些比较实用的方法，分享给大家，自己还是老老实实去看weektool的webpack的配置文件了，喜欢的朋友可以点个喜欢，或者去我的[github](https://github.com/laihuamin/JS-total)点个star也行，谢谢支持，举起小手指点一点哦😯。