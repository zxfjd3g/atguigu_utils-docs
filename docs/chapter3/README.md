# 使用VuePress搭建在线文档网站
## 1. 在线文档

  [VuePress官方在线文档](https://vuepress.vuejs.org/zh/)

## 2. 搭建基本环境

### 2.1.使用vue脚手架创建一个vue项目

```bash
# 全局下载 vue 脚手架包
npm install -g @vue/cli
# 创建 vue2 的项目
vue create atguigu-utils_docs
```

### 2.2.使用上vuepress

```bash
# 下载 VuePress
npm install -D vuepress

# 新建一个文件: docs/README.md
# Hello VuePress!

# 启动文档项目
npx vuepress dev docs
```

## 3. 配置教程的文档

### 3.1.整体结构

```
|-- docs
  |-- .vuepress
    |-- public
      |-- favicon.ico
      |-- logo.png
      |-- utils.jpg
    |-- config.js
  |-- chapter1
    |-- 01_工具函数库说明.md
    |-- 02_创建工具包项目.md
    |-- 03_发布到npm中央仓库.md
    |-- 04_使用自定义工具包.md
  |-- chapter2
    |-- 01_函数相关
    |-- 02_数组相关
    |-- 03_对象相关
    |-- 04_字符串相关
    |-- 05_手写继承
    |-- 06_手写带委托的事件监听
    |-- 07_手写ajax请求函数
    |-- 08_手写事件总线
    |-- 09_手写消息订阅与发布
    |-- 10_手写Promise
  |-- chapter3
    |-- README.md
  |-- README.md
|-- package.json
```

### 3.2.`docs/.vuepress/config.js  `

```js
// 注意: base的值为github仓库的名称(/不能少)
module.exports = {
  base: '/atuigu_utils/', /* 基础虚拟路径 */
  dest: 'docs/dist', /* 打包文件基础路径, 在命令所在目录下 */
  title: '自定义工具函数库', // 标题
  description: '尚硅谷前端研究院', // 标题下的描述
  
  themeConfig: { // 主题配置
    logo: '/logo.png',
    nav: [ // 头部导航
      { text: '官网', link: 'http://www.atguigu.com' },
      { text: '谷粒学院', link: 'http://www.gulixueyuan.com/' },
      { 
        text: '学习路线', 
        items: [
          { text: '前端', link: 'http://www.atguigu.com/web/' },
          { text: 'Java', link: 'http://www.atguigu.com/kecheng.shtml' },
          { text: '大数据', link: 'http://www.atguigu.com/bigdata/' }
        ] 
      },
    ],
    sidebar: [ // 左侧导航
      {
        title: '打包自定义工具库', // 标题
        collapsable: false, // 下级列表不可折叠
        children: [ // 下级列表
          'chapter1/01_工具函数库说明',
          'chapter1/02_创建工具包项目',
          'chapter1/03_发布到npm中央仓库',
          'chapter1/04_使用自定义工具包',
        ]
      },
      {
        title: '各种自定义',
        collapsable: false,
        children: [
          'chapter2/01_函数相关',
          'chapter2/02_数组相关',
          'chapter2/03_对象相关',
          'chapter2/04_字符串相关',
          'chapter2/05_手写继承',
          'chapter2/06_手写带委托的事件监听',
          'chapter2/07_手写ajax请求函数',
          'chapter2/08_手写事件总线',
          'chapter2/09_手写消息订阅与发布',
          'chapter2/10_手写Promise',
        ]
      },
      {
        title: '快速搭建在线文档网站',
        collapsable: false,
        children: [
          'chapter3/',
        ]
      },
    ],
    // sidebarDepth: 3 // 左侧导航的深度默认是2级
  },

  head: [ // 指定网页head图标
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/favicon.ico` }]
  ]
}
```

### 3.3.`docs/README.md`

```bash
---
#首页
home: true  
# 图标
heroImage: /utils.jpg
# 按钮文本
actionText: 开始学习 →
# 按钮点击跳转路径
actionLink: /chapter1/01_工具函数库说明

features: 
- title: 技术提升
  details: 通过自定义实现函数相关、数组相关、对象相关，字符串相关工具函数； 手写继承、DOM事件监听、ajax请求、事件总线、消息订阅-发布、Promise。极大提升对JS核心技术的理解和编码能力
- title: 面试利器
  details: 中大厂面试问得最多是什么？答：原生JS的理解和编码，咱们这套课程就是为此设计的。
- title: 扩展能力
  details: 如何创建自己的npm工具库？如何快速搭建在线技术或文档站点？我们给你最精简的答案。
---
```

### 3.4.`package.json`  

```json
"scripts": {
  "doc:dev": "vuepress dev docs",
  "doc:build": "vuepress build docs",
  "doc:deploy": "gh-pages -d docs/dist"
}
```

## 4. 发布到github pages

1. 使用git管理当前项目

2. 将打包的文档推送到github pages
```bash
# 下载工具包
npm install -D gh-pages
# 执行打包命令
npm run doc:build
# 执行部署命令
npm run doc:deploy
```