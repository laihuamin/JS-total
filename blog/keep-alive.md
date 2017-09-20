## 前言
- vue中有一个内置组件就是keep-alive组件，这个组件自身不会被渲染成一个Dom对象，也不会监听任何事件
## keep-alive的实现
- 既然是内置组件，就应该有组件的生命周期等一些特性，在源码中是这样的，我们一部分一部分的看
```js
export default {
  name: 'keep-alive',   //名字keep-alive
  abstract: true,   //不渲染成dom元素，也不监听任何事件，抽象组件的意思。

  props: {
    ...
  },

  created () {
    ...
  },

  destroyed () {
    ...
  },

  watch: {
    ...
  },

  render () {
    ...
  }
}
```
- props
```js
props: {
//从父组件传递进来的数据
include: patternTypes,
//字符串或正则表达式。只有匹配的组件会被缓存。
exclude: patternTypes
//字符串或正则表达式。任何匹配的组件都不会被缓存。
},
```
> 这里用的是TypeScript的语法，意思是include和exclude必须是patternType类型的，那什么是patternTypes类型呢？源码中是这样解释的

```js
const patternTypes: Array<Function> = [String, RegExp, Array]    // 定义一个数组，数组中的元素是函数的指针
```
> 这样我们就清晰很多，字符串，正则，数组中的一个，所以，官网给出的keep-alive中有这么一段

```html
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>
<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>
<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```
- created
```js
created () {
//创建一个空对象
    this.cache = Object.create(null)
},
```
> created的生命钩子是数据挂载的时候，尤大在这个钩子里面创建了一个cache对象,Object.create(null)这是在js中经常使用的手段，应为这个创建的对象，比{}还要空，有兴趣的可以自己谷歌一下

- destroyed
```js
destroyed () {
//遍历缓存的数据，并调用pruneCacheEntry，去销毁this.cache对象
    for (const key in this.cache) {
        pruneCacheEntry(this.cache[key])
    }
},
```
> 这个生命钩子是组件被销毁的生命钩子，这里面有一个pruneCacheEntry函数，我们可以来看一下，他是实现什么功能的

```js
function pruneCacheEntry (vnode: ?VNode) {
  //传入一个虚拟dom对象
  if (vnode) {
    //如果有这个对象
    vnode.componentInstance.$destroy()
    //调用对象组件中销毁接口
  }
}
```
> 这个函数中传入的是一个对象
