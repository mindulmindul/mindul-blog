#define GPFCON (*(volatile unsigned long *)0x56000050)
#define GPFDAT (*(volatile unsigned long *)0x56000054)

int main(void)
{
    GPFCON = 0x00001100;
    GPFDAT = 0x00000000;
    return 0;
}
