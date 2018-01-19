var util=require ('../util');

/**
 * @method buildOneCreator 生成一个creator的lua代码
 * @param {"Object"} outline 一个outline
 * @returns {string} 一个creator的lua代码
 */
function buildOneCreator(outline){
    var pname=util.getPName(outline);
    var creatorName=util.firstCaseUp(pname);
    var outlineName='outline_'+pname;
    var luaCode='local '+creatorName+'=Base.createCreator('+outlineName+')\n';
    var components=outline.components;
    for(var propName in components){
        var code=creatorName+'.'+propName+'={\n';
        var component=components[propName];
        component.forEach(function(extraData){
            code+='    '+extraData.name+'='+extraData.value+',\n'
        });
        code+='}\n'
        luaCode+=code+'\n';
    }
    return luaCode;
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