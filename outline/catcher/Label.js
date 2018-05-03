var assetsExportor=require('../AssetsExportor');
var imageSource=require('./ImageSource');
var getValueStr=require('./ValueStr');

module.exports=function(label,typeInfo){
    typeInfo.add('isLabel',getValueStr(true));
    typeInfo.add('label_string',getValueStr(label.string));
    if(label.horizontalAlign!=cc.Label.HorizontalAlign.CENTER)
        typeInfo.add('label_horizontalAlign',getValueStr(label.horizontalAlign));
    if(label.verticalAlign!=cc.Label.VerticalAlign.CENTER)
        typeInfo.add('label_verticalAlign',getValueStr(label.verticalAlign));
    typeInfo.add('label_lineHeight',getValueStr(label.lineHeight));
    if(label.overflow!=cc.Label.Overflow.NONE)
        typeInfo.add('label_overflow',getValueStr(label.overflow));
    var font=label.font;
    if(font){
        typeInfo.add('label_font',getValueStr(font));
    }
    typeInfo.add('label_fontSize',getValueStr(label.fontSize));
}