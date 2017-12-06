#include "ChangeColorButton.h"

bool isTouchInSprite(Sprite *pSprite, Touch* touch){
	float x = touch->getLocation().x;
	float y = touch->getLocation().y;
	Size size = pSprite->getContentSize()*pSprite->getScale();
	float anchorX = pSprite->getAnchorPoint().x;
	float anchorY = pSprite->getAnchorPoint().y;
	Vec2 pos = pSprite->getParent()->convertToWorldSpace(pSprite->getPosition());
	float x1 = pos.x - size.width*anchorX;
	float x2 = pos.x + size.width*anchorX;
	float y1 = pos.y - size.height*anchorY;
	float y2 = pos.y + size.height*anchorY;
	return x >= x1&&x <= x2&&y >= y1&&y <= y2;
}

ChangeColorButton* ChangeColorButton::create(const std::string &filename, std::function<void(Node*)> onClick){
	auto changeColorButton = new (std::nothrow) ChangeColorButton();
	if (changeColorButton && changeColorButton->initWithFile(filename))
	{
		changeColorButton->autorelease();

		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = [=](Touch* touch, Event* event)->bool
		{
			if (changeColorButton->isDisabled || changeColorButton->isPressed)
				return false;
			else if (isTouchInSprite(changeColorButton, touch)){
				changeColorButton->isPressed = true;
				changeColorButton->originColor = changeColorButton->getColor();
				changeColorButton->setColor(Color3B(109, 99, 99));
			}
			return true;
		};

		listener->onTouchCancelled = [=](Touch* touch, Event* event){
			if (changeColorButton->isPressed){
				changeColorButton->setColor(changeColorButton->originColor);
				changeColorButton->isPressed = false;
			}
		};

		listener->onTouchEnded = [=](Touch* touch, Event* event){
			if (changeColorButton->isPressed){
				changeColorButton->setColor(changeColorButton->originColor);
				changeColorButton->isPressed = false;
				if (isTouchInSprite(changeColorButton, touch)){
					if(onClick)
					    onClick(changeColorButton);
				}
			}
		};

		listener->onTouchMoved = [=](Touch* touch, Event* event){
			if (changeColorButton->isPressed&&!isTouchInSprite(changeColorButton, touch)){
				changeColorButton->setColor(changeColorButton->originColor);
				changeColorButton->isPressed = false;
			}
		};

		Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, changeColorButton);
		changeColorButton->isDisabled = false;
		changeColorButton->isPressed = false;
		return changeColorButton;
	}
	CC_SAFE_DELETE(changeColorButton);
	return nullptr;
}

void ChangeColorButton::setDisable(bool disable){
	this->isDisabled = disable;
}