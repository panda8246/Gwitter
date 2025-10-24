import { format, formatDistance, formatRelative } from 'date-fns';
import { enUS, zhCN } from 'date-fns/locale';

export const parseUrl = (
  search = window.location.search,
): Record<string, string> => {
  if (!search) return {};
  const queryString = search[0] === '?' ? search.substring(1) : search;
  const query: Record<string, string> = {};
  queryString.split('&').forEach((queryStr) => {
    const [key, value] = queryStr.split('=');
    if (key) {
      query[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });

  return query;
};

export const throttle = (func: Function, wait: number, options?: any) => {
  let context: unknown;
  let args: any;
  let result: any;
  let timeout: any;
  let previous = 0;
  if (!options) {
    options = {};
  }
  let later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };
  return function (this: unknown) {
    context = this;
    let now = new Date().getTime();
    if (!previous && options.leading === false) {
      previous = now;
    }
    const remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

export const formatErrorMsg = (error: any): string => {
  if (error.response) {
    const { status, statusText } = error.response;
    return `${status}: ${statusText}`;
  }
  return error.message || 'An unknown error occurred';
};

export interface Label {
  name: string;
  color: string;
}

export interface Reaction {
  content: string;
  user: {
    login: string;
  };
}

export interface RawIssue {
  id: string;
  number: number;
  createdAt: string;
  bodyHTML: string;
  title: string;
  url: string;
  author: {
    login: string;
    avatarUrl: string;
    url: string;
  };
  reactions: {
    totalCount: number;
    nodes: Reaction[];
  };
  comments: {
    totalCount: number;
  };
  labels: {
    nodes: Label[];
  };
}

export interface ProcessedIssue {
  id: string;
  number: number;
  createdAt: string;
  bodyHTML: string;
  title: string;
  url: string;
  author: {
    login: string;
    avatarUrl: string;
    url: string;
  };
  reactions: {
    totalCount: number;
    userReacted: boolean;
    heartCount: number;
  };
  comments: number;
  label: Label;
}

const transformLabel = (labels: Label[]): Label => {
  if (!labels || labels.length === 0) {
    return {
      name: 'default',
      color: '1da1f2',
    };
  }
  return labels[0];
};

export const transformIssues = (
  rawIssues: RawIssue[],
  currentUser?: string,
): ProcessedIssue[] => {
  return rawIssues.map(
    ({
      id,
      number,
      createdAt,
      bodyHTML,
      title,
      url,
      author,
      reactions,
      comments,
      labels,
    }) => {
      const heartReactions = reactions.nodes.filter(
        (reaction) => reaction.content === 'HEART',
      );
      const heartCount = heartReactions.length;
      const userReacted = currentUser
        ? heartReactions.some((reaction) => reaction.user.login === currentUser)
        : false;

      return {
        id,
        number,
        createdAt,
        bodyHTML,
        title,
        url,
        author,
        reactions: {
          totalCount: reactions.totalCount,
          userReacted,
          heartCount,
        },
        comments: comments.totalCount,
        label: transformLabel(labels.nodes),
      };
    },
  );
};

// Transform Discussions data (similar to Issues)
// 只保留 Announcements 类别的讨论，但使用 labels 进行分类和筛选
export const transformDiscussions = (
  rawDiscussions: any[],
  currentUser?: string,
): ProcessedIssue[] => {
  // 过滤出 Announcements 类型的讨论（需求3：数据来源固定为 Announcements）
  const announcements = rawDiscussions.filter(
    (discussion) => discussion.category?.isAnnouncement === true,
  );

  return announcements.map(
    ({
      id,
      number,
      createdAt,
      bodyHTML,
      title,
      url,
      author,
      reactions,
      comments,
      labels,
    }) => {
      const heartReactions = reactions.nodes.filter(
        (reaction: any) => reaction.content === 'HEART',
      );
      const heartCount = heartReactions.length;
      const userReacted = currentUser
        ? heartReactions.some(
            (reaction: any) => reaction.user.login === currentUser,
          )
        : false;

      return {
        id,
        number,
        createdAt,
        bodyHTML,
        title,
        url,
        author,
        reactions: {
          totalCount: reactions.totalCount,
          userReacted,
          heartCount,
        },
        comments: comments.totalCount,
        // 使用 Discussion 自身的 labels（与 Issue 模式一致）
        label: transformLabel(labels.nodes),
      };
    },
  );
};

export const formatDate = (_date: string | Date, language = 'zh') => {
  const date = new Date(_date);
  const now = new Date();
  const locale = ['zh', 'zh-CN'].includes(language) ? zhCN : enUS;
  const formattedDate = formatDistance(date, now, {
    addSuffix: true,
    locale,
  });

  if (locale === zhCN) {
    if (formattedDate.includes('秒') || formattedDate.includes('分钟')) {
      return formattedDate;
    }

    if (formattedDate.includes('小时') || formattedDate.includes('昨天')) {
      return formatRelative(date, now, { locale });
    }

    if (formattedDate.includes('天')) {
      return formattedDate;
    }
  } else {
    if (formattedDate.includes('second') || formattedDate.includes('minute')) {
      return formattedDate;
    }

    if (formattedDate.includes('hour') || formattedDate.includes('yesterday')) {
      return formatRelative(date, now, { locale });
    }

    if (formattedDate.includes('day')) {
      return formattedDate;
    }
  }

  return format(date, 'yyyy-MM-dd', { locale });
};

export const getColorByBgColor = (hexcolor: string) => {
  let r = parseInt(hexcolor.substr(0, 2), 16);
  let g = parseInt(hexcolor.substr(2, 2), 16);
  let b = parseInt(hexcolor.substr(4, 2), 16);
  let yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
};

export const queryStringify = (query: Record<string, string>) => {
  const queryString = Object.keys(query)
    .map((key) => `${key}=${encodeURIComponent(query[key] || '')}`)
    .join('&');
  return queryString;
};

export const windowOpen = (_url: string) => {
  const windowArea: {
    width: number;
    height: number;
    left: number;
    top: number;
  } = {
    width: Math.max(Math.floor(window.outerWidth * 0.4), 400),
    height: Math.max(Math.floor(window.outerHeight * 0.4), 400),
    left: 0,
    top: 0,
  };

  windowArea.left = Math.floor(
    window.screenX + (window.outerWidth - windowArea.width) / 2,
  );
  windowArea.top = Math.floor(
    window.screenY + (window.outerHeight - windowArea.height) / 3,
  );

  const sep = _url.indexOf('?') !== -1 ? '&' : '?';
  const url = `${_url}${sep}`;
  const windowOpts = `toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0,
    width=${windowArea.width},height=${windowArea.height},
    left=${windowArea.left},top=${windowArea.top}`;

  const authWindow = window.open(url, 'Gwitter OAuth Application', windowOpts);
  const eventMethod =
    'addEventListener' in window ? 'addEventListener' : 'attachEvent';
  const eventer = (window as any)[eventMethod];
  const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
  const handleMessage = (
    e: any,
    resolve: any,
    reject: any,
    windowCheckInterval?: NodeJS.Timeout,
  ) => {
    if (authWindow) {
      authWindow.close();
    }
    if (windowCheckInterval) {
      clearInterval(windowCheckInterval);
    }
    if (typeof e.data !== 'string') {
      return;
    }
    const { result, error } = JSON.parse(e.data);

    if (error) {
      reject(error);
    }

    if (!result) {
      reject('Unauthorised');
    }

    const items = result.split('&');
    const accessTokenItem = items.find((item: string) =>
      item.startsWith('access_token='),
    );

    if (!accessTokenItem || !accessTokenItem.includes('=')) {
      reject('Unauthorised');
    }
    const accessToken = accessTokenItem.split('=')[1];

    resolve(accessToken);
  };

  return new Promise((resolve, reject) => {
    const checkWindowClosed = () => {
      if (authWindow && authWindow.closed) {
        clearInterval(windowCheckInterval);
        reject('Window closed by user');
      }
    };

    const windowCheckInterval = setInterval(checkWindowClosed, 500);

    eventer(
      messageEvent,
      (e: any) => handleMessage(e, resolve, reject, windowCheckInterval),
      false,
    );

    if (!authWindow) {
      clearInterval(windowCheckInterval);
      reject('Failed to open authentication window');
    }
  });
};

export const processLinksInHTML = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;

  const links = div.querySelectorAll('a');
  links.forEach((link) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  return div.innerHTML;
};

const G_OWNER = 'owner';
const G_REPO = 'repo';

export const getRepoFromUrl = (): { owner: string; repo: string } | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const owner = urlParams.get(G_OWNER);
  const repo = urlParams.get(G_REPO);

  if (owner && repo) {
    return { owner, repo };
  }

  return null;
};

export const updateUrlParams = (owner: string, repo: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(G_OWNER, owner);
  url.searchParams.set(G_REPO, repo);

  window.history.replaceState(null, '', url.toString());
};
