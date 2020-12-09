# 3.发布到npm仓库

## 3.1.前置

- npm配置的中央仓库不能是淘宝镜像
- 发布前必须执行:  npm config set registry https://registry.npmjs.org/
- 不用发布时: npm config set registry http://registry.npm.taobao.org/

## 3.2.注册npm中央仓库账号

- 注册地址: https://www.npmjs.com/
- 关键信息: 用户名/密码/邮箱(<font color='red'>需要验证</font>)

![image-20201204150917555](../images/image-20201204150917555.png)

## 3.3.添加用户

- 执行: npm addUser
- 登陆npm仓库
- 依次指定用户名/密码/邮箱

![image-20201204151301849](../images/image-20201204151301849.png)

## 3.4.发布仓库

- 执行: npm publish
- 要求: 库的名称一定要唯一

![image-20201204153505733](../images/image-20201204153505733.png)

## 3.5.强制删除已发布的库

- 执行: npm unpublish --force
- 注意: 必须在72小时内, 否则不能再删除