#ifndef TEST3_H
#define TEST3_H
#include "cocos2d.h"
#include "outline.h"
#include <map>
using namespace cocos2d;

namespace Anims {
	struct Test3 : public AnimBase {
	private:
		Test3() {
			frameIndex = 0;
			played = false;
		}
	public:
		static Test3* create() {
			auto pAnim = new Test3;
			return pAnim;
		}
		void resume() {
			auto that = this;
			std::map<string, SpriteFrame*> frame;
			Sprite* temp;
    
			node->schedule([=](float dt)->void {
				if(that->frameIndex>60){
					node->unschedule(key);
					if(that->callback)
				        that->callback(key);
					return;
				}
				switch (that->frameIndex) {
                case 0:that->node->setPositionX(node->getPositionX()+469.6135593220339);break;
                case 1:that->node->setPositionX(node->getPositionX()+-18.549152542372894);break;
                case 2:that->node->setPositionX(node->getPositionX()+-19.708474576271215);break;
                case 3:that->node->setPositionX(node->getPositionX()+-19.7084745762711);break;
                case 4:that->node->setPositionX(node->getPositionX()+-19.708474576271215);break;
                case 5:that->node->setPositionX(node->getPositionX()+-18.549152542372894);break;
                case 6:that->node->setPositionX(node->getPositionX()+-19.708474576271215);break;
                case 7:that->node->setPositionX(node->getPositionX()+-18.54915254237278);break;
                case 8:that->node->setPositionX(node->getPositionX()+-23.186440677966118);break;
                case 9:that->node->setPositionX(node->getPositionX()+-16.23050847457631);break;
                case 10:that->node->setPositionX(node->getPositionX()+-20.867796610169535);break;
                case 11:that->node->setPositionX(node->getPositionX()+-17.389830508474574);break;
                case 12:that->node->setPositionX(node->getPositionX()+-18.54915254237295);break;
                case 13:that->node->setPositionX(node->getPositionX()+-20.867796610169535);break;
                case 14:that->node->setPositionX(node->getPositionX()+-19.708474576271158);break;
                case 15:that->node->setPositionX(node->getPositionX()+-18.549152542372838);break;
                case 16:that->node->setPositionX(node->getPositionX()+-18.54915254237295);break;
                case 17:that->node->setPositionX(node->getPositionX()+-18.549152542372838);break;
                case 18:that->node->setPositionX(node->getPositionX()+-22.027118644067855);break;
                case 19:that->node->setPositionX(node->getPositionX()+-17.38983050847463);break;
                case 20:that->node->setPositionX(node->getPositionX()+-19.7084745762711);break;
                case 21:that->node->setPositionX(node->getPositionX()+-18.549152542373065);break;
                case 22:that->node->setPositionX(node->getPositionX()+-20.867796610169478);break;
                case 23:that->node->setPositionX(node->getPositionX()+-20.867796610169535);break;
                case 24:that->node->setPositionX(node->getPositionX()+-16.230508474576254);break;
                case 25:that->node->setPositionX(node->getPositionX()+-20.86779661016959);break;
                case 26:that->node->setPositionX(node->getPositionX()+-18.549152542372667);break;
                case 27:that->node->setPositionX(node->getPositionX()+-18.549152542373122);break;
                case 28:that->node->setPositionX(node->getPositionX()+-19.708474576271172);break;
                case 29:that->node->setPositionX(node->getPositionX()+-19.708474576270973);break;
                case 30:that->node->setPositionX(node->getPositionX()+-18.549152542373236);break;
                case 31:that->node->setPositionX(node->getPositionX()+-22.027118644067556);break;
                case 32:that->node->setPositionX(node->getPositionX()+-17.389830508474418);break;
                case 33:that->node->setPositionX(node->getPositionX()+-19.708474576271435);break;
                case 34:that->node->setPositionX(node->getPositionX()+-18.549152542372752);break;
                case 35:that->node->setPositionX(node->getPositionX()+-19.708474576270905);break;
                case 36:that->node->setPositionX(node->getPositionX()+-18.549152542373136);break;
                case 37:that->node->setPositionX(node->getPositionX()+-19.70847457627118);break;
                case 38:that->node->setPositionX(node->getPositionX()+-22.027118644067762);break;
                case 39:that->node->setPositionX(node->getPositionX()+-17.38983050847446);break;
                case 40:that->node->setPositionX(node->getPositionX()+-19.708474576271172);break;
                case 41:that->node->setPositionX(node->getPositionX()+-18.549152542372482);break;
                case 42:that->node->setPositionX(node->getPositionX()+-19.708474576271556);break;
                case 43:that->node->setPositionX(node->getPositionX()+-20.867796610169506);break;
                case 44:that->node->setPositionX(node->getPositionX()+-17.389830508474034);break;
                case 45:that->node->setPositionX(node->getPositionX()+-19.708474576271698);break;
                case 46:that->node->setPositionX(node->getPositionX()+-17.38983050847446);break;
                case 47:that->node->setPositionX(node->getPositionX()+-20.867796610168938);break;
                case 48:that->node->setPositionX(node->getPositionX()+-18.549152542373292);break;
                case 49:that->node->setPositionX(node->getPositionX()+-19.708474576271158);break;
                case 50:that->node->setPositionX(node->getPositionX()+-19.708474576270646);break;
                case 51:that->node->setPositionX(node->getPositionX()+-19.70847457627167);break;
                case 52:that->node->setPositionX(node->getPositionX()+-18.549152542372894);break;
                case 53:that->node->setPositionX(node->getPositionX()+-20.867796610169364);break;
                case 54:that->node->setPositionX(node->getPositionX()+-18.549152542373008);break;
                case 55:that->node->setPositionX(node->getPositionX()+-18.549152542372838);break;
                case 56:that->node->setPositionX(node->getPositionX()+-19.708474576270305);break;
                case 57:that->node->setPositionX(node->getPositionX()+-18.549152542373633);break;
                case 58:that->node->setPositionX(node->getPositionX()+-20.867796610169535);break;
                case 59:that->node->setPositionX(node->getPositionX()+-17.38983050847571);break;

				}
				that->frameIndex++;
			}, key);
		}
	};
};
#endif