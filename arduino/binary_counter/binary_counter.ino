/**
 * An arduino sketch for counting in binary using an array of four LEDs. 
 */


//pin definitions for the LEDs

int COLUMN1 = 0; //CHANGE ME
int COLUMN2 = 0; //CHANGE ME 
int COLUMN4 = 0; //CHANGE ME
int COLUMN8 = 0; //CHANGE ME

int BUTTON = A0; //CHANGE ME

int digits[4] = {COLUMN1, COLUMN2, COLUMN4, COLUMN8};

void setup() {

  pinMode(COLUMN1, OUTPUT);
  pinMode(COLUMN2, OUTPUT);
  pinMode(COLUMN4, OUTPUT);
  pinMode(COLUMN8, OUTPUT);
  pinMode(BUTTON, INPUT); 

  Serial.begin(9600);

}

void loop() {

  int y = 0; 
  int buttonStatus = 0; 
  
  while(1){

    buttonStatus = getButton();

    showNumber(y);
    y = (y + 1) % 16; 
    
    delay(500);  //CHANGE ME TO COUNT FASTER, 1000 = 1 sec
  }
  

}

/**
 * Shows the input number on the binary LED array.
 */
void showNumber(int x){

  int i = 0; 

  Serial.println(x);
  
  for(i = 0; i < 4; i++){

    if(x % 2 == 0){
      digitalWrite(digits[i], LOW);  
    }else{
      digitalWrite(digits[i], HIGH);
    }

    x = x/2; 
    
  }
  
}
int getButton(){

  int val = analogRead(BUTTON);

  if(val > 0){
    return 1;  
  }else{
    return 0; 
  }
}

