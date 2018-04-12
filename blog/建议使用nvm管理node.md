### 前言

为什么题目是这个呢，因为自己最近在用npm包的时候被mac的权限恶心到了。

在mac中全局安装npm包，需要用sudo，因为npm包安装的位置在/usr/local/bin中，然后自己在安装weex-toolkit的时候，用了sudo命令，然后用weex命令创建文件夹的时候也要用sudo，导致创建的文件夹权限也是只读，不能写入。

### 如何改变这种现状

产生这种现状是因为我们没有对node这个东西进行管理，首推nvm，其次是brew。nvm是mac下的node管理工具，当然你手头上有好几个不同的项目，依赖不同的node版本，这个东西也可以很好的解决。


### 如果你已经安装了node，怎么办

- 全局卸载

```
sudo rm /usr/local/bin/npm
sudo rm /usr/local/share/man/man1/node.1
sudo rm /usr/local/lib/dtrace/node.d
sudo rm -rf ~/.npm
sudo rm -rf ~/.node-gyp
sudo rm /opt/local/bin/node
sudo rm /opt/local/include/node
sudo rm -rf /opt/local/lib/node_modules
```

### 安装nvm

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```

### 安装nodejs

- 安装固定版本的
```
nvm install 8.9.1
```
- 安装最近稳定版本
```
nvm install stable
```

### 使用不同版本的nodejs

使用命令nvm use加版本号

```
nvm use 8.9.1
```

### 在项目中使用不同版本的node

我们可以通过创建项目目录中的`.nvmrc`文件来指定要使用的nodejs版本。之后在项目目录中执行`nvm use`即可。

### 对于不同版本的npm怎么办呢

其实每个版本的node，都会自带一个不同版本的npm，可以用`npm -v`来查看npm的版本。全局安装的npm，并不会在不同的node版本中共享。