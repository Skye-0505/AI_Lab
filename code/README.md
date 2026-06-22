# AI 时代个人定位实验室 — 网站

基于 Astro + Tailwind CSS + shadcn/ui 的静态内容站，首期包含首页、研究笔记、访谈/播客复盘。

## 本地运行

```bash
cd code
npm install
npm run dev
```

浏览器打开 [http://localhost:4321](http://localhost:4321)。

## 其他命令

```bash
npm run build    # 构建静态产物到 dist/
npm run preview  # 预览构建结果
```

## 项目结构

```
src/
├── content/
│   ├── notes/      # 研究笔记（Markdown）
│   └── reviews/    # 访谈复盘（Markdown）
├── components/
│   ├── ui/         # shadcn/ui 组件
│   └── ...
├── pages/          # 路由页面
├── layouts/        # 布局
├── styles/         # 全局样式（低饱和度绿色主题）
└── site.config.ts  # 站点名称、导航等配置
```

## 添加内容

### 研究笔记

在 `src/content/notes/` 新建 `.md` 文件：

```yaml
---
title: "文章标题"
description: "摘要"
publishedAt: 2026-06-22
tags: [标签1, 标签2]
draft: false
---
```

### 访谈复盘

在 `src/content/reviews/` 新建 `.md` 文件，正文建议包含四个小节：

1. 这期揭示了什么外部变化
2. 对个人重新定位的启发
3. 值得保留的概念或案例
4. 可转化的自测问题或行动建议

## 技术栈

- [Astro](https://astro.build) 6.x
- [Tailwind CSS](https://tailwindcss.com) 4.x
- [shadcn/ui](https://ui.shadcn.com)（React 组件）
- [Lucide](https://lucide.dev) 图标

## 修改站点信息

编辑 `src/site.config.ts` 即可更新产品名称、标语、导航、页脚文案等。

## 部署上线

免费托管，无需买服务器。详见 [../docs/deploy.md](../docs/deploy.md)（Vercel / Cloudflare Pages 步骤）。
