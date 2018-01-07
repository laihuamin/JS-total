### 前言

对于vdom而言，更新有3个步骤，一个是create，第二个是diff，第三个是patch。这是他的大格局，但是看这个东西之前，我们可以先来看看vnode，这是虚拟的节点。

### vnode

vnode是一个虚拟的节点，他是一个对象，它有很多方法和属性，从源码中我们可以知道：

```js
constructor (tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag
  this.data = data
  this.children = children
  this.text = text
  this.elm = elm
  this.ns = undefined
  this.context = context
  this.functionalContext = undefined
  this.key = data && data.key
  this.componentOptions = componentOptions
  this.componentInstance = undefined
  this.parent = undefined
  this.raw = false
  this.isStatic = false
  this.isRootInsert = true
  this.isComment = false
  this.isCloned = false
  this.isOnce = false
  this.asyncFactory = asyncFactory
  this.asyncMeta = undefined
  this.isAsyncPlaceholder = false
}
```
对每一个做解释的话就是：
tag：每个节点的标签名
children：该节点的子节点，是一个数组类型
text：当前节点的文本，一般是文本节点和注释节点才会有这个属性
elm：该虚拟节点对应的真实节点
ns：当前节点的namespace
context：上下文，也可称作环境，或者编译作用域
functionalContext：函数组件的上下文
key：该节点的key，也是该节点的标识，有利于在patch的时候优化
componentOptions：创建组件的时候的options选项
componentInstance：当前节点对应的组件实例
parent：该节点的父节点
raw：是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false
isStatic：是不是静态节点
isRootInsert：是不是作为根节点插入
isComment：是不是注释节点
isCloned：是不是克隆节点
isOnce：是否有v-once指令
asyncFactory：
asyncMeta：
isAsyncPlaceholder：
data：每个节点的数据对象，VNodeData是在vue中有接口定义的，我们可以看一下

### VNodeData

在types文件夹中的vnode.d.ts中有定义

```js
export interface VNodeData {
  key?: string | number;
  slot?: string;
  scopedSlots?: { [key: string]: ScopedSlot };
  ref?: string;
  tag?: string;
  staticClass?: string;
  class?: any;
  staticStyle?: { [key: string]: any };
  style?: Object[] | Object;
  props?: { [key: string]: any };
  attrs?: { [key: string]: any };
  domProps?: { [key: string]: any };
  hook?: { [key: string]: Function };
  on?: { [key: string]: Function | Function[] };
  nativeOn?: { [key: string]: Function | Function[] };
  transition?: Object;
  show?: boolean;
  inlineTemplate?: {
    render: Function;
    staticRenderFns: Function[];
  };
  directives?: VNodeDirective[];
  keepAlive?: boolean;
}
```

data的类型是vnodeData，我们看一下其中的属性值：

### 最后我们再来看看vnode的类型

![vnode类型](http://laihuamin.oss-cn-beijing.aliyuncs.com/vnode%E7%B1%BB%E5%9E%8B.png)

看完上面几种类型，我们来看一下vnode.js文件中的几个创建节点和克隆节点的函数

- createEmptyVNode

```js
const createEmptyVNode = (text = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}
```
创建一个空的节点，text是空字符串，isComment为true代表是注释节点。

- createTextVNode

```js
function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}
```
创建一个普通的文本节点，传入的tag,data,children都是undefined，然后text的值转化成字符串类型传入。

- cloneVNode

```js
function cloneVNode (vnode, deep) {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.isCloned = true
  if (deep && vnode.children) {
    cloned.children = cloneVNodes(vnode.children)
  }
  return cloned
}
```
该函数是创建一个新的节点然后，将传入的vnode的tag,data,children,text,elm,context,componentOptions,asyncFactory几个参数传入，之后再将vnode的ns,isDtatic,key,isComment,isCloned赋值给cloned，在检测传入的deep是否为true，或者vnode是否有children数组，如果有，那么调用下面的cloneVNodes克隆全部子节点。最后返回cloned。


- cloneVNodes

```js
function cloneVNodes (vnodes, deep){
  const len = vnodes.length
  const res = new Array(len)
  for (let i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep)
  }
  return res
}
```
这个函数很简单，创建一个和vnodes长度相等的数组，然后循环调用一下cloneVNode函数就可以了。