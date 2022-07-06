module.exports = {
    '/embedded_system/Note/': [
        {
            title: '开发环境准备',
            collapsable: true,
            children: [
                '/embedded_system/Note/0_prepare/1_arm-linux-gcc-4.4.3的安装.md',
                '/embedded_system/Note/0_prepare/2_B1_windows驱动安装问题.md',
                '/embedded_system/Note/0_prepare/2_oflash在windows和ubuntu上如何使用及驱动安装.md',
                '/embedded_system/Note/0_prepare/3_0_OpenJTag调试背后的机制.md',
                '/embedded_system/Note/0_prepare/3_1_ubuntu上编译安装openocd.md',
                '/embedded_system/Note/0_prepare/3_2_windows上使用openocd.md',
                '/embedded_system/Note/0_prepare/4_1_openocd_debug的使用方法.md',
                '/embedded_system/Note/0_prepare/5_1_ARM_DS5的安装和使用.md',
                '/embedded_system/Note/0_prepare/5_2_使用gdb调试.md',
                '/embedded_system/Note/0_prepare/5_3_mdk5.12的安装和使用.md',
            ]
        },

        {
            title: '工具手册',
            collapsable: true,
            children: [
                '/embedded_system/Note/1_toolsmanual/',
                '/embedded_system/Note/1_toolsmanual/0_gdb使用手册',
                '/embedded_system/Note/1_toolsmanual/1_makefile',
            ]
        },
    ],
    '/linux_kernel/': [
        {
            title: '基础知识',
            collapsable: true,
            children: [
                '/linux_kernel/0.basic_knowledge/',
                '/linux_kernel/0.basic_knowledge/1_Linux的宏内核的由来.md',
                '/linux_kernel/0.basic_knowledge/2_编译Linux内核的方法.md',
            ]
        },
        {
            title: '进程管理',
            collapsable: true,
            children: [
                '/linux_kernel/1.process_management/',
            ]
        },
        {
            title: '内存管理',
            collapsable: true,
            children: [
                '/linux_kernel/2.memory_management/',
            ]
        },
        {
            title: 'VFS',
            collapsable: true,
            children: [
                '/linux_kernel/3.VFS/',
            ]
        },
        {
            title: '设备驱动',
            collapsable: true,
            children: [
                '/linux_kernel/4.device_driver/',
            ]
        },
        {
            title: '网络',
            collapsable: true,
            children: [
                '/linux_kernel/5.net/',
            ]
        },
        {
            title: '其他',
            collapsable: true,
            children: [
                '/linux_kernel/others/Documentation/',
                '/linux_kernel/others/reference/',
            ]
        },
    ],
    '/Android/': [
        {
            title: 'rk3399学习',
            collapsable: true,
            children: [
                '/Android/rk3399/',
                '/Android/rk3399/0_hardware_burn/0_3399开发板链接、烧录与编译.md',
            ]
        },
        {
            title: '其他',
            collapsable: true,
            children: [
                '/Android/others/',
            ]
        },
    ]
}

    // sidrbar: {
//         '/note/': [
//           {
//             title: 'HTML5',
//             collapsable: true,
//             children: ['html5/HTML5的语义元素', 'html5/HTML5多媒体标签', 'html5/HTML5表单元素', 'html5/HTML5中的API', 'html5/Canvas']
//           },
//           {
//             title: 'CSS',
//             collapsable: true,
//             children: ['css/css3新特性', 'css/css3Flip']
//           },
//           {
//             title: 'JS',
//             collapsable: true,
//             children: ['js/js数据类型', 'js/js对象', 'js/js继承', 'js/js原型链、闭包', 'js/js函数的四种调用方式']
//           },
//           {
//             title: 'Vue.js',
//             collapsable: true,
//             children: ['Vue/Vue基础笔记', 'Vue/Vue组件']
//           },
//           {
//             title: '前端单元测试',
//             collapsable: true,
//             children: ['fe-unit-test/chai', 'fe-unit-test/mocha', 'fe-unit-test/vueTestUtils']
//           },
//           {
//             title: '微信小程序',
//             collapsable: true,
//             children: ['wechat-mini-program/初识微信小程序']
//           }
//         ]
//       },
//     '/embedded_system/Note/0_prepare/' : [
//         '1_arm-linux-gcc-4.4.3的安装',
//         '2_B1_windows驱动安装问题',
//         '2_oflash在windows和ubuntu上如何使用及驱动安装',
//         '3_0_OpenJTag调试背后的机制',
//         '3_1_ubuntu上编译安装openocd',
//         '3_2_windows上使用openocd',
//         '4_1_openocd_debug的使用方法',
//         '5_1_ARM_DS5的安装和使用',
//         '5_2_使用gdb调试',
//         '5_3_mdk5.12的安装和使用',
//     ]
// }
    // '/embedded_system/Note/': [
    //     {
    //         title: '开发环境准备',
    //         collapsable: false,
    //         children: [
    //             '0_prepare',
    //             '0_prepare/1_arm-linux-gcc-4.4.3的安装',
    //             '0_prepare/2_B1_windows驱动安装问题',
    //             '0_prepare/2_oflash在windows和ubuntu上如何使用及驱动安装',
    //             '0_prepare/3_0_OpenJTag调试背后的机制',
    //             '0_prepare/3_1_ubuntu上编译安装openocd',
    //             '0_prepare/3_2_windows上使用openocd',
    //             '0_prepare/4_1_openocd_debug的使用方法',
    //             '0_prepare/5_1_ARM_DS5的安装和使用',
    //             '0_prepare/5_2_使用gdb调试',
    //             '0_prepare/5_3_mdk5.12的安装和使用',
    //         ]
    //     },
    //     {
    //         title: '工具手册',
    //         collapsable: false,
    //         children: [
    //             '1_toolsmanual/',
    //             '1_toolsmanual/0_gdb使用手册',
    //             '1_toolsmanual/1_makefile',
    //         ]
    //     },
    //     {
    //         title: '中断介绍',
    //         collapsable: false,
    //         children: [
    //             '2_int/1_模式与状态',
    //             '2_int/2_ARM中的异常中断处理',
    //             '2_int/3_在应用程序中安排异常中断处理程序',
    //             '2_int/4_各中断类型的异常中断处理程序',
    //             '2_int/5_中断补充',
    //         ]
    //     },
    //     {
    //         title: '实验',
    //         collapsable: false,
    //         children: [
    //             'test/1_gpio/',
    //             'test/2_sdram/',
    //             'test/4_nand',
    //             'test/5_int'
    //         ]
    //     }
    // ],
// }