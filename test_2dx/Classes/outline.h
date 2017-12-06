#ifndef OUTLINE_H
#define OUTLINE_H

#include "cocos2d.h"
#include <map>
#include "AutoScaleButton.h"
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

static void mapTypeInfo(string typeInfo, map<string,string> *keyValues) {
	vector<string> strs;
	int endIndex = typeInfo.find(";");
	bool haveKeyValue = typeInfo.find(":")>0;
	while (haveKeyValue) {
		string astr;
		if (endIndex < 0) {
			astr = typeInfo.substr(0);
			strs.push_back(astr);
			break;
		}
		else {
			astr = typeInfo.substr(0, endIndex);
			strs.push_back(astr);
		}
		typeInfo = typeInfo.substr(endIndex + 1);
		endIndex = typeInfo.find(";");
		haveKeyValue = typeInfo.find(":") > 0;
	}
	for (int i = 0; i < strs.size(); i++) {
		string *str = &strs[i];
		int divisionIndex = str->find(":");
		if (divisionIndex>0 && divisionIndex + 1<str->size()) {
			string key = str->substr(0, divisionIndex);
			(*keyValues)[key] = str->substr(divisionIndex + 1);
		}
	}
}

//默认创建node的函数
static auto createNode = [](map<string,string> *typeInfo, Node *parent, std::function<void(Node*)> button_onClick)->Node* {
	Node *node;
	if (typeInfo) {
		string type = (*typeInfo)["type"]; 
		if (type == "sprite")
			node = Sprite::create((*typeInfo)["info"]);
		else if (type == "label"){
			int fontSize;
			stringstream ss;
			ss << (*typeInfo)["fontSize"];
			ss >> fontSize;
			auto label = Label::create();
			label->setString((*typeInfo)["string"]);
			label->setSystemFontSize(fontSize);
			node = label;
		}
		else if (type == "button") {
			if (typeInfo->count("autoPress"))
				node = AutoScaleButton::create((*typeInfo)["info"], button_onClick);
		}else
			node = Node::create();
	}
	else
		node = Node::create();
	if (parent)
		parent->addChild(node);
	return node;
};

struct Outline {
	Node *defaultNode;
	std::function<void(Node*)> button_onClick = NULL;
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
	int colorR = 255;
	int colorG = 255;
	int colorB = 255;
	vector<Outline*> children;
	KeyValue type;
	std::function<Node*(map<string, string>*, Node*, std::function<void(Node*)>)> createNode;

	Node *create(Node *parent) {
		map<string, string> typeInfo;
		typeInfo["type"] = type.key;
		if (type.key == "sprite") {
			typeInfo["info"] = type.value;
		}
		else {
			mapTypeInfo(type.value, &typeInfo);
		}
		auto node = defaultNode = createNode(&typeInfo, parent,button_onClick);
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
		node->setColor(Color3B(colorR, colorG, colorB));
		for (int i = 0; i < children.size(); i++) {
			children[i]->create(node);
		}
		return node;
	}
	void reset(Node *node){
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
		node->setColor(Color3B(colorR, colorG, colorB));
	}
};

//所有节点结构体的基结构体
struct OStruct{
	Outline *outline;
	Node *create(Node *parent){
		return outline->create(parent);
	}
	Node *defaultNode() {
		return outline->defaultNode;
	}
	void reset(Node *node){
		outline->reset(node);
	}
};

struct AnimBase {
	int frameIndex;
	std::string key;
	Node *node;
	bool played;
	std::function<void(string)> callback;
	void pause() {
		node->unschedule(key);
	}
	void stop() {
		node->unschedule(key);
		delete this;
	}
	void play(Node *pNode, const std::string &key) {
		this->node = pNode;
		this->key = key;
		this->frameIndex = 0;
		if (pNode) {
			played = true;
			resume();
		}
	}
	void play(Node *pNode, const std::string &key, std::function<void(string)> callback) {
		this->node = pNode;
		this->key = key;
		this->frameIndex = 0;
		if (pNode) {
			played = true;
			this->callback = callback;
			resume();
		}
	}
	virtual void resume() = 0;
};

#endif // !OUTLINE_H