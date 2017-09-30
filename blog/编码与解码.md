## 前言
### 说说我为什么要写关于编码的一篇博文？有两个原因
1.艺龙的面试面试官问到了，让我知道了你想扩展的你的基础，你不能放弃任意一个知识点
2.就是今天做业务碰到了这个bug，肯定有人想知道，这个会产生什么bug，bug一般都是不注意细节，才会导致的，业务中有一个分享到朋友圈和微信好友的一个业务模块，大家都知道，一般这种模块都是要利用客户端给你提供一个hybrid的一个接口，然后，你通过调用这个接口，来完成分享这一个举动，但是在测试的时候并没有发现问题，但是到了线上问题来了，我们一个主管的账号分享不了，但是很多人的账号却可以分享，这种问题是最烦人的，而且更气人的是安卓机都可以分享，那我们是不是该分分锅，ios的锅？还是账号的锅？又或者是前端的锅？故事发展到最后，很多人都忙了一下午来查找bug，我来写这篇文章，肯定说明是前端的锅啊，有人奇怪，这安卓的，ios的部分都是可以的，说明功能没问题，我当时也是这么想的，但是结果却出乎意料，先说说为什么部分ios可以，因为url里面带了昵称参数，一部分人的昵称是英文，一部分是中文，这就是结果——在url中的中文字符都要用base64转成ASCII字符进行传递。


## 了解篇——怎么用
很多不了解的人，应该更关心怎么用，这里我会讲几个web的api，后面一部分博文，可能会深入点，无聊点，程序员写作能力欠缺0.0
### encodeURIComponent和encodeURI
这两个接口是我们经常用的，他们的用途一致，是对URL进行编码，但是他们之间还是有区别
- encodeURI不能对下列字符进行编码，ASCII字母、数字、~!@#$&*()=:/,;?+'
- encodeURIComponent不能对下列字符进行编码，ASCII字母、数字、~!*()'
> 总结，encodeURIComponent的编码范围比encodeURI大，我的问题就是用encodeURIComponent解决的
### escape
 上面的两个对URL进行编码，这个接口就是对字符串进行编码，让字符串可以在所有计算机上被读取，编码之后的效果是%XX或者%uXXXX这种形式。
- 注意，它针对的是字符串，不适用于URL，不会对 ASCII字母、数字、@*/+
```
//举个例子
let str = '来铧敏';
let encodeStr = escape(str);
console.log(encodeStr);//%u6765%u94E7%u654F
```
### 前三个的用法
- 不针对URL的那么就用escape
- 针对整个http的，用encodeURI
- 针对http的参数的，就用encodeURIComponent

### unescape、decodeURI和decodeURIComponent
这三者是解码用的，分别对应上面的三个，看下面的例子就知道了
```
let str = '来铧敏';
let encodeStr = escape(str);
console.log(encodeStr);
console.log(unescape(encodeStr));
let _encodeStr = encodeURIComponent(str);
console.log(_encodeStr);
console.log(decodeURIComponent(_encodeStr));
```
输出结果我就不写了，有几点需要注意，编码和解码需一一对应，默写场景encodeURI进行编码的decodeURIComponent可以解码，但是escape编码的decodeURIComponent解码会报错
## 了解篇——有什么用
URL中允许的只有英文字符，阿拉伯数字，某些标志，你肯定没有看过这样的网站：
```
http://github.com/laihuamin/来点赞
```
为什么会上述网站不行呢，因为网络标准RFC 1738做了硬性规定：
> 原文："...Only alphanumerics [0-9a-zA-Z], the special characters "$-_.+!*'()," [not including the quotes - ed], and reserved characters used for their reserved purposes may be used unencoded within a URL."
- 所以综上所述，编码是为了一些不被规定的字符在URL中传递变得合法

用编码可以对前端的一些重要信息进行加密，其实前端并没有上面严格意义上的加密，这里说的加密更多偏向与混淆，我们来实现一个简单点的加密：
```js
//这里实现的是对js代码的加密，这是个例子
console.log('我要加密这个语句')；
//下面是加密和解密处理
escape('console.log("我要加密这个语句")')
//先进行编码获得加密后的
const code = unescape(console.log%28%22%u6211%u8981%u52A0%u5BC6%u8FD9%u4E2A%u8BED%u53E5%22%29)
eval(code)
```
- 总结，第二点功能，没有第一点功能来的实用，其实可以不用记忆，如果还有其他上面功能的欢迎补充
## 基础篇——有哪些
说了这么多编码，那到底有多少种编码形式呢？熟悉计算机的朋友应该都听过这样的词汇：ASCII、Unicode、UTF-8、UTF-16等等，那我们就来絮叨絮叨常见的
### ASCII
ASCII码我们在熟悉不过，它是使用8位二进制来表示英文字符和符号，但是吹生出一个问题，中华文化博大精深，光汉字就有几万个，256个字符哪里够用呢。。。。
### 非ASCII编码
一个英文字母一个字节足够表示，但是10万个汉字，一个字节怎么够，那就两个呗，256x256才足以表示，中文编码就是GB2312，但在日本或者其他地方就不能使用，所以众多的编码方式，没有统一性
### Unicode
众多的编码方式困扰这大家，电子邮件也时常出现乱码，如果有一种字符集可以把所有的字符都收录进来，不就可以解决问题，Unicode应运而生，Unicode当然是一个很大的集合，现在的规模可以容纳100多万个符号。
### Unicode的问题
- Unicode只是一个字符集，并没有规定二进制码该怎么储存，这样就会引发一个问题，一个汉字两个字节，一个英文字符一个字节，计算机把一个汉子当成两个英文字符来读写怎么办
- 前者还会导致一种结果，为了解决前面的问题，我们势必多添加几个000去表示到底是几个字节的字符，这样存储空间有了巨大的浪费
### UTF-8
UTF-8是Unicode的一种实现，它是一种可变的编码规则，当在ASCII范围内时，用一个字节读取，如果在范围之外，就用多个字节读取，注意，中文字符在Unicode中是两个字节，在UTF-8中是3个字节，Unicode到UTF-8的转换规则有相应的算法
## 总结篇
聊了这么多关于编码的，我简单总结几点：
- 现有ASCII编码，但是对于中文和多国语言，不够用了，中国人民对ASCII进行扩展，产生了GB2312编码，但是还是不够用，之后出现了GBK编码
- 很多国家编码规则不统一，吹生出了Unicode编码方式，但是由于Unicode的缺陷，所以UTF-8应运而生，所以我们经常会在网页的head标签中看到
```
<meta charset="utf-8">
```
- UTF这么方便，为什么国内还有人使用GBK编码呢，就是因为UTF的占用体积过大，如果仅仅面向国人的，还是建议GBK编码

> 知识来源网络，实践获得真知，借鉴网络的地方过多，无法著名出处，侵删