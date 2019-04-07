# Vue 目录组织规范

## 项目结构的核心思想

因为代码的相关性主要与业务功能有关，而与文件类型的关系不大，所以，为了便于 编写、查阅、理解、变更 代码，项目结构遵循以下核心宗指（宗指属于思想）：

以业务功能为单位组织项目结构；
以低耦合度为目标划分模块职责和逻辑；

优点：

业务功能模块的相关代码都集中在一块，方便移动和删除；
实现了关注点分离，方便开发、调试、维护、编写、查阅、理解代码；

## 项目目录结构

本项目规范的根级目录与Vue脚手架的 webpack 模板的根级目录一致，只是 `src/` 下的目录结构与 webpack 模板不一样；因为 `src/` 下的目录结构遵从本规范 项目结构的核心思想 ；


```
.
├── build/                      # webpack 配置文件；
│   └── ...
├── config/                     # 与项目构建相关的常用的配置选项；
│   ├── index.js                # 主配置文件
│   ├── dev.env.js              # 开发环境变量
│   ├── prod.env.js             # 生产环境变量
│   └── test.env.js             # 测试环境变量
│
├── src/
│   ├── main.js                 # webpack 的入口文件；
│   ├── assets/                 # 存放项目共用的代码以外的资源，如：图片、图标、视频 等；
│   │   ├── sass/               # sass 样式表源码目录
│   │   ├── less/               # less 样式表源码目录
│   │   ├── css/                # css 样式表源码目录
│   │   ├── images/             # 需要被引入编译到最终输出的JS中的图片
│   │   ├── fonts/              # 字体文件
│   │   ├── js/                 # 第三方在npm上无法找到js兼容脚本或依赖文件
│   │   └── base.scss           # 项目的基础样式引用
│   ├── components/             # 存放项目共用的组件，如：封装的导航条、选项卡等等； 备注：这里的存放的组件应该都是展示组件；
│   ├── views/                  # 存放项目中使用到的所有的页面文件
│   ├── api/                    # 存放项目的网络模块，如：接口；
│   ├── routers/                # 存放路由定义
│   ├── store/                  # 存放VueX相关文件
│   │   ├── index.js            # Vuex公共导出类`store`的配置文件
│   │   ├── mutations.js        # 公共根store的mutations
│   │   ├── actions.js          # 公共根store的actions
│   │   ├── mutation-types.js   # 公共方法转名称字符串引用文件
│   │   └── modules             # 子模块定义
│   ├── utils/                  # 自己封装的一些工具
│   ├── constant.js             # 存放js的常量；
│   ├── constant.scss           # 存放scss的常量；
│   └── app/                    # 存放项目业务代码；
│       ├── App.vue             # app 的根组件；
│       └── ...
│
├── static/                     # 纯静态资源，该目录下的文件不会被webpack处理，该目录会被拷贝到输出目录下；
├── test/                       # 测试
│   ├── fixtures/               # 测试使用的模拟数据文件(如:json,xml,csv,txt等)
│   ├── unit/                   # 单元测试
│   │   ├── specs/              # test spec files
│   │   ├── eslintrc            # 专为单元测试配置的eslint配置文件
│   │   ├── index.js            # 测试编译的入口文件
│   │   └── karma.conf.js       # Karma的配置文件
│   └── e2e/                    # e2e 测试
│       ├── specs/              # test spec files
│       ├── custom-assertions/  # 自定义的断言
│       ├── runner.js           # test runner 脚本
│       └── nightwatch.conf.js  # test runner 的配置文件
├── .babelrc                    # babel 的配置文件
├── .editorconfig               # 编辑器的配置文件；可配置如缩进、空格、制表类似的参数；
├── .eslintrc.js                # eslint 的配置文件
├── .eslintignore               # eslint 的忽略规则
├── .gitignore                  # git的忽略配置文件
├── .postcssrc.js               # postcss 的配置文件
├── index.html                  # HTML模板
├── package.json                # npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
└── README.md
```


## 资源路径编译规则

默认情况下，`vue-loader` 使用 `css-loader`和 Vue 模版编译器自动处理样式和模版文件。在编译过程中，所有的资源路径例如 `<img src="...">` 、`background: url(...)` 和 `@import` 会作为模块依赖。

路径的编译规则如下：

- 如果路径是绝对路径，会原样保留
- 如果路径以 `.` 开头，将会被看作相对的模块依赖，并按照你的本地文件系统上的目录结构进行解析；
- 如果路径以 `~` 开头，其后的部分将会被看作模块依赖。这意味着你可以用该特性来引用一个 node 依赖中的资源： `<img src="~some-npm-package/foo.png">`
- 如果路径以 `@` 开头，也会被看作模块依赖。如果你的 webpack 配置中给 `@` 配置了 `alias`，这就很有用了。所有 vue-cli 创建的项目都默认配置了将 `@` 指向 `/src`

## 启动页 `index.html`

在webpack构建项目期间，webpack插件 html-webpack-plugin 会将 /index.html 处理后并拷贝到输出目录中，并把 webpack 的构建输出资源（如：输出的js、css文件，等等）链接自动插入到该 html 文件。此外，Vue CLI还会自动注入资源提示（`preload/prefetch`）清单/图标链接（当使用PWA插件时）；

## build目录 和 config目录

- `build` 目录下存放的是 webpack 的配置文件；
- `config` 目录下存放的是与项目构建相关的常用的配置选项、变量；

通常情况下，除非要配置 webpack 的 loader 或者 插件，否则，你应该优先尝试更改 config 目录下的文件；


## 项目输出的根目录

项目的**根**目录由 `webpackConfig.output.publicPath` 参数决定；在用 vue 脚手架创建的基于 webpack 模板 的项目中，`webpackConfig.output.publicPath` 的默认配置是 `/` ；

要引用**根**目录下的资源，需要通过以下方式（为了方便描述，设 `public` 目录的路径是 publicPath）：

在 `publicPath/index.html` 文件中引用 `public` 中的资源时，需要在链接前加上 `<%= webpackConfig.output.publicPath %>`

示例:

```html
<link  rel = "快捷方式图标"  href = "<％= webpackConfig.output.publicPath％>favicon.ico " >
```

在 JavaScript 中，需要通过 `process.env.BASE_URL` 引用 public 中的资源；
示例:

先将 `process.env.BASE_URL` 传递给组件;

```js
data () {
  return {
    baseUrl: process.env.BASE_URL
  }
}
``

然后，在模板中引用：

```html
<img :src="`${baseUrl}my-image.png`">
```


## `static` 目录

- `static` 虽然目录可以添加任何资源，如：图片、代码 等等，但是不建议把这些资源添加到 `static`。 `static` 目录适合存放以下内容：
    - 与 webpack 不兼容的库；
    - 您需要在构建输出中使用具有特定名称的文件；
    - 你有成千上万的图像，需要动态引用它们的路径；
- `static/` 目录的资源不会被webpack处理，它们会被拷贝到输出目录下；
- 要引用 `static/` 目录下的资源，可以使用 `publicPath/static/...` 

## 间接访问

要间接地访问 常用 或者 易变更 的 目录 或 模块 ；
间接扡访问方式有很多，如：

- 通过常量或变量；
- 通过 webpack 的配置字段 `resolve.alias` ；

示例:

假设我们会经常访问对于 `src/common/assets/` 目录，或者在将来，可能会更改 `src/common/assets/` 目录的位置；
则我们可以如下间接地访问 `src/common/assets/` 目录：

在 webpack 的配置字段 `resolve.alias` 中给 `src/common/assets/` 目录设置别名：

```js
webpackConfig.resolve.alias = {
   'c-assets': resolve('src/common/assets'),
 }
```

通过上面设置的别名 'c-assets/...' 访问 `src/common/assets/` 目录：

优点:
这样做有以下好处：

- 访问目录更方便；
- 当目录位置变更时，只需要更改一处（别名的值 或者 变量的值），就可以使所有的访问指向正确地的地址；
- 不易出错，因为通过变量或者别名缩短了路径的长度；


## 目录分类的原则

目录的作用就是组织文件的，为了充分实现 项目结构的核心思想 ，我把目录分为以下几类：

- 组件目录 —— 以组件为单位划分的、用于组织单个组件相关文件的目录；
- 页面目录 —— 用于组织某类东西的目录；

示例: 假设有以下目录：

```
components/         # 存放项目共用的组件，如：封装的导航条、选项卡、轮播图等等；
  ├── navbar/         # 导航条组件的目录；
  ├── tabbar/         # 选项卡组件的目录；
  ├── swiper/         # 轮播图组件的目录；
  └── ...
```

页面目录的分类原则应该以业务名称为主体，如果只有单页则直接以`业务名称.vue`命名，如果页面内包含多个文件则将默认页面设置为`Index.vue`而其它仅用于此页的文件则放置该文件夹内。

例如:

```
views/              # 存放所有与路由相关的页面
  ├── Home/         # 主页目录，存放所有仅用于主页使用到的其它子页文件
  ├── Login.vue     # 登录页面文件
  ├── About/        # 关于页面的目录
  │   ├── Index.vue # 关于页面的默认导入类
  │   ├── Map.vue   # 关于页面内其它使用到的页面 
  │   └── ...       
  └── ...
```

