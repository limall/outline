var imageSource=require('./ImageSource');
var getValueStr=require('./ValueStr');
var assetsExportor=require('../AssetsExportor');

module.exports=function(progressbar,typeInfo){
    if(progressbar){
        var spriteFrame=progressbar.barSprite.spriteFrame;

        assetsExportor.addFile(imageSource.getImagePath(spriteFrame));
        assetsExportor.addFile(imageSource.getPList(spriteFrame));

        typeInfo.add('isProgressBar',getValueStr(true));
        typeInfo.add('progressbar_spriteFrame',getValueStr(spriteFrame));
        typeInfo.add('progressbar_mode',getValueStr(progressbar.mode));
        typeInfo.add('progressbar_progress',getValueStr(progressbar.progress));
        if(progressbar.reverse)
            typeInfo.add('progressbar_reverse',getValueStr(progressbar.reverse));
    }
}