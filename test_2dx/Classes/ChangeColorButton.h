#ifndef CHANGECOLORBUTTON_H
#define CHANGECOLORBUTTON_H

#include "cocos2d.h"
using namespace cocos2d;

class ChangeColorButton : public Sprite{
private:
	cocos2d::Color3B originColor;
	bool isPressed;
	bool isDisabled;
public:
	static ChangeColorButton* create(const std::string &filename, std::function<void(Node*)> onClick);
	void setDisable(bool);
};

#endif