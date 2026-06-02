# ToolKit Web

ToolKit 是一个面向开发者和日常效率场景的本地优先小工具箱。项目基于 React、TypeScript、Vite、Tailwind CSS v4 和 shadcn/ui 构建，敏感输入尽量在浏览器本地完成处理。

## 功能

当前内置 12 个常用工具：

- JSON 美化、压缩与校验
- UUID v4 批量生成
- 2FA / TOTP 验证码生成
- Base64 编码与解码
- URL / URI 编解码
- Unix 时间戳、ISO、本地时间互转
- SHA 系列 Hash 生成
- JWT Header / Payload 本地解码
- HEX、RGB、HSL 颜色转换
- 正则表达式测试
- 文本 Diff 对比
- 随机密码生成

## 技术栈

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4
- shadcn/ui
- react-router-dom
- pnpm

## 本地开发

```bash
pnpm install
pnpm run dev
```

常用脚本：

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
pnpm run preview
```

## 添加 shadcn/ui 组件

项目使用 pnpm，添加组件时建议使用：

```bash
pnpm dlx shadcn@latest add button
```

组件会生成到 `src/components/ui`，使用别名导入：

```tsx
import { Button } from "@/components/ui/button"
```

## 构建与部署

生产构建输出到 `dist/`：

```bash
pnpm run build
```

项目包含 `Dockerfile` 和 `nginx.conf`，可以用于静态资源容器化部署。
