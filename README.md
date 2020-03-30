###  管理驾驶舱  🚀


> 🚀 Manager charts cab for mobile

（下载生成工程目录后，请根据实际项目内容，修改此说明的相关内容）

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.7.0-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://travis-ci.org/PanJiaChen/vue-element-admin" rel="nofollow">
    <img src="https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://github.com/PanJiaChen/vue-element-admin/releases">
    <img src="https://img.shields.io/github/release/PanJiaChen/vue-element-admin.svg" alt="GitHub release">
  </a>
  <a href="https://gitter.im/vue-element-admin/discuss">
    <img src="https://badges.gitter.im/Join%20Chat.svg" alt="gitter">
  </a>
  <a href="https://panjiachen.gitee.io/vue-element-admin-site/zh/donate">
    <img src="https://img.shields.io/badge/%24-donate-ff69b4.svg" alt="donate">
  </a>
</p>

## 简介

[管理驾驶舱] 是一个图表应用集合，它基于 [vue](https://github.com/vuejs/vue) 和 [antV-g2](https://antv.vision/zh)实现。它使用了最新的前端技术栈。

管理驾驶舱是一款为企业内部领导及相关高管提供的指标分析型系统。打破数据隔离，实现指标分析及决策场景落地。通过详尽的指标体系，实时反映企业的运行状态，将采集的数据形象化、直观化、具体化。“管理驾驶舱”充分融合了人脑科学、管理科学和信息科学的精华，以人为产品的核心，从管理者的决策环境、企业管理综合指标的定义以及信息的表述，都围绕着激发人的智能、有利于思维连贯和有效思维判断为目的。

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 和 [antV-g2](https://antv.vision/zh)，所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

## 开发：
#### 1、catalog & files rules：
| dir      |    rules | remarks  |
| :--------: | :--------| :-- |
| `assets`  | img / icon file |  resource catalogue   |
| `components`     |   your buiness component | packaging business components by basic ui  |
| `mixins`      |    vue mixins |   |
| `router`      |    vue router |   |
| `service`      |    request api config | use to business module  |
| `store`      |    business data flow by vuex  |   |
| `style`      |   write your style file |   |
| `UI`      |    components/ui/utils register in it |  |
| `Utils`      |   event utils library |

#### 2、run and build step：
##### 2.1、dev step：
```flow
st=>start: Start
end=>end
op1=>operation: yarn or npm i （ in root path ）
op2=>operation: npm run command / npm run command:mac
op3=>operation: Dev:choise 1 to running...
st->op1->op2->op3->end
```
##### 2.2、mock step：
```flow
st=>start: Start
end=>end
op1=>operation: yarn or npm i （ in root path ）
op2=>operation: npm run command / npm run command:mac
op3=>operation: Mock:choise 2
op4=>operation: choise 1（local data） or 2 (cloud data) to running...
st->op1->op2->op3->op4->end
```
##### 2.3、build step：
```flow
st=>start: Start
end=>end
op1=>operation: yarn or npm i （ in root path ）
op2=>operation: npm run command / npm run command:mac
op3=>operation: Mock:choise 3 to running...
st->op1->op2->op3->end
```
## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License
Copyright (c) 2020-present 架构组前端 -  Broccoli spring( 高仓雄 - gcx )
