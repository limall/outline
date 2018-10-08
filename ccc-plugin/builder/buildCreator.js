var util=require ('./util');
var outlineBuilder=require('./buildOutline');

/**
 * @method buildOneCreator 生成一个creator的lua代码
 * @param {"Object"} outline 一个outline
 * @returns {string} 一个creator的lua代码
 */
function buildOneCreator(outline){
    var pname=util.getPName(outline);
    var creatorName=util.firstCaseUp(pname);
    var outlineCode=outlineBuilder.buildOneOutline(outline);
    var luaCode='local '+creatorName+'={};';
    luaCode+='Base.createCreator('+outlineCode+','+creatorName+')\n';
    
    var userDatas=outline.extraData.userDatas;
    var code_components='';
    if(userDatas.length>0){
        code_components+=creatorName+'._components={';
    }
    userDatas.forEach(function(userData){
        var code=creatorName+'.'+userData.UserDataName+'={\n';
        for(var propName in userData){
            if(propName!=='UserDataName'){
                code+='    '+propName+'='+userData[propName]+',\n'
            }
        }
        code+='}\n'
        code_components+='"'+userData.UserDataName+'",';
        luaCode+=code;
    });
    if(code_components!==''){
        code_components+='}\n';
    }
    return luaCode+code_components;
}

/**
 * @method buildCreators 生成多个creator的lua代码
 * @param {"Array"} outline 多个outline
 * @returns {string} 多个creator的lua代码
 */
module.exports.buildCreators=function(outlines){
    var luaCode='';
    outlines.forEach(function(outline){
        luaCode+=buildOneCreator(outline)+'\n';
    });
    return luaCode;
}
