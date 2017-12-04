#include "HelloWorldScene.h"
#include "SimpleAudioEngine.h"
#include "udpLog/UdpLog.h"
#include "ui/UIButton.h"
#include "clip_test2.hpp"
#include "clip_test3.hpp"
#include "testAni.hpp"
USING_NS_CC;

Scene* HelloWorld::createScene()
{
    return HelloWorld::create();
}

bool HelloWorld::init()
{

    if ( !Scene::init() )
    {
        return false;
    }
    
    auto visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();


    auto closeItem = MenuItemImage::create(
                                           "CloseNormal.png",
                                           "CloseSelected.png",
                                           CC_CALLBACK_1(HelloWorld::menuCloseCallback, this));
    
    closeItem->setPosition(Vec2(origin.x + visibleSize.width - closeItem->getContentSize().width/2 ,
                                origin.y + closeItem->getContentSize().height/2));

    auto menu = Menu::create(closeItem, NULL);
    menu->setPosition(Vec2::ZERO);
    this->addChild(menu, 1);
    
    auto label = Label::createWithTTF("Hello World", "fonts/Marker Felt.ttf", 24);

    label->setPosition(Vec2(origin.x + visibleSize.width/2,
                            origin.y + visibleSize.height - label->getContentSize().height));

    this->addChild(label, 1);

    /*auto node = O::test.create();

    node->setPosition(Vec2(visibleSize.width/2, visibleSize.height/2));

	this->addChild(node);*/

	/*auto button = ui::Button::create("button.png");
	button->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
	button->setScale(0.5f);
	button->setZoomScale(0.1f);
	this->addChild(button);*/
	O::TestAni::pIt()->create(this);
	auto pNode = O::TestAni::pIt()->numbg->defaultNode();
	Anims::Test2::create()->play(pNode, "test2", [=](string key)->void {
		Anims::Test3::create()->play(pNode, "test3");
	});
    return true;
}


void HelloWorld::menuCloseCallback(Ref* pSender)
{
    Director::getInstance()->end();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    exit(0);
#endif
}
