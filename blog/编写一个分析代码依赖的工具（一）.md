一个源码中，理不清的依赖是最烦的，让我们继续往下看，如何实现它，__工具的[github](https://github.com/laihuamin/JS-structure)地址__,觉得可以的可以点个star，__[博客](https://github.com/laihuamin/JS-total)的地址__，喜欢的也可以点个star，谢谢。

__先让我们来看看最后的效果如何：__

![all-js-analysis](http://laihuamin.oss-cn-beijing.aliyuncs.com/all-js-analysis.png)
![one-analysis](http://laihuamin.oss-cn-beijing.aliyuncs.com/one-analysis.png)

选中的情况下，会把其余的都隐藏，显示它引入的依赖。

## 怎么实现它

![](http://laihuamin.oss-cn-beijing.aliyuncs.com/%E9%80%80%E5%90%8E%E6%88%91%E8%A6%81%E8%A3%85%E9%80%BC.jpeg)
![](http://laihuamin.oss-cn-beijing.aliyuncs.com/%E7%AC%AC%E4%B8%80%E6%AD%A5%E9%97%AE.png)

__我们先了解echart和node的fs和path模块，这是编写的基础。fs的几个处理文件的方法，path几个处理路径的方法，还有echart中的和弦图，我们要整理出来的nodes节点和links依赖关系。__

![](http://laihuamin.oss-cn-beijing.aliyuncs.com/%E9%BC%93%E6%8E%8C.jpg)

![](http://laihuamin.oss-cn-beijing.aliyuncs.com/%E7%AC%AC%E4%BA%8C%E6%AD%A5%E9%97%AE.png)

__第二步，先定义一些常量，然后我们要用fs模块去读取文件夹中的文件的filename和pathname，我们还要判断一个文件是不是文件夹，如果是文件夹，我们要递归调用的个函数，继续读取，直到所有的都遍历完毕。代码如下：__

- 定义常量

```js
// 该文件是这个npm包用到的常量

// 需要忽略的文件夹
module.exports.IGNORE_DIR = ['node_modules', '.git', 'dist', 'build', 'test', '.DS_Store', '.gitignore', 'package-lock.json', 'README.md'];

// 符合标准的文件的扩展名
module.exports.INCLUDE_EXT = ['.js', '.json', '.node']
```

- 收集文件的filename和pathname
```js
var fs = require('fs');
var path = require('path');
// 引入我们定义好的常量
var extName = require('./constant.js').INCLUDE_EXT,
    ignoreFile = require('./constant.js').IGNORE_DIR,
    res = {
        filename: [],
        pathname: []
    };

function getFileName(dir, addIgnore) {
    var files = fs.readdirSync(dir),
        ignoreList = [];

    // 判断不需要的文件
    if(Array.prototype.isPrototypeOf(addIgnore)) {
        ignoreList = addIgnore.concat(ignoreFile);
    } else {
        ignoreList = ignoreFile;
    }

    // 收集文件名称和所属路径

    files.forEach(function(item) {
        var extname = path.extname(item),
            currentPath = path.join(dir, item),
            isFile = fs.statSync(currentPath).isFile(),
            isDir = fs.statSync(currentPath).isDirectory();
        
        // 先在ignore的列表中寻找，如果找到直接return
        if (ignoreList.indexOf(item) !== -1) {
            return;
        } else {
            // 判断他是不是我们需要的文件名
            if(isFile && extName.indexOf(extname) !== -1) {
                res.filename.push(item);
                res.pathname.push(currentPath);
            } else if (isDir) {
                // 如果是文件夹，调用函数继续处理
                getFileName(currentPath);
            }
        }
    })
    return res;
}

```
![](http://laihuamin.oss-cn-beijing.aliyuncs.com/%E9%BC%93%E6%8E%8C1.jpg)

你会发现这里的输出结果整理一下已经可以作为echarts的节点了。

![](http://laihuamin.oss-cn-beijing.aliyuncs.com/%E7%AC%AC%E4%B8%89%E6%AD%A5%E9%97%AE.png)
__第三步的话，我倾向于把links这个关系整理出来，那么我们要做的活就是用fs读取每一个文件，然后在用正则，将import和require的文件整理到target中，这样我们就得未经处理的links。那我就直接上代码了！！！__

![](http://laihuamin.oss-cn-beijing.aliyuncs.com/%E9%BC%93%E6%8E%8C2.png)

```js
var fs = require('fs'),
    path = require('path'),
    reqReg = /require\(['|"](.*?)['|"]\)/g,
    impReg = /import\s.*?['|"](.*?)['|"]/g,
    resDep = [];

function getDepend(res, dir) {
    // 根据上一个文件res获得的pathname数组进行依赖收集
    res.pathname.forEach(function(item, index) {
        // 读取文件
        var data = fs.readFileSync(item, 'utf-8'),
            results = [];
            // 正则匹配require
        while((results = reqReg.exec(data)) !== null) {
            var link = {
                source: res.pathname[index],
                target: results[1],
                weight: 1,
                name: '依赖'
            };
            resDep.push(link);
        }
        // 正则匹配import
        while((results = impReg.exec(data)) !== null) {
            var link = {
                source: res.pathname[index],
                target: results[1],
                weight: 1,
                name: '依赖'
            };
            resDep.push(link);
        }
    });
    return resDep;
}
```
 
![](http://laihuamin.oss-cn-beijing.aliyuncs.com/%E7%AC%AC%E5%9B%9B%E6%AD%A5%E9%97%AE.png)
__第四步的话，下回在讲吧，要跑去要饭了__


![](http://laihuamin.oss-cn-beijing.aliyuncs.com/%E8%A6%81%E9%A5%AD.jpg)

## 总结
最后在死皮赖脸的推荐一下[工具](https://github.com/laihuamin/JS-structure)和[博客](https://github.com/laihuamin/JS-total)，欢迎star，谢谢