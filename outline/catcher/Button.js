var assetsExportor=require('../AssetsExportor');
var imageSource=require('./ImageSource');
var getValueStr=require('./ValueStr');

module.exports=function(node,typeInfo){
    var com_button=node.getComponent(cc.Button);
    var com_sprite=node.getComponent(cc.Sprite);
    
    var spf_normal=com_button.normalSprite;
    if(!spf_normal){
        spf_normal=com_sprite.spriteFrame;
    }
    if(spf_normal){
        assetsExportor.addFile(imageSource.getImagePath(spf_normal));
        assetsExportor.addFile(imageSource.getPList(spf_normal));
        typeInfo.add('image_normal',getValueStr(spf_normal));
    }else
        return;

    var spf_pressed=com_button.pressedSprite;
    if(spf_pressed){
        assetsExportor.addFile(imageSource.getImagePath(spf_pressed));
        assetsExportor.addFile(imageSource.getPList(spf_pressed));
        typeInfo.add('buttonType',getValueStr(3));
        typeInfo.add('image_pressed',getValueStr(spf_pressed));
    }else{
        typeInfo.add('buttonType',getValueStr(1));
    }

    var spf_disabled=com_button.disabledSprite;
    if(spf_disabled){
        assetsExportor.addFile(imageSource.getImagePath(spf_disabled));
        assetsExportor.addFile(imageSource.getPList(spf_disabled));
        typeInfo.add('image_disabled',getValueStr(spf_disabled));
    }

    var enableAutoGrayEffect=com_button.enableAutoGrayEffect;
    if(enableAutoGrayEffect)
        typeInfo.add('btn_enableAutoGrayEffect',getValueStr(enableAutoGrayEffect));
}