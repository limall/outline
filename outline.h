#ifndef OUTLINE_H
#define OUTLINE_H

#include "cocos2d.h"
#include <map>
using namespace cocos2d;
using namespace std;

struct Outline;
struct Creator;

//存放node的轮廓，可以理解为node的抽象模板
struct Outline {
	//类型信息，outline默认只能辨别node、label、sprite类型
	bool isLabel = false, isSprite = false;
	int label_fontSize;
	string label_string, imageFile;

	//最后一个使用此outline创造的node
	Node *lastNode;

	//模板信息
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

	//指向对应的creator实例
	Creator *pOit;

	//子节点的outline
	vector<Outline*> children;

	//该node的创造函数
	std::function<Node*(Creator*, Node*)> createNode;

	//以"o__"为前缀的自定义组件信息存放于该成员
	string mapAble; 

	//创造node，包括子node
	Node *create(Node *parent) {
		auto node = lastNode = createNode(pOit, parent);
		reset(node);
		for (int i = 0; i < children.size(); i++) {
			children[i]->create(node);
		}
		return node;
	}

	//为传入的node套用模板的数据
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

//所有节点模板结构体的基结构体
struct Creator{
	Outline *outline;
	Node *create(Node *parent){
		return outline->create(parent);
	}
	Node *lastNode() {
		return outline->lastNode;
	}
};

//默认创建node的函数
static auto createNode = [](Creator *creator, Node *parent)->Node* {
	Node *node;
	if (creator) {
		if (creator->outline->isSprite){
			node = Sprite::create(creator->outline->imageFile);
		}
		else if (creator->outline->isLabel){
			int fontSize;
			auto label = Label::create();
			label->setString(creator->outline->label_string);
			label->setSystemFontSize(creator->outline->label_fontSize);
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
	//减少因float转int截断产生的偏差
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
	//播放到的帧数
	int frameIndex;
	//对应schedule的key
	std::string key;
	//需要播放的node
	Node *node;
	bool played;
	//是否循环
	bool loop;
	//播放完后回调
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
