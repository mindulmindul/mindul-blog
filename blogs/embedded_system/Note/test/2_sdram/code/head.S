.equ            MEM_CTL_BASE,       0x48000000
.equ            SDRAM_BASE,         0x30000000

.text
.global _start
_start:
    bl          disable_watch_dog                @关闭看门狗
    bl          memsetup                         @设置存储控制器
    bl          copy_steppingstone_to_sdram      @复制代码到SDRAM中
    ldr         pc, =on_sdram                    @跳到SDRAM中继续执行
                    @所以需要把text段的首地址设置为0x30000000(使用ld -Ttext 0x30000000)

on_sdram:
    ldr         sp,=0x34000000                  @设置跳到SDRAM执行后的堆栈（如果使用c语言，就必须设定堆栈）
    bl          main

halt_loop:
    b           halt_loop 


disable_watch_dog:
    mov         r1,#0x53000000
    mov         r2,#0x0
    str         r2,[r1]
    mov         pc,lr    @返回调用函数

copy_steppingstone_to_sdram:            @复制stepping stone（只有4KB）到SDRAM上
    mov         r1,#0x0
    mov         r2,#SDRAM_BASE
    mov         r3,#1024*4
loop:
    ldr         r4,[r1],#4
    str         r4,[r2],#4
    cmp         r1,r3
    bne         loop

memsetup:                               @设置存储控制器以便使用SDRAM等外设
    mov r1,     #MEM_CTL_BASE
    adrl r2,    mem_cfg_val
    add r3,     r1,#52
loop2:
    ldr r4,[r2],#4
    str r4,[r1],#4
    cmp r1, r3

.align 4
mem_cfg_val:
    @存储控制器的13个寄存器的设置值
    .long   0x22011110      @ BWSCON
    .long   0x00000700      @ BANKCON0
    .long   0x00000700      @ BANKCON1
    .long   0x00000700      @ BANKCON2
    .long   0x00000700      @ BANKCON3  
    .long   0x00000700      @ BANKCON4
    .long   0x00000700      @ BANKCON5
    .long   0x00018005      @ BANKCON6
    .long   0x00018005      @ BANKCON7
    .long   0x008C07A3      @ REFRESH
    .long   0x000000B1      @ BANKSIZE
    .long   0x00000030      @ MRSRB6
    .long   0x00000030      @ MRSRB7