var getValueStr=require('./ValueStr');

var UNITTYPE_PX=1
var UNITTYPE_RATE=2

function cloneWidget(widget){
    var newWidget=new cc.Widget();
    for(var propName in widget){
        newWidget[propName]=widget[propName];
    }
    return newWidget;
}

module.exports=function(node,typeInfo){
    var widget=node.getComponent(cc.Widget);
    
    //In order to get the origin size of this node,we need to change properties of its widget.
    //Before doing this,we have to clone the origin widget as a backup.
    //So after the size is got,we can restore the widget.
    var temp=cloneWidget(widget);

    if(widget){
        typeInfo.add('hasWidget',getValueStr(true));

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
            typeInfo.add('widget_originHeight',getValueStr(node.height));
            node.height=heightTemp;
        }

        if(isAlignLeft&&isAlignRight){
            var widthTemp=node.width;
            widget.isAlignLeft=false;
            typeInfo.add('widget_originWidth',getValueStr(node.width));
            node.width=widthTemp;
        }

        for(var propName in widget){
            widget[propName]=temp[propName];
        }

        if(isAlignHorizontalCenter){
            typeInfo.add('widget_AHCenter',getValueStr(true));
            typeInfo.add('widget_HCenter',getValueStr(horizontalCenter));
            var unit_horizontalCenter=isAbsoluteHorizontalCenter?UNITTYPE_PX:UNITTYPE_RATE;
            typeInfo.add('widget_UHCenter',getValueStr(unit_horizontalCenter));
        }else{
            if(isAlignLeft){
                typeInfo.add('widget_ALeft',getValueStr(true));
                typeInfo.add('widget_left',getValueStr(left));
                var unit_left=isAbsoluteLeft?UNITTYPE_PX:UNITTYPE_RATE;
                typeInfo.add('widget_unit_left',getValueStr(unit_left));
            }

            if(isAlignRight){
                typeInfo.add('widget_ARight',getValueStr(true));
                typeInfo.add('widget_right',getValueStr(right));
                var unit_right=isAbsoluteRight?UNITTYPE_PX:UNITTYPE_RATE;
                typeInfo.add('widget_unit_right',getValueStr(unit_right));
            }
        }

        if(isAlignVerticalCenter){
            typeInfo.add('widget_AVCenter',getValueStr(true));
            typeInfo.add('widget_VCenter',getValueStr(verticalCenter));
            var unit_verticalCenter=isAbsoluteVerticalCenter?UNITTYPE_PX:UNITTYPE_RATE;
            typeInfo.add('widget_UVCenter',getValueStr(unit_verticalCenter));
        }else{
            if(isAlignBottom){
                typeInfo.add('widget_ABottom',getValueStr(true));
                typeInfo.add('widget_bottom',getValueStr(bottom));
                var unit_bottom=isAbsoluteBottom?UNITTYPE_PX:UNITTYPE_RATE;
                typeInfo.add('widget_unit_bottom',getValueStr(unit_bottom));
            }
    
            if(isAlignTop){
                typeInfo.add('widget_ATop',getValueStr(true));
                typeInfo.add('widget_top',getValueStr(top));
                var unit_top=isAbsoluteTop?UNITTYPE_PX:UNITTYPE_RATE;
                typeInfo.add('widget_unit_top',getValueStr(unit_top));
            }
        }
    }
}