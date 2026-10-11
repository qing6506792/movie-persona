# MoviePersona 影格

> 如果你的人生是一部电影，你会是什么角色？

MoviePersona（影格）是一个面向大学生的电影人格测试与个性化电影推荐项目，以开源方式逐步搭建。

**当前版本：V0.0.1，早期开发中。** 目前只有首页和两个功能预告页，电影人格测试与电影推荐都尚未实现。

## 技术栈

- Next.js（App Router）
- TypeScript
- Tailwind CSS v4
- Lucide React（图标）
- npm

## 本地启动

需要 Node.js 20.9 或更高版本。

```bash
npm install
npm run dev
```

然后在浏览器打开 http://localhost:3000 。

常用检查命令：

```bash
npx tsc --noEmit
npx eslint .
npm run build
```

## 已实现功能

- 首页 `/`：导航栏、Hero 主视觉、功能介绍、用户体验流程、页脚
- 电影人格测试预告页 `/quizzes`
- 电影推荐预告页 `/discover`
- 移动端优先的响应式布局，支持键盘访问与「减少动画」系统设置
- GitHub 仓库地址集中配置，未配置时页面显示「待配置」，不会生成无效链接

## 尚未实现功能

以下功能目前都**没有实现**，页面上只是预告或介绍：

- 电影人格测试（题库、计分与结果）
- 电影人格名片与分享
- 电影推荐
- 用户评价与反馈
- 用户登录、数据库、后端服务

## 项目结构

```text
src/
  app/
    layout.tsx          全局布局（导航栏、页脚）
    page.tsx            首页
    globals.css         全局样式与品牌色
    quizzes/page.tsx    电影人格测试预告页
    discover/page.tsx   电影推荐预告页
  components/
    SiteHeader.tsx      导航栏
    SiteFooter.tsx      页脚
    PreviewPage.tsx     预告页共用模板
    home/               首页各区块
  config/
    site.ts             站点信息与 GitHub 地址配置
```

## Roadmap

以下为规划，顺序和内容可能随开发调整：

- [x] V0.0.1：项目初始化、首页、两个预告页
- [ ] 电影人格测试：题库设计、计分逻辑、结果页
- [ ] 电影人格名片与分享
- [ ] 基础电影推荐（优先以 TypeScript 实现）
- [ ] 用户反馈收集
- [ ] 序列推荐等科研方向（如 SASRec），后续阶段再决定

## GitHub 链接配置

网站里的 GitHub 入口读取 `src/config/site.ts` 中的 `githubUrl`：

```ts
githubUrl: "https://github.com/你的用户名/movie-persona",
```

- 保持空字符串时，导航栏和页脚显示「GitHub 待配置」，不会跳转。
- 只有以 `https://github.com/` 开头的地址才会被当作有效链接。
- 修改这一处即可，导航栏和页脚会同步更新。

## 说明

本项目页面暂未使用任何电影海报或其他第三方影视素材。