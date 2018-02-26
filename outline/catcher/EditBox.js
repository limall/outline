var assetsExportor=require('../AssetsExportor');
var imageSource=require('./ImageSource');
var getValueStr=require('./ValueStr');

module.exports=function(editBox,typeInfo){
    if(!editBox)
        return;
    else
        typeInfo.add('isEditBox',getValueStr(true));

    var backgroundImage=editBox.backgroundImage;
    if(backgroundImage && backgroundImage._textureFilename.lastIndexOf("default_progressbar.png")<0){
        assetsExportor.addFile(imageSource.getImagePath(backgroundImage));
        typeInfo.add('editbox_backgroundImage',getValueStr(backgroundImage));
    }else{
        Editor.error('must set backgroundImage of EditBox');
        typeInfo.delete('isEditBox');
        return;
    }

    var node=editBox.node;
    typeInfo.add('editbox_width',getValueStr(node.width));
    typeInfo.add('editbox_height',getValueStr(node.height));

    var str=editBox.string;
    if(str && str!='')
        typeInfo.add('editbox_string',getValueStr(str));

    var inputMode=editBox.inputMode;
    if(inputMode!=6)
        typeInfo.add('editbox_inputMode',getValueStr(inputMode));

    var inputFlag=editBox.inputFlag;
    if(inputFlag!=5)
        typeInfo.add('editbox_inputFlag',getValueStr(inputFlag));

    var fontSize=editBox.fontSize;
    if(fontSize!=29)
        typeInfo.add('editbox_fontSize',getValueStr(fontSize));

    var fontColor=editBox.fontColor;
    if(fontColor.r!=0&&fontColor.g!=0&&fontColor.b!=0&&fontColor.a!=0)
        typeInfo.add('editbox_fontColor',getValueStr(fontColor));

    var placeholder=editBox.placeholder;
    if(placeholder && placeholder!='')
        typeInfo.add('editbox_placeholder',getValueStr(placeholder));

    var placeholderFontSize=editBox.placeholderFontSize;
    if(placeholderFontSize!=20)
        typeInfo.add('editbox_placeholderFontSize',getValueStr(placeholderFontSize));

    var maxLength=editBox.maxLength;
    if(maxLength!=8)
        typeInfo.add('editbox_maxLength',getValueStr(maxLength));
}