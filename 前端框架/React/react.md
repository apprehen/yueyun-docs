# React脚手架搭建

## Create-react-app基础操作

当下前端开发的主流是**组件化**和**模块化**

- 有助于团队协作开发
- 便于组件的复用：提高开发效率、方便后期维护、减少冗余代码 

### 划分组件：

- 业务组件：针对项目需求封装
  - 普通业务组件：复用性低，只是单独拆选出来的一个模块
  - 通用业务组件：具备复用性
- 功能组件：适用于多个项目「例如：UI 组件库中的组件」
  - 通用功能组件

组件化开发必然会带来工程化，即基于 Webpack / Vite / Rollup / Turbopack 等工具实现组件的合并、压缩、打包等。

### 安装create-react-app

我们可以基于webpack自己去搭建一套工程化打包的脚手架，但是过程会非常麻烦和繁琐，因此可以利用官方提供的脚手架`create-react-app`创建React项目，基于该脚手架创建项目，默认就把 Webpack 的打包规则已经处理好了，把一些项目需要的基本文件也都创建好了。我们可以在其上面做修改

全局安装 create-react-app 脚手架：

```powershell
npm i create-react-app -g
```

检查 create-react-app 的版本（是否安装完成·）：

```powershell
create-react-app --version
```

### 创建工程化项目

创建的命令为：

```powershell
create-react-app [项目名称]
```

> 项目名称应该仅使用数字、小写字母和下划线 `_` 的组合。

创建的项目中会默认安装：

- **react** : React框架的核心
- **react-dom** : React 视图渲染的核心 [基于 React 构建 WebApp（HTML 页面）]
- **react-script**: 脚手架为了让项目目录看起来干净一点，把 Webpack 打包的规则及相关的插件、预处理器等都隐藏到了 node_modules 目录下，react-scripts 就是脚手架中自己对打包命令的一种封装，基于它打包，会调用 node_modules 中的 Webpack 等进行处理

初始化项目的`package.json`

```json
{
  "name": "demo",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4" // 性能检测工具
  },
  // 打包命令是基于 react-scripts 处理的
  "scripts": {
    "start": "react-scripts start", // 开发环境：在本地启动 Web 服务器，预览打包内容
    "build": "react-scripts build", // 生产环境：打包部署，打包的内容输出到 dist 目录
    "test": "react-scripts test",   // 单元测试
    "eject": "react-scripts eject"  // 暴露 Webpack 配置，可以修改默认配置
  },
  // 对 Webpack 中 ESLint 词法检测的相关配置
  // 词法检测
  // - 词法错误（不符合标准规范）
  // - 不符合标准（代码本身不报错，但不符合 ESLint 的检测规范）
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  // 基于 browserlist 规范设置浏览器的兼容情况
  // - postcss-loader + autoprefixer 会给 CSS3 设置相关的前缀
  // babel-loader 会把 ES6 编译为 ES5
  "browserslist": {
    "production": [
      ">0.2%",          // 使用率超过 0.2% 的浏览器
      "not dead",       // 不考虑 IE
      "not op_mini all" // 不考虑欧朋浏览器
    ],
    "development": [ // 不兼容低版本和 IE 浏览器
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

> 值得一提的是，JSON 文件对格式的要求十分严格，是不允许注释的，上面的注释仅帮助理解，在文件中不可使用。

根目录之下，除了 node_modules 子目录，还有两个非常重要的子目录分别为：

- **src**:  所有后续编写的代码，几乎都放在该目录下「打包的时候，一般只对这个目录下的代码进行处理」
- **public**：存放页面模版

将 src 目录下的大部分文件删除，仅留下 index.jsx（如果后缀是 .js，改为 .jsx）文件，其内容改为：

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> {/* React 的严格语法模式，它和 JS 中的 "use strict" 并不相同 */}
        <div>Explosion!!</div>
  </React.StrictMode>
);
```

将 public 目录下的大部分文件删除，仅留下 favicon.ico（项目网站的 logo 图标）和 index.html 文件，并将 index.html 的内容改为：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- 后期 Webpack 打包时，会对这个语法进行编译，其表示 public 这个目录 -->
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React!!</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### 脚手架的进阶应用

暴露webpack配置

前面说到，react-scripts 把 Webpack 打包的规则及相关的插件、预处理器等都隐藏到了 node_modules 目录下了。那么，如果我们想要修改 Webpack 的一些默认配置时，该怎么办呢？

这时就需要使用 `eject` 命令了，即：

```powershell
npm run eject # 或者 yarn eject
```

> 注意：一旦暴露 Webpack 配置，该操作是永久的，就不能还原了。

这时，会发现根目录下会多了 config 和 scripts 两个文件夹，并且 package.json 中内容会变得非常多（把 Webpack 打包需要的所有模块都放在了依赖项中）。

其中，/config/webpack 下有几个文件值得注意：

- webpack.config.js：脚手架中默认 Webpack 打包的配置
- webpackDevServer.config.js：默认 web pack-dev-server 的配置
- paths.js：打包中用到的路径

scripts 目录中的 build.js 是后期执行相关打包命令的入口文件。

在 package.json 增加的依赖中，有几个模块值得注意：

- babel-preset-react-app：它是对 [@babel](https://github.com/babel)/preset-env 语法包的重写，目的是让语法包也可以识别 React 的 jsx 语法，实现代码转换

  > create-react- app 脚手架默认配置是使用的 sass 预编译语言，如果项目中使用的就是 sass，则无需处理；如果使用的是 less 或 stylus，则需要自己处理。

- package.json 中的 scripts 也发生了变化，为：

  ```json
  "scripts": {
      "start": "node scripts/start.js",
      "build": "node scripts/build.js",
      "test": "node scripts/test.js"
  },
  ```

- package.json 中还增加了 babel 配置项：

  ```powershell
  // 对 babel-loader 进行额外配置，等价于 babel.config.js
  "babel": {
      "presets": [
          "react-app"
      ]
  }
  ```

### 常见配置修改

####  使用 less

前面提到，脚手架默认配置是使用的 sass 预编译语言，如果要使用 less，需要自己进行配置：

```powershell
npm install less less-loader@8 # 新版本的 less-loader 兼容性不好
npm uninstall sass-loader
```

然后修改暴露出来的 webpack.config.js 中的配置：

```powershell
// 修改前
...
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
...
{
    test: sassRegex,
    exclude: sassModuleRegex,
    use: getStyleLoaders(
        {
            importLoaders: 3,
            sourceMap: isEnvProduction
            ? shouldUseSourceMap
            : isEnvDevelopment,
            modules: {
                mode: 'icss',
            },
        },
        'sass-loader'
    ),
    sideEffects: true,
},
{
    test: sassModuleRegex,
    use: getStyleLoaders(
        {
            importLoaders: 3,
            sourceMap: isEnvProduction
            ? shouldUseSourceMap
            : isEnvDevelopment,
            modules: {
                mode: 'local',
                getLocalIdent: getCSSModuleLocalIdent,
            },
        },
        'sass-loader'
    ),
},
...
// 修改后
...
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
...
{
    test: lessRegex,
    exclude: lessModuleRegex,
    use: getStyleLoaders(
        {
            importLoaders: 3,
            sourceMap: isEnvProduction
            ? shouldUseSourceMap
            : isEnvDevelopment,
            modules: {
                mode: 'icss',
            },
        },
        'less-loader'
    ),
    sideEffects: true,
},
{
    test: lessModuleRegex,
    use: getStyleLoaders(
        {
            importLoaders: 3,
            sourceMap: isEnvProduction
            ? shouldUseSourceMap
            : isEnvDevelopment,
            modules: {
                mode: 'local',
                getLocalIdent: getCSSModuleLocalIdent,
            },
        },
        'less-loader'
    ),
},
...
```

#### 增加alias @

```powershell
// path.js中有
// 在暴露 Webpack 配置之后，项目中多了 config 文件夹，其内部有paths.js 文件，其中导出的代码中，有一行为：
appSrc: resolveApp('src'),
// 修改前
extensions: paths.moduleFileExtensions
    .map(ext => `.${ext}`)
    .filter(ext => useTypeScript || !ext.includes('ts')),
alias: {
    'react-native': 'react-native-web',
    ...
// 修改后
extensions: paths.moduleFileExtensions
    .map(ext => `.${ext}`)
    .filter(ext => useTypeScript || !ext.includes('ts')),
alias: {
    '@': paths.appSrc,
    'react-native': 'react-native-web',
    ...
```

#### 修改域名或端口号

默认情况下，启动项目使用的是 `localhost:3000`，可以在 scripts/start.js 文件中修改：

```javascript
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000; // 可修改端口号
const HOST = process.env.HOST || '0.0.0.0'; // 可修改 IP（或域名）
```

如果想基于修改环境变量的方式来改，需要先安装 cross-env，如下:

```json
// npm i cross-env # 或 yarn add cross-env
// 修改前
"scripts": {
    "start": "node scripts/start.js",
    ...
},
// 修改后
"scripts": {
    "start": "cross-env PORT=8080 node scripts/start.js",
    ...
},
```

#### 修改浏览器兼容

如果需要修改浏览器的兼容性，则需要修改 package.json 中 `"browserslist"` 项的内容。

但是，修改兼容列表实现浏览器兼容时，只能解决两个问题，即：

1. 对 postcss-loader 生效，控制 CSS3 的前缀
2. 对 babel-loader 生效，控制 ES6 的转换

但还存在一个问题，就是无法处理 ES6 内置 API 的兼容。

为了解决这个问题，你可以安装 [@babel](https://github.com/babel)/polyfill（其作用是对常见的内置 API 进行重写），然后在入口文件（index.jsx）中引入 `import '@babel/polyfill'`。

但是，在脚手架中，通常不需要安装它，因为脚手架默认已经安装了 react-app-polyfill，它是对 [@babel](https://github.com/babel)/polyfill 的重写，仅需要在入口文件（index.jsx）中引入：

```json
// 对 ES6 内置 API 的兼容性处理
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
```

# MVC模式和MVVM模式

主流web前端框架

- React
- Vue
- Angular

主流设计思想：不直接操作DOM，而是改成数据驱动的思想

操作DOM思想：

- 操作DOM比较消耗性能，不熟悉可能会导致DOM重排/重绘等
- 操作起来也相对麻烦一些

数据驱动思想：

- 操作数据，框架会按照相关的数据，让页面重新渲染
- 框架底层构建从虚拟 DOM（Virtual DOM）到真实DOM的渲染体系，有效避免 DOM 的重排和重绘
- 相比真实 DOM，虚拟 DOM 更为轻量级，效率更高
- 开发效率高，性能高

React 框架采用的是 MVC 体系；Vue 采用的是 MVVM 体系。

MVC = Model + View + Controler 控制层

- **单向驱动**（视图 -> 数据需要开发者自行写代码实现）
- 需要按照专业的语法去构建视图（页面）：React 中是基于 jsx 语法来构建视图的
- 构建数据层：但凡在视图中，需要“动态”处理的（需要变化的，不论是样式还是内容），都要有对应的数据模型
- 控制层：当在视图中（或者根据业务需求）进行某些操作时，都是去修改相关的数据，然后 React 框架会按照最新的数据，重新渲染视图，以此让用户看到最新的效果

MVVM = Model 数据层 + View 视图层 + ViewModel 数据视图监听层

- **双向驱动**
- 数据驱动视图的渲染：监听数据的更新，让视图重新渲染
- 视图驱动数据的更改：监听页面中表单元素的内容改变，自动去修改相关的数据
- Vue自己实现了Template

# JSX语法

jsx：JavaScript amd XML (html) 把JS和HTML标签混合在一起

```jsx
import React from 'react'; // React 语法核心
import ReactDOM from 'react-dom/client'; // 构建 HTML(WebApp) 的核心
// 获取页面中的 #root 容器，作为根容器，不能将 html、body 元素作为根容器
const root = ReactDOM.createRoot(document.getElementById("root"));
// 基于 render 方法渲染编写的视图，把渲染后的内容，全部插入到 #root 元素中
// 每一个构建的视图是能有一个根节点
root.render(
    <>  
    {/* 空文档标记标签 React.Fragment，不会增加层结构，既保证了只有一个根节点，又不增加一个 HTML 层级结构 */}
        <div>Explosion！！</div>
    </>
);
```

可以通过 `{}` 嵌入 JS 表达式来渲染：

```
import React from 'react';
import ReactDOM from 'react-dom/client';
const root = ReactDOM.createRoot(document.getElementById("root"));
let text = "Explosion";
root.render(
    <div>
        {text}
    </div>
);
```

常见的 JS 表达式有：

- 变量/值
- 数学运算
- 三目表达式
- 借助于数组迭代方法的循环，`map filter`等
- 有返回值的函数调用

`{}` 语法中嵌入不同的值，所呈现出来的特点如下：

- number / string：值是什么，就渲染出来什么

- bool / null / undefined / Symbol / Bigint：渲染内容是空

- 普通对象：不支持渲染

- 数组对象：把每一项拿出来，分别渲染（并不是变为字符串渲染，中间没有逗号，如果数组中有不支持渲染的元素，如普通对象，也会报错）

- 正则对象、时间对象、包装类对象：不支持渲染

- 函数对象：不支持在 `{}` 中渲染，但是可以作为函数组件，作为组件 `<componment />` 渲染

  > 除数组对象之外，其余对象一般都不支持在 `{}` 中渲染，但也有特殊情况：
  >
  > - JSX 虚拟 DOM 对象
  > - 给元素设置 style 样式，要求写成一个对象格式

元素设置行内样式
行内样式，需要基于对象的格式处理，直接写成字符串会报错。

```html
<h2 style={{color: 'red', fontSize: '18px'}}>Learn React</h2>
```

样式属性要基于小驼峰命名法。
设置样式类名：要把 `class` 替换为 `className`：

```html
<h2 className="box"></h2>
```

需求一：基于数据的值，来判断元素的显示隐藏

```html
<div>
    {/* 控制元素是否显示，不论显示还是隐藏，元素本身已经渲染出来了 */}
    <div style={{
            display: this.flag ? "block" : "none"
        }}>显示
    </div>
    {/* 控制元素是否渲染 */}
    {this.flag ? <button>渲染/不渲染</button> : null}
</div>
```

需求二：从服务器获取了一组列表数据，循环动态绑定相关的内容

```html
const root = ReactDOM.createRoot(document.getElementById('root'))
let data = [
    {
        id: 1,
        title: '新闻一'
    },
    {
        id: 2,
        title: '新闻二'
    },
    {
        id: 3,
        title: '新闻三'
    }
]
root.render(
    <>
        <h2 className="title">今日新闻</h2>
        <ul className="news-box">
            {
                data.map( (item, index) => {
                    return <li key={item.id}>
                        <em>{item.id}</em>
                        &nbsp;&nbsp;
                        <span>{item.title}</span>
                    </li>
                } )
            }
        </ul>
        <br />
        {/* 扩展需求：没有数组，就是想单独循环 5 ci */}
        {
            new Array(5).fill(null).map( (_, index) => {
                return <button key={index}>
                    按钮{index + 1}
                </button>   
            })
        }
    </>
)
```

> 对于 `Array()` 函数，如果参数仅传入一个数值，则该参数表示长度，即：
>
> ```js
> new Array(5) // 返回数组长度为 5 的稀疏数组，其每一项都是 empty
> ```
>
> 使用数组的迭代方法（`forEach` 或 `map`），它们不会去迭代稀疏数组，例如：
>
> ```js
> let arr = new Array(5)
> arr.forEach( () => {
>     console.log('OK') // 不打印任何输出
> } )
> ```
>
> 可以基于数组的 `fill` 方法，将稀疏数组进行填充，变为密集数组，就可以使用数组的迭代方法了。
>
> ```js
> let arr2 = arr.fill(null) // arr2 = [null, null, null, null, null]
> arr2.forEach( () => {
>     console.log(&#39;OK&#39;) // 输出 5 次 &#39;ok&#39;
> } )J
> ```

# JSX 底层渲染机制

- 编写的JSX语法，编译成虚拟DOM对象，virtual DOM对象是一个普通的JS对象，用来描述真实DOM对象的

- 虚拟DOM对象：框架内部自构建的一套对象体系(对象的相关成员都是React内部规定的，基于属性构建视图，相关特征)

- 基于babel-preset-react-app插件，把JSX语法编译成React.createElement(...)语法,React.createElement(ele,props,...children)

  > ele:元素类型，字符串或者函数，函数就是组件
  > props:当前元素的属性对象,没有就是null
  >
  > children:当前元素的子元素，没有就是undefined

- React.createElement执行，返回一个对象，对象中包含了当前元素的描述信息(虚拟DOM对象)

- ```javascript
  let virtualDOM = {
        $$typeof: Symbol(react.element),
        ref: null,
        key: null,
        type: 'h1', // 标签名 [组件]
        props: {
           id: 'title',
           className: 'title',
           children: 'hello world'
        }
     }
  ```

- 把构建的virtual DOM对象渲染成真实的DOM元素，第一次渲染是把所有的内容都渲染到页面中，第二次及以后的渲染，都是把最新的数据和上一次的虚拟DOM进行比对(DOM-DIFF)，把不同的地方重新渲染(PATCH)，这样可以提升渲染的性能 

基于ReactDom中的render方法

- v16

  ```javascript
  ReactDOM.render(virtualDOM, container, callback)
     ReactDOM.render(
        <>...</>,
        document.getElementById('root')
     )
  ```

- v18

  ```javascript
  cosnt root = ReactDOM.createRoot(doucment.getElementById('root'))
     root.render(
        <>...</>
     )
  ```

**封装一个对象的迭代方法**

1. 基于传统的 for/in 循环，会存在一些弊端*【性能差(公有私有都会迭代)，只能迭代"可枚举"，非Symbol类型的属性】*
2. 解决办法：获取对象的所有私有属性
   a. `Object.getOwnPropertyNames(arr)` --> 获取对象的私有属性(不包含Symbol类型的属性)
   b. `Object.getOwnPropertySymbols(arr)` --> 获取对象的私有Symbol类型的属性名
   c. 获取所有私有属性
   `let keys = Object.getOwnPropertyNames(arr).concat(Object.getOwnPropertySymbols(arr))`
3. 可以基于ES6中的reflect.ownKeys代替上述操作 *[不能兼容IE]*
   `let keys = Reflect.ownKeys(arr)`

```javascript
export const each = (obj:any,callback:Function)=> {
  if (obj === null || typeof obj !== 'object') throw new TypeError('obj is not a object')
  if(callback === null || typeof callback !== 'function') throw new TypeError('callback is not a function')
  let keys = Reflect.ownKeys(obj)
  keys.forEach((key:any)=>{
    callback(key,obj[key])
  })
}
```

#  函数组件的底层渲染机制

## 函数组件

在SRC目录中，创建一个xxx.jsx文件就是创建一个组件；在此文件夹中创建一个函数，让函数返回jsx视图[jsx元素，虚拟DOM]，这就是函数组件

调用:  基于ES6Module规范，导入创建的组件可以不用.jsx，写标签调用组件即可
`<Component/ >单闭合 <Component></Component> 双闭合`

调用组件的时候可以给调用的组件设置传递各种各样的属性
`<DemoOne title="我是标题" x={10} data={[100,200]} className="box" style={{fontSize:'20px'}}></DemoOne>`
a. 如果设置的属性不是字符串格式，需要基于`{}` 进行嵌套
b. 调用组件的时候，可以把一些数据/信息基于属性props的方式，传递给组件

命名：组件的名字，采用大驼峰PascalCase命名

**渲染机制** :
  1 基于`babel-preset-react-app`把调用的组件转换为createElement格式

```javascript
React.createElement(DemoOne,{
	title: "\u62ll\u662F\u6807\u9898",
	x: 10,
	data: [100,200],
	className: "box",
	style: {
		fontSize: '20px'
	}
})
```

  2 把createElement方法执行，创建出一个virtualDom对象

```javascript
{
    $$typeof: Symbol(react.element),
    key: null,
    props: {title: '我是标题',x: 10, data: 数组,className: 'box', style: {fontSize: '20px'}},// 子节点[双闭合调用，则也包含children储存子节点]
    ref: null.
    type: DemoOne
}
```

  3 基于root.render 把 virtualDom变成真是的Dom
	type值不再是一个字符串,而是变成一个函数此时

- 把函数执行 -> DemoOne()
- 把virtualDom中的props,作为实参传递给函数 -> DemoOne(props)
- 接收函数执行的返回结果(当前组件的virtualDOM对像)
- 最后基于render把组件返回的虚拟DOM变成真实的DOM，插入到#root容器中

## 属性props的处理

调用组件，传递进去的属性是“只读”的 [原理：props对象被冻结了]
	获取： props.xxx 
	修改：props.xxx = xxx ==> 报错error

> 关于对象的规则设置
>
> - 冻结
>   冻结对象：Object.freeze(obj)
>   检测是否被冻结：Object.isFrozen(obj) => true/false
>   被冻结的对象：不能修改成员值、不能新增成员、不能删除现有成员、不能给成员做劫持[Object.defineProperty]
> - 密封
>   密封对象：Object.seal(obj)
>   检测是否被密封：Object.isSealed(obj)
>   被密封的对象：可以修改成员的值，但也不能删、不能新增、不能劫持
> - 扩展
>   把对象设置成不可扩展：Object.preventExtensions(obj)
>   检测是否可扩展：Object,isExtensible(obj)
>   被设置不可扩展的对象：除了不能新增成员，其余都可操作

​	作用：父组件(index.jsx)调用子组件(DemoOne.jsx)的时候,可以基于属性，把不同的信息传递给子组件；子组件接受相应的属性值，呈现出不同的效果，让组件的复用性更强！！
 	虽然对于传递进来的属性，我们不能直接修改，但是可以做一些规则校验
​	设置默认值：
​		函数组件.defaultProps = {
​			x：0,
​			.....	
​		}
​	设置其他规则，例如：数据值格式、是否必传。。。[依赖官方的插件：prop-types]
`import PropTypes from 'prop-types'`
函数组件.propTypes = {

​	title: PropTypes.string.isRequired
​	x: PropTypes.number
​	y: PropTypes.oneOfType([

​		PropTypes.number

​		PropTypes.bool
​	])

}
传递进来的属性，首先会经历规则的校验，不管校验成功还是失败，最后都会把属性给props，只不过如果不符合设定的规则，控制台会抛出警告错误(不影响属性值的获取)
如果想把传递的属性值进行修改，我们可以赋值给其他内容或者修改变量/状态值

## 插槽slot处理机制

封装DemoOne组件具有更强的复用性 [传递HTML结构]

```react
<DemoOne title='xx' x={100}>
    <button solt='explosion'>确定</button>
    <button solt='explosion1'>取消</button>
</DemoOne>
```

封装组件的时候，预留插槽位置，内容不用写，调用组件的时候基于双闭合调用的方式把插槽信息【子节点信息】传递给组件，组件内部进行渲染即可
`props.children` 获取子节点信息

> 传递数据用属性
> 传递HTML结构用插槽

在组件中对`children`进行处理

```react
const DemoOne = (props) => {
    let {title, x, children } = props
    // 对children的类型做处理 可以基于 React.Children 对象中提供的方法，对props.children做处理：count\forEach\map\toArray ... (对children做了较好的处理)
}
```

比如下面的一个简单的例子

```react
root.render(
	<>
    	<DemoOne title='哈哈' x={10}>
        	// 取slot字段名 进行判断筛选处理
        	<span slot='footer'>我是页脚</span>
        	<span>哈哈</span>
        	<span slot='header'>我是页眉</span>
    	</DemoOne>
    </>
)
```

```react
const DemoOne = (props) => {
    let {title, x, children } = props
    children = React.Children.toArray(children)
    let headerSlot=[],
        footerSlot=[],
        defaultSlot=[];
    children.forEach(child=>{
        // 传递进来的插槽信息都是编译的virtualDOM 不是标签
        let {slot} = child.props
        if (slot === 'header') {
            headerSlot.push(child)
        } else {
            ...
        }
    })
    return <div>
        	{headerSlot}
        </div>
}
```

## 静态组件

函数组件是静态组件
	第一次渲染组件，把函数执行：

- 产生一个私有的上下文：EC(V)
- 把解析出来的props [包含children] 传递进来 [被冻结]
- 对函数返回的JSX元素进行渲染

​	当我们点击按钮的时候，会把函数绑定并且执行

- 修改上级上下文EC(V)中变量
- 私有变量值发生了改变
- 视图不会更新

类组件写法

```react
/*
创建类组件
	创建一个构造函数(类)
	要求必须继承React.Component/PureComponent这个类
	习惯于使用ES6中的class创建类
	必须给类设置render方法放在原型上面在render中返回需要渲染的视图
*/
import React from 'react'
class Vote extends React.Component {
    render() {
        return <>
        	...
        </>
    }
}
```

# React中的事件

```react
const App = () => {
	const clickHandler = (event) => {
		event.preventDefault() // 取消默认行为
		event.stopPropagation() // 取消事件的冒泡

		alert("我是App中的clickHandler！")
		/*
		 *     在React中，无法通过return false取消默认行为
		 *     return false;
		 *
		 *     事件对象
		 *         - React事件中同样会传递事件对象，可以在响应函数中定义参数来接收事件对象
		 *         - React中的事件对象同样不是原生的事件对象，是经过React包装后的事件对象
		 *         - 由于对象进行过包装，所以使用过程中我们无需再去考虑兼容性问题
		 * */
	}

	return (
		<div
			onClick={() => {
				alert("div")
			}}
			style={{
				width: 200,
				height: 200,
				margin: "100px auto",
				backgroundColor: "#bfa",
			}}
		>
			{/*
      在React中事件需要通过元素的属性来设置，
        和原生JS不同，在React中事件的属性需要使用驼峰命名法：
           onclick -> onClick
           onchange -> onChange
        属性值不能直接执行代码，而是需要一个回调函数：
          onclick="alert(123)"
          onClick={()=>{alert(123)}}
    */}
			<button
				onClick={() => {
					alert(123)
				}}
			>
				点我一下
			</button>
			<button onClick={clickHandler}>哈哈</button>
			<br />
			<a href="https://www.baidu.com" onClick={clickHandler}>
				超链接
			</a>
		</div>
	)
}

/*
 *   <button onclick="alert(123)">点我一下</button>
 *
 *   <button id="btn01">点我一下</button>
 *
 *   document.getElementById('btn01').onclick = function(){};
 *   document.getElementById('btn01').addEventListener('click', function(){}, false);
 *
 *
 * */

// 导出App
export default App

```

# React中的state

```js
import './App.css';
import {useState} from "react";

const App = () => {

  console.log('函数执行了 ---> 组件创建完毕！');

  /*
  * 在React中，当组件渲染完毕后，再修改组件中的变量，不会使组件重新渲染
  *   要使得组件可以收到变量的影响，必须在变量修改后对组件进行重新渲染
  *   这里我们就需要一个特殊变量，当这个变量被修改使，组件会自动重新渲染
  *
  * state相当于一个变量，
  *   只是这个变量在React中进行了注册，
  *   React会监控这个变量的变化，当state发生变化时，会自动触发组件的重新渲染
  *   使得我们的修改可以在页面中呈现出来
  *
  * 在函数组件中，我们需要通过钩子函数，获取state
  *
  * 使用钩子 useState() 来创建state
  *   import {useState} from "react";
  *
  * 它需要一个值作为参数，这个值就是state的初始值
  *   该函数会返回一个数组
  *     数组中第一个元素，是初始值
  *       - 初始值只用来显示数据，直接修改不会触发组件的重新渲染
  *     数组中的第二个元素，是一个函数，通常会命名为setXxx
  *       - 这个函数用来修改state，调用其修改state后会触发组件的重新渲染，
  *           并且使用函数中的值作为新的state值
  *
  *
  *
  *
  * */

  const [counter, setCounter] = useState(1);
  // let counter = result[0];
  // let setCounter = result[1];
  // const [counter, setCounter] = result;
  /*
  *   当点击+时，数字增大
  *   点击-时，数字减少
  * */

  // 创建一个变量存储数字
  // let counter = 2;

  const addHandler = () => {
    // 点击后数字+1
    // alert('+1');
    // counter++;
    setCounter(counter + 1); // 将counter值修改为2
  };

  const lessHandler = () => {
    // 点击后数字-1
    // alert('-1');
    // counter--;

    setCounter(counter-1);

  };

  return <div className={'app'}>
    <h1>{counter}</h1>
    <button onClick={lessHandler}>-</button>
    <button onClick={addHandler}>+</button>
  </div>;
};

// 导出App
export default App;

```

# state的注意

**state**

- state实际就是一个被React管理的变量，当我们通过setState()修改变量的值时，会触发组件的自动重新渲染

- 只有state值发生变化时，组件才会重新渲染

- 当state的值是一个对象时，修改时是使用新的对象去替换已有对象

- 当通过setState去修改一个state时，并不表示修改当前的state它修改的是组件下一次渲染时state值

- setState()会触发组件的重新渲染，它是异步的所以当调用setState()需要用旧state的值时，一定要注意**有可能出现计算错误的情况**为了避免这种情况，可以通过为setState()传递回调函数的形式来修改state值

  ```react
  import {useState} from "react";
  const [counter, setCounter] = useState(1);
  const [user, setUser] = useState({name: '孙悟空', age: 18});
  const addHandler = () => {
          setTimeout(() => {
              // setCounter(counter + 1); // 将counter值修改为2
              setCounter((prevCounter)=>{
                             
                  /*
                  *   setState()中回调函数的返回值将会成为新的state值
                  *       回调函数执行时，React会将最新的state值作为参数传递
                  * */
                  return prevCounter + 1;
              });
  
              // setCounter(prevState => prevState + 1);
          }, 1000);
          const updateUserHandler = () => {
          // setUser({name:'猪八戒'});
  
          // 如果直接修改旧的state对象，由于对象还是那个对象，所以不会生效
          // user.name = '猪八戒';
          // console.log(user);
          // setUser(user);
  
          // const newUser = Object.assign({}, user);
          // newUser.name = '猪八戒';
          // setUser(newUser);
  
          setUser({...user, name: '猪八戒'});
  
  
      };
  
      return <div className={'app'}>
          <h1>{counter} -- {user.name} -- {user.age}</h1>
          <button onClick={addHandler}>1</button>
          <button onClick={updateUserHandler}>2</button>
      </div>;
  };
  
  // 导出App
  export default App;
  ```

# React中的双向数据绑定

**使用`useState`去控制表单**

```react
import React, { useState } from "react"
import Card from "../UI/Card/Card"
import "./LogsForm.css"
const LogsForm = () => {
	/*
	 *   当表单项发生变化时，获取用户输入的内容
	 * */
	// 创建三个变量，用来存储表单中的数据
	// let inputDate = '';
	// let inputDesc = '';
	// let inputTime = 0;

	// const [inputDate, setInputDate] = useState('');
	// const [inputDesc, setInputDesc] = useState('');
	// const [inputTime, setInputTime] = useState('');

	// 将表单数据统一到一个state中
	const [formData, setFormData] = useState({
		inputDate: "",
		inputDesc: "",
		inputTime: "",
	})

	// 创建一个响应函数，监听日期的变化
	const dateChangeHandler = (e) => {
		// 获取到当前触发事件的对象
		// 事件对象中保存了当前事件触发时的所有信息
		// event.target 执行的是触发事件的对象（DOM对象）
		//console.log(e.target.value);
		// setInputDate(e.target.value);
		setFormData({
			...formData,
			inputDate: e.target.value,
		})
	}

	// 监听内容的变化
	const descChangeHandler = (e) => {
		// 获取到当前触发事件的对象
		// 事件对象中保存了当前事件触发时的所有信息
		// event.target 执行的是触发事件的对象（DOM对象）
		//console.log(e.target.value);
		// setInputDesc(e.target.value);

		setFormData({
			...formData,
			inputDesc: e.target.value,
		})
	}

	//监听时长的变化
	const timeChangeHandler = (e) => {
		// 获取到当前触发事件的对象
		// 事件对象中保存了当前事件触发时的所有信息
		// event.target 执行的是触发事件的对象（DOM对象）
		//console.log(e.target.value);
		// setInputTime(e.target.value);
		setFormData({
			...formData,
			inputTime: e.target.value,
		})
	}

	// 当表单提交时，汇总表单中的数据
	/*
	 *   在React中，通常表单不需要自行提交
	 *       而是要通过React提交
	 * */
	const formSubmitHandler = (e) => {
		// 取消表单的默认行为
		e.preventDefault()
		// 获取表单项中的数据日期、内容、时长
		// 将数据拼装为一个对象
		const newLog = {
			date: new Date(formData.inputDate),
			desc: formData.inputDesc,
			time: +formData.inputTime,
		}

		// 清空表单项
		setFormData({
			inputDate: "",
			inputDesc: "",
			inputTime: "",
		})

		console.log(newLog)

		/*
		 *   提交表单后如何清空表单中的旧数据
		 *       现在这种表单，在React我们称为非受控组件
		 *
		 *   我们可以将表单中的数据存储到state中，
		 *       然后将state设置为表单项value值，
		 *       这样当表单项发生变化，state会随之变化，
		 *       反之，state发生变化，表单项也会跟着改变，这种操作我们就称为双向绑定
		 *       这样一来，表单就成为了一个受控组件
		 *
		 *
		 *
		 * */
	}

	return (
		<Card className="logs-form">
			<form onSubmit={formSubmitHandler}>
				<div className="form-item">
					<label htmlFor="date">日期</label>
					<input
						onChange={dateChangeHandler}
						value={formData.inputDate}
						id="date"
						type="date"
					/>
				</div>
				<div className="form-item">
					<label htmlFor="desc">内容</label>
					<input
						onChange={descChangeHandler}
						value={formData.inputDesc}
						id="desc"
						type="text"
					/>
				</div>
				<div className="form-item">
					<label htmlFor="time">时长</label>
					<input
						onChange={timeChangeHandler}
						value={formData.inputTime}
						id="time"
						type="number"
					/>
				</div>
				<div className="form-btn">
					<button>添加</button>
				</div>
			</form>
		</Card>
	)
}

export default LogsForm
```

# React中的portal

- 组件默认会作为父组件的后代渲染到页面中

  > 存在一些问题 比如要写对话框和模态框的时候需要渲染到根目录下

- 通过protal可以将组件渲染到页面中的指定位置

- 使用方法

  - 在`index.html`添加一个新元素
  - 修改组件的渲染方式
    - 通过ReactDom.createPortal() 作为返回值创建元素
    - 参数
      1. jsx (修改前return的代码)
      2. 目标位置 (DOM元素)

  ```javascript
  import React from 'react';
  import './Backdrop.css';
  import ReactDOM from "react-dom";
  
  // 获取backdrop的根元素
  const backdropRoot = document.getElementById('backdrop-root');
  
  const Backdrop = (props) => {
      return ReactDOM.createPortal(<div className="backdrop">
          {props.children}
      </div>, backdropRoot);
  };
  
  export default Backdrop;
  ```

# React中的`CSS-Module`

CSS模块

- 类似于Vue中的style中的`scope`可以避免被全局污染
- 使用步骤
  1. *创建一个xxx.module.css*
  2. *在组件中引入css*
     `import classes from './App.module.css';`
  3. *通过classes来设置类*
     `className={classes.p1}`
  4. *CSS模块可以动态的设置唯一的class值*

# React.Fragment

- 是一个专门用来作为父容器的组件
- *它只会将它里边的子元素直接返回，不会创建任何多余的元素*
- 当我们希望有一个父容器**但同时又不希望父容器在网页中产生多余的结构时**就可以使用Fragment

# React中的Context

`Context`相当于一个公共的存储空间,我们可以将多个组件中都需要访问的数据统一存储到一个`Context`中,这样无需通过`props`逐层传递,即可使组件访问到这些数据
通过`React.createContext()`创建context

```javascript
import React from 'react'
const TestContext = React.createContext({
    name: '月晕',
    age: 18
})
```

使用方式

- 使用方式一(不推荐)

  1. 引入context

  2. 使用`Xxx.Consumer`组件来创建元素

  3. Comsumer的标签体需要一个回调函数会将context设置为回调函数的参数通过参数能访问到context中存储的数据

     ```javascript
     import React from 'react';
     import TestContext from "../store/testContext";
     const A = () => {
         return (
             <TestContext.Consumer>
                 {(ctx)=>{
                    return <div>
                        {ctx.name} - {ctx.age}
                    </div>
                 }}
             </TestContext.Consumer>
         );
     };
     
     export default A;
     ```

- 使用Context方式二

  1. 导入Context
  2. 使用钩子函数useContext()获取到context
  3. useContext() 需要一个Context作为参数它会将Context中数据获取并作为返回值返回

- Xxx.Provider

  - *表示数据的生产者，可以使用它来指定Context中的数据*

  - 通过value来指定Context中存储的数据， 这样一来，在该组件的所有的子组件中都可以通过Context来访问它所指定数据

  - 当我们通过Context访问数据时，他会读取离他最近的Provider中的数据，如果没有Provider，则读取Context中的默认数据

    ```javascript
    import React, {useContext} from 'react';
    import TestContext from "../store/testContext";
    const B = () => {
    
        // 使用钩子函数获取Context
        const ctx = useContext(TestContext);
    
        return (
            <div>
                {ctx.name} -- {ctx.age}
            </div>
        );
    };
    
    export default B;
    ```

# React中的Effect

## Effect

**React**组件有部分逻辑都可以直接编写到组件的函数体中，像是对数组调用`filter、map`等方法，像是判断某个组件是否显示等。但是有一部分逻辑如果直接写在函数体中，会影响到组件的渲染，这部分会产生“副作用”的代码，是一定不能直接写在函数体中。

## React.StrictMode

编写React组件时，我们要极力的避免组件中出现那些会产生“副作用”的代码。同时，如果你的React使用了严格模式，也就是在React中使用了`React.StrictMode`标签，那么React会非常“智能”的去检查你的组件中是否写有副作用的代码，当然这个智能是加了引号的，我们来看看React官网的文档是如何说明的：

Strict mode can’t automatically detect side effects for you, but it can help you spot them by making them a little more deterministic. This is done by intentionally double-invoking the following functions:

- Class component `constructor`, `render`, and `shouldComponentUpdate` methods
- Class component static `getDerivedStateFromProps` method
- Function component bodies
- State updater functions (the first argument to `setState`)
- Functions passed to `useState`, `useMemo`, or `useReducer`

上文的关键字叫做“double-invoking”即重复调用，这句话是什么意思呢？大概意思就是，React并不能自动替你发现副作用，但是它会想办法让它显现出来，从而让你发现它。那么它是怎么让你发现副作用的呢？React的严格模式，在处于开发模式下，会主动的重复调用一些函数，以使副作用显现。所以在处于开发模式且开启了React严格模式时，这些函数会被调用两次：

- 类组件的的 `constructor`, `render`, 和 `shouldComponentUpdate` 方法
- 类组件的静态方法 `getDerivedStateFromProps`
- 函数组件的函数体
- 参数为函数的`setState`
- 参数为函数的`useState`, `useMemo`, or `useReducer`

重复的调用会使副作用更容易凸显出来，你可以尝试着在函数组件的函数体中调用一个`console.log`你会发现它会执行两次

## setState执行流程

**Too many re-renders**

- 当我们直接在函数中调用setState时,就会触发上述报错
- setState() 的执行流程 (函数组件)
  `setCount()`---> dispatchSetDate()--->会先判断，组件当时处于什么阶段 ( 如果是渲染阶段 ---> 不会检查state值是否相同 | 如果不是渲染阶段---> 值不同，重新渲染；值相同，不重新渲染)

## 使用useEffect

`useEffect()`是一个钩子函数，需要一个函数作为参数，这个作为参数的函数，将会在组件渲染完毕后执行，开发中可以将会产生副作用的代码编写到其中

- 默认情况下，useEffect()中的函数,会在组件渲染完成后调用，并且是每次渲染完成后都会调用

- 在useEffect() 可以传递一个第二参数，第二参数是一个数组，在数组中可以指定Effect的依赖项，指定后，只有当依赖项发生变化时，Effect才会被触发

- 通常会将Effect中使用的所有的变量都设置成依赖项

  ```javascript
  useEffect(()=>{
      console.log('执行了～～')
      if(ctx.totalAMount === 0) {
          setShowDetails(false)
      }
  },[ctx])
  ```

- **setState()**是由钩子函数useState()生成的 不会发现变化可以不用加到dep里面

- 如果依赖项设置的是空数组，则意味Effect只会在组件初始化时触发一次

## Effect函数的返回

在Effect的回调函数中，可以指定一个函数作为返回值，这个函数可以称为清理函数，他会在下次Effect执行前调用可以在此函数中，做一些工作来清除上次Effect执行所带来的影响

```javascript
Effetc(()=>{
    const timer = setTimeout(()=>{
        console.log('触发了')
        props.onFilter(keyword)
    },1000)
    return () => {
        clearTImeout(timer)
    }
},[keyword])
```

# React中的Reducer

在React的函数组件中，我们可以通过useState()来创建state。这种创建state的方式会给我们返回两个东西state和setState()。state用来读取数据，而setState()用来设置修改数据。但是这种方式也存在着一些不足，因为所有的修改state的方式都必须通过setState()来进行，如果遇到一些复杂度比较高的state时，这种方式似乎就变得不是那么的优雅，比如现在有很多数据，但是`useState()`只给我们提供了一个`setCartData()`方法，就会很麻烦

为了解决复杂`State`带来的不便，`React`为我们提供了一个新的使用`State`的方式。`Reducer`个人认为`Reducer`可以翻译为“整合器”，它的作用就是将那些和同一个`state`相关的所有函数都整合到一起，方便在组件中进行调用。

当然工具都有其使用场景，`Reducer`也不例外，它只适用于那些比较复杂的`state`，对于简单的`state`使用`Reducer`只能是徒增烦恼。下面用一个简单的演示一下

和`State`相同`Reducer`也是一个钩子函数，语法如下：
`const [state, dispatch] = useReducer(reducer, initialArg, init);`
参数

- **reducer**：整合函数
  - *对于我们当前state的所有操作都应该在该函数中定义*
  - *该函数的返回值，会成为state的新值*
  - *reducer在执行时，会收到两个参数：*
    - *state 当前最新的state*
    - action 它需要一个对象 在对象中会存储dispatch所发送的指令
- **initialArg** : state的初始值，作用和useState()中的值是一样

返回值

- **数组**
  - *第一个参数，state 用来获取state的值*
  - *第二个参数，state 修改的派发器**通过派发器可以发送操作state的命令**具体的修改行为将会由另外一个函数(reducer)执行*

```javascript
import React, {useReducer, useState} from 'react';
// 为了避免reducer会重复创建，通常reducer会定义到组件的外部
const countReducer = (state, action) => {
    // console.log('reducer执行了！', state);
    // console.log(action.type);
    // 可以根据action中不同type来执行不同的操作
    // if(action.type === 'ADD'){
    //     return state + 1;
    // }else if(action.type === 'SUB'){
    //     return state - 1;
    // }
    // return state;

    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'SUB':
            return state - 1;
        default:
            return state;
    }
};

const App = () => {
    // 之前的写法
    // const [count, setCount] = useState(1);
    //
    // const addHandler = () => {
    //     setCount(prevState => prevState + 1);
    // };
    //
    // const subHandler = () => {
    //     setCount(prevState => prevState - 1);
    // };
    // 现在的写法
    const [count, countDispatch] = useReducer(countReducer, 1);
    const addHandler = () => {
        // 增加count的值
        countDispatch({type: 'ADD'});
    };

    const subHandler = () => {
        // 增加count的值
        countDispatch({type: 'SUB'});
    };
    return (
            <div style={{fontSize: 30, width: 200, height: 200, margin: '100px auto', textAlign: 'center'}}>
                <button onClick={subHandler}>减少</button>
                {count}
                <button onClick={addHandler}>增加</button>
            </div>
        );
 }
```

# React中的memo

  **React.memo()** 是一个高阶组件

- *它接收另一个组件作为参数，并且会返回一个包装过的新组件*
- *包装过的新组件就会具有缓存功能，**装过后，只有组件的props发生变化化**才会触发组件的重新的渲染，否则总是返回缓存中结果*

# React中的useCallback

**useCallback**：是一个钩子函数，用来创建React中的回调函数，创建的回调函数不会总在组件重新渲染时重新创建
`useCallback()`参数

1. 回调函数
2. 依赖数组
   - *当依赖数组中的变量发生变化时，回调函数才会重新创建*
   - *如果不指定依赖数组，回调函数每次都会重新创建*
   - *一定要将回调函数中使用到的所有变量都设置到依赖数组中*  除了（setState）

# React中的Hooks

React中的钩子函数只能在函数组件或自定义钩子中调用，我们需要将React中钩子函数提取到一个公共区域时，就可以使用自定义钩子
*自定义钩子其实就是一个普通函数，只是它的名字需要使用use开头*
比如下面封装了`fetch`自定义函数

```javascript
import {useCallback, useState} from "react"
export default function useFetch() {
    const [data, setData] = useState([]);
    // 添加一个state来记录数据是否正在加载,false表示没有加载数据，true表示加载
    const [loading, setLoading] = useState(false);
    // 创建一个state来记录错误信息
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('http://localhost:1337/api/students');
            //判断请求是否加载成功
            if (res.ok) {
                const data = await res.json();
                setData(data.data);
            } else {
                throw new Error('数据加载失败！');
            }
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);


    // 设置返回值
    return {
        loading,
        error,
        data,
        fetchData
    };
}
```

# Redux

**A Predictable State Container for JS Apps**

- A Predictable State Container for JS Apps是Redux官方对于Redux的描述，这句话可以这样翻译“一个专为JS应用设计的可预期的状态容器”，简单来说Redux是一个可预测的状态容器。

## **状态**(State)

state直译过来就是状态state不过就是一个变量，一个用来记录（组件）状态的变量。组件可以根据不同的状态值切换为不同的显示

## **容器(Container)**

容器当然是用来装东西的，状态容器即用来存储状态的容器。状态多了，自然需要一个东西来存储，但是容器的功能却不是仅仅能存储状态，它实则是一个状态的管理器，除了存储状态外，它还可以用来对state进行查询、修改等所有操作。

## 可预测（Predictable）

可预测指我们在对state进行各种操作时，其结果是一定的。即以相同的顺序对state执行相同的操作会得到相同的结果。简单来说，Redux中对状态所有的操作都封装到了容器内部，外部只能通过调用容器提供的方法来操作state，而不能直接修改state。这就意味着外部对state的操作都被容器所限制，对state的操作都在容器的掌控之中，也就是可预测。

总的来说，**Redux是一个稳定、安全的状态管理器**。

## 使用

使用Redux之前，你需要先明确一点Redux是JS应用的状态容器，它并不是只能在React使用，而是可以应用到任意的JS应用中（包括前端JS，和服务器中Node.js）。总之，凡是JS中需要管理的状态的Redux都可以胜任。

## 在网页中使用

我们先来在网页中使用以下Redux，在网页中使用Redux就像使用jQuery似的，直接在网页中引入Redux的库文件即可：
`<script src="https://unpkg.com/redux@4.2.0/dist/redux.js"></script>的`
如果不使用redux的时候

```html
const btn01 = document.getElementById('btn01');
const btn02 = document.getElementById('btn02');
const counterSpan = document.getElementById('counter');

let count = 1;

btn01.addEventListener('click', ()=>{
   count--;
   counterSpan.innerText = count;
});

btn02.addEventListener('click', ()=>{
   count++;
   counterSpan.innerText = count;
});
```

上述代码中count就是一个状态，只是这个状态没有专门的管理器，它的所有操作都在事件的响应函数中进行处理，这种状态就是不可预测的状态，因为在任何的函数中都可以对这个状态进行修改，没有任何安全限制。Redux的真实使用场景依然是大型应用中的复杂state。

Redux是一个状态容器，所以使用Redux必须先创建容器对象，它的所有操作都是通过容器对象来进行的，创建容器的方式有多种，我们先说一种好理解的：
`Redux.createStore(reducer,[perloadedState],[enhancer])`
**createStore**用来创建一个**Redux中的容器对象**，它需要三个参数：reducer、preloadedState、enhancer

- **reducer**：是一个函数，state操作的整合函数，每次修改state都会触发该函数，返回值会变成新的state
- **preloadedState**：是state的初始值，可以在这里指定也可以在reducer中指定。
- **enhancer**：增强函数用来对state的功能进行扩展

三个参数中，只有reducer是必须的，来看一个Reducer的示例：

```javascript
const countReducer = (state = {count:0},action) => {
    switch (action.type) {
        case 'ADD':
            return {count:state.count+1}
        case 'SUB':
            return {count:state.count-1}
        default:
            return state
    }
}
```

reducer用来整合关于state的所有操作，容器修改state时会自动调用该函数，函数调用时会接收到两个参数：state和action，state表示当前的state，可以通过该state来计算新的state。`state = {count:0}`这是在指定state的默认值，如果不指定，第一次调用时state的值会是undefined。也可以将该值指定为createStore()的第二个参数。action是一个普通对象，用来存储操作信息。

将reducer传递进createStore后，我们会得到一个store对象：
`const store = Redux.createStore(countReducer);`
store对象创建后，对state的所有操作都需要通过它来进行：

读取state：
`store.getState()`

修改state：
`store.dispatch({type:'ADD'})`

dipatch用来触发state的操作，可以将其理解为是想reducer发送任务的工具。它需要一个对象作为参数，这个对象将会成为reducer的第二个参数action，需要将操作信息设置到对象中传递给reducer。action中最重要的属性是type，type用来识别对state的不同的操作，上例中’ADD’表示增加操作，’SUB’表示减少的操作

除了这些方法外，store还拥有一个subscribe方法，这个方法用来订阅state变化的信息。该方法需要一个回调函数作为参数，当store中存储的state发生变化时，回调函数会自动调用，我们可以在回调函数中定义state发生变化时所要触发的操作：

```javascript
store.subscribe(()=>{
    // store中state发生变化时触发
});
```

如此一来，刚刚的代码被修改成了这个样子：

```javascript
const btn01 = document.getElementById('btn01');
const btn02 = document.getElementById('btn02');
const counterSpan = document.getElementById('counter');


const countReducer = (state = {count:0}, action) => {
    switch (action.type){
        case 'ADD':
            return {count:state.count+1};
        case 'SUB':
            return {count:state.count-1};
        default:
            return state
    }
};

const store = Redux.createStore(countReducer);

store.subscribe(()=>{
    counterSpan.innerText = store.getState().count;
});

btn01.addEventListener('click', ()=>{
    store.dispatch({type:'SUB'});
});

btn02.addEventListener('click', ()=>{
    store.dispatch({type:'ADD'});
});
```

修改后的代码相较于第一个版本要复杂一些，同时也解决了之前代码中存在的一些问题：

1. 前一个版本的代码state就是一个变量，可以任意被修改。state不可预测，容易被修改为错误的值。新代码中使用了Redux，Redux中的对state的所有操作都封装到了reducer函数中，可以限制state的修改使state可预测，有效的避免了错误的state值。
2. 前一个版本的代码，每次点击按钮修改state，就要手动的修改counterSpan的innerText，非常麻烦，这样一来我们如果再添加新的功能，依然不能忘记对其进行修改。新代码中，counterSpan的修改是在store.subscribe()的回调函数中进行的，state每次发生变化其值就会随之变化，不需要再手动修改。换句话说，state和DOM元素通过Redux绑定到了一起。

通过上例也不难看出，Redux中最最核心的东西就是这个store，只要拿到了这个store对象就相当于拿到了Redux中存储的数据。在加上Redux的核心思想中有一条叫做“单一数据源”，也就是所有的state都会存储到一课对象树中，并且这个对象树会存储到一个store中。所以到了React中，组件只需获取到store即可获取到Redux中存储的所有state。

下面给出一个具体的代码示例

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<div>

    <button id="sub">减少</button>
    <span id="countSpan">1</span>
    <span id="nameSpan"></span>
    <button id="add">增加</button>
    <button id="addFive">加5</button>

</div>
<script src="https://unpkg.com/redux@4.2.0/dist/redux.js"></script>
<script>
    const subBtn = document.getElementById('sub');
    const addBtn = document.getElementById('add');
    const addFiveBtn = document.getElementById('addFive');
    const countSpan = document.getElementById('countSpan');
    const nameSpan = document.getElementById('nameSpan');

    /*
    *   网页中使用redux的步骤：
    *       1.引入redux核心包
    *       2.创建reducer整合函数
    *       3.通过reducer对象创建store
    *       4.对store中的state进行订阅
    *       5.通过dispatch派发state的操作指令
    * */
    function reducer(state = {count:1,name:'孙悟空'}, action) {
        /*
        *   state 表示当前state，可以根据这个state生成新的state
        *   action 是一个js对象，它里边会保存操作的信息
        *           type表示操作的类型
        *           其他需要传递的参数，也可以在action中设置
        * */
        switch (action.type) {
            case 'ADD':
                return {...state, count:state.count +1};
            case 'SUB':
                return {...state, count:state.count -1};
            case 'ADD_N':
                return {...state, count:state.count +action.payload};
            default:
                return state;
        }
    }

    const store = Redux.createStore(reducer);

    nameSpan.innerText = store.getState().name;

    store.subscribe(() => {
        // 打印state的值
        // console.log(store.getState());
        countSpan.innerText = store.getState().count;
        nameSpan.innerText = store.getState().name;

    });


    subBtn.addEventListener('click', () => {
        store.dispatch({type: 'SUB'});
    });

    addBtn.addEventListener('click', () => {
        store.dispatch({type: 'ADD'});
    });

    addFiveBtn.addEventListener('click', () => {
        store.dispatch({type: 'ADD_N', payload:50});
    });


</script>

</body>
</html>

```

# **RTX(Redux Toolkit)**工具包

在React中使用RTK
`yarn add react-redux @reduxjs/toolkit`

具体使用

```javascript
// 使用RTK来构建store
import { configureStore, createSlice } from "@reduxjs/toolkit"
// createSlice：创建reducer的切片
// 它需要一个配置对象作为参数，通过对象的不同的属性来指定它的配置
const stuSlice = createSlice({
    name: "stu",// 用来自动生成action中的type
    initialState: {
        name: "孙悟空",
        age: 18,
        gender: "男",
        address: "花果山",
	}, // state的初始值
    reducers: {
        //指定state的各种操作，直接在对象中添加方法
        setName (state,action) {
            //可以通过不同的方法来指定对state的不同操作
            // 两个参数：state 这个state的是一个代理对象，可以直接修改
            state.name = "猪八戒"
        },
        setAge(state,action) {
            state.age = 28
        }
    }
})
// 切片对象会自动的帮助我们生成action
// actions中存储的是slice自动生成action创建器（函数），调用函数后会自动创建action对象
// action对象的结构 {type:name/函数名, payload:函数的参数}
export const { setName, setAge } = stuSlice.actions
// const nameAction = setName('哈哈');
// const ageAction = setAge(30);
// console.log(nameAction);
// console.log(ageAction);
// 创建store 用来创建store对象，需要一个配置对象作为参数
const store = configureStore({
	reducer: {
		student: stuSlice.reducer,
	},
})
export default store
```

## RTX具体使用案例

`store/index.js` 中

```javascript
import {configureStore, createSlice} from "@reduxjs/toolkit";
const stuSlice = createSlice({
    name:'stu', 
    initialState:{
        name:'孙悟空',
        age:18,
        gender:'男',
        address:'花果山'
    },
    reducers:{ 
        setName(state, action){
            state.name = action.payload;
        },
        setAge(state, action){
            state.age = action.payload;
        }
    }
});
export const {setName, setAge} = stuSlice.actions;
const store = configureStore({
   reducer:{
       student:stuSlice.reducer
   }
});

export default store;

```

`App.js`

```javascript
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setName, setAge} from './store';

const App = () => {
    // useSelector() 用来加载state中的数据
    const student = useSelector(state => state.student);
    // 通过useDispatch()来获取派发器对象
    const dispatch = useDispatch();
    // 获取action的构建器


    const setNameHandler = () => {
        dispatch(setName('沙和尚'));
    };

    const setAgeHandler = () => {
        dispatch(setAge(33));
    };

    return (
        <div>
            <p>
                {student.name} ---
                {student.age} ---
                {student.gender} ---
                {student.address}
            </p>
            <button onClick={setNameHandler}>修改name</button>
            <button onClick={setAgeHandler}>修改age</button>
        </div>
    );
};

export default App;
```

## 拆分RTX

当有不同的多个数据的时候比如存在学生姓名和学校
`schoolSlice.js`

```javascript
//创建学校的slice
import {createSlice} from "@reduxjs/toolkit";
const schoolSlice = createSlice({
    name:'school',
    initialState:{
        name:'花果山一小',
        address:'花果山大街28号'
    },
    reducers:{
        setName(state, action){
            state.name = action.payload;
        },
        setAddress(state, action){
            state.address = action.payload;
        }
    }
});

export const {setName, setAddress} = schoolSlice.actions;
export const {reducer:schoolReducer} = schoolSlice;
```

`stuSlice.js`

```javascript
// createSlice 创建reducer的切片
// 它需要一个配置对象作为参数，通过对象的不同的属性来指定它的配置
import {createSlice} from "@reduxjs/toolkit";

const stuSlice = createSlice({
    name:'stu', // 用来自动生成action中的type
    initialState:{
        name:'孙悟空',
        age:18,
        gender:'男',
        address:'花果山'
    }, // state的初始值
    reducers:{ // 指定state的各种操作，直接在对象中添加方法
        setName(state, action){
            // 可以通过不同的方法来指定对state的不同操作
            // 两个参数：state 这个state的是一个代理对象，可以直接修改
            state.name = action.payload;
        },
        setAge(state, action){
            state.age = action.payload;
        }
    }
});

// 切片对象会自动的帮助我们生成action
// actions中存储的是slice自动生成action创建器（函数），调用函数后会自动创建action对象
// action对象的结构 {type:name/函数名, payload:函数的参数}
export const {setName, setAge} = stuSlice.actions;
export const {reducer:stuReducer} = stuSlice;
```

`store/index.js`

```javascript
//使用RTK来构建store
import {configureStore} from "@reduxjs/toolkit";
import {stuReducer} from "./stuSlice";
import {schoolReducer} from "./schoolSlice";

// 创建store 用来创建store对象，需要一个配置对象作为参数
const store = configureStore({
   reducer:{
       student:stuReducer,
       school:schoolReducer
   }
});

export default store;

```

`App.js`

```javascript
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setName, setAge} from './store/stuSlice';
import {setName as setSchoolName, setAddress as setSchoolAddress} from "./store/schoolSlice";

const App = () => {
    // useSelector() 用来加载state中的数据
    // const student = useSelector(state => state.student);
    // // 引入学校的state
    // const school = useSelector(state => state.school);
    const {student, school} = useSelector(state => state);


    // 通过useDispatch()来获取派发器对象
    const dispatch = useDispatch();
    // 获取action的构建器


    const setNameHandler = () => {
        dispatch(setName('沙和尚'));
    };

    const setAgeHandler = () => {
        dispatch(setAge(33));
    };

    return (
        <div>
            <p>
                {student.name} ---
                {student.age} ---
                {student.gender} ---
                {student.address}
            </p>
            <button onClick={setNameHandler}>修改name</button>
            <button onClick={setAgeHandler}>修改age</button>

            <hr/>

            <p>
                {school.name} ---
                {school.address}
            </p>
            <button onClick={()=>dispatch(setSchoolName('高老庄中小'))}>修改学校名字</button>
            <button onClick={()=>dispatch(setSchoolAddress('高老庄府前街19号'))}>修改学校地址</button>
        </div>
    );
};

export default App;
```

# RTXQ使用

```javascript
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


// 创建Api对象
//createApi() 用来创建RTKQ中的API对象
// RTKQ的所有功能都需要通过该对象来进行
// createApi() 需要一个对象作为参数
const studentApi = createApi({
    reducerPath: 'studentApi', // Api的标识，不能和其他的Api或reducer重复
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:1337/api/"
    }),// 指定查询的基础信息，发送请求使用的工具
    endpoints(build) {
        // build是请求的构建器，通过build来设置请求的相关信息
        return {
            getStudents:build.query({
                query() {
                    // 用来指定请求子路径
                    return 'students';
                }
            }),
        };
    }// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 getStudents --> useGetStudentsQuery
export const {
    useGetStudentsQuery
} = studentApi;

export default studentApi;
```

# React中的router

使用React这些工具所编写的项目通常都是单页应用（SPA）。单页应用中，整个应用中只含有一个页面，React会根据不同的状态在应用中显示出不同的组件。但是我们之前所编写应用还存在着一个问题，整个应用只存在一个页面，一个请求地址，这就使得用户只能通过一个地址访问应用，当我们点击组件中的不同链接时应用的地址是不会发生变化的。这又有什么问题呢？由于应用只有一个地址，所以我们通过该地址访问应用时，总会直接跳转到应用的首页。如此一来，我们便不敢随意的刷新页面，因为一旦刷新页面便直接跳转到首页。在对页面进行分享时，也只能分享网站的首页，而不能分享指定的页面。

怎么办呢？难道我们要将一个页面拆分为多个页面吗？很明显不能这么做，这么做以后应用的跳转便脱离了React的控制，增加应用的复杂度，提高了项目维护的成本。

为了解决这个问题，我们需要引入一个新的工具React Router，React Router为我们提供一种被称为客户端路由的东西，通过客户端路由可以将URL地址和React组件进行映射，当URL地址发生变化时，它会根据设置自动的切换到指定组件。并且这种切换完全不依赖于服务器。换句话说，在用户看来浏览器的地址栏确实发生了变化，但是这一变化并不由服务器处理，而是通过客户端路由进行切换。
... 懒的写了

# 关于React中的hook

关于React中的钩子函数，我们已经非常熟悉了。钩子函数的功能非常的强大，而它的使用又十分简单。关于钩子函数的使用，我们只需记住两点：

1. 钩子只能在React组件和自定义钩子中使用
2. 钩子不能在嵌套函数或其他语句（if、switch、white、for等）中使用

## React中自带的钩子函数

1. **useState**
2. **useEffect**
3. **useContext**
4. **useReducer**
5. **useCallback**
6. **useRef**
7. **useMemo**
8. **useImperativeHandle**
9. **useLayoutEffect**
10. **useDebugValue**
11. **useDeferredValue**
12. **useTransition**
13. **useId**
14. **useSyncExternalStore**
15. **useInsertionEffect**

### useMemo

useMemo和useCallback十分相似，useCallback用来缓存函数对象，useMemo用来缓存函数的执行结果。在组件中，会有一些函数具有十分的复杂的逻辑，执行速度比较慢。闭了避免这些执行速度慢的函数返回执行，可以通过useMemo来缓存它们的执行结果，像是这样：

```javascript
const result = useMemo(()=>{
    return 复杂逻辑函数();
},[依赖项])
```

useMemo中的函数会在依赖项发生变化时执行，注意！是执行，这点和useCallback不同，useCallback是创建。执行后返回执行结果，如果依赖项不发生变化，则一直会返回上次的结果，不会再执行函数。这样一来就避免复杂逻辑的重复执行。

## UseImperativeHandle

在React中可以通过forwardRef来指定要暴露给外部组件的ref：

```javascript
const MyButton = forwardRef((props, ref) => {
    return <button ref={ref}>自定义按钮</button>
});
```

上例中，MyButton组件将button的ref作为组件的ref向外部暴露，其他组件在使用MyButton时，就可以通过ref属性访问：

```javascript
<MyButton ref={btnRef}/>
```

通过useImperativeHandle可以手动的指定ref要暴露的对象，比如可以修改MyButton组件如下：

```javascript
const MyButton = forwardRef((props, ref) => {

    useImperativeHandle(ref,()=> {
        return {
            name:'孙悟空'
        };
    });

    return <button>自定义按钮</button>
});
```

useImperativeHandle的第二个参数是一个函数，函数的返回值会自动赋值给ref（current属性）。上例中，我们将返回值为`{name:'孙悟空'}`，当然返回孙悟空没有什么意义。实际开发中，我们可以将一些操作方法定义到对象中，这样可以有效的减少组件对DOM对象的直接操作。

```javascript
const MyButton = forwardRef((props, ref) => {

    const btnRef = useRef();

    useImperativeHandle(ref,()=> {
        return {
            setDisabled(){
                btnRef.current.disabled = true;
            }
        };
    });

    return <button ref={btnRef}>自定义按钮</button>
});

const App = () => {
    
    const btnRef = useRef();

    const clickHandler = () => {
        btnRef.current.setDisabled();
    };

    return <div>
        <MyButton ref={btnRef}/>
        <button onClick={clickHandler}>点击</button>
    </div>;
};
```

## UseLayoutEffect

useLayoutEffect的方法签名和useEffect一样，功能也类似。不同点在于，useLayoutEffect的执行时机要早于useEffect，它会在DOM改变后调用。在老版本的React中它和useEffect的区别比较好演示，React18中，useEffect的运行方式有所变化，所以二者区别不好演示。

useLayoutEffect使用场景不多，实际开发中，在effect中需要修改元素样式，且使用useEffect会出现闪烁现象时可以使用useLayoutEffect进行替换。![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/06/20220622111732278.png)

## UseDebugValue

用来给自定义钩子设置标签，标签会在React开发工具中显示，用来调试自定义钩子，不常用。

## UseDeferredValue

useDeferredValue用来设置一个延迟的state，比如我们创建一个state，并使用useDeferredValue获取延迟值：

```
const [queryStr, setQueryStr] = useState('');
const deferredQueryStr = useDeferredValue(queryStr);
```

上边的代码中queryStr就是一个常规的state，deferredQueryStr就是queryStr的延迟值。设置延迟值后每次调用setState后都会触发两次组件的重新渲染。第一次时，deferredQueryStr的值是queryStr修改前的值，第二次才是修改后的值。换句话，延迟值相较于state来说总会慢一步更新。

延迟值可以用在这样一个场景，一个state需要在多个组件中使用。一个组件的渲染比较快，而另一个组件的渲染比较慢。这样我们可以为该state创建一个延迟值，渲染快的组件使用正常的state优先显示。渲染慢的组件使用延迟值，慢一步渲染。当然必须结合React.memo或useMemo才能真正的发挥出它的作用。

## UseTransition

当我们在组件中修改state时，会遇到复杂一些的state，当修改这些state时，甚至会阻塞到整个应用的运行，为了降低这种state的影响，React为我们提供了useTransition，通过useTransition可以降低setState的优先级。

useTransition会返回一个数组，数组中有两个元素，第一个元素是isPending，它是一个变量用来记录transition是否在执行中。第二个元素是startTransition，它是一个函数，可以将setState在其回调函数中调用，这样setState方法会被标记为transition并不会立即执行，而是在其他优先级更高的方法执行完毕，才会执行。

除了useTransition外，React还直接为为我们提供了一个startTransition函数，在不需要使用isPending时，可以直接使用startTransition也可以达到相同的效果。

## UseId

生成唯一id，使用于需要唯一id的场景，但不适用于列表的key。
