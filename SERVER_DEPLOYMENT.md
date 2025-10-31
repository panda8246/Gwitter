# Gwitter 云服务器部署指南

## 📋 部署前准备

### 1. 服务器环境要求

- 操作系统：Linux（推荐 Ubuntu/CentOS）
- Web 服务器：Nginx 或 Apache
- 域名（可选，推荐使用）
- SSL 证书（推荐，用于 HTTPS）

### 2. 本地环境要求

- Node.js 16+ 和 npm/pnpm
- Git

## 🚀 部署步骤

### 步骤 1：配置 GitHub OAuth 应用

> ⚠️ **重要**：在构建前必须先配置，因为回调 URL 需要使用服务器域名

1. 访问 [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. 点击 "New OAuth App" 或编辑现有应用
3. 填写应用信息：

   ```
   Application name: Gwitter
   Homepage URL: https://yourdomain.com
   Authorization callback URL: https://yourdomain.com
   ```

   **注意**：如果部署到子路径（如 `/gwitter`），回调 URL 应该是：`https://yourdomain.com/gwitter`

4. 创建后记录下 `Client ID` 和 `Client Secret`

![OAuth 配置示例](./docs/oauth_prod.png)

### 步骤 2：配置 Personal Access Token（可选）

1. 访问 [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. 点击 "Generate new token (classic)"
3. 选择权限：
   - ✅ `repo`（完整仓库访问权限）
   - ✅ `read:user`（读取用户信息）
4. 生成并保存 token

> 💡 **提示**：如果不配置 token，用户必须登录后才能查看内容

### 步骤 3：修改项目配置

#### 3.1 修改 `src/config/index.ts`

```typescript
let config = {
  request: {
    // 可选：你的 GitHub Personal Access Token（分割成两部分提高安全性）
    // 如果不配置，用户需要登录才能查看
    token: undefined, // 或 ['ghp_xxxx', 'xxxx']

    // ✅ 必须修改：你的 GitHub OAuth Client ID
    clientID: '你的_Client_ID',

    // ✅ 必须修改：你的 GitHub OAuth Client Secret
    clientSecret: '你的_Client_Secret',

    // ✅ 必须修改：你的 GitHub 用户名
    owner: '你的_GitHub_用户名',

    // ✅ 必须修改：你的仓库名
    repo: '你的_仓库名',

    pageSize: 6,

    // CORS 代理（用于 OAuth）
    autoProxy:
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token',
  },
  app: {
    // 数据源：'discussion' 或 'issue'
    dataSource: 'discussion',

    // 只显示仓库所有者的内容
    onlyShowOwner: false,

    // 启用仓库切换器
    enableRepoSwitcher: false,

    // 启用关于页面
    enableAbout: false,

    // 启用彩蛋功能
    enableEgg: false,
  },
};

export default config;
```

#### 3.2 修改 `rsbuild.config.mjs`

根据部署位置选择正确的 `assetPrefix`：

```javascript
output: {
  // ✅ 部署到根路径（如 https://yourdomain.com）
  assetPrefix: '/',

  // ❌ 部署到子路径（如 https://yourdomain.com/gwitter）
  // assetPrefix: '/gwitter/',
},
```

> ⚠️ **重要**：如果部署到子路径，必须修改 `assetPrefix`，否则静态资源会加载失败

### 步骤 4：本地构建项目

```bash
# 1. 克隆项目（如果还没有）
git clone https://github.com/SimonAKing/Gwitter.git
cd Gwitter

# 2. 安装依赖
npm install --legacy-peer-deps
# 或使用 pnpm
pnpm install

# 3. 构建项目
npm run build

# 4. 本地预览（可选，测试构建结果）
npm run preview
```

构建完成后，静态文件会生成在 `dist` 目录中。

### 步骤 5：上传到服务器

#### 方法 1：使用 SCP 命令

```bash
# 上传 dist 目录到服务器
scp -r dist/* username@your-server-ip:/var/www/gwitter/
```

#### 方法 2：使用 FTP/SFTP 工具

使用 FileZilla、WinSCP 等工具将 `dist` 目录下的所有文件上传到服务器的网站根目录。

#### 方法 3：使用 Git（推荐）

在服务器上：

```bash
# 克隆项目
cd /var/www/
git clone https://github.com/SimonAKing/Gwitter.git gwitter
cd gwitter

# 安装依赖并构建
npm install --legacy-peer-deps
npm run build

# 构建产物在 dist 目录
```

### 步骤 6：配置 Web 服务器

#### 选项 A：Nginx 配置（推荐）

创建 Nginx 配置文件：`/etc/nginx/sites-available/gwitter`

**部署到根路径：**

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com;  # 修改为你的域名

    # 自动跳转到 HTTPS（如果有 SSL 证书）
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com;  # 修改为你的域名

    # SSL 证书配置（如果有）
    ssl_certificate /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;

    # 网站根目录
    root /var/www/gwitter/dist;
    index index.html;

    # 启用 Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**部署到子路径（如 /gwitter）：**

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # 其他站点配置...

    location /gwitter {
        alias /var/www/gwitter/dist;
        try_files $uri $uri/ /gwitter/index.html;

        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

**启用配置：**

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/gwitter /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

#### 选项 B：Apache 配置

创建 Apache 配置文件：`/etc/apache2/sites-available/gwitter.conf`

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/gwitter/dist

    <Directory /var/www/gwitter/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted

        # 启用 SPA 路由支持
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # 静态资源缓存
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
        Header set Cache-Control "max-age=31536000, public, immutable"
    </FilesMatch>
</VirtualHost>
```

**启用配置：**

```bash
# 启用站点
sudo a2ensite gwitter.conf

# 启用必要的模块
sudo a2enmod rewrite
sudo a2enmod headers

# 重启 Apache
sudo systemctl restart apache2
```

### 步骤 7：配置 SSL 证书（推荐）

使用 Let's Encrypt 免费 SSL 证书：

```bash
# 安装 Certbot（Nginx）
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d yourdomain.com

# 自动续期测试
sudo certbot renew --dry-run
```

### 步骤 8：配置防火墙

```bash
# 开放 HTTP 和 HTTPS 端口
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## ✅ 验证部署

1. **访问网站**：打开浏览器访问 `https://yourdomain.com`
2. **检查资源加载**：打开浏览器开发者工具，确保所有静态资源（JS、CSS）正常加载
3. **测试功能**：
   - ✅ 页面正常显示
   - ✅ 能看到 Issues/Discussions 列表
   - ✅ 点击登录按钮，跳转到 GitHub OAuth
   - ✅ 登录成功后能正常点赞和评论
   - ✅ 标签筛选功能正常
   - ✅ 无限滚动加载更多

## 🔧 常见问题排查

### 1. OAuth 回调错误："redirect_uri_mismatch"

**原因**：GitHub OAuth 应用的回调 URL 与实际访问 URL 不一致

**解决**：

- 确保 GitHub OAuth 应用的 "Authorization callback URL" 与你的域名完全一致
- 包括协议（http/https）、域名、端口（如果有）、子路径（如果有）

### 2. 静态资源 404 错误

**原因**：`assetPrefix` 配置错误

**解决**：

- 根路径部署：使用 `assetPrefix: '/'`
- 子路径部署：使用 `assetPrefix: '/子路径/'`（注意前后都要有斜杠）
- 修改后需要重新构建：`npm run build`

### 3. 无法加载 Issues/Discussions

**原因**：配置错误或仓库不存在

**解决**：

- 检查 `src/config/index.ts` 中的 owner 和 repo 是否正确
- 确保仓库是公开的（或配置了正确的 token）
- 如果使用 Discussion 模式，确保仓库启用了 Discussions 功能

### 4. Rate Limit 错误（403）

**原因**：GitHub API 请求配额不足

**解决**：

- 未配置 token：匿名用户 60次/小时，引导用户登录（5000次/小时）
- 已配置 token：检查 token 是否有效
- 查看 GitHub API 配额：https://api.github.com/rate_limit

### 5. 页面刷新后 404 错误

**原因**：Web 服务器没有配置 SPA 路由回退

**解决**：

- Nginx：确保有 `try_files $uri $uri/ /index.html;`
- Apache：确保启用了 `RewriteRule . /index.html [L]`

## 🔄 更新部署

当需要更新内容或修改配置时：

```bash
# 在服务器上
cd /var/www/gwitter

# 拉取最新代码
git pull

# 修改配置（如果需要）
vim src/config/index.ts

# 重新构建
npm run build

# Nginx 无需重启，Apache 可能需要重启
sudo systemctl restart nginx  # 或 apache2
```

## 📊 性能优化建议

1. **启用 Gzip 压缩**：已在 Nginx 配置中包含
2. **配置静态资源缓存**：已在配置中设置 1 年缓存
3. **使用 CDN**：可以将 dist 目录托管到 CDN（如 Cloudflare、阿里云 OSS）
4. **启用 HTTP/2**：已在 Nginx 配置中包含
5. **图片优化**：压缩 Markdown 中引用的图片

## 🔐 安全建议

1. **使用 HTTPS**：强烈推荐配置 SSL 证书
2. **保护敏感信息**：
   - 不要在前端代码中硬编码 token
   - 使用环境变量或配置文件管理敏感信息
   - 考虑使用后端代理隐藏 clientSecret
3. **定期更新**：保持依赖包和服务器软件最新
4. **备份数据**：虽然数据存储在 GitHub，但建议定期备份配置

## 📞 需要帮助？

- 📖 查看 [项目文档](./README.zh_CN.md)
- 📝 查看 [部署检查清单](./DEPLOYMENT_CHECKLIST.md)
- 🐛 [提交 Issue](https://github.com/SimonAKing/Gwitter/issues)
- 💬 在演示站点留言交流

---

祝部署顺利！🎉
