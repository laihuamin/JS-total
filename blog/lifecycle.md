## lifecycle.js源码
### 我们先来看一张网上的图
- [vue生命周期](https://cn.vuejs.org/images/lifecycle.png)
### 接下来是我画的源码流程图

### 各个击破
- activeInstance
```js
export let activeInstance: any = null
//全局变量，初始化为null，类型可以为任意
```
- isUpdatingChildComponent
```js
export let isUpdatingChildComponent: boolean = false
//全局变量，初始化为false，类型为boolean
```
- initLifecycle
