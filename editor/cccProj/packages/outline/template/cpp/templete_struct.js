var path=Editor.projectPath+'/packages/outline/template/cpp/';

var fs=require('fs');

var text=fs.readFileSync(path+'templete_struct.hpp').toString();
var sign='//end';
var textTemplete=text.substring(0,text.indexOf(sign));
var root=text.substring(text.indexOf(sign)+sign.length);

function setName(text,name,PName){
    PName=PName.substring(0,1).toUpperCase()+PName.substring(1);
    var newText=text.replace(/\/\*Poutline_nodeName\*\//g,PName);
    newText=newText.replace(/\/\*outline_nodeName\*\//g,name);
    return newText;
}

function setChildren(text,children){
    var childrenText='';
    if(children){
        children.forEach((child)=>{
            var Name=child.PName.substring(0,1).toUpperCase()+child.PName.substring(1);
            childrenText+='\n    '+Name+' *'+child.name+';';
        });
    }
    var newText=text.replace(/\/\*children\*\//g,childrenText);
    return newText;
};

module.exports.getStructDefinition1=(defArr)=>{
    var text=''; 
    for(var i=0;i<defArr.length-1;i++){
        var def=defArr[i];
        var oneText=textTemplete;
        oneText=setName(oneText,def.name,def.PName);
        oneText=setChildren(oneText,def.children);
        oneText=oneText.replace(/\/\*root\*\//,' ');
        text+=oneText+'\n';
    }
    return text;
};


module.exports.getStructDefinition2=(defArr)=>{
    var def=defArr[defArr.length-1];
    var oneText=textTemplete;
    oneText=setName(oneText,def.name,def.PName);
    oneText=setChildren(oneText,def.children);
    oneText=oneText.replace(/\/\*root\*\//,root);
    return oneText;
};