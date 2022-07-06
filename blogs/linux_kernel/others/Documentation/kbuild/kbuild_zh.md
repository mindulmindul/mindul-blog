输出文件

#### modules.order
该文件记录模块在Makefiles中的显示顺序。modprobe使用它来准确地解析匹配多个模块的别名。

#### modules.builtin
这个文件列出了所有构建到内核中的模块，被modprobe用来保证在载入builtin模块时不会出错。

### Environment variables 环境变量
环境变量|功能
-|-
KCPPFLAGS       |   【C和汇编文件的预处理】预处理时要使用的额外配置。
KAFALGS         |   【built-in和模块】汇编器的额外配置
AFLAGS_MODULE   |   【模块专用】$(AS)要使用的额外配置
AFLAGS_KERNEL   |   【builtin专用】$(AS)要使用的额外配置
KCFALGS         |   【builtin与模块】C编译器要使用的额外配置
CFLAGS_KERNEL   |   【builtin专用】$(CC)要使用的额外配置
CFLAGS_MODULE   |   【模块专用】$(CC)要使用的额外配置
LDFLAGS_MODULE  |   $(LD)链接模块时要使用的配置
LDFLAGS_vmlinux |   链接vmlinux时要使用的配置


### KBUILD_VERBOSE
kbuild的日志详细程度配置（V=...）

### KBUILD_EXTMOD 
设置构建模块时要查询的内核源码目录，这个目录可以通过以下几种方式指定，优先级从高到低：
1. 在make命令中使用```M=...```
2. 环境变量```KBUTMOD```
3. 环境变量```SUBDIRS```

### KBUILD_OUTPUT 
构建内核时的输出目录。输出目录也可以通过两种途径指定，优先级从高到低：
1. ```O=...```来指定
2. KBUILD_OUTPUT

### KBUILD_DEBARCH
看en版

### ARCH
指定目标架构。多数情况下，架构的名字与arch/下的目录名字相同。但是像**x86**这样的架构有别名。```i386```代表32bit x86；```x86_64```代表64bit的x86。

### CROSS_COMPILE 
指定binutils文件名的可选固定部分。```CROSS_COMPILE```可以作为文件名或全路径的一部分。在某些设置中，```CROSS_COMPILE```也用于ccache。

### CF            
稀疏位配置，用法如```make CF=-Wbitwise C=2```

### INSTALL_PATH  
```INSTALL_PATH```用来指定内核和系统映射镜像的安装位置，默认为/boot

### INSTALLKERNEL 
当使用```make install```时要调用的脚本，默认为```make install```。
该脚本在被调用时，会带上如下参数：
1. $1 - kernel version
2. $2 - kernel image file
3. $3 - kernel map file
4. $4 - default install path (use root directory if blank)

```make install```的实现是架构特定的，可能与上述不同

### MODLIB
指定安装模块的位置，默认为```$(INSTALL_MOD_PATH)/lib/modules/$(KERNELRELEASE)```，该值可以通过变量覆盖

### INSTALL_MOD_PATH

