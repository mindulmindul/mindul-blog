@按键对应led，当按下相应按键时，相应的灯会亮
.text
.global _start

_start:
	ldr r0,=0x56000050
	mov r4,#0x00001500		@设置GPF456为输出，GPF02为输入
	str r4,[r0]

	ldr r1,=0x56000060
	mov r4,#0x00000000		@设置GPG3为输入
	str r4,[r1]

	ldr r0,=0x56000054
	ldr r1,=0x56000064

loop:
	@GPG3按下，低电平，led2亮
	ldr r2,[r0]
	ldr r3,[r1]
	tst r3,#0x00000008					@测试GPG3是否为0

	movne r4,#0x0000007f				@未按下
	moveq r4,#0x0000006f				@按下

	tst r2,#0x00000001					@测试GPF0是否为0
	andeq r4,#0xffffffbf

	tst r2,#0x00000004					@测试GPF2是否为0
	andeq r4,#0xffffffdf



	str r4,[r0]
	b loop


