var imageSource=require('./ImageSource');
var getValueStr=require('./ValueStr');

module.exports=function(progressbar,typeInfo){
    if(progressbar){
        var spriteFrame=progressbar.barSprite.spriteFrame;

        typeInfo.add('isProgressBar',getValueStr(true));
        typeInfo.add('progressbar_spriteFrame',getValueStr(spriteFrame));
        typeInfo.add('progressbar_mode',getValueStr(progressbar.mode));
        typeInfo.add('progressbar_progress',getValueStr(progressbar.progress));
        if(progressbar.reverse)
            typeInfo.add('progressbar_reverse',getValueStr(progressbar.reverse));
    }
}