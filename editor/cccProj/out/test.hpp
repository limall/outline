#pragma once
//your include files and definition
#include "cocos2d.h"
using namespace cocos2d;
using namespace std;

static struct KeyValue { 
	string key, value; 
	KeyValue() {}
	KeyValue(string key,string value) {
		this->key = key;
		this->value = value;
	} 
};

static void type2KeyValue(string type,vector<KeyValue> *keyValues){
	vector<string> strs;
	int endIndex = type.find(";");
	bool haveKeyValue = type.find(":")>0;
	while (haveKeyValue){
		string astr;
		if (endIndex < 0){
			astr = type.substr(0);
			strs.push_back(astr);
			break;
		}
		else{
			astr = type.substr(0, endIndex);
			strs.push_back(astr);
		}
		type = type.substr(endIndex + 1);
		endIndex = type.find(";");
		haveKeyValue = type.find(":") > 0;
	}
	for (int i = 0; i < strs.size(); i++){
		string *str = &strs[i];
		int divisionIndex = str->find(":");
		if (divisionIndex>0&&divisionIndex+1<str->size()){
			KeyValue keyValue;
			keyValue.key = str->substr(0, divisionIndex);
			keyValue.value = str->substr(divisionIndex + 1);
			keyValues->push_back(keyValue);
		}
	}
}

static auto createNode = [](KeyValue *keyValue=NULL)->Node* {
	Node *node;
	if (keyValue) {
		string key = keyValue->key;
		if (key == "sprite")
			node = Sprite::create(keyValue->value);
		else
			node = Node::create();
	}
	else
		node = Node::create();
	return node;
};

//following is the auto generated code where you shouldn't write your code
//auto generate begin

namespace O {
	struct Outline {
		float x=0;
		float y=0;
		float width=0;
		float height=0;
		float anchorX=0.5f;
		float anchorY=0.5f;
		float scale=1;
		float rotation=0;
		int opacity=255;
		bool visible=true;
		int zOrder=0;
		vector<Outline*> children;
		KeyValue type;
		std::function<Node*(KeyValue*)> createNode;

		Node *create() {
			auto node = createNode(&type);
			node->setPositionX(x);
			node->setPositionY(y);
			if(width>0&&height>0)
			    node->setContentSize(Size(width, height));
			node->setAnchorPoint(Vec2(anchorX, anchorY));
			node->setScale(scale);
			node->setRotation(rotation);
			node->setOpacity(opacity);
			node->setVisible(visible);
			node->setLocalZOrder(zOrder);
			for (int i = 0; i < children.size(); i++) {
				node->addChild(children[i]->create());
			}
			return node;
		};
	};
    
    static struct Struct_test_beauty {
	    std::string nodeName;
	    Outline *outline;
	    Struct_test_beauty (string name) {
		    this->nodeName=name;
	    }
    };
    static struct Struct_test_meinv {
	    std::string nodeName;
	    Outline *outline;
	    Struct_test_meinv (string name) {
		    this->nodeName=name;
	    }
    };
    static struct Struct_test {
	    std::string nodeName;
        Struct_test_beauty *beauty;
        Struct_test_meinv *meinv;
	    Outline *outline;
	    Struct_test (string name) {
		    this->nodeName=name;
	    }
    };


    static Struct_test *test=new Struct_test("test");

//接着定义init函数，用于初始化各个outline的实例，并且执行adapte。注意该函数必须在使用前调用，用户可在/*outline-adapter*/标记后对各个节点的createNode进行自定义

	void init() {
auto outline_test=test->outline=new Outline();
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

		
        auto test_beauty = test->beauty = new Struct_test_beauty("beauty");
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

        auto test_meinv = test->meinv = new Struct_test_meinv("meinv");
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



//auto generate end
        //following is where you can adapte your node type
        /*
        sample:
        O::test.outline.createNode = [](KeyValue *keyValue)->Node* {
            return Sprite::create("button.png");
        };
        */

		/**outline-adapter**/
	}
};
