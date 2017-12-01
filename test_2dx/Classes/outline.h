#ifndef OUTLINE_H
#define OUTLINE_H

#include "cocos2d.h"
using namespace cocos2d;
using namespace std;

struct KeyValue {
	string key, value;
	KeyValue() {}
	KeyValue(string key, string value) {
		this->key = key;
		this->value = value;
	}
};

static void type2KeyValue(string type, vector<KeyValue> *keyValues) {
	vector<string> strs;
	int endIndex = type.find(";");
	bool haveKeyValue = type.find(":")>0;
	while (haveKeyValue) {
		string astr;
		if (endIndex < 0) {
			astr = type.substr(0);
			strs.push_back(astr);
			break;
		}
		else {
			astr = type.substr(0, endIndex);
			strs.push_back(astr);
		}
		type = type.substr(endIndex + 1);
		endIndex = type.find(";");
		haveKeyValue = type.find(":") > 0;
	}
	for (int i = 0; i < strs.size(); i++) {
		string *str = &strs[i];
		int divisionIndex = str->find(":");
		if (divisionIndex>0 && divisionIndex + 1<str->size()) {
			KeyValue keyValue;
			keyValue.key = str->substr(0, divisionIndex);
			keyValue.value = str->substr(divisionIndex + 1);
			keyValues->push_back(keyValue);
		}
	}
}

static auto createNode = [](KeyValue *keyValue, Node *parent)->Node* {
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
	if (parent)
		parent->addChild(node);
	return node;
};

struct Outline {
	float x = 0;
	float y = 0;
	float width = 0;
	float height = 0;
	float anchorX = 0.5f;
	float anchorY = 0.5f;
	float scale = 1;
	float rotation = 0;
	int opacity = 255;
	bool visible = true;
	int zOrder = 0;
	vector<Outline*> children;
	KeyValue type;
	std::function<Node*(KeyValue*, Node*)> createNode;

	Node *create(Node *parent) {
		auto node = createNode(&type, parent);
		node->setPositionX(x);
		node->setPositionY(y);
		if (width>0 && height>0)
			node->setContentSize(Size(width, height));
		node->setAnchorPoint(Vec2(anchorX, anchorY));
		node->setScale(scale);
		node->setRotation(rotation);
		node->setOpacity(opacity);
		node->setVisible(visible);
		node->setLocalZOrder(zOrder);
		for (int i = 0; i < children.size(); i++) {
			children[i]->create(node);
		}
		return node;
	}
};

struct OStruct{
	Outline *outline;
	Node *create(Node *parent){
		return outline->create(parent);
	}
};

#endif // !OUTLINE_H