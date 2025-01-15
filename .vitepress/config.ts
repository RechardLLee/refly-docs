import { defineConfig } from "vitepress";

// Navbar translations
const nav = {
  en: [
    { text: "Home", link: "/" },
    { text: "Guide", link: "/guide/" },
  ],
  zh: [
    { text: "首页", link: "/zh/" },
    { text: "指南", link: "/zh/guide/" },
  ],
};

// Sidebar translations
const sidebar = {
  en: [
    {
      text: "Guide",
      items: [
        { text: "Introduction", link: "/guide/introduction" },
        { text: "Getting Started", link: "/guide/getting-started" },
      ],
    },
  ],
  zh: [
    {
      text: "指南",
      items: [
        { text: "介绍", link: "/zh/guide/introduction" },
        { text: "快速开始", link: "/zh/guide/getting-started" },
      ],
    },
  ],
};

export default defineConfig({
  // Site metadata
  title: "My Docs",
  description: "A VitePress Site",

  // i18n configuration
  locales: {
    root: {
      label: "English",
      lang: "en",
      themeConfig: {
        nav: nav.en,
        sidebar: sidebar.en,
      },
    },
    zh: {
      label: "简体中文",
      lang: "zh",
      themeConfig: {
        nav: nav.zh,
        sidebar: sidebar.zh,
      },
    },
  },

  themeConfig: {
    // Social links
    socialLinks: [{ icon: "github", link: "https://github.com/your-account" }],

    // Language selection
    langMenuLabel: "Change Language",
  },
});
