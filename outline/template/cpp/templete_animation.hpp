#ifndef /*define_h*/
#define /*define_h*/
#include "cocos2d.h"
#include "outline.h"
#include <map>
using namespace cocos2d;

namespace Anims {
	struct /*Anim*/ : public AnimBase {
	private:
		/*Anim*/() {
			frameIndex = 0;
			played = false;
		}
	public:
		static /*Anim*/* create() {
			auto pAnim = new /*Anim*/;
			return pAnim;
		}
		void resume() {
			auto that = this;
			std::map<string, SpriteFrame*> frame;
			Sprite* temp;
    /*frame*/
			node->schedule([=](float dt)->void {
				if(that->frameIndex>/*max*/){
					if (that->loop){
						that->frameIndex = 0;
					}else
					    node->unschedule(key);
					if (that->callback){
						that->callback(key);
						if(!that->loop)
						    that->callback=nullptr;
					}
					return;
				}
				switch (that->frameIndex) {
/*content*/
				}
				that->frameIndex++;
			}, key);
		}
	};
};
#endif
