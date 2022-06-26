# 1. head.S文件解释

## 1.1 中断向量表
S3C2440上电复位后，PC寄存器的值为```0x0```，即程序会从```0x0```地址处开始执行。

而依据文章[ARM中的异常中断处理](../../Note/2_int/2_ARM中的异常中断处理.md)中第2章所述，程序的存储地址的最低端应该存放中断向量表。而0x0处即为复位程序的跳转指令。
```ARM
2. .text
3. .global _start
4. _start:
5.     b Reset     @第一条指令（地址为0x0)跳转到复位程序
```
随后的地址，依据中断向量表的规则，应该分别为不同的CPU模式提供相应的服务程序跳转指令。但是本程序仅涉及到为IRQ中断源提供服务，即只会有IRQ模式。
```ARM
6.  HandleUndef:
7.      b HandleUndef
8.
9.  HandleSWI:
10.     b HandleSWI
11.
12. HandlePrefetchAbort:
13.     b HandlePrefetchAbort
14.
15. HandleDataAbort:
16.     b HandleDataAbort
17. 
18. HandleNotUsed:
19.     b HandleNotUsed
20.
21. @本示例只使用中断IRQ，这里跳到HandleIRQ处执行
22.     b HandleIRQ
23.
24. HandleFIQ:
25.     b HandleFIQ
```

中断向量表现在就已经填完了。接下来，我们需要完成Reset和HandleIRQ过程。

## 1.2 复位处理
中断向量表第一条指令```b Reset```，使程序跳转到Reset子过程去执行。可以说Reset就是我们开机后运行的第一个子过程。Reset子过程做好所有需要它做的准备工作，随后跳转到main函数执行我们的功能。（有点像bootloader，将操作系统载入并跳转执行操作系统的指令）。


首先需要明确，我们的多数功能是使用**C语言**完成的，这就**需要设置好栈**。

复位程序的第一个任务，是关闭看门狗。

```ARM
26. Reset:
27.     ldr sp, =4096           //因为SRAM的大小一共就是4KB
28.     bl disable_watch_dog    //disable_watch_dog完成关闭看门狗的功能。
```

复位程序还需要做好所有的准备工作，中断服务程序```HandleIRQ```是使用C语言完成的，需要先进入中断模式设置栈（不同模式栈寄存器不同，所以需要先切换模式）。

```ARM
29.     msr cpsr_c, #0xd2
30.     ldr sp, =3072
```

接下来再返回到管理模式

```ARM
31.     msr cpsr_c, #0xd3
```

接下来需要对LED和外部中断进行初始化。LED初始化函数，外部中断初始化函数是用C语言完成的，需要设置栈。第一个任务用4096做栈底，现在已经废弃了，我们可以重新使用。

```ARM
32.     ldr sp, =4096
33.     bl init_led
34.     bl init_irq
```

我们可以让main函数什么都不做，等待中断源信号，然后执行中断服务程序。但是一定要记住，**IRQ中断一开始是不被允许的**。我们需要使能IRQ中断，这需要修改PSR寄存器的内容。接着，因为调用main函数时，并没有使用bl指令，所以需要手动为LR寄存器赋返回地址（尽管main函数永远不会结束）。

```ARM
35.     msr cpsr_c, #0x53
36.     ldr lr, =halt_loop
37.     ldr pc, =main
38. halt_loop:
39.     b halt_loop
```

以上就是所有Reset函数需要做的事情，也是程序的主程。接下来分析Reset函数调用到的函数以及IRQ服务程序（中断函数并不在程序的主程之内）。

# 2. init.c 所有的初始化工作
初始化工作，会用到很多寄存器。我们最好使用宏代替寄存器地址。在[s3c2440.h](./code/s3c2440.h)中完成这个任务。
## 2.1 关闭看门狗
只要向看门狗控制寄存器中写0即可关闭关门狗。
```C
void disable_watch_dog(void) 
{
    WTCON=0;
}
```

## 2.1 初始化led
在实验一的GPIO实验中，已经说过如何将led的GPIO针脚设置为```OUTPUT```模式。不过我们以后还是要考虑在更改```GPFCON```寄存器相关的针脚控制位时，不影响到其他的针脚控制位。
```C
#define GPF4_out (0b01<<(4*2))
#define GPF5_out (0b01<<(5*2))
#define GPF6_out (0b01<<(6*2))

#define GPF4_mask (0b11<<(4*2))
#define GPF5_mask (0b11<<(5*2))
#define GPF6_mask (0b11<<(6*2))

void init_led(void)
{
    GPFCON &= ~(GPF4_mask | GPF5_mask | GPF6_mask);     //GPF456的控制位置0
    GPFCON |= (GPF4_out | GPF5_out | GPF6_out);         //按位或来置位
}
```

## 2.2 初始化外部中断
实验一的GPIO实验中，使用的是GPF0、GPF2、GPG3的```INPUT```模式。现在我们要用外部中断的方法来使用这三个引脚，需要设置三个引脚的功能为```EINT```模式。

通过[S3C2440的中断管理过程](./1_S3C2440的中断管理过程.md)知道，首先需要设置寄存器```SUBSRCMASK```和```SRCMASK```来避免EINT中断被屏蔽。其次需要通过设置寄存器```INTMODE```和```PRIORITY```来设置其中断模式和三个EINT的优先级。

-++++++++++++++++++++++++++++++++
另外通过[外部中断EINT管理过程]（./2_外部中断EINT管理过程.md）。
-++++++++++++++++++++++++++++++++


```C
#define GPF0_eint (0b10<<(0*2))
#define GPF2_eint (0b10<<(2*2))
#define GPG3_eint (0B10<<(3*2))

#define GPF0_mask (0b11<<(0*2))
#define GPF2_mask (0b11<<(2*2))
#define GPG3_mask (0b11<<(3*2))

void init_irq(void)
{
    GPFCON &= ~(GPF0_mask | GPF2_mask );
    GPGCON &= ~(GPG3_mask);
    GPFCON |= (GPF0_eint | GPF2_eint);      //GPF02都设置为eint模式，分别为EINT0和EINT2
    GPGCON |= (GPG3_eint);                  //GPG3设置为eint模式，为EINT11

    //设置屏蔽，取消对EINT0/EINT2/EINT8~23的屏蔽
    INTMSK &= (~(1<<0)) & (~(1<<2)) & (~(1<<5));

    //设置优先级，让优先级EINT0 > EINT2 > EINT11，即KEY1 > KEY2 > KEY3
    PRIORITY = (PRIORITY & ((~0x01) | (0x3<<7) )) | (0x0<<7);

    //设置模式， 默认为IRQ模式，所以不需要了。

    //设置EINT的屏蔽
    //EINT0和EINT2不需要解除屏蔽，但EINT11是默认被屏蔽的，需要解除（将EINTMASK中的第11位置0即可）。
    EINTMASK &= ~(1<<11);
}
```

## 2.3 main.c 
```C
void main(void)
{
    while(1);
}
```
本程序的main.c中只是一个死循环，没有其他的功能。

以上便是所有的初始化工作。接下来介绍中断服务程序（中断处理函数）

# 3.中断服务程序
依据[ARM中的异常中断处理](../../Note/2_int/2_ARM中的异常中断处理.md)，当IRQ中断发生时，处理器自动执行的动作如下：
```sh
R14_irq = address of next instruction to be executed + 4
SPSR_irq = CPSR
#进入IRQ异常中断模式
CPSR[4:0] = 0b10010
#切换到ARM状态
CPSR[5] = 0
#CPSR[6]不改变
#禁止IRQ中断
CPSR[7] = 1
if high vectors configured then
    PC = 0xFFFF0018             #中断向量
else
    PC = 0x00000018
fi
```
另外还可以知道，我们需要在中断返回时，需要做的动作如下（更多细节，自行查看该文件)：

```ARM
SUBS LR, LR, #4
STMFD SP!, {reglist, LR}
;...
LDMFD SP!, {reglist, PC}^
```

所以我们的HandleIRQ代码如下：
```ARM
HandleIRQ:
    sub lr, lr, #4              @计算返回地址
    stmdb sp!, { r0-r12,lr }    @寄存器入栈，本指令与STMFD一样
    ldr lr, =init_return        @设置返回地址
    ldr pc, =EINT_Handle        @调用中断服务函数，在interrupt.c中
init_return:
    ldmia sp!, { r0-r12,pc }^   @中断返回，寄存器出栈，^表示SPSR的值复制到cpsr，本指令功能与LDMFD一样
```

其中寄存器的保存与恢复功能是有arm汇编完成的，但真正中断服务程序要做的功能由C语言完成。

## 3.1 interrupt.c 中断服务程序主要功能
首先，我们需要查询当前是哪个外部中断请求，一个按键对应一个外部中断请求，点亮不同的灯。最后需要对中断挂起位进行清空，并且一定要注意顺序。
尽管挂起位为1时，表示该中断源有请求，但是清空时还是**写1清空**。

```C
#include "s3c2440.h"
void EINT_Handle(void)
{
    unsigned long oft = INTOFFSET;      //INTOFFSET只读寄存器
                                        //读取此寄存器，可以得到一个十进制数字
                                        //表示当前INTPND寄存器的哪一位为1（哪个中断正在被服务
    switch(oft)
    {
        case 0:                         //表示GPF0（EINT0)正在被服务
            GPFDAT |= 0b111<<4;             //先全灭
            GPFDAT &= ~(1<<4);          //让GPF4(LED0)亮
            break;
        case 2:
            GPFDAT |= 0b111<<4;
            GPFDAT &= ~(1<<5);
            break;
        case 5:                         //表示EINT11(EINT8~EINT23)
            GPFDAT |= 0b111<<4;
            GPFDAT &= ~(1<<6);
            break;
        default:                        //从中断屏蔽寄存器来看，没有其他类型的中断会发生
            break;            
    }

    //在为中断提供完服务后，应该清除中断挂起。
    //如果在服务之前清除挂起，则表明，我们是想要在为中断服务时，也仍能接受其他中断的中断请求


    //首先是外部中断挂起寄存器（EINT0/EINT2不需要，EINT11需要）
    if( oft == 5)
        EINTPEND = (1<<11);
    //必须先清除外部中断挂起再清除源中断挂起，最后是中断挂起。顺序不应该改变。
    SRCPND = 1 << oft;
    INTPND = 1 << oft;
}
```

以上是一个简单的IRQ中断服务的例子。
