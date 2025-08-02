(()=>{var e={925:function(e,t,o){"use strict";var i=o(5271),r=o(8751),n=o(2676),a=o(5045),s=o(5956),l=o(5767),d=o(2686);o(3052);var c=o(4767);let p={request:{token:"g?i?t?h?u?b?_?p?a?t?_?1?1?A?H?V?6?E?W?Q?0?M?f?C?S?r?0?4?K?A?j?1?F?_?3?7?n?4?U?y?u?S?m?d?z?i?t?D?s?w?i?s?i?u?a?g?N?b?a?k?V?n?L?I?7?U?W?s?s?h?n?K?p?s?H?S?D?S?4?D?K?O?Q?Q?J?S?S?x?q?z?Z?X?M",clientID:"56af6ab05592f0a2d399",clientSecret:"5d7e71a1b6130001e84956420ca5b88bc45b7d3c",pageSize:6,autoProxy:"https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token",owner:"SimonAKing",repo:"weibo"},app:{onlyShowOwner:!1,enableRepoSwitcher:!0,enableAbout:!1,enableEgg:!1}},u=e=>c.Z.create({baseURL:"https://api.github.com/",headers:{Accept:"application/json",Authorization:`bearer ${e}`}}),h=u(p.request.token.replaceAll("?","")),m=e=>{let t=`
  query getIssues($owner: String!, $repo: String!, $cursor: String, $pageSize: Int!) {
    repository(owner: $owner, name: $repo) {
      issues(first: $pageSize, after: $cursor, orderBy: {field: CREATED_AT, direction: DESC}, filterBy: {${p.app.onlyShowOwner?"createdBy: $owner,":""} states: OPEN}) {
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
  `;return null===e.cursor&&Reflect.deleteProperty(e,"cursor"),{operationName:"getIssues",query:t,variables:e}},g=e=>{let{owner:t,repo:o}=e;return{query:`
    query {
      repository(owner: "${t}", name: "${o}") {
        labels(first: 100) {
          nodes {
            name
            color
          }
        }
      }
    }
  `}},x=async(e,t,o)=>{let i=`
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
  `;return e.post("/graphql",{query:i,variables:{subjectId:t,content:o}})},f=async(e,t,o)=>{let i=`
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
  `;return e.post("/graphql",{query:i,variables:{subjectId:t,content:o}})},b=e=>{let{owner:t,repo:o,issueNumber:i}=e;return{query:`
    query {
      repository(owner: "${t}", name: "${o}") {
        issue(number: ${i}) {
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
  `}},w=async(e,t,o)=>{let i=`
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
  `;return e.post("/graphql",{query:i,variables:{subjectId:t,body:o}})},v=async e=>(await c.Z.get("https://api.github.com/user",{headers:{Authorization:`bearer ${e}`}})).data,y=async e=>(await c.Z.post(p.request.autoProxy,{client_id:p.request.clientID,client_secret:p.request.clientSecret,code:e})).data,j=async(e,t,o)=>{let i=`
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
  `;return e.post("/graphql",{query:i,variables:{commentId:t,body:o}})},k=async(e,t)=>{let o=`
    mutation DeleteIssueComment($commentId: ID!) {
      deleteIssueComment(input: {id: $commentId}) {
        clientMutationId
      }
    }
  `;return e.post("/graphql",{query:o,variables:{commentId:t}})};var $=o(692),S=o(8773),z=o(3115),C=o(6887),Z=o(5986);let E=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.location.search;if(!e)return{};let t="?"===e[0]?e.substring(1):e,o={};return t.split("&").forEach(e=>{let[t,i]=e.split("=");t&&(o[decodeURIComponent(t)]=decodeURIComponent(i))}),o},R=e=>e&&0!==e.length?e[0]:{name:"default",color:"1da1f2"},I=(e,t)=>e.map(e=>{let{id:o,number:i,createdAt:r,bodyHTML:n,title:a,url:s,author:l,reactions:d,comments:c,labels:p}=e,u=d.nodes.filter(e=>"HEART"===e.content),h=u.length,m=!!t&&u.some(e=>e.user.login===t);return{id:o,number:i,createdAt:r,bodyHTML:n,title:a,url:s,author:l,reactions:{totalCount:d.totalCount,userReacted:m,heartCount:h},comments:c.totalCount,label:R(p.nodes)}}),_=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"zh",o=new Date(e),i=new Date,r=["zh","zh-CN"].includes(t)?C.U:Z._,n=(0,$.B)(o,i,{addSuffix:!0,locale:r});if(r===C.U){if(n.includes("秒")||n.includes("分钟"))return n;if(n.includes("小时")||n.includes("昨天"))return(0,S.l)(o,i,{locale:r});if(n.includes("天"))return n}else{if(n.includes("second")||n.includes("minute"))return n;if(n.includes("hour")||n.includes("yesterday"))return(0,S.l)(o,i,{locale:r});if(n.includes("day"))return n}return(0,z.WU)(o,"yyyy-MM-dd",{locale:r})},L=e=>(299*parseInt(e.substr(0,2),16)+587*parseInt(e.substr(2,2),16)+114*parseInt(e.substr(4,2),16))/1e3>=128?"black":"white",A=e=>Object.keys(e).map(t=>`${t}=${encodeURIComponent(e[t]||"")}`).join("&"),M=e=>{let t={width:Math.max(Math.floor(.4*window.outerWidth),400),height:Math.max(Math.floor(.4*window.outerHeight),400),left:0,top:0};t.left=Math.floor(window.screenX+(window.outerWidth-t.width)/2),t.top=Math.floor(window.screenY+(window.outerHeight-t.height)/3);let o=-1!==e.indexOf("?")?"&":"?",i=`${e}${o}`,r=`toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0,
    width=${t.width},height=${t.height},
    left=${t.left},top=${t.top}`,n=window.open(i,"Gwitter OAuth Application",r),a="addEventListener"in window?"addEventListener":"attachEvent",s=window[a],l="attachEvent"===a?"onmessage":"message",d=(e,t,o,i)=>{if(n&&n.close(),i&&clearInterval(i),"string"!=typeof e.data)return;let{result:r,error:a}=JSON.parse(e.data);a&&o(a),r||o("Unauthorised");let s=r.split("&").find(e=>e.startsWith("access_token="));s&&s.includes("=")||o("Unauthorised"),t(s.split("=")[1])};return new Promise((e,t)=>{let o=setInterval(()=>{n&&n.closed&&(clearInterval(o),t("Window closed by user"))},500);s(l,i=>d(i,e,t,o),!1),n||(clearInterval(o),t("Failed to open authentication window"))})},T=e=>{let t=document.createElement("div");return t.innerHTML=e,t.querySelectorAll("a").forEach(e=>{e.setAttribute("target","_blank"),e.setAttribute("rel","noopener noreferrer")}),t.innerHTML},O="owner",P="repo",q=()=>{let e=new URLSearchParams(window.location.search),t=e.get(O),o=e.get(P);return t&&o?{owner:t,repo:o}:null},N=(e,t)=>{let o=new URL(window.location.href);o.searchParams.set(O,e),o.searchParams.set(P,t),window.history.replaceState(null,"",o.toString())},D=a.Z.span`
  display: inline-block;
  line-height: 1;
  padding: 5px 6px;
  font-size: 0.9em;
  font-weight: 600;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 rgba(27, 31, 35, 0.12);
  background-color: #${e=>e.bgColor};
  color: ${e=>L(e.bgColor)};
`,H=e=>{let{name:t,color:o,style:i}=e;return(0,n.jsx)(D,{style:i,bgColor:o,children:t})},F=["dependencies"],V="rgb(167, 167, 167)",G=a.Z.div`
  user-select: none;
  padding: 16px 20px;
  transition: all 0.25s ease;
  border-radius: 10px;
  background: hsla(0, 0%, 100%, 0.6);
  font-size: 1em;
  letter-spacing: 1px;
  border: 0.5px solid #f1f1f1;
  box-shadow: 0 0.1em 0.2em 0 rgba(234, 234, 234, 0.8);
  margin: 6px;
  margin-bottom: 1em;

  ol {
    list-style: decimal !important;
  }

  ul {
    list-style: circle !important;
  }

  code {
    background: rgba(232, 125, 143, 0.1);
    color: #e96384;
  }

  summary {
    cursor: pointer;
    font-size: 1.1em;

    &:focus {
      outline: none;
    }
  }

  summary::-webkit-details-marker {
    display: none;
  }

  a {
    color: #8f63e9;
    box-shadow: inset 0 -3px #cfbcf5;
    font-weight: 700;
    text-decoration: none;
    transition: 0.2s;
  }

  a:hover,
  a:focus {
    box-shadow: inset 0 -1.2em #8f63e9;
    color: #f8f5fe;
  }

  p {
    margin-top: 0;
    margin-bottom: 1em;
  }

  p:last-child {
    margin-bottom: 0;
  }

  .about-title {
    font-size: 1.3em;
    margin-bottom: 0.3em;
    text-align: center;
  }

  abbr {
    font-variant: small-caps;
    text-transform: lowercase;
    font-size: 1.2em;
  }

  [type='checkbox'] {
    opacity: 0;
    position: absolute;
    width: 0;
    height: 0;
  }

  [type='checkbox'] + label {
    background: #efe7fd;
    border-left: 4px solid ${V};
    cursor: pointer;
    display: block;
    font-size: 1em;
    font-weight: 700;
    text-align: left;
    transition: 0.1s;
    padding: 0.75em 1em;
  }

  [type='checkbox'] + label::before {
    border: 2px solid;
    border-radius: 2px;
    color: ${V};
    content: '';
    display: inline-block;
    margin-right: 0.75ch;
    transition: 0.1s;
    width: 1ch;
    height: 1ch;
    vertical-align: baseline;
  }

  [type='checkbox']:focus + label {
    outline: 2px solid ${V};
  }

  [type='checkbox']:checked + label::before {
    background: currentColor;
    box-shadow: inset 0 0 0 2px #fff;
  }

  .container {
    box-shadow: 0.2em 1em 2em -1em #d6d1e0;
    margin: 2.4em 0;
  }

  details {
    border-bottom: 2px solid #d6d1e0;
    list-style: none;
  }

  summary {
    display: block;
    transition: 0.2s;
    padding: 1em;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  summary:focus {
    outline: none;
  }

  summary::after {
    border-right: 2px solid;
    border-bottom: 2px solid;
    content: '';
    float: right;
    width: 0.5em;
    height: 0.5em;
    margin-top: 0.25em;
    transform: rotate(45deg);
    transition: inherit;
  }

  [open] summary {
    background: ${V};
    color: #fff;
    font-size: 1.15em;
  }

  [open] summary::after {
    margin-top: 0.5em;
    transform: rotate(225deg);
  }

  /* Collapse styles */
  &.collapse-init summary + * {
    transition: all 0.25s ease-in-out;
    overflow: hidden;
  }

  &.collapse-init :not(.panel-active) summary + * {
    height: 0;
    opacity: 0;
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
    transform-origin: bottom center;
  }

  &.collapse-init summary {
    list-style: none;
  }

  &.collapse-init summary::-webkit-details-marker {
    display: none;
  }

  &.collapse-init summary::before {
    display: none;
  }

  &.collapse-init summary {
    cursor: pointer;
  }

  .details-styling {
    padding: 1em;
  }
`,U=e=>{let{owner:t,repo:o}=e,[r,a]=(0,i.useState)(null),{t:s}=(0,d.$G)();return(0,i.useEffect)(()=>{new Collapse(document.querySelector(".collapse"),{accordion:!0}).init(),(async()=>{try{var e,i,r,n;let s=await h.post("/graphql",g({owner:t,repo:o})),l=null==s||null==(n=s.data)||null==(r=n.data)||null==(i=r.repository)||null==(e=i.labels)?void 0:e.nodes;if(Array.isArray(l)){let e=l.filter(e=>!F.includes(e.name));a(e)}}catch(e){console.error("Failed to fetch labels:",e)}})()},[t,o]),(0,n.jsxs)(G,{className:"collapse",children:[(0,n.jsx)("div",{className:"about-title",children:s("about.title")}),(0,n.jsxs)("details",{children:[(0,n.jsx)("summary",{children:s("about.gwitter.title")}),(0,n.jsx)("div",{children:(0,n.jsx)("div",{className:"details-styling",children:(0,n.jsx)("p",{children:s("about.gwitter.description")})})})]}),(0,n.jsxs)("details",{children:[(0,n.jsx)("summary",{children:s("about.content.title")}),(0,n.jsx)("div",{children:(0,n.jsxs)("div",{className:"details-styling",children:[(0,n.jsx)("p",{children:s("about.content.categories",{count:(null==r?void 0:r.length)||0})}),(0,n.jsx)("div",{children:null==r?void 0:r.map((e,t)=>(0,n.jsx)(H,{style:{margin:"6px"},name:e.name,color:e.color},t))})]})})]}),(0,n.jsxs)("details",{children:[(0,n.jsx)("summary",{children:s("about.subscription.title")}),(0,n.jsx)("div",{children:(0,n.jsx)("div",{className:"details-styling",children:(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[(0,n.jsx)("code",{children:s("about.subscription.watch")}),"\xa0",(0,n.jsx)("a",{href:"https://github.com/SimonAKing/weibo",target:"_blank",rel:"noopener noreferrer",children:s("about.subscription.repo")})]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("code",{children:s("about.subscription.join")}),"\xa0",(0,n.jsx)("a",{href:"https://thinking.simonaking.com/#ru-kou",target:"_blank",rel:"noopener noreferrer",children:s("about.subscription.wechat")})]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("code",{children:s("about.subscription.join")}),"\xa0",(0,n.jsx)("a",{href:"https://t.me/Simon_AKing",target:"_blank",rel:"noopener noreferrer",children:s("about.subscription.telegram")})]})]})})})]})]})},Y=e=>{let{children:t,id:o}=e;return(0,n.jsx)(s.E.div,{initial:{opacity:0,scaleY:0,height:0},animate:{opacity:1,scaleY:1,height:"auto"},exit:{opacity:0,scaleY:0,height:0},transition:{duration:.4,ease:"easeOut",layout:!0},style:{transformOrigin:"top",overflow:"hidden"},layout:!0,children:t},o)};var B=o(2254);let J=a.Z.div`
  position: relative;
  width: 100%;
  margin-top: 3em;
  @media (orientation: landscape) and (max-height: 500px) {
    margin-top: 0.8em;

    .closing-message {
      padding: 0.8em;
      margin: 0.8em auto;
      transform: rotate(-1deg);
    }

    .code-block {
      max-height: 180px;
    }

    .button-container {
      margin-top: 0.6em;
    }
  }
`,W=a.Z.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`,K=a.Z.div`
  text-align: center;
  padding: clamp(1.2em, 3vw, 2em) clamp(0.8em, 2vw, 1.5em);
  margin: clamp(1.5em, 4vw, 2.5em) auto;
  width: 85%;
  max-width: 600px;
  border-radius: clamp(6px, 1.5vw, 12px);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 2;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transform: rotate(-3deg) perspective(800px);
  transform-style: preserve-3d;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.5) 38%,
      rgba(255, 255, 255, 0.5) 40%,
      rgba(255, 255, 255, 0) 48%
    );
    background-size: 200% 100%;
    background-position: 100% 0;
    opacity: 0;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease,
      background-position 1.5s ease;
    z-index: -1;
  }

  &:hover {
    transform: rotate(0deg) perspective(800px) translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);

    &:before {
      opacity: 1;
      background-position: -100% 0;
    }

    .code-block {
      transform: translateZ(20px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .button-container {
      transform: translateZ(30px);
    }
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 1.2em 0.8em;
    margin: 1.2em auto;
    transform: rotate(-2deg);
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 1em 0.7em;
    margin: 0.8em auto;
    border-radius: 8px;
    transform: rotate(-1deg);
  }
`,Q=a.Z.div`
  background: #282c34;
  color: #abb2bf;
  border-radius: 8px;
  padding: clamp(0.6em, 1.5vw, 1em);
  font-family: monospace;
  font-size: clamp(0.75em, 1vw, 0.9em);
  text-align: left;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  overflow: auto;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 6px;
    font-size: 0.8em;
  }

  @media (max-width: 480px) {
    font-size: 0.75em;
    padding: 0.6em 0.4em;
    border-radius: 4px;
    max-height: 250px;
    white-space: pre-wrap;
    word-break: break-word;
  }
`,X=a.Z.span`
  display: block;
  line-height: 1.4;

  @media (max-width: 480px) {
    line-height: 1.3;
    margin-bottom: 0.2em;
  }
`,ee=a.Z.span`
  color: #c678dd;
`,et=a.Z.span`
  color: #61afef;
`,eo=a.Z.span`
  color: #98c379;
`,ei=a.Z.span`
  color: #7d8799;
`,er=a.Z.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(0.4em, 1.5vw, 0.8em);
  margin-top: clamp(0.8em, 2vw, 1.2em);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @media (max-width: 480px) {
    flex-direction: column;
    width: 90%;
    margin: 0.8em auto 0;
    gap: 0.4em;
  }
`,en=a.Z.button`
  padding: clamp(0.5em, 1.2vw, 0.7em) clamp(1.2em, 2.5vw, 2em);
  font-size: clamp(0.7em, 0.9vw, 0.9em);
  font-weight: 500;
  color: white;
  background-color: #ff5f6d;
  background: linear-gradient(to right, #ff5f6d, #ffc371);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 95, 109, 0.4);
  margin: 0.4em;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 7px 20px rgba(255, 95, 109, 0.5);

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      animation: shine 1.5s ease-in-out;
    }
  }

  @keyframes shine {
    0% {
      left: -100%;
    }

    100% {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(1);
    box-shadow: 0 5px 15px rgba(255, 95, 109, 0.4);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 0.6em 1.5em;
    font-size: 0.85em;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin: 0.2em 0;
    padding: 0.6em 1em;
    border-radius: 30px;
  }
`,ea=()=>{let{t:e}=(0,d.$G)(),t=(0,i.useRef)(null),o=(0,i.useRef)(null),r=()=>{(0,B.E)()};return(0,i.useEffect)(()=>{let e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(r(),e.disconnect())})},{threshold:.5});return t.current&&e.observe(t.current),()=>{t.current&&e.disconnect()}},[]),(0,n.jsxs)(J,{ref:t,children:[(0,n.jsx)(W,{ref:o}),(0,n.jsxs)(K,{children:[(0,n.jsx)(Q,{children:(0,n.jsxs)("code",{children:[(0,n.jsxs)(X,{delay:.1,children:[(0,n.jsx)(ee,{children:"function"}),(0,n.jsx)(et,{children:" sayGoodbye"}),"() ","{"]}),(0,n.jsxs)(X,{delay:.2,children:["\xa0\xa0",(0,n.jsx)(ee,{children:"const"})," message =",(0,n.jsxs)(eo,{children:['"',e("egg.message"),'"']}),";"]}),(0,n.jsxs)(X,{delay:.3,children:["\xa0\xa0",(0,n.jsx)(ee,{children:"const"})," hope =",(0,n.jsxs)(eo,{children:['"',e("egg.hope"),'"']}),";"]}),(0,n.jsxs)(X,{delay:.4,children:["\xa0\xa0",(0,n.jsx)(et,{children:"console.log"}),"(message, hope);"]}),(0,n.jsxs)(X,{delay:.5,children:["\xa0\xa0",(0,n.jsx)(ei,{children:e("egg.comment")})]}),(0,n.jsx)(X,{delay:.6,children:"}"}),(0,n.jsxs)(X,{delay:.7,children:[(0,n.jsx)(et,{children:"sayGoodbye"}),"();"]})]})}),(0,n.jsx)(er,{children:(0,n.jsx)(en,{onClick:r,children:e("egg.runCode")})})]})]})};o(8980);var es=o(769),el=o(4487);let ed=(0,i.createContext)(void 0),ec=()=>{let e=(0,i.useContext)(ed);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e},ep=e=>{let{children:t}=e,[o,r]=(0,i.useState)(!1),[a,s]=(0,i.useState)(null),[l,d]=(0,i.useState)(null),[c,u]=(0,i.useState)(!0);(0,i.useEffect)(()=>{let e=localStorage.getItem("github_token"),t=localStorage.getItem("github_user");e&&t&&(d(e),s(JSON.parse(t)),r(!0)),u(!1)},[]);let h=async e=>{u(!0);try{let t=await v(e),o={login:t.login,avatarUrl:t.avatar_url};d(e),s(o),r(!0),localStorage.setItem("github_token",e),localStorage.setItem("github_user",JSON.stringify(o))}catch(e){console.error("Auth callback error:",e)}finally{u(!1)}};return(0,n.jsx)(ed.Provider,{value:{isAuthenticated:o,user:a,token:l,isLoading:c,login:()=>{let e={client_id:p.request.clientID,redirect_uri:window.location.href,scope:"public_repo"},t=`https://github.com/login/oauth/authorize?${A(e)}`;u(!0),M(t).then(e=>{h(e)}).catch(e=>{console.error("Login error:",e),u(!1)})},logout:()=>{d(null),s(null),r(!1),u(!1),localStorage.removeItem("github_token"),localStorage.removeItem("github_user")}},children:t})};var eu=o(967);let eh=a.Z.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e1e8ed;
  padding: 12px;
  transition:
    max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.2s ease;
  overflow: hidden;
  max-height: ${e=>e.$isExpanded?"500px":"80px"};
  will-change: max-height;
  contain: layout;

  &:focus-within {
    border-color: #1d9bf0;
  }
`,em=a.Z.textarea`
  width: 100%;
  min-height: ${e=>e.$isExpanded?"60px":"40px"};
  padding: 0;
  border: none;
  font-size: 14px;
  line-height: 1.3125;
  resize: vertical;
  background: transparent;
  color: #0f1419;
  transition: min-height 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: min-height;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #536471;
  }
`,eg=a.Z.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e1e8ed;
  opacity: ${e=>+!!e.$isExpanded};
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: ${e=>e.$isExpanded?"auto":"none"};
  will-change: opacity;
`,ex=a.Z.button`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
  border: none;
  min-width: 70px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${e=>"primary"===e.variant?`
    background: #1d9bf0;
    color: white;

    &:hover:not(:disabled) {
      background: #1a8cd8;
    }

    &:disabled {
      background: #8ecdf8;
      cursor: not-allowed;
    }
  `:`
    background: transparent;
    color: #0f1419;
    border: 1px solid #cfd9de;

    &:hover {
      background: #f7f9fa;
      border-color: #8b98a5;
    }
  `}
`,ef=e=>{let{onSubmit:t,onCancel:o,initialValue:r="",placeholder:a,submitText:s,showCancel:l=!1,isExpanded:c=!1}=e,{t:p}=(0,d.$G)(),[u,h]=(0,i.useState)(r),[m,g]=(0,i.useState)(!1),[x,f]=(0,i.useState)(!1),b=(0,i.useRef)(null),w=async()=>{if(u.trim()&&!m){g(!0);try{await t(u.trim()),h("")}catch(e){console.error("Failed to submit comment:",e)}finally{g(!1)}}},v=c||x||u.trim().length>0;return(0,n.jsxs)(eh,{$isExpanded:v,children:[(0,n.jsx)(em,{ref:b,value:u,onChange:e=>h(e.target.value),placeholder:a||p("comments.placeholder"),disabled:m,onFocus:()=>{f(!0)},onBlur:()=>{setTimeout(()=>{u.trim()||f(!1)},150)},$isExpanded:v}),(0,n.jsxs)(eg,{$isExpanded:v,children:[l&&(0,n.jsx)(ex,{variant:"secondary",onClick:()=>{h(r),f(!1),null==o||o()},children:p("comments.cancel")}),(0,n.jsx)(ex,{variant:"primary",onClick:w,disabled:!u.trim()||m,children:m?p(l?"comments.saving":"comments.adding"):s||p("comments.add")})]})]})},eb=a.Z.div`
  max-height: ${e=>e.isVisible?"85vh":"0"};
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-top: ${e=>e.isVisible?"1px solid #e1e8ed":"none"};
  margin-top: ${e=>e.isVisible?"16px":"0"};
  background: white;
  will-change: max-height;
  contain: layout style;

  @media (max-width: 768px) {
    max-height: ${e=>e.isVisible?"75vh":"0"};
  }

  @media (max-width: 479px) {
    max-height: ${e=>e.isVisible?"65vh":"0"};
  }
`,ew=a.Z.div`
  opacity: ${e=>e.isVisible?"1":"0"};
  transform: ${e=>e.isVisible?"translateY(0)":"translateY(-8px)"};
  transition:
    opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)
      ${e=>e.isVisible?"0.1s":"0s"},
    transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)
      ${e=>e.isVisible?"0.1s":"0s"};
  will-change: opacity, transform;
  padding: 16px 0 0;
  contain: layout style;
`,ev=a.Z.div`
  max-height: calc(85vh - 220px);
  overflow-y: auto;
  padding-right: 4px;

  @media (max-width: 768px) {
    max-height: calc(75vh - 200px);
  }

  @media (max-width: 479px) {
    max-height: calc(65vh - 180px);
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d9e0;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #aab8c2;
  }
`,ey=a.Z.div`
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #f7f9fa;
  /* transition: background-color 0.2s ease; */

  &:hover {
    background-color: #f7f9fa;
    .markdown-body {
      background-color: #f7f9fa;
    }
  }

  &:last-child {
    border-bottom: none;
    margin-bottom: 4px;
  }
`,ej=a.Z.img`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  flex-shrink: 0;

  @media (max-width: 479px) {
    width: 1.5em;
    height: 1.5em;
  }
`,ek=a.Z.div`
  flex: 1;
  min-width: 0;
  position: relative;
`,e$=a.Z.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
`,eS=a.Z.a`
  font-weight: 700;
  color: #132850;
  font-size: 15px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`,ez=a.Z.span`
  color: #a1a1a1;
  text-shadow:
    #d9d9d9 0 0 1px,
    #fffffb 0 0 1px,
    #fffffb 0 0 2px;
  font-size: 0.9em;

  &::before {
    content: '·';
    margin: 0 4px;
  }
`,eC=a.Z.div`
  color: #333;
  /* line-height: 1.3125; */
  word-wrap: break-word;
  margin-bottom: 12px;
  font-size: 1em;
  letter-spacing: 0.2px;

  &.markdown-body {
    font-size: 1em;
  }
`,eZ=a.Z.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
`,eE=a.Z.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  height: 28px;
  min-width: 28px;

  ${e=>"edit"===e.variant?`
    color: #1d9bf0;
    &:hover {
      background: rgba(29, 155, 240, 0.1);
    }
  `:"delete"===e.variant?`
    color: #f4212e;
    &:hover {
      background: rgba(244, 33, 46, 0.1);
    }
  `:`
    color: #536471;
    &:hover {
      background: #f7f9fa;
    }
  `}

  svg {
    width: 14px;
    height: 14px;
  }
`,eR=(0,a.Z)(ey)`
  &:hover {
    background-color: #f7f9fa;
    .markdown-body {
      background-color: #f7f9fa;
    }

    .comment-actions {
      opacity: 1;
    }
  }
`,eI=a.Z.div`
  text-align: center;
  color: #657786;
  padding: 32px 20px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &::before {
    content: '';
    width: 16px;
    height: 16px;
    border: 2px solid #e1e8ed;
    border-top: 2px solid #1d9bf0;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`,e_=a.Z.div`
  padding: 0 16px;
  padding-bottom: ${e=>e.isVisible?"16px":"0"};
  max-height: ${e=>e.isVisible?"200px":"0"};
  overflow: hidden;
  transition: max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: max-height;
  contain: layout;
`;a.Z.span`
  color: #536471;
  font-size: 13px;
  font-weight: 400;
  margin-left: 4px;
`;let eL=a.Z.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: ${e=>e.isOpen?"1":"0"};
  visibility: ${e=>e.isOpen?"visible":"hidden"};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(4px);
`,eA=a.Z.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 360px;
  width: 90%;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: ${e=>e.isOpen?"scale(1) translateY(0)":"scale(0.95) translateY(-8px)"};
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
`,eM=a.Z.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  color: #0f1419;
  line-height: 1.3;
`,eT=a.Z.p`
  margin: 0 0 20px 0;
  font-size: 15px;
  color: #536471;
  line-height: 1.4;
`,eO=a.Z.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,eP=a.Z.button`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  min-width: 70px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${e=>"danger"===e.variant?`
    background: #f4212e;
    color: white;

    &:hover:not(:disabled) {
      background: #dc1c2a;
    }

    &:disabled {
      background: #f7a1a8;
      cursor: not-allowed;
    }
  `:`
    background: transparent;
    color: #0f1419;
    border: 1px solid #cfd9de;

    &:hover {
      background: #f7f9fa;
      border-color: #8b98a5;
    }
  `}
`,eq=e=>{let{issueNumber:t,issueId:o,isVisible:r,commentCount:a,onCommentCountChange:s,repoOwner:l=p.request.owner,repoName:c=p.request.repo}=e,{t:m,i18n:g}=(0,d.$G)(),{isAuthenticated:x,user:f,token:v}=ec(),[y,$]=(0,i.useState)([]),[S,z]=(0,i.useState)(!1),[C,Z]=(0,i.useState)(!1),[E,R]=(0,i.useState)(null),[I,L]=(0,i.useState)(null),[A,M]=(0,i.useState)(!1);(0,i.useEffect)(()=>{$([]),Z(!1),R(null),L(null),M(!1)},[l,c,t]),(0,i.useEffect)(()=>{r&&!C&&O()},[r,C,l,c]),(0,i.useEffect)(()=>{if(I){let e=()=>{L(null)};return window.addEventListener("scroll",e,{passive:!0}),document.addEventListener("scroll",e,{passive:!0}),()=>{window.removeEventListener("scroll",e),document.removeEventListener("scroll",e)}}},[I]);let O=async()=>{z(!0);try{let e=(await h.post("/graphql",b({owner:l,repo:c,issueNumber:t}))).data.data.repository.issue.comments.nodes;$(e),Z(!0)}catch(e){console.error("Failed to load comments:",e)}finally{z(!1)}},P=async e=>{if(!x||!v)throw Error(m("interaction.loginRequired"));try{let t=u(v),i=(await w(t,o,e)).data.data.addComment.commentEdge.node;$(e=>{let t=[...e,i];return null==s||s(t.length),t})}catch(e){throw console.error("Failed to add comment:",e),Error(m("comments.addFailed"))}},q=async(e,t)=>{if(!x||!v)throw Error(m("interaction.loginRequired"));try{let o=u(v),i=(await j(o,e,t)).data.data.updateIssueComment.issueComment;$(t=>t.map(t=>t.id===e?i:t)),R(null)}catch(e){throw console.error("Failed to update comment:",e),Error(m("comments.updateFailed"))}},N=async e=>{if(x&&v){M(!0);try{let t=u(v);await k(t,e),$(t=>{let o=t.filter(t=>t.id!==e);return null==s||s(o.length),o}),L(null)}catch(e){console.error("Failed to delete comment:",e)}finally{M(!1)}}},D=e=>{L(e)},H=()=>{L(null)},F=e=>x&&f&&e.author.login===f.login,V=e=>{let t=document.createElement("div");return t.innerHTML=e,t.textContent||t.innerText||""};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(eb,{isVisible:r,children:(0,n.jsxs)(ew,{isVisible:r,children:[(0,n.jsx)(e_,{isVisible:r,children:(0,n.jsx)(ef,{onSubmit:P,placeholder:m("comments.placeholder"),submitText:m("comments.add")})}),S&&a>0&&(0,n.jsx)(eI,{children:m("comments.loading")}),!S&&y.length>0&&(0,n.jsx)(ev,{children:y.map(e=>(0,n.jsxs)(eR,{children:[(0,n.jsx)(ej,{src:e.author.avatarUrl,alt:e.author.login}),(0,n.jsxs)(ek,{children:[(0,n.jsxs)(e$,{children:[(0,n.jsx)(eS,{href:`https://github.com/${e.author.login}`,target:"_blank",rel:"noopener noreferrer",children:e.author.login}),(0,n.jsx)(ez,{children:_(e.createdAt,g.language)})]}),E===e.id?(0,n.jsx)(ef,{onSubmit:t=>q(e.id,t),onCancel:()=>R(null),initialValue:V(e.bodyHTML),submitText:m("comments.save"),showCancel:!0}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(eC,{className:"markdown-body",dangerouslySetInnerHTML:{__html:T(e.bodyHTML)}}),F(e)&&(0,n.jsxs)(eZ,{className:"comment-actions",children:[(0,n.jsx)(eE,{variant:"edit",onClick:()=>R(e.id),title:m("comments.edit"),children:(0,n.jsx)("svg",{viewBox:"0 0 24 24",fill:"currentColor",children:(0,n.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})})}),(0,n.jsx)(eE,{variant:"delete",onClick:()=>D(e.id),title:m("comments.delete"),children:(0,n.jsx)("svg",{viewBox:"0 0 24 24",fill:"currentColor",children:(0,n.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})})})]})]})]})]},e.id))})]})}),I&&(0,eu.createPortal)((0,n.jsx)(eL,{isOpen:!!I,onClick:H,children:(0,n.jsxs)(eA,{isOpen:!!I,onClick:e=>e.stopPropagation(),children:[(0,n.jsx)(eM,{children:m("comments.confirmDeleteTitle")}),(0,n.jsx)(eT,{children:m("comments.confirmDeleteMessage")}),(0,n.jsxs)(eO,{children:[(0,n.jsx)(eP,{variant:"cancel",onClick:H,children:m("comments.cancel")}),(0,n.jsx)(eP,{variant:"danger",onClick:()=>I&&N(I),disabled:A,children:A?m("comments.deleting"):m("comments.delete")})]})]})}),document.body)]})},eN="#536471",eD="#f91880",eH="#1d9bf0",eF="rgba(249, 24, 128, 0.1)",eV="rgba(29, 161, 242, 0.1)",eG=(0,es.F4)`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
`,eU=(0,es.F4)`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--particle-x), var(--particle-y)) scale(0) rotate(var(--particle-rotation));
    opacity: 0;
  }
`,eY=a.Z.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${e=>e.size};
  height: ${e=>e.size};
  background-color: ${e=>"circle"===e.shape?e.color:"transparent"};
  border-radius: ${e=>"circle"===e.shape?"50%":"0"};
  pointer-events: none;
  opacity: 0;
  transform-origin: center;
  transform: translate(-50%, -50%) scale(${e=>e.initialScale})
    rotate(${e=>e.initialRotation});
  animation: ${eU} ${e=>e.duration} ease-out forwards;
  animation-delay: ${e=>e.delay};
  --particle-x: ${e=>e.x};
  --particle-y: ${e=>e.y};
  --particle-rotation: ${e=>180*Math.random()-90}deg;

  ${e=>"heart"===e.shape&&`
    &::before,
    &::after {
      content: '';
      position: absolute;
      left: calc(${e.size} / 2);
      top: 0;
      width: calc(${e.size} / 2);
      height: ${e.size};
      background: ${e.color};
      border-radius: calc(${e.size} / 2) calc(${e.size} / 2) 0 0;
      transform: rotate(-45deg);
      transform-origin: 0 100%;
    }
    &::after {
      left: 0;
      transform: rotate(45deg);
      transform-origin: 100% 100%;
    }
  `}
`,eB=a.Z.div`
  display: flex;
  flex-direction: column;
  /* margin-top: 10px; */
`,eJ=a.Z.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  margin-left: -8px;
`,eW=a.Z.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  overflow: hidden;
  transition:
    color 0.2s,
    opacity 0.2s,
    transform 0.2s;
  opacity: ${e=>+!!e.$isVisible};
  transform: ${e=>e.$isVisible?"scale(1)":"scale(0.8)"};
  pointer-events: ${e=>e.$isVisible?"auto":"none"};
`,eK=a.Z.button`
  display: flex;
  align-items: center;
  color: ${eN};
  background: none;
  border: none;
  padding: 8px 0px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  font-weight: 400;
  border-radius: 20px;
  min-width: 0;
  position: relative;
  width: 50px;

  span {
    font-size: 13px;
    transition: color 0.2s;
    min-width: 0;
    position: relative;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0);
    border: 0 solid black;
    box-sizing: border-box;
    display: inline;
    font: inherit;
    list-style: none;
    margin: 0px;
    padding: 0px;
    position: relative;
    text-align: inherit;
    text-decoration: none;
    white-space: inherit;
    word-wrap: break-word;
  }

  &.liked {
    .icon-container svg {
      color: ${eD};
      fill: ${eD};
    }

    .number-container {
      color: ${eD};
    }

    .icon-container:hover {
      svg {
        color: ${eD};
        fill: ${eD};
      }

      &::before {
        background: ${eF};
      }
    }
  }

  &:hover.like-button .number-container {
    color: ${eD};
  }

  &:hover.comment-button .number-container {
    color: ${eH};
  }

  &.comment-active .number-container {
    color: ${eH};
  }
`,eQ=a.Z.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    transition:
      color 0.2s,
      opacity 0.2s;
    position: relative;
    z-index: 1;
    fill: ${eN};
  }

  &.liked-animation svg {
    animation: ${eG} 0.3s ease-in-out;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: transparent;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease;
    z-index: 0;
  }

  &.like-icon:hover {
    svg {
      color: ${eD};
      fill: ${eD};
    }

    &::before {
      width: 36px;
      height: 36px;
      background: ${eF};
    }
  }

  &.comment-icon:hover {
    svg {
      color: ${eH};
      fill: ${eH};
    }

    &::before {
      width: 36px;
      height: 36px;
      background: ${eV};
    }
  }

  &.comment-active {
    svg {
      color: ${eH};
      fill: ${eH};
    }

    &::before {
      width: 36px;
      height: 36px;
      background: ${eV};
    }
  }
`,eX=(0,i.forwardRef)((e,t)=>{let{filled:o=!1}=e;return(0,n.jsx)("svg",{viewBox:"0 0 24 24",ref:t,children:(0,n.jsx)("g",{children:o?(0,n.jsx)("path",{d:"M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"}):(0,n.jsx)("path",{d:"M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"})})})}),e0=()=>(0,n.jsx)("svg",{viewBox:"0 0 24 24",children:(0,n.jsx)("g",{children:(0,n.jsx)("path",{d:"M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"})})}),e1=()=>{let e=360*Math.random(),t=25*Math.random()+25,o=`${Math.cos(Math.PI/180*e)*t}px`,i=[eD,"#ff78c8","#ff4da6","#e60073","#cc0066"],r=Math.random()>.3?"circle":"heart",n=Math.floor(Math.random()*("heart"===r?3:4))+("heart"===r?5:4);return{x:o,y:`${Math.sin(Math.PI/180*e)*t-15}px`,duration:`${.4*Math.random()+.5}s`,delay:`${.15*Math.random()}s`,color:i[Math.floor(Math.random()*i.length)],size:`${n}px`,shape:r,initialScale:.5*Math.random()+.7,initialRotation:`${90*Math.random()-45}deg`}},e2=e=>{let{id:t,issueId:o,reactions:r,comments:a,repoOwner:s,repoName:l}=e,{t:c}=(0,d.$G)(),{isAuthenticated:p,token:h,login:m}=ec(),[g,b]=(0,i.useState)(r.heartCount),[w,v]=(0,i.useState)(r.userReacted),[y,j]=(0,i.useState)(a.totalCount),[k,$]=(0,i.useState)(!1),[S,z]=(0,i.useState)(!1),[C,Z]=(0,i.useState)(!1),[E,R]=(0,i.useState)([]),I=async()=>{try{console.log("Toggle like for issue:",t,w,h);let e=u(h);if(w)v(!1),b(g-1),await f(e,o,"HEART");else{v(!0),b(g+1),Z(!0);let t=Array.from({length:Math.floor(6*Math.random())+10}).map((e,t)=>({id:Date.now()+t,style:e1()}));R(t),await x(e,o,"HEART")}}catch(e){console.error("Failed to toggle like:",e),v(w),b(g)}};return(0,i.useEffect)(()=>{v(r.userReacted),b(r.heartCount)},[r.userReacted,r.heartCount]),(0,i.useEffect)(()=>{j(a.totalCount)},[a.totalCount]),(0,i.useEffect)(()=>{if(C){let e=setTimeout(()=>{Z(!1)},300),t=setTimeout(()=>{R([])},1200);return()=>{clearTimeout(e),clearTimeout(t)}}},[C]),(0,n.jsxs)(eB,{children:[(0,n.jsxs)(eJ,{children:[(0,n.jsxs)(eK,{onClick:()=>{if(!p)return void m();S||(z(!0),I(),z(!1))},className:`like-button ${w?"liked":""}`,title:c(p?w?"interaction.liked":"interaction.like":"interaction.loginToLike"),children:[(0,n.jsxs)(eQ,{className:`icon-container like-icon ${C?"liked-animation":""}`,children:[(0,n.jsx)(eX,{filled:w}),E.map(e=>(0,n.jsx)(eY,{x:e.style.x,y:e.style.y,duration:e.style.duration,delay:e.style.delay,color:e.style.color,size:e.style.size,shape:e.style.shape,initialScale:e.style.initialScale,initialRotation:e.style.initialRotation},e.id))]}),(0,n.jsx)(eW,{className:"number-container",$isVisible:g>0,children:(0,n.jsx)(el.ZP,{transformTiming:{duration:150,easing:"ease-in-out"},spinTiming:{duration:150,easing:"ease-in-out"},opacityTiming:{duration:150,easing:"ease-in-out"},value:g})})]}),(0,n.jsxs)(eK,{onClick:()=>{if(!p)return void m();$(!k)},className:`comment-button ${k?"comment-active":""}`,title:c(p?"interaction.comment":"interaction.loginToComment"),children:[(0,n.jsx)(eQ,{className:`icon-container comment-icon ${k?"comment-active":""}`,children:(0,n.jsx)(e0,{})}),(0,n.jsx)(eW,{className:"number-container",$isVisible:y>0,children:(0,n.jsx)(el.ZP,{transformTiming:{duration:150,easing:"ease-in-out"},spinTiming:{duration:150,easing:"ease-in-out"},opacityTiming:{duration:150,easing:"ease-in-out"},value:y})})]})]}),(0,n.jsx)(eq,{issueNumber:t,issueId:o,isVisible:k,commentCount:y,onCommentCountChange:j,repoOwner:s,repoName:l})]})},e5=a.Z.div`
  position: relative;
  margin: 0.5em 0;
  display: flex;
  border-radius: 10px;
`,e4=a.Z.div`
  flex: 1 1;
  padding: 16px 20px 0px;
  margin: 6px;
  overflow: auto;
  background: hsla(0, 0%, 100%, 0.8);
  border: 0.5px solid #f1f1f1;
  border-radius: 10px;
  box-shadow: 0 0.1em 0.2em 0 rgba(234, 234, 234, 0.8);
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-size: 15px;
  z-index: 2;

  /* border: 1px solid rgb(212, 212, 216); */
  /* box-shadow:
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.15) 2px 0px 8px 0px; */

  /* &:hover { */
  /* box-shadow: 0 0.2em 0.3em 0.1em rgba(200, 200, 200, 0.4); */
  /* transform: translateY(-1px); */
  /* } */
`,e8=a.Z.div`
  margin-bottom: 0.7em;
  font-size: 1em;
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  /* gap: 0.2em; */
`,e6=a.Z.div`
  color: #333;
  &.markdown-body {
    font-size: 1em;
    letter-spacing: 0.2px;
    word-wrap: break-word;
    background-color: transparent;
    /* background: hsla(0, 0%, 100%, 0.8); */
    ol {
      list-style: decimal !important;
    }
    ul {
      list-style: circle !important;
    }
  }
`,e3=a.Z.div`
  position: relative;
  margin-top: 0.8em;
  font-size: 1em;
  user-select: none;
`;var e7=o(2017),e9=o(9928);let te=e=>{let{className:t,size:o=720,springOptions:r={bounce:0}}=e,a=(0,i.useRef)(null),[l,d]=(0,i.useState)(!1),[c,p]=(0,i.useState)(null),u=(0,e7.q)(0,r),h=(0,e7.q)(0,r),m=(0,e9.H)(u,e=>`${e-o/2}px`),g=(0,e9.H)(h,e=>`${e-o/2}px`);(0,i.useEffect)(()=>{if(a.current){let e=a.current.parentElement;e&&("static"===window.getComputedStyle(e).position&&(e.style.position="relative"),e.style.overflow="hidden",p(e))}},[]);let x=(0,i.useCallback)(e=>{if(!c)return;let{left:t,top:o}=c.getBoundingClientRect();u.set(e.clientX-t),h.set(e.clientY-o)},[u,h,c]);(0,i.useEffect)(()=>{if(c)return c.addEventListener("mousemove",x),c.addEventListener("mouseenter",()=>d(!0)),c.addEventListener("mouseleave",()=>d(!1)),()=>{c.removeEventListener("mousemove",x);try{c.removeEventListener("mouseenter",()=>d(!0)),c.removeEventListener("mouseleave",()=>d(!1))}catch(e){console.warn("Could not remove event listeners from parentElement",e)}}},[c,x]);let f={width:o,height:o,left:m.get(),top:g.get(),position:"absolute",pointerEvents:"none",borderRadius:"9999px",backgroundImage:"radial-gradient(circle at center, rgba(255, 255, 255, 0.95), rgba(244, 244, 245, 0.8), rgba(228, 228, 231, 0.4), rgba(200, 200, 200, 0.1), transparent 70%)",filter:"blur(0.5em)",opacity:.9*!!l,transition:"opacity 0.15s ease-in-out"};return(0,n.jsx)(s.E.div,{ref:a,className:t,style:{...f,left:m,top:g}})},tt=a.Z.span`
  font-weight: 700;
  font-size: 15px;
  color: #132850;
  text-decoration: none;
  cursor: pointer;
`,to=a.Z.span`
  margin-left: 0.2em;
  display: inline-flex;
  align-items: center;
`,ti=a.Z.svg`
  width: 20px;
  height: 20px;
  color: rgb(29, 155, 240);
  fill: rgb(29, 155, 240);
`,tr=a.Z.span`
  margin: 0 4px;
  font-weight: 600;
  color: #a1a1a1;
  text-shadow:
    #d9d9d9 0 0 1px,
    #fffffb 0 0 1px,
    #fffffb 0 0 2px;
  font-size: 0.9em;

  @media (max-width: 479px) {
    margin: auto 0.2em;
  }
`,tn=a.Z.span`
  color: #a1a1a1;
  text-shadow:
    #d9d9d9 0 0 1px,
    #fffffb 0 0 1px,
    #fffffb 0 0 2px;
  font-size: 0.9em;
`,ta=a.Z.img`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  margin-right: 0.5em;
  cursor: pointer;
  @media (max-width: 479px) {
    width: 1.5em;
    height: 1.5em;
    margin-right: 0.3em;
  }
`,ts=a.Z.a`
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  color: #a1a1a1;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #132850;
  }

  @media (max-width: 479px) {
    margin-left: 4px;
  }
`,tl=a.Z.svg`
  width: 16px;
  height: 16px;
  fill: currentColor;
`,td=a.Z.div`
  margin: 0.5em 0 0.5em 0;
  font-size: 0.9em;
  font-weight: 500;
  line-height: 1.3;
  color: #6b7280;
  word-wrap: break-word;
  word-break: break-word;
  background: #f8fafc;
  padding: 0.4em 0.6em;
  border-radius: 4px;
  border-left: 3px solid #e5e7eb;

  @media (max-width: 479px) {
    font-size: 0.85em;
    margin: 0.4em 0 0.2em 0;
    padding: 0.3em 0.5em;
  }
`,tc=e=>{let{issue:t,repoOwner:o,repoName:i}=e,{i18n:r}=(0,d.$G)(),a=e=>{window.open(e,"_blank")};return(0,n.jsxs)(e5,{children:[(0,n.jsx)(te,{}),(0,n.jsxs)(e4,{children:[(0,n.jsxs)(e8,{children:[(0,n.jsx)(ta,{src:t.author.avatarUrl,onClick:()=>a(t.author.url)}),(0,n.jsx)(tt,{onClick:()=>a(t.author.url),children:t.author.login}),(0,n.jsx)(to,{children:(0,n.jsx)(ti,{viewBox:"0 0 22 22",children:(0,n.jsx)("path",{d:"M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"})})}),(0,n.jsx)(tr,{children:"\xb7"}),(0,n.jsx)(tn,{children:_(t.createdAt,r.language)}),(0,n.jsx)(ts,{href:t.url,target:"_blank",rel:"noopener noreferrer",title:"在 GitHub 中查看",children:(0,n.jsx)(tl,{viewBox:"0 0 16 16",children:(0,n.jsx)("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"})})}),"default"!==t.label.name&&(0,n.jsx)(H,{name:t.label.name,color:t.label.color,style:{position:"absolute",right:0}})]}),(0,n.jsx)(td,{children:t.title}),(0,n.jsx)(e6,{className:"markdown-body",dangerouslySetInnerHTML:{__html:T(t.bodyHTML)}}),(0,n.jsx)(e2,{id:t.number,issueId:t.id,reactions:t.reactions,comments:{totalCount:t.comments},repoOwner:o,repoName:i})]})]})},tp=a.Z.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: skeleton-loading 3s infinite;
  border-radius: 4px;
  margin-bottom: 8px;

  @keyframes skeleton-loading {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
`,tu=(0,a.Z)(tp)`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  margin-right: 0.5em;
  margin-bottom: 0;
  display: inline-flex;
  align-self: center;
`,th=(0,a.Z)(tp)`
  width: 120px;
  height: 20px;
  display: inline-flex;
  align-self: center;
  margin-bottom: 0;
`,tm=(0,a.Z)(tp)`
  width: 80px;
  height: 16px;
  display: inline-flex;
  align-self: center;
  margin-bottom: 0;
  margin-left: 20px;
`,tg=(0,a.Z)(tp)`
  width: 60px;
  height: 24px;
  position: absolute;
  right: 0;
  top: 0;
`,tx=(0,a.Z)(tp)`
  height: 16px;
  margin-top: 12px;
  width: ${e=>e.width};
`,tf=(0,a.Z)(tp)`
  width: 100px;
  height: 20px;
  margin: 16px 0px;
`,tb=a.Z.div`
  position: relative;
  margin-bottom: 0.5em;
  display: flex;
  border-radius: 10px;
`,tw=()=>(0,n.jsx)(tb,{children:(0,n.jsxs)(e4,{children:[(0,n.jsxs)(e8,{children:[(0,n.jsx)(tu,{}),(0,n.jsx)(th,{}),(0,n.jsx)(tm,{}),(0,n.jsx)(tg,{})]}),(0,n.jsxs)(e6,{children:[(0,n.jsx)(tx,{width:"95%"}),(0,n.jsx)(tx,{width:"85%"}),(0,n.jsx)(tx,{width:"75%"}),(0,n.jsx)(tx,{width:"65%"})]}),(0,n.jsx)(e3,{children:(0,n.jsx)(tf,{})})]})}),tv=a.Z.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ty=a.Z.button`
  background: ${e=>e.isActive?"#1da1f2":"transparent"};
  color: ${e=>e.isActive?"white":"#657786"};
  border: 1px solid ${e=>e.isActive?"#1da1f2":"#e1e8ed"};
  padding: 4px 8px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;
  min-width: 32px;

  &:hover {
    background: ${e=>e.isActive?"#1991db":"#f7f9fa"};
    border-color: ${e=>e.isActive?"#1991db":"#d1d9e0"};
  }

  &:active {
    transform: scale(0.95);
  }
`,tj=()=>{let{i18n:e}=(0,d.$G)(),t=t=>{e.changeLanguage(t)};return(0,n.jsxs)(tv,{children:[(0,n.jsx)(ty,{isActive:"zh"===e.language||"zh-CN"===e.language,onClick:()=>t("zh"),children:"中"}),(0,n.jsx)(ty,{isActive:"en"===e.language,onClick:()=>t("en"),children:"EN"})]})},tk=a.Z.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: hsla(0, 0%, 100%, 0.8);

  border-radius: 10px;
  border: 1px solid #e1e8ed;
  margin-bottom: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0.1em 0.2em 0 rgba(234, 234, 234, 0.8);
  border: 0.5px solid #f1f1f1;
  margin: 6px;
  margin-bottom: 1em;

  ${p.app.enableRepoSwitcher&&`
    @media (max-width: 600px) {
      flex-direction: column;
      gap: 8px;
      align-items: stretch;
    }
  `}
`,t$=a.Z.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,tS=a.Z.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,tz=a.Z.input`
  padding: 6px 10px;
  border: 1px solid #e1e8ed;
  border-radius: 16px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: #14171a;
  width: 180px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #1da1f2;
    box-shadow: 0 0 0 2px rgba(29, 161, 242, 0.1);
  }

  &::placeholder {
    color: #657786;
  }

  @media (max-width: 768px) {
    width: 140px;
    font-size: 12px;
  }
`,tC=a.Z.span`
  font-size: 12px;
  color: #657786;
  font-weight: 500;
`,tZ=a.Z.button`
  background: #1da1f2;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #1991db;
  }

  &:disabled {
    cursor: not-allowed;
  }
`,tE=a.Z.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,tR=a.Z.button`
  background: #1da1f2;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #1991db;
  }
`,tI=(0,a.Z)(tR)`
  background: transparent;
  color: #657786;
  border: none;
  padding: 0;
  font-size: 12px;
  font-weight: 400;
  opacity: 0.8;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: #657786;
    background: transparent;
    opacity: 1;
  }
`,t_=a.Z.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  font-size: 12px;
`,tL=a.Z.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`,tA=a.Z.span`
  font-size: 12px;
  font-weight: 500;
  color: #14171a;
`,tM=a.Z.div`
  width: 16px;
  height: 16px;
  border: 2px solid #e1e8ed;
  border-top: 2px solid #1da1f2;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`,tT=a.Z.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  font-size: 12px;
  color: #657786;
`,tO=e=>{let{onRepoChange:t,currentRepo:o,isLoading:r=!1,error:a}=e,{t:s}=(0,d.$G)(),{isAuthenticated:l,user:c,login:u,logout:h,isLoading:m}=ec(),g=`${p.request.owner}/${p.request.repo}`,[x,f]=(0,i.useState)(o?`${o.owner}/${o.repo}`:g),[b,w]=(0,i.useState)(""),v=e=>{if(!e.trim())return!1;let t=e.split("/");return 2===t.length&&t[0].trim()&&t[1].trim()},y=()=>{if(w(""),!v(x))return void w(s("toolbar.invalidRepo"));let[e,o]=x.split("/");t&&t(e.trim(),o.trim())};return(0,i.useEffect)(()=>{let e=o?`${o.owner}/${o.repo}`:g;e!==x&&(f(e),w(""))},[o,g]),(0,n.jsxs)(tk,{children:[(0,n.jsxs)(t$,{children:[(0,n.jsx)(tj,{}),p.app.enableRepoSwitcher&&(0,n.jsxs)(tS,{children:[(0,n.jsx)(tC,{children:s("toolbar.repo")}),(0,n.jsx)(tz,{value:x,onChange:e=>{f(e.target.value),b&&w("")},onKeyPress:e=>{"Enter"===e.key&&v(x)&&y()},placeholder:s("toolbar.repoPlaceholder"),disabled:!p.app.enableRepoSwitcher,style:{borderColor:a||b?"#ff6b6b":"#e1e8ed",opacity:p.app.enableRepoSwitcher?1:.6,cursor:p.app.enableRepoSwitcher?"text":"not-allowed"}}),(0,n.jsx)(tZ,{onClick:y,disabled:!v(x)||r,title:v(x)?"":s("toolbar.invalidRepo"),children:r?(0,n.jsx)(tM,{style:{width:"12px",height:"12px"}}):s("toolbar.apply")})]})]}),(0,n.jsx)(tE,{children:m?(0,n.jsxs)(tT,{children:[(0,n.jsx)(tM,{}),(0,n.jsx)("span",{children:s("auth.loading")})]}):l&&c?(0,n.jsxs)(t_,{children:[(0,n.jsx)(tL,{src:c.avatarUrl,alt:c.login}),(0,n.jsxs)(tA,{children:["@",c.login]}),(0,n.jsx)(tI,{onClick:h,children:s("auth.logout")})]}):(0,n.jsxs)(tR,{onClick:u,children:[(0,n.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"currentColor",children:(0,n.jsx)("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"})}),s("auth.login")]})})]})},tP="gwitter_last_repo",tq=(e,t)=>{try{localStorage.setItem(tP,JSON.stringify({owner:e,repo:t})),console.log("Saved last repo:",`${e}/${t}`)}catch(e){console.warn("Failed to save last repo:",e)}},tN=()=>{try{let e=localStorage.getItem(tP);if(e){let t=JSON.parse(e);return console.log("Loaded last repo:",`${t.owner}/${t.repo}`),t}return null}catch(e){return console.warn("Failed to load last repo:",e),null}},tD=a.Z.div`
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
`,tH=a.Z.div`
  /* letter-spacing: 1px; */
`,tF=(0,a.Z)(s.E.div)`
  min-height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
`,tV=a.Z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
`,tG=a.Z.span`
  font-size: 24px;
  margin-bottom: 10px;
`,tU=a.Z.span`
  font-size: 18px;
  font-weight: bold;
`,tY=a.Z.span`
  font-size: 14px;
  color: #666;
`,tB=a.Z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  min-height: 300px;
`,tJ=a.Z.span`
  font-size: 48px;
  margin-bottom: 20px;
  opacity: 0.6;
`,tW=a.Z.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #333;
`,tK=()=>{let{user:e}=ec(),[t,o]=(0,i.useState)([]),[r,a]=(0,i.useState)(!0),[s,d]=(0,i.useState)(!0),[c,u]=(0,i.useState)(!0),[g,x]=(0,i.useState)([]),[f,b]=(0,i.useState)(!1),[w,v]=(0,i.useState)(()=>{if(p.app.enableRepoSwitcher){let e=q();if(e)return e;let t=tN();if(t)return t}return p.request.owner&&p.request.repo?{owner:p.request.owner,repo:p.request.repo}:{owner:"",repo:""}}),[y,j]=(0,i.useState)(null),k=(0,i.useRef)(null),$=(0,i.useRef)(r),S=(0,i.useRef)(null),z=(0,i.useRef)(null==e?void 0:e.login),C=(0,i.useRef)(w),Z=(0,i.useRef)(!1),E=(0,i.useRef)(null),R=(0,i.useRef)(0);(0,i.useEffect)(()=>{$.current=r},[r]),(0,i.useEffect)(()=>{z.current=null==e?void 0:e.login},[null==e?void 0:e.login]),(0,i.useEffect)(()=>{C.current=w},[w]),(0,i.useEffect)(()=>{R.current=window.scrollY},[]);let _=(0,i.useCallback)(async()=>{let e=C.current;console.log("loadIssues called for repo:",`${e.owner}/${e.repo}`,"cursor:",k.current,"isLoading:",$.current);try{let t=(await h.post("/graphql",m({owner:e.owner,repo:e.repo,cursor:k.current,pageSize:p.request.pageSize}))).data.data.repository.issues,{hasNextPage:i,endCursor:r}=t.pageInfo;u(i),k.current=r;let n=[...g,...t.nodes];x(n),o(e=>[...e,...I(t.nodes,z.current)]),a(!1),Z.current=!1}catch(e){console.error("err:",e),a(!1),Z.current=!1}},[g]),L=(0,i.useCallback)(async()=>{if(console.log("Resetting and loading new repo:",w),!w.owner||!w.repo){a(!1),d(!1),j("Repository owner and name are required");return}o([]),x([]),u(!0),k.current=null,Z.current=!1,R.current=window.scrollY,a(!0),d(!0),j(null);try{var e,t;let i=await h.post("/graphql",m({owner:w.owner,repo:w.repo,cursor:null,pageSize:p.request.pageSize}));if(i.data.errors)throw Error((null==(t=i.data.errors[0])?void 0:t.message)||"GraphQL Error");if(!(null==(e=i.data.data)?void 0:e.repository))throw Error(`Repository ${w.owner}/${w.repo} not found or private`);let r=i.data.data.repository.issues,{hasNextPage:n,endCursor:s}=r.pageInfo;u(n),k.current=s,x(r.nodes),o(I(r.nodes,z.current)),a(!1),d(!1),j(null)}catch(e){console.error("Error loading new repo:",e),a(!1),d(!1),j(e instanceof Error?e.message:"Failed to load repository")}},[w.owner,w.repo]),A=(0,i.useCallback)((e,t)=>{console.log("Repo changed to:",{owner:e,repo:t}),v({owner:e,repo:t}),p.app.enableRepoSwitcher&&(tq(e,t),N(e,t))},[]),M=(0,i.useCallback)(()=>{E.current&&clearTimeout(E.current),E.current=setTimeout(()=>{let e=window.scrollY,o=R.current,i=e>o;if(R.current=e,console.log("handleScroll check - scrollY:",e,"lastScrollY:",o,"scrollingDown:",i,"isLoading:",$.current,"hasNextPage:",c,"triggered:",Z.current),!i)return void console.log("handleScroll blocked - scrolling up");if($.current||!c||Z.current)return void console.log("handleScroll blocked - already loading, no more pages, or already triggered");if(0===t.length)return void console.log("handleScroll blocked - no issues loaded yet");let r=S.current;if(!r)return void console.log("handleScroll blocked - no last issue element");let n=r.getBoundingClientRect(),s=window.innerHeight,l=n.top<s;if(console.log("Scroll metrics - lastIssue.top:",n.top,"viewportHeight:",s,"isVisible:",l),!l)return void console.log("handleScroll blocked - last issue not yet visible");console.log("handleScroll triggered, starting new load for repo:",C.current),Z.current=!0,a(!0),_()},200)},[_,c,t.length]);return(0,i.useEffect)(()=>{!f&&(console.log("App mounted, initializing data load"),d(!0),L(),b(!0),w.owner&&w.repo&&p.app.enableRepoSwitcher&&N(w.owner,w.repo))},[f,L,w]),(0,i.useEffect)(()=>{f&&(window.removeEventListener("scroll",M),d(!0),L())},[w.owner,w.repo]),(0,i.useEffect)(()=>{if(f&&c&&t.length>0){console.log("Preparing to add scroll listener, issues count:",t.length);let e=setTimeout(()=>{S.current?(console.log("Adding scroll listener, lastIssueRef exists"),window.addEventListener("scroll",M,!1)):console.log("lastIssueRef still null, will retry on next render")},100);return()=>{clearTimeout(e),window.removeEventListener("scroll",M),E.current&&(clearTimeout(E.current),E.current=null)}}},[f,c,M,t.length]),(0,i.useEffect)(()=>{g.length>0&&o(I(g,null==e?void 0:e.login))},[null==e?void 0:e.login,g]),(0,i.useEffect)(()=>()=>{E.current&&(clearTimeout(E.current),E.current=null)},[]),(0,n.jsxs)(tD,{children:[(0,n.jsx)(tO,{onRepoChange:A,currentRepo:w,isLoading:s,error:y}),p.app.enableAbout&&(0,n.jsx)(U,{owner:w.owner,repo:w.repo}),t.length>0&&(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(tH,{children:(0,n.jsx)(l.M,{mode:"popLayout",children:t.map((e,o)=>(0,n.jsx)(Y,{id:e.id,children:(0,n.jsx)("div",{ref:o===t.length-1?S:void 0,children:(0,n.jsx)(tc,{issue:e,repoOwner:w.owner,repoName:w.repo})})},e.id))})})}),0===t.length&&!r&&!s&&!y&&w.owner&&w.repo&&(0,n.jsx)(tH,{children:(0,n.jsxs)(tB,{children:[(0,n.jsx)(tJ,{children:"\uD83D\uDCDD"}),(0,n.jsx)(tW,{children:"No Issues Found"})]})}),c&&(0,n.jsxs)(tF,{initial:{opacity:0,y:20},animate:r?{opacity:1,y:0}:{opacity:0,y:20},transition:{duration:.15,ease:"easeOut"},children:[(0,n.jsx)(tw,{}),(0,n.jsx)(tw,{})]}),y&&(0,n.jsx)(tH,{children:(0,n.jsxs)(tV,{children:[(0,n.jsx)(tG,{children:"⚠️"}),(0,n.jsx)(tU,{children:y}),(0,n.jsx)(tY,{children:"Please check the repository name and try again."})]})}),p.app.enableEgg&&!c&&!y&&(0,n.jsx)(ea,{})]})},tQ=()=>(0,n.jsx)(ep,{children:(0,n.jsx)(tK,{})}),tX=a.Z.div`
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
`,t0=a.Z.div`
  padding: 1.25em 0;
  text-align: center;
`,t1=a.Z.p`
  margin: 0.5em auto;
  color: #999;
`,t2=(0,es.F4)`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
`,t5=(0,es.F4)`
  0% {
    height: 0%;
  }
  25% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
  75% {
    height: 100%;
  }
  100% {
    height: 0%;
  }
`,t4=a.Z.span`
  display: inline-block;
  width: 2em;
  height: 2em;
  position: relative;
  border: 4px solid #ccc;
  border-radius: 10%;
  box-shadow: inset 0px 0px 20px 20px #ebebeb33;
  animation: ${t2} 2s infinite ease;
`,t8=a.Z.span`
  vertical-align: top;
  display: inline-block;
  width: 100% !important;
  background-color: #ccc;
  box-shadow: 0 0 5px 0px #ccc;
  animation: ${t5} 2s infinite ease-in;
`,t6=()=>{let{t:e}=(0,d.$G)();return(0,i.useEffect)(()=>{let e=E().code;e&&y(e).then(e=>{window.opener.postMessage(JSON.stringify({result:e}),window.opener.location)}).catch(e=>{window.opener.postMessage(JSON.stringify({error:e.message}),window.opener.location),console.error(e)})},[]),(0,n.jsx)(tX,{children:(0,n.jsxs)(t0,{children:[(0,n.jsx)(t4,{children:(0,n.jsx)(t8,{})}),(0,n.jsx)(t1,{children:e("auth.authorizing")})]})})};var t3=o(7471),t7=o(7716),t9=JSON.parse('{"auth":{"authorizing":"Authorizing...","login":"Login with GitHub","logout":"Logout","loading":"Loading..."},"toolbar":{"repo":"Repo","apply":"Apply","repoPlaceholder":"owner/repo","invalidRepo":"Please enter a valid repository (owner/repo)","repoNotFound":"Repository not found or private"},"about":{"title":"Details & Summary","gwitter":{"title":"\uD83C\uDF89 About Gwitter","description":"This is a lightweight microblogging application built on GitHub Issues. Here I record my thoughts on technology, insights into life, and some interesting discoveries. Welcome to join the discussion."},"content":{"title":"✨ About Content","categories":"There are {{count}} categories:"},"subscription":{"title":"\uD83D\uDD0A About Subscription","watch":"Watch","join":"Join","repo":"Gwitter Repository","wechat":"WeChat Group","telegram":"TG Channel"}},"egg":{"message":"Thanks for visiting!","hope":"Hope to see you again","comment":"// TODO: Add more interesting content","runCode":"Run Code"},"interaction":{"like":"Like","liked":"Liked","comment":"Comment","comments":"comments","loginRequired":"Please login first","loginToLike":"Login to like","loginToComment":"Login to comment"},"comments":{"adding":"Commenting...","saving":"Saving...","loading":"Loading comments...","empty":"No comments yet","add":"Comment","edit":"Edit","delete":"Delete","cancel":"Cancel","save":"Save","placeholder":"Write your comment...","confirmDelete":"Are you sure you want to delete this comment?","confirmDeleteTitle":"Delete Comment","confirmDeleteMessage":"Are you sure you want to delete this comment? This action cannot be undone.","deleting":"Deleting...","addSuccess":"Comment added successfully","updateSuccess":"Comment updated successfully","deleteSuccess":"Comment deleted successfully","addFailed":"Failed to add comment","updateFailed":"Failed to update comment","deleteFailed":"Failed to delete comment","more":"More actions","like":"Like","liked":"Liked","likes":"likes"}}'),oe=JSON.parse('{"auth":{"authorizing":"正在授权中...","login":"登录 GitHub","logout":"退出","loading":"加载中..."},"toolbar":{"repo":"仓库","apply":"应用","repoPlaceholder":"用户名/仓库名","invalidRepo":"请输入有效的仓库地址（用户名/仓库名）","repoNotFound":"仓库未找到或为私有仓库"},"about":{"title":"Details & Summary","gwitter":{"title":"\uD83C\uDF89 关于 Gwitter","description":"这是一个基于 GitHub Issues 构建的轻量级微博应用。这里记录着我对技术的思考、对生活的感悟，以及一些有趣的发现，欢迎一起交流。"},"content":{"title":"✨ 关于内容","categories":"共有{{count}}个分类："},"subscription":{"title":"\uD83D\uDD0A 关于订阅","watch":"Watch","join":"Join","repo":"Gwitter 仓库","wechat":"微信群","telegram":"TG 频道"}},"egg":{"message":"感谢浏览！","hope":"期待再次相见","comment":"// TODO: 添加更多有趣内容","runCode":"运行代码"},"interaction":{"like":"点赞","liked":"已点赞","comment":"评论","comments":"条评论","loginRequired":"请先登录后再进行操作","loginToLike":"登录后点赞","loginToComment":"登录后评论"},"comments":{"adding":"评论中...","saving":"保存中...","loading":"加载评论中...","empty":"暂无评论","add":"评论","edit":"编辑","delete":"删除","cancel":"取消","save":"保存","placeholder":"写下你的评论...","confirmDelete":"确定要删除这条评论吗？","confirmDeleteTitle":"删除评论","confirmDeleteMessage":"确定要删除这条评论吗？删除后将无法恢复。","deleting":"删除中...","addSuccess":"评论添加成功","updateSuccess":"评论更新成功","deleteSuccess":"评论删除成功","addFailed":"评论添加失败","updateFailed":"评论更新失败","deleteFailed":"评论删除失败","more":"更多操作","like":"点赞","liked":"已点赞","likes":"个赞"}}');t3.ZP.use(t7.Z).use(d.Db).init({resources:{en:{translation:t9},zh:{translation:oe}},fallbackLng:"en",interpolation:{escapeValue:!1}});let ot=null;function oo(){var e;let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=t.container||document.getElementById("gwitter");if(!o)return void console.error("Gwitter: Container element not found");(e=t.config||{}).request&&(p.request={...p.request,...e.request}),e.app&&(p.app={...p.app,...e.app});let n=E(),a=tQ;n.code&&(a=t6),ot&&ot.unmount();let s=r.createRoot(o);return s.render(i.createElement(a)),ot=s,s}"undefined"!=typeof window&&(window.gwitter=oo),oo()},3052:function(){window.Collapse=class{_setPanelHeight(e){let t=e.querySelector("summary + *");t.style.height=`${t.scrollHeight}px`}_removePanelHeight(e){e.querySelector("summary + *").style.height=null}open(e){e.dispatchEvent(this.events.openingPanel),e.open=!0}_afterOpen(e){this._setPanelHeight(e),e.classList.add(this.settings.activeClass)}_endOpen(e){e.dispatchEvent(this.events.openedPanel),this._removePanelHeight(e)}close(e){e.dispatchEvent(this.events.closingPanel),this._afterClose(e)}_afterClose(e){this._setPanelHeight(e),setTimeout(()=>{e.classList.remove(this.settings.activeClass),this._removePanelHeight(e)},100)}_endClose(e){e.dispatchEvent(this.events.closedPanel),e.open=!1}toggle(e){e.open?this.close(e):this.open(e)}openSinglePanel(e){this._panels.forEach(t=>{e!=t||e.open?this.close(t):this.open(t)})}openAll(){this._panels.forEach(e=>{this.open(e)})}closeAll(){this._panels.forEach(e=>{this.close(e)})}_attachEvents(){this._panels.forEach(e=>{let t=e.querySelector("summary"),o=e.querySelector("summary + *");e.addEventListener("toggle",()=>{let t=e.classList.contains(this.settings.heightClass);e.open&&!t&&this._afterOpen(e)}),t.addEventListener("click",t=>{this.settings.accordion?(this.openSinglePanel(e),t.preventDefault()):e.open&&(this.close(e),t.preventDefault())});let i="";o.addEventListener("transitionend",t=>{t.target===o&&(i||(i=t.propertyName),t.propertyName==i&&(e.classList.contains(this.settings.activeClass)?this._endOpen(e):this._endClose(e)))})})}init(){return this._attachEvents(),this._container.classList.add(this.settings.initClass),this}constructor(e,t={}){this.settings=Object.assign({},{accordion:!1,initClass:"collapse-init",activeClass:"panel-active",heightClass:"collapse-reading-height"},t),this._container=e,this._panels=e.querySelectorAll("details"),this.events={openingPanel:new CustomEvent("openingPanel"),openedPanel:new CustomEvent("openedPanel"),closingPanel:new CustomEvent("closingPanel"),closedPanel:new CustomEvent("closedPanel")}}}}},t={};function o(i){var r=t[i];if(void 0!==r)return r.exports;var n=t[i]={exports:{}};return e[i](n,n.exports,o),n.exports}o.m=e,o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;o.t=function(i,r){if(1&r&&(i=this(i)),8&r||"object"==typeof i&&i&&(4&r&&i.__esModule||16&r&&"function"==typeof i.then))return i;var n=Object.create(null);o.r(n);var a={};e=e||[null,t({}),t([]),t(t)];for(var s=2&r&&i;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach(e=>{a[e]=()=>i[e]});return a.default=()=>i,o.d(n,a),n}})(),o.d=(e,t)=>{for(var i in t)o.o(t,i)&&!o.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e=[];o.O=(t,i,r,n)=>{if(i){n=n||0;for(var a=e.length;a>0&&e[a-1][2]>n;a--)e[a]=e[a-1];e[a]=[i,r,n];return}for(var s=1/0,a=0;a<e.length;a++){for(var[i,r,n]=e[a],l=!0,d=0;d<i.length;d++)(!1&n||s>=n)&&Object.keys(o.O).every(e=>o.O[e](i[d]))?i.splice(d--,1):(l=!1,n<s&&(s=n));if(l){e.splice(a--,1);var c=r();void 0!==c&&(t=c)}}return t}})(),o.rv=()=>"1.3.12",(()=>{var e={980:0};o.O.j=t=>0===e[t];var t=(t,i)=>{var r,n,[a,s,l]=i,d=0;if(a.some(t=>0!==e[t])){for(r in s)o.o(s,r)&&(o.m[r]=s[r]);if(l)var c=l(o)}for(t&&t(i);d<a.length;d++)n=a[d],o.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return o.O(c)},i=self.webpackChunkgwitter=self.webpackChunkgwitter||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})(),o.ruid="bundler=rspack@1.3.12";var i=o.O(void 0,["72","361","820"],function(){return o(925)});i=o.O(i)})();