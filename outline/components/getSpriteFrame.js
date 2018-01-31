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

function getSpriteFrame(sprite){
    if(sprite){
        var imagePath=sprite.spriteFrame._textureFilename;
        var start=imagePath.lastIndexOf('/')+1;
        var end=imagePath.indexOf('.');
        if(start>=0&&end>0){
            var frameName=imagePath.substring(start,end);
            var realFrameName=sprite.spriteFrame.name;
            if(frameName!=realFrameName)
                return realFrameName;
        }
    }
}


module.exports=getSpriteFrame;