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

function buildTypeInfo(typeInfo,dependent){
    var hasInfo=false;
    var luaCode='';
    for(var key in typeInfo){
        var value=typeInfo[key];
        if(value&&value!=''&&value!='null'){
            if(!hasInfo){
                luaCode+='    extraData={\n';
                hasInfo=true;
            }
            if(key==='isEditBox')
                dependent.editBox=true;
            if(key==='particleSystem')
                dependent.particleSystem=true;
            if(key==='isProgressBar')
                dependent.progressBar=true;
            if(key==='hasWidget')
                dependent.widget=true;
            if(key==='buttonType'){
                dependent.btn=true;
                dependent.isBtn=true;
                if(value==='1')
                    dependent.scale=true;
                if(value==='2')
                    dependent.color=true;
                if(value==='3')
                    dependent.sprite=true;
                if(value==='4')
                    dependent.select=true;
                if(value==='5')
                    dependent.none=true;
            }
            if(key==='btn_enableAutoGrayEffect'){
                dependent.autoGray=true;
            }
            if(key==='isLabel')
                dependent.label=true;
            if(key==='isListview')
                dependent.listview=true;
            if(key==='isScrollview')
                dependent.scrollview=true;
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
function buildOneOutline(outline,dependent){
    var pname=util.getPName(outline);
    var luaCode='local outline_'+pname+'=Base.createOutline({\n';
    for(var propName in outline){
        if(isRightProp(propName)&&luaDefault[propName]!==outline[propName]){
            var value=outline[propName];
            if(propName==='extraData'){
                luaCode+=buildTypeInfo(outline.extraData.typeInfo,dependent);
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

/**
 * @method buildOutlines 生成多个outline的lua代码
 * @param {"Array"} outlines 多个outline
 * @returns {string} 多个outline的lua代码
 */
module.exports.buildOutlines=function(outlines,dependent,st){
    if(!dependent)
        dependent={};
    var luaCode='';
    outlines.forEach(function(outline){
        luaCode+=buildOneOutline(outline,dependent)+'\n';
    });
    return luaCode;
}