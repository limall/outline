var util=require ('../../util')


var exportProperties=['x','y','width','height','anchorX','anchorY','scaleX','scaleY','rotation','opacity','visible','zOrder','key','value','colorR','colorG','colorB','name','isSprite','imageFile','isLabel','label_string','label_fontSize','mapAble'];
/**
 * @method buildOneOutline 生成一个outline的lua代码
 * @param {"Object"} outline 一个outline
 * @returns {string} 一个outline的lua代码
 */
function buildOneOutline(outline){
    var name=outline.name;
    var pname=util.getPName(outline);
    var luaCode='local outline_'+pname+'=O.Outline.new({\n';
    
}