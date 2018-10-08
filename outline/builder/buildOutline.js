var util=require ('./util')

var luaDefault={
    name:'',
    x:0,
    y:0,
    scaleX:1,
    scaleY:1,
    width:0,
    height:0,
    anchorX:0.5,
    anchorY:0.5,
    rotation:0,
    skewX:0,
    skewY:0,
    opacity:255,
    visible:true,
    zOrder:0,
    colorR:255,
    colorG:255,
    colorB:255
};

var exportProperties=[
    'x',
    'y',
    'width',
    'height',
    'anchorX',
    'anchorY',
    'scaleX',
    'scaleY',
    'rotation',
    'skewX',
    'skewY',
    'opacity',
    'visible',
    'zOrder',
    'key',
    'value',
    'colorR',
    'colorG',
    'colorB',
    'name',
    'extraData'
];

function isRightProp(propName){
    for(var i=0;i<exportProperties.length;i++){
        if(exportProperties[i]===propName)
            return true;
    }
    return false;
}

function buildTypeInfo(typeInfo){
    var hasInfo=false;
    var luaCode='';
    for(var key in typeInfo){
        var value=typeInfo[key];
        if(value&&value!=''&&value!='null'){
            if(!hasInfo){
                luaCode+='    extraData={\n';
                hasInfo=true;
            }
            luaCode+='        '+key+'='+value+',\n';
        }
    }
    if(hasInfo)
        luaCode+='    },\n';
    return luaCode;
}

/**
 * @method buildOneOutline 生成一个outline的lua代码
 * @param {"Object"} outline 一个outline
 * @returns {string} 一个outline的lua代码
 */
module.exports.buildOneOutline=function(outline){
    var pname=util.getPName(outline);
    var luaCode='Base.createOutline({\n';
    for(var propName in outline){
        if(isRightProp(propName)&&luaDefault[propName]!==outline[propName]){
            var value=outline[propName];
            if(propName==='extraData'){
                luaCode+=buildTypeInfo(outline.extraData.typeInfo);
            }else{
                if(propName==='name')
                    value='"'+value+'"';
                luaCode+='    '+propName+'='+value+',\n';
            }
            hasDot=true;
        }
    }
    luaCode+='})\n';
    return luaCode;
}
