#include "AutoScaleButton.h"

bool isTouchInSprite(Sprite *pSprite, Touch* touch,float scale){
	float x = touch->getLocation().x;
	float y = touch->getLocation().y;
	Size size = pSprite->getContentSize()*scale;
	float anchorX = pSprite->getAnchorPoint().x;
	float anchorY = pSprite->getAnchorPoint().y;
	float x1 = pSprite->getPositionX() - size.width*anchorX;
	float x2 = pSprite->getPositionX() + size.width*anchorX;
	float y1 = pSprite->getPositionY() - size.height*anchorY;
	float y2 = pSprite->getPositionY() + size.height*anchorY;
	return x >= x1&&x <= x2&&y >= y1&&y <= y2;
}

AutoScaleButton* AutoScaleButton::create(const std::string &filename, std::function<void(Node*)> onClick){
	auto autoScaleButton = new (std::nothrow) AutoScaleButton();
	if (autoScaleButton && autoScaleButton->initWithFile(filename))
	{
		autoScaleButton->autorelease();

		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = [=](Touch* touch, Event* event)->bool
		{
			if (autoScaleButton->isDisabled||autoScaleButton->isPressed)
				return false;
			else if (isTouchInSprite(autoScaleButton,touch,autoScaleButton->getScale())){
				autoScaleButton->isPressed = true;
				autoScaleButton->originScale = autoScaleButton->getScale();
				auto action = EaseExponentialOut::create(ScaleBy::create(0.1f, 0.75f));
				autoScaleButton->runAction(action);
			}
			return true;
		};

		listener->onTouchCancelled = [=](Touch* touch, Event* event){
			if (autoScaleButton->isPressed){
				auto action = Sequence::create(
					EaseExponentialOut::create(ScaleTo::create(0.1f, autoScaleButton->originScale)),
					CallFunc::create([=](){
					    autoScaleButton->isPressed = false;
					    autoScaleButton->setScale(autoScaleButton->originScale);
				    }),
					NULL
				);
				autoScaleButton->runAction(action);
			}
		};

		listener->onTouchEnded = [=](Touch* touch, Event* event){
			if (autoScaleButton->isPressed){
				auto action = Sequence::create(
					EaseExponentialOut::create(ScaleTo::create(0.1f, autoScaleButton->originScale)),
					CallFunc::create([=](){
					    autoScaleButton->isPressed = false;
					    autoScaleButton->setScale(autoScaleButton->originScale);
				    }),
					NULL
				);
				autoScaleButton->runAction(action);
				if (isTouchInSprite(autoScaleButton, touch, autoScaleButton->originScale)){
					onClick(autoScaleButton);
				}
			}
		};

		listener->onTouchMoved = [=](Touch* touch, Event* event){
			if (autoScaleButton->isPressed&&!isTouchInSprite(autoScaleButton, touch, autoScaleButton->originScale)){
				auto action = Sequence::create(
					EaseExponentialOut::create(ScaleTo::create(0.1f, autoScaleButton->originScale)),
					CallFunc::create([=](){
					    autoScaleButton->isPressed = false;
						autoScaleButton->setScale(autoScaleButton->originScale);
				    }),
					NULL
				);
				autoScaleButton->runAction(action);
			}
		};

		Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, autoScaleButton);
		autoScaleButton->isDisabled = false;
		autoScaleButton->isPressed = false;
		return autoScaleButton;
	}
	CC_SAFE_DELETE(autoScaleButton);
	return nullptr;
}

void AutoScaleButton::setDisable(bool disable){
	this->isDisabled = disable;
}