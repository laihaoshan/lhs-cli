# Skyline 开发模板项目

本项目为开发模板库，主要用于提供标准化的项目结构和开发脚手架，帮助开发者快速启动新项目。当前版本包含基于 Vite 和 Webpack 的 Vue 3 + TypeScript 项目模板。

## 安装与使用
   ```bash
   npm i lhs-cli -g
   yarn global add lhs-cli 
   pnpm i lhs-cli -g
   ```
   ```bash
    lhs-cli init <projectName>
    # 请选择构建工具 (Use arrow keys)
    #   webpack
    # > vite
    # ✔ 是否需要配置国内淘宝镜像? (Y/n) Yes
    # 是否需要添加 husky (Git hooks 工具)? (Y/n) Yes
    # ✅ 淘宝镜像 已在 <projectName> 配置完成!
    #  commit-msg 是否需要配置提交校验规则? (Y/n) Yes
    # ✅ husky 已在 <projectName> 配置完成!
    # ✔ 项目创建成功！
    # ◇ 进入项目目录：cd ./test
    # △ 安装依赖：npm i / yarn / pnpm i
    # ☆ 本地启动项目：npm run dev / yarn run dev / pnpm run dev

   ```

## 模板概览

### Vite 模板
- 基于 Vue 3 + TypeScript + Vite
- 包含基础项目结构，如 `src/main.ts`, `src/router`, `src/store` 等
- 集成 Axios 请求封装，支持 Blob 类型响应处理
- 提供默认样式定义和组件模板

### Webpack 模板
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

## 贡献指南

欢迎贡献新模板或改进现有模板。请遵循以下步骤：
1. Fork 本仓库
2. 创建新分支
3. 添加或修改模板
4. 提交 PR 并描述更改内容

## 许可证

本项目遵循 MIT 许可证，请参阅 [LICENSE](LICENSE) 文件获取详细信息。

## 更新内容

### 0.0.6
* 新增国内淘宝镜像配置
* 项目创建成功后指引文案调整
* MD文档说明更新