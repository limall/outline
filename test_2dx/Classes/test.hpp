#ifndef CANVAS_H
#define CANVAS_H

#include "cocos2d.h"
#include "outline.h"
using namespace cocos2d;
using namespace std;

//following is the auto generated code where you shouldn't write your code
//auto generate begin

struct Main_reward_bg_numbg : public OStruct { 
};
struct Main_reward_bg : public OStruct {
    Main_reward_bg_numbg *numbg; 
};

namespace O {
struct Main : public OStruct {
    Main_reward_bg *reward_bg;
private: Main() {}
public:
	static Main *pIt() {
		static Main *_pInstance;
		if(_pInstance==NULL) {
		    auto main=_pInstance=new Main();
            auto outline_main=_pInstance->outline=new Outline();
            outline_main->createNode=createNode;
            outline_main->x=0;
            outline_main->y=0;
            outline_main->anchorX=0.5;
            outline_main->anchorY=0.5;
            outline_main->width=0;
            outline_main->height=0;
            outline_main->scale=1;
            outline_main->rotation=0;
            outline_main->opacity=255;
            outline_main->visible=true;
            outline_main->zOrder=0;
            outline_main->colorR=255;
            outline_main->colorG=255;
            outline_main->colorB=255;


            auto main_reward_bg = main->reward_bg = new Main_reward_bg();
            auto outline_main_reward_bg=main_reward_bg->outline=new Outline();
            outline_main_reward_bg->createNode=createNode;
            outline_main_reward_bg->x=899;
            outline_main_reward_bg->y=219;
            outline_main_reward_bg->anchorX=0.5;
            outline_main_reward_bg->anchorY=0.5;
            outline_main_reward_bg->width=1220;
            outline_main_reward_bg->height=688;
            outline_main_reward_bg->scale=1;
            outline_main_reward_bg->rotation=0;
            outline_main_reward_bg->opacity=255;
            outline_main_reward_bg->visible=true;
            outline_main_reward_bg->zOrder=0;
            outline_main_reward_bg->colorR=255;
            outline_main_reward_bg->colorG=255;
            outline_main_reward_bg->colorB=255;
            outline_main_reward_bg->type.key="sprite";
            outline_main_reward_bg->type.value="reward_bg.png";

            auto main_reward_bg_numbg = main_reward_bg->numbg = new Main_reward_bg_numbg();
            auto outline_main_reward_bg_numbg=main_reward_bg_numbg->outline=new Outline();
            outline_main_reward_bg_numbg->createNode=createNode;
            outline_main_reward_bg_numbg->x=256;
            outline_main_reward_bg_numbg->y=460;
            outline_main_reward_bg_numbg->anchorX=0.5;
            outline_main_reward_bg_numbg->anchorY=0.5;
            outline_main_reward_bg_numbg->width=31;
            outline_main_reward_bg_numbg->height=31;
            outline_main_reward_bg_numbg->scale=2;
            outline_main_reward_bg_numbg->rotation=0;
            outline_main_reward_bg_numbg->opacity=255;
            outline_main_reward_bg_numbg->visible=true;
            outline_main_reward_bg_numbg->zOrder=0;
            outline_main_reward_bg_numbg->colorR=255;
            outline_main_reward_bg_numbg->colorG=255;
            outline_main_reward_bg_numbg->colorB=255;
            outline_main_reward_bg_numbg->type.key="sprite";
            outline_main_reward_bg_numbg->type.value="numbg.png";


            main_reward_bg->outline->children.push_back(main_reward_bg_numbg->outline);

            main->outline->children.push_back(main_reward_bg->outline);


        }
    	return _pInstance;
	}
};
//auto generate end
};

#endif
