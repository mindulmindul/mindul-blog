/*
file:nand.c
author: mindul
date: 2019/6/8
comment: 用来对nand flash进行初始化，并从nand flash读取数据。只兼容S3C2440，S3C2410请看/code/4_nand/nand.c。
*/

#define NAND_SECTOR_SIZE_LP 2048
#define NAND_BLOCK_MASK_LP (NAND_SECTOR_SIZE_LP  - 1)

void nand_init(void);
void nand_read();


static void nand_reset(void);
static void wait_idle(void);
static void nand_select_chip(void);
static void nand_deselect_chip(void);
static void write_cmd(int cmd);
static void write_addr(unsigned int addr);
static unsigned char read_data(void);


//NAND FLASH访问时需要写的寄存器。寄存器地址间隔为4
typedef unsigned int S3C24X0_REG32;

typedef struct{
    S3C24X0_REG32 NFCONF;       //配置
    S3C24X0_REG32 NFCONT;       //控制
    S3C24X0_REG32 NFCMD;        //指令
    S3C24X0_REG32 NFADDR;       //地址
    S3C24X0_REG32 NFDATA;       //数据

    S3C24X0_REG32 NFMECCD0;     //主区域ECC0/1
    S3C24X0_REG32 NFMECCD1;     //主区域ECC2/3
    S3C24X0_REG32 NFSECCD;      //空闲区域ECC
    S3C24X0_REG32 NFSTAT;       //运行状态
    S3C24X0_REG32 NFESTAT0;     //I/O[7:0]ECC状态
    S3C24X0_REG32 NFESTAT1;     //I/O[15:8]ECC状态
    S3C24X0_REG32 NFMECC0;      //主区域ECC0状态
    S3C24X0_REG32 NFMECC1;      //主区域ECC1状态
    S3C24X0_REG32 NFSECC;       //空闲区域ECC状态
    S3C24X0_REG32 NFSBLK;       //开始块地址
    S3C24X0_REG32 NFEBLK;       //结束块地址
}S3C24X0_NAND;

static S3C24X0_NAND *s3c2440_nand = (S3C24X0_NAND*) 0x4E000000;


static void nand_select_chip(void)
{
    int i;
    s3c2440_nand->NFCONT &= ~(1<<1);
    for(i=0;i<10;i++);
}

static void nand_deselect_chip(void)
{
    s3c2440_nand->NFCONT |= (1<<1);
}

//等待nand flash进入就绪状态
static void wait_idle(void)
{
    #define BUSY 1
    int i;
    volatile unsigned char *p = (volatile unsigned char *)&s3c2440_nand->NFSTAT;
    while(!(*p & BUSY))
        for(i=0;i<10;i++);
}

static void write_cmd(int cmd)
{
    volatile unsigned char *p = (volatile unsigned char*)&s3c2440_nand->NFCMD;
    *p = cmd;
}
//我们使用的是大页的NAND FLASH
//所以这里需要大页形式的写地址方法


void write_addr(unsigned int addr)
{
    int i;
    volatile unsigned char *p = (volatile unsigned char*)&s3c2440_nand->NFADDR;
    int col, page;

    col = addr & NAND_BLOCK_MASK_LP;        //page页的第几列
    page = addr / NAND_SECTOR_SIZE_LP;      //页数

    *p = col & 0xff;
    for(i=0;i<10;i++);
    *p = (col >> 8) & 0xff;
    for(i=0;i<10;i++);
    *p = page & 0xff;
    for(i=0;i<10;i++);
    *p = (page>>8) & 0xff;
    for(i=0;i<10;i++);
    *p = (page>>16) & 0x03;
    for(i=0;i<10;i++);
}

unsigned char read_data(void)
{
    volatile unsigned char * p = (volatile unsigned char *)&s3c2440_nand->NFDATA;
    return *p;
}

void nand_reset(void)
{
    nand_select_chip();
    write_cmd(0xff);
    wait_idle();
    nand_deselect_chip();
}

void nand_init(void)
{
    #define TACLS 0
    #define TWRPH0 3
    #define TWRPH1 0

    //只使用S3C2440

    s3c2440_nand->NFCONF = (TACLS << 12) | (TWRPH0 << 8) | (TWRPH1 << 4);
    s3c2440_nand->NFCONT = (1 << 4) | (1<<1) | (1<<0);
    nand_reset();
}

void nand_read(unsigned char*buf, unsigned long start_addr, int size)
{
    int i, j;
    //地址或长度不对齐，退出
    if((start_addr & NAND_BLOCK_MASK_LP) || (size & NAND_BLOCK_MASK_LP))
        return ;

    nand_select_chip();

    for(i=start_addr; i < (start_addr + size);){
        //READ0命令
        write_cmd(0x00);
        //WriteAddress
        write_addr(i);

        write_cmd(0x30);
        wait_idle();
        for(j=0;j<NAND_SECTOR_SIZE_LP;j++, i++){
            *buf = read_data();
            buf++;
        }
    }

    nand_deselect_chip();

    return ;
}