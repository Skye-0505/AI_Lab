# 部署指南

本站是 Astro 静态站，**不需要买服务器**。推荐用 [Vercel](https://vercel.com) 免费托管，连 GitHub 后每次 push 自动更新。

---

## 前置条件

- 本机已能正常构建：`cd code && npm run build`
- 有 [GitHub](https://github.com) 账号
- Node.js **≥ 22.12**（Vercel 会自动使用合适版本，本地开发也需满足）

---

## 方式一：Vercel（推荐）

### 1. 把代码推到 GitHub

在仓库根目录或 `ai-positioning-lab` 目录初始化 git（若尚未初始化）：

```bash
cd /path/to/ai-positioning-lab
git init
git add code/
git commit -m "Add AI positioning lab site"
```

在 GitHub 新建仓库（可设为 Private），然后：

```bash
git remote add origin https://github.com/你的用户名/你的仓库名.git
git branch -M main
git push -u origin main
```

> 若整个 `AIWorkspace` 是一个大仓库，也可以只把 `ai-positioning-lab/code` 作为子目录推送，部署时指定根目录即可（见下文）。

### 2. 导入 Vercel

1. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录
2. 点击 **Add New → Project**
3. 选择刚推送的仓库
4. **重要：配置构建目录**（若代码在 `code/` 子目录下）：

| 配置项 | 值 |
|--------|-----|
| Root Directory | `code`（或你放 `package.json` 的目录） |
| Framework Preset | Astro（一般会自动识别） |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

5. 点击 **Deploy**，等待 1～2 分钟

### 3. 获得网址

部署成功后会得到类似：

```
https://你的项目名.vercel.app
```

每次向 `main` 分支 push，`code/` 里的改动会自动重新构建并上线。

### 4. 部署后改站点配置（可选）

编辑 `code/src/site.config.ts`，把 `url` 改成正式地址：

```ts
url: 'https://你的项目名.vercel.app',
```

改完后 push，Vercel 会自动重新部署。

页脚文案在 `footerNote` 字段，可按需修改。

---

## 方式二：Cloudflare Pages（备选）

同样免费，适合已有 Cloudflare 账号的用户。

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create**
2. 选择 **Pages** → **Connect to Git**
3. 选仓库，配置与 Vercel 类似：

| 配置项 | 值 |
|--------|-----|
| Production branch | `main` |
| Root directory | `code` |
| Build command | `npm run build` |
| Build output directory | `dist` |

4. 环境变量：一般不需要；Node 版本可在 **Settings → Environment variables** 设 `NODE_VERSION` = `22`

---

## 自定义域名（可选，需付费买域名）

域名本身约 **几十元/年**（阿里云、Cloudflare、Namecheap 等），**托管仍免费**。

**Vercel：**

1. Project → **Settings → Domains**
2. 填入你的域名，按提示在域名服务商添加 DNS 记录
3. 生效后更新 `site.config.ts` 里的 `url`

---

## 本地预览构建结果

部署前可在本机确认构建产物是否正常：

```bash
cd code
npm run build
npm run preview
```

打开终端提示的地址（通常是 `http://localhost:4321`）。

---

## 常见问题

### 构建失败：Node 版本过低

Astro 6 要求 Node ≥ 22.12。Vercel 项目 **Settings → General → Node.js Version** 选 `22.x`。

### 页面 404

确认 Output Directory 为 `dist`，且 Root Directory 指向含 `package.json` 的 `code` 文件夹。

### `src/resource/` 字幕文件要不要部署？

默认会进 git 仓库，但**不会**打进网站（只有 `src/content/` 和 `src/pages/` 等参与构建）。若字幕文件很大、不想上传 GitHub，可把 `code/src/resource/` 加入 `.gitignore`——不影响网站运行。

### 需要数据库吗？

当前版本不需要。以后若加「自测工具存云端」再考虑后端服务。

---

## 费用小结

| 项目 | 费用 |
|------|------|
| Vercel / Cloudflare Pages 托管 | 个人项目 **免费** |
| `*.vercel.app` 子域名 | **免费** |
| 自定义域名 | 约 50～100 元/年（仅域名） |
| 云服务器 ECS | **不需要** |

---

## 更新内容的工作流

1. 在 `code/src/content/notes/` 或 `reviews/` 编辑 / 新增 Markdown
2. 本地 `npm run dev` 预览
3. `git add` → `git commit` → `git push`
4. Vercel 自动部署，约 1～2 分钟后线上可见
