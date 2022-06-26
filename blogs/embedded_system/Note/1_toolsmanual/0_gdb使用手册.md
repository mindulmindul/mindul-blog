---
title: '【工具手册】gdb的使用'
categories: [嵌入式]
tags: [S3C2440, tools]
date: 2022-06-27
---
# 0_gdb使用手册
### 简介
GDB（GNU Debugger）是GCC的调试工具。它主要帮忙你完成下面四个方面的功能：

    1.启动你的程序，可以按照你的自定义的要求随心所欲的运行程序。 

    2.可让被调试的程序在你所指定的调置的断点处停住。（断点可以是条件表达式） 

    3.当程序被停住时，可以检查此时你的程序中所发生的事。

    4.动态的改变你程序的执行环境。

## 1.基础用法
### 1.生成调试信息
一般来说GDB主要调试的是C/C++的程序。要调试C/C++的程序，首先在编译时，我们必须要把调试信息加到可执行文件中。使用编译器（cc/gcc/g++）的 -g 参数可以做到这一点。如：

```bash
gcc -g hello.c -o hello
g++ -g hello.cpp -o hello
```

### 2.gdb的三种启动方法
```
gdb program
```
program 也就是你的执行文件，一般在当前目录下。
```
gdb program core
```
用gdb同时调试一个运行程序和core文件，core是程序非法执行后core dump后产生的文件。
```
gdb program PID
```
如果你的程序是一个服务程序，那么你可以指定这个服务程序运行时的进程ID。gdb会自动attach上去，并调试他。program应该在PATH环境变量中搜索得到。

### 3.以下是使用gdb-arm-linux时使用的gdb.init文件
```
target remote localhost:3333
monitor halt
monitor arm920t cp15 2 0
monitor step
load
break start 
continue
```