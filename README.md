# 笔记

## 1.本地运行说明
- 运行命令: npm run doc:dev
- 点击控制台提示链接访问网页文档

## 2.使用VuePress搭建github在线文档/blog
- 创建一个远程仓库 xxx_utils-docs
- 修改docs/.vuepress/config.js: base: '/xxx_utils-docs/'
- 打包文档: npm run doc:build
- 将项目推送到github
  - git init
  - git add .
  - git commit -m "init"
  - git push origin master
- 发布文档: npm run doc:deploy
- 访问在线文档: https://zxfjd3g.github.io/xxx_utils-docs/ (可能要等待一定的时间)


