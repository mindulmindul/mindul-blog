module.exports = [
    { text: "首页", link: "/", icon: "reco-home" },

    {
      text: "嵌入式",
      items: [
        { text: "【韦东山S3C2440】环境搭建", link: "/embedded_system/Note/0_prepare/" },
        { text: "【韦东山S3C2440】工具手册", link: "/embedded_system/Note/1_toolsmanual/" },
        { text: "【韦东山S3C2440】中断简介", link: "/embedded_system/Note/2_int/" },
        { text: "【韦东山S3C2440】实验", link: "/embedded_system/Note/test/" },
      ],
      icon: "reco-category",
    },

    {
      text: "Linux内核",
      items: [
        { text: "【linux内核】进程管理", link: "/linux_kernel/1.process_management/" },
        { text: "【linux内核】内存管理", link: "/linux_kernel/2.memory_management/" },
        { text: "【linux内核】VFS", link: "/linux_kernel/3.VFS/" },
        { text: "【linux内核】设备驱动", link: "/linux_kernel/4.device_driver/" },
        { text: "【linux内核】网络管理", link: "/linux_kernel/5.net/" },
      ],
      icon: "reco-category",
  },

    { text: '标签', link: '/tag/', icon: 'reco-tag' },

    // {
    //   // 合并
    //   text: "其他",
    //   items: [
    //     {
    //       text: "Notion",
    //       link: "https://kim-yang.notion.site/Hello-Friends-0a69a2a346b34495af88a108cb99c1a9",
    //       icon: "reco-home",
    //     },
    //   ],
    //   icon: "reco-category",
    // },
    // { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
    // { text: 'RSS', link: 'https://kimyang.cn/rss.xml', icon: 'reco-rss' },
  ];
  