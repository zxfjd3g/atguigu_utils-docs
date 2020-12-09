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