var spriteSource=require('./spriteSource');
module.exports=function(editBox){
    var mapAble='';

    var backgroundImage=editBox.backgroundImage;
    if(backgroundImage && backgroundImage._textureFilename.lastIndexOf("default_progressbar.png")<0){
        mapAble+='editbox_backgroundImage:'+spriteSource.getSpriteFrame(backgroundImage)+'%o__%';
    }else{
        return mapAble;
        Editor.error('must set backgroundImage of EditBox');
    }

    var node=editBox.node;
    mapAble+='editbox_width:'+node.width+'%o__%';
    mapAble+='editbox_height:'+node.height+'%o__%';

    mapAble+='isEditBox:true%o__%';

    var str=editBox.string;
    if(str && str!='')
        mapAble+='editbox_string:'+str+'%o__%';

    var inputMode=editBox.inputMode;
    if(inputMode!=6)
        mapAble+='editbox_inputMode:'+inputMode+'%o__%';

    var inputFlag=editBox.inputFlag;
    if(inputFlag!=5)
        mapAble+='editbox_inputFlag:'+inputFlag+'%o__%';

    var fontSize=editBox.fontSize;
    if(fontSize!=29)
        mapAble+='editbox_fontSize:'+fontSize+'%o__%';
    
    var lineHeight=editBox.lineHeight;
    if(lineHeight!=40)
        mapAble+='editbox_lineHeight:'+lineHeight+'%o__%';

    var colorR=editBox.fontColor.r;
    if(colorR!=0)
        mapAble+='editbox_fontColorR:'+colorR+'%o__%';

    var colorG=editBox.fontColor.g;
    if(colorG!=0)
        mapAble+='editbox_fontColorG:'+colorG+'%o__%';

    var colorB=editBox.fontColor.b;
    if(colorB!=0)
        mapAble+='editbox_fontColorB:'+colorB+'%o__%';
    
    var colorA=editBox.fontColor.a;
    if(colorA!=255)
        mapAble+='editbox_fontColorA:'+colorA+'%o__%';

    var placeholder=editBox.placeholder;
    if(placeholder && placeholder!='')
        mapAble+='editbox_placeholder:'+placeholder+'%o__%';

    var placeholderFontSize=editBox.placeholderFontSize;
    if(placeholderFontSize!=20)
        mapAble+='editbox_placeholderFontSize:'+placeholderFontSize+'%o__%';

    var maxLength=editBox.maxLength;
    if(maxLength!=8)
        mapAble+='editbox_maxLength:'+maxLength+'%o__%';
    
    return mapAble;
}