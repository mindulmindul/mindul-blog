#include "s3c2440.h"


/*
 * LED1,LED2,LED4对应GPF4、GPF5、GPF6
 */
#define	GPF4_out	(0b01<<(4*2))
#define	GPF5_out	(0b01<<(5*2))
#define	GPF6_out	(0b01<<(6*2))

#define	GPF4_msk	(0b11<<(4*2))
#define	GPF5_msk	(0b11<<(5*2))
#define	GPF6_msk	(0b11<<(6*2))

/*
 * S2,S3,S4对应GPF0、GPF2、GPG3
 */
#define GPF0_eint     (0b10<<(0*2))
#define GPF2_eint     (0b10<<(2*2))
#define GPG3_eint     (0b10<<(3*2))

#define GPF0_msk    (0b11<<(0*2))
#define GPF2_msk    (0b11<<(2*2))
#define GPG3_msk    (0b11<<(3*2))

/*
 * 关闭WATCHDOG，否则CPU会不断重启
 */
void disable_watch_dog(void)
{
    WTCON = 0;  // 关闭WATCHDOG很简单，往这个寄存器写0即可
}

void init_led(void)
{
    // LED1,LED2,LED4对应的3根引脚设为输出
    GPFCON &= ~(GPF4_msk | GPF5_msk | GPF6_msk);
    GPFCON |= GPF4_out | GPF5_out | GPF6_out;
}

/*
 * 初始化GPIO引脚为外部中断
 * GPIO引脚用作外部中断时，默认为低电平触发、IRQ方式(不用设置INTMOD)
 */ 
void init_irq()     //本节重点
{
    //设置KEY1, KEY2, KEY3为中断引脚 EINT0, EINT2, EINT11
    GPFCON &= ~(GPF0_msk | GPF2_msk);
    GPFCON |= (GPF0_eint | GPF2_eint);

    GPGCON &= ~GPG3_msk;
    GPGCON |= (GPG3_eint);

    //对于EINT11, 需要在EINTMASK寄存器中使能它
    EINTMASK &= ~(1<<11);

    /*
    * 设定优先级：
    * ARB_SEL0 = 00B, ARB_MODE0 = 0: REQ1 > REQ3, 即EINT0 > EINT2
    * 仲裁器1、6无需设置
    * 最终：
    * EINT0 > EINT2 > EINT11 即 KEY1 > KEY2 > KEY3
     */
    PRIORITY = (PRIORITY & ((~0x01) | (0x3<<7) )) | (0x0<<7);

    // EINT0、EINT2、EINT8_23使能
    INTMSK &= (~(1<<0)) & (~(1<<2)) & (~(1<<5));
}
