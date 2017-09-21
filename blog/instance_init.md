## instance中的init.js
- 其实我们可以从一个小例子来看一下整体
```js
new Vue({
    el: '#app',
    data: {
        a: '1',
        b: '2'
    }
})
```
> 这个例子我们在一开始写项目的时候也是打头阵的，那么根据这个例子，我们来看一下instance中的init.js的源码

- 全局变量uid
```
let uid = 0
```
> 这是一个全局变量，后面我们可以看到每个vue的实例都是有相应的uid的

- initMixin
```js
export function initMixin (Vue: Class<Component>) {
  //传入的是一个Vue的类
  Vue.prototype._init = function (options?: Object) {
    //在Vue的原型上定义了一个init方法，传入的是一些Vue实例的一些选项
    const vm: Component = this
    //用一个vm也就是Vue实例指向这个对象
    // a uid
    vm._uid = uid++
    //vm中定义一个uid，用完这个uid之后，uid++可供后续使用
    let startTag, endTag
    //定义一个开始的tag和结束的tag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-init:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    //vm中有一个_isVue为ture，我觉得代表语义化是，代表这是一个Vue的对象
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}

```