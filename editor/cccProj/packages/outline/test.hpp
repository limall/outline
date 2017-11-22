

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
    
    static struct Struct_Canvas_test_beauty {
	    std::string nodeName;
	    Outline *outline;
	    Struct_Canvas_test_beauty (string name) {
		    this->nodeName=name;
	    }
    };
    static struct Struct_Canvas_test_meinv {
	    std::string nodeName;
	    Outline *outline;
	    Struct_Canvas_test_meinv (string name) {
		    this->nodeName=name;
	    }
    };
    static struct Struct_Canvas_test {
	    std::string nodeName;
        Struct_Canvas_test_beauty *beauty;
        Struct_Canvas_test_meinv *meinv;
	    Outline *outline;
	    Struct_Canvas_test (string name) {
		    this->nodeName=name;
	    }
    };
    static struct Struct_Canvas {
	    std::string nodeName;
        Struct_Canvas_test *test;
	    Outline *outline;
	    Struct_Canvas (string name) {
		    this->nodeName=name;
	    }
    };


    static Struct_Canvas Canvas=new Struct_Canvas('Canvas');
    auto outline_Canvas=Canvas->outline=new Outline();
    outline_Canvas.createNode=createNode;
    outline_Canvas.x=480;
    outline_Canvas.y=320;
    outline_Canvas.anchorX=0.5;
    outline_Canvas.anchorY=0.5;
    outline_Canvas.width=960;
    outline_Canvas.height=640;
    outline_Canvas.scale=1;
    outline_Canvas.rotation=0;
    outline_Canvas.opacity=255;
    outline_Canvas.visible=true;
    outline_Canvas.zOrder=0;



//接着定义init函数，用于初始化各个outline的实例，并且执行adapte。注意该函数必须在使用前调用，用户可在/*outline-adapter*/标记后对各个节点的createNode进行自定义

	void init() {
		
        auto Canvas_test = Canvas->test = new Struct_Canvas_test("test");
        auto outline_Canvas_test=Canvas_test->outline=new Outline();
        outline_Canvas_test.createNode=createNode;
        outline_Canvas_test.x=0;
        outline_Canvas_test.y=0;
        outline_Canvas_test.anchorX=0.5;
        outline_Canvas_test.anchorY=0.5;
        outline_Canvas_test.width=0;
        outline_Canvas_test.height=0;
        outline_Canvas_test.scale=1;
        outline_Canvas_test.rotation=0;
        outline_Canvas_test.opacity=255;
        outline_Canvas_test.visible=true;
        outline_Canvas_test.zOrder=0;

        auto Canvas_test_beauty = Canvas_test->beauty = new Struct_Canvas_test_beauty("beauty");
        auto outline_Canvas_test_beauty=Canvas_test_beauty->outline=new Outline();
        outline_Canvas_test_beauty.createNode=createNode;
        outline_Canvas_test_beauty.x=-186;
        outline_Canvas_test_beauty.y=-18;
        outline_Canvas_test_beauty.anchorX=0.5;
        outline_Canvas_test_beauty.anchorY=0.5;
        outline_Canvas_test_beauty.width=1600;
        outline_Canvas_test_beauty.height=1200;
        outline_Canvas_test_beauty.scale=0.3;
        outline_Canvas_test_beauty.rotation=0;
        outline_Canvas_test_beauty.opacity=255;
        outline_Canvas_test_beauty.visible=true;
        outline_Canvas_test_beauty.zOrder=0;
        outline_Canvas_test_beauty.type.key="sprite";
        outline_Canvas_test_beauty.type.value="images/beauty.jpg";

        auto Canvas_test_meinv = Canvas_test->meinv = new Struct_Canvas_test_meinv("meinv");
        auto outline_Canvas_test_meinv=Canvas_test_meinv->outline=new Outline();
        outline_Canvas_test_meinv.createNode=createNode;
        outline_Canvas_test_meinv.x=328;
        outline_Canvas_test_meinv.y=-9;
        outline_Canvas_test_meinv.anchorX=0.5;
        outline_Canvas_test_meinv.anchorY=0.5;
        outline_Canvas_test_meinv.width=810;
        outline_Canvas_test_meinv.height=1440;
        outline_Canvas_test_meinv.scale=0.3;
        outline_Canvas_test_meinv.rotation=0;
        outline_Canvas_test_meinv.opacity=255;
        outline_Canvas_test_meinv.visible=true;
        outline_Canvas_test_meinv.zOrder=0;
        outline_Canvas_test_meinv.type.key="sprite";
        outline_Canvas_test_meinv.type.value="images/meinv.jpg";


        Canvas_test->outline->children.push_back(Canvas_test_beauty->outline);
        Canvas_test->outline->children.push_back(Canvas_test_meinv->outline);

        Canvas->outline->children.push_back(Canvas_test->outline);



