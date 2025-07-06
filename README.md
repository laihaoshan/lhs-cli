# Skyline 开发模板项目

本项目为开发模板库，主要用于提供标准化的项目结构和开发脚手架，帮助开发者快速启动新项目。当前版本包含基于 Vite 和 Webpack 的 Vue 3 + TypeScript 项目模板。

## 模板概览

### Vite 模板 (src/templates/vite/default)
- 基于 Vue 3 + TypeScript + Vite
- 包含基础项目结构，如 `src/main.ts`, `src/router`, `src/store` 等
- 集成 Axios 请求封装，支持 Blob 类型响应处理
- 提供默认样式定义和组件模板

### Webpack 模板 (src/templates/webpack/default)
- 基于 Vue 3 + TypeScript + Webpack
- 包含 Webpack 标准配置文件，如 `webpack.config.ts`, `devServer.ts`, `optimization.ts` 等
- 提供 Eslint、Prettier 等开发工具配置
- 集成 Axios 请求封装与基础路由、状态管理模块

## 主要功能

- 快速初始化项目结构
- 提供现代前端开发所需的标准配置
- 集成常用开发工具（如 Axios、Pinia、Vue Router）
- 支持 TypeScript 开发环境
- 提供基础样式和组件模板

## 安装与使用

1. 克隆本仓库：
   ```bash
   git clone <仓库地址>
   ```

2. 进入模板目录并安装依赖：
   ```bash
   cd src/templates/vite/default
   npm install
   # 或者使用 Webpack 模板
   cd src/templates/webpack/default
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 构建生产版本：
   ```bash
   npm run build
   ```

## 贡献指南

欢迎贡献新模板或改进现有模板。请遵循以下步骤：
1. Fork 本仓库
2. 创建新分支
3. 添加或修改模板
4. 提交 PR 并描述更改内容

## 许可证

本项目遵循 MIT 许可证，请参阅 [LICENSE](LICENSE) 文件获取详细信息。