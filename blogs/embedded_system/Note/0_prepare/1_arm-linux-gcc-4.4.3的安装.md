---
title: '【S3C2440环境搭建】arm-linux-gcc-4.4.3的安装'
categories: [嵌入式]
tags: [S3C2440]
date: 2022-06-26
---
> 1.需要注意的是，s3c2440的开发板最好使用arm-linux-gcc的4.4.3版本，我试过使用5.7.0和更高版本编译，结果并不能正常运行。（时隔几日之后，我发现在wsl上安装4.4.3版本后，仍然不能使用，这是个大坑）
> 
> 2.通过这个问题的解决，我发现在centos6.5上使用arm-linux-gcc-4.4.3时，并没有出现如上的问题。可能centos6.5本身也就支持32位的库（这个我回头再看吧），其实也就是说所有的问题都是因为对32位库的支持问题造成的。
> 3如果想要避免本文中的所有的问题，可以通过使用较低版本的ubuntu，如ubuntu12，ubuntu14。

# 1.获取安装包

arm-linux-gcc-4.4.3安装包 

链接：https://pan.baidu.com/s/1andA7fE2utbZmsclqgTvKQ 
>提取码：oqs6 

# 2.bug解决
## a. .arm-none-linux-gnueabi-gcc:not found

![](./pic/error1.png)

百度之后，Ubuntu使用的库都是64位的，解决方法是安装32位的支持库。
``` shell
sudo apt-get install libc6-i686
#或者也可以安装ia32-libs
sudo apt-get install ia32-libs
#如果ubuntu不支持这个软件包，安装lib32ncurses5, lib32z1
sudo apt-get install lib32ncurses5 lib32z1
```
这样就可以了。

## b. error while loading shared libraries: libxxx.so.xxx not found 
![](./pic/error2.png)
这个问题的具体原因也是因为ia32-libs被废弃了，因而导致没有32位的lib库。
``` shell
sudo apt-get install lib32stdc++6
sudo apt-get install lib32z1
```
接着再尝试编译

![](./pic/make_ok.png)

可以看到编译成功。