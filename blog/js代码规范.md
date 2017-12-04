### 前言

和前面一样，上面一篇是和样式相关的，这一篇是和js相关的，我们也一起来过一遍，然后还可以看几个例子。我们在代码规范中将分为建议和强制两个篇章

### 建议
- `JavaScript` 文件使用无 `BOM` 的 `UTF-8` 编码。
- 在文件结尾处，保留一个空行。
- `if / else / for / while / function / switch / do / try / catch / finally` 关键字后，必须有一个空格。
- 在对象创建时，属性中的 `:` 之后必须有空格，`:` 之前不允许有空格。
- 函数声明、具名函数表达式、函数调用中，函数名和 `(` 之间不允许有空格。
- `,` 和 `;` 前不允许有空格。
- 在函数调用、函数声明、括号表达式、属性访问、`if / for / while / switch / catch` 等语句中，`()` 和 `[]` 内紧贴括号部分不允许有空格。
- 单行声明的数组与对象，如果包含元素，`{}` 和 `[]` 内紧贴括号部分不允许包含空格。
- 行尾不得有多余的空格。
- 运算符处换行时，运算符必须在行的行尾。

示例：

```javascript
// good
if (user.isAuthenticated() &&
    user.isInRole('admin') &&
    user.hasAuthority('add-admin') ||
    user.hasAuthority('delete-admin')) {
    // Code
}

var result = number1 + number2 + number3 +
    number4 + number5;
```
- 在函数声明、函数表达式、函数调用、对象创建、数组创建、for语句等场景中，不允许在 `,` 或 `;` 前换行。
-  不同行为或逻辑的语句集，使用空行隔开，更易阅读。
-  在语句的行长度超过 `120` 时，根据逻辑条件合理缩进。
-  对于 `if...else...`、`try...catch...finally` 等语句，推荐使用在 `}` 号后添加一个换行 的风格，使代码层次结构更清晰，阅读性更好。
-  `函数名` 使用 `动宾短语`。
-  `boolean` 类型的变量使用 `is` 或 `has` 开头。
-  `Promise对象` 用 `动宾短语的进行时` 表达。
-  避免使用 `/*...*/` 这样的多行注释。有多行注释内容时，使用多个单行注释。
-  为了便于代码阅读和自文档化，以下内容必须包含以 `/**...*/` 形式的块注释中。
-  文档注释前必须空一行。
-  自文档化的文档说明 what，而不是 how。
-  类型定义都是以`{`开始, 以`}`结束。
-  对于基本类型 {string}, {number}, {boolean}，首字母必须小写。

类型定义 | 语法示例 | 解释 |
| ------- | ------- | --- |
|String|{string}|--|
|Number|{number}|--|
|Boolean|{boolean}|--|
|Object|{Object}|--|
|Function|{Function}|--|
|RegExp|{RegExp}|--|
|Array|{Array}|--|
|Date|{Date}|--|
|单一类型集合|{Array.&lt;string&gt;}|string 类型的数组|
|多类型|{(number｜boolean)}|可能是 number 类型, 也可能是 boolean 类型|
|允许为null|{?number}|可能是 number, 也可能是 null|
|不允许为null|{!Object}|Object 类型, 但不是 null|
|Function类型|{function(number, boolean)}|函数, 形参类型|
|Function带返回值|{function(number, boolean):string}|函数, 形参, 返回值类型|
|参数可选|@param {string=} name|可选参数, =为类型后缀|
|可变参数|@param {...number} args|变长参数,  ...为类型前缀|
|任意类型|{*}|任意类型|
|可选任意类型|@param {*=} name|可选参数，类型不限|
|可变任意类型|@param {...*} args|变长参数，类型不限|

- 文件顶部必须包含文件注释，用 `@file` 标识文件说明。
- 文件注释中可以用 `@author` 标识开发者信息.
- 命名空间使用 `@namespace` 标识。
- 使用 `@class` 标记类或构造函数。
- 使用 `@extends` 标记类的继承信息。
- 细节注释遵循单行注释的格式。说明必须换行时，每行是一个单行注释的起始。
- `var` 声明多个变量。
- 尽可能使用简洁的表达式。
- 按执行频率排列分支的顺序。
- 如果函数或全局中的 `else` 块后没有任何语句，可以删除 `else`。
- 对有序集合进行遍历时，缓存 `length`。
- 对有序集合进行顺序无关的遍历时，使用逆序遍历。
- 类型检测优先使用 `Object.prototype.toString.call`。对象类型检测使用 `instanceof`。
- 转换成 `string` 时，使用 `+ ''`。
- 转换成 `number` 时，通常使用 `+`。
- `string` 转换成 `number`，要转换的字符串结尾包含非数字并期望忽略时，使用 `parseInt`。
- 使用 `parseInt` 时，必须指定进制。
- 转换成 `boolean` 时，使用 `!!`。
- `number` 去除小数点，使用 `Math.floor / Math.round / Math.ceil`，不使用 `parseInt`。
- 使用 `数组` 或 `+` 拼接字符串。
- 复杂的数据到视图字符串的转换过程，选用一种模板引擎。
- 属性访问时，尽量使用 `.`。
- 不因为性能的原因自己实现数组排序功能，尽量使用数组的 `sort` 方法。
- 清空数组使用 `.length = 0`。
- 一个函数的长度控制在 `50` 行以内。
- 一个函数的参数控制在 `6` 个以内。
- 通过 `options` 参数传递非数据输入型参数。
- 在适当的时候将闭包内大对象置为 `null`。
- 使用 `IIFE` 避免 `Lift 效应`。
- 空函数不使用 `new Function()` 的形式。
- 对于性能有高要求的场合，建议存在一个空函数的常量，供多处使用共享。
- 类的继承方案，实现时需要修正 `constructor`。
- 属性在构造函数中声明，方法在原型中声明。
- 设计自定义事件时，应考虑禁止默认行为。
- 避免修改外部传入的对象。
- 具备强类型的设计。
- 对于单个元素，尽可能使用 `document.getElementById` 获取，避免使用`document.all`。
- 对于多个元素的集合，尽可能使用 `context.getElementsByTagName` 获取。其中 `context` 可以为 `document` 或其他元素。指定 `tagName` 参数为 `*` 可以获得所有子元素。
- 遍历元素集合时，尽量缓存集合长度。如需多次操作同一集合，则应将集合转为数组。
- 获取元素的直接子元素时使用 `children`。避免使用`childNodes`，除非预期是需要包含文本、注释和属性类型的节点。
- 获取元素实际样式信息时，应使用 `getComputedStyle` 或 `currentStyle`。
- 尽可能通过为元素添加预定义的 className 来改变元素样式，避免直接操作 style 设置。

### 强制
-  使用 `4` 个空格做为一个缩进层级，不允许使用 `2` 个空格 或 `tab` 字符。
-  `switch` 下的 `case` 和 `default` 必须增加一个缩进层级。

示例：

```javascript
// good
switch (variable) {

    case '1':
        // do...
        break;

    case '2':
        // do...
        break;

    default:
        // do...

}

// bad
switch (variable) {

case '1':
    // do...
    break;

case '2':
    // do...
    break;

default:
    // do...

}
```
- 二元运算符两侧必须有一个空格，一元运算符与操作对象之间不允许有空格。
- 用作代码块起始的左花括号 `{` 前必须有一个空格。
- 每个独立语句结束后必须换行。
- 每行不得超过 `120` 个字符。
- 不得省略语句结束的分号。
- 在 `if / else / for / do / while` 语句中，即使只有一行，也不得省略块 `{...}`。
- 函数定义结束不允许添加分号。
- `IIFE` 必须在函数表达式外添加 `(`，非 `IIFE` 不得在函数表达式外添加 `(`。
- `变量` 使用 `Camel命名法`。
- `常量` 使用 `全部字母大写，单词间下划线分隔` 的命名方式。
- `函数` 使用 `Camel命名法`。
- 函数的 `参数` 使用 `Camel命名法`。
- `类型` 使用 `Pascal命名法`。
- 类的 `方法 / 属性` 使用 `Camel命名法`。
- `枚举变量` 使用 `Pascal命名法`，`枚举的属性` 使用 `全部字母大写，单词间下划线分隔` 的命名方式。
- `命名空间` 使用 `Camel命名法`。
- 由多个单词组成的缩写词，在命名中，根据当前命名法和出现的位置，所有字母的大小写与首字母的大小写保持一致。
- `类名` 使用 `名词`。
- 必须独占一行。`//` 后跟一个空格，缩进与下一行被注释说明的代码一致。
- 使用包装方式扩展类成员时， 必须通过 `@lends` 进行重新指向。

示例：

```javascript
/**
 * 类描述
 *
 * @class
 * @extends Developer
 */
function Fronteer() {
    Developer.call(this);
    // constructor body
}

util.extend(
    Fronteer.prototype,
    /** @lends Fronteer.prototype */{
        _getLevel: function () {
            // TODO
        }
    }
);
```
- 有时我们会使用一些特殊标记进行说明。特殊标记必须使用单行注释的形式。下面列举了一些常用标记：

解释：

1. TODO: 有功能待实现。此时需要对将要实现的功能进行简单说明。
2. FIXME: 该处代码运行没问题，但可能由于时间赶或者其他原因，需要修正。此时需要对如何修正进行简单说明。
3. HACK: 为修正某些问题而写的不太好或者使用了某些诡异手段的代码。此时需要对思路或诡异手段进行描述。
4. XXX: 该处存在陷阱。此时需要对陷阱进行描述。

- 变量在使用前必须通过 `var` 定义。
- 在 Equality Expression 中使用类型严格的 `===`。仅当判断 null 或 undefined 时，允许使用 `== null`。
- 不要在循环体中包含函数表达式，事先将函数提取到循环体外。

示例：

```javascript
// good
function clicker() {
    // ......
}

for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i];
    addListener(element, 'click', clicker);
}


// bad
for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i];
    addListener(element, 'click', function () {});
}
```

- 对循环内多次使用的不变值，在循环外用变量缓存。

示例：

```javascript
// good
var width = wrap.offsetWidth + 'px';
for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i];
    element.style.width = width;
    // ......
}


// bad
for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i];
    element.style.width = wrap.offsetWidth + 'px';
    // ......
}
```
- 字符串开头和结束使用单引号 `'`。
- 使用对象字面量 `{}` 创建新 `Object`。
- 对象创建时，如果一个对象的所有 `属性` 均可以不添加引号，则所有 `属性` 不得添加引号。
- 对象创建时，如果任何一个 `属性` 需要添加引号，则所有 `属性` 必须添加 `'`。
- 不允许修改和扩展任何原生对象和宿主对象的原型。

示例： 

```javascript
// 以下行为绝对禁止
String.prototype.trim = function () {
};
```
- `for in` 遍历对象时, 使用 `hasOwnProperty` 过滤掉原型中的属性。

示例：

```javascript
var newInfo = {};
for (var key in info) {
    if (info.hasOwnProperty(key)) {
        newInfo[key] = info[key];
    }
}
```
- 使用数组字面量 `[]` 创建新数组，除非想要创建的是指定长度的数组。
- 遍历数组不使用 `for in`。
- 自定义事件的 `事件名` 必须全小写。
- 自定义事件只能有一个 `event` 参数。如果事件需要传递较多信息，应仔细设计事件对象。
- 避免使用直接 `eval` 函数。
- 尽量不要使用 `with`。
- 减少 `delete` 的使用。
- 通过 style 对象设置元素样式时，对于带单位非 0 值的属性，不允许省略单位。
- 操作 `DOM` 时，尽量减少页面 `reflow`。