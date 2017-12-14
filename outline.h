#ifndef OUTLINE_H
#define OUTLINE_H

#include "cocos2d.h"
#include <map>
using namespace cocos2d;
using namespace std;

struct Outline;
struct OStruct;

//存放node的轮廓，可以理解为node的抽象模板
struct Outline {
	Node *lastNode;
	float x = 0;
	float y = 0;
	float width = 0;
	float height = 0;
	float anchorX = 0.5f;
	float anchorY = 0.5f;
	float scaleX = 1;
	float scaleY = 1;
	float rotation = 0;
	int opacity = 255;
	bool visible = true;
	int zOrder = 0;
	int colorR = 255;
	int colorG = 255;
	int colorB = 255;
	OStruct *pOit;
	vector<Outline*> children;
	std::function<Node*(OStruct*, Node*)> createNode;

	Node *create(Node *parent) {
		auto node = lastNode = createNode(pOit, parent);
		reset(node);
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
		node->setScaleX(scaleX);
		node->setScaleY(scaleY);
		node->setRotation(rotation);
		node->setOpacity(opacity);
		node->setVisible(visible);
		node->setLocalZOrder(zOrder);
		node->setColor(Color3B(colorR, colorG, colorB));
	}
};

//所有节点结构体的基结构体
struct OStruct{
	bool isLabel=false, isSprite=false;
	int label_fontSize;
	string label_string, imageFile;

	Outline *outline;
	Node *create(Node *parent){
		return outline->create(parent);
	}
	Node *lastNode() {
		return outline->lastNode;
	}
	void reset(Node *node){
		outline->reset(node);
	}
};

//默认创建node的函数
static auto createNode = [](OStruct *extraData, Node *parent)->Node* {
	Node *node;
	if (extraData) {
		if (extraData->isSprite){
			node = Sprite::create(extraData->imageFile);
		}
		else if (extraData->isLabel){
			int fontSize;
			auto label = Label::create();
			label->setString(extraData->label_string);
			label->setSystemFontSize(extraData->label_fontSize);
			node = label;
		}
		else
			node = Node::create();
	}
	else
		node = Node::create();
	if (parent)
		parent->addChild(node);
	return node;
};

//所有动画结构体的基结构体
struct AnimBase {
protected:
	float offset;
	void addOpacity(Node* node, float addOpacity){
		addOpacity += offset;
		int trueAdd = (int)addOpacity;
		offset = addOpacity - trueAdd;

		int opacity = node->getOpacity();
		int newOpacity = opacity + trueAdd;
		if (newOpacity > 255)
			newOpacity = 255;
		else if (newOpacity < 0)
			newOpacity = 0;
		node->setOpacity(newOpacity);
	}
public:
	int frameIndex;
	std::string key;
	Node *node;
	bool played;
	bool loop;
	std::function<void(string)> callback;
	void pause() {
		node->unschedule(key);
	}
	void stop() {
		node->unschedule(key);
		delete this;
	}
	void play(Node *pNode, const std::string &key,bool loop) {
		this->offset = 0;
		this->node = pNode;
		this->key = key;
		this->frameIndex = 0;
		this->loop = loop;

		if (pNode) {
			played = true;
			resume();
		}
	}
	void play(Node *pNode, const std::string &key,bool loop, std::function<void(string)> callback) {
		this->node = pNode;
		this->key = key;
		this->frameIndex = 0;
		this->loop = loop;
		if (pNode) {
			played = true;
			this->callback = callback;
			resume();
		}
	}
	virtual void resume() = 0;
};

#endif // !OUTLINE_H