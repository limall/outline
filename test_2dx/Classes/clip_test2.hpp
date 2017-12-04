#ifndef TEST2_H
#define TEST2_H
#include "cocos2d.h"
#include "outline.h"
#include <map>
using namespace cocos2d;

namespace Anims {
	struct Test2 : public AnimBase {
	private:
		Test2() {
			frameIndex = 0;
			played = false;
		}
	public:
		static Test2* create() {
			auto pAnim = new Test2;
			return pAnim;
		}
		void resume() {
			auto that = this;
			std::map<string, SpriteFrame*> frame;
			Sprite* temp;
    
			node->schedule([=](float dt)->void {
				if(that->frameIndex>150){
					node->unschedule(key);
					if(that->callback)
				        that->callback(key);
					return;
				}
				switch (that->frameIndex) {
                case 0:that->node->setPositionX(node->getPositionX()+3.0000000000000036);that->node->setPositionY(node->getPositionY()+110.99999999999999);break;
                case 1:that->node->setPositionX(node->getPositionX()+-0.3370561581282949);that->node->setPositionY(node->getPositionY()+0.6281501128754599);break;
                case 2:that->node->setPositionX(node->getPositionX()+-0.3108316578520025);that->node->setPositionY(node->getPositionY()+0.5792771805423627);break;
                case 3:that->node->setPositionX(node->getPositionX()+-0.26837451847585925);that->node->setPositionY(node->getPositionY()+0.500152511705025);break;
                case 4:that->node->setPositionX(node->getPositionX()+-0.25672930173506003);that->node->setPositionY(node->getPositionY()+0.478450062324427);break;
                case 5:that->node->setPositionX(node->getPositionX()+-0.21483478003995415);that->node->setPositionY(node->getPositionY()+0.4003739082562845);break;
                case 6:that->node->setPositionX(node->getPositionX()+-0.19855594393295561);that->node->setPositionY(node->getPositionY()+0.3700360773296012);break;
                case 7:that->node->setPositionX(node->getPositionX()+-0.1656671627828139);that->node->setPositionY(node->getPositionY()+0.3087433488225031);break;
                case 8:that->node->setPositionX(node->getPositionX()+-0.13187698977684903);that->node->setPositionY(node->getPositionY()+0.2457707536750462);break;
                case 9:that->node->setPositionX(node->getPositionX()+-0.08701785564531761);that->node->setPositionY(node->getPositionY()+0.1621696400662671);break;
                case 10:that->node->setPositionX(node->getPositionX()+-0.06742322801459366);that->node->setPositionY(node->getPositionY()+0.12565237948174968);break;
                case 11:that->node->setPositionX(node->getPositionX()+-0.02096884558976342);that->node->setPositionY(node->getPositionY()+0.03907830314456362);break;
                case 12:that->node->setPositionX(node->getPositionX()+0.012787857980764983);that->node->setPositionY(node->getPositionY()+-0.02383191714598354);break;
                case 13:that->node->setPositionX(node->getPositionX()+0.05829915841488997);that->node->setPositionY(node->getPositionY()+-0.1086484315913765);break;
                case 14:that->node->setPositionX(node->getPositionX()+0.09554042504785087);that->node->setPositionY(node->getPositionY()+-0.17805261031645614);break;
                case 15:that->node->setPositionX(node->getPositionX()+0.18175344461575094);that->node->setPositionY(node->getPositionY()+-0.3387223286020884);break;
                case 16:that->node->setPositionX(node->getPositionX()+0.16312867043418322);that->node->setPositionY(node->getPositionY()+-0.3040125221727834);break;
                case 17:that->node->setPositionX(node->getPositionX()+0.2506448798555425);that->node->setPositionY(node->getPositionY()+-0.4671109124580539);break;
                case 18:that->node->setPositionX(node->getPositionX()+0.28526331396394156);that->node->setPositionY(node->getPositionY()+-0.5316270851146214);break;
                case 19:that->node->setPositionX(node->getPositionX()+0.3620630175257631);that->node->setPositionY(node->getPositionY()+-0.6747538053889173);break;
                case 20:that->node->setPositionX(node->getPositionX()+0.453281506693731);that->node->setPositionY(node->getPositionY()+-0.8447518988383251);break;
                case 21:that->node->setPositionX(node->getPositionX()+0.46246313803137795);that->node->setPositionY(node->getPositionY()+-0.8618631208766487);break;
                case 22:that->node->setPositionX(node->getPositionX()+0.5248245273131005);that->node->setPositionY(node->getPositionY()+-0.9780820736289826);break;
                case 23:that->node->setPositionX(node->getPositionX()+0.6326475441041097);that->node->setPositionY(node->getPositionY()+-1.1790249685576413);break;
                case 24:that->node->setPositionX(node->getPositionX()+0.6662548902117535);that->node->setPositionY(node->getPositionY()+-1.2416568408491742);break;
                case 25:that->node->setPositionX(node->getPositionX()+0.89688167711898);that->node->setPositionY(node->getPositionY()+-1.6714613073581148);break;
                case 26:that->node->setPositionX(node->getPositionX()+0.838435466375568);that->node->setPositionY(node->getPositionY()+-1.5625388236999243);break;
                case 27:that->node->setPositionX(node->getPositionX()+0.8616660174326292);that->node->setPositionY(node->getPositionY()+-1.605832123397164);break;
                case 28:that->node->setPositionX(node->getPositionX()+1.1512604660288748);that->node->setPositionY(node->getPositionY()+-2.1455308685083594);break;
                case 29:that->node->setPositionX(node->getPositionX()+1.0493677323400412);that->node->setPositionY(node->getPositionY()+-1.9556398648155238);break;
                case 30:that->node->setPositionX(node->getPositionX()+1.3053587364782597);that->node->setPositionY(node->getPositionY()+-2.4327140088913097);break;
                case 31:that->node->setPositionX(node->getPositionX()+1.4377813648822606);that->node->setPositionY(node->getPositionY()+-2.6795016345533043);break;
                case 32:that->node->setPositionX(node->getPositionX()+1.5781163174563417);that->node->setPositionY(node->getPositionY()+-2.941034955259539);break;
                case 33:that->node->setPositionX(node->getPositionX()+1.6190051704938977);that->node->setPositionY(node->getPositionY()+-3.0172369086477175);break;
                case 34:that->node->setPositionX(node->getPositionX()+1.882920198386413);that->node->setPositionY(node->getPositionY()+-3.509078551538323);break;
                case 35:that->node->setPositionX(node->getPositionX()+2.0584402571824354);that->node->setPositionY(node->getPositionY()+-3.8361841156581704);break;
                case 36:that->node->setPositionX(node->getPositionX()+2.104304255044518);that->node->setPositionY(node->getPositionY()+-3.921657929855698);break;
                case 37:that->node->setPositionX(node->getPositionX()+2.4380674743242503);that->node->setPositionY(node->getPositionY()+-4.5436712021497385);break;
                case 38:that->node->setPositionX(node->getPositionX()+2.654453299152319);that->node->setPositionY(node->getPositionY()+-4.946935693874778);break;
                case 39:that->node->setPositionX(node->getPositionX()+2.884536770979312);that->node->setPositionY(node->getPositionY()+-5.3757276186432605);break;
                case 40:that->node->setPositionX(node->getPositionX()+2.9296880016342417);that->node->setPositionY(node->getPositionY()+-5.4598730939547195);break;
                case 41:that->node->setPositionX(node->getPositionX()+3.78895683852795);that->node->setPositionY(node->getPositionY()+-7.061237744529372);break;
                case 42:that->node->setPositionX(node->getPositionX()+2.971115536388993);that->node->setPositionY(node->getPositionY()+-5.537078954179485);break;
                case 43:that->node->setPositionX(node->getPositionX()+3.8668335541327004);that->node->setPositionY(node->getPositionY()+-7.206371623610934);break;
                case 44:that->node->setPositionX(node->getPositionX()+5.141121206504394);that->node->setPositionY(node->getPositionY()+-9.581180430303638);break;
                case 45:that->node->setPositionX(node->getPositionX()+3.0658044304842456);that->node->setPositionY(node->getPositionY()+-5.713544620447914);break;
                case 46:that->node->setPositionX(node->getPositionX()+4.555014885694966);that->node->setPositionY(node->getPositionY()+-8.488891377886063);break;
                case 47:that->node->setPositionX(node->getPositionX()+4.730315198346226);that->node->setPositionY(node->getPositionY()+-8.815587415099792);break;
                case 48:that->node->setPositionX(node->getPositionX()+4.569721984883543);that->node->setPositionY(node->getPositionY()+-8.516300062737507);break;
                case 49:that->node->setPositionX(node->getPositionX()+4.936546335100623);that->node->setPositionY(node->getPositionY()+-9.199927260869362);break;
                case 50:that->node->setPositionX(node->getPositionX()+4.672854656595419);that->node->setPositionY(node->getPositionY()+-8.708501860018739);break;
                case 51:that->node->setPositionX(node->getPositionX()+5.231210611730198);that->node->setPositionY(node->getPositionY()+-9.749074321860803);break;
                case 52:that->node->setPositionX(node->getPositionX()+4.589038343554833);that->node->setPositionY(node->getPositionY()+-8.552298731170389);break;
                case 53:that->node->setPositionX(node->getPositionX()+4.769655822905349);that->node->setPositionY(node->getPositionY()+-8.888904033596361);break;
                case 54:that->node->setPositionX(node->getPositionX()+4.369724277809311);that->node->setPositionY(node->getPositionY()+-8.143577063190044);break;
                case 55:that->node->setPositionX(node->getPositionX()+4.995923455878312);that->node->setPositionY(node->getPositionY()+-9.310584622318657);break;
                case 56:that->node->setPositionX(node->getPositionX()+3.561663057590124);that->node->setPositionY(node->getPositionY()+-6.6376447891452415);break;
                case 57:that->node->setPositionX(node->getPositionX()+4.623979070963983);that->node->setPositionY(node->getPositionY()+-8.617415541341984);break;
                case 58:that->node->setPositionX(node->getPositionX()+3.506844988129288);that->node->setPositionY(node->getPositionY()+-6.535483841513653);break;
                case 59:that->node->setPositionX(node->getPositionX()+3.7989100686784383);that->node->setPositionY(node->getPositionY()+-7.079786946173442);break;
                case 60:that->node->setPositionX(node->getPositionX()+3.4229251046184146);that->node->setPositionY(node->getPositionY()+-6.379087694970693);break;
                case 61:that->node->setPositionX(node->getPositionX()+3.666017209605144);that->node->setPositionY(node->getPositionY()+-6.83212298153687);break;
                case 62:that->node->setPositionX(node->getPositionX()+3.3031212115802617);that->node->setPositionY(node->getPositionY()+-6.155816803399588);break;
                case 63:that->node->setPositionX(node->getPositionX()+2.9740795949327747);that->node->setPositionY(node->getPositionY()+-5.542602881465598);break;
                case 64:that->node->setPositionX(node->getPositionX()+3.0168460650825892);that->node->setPositionY(node->getPositionY()+-5.622304030381201);break;
                case 65:that->node->setPositionX(node->getPositionX()+2.8809323554842763);that->node->setPositionY(node->getPositionY()+-5.369010298857063);break;
                case 66:that->node->setPositionX(node->getPositionX()+2.441135379517874);that->node->setPositionY(node->getPositionY()+-4.549388661828772);break;
                case 67:that->node->setPositionX(node->getPositionX()+2.7936859847055757);that->node->setPositionY(node->getPositionY()+-5.206414789678547);break;
                case 68:that->node->setPositionX(node->getPositionX()+2.235652355579063);that->node->setPositionY(node->getPositionY()+-4.166443026306496);break;
                case 69:that->node->setPositionX(node->getPositionX()+2.565802323619181);that->node->setPositionY(node->getPositionY()+-4.781722512199309);break;
                case 70:that->node->setPositionX(node->getPositionX()+2.318442287975813);that->node->setPositionY(node->getPositionY()+-4.320733354864046);break;
                case 71:that->node->setPositionX(node->getPositionX()+2.2216326589751674);that->node->setPositionY(node->getPositionY()+-4.140315409908283);break;
                case 72:that->node->setPositionX(node->getPositionX()+2.009271790723602);that->node->setPositionY(node->getPositionY()+-3.7445519736212702);break;
                case 73:that->node->setPositionX(node->getPositionX()+1.932255392384036);that->node->setPositionY(node->getPositionY()+-3.6010214130793656);break;
                case 74:that->node->setPositionX(node->getPositionX()+1.9706881644440841);that->node->setPositionY(node->getPositionY()+-3.672646124645695);break;
                case 75:that->node->setPositionX(node->getPositionX()+1.8925723957691503);that->node->setPositionY(node->getPositionY()+-3.5270667375698395);break;
                case 76:that->node->setPositionX(node->getPositionX()+1.8184715014584185);that->node->setPositionY(node->getPositionY()+-3.3889696163542737);break;
                case 77:that->node->setPositionX(node->getPositionX()+1.64877586876608);that->node->setPositionY(node->getPositionY()+-3.072718664518618);break;
                case 78:that->node->setPositionX(node->getPositionX()+1.489947571481025);that->node->setPositionY(node->getPositionY()+-2.7767204741237492);break;
                case 79:that->node->setPositionX(node->getPositionX()+1.629480428977132);that->node->setPositionY(node->getPositionY()+-3.0367589812755966);break;
                case 80:that->node->setPositionX(node->getPositionX()+1.6581150805369305);that->node->setPositionY(node->getPositionY()+-3.0901235591823877);break;
                case 81:that->node->setPositionX(node->getPositionX()+1.505535728152239);that->node->setPositionY(node->getPositionY()+-2.8057711297383037);break;
                case 82:that->node->setPositionX(node->getPositionX()+1.3675963429479907);that->node->setPositionY(node->getPositionY()+-2.54870227549398);break;
                case 83:that->node->setPositionX(node->getPositionX()+1.4000075865718316);that->node->setPositionY(node->getPositionY()+-2.6091050477020303);break;
                case 84:that->node->setPositionX(node->getPositionX()+1.3492041954673937);that->node->setPositionY(node->getPositionY()+-2.5144260006437946);break;
                case 85:that->node->setPositionX(node->getPositionX()+1.374595359606019);that->node->setPositionY(node->getPositionY()+-2.561745897447622);break;
                case 86:that->node->setPositionX(node->getPositionX()+1.2514020081075898);that->node->setPositionY(node->getPositionY()+-2.332158287836819);break;
                case 87:that->node->setPositionX(node->getPositionX()+1.0689482114586326);that->node->setPositionY(node->getPositionY()+-1.9921307577183995);break;
                case 88:that->node->setPositionX(node->getPositionX()+1.168837432203361);that->node->setPositionY(node->getPositionY()+-2.1782879418335312);break;
                case 89:that->node->setPositionX(node->getPositionX()+0.9982919848480947);that->node->setPositionY(node->getPositionY()+-1.8604532444896051);break;
                case 90:that->node->setPositionX(node->getPositionX()+1.0930854452994367);that->node->setPositionY(node->getPositionY()+-2.037113784421706);break;
                case 91:that->node->setPositionX(node->getPositionX()+0.9926596489710562);that->node->setPositionY(node->getPositionY()+-1.8499566185369645);break;
                case 92:that->node->setPositionX(node->getPositionX()+1.019882315454396);that->node->setPositionY(node->getPositionY()+-1.9006897697104819);break;
                case 93:that->node->setPositionX(node->getPositionX()+0.9842093962861043);that->node->setPositionY(node->getPositionY()+-1.8342084203513593);break;
                case 94:that->node->setPositionX(node->getPositionX()+0.9491821855064018);that->node->setPositionY(node->getPositionY()+-1.76893043662551);break;
                case 95:that->node->setPositionX(node->getPositionX()+0.9160505138117117);that->node->setPositionY(node->getPositionY()+-1.7071850484673234);break;
                case 96:that->node->setPositionX(node->getPositionX()+0.8337432157420324);that->node->setPositionY(node->getPositionY()+-1.5537941747919888);break;
                case 97:that->node->setPositionX(node->getPositionX()+0.8548943062990304);that->node->setPositionY(node->getPositionY()+-1.5932121162845476);break;
                case 98:that->node->setPositionX(node->getPositionX()+0.8249697326546936);that->node->setPositionY(node->getPositionY()+-1.537443592674606);break;
                case 99:that->node->setPositionX(node->getPositionX()+0.7507256824364674);that->node->setPositionY(node->getPositionY()+-1.3990796809043502);break;
                case 100:that->node->setPositionX(node->getPositionX()+0.857045862273992);that->node->setPositionY(node->getPositionY()+-1.5972218342379563);break;
                case 101:that->node->setPositionX(node->getPositionX()+0.6549490528691706);that->node->setPositionY(node->getPositionY()+-1.2205868712561312);break;
                case 102:that->node->setPositionX(node->getPositionX()+0.7160833890053198);that->node->setPositionY(node->getPositionY()+-1.3345190431463152);break;
                case 103:that->node->setPositionX(node->getPositionX()+0.651260024257482);that->node->setPositionY(node->getPositionY()+-1.213711863388852);break;
                case 104:that->node->setPositionX(node->getPositionX()+0.6671978559016338);that->node->setPositionY(node->getPositionY()+-1.243414185998546);break;
                case 105:that->node->setPositionX(node->getPositionX()+0.6065760165199379);that->node->setPositionY(node->getPositionY()+-1.1304371216962465);break;
                case 106:that->node->setPositionX(node->getPositionX()+0.6210883542673287);that->node->setPositionY(node->getPositionY()+-1.1574828420436631);break;
                case 107:that->node->setPositionX(node->getPositionX()+0.5639638949346306);that->node->setPositionY(node->getPositionY()+-1.0510236223782101);break;
                case 108:that->node->setPositionX(node->getPositionX()+0.5779415924156979);that->node->setPositionY(node->getPositionY()+-1.0770729676837618);break;
                case 109:that->node->setPositionX(node->getPositionX()+0.5236828977137975);that->node->setPositionY(node->getPositionY()+-0.9759544911938747);break;
                case 110:that->node->setPositionX(node->getPositionX()+0.5977670425294264);that->node->setPositionY(node->getPositionY()+-1.1140203974412657);break;
                case 111:that->node->setPositionX(node->getPositionX()+0.48439382799659825);that->node->setPositionY(node->getPositionY()+-0.9027339521755096);break;
                case 112:that->node->setPositionX(node->getPositionX()+0.46684202256764706);that->node->setPositionY(node->getPositionY()+-0.8700237693305723);break;
                case 113:that->node->setPositionX(node->getPositionX()+0.557711786561498);that->node->setPositionY(node->getPositionY()+-1.0393719658646319);break;
                case 114:that->node->setPositionX(node->getPositionX()+0.32396835278532876);that->node->setPositionY(node->getPositionY()+-0.6037592029181269);break;
                case 115:that->node->setPositionX(node->getPositionX()+0.49248220567960743);that->node->setPositionY(node->getPositionY()+-0.9178077469483128);break;
                case 116:that->node->setPositionX(node->getPositionX()+0.42166060939160843);that->node->setPositionY(node->getPositionY()+-0.7858220447752728);break;
                case 117:that->node->setPositionX(node->getPositionX()+0.3813066687658875);that->node->setPositionY(node->getPositionY()+-0.7106169736091488);break;
                case 118:that->node->setPositionX(node->getPositionX()+0.366209149849567);that->node->setPositionY(node->getPositionY()+-0.6824806883560086);break;
                case 119:that->node->setPositionX(node->getPositionX()+0.3724596695170135);that->node->setPositionY(node->getPositionY()+-0.694129384099881);break;
                case 120:that->node->setPositionX(node->getPositionX()+0.3561968963319089);that->node->setPositionY(node->getPositionY()+-0.6638214886185665);break;
                case 121:that->node->setPositionX(node->getPositionX()+0.32112258967805474);that->node->setPositionY(node->getPositionY()+-0.5984557353091304);break;
                case 122:that->node->setPositionX(node->getPositionX()+0.3439898973155948);that->node->setPositionY(node->getPositionY()+-0.6410720813608464);break;
                case 123:that->node->setPositionX(node->getPositionX()+0.2747209432878037);that->node->setPositionY(node->getPositionY()+-0.5119799397637053);break;
                case 124:that->node->setPositionX(node->getPositionX()+0.296490529520554);that->node->setPositionY(node->getPositionY()+-0.5525505322883077);break;
                case 125:that->node->setPositionX(node->getPositionX()+0.2658897081334146);that->node->setPositionY(node->getPositionY()+-0.49552172879401724);break;
                case 126:that->node->setPositionX(node->getPositionX()+0.2688260752241831);that->node->setPositionY(node->getPositionY()+-0.5009940492814735);break;
                case 127:that->node->setPositionX(node->getPositionX()+0.25463150539337676);that->node->setPositionY(node->getPositionY()+-0.47454053277851926);break;
                case 128:that->node->setPositionX(node->getPositionX()+0.24100818907956523);that->node->setPositionY(node->getPositionY()+-0.4491516251028429);break;
                case 129:that->node->setPositionX(node->getPositionX()+0.22767251108496112);that->node->setPositionY(node->getPositionY()+-0.4242987706583108);break;
                case 130:that->node->setPositionX(node->getPositionX()+0.19023579835868532);that->node->setPositionY(node->getPositionY()+-0.3545303514866873);break;
                case 131:that->node->setPositionX(node->getPositionX()+0.21498678183996844);that->node->setPositionY(node->getPositionY()+-0.40065718433811526);break;
                case 132:that->node->setPositionX(node->getPositionX()+0.16828086613026016);that->node->setPositionY(node->getPositionY()+-0.313614341424568);break;
                case 133:that->node->setPositionX(node->getPositionX()+0.17935643679462032);that->node->setPositionY(node->getPositionY()+-0.33425517766272606);break;
                case 134:that->node->setPositionX(node->getPositionX()+0.16727436056550005);that->node->setPositionY(node->getPositionY()+-0.3117385810538167);break;
                case 135:that->node->setPositionX(node->getPositionX()+0.15543029222126847);that->node->setPositionY(node->getPositionY()+-0.28966554459418603);break;
                case 136:that->node->setPositionX(node->getPositionX()+0.1592032182556693);that->node->setPositionY(node->getPositionY()+-0.29669690674921867);break;
                case 137:that->node->setPositionX(node->getPositionX()+0.11661067614920739);that->node->setPositionY(node->getPositionY()+-0.21731989645991234);break;
                case 138:that->node->setPositionX(node->getPositionX()+0.11452582677895862);that->node->setPositionY(node->getPositionY()+-0.2134344953607865);break;
                case 139:that->node->setPositionX(node->getPositionX()+0.11071670994661531);that->node->setPositionY(node->getPositionY()+-0.20633568671865987);break;
                case 140:that->node->setPositionX(node->getPositionX()+0.09445694616971423);that->node->setPositionY(node->getPositionY()+-0.17603339967990905);break;
                case 141:that->node->setPositionX(node->getPositionX()+0.09019141539738484);that->node->setPositionY(node->getPositionY()+-0.16808400142247137);break;
                case 142:that->node->setPositionX(node->getPositionX()+0.07510679372541063);that->node->setPositionY(node->getPositionY()+-0.1399717519427668);break;
                case 143:that->node->setPositionX(node->getPositionX()+0.07018649622517614);that->node->setPositionY(node->getPositionY()+-0.1308021066014362);break;
                case 144:that->node->setPositionX(node->getPositionX()+0.06311394416400162);that->node->setPositionY(node->getPositionY()+-0.11762144139663633);break;
                case 145:that->node->setPositionX(node->getPositionX()+0.04715572928199663);that->node->setPositionY(node->getPositionY()+-0.08788113184374424);break;
                case 146:that->node->setPositionX(node->getPositionX()+0.03840460978503302);that->node->setPositionY(node->getPositionY()+-0.07157222732655555);break;
                case 147:that->node->setPositionX(node->getPositionX()+0.031653145829011464);that->node->setPositionY(node->getPositionY()+-0.05898995359046921);break;
                case 148:that->node->setPositionX(node->getPositionX()+0.022115131913636787);that->node->setPositionY(node->getPositionY()+-0.04121456402089052);break;
                case 149:that->node->setPositionX(node->getPositionX()+0.01291858249490474);that->node->setPositionY(node->getPositionY()+-0.024075540104092852);break;

				}
				that->frameIndex++;
			}, key);
		}
	};
};
#endif