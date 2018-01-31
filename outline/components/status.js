var getSpriteFrameName=require('./getSpriteFrame');
module.exports=function(node){
    this.x=node.x;
    this.y=node.y;
    this.scaleX=node.scaleX;
    this.scaleY=node.scaleY;
    this.rotation=node.rotation;
    this.width=node.width;
    this.height=node.height;
    this.colorR=node.color.getR();
    this.colorG=node.color.getG();
    this.colorB=node.color.getB();
    this.opacity=node.opacity;
    this.anchorX=node.anchorX;
    this.anchorY=node.anchorY;
    this.skewX=node.skewX;
    this.skewY=node.skewY;
    var sprite=node.getComponent(cc.Sprite);
    if(sprite){
        var fullPath=sprite.spriteFrame._textureFilename;
        this.spriteFrame=fullPath.substring(fullPath.indexOf('/assets/')+16);
        var spriteFrameName=getSpriteFrameName(sprite);
        if(spriteFrameName)
            this.spriteFrame+=':'+spriteFrameName;
    }
}