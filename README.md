# Neon Oracle · 神谕

> 一台 AI 塔罗机：30 秒内，给你一段感觉是"为你而写"的预言。

[![Built with Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Powered by OpenAI](https://img.shields.io/badge/Powered%20by-OpenAI-412991?logo=openai)](https://platform.openai.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)

## 是什么

把心事写下，按下"落定"，三张牌翻开，AI 一次性织出三段神谕（过去 / 此刻 / 将至）。
读完截屏分享，或者复制链接发给朋友——他打开看到的是同一次占卜。

不是聊天产品。整个体验是一段单次的、线性的、有重量的仪式。

## 设计原则（节选）

- **冷静、笃定、惜字如金**——参考人格：《沙丘》Bene Gesserit、《黑客帝国》Oracle
- **绝不出现"AI 生成"或免责声明**——破坏沉浸即失败
- **不挽留用户、不做账号、不做引导**——卖的是单次仪式，不是 DAU
- **结果页设计为可被截图分享的卡片**——朋友圈缩略图也得能看

完整产品 brief 见 [`PRODUCT.md`](./PRODUCT.md)，功能规格见 [`SPEC.md`](./SPEC.md)。

## 技术栈

- Next.js 15 (App Router) + React 19 + TypeScript
- OpenAI Chat Completions（`gpt-4o` 默认，可经 `OPENAI_MODEL` 切换）
- 部署：Vercel
- 字体：Noto Serif SC × JetBrains Mono

## 本地开发

```bash
npm install
cp .env.local.example .env.local
# 把 OPENAI_API_KEY 填进去；不填也能跑，会走 lib/scripted.ts 的预写降级
npm run dev
```

打开 <http://localhost:3000>。

## 项目结构

```
app/
  api/divine/route.ts      OpenAI 调用 + 降级
  r/[code]/page.tsx        分享链接 viewer（base64url-encoded reading）
  page.tsx                 入口
components/
  OracleApp.tsx            7-阶段状态机
  OracleShell.tsx          视觉容器（背景 / 噪点 / 顶部 chrome）
  primitives/              共享视觉原语（CardFace, FlipCard, Starfield…）
  screens/                 7 张屏：Entry / Question / Casting / Deal / Oracle / Transmission / Share
lib/
  tarot.ts                 22 张大阿尔卡那 + 抽牌逻辑
  share.ts                 占卜结果的 URL 编解码
  scripted.ts              API 不可用时的降级文案
  theme.ts                 深空墨色主题 token
```

## 分享链接是怎么工作的

整次占卜的内容（问题 + 三张牌 + 三段神谕 + sessionId）被 JSON.stringify + base64url 编码进 URL：

```
https://your-domain/r/<编码后的 payload>
```

服务端从路径解码，重新渲染同一张分享卡。**没有后端存储、没有 KV、没有过期**——链接本身就是占卜的全部状态。代价是 URL 略长（~500-900 字符），现代消息平台都吞得下。

## 内容降级

`OPENAI_API_KEY` 缺失、调用失败、或返回无法解析的格式时，`/api/divine` 会回落到 `lib/scripted.ts` 里的 3 套预写脚本。前端有一个角落的 `scripted` 小标记，但功能上无感知差异。

## 牌面美术

当前 22 张牌使用条纹 placeholder + 等宽 `<illustration:the_tower>` 标注，方便看见接入位。
真实插画接入时替换 `components/primitives/CardFace.tsx` 中间的占位区即可。

## 致谢

- 视觉与交互原型由 Claude Design 产出
- 工程实现由 Claude Code 完成
- 产品方向、决策、push button 由 Yiyang Shao
