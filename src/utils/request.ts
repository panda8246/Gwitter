import axios from 'axios';
import config from '../config';

export const createAuthenticatedApi = (token?: string) => {
  const headers: any = {
    Accept: 'application/json',
  };

  // 只有在提供 token 时才添加 Authorization header
  if (token) {
    headers.Authorization = `bearer ${token}`;
  }

  return axios.create({
    baseURL: 'https://api.github.com/',
    headers,
  });
};

// 创建默认 API 实例（使用 owner token，如果有的话）
export const api = config.request.token
  ? createAuthenticatedApi(config.request.token.replaceAll('?', ''))
  : createAuthenticatedApi(); // 无 token 的实例（rate limit: 60次/小时）

interface GetIssuesQLParams {
  owner: string;
  repo: string;
  cursor: string | null;
  pageSize: number;
}

export const getIssuesQL = (vars: GetIssuesQLParams) => {
  const ql = `
  query getIssues($owner: String!, $repo: String!, $cursor: String, $pageSize: Int!) {
    repository(owner: $owner, name: $repo) {
      issues(first: $pageSize, after: $cursor, orderBy: {field: CREATED_AT, direction: DESC}, filterBy: {${config.app.onlyShowOwner ? 'createdBy: $owner,' : ''} states: OPEN}) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          number
          createdAt
          bodyHTML
          title
          url
          author {
            login
            avatarUrl
            url
          }
          reactions(first: 100) {
            totalCount
            nodes {
              content
              user {
                login
              }
            }
          }
          comments(first: 1) {
            totalCount
          }
          labels(first: 1) {
            nodes {
              name
              color
            }
          }
        }
      }
    }
  }
  `;

  if (vars.cursor === null) {
    Reflect.deleteProperty(vars, 'cursor');
  }

  return {
    operationName: 'getIssues',
    query: ql,
    variables: vars,
  };
};

interface GetLabelsParams {
  owner: string;
  repo: string;
}

// Get Discussions with Announcements category filter
interface GetDiscussionsQLParams {
  owner: string;
  repo: string;
  cursor: string | null;
  pageSize: number;
}

export const getDiscussionsQL = (vars: GetDiscussionsQLParams) => {
  const ql = `
  query getDiscussions($owner: String!, $repo: String!, $cursor: String, $pageSize: Int!) {
    repository(owner: $owner, name: $repo) {
      discussions(first: $pageSize, after: $cursor, orderBy: {field: CREATED_AT, direction: DESC}) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          number
          createdAt
          bodyHTML
          title
          url
          author {
            login
            avatarUrl
            url
          }
          reactions(first: 100) {
            totalCount
            nodes {
              content
              user {
                login
              }
            }
          }
          comments(first: 1) {
            totalCount
          }
          category {
            id
            name
            isAnnouncement
          }
          labels(first: 10) {
            nodes {
              name
              color
            }
          }
        }
      }
    }
  }
  `;

  if (vars.cursor === null) {
    Reflect.deleteProperty(vars, 'cursor');
  }

  return {
    operationName: 'getDiscussions',
    query: ql,
    variables: vars,
  };
};

export const getLabelsQL = ({ owner, repo }: GetLabelsParams) => ({
  query: `
    query {
      repository(owner: "${owner}", name: "${repo}") {
        labels(first: 100) {
          nodes {
            name
            color
          }
        }
      }
    }
  `,
});

// Get issue reactions
interface GetIssueReactionsParams {
  owner: string;
  repo: string;
  issueNumber: number;
}

export const getIssueReactionsQL = ({
  owner,
  repo,
  issueNumber,
}: GetIssueReactionsParams) => ({
  query: `
    query {
      repository(owner: "${owner}", name: "${repo}") {
        issue(number: ${issueNumber}) {
          reactions(first: 100) {
            totalCount
            nodes {
              content
              user {
                login
              }
            }
          }
        }
      }
    }
  `,
});

// Add reaction to issue
export const addReactionToIssue = async (
  authenticatedApi: any,
  subjectId: string,
  content: string,
) => {
  const mutation = `
    mutation AddReaction($subjectId: ID!, $content: ReactionContent!) {
      addReaction(input: {subjectId: $subjectId, content: $content}) {
        reaction {
          content
          user {
            login
          }
        }
      }
    }
  `;

  return authenticatedApi.post('/graphql', {
    query: mutation,
    variables: {
      subjectId,
      content,
    },
  });
};

// Remove reaction from issue
export const removeReactionFromIssue = async (
  authenticatedApi: any,
  subjectId: string,
  content: string,
) => {
  const mutation = `
    mutation RemoveReaction($subjectId: ID!, $content: ReactionContent!) {
      removeReaction(input: {subjectId: $subjectId, content: $content}) {
        reaction {
          content
          user {
            login
          }
        }
      }
    }
  `;

  return authenticatedApi.post('/graphql', {
    query: mutation,
    variables: {
      subjectId,
      content,
    },
  });
};

// Get issue comments
interface GetIssueCommentsParams {
  owner: string;
  repo: string;
  issueNumber: number;
}

export const getIssueCommentsQL = ({
  owner,
  repo,
  issueNumber,
}: GetIssueCommentsParams) => ({
  query: `
    query {
      repository(owner: "${owner}", name: "${repo}") {
        issue(number: ${issueNumber}) {
          comments(first: 100, orderBy: {field: UPDATED_AT, direction: ASC}) {
            totalCount
            nodes {
              id
              author {
                login
                avatarUrl
              }
              bodyHTML
              createdAt
              updatedAt
              reactions(first: 100) {
                totalCount
                nodes {
                  content
                  user {
                    login
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
});

// Add comment to issue
export const addCommentToIssue = async (
  authenticatedApi: any,
  subjectId: string,
  body: string,
) => {
  const mutation = `
    mutation AddComment($subjectId: ID!, $body: String!) {
      addComment(input: {subjectId: $subjectId, body: $body}) {
        commentEdge {
          node {
            id
            author {
              login
              avatarUrl
            }
            bodyHTML
            createdAt
            updatedAt
          }
        }
      }
    }
  `;

  return authenticatedApi.post('/graphql', {
    query: mutation,
    variables: {
      subjectId,
      body,
    },
  });
};

export const getUserInfo = async (token: string) => {
  const response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  return response.data;
};

export const getAccessToken = async (code: string) => {
  const response = await axios.post(config.request.autoProxy, {
    client_id: config.request.clientID,
    client_secret: config.request.clientSecret,
    code,
  });
  return response.data;
};

// Update comment
export const updateComment = async (
  authenticatedApi: any,
  commentId: string,
  body: string,
) => {
  const mutation = `
    mutation UpdateIssueComment($commentId: ID!, $body: String!) {
      updateIssueComment(input: {id: $commentId, body: $body}) {
        issueComment {
          id
          author {
            login
            avatarUrl
          }
          bodyHTML
          createdAt
          updatedAt
        }
      }
    }
  `;

  return authenticatedApi.post('/graphql', {
    query: mutation,
    variables: {
      commentId,
      body,
    },
  });
};

// Delete comment
export const deleteComment = async (
  authenticatedApi: any,
  commentId: string,
) => {
  const mutation = `
    mutation DeleteIssueComment($commentId: ID!) {
      deleteIssueComment(input: {id: $commentId}) {
        clientMutationId
      }
    }
  `;

  return authenticatedApi.post('/graphql', {
    query: mutation,
    variables: {
      commentId,
    },
  });
};

// Add reaction to comment
export const addReactionToComment = async (
  authenticatedApi: any,
  subjectId: string,
  content: string,
) => {
  const mutation = `
    mutation AddReaction($subjectId: ID!, $content: ReactionContent!) {
      addReaction(input: {subjectId: $subjectId, content: $content}) {
        reaction {
          content
          user {
            login
          }
        }
      }
    }
  `;

  return authenticatedApi.post('/graphql', {
    query: mutation,
    variables: {
      subjectId,
      content,
    },
  });
};

// Remove reaction from comment
export const removeReactionFromComment = async (
  authenticatedApi: any,
  subjectId: string,
  content: string,
) => {
  const mutation = `
    mutation RemoveReaction($subjectId: ID!, $content: ReactionContent!) {
      removeReaction(input: {subjectId: $subjectId, content: $content}) {
        reaction {
          content
          user {
            login
          }
        }
      }
    }
  `;

  return authenticatedApi.post('/graphql', {
    query: mutation,
    variables: {
      subjectId,
      content,
    },
  });
};
