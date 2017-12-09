## 前言
babel是现在几乎每个项目中必备的一个东西，但是其工作原理避不开对js的解析在生成的过程，babel有引擎babylon，早期fork了项目acron，了解这个之前我们先来看看这种引擎解析出来是什么东西。不光是babel还有webpack等都是通过javascript parser将代码转化成抽象语法树，这棵树定义了代码本身，通过操作这颗树，可以精准的定位到赋值语句、声明语句和运算语句

## 什么是抽象语法树

我们可以来看一个简单的例子：

```js
var a = 1;
var b = a + 1;
```

我们通过这个[网站](http://esprima.org/demo/parse.html#)，他是一个esprima引擎的网站，十分好用.画成流程图如下：

![AST](http://laihuamin.oss-cn-beijing.aliyuncs.com/ast.png)

而他的json对象格式是这样的：

```js
{
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "init": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "b"
                    },
                    "init": {
                        "type": "BinaryExpression",
                        "operator": "+",
                        "left": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }
                }
            ],
            "kind": "var"
        }
    ],
    "sourceType": "script"
}
```

## 众多的引擎
chrome有v8，firefix有spidermonkey.还有一些常用的引擎有：
- esprima
- acron
- Traceur
- UglifyJS2
- shift

下面是一些引擎的速度对比，以及用不同的框架，引擎们的加载速度：

![jq-parser](http://laihuamin.oss-cn-beijing.aliyuncs.com/jq-parser.png)

![ng-parser](http://laihuamin.oss-cn-beijing.aliyuncs.com/ng-parser.png)

![react-parser](http://laihuamin.oss-cn-beijing.aliyuncs.com/react-parser.png)

我个人认为，封装的越完美的，其实解析的时间更长，引擎之间也是acron这个速度比较优秀，babel引擎前身就是fork这个项目的。

## AST的三板斧

- 通过esprima生成AST
- 通过estraverse遍历和更新AST
- 通过escodegen将AST重新生成源码

我们可以来做一个简单的例子：

1.先新建一个test的工程目录
2.在test工程下安装esprima、estraverse、escodegen的npm模块
```js
npm i esprima estraverse escodegen --save
```
3.在目录下面新建一个test.js文件,载入以下代码：
```js
const esprima = require('esprima');
let code = 'const a = 1';
const ast = esprima.parseScript(code);
console.log(ast);
```
你将会看到输出结果：
```js
Script {
  type: 'Program',
  body:
   [ VariableDeclaration {
       type: 'VariableDeclaration',
       declarations: [Array],
       kind: 'const' } ],
  sourceType: 'script' }
```

4.再在test文件中，载入以下代码：
```js
const estraverse = require('estraverse');

estraverse.traverse(ast, {
    enter: function (node) {
        node.kind = "var";
    }
});

console.log(ast);
```
输出的结果：
```js
Script {
  type: 'Program',
  body:
   [ VariableDeclaration {
       type: 'VariableDeclaration',
       declarations: [Array],
       kind: 'var' } ],
  sourceType: 'script' }
```

5.最后在test文件中，加入以下代码：
```js
const escodegen = require("escodegen");
const transformCode = escodegen.generate(ast)

console.log(transformCode);

```
输出的结果：
```js
var a = 1;
```

- 通过这三板斧：我们将`const a = 1`转化成了`var a = 1`

有没有babel的感觉0.0

## 推荐网站

[esprima源码](https://github.com/jquery/esprima)
[acron源码](https://github.com/ternjs/acorn)
[speed comparison](http://esprima.org/test/compare.html)
[AST explorer](https://astexplorer.net/)
[esprima可视化](http://esprima.org/demo/parse.html#)
[在线可视化AST](http://resources.jointjs.com/demos)

## 总结

抽象树在前端用的很多很多，现在流行的工具，不管是webpack还是babel都会通过那个三板斧的流程，这里我只是大致介绍一下，过段时间，会出一篇抽象树的语法，有兴趣的也可以把esprima的源码看一下，为什么是esprima呢，因为esprima的资料比较多，而acron比较轻量级。有兴趣的可以关注一下我的[github](),记得点个star，就当是对笔者的支持，谢谢。