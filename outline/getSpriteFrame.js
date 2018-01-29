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
    var imagePath=sprite.spriteFrame._textureFilename;
    var pListPath=getPListPath(imagePath);
    if(fs.existsSync(pListPath)){
        var spriteFrameName=sprite.spriteFrame.name;
        return spriteFrameName;
    }else
        return null;
}


module.exports=getSpriteFrame;