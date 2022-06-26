@两个led交替闪烁
.text
.global _start
_start:
        ldr r0,=0x56000050
        mov r1,#0x00000500      @实际上是16位0100
				@选择led1的口GPF4为输出
        str r1,[r0]

        ldr r0,=0x56000054


main_loop:
        mov r1,#0x00000020      @实际上是8位的00
				@如果换成0x10，则可以使led1灭
        str r1,[r0]

        ldr r3,=80000
little_loop:
        subs r3,r3,#1
        bne little_loop



        mov r1,#0x00000010
        str r1,[r0]

        ldr r3,=80000
little_loop1:
        subs r3,r3,#1
        bne little_loop1
        
        b main_loop
