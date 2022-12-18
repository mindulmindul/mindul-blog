---
title: 'Kbuild系统中的特殊变量与函数'
categories: [【Linux内核】基础知识]
tags: [linux_kernel, kbuild]
date: 2022-07-18
---

# $(call if_changed, XXX)

在使用```call```调用```if_changed```这个函数时，```$1```就是```XXX```。此外由于```$(call if_changed,XXX)```是作为一个```rule```的```command```出现的，所以该```rule```的```target```就是```if_changed```函数中的```$@```。

定义如下：

```makefile
# <scripts/Kbuild.include>

# Execute command if command has changed or prerequisite(s) are updated.
#
if_changed = $(if $(strip $(any-prereq) $(arg-check)),                       \
	@set -e;                                                             \
	$(echo-cmd) $(cmd_$(1));                                             \
	printf '%s\n' 'cmd_$@ := $(make-cmd)' > $(dot-target).cmd, @:)

```

## $(any-prereq)

首先看PHONY

在```scripts/Makefile.build```中```PHONY```有如下声明：

```makefile
# <scripts/Kbuild.include>

# Declare the contents of the .PHONY variable as phony.  We keep that
# information in a variable se we can use it in if_changed and friends.

.PHONY: $(PHONY)
```

也就是说，```PHONY```变量的值所代表的目标，如果在```default target```的依赖链上，都会默认执行，这里称其为```PHONY依赖```。再看下边的定义

```makefile
# <scripts/Kbuild.include>

# Find any prerequisites that is newer than target or that does not exist.
# PHONY targets skipped in both cases.
any-prereq = $(filter-out $(PHONY),$?) $(filter-out $(PHONY) $(wildcard $^),$^)
```

其中``` $(filter-out $(PHONY),$?)```会剔除掉**较新的依赖中**所有的PHONY依赖，随后```$(filter-out $(PHONY) $(wildcard $^),$^)```借助[```wildcard```](https://blog.csdn.net/liangkaiming/article/details/6267357)，把**```$^```中已经存在的文件**从```$^```中拿出来剔除掉。

## $(arg-check)

```makefile
# <scripts/Kbuild.include>
empty   :=						   # :=后加上空格，empty也只是一个空值，必须用下边的方法给space赋值
space   := $(empty) $(empty)		# 这代表space是一个空格
space_escape := _-_SPACE_-_		

ifneq ($(KBUILD_NOCMDDEP),1)
# Check if both arguments are the same including their order. Result is empty
# string if equal. User may override this check using make KBUILD_NOCMDDEP=1
arg-check = $(filter-out $(subst $(space),$(space_escape),$(strip $(cmd_$@))), \		# 将cmd_XX中空白替换成_-_SPACE_-_
                         $(subst $(space),$(space_escape),$(strip $(cmd_$1))))
else
arg-check = $(if $(strip $(cmd_$@)),,1)
endif

```

如果执行```make```时没有带上```KBUILD_NOCMDDEP=1```，这个变量会把```cmd_$1```中的```cmd_$@```（此前会做一个简单的替换）剔除掉，如果两者相同，返回值为空；如果带上了，会首先判断当前是否有定义过```cmd_$@```变量，如果定义过，返回值为空值，否则返回1。不过既然这些命令一般都是能找到的。

综上，如果上边两个变量的值为空，```command```就是```@:```，也就是什么都不做，如果不为空，即代表有依赖需要更新或重新生成，会执行接下来的指令。



## $(echo-cmd)

```makefile
# <scripts/Kbuild.include>

# echo command.
# Short version is used, if $(quiet) equals `quiet_', otherwise full one.
echo-cmd = $(if $($(quiet)cmd_$(1)),\
	echo '  $(call escsq,$($(quiet)cmd_$(1)))$(echo-why)';)
```

在make有参数```V=1```时```$(quiet)```被设置为空，没有该参数，默认是```quiet_```，所以这里根据是否有```V=1```，会选择```quiet_cmd_$1```或者```cmd_$1```。

如果选择的命令存在，会调用```echo```打印```escsq```处理好的命令，```escsq```命令和```$(echo-why)```如下：

```makefile
# <scripts/Kbuild.include>

###
# why - tell why a a target got build
#       enabled by make V=2
#       Output (listed in the order they are checked):
#          (1) - due to target is PHONY
#          (2) - due to target missing
#          (3) - due to: file1.h file2.h
#          (4) - due to command line change
#          (5) - due to missing .cmd file
#          (6) - due to target not in $(targets)
# (1) PHONY targets are always build
# (2) No target, so we better build it
# (3) Prerequisite is newer than target
# (4) The command line stored in the file named dir/.target.cmd
#     differed from actual command line. This happens when compiler
#     options changes
# (5) No dir/.target.cmd file (used to store command line)
# (6) No dir/.target.cmd file and target not listed in $(targets)
#     This is a good hint that there is a bug in the kbuild file
ifeq ($(KBUILD_VERBOSE),2)
why =                                                                        \
    $(if $(filter $@, $(PHONY)),- due to target is PHONY,                    \
        $(if $(wildcard $@),                                                 \
            $(if $(strip $(any-prereq)),- due to: $(any-prereq),             \
                $(if $(arg-check),                                           \
                    $(if $(cmd_$@),- due to command line change,             \
                        $(if $(filter $@, $(targets)),                       \
                            - due to missing .cmd file,                      \
                            - due to $(notdir $@) not in $$(targets)         \
                         )                                                   \
                     )                                                       \
                 )                                                           \
             ),                                                              \
             - due to target missing                                         \
         )                                                                   \
     )

echo-why = $(call escsq, $(strip $(why)))
endif
# 不过由于我这里没有选择V=1或V=2，所以这里先不考虑
squote  := '
###
# Escape single quote for use in echo statements
escsq = $(subst $(squote),'\$(squote)',$1)
```

如果我只执行```make```，```$(echo-why)```就是空，随后将```$1```（也就是之前的```cmd_$1```或者```quiet_cmd_$1```）中的空白替换成字面上的```$(squote)```。

所以其实这个命令只是打印不同命令的详细或非详细表示，如下：

```make -j1 V=1 -n```时，链接生成```init/built-in.o```的命令如下：

![cmd_$1](..\pic\3\cmd.png)

执行```make -j1 -n```时，链接生成```init/built-in.o```的命令如下：

![image-20220718214447154](C:\Users\13521\WebstormProjects\vuepress-reco.github.io\blogs\linux_kernel\0.basic_knowledge\pic\3\quiet_cmd.png)

如果执行```make -j1 -n```时，链接生成```init/built-in.o```的命令如下：

![quiet_cmd_with_reason](..\pic\3\quiet_cmd_with_reason.png)

可见这个$(echo-cmd)只是会根据V的值来打印不同的内容。

## $(cmd_$(1))

这句话会直接将命令放在命令中，相当于当```V=1```时echo打印的命令。

![run_cmd_echo_cmd](..\pic\3\run_cmd_echo_cmd.png)

## $(make-cmd)

```makefile
# <Kbuild.include>

# Replace >$< with >$$< to preserve $ when reloading the .cmd file
# (needed for make)
# Replace >#< with >\#< to avoid starting a comment in the .cmd file
# (needed for make)
# Replace >'< with >'\''< to be able to enclose the whole string in '...'
# (needed for the shell)
make-cmd = $(call escsq,$(subst \#,\\\#,$(subst $$,$$$$,$(cmd_$(1)))))
```

根据注释，该变量是将```$(cmd_$(1))```中的```#```、```$$```和空白做了下替换而已。

## $(dot-target)

```makefile
###
# Name of target with a '.' as filename prefix. foo/bar.o => foo/.bar.o
dot-target = $(dir $@).$(notdir $@)
```

根据注释，该变量是把```$@```的文件名前加了“.”。

所以最后在echo了```cmd_$1```和执行了```cmd_$1```之后，会使用```printf```把```cmd_$1```再打印到文件```.$@.cmd```中。也就是，如果```$@```是```init/built-in.o```，则会在```init/.built-in.o.cmd```中保存```$(cmd_$(1))```，如下：

![if_changed_printf_cmd](..\pic\3\if_changed_printf_cmd.png)

