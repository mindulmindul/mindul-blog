---
title: '5.2 使用gdb调试'
categories: [嵌入式]
tags: [S3C2440]
date: 2022-06-26
---

上一节是openocd_debug的使用方法，不过可以看到，如果单纯的要用openocd_debug来调试的话，查看源代码来设置断点的方法，还是挺麻烦的。gdb是很经典的命令行调试软件。

这里还是尽量全部都使用windows上的工具，先不依赖linux虚拟机。windows10上的gdb调试工具，可以使用yargato套件。yagarto(Yet another GUN ARM toolchain)是国外一个大神专门为windows平台整理的arm开发工具，其中包括一个arm-linux-gdb，（普通的gdb虽然也可以用，但是如果使用```i r```命令显示寄存器信息时，就会发现很搞笑的事情（r0变成了eax，也就是gdb还是把arm平台当成x86平台)。

