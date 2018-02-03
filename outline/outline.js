var getExtraData=require('./getExtraData');

//用于记录node的轮廓，以及一些组件信息
var Outline=function(
    x,
    y,
    anchorX,
    anchorY,
    width,
    height,
    scaleX,
    scaleY,
    rotation,
    opacity,
    visible,
    zOrder,
    node,
    colorR,
    colorG,
    colorB,
    name
){
    this.x=x;
    this.y=y;
    this.anchorX=anchorX;
    this.anchorY=anchorY;
    this.width=width;
    this.height=height;
    this.scaleX=scaleX;
    this.scaleY=scaleY;
    this.rotation=rotation;
    this.opacity=opacity;
    this.visible=visible;
    this.zOrder=zOrder;
    this.colorR=colorR;
    this.colorG=colorG;
    this.colorB=colorB;
    this.node=node;
    if(node){
        node.outline=this;
        var extraData=getExtraData(node);
        for(var propName in extraData){
            this[propName]=extraData[propName];
        }
    }
    if(name)
        this.name=name;
    else
        this.name=node.name;
    this.toString=function(){
        var obj={};
        this.toJson(obj);
        if(this.node){
            obj.children=[];
            var nodeChildren=node.children;
            for(var i=0;i<nodeChildren;i++)
                if(nodeChildren[i].outline)
                    obj.children.push(nodeChildren[i].outline.name);
        }
        return JSON.stringify(obj);
    };
    this.toJson=function(obj){
        for(var name in this){
            if(name!='toString'&&name!='node'&&name!='toJson')
                obj[name]=this[name];
        }
    };
}

module.exports=function(node,name){
    var x=node.x;
    if(node.parent)
        x+=node.parent.width*node.parent.anchorX;
    var y=node.y;
    if(node.parent)
        y+=node.parent.height*node.parent.anchorY;
    var outline=new Outline(
        x,
        y,
        node.anchorX,
        node.anchorY,
        node.width,
        node.height,
        node.scaleX,
        node.scaleY,
        node.rotation,
        node.opacity,
        node.active,
        node.zIndex,
        node,
        node.color.r,
        node.color.g,
        node.color.b,
        name||node.name
    );
    return outline;
};
