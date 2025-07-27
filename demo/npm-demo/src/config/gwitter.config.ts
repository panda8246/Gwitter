// Gwitter Configuration

export interface GwitterConfig {
  request: {
    token: string[];
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
  };
}

// Default configuration
export const config: GwitterConfig = {
  request: {
    token: [
      'github_pat_11AHV6EWQ0GdyfOgmwqJ',
      'cP_Chhg9y8gxcQNnOhK5WKsySSkIv3lTRFpLki4v1SKStWLBRSUKU7Ni085ysS',
    ],
    clientID: '56af6ab05592f0a2d399',
    clientSecret: '5d7e71a1b6130001e84956420ca5b88bc45b7d3c',
    pageSize: 6,
    autoProxy:
      'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token',
    owner: 'SimonAKing',
    repo: 'weibo',
  },
  app: {
    onlyShowOwner: true,
    enableAbout: true,
    enableRepoSwitcher: false,
    enableEgg: true,
  },
};
