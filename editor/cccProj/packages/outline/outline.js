var Outline=function(
    x,
    y,
    anchorX,
    anchorY,
    width,
    height,
    scale,
    rotation,
    opacity,
    visible,
    zOrder,
    node,
    name
){
    this.x=x;
    this.y=y;
    this.anchorX=anchorX;
    this.anchorY=anchorY;
    this.width=width;
    this.height=height;
    this.scale=scale;
    this.rotation=rotation;
    this.opacity=opacity;
    this.visible=visible;
    this.zOrder=zOrder;
    this.node=node;
    if(node)
        node.outline=this;
    if(name)
        this.name=name;
    else
        this.name=getNewName();
    this.addTypeInfo=function(obj){
        for(var name in obj){
            this[name]=obj[name];
        }
    };
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
            if(name!='addTypeInfo'&&name!='toString'&&name!='node'&&name!='toJson')
                obj[name]=this[name];
        }
    };
}

Outline.create=function(node,name){
    var outline=new Outline(
        node.x,
        node.y,
        node.anchorX,
        node.anchorY,
        node.width,
        node.height,
        node.scale,
        node.rotation,
        node.opacity,
        node.isValid,
        node.zIndex,
        node,
        name||node.name
    );
    return outline;
}

function getNewName(){
    return "defaultname_outline";
}

module.exports=Outline;