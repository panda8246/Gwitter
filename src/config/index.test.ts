import { GwitterConfig } from '../types/global';

// 测试配置模板
// 将此文件内容复制到 src/config/index.ts 进行测试

let config = {
  request: {
    // 选项A：不配置 token，让用户登录使用个人配额
    token: undefined,

    // 选项B：配置你的 token（从 https://github.com/settings/tokens 生成）
    // token: 'ghp_你的token' as string | undefined,

    // ✅ 修改为你的 GitHub OAuth 配置
    clientID: '你的_Client_ID',
    clientSecret: '你的_Client_Secret',

    pageSize: 6,
    autoProxy:
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token',

    // ✅ 修改为你的 GitHub 仓库
    owner: '你的_GitHub_用户名',
    repo: '你的_仓库名',
  },

  app: {
    // ✅ 选择数据源模式
    dataSource: 'discussion' as 'issue' | 'discussion', // 使用新实现的 Discussion 模式

    onlyShowOwner: false,
    enableRepoSwitcher: false,
    enableAbout: false,
    enableEgg: false,
  },
};

export function setConfig(newConfig: GwitterConfig) {
  if (newConfig.request) {
    config.request = {
      ...config.request,
      ...newConfig.request,
    };
  }

  if (newConfig.app) {
    config.app = {
      ...config.app,
      ...newConfig.app,
    };
  }
}

export default config;
