// Gwitter Configuration

export interface GwitterConfig {
  request: {
    token: string;
    clientID: string;
    clientSecret: string;
    owner: string;
    repo: string;
    pageSize?: number;
    autoProxy?: string;
  };
  app?: {
    onlyShowOwner?: boolean;
    enableRepoSwitcher?: boolean;
    enableAbout?: boolean;
    enableEgg?: boolean;
    dataSource?: 'issue' | 'discussion';
  };
}

// Default configuration
export const config: GwitterConfig = {
  request: {
    // ✅ 游客模式配置：不配置任何认证信息，可访问公开仓库（60次/小时）
    token: '', // 可选：配置 GitHub Personal Access Token 可提升至 5000次/小时
    clientID: '', // 可选：配置 OAuth App 可支持用户登录
    clientSecret: '', // 可选：配合 clientID 使用
    pageSize: 6,
    autoProxy:
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token',
    owner: 'panda8246', // 目标仓库所有者
    repo: 'tiny-blog', // 目标仓库名称
  },
  app: {
    onlyShowOwner: true,
    enableAbout: true,
    enableRepoSwitcher: false,
    enableEgg: true,
    dataSource: 'discussion',
  },
};
