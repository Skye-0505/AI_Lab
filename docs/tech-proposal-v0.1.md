# AI 时代个人定位实验室 — 首期技术方案 v0.1

> 对应需求：[requirements-v0.1.md](./requirements-v0.1.md)  
> 首期范围：**首页 · 研究笔记 · 访谈/播客复盘**  
> 状态：待确认

---

## 1. 首期目标

做一个**轻量、可长期迭代**的静态内容网站，把已有研究和复盘以结构化方式公开，为后续工具（自测、案例库等）打基础。

| 模块 | 首期交付 | 不做 |
|------|----------|------|
| 首页 | 产品定位、核心问题、模块入口 | 登录、订阅、评论 |
| 研究笔记 | 列表页 + 详情页，首批 3–5 篇 | CMS 后台、搜索 |
| 访谈/播客复盘 | 列表页 + 详情页，首批 3 篇 | 音频嵌入、播放器 |

**非目标（与需求文档一致）：** 社区、付费、案例库、自测工具、用户系统。

---

## 2. 技术选型

### 2.1 推荐方案：Astro + Markdown

| 维度 | 选择 | 理由 |
|------|------|------|
| 框架 | [Astro 5.x](https://astro.build) | 内容优先；原生支持 Markdown/MDX；构建产物为静态 HTML，加载快 |
| 样式 | Tailwind CSS | 快速搭建简洁阅读型 UI，后期好维护 |
| 内容 | Markdown + Frontmatter | 与现有 `ideaExplore/notes/` 写作习惯一致，Git 即版本管理 |
| 部署 | Vercel 或 Cloudflare Pages | 连 Git 自动部署，零运维 |
| 语言 | TypeScript（可选，首期可纯 JS） | 后续加自测工具时有类型保障 |

**为什么不用更重的方案：**

- **纯 React SPA（Vite + React Router）**：SEO 和首屏需额外处理，对以阅读为主的内容站不划算。
- **Next.js 全栈**：首期无 API、无 SSR 需求，引入复杂度偏高；若你更熟悉 React 生态可作为备选（见 §7）。
- **WordPress / Notion 导出**：违背「积累优先、Git 管理内容、小步产品化」原则，后期难接自定义工具。

**为什么选 Astro 而不是 Hugo/Jekyll：**

- 后续 MVP 里的「未来储备自测」需要在页面里跑交互逻辑；Astro 支持 **Islands 架构**，可在静态页中局部嵌入 React/Vue 组件，无需整体重构。
- 内容集合（Content Collections）自带 schema 校验，适合研究笔记、复盘两类 frontmatter 字段不同的场景。

### 2.2 备选方案：Next.js（App Router）+ MDX

若团队更熟悉 React，可改用 Next.js 静态导出（`output: 'export'`），内容同样放 `content/` 目录。首期功能等价，差异主要在工具链熟悉度。

---

## 3. 信息架构与路由

```
/                          首页
/notes                     研究笔记列表
/notes/[slug]              研究笔记详情
/reviews                   访谈/播客复盘列表
/reviews/[slug]            复盘详情
```

导航结构：

```
[Logo / 产品名]    研究笔记    访谈复盘
```

页脚（可选）：一句话定位、GitHub/邮箱、版权。

---

## 4. 内容模型

内容以 Markdown 文件存放，通过 frontmatter 描述元数据。Astro Content Collections 可为两类内容分别定义 schema。

### 4.1 研究笔记 `src/content/notes/*.md`

```yaml
---
title: "AI 时代什么能力更难被压缩"
description: "从劳动分工变化看判断型能力"
publishedAt: 2026-06-20
tags: [能力储备, 知识工作]
draft: false
---

正文 Markdown...
```

**列表页展示：** 标题、摘要（description 或正文前 120 字）、发布日期、标签。  
**详情页展示：** 标题、日期、标签、正文；可选「相关笔记」占位（后期再做）。

### 4.2 访谈/播客复盘 `src/content/reviews/*.md`

```yaml
---
title: "忽左忽右 × 某期：技术变革中的个体位置"
source: "忽左忽右"
sourceUrl: "https://..."
guest: "嘉宾名（可选）"
publishedAt: 2026-06-18
tags: [社会结构, 职业变迁]
draft: false
---

## 这期揭示了什么外部变化
...

## 对个人重新定位的启发
...

## 值得保留的概念或案例
...

## 可转化的自测问题或行动建议
...
```

复盘详情页在正文前可增加**结构化摘要区**（四问框架），与需求 §5.2 对齐；正文按上述小节组织，便于写作也便于读者扫读。

### 4.3 与现有素材的关系

| 现有位置 | 首期用法 |
|----------|----------|
| `ideaExplore/notes/*.md` | 可改写 frontmatter 后复制到 `src/content/notes/` |
| `ideaExplore/inbox/`、`inspiration/` | 草稿区，不直接进站 |
| `30-day-high-quality-interview-input.md` | 选题参考，复盘正文单独写 |

**内容同步策略（首期）：** 手动复制 + 改 frontmatter。不在首期做自动同步脚本，避免过度工程。

---

## 5. 项目目录结构（建议）

```
ai-positioning-lab/
├── code/                          # 网站源码（本期新建）
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── content/
│   │   │   ├── notes/             # 研究笔记 .md
│   │   │   └── reviews/           # 访谈复盘 .md
│   │   ├── layouts/
│   │   │   ├── BaseLayout.astro   # 全局壳：nav + footer
│   │   │   ├── NoteLayout.astro
│   │   │   └── ReviewLayout.astro
│   │   ├── components/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── ArticleCard.astro
│   │   │   └── ReviewSummary.astro  # 四问摘要块
│   │   ├── pages/
│   │   │   ├── index.astro        # 首页
│   │   │   ├── notes/
│   │   │   │   ├── index.astro
│   │   │   │   └── [...slug].astro
│   │   │   └── reviews/
│   │   │       ├── index.astro
│   │   │       └── [...slug].astro
│   │   ├── styles/
│   │   │   └── global.css
│   │   └── content.config.ts      # Content Collections schema
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
└── docs/
    ├── requirements-v0.1.md
    └── tech-proposal-v0.1.md      # 本文档
```

---

## 6. 页面与 UI 要点

### 6.1 设计原则（对齐产品原则 §9）

- **阅读优先**：大字号正文、合适行宽（约 65–75 字符）、充足留白。
- **低焦虑视觉**：中性色（灰、墨绿或深蓝点缀），避免红/黄警告式营销感。
- **结构化**：列表卡片信息层级清晰；复盘页突出「四问」框架。
- **移动端友好**：单列布局，导航可折叠。

### 6.2 首页区块

1. **Hero**：产品名 + 一句话定位（需求 §1 引用块）。
2. **核心问题**：「个体如何在 AI 时代重新找到自己的位置？」
3. **三件事**：看清外部变化 / 看清自身位置 / 形成下一步实验（需求 §4，图标或短文案即可）。
4. **内容入口**：两张卡片 —「研究笔记」「访谈复盘」，链到列表页。
5. **目标用户**（可选折叠）：程序员、知识工作者等（需求 §3，简短列表）。

### 6.3 列表页

- 按 `publishedAt` 降序。
- 卡片：标题、摘要、日期、标签。
- 空状态：友好提示「内容筹备中」。

### 6.4 详情页

- 研究笔记：标准文章排版，支持标题层级、引用、代码块（若笔记含技术示例）。
- 复盘：顶部 `ReviewSummary` 组件渲染四问（若 frontmatter 或正文 h2 已包含则二选一，避免重复）。

### 6.5 产品名称

需求 §11 待确定。代码里先用占位名 **「个人定位实验室」** 或英文名 slug `ai-positioning-lab`，确认后可改 `site.config` 一处生效。

---

## 7. 部署与域名

| 环节 | 建议 |
|------|------|
| 代码托管 | GitHub 私有/公开仓库 |
| CI/CD | push `main` → Vercel 自动构建 |
| 预览 | PR 自动生成 preview URL |
| 域名 | 首期可用 `*.vercel.app`；自定义域名后期绑定 |
| 分析 | 首期可选 [Plausible](https://plausible.io) 或 Vercel Analytics，轻量、无 cookie 横幅 |

构建命令：`npm run build`  
输出目录：`dist/`

---

## 8. 开发计划（预估 2–3 天）

| 阶段 | 任务 | 产出 |
|------|------|------|
| D1 上午 | 初始化 Astro 项目、Tailwind、Content Collections | 可运行空壳 |
| D1 下午 | BaseLayout、Header/Footer、首页静态文案 | 首页可访问 |
| D2 上午 | 笔记/复盘列表与详情路由、ArticleCard | 内容页通 |
| D2 下午 | 迁入 2 篇笔记 + 1 篇复盘样例、样式微调 | 有真实内容可浏览 |
| D3 | 响应式、SEO meta、sitemap、部署上线 | 公网可访问 |

**你需配合的内容工作（可与开发并行）：**

1. 确定对外产品名称与首页 Hero 文案终稿。
2. 提供或指定首批 3 篇研究笔记、3 篇复盘（可先 `draft: true` 隐藏未就绪篇目）。

---

## 9. 后续扩展预留（本期只留接口，不实现）

| 需求模块 | 预留方式 |
|----------|----------|
| 案例库 | 新增 `content/cases/` + `/cases` 路由，复用 ArticleCard |
| 未来储备自测 | 新增 `/tools/reserve-quiz` 页面，用 Astro Island 嵌入 React 问卷组件 |
| 90 天探索计划 | 独立工具页，结果 localStorage 存储（需求：本地计算） |
| 搜索 | Pagefind 或 Algolia，静态站友好 |
| RSS | `@astrojs/rss` 一键加 feed |

Content Collections 的 schema 扩展时加字段即可，不影响已有文章。

---

## 10. 风险与决策点（需你确认）

1. **产品名称与域名** — 是否已有偏好？影响 `title`、`og:image`、仓库名展示。
2. **语言** — 首期仅中文；若未来有英文笔记，frontmatter 加 `lang` 字段即可。
3. **复盘模板** — 是否强制四问 h2 结构？建议强制，保证质量一致。
4. **是否开源** — 仅内容开源 vs 代码+内容开源，影响仓库 visibility。
5. **框架最终选择** — 默认 Astro；若你更想全程 React，回复后方案改为 Next.js 静态导出，页面结构不变。

---

## 11. 确认后下一步

你确认本方案（或标注修改意见）后，我将：

1. 在 `ai-positioning-lab/code/` 初始化 Astro 项目；
2. 实现首页 + 研究笔记 + 访谈复盘全套页面；
3. 放入 1–2 篇样例内容便于本地预览；
4. 补充 `code/README.md`（本地开发与部署说明）。

---

## 附录 A：首页文案草案（可改）

**Hero 标题：** AI 时代个人定位实验室  

**副标题：** 用研究笔记、内容复盘和小工具，帮助知识工作者在技术变化中重新找到自己的位置。

**CTA：**  
- 阅读研究笔记 → `/notes`  
- 浏览访谈复盘 → `/reviews`

## 附录 B：技术栈版本（锁定建议）

```json
{
  "astro": "^5.x",
  "@astrojs/tailwind": "^6.x",
  "tailwindcss": "^4.x",
  "typescript": "^5.x"
}
```

首期不引入 UI 组件库（如 shadcn），保持依赖最小；样式用 Tailwind 工具类即可。
