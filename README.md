# MoviePersona 影格

> 如果你的人生是一部电影，你会是什么角色？

MoviePersona（影格）是一个面向电影爱好者的电影人格探索与个性化电影推荐开源项目。大学生是我们首批推广的群体，但网站面向所有喜欢电影的人。

**当前版本：V0.0.2，早期开发中。** 正式的电影人格测试与电影推荐都尚未实现，目前提供首页、两个功能预告页，以及一个两道题的交互演示。

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
- 电影人格测试页 `/quizzes`：两道示例题的交互演示，只用于验证交互，没有计分，不生成人格结果，不是正式测试
- 电影推荐预告页 `/discover`：功能预告，以及原创电影封面组件的设计演示
- `PosterCard` 电影封面组件：纯 CSS 与 SVG 绘制，不使用任何真实海报，演示用电影均为虚构
- 电影与测试的 TypeScript 类型：`Movie`、`Quiz`、`QuizQuestion`
- 移动端优先的响应式布局，支持键盘访问与「减少动画」系统设置
- GitHub 仓库地址集中配置

## 尚未实现功能

以下功能目前都**没有实现**：

- 正式的电影人格测试（完整题库、计分与结果）
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
    quizzes/page.tsx    电影人格测试页（交互演示）
    discover/page.tsx   电影推荐预告页（含封面演示）
  components/
    SiteHeader.tsx      导航栏
    SiteFooter.tsx      页脚
    PreviewPage.tsx     预告页共用模板
    home/               首页各区块
    movie/PosterCard.tsx  原创电影封面组件
    quiz/QuizDemo.tsx   两道题交互演示
  config/
    site.ts             站点信息与 GitHub 地址配置
  types/
    movie.ts            电影类型
    quiz.ts             测试类型
```

## Roadmap

以下为规划，顺序和内容可能随开发调整：

- [x] V0.0.1：项目初始化、首页、两个预告页
- [x] V0.0.2：原创电影封面组件、基础 TypeScript 类型、两道题交互原型、MIT 许可证
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

## 许可证

项目作者有权授权的代码采用 [MIT License](./LICENSE)。

第三方电影图片、数据集、商标或其他素材**不自动包含**在 MIT 授权范围内，使用时请遵守各自的授权条款。

## 说明

- 页面中出现的电影封面均为原创的设计演示，电影名称与文案均为虚构，并非真实电影作品。
- 本项目暂未使用任何电影海报或其他第三方影视素材。