import { defineConfig } from "vitepress";

// Single navigation item
const enNav = [
  { text: "Refly", link: "https://refly.ai" },
  {
    text: "Add to Chrome",
    link: "https://chromewebstore.google.com/detail/lecbjbapfkinmikhadakbclblnemmjpd",
  },
  { text: "Community", link: "/community/contact-us" },
  {
    text: "v0.4.2",
    items: [{ text: "Changelog", link: "/changelog/v0.4.2" }],
  },
  { text: "Roadmap", link: "/roadmap" },
];

const zhNav = [
  { text: "Refly", link: "https://refly.ai" },
  {
    text: "添加到 Chrome",
    link: "https://chromewebstore.google.com/detail/lecbjbapfkinmikhadakbclblnemmjpd",
  },
  { text: "社区", link: "/zh/community/contact-us" },
  {
    text: "v0.4.2",
    items: [{ text: "更新日志", link: "/zh/changelog/v0.4.2" }],
  },
  { text: "路线图", link: "/zh/roadmap" },
];

// Sidebar translations
const sidebar = {
  en: [
    {
      text: "Getting Started",
      items: [{ text: "Welcome to Refly", link: "/" }],
    },
    {
      text: "Guide",
      items: [
        { text: "Crash Course", link: "/guide/crash-course" },
        {
          text: "Self-Deploy",
          link: "/guide/self-deploy",
          items: [{ text: "Ollama", link: "/guide/self-deploy/ollama" }],
        },
        { text: "Configuration", link: "/guide/configuration" },
        { text: "Chrome Extension", link: "/guide/chrome-extension" },
        { text: "Video Tutorials", link: "/guide/video-tutorials" },
      ],
    },
    {
      text: "Future Plans",
      items: [{ text: "Product Roadmap", link: "/roadmap" }],
    },
    {
      text: "Community",
      items: [{ text: "Contact Us", link: "/community/contact-us" }],
    },
    {
      text: "About",
      items: [
        { text: "Privacy Policy", link: "/about/privacy-policy" },
        { text: "Terms of Service", link: "/about/terms-of-service" },
      ],
    },
    {
      text: "Changelog",
      items: [
        { text: "v0.4.2", link: "/changelog/v0.4.2" },
        { text: "v0.4.1", link: "/changelog/v0.4.1" },
        { text: "v0.4.0", link: "/changelog/v0.4.0" },
        { text: "v0.3.0", link: "/changelog/v0.3.0" },
        { text: "v0.2.4", link: "/changelog/v0.2.4" },
        { text: "v0.2.3", link: "/changelog/v0.2.3" },
        { text: "v0.2.2", link: "/changelog/v0.2.2" },
        { text: "v0.2.1", link: "/changelog/v0.2.1" },
        { text: "v0.2.0", link: "/changelog/v0.2.0" },
        { text: "v0.1.2", link: "/changelog/v0.1.2" },
        { text: "v0.1.1", link: "/changelog/v0.1.1" },
      ],
    },
  ],
  zh: [
    {
      text: "入门",
      items: [{ text: "欢迎使用 Refly", link: "/zh" }],
    },
    {
      text: "指南",
      items: [
        { text: "快速上手", link: "/zh/guide/crash-course" },
        {
          text: "私有部署",
          link: "/zh/guide/self-deploy/index",
          items: [{ text: "Ollama", link: "/zh/guide/self-deploy/ollama" }],
        },
        { text: "配置", link: "/zh/guide/configuration" },
        { text: "Chrome 插件", link: "/zh/guide/chrome-extension" },
        { text: "视频教程", link: "/zh/guide/video-tutorials" },
      ],
    },
    {
      text: "未来计划",
      items: [{ text: "产品路线图", link: "/zh/roadmap" }],
    },
    {
      text: "社区",
      items: [{ text: "联系我们", link: "/zh/community/contact-us" }],
    },
    {
      text: "关于",
      items: [
        { text: "隐私政策", link: "/zh/about/privacy-policy" },
        { text: "服务条款", link: "/zh/about/terms-of-service" },
      ],
    },
    {
      text: "更新日志",
      items: [
        { text: "v0.4.2", link: "/zh/changelog/v0.4.2" },
        { text: "v0.4.1", link: "/zh/changelog/v0.4.1" },
        { text: "v0.4.0", link: "/zh/changelog/v0.4.0" },
        { text: "v0.3.0", link: "/zh/changelog/v0.3.0" },
        { text: "v0.2.4", link: "/zh/changelog/v0.2.4" },
        { text: "v0.2.3", link: "/zh/changelog/v0.2.3" },
        { text: "v0.2.2", link: "/zh/changelog/v0.2.2" },
        { text: "v0.2.1", link: "/zh/changelog/v0.2.1" },
        { text: "v0.2.0", link: "/zh/changelog/v0.2.0" },
        { text: "v0.1.2", link: "/zh/changelog/v0.1.2" },
        { text: "v0.1.1", link: "/zh/changelog/v0.1.1" },
      ],
    },
  ],
};

export default defineConfig({
  // Site metadata
  title: "Refly Docs",
  description: "Refly Documentation",

  // Remove .html extensions from URLs
  cleanUrls: true,

  // Configure head
  head: [
    ["link", { rel: "icon", href: "/logo/logo.svg" }],
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-RS0SJYDFJF",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-RS0SJYDFJF');`,
    ],
  ],

  // i18n configuration
  locales: {
    root: {
      label: "English",
      lang: "en",
      title: "Refly Docs",
      description: "Refly Documentation",
      themeConfig: {
        nav: enNav,
        sidebar: sidebar.en,
        siteTitle: "Refly Docs",
        outlineTitle: "On this page",
        docFooter: {
          prev: "Previous page",
          next: "Next page",
        },
        returnToTopLabel: "Return to top",
        sidebarMenuLabel: "Menu",
        darkModeSwitchLabel: "Theme",
        search: {
          provider: "local",
          options: {
            translations: {
              button: {
                buttonText: "Search",
                buttonAriaLabel: "Search",
              },
              modal: {
                noResultsText: "No results for",
                resetButtonTitle: "Reset search",
                footer: {
                  selectText: "to select",
                  navigateText: "to navigate",
                  closeText: "to close",
                },
              },
            },
          },
        },
      },
    },
    zh: {
      label: "简体中文",
      lang: "zh",
      title: "Refly 文档",
      description: "Refly 开发文档",
      themeConfig: {
        nav: zhNav,
        sidebar: sidebar.zh,
        siteTitle: "Refly 文档",
        outlineTitle: "本页目录",
        docFooter: {
          prev: "上一页",
          next: "下一页",
        },
        returnToTopLabel: "返回顶部",
        sidebarMenuLabel: "菜单",
        darkModeSwitchLabel: "主题",
        search: {
          provider: "local",
          options: {
            translations: {
              button: {
                buttonText: "搜索",
                buttonAriaLabel: "搜索",
              },
              modal: {
                noResultsText: "未找到相关结果",
                resetButtonTitle: "清除搜索",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                },
              },
            },
          },
        },
      },
    },
  },

  themeConfig: {
    // Logo configuration
    logo: {
      light: "/logo/logo.svg",
      dark: "/logo/logo.svg",
    },

    // Social links
    socialLinks: [
      { icon: "github", link: "https://github.com/refly-ai/refly" },
    ],

    // Language selection
    langMenuLabel: "Change Language",

    // Enable search
    search: {
      provider: "local",
    },
  },
});
