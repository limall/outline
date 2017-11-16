#pragma once
//your include files and definition

//following is the auto generated code where you shouldn't write your code
//auto generate begin
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

	static Outline *test = new Outline();
//先将所有结构体声明好
/*
	struct Struct_%outline_nodeName% {
		string nodeName;
		%children%
		Outline *outline;
		Struct_%outline_nodeName% (string name) {
			this->nodeName=name;
		}
	};
*/
//    %structs%
//接着定义root节点变量
	static Struct_%outline_rootNodeName% *%outline_rootNodeName%=new Struct_%outline_rootNodeName%();
//接着定义init函数，该函数必须在使用前调用，另外还提供initAndAdapte函数

	void init() {
		//如下逐级初始化
		Struct_%outline_rootNodeName% *temp0 = root;
		Child1* temp1 = temp0->child1 = new Child1();
		Child1* temp2 = temp0->child2 = new Child2();
		//下一级
		Child11* temp3 = temp1->child11 = new Child11();
		...

		//再补全每个的children
	}


//auto generate end

//following is where you can adapte your node type
/*
sample:
    O::test.outline.createNode = [](KeyValue *keyValue)->Node* {
        return Sprite::create("button.png");
    };
*/
	static void adapte() {
		/**outline-adapter**/
	}
};