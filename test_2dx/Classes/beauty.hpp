#ifndef BEAUTY_H
#define BEAUTY_H

#include "cocos2d.h"
#include "outline.h"
using namespace cocos2d;
using namespace std;

//following is the auto generated code where you shouldn't write your code
namespace O {
//auto generate begin

    struct Beauty {
	    Outline *outline;
		Node *create(){
			return outline->create();
		}
	private: Beauty() {}
	public:
		static Beauty *pIt() {
			static Beauty *_pInstance;
			if(_pInstance==NULL) {
			    auto beauty=_pInstance=new Beauty();
			    auto outline_beauty=_pInstance->outline=new Outline();
                outline_beauty->createNode=createNode;
                outline_beauty->x=294;
                outline_beauty->y=302;
                outline_beauty->anchorX=0.5;
                outline_beauty->anchorY=0.5;
                outline_beauty->width=1600;
                outline_beauty->height=1200;
                outline_beauty->scale=0.3;
                outline_beauty->rotation=0;
                outline_beauty->opacity=255;
                outline_beauty->visible=true;
                outline_beauty->zOrder=0;
                outline_beauty->type.key="sprite";
                outline_beauty->type.value="images/beauty.jpg";




			}
			return _pInstance;
		}
    };

//auto generate end
};

#endif
