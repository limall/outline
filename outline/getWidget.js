var UNITTYPE_PX=1
var UNITTYPE_RATE=2

function cloneWidget(widget){
    var newWidget=new cc.Widget();
    for(var propName in widget){
        newWidget[propName]=widget[propName];
    }
    return newWidget;
}

module.exports=function(node){
    var widget=node.getComponent(cc.Widget);
    var temp=cloneWidget(widget);
    if(widget){
        var str='hasWidget:true%o__%';
        var isAlignLeft=widget.isAlignLeft;
        var isAlignRight=widget.isAlignRight;
        var isAlignTop=widget.isAlignTop;
        var isAlignBottom=widget.isAlignBottom;
        var isAlignHorizontalCenter=widget.isAlignHorizontalCenter;
        var horizontalCenter=widget.horizontalCenter;
        var isAbsoluteHorizontalCenter=widget.isAbsoluteHorizontalCenter;
        var verticalCenter=widget.verticalCenter;
        var isAbsoluteVerticalCenter=widget.isAbsoluteVerticalCenter;
        var isAlignVerticalCenter=widget.isAlignVerticalCenter;
        var left=widget.left;
        var right=widget.right;
        var top=widget.top;
        var bottom=widget.bottom;
        var isAbsoluteBottom=widget.isAbsoluteBottom;
        var isAbsoluteLeft=widget.isAbsoluteLeft;
        var isAbsoluteTop=widget.isAbsoluteTop;
        var isAbsoluteRight=widget.isAbsoluteRight;

        if(isAlignBottom&&isAlignTop){
            var heightTemp=node.height;
            widget.isAlignBottom=false;
            str+='widget_originHeight:'+node.height+'%o__%';
            node.height=heightTemp;
        }

        if(isAlignLeft&&isAlignRight){
            var widthTemp=node.width;
            widget.isAlignLeft=false;
            str+='widget_originWidth:'+node.width+'%o__%';
            node.width=widthTemp;
        }

        for(var propName in widget){
            widget[propName]=temp[propName];
        }

        if(isAlignHorizontalCenter){
            str+='widget_AHCenter:true%o__%';
            str+='widget_HCenter:'+horizontalCenter+'%o__%';
            var unit_horizontalCenter=isAbsoluteHorizontalCenter?UNITTYPE_PX:UNITTYPE_RATE;
            str+='widget_UHCenter:'+unit_horizontalCenter+'%o__%';
        }else{
            if(isAlignLeft){
                str+='widget_ALeft:true%o__%';
                str+='widget_left:'+left+'%o__%';
                var unit_left=isAbsoluteLeft?UNITTYPE_PX:UNITTYPE_RATE;
                str+='widget_unit_left:'+unit_left+'%o__%';
            }

            if(isAlignRight){
                str+='widget_ARight:true%o__%';
                str+='widget_right:'+right+'%o__%';
                var unit_right=isAbsoluteRight?UNITTYPE_PX:UNITTYPE_RATE;
                str+='widget_unit_right:'+unit_right+'%o__%';
            }
        }

        if(isAlignVerticalCenter){
            str+='widget_AVCenter:true%o__%';
            str+='widget_VCenter:'+verticalCenter+'%o__%';
            var unit_verticalCenter=isAbsoluteVerticalCenter?UNITTYPE_PX:UNITTYPE_RATE;
            str+='widget_UVCenter:'+unit_verticalCenter+'%o__%';
        }else{
            if(isAlignBottom){
                str+='widget_ABottom:true%o__%';
                str+='widget_bottom:'+bottom+'%o__%';
                var unit_bottom=isAbsoluteBottom?UNITTYPE_PX:UNITTYPE_RATE;
                str+='widget_unit_bottom:'+unit_bottom+'%o__%';
            }
    
            if(isAlignTop){
                str+='widget_ATop:true%o__%';
                str+='widget_top:'+top+'%o__%';
                var unit_top=isAbsoluteTop?UNITTYPE_PX:UNITTYPE_RATE;
                str+='widget_unit_top:'+unit_top+'%o__%';
            }
        }
        
        return str;
    }
}