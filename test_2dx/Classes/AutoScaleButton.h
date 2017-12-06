#ifndef AUTOSCALEBUTTON_H
#define AUTOSCALEBUTTON_H

#include "cocos2d.h"
using namespace cocos2d;

class AutoScaleButton : public Sprite{
private:
	float originScale;
	bool isPressed;
	bool isDisabled;
public:
	static AutoScaleButton* create(const std::string &filename,std::function<void(Node*)> onClick);
	void setDisable(bool);
};

#endif