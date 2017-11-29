#ifndef MEINV_H
#define MEINV_H

#include "cocos2d.h"
#include "outline.h"
using namespace cocos2d;
using namespace std;

//following is the auto generated code where you shouldn't write your code
namespace O {
//auto generate begin

    struct Meinv {
	    Outline *outline;
		Node *create(){
			return outline->create();
		}
	private: Meinv() {}
	public:
		static Meinv *pIt() {
			static Meinv *_pInstance;
			if(_pInstance==NULL) {
			    auto meinv=_pInstance=new Meinv();
			    auto outline_meinv=_pInstance->outline=new Outline();
                outline_meinv->createNode=createNode;
                outline_meinv->x=808;
                outline_meinv->y=311;
                outline_meinv->anchorX=0.5;
                outline_meinv->anchorY=0.5;
                outline_meinv->width=810;
                outline_meinv->height=1440;
                outline_meinv->scale=0.3;
                outline_meinv->rotation=0;
                outline_meinv->opacity=255;
                outline_meinv->visible=true;
                outline_meinv->zOrder=0;
                outline_meinv->type.key="sprite";
                outline_meinv->type.value="images/meinv.jpg";




			}
			return _pInstance;
		}
    };

//auto generate end
};

#endif
