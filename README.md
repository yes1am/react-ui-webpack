#  react-ui-webpack

学习使用 webpack 进行打包，该包暂未发布。

## 1. 基础
**使用:**
```js
import Avatar from 'react-ui-webpack/lib/avatar/index.js'
import 'react-ui-webpack/lib/avatar/index.css'
```

## 2. 发现的问题

经过测试发现, 用 webpack 打包和 rollup 打包的 [mie-ui](https://github.com/yes1am/mie-ui) 库有点不一样:

1. 当前 UI 库，仅使用 Webpack 打出 ESM 类型的包，当设置 externals 时会有报错.

> The target environment doesn't support EcmaScriptModule syntax so it's not possible to use external type 'module'
while analysing module external "React" for concatenation
Error: The target environment doesn't support EcmaScriptModule syntax so it's not possible to use external type 'module'

具体原因未排查，因此当前打包结果，无法利用 ESM 自带的 tree shaking 来实现按需加载，而因为我们每个组件都进行了打包，因此可以使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 来使用按需加载。

2. 打包结果似乎略大
   
一个 avatar 组件压缩后有 10kb，而源码只有 4kb。且发现打包结果中包含了 css-loader 的相关代码(这感觉很奇怪)，难道样式不应该使用 mini-css-extract-plugin 来进行抽取，而应该使用脚本(比如 gulp )来将 less 转换为 css？


## 3. TODO

找一个 webpack 打包的库看看相关流程，是否不应该只依赖 webpack 进行打包组件库，而应该借助脚本和其他的库