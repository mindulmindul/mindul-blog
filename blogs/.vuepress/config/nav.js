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
      text: "Andorid",
      items: [
        { text: "rk3399开发板学习", link: "/Android/rk3399/" },
        { text: "其他", link: "/Android/others/" },
      ],
      icon: "reco-category",
    },
    {
      text: "Linux内核",
      items: [
        { text: "基础知识", link: "/linux_kernel/0.basic_knowledge/" },
        { text: "进程管理", link: "/linux_kernel/1.process_management/" },
        { text: "内存管理", link: "/linux_kernel/2.memory_management/" },
        { text: "VFS", link: "/linux_kernel/3.VFS/" },
        { text: "设备驱动", link: "/linux_kernel/4.device_driver/" },
        { text: "网络管理", link: "/linux_kernel/5.net/" },
        { text: "其他", link: "/linux_kernel/others/" },
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
  