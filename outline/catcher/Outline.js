var getExtraData=require('./ExtraData');

global.id=global.id||-1;
function getName(){
    global.id=global.id+1;
    return 'c'+global.id;
}

/**
 * @constructor Outline 
 * @param {*} node If the name of the node is void or as same as other children with then same parent,one random name will be made.
 */
function Outline(node){
    var x=node.x;
    if(node.parent)
        x+=node.parent.width*node.parent.anchorX;
    var y=node.y;
    if(node.parent)
        y+=node.parent.height*node.parent.anchorY;
    
    this.x=x;
    this.y=y;
    this.anchorX=node.anchorX;
    this.anchorY=node.anchorY;
    this.width=node.width;
    this.height=node.height;
    this.scaleX=node.scaleX;
    this.scaleY=node.scaleY;
    this.rotation=node.rotation;
    this.opacity=node.opacity;
    this.visible=node.active;
    this.zOrder=node.zIndex;
    this.colorR=node.color.r;
    this.colorG=node.color.g;
    this.colorB=node.color.b;

    var name =node.name;
    if((!name)||(name===''))
        name=getName();
    else{
        var parent=node.parent;
        if(parent){
            var children=parent.children;
            for(var i=0;i<children.length;i++){
                var child=children[i];
                if(child!==node){
                    var childName=child.name;
                    if(childName===node.name){
                        name=getName();
                        break;
                    }
                }
            }
        }
    }

    this.name=name;

    this.extraData=getExtraData(node);

    this.node=node;
    this.toJsonObj=function(){
        var jsonObj={};
        for(var name in this){
            if(name!='node'&&name!='toJsonObj')
            jsonObj[name]=this[name];
        }
        return jsonObj;
    }
};

module.exports=Outline;