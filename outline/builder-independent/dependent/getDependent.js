var fs=require('fs');

var path=Editor.projectPath+'/packages/outline/builder-independent/dependent/';
var obj={};
function getCode(file,key){
    file=path+file;
    var text=fs.readFileSync(file).toString();
    var startStr='--start '+key;
    var endStr='--end '+key;
    var startIndex=text.indexOf(startStr);
    var endIndex=text.indexOf(endStr);
    if(startIndex<0||endIndex<=0)
        return null;
    else{
        startIndex=text.indexOf('\n',startIndex)+1;
        var code=text.substring(startIndex,endIndex);
        return code;
    }
}
obj.outline_head=getCode('outlineTemplate.lua','head');
obj.outline_main=getCode('outlineTemplate.lua','main');
obj.outline_widget=getCode('outlineTemplate.lua','widget');

obj.btn_main=getCode('BtnFactoryTemplate.lua','main');
obj.btn_scale=getCode('BtnFactoryTemplate.lua','processScaleBtn');
obj.btn_color=getCode('BtnFactoryTemplate.lua','processColorBtn');
obj.btn_sprite=getCode('BtnFactoryTemplate.lua','processSpriteBtn');
obj.btn_select=getCode('BtnFactoryTemplate.lua','processSelectBtn');

obj.createNode_main=getCode('createNodeTemplate.lua','main');
obj.createNode_createEditBox=getCode('createNodeTemplate.lua','createEditBox');
obj.createNode_progressBar=getCode('createNodeTemplate.lua','progressBar');
obj.createNode_createLabel=getCode('createNodeTemplate.lua','createLabel');
obj.createNode_createParticleSystem=getCode('createNodeTemplate.lua','createParticleSystem');
obj.createNode_processBtn=getCode('createNodeTemplate.lua','processBtn');

obj.getDependent=function(dependent){
    var code=obj.outline_head;
    if(dependent.isBtn)
        code+=obj.btn_main+'\n';
    if(dependent.scale)
        code+=obj.btn_scale+'\n';
    if(dependent.color)
        code+=obj.btn_color+'\n';
    if(dependent.sprite)
        code+=obj.btn_sprite+'\n';
    if(dependent.select){
        if(!dependent.scale)
            code+=obj.btn_scale+'\n';
        code+=obj.btn_select+'\n';
    }

    if(dependent.editBox)
        code+=obj.createNode_createEditBox+'\n';
    if(dependent.progressBar)
        code+=obj.createNode_progressBar+'\n';
    if(dependent.label)
        code+=obj.createNode_createLabel+'\n';
    if(dependent.particleSystem)
        code+=obj.createNode_createParticleSystem+'\n';
    if(dependent.btn)
        code+=obj.createNode_processBtn+'\n';
    code+=obj.createNode_main+'\n';

    code+=obj.outline_main+'\n';
    if(dependent.widget)
        code+=obj.outline_widget+'\n';
        
    return code;
}

module.exports=obj;