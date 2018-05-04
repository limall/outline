var imageSource=require('./ImageSource');
var getValueStr=require('./ValueStr');

module.exports=function(sprite,typeInfo){
    var spriteFrame=sprite.spriteFrame;

    typeInfo.add('isSprite',getValueStr(true));
    typeInfo.add('sprite_spriteFrame',getValueStr(spriteFrame));

    if(sprite.type===cc.Sprite.Type.SLICED){
        var insetTop=spriteFrame.insetTop;
        var insetBottom=spriteFrame.insetBottom;
        var insetLeft=spriteFrame.insetLeft;
        var insetRight=spriteFrame.insetRight;
        typeInfo.add('sprite_isSliced',getValueStr(true));
        typeInfo.add('sprite_insetTop',getValueStr(insetTop));
        typeInfo.add('sprite_insetBottom',getValueStr(insetBottom));
        typeInfo.add('sprite_insetLeft',getValueStr(insetLeft));
        typeInfo.add('sprite_insetRight',getValueStr(insetRight));
    }
}