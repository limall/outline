#ifndef NUMBG_H
#define NUMBG_H

#include "cocos2d.h"
#include "outline.h"
using namespace cocos2d;
using namespace std;

//following is the auto generated code where you shouldn't write your code
//auto generate begin


namespace O {
struct Numbg : public OStruct {
private: Numbg() {}
public:
	static Numbg *pIt() {
		static Numbg *_pInstance;
		if(_pInstance==NULL) {
		    auto numbg=_pInstance=new Numbg();
            auto outline_numbg=_pInstance->outline=new Outline();
            outline_numbg->createNode=createNode;
            outline_numbg->x=640;
            outline_numbg->y=360;
            outline_numbg->anchorX=0.5;
            outline_numbg->anchorY=0.5;
            outline_numbg->width=31;
            outline_numbg->height=31;
            outline_numbg->scale=3;
            outline_numbg->rotation=0;
            outline_numbg->opacity=255;
            outline_numbg->visible=true;
            outline_numbg->zOrder=0;
            outline_numbg->colorR=255;
            outline_numbg->colorG=255;
            outline_numbg->colorB=255;
            outline_numbg->type.key="sprite";
            outline_numbg->type.value="numbg.png";




        }
    	return _pInstance;
	}
};
//auto generate end
};

#endif
