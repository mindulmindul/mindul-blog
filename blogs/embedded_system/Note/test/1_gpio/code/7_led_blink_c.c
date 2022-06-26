#define GPFCON (*(volatile unsigned long *)0x56000050)
#define GPFDAT (*(volatile unsigned long *)0x56000054)

#define GPF4_out (1<<(4*2))
#define GPF5_out (1<<(5*2))

#define GPF4_mask (3<<(4*2))
#define GPF5_mask (3<<(5*2))
void delay(){
    int i,j;
    for(i=0;i<1000;i++)
        for(j=0;j<125;j++);
}
int main(void)
{
    int kg=0;
    GPFCON &= ~(GPF4_mask | GPF5_mask);
    GPFCON |= (GPF4_out | GPF5_out);
        
    while(1)
    {
        if(kg==0){
            kg=1;
            GPFDAT &= ~(1<<4);
            GPFDAT |= (1<<5);
        }else{
            kg=0;
            GPFDAT &= ~(1<<5);
            GPFDAT |= (1<<4);
        }
        delay();
    }
    return 0;
}