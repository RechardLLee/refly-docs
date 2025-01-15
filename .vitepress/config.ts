import { defineConfig } from "vitepress";

// Single navigation item
const nav = [{ text: "Refly", link: "https://refly.ai" }];

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
    {
      text: "Changelog",
      items: [
        { text: "Version 1.0.0", link: "/changelog/v1.0.0" },
        { text: "Version 0.9.0", link: "/changelog/v0.9.0" },
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
    {
      text: "更新日志",
      items: [
        { text: "版本 1.0.0", link: "/zh/changelog/v1.0.0" },
        { text: "版本 0.9.0", link: "/zh/changelog/v0.9.0" },
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
        nav,
        sidebar: sidebar.en,
      },
    },
    zh: {
      label: "简体中文",
      lang: "zh",
      themeConfig: {
        nav,
        sidebar: sidebar.zh,
      },
    },
  },

  themeConfig: {
    // Social links
    socialLinks: [{ icon: "github", link: "https://github.com/refly-ai" }],

    // Language selection
    langMenuLabel: "Change Language",
  },
});
