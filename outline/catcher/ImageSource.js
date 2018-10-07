var fs=require('fs');
var assetsExportor=require('../AssetsExportor');

/** 
 * @return {boolean}
 * 判断类型是否为cc.SpriteFrame类型，因为instanceOf无效，所以查看是否含有SpriteFrame的一些属性  
 */
module.exports.isSpriteFrame=function(spriteFrame){
    var _originalSize=spriteFrame._originalSize!==undefined;
    var insetBottom=spriteFrame.insetBottom!==undefined;
    var _textureFilename=spriteFrame._textureFilename!==undefined;
    if (_originalSize&&insetBottom&&_textureFilename)
        return true
    else
        return false
}

/**
 * @return {String} 
 *   If the SpriteFrame uses an Atlas,the result will be like:
 *     folderPath/atlas.plist:spriteFrameName
 *   If not,the result will be like:
 *     imageFilePath
 */
module.exports.getSpriteFrame=function(spriteFrame){
    if(spriteFrame){
        var fullPath=spriteFrame._sourceFile;
        var start=fullPath.indexOf('/assets/');
        start+=8;

        var end=fullPath.lastIndexOf('/');

        var path=fullPath.substring(start,end);
        
        if(end>6){
            var plistIndex=fullPath.indexOf('.plist');
            if(plistIndex===end-6){
                //add files to copy
                assetsExportor.addFile(path);
                var imageSuffixes=['.png','.PNG','.jpg','.jpeg','.JPG','.JPEG'];
                for (var i=0;i<imageSuffixes.length;i++){
                    var imagePath=fullPath.substring(0,plistIndex)+imageSuffixes[i];
                    if(fs.existsSync(imagePath)){
                        assetsExportor.addFile(imagePath.substring(start));
                        break;
                    }
                }

                path=path+':'+fullPath.substring(end+1);
                return path;
            }
        }        

        assetsExportor.addFile(path);
        return path;
    }else{
        Editor.error('ImageSource:getImagePath:sprite is null or undefined');
        return null;
    }
};
