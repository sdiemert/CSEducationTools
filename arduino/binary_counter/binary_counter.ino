
int COLUMN1 = 11;
int COLUMN2 = 10; 
int COLUMN4 = 9; 
int COLUMN8 = 8; 

int digits[4] = {COLUMN1, COLUMN2, COLUMN4, COLUMN8};

void setup() {

  pinMode(COLUMN1, OUTPUT);
  pinMode(COLUMN2, OUTPUT);
  pinMode(COLUMN4, OUTPUT);
  pinMode(COLUMN8, OUTPUT);

}

void loop() {

  int y = 0; 

  while(1){

    showNumber(y);
    y = (y + 1) % 16; 
    
    delay(500); 
  }
  

}

/**
 * Shows the input number on the binary LED array.
 */
void showNumber(int x){

  int i = 0; 
  
  for(i = 0; i < 4; i++){

    if(x % 2 == 0){
      digitalWrite(digits[i], LOW);  
    }else{
      digitalWrite(digits[i], HIGH);
    }

    x = x/2; 
    
  }
  
}

