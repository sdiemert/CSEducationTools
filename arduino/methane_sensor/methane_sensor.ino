#define DIGIT_ON LOW
#define DIGIT_OFF HIGH

int sensorValue;

int SEG_A = 11;
int SEG_B = 7;
int SEG_C = 4; 
int SEG_D = 2;
int SEG_E = A3;
int SEG_F = 10;
int SEG_G = 5;
int SEG_DP = 3;

int DIG_1 = 12; 
int DIG_2 = 9;
int DIG_3 = 8;
int DIG_4 = 6; 


 
void setup()
{
  Serial.begin(9600);      // sets the serial port to 9600
  pinMode(SEG_A, OUTPUT);
  pinMode(SEG_B, OUTPUT);
  pinMode(SEG_C, OUTPUT);
  pinMode(SEG_D, OUTPUT);
  pinMode(SEG_E, OUTPUT);
  pinMode(SEG_F, OUTPUT);
  pinMode(SEG_G, OUTPUT);
  pinMode(SEG_DP, OUTPUT);

  pinMode(DIG_1, OUTPUT);
  pinMode(DIG_2, OUTPUT);
  pinMode(DIG_3, OUTPUT);
  pinMode(DIG_4, OUTPUT);

  digitalWrite(DIG_4, DIGIT_ON);
  digitalWrite(DIG_3, DIGIT_ON);
  digitalWrite(DIG_2, DIGIT_ON);
  digitalWrite(DIG_1, DIGIT_ON);
}

int c = 0; 

void loop(){
  
  sensorValue = analogRead(0);       // read analog input pin 0
  Serial.println(sensorValue, DEC);  // prints the value read
 
  
  c = (c + 1)%10;
  //showDigit(10, c);
  //delay(500);

  displayNumber(sensorValue);
  
}

void displayNumber(int num){

  int tmp = 0; 

  int x = 0; 
  while(x < 10){

    tmp = num;
     
    showDigit(1, tmp % 10);
    tmp = tmp / 10; 
    delay(5);
    showDigit(10, tmp % 10);
    tmp = tmp / 10; 
    delay(5);
    showDigit(100, tmp % 10);
    tmp = tmp / 10; 
    delay(5);
    showDigit(1000, tmp % 10); 
    delay(5);
    x++; 
  }
  
  
}

void showDigit(int digit, int num){

  switch(digit){

    case 1000:
      digitalWrite(DIG_1, DIGIT_ON);
      digitalWrite(DIG_2, DIGIT_OFF);
      digitalWrite(DIG_3, DIGIT_OFF);
      digitalWrite(DIG_4, DIGIT_OFF);
      break;
    case 100:
      digitalWrite(DIG_1, DIGIT_OFF);
      digitalWrite(DIG_2, DIGIT_ON);
      digitalWrite(DIG_3, DIGIT_OFF);
      digitalWrite(DIG_4, DIGIT_OFF);
      break;
    case 10:
      digitalWrite(DIG_1, DIGIT_OFF);
      digitalWrite(DIG_2, DIGIT_OFF);
      digitalWrite(DIG_3, DIGIT_ON);
      digitalWrite(DIG_4, DIGIT_OFF);
      break;
    case 1:
      digitalWrite(DIG_1, DIGIT_OFF);
      digitalWrite(DIG_2, DIGIT_OFF);
      digitalWrite(DIG_3, DIGIT_OFF);
      digitalWrite(DIG_4, DIGIT_ON);
      break;
    default:
      digitalWrite(DIG_1, DIGIT_OFF);
      digitalWrite(DIG_2, DIGIT_OFF);
      digitalWrite(DIG_3, DIGIT_OFF);
      digitalWrite(DIG_4, DIGIT_OFF);
      break;
    
  }

  showNumber(num);
  
}

void showNumber(int x){

  switch(x){

    case 0: 
      digitalWrite(SEG_A, HIGH);
      digitalWrite(SEG_B, HIGH);
      digitalWrite(SEG_C, HIGH);
      digitalWrite(SEG_D, HIGH);
      digitalWrite(SEG_E, HIGH);
      digitalWrite(SEG_F, HIGH);
      digitalWrite(SEG_G, LOW);
      digitalWrite(SEG_DP, LOW);
      break; 
    case 1: 
      digitalWrite(SEG_A, LOW);
      digitalWrite(SEG_B, HIGH);
      digitalWrite(SEG_C, HIGH);
      digitalWrite(SEG_D, LOW);
      digitalWrite(SEG_E, LOW);
      digitalWrite(SEG_F, LOW);
      digitalWrite(SEG_G, LOW);
      digitalWrite(SEG_DP, LOW);
      break;
    case 2: 
      digitalWrite(SEG_A, HIGH);
      digitalWrite(SEG_B, HIGH);
      digitalWrite(SEG_C, LOW);
      digitalWrite(SEG_D, HIGH);
      digitalWrite(SEG_E, HIGH);
      digitalWrite(SEG_F, LOW);
      digitalWrite(SEG_G, HIGH);
      digitalWrite(SEG_DP, LOW);
      break;
    case 3: 
      digitalWrite(SEG_A, HIGH);
      digitalWrite(SEG_B, HIGH);
      digitalWrite(SEG_C, HIGH);
      digitalWrite(SEG_D, HIGH);
      digitalWrite(SEG_E, LOW);
      digitalWrite(SEG_F, LOW);
      digitalWrite(SEG_G, HIGH);
      digitalWrite(SEG_DP, LOW);
      break;
    case 4: 
      digitalWrite(SEG_A, LOW);
      digitalWrite(SEG_B, HIGH);
      digitalWrite(SEG_C, HIGH);
      digitalWrite(SEG_D, LOW);
      digitalWrite(SEG_E, LOW);
      digitalWrite(SEG_F, HIGH);
      digitalWrite(SEG_G, HIGH);
      digitalWrite(SEG_DP, LOW);
      break; 
    case 5:
      digitalWrite(SEG_A, HIGH);
      digitalWrite(SEG_B, LOW);
      digitalWrite(SEG_C, HIGH);
      digitalWrite(SEG_D, HIGH);
      digitalWrite(SEG_E, LOW);
      digitalWrite(SEG_F, HIGH);
      digitalWrite(SEG_G, HIGH);
      digitalWrite(SEG_DP, LOW); 
      break;
    case 6: 
      digitalWrite(SEG_A, HIGH);
      digitalWrite(SEG_B, LOW);
      digitalWrite(SEG_C, HIGH);
      digitalWrite(SEG_D, HIGH);
      digitalWrite(SEG_E, HIGH);
      digitalWrite(SEG_F, HIGH);
      digitalWrite(SEG_G, HIGH);
      digitalWrite(SEG_DP, LOW); 
      break;
    case 7:
      digitalWrite(SEG_A, HIGH);
      digitalWrite(SEG_B, HIGH);
      digitalWrite(SEG_C, HIGH);
      digitalWrite(SEG_D, LOW);
      digitalWrite(SEG_E, LOW);
      digitalWrite(SEG_F, LOW);
      digitalWrite(SEG_G, LOW);
      digitalWrite(SEG_DP, LOW);
      break;
    case 8:
      digitalWrite(SEG_A, HIGH);
      digitalWrite(SEG_B, HIGH);
      digitalWrite(SEG_C, HIGH);
      digitalWrite(SEG_D, HIGH);
      digitalWrite(SEG_E, HIGH);
      digitalWrite(SEG_F, HIGH);
      digitalWrite(SEG_G, HIGH);
      digitalWrite(SEG_DP, LOW);
      break;
    case 9: 
      digitalWrite(SEG_A, HIGH);
      digitalWrite(SEG_B, HIGH);
      digitalWrite(SEG_C, HIGH);
      digitalWrite(SEG_D, HIGH);
      digitalWrite(SEG_E, LOW);
      digitalWrite(SEG_F, HIGH);
      digitalWrite(SEG_G, HIGH);
      digitalWrite(SEG_DP, LOW);
      break;

    default:
      digitalWrite(SEG_A, LOW);
      digitalWrite(SEG_B, LOW);
      digitalWrite(SEG_C, LOW);
      digitalWrite(SEG_D, LOW);
      digitalWrite(SEG_E, LOW);
      digitalWrite(SEG_F, LOW);
      digitalWrite(SEG_G, LOW);
      digitalWrite(SEG_DP, LOW); 
    break;

  }
}

