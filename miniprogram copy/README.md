# Mini商城 - 微信小程序商城

一个纯前端的微信小程序商城 Demo，基于原生框架开发，使用本地 Storage 存储数据。

## 功能概览

| 页面 | 功能 |
|------|------|
| 🏠 首页 | 搜索商品、分类筛选（数码/服饰/食品/美妆）、双列商品列表 |
| 📦 商品详情 | 轮播图、价格、描述、数量选择、加入购物车、立即购买 |
| 🛒 购物车 | 全选/单选、数量增减、删除、合计金额、去结算 |
| 💳 确认订单 | 微信原生收货地址、商品清单、模拟支付 |
| 📋 订单列表 | 全部/待付款/已完成 tab 筛选、订单详情查看 |
| 👤 我的 | 用户头像昵称、订单统计入口、地址管理 |

## 技术栈

- **框架**: 微信小程序原生（WXML + WXSS + JS）
- **数据存储**: wx.Storage (localStorage)
- **商品数据**: utils/mock.js 模拟数据
- **图片**: picsum.photos 占位图

## 使用方法

1. 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 打开微信开发者工具，选择「导入项目」
3. 项目目录选择 `miniprogram/` 文件夹
4. AppID 可以使用测试号（或填入你的 AppID）
5. 点击「确定」即可预览运行

## 项目结构

```
miniprogram/
├── app.js / app.json / app.wxss   # 全局配置
├── project.config.json             # 项目配置
├── sitemap.json                    # 站点地图
├── utils/
│   ├── mock.js                     # 商品模拟数据 (12款商品)
│   └── storage.js                  # 本地存储工具 (购物车+订单CRUD)
├── components/
│   └── product-card/               # 通用商品卡片组件
├── pages/
│   ├── index/                      # 首页
│   ├── product/                    # 商品详情
│   ├── cart/                       # 购物车
│   ├── checkout/                   # 确认订单
│   ├── orders/                     # 订单列表
│   └── my/                         # 个人中心
└── images/tab/                     # TabBar 图标
```

## 注意事项

- 商品图片使用 `picsum.photos`，需在微信公众平台配置 `downloadFile` 域名白名单
- TabBar 图标为简单纯色占位图，可替换为实际设计稿
- 本项目为 Demo，支付功能为模拟操作，不涉及真实支付
