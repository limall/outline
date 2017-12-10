var TYPE_BUTTON=0;
var TYPE_SPRITE9=1;

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
    this.scale=scale;
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
        var label=node.getComponent(cc.Label);
        if(label){
            this.key='"label"';
            this.value='"string:'+label.string+';fontSize:'+label.fontSize+'"';
        }
        var sprite=node.getComponent(cc.Sprite);
        if(sprite){
            var typeInfo=node.getComponent('TypeInfo');
            if(typeInfo){
                if(typeInfo.type===TYPE_BUTTON){
                    var isAutoPress=typeInfo.Button_autoPress;
                    this.key='"button"';
                    var fullPath=sprite.spriteFrame._textureFilename;
                    var normal=fullPath.substring(fullPath.indexOf('/assets/')+8);
                    if(isAutoPress){
                        this.value='"autoPress:true;info:'+normal+'"';
                    }else{
                        var pressed=null;
                        if(typeInfo.Button_pressed){
                            fullPath=typeInfo.Button_pressed._textureFilename;
                            pressed=fullPath.substring(fullPath.indexOf('/assets/')+8);
                        }
                        var disabled=null;
                        if(typeInfo.Button_disabled){
                            fullPath=typeInfo.Button_disabled._textureFilename;
                            disabled=fullPath.substring(fullPath.indexOf('/assets/')+8);
                        }
                        this.value='"normal:'+normal;
                        if(pressed){
                            this.value+=";pressed:"+pressed;
                        }
                        if(disabled){
                            this.value+=";disabled:"+disabled;
                        }
                        this.value+='"';
                    }
                }
            }else{
                this.key='"sprite"';
                var fullPath=sprite.spriteFrame._textureFilename;
                this.value='"'+fullPath.substring(fullPath.indexOf('/assets/')+8)+'"';
            }
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

Outline.create=function(node,name){
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
        node.scale,
        node.rotation,
        node.opacity,
        node.isValid,
        node.zIndex,
        node,
        node.color.r,
        node.color.g,
        node.color.b,
        name||node.name
    );
    return outline;
}

module.exports=Outline;