# 🌍 Gwitter 游客模式 (Guest Mode)

## 📖 概述

Gwitter 现已支持**游客模式**，无需配置任何认证信息即可访问公开的 GitHub 仓库！

## ✨ 三种使用模式

### 1️⃣ 游客模式（Guest Mode）

**无需任何配置**，直接访问公开仓库

```typescript
export const config: GwitterConfig = {
  request: {
    token: '', // 留空
    clientID: '', // 留空
    clientSecret: '', // 留空
    owner: 'username',
    repo: 'repository',
  },
};
```

**特点：**

- ✅ 零配置，开箱即用
- ✅ 可访问所有公开仓库
- ⚠️ Rate Limit: **60 次/小时**
- ❌ 无法点赞、评论（需要登录）

---

### 2️⃣ Owner Token 模式

配置 Personal Access Token，提升配额

```typescript
export const config: GwitterConfig = {
  request: {
    token: 'ghp_xxxxxxxxxxxxxxxxxxxx', // GitHub Personal Access Token
    clientID: '', // 可选
    clientSecret: '', // 可选
    owner: 'username',
    repo: 'repository',
  },
};
```

**特点：**

- ✅ Rate Limit: **5,000 次/小时**
- ✅ 可访问私有仓库（如果 token 有权限）
- ❌ 用户无法登录（除非配置 OAuth）
- ❌ 交互操作使用 owner 身份（不推荐）

**如何创建 Token：**

1. 访问：https://github.com/settings/tokens/new
2. 勾选权限：
   - `public_repo` (Issue 模式)
   - `read:discussion` (Discussion 模式)
3. 生成并复制 Token

---

### 3️⃣ OAuth 模式（推荐）

支持用户登录，每个用户使用自己的配额

```typescript
export const config: GwitterConfig = {
  request: {
    token: '', // 可选：作为备用
    clientID: 'your_client_id',
    clientSecret: 'your_client_secret',
    autoProxy:
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token',
    owner: 'username',
    repo: 'repository',
  },
};
```

**特点：**

- ✅ 用户可登录
- ✅ 每个用户独立配额：**5,000 次/小时**
- ✅ 点赞、评论使用用户自己的身份
- ✅ 未登录时自动降级为游客模式

**如何创建 OAuth App：**

1. 访问：https://github.com/settings/developers
2. New OAuth App
3. 配置回调 URL：`http://localhost:5173`（开发）或你的域名
4. 复制 Client ID 和 Client Secret

---

## 🔄 Token 优先级

```
用户 Token (登录后)
    ↓ (如果不存在)
Owner Token (配置的 token)
    ↓ (如果不存在)
游客模式 (无 token，60次/小时)
```

## 📊 功能对比

| 功能         | 游客模式 | Owner Token    | OAuth 模式      |
| ------------ | -------- | -------------- | --------------- |
| 查看内容     | ✅       | ✅             | ✅              |
| Rate Limit   | 60/h     | 5000/h         | 5000/h (每用户) |
| 用户登录     | ❌       | ❌             | ✅              |
| 点赞评论     | ❌       | ⚠️ (owner身份) | ✅ (用户身份)   |
| 访问私有仓库 | ❌       | ✅             | ✅              |
| 配置复杂度   | 极简     | 简单           | 中等            |

## 🎯 使用建议

### 个人博客/展示站点

```typescript
// 推荐：游客模式 + Owner Token 备用
{
  token: 'ghp_xxx', // 防止游客配额用完
  clientID: '',     // 不需要用户登录
  clientSecret: '',
}
```

### 社区互动站点

```typescript
// 推荐：OAuth 模式
{
  token: '',        // 可选备用
  clientID: 'xxx',
  clientSecret: 'xxx',
}
```

### 快速测试/Demo

```typescript
// 推荐：游客模式（零配置）
{
  token: '',
  clientID: '',
  clientSecret: '',
}
```

## ⚠️ Rate Limit 处理

当配额用完时，Gwitter 会自动显示友好的提示：

**游客模式配额用完：**

```
⏱️ API Rate Limit Exceeded
Login with your GitHub account to use your personal API quota (5,000 requests/hour).
[ Login with GitHub ]
```

**已登录用户配额用完：**

```
⏱️ API Rate Limit Exceeded
Your personal rate limit has been exceeded. Please try again later.
```

## 🚀 快速开始

### NPM 使用

```bash
npm install gwitter
```

```typescript
import gwitter from 'gwitter';
import 'gwitter/dist/gwitter.min.css';

gwitter({
  container: document.getElementById('gwitter'),
  config: {
    request: {
      owner: 'your-username',
      repo: 'your-repo',
      // 其他配置都是可选的！
    },
  },
});
```

### UMD 使用

```html
<script src="https://unpkg.com/gwitter/dist/gwitter.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/gwitter/dist/gwitter.min.css" />

<div id="gwitter"></div>

<script>
  window.gwitter({
    config: {
      request: {
        owner: 'your-username',
        repo: 'your-repo',
      },
    },
  });
</script>
```

## 📝 注意事项

1. **公开仓库**：游客模式只能访问公开仓库
2. **Rate Limit**：游客模式受 IP 限制，多个用户共享 60 次/小时配额
3. **交互功能**：点赞、评论需要用户登录（OAuth 模式）
4. **CORS 代理**：OAuth 模式需要配置 CORS 代理服务器

## 🔍 调试

打开浏览器控制台，可以看到当前使用的模式：

```
loadIssues called for repo: username/repository
dataSource: discussion
using token: guest mode (no token)  // 游客模式
```

或

```
using token: user token   // 用户登录
using token: owner token  // Owner Token
```

---

**享受零配置的 Gwitter！** 🎉
