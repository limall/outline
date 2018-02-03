var path=Editor.projectPath+'/packages/outline/builder/cpp/';

var fs=require('fs');

var textOrigin=fs.readFileSync(path+'templete_rootDeclare.hpp').toString();
var sign='//templete';
function getInit(name){
    var textInit=textOrigin.substring(0,textOrigin.indexOf(sign));
    textInit=textInit.replace(/\/\*nodeName\*\//g,name);
    var structName=name.substring(0,1).toUpperCase()+name.substring(1);
    textInit=textInit.replace(/\/\*UnodeName\*\//,structName);
    return textInit;
}

var attrStr=textOrigin.substring(textOrigin.indexOf(sign)+sign.length);
var attrNames=['x','y','width','height','anchorX','anchorY','scaleX','scaleY','rotation','opacity','visible','zOrder','key','value','colorR','colorG','colorB','name'];
var attrs={};
var start=attrStr.indexOf('outline_');
var nameIndex=0;
while(start>=0){
    var end=attrStr.indexOf('=',start)+1;
    var str=attrStr.substring(start,end);
    attrs[attrNames[nameIndex]]=str;
    nameIndex++;
    attrStr=attrStr.substring(end);
    start=attrStr.indexOf('outline_');
}

function addAttr(name,value,nodeName){
    var str=attrs[name];
    str=str.replace(/\/\*nodeName\*\//,nodeName);
    str+=value+';';
    return str;
}

function setExtraData(pname,extraDatas,contentText){
    var text='';
    var extraStructBuilder=require('./template_extraStruct');
    text+=extraStructBuilder(extraDatas,pname,true);
    if(extraDatas.isSprite){
        text+='outline_'+pname+'->isSprite=true;\n';
        text+='            '+'outline_'+pname+'->imageFile='+extraDatas.imageFile+';\n';
    }
    if(extraDatas.isLabel){
        text+='outline_'+pname+'->isLabel=true;\n';
        text+='            '+'outline_'+pname+'->label_fontSize='+extraDatas.fontSize+';\n';
        text+='            '+'outline_'+pname+'->label_string='+extraDatas.string+';\n';
    }
    if(extraDatas.mapAble){
        if(extraDatas.isSprite||extraDatas.isLabel)
            text+='            ';
        text+='outline_'+pname+'->mapAble="'+extraDatas.mapAble+'";\n';
    }
    var newContent=contentText.replace(/\/\*extraData\*\//,text);
    return newContent;
}

module.exports.getRootDeclare=(instance)=>{
    var text='';
    var init=getInit(instance.name);
    instance.attrs.forEach((attr)=>{
        init+='            '+addAttr(attr.name,attr.value,attr.nodeName)+'\n';
    });
    text+=init+'\n';
    text=setExtraData(instance.name,instance.extraDatas,text);
    return text;
};
