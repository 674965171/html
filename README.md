# 静态站点图鉴 · Static Site Gallery

按行业归档的**静态网页模板库**。遇到某个行业要做官网、商城、落地页时，
从导航页按行业找到同类版式，点开直接看效果。

> 纯静态 HTML / CSS / JS —— 无构建、无依赖、无后端。克隆下来双击 `index.html` 即可打开。

---

## 目录结构

```
.
├── index.html                     # 导航主页（站点图鉴）
├── assets/
│   ├── css/
│   │   ├── base.css               # 设计令牌 + 重置 + 通用组件（全站共享）
│   │   └── nav.css                # 导航页专用样式
│   └── js/
│       ├── sites.js               # ★ 站点清单数据源（唯一需要维护的数据文件）
│       └── nav.js                 # 导航页交互逻辑
└── sites/
    ├── construction-corp/         # 建筑装饰 · 企业官网
    ├── realestate-portal/         # 房产家居 · 楼盘门户
    ├── finance-bank/              # 金融投资 · 银行官网
    ├── travel-agency/             # 旅游出行 · 线路商城
    ├── catering-brand/            # 餐饮美食 · 品牌官网
    ├── ecommerce-mall/            # 电商零售 · 综合商城
    ├── tech-saas/                 # 科技互联网 · SaaS 官网
    └── personal-portfolio/        # 个人作品 · 作品集
```

---

## 新增一个页面（三步）

1. 把页面放到 `sites/<slug>/index.html`（`slug` 用小写英文 + 连字符）。
2. 在 `assets/js/sites.js` 的 `SITES` 数组里加一条记录：

   ```js
   {
     slug: 'medical-clinic',        // 对应目录名
     title: '仁和诊所 · 官网',
     industry: 'healthcare',        // 必须存在于 INDUSTRIES
     type: '企业官网',               // 页面类型，用于标签展示
     layout: 'hero',                // 缩略图形态：hero|split|grid|list|app|profile
     accent: '#0ea5e9',             // 该站点主色，用于卡片缩略图着色
     status: 'live',                // live 已上线 | planned 规划中
     desc: '一句话说明这个页面演示了什么。',
     tags: ['预约', '科室导航'],
   }
   ```

3. 刷新导航页即可看到新卡片。**不需要改动导航页本身。**

> `status: 'planned'` 的条目会渲染成灰色占位卡，点击只弹提示、不跳转，
> 适合先把坑位占好，之后再逐个补页面。

---

## 页面清单

| 行业 | 页面 | 类型 | 状态 |
|---|---|---|---|
| 建筑装饰 | [云筑建设集团](sites/construction-corp/) | 企业官网 | 已上线 |
| 房产家居 | [悦居置业 · 楼盘门户](sites/realestate-portal/) | 资讯门户 | 已上线 |
| 金融投资 | [汇通银行 · 数字金融](sites/finance-bank/) | 企业官网 | 已上线 |
| 旅游出行 | [远行者旅行 · 线路商城](sites/travel-agency/) | 电商商城 | 已上线 |
| 餐饮美食 | [灶见 · 中式餐饮](sites/catering-brand/) | 企业官网 | 已上线 |
| 电商零售 | [拾光集 · 综合商城](sites/ecommerce-mall/) | 电商商城 | 已上线 |
| 科技互联网 | [云枢 CloudHub](sites/tech-saas/) | 企业官网 | 已上线 |
| 个人作品 | [林清野 · 作品集](sites/personal-portfolio/) | 个人主页 | 已上线 |

其余 24 个行业、约 60 个页面已在导航页占位（状态：规划中）。

---

## 本地预览

直接双击 `index.html` 即可。若需本地服务器（推荐，避免个别浏览器的 file:// 限制）：

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

然后访问 <http://localhost:8080>。

---

## 部署（GitHub Pages）

仓库自带 `.github/workflows/deploy-pages.yml`，推送到 `main` 即自动发布到
<https://674965171.github.io/html/>。

**首次启用前有一个前置条件**：GitHub Pages 在 **免费账号下只支持公开仓库**。
如果仓库是私有的，工作流会因权限不足失败。处理方式二选一：

- **改公开**（免费）：`Settings → General → 拉到最底 Danger Zone → Change repository visibility → Public`。
  改完在 `Actions` 页对失败的运行点一次 **Re-run all jobs** 即可。
- **保持私有**：需升级 GitHub Pro。注意即使升级，**发布出来的站点本身仍是公开的**——
  私有只保护源码，不保护页面。

工作流里的 `configure-pages` 带 `enablement: true`，会自动帮你打开 Pages，
不需要再手动去 Settings → Pages 选发布源。

> 备选方案：不用工作流，直接在 `Settings → Pages → Source: Deploy from a branch → main / (root)`。
> 分支方式同样支持每次 push 自动重建。

---

## 说明

- 所有页面中的**公司名、产品名、价格、电话、地址、资质**均为虚构，仅用于演示版式，不构成任何商业信息。
- 页面之间**没有共享运行时依赖**，每个 `sites/*/index.html` 都可以单独拷走使用。
- 导航页的行业分类定义在 `assets/js/sites.js` 的 `INDUSTRIES` 数组中，可按需增删。
