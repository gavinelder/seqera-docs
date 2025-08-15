// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import math from 'remark-math';
import katex from 'rehype-katex';
import remarkYamlToTable from 'remark-yaml-to-table';
import remarkCodeImport from 'remark-code-import';
import tabBlocks from 'docusaurus-remark-plugin-tab-blocks';
import 'dotenv/config';

import platform_enterprise_latest_version from "./platform-enterprise_latest_version.js";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Seqera Docs",
  tagline: "Documentation for Seqera products",
  favicon: "img/favicon--dynamic.svg",

  // Set the production url of your site here
  url: "https://docs.seqera.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',
  trailingSlash: false,

  // GitHub pages deployment config.
  organizationName: "seqeralabs", 
  projectName: "docs",

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Future configuration
  future: {
    experimental_faster: true,
    v4: true,
  },

  // Add Algolia search configuration
  customFields: {
    algolia: {
      appId: process.env.PUBLIC_DOCUSAURUS_ALGOLIA_APP_ID,
      apiKey: process.env.PUBLIC_DOCUSAURUS_ALGOLIA_API_KEY,
      indexName: process.env.PUBLIC_DOCUSAURUS_ALGOLIA_INDEX_NAME,
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
      crossorigin: 'anonymous',
    },
  ],

  themes: ["docusaurus-theme-openapi-docs"],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // Add the blog/changelog section
        blog: process.env.EXCLUDE_CHANGELOG ? false : {
          blogTitle: 'Seqera Changelog',
          blogDescription: 'Blog',
          blogSidebarCount: 5000,
          blogSidebarTitle: 'Changelog',
          path: 'changelog',
          routeBasePath: '/changelog',
          include: ['**/*.{md,mdx}'],
          showReadingTime: false,
          onUntruncatedBlogPosts: 'ignore',
          feedOptions: {
            type: 'all',
            title: 'Seqera Changelog',
            description: 'Stay updated with our blog posts!',
            copyright: `Copyright © ${new Date().getFullYear()} Seqera`,
          }
        },
        docs: false,
        theme: {
          customCss: [
            './src/css/main.css',
            './src/css/typography.css',
            './src/css/misc.css',
            './src/css/components/checklist.css',
            './src/css/components/box.css',
            './src/css/theme-colors.css',
            './src/css/api.css',
            './src/css/fonts/inter.css',
            './src/css/fonts/degular.css',
          ],
        },
        gtag: {
          trackingID: "G-NR1CNM213G",
          anonymizeIP: true,
        },
        googleTagManager: {
          containerId: "GTM-MBCJKK4",
        },
      }),
    ],
  ],

  plugins: [
    // Platform Enterprise plugin
    process.env.EXCLUDE_PLATFORM_ENTERPRISE ? null : [
      '@docusaurus/plugin-content-docs',
      {
        id: 'platform-enterprise',
        path: 'platform-enterprise',
        routeBasePath: 'platform-enterprise',
        includeCurrentVersion: false,
        remarkPlugins: [math, remarkYamlToTable, remarkCodeImport, tabBlocks],
        rehypePlugins: [katex],
        editUrl: 'https://github.com/seqeralabs/docs/tree/master/',
        sidebarPath: false,
        versions: {
          [platform_enterprise_latest_version]: {
            label: platform_enterprise_latest_version,
            path: platform_enterprise_latest_version,
          },
        },
      },
    ],
    // Platform Cloud plugin
    process.env.EXCLUDE_PLATFORM_CLOUD ? null : [
      '@docusaurus/plugin-content-docs',
      {
        id: 'platform-cloud',
        path: "platform-cloud/docs",
        routeBasePath: 'platform-cloud',
        sidebarPath: './platform-cloud/cloud-sidebar.json',
        editUrl: 'https://github.com/seqeralabs/docs/tree/master/',
        remarkPlugins: [math, remarkYamlToTable, remarkCodeImport, tabBlocks],
        rehypePlugins: [katex],
      },
    ],
    // Platform API plugin
    process.env.EXCLUDE_PLATFORM_API ? null : [
      '@docusaurus/plugin-content-docs',
      {
        id: 'platform-api',
        routeBasePath: 'platform-api',
        path: 'platform-api-docs/docs',
        remarkPlugins: [remarkYamlToTable],
        sidebarPath: 'platform-api-docs/docs/sidebar/sidebar.js',
        docItemComponent: '@theme/ApiItem',
      },
    ],
    // Platform OpenAPI plugin
    process.env.EXCLUDE_PLATFORM_OPENAPI ? null : [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api',
        docsPluginId: 'classic',
        config: {
          platform: {
            specPath: 'platform-api-docs/seqera-final-to-docs.yaml',
            outputDir: 'platform-api-docs/docs',
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
        },
      },
    ],
    // Wave plugin
    process.env.EXCLUDE_WAVE ? null : [
      '@docusaurus/plugin-content-docs',
      {
        id: "wave",
        routeBasePath: "/wave",
        path: "wave_docs/wave_repo/docs",
        sidebarPath: './wave_docs/sidebar.json',
        remarkPlugins: [math, remarkYamlToTable, remarkCodeImport, tabBlocks],
        rehypePlugins: [katex],
        editUrl: ({ docPath }) => {
          return `https://github.com/seqeralabs/wave/blob/master/docs/${docPath.replace('wave_docs/wave_repo/docs', '')}`
        },
      },
    ],
    // MultiQC plugin
    process.env.EXCLUDE_MULTIQC ? null : [
      '@docusaurus/plugin-content-docs',
      {
        id: 'multiqc',
        path: "multiqc_docs/multiqc_repo/docs/markdown",
        routeBasePath: 'multiqc',
        sidebarPath: './multiqc_docs/sidebar.js',
        remarkPlugins: [math, remarkYamlToTable, remarkCodeImport, tabBlocks],
        rehypePlugins: [katex],
        editUrl: ({ docPath }) => {
          return `https://github.com/MultiQC/MultiQC/blob/main/docs/markdown/${docPath.replace('multiqc_docs/multiqc_repo/docs', '')}`
        },
      },
    ],
    // Fusion plugin
    process.env.EXCLUDE_FUSION ? null : [
      '@docusaurus/plugin-content-docs',
      {
        id: 'fusion',
        path: 'fusion_docs',
        routeBasePath: 'fusion',
        sidebarPath: './fusion_docs/sidebar.json',
        remarkPlugins: [math, remarkYamlToTable, remarkCodeImport, tabBlocks],
        rehypePlugins: [katex],
        editUrl: 'https://github.com/seqeralabs/docs/tree/master/',
      },
    ],
    //Tailwind CSS plugin
    function tailwind() {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    //Latest routing plugin
    function routing() {
      return {
        name: "latest-routing",
        async contentLoaded({ actions }) {
          [
            {
              path: "/platform-enterprise/latest",
              exact: false,
              component: "@site/src/pages/platform-enterprise/latest.tsx",
            },
          ].map((route) => actions.addRoute(route));
        },
      };
    },
  ].filter(Boolean),

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/share.jpg",
      navbar: {
        title: '',
        logo: {
          alt: "Seqera",
          src: "img/Logo.svg",
          srcDark: "img/LogoWhite.svg",
          width: "180px",
          className: 'w-[100px]'
        },
        items: [
          // Note: Using HTML type for external links due to build implementation
          {
            type: 'html',
            position: 'left',
            value: '<a href="https://docs.seqera.io/platform-cloud/platform-cloud" class="menu__link">Platform Cloud</a>'
          },
          {
            type: 'html',
            position: 'left',
            value: '<a href="https://docs.seqera.io/platform-enterprise/latest/platform-enterprise" class="menu__link">Platform Enterprise</a>'
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            docsPluginId: "platform-enterprise",
          },
          {
            to: "https://www.nextflow.io/docs/latest/",
            html: 'Nextflow <svg width="12" height="12" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_nPIU" style="margin-left:4px;opacity:0.6;"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>',
            position: "left",
            target: "_blank",
          },
          {
            type: 'html',
            position: 'left',
            value: '<a href="https://docs.seqera.io/multiqc/" class="menu__link">MultiQC</a>'
          },
          {
            type: 'html',
            position: 'left',
            value: '<a href="https://docs.seqera.io/wave/" class="menu__link">Wave</a>'
          },
          {
            type: 'html',
            position: 'left',
            value: '<a href="https://docs.seqera.io/fusion/" class="menu__link">Fusion</a>'
          },
          {
            to: "https://training.nextflow.io/latest/",
            html: 'Nextflow Training <svg width="12" height="12" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_nPIU" style="margin-left:6px;opacity:0.6;"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>',
            position: "left",
            target: "_blank",
          },
          {
            type: 'html',
            position: 'left',
            value: '<a href="https://docs.seqera.io/platform-api/info/seqera-api" class="menu__link">Platform API</a>'
          },
        ],
      },
      footer: {
        style: "dark",
        logo: {
          alt: 'Seqera Docs logo',
          src: 'img/icon.svg', 
          srcDark: "img/iconLight.svg",
          href: 'https://docs.seqera.io', 
          width: 25,  
          height: 25, 
        },
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Platform Enterprise",
                to: "/platform-enterprise/latest/platform-enterprise",
              },
              {
                label: "Platform Cloud",
                to: "/platform-cloud/platform-cloud",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Github",
                href: "https://github.com/seqeralabs",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/14065390/",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/seqeralabs",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "About Seqera",
                href: "https://seqera.io/",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Seqera`,
      },
      languageTabs: [
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "bash",
          language: "curl",
          logoClass: "curl",
        },
        {
          highlight: "java",
          language: "java",
          logoClass: "java",
          variant: "unirest",
        },
        {
          highlight: "r",
          language: "r",
          logoClass: "r",
        },
        {
          highlight: "javascript",
          language: "javascript",
          logoClass: "javascript",
        },
        {
          highlight: "go",
          language: "go",
          logoClass: "go",
        },
        {
          highlight: "powershell",
          language: "powershell",
          logoClass: "powershell",
        },
      ],
      prism: {
        theme: prismThemes.oneLight,
        darkTheme: prismThemes.oneDark,
        additionalLanguages: [
          "bash",
          "docker",
          "groovy",
          "ini",
          "java",
          "json",
          "nginx",
          "python",
          "r",
          "shell-session",
          "sql",
          "typescript",
          "yaml"
        ],
      },
    }),
  
  //Add client-side modules
  clientModules: [require.resolve("./clientside-scripts.js")],
};

export default config;