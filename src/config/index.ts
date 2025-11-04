import { GwitterConfig } from '../types/global';

// 测试配置模板
// 将此文件内容复制到 src/config/index.ts 进行测试

interface InternalConfig {
  request: {
    token?: string;
    clientID: string;
    clientSecret: string;
    pageSize: number;
    autoProxy: string;
    owner: string;
    repo: string;
  };
  app: {
    dataSource: 'issue' | 'discussion';
    onlyShowOwner: boolean;
    enableRepoSwitcher: boolean;
    enableAbout: boolean;
    enableEgg: boolean;
  };
}

let config: InternalConfig = {
  request: {
    token: undefined,
    clientID: '56af6ab05592f0a2d399',
    clientSecret: '5d7e71a1b6130001e84956420ca5b88bc45b7d3c',
    pageSize: 10,
    autoProxy:
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token',

    // ✅ 修改为你的 GitHub 仓库
    owner: 'panda8246',
    repo: 'tiny-blog',
  },

  app: {
    // ✅ 选择数据源模式
    dataSource: 'issue', // 使用新实现的 Discussion 模式

    onlyShowOwner: true,
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
