# Gwitter 部署检查清单

## 🔧 配置检查

### 1. GitHub OAuth 应用配置

- [ ] 已创建 GitHub OAuth App
- [ ] 记录 Client ID 和 Client Secret
- [ ] **重要**：设置正确的 Authorization callback URL（你的部署域名）
  - 示例：`https://yourdomain.com`
  - 本地测试：`http://localhost:4173`

### 2. GitHub 仓库配置

- [ ] 已创建用于存储内容的 GitHub 仓库
- [ ] 在仓库中创建 Issues 或 Discussions（Announcements）
- [ ] 如果使用 Discussions 模式，确保仓库启用了 Discussions 功能

### 3. Token 配置（可选）

- [ ] 如果配置 owner token：
  - 生成 Personal Access Token
  - 权限：`repo` 和 `read:user`
  - 在 `src/config/index.ts` 中配置
- [ ] 如果不配置 token：
  - 设置 `token: undefined`
  - 用户需要登录才能查看

### 4. 修改 `src/config/index.ts`

```typescript
let config = {
  request: {
    token: undefined, // 或你的 token
    clientID: '你的_Client_ID', // ✅ 必须修改
    clientSecret: '你的_Client_Secret', // ✅ 必须修改
    owner: '你的_GitHub_用户名', // ✅ 必须修改
    repo: '你的_仓库名', // ✅ 必须修改
    pageSize: 6,
    autoProxy:
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token',
  },
  app: {
    dataSource: 'discussion', // 或 'issue'
    onlyShowOwner: false,
    enableRepoSwitcher: false,
    enableAbout: false,
    enableEgg: false,
  },
};
```

### 5. 修改 `rsbuild.config.mjs`

```javascript
output: {
  // 根据部署位置选择：
  assetPrefix: './',           // 本地测试
  // assetPrefix: '/',         // 部署到根路径
  // assetPrefix: '/Gwitter/', // 部署到子路径
},
```

## 🚀 构建和部署

```bash
# 安装依赖（如果还没有）
npm install --legacy-peer-deps

# 构建
npm run build

# 本地预览
npm run preview
```

## 🔍 测试

部署后测试以下功能：

- [ ] 页面正常加载
- [ ] 能看到 Issues/Discussions 列表
- [ ] 点击登录按钮能正常跳转
- [ ] 登录后能点赞和评论
- [ ] 标签筛选功能正常
- [ ] 无限滚动加载更多

## 📝 常见问题

### OAuth 回调错误

- 检查 GitHub OAuth App 的 callback URL 是否与部署域名一致
- 本地测试时使用 `http://localhost:4173`

### 无法加载数据

- 检查 owner 和 repo 配置是否正确
- 检查仓库是否为公开仓库
- 如果使用 Discussion 模式，确保仓库启用了 Discussions

### Rate Limit 错误

- 如果未配置 owner token，未登录用户只有 60次/小时
- 引导用户登录使用个人配额 5000次/小时

## 🎉 部署完成！

访问你的部署域名查看效果！
