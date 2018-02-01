var fs=require('fs');
function getPListPath(imagePath){
    var lastDot=imagePath.lastIndexOf('.');
    if(lastDot<=0)
        return null;
    else{
        var path=imagePath.substring(0,lastDot);
        return path+'.plist';
    }
}

module.exports.getImageFile=function(spriteFrame){
    var fullPath=spriteFrame._textureFilename;
    var imageFile=fullPath.substring(fullPath.indexOf('/assets/')+8);
    return imageFile;
};

module.exports.getPList=function(spriteFrame){
    var imageFile=this.getImageFile(spriteFrame);

    var start=imageFile.lastIndexOf('/')+1;
    var end=imageFile.indexOf('.');
    var frameName=imageFile.substring(start,end);

    var realFrameName=spriteFrame.name;

    if(frameName==realFrameName){
        return null;
    }else{
        return getPListPath(imageFile);
    }
};

module.exports.getSpriteFrame=function(spriteFrame){
    var imageFile=this.getImageFile(spriteFrame);
    var pListPath=this.getPList(spriteFrame);

    if(pListPath){
        imageFile+=':'+spriteFrame.name;
    }
    return imageFile;
};