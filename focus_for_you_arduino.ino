#include <JC_Button.h>
#include <AxisJoystick.h>
#include <Joystick.h>

#define MOMENTARY_PIN 26
#define POTENTIOMETER 12
#define SW_PIN 25
#define VRX_PIN 13
#define VRY_PIN 27

Button momentaryBtn(MOMENTARY_PIN);
AxisJoystick joystic(SW_PIN, VRX_PIN, VRY_PIN);

// global 
int pValScaled = -1;
int level = 0;


void setup()
{
    // Set pin mode
    Serial.begin(115200);
    momentaryBtn.begin();
    joystic.calibrate(0, 4095);
}

void loop()
{
    momentaryBtn.read();
    joystic.multipleRead();  
    int potentValue = analogRead(12);
    readPotentiometer(potentValue);

    if (momentaryBtn.wasPressed())
    {
        Serial.println("press");
    }
    if (joystic.isUp())
    {
        Serial.println("joyDown");
        delay(600);
    }
    else if (joystic.isDown())
    {
        Serial.println("joyUp");
        delay(600);
    }
    else if(joystic.isRight())
    {
      Serial.println("joyRight");
      delay(600);
    }
    else if(joystic.isLeft())
    {
      Serial.println("joyLeft");
      delay(600);
    }
    else
    {
//        do nothing 
    }
      delay(100);
}


void readPotentiometer(int actual)
{
    delay(50);
    pValScaled = (int) (actual / (409 * 2) );
    // scale the potentiometer values so we get something from 1-5 
    if (level != pValScaled)
    {
      // there was a change in the level  
        level = pValScaled;
        Serial.println(level);
    }
}
