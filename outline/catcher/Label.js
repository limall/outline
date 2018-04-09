var assetsExportor=require('../AssetsExportor');
var imageSource=require('./ImageSource');
var getValueStr=require('./ValueStr');

function getLabelAtlas(label,typeInfo){
    var font=label.font;
    var spriteFrame=font.spriteFrame;
    
    assetsExportor.addFile(imageSource.getImagePath(spriteFrame));

    typeInfo.add('isLabelAtlas',getValueStr(true));
    typeInfo.add('labelAtlas_atlas',getValueStr(spriteFrame));
    var temp=font._fntConfig.fontDefDictionary;
    var isFirst=true;
    for(var propName in temp){
        var prop=temp[propName];
        if(prop.rect){
            if(isFirst){
                typeInfo.add('labelAtlas_startChar',getValueStr(propName));
                typeInfo.add('labelAtlas_itemWidth',getValueStr(prop.rect.width));
                typeInfo.add('labelAtlas_itemHeight',getValueStr(prop.rect.height));
                isFirst=false
            }
        }
    }
}

module.exports=function(label,typeInfo){
    typeInfo.add('isLabel',getValueStr(true));
    typeInfo.add('label_string',getValueStr(label.string));
    var font=label.font;
    if(font){
        if(font instanceof cc.LabelAtlas){
            getLabelAtlas(label,typeInfo);
        }else{
            Editor.assetdb.queryPathByUuid(font._uuid,function(err,path){
                if(err){
                    Editor.error(err.toString());
                }else{
                    path=path.replace(/\\/g,'/');
                    path=path.substring(path.indexOf('/assets/')+8);
                    typeInfo.add('label_font',getValueStr(path));
                    assetsExportor.addFile(path);
                }
            });
        }
    }
    typeInfo.add('label_fontSize',getValueStr(label.fontSize));
}