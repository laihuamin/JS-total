### 先看看官方对于隐式转换的定义
![abstract-equality.png](https://i.loli.net/2018/08/21/5b7b624412c35.png)

注意图片中的第7条：If Type(y) is Boolean, return the result of the comparison x == ToNumber(y).
第9条：If Type(x) is Object and Type(y) is either String or Number,return the result of the comparison ToPrimitive(x) == y.

那么我们以[] == false为例，先对x进行ToPrimitive(x),在对y进行ToNumber(y).

这里我们先来了解一下ToPrimitive()和ToNumber()的源码

### ToPrimitive和ToNumber

ToPrimitive
```js
// ECMA-262, section 9.1, page 30. Use null/undefined for no hint,
// (1) for number hint, and (2) for string hint.
function ToPrimitive(x, hint) {  
  // Fast case check.
  if (IS_STRING(x)) return x;
  // Normal behavior.
  if (!IS_SPEC_OBJECT(x)) return x;
  if (IS_SYMBOL_WRAPPER(x)) throw MakeTypeError(kSymbolToPrimitive);
  if (hint == NO_HINT) hint = (IS_DATE(x)) ? STRING_HINT : NUMBER_HINT;
  return (hint == NUMBER_HINT) ? DefaultNumber(x) : DefaultString(x);
}

// ECMA-262, section 8.6.2.6, page 28.
function DefaultNumber(x) {  
  if (!IS_SYMBOL_WRAPPER(x)) {
    var valueOf = x.valueOf;
    if (IS_SPEC_FUNCTION(valueOf)) {
      var v = %_CallFunction(x, valueOf);
      if (IsPrimitive(v)) return v;
    }

    var toString = x.toString;
    if (IS_SPEC_FUNCTION(toString)) {
      var s = %_CallFunction(x, toString);
      if (IsPrimitive(s)) return s;
    }
  }
  throw MakeTypeError(kCannotConvertToPrimitive);
}

// ECMA-262, section 8.6.2.6, page 28.
function DefaultString(x) {  
  if (!IS_SYMBOL_WRAPPER(x)) {
    var toString = x.toString;
    if (IS_SPEC_FUNCTION(toString)) {
      var s = %_CallFunction(x, toString);
      if (IsPrimitive(s)) return s;
    }

    var valueOf = x.valueOf;
    if (IS_SPEC_FUNCTION(valueOf)) {
      var v = %_CallFunction(x, valueOf);
      if (IsPrimitive(v)) return v;
    }
  }
  throw MakeTypeError(kCannotConvertToPrimitive);
}
```

大致的代码逻辑是：
- 如果变量为字符串，直接返回
- 如果!IS_SPEC_OBJECT(x)，直接返回
- 如果IS_SYMBOL_WRAPPER(x)，则抛出异常
- 否则会根据传入的hint来调用DefaultNumber和DefaultString，比如如果为Date对象，会调用DefaultString
  - DefaultNumber：首先x.valueOf，如果为primitive，则返回valueOf后的值，否则继续调用x.toString，如果为primitive，则返回toString后的值，否则抛出异常
  - DefaultString：和DefaultNumber正好相反，先调用toString，如果不是primitive再调用valueOf
  
ToNumber

```js
// ECMA-262, section 9.3, page 31.
function ToNumber(x) {  
  if (IS_NUMBER(x)) return x;
  // 字符串转数字调用StringToNumber
  if (IS_STRING(x)) {
    return %_HasCachedArrayIndex(x) ? %_GetCachedArrayIndex(x) : %StringToNumber(x);
  }
  // 布尔型转数字时true返回1，false返回0
  if (IS_BOOLEAN(x)) return x ? 1 : 0;
  // undefined返回NAN
  if (IS_UNDEFINED(x)) return NAN;
  // Symbol抛出异常，例如：Symbol() + 1
  if (IS_SYMBOL(x)) throw MakeTypeError(kSymbolToNumber);
  return (IS_NULL(x)) ? 0 : ToNumber(DefaultNumber(x));
}
```

ToString

```js
// ECMA-262, section 9.8, page 35.
function ToString(x) {  
  if (IS_STRING(x)) return x;
  // 数字转字符串，调用内部的_NumberToString
  if (IS_NUMBER(x)) return %_NumberToString(x);
  // 布尔型转字符串，true返回字符串true
  if (IS_BOOLEAN(x)) return x ? 'true' : 'false';
  // undefined转字符串，返回undefined
  if (IS_UNDEFINED(x)) return 'undefined';
  // Symbol抛出异常
  if (IS_SYMBOL(x)) throw MakeTypeError(kSymbolToString);
  return (IS_NULL(x)) ? 'null' : ToString(DefaultString(x));
}
```
那么[].valueOf()的结果是[],在对[]调用toString的方法，得到的结果是""。
而true调用ToNumber的方法得到的结果是1。
"" == 1 返回的是false，所以[] == true,返回false。

那么我们再来看看!![] == true是怎么解读的？
根据优先级，先进行!操作。

![Logical-NOT-Operator.png](https://i.loli.net/2018/08/21/5b7b694fb3c5f.png)

所以!![]相当于!!(ToBoolean([]))

ToBoolean源码

```js
// ECMA-262, section 9.2, page 30
function ToBoolean(x) {  
  if (IS_BOOLEAN(x)) return x;
  // 字符串转布尔型时，如果length不为0就返回true
  if (IS_STRING(x)) return x.length != 0;
  if (x == null) return false;
  // 数字转布尔型时，变量不为0或NAN时返回true
  if (IS_NUMBER(x)) return !((x == 0) || NUMBER_IS_NAN(x));
  return true;
}
```
从源码中，我们得知，null,undefined,0,"",false,NaN,返回false。其余都是返回true。

那么!![],转换之后等于!!true，即true。

那其余的一个就留给大家自己分析啦！！！