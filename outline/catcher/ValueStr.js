/**
 * 本文件用来根据值，来获取代表该值的用来生成源码的string
 */

var getType=require('./Type');
var assetsExportor=require('../AssetsExportor');
var imageSource=require('./ImageSource');

function getIntStr(value){
    return ''+value;
}

function getFloatStr(value,precision){
    precision = precision || 4;
    var valueStr=''+value;
    var dotIndex=valueStr.indexOf('.');
    if(dotIndex>=0){
        var totalLength=valueStr.length;
        if(totalLength-(dotIndex+1)>precision){
            valueStr=valueStr.substring(0,dotIndex+1+precision);
            value=parseFloat(valueStr);
        }
    }
    return ''+value;
}

function getVec2Str(value){
    return 'Vec2('+value.x+','+value.y+')';
}

function getSizeStr(value){
    return 'Size('+value.width+','+value.y+')';
}

function getColorStr(value){
    return 'Color('+value.r+','+value.g+','+value.b+','+value.a+')';
}

function getBoolStr(value){
    return ''+value;
}

function getStringStr(value){
    return '"'+value+'"';
}

function getSpriteFrameStr(value){
    return '"'+imageSource.getSpriteFrame(value)+'"';
}

function getFontStr(font){
    var str='{fontType=';
    if(font instanceof cc.LabelAtlas){
        str+='"atlas"';

        var spriteFrame=font.spriteFrame;
        assetsExportor.addFile(imageSource.getImagePath(spriteFrame));

        str+=',atlas='+getSpriteFrameStr(spriteFrame);
        var temp=font._fntConfig.fontDefDictionary;
        var isFirst=true;
        for(var propName in temp){
            var prop=temp[propName];
            if(prop.rect){
                if(isFirst){
                    str+=',startChar='+getValueStr(propName);
                    str+=',itemWidth='+getValueStr(prop.rect.width);
                    str+=',itemHeight='+getValueStr(prop.rect.height);
                    str+='}';
                    isFirst=false
                }
            }
        }
    }else{
        str+='"ttf"';
        str+=',path="'+font.fontPath+'"';
        str+='}';
        assetsExportor.addFile(font.fontPath);
    }
    return str;
}

function getValueStr(value){
    var type=getType(value);
    var valueStr;
    switch(type){
        case 'int':
            valueStr=getIntStr(value);
            break;
        case 'float':
            valueStr=getFloatStr(value);
            break;
        case 'vec2':
            valueStr=getVec2Str(value);
            break;
        case 'size':
            valueStr=getSizeStr(value);
            break;
        case 'bool':
            valueStr=getBoolStr(value);
            break;
        case 'string':
            valueStr=getStringStr(value);
            break;
        case 'spriteFrame':
            valueStr=getSpriteFrameStr(value);
            break;
        case 'color':
            valueStr=getColorStr(value);
            break;
        case 'font':
            valueStr=getFontStr(value);
            break;
    }
    return valueStr;
}

module.exports=getValueStr;