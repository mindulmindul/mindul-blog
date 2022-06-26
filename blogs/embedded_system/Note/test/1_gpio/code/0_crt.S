@使用c语言程序时，需要使用本初始化程序
.text
.global _start
_start:
    ldr r0,=0x53000000      @WATCHDOG寄存器地址
    mov r1,#0x0
    str r1,[r0]             @关闭看门狗，防止重启CPU

    ldr sp,=1024*4          @sram只有4k，所以不能超过4k。

    bl main                 @调用main函数（bl指令，隐藏着pc->lr）

halt_loop:
    b halt_loop
