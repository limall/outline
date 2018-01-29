var UNITTYPE_PX=1
var UNITTYPE_RATE=2

module.exports=function(node){
    var widget=node.getComponent(cc.Widget);
    if(widget){
        var str='';
        var isAlignLeft=widget.isAlignLeft;
        var isAlignRight=widget.isAlignRight;
        var isAlignTop=widget.isAlignTop;
        var isAlignBottom=widget.isAlignBottom;
        var isAlignHorizontalCenter=widget.isAlignHorizontalCenter;
        var isAlignVerticalCenter=widget.isAlignVerticalCenter;
        var left=widget.left;
        var right=widget.right;
        var top=widget.top;
        var bottom=widget.bottom;
        var isAbsoluteBottom=widget.isAbsoluteBottom;
        var isAbsoluteLeft=widget.isAbsoluteLeft;
        var isAbsoluteTop=widget.isAbsoluteTop;
        var isAbsoluteRight=widget.isAbsoluteRight;

        if(isAlignHorizontalCenter){
            str+='widget_HorizontalCenter:true%o__%';
        }else{
            if(isAbsoluteLeft){
                str+='widget_left:'+left+'%o__%';
                var unit_left=isAbsoluteLeft?UNITTYPE_PX:UNITTYPE_RATE;
                str+='widget_unit_left:'+unit_left+'%o__%';
            }

            if(isAlignRight){
                str+='widget_right:'+right+'%o__%';
                var unit_right=isAbsoluteRight?UNITTYPE_PX:UNITTYPE_RATE;
                str+='widget_unit_right:'+unit_right+'%o__%';
            }
        }

        if(isAlignVerticalCenter){
            str+='widget_VerticalCenter:true%o__%';
        }else{
            if(isAlignBottom){
                str+='widget_bottom:'+bottom+'%o__%';
                var unit_bottom=isAbsoluteBottom?UNITTYPE_PX:UNITTYPE_RATE;
                str+='widget_unit_bottom:'+unit_bottom+'%o__%';
            }
    
            if(isAlignTop){
                str+='widget_top:'+top+'%o__%';
                var unit_top=isAbsoluteTop?UNITTYPE_PX:UNITTYPE_RATE;
                str+='widget_unit_top:'+unit_top+'%o__%';
            }
        }
        
        return str;
    }
}