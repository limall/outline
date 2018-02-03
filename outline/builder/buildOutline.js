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
var exportProperties=['x','y','width','height','anchorX','anchorY','scaleX','scaleY','rotation','opacity','visible','zOrder','key','value','colorR','colorG','colorB','name','isSprite','isLabel','label_string','label_fontSize','mapAble','spriteFrame'];

function isRightProp(propName){
    for(var i=0;i<exportProperties.length;i++){
        if(exportProperties[i]===propName)
            return true;
    }
    return false;
}

function buildMapable(mapAble){
    var numChars=['0','1','2','3','4','5','6','7','8','9','.','-'];
    function ifCharIsNumber(char){
        for(var i=0;i<numChars.length;i++){
            var numChar=numChars[i];
            if(numChar===char)
                return i;
        }
        return -1;
    }

    function isNumber(str){
        var chars=str.split('');
        var haveDot=false;
        for(var i=0;i<chars.length;i++){
            var char=chars[i];
            var index=ifCharIsNumber(char);
            if(index===-1)
                return false;
            else{
                if(index===11&&i!==0)
                    return false;
                if(haveDot&&index===10)
                    return false;
                if(index===10)
                    haveDot=true;
            }
        }
        return true;
    }

    function produceValue(value){
        if(isNumber(value))
            return value;
        else if(value.indexOf('rgba')===0){
            value=value.replace(/rgba/,'cc.c4b');
            return value;
        }else if(value.indexOf('Vec2')===0||value==='true'||value==='false'){
            return value;
        }
        return '"'+value+'"';
    }

    var luaCode='    extraData={\n';
    var keyValues=mapAble.split('%o__%');
    keyValues.forEach(function(keyValue){
        var seperate=keyValue.indexOf(':');
        var key=keyValue.substring(0,seperate);
        var value=keyValue.substring(seperate+1);
        if(key&&key!=''&&value&&value!=''&&value!='null'){
            value=produceValue(value);
            luaCode+='        '+key+'='+value+',\n';
        }
    });
    luaCode+='    },\n';
    return luaCode;
}

/**
 * @method buildOneOutline 生成一个outline的lua代码
 * @param {"Object"} outline 一个outline
 * @returns {string} 一个outline的lua代码
 */
function buildOneOutline(outline){
    var pname=util.getPName(outline);
    var luaCode='local outline_'+pname+'=Base.createOutline({\n';
    for(var propName in outline){
        if(isRightProp(propName)&&luaDefault[propName]!==outline[propName]){
            var value=outline[propName];
            if(propName==='mapAble'){
                luaCode+=buildMapable(value.substring(1,value.length-1));
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
module.exports.buildOutlines=function(outlines){
    var luaCode='';
    outlines.forEach(function(outline){
        luaCode+=buildOneOutline(outline)+'\n';
    });
    return luaCode;
}