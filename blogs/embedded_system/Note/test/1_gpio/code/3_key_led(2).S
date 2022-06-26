.global _start
_start:
	ldr r0, =0x56000050
	mov r1, #0x00001500
	str r1, [r0]

	ldr r0, =0x56000060
	mov r1, #0x00000000
	str r1, [r0]
@上面设置好key的输入和led的输出
	
loop:
	ldr r0, =0x56000054
	ldr r3, =0x56000064

	mov r2, #0x00000070		@所有灯灭

	ldr r1, [r0]
	tst r1, #0x00000001		@表示按键eint0按下
	andeq r2, #0xffffffef
	tst r1, #0x00000004     @表示按键eint2按下
	andeq r2, #0xffffffdf

	ldr r4, [r3]
	tst r4, #0x00000008		@表示按键eint11按下
	andeq r2, #0xffffffbf

	str r2, [r0]
	b loop
	
