var Direction=cc.Enum({
    ToBottom:1,
    ToRight:2/*,
    ToTop:3,
    ToLeft:4*/
});


var Gravity=cc.Enum({
    Left:0,
    Right:1,
    Center_Horizontal:2,
    Top:3,
    Bottom:4,
    Center_Vertical:5
});

cc.Class({
    extends: cc.Component,
    properties: {
        o__isListview:{
            default:true,
            visible:false
        },
        o__listview_inertia:{
            default:true,
            tooltip:"是否开启滚动惯性",
            displayName:'inertia'
        },
        /*o__listview_brake:{
            default:0.5,
            tooltip:"开启惯性后，在用户停止触摸后滚动多块停止，0表示永不停止，1表示立刻停止",
            displayName:'brake'
        },*/
        o__listview_elastic:{
            default:true,
            tooltip:"是否允许滚动内容超过边界，并在停止触摸后回弹",
            displayName:'elastic'
        },
        /*o__listview_bounce_duration:{
            default:1,
            tooltip:"回弹持续的时间，0表示将立即反弹",
            displayName:'bounce_duration'
        },
        o__listview_horizontal_scroll_bar:{
            default:null,
            type:cc.Scrollbar,
            tooltip:"水平滚动的Scrollbar",
            displayName:'horizontal_scroll_bar'
        },
        o__listview_vertical_scroll_bar:{
            default:null,
            type:cc.Scrollbar,
            tooltip:"垂直滚动的Scrollbar",
            displayName:'vertical_scroll_bar'
        },
        o__listview_cancel_inner_events:{
            default:true,
            tooltip:"滚动行为是否会取消子节点上注册的触摸事件",
            displayName:'cancel_inner_events'
        },*/

        o__listview_hidebar:{
            default:true,
            tooltip:"是否隐藏滚动条",
            displayName:"hidebar"
        },

        o__listview_background:{
            type:cc.SpriteFrame,
            default:null,
            tooltip:"背景",
            displayName:'background'
        },

        o__listview_direction:{
            default:Direction.ToBottom,
            type:Direction,
            tooltip:"listview的方向",
            displayName:'direction'
        },

        o__listview_item_gravity:{
            default:Gravity.Center_Horizontal,
            type:Gravity,
            displayName:'item_gravity'
        },

        o__listview_item_margin:{
            default:5,
            tooltip:"项距",
            displayName:'item_margin'
        },
        
        o__listview_padding_left:{
            default:0,
            tooltip:"listview的左边距",
            displayName:'padding_left'
        },
        o__listview_padding_right:{
            default:0,
            tooltip:"listview的右边距",
            displayName:'padding_right'
        },
        o__listview_padding_top:{
            default:0,
            tooltip:"listview的上边距",
            displayName:'padding_top'
        },
        o__listview_padding_bottom:{
            default:0,
            tooltip:"listview的下边距",
            displayName:'padding_bottom'
        }
    },
    start:function(){
        var listview=this.node;
        if(this.o__listview_background){
            var node_background=this.node_background = new cc.Node();
            var sp = node_background.addComponent(cc.Sprite);
            sp.type = cc.Sprite.Type.SLICED
            sp.spriteFrame = this.o__listview_background;
            node_background.parent = listview;
            node_background.width=listview.width;
            node_background.height=listview.height;
        }

        var contentWidth=listview.width-this.o__listview_padding_left-this.o__listview_padding_right;
        var left=-listview.width*listview.anchorX;
        var contentX=left+this.o__listview_padding_left+contentWidth/2;
        var contentHeight=listview.height-this.o__listview_padding_top-this.o__listview_padding_bottom;
        var bottom=-listview.height*listview.anchorY;
        var contentY=bottom+this.o__listview_padding_bottom+contentHeight/2;

        var contentMask=new cc.Node();
        contentMask.x=contentX;
        contentMask.y=contentY;
        contentMask.width=contentWidth;
        contentMask.height=contentHeight;
        contentMask.parent=listview;

        var mask=contentMask.addComponent(cc.Mask);
        mask.type = cc.Mask.Type.RECT;

        var top=contentMask.height/2;
        var left=-contentMask.width/2;
        var bottom=-top;
        cc.log("b"+bottom);
        var right=-left;

        var item_sample=listview.getChildByName('item_sample');
        if(item_sample){
            if(this.o__listview_direction==Direction.ToBottom){
                for(var i=0;i<10;i++){
                    var item=cc.instantiate(item_sample);
                    item.x=0;
                    if(this.o__listview_item_gravity==Gravity.Left){
                        item.x=left+item.width*item.anchorX;
                    }else if(this.o__listview_item_gravity==Gravity.Right){
                        item.x=right-item.width*(1-item.anchorX);
                    }
                    item.y=top-item.height*i-this.o__listview_item_margin*i-item.height*(1-item.anchorY);
                    item.parent=contentMask;
                }
            }else if(this.o__listview_direction==Direction.ToRight){
                for(var i=0;i<10;i++){
                    var item=cc.instantiate(item_sample);
                    item.x=left+item.width*i+this.o__listview_item_margin*i+item.width*item.anchorX;
                    item.y=0;
                    if(this.o__listview_item_gravity==Gravity.Bottom){
                        item.y=bottom+item.height*item.anchorY;
                    }else if(this.o__listview_item_gravity==Gravity.Top){
                        item.y=top-item.height*(1-item.anchorY);
                    }
                    item.parent=contentMask;
                    cc.log(item.y);
                }
            }
        }
    }
});
