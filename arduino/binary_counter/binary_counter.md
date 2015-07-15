## Binary Counter

During this project we will use a circuit and an Arduino to make a binary counter. The final device will count from 0 to 15 in binary. 

### Introduction to Binary

Binary is a number system, instead of using 10 digits (0 to 9) binary uses only 2 digits (0 and 1). In our normal base 10 numbering system we can divide our numbers into columns, such as a 1's column, 10's column, 100's column etc... In binary we still use columns but, instead of going up by powers of 10, they increase by powers of 2. In binary we have a 1's column, 2's column, 4's column, 8's column, etc... 

Here is a chart showing the first 16 binary numbers: 

 | Base 10 | Binary |
 |----------|--------|
 | 0 | 0000 | 
 | 1 | 0001 |
 | 2 | 0010 | 
 | 3 | 0011 |
 | 4 | 0100 | 
 | 5 | 0101 | 
 | 6 | 0110 | 
 | 7 | 0111 | 
 | 8 | 1000 | 
 | 9 | 1001 | 
 | 10 | 1010 | 
 | 11 | 1011 | 
 | 12 | 1100 | 
 | 13 | 1101 |   
 | 14 | 1110 |  
 | 15 | 1111 |
 
### The Circuit

The circuit requires the following components: 

* 4 resistors (500 - 1000 ohms)
* 1 Arduino
* several wires

Below is a diagram of the circuit on a bread board:


<img src="/Users/sdiemert/Dropbox/SV/binary_counter_bb.png" />


### The Code

