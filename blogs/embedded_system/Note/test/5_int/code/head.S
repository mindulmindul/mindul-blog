.extern main
.text
.global _start
_start:

@处理器复位后，跳到0x0执行，在reset中执行初始化动作
    b Reset

@本示例中没有使用到的中断类型的中断向量处，都是一条死循环指令，代表无任何操作
HandleUndef:
    b HandleUndef

HandleSWI:
    b HandleSWI

HandlePrefetchAbort:
    b HandlePrefetchAbort

HandleDataAbort:
    b HandleDataAbort

HandleNotUsed:
    b HandleNotUsed

@本示例只是用中断IRQ，这里跳到HandleIRQ处执行
    b HandleIRQ

HandleFIQ:
    b HandleFIQ

Reset:
    ldr sp, =4096
    bl disable_watch_dog

    @CPU在不同模式时（模式有CPSR寄存器的M[5:0]来决定，有不同的LR和SP指针，这里预先设置好栈指针
    msr cpsr_c, #0xd2   @进入中断模式
    ldr sp, =3072       @设置中断模式栈指针

    msr cpsr_c, #0xd3   @进入管理模式
    ldr sp,=4096        @设置管理模式栈指针

    bl init_led         @初始化LED的GPIO管脚
    bl init_irq         @调用中断初始化函数
    msr cpsr_c, #0x53   @设置I-bit=0， 开IRQ中断

    ldr lr, =halt_loop  @设置返回地址，因为我们使用的不是bl命令
    ldr pc, =main       @调用main函数，main()实际上是一个死循环
                        @中断其实就是中断这个死循环，处理完再返回这个死循环

halt_loop:
    b halt_loop

HandleIRQ:
    sub lr, lr, #4              @计算返回地址
    stmdb sp!, { r0-r12,lr }    @寄存器入栈
    ldr lr, =init_return        @设置返回地址
    ldr pc, =EINT_Handle        @调用中断服务函数，在interrupt.c中
init_return:
    ldmia sp!, { r0-r12,pc }^   @中断返回，寄存器出栈，^表示SPSR的值复制到cpsr


