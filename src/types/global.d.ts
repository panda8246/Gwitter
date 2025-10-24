export interface GwitterConfig {
  request?: {
    token?: string;
    clientID?: string;
    clientSecret?: string;
    pageSize?: number;
    autoProxy?: string;
    owner?: string;
    repo?: string;
  };
  app?: {
    dataSource?: 'issue' | 'discussion'; // 数据源模式：issue 或 discussion
    onlyShowOwner?: boolean;
    enableRepoSwitcher?: boolean;
    enableAbout?: boolean;
    enableEgg?: boolean;
  };
}

export interface GwitterOptions {
  container?: HTMLElement;
  config?: GwitterConfig;
}

declare global {
  interface Window {
    gwitter?: (options?: GwitterOptions) => void;
  }
}
