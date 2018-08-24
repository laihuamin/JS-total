在平常开发中，当我们需要用一个模块的时候，只需要require一下就行了，但是对于其内部的原理，不一定都清楚。读《深入浅出的nodejs》的时候，我们会发现，书中提到，每一个模块在编译过程中，node都会在模块外面封装一层，(function(exports, require, module, \_\_filename, \_\_dirname){})。但是真正调用require的时候，发生了什么，必须得细究一下。

### require大致过程

- require方法

```js
Module.prototype.require = function(id) {
  if (typeof id !== 'string') {
    throw new ERR_INVALID_ARG_TYPE('id', 'string', id);
  }
  if (id === '') {
    throw new ERR_INVALID_ARG_VALUE('id', id,'must be a non-empty string');
  }
  return Module._load(id, this, /* isMain */ false);
};
```
- _load方法

```js
Module._load = function(request, parent, isMain) {
  if (parent) {
    debug('Module._load REQUEST %s parent: %s', request, parent.id);
  }

  var filename = Module._resolveFilename(request, parent, isMain);

  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    updateChildren(parent, cachedModule, true);
    return cachedModule.exports;
  }

  if (NativeModule.nonInternalExists(filename)) {
    debug('load native module %s', request);
    return NativeModule.require(filename);
  }

  // Don't call updateChildren(), Module constructor already does.
  var module = new Module(filename, parent);

  if (isMain) {
    process.mainModule = module;
    module.id = '.';
  }

  Module._cache[filename] = module;

  tryModuleLoad(module, filename);

  return module.exports;
};
```
从上述两个函数中，require的大致过程如下：

1、先检测传入的id是否有效。
2、如果有效，则调用Module._load方法，该方法主要负责加载新模块和管理模块的缓存，而require本身就是对该方法的一个封装。
3、然后会调用Module._resolveFilename去取文件地址。
4、判断是否有缓存模块，如果有返回缓存模块的exports。
5、如果没有缓存，在检测文件名是否是核心模块，如果是调用核心模块的require。
6、如果不是核心模块，那么，创建新的一个module对象。
7、在 Module._cache中缓存该对象，
8、返回模块本身的exports对象。


上述的解读中，我们抛开了两个没有谈，一个是Module._resolveFilename()方法，还有一个是tryModuleLoad()方法。

### filename的获取


```js
Module._resolveFilename = function(request, parent, isMain, options) {
  if (NativeModule.nonInternalExists(request)) {
    return request;
  }

  var paths;

  if (typeof options === 'object' && options !== null &&
      Array.isArray(options.paths)) {
    const fakeParent = new Module('', null);

    paths = [];

    for (var i = 0; i < options.paths.length; i++) {
      const path = options.paths[i];
      fakeParent.paths = Module._nodeModulePaths(path);
      const lookupPaths = Module._resolveLookupPaths(request, fakeParent, true);

      if (!paths.includes(path))
        paths.push(path);

      for (var j = 0; j < lookupPaths.length; j++) {
        if (!paths.includes(lookupPaths[j]))
          paths.push(lookupPaths[j]);
      }
    }
  } else {
    paths = Module._resolveLookupPaths(request, parent, true);
  }
  var filename = Module._findPath(request, paths, isMain);
  if (!filename) {
    var err = new Error(`Cannot find module '${request}'`);
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  }
  return filename;
};
```

_resolveFilename的大致流程：

1、查询文件名是否是核心模块，如果是直接返回传入的id
2、因为option没有参数传入，所以会调用 Module.\_resolveLookupPaths方法去获取路径
3、调用Module.\_findPath方法

我们可以写如下测试代码：

```js
console.log(require('module')._resolveFilename('./lodash'));
let paths = require('module')._resolveLookupPaths('./lodash');
console.log(paths);
console.log(require('module')._findPath("./lodash", paths[1]));
```
输出的结果：
```js
/Users/laihuamin/Documents/learn-record/node_modules/lodash/lodash.js
[ './lodash',
  [ '.',
    '/Users/laihuamin/Documents/learn-record/node_modules',
    '/Users/laihuamin/Documents/node_modules',
    '/Users/laihuamin/node_modules',
    '/Users/node_modules',
    '/node_modules',
    '/Users/laihuamin/.node_modules',
    '/Users/laihuamin/.node_libraries',
    '/Users/laihuamin/.nvm/versions/node/v6.9.1/lib/node' ] ]
/Users/laihuamin/Documents/learn-record/node_modules/lodash/lodash.js
```
\_resolveLookupPaths：其实就是node解析模块中的路径查找，他会向父目录查找，直到根目录为止。
\_findPath：其实就是将\_resolveLookupPaths查找出来的文件名和文件id向匹配，返回一个文件地址。

### tryModuleLoad
```js
function tryModuleLoad(module, filename) {
  var threw = true;
  try {
    module.load(filename);
    threw = false;
  } finally {
    if (threw) {
      delete Module._cache[filename];
    }
  }
}
```
在拿到文件地址之后，module会调用这个方法取tryModuleLoad，去尝试加载模块，如果报错，那么清除模块的缓存。