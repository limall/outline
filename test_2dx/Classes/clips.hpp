#include "cocos2d.h"
#include "outline.h"
#include <map>
using namespace cocos2d;

namespace Anims{
struct Anim : public AnimBase{
private:
	Anim() {
		frameIndex = 0;
		played = false;
	}
public:
	Anim* create() {
		auto pAnim = new Anim;
		return pAnim;
	}
	void resume() {
		auto that = this;
		std::map<string, SpriteFrame*> frame;
		Sprite* temp;
		node->schedule([=](float dt)->void {
			switch (that->frameIndex) {

			}
		}, key);
	}
};
};