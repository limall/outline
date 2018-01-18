var util=require ('../util')

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
var exportProperties=['x','y','width','height','anchorX','anchorY','scaleX','scaleY','rotation','opacity','visible','zOrder','key','value','colorR','colorG','colorB','name','isSprite','imageFile','isLabel','label_string','label_fontSize','mapAble'];

function isRightProp(propName){
    for(var i=0;i<exportProperties.length;i++){
        if(exportProperties[i]===propName)
            return true;
    }
    return false;
}

/**
 * @method buildOneOutline 生成一个outline的lua代码
 * @param {"Object"} outline 一个outline
 * @returns {string} 一个outline的lua代码
 */
function buildOneOutline(outline){
    var pname=util.getPName(outline);
    var luaCode='local outline_'+pname+'=O.Outline.new({\n';
    for(var propName in outline){
        if(isRightProp(propName)&&luaDefault[propName]!==outline[propName]){
            var value=outline[propName];
            if(propName==='name')
                value='"'+value+'"';
            luaCode+='    '+propName+'='+value+',\n';
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
module.exports.buildOutlines=function(outlines){
    var luaCode='';
    outlines.forEach(function(outline){
        luaCode+=buildOneOutline(outline)+'\n';
    });
    return luaCode;
}