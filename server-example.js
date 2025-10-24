// 简单的 OAuth 代理服务器示例
// 可部署到 Vercel、Cloudflare Workers 等

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// OAuth 代理端点
app.post('/api/github-auth', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET, // 从环境变量读取
        code: code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth server running on port ${PORT}`);
});

// 使用方法：
// 1. npm install express axios cors
// 2. 设置环境变量：
//    GITHUB_CLIENT_ID=xxx
//    GITHUB_CLIENT_SECRET=xxx
// 3. node server-example.js
// 4. 前端配置：autoProxy: 'http://localhost:3001/api/github-auth'
