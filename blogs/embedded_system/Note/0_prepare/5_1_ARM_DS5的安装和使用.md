---
title: '【S3C2440环境搭建】5.1 ARM_DS5的安装和使用'
categories: [嵌入式]
tags: [S3C2440]
date: 2022-06-26
---

ARM_DS5的安装包及破解文件
windows版（含有破解软件）：

    链接：https://pan.baidu.com/s/1am4kFRFOP7hrVRAy7plefg  提取码：ldvo 


linux版（无破解）：

    链接：https://pan.baidu.com/s/1JLkdlgRa2oD5TDzHXvJm9w  提取码：ngic


安装方法 https://blog.csdn.net/wang3375/article/details/85224657

windows版破解patch.exe的使用方法：

1. Windows(x86_64)

STEP A:  打补丁
```cmd
$ patcher.exe --dir ?:\DS5_PATH -c
//例如
$ patcher.exe  --dir  "C:\AppData\DS5"   -c
```



STEP B: 生成license.dat文件
```cmd
$patcher.exe --license=ARM_DS_5 [LicensePath] 
//例如
$patcher.exe --license=ARM_DS_5 "C:\AppData\DS5"
```

STEP C: 添加证书

    Run DS-5, from Help menu -> ARM License Manager...

    Add License... 
    
    use a license file

    select the file generated in Step B

    Select DS-5 Ultimate Edition as the toolkit you intend to use

