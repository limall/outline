var fs=require('fs');
var assetsExportor=require('../AssetsExportor');

//get the path of the image which is used by the given SpriteFrame
module.exports.getImagePath=function(spriteFrame){
    if(spriteFrame){
        var fullPath=spriteFrame._textureFilename;
        var imageFile=fullPath.substring(fullPath.indexOf('/assets/')+8);
        assetsExportor.addFile(imageFile);
        return imageFile;
    }else{
        Editor.error('ImageSource:getImagePath:sprite is null or undefined');
        return null;
    }
};

//get the path of the atlas which is used by the given SpriteFrame
module.exports.getPList=function(spriteFrame){
    var imagePath=this.getImagePath(spriteFrame);
    var start=imagePath.lastIndexOf('/')+1;
    var end=imagePath.indexOf('.');
    var frameName=imagePath.substring(start,end);

    var realFrameName=spriteFrame.name;

    if(frameName==realFrameName){
        return null;
    }else{
        var lastDot=imagePath.lastIndexOf('.');
        if(lastDot<=0)
            return null;
        else{
            var path=imagePath.substring(0,lastDot);
            assetsExportor.addFile(path+'.plist');
            return path+'.plist';
        }
    }
};

/**
 * @return {String} 
 *   If the SpriteFrame uses an Atlas,the result will be like:
 *     folderPath/atlas.plist:spriteFrameName
 *   If not,the result will be like:
 *     imageFilePath
 */
module.exports.getSpriteFrame=function(spriteFrame){
    var imagePath=this.getImagePath(spriteFrame);
    var pListPath=this.getPList(spriteFrame);
    if(pListPath){
        imagePath+=':'+spriteFrame.name;
    }
    return imagePath;
};