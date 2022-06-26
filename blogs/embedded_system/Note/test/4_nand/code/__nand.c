typedef unsigned int S3C24X0_REG32;

typedef struct {
    S3C24X0_REG32 NFCONF;
    S3C24X0_REG32 NFCONT;
    S3C24X0_REG32 NFCMD;
    S3C24X0_REG32 NFADDR;
    S3C24X0_REG32 NFDATA;
    S3C24X0_REG32 NFMECCD0;
    S3C24X0_REG32 NFMECCD1;
    S3C24X0_REG32 NFSECCD;
    S3C24X0_REG32 NFSTAT;
    S3C24X0_REG32 NFESTAT0;
    S3C24X0_REG32 NFESTAT1;
    S3C24X0_REG32 NFMECC0;
    S3C24X0_REG32 NFMECC1;
    S3C24X0_REG32 NFSECC;
    S3C24X0_REG32 NFSBLK;
    S3C24X0_REG32 NFEBLK;
} S3C2440_NAND;

static S3C2440_NAND * s3c2440nand = (S3C2440_NAND *)0x4e000000;

void nand_init(void);
void nand_read(unsigned char *buf, unsigned long start_addr, int size);

static void nand_reset(void);
static void wait_idle(void);
static void nand_select_chip(void);
static void nand_deselect_chip(void);
static void write_cmd(int cmd);
static void write_addr(unsigned int addr);
static unsigned char read_data(void);

static void nand_reset(void)
{
    nand_select_chip();
    write_cmd(0xff);
    wait_idle();
    nand_deselect_chip();
}

static void wait_idle(void)
{
    int i;
    volatile unsigned char *p = (volatile unsigned char *)&s3c2440nand->NFSTAT;
    while(!(*p & 1))
        for(i=0; i<10; i++);
}

static void nand_select_chip(void)
{
    int i;
    s3c2440nand->NFCONT &= ~(1<<1);
    for(i=0; i<10; i++);
}

static void nand_deselect_chip(void)
{
    s3c2440nand->NFCONT |= (1<<1);
}

static void write_cmd(int cmd)
{
    volatile unsigned char *p = (volatile unsigned char *)&s3c2440nand->NFCMD;
    *p = cmd;
}

static void write_addr(unsigned int addr)
{
    int i;
    volatile unsigned char *p = (volatile unsigned char *)&s3c2440nand->NFADDR;
    int col, page;

    col = addr & (2048 - 1);
    page = addr / 2048;

    *p = col & 0xff;
    for(i=0; i<10; i++);
    *p = (col >> 8) & 0x0f;
    for(i=0; i<10; i++);
    *p = page & 0xff;
    for(i=0; i<10; i++);
    *p = (page >> 8) & 0xff;
    for(i=0; i<10; i++);
    *p = (page >> 16) & 0x03;
    for(i=0; i<10; i++);
}

static unsigned char read_data(void)
{
    volatile unsigned char *p = (volatile unsigned char *)&s3c2440nand->NFDATA;
    return *p;
}

void nand_init(void)
{
    s3c2440nand->NFCONF = (0<<12)|(3<<8)|(0<<4);
    s3c2440nand->NFCONT = (1<<4)|(1<<1)|(1<<0);
    nand_reset();
}

void nand_read(unsigned char *buf, unsigned long start_addr, int size)
{
    int i, j;
    if ((start_addr & (2048 - 1)) || (size & (2048 - 1))) {
        return ;
    }

    nand_select_chip();
    for(i=start_addr; i < (start_addr + size);) {
        write_cmd(0);

        write_addr(i);

        write_cmd(0x30);

        wait_idle();

        for(j=0; j < 2048; j++, i++) {
            *buf = read_data();
            buf++;
        }
    }

    nand_deselect_chip();

    return ;
}
