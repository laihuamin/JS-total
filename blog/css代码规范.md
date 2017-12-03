### 前言

下周是我们公司的代码规范考试，所以我把一些相关的代码规范整理一遍，然后还可以一起看几个例子。

### css代码规范

我司氛围建议和强制两个部分：

### 建议

- css文件使用无BOM的UTF-8编码。

理由： UTF-8编码更具有广泛的适应性，BOM文件在不同的工具上容易造成不必要的干扰

- 属性名和之后的:之间不允许有空格，:和之后的属性值之间必须有空格。

```
margin: 0
```

- 建议列表性属性书写的时候单行用, 。,后面必须跟一个空格

- 建议超长的样式，在样式值空格后或者,后换行，按逻辑分组 

- 选择器嵌套层级最好不要大过三级

- 能使用缩写的时候，尽量使用缩写

```
.post {
    font: 12px/1.5 arial, sans-serif;
}
```

-  使用 `border` / `margin` / `padding` 等缩写时，应注意隐含值对实际数值的影响，确实需要设置多个方向的值时才使用缩写。

- 同一 rule set 下的属性在书写时，应按功能进行分组，并以 **Formatting Model（布局方式、位置） > Box Model（尺寸） > Typographic（文本相关） > Visual（视觉效果）** 的顺序书写，以提高代码的可读性。

> 解释: 

> Formatting Model 相关属性包括：`position` / `top` / `right` / `bottom` / `left` / `float` / `display` / `overflow` 等

> Box Model 相关属性包括：`border` / `margin` / `padding` / `width` / `height` 等

> Typographic 相关属性包括：`font` / `line-height` / `text-align` / `word-wrap` 等

> Visual 相关属性包括：`background` / `color` / `transition` / `list-style` 等

- 当元素需要撑起高度以包含内部的浮动元素时，通过对伪类设置 `clear` 或触发 `BFC` 的方式进行 `clearfix`。尽量不使用增加空标签的方式。
- 尽量不使用 `!important` 声明。
- 当需要强制指定样式且不允许任何场景覆盖时，通过标签内联和 `!important` 定义样式。
- 将 `z-index` 进行分层，对文档流外绝对定位元素的视觉层级关系进行管理。
- 在可控环境下，期望显示在最上层的元素，`z-index` 指定为 `999999`。
- 在第三方环境下，期望显示在最上层的元素，通过标签内联和 `!important`，将 `z-index` 指定为 `2147483647`。
- 当数值为 0 - 1 之间的小数时，省略整数部分的 `0`。
- `url()` 函数中的路径不加引号。
- 颜色值中的英文字符采用小写。如不用小写也需要保证同一项目内保持大小写一致。
- 需要在 Windows 平台显示的中文内容，不要使用除 `normal` 外的 `font-style`。其他平台也应慎用。
- `font-weight` 属性必须使用数值方式描述。
- `line-height` 在定义文本段落时，应使用数值。
- 尽可能给出在高分辨率设备 (Retina) 下效果更佳的样式。
- 需要添加 `hack` 时应尽可能考虑是否可以采用其他方式解决。
- 尽量使用 `选择器 hack` 处理兼容性，而非 `属性 hack`。
- 尽量使用简单的 `属性 hack`。

### 强制

- 使用4个空格作为一层缩进，不允许使用2个空格活着Tab字符

- 选择器与{间必须有空格

```
.selector {
}
```
- 每行不得超过120个字符，除非不可分割的场景

常见的场景：
背景图中的url

- 当一个rule包含多个选择器的时候，每个选择器占一行

```
.post,
.get,
.comment {
    color: #000
}
```

- `>、+、-`选择器两边都需要带空格

```
main > nav {
    color: #000;
}
main + nav {
    color: #000;
}
main - nav {
    color: #000;
}
```

- 属性的定义必须另起一行

```
.selector {
    margin: 0;
    padding: 0;
}
```

- 属性值必须已分号结尾，如上面的例子所示

- 如果没有必要，不得为id、class选择器添加类型的限

解释：在性能和维护性上，都有一定的影响

```
#error,
.danger {
  font-color: #c00;
}
/* bad */
div#error,
p.danger {
}
```

- 文本内容必须用双引号包围。

解释：
文本类型的内容可能在选择器、属性值等内容中
示例：
```
/* good */
html[lang|="zh"] q:before {
    font-family: "Microsoft YaHei", sans-serif;
    content: "“";
}
```

- 长度为 `0` 时须省略单位。 (也只有长度单位可省)
- RGB颜色值必须使用十六进制记号形式 `#rrggbb`。不允许使用 `rgb()`。 
- 颜色值可以缩写时，必须使用缩写形式。
- 颜色值不允许使用命名色值。
- 必须同时给出水平和垂直方向的位置。
- `font-family` 属性中的字体族名称应使用字体的英文 `Family Name`，其中如有空格，须放置在引号中。

示例：

```css
h1 {
    font-family: "Microsoft YaHei";
}
```
- `font-family` 按「西文字体在前、中文字体在后」、「效果佳 (质量高/更能满足需求) 的字体在前、效果一般的字体在后」的顺序编写，最后必须指定一个通用字体族( `serif` / `sans-serif` )。
- `font-family` 不区分大小写，但在同一个项目中，同样的 `Family Name` 大小写必须统一。
- 需要在 Windows 平台显示的中文内容，其字号应不小于 `12px`。
- 使用 `transition` 时应指定 `transition-property`。
- 尽可能在浏览器能高效实现的属性上添加过渡和动画。
- `Media Query` 不得单独编排，必须与相关的规则一起定义。

示例：

```css
/* Good */
/* header styles */
@media (...) {
    /* header styles */
}

/* main styles */
@media (...) {
    /* main styles */
}

/* footer styles */
@media (...) {
    /* footer styles */
}


/* Bad */
/* header styles */
/* main styles */
/* footer styles */

@media (...) {
    /* header styles */
    /* main styles */
    /* footer styles */
}
```
- `Media Query` 如果有多个逗号分隔的条件时，应将每个条件放在单独一行中。

示例：

```css
@media
(-webkit-min-device-pixel-ratio: 2), /* Webkit-based browsers */
(min--moz-device-pixel-ratio: 2),    /* Older Firefox browsers (prior to Firefox 16) */
(min-resolution: 2dppx),             /* The standard way */
(min-resolution: 192dpi) {           /* dppx fallback */
    /* Retina-specific stuff here */
}
```
- 带私有前缀的属性由长到短排列。
- 禁止使用 `Expression`。