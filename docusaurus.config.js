module.exports = {
  title: 'Young\'s Blog',
  tagline: '',
  url: 'http://www.youngw.fun',
  baseUrl: '/',
  favicon: 'img/20.svg',
  organizationName: 'wwwyyying', // Usually your GitHub org/user name.
  projectName: 'Young\'s blog', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Young.W',
      logo: {
        alt: 'Young.W Logo',
        src: 'img/logo.png',
      },
      links: [
        {
          to: 'docs/string',
          activeBasePath: 'docs',
          label: '专栏',
          position: 'left',
        },
        {to: '/', label: '博客', position: 'left'},
        {
          href: 'https://github.com/wwwyyying',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      // links: [
      //   {
      //     title: 'Docs',
      //     items: [
      //       {
      //         label: 'Style Guide',
      //         to: 'docs/doc1',
      //       },
      //       {
      //         label: 'Second Doc',
      //         to: 'docs/doc2',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Community',
      //     items: [
      //       {
      //         label: 'Stack Overflow',
      //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //       },
      //       {
      //         label: 'Discord',
      //         href: 'https://discordapp.com/invite/docusaurus',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Social',
      //     items: [
      //       {
      //         label: 'Blog',
      //         to: 'blog',
      //       },
      //       {
      //         label: 'GitHub',
      //         href: 'https://github.com/wwwyyying',
      //       },
      //       {
      //         label:'Weibo'
      //       }
      //       // {
      //       //   label: 'Twitter',
      //       //   href: 'https://twitter.com/docusaurus',
      //       // },
      //     ],
      //   },
      // ],
      copyright: `Copyright © ${new Date().getFullYear()} Young's Blog Built with Docusaurus.`,
      icp:"冀ICP备20006774号-1",
      netSecurity:"冀公网安备13060602001230号",
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog:{
          path:"./blog",
          routeBasePath:"/"
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
