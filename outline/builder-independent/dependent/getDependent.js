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
obj.btn_autoGray=getCode('BtnFactoryTemplate.lua','autoGray')

obj.createNode_main=getCode('createNodeTemplate.lua','main');
obj.createNode_createEditBox=getCode('createNodeTemplate.lua','createEditBox');
obj.createNode_progressBar=getCode('createNodeTemplate.lua','progressBar');
obj.createNode_createLabel=getCode('createNodeTemplate.lua','createLabel');
obj.createNode_createParticleSystem=getCode('createNodeTemplate.lua','createParticleSystem');
obj.createNode_processBtn=getCode('createNodeTemplate.lua','processBtn');

obj.anim_x=getCode('animation.lua','anim-x');
obj.anim_y=getCode('animation.lua','anim-y');
obj.anim_scaleX=getCode('animation.lua','anim-scaleX');
obj.anim_scaleY=getCode('animation.lua','anim-scaleY');
obj.anim_size=getCode('animation.lua','anim-size');
obj.anim_anchor=getCode('animation.lua','anim-anchor');
obj.anim_rotation=getCode('animation.lua','anim-rotation');
obj.anim_color=getCode('animation.lua','anim-color');
obj.anim_frame=getCode('animation.lua','anim-frame');
obj.anim_opacity=getCode('animation.lua','anim-opacity');
obj.anim_base=getCode('animation.lua','anim-base');

obj.getDependent=function(dependent){
    var code='';

    //animtaion
    if(dependent.isAnim)
        code+=obj.anim_base+'\n';
    if(dependent.isAnimX)
        code+=obj.anim_x+'\n';
    if(dependent.isAnimY)
        code+=obj.anim_y+'\n';
    if(dependent.isAnimScaleX)
        code+=obj.anim_scaleX+'\n';
    if(dependent.isAnimScaleY)
        code+=obj.anim_scaleY+'\n';
    if(dependent.isAnimSize)
        code+=obj.anim_size+'\n';
    if(dependent.isAnimAnchor)
        code+=obj.anim_anchor+'\n';
    if(dependent.isAnimRotation)
        code+=obj.anim_rotation+'\n';
    if(dependent.isAnimColor)
        code+=obj.anim_color+'\n';
    if(dependent.isAnimFrame)
        code+=obj.anim_frame+'\n';
    if(dependent.isAnimOpacity)
        code+=obj.anim_opacity+'\n';

    //creator
    if(dependent.isCreator)
        code+=obj.outline_head+'\n';
    if(dependent.autoGray)
        code+=obj.btn_autoGray+'\n';
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
    if(dependent.isCreator)
        code+=obj.createNode_main+'\n';
    if(dependent.isCreator)
        code+=obj.outline_main+'\n';
    if(dependent.widget)
        code+=obj.outline_widget+'\n';
        
    return code;
}

module.exports=obj;