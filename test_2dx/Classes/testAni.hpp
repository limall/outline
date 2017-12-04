#ifndef TESTANI_H
#define TESTANI_H

#include "cocos2d.h"
#include "outline.h"
using namespace cocos2d;
using namespace std;

//following is the auto generated code where you shouldn't write your code
//auto generate begin
struct TestAni_reward_bg : public OStruct { 
};
struct TestAni_numbg : public OStruct { 
};

namespace O {
struct TestAni : public OStruct {
    TestAni_reward_bg *reward_bg;
    TestAni_numbg *numbg;
private: TestAni() {}
public:
	static TestAni *pIt() {
		static TestAni *_pInstance;
		if(_pInstance==NULL) {
		    auto testAni=_pInstance=new TestAni();
            auto outline_testAni=_pInstance->outline=new Outline();
            outline_testAni->createNode=createNode;
            outline_testAni->x=640;
            outline_testAni->y=360;
            outline_testAni->anchorX=0.5;
            outline_testAni->anchorY=0.5;
            outline_testAni->width=0;
            outline_testAni->height=0;
            outline_testAni->scale=1;
            outline_testAni->rotation=0;
            outline_testAni->opacity=255;
            outline_testAni->visible=true;
            outline_testAni->zOrder=0;
            outline_testAni->colorR=255;
            outline_testAni->colorG=255;
            outline_testAni->colorB=255;


            auto testAni_reward_bg = testAni->reward_bg = new TestAni_reward_bg();
            auto outline_testAni_reward_bg=testAni_reward_bg->outline=new Outline();
            outline_testAni_reward_bg->createNode=createNode;
            outline_testAni_reward_bg->x=0;
            outline_testAni_reward_bg->y=0;
            outline_testAni_reward_bg->anchorX=0.5;
            outline_testAni_reward_bg->anchorY=0.5;
            outline_testAni_reward_bg->width=1220;
            outline_testAni_reward_bg->height=688;
            outline_testAni_reward_bg->scale=1;
            outline_testAni_reward_bg->rotation=0;
            outline_testAni_reward_bg->opacity=255;
            outline_testAni_reward_bg->visible=true;
            outline_testAni_reward_bg->zOrder=0;
            outline_testAni_reward_bg->colorR=255;
            outline_testAni_reward_bg->colorG=255;
            outline_testAni_reward_bg->colorB=255;
            outline_testAni_reward_bg->type.key="sprite";
            outline_testAni_reward_bg->type.value="reward_bg.png";

            auto testAni_numbg = testAni->numbg = new TestAni_numbg();
            auto outline_testAni_numbg=testAni_numbg->outline=new Outline();
            outline_testAni_numbg->createNode=createNode;
            outline_testAni_numbg->x=-19;
            outline_testAni_numbg->y=-13;
            outline_testAni_numbg->anchorX=0.5;
            outline_testAni_numbg->anchorY=0.5;
            outline_testAni_numbg->width=31;
            outline_testAni_numbg->height=31;
            outline_testAni_numbg->scale=3;
            outline_testAni_numbg->rotation=0;
            outline_testAni_numbg->opacity=255;
            outline_testAni_numbg->visible=true;
            outline_testAni_numbg->zOrder=0;
            outline_testAni_numbg->colorR=255;
            outline_testAni_numbg->colorG=255;
            outline_testAni_numbg->colorB=255;
            outline_testAni_numbg->type.key="sprite";
            outline_testAni_numbg->type.value="numbg.png";


            testAni->outline->children.push_back(testAni_reward_bg->outline);
            testAni->outline->children.push_back(testAni_numbg->outline);


        }
    	return _pInstance;
	}
};
//auto generate end
};

#endif
