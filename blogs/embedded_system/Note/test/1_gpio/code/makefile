all:1 2 3 4 5 6 7 

1:1_led_on.S
	@arm-linux-gcc -g -c -o led_on.o 1_led_on.S
	@arm-linux-ld -Ttext 0x0 -g led_on.o -o 1_elf
	@arm-linux-objcopy -O binary -S 1_elf 1.bin
	@arm-linux-objdump -D -m arm  1_elf > 1.dis
	@echo ------target 1------ok------ 

2:2_leds.S
	@arm-linux-gcc -g -c -o leds.o 2_leds.S
	@arm-linux-ld -Ttext 0x0 -g leds.o -o 2_elf
	@arm-linux-objcopy -O binary -S 2_elf 2.bin
	@arm-linux-objdump -D -m arm 2_elf > 2.dis
	@echo ------target 2------ok------

3:3_key_led.S
	@arm-linux-gcc -g -c -o key_led.o 3_key_led.S
	@arm-linux-ld -Ttext 0x0 -g key_led.o -o 3_elf
	@arm-linux-objcopy -O binary -S 3_elf 3.bin 
	@arm-linux-objdump -D -m arm 3_elf > 3.dis
	@echo ------target 3------ok------

4:4_led_blink.S
	@arm-linux-gcc -g -c -o 4_led_blink.o 4_led_blink.S
	@arm-linux-ld -Ttext 0x0 -g 4_led_blink.o -o 4_elf
	@arm-linux-objcopy -O binary -S 4_elf 4.bin 
	@arm-linux-objdump -D -m arm 4_elf > 4.dis
	@echo ------target 4------ok------

5:0_crt.S 5_led_on_c.c 
	@arm-linux-gcc -g -c -o 0_crt.o 0_crt.S
	@arm-linux-gcc -g -c -o 5_led_on.o 5_led_on_c.c
	@arm-linux-ld -Ttext 0x0 -g 0_crt.o 5_led_on.o -o 5_elf
	@arm-linux-objcopy -O binary -S 5_elf 5.bin
	@arm-linux-objdump -D -m arm 5_elf > 5.dis
	@echo ------target 5------ok------

6:0_crt.S 6_key_led_c.c 
	@arm-linux-gcc -g -c -o 0_crt.o 0_crt.S
	@arm-linux-gcc -g -c -o 6_key_led_c.o 6_key_led_c.c
	@arm-linux-ld -Ttext 0x0 -g 0_crt.o 6_key_led_c.o -o 6_elf
	@arm-linux-objcopy -O binary -S 6_elf 6.bin
	@arm-linux-objdump -D -m arm 6_elf > 6.dis
	@echo ------target 6------ok------

7:0_crt.S 6_key_led_c.c 
	@arm-linux-gcc -g -c -o 0_crt.o 0_crt.S
	@arm-linux-gcc -g -c -o 7_led_blink_c.o 7_led_blink_c.c
	@arm-linux-ld -Ttext 0x0 -g 0_crt.o 7_led_blink_c.o -o 7_elf
	@arm-linux-objcopy -O binary -S 7_elf 7.bin
	@arm-linux-objdump -D -m arm 7_elf > 7.dis
	@echo ------target 7------ok------

clean:
	rm -f   *.bin *elf *.o *.dis
