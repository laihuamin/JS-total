### 前言

最近在写业务的时候，总是会遇到一些和vue的生命周期相关的问题，比如：
你用ajax请求数据，然后将数据props到子组件的时候，因为ajax是异步的，然后会发生没有数据。然后查找原因还是自己对这个东西理解不够深入。

### 生命周期图

![](https://i.loli.net/2018/05/11/5af5638adcc6b.png)

### 生命钩子函数

什么是生命周期函数？

比如：

```js
mounted: function() {
}

// 或者

mounted() {
}
```

- 注意点，Vue的所有生命周期函数都是自动绑定到this的上下文上。所以，你这里使用箭头函数的话，就会出现this指向的父级作用域，就会报错。

错误的形式：

```js
mounted:() => {
}
```

### beforeCreate
![](https://i.loli.net/2018/05/16/5afb97018f74d.png)
在实例初始化之后，数据观测和暴露了一些有用的实例属性与方法。

实例初始化——`new Vue()`

数据观测——在vue的响应式系统中加入data对象中所有数据，这边涉及到vue的双向绑定，可以看官方文档上的这篇深度响应式原理
[深度响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

暴露属性和方法——就是vue实例自带的一些属性和方法，我们可以看一个官网的例子，例子中带$的属性和方法就是vue实例自带的，可以和用户定义的区分开来

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
```

### created

- el属性对生命周期的影响

![](https://i.loli.net/2018/05/16/5afb9827155b4.png)

```js
// 有el属性的情况下
new Vue({
el: '#app',
beforeCreate: function() {
  console.log('调用了beforeCreate')
},
created: function() {
  console.log('调用了created')
},
beforeMount: function() {
  console.log('调用了beforeMount')
},
mounted: function() {
  console.log('调用了mounted')
}
})

// 输出结果
// 调用了beforeCreate
// 调用了created
// 调用了beforeMount
// 调用了mounted
```

```js
// 在没有el属性的情况下，没有vm.$mount

new Vue({
beforeCreate: function() {
  console.log('调用了beforeCreate')
},
created: function() {
  console.log('调用了created')
},
beforeMount: function() {
  console.log('调用了beforeMount')
},
mounted: function() {
  console.log('调用了mounted')
}
})

// 输出结果
// 调用了beforeCreate
// 调用了created
```

```js
// 在没有el属性的情况下，但是有vm.$mount方法

var vm = new Vue({
beforeCreate: function() {
  console.log('调用了beforeCreate')
},
created: function() {
  console.log('调用了created')
},
beforeMount: function() {
  console.log('调用了beforeMount')
},
mounted: function() {
  console.log('调用了mounted')
}
})

vm.$mount('#app')

// 输出结果
// 调用了beforeCreate
// 调用了created
// 调用了beforeMount
// 调用了mounted
```

- template属性对生命周期的影响

![](https://i.loli.net/2018/05/16/5afbe8c47c4cb.png)

这里面分三种情况：

1、在实例内部有template属性的时候，直接用内部的，然后调用render函数去渲染。
2、在实例内部没有找到template，就调用外部的html。实例内部的template属性比外部的优先级高。
3、要是前两者都不满足，那么就抛出错误。

我们来看以下几个例子：

```js
new Vue({
  el: '#app',
  template: '<div id="app">hello world</div>'
})

//页面上渲染出了hello world
```

```
<div id="app">hello world</div>

new Vue({
  el: '#app'
})

// 页面上渲染出了hello world
```

```
//两者都存在的时候

<div id="app">hello world2</div>

new Vue({
  el: '#app',
  template: '<div id="app">hello world1</div>'
})
// 页面上渲染出了hello world1
```
从上述的例子可以看出内部的优先外部的。


- 关于这个生命周期中的一些问题：

1、为什么el属性的判断在template之前？
因为el是一个选择器，比如上述例子中我们用到的最多的是id选择器app，vue实例需要用这个el去template中寻找对应的。

2、实际上，vue实例中还有一种render选项，我们可以从文档上看一下他的用法：

```js
new Vue({
  el: '#app',
  render() {
    return (...)
  }
})
```

3、上述三者的渲染优先级：render函数 > template属性 > 外部html

4、vue编译过程——把tempalte编译成render函数的过程。

### beforeMount和mounted

![life-mounted.png](https://i.loli.net/2018/05/16/5afc189db1e78.png)

我们先来看一个例子：
```
<div id="app">
  <p>{{message}}</p>
</div>

new Vue({
  el: '#app',
  data: {
    message: 1
  },
  beforeMount: function() {
    console.log('调用了beforeMount');
    console.log(this.message)
    console.log(this.$el)
  },
  mounted: function() {
    console.log('调用了mounted');
    console.log(this.message)
    console.log(this.$el)
  }
})

// 输出的结果：
// 调用了beforeMount
// 1
// <div>
// </div>

// 调用了mounted
// 1
// <div id="app">
//  <p>1</p>
// </div>
```

创建vue实例的$el，然后用它替代el属性。

### beforeUpdate和updated

![](https://i.loli.net/2018/05/16/5afc189db7517.png)

这个过程中，我们会发现，当一个数据发生改变时，你的视图也将随之改变，整个更新的过程是：数据改变——导致虚拟DOM的改变——调用这两个生命钩子去改变视图

- 重点：这个数据只有和模版中的数据绑定了才会发生更新。

```js
// 没绑定的情况

var vm = new Vue({
  el: '#app',
  template: '<div id="app"></div>',
  beforeUpdate: function() {
    console.log('调用了beforeUpdate')
  },
  updated: function() {
    console.log('调用了uodated')
  },
  data: {
    a: 1
  }
})

vm.a = 2
//这种情况在控制台中是什么都不会输出的。
```

```js
var vm = new Vue({
  el: '#app',
  template: '<div id="app">{{a}}</div>',
  beforeUpdate: function() {
    console.log('调用了beforeUpdate')
  },
  updated: function() {
    console.log('调用了uodated')
  },
  data: {
    a: 1
  }
})

vm.a = 2

// 输出结果：
// 调用了beforeUpdate
// 调用了uodated
```

### beforeDestory和destoryed

![](https://i.loli.net/2018/05/16/5afc189db3505.png)

在beferoDestory生命钩子调用之前，所有实例都可以用，但是当调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

### 几个不常用的生命钩子

- activated：当组件激活的时候调用
- deactivated：当组件停用的时候调用
- errorCaptured：这个生命钩子可以看官网，2.5.0之后才有的。当捕获一个来自子孙组件的错误时被调用。

### 最后我们用一个例子来过一遍生命周期

```
let vm = new Vue({
  el: '#app',
  data: {
    message: 1
  },
  template: '<div id="app"><p>{{message}}</p></div>',
  beforeCreate() {
    console.log('调用了beforeCreate')
    console.log(this.message)
    console.log(this.$el)
  },
  created() {
    console.log('调用了created')
    console.log(this.message)
    console.log(this.$el)
  },
  beforeMount() {
    console.log('调用了beforeMount')
    console.log(this.message)
    console.log(this.$el)
  },
  mounted() {
    console.log('调用了mounted')
    console.log(this.message)
    console.log(this.$el)
  },
  beforeUpdate() {
    console.log('调用了beforeUpdate')
    console.log(this.message)
    console.log(this.$el)
  },
  updated() {
    console.log('调用了updated')
    console.log(this.message)
    console.log(this.$el)
  },
  beforeDestory() {
    console.log('调用了beforeDestory')
    console.log(this.message)
    console.log(this.$el)
  },
  destoryed() {
    console.log('调用了Destoryed')
    console.log(this.message)
    console.log(this.$el)
  }
})

vm.message = 2
```

- 输出的结果：

```js
// 调用了beforeCreate
// undefined
// undefined
// 调用了created
// 1
// undefined
// 调用了beforeMount
// 1
// <div></div>
// 调用了mounted
// 1
// <div id="app"><p>1</p></div>
// 调用了beforeUpdate
// 2
// <div id="app"><p>2</p></div>
// 调用了updated
// 2
// <div id="app"><p>2</p></div>
```