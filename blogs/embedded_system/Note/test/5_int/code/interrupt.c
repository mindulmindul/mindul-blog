#include"s3c2440.h"

void EINT_Handle()
{
    unsigned long oft = INTOFFSET;
    unsigned long val;

    switch ( oft )  //分辨中断并做相应处理
    {
        //key2被按下
        case 0:
            GPFDAT |= (0x7 << 4);       //所有LED熄灭
            GPFDAT &= ~(1<<4);          //led1点亮
            break; 
        
        case 2:
            GPFDAT |= (0x7 << 4);
            GPFDAT &= ~(1<<5);
            break;

        case 5:
            GPFDAT |= (0x7 << 4);
            GPFDAT &= ~(1<<6);
            break;
        default:
            break;
    }

    if( oft == 5)
        EINTPEND = (1<<11);
    SRCPND = 1 << oft;
    INTPND = 1 << oft;
}
