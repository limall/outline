#ifndef TEST_H
#define TEST_H

#include "cocos2d.h"
using namespace cocos2d;
using namespace std;

//following is the auto generated code where you shouldn't write your code
namespace O {
//auto generate begin

    struct Test_beauty {
	    Outline *outline;
		Node *create(){
			outline->create();
		} 
    };
    struct Test_meinv {
	    Outline *outline;
		Node *create(){
			outline->create();
		} 
    };
    struct Test {
        Struct_test_beauty *beauty;
        Struct_test_meinv *meinv;
	    Outline *outline;
		Node *create(){
			outline->create();
		}
	private: Test() {
		    _pInstance = NULL;
	    }
	public:
		static Test *_pInstance;
		static Test *pIt() {
			if (_pInstance)
				return _pInstance;
			else {
			    auto test=_pInstance=new Test();
			    auto outline_test=_pInstance->outline=new Outline();
                outline_test->createNode=createNode;
                outline_test->x=480;
                outline_test->y=320;
                outline_test->anchorX=0.5;
                outline_test->anchorY=0.5;
                outline_test->width=0;
                outline_test->height=0;
                outline_test->scale=1;
                outline_test->rotation=0;
                outline_test->opacity=255;
                outline_test->visible=true;
                outline_test->zOrder=0;


                auto test_beauty = test->beauty = new Test_beauty();
                auto outline_test_beauty=test_beauty->outline=new Outline();
                outline_test_beauty->createNode=createNode;
                outline_test_beauty->x=-186;
                outline_test_beauty->y=-18;
                outline_test_beauty->anchorX=0.5;
                outline_test_beauty->anchorY=0.5;
                outline_test_beauty->width=1600;
                outline_test_beauty->height=1200;
                outline_test_beauty->scale=0.3;
                outline_test_beauty->rotation=0;
                outline_test_beauty->opacity=255;
                outline_test_beauty->visible=true;
                outline_test_beauty->zOrder=0;
                outline_test_beauty->type.key="sprite";
                outline_test_beauty->type.value="images/beauty.jpg";

                auto test_meinv = test->meinv = new Test_meinv();
                auto outline_test_meinv=test_meinv->outline=new Outline();
                outline_test_meinv->createNode=createNode;
                outline_test_meinv->x=328;
                outline_test_meinv->y=-9;
                outline_test_meinv->anchorX=0.5;
                outline_test_meinv->anchorY=0.5;
                outline_test_meinv->width=810;
                outline_test_meinv->height=1440;
                outline_test_meinv->scale=0.3;
                outline_test_meinv->rotation=0;
                outline_test_meinv->opacity=255;
                outline_test_meinv->visible=true;
                outline_test_meinv->zOrder=0;
                outline_test_meinv->type.key="sprite";
                outline_test_meinv->type.value="images/meinv.jpg";


                test->outline->children.push_back(test_beauty->outline);
                test->outline->children.push_back(test_meinv->outline);

                return _pInstance;
			}
		}
    };

//auto generate end
};

#endif
