//const themeReco = require("./config/theme_reco.js");
const plugins = require("./config/plugins");
const side_bar = require("./config/side_bar.js");
console.log(side_bar);
const locales = require('./config/locale.js');
const nav = require("./config/nav.js");

module.exports = {
    title: "绍威的blog",
    description: "曾梦想仗剑走天涯，后来bug多没去",
    port: 2233,
    head: [
        // 在移动端，搜索框在获得焦点时会放大，并且在失去焦点后可以左右滚动，这可以通过设置元来优化。
        ["meta", {name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no"}],
        ["link", { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }],
        ["link", { rel: " short icon", href: "/favicon.ico", type: "image/x-icon" }],
        ['meta', { name: 'author', content: 'wsw' }],
    ],
    // 头像
    authorAvatar: '/avatar.jpg',
    // 主题与主题配置
    theme: 'reco',
    themeConfig: {
        startYear: 2022,
        logo: "/favicon.ico",
        type: 'blog',
        author: '王绍威',
        authorAvatar: "/avatar.jpg",
        // 假如文档不是放在仓库的根目录下：
        docsDir: "blogs",
        // 假如文档放在一个特定的分支下：
        docsBranch: "master",
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: "发现错误？",
        //在所有页面中启用自动生成子侧边栏（右边的小目录），原 sidebar 仍然兼容
        subSidebar: "auto",
        // 博客配置
        blogConfig: {

            // 这个category只有在文章开头的yaml中配置了如  categories: [开发环境准备]    才会显示到页面上
            category: {
                location: 2,     // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认文案 “分类”
            },

            socialLinks: [       // 信息栏展示社交账号
                { link: "mailto:mindul@qq.com", icon: "reco-mail" },
                { link: "https://github.com/mindulmindul", icon: "reco-github" },
                // { link: 'https://me.csdn.net/weixin_43316691', icon: 'reco-csdn' },
              ],

        },
        // 博客评论的配置  #这个先不急，参考
        //https://vuepress-theme-reco.recoluan.com/views/1.x/valine.html
        //https://valine.js.org/configuration.html
        // valineConfig: {
        //     appId: '...',// your appId
        //     appKey: '...', // your appKey
        // }
        
        noFoundPageByTencent: false, // 腾讯公益
        // 主题模式 auto dark light
        mode: 'auto',
        // 主题选择按钮
        modePicker: true,
        //side_bar,
        sidebar: side_bar,
        // {
        //     '/embedded_system/Note/0_prepare/': [
        //         {
        //             title: '开发环境准备',
        //             collapsable: true,
        //             children: [
        //                 '',
        //                 '/embedded_system/Note/0_prepare/1_arm-linux-gcc-4.4.3的安装.md',
        //                 '/embedded_system/Note/0_prepare/2_B1_windows驱动安装问题.md',
        //                 '/embedded_system/Note/0_prepare/2_oflash在windows和ubuntu上如何使用及驱动安装.md',
        //                 '/embedded_system/Note/0_prepare/3_0_OpenJTag调试背后的机制.md',
        //                 '/embedded_system/Note/0_prepare/3_1_ubuntu上编译安装openocd.md',
        //                 '/embedded_system/Note/0_prepare/3_2_windows上使用openocd.md',
        //                 '/embedded_system/Note/0_prepare/4_1_openocd_debug的使用方法.md',
        //                 '/embedded_system/Note/0_prepare/5_1_ARM_DS5的安装和使用.md',
        //                 '/embedded_system/Note/0_prepare/5_2_使用gdb调试.md',
        //                 '/embedded_system/Note/0_prepare/5_3_mdk5.12的安装和使用.md',
        //             ]
        //         },
        //     ],
    
        // },
        nav,
        
        locales,
    },
    plugins,
}
