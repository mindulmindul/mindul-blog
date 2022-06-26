.text
.global _start
_start:
        ldr r0,=0x56000050
        mov r1,#0x00001500      @实际上是16位0100
				@选择led1的口GPF4、GPF5、GPF6为输出
        str r1,[r0]

        ldr r0,=0x56000054
        mov r1,#0x00000000      @实际上是8位的00
				@如果换成0x10，则可以使led1灭
        str r1,[r0]

main_loop:
        b main_loop
