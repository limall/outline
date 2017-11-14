#pragma once
#include "cocos2d.h"
using namespace cocos2d;
using namespace std;

static struct Outline {
	float x;
	float y;
	float width;
	float height;
	float anchorX;
	float anchorY;
	float scale;
	float rotation;
	int opacity;
	bool visible;
	int zOrder;
	vector<Outline> children;

	struct KeyValue { string key, value; };
	vector<KeyValue> extraData;
	int getType() {
		const char *types[] = {"sprite","button","label"};
		for (int i = 0; i < extraData.size(); i++) {
			for (int j = 0; j < sizeof(types); j++) {
				if (extraData[i].key == types[j])
					return i;
			}
		}
	}

	Node *create() {
		Node* node;
		int typeIndex = getType();
		if (extraData[typeIndex].key == "sprite")
			node = Sprite::create(extraData[typeIndex].value);
		else
			node = Node::create();

		node->setPositionX(x);
		node->setPositionY(y);
		node->setContentSize(Size(width, height));
		node->setAnchorPoint(Vec2(anchorX, anchorY));
		node->setScale(scale);
		node->setRotation(rotation);
		node->setOpacity(opacity);
		node->setVisible(visible);
		node->setLocalZOrder(zOrder);
		for (int i = 0; i < children.size(); i++) {
			node->addChild(children[i].create());
		}
		return node;
	};
};

namespace O {

	static struct {
		struct {
			int aaa=50;
		} b;
		Node *create(){
			auto beauty = Sprite::create("beauty.jpg");
			beauty->setPositionX(-186);
			beauty->setPositionY(-18);
			beauty->setScale(0.3f);
			auto meinv = Sprite::create("meinv.jpg");
			meinv->setPositionX(283);
			meinv->setPositionY(-9);
			meinv->setScale(0.3f);
			auto node = Node::create();
			node->addChild(beauty);
			node->addChild(meinv);
			return node;
		}
	} test;
};