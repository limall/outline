var Direction=cc.Enum({
    VERTICAL:1,
    HORIZONTAL:2,
    BOTH:3
});
cc.Class({
    extends: cc.Component,
    properties: {
        o__isScrollview:{
            default:true,
            visible:false
        },
        o__scrollview_inertia:{
            default:true,
            tooltip:"是否开启滚动惯性",
            displayName:'inertia'
        },
        o__scrollview_direction:{
            default:Direction.VERTICAL,
            type:Direction,
            tooltip:"scrollview的滚动方向",
            displayName:'direction'
        },
        o__scrollview_hidebar:{
            default:true,
            tooltip:"是否隐藏滚动条",
            displayName:"hidebar"
        }
    },
    start () {
        var scrollview=this.node;
        var content=scrollview.getChildByName('content');
        var viewsize=scrollview.getContentSize();
        var contentsize=scrollview.getContentSize();

        //先设置content到scroll的正中心(both情况)
        content.setAnchorPoint(0.5,0.5);
        var viewAnchor=scrollview.getAnchorPoint();
        content.x=(0.5-viewAnchor.x)*viewsize.width;
        content.y=(0.5-viewAnchor.y)*viewsize.height;

        switch(this.o__scrollview_direction){
            case Direction.VERTICAL:
                content.y-=(contentsize.height-viewsize.height)/2;
                break;
            case Direction.HORIZONTAL:
                content.x+=(contentsize.width-viewsize.width)/2;
                break;
        }

        var mask=scrollview.addComponent(cc.Mask);
        mask.type = cc.Mask.Type.RECT;
    },
});
